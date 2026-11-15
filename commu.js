/* Mams · Communauté des mams (étape 1) : comptes, profils, salon des mams, signalements, blocages, modération.
   Données stockées sur Supabase (hébergé en Europe). La bibliothèque Supabase n'est chargée que quand on ouvre la communauté. */
(function () {
'use strict';
const SB_URL = 'https://iygssfkbxqgzbvyhfvvl.supabase.co';
const SB_KEY = 'sb_publishable_KG09sCh-1rGnUJENu4pVUg_SLjxAvrO';
const LIB = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
const CATS = ['Expérience', 'Activité', 'Astuce', 'Question', 'Recette', 'Sortie', 'Coup de cœur'];
const CAT_E = { 'Expérience': '💬', 'Activité': '🎨', 'Astuce': '💡', 'Question': '❓', 'Recette': '🍳', 'Sortie': '🌳', 'Coup de cœur': '❤️' };
const BAD = ['connard', 'connasse', 'salope', 'pute', 'putain', 'enculé', 'encule', 'batard', 'bâtard', 'fdp', 'ntm', 'nique', 'pd', 'pédé', 'tapette', 'bougnoul', 'négro', 'negro', 'youpin', 'bitch', 'fuck', 'whore', 'slut'];

let sb = null, me = null, prof = null, blocked = new Set(), libFail = false, recovering = false;
const N = { tab: 'salon', posts: [], page: 0, more: true, cat: 'Tout', likes: {}, myLikes: new Set(), comments: {}, fresh: false, mode: 'signup', busy: false };

/* ---------- Outils ---------- */
const $n = () => document.querySelector('#net');
const ago = (d) => { const s = (Date.now() - new Date(d)) / 1000; if (s < 60) return "à l'instant"; if (s < 3600) return 'il y a ' + Math.floor(s / 60) + ' min'; if (s < 86400) return 'il y a ' + Math.floor(s / 3600) + ' h'; if (s < 7 * 86400) return 'il y a ' + Math.floor(s / 86400) + ' j'; return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }); };
const rude = (t) => { const x = ' ' + (t || '').toLowerCase().replace(/[^a-zàâäéèêëïîôöùûüç0-9]+/g, ' ') + ' '; return BAD.some(w => x.includes(' ' + w + ' ')); };
const avatar = (p, size) => p && p.avatar ? `<img class="nav-av" src="${esc(p.avatar)}" alt="" style="width:${size}px;height:${size}px">` : `<span class="nav-av" style="width:${size}px;height:${size}px;font-size:${Math.round(size * .42)}px">${esc(((p && p.pseudo) || '?').slice(0, 1).toUpperCase())}</span>`;
const err = (e) => { const m = (e && (e.message || e.error_description)) || ''; if (/Invalid login/i.test(m)) return 'E-mail ou mot de passe incorrect.'; if (/already registered|already exists/i.test(m)) return 'Un compte existe déjà avec cet e-mail. Connecte-toi.'; if (/Password should be/i.test(m)) return 'Le mot de passe doit faire au moins 6 caractères.'; if (/Email not confirmed/i.test(m)) return "Confirme d'abord ton e-mail (regarde dans ta boîte de réception et tes spams)."; if (/rate limit|too many/i.test(m)) return 'Trop de tentatives. Réessaie dans quelques minutes.'; if (/Failed to fetch|NetworkError/i.test(m)) return 'Pas de connexion Internet.'; return 'Oups, une erreur : ' + m; };

function loadLib() {
  return new Promise((res, rej) => {
    if (window.supabase && window.supabase.createClient) return res();
    const s = document.createElement('script'); s.src = LIB; s.onload = res; s.onerror = rej; document.head.appendChild(s);
  });
}
async function client() {
  if (sb) return sb;
  await loadLib();
  sb = window.supabase.createClient(SB_URL, SB_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  sb.auth.onAuthStateChange((ev, session) => {
    me = session ? session.user : null;
    if (ev === 'PASSWORD_RECOVERY') { recovering = true; window.showTab && showTab('commu'); }
    if (ev === 'SIGNED_IN' || ev === 'SIGNED_OUT') { prof = null; if (visible()) render(); }
  });
  const { data } = await sb.auth.getSession(); me = data.session ? data.session.user : null;
  return sb;
}
const visible = () => { const v = $('#view-commu'); return v && v.classList.contains('active'); };

async function loadProfile() {
  if (!me) return null;
  let { data } = await sb.from('profiles').select('*').eq('id', me.id).maybeSingle();
  if (!data) {
    const pseudo = (me.user_metadata && me.user_metadata.pseudo) || 'Maman';
    await sb.from('profiles').insert({ id: me.id, pseudo: pseudo.length >= 2 ? pseudo.slice(0, 24) : 'Maman' });
    ({ data } = await sb.from('profiles').select('*').eq('id', me.id).maybeSingle());
  }
  const b = await sb.from('blocks').select('blocked'); blocked = new Set((b.data || []).map(x => x.blocked));
  return data;
}

/* ---------- Écran principal ---------- */
async function render() {
  const el = $n(); if (!el) return;
  if (!sb) { el.innerHTML = '<div class="net-wait">🌸 Connexion à la communauté…</div>'; try { await client(); } catch (e) { libFail = true; } }
  if (libFail) { el.innerHTML = `<div class="panel net-card"><b>Pas de connexion</b><p class="sub">La communauté a besoin d'Internet. Vérifie ta connexion, puis réessaie.</p><button class="btn" id="net-retry">Réessayer</button></div>`; $('#net-retry').onclick = () => { libFail = false; sb = null; render(); }; return; }
  if (recovering && me) return renderRecover();
  if (!me) return renderWelcome();
  if (!prof) { el.innerHTML = '<div class="net-wait">🌸 Chargement de ton profil…</div>'; prof = await loadProfile(); }
  if (!prof) { el.innerHTML = '<div class="panel net-card"><b>Profil introuvable</b><p class="sub">Déconnecte-toi puis reconnecte-toi.</p><button class="btn alt" id="net-out">Se déconnecter</button></div>'; $('#net-out').onclick = () => sb.auth.signOut(); return; }
  if (prof.banned) { el.innerHTML = `<div class="panel net-card"><b>Compte suspendu</b><p class="sub">Ton compte a été suspendu pour non-respect des règles de la communauté. Tu peux toujours utiliser le reste de Mams.</p><button class="btn alt" id="net-out">Se déconnecter</button></div>`; $('#net-out').onclick = () => sb.auth.signOut(); return; }
  const tabs = [['salon', '🏡', 'Le salon'], ['msg', '💬', 'Messages'], ['grp', '👥', 'Groupes'], ['near', '📍', 'Près de moi'], ['moi', '👤', 'Mon profil']];
  el.innerHTML = `<div class="net-head">${avatar(prof, 44)}<div><b>Coucou ${esc(prof.pseudo)} !</b><span>${prof.is_admin ? '🛡️ Administratrice' : 'Membre de la communauté'}</span></div></div>
    <div class="net-tabs">${tabs.map(([k, e, l]) => `<button class="${N.tab === k ? 'on' : ''}" data-nt="${k}"><span>${e}</span>${esc(l)}</button>`).join('')}</div>
    <div id="net-body"></div>`;
  $$('[data-nt]', el).forEach(b => b.onclick = () => { N.tab = b.dataset.nt; render(); });
  const body = $('#net-body');
  if (N.tab === 'salon') return renderSalon(body);
  if (N.tab === 'moi') return renderMoi(body);
  body.innerHTML = `<div class="panel net-card"><b>${N.tab === 'msg' ? '💬 Messages privés' : N.tab === 'grp' ? '👥 Groupes' : '📍 Les mams près de chez moi'}</b><p class="sub">${N.tab === 'msg' ? 'Bientôt : discuter en privé avec une autre maman, comme sur WhatsApp.' : N.tab === 'grp' ? 'Bientôt : créer ou rejoindre des groupes (par ville, par âge des enfants, par passion…).' : "Bientôt : trouver des mamans près de chez toi, seulement celles qui l'acceptent, avec une distance approximative."}</p><p class="sub">C'est la prochaine étape, on y travaille ! 🛠️</p></div>`;
}

/* ---------- Inscription / connexion ---------- */
function renderWelcome() {
  const el = $n(); const up = N.mode === 'signup', reset = N.mode === 'reset';
  el.innerHTML = `<div class="panel net-card net-hero"><div class="net-big">👭</div><b>Rejoins la communauté des mams</b>
      <p class="sub">Partage tes idées et tes expériences dans le salon, discute avec d'autres mamans, crée des groupes et fais des rencontres près de chez toi. Tout est facultatif : tu partages seulement ce que tu veux.</p></div>
    <div class="panel net-card">
      <div class="net-sw"><button class="${up ? 'on' : ''}" data-nm="signup">Je m'inscris</button><button class="${!up ? 'on' : ''}" data-nm="login">J'ai un compte</button></div>
      ${up ? `<label class="sub">Pseudo (ce que les autres verront)</label><input class="input" id="nf-pseudo" maxlength="24" placeholder="ex : Maman de Léo">` : ''}
      <label class="sub">E-mail</label><input class="input" id="nf-mail" type="email" autocomplete="email" placeholder="ton@email.fr">
      ${reset ? '' : `<label class="sub">Mot de passe ${up ? '(6 caractères minimum)' : ''}</label><input class="input" id="nf-pass" type="password" autocomplete="${up ? 'new-password' : 'current-password'}">`}
      ${up ? `<label class="net-check"><input type="checkbox" id="nf-ok"><span>J'ai <b>18 ans ou plus</b> et j'accepte <a href="#" id="nf-rules">les règles de la communauté</a>.</span></label>` : ''}
      <button class="btn" id="nf-go">${up ? "Créer mon compte" : reset ? 'Recevoir un lien par e-mail' : 'Me connecter'}</button>
      ${!up && !reset ? '<button class="net-link" id="nf-forgot">Mot de passe oublié ?</button>' : ''}
      ${reset ? '<button class="net-link" data-nm="login">← Retour</button>' : ''}
      <p class="net-msg" id="nf-msg"></p>
    </div>
    ${rulesPanel()}`;
  $$('[data-nm]', el).forEach(b => b.onclick = () => { N.mode = b.dataset.nm; renderWelcome(); });
  const fg = $('#nf-forgot'); if (fg) fg.onclick = () => { N.mode = 'reset'; renderWelcome(); };
  const rl = $('#nf-rules'); if (rl) rl.onclick = (e) => { e.preventDefault(); $('.net-rules').scrollIntoView({ behavior: 'smooth' }); };
  $('#nf-go').onclick = async () => {
    const msg = $('#nf-msg'); const mail = ($('#nf-mail').value || '').trim(); const pass = $('#nf-pass') ? $('#nf-pass').value : '';
    const say = (t, ok) => { msg.textContent = t; msg.className = 'net-msg ' + (ok ? 'ok' : 'ko'); };
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) return say('Écris une adresse e-mail valide.');
    if (N.busy) return; N.busy = true;
    try {
      const redirect = location.origin + location.pathname;
      if (reset) { const { error } = await sb.auth.resetPasswordForEmail(mail, { redirectTo: redirect }); if (error) throw error; say('Si un compte existe, un e-mail vient de partir. Pense à regarder dans tes spams.', true); }
      else if (up) {
        const pseudo = ($('#nf-pseudo').value || '').trim();
        if (pseudo.length < 2) throw { message: '' , mine: 'Choisis un pseudo (2 caractères minimum).' };
        if (rude(pseudo)) throw { mine: 'Choisis un autre pseudo, plus gentil 🙂' };
        if (pass.length < 6) throw { mine: 'Le mot de passe doit faire au moins 6 caractères.' };
        if (!$('#nf-ok').checked) throw { mine: "Coche la case : tu dois avoir 18 ans ou plus et accepter les règles." };
        const { data, error } = await sb.auth.signUp({ email: mail, password: pass, options: { data: { pseudo }, emailRedirectTo: redirect } });
        if (error) throw error;
        if (!data.session) say('Presque fini ! Un e-mail de confirmation vient de partir : touche le lien qu\'il contient (pense à regarder dans tes spams).', true);
      } else {
        const { error } = await sb.auth.signInWithPassword({ email: mail, password: pass }); if (error) throw error;
      }
    } catch (e) { say(e.mine || err(e)); }
    N.busy = false;
  };
}
function renderRecover() {
  $n().innerHTML = `<div class="panel net-card"><b>Choisis un nouveau mot de passe</b><input class="input" id="nr-pass" type="password" autocomplete="new-password" placeholder="6 caractères minimum"><button class="btn" id="nr-go">Enregistrer</button><p class="net-msg" id="nr-msg"></p></div>`;
  $('#nr-go').onclick = async () => {
    const p = $('#nr-pass').value; if (p.length < 6) { $('#nr-msg').textContent = 'Au moins 6 caractères.'; return; }
    const { error } = await sb.auth.updateUser({ password: p });
    if (error) { $('#nr-msg').textContent = err(error); return; }
    recovering = false; toast('Mot de passe changé ✅'); render();
  };
}
const rulesPanel = () => `<div class="panel net-card net-rules"><b>🌸 Les règles de la communauté</b>
  <ul class="net-ul">
    <li><b>Bienveillance avant tout</b> : pas d'insulte, pas de moquerie, pas de jugement.</li>
    <li><b>Réservé aux adultes</b> (18 ans et plus).</li>
    <li><b>Pas de photo d'enfant</b> sans l'accord de ses parents, et jamais d'enfant reconnaissable en tenue légère.</li>
    <li><b>Ta sécurité</b> : ne donne jamais ton adresse. Pour une rencontre, retrouvez-vous dans un lieu public.</li>
    <li><b>Pas de publicité</b>, d'arnaque, de demande d'argent, ni de contenu illégal.</li>
    <li>Un message te gêne ? <b>Signale-le</b> ou <b>bloque</b> la personne : on s'en occupe.</li>
  </ul><p class="sub">Les comptes qui ne respectent pas ces règles peuvent être suspendus.</p></div>`;

/* ---------- Le salon ---------- */
async function fetchPosts(reset) {
  if (reset) { N.posts = []; N.page = 0; N.more = true; }
  let q = sb.from('posts').select('id,texte,photo,categorie,created_at,author,profiles(pseudo,ville,avatar)').order('created_at', { ascending: false }).range(N.page * 20, N.page * 20 + 19);
  if (N.cat !== 'Tout') q = q.eq('categorie', N.cat);
  const { data, error } = await q; if (error) { toast(err(error)); return; }
  N.more = (data || []).length === 20; N.page++;
  const fresh = (data || []).filter(p => !blocked.has(p.author));
  N.posts = N.posts.concat(fresh);
  const ids = fresh.map(p => p.id); if (!ids.length) return;
  const [lk, cm] = await Promise.all([sb.from('likes').select('post_id,user_id').in('post_id', ids), sb.from('comments').select('post_id').in('post_id', ids)]);
  ids.forEach(i => { N.likes[i] = 0; N.comments[i] = 0; });
  (lk.data || []).forEach(l => { N.likes[l.post_id]++; if (l.user_id === me.id) N.myLikes.add(l.post_id); });
  (cm.data || []).forEach(c => N.comments[c.post_id]++);
}
async function renderSalon(body) {
  body.innerHTML = `<div class="panel net-card net-compose">
      <textarea class="input" id="ns-txt" maxlength="2000" rows="3" placeholder="Partage une expérience, une activité, une astuce, une question…"></textarea>
      <div class="net-chips">${CATS.map(c => `<button class="${N.newCat === c ? 'on' : ''}" data-nc="${esc(c)}">${CAT_E[c]} ${esc(c)}</button>`).join('')}</div>
      <div class="net-row"><label class="btn alt small net-photo">📷 Photo<input type="file" id="ns-ph" accept="image/*" hidden></label><span class="sub" id="ns-phn"></span><button class="btn small" id="ns-go">Publier</button></div>
    </div>
    <div class="net-chips net-filter">${['Tout'].concat(CATS).map(c => `<button class="${N.cat === c ? 'on' : ''}" data-nf="${esc(c)}">${c === 'Tout' ? '🌈' : CAT_E[c]} ${esc(c)}</button>`).join('')}</div>
    ${N.fresh ? '<button class="btn alt" id="ns-fresh">✨ Nouvelles publications : toucher pour voir</button>' : ''}
    <div id="ns-list"><div class="net-wait">Chargement du salon…</div></div>`;
  let file = null;
  $$('[data-nc]', body).forEach(b => b.onclick = () => { N.newCat = N.newCat === b.dataset.nc ? null : b.dataset.nc; $$('[data-nc]', body).forEach(x => x.classList.toggle('on', x.dataset.nc === N.newCat)); });
  $$('[data-nf]', body).forEach(b => b.onclick = async () => { N.cat = b.dataset.nf; await fetchPosts(true); renderSalon(body); });
  $('#ns-ph').onchange = (e) => { file = e.target.files[0] || null; $('#ns-phn').textContent = file ? '1 photo ajoutée ✓' : ''; };
  const fr = $('#ns-fresh'); if (fr) fr.onclick = async () => { N.fresh = false; await fetchPosts(true); renderSalon(body); };
  $('#ns-go').onclick = async () => {
    const t = $('#ns-txt').value.trim();
    if (!t) return toast('Écris quelque chose avant de publier 🙂');
    if (rude(t)) return toast('Ton message contient un mot interdit. Reformule-le gentiment 🙂');
    if (N.busy) return; N.busy = true; $('#ns-go').textContent = 'Envoi…';
    try {
      let photo = null; if (file) photo = await upload(file, 1280);
      const { error } = await sb.from('posts').insert({ texte: t, categorie: N.newCat || null, photo });
      if (error) throw error;
      N.newCat = null; toast('Publié ✅'); await fetchPosts(true); renderSalon(body);
      window.addPts && addPts(2, 'publication dans le salon');
    } catch (e) { toast(err(e)); $('#ns-go').textContent = 'Publier'; }
    N.busy = false;
  };
  if (!N.posts.length) await fetchPosts(true);
  drawPosts();
}
function drawPosts() {
  const L = $('#ns-list'); if (!L) return;
  if (!N.posts.length) { L.innerHTML = '<div class="panel net-card"><p class="sub" style="margin:0">Le salon est encore vide. Sois la première à partager quelque chose ! 🌸</p></div>'; return; }
  L.innerHTML = N.posts.map(p => `<article class="net-post" data-pid="${p.id}">
      <header>${avatar(p.profiles, 38)}<div><b>${esc((p.profiles && p.profiles.pseudo) || 'Maman')}</b><span>${p.profiles && p.profiles.ville ? esc(p.profiles.ville) + ' · ' : ''}${ago(p.created_at)}</span></div><button class="net-more" data-pm="${p.id}" aria-label="Options">⋯</button></header>
      ${p.categorie ? `<i class="net-cat">${CAT_E[p.categorie] || ''} ${esc(p.categorie)}</i>` : ''}
      <p>${esc(p.texte).replace(/\n/g, '<br>')}</p>
      ${p.photo ? `<img class="net-img" src="${esc(p.photo)}" alt="" loading="lazy">` : ''}
      <footer><button class="${N.myLikes.has(p.id) ? 'on' : ''}" data-pl="${p.id}">${N.myLikes.has(p.id) ? '❤️' : '🤍'} ${N.likes[p.id] || 0}</button><button data-pc="${p.id}">💬 ${N.comments[p.id] || 0}</button></footer>
    </article>`).join('') + (N.more ? '<button class="btn alt" id="ns-more">Voir plus</button>' : '');
  $$('[data-pl]', L).forEach(b => b.onclick = () => like(+b.dataset.pl));
  $$('[data-pc]', L).forEach(b => b.onclick = () => openComments(+b.dataset.pc));
  $$('[data-pm]', L).forEach(b => b.onclick = () => postMenu(+b.dataset.pm));
  const mo = $('#ns-more'); if (mo) mo.onclick = async () => { mo.textContent = 'Chargement…'; await fetchPosts(false); drawPosts(); };
}
async function like(id) {
  const on = N.myLikes.has(id);
  if (on) { N.myLikes.delete(id); N.likes[id]--; drawPosts(); await sb.from('likes').delete().eq('post_id', id).eq('user_id', me.id); }
  else { N.myLikes.add(id); N.likes[id] = (N.likes[id] || 0) + 1; drawPosts(); await sb.from('likes').insert({ post_id: id }); }
}
async function openComments(id) {
  const p = N.posts.find(x => x.id === id); if (!p) return;
  openSheet(`<div class="kicker">💬 Commentaires</div><p class="sub" style="margin:6px 0 10px">${esc(p.texte.slice(0, 140))}${p.texte.length > 140 ? '…' : ''}</p><div id="nc-list"><div class="net-wait">Chargement…</div></div>
    <div class="net-row" style="margin-top:12px"><input class="input" id="nc-txt" maxlength="1000" placeholder="Écris un commentaire gentil…"><button class="btn small" id="nc-go">Envoyer</button></div>`);
  const draw = async () => {
    const { data } = await sb.from('comments').select('id,texte,created_at,author,profiles(pseudo,avatar)').eq('post_id', id).order('created_at');
    const list = (data || []).filter(c => !blocked.has(c.author)); N.comments[id] = list.length;
    $('#nc-list').innerHTML = list.map(c => `<div class="net-com">${avatar(c.profiles, 30)}<div><b>${esc((c.profiles && c.profiles.pseudo) || 'Maman')}</b> <span>${ago(c.created_at)}</span><p>${esc(c.texte)}</p>
      <div class="net-cact">${c.author === me.id || prof.is_admin ? `<button data-cd="${c.id}">Supprimer</button>` : ''}${c.author !== me.id ? `<button data-cr="${c.id}" data-ca="${c.author}">Signaler</button>` : ''}</div></div></div>`).join('') || '<p class="sub">Pas encore de commentaire. Lance la discussion !</p>';
    $$('[data-cd]').forEach(b => b.onclick = async () => { await sb.from('comments').delete().eq('id', b.dataset.cd); draw(); drawPosts(); });
    $$('[data-cr]').forEach(b => b.onclick = () => report('comment', b.dataset.cr, b.dataset.ca, (list.find(c => String(c.id) === b.dataset.cr) || {}).texte));
  };
  $('#nc-go').onclick = async () => {
    const t = $('#nc-txt').value.trim(); if (!t) return;
    if (rude(t)) return toast('Ton commentaire contient un mot interdit 🙂');
    const { error } = await sb.from('comments').insert({ post_id: id, texte: t });
    if (error) return toast(err(error));
    $('#nc-txt').value = ''; await draw(); drawPosts();
  };
  draw();
}
function postMenu(id) {
  const p = N.posts.find(x => x.id === id); if (!p) return;
  const mine = p.author === me.id;
  openSheet(`<div class="kicker">Options</div><div class="net-menu">
    ${!mine ? `<button data-mx="dm">✉️ Écrire en privé à ${esc((p.profiles && p.profiles.pseudo) || 'cette maman')}</button>` : ''}
    ${!mine ? '<button data-mx="report">🚩 Signaler cette publication</button>' : ''}
    ${!mine ? '<button data-mx="block">🚫 Bloquer cette maman</button>' : ''}
    ${mine || prof.is_admin ? '<button data-mx="del" class="danger">🗑️ Supprimer la publication</button>' : ''}
    ${prof.is_admin && !mine ? '<button data-mx="ban" class="danger">⛔ Suspendre ce compte</button>' : ''}
  </div>`);
  $$('[data-mx]').forEach(b => b.onclick = async () => {
    const a = b.dataset.mx;
    if (a === 'dm') { closeSheet(); toast('Les messages privés arrivent très bientôt 💬'); }
    if (a === 'report') report('post', id, p.author, p.texte);
    if (a === 'block') { await block(p.author); }
    if (a === 'del') { const { error } = await sb.from('posts').delete().eq('id', id); if (error) return toast(err(error)); closeSheet(); N.posts = N.posts.filter(x => x.id !== id); drawPosts(); toast('Supprimé'); }
    if (a === 'ban') { await ban(p.author); }
  });
}
async function block(uid) {
  const { error } = await sb.from('blocks').insert({ blocked: uid });
  if (error && !/duplicate/i.test(error.message)) return toast(err(error));
  blocked.add(uid); N.posts = N.posts.filter(x => x.author !== uid); closeSheet(); drawPosts();
  toast("Cette maman est bloquée : tu ne verras plus ses messages.");
}
async function ban(uid) {
  const { error } = await sb.from('profiles').update({ banned: true }).eq('id', uid);
  if (error) return toast(err(error)); closeSheet(); toast('Compte suspendu ⛔');
}
function report(kind, target, author, extrait) {
  openSheet(`<div class="kicker">🚩 Signaler</div><h3 style="margin-top:4px">Qu'est-ce qui ne va pas ?</h3>
    <div class="net-menu">${['Insulte ou harcèlement', 'Contenu choquant', 'Photo d\'enfant inappropriée', 'Arnaque ou publicité', 'Fausse information dangereuse', 'Autre'].map(r => `<button data-rr="${esc(r)}">${esc(r)}</button>`).join('')}</div>`);
  $$('[data-rr]').forEach(b => b.onclick = async () => {
    const { error } = await sb.from('reports').insert({ kind, target: String(target) + '|' + (author || ''), raison: b.dataset.rr, extrait: (extrait || '').slice(0, 500) });
    if (error) return toast(err(error));
    closeSheet(); toast('Merci, ton signalement a été envoyé 🙏');
  });
}

/* ---------- Mon profil ---------- */
function renderMoi(body) {
  body.innerHTML = `<div class="panel net-card">
      <div class="net-avbox">${avatar(prof, 72)}<label class="btn alt small">📷 Changer ma photo<input type="file" id="nm-av" accept="image/*" hidden></label></div>
      <label class="sub">Pseudo</label><input class="input" id="nm-pseudo" maxlength="24" value="${esc(prof.pseudo || '')}">
      <label class="sub">Ville (facultatif)</label><input class="input" id="nm-ville" maxlength="60" value="${esc(prof.ville || '')}">
      <label class="sub">Âge de mes enfants (facultatif)</label><input class="input" id="nm-enf" maxlength="80" placeholder="ex : 2 ans et 6 ans" value="${esc(prof.enfants || '')}">
      <label class="sub">Quelques mots sur moi (facultatif)</label><textarea class="input" id="nm-bio" maxlength="300" rows="3" placeholder="ex : maman de deux filles, fan de bricolage et de sorties au parc">${esc(prof.bio || '')}</textarea>
      <button class="btn" id="nm-save">Enregistrer</button>
    </div>
    ${prof.is_admin ? '<button class="btn" id="nm-mod" style="margin-top:12px">🛡️ Modération : voir les signalements</button>' : ''}
    ${rulesPanel()}
    <div class="panel net-card"><button class="btn alt" id="nm-out">Se déconnecter</button><button class="net-link danger" id="nm-del">Supprimer mon compte et toutes mes données</button></div>`;
  $('#nm-av').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; try { const url = await upload(f, 400); const { error } = await sb.from('profiles').update({ avatar: url }).eq('id', me.id); if (error) throw error; prof.avatar = url; toast('Photo mise à jour ✅'); render(); } catch (x) { toast(err(x)); } };
  $('#nm-save').onclick = async () => {
    const v = { pseudo: $('#nm-pseudo').value.trim(), ville: $('#nm-ville').value.trim() || null, enfants: $('#nm-enf').value.trim() || null, bio: $('#nm-bio').value.trim() || null };
    if (v.pseudo.length < 2) return toast('Ton pseudo doit faire au moins 2 caractères');
    if (rude(v.pseudo + ' ' + (v.bio || ''))) return toast('Un mot n\'est pas autorisé, reformule gentiment 🙂');
    const { error } = await sb.from('profiles').update(v).eq('id', me.id); if (error) return toast(err(error));
    Object.assign(prof, v); toast('Profil enregistré ✅'); render();
  };
  const mod = $('#nm-mod'); if (mod) mod.onclick = moderation;
  $('#nm-out').onclick = async () => { await sb.auth.signOut(); me = null; prof = null; N.posts = []; render(); };
  $('#nm-del').onclick = () => {
    openSheet(`<div class="kicker">Supprimer mon compte</div><h3 style="margin-top:4px">Tu es sûre ?</h3><p class="sub">Ton profil, tes publications, tes commentaires et tes messages seront supprimés définitivement. Le reste de Mams restera sur ton téléphone.</p>
      <label class="sub">Écris SUPPRIMER pour confirmer</label><input class="input" id="nd-ok"><button class="btn danger-btn" id="nd-go">Supprimer définitivement</button>`);
    $('#nd-go').onclick = async () => {
      if ($('#nd-ok').value.trim().toUpperCase() !== 'SUPPRIMER') return toast('Écris SUPPRIMER pour confirmer');
      try { const { data } = await sb.storage.from('photos').list(me.id); if (data && data.length) await sb.storage.from('photos').remove(data.map(f => me.id + '/' + f.name)); } catch (e) { }
      const { error } = await sb.rpc('delete_me'); if (error) return toast(err(error));
      await sb.auth.signOut(); me = null; prof = null; closeSheet(); toast('Ton compte a été supprimé. Au revoir 💐'); render();
    };
  };
}

/* ---------- Modération (administratrice) ---------- */
async function moderation() {
  openSheet('<div class="kicker">🛡️ Modération</div><div id="nmod"><div class="net-wait">Chargement…</div></div>');
  const draw = async () => {
    const { data, error } = await sb.from('reports').select('*').order('created_at', { ascending: false }).limit(100);
    if (error) { $('#nmod').innerHTML = '<p class="sub">' + esc(err(error)) + '</p>'; return; }
    $('#nmod').innerHTML = (data || []).map(r => { const [tid, aid] = String(r.target).split('|'); return `<div class="net-rep"><b>${esc(r.raison || '')}</b> <span>· ${esc(r.kind)} · ${ago(r.created_at)}</span><p>« ${esc(r.extrait || '')} »</p>
      <div class="net-cact"><button data-rd="${r.id}" data-rk="${esc(r.kind)}" data-rt="${esc(tid)}">🗑️ Supprimer le contenu</button>${aid ? `<button data-rb="${esc(aid)}" data-ri="${r.id}">⛔ Suspendre l'auteur</button>` : ''}<button data-rx="${r.id}">✓ Ignorer</button></div></div>`; }).join('') || '<p class="sub">Aucun signalement. Tout va bien 🌸</p>';
    $$('[data-rd]').forEach(b => b.onclick = async () => { const t = { post: 'posts', comment: 'comments', message: 'messages' }[b.dataset.rk]; if (t) await sb.from(t).delete().eq('id', b.dataset.rt); await sb.from('reports').delete().eq('id', b.dataset.rd); toast('Contenu supprimé'); N.posts = []; draw(); });
    $$('[data-rb]').forEach(b => b.onclick = async () => { await sb.from('profiles').update({ banned: true }).eq('id', b.dataset.rb); await sb.from('reports').delete().eq('id', b.dataset.ri); toast('Compte suspendu ⛔'); draw(); });
    $$('[data-rx]').forEach(b => b.onclick = async () => { await sb.from('reports').delete().eq('id', b.dataset.rx); draw(); });
  };
  draw();
}

/* ---------- Photos : réduites sur le téléphone avant l'envoi ---------- */
function shrink(file, max) {
  return new Promise((res, rej) => {
    const img = new Image(); const u = URL.createObjectURL(file);
    img.onload = () => { const k = Math.min(1, max / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(u); c.toBlob(b => b ? res(b) : rej(new Error('photo')), 'image/jpeg', .82); };
    img.onerror = () => rej(new Error('Photo illisible')); img.src = u;
  });
}
async function upload(file, max) {
  const blob = await shrink(file, max);
  const path = me.id + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.jpg';
  const { error } = await sb.storage.from('photos').upload(path, blob, { contentType: 'image/jpeg', upsert: false });
  if (error) throw error;
  return sb.storage.from('photos').getPublicUrl(path).data.publicUrl;
}

/* ---------- Mise en place ---------- */
function mount() {
  const v = $('#view-commu'); if (!v) return;
  v.innerHTML = '<h2 class="h2">Communauté des mams</h2><div id="net"></div>';
  const _show = window.showTab;
  window.showTab = showTab = function (t) { _show(t); if (t === 'commu') render(); };
  // retour depuis un lien reçu par e-mail (confirmation, mot de passe oublié)
  if (/access_token|type=recovery|type=signup|code=/.test(location.hash + location.search)) client().then(() => { history.replaceState(null, '', location.pathname); showTab('commu'); }).catch(() => { });
}
const st = document.createElement('style');
st.textContent = `
.net-wait{padding:30px 10px;text-align:center;opacity:.7}
.net-card{border-radius:32px!important;margin-top:12px}
.net-card .input,#net .input{width:100%;box-sizing:border-box;padding:13px 16px;border-radius:22px;border:1.5px solid rgba(255,255,255,.95);background:rgba(255,255,255,.75);font:inherit;margin:6px 0 12px}
.net-hero{text-align:center}.net-big{font-size:46px}
.net-sw{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px}.net-sw button{padding:12px;border-radius:999px;border:1.5px solid #fff;background:rgba(255,255,255,.6);font-weight:700;color:var(--ink)}.net-sw button.on{background:linear-gradient(180deg,#A84A72,#5B1D3A);color:#fff}
.net-check{display:flex;gap:10px;align-items:flex-start;font-size:14px;margin:4px 0 14px}.net-check input{margin-top:3px;width:20px;height:20px}
.net-link{display:block;margin:12px auto 0;background:none;border:0;color:#7A2C4E;text-decoration:underline;font:inherit;font-size:14px}.net-link.danger{color:#B3261E}
.net-msg{font-size:14px;margin:10px 0 0}.net-msg.ok{color:#2F7A4A}.net-msg.ko{color:#B3261E}
.net-ul{padding-left:18px;margin:8px 0}.net-ul li{margin:0 0 6px;font-size:14px}
.net-head{display:flex;align-items:center;gap:12px;margin:6px 0 12px}.net-head b{display:block;font-size:17px}.net-head span{font-size:12.5px;opacity:.7}
.nav-av{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;object-fit:cover;flex:none;font-weight:700;color:#fff;background:linear-gradient(160deg,#E58FB0,#8EC5E8);border:2px solid #fff}
.net-tabs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:2px 0 8px}.net-tabs::-webkit-scrollbar{display:none}
.net-tabs button{flex:none;display:flex;flex-direction:column;align-items:center;gap:2px;padding:9px 14px;border-radius:999px;border:1.5px solid #fff;background:rgba(255,255,255,.6);font-size:11.5px;font-weight:600;color:var(--ink)}.net-tabs button span{font-size:19px}.net-tabs button.on{background:linear-gradient(180deg,#A84A72,#5B1D3A);color:#fff}
.net-chips{display:flex;gap:6px;flex-wrap:wrap;margin:2px 0 10px}.net-chips button{padding:7px 12px;border-radius:999px;border:1.5px solid #fff;background:rgba(255,255,255,.55);font-size:12.5px;color:var(--ink)}.net-chips button.on{background:#7A2C4E;color:#fff}
.net-filter{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin-top:14px}.net-filter button{flex:none}
.net-row{display:flex;gap:8px;align-items:center}.net-row .input{margin:0!important;flex:1}.net-row .btn{width:auto;flex:none;padding:10px 18px}.net-photo{cursor:pointer}
#ns-go{margin-left:auto}
.net-post{margin:12px 0;padding:16px 18px;border-radius:32px;background:radial-gradient(ellipse at 12% 8%,rgba(255,255,255,.95) 0 6%,rgba(255,255,255,0) 26%),rgba(255,255,255,.72);border:1.5px solid #fff;box-shadow:0 8px 18px -14px rgba(60,30,60,.6)}
.net-post header{display:flex;align-items:center;gap:10px}.net-post header b{display:block;font-size:15px}.net-post header span{font-size:12px;opacity:.65}.net-post header div{flex:1;min-width:0}
.net-more{background:none;border:0;font-size:22px;padding:4px 8px;color:var(--ink)}
.net-cat{display:inline-block;font-style:normal;font-size:12px;margin-top:10px;padding:3px 10px;border-radius:999px;background:rgba(122,44,78,.1)}
.net-post p{margin:10px 0;line-height:1.5;white-space:normal;overflow-wrap:anywhere}
.net-img{width:100%;border-radius:22px;margin:4px 0 6px;max-height:420px;object-fit:cover}
.net-post footer{display:flex;gap:8px}.net-post footer button{padding:7px 14px;border-radius:999px;border:1.5px solid #fff;background:rgba(255,255,255,.7);font-size:14px;color:var(--ink)}.net-post footer button.on{background:#FBE1EA}
.net-com{display:flex;gap:10px;margin:0 0 12px}.net-com b{font-size:14px}.net-com span{font-size:12px;opacity:.6}.net-com p{margin:2px 0;font-size:14px;overflow-wrap:anywhere}
.net-cact{display:flex;gap:10px;flex-wrap:wrap}.net-cact button{background:none;border:0;padding:0;font-size:12.5px;color:#7A2C4E;text-decoration:underline}
.net-menu{display:flex;flex-direction:column;gap:8px;margin-top:12px}.net-menu button{padding:14px 18px;border-radius:999px;border:1.5px solid #fff;background:rgba(255,255,255,.8);font-size:15px;text-align:left;color:var(--ink)}.net-menu button.danger{color:#B3261E}
.net-avbox{display:flex;align-items:center;gap:14px;margin-bottom:12px}.net-avbox .btn{width:auto}
.danger-btn{background:linear-gradient(180deg,#D6455B,#9B1B30)!important;color:#fff!important;margin-top:8px}
.net-rep{padding:12px 14px;border-radius:22px;background:rgba(255,255,255,.75);margin:0 0 10px}.net-rep span{font-size:12px;opacity:.65}.net-rep p{margin:6px 0;font-size:14px}
`;
document.head.appendChild(st);
mount();
})();
