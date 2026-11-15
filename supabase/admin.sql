-- Mams : te donner les droits d'administratrice (modération).
-- À lancer dans Supabase > SQL Editor > New query > Run.
create or replace function public.protect_profile() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.is_admin := old.is_admin;
    new.banned := old.banned;
  end if;
  return new;
end $$;
-- la toute première inscrite (toi) devient administratrice
update public.profiles set is_admin = true
where id = (select id from auth.users order by created_at limit 1);
