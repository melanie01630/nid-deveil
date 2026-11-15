-- =====================================================================
--  Mams · Communauté des mams : base de données (Supabase)
--  À copier en entier dans Supabase > SQL Editor > New query, puis « Run ».
--  On peut le relancer sans risque : il ne supprime aucune donnée.
-- =====================================================================

-- ---------- Profils ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  pseudo text not null check (char_length(pseudo) between 2 and 24),
  ville text check (char_length(ville) <= 60),
  enfants text check (char_length(enfants) <= 80),
  bio text check (char_length(bio) <= 300),
  avatar text,
  is_admin boolean not null default false,
  banned boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false)
$$;
create or replace function public.is_banned() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select banned from public.profiles where id = auth.uid()), false)
$$;

-- personne ne peut se donner les droits d'administratrice ou se « débannir » toute seule
create or replace function public.protect_profile() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then
    new.is_admin := old.is_admin;
    new.banned := old.banned;
  end if;
  return new;
end $$;
drop trigger if exists protect_profile on public.profiles;
create trigger protect_profile before update on public.profiles
  for each row execute function public.protect_profile();

drop policy if exists "profils visibles" on public.profiles;
create policy "profils visibles" on public.profiles for select to authenticated using (true);
drop policy if exists "je cree mon profil" on public.profiles;
create policy "je cree mon profil" on public.profiles for insert to authenticated
  with check (id = auth.uid() and is_admin = false and banned = false);
drop policy if exists "je modifie mon profil" on public.profiles;
create policy "je modifie mon profil" on public.profiles for update to authenticated
  using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());

-- un profil est créé automatiquement à l'inscription (avec le pseudo choisi)
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, pseudo)
  values (new.id, case when char_length(trim(coalesce(new.raw_user_meta_data->>'pseudo', ''))) >= 2
    then left(trim(new.raw_user_meta_data->>'pseudo'), 24) else 'Maman' end)
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Le salon des mams ----------
create table if not exists public.posts (
  id bigint generated always as identity primary key,
  author uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  texte text not null check (char_length(texte) between 1 and 2000),
  photo text,
  categorie text check (char_length(categorie) <= 30),
  created_at timestamptz not null default now()
);
alter table public.posts enable row level security;
drop policy if exists "posts visibles" on public.posts;
create policy "posts visibles" on public.posts for select to authenticated using (true);
drop policy if exists "je publie" on public.posts;
create policy "je publie" on public.posts for insert to authenticated
  with check (author = auth.uid() and not public.is_banned());
drop policy if exists "je supprime mon post" on public.posts;
create policy "je supprime mon post" on public.posts for delete to authenticated
  using (author = auth.uid() or public.is_admin());

create table if not exists public.comments (
  id bigint generated always as identity primary key,
  post_id bigint not null references public.posts(id) on delete cascade,
  author uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  texte text not null check (char_length(texte) between 1 and 1000),
  created_at timestamptz not null default now()
);
alter table public.comments enable row level security;
drop policy if exists "commentaires visibles" on public.comments;
create policy "commentaires visibles" on public.comments for select to authenticated using (true);
drop policy if exists "je commente" on public.comments;
create policy "je commente" on public.comments for insert to authenticated
  with check (author = auth.uid() and not public.is_banned());
drop policy if exists "je supprime mon commentaire" on public.comments;
create policy "je supprime mon commentaire" on public.comments for delete to authenticated
  using (author = auth.uid() or public.is_admin());

create table if not exists public.likes (
  post_id bigint not null references public.posts(id) on delete cascade,
  user_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  primary key (post_id, user_id)
);
alter table public.likes enable row level security;
drop policy if exists "likes visibles" on public.likes;
create policy "likes visibles" on public.likes for select to authenticated using (true);
drop policy if exists "j'aime" on public.likes;
create policy "j'aime" on public.likes for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "je n'aime plus" on public.likes;
create policy "je n'aime plus" on public.likes for delete to authenticated using (user_id = auth.uid());

-- ---------- Signalements et blocages ----------
create table if not exists public.reports (
  id bigint generated always as identity primary key,
  reporter uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  kind text not null check (kind in ('post', 'comment', 'message', 'profile', 'group')),
  target text not null,
  raison text check (char_length(raison) <= 500),
  extrait text check (char_length(extrait) <= 500),
  created_at timestamptz not null default now()
);
alter table public.reports enable row level security;
drop policy if exists "je signale" on public.reports;
create policy "je signale" on public.reports for insert to authenticated with check (reporter = auth.uid());
drop policy if exists "admin lit les signalements" on public.reports;
create policy "admin lit les signalements" on public.reports for select to authenticated using (public.is_admin());
drop policy if exists "admin traite les signalements" on public.reports;
create policy "admin traite les signalements" on public.reports for delete to authenticated using (public.is_admin());

create table if not exists public.blocks (
  blocker uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  blocked uuid not null references public.profiles(id) on delete cascade,
  primary key (blocker, blocked)
);
alter table public.blocks enable row level security;
drop policy if exists "mes blocages" on public.blocks;
create policy "mes blocages" on public.blocks for all to authenticated
  using (blocker = auth.uid()) with check (blocker = auth.uid());

-- ---------- Messages privés et groupes ----------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  is_group boolean not null default false,
  nom text check (char_length(nom) <= 50),
  description text check (char_length(description) <= 300),
  public boolean not null default false,
  created_by uuid default auth.uid() references public.profiles(id) on delete set null,
  last_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create table if not exists public.members (
  conv uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  last_read timestamptz not null default now(),
  joined_at timestamptz not null default now(),
  primary key (conv, user_id)
);
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  conv uuid not null references public.conversations(id) on delete cascade,
  author uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  texte text check (char_length(texte) <= 2000),
  photo text,
  created_at timestamptz not null default now(),
  check (texte is not null or photo is not null)
);
alter table public.conversations enable row level security;
alter table public.members enable row level security;
alter table public.messages enable row level security;

create or replace function public.is_member(c uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.members where conv = c and user_id = auth.uid())
$$;

drop policy if exists "conversations visibles" on public.conversations;
create policy "conversations visibles" on public.conversations for select to authenticated
  using (public.is_member(id) or (is_group and public) or public.is_admin());
drop policy if exists "je cree un groupe" on public.conversations;
create policy "je cree un groupe" on public.conversations for insert to authenticated
  with check (created_by = auth.uid() and is_group and not public.is_banned());
drop policy if exists "je modifie mon groupe" on public.conversations;
create policy "je modifie mon groupe" on public.conversations for update to authenticated
  using (created_by = auth.uid() or public.is_admin());
drop policy if exists "je supprime mon groupe" on public.conversations;
create policy "je supprime mon groupe" on public.conversations for delete to authenticated
  using (created_by = auth.uid() or public.is_admin());

drop policy if exists "membres visibles" on public.members;
create policy "membres visibles" on public.members for select to authenticated
  using (public.is_member(conv) or public.is_admin()
    or exists (select 1 from public.conversations c where c.id = conv and c.is_group and c.public));
drop policy if exists "je rejoins ou j'ajoute" on public.members;
create policy "je rejoins ou j'ajoute" on public.members for insert to authenticated
  with check (not public.is_banned() and exists (select 1 from public.conversations c where c.id = conv and c.is_group
    and ((c.public and user_id = auth.uid()) or c.created_by = auth.uid())));
drop policy if exists "je lis" on public.members;
create policy "je lis" on public.members for update to authenticated using (user_id = auth.uid());
drop policy if exists "je quitte ou je retire" on public.members;
create policy "je quitte ou je retire" on public.members for delete to authenticated
  using (user_id = auth.uid() or public.is_admin()
    or exists (select 1 from public.conversations c where c.id = conv and c.created_by = auth.uid()));

drop policy if exists "messages visibles" on public.messages;
create policy "messages visibles" on public.messages for select to authenticated
  using (public.is_member(conv) or public.is_admin());
drop policy if exists "j'ecris" on public.messages;
create policy "j'ecris" on public.messages for insert to authenticated
  with check (author = auth.uid() and public.is_member(conv) and not public.is_banned());
drop policy if exists "je supprime mon message" on public.messages;
create policy "je supprime mon message" on public.messages for delete to authenticated
  using (author = auth.uid() or public.is_admin());

-- la date du dernier message remonte la conversation en haut de la liste
create or replace function public.touch_conv() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update public.conversations set last_at = new.created_at where id = new.conv;
  return new;
end $$;
drop trigger if exists touch_conv on public.messages;
create trigger touch_conv after insert on public.messages for each row execute function public.touch_conv();

-- démarrer (ou retrouver) une discussion privée avec une autre maman
create or replace function public.start_dm(other uuid) returns uuid
language plpgsql security definer set search_path = public as $$
declare c uuid;
begin
  if auth.uid() is null or other = auth.uid() then raise exception 'impossible'; end if;
  if public.is_banned() then raise exception 'compte suspendu'; end if;
  if exists (select 1 from public.blocks where (blocker = other and blocked = auth.uid()) or (blocker = auth.uid() and blocked = other)) then
    raise exception 'bloque';
  end if;
  select m1.conv into c from public.members m1
    join public.members m2 on m2.conv = m1.conv and m2.user_id = other
    join public.conversations cv on cv.id = m1.conv and not cv.is_group
    where m1.user_id = auth.uid() limit 1;
  if c is null then
    insert into public.conversations (is_group, created_by) values (false, auth.uid()) returning id into c;
    insert into public.members (conv, user_id) values (c, auth.uid()), (c, other);
  end if;
  return c;
end $$;
grant execute on function public.start_dm(uuid) to authenticated;

-- créer un groupe et en devenir membre
create or replace function public.create_group(n text, d text, pub boolean) returns uuid
language plpgsql security definer set search_path = public as $$
declare c uuid;
begin
  if auth.uid() is null or public.is_banned() then raise exception 'impossible'; end if;
  insert into public.conversations (is_group, nom, description, public, created_by)
    values (true, left(n, 50), left(d, 300), pub, auth.uid()) returning id into c;
  insert into public.members (conv, user_id) values (c, auth.uid());
  return c;
end $$;
grant execute on function public.create_group(text, text, boolean) to authenticated;

-- ---------- Les mams près de chez moi (position jamais montrée aux autres) ----------
create table if not exists public.locations (
  user_id uuid primary key default auth.uid() references public.profiles(id) on delete cascade,
  lat double precision not null,
  lng double precision not null,
  visible boolean not null default true,
  updated_at timestamptz not null default now()
);
alter table public.locations enable row level security;
drop policy if exists "ma position" on public.locations;
create policy "ma position" on public.locations for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create or replace function public.nearby(max_km int default 25)
returns table (id uuid, pseudo text, ville text, enfants text, bio text, avatar text, km int)
language sql stable security definer set search_path = public as $$
  with me as (select lat, lng from public.locations where user_id = auth.uid())
  select p.id, p.pseudo, p.ville, p.enfants, p.bio, p.avatar,
    greatest(1, ceil(6371 * 2 * asin(sqrt(
      power(sin(radians(l.lat - me.lat) / 2), 2) +
      cos(radians(me.lat)) * cos(radians(l.lat)) * power(sin(radians(l.lng - me.lng) / 2), 2)))))::int as km
  from public.locations l
  join public.profiles p on p.id = l.user_id
  cross join me
  where l.visible and l.user_id <> auth.uid() and not p.banned
    and not exists (select 1 from public.blocks b where (b.blocker = auth.uid() and b.blocked = p.id) or (b.blocker = p.id and b.blocked = auth.uid()))
    and 6371 * 2 * asin(sqrt(
      power(sin(radians(l.lat - me.lat) / 2), 2) +
      cos(radians(me.lat)) * cos(radians(l.lat)) * power(sin(radians(l.lng - me.lng) / 2), 2))) <= max_km
  order by km
  limit 100
$$;
grant execute on function public.nearby(int) to authenticated;

-- ---------- Supprimer mon compte (et toutes mes données) ----------
create or replace function public.delete_me() returns void
language plpgsql security definer set search_path = public, auth as $$
begin
  delete from auth.users where id = auth.uid();
end $$;
grant execute on function public.delete_me() to authenticated;

-- ---------- Photos ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', true, 3145728, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;
drop policy if exists "mams envoient leurs photos" on storage.objects;
create policy "mams envoient leurs photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text and not public.is_banned());
drop policy if exists "mams suppriment leurs photos" on storage.objects;
create policy "mams suppriment leurs photos" on storage.objects for delete to authenticated
  using (bucket_id = 'photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

-- ---------- Temps réel (messages qui arrivent tout seuls) ----------
do $$ begin
  begin alter publication supabase_realtime add table public.messages; exception when others then null; end;
  begin alter publication supabase_realtime add table public.posts; exception when others then null; end;
end $$;

-- Fini ! Mams peut maintenant utiliser la communauté.
