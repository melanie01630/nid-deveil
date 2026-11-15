-- Mams : te donner les droits d'administratrice (modération).
-- 1) Inscris-toi d'abord dans l'appli (onglet Communauté).
-- 2) Remplace TON_EMAIL par l'adresse e-mail de ton compte Mams, puis « Run ».
update public.profiles set is_admin = true
where id = (select id from auth.users where email = 'TON_EMAIL');
