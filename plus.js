/* Mams : onglet « Plus », recherche, points, avis, agenda, calendrier. Chargé après la page principale. */
(function () {
'use strict';

/* ---------- Données enregistrées ---------- */
S.pts = S.pts || 0; S.ptsKeys = S.ptsKeys || {}; S.ptsLog = S.ptsLog || [];
S.agenda = S.agenda || []; S.avis = S.avis || {}; S.zone = S.zone || 'C';
S.rire = S.rire || {}; S.quizOk = S.quizOk || {};

/* ---------- Points ---------- */
const LEVELS = [[0, 'Petit œuf 🥚'], [50, 'Poussin 🐣'], [150, 'Mams débutante 🌸'], [400, 'Mams en or ✨'], [800, 'Super mams 🦸'], [1500, 'Reine des mams 👑']];
function level() { let l = 0; LEVELS.forEach((x, i) => { if (S.pts >= x[0]) l = i; }); return l; }
window.addPts = function (n, why, key, silent) {
  if (key) { if (S.ptsKeys[key]) return false; S.ptsKeys[key] = 1; }
  S.pts += n; S.ptsLog.unshift([Date.now(), n, why]); S.ptsLog = S.ptsLog.slice(0, 30); save();
  if (!silent) toast('+' + n + ' point' + (n > 1 ? 's' : '') + ' · ' + why);
  return true;
};
addPts(1, 'visite du jour', 'd' + dayKey, true);

/* ---------- Outils ---------- */
const pad = (n) => String(n).padStart(2, '0');
const ds = (y, m, d) => y + '-' + pad(m + 1) + '-' + pad(d);
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const JOURS = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
const fmtDate = (str) => { const [y, m, d] = str.split('-').map(Number); return d + ' ' + MOIS[m - 1] + ' ' + y; };
const yt = (q) => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
const tt = (q) => 'https://www.tiktok.com/search?q=' + encodeURIComponent(q);
const gi = (q) => 'https://www.google.com/search?tbm=isch&safe=active&q=' + encodeURIComponent(q);
const gs = (q) => 'https://www.google.com/search?tbm=shop&q=' + encodeURIComponent(q);
const gq = (q) => 'https://www.google.com/search?q=' + encodeURIComponent(q);
const ext = (label, url, alt) => `<a class="btn ${alt === false ? '' : 'alt'} small" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
const INP = 'style="width:100%;padding:12px;border-radius:12px;border:1px solid var(--line);margin:6px 0 12px;font:inherit"';

/* ---------- Recherche floue ---------- */
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
const SYN = { gateau: ['cake', 'dessert', 'patisserie', 'anniversaire'], dessert: ['gateau', 'sucre'], recette: ['cuisine', 'cuisiner'], cuisine: ['recette'], fievre: ['temperature', 'chaud'], temperature: ['fievre'], toux: ['rhume', 'gorge'], rhume: ['nez', 'toux'], ventre: ['gastro', 'diarrhee', 'vomissements'], vomir: ['vomissements', 'gastro'], bobo: ['blessure', 'coupure', 'bosse'], tomber: ['chute', 'bosse'], dessin: ['dessiner', 'coloriage', 'peinture'], film: ['cine', 'cinema', 'serie'], serie: ['film'], bebe: ['nourrisson', 'tout petit'], jeu: ['jeux', 'jouer'], rigolo: ['blague', 'humour'], rire: ['blague', 'humour', 'drole'], pyjama: ['soiree', 'nuit'], anniv: ['anniversaire', 'fete'], fete: ['anniversaire', 'evenement'], cadeau: ['cadeaux', 'offrir'], pluie: ['interieur', 'maison'], dehors: ['nature', 'jardin', 'parc'], sante: ['maladie', 'medecin'], malade: ['maladie', 'fievre'], poux: ['cheveux'], reduction: ['promo', 'bon', 'code'], promo: ['reduction', 'bon'], idee: ['activite', 'jeu'] };
function lev(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]; let best = i;
    for (let j = 1; j <= b.length; j++) { const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); cur.push(v); if (v < best) best = v; }
    if (best > max) return max + 1; prev = cur;
  }
  return prev[b.length];
}
function tokScore(qt, words) {
  let best = 0;
  for (const w of words) {
    let s = 0;
    if (w === qt) s = 3;
    else if (qt.length >= 3 && w.startsWith(qt)) s = 2.5;
    else if (w.length >= 4 && qt.startsWith(w)) s = 2;
    else if (qt.length >= 4 && w.includes(qt)) s = 1.8;
    else if (qt.length >= 4) { const d = lev(qt, w.slice(0, qt.length + 2), qt.length >= 7 ? 2 : 1); if (d <= (qt.length >= 7 ? 2 : 1)) s = 1.4 - d * 0.1; }
    if (s > best) best = s;
  }
  return best;
}
function fzScore(q, item) {
  const qt = norm(q).split(' ').filter(Boolean); if (!qt.length) return 0;
  let tot = 0, hit = 0;
  qt.forEach(t => {
    let s = tokScore(t, item.w);
    (SYN[t] || []).forEach(sy => { s = Math.max(s, tokScore(sy, item.w) * 0.7); });
    if (s > 0) { hit++; tot += s + (tokScore(t, item.tw) > 0 ? 1 : 0); }
  });
  if (hit < Math.ceil(qt.length / 2)) return 0;
  return tot + hit;
}
const mk = (type, emo, title, sub, text, open) => { const w = [...new Set(norm(title + ' ' + text).split(' ').filter(x => x.length > 1))]; return { type, emo, title, sub, w, tw: norm(title).split(' '), open }; };
let INDEX = null;
function buildIndex() {
  const I = [];
  ACTS.forEach(a => I.push(mk('Activité', '🎨', a.title, a.desc, a.title + ' ' + a.desc + ' ' + a.cat + ' ' + a.material.join(' '), () => openAct(a.i))));
  RECETTES.forEach((r, n) => I.push(mk('Recette', '🍳', r.t, r.i, r.t + ' ' + r.i + ' ' + r.d + ' ' + RECETTES_CATS[r.c] + ' ' + (r.g === 'd' ? 'sucre dessert' : 'sale'), () => openRecette(n))));
  BLAGUES.forEach(b => I.push(mk('Blague', '😄', b.q, b.r, b.q + ' ' + b.r + ' blague humour', () => revealSheet('Blague', b.q, b.r))));
  DEVINETTES.forEach(b => I.push(mk('Devinette', '🤔', b.q, '', b.q + ' devinette', () => revealSheet('Devinette', b.q, b.r))));
  ENIGMES.forEach(b => I.push(mk('Énigme', '🧩', b.q, '', b.q + ' enigme', () => revealSheet('Énigme', b.q, b.r))));
  MALADIES.forEach(m => I.push(mk('Santé', '🩺', m.n, m.s, m.n + ' ' + m.k + ' ' + m.s, () => santeSheet(m))));
  BLESSURES.forEach(m => I.push(mk('Blessure', '🩹', m.n, m.s, m.n + ' ' + m.k + ' ' + m.s, () => santeSheet(m))));
  ASTUCES.forEach(m => I.push(mk('Astuce', '👵', m.n, m.t, m.n + ' ' + m.t, () => astuceSheet(m))));
  ANNIV.forEach((a, n) => I.push(mk('Anniversaire', a.em, a.t, a.ages, a.t + ' ' + a.deco + ' ' + a.jeux.join(' ') + ' ' + a.cadeaux.join(' ') + ' anniversaire gateau cadeau', () => annivSheet(n))));
  EVENTS.forEach((a, n) => I.push(mk('Événement', a.em, a.t, a.ages, a.t + ' ' + a.themes.join(' ') + ' ' + a.prog.join(' ') + ' evenement fete', () => eventSheet(n))));
  BONSPLANS.forEach(b => I.push(mk('Bon plan', '🏷️', b.t, b.d, b.t + ' ' + b.d + ' ' + b.c + ' reduction promo', () => goPlus('bonsplans'))));
  (window.FILMS || []).forEach(f => I.push(mk('Film', '🎬', f.titre, f.genre, f.titre + ' ' + f.genre + ' film cinema serie', () => revealSheet('Film ou série', f.titre, f.genre + ' · ' + f.note, yt(f.titre + ' bande annonce')))));
  (window.NOUV || []).filter(n => n.pub !== 'adulte').forEach(f => I.push(mk('Nouveauté', '🆕', f.t, f.x, f.t + ' ' + f.x + ' ' + f.k + ' nouveaute', () => revealSheet('Nouveauté', f.t, f.x, yt(f.t + ' bande annonce')))));
  return I;
}
function searchAll(q) {
  if (!INDEX) INDEX = buildIndex();
  const adult = (typeof ADULT_OK !== 'undefined' && ADULT_OK) ? (window.ADULTES || []).map(f => mk('Adulte', '🔞', f.titre, f.note, f.titre + ' ' + f.note + ' ' + f.g, () => revealSheet('Entre adultes', f.titre, f.note, yt(f.titre + ' bande annonce')))) : [];
  const r = INDEX.concat(adult).map(it => [fzScore(q, it), it]).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]);
  const top = r.length ? r[0][0] : 0;
  return r.filter(x => x[0] >= top * 0.45).slice(0, 40).map(x => x[1]);
}
window.fzActs = function (q) {
  if (!INDEX) INDEX = buildIndex();
  const items = INDEX.filter(x => x.type === 'Activité');
  const byTitle = {}; ACTS.forEach(a => byTitle[a.title] = a);
  const r = items.map(it => [fzScore(q, it), it]).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]);
  const top = r.length ? r[0][0] : 0;
  return r.filter(x => x[0] >= top * 0.45).map(x => byTitle[x[1].title]);
};
function openSearch(prefill) {
  openSheet(`<h3>Rechercher dans Mams</h3>
    <input id="gs-q" type="search" placeholder="Ex : gâteau, fièvre, licorne, pyjama…" autocomplete="off" ${INP}>
    <div id="gs-res"></div>`);
  const draw = () => {
    const q = $('#gs-q').value.trim(); const box = $('#gs-res');
    if (q.length < 2) { box.innerHTML = '<p class="sub">Écris un mot, même approximatif : je propose ce qui y ressemble.</p><div class="wch">' + ['gâteau', 'fièvre', 'pyjama', 'dessin', 'blague', 'licorne', 'poux', 'pâtes'].map(x => `<button class="chip" data-s="${x}">${x}</button>`).join('') + '</div>'; $$('[data-s]', box).forEach(b => b.onclick = () => { $('#gs-q').value = b.dataset.s; draw(); }); return; }
    const res = searchAll(q);
    box.innerHTML = res.length ? res.map((r, n) => `<button class="act" data-r="${n}" style="width:100%;text-align:left"><div class="em">${r.emo}</div><div style="flex:1;min-width:0"><h4>${esc(r.title)}</h4><p>${esc((r.sub || '').slice(0, 90))}</p><span class="sub">${esc(r.type)}</span></div></button>`).join('') : '<p class="empty">Rien de proche pour « ' + esc(q) + ' ». Essaie un autre mot.</p>';
    $$('[data-r]', box).forEach(b => b.onclick = () => res[+b.dataset.r].open());
  };
  $('#gs-q').oninput = draw; $('#gs-q').value = prefill || ''; draw(); setTimeout(() => $('#gs-q').focus(), 100);
}
$('#home-search').onclick = () => openSearch();

/* ---------- Style ---------- */
const st = document.createElement('style');
st.textContent = `
.searchbar{display:flex;align-items:center;gap:8px;width:100%;margin:10px 0 4px;padding:13px 14px;border-radius:14px;background:rgba(255,255,255,.7);border:1px solid var(--line);color:var(--muted);font:inherit;font-size:14px;text-align:left}
.pwrap{position:relative;min-height:80vh;overflow:hidden;margin:0 -4px;padding:0 4px}
.pwrap>*:not(.pfx){position:relative;z-index:1}
.pfx{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.pfx i{position:absolute;bottom:-90px;border-radius:50%;border:1px solid rgba(255,255,255,.75);background:radial-gradient(circle at 30% 28%,rgba(255,255,255,.9) 0 8%,rgba(255,255,255,0) 24%),radial-gradient(circle at 50% 50%,rgba(255,255,255,.04) 58%,rgba(160,200,255,.28) 78%,rgba(255,170,215,.3) 100%);box-shadow:inset 0 0 10px rgba(255,255,255,.55);animation:prise linear infinite}
@keyframes prise{0%{transform:translate(0,0) scale(.8);opacity:0}10%{opacity:.9}50%{transform:translate(14px,-45vh) scale(1)}90%{opacity:.8}100%{transform:translate(-10px,-105vh) scale(1.08);opacity:0}}
.bubbles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 10px;margin-top:14px;padding-bottom:30px}
.bub{--t:#F7D9E3;position:relative;aspect-ratio:1;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:16px;min-width:0;overflow-wrap:anywhere;text-align:center;color:var(--ink);font:inherit;border:1.5px solid rgba(255,255,255,.85);
background:radial-gradient(circle at 28% 24%,rgba(255,255,255,.95) 0 7%,rgba(255,255,255,0) 20%),var(--pat) 0 0/96px 96px,radial-gradient(circle at 50% 50%,color-mix(in srgb,var(--t) 55%,transparent) 55%,color-mix(in srgb,var(--t) 85%,transparent) 100%);
box-shadow:inset 0 0 22px rgba(255,255,255,.75),inset -10px -12px 24px rgba(120,180,255,.38),inset 10px 12px 24px rgba(255,150,205,.34),0 12px 22px -14px rgba(60,30,60,.55);
animation:pfloat 5s ease-in-out infinite;transition:transform .2s,opacity .2s}
.bub:nth-child(even){margin-top:30px;animation-duration:6.2s;animation-delay:-2s}
.bub:nth-child(3n){animation-duration:5.6s;animation-delay:-1s}
@keyframes pfloat{0%,100%{translate:0 0}50%{translate:0 -9px}}
.bub .e{font-size:34px;line-height:1;filter:drop-shadow(0 0 6px rgba(255,255,255,.9))}
.bub b,.bub small{text-shadow:0 0 6px rgba(255,255,255,.95),0 0 3px rgba(255,255,255,.95)}
.bub::before{content:"";position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.72) 0 30%,rgba(255,255,255,0) 60%);pointer-events:none}
.bub>*{position:relative}
.bub b{font-size:14.5px;font-weight:600;line-height:1.15}
.bub small{font-size:11px;color:var(--muted);line-height:1.15}
.bub.pop{transform:scale(1.25);opacity:0}
.bub:active{transform:scale(.96)}
.pgback{display:inline-flex;align-items:center;gap:6px;margin-bottom:6px;padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.7);border:1px solid var(--line);font-size:13.5px;font-weight:600;color:var(--ink)}
.ptschip{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:#F6E6B8;border:1px solid #D9B94F;font-size:13px;font-weight:600;color:#5a4309}
.qa{border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.75);margin-bottom:10px;padding:12px 14px}
.qa .ans{display:none;margin-top:8px;padding:10px 12px;border-radius:10px;background:#F6E6B8;font-weight:500}
.qa.open .ans{display:block}
.row2{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:8px}
.cal .h{font-size:11px;text-align:center;color:var(--muted);font-weight:600}
.cal button,.cal i{height:42px;border-radius:10px;font-size:13.5px;border:1px solid transparent;background:rgba(255,255,255,.55);position:relative;font-style:normal;display:flex;align-items:center;justify-content:center;color:var(--ink)}
.cal i{background:transparent}
.cal .vac{background:#CFE3F5}
.cal .fer{background:#F4C6CE;font-weight:700}
.cal .tod{border:2px solid var(--accent)}
.cal .ev::after{content:"";position:absolute;bottom:4px;width:6px;height:6px;border-radius:50%;background:#2A8B5A}
.leg{display:flex;gap:12px;flex-wrap:wrap;font-size:12px;color:var(--muted);margin:10px 0}
.leg span::before{content:"";display:inline-block;width:12px;height:12px;border-radius:4px;margin-right:5px;vertical-align:-2px;background:var(--c)}
.bar{height:10px;border-radius:99px;background:rgba(255,255,255,.7);overflow:hidden;border:1px solid var(--line)}
.bar>div{height:100%;background:linear-gradient(90deg,#E9B83A,#C95B76)}
.stars button{font-size:28px;padding:0 3px;color:#C9B0B8}
.stars button.on{color:#E9B83A}
.warnbox{padding:12px 14px;border-radius:14px;background:#FBE3E3;border:1px solid #E5A8A8;font-size:13.5px;margin:10px 0}

.chip{background:radial-gradient(circle at 20% 22%,rgba(255,255,255,.95) 0 9%,rgba(255,255,255,0) 30%),linear-gradient(180deg,rgba(255,255,255,.6),rgba(255,255,255,.2));border:1.5px solid rgba(255,255,255,.92);box-shadow:inset 0 0 10px rgba(255,255,255,.75),inset -3px -4px 10px rgba(120,180,255,.3),inset 3px 4px 10px rgba(255,150,205,.28),0 4px 10px -6px rgba(60,30,60,.5)}
.chip.on{background:radial-gradient(circle at 20% 22%,rgba(255,255,255,.75) 0 8%,rgba(255,255,255,0) 28%),linear-gradient(180deg,#9A3A63,#5B1D3A);border-color:rgba(255,255,255,.9);color:#fff;box-shadow:inset 0 0 8px rgba(255,255,255,.45),0 5px 12px -6px rgba(80,20,50,.75)}
.ce{display:inline-block;margin-right:3px}
.tile{position:relative;overflow:hidden;border-radius:30px;border:1.5px solid rgba(255,255,255,.92);background:radial-gradient(circle at 16% 20%,rgba(255,255,255,.95) 0 6%,rgba(255,255,255,0) 20%),var(--pat,none) 0 0/96px 96px,linear-gradient(160deg,rgba(255,255,255,.62),color-mix(in srgb,var(--t,#F0DDE4) 80%,transparent));box-shadow:inset 0 0 18px rgba(255,255,255,.75),inset -8px -10px 20px rgba(120,180,255,.28),inset 8px 10px 20px rgba(255,150,205,.26),0 10px 18px -12px rgba(60,30,60,.5)}
.tile::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 35% 50%,rgba(255,255,255,.7) 0 28%,rgba(255,255,255,0) 68%);pointer-events:none}
.tile>*{position:relative}
.tile b,.tile span{text-shadow:0 0 6px rgba(255,255,255,.95)}
.tile svg{filter:drop-shadow(0 0 4px rgba(255,255,255,.9))}
.tab svg{box-sizing:content-box;width:20px;height:20px;padding:6px;border-radius:50%;border:1px solid rgba(255,255,255,.92);background:radial-gradient(circle at 28% 24%,rgba(255,255,255,.95) 0 8%,rgba(255,255,255,0) 26%),radial-gradient(circle at 50% 50%,rgba(255,255,255,.18) 55%,rgba(255,255,255,.6) 100%);box-shadow:inset 0 0 8px rgba(255,255,255,.7),inset -3px -4px 8px rgba(120,180,255,.32),inset 3px 4px 8px rgba(255,150,205,.3),0 4px 8px -5px rgba(60,30,60,.5);transition:transform .2s}
.tab.on svg{transform:translateY(-4px) scale(1.12);background:radial-gradient(circle at 28% 24%,rgba(255,255,255,.95) 0 8%,rgba(255,255,255,0) 26%),radial-gradient(circle at 50% 50%,rgba(232,195,209,.6) 50%,rgba(201,91,118,.55) 100%)}
.tab{gap:1px}
.act .em{border-radius:50%;border:1.5px solid rgba(255,255,255,.9);background:radial-gradient(circle at 28% 24%,rgba(255,255,255,.95) 0 8%,rgba(255,255,255,0) 26%),radial-gradient(circle at 50% 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.55) 100%),#C9B0C0;box-shadow:inset 0 0 8px rgba(255,255,255,.7),inset -3px -4px 8px rgba(120,180,255,.3),inset 3px 4px 8px rgba(255,150,205,.3)}
.act .em.ph{border-radius:50%}

.chips{padding:6px 4px 10px;gap:8px}
.chip{flex:none;width:80px;height:80px;aspect-ratio:1;border-radius:50%;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;white-space:normal;text-align:center;font-size:10.5px;line-height:1.1;padding:7px;overflow-wrap:anywhere;overflow:hidden}
.chip .ce{display:block;font-size:22px;line-height:1;margin:0 0 3px}
.wch{gap:8px}
.tiles{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px 8px;padding-bottom:6px}
.tile,.tile.tile-audio{grid-column:auto;aspect-ratio:1;border-radius:50%;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:4px;padding:12px;min-height:0;min-width:0}
.tile:nth-child(3n+2){margin-top:20px}
.tile svg,.tile.tile-audio svg{width:26px;height:26px}
.tile b,.tile.tile-audio b{font-size:12px;line-height:1.1;font-weight:600}
.tile span{display:none}
.tile::before{background:radial-gradient(circle,rgba(255,255,255,.7) 0 30%,rgba(255,255,255,0) 66%)}
.cal button,.cal i{border-radius:50%;height:auto;aspect-ratio:1}
.searchbar{border-radius:999px}

.joinb{position:absolute;right:10px;top:78px;width:82px;height:82px;border-radius:50%;z-index:6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:8px;text-align:center;color:var(--ink);font:inherit;font-size:9.5px;font-weight:700;line-height:1.05;border:1.5px solid rgba(255,255,255,.92);background:radial-gradient(circle at 28% 24%,rgba(255,255,255,.95) 0 8%,rgba(255,255,255,0) 24%),radial-gradient(circle at 50% 50%,rgba(214,236,226,.55) 50%,rgba(150,215,190,.75) 100%);box-shadow:inset 0 0 12px rgba(255,255,255,.75),inset -5px -6px 12px rgba(120,180,255,.35),inset 5px 6px 12px rgba(255,150,205,.3),0 8px 14px -8px rgba(40,70,60,.6);animation:pfloat 4.5s ease-in-out infinite;text-shadow:0 0 5px rgba(255,255,255,.95)}
.joinb .e{font-size:19px;line-height:1}
.view>.h2+.sub,.pwrap>.h2+.sub{padding-right:92px}
.joinb:active{transform:scale(.94)}
.vtag{font-size:11px;color:var(--muted);text-align:center;margin:18px 0 6px}
`;
document.head.appendChild(st);

/* ---------- Navigation Plus ---------- */
const PAGES = {
  jeux: ['😄', 'Jeux et blagues', 'Quiz, énigmes, devinettes', '#F7D9E3'],
  recettes: ['🍳', 'Recettes', 'Rapides, gâteaux, mijotés', '#FCE7C2'],
  anniv: ['🎂', 'Anniversaire', 'Thèmes, gâteaux, cadeaux', '#E9D9F2'],
  events: ['🎈', 'Organiser un événement', 'Pyjama, copains, fêtes', '#D6ECE2'],
  sante: ['🩺', 'Malades ou blessés ?', 'Maladies, bobos, urgences', '#F9D6D6'],
  astuces: ['👵', 'Astuces de grand-mère', 'Bobos et maison', '#EFE3CF'],
  bonsplans: ['🏷️', 'Bons plans du quotidien', 'Promos, aides, imprimables', '#D3E4F4'],
  agenda: ['📒', 'Agenda', 'Rendez-vous à ne pas rater', '#E3E8C8'],
  calendrier: ['📅', 'Calendrier', 'Vacances et jours fériés', '#D8EAF0'],
  points: ['⭐', 'Mes points', 'Niveaux et avis', '#F6E6B8']
};
const MOTIFS = { jeux: '🎲😂🎈⭐', recettes: '🥕🍰🍳🥖', anniv: '🎈🎁🎉🎂', events: '🎊🎶🏠🎈', sante: '🩹❤️🌡️🧸', astuces: '🍯🧺🌿🧵', bonsplans: '🏷️🛒💶✂️', agenda: '📌🕐✏️📒', calendrier: '📅☀️❄️🎄', points: '⭐✨🏆🌟' };
function motif(k) {
  const e = [...(MOTIFS[k] || '✨')]; const pos = [[8, 30, -12], [58, 24, 10], [26, 72, 8], [70, 80, -8]];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">${pos.map((p, i) => `<text x="${p[0]}" y="${p[1]}" font-size="20" transform="rotate(${p[2]} ${p[0]} ${p[1]})">${e[i % e.length]}</text>`).join('')}</svg>`;
  return "url('data:image/svg+xml," + encodeURIComponent(svg).replace(/'/g, '%27') + "')";
}
window.PLUS_PAGES = ['jeux', 'recettes', 'anniv', 'events', 'sante', 'astuces', 'bonsplans', 'agenda', 'calendrier', 'points'];
const P = { page: null, jt: 'blagues', ja: 'p', rq: '', rc: 'all', rg: 'all', rm: 'all', sq: '', st: 'maladies', aq: '', ag: 'bobos', nq: '', cy: today.getFullYear(), cm: today.getMonth(), quiz: null };
window.goPlus = function (page) { P.page = page || null; showTab('plus'); };
const _showTab = showTab;
showTab = function (t) { if (t === 'plus') renderPlus(); _showTab(t); };
const back = () => `<button class="pgback" id="pg-back">‹ Plus</button>`;
function renderPlus() {
  const el = $('#plus-body');
  if (!P.page) {
    const fx = Array.from({ length: 14 }, (_, i) => { const sz = 18 + (i * 37) % 46; return `<i style="left:${(i * 29 + 7) % 92}%;width:${sz}px;height:${sz}px;animation-duration:${9 + (i * 5) % 9}s;animation-delay:-${(i * 3) % 11}s"></i>`; }).join('');
    el.innerHTML = `<div class="pwrap"><div class="pfx">${fx}</div><h2 class="h2">Plus</h2>
      <p class="sub">Tout ce qui fait vivre Mams. On ajoute des choses régulièrement.</p>
      <button class="searchbar" id="pl-search" type="button"><span>🔎</span> Chercher dans toute l'appli…</button>
      <div style="margin:10px 0"><span class="ptschip">⭐ ${S.pts} point${S.pts > 1 ? 's' : ''} · ${LEVELS[level()][1]}</span></div>
      <div class="bubbles">${PLUS_PAGES.map(k => `<button class="bub" data-pg="${k}" style="--t:${PAGES[k][3]};--pat:${motif(k)}"><span class="e">${PAGES[k][0]}</span><b>${PAGES[k][1]}</b><small>${PAGES[k][2]}</small></button>`).join('')}</div><p class="vtag">Version de l'appli : 52</p></div>`;
    $('#pl-search').onclick = () => openSearch();
    $$('[data-pg]', el).forEach(b => b.onclick = () => { b.classList.add('pop'); setTimeout(() => { P.page = b.dataset.pg; renderPlus(); window.scrollTo(0, 0); }, 190); });
    return;
  }
  const fn = RENDER[P.page]; el.innerHTML = back() + fn();
  $('#pg-back').onclick = () => { P.page = null; renderPlus(); window.scrollTo(0, 0); };
  (BIND[P.page] || (() => {}))(el);
}
const rerender = () => { const y = window.scrollY; renderPlus(); window.scrollTo(0, y); };

/* ---------- Fiches communes ---------- */
function revealSheet(kind, q, r, link) {
  openSheet(`<div class="kicker">${esc(kind)}</div><h3 style="margin-top:4px">${esc(q)}</h3>
    <button class="btn" id="rv">Voir la réponse</button><div class="qa" style="display:none;margin-top:12px"><div class="ans" style="display:block">${esc(r)}</div></div>
    ${link ? `<div class="row2">${ext('Bande-annonce', link)}</div>` : ''}`);
  $('#rv').onclick = () => { $('#rv').style.display = 'none'; $('.qa').style.display = 'block'; };
}
function santeSheet(m) {
  openSheet(`<div class="kicker">Santé</div><h3 style="margin-top:4px">${esc(m.n)}</h3>
    <h5>Les signes</h5><p class="lead">${esc(m.s)}</p><h5>Que faire</h5><p class="lead">${esc(m.f)}</p>
    <h5>Quand consulter</h5><p class="lead">${esc(m.u)}</p><div class="warnbox">${esc(SANTE_ALERTE)}</div>`);
}
function astuceSheet(m) {
  openSheet(`<div class="kicker">Astuce de grand-mère</div><h3 style="margin-top:4px">${esc(m.n)}</h3><p class="lead">${esc(m.t)}</p>${m.w ? `<div class="warnbox">À savoir : ${esc(m.w)}</div>` : ''}<p class="note">Un coup de pouce du quotidien, pas un médicament. Si ça ne passe pas, demande un avis médical.</p>`);
}
function openRecette(n) {
  const r = RECETTES[n]; const q = r.t + ' recette';
  openSheet(`<div class="kicker">${esc(RECETTES_CATS[r.c])} · ${r.g === 'd' ? 'Sucré' : 'Salé'}</div><h3 style="margin-top:4px">${esc(r.t)}</h3>
    <div class="meta" style="margin-top:8px"><span>${r.m} min</span><span>${['Facile', 'Moyen', 'Plus long'][r.n - 1]}</span>${r.e ? '<span>Avec les enfants</span>' : ''}</div>
    <h5>Ingrédients</h5><p class="lead">${esc(r.i)}</p><h5>En deux mots</h5><p class="lead">${esc(r.d)}</p>
    <h5>Voir comment faire</h5><div class="row2">${ext('YouTube', yt(q + ' facile'), false)}${ext('TikTok', tt(q))}${ext('Images', gi(r.t))}</div>
    <p class="note">Les boutons ouvrent une recherche de vidéos. Vérifie les quantités sur la vidéo choisie.</p>
    <button class="btn sage" id="rc-done" style="margin-top:14px">Je l'ai faite</button>`);
  $('#rc-done').onclick = () => { closeSheet(); if (!addPts(5, 'recette réalisée', 'rec' + n)) toast('Déjà comptée, bravo !'); };
}
function annivSheet(n) {
  const a = ANNIV[n]; const t = 'anniversaire ' + a.t;
  openSheet(`<div class="kicker">${esc(a.ages)}</div><h3 style="margin-top:4px">${a.em} ${esc(a.t)}</h3>
    <h5>Décoration</h5><p class="lead">${esc(a.deco)}</p>
    <h5>Jeux</h5><ul>${a.jeux.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <h5>Gâteau facile</h5><p class="lead">${esc(a.simple)}</p><h5>Gâteau plus ambitieux</h5><p class="lead">${esc(a.expert)}</p>
    <h5>Idées cadeaux</h5><ul>${a.cadeaux.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <h5>Chercher</h5><div class="row2">${ext('Vidéos de gâteaux', yt('gâteau ' + t), false)}${ext('Vidéos de déco', yt('décoration ' + t))}${ext('Images', gi(t))}${ext('Cadeaux à commander', gs('cadeau ' + a.t + ' enfant'))}${ext('Déco à commander', gs('décoration ' + t))}</div>`);
}
function eventSheet(n) {
  const a = EVENTS[n];
  openSheet(`<div class="kicker">${esc(a.ages)} · ${esc(a.duree)}</div><h3 style="margin-top:4px">${a.em} ${esc(a.t)}</h3>
    <h5>Idées de thèmes</h5><ul>${a.themes.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <h5>Déroulé conseillé</h5><ol class="steps">${a.prog.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
    <h5>À prévoir</h5><ul>${a.liste.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <div class="row2">${ext('Images d\'idées', gi('idées ' + a.t + ' enfants'))}${ext('Vidéos', yt(a.t + ' enfants idées'))}</div>
    <div class="row"><button class="btn" id="ev-share" style="margin-top:12px">Proposer à des copines</button></div>
    <div class="row"><button class="btn alt" id="ev-ag">Ajouter à mon agenda</button></div>`);
  $('#ev-share').onclick = () => shareText('Sortie entre mams : ' + a.t + '\nQui est partante ?', 'Proposition prête à envoyer');
  $('#ev-ag').onclick = () => agendaForm(a.t);
}
function shareText(msg, why) {
  if (navigator.share) { navigator.share({ text: msg }).then(() => addPts(3, 'partage', 'sh' + dayKey)).catch(() => {}); }
  else { window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank'); addPts(3, 'partage', 'sh' + dayKey); }
}

/* ---------- Pages ---------- */
const RENDER = {}, BIND = {};
const chips = (arr, cur, attr) => `<div class="wch">${arr.map(([v, l]) => `<button class="chip ${cur === v ? 'on' : ''}" data-${attr}="${v}">${esc(l)}</button>`).join('')}</div>`;

/* Jeux */
RENDER.jeux = () => {
  const tabs = [['blagues', 'Blagues'], ['devinettes', 'Devinettes'], ['enigmes', 'Énigmes'], ['quiz', 'Quiz']];
  const ages = Object.entries(AGES_JEUX).filter(([k]) => P.jt === 'blagues' || k !== 'f' || P.jt === 'quiz');
  let body = '';
  const lst = P.jt === 'blagues' ? BLAGUES : P.jt === 'devinettes' ? DEVINETTES : P.jt === 'enigmes' ? ENIGMES : QUIZ;
  if (P.ja === 'f' && P.jt !== 'blagues' && P.jt !== 'quiz') P.ja = 'p';
  const items = lst.map((x, i) => [x, i]).filter(([x]) => x.a === P.ja);
  if (P.jt === 'quiz') {
    if (!P.quiz || P.quiz.age !== P.ja) P.quiz = { age: P.ja, n: 0, ok: 0, done: false, order: items.map(([, i]) => i), picked: null };
    const Q = P.quiz;
    if (Q.n >= Q.order.length) body = `<div class="qa open"><b>Fini ! ${Q.ok} bonne${Q.ok > 1 ? 's' : ''} réponse${Q.ok > 1 ? 's' : ''} sur ${Q.order.length}.</b><div class="row2"><button class="btn" id="qz-again">Recommencer</button></div></div>`;
    else {
      const q = QUIZ[Q.order[Q.n]];
      body = `<div class="qa open"><div class="sub">Question ${Q.n + 1} sur ${Q.order.length}</div><h3 style="margin:6px 0 10px">${esc(q.q)}</h3>${q.o.map((o, k) => `<button class="btn alt" data-qo="${k}" style="margin-bottom:8px;${Q.picked !== null ? (k === q.r ? 'background:#CDEBD6;' : (k === Q.picked ? 'background:#F4C6CE;' : '')) : ''}">${esc(o)}</button>`).join('')}${Q.picked !== null ? `<button class="btn" id="qz-next" style="margin-top:6px">Suivante</button>` : ''}</div>`;
    }
  } else {
    body = items.map(([x, i]) => `<div class="qa"><b>${esc(x.q)}</b><button class="btn alt small" data-rv style="margin-top:8px">Voir la réponse</button><div class="ans">${esc(x.r)}${P.jt === 'blagues' ? `<div><button class="chip" data-ri="${P.jt}${i}" style="margin-top:8px">😂 J'ai ri (+1)</button></div>` : ''}</div></div>`).join('') || '<p class="empty">Rien dans cette catégorie pour l\'instant.</p>';
  }
  return `<h2 class="h2">Jeux et blagues</h2><p class="sub">${BLAGUES.length + DEVINETTES.length + ENIGMES.length + QUIZ.length} blagues, devinettes, énigmes et questions. On en ajoute souvent.</p>${chips(tabs, P.jt, 'jt')}${chips(Object.entries(AGES_JEUX).filter(([k]) => k !== 'f' || P.jt === 'blagues' || P.jt === 'quiz'), P.ja, 'ja')}${body}`;
};
BIND.jeux = (el) => {
  $$('[data-jt]', el).forEach(b => b.onclick = () => { P.jt = b.dataset.jt; P.quiz = null; rerender(); });
  $$('[data-ja]', el).forEach(b => b.onclick = () => { P.ja = b.dataset.ja; P.quiz = null; rerender(); });
  $$('[data-rv]', el).forEach(b => b.onclick = () => b.closest('.qa').classList.add('open'));
  $$('[data-ri]', el).forEach(b => b.onclick = () => { addPts(1, 'un bon rire', 'ri' + b.dataset.ri); b.textContent = '😂 Merci !'; });
  $$('[data-qo]', el).forEach(b => b.onclick = () => { const Q = P.quiz; if (Q.picked !== null) return; Q.picked = +b.dataset.qo; if (Q.picked === QUIZ[Q.order[Q.n]].r) { Q.ok++; addPts(2, 'bonne réponse', 'qz' + Q.order[Q.n]); } rerender(); });
  const nx = $('#qz-next', el); if (nx) nx.onclick = () => { P.quiz.n++; P.quiz.picked = null; rerender(); };
  const ag = $('#qz-again', el); if (ag) ag.onclick = () => { P.quiz = null; rerender(); };
};

/* Recettes */
function recettesFiltered() {
  const q = P.rq.trim();
  let l = RECETTES.map((r, n) => [r, n]);
  if (q) { const it = l.map(([r, n]) => [fzScore(q, mk('', '', r.t, '', r.t + ' ' + r.i + ' ' + r.d + ' ' + RECETTES_CATS[r.c] + ' ' + (r.g === 'd' ? 'sucre dessert' : 'sale'), null)), r, n]).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]); l = it.map(x => [x[1], x[2]]); }
  return l.filter(([r]) => (P.rc === 'all' || r.c === P.rc) && (P.rg === 'all' || r.g === P.rg) && (P.rm === 'all' || (P.rm === '15' ? r.m <= 15 : P.rm === '30' ? r.m <= 30 : P.rm === '60' ? r.m <= 60 : r.m > 60)));
}
RENDER.recettes = () => {
  const l = recettesFiltered();
  return `<h2 class="h2">Recettes</h2><p class="sub">${RECETTES.length} recettes, avec des vidéos à voir sur YouTube et TikTok.</p>
  <input id="rq" type="search" placeholder="Cherche : gratin, banane, chocolat…" value="${esc(P.rq)}" ${INP}>
  ${chips([['all', 'Toutes']].concat(Object.entries(RECETTES_CATS)), P.rc, 'rc')}
  ${chips([['all', 'Sucré et salé'], ['s', 'Salé'], ['d', 'Sucré']], P.rg, 'rg')}
  ${chips([['all', 'Toutes durées'], ['15', '15 min ou moins'], ['30', '30 min ou moins'], ['60', '1 h ou moins'], ['99', 'Plus long']], P.rm, 'rm')}
  <p class="sub">${l.length} recette${l.length > 1 ? 's' : ''}</p><div id="rlist">${recipeList(l)}</div>`;
};
const recipeList = (l) => l.map(([r, n]) => `<button class="act" data-rn="${n}" style="width:100%;text-align:left"><div class="em">${r.g === 'd' ? '🍰' : '🍲'}</div><div style="flex:1;min-width:0"><h4>${esc(r.t)}</h4><p>${esc(RECETTES_CATS[r.c])} · ${r.m} min · ${['Facile', 'Moyen', 'Plus long'][r.n - 1]}</p></div></button>`).join('') || '<p class="empty">Aucune recette proche. Enlève un filtre ou change de mot.</p>';
BIND.recettes = (el) => {
  const q = $('#rq', el);
  q.oninput = () => { P.rq = q.value; $('#rlist', el).innerHTML = recipeList(recettesFiltered()); bindRn(el); $$('.sub', el).forEach(x => { if (/^\d+ recette/.test(x.textContent)) x.textContent = recettesFiltered().length + ' recettes'; }); };
  ['rc', 'rg', 'rm'].forEach(k => $$('[data-' + k + ']', el).forEach(b => b.onclick = () => { P[k] = b.dataset[k]; rerender(); }));
  bindRn(el);
};
const bindRn = (el) => $$('[data-rn]', el).forEach(b => b.onclick = () => openRecette(+b.dataset.rn));

/* Anniversaire */
RENDER.anniv = () => {
  const q = P.nq.trim();
  let l = ANNIV.map((a, n) => [a, n]);
  if (q) l = l.map(([a, n]) => [fzScore(q, mk('', '', a.t, '', a.t + ' ' + a.deco + ' ' + a.jeux.join(' ') + ' ' + a.cadeaux.join(' ') + ' ' + a.ages, null)), a, n]).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]).map(x => [x[1], x[2]]);
  return `<h2 class="h2">Organiser un anniversaire</h2><p class="sub">Choisis un thème : déco, jeux, gâteaux avec vidéos, cadeaux.</p>
  <input id="nq" type="search" placeholder="Cherche un thème, un âge, un cadeau…" value="${esc(P.nq)}" ${INP}>
  <div id="alist">${annivList(l)}</div>
  <h3 class="h3" style="margin:18px 0 8px">Chercher des images ou où commander</h3>
  <input id="an-free" type="text" placeholder="Ex : décoration anniversaire 5 ans dinosaures" ${INP}>
  <div class="row2">${'<button class="btn alt small" id="an-i">Images</button><button class="btn alt small" id="an-s">Où commander</button><button class="btn alt small" id="an-v">Vidéos</button>'}</div>
  <h3 class="h3" style="margin:18px 0 8px">Idées cadeaux par âge</h3>
  ${CADEAUX_AGES.map(c => `<div class="qa"><b>${esc(c.a)}</b><div class="sub" style="margin-top:4px">${c.l.map(esc).join(' · ')}</div></div>`).join('')}
  <h3 class="h3" style="margin:18px 0 8px">Le plan pour ne rien oublier</h3>
  ${ANNIV_PLAN.map(x => `<div class="qa"><b>${esc(x[0])}</b><div class="sub" style="margin-top:4px">${esc(x[1])}</div></div>`).join('')}`;
};
const annivList = (l) => l.map(([a, n]) => `<button class="act" data-an="${n}" style="width:100%;text-align:left"><div class="em">${a.em}</div><div style="flex:1;min-width:0"><h4>${esc(a.t)}</h4><p>${esc(a.ages)}</p></div></button>`).join('') || '<p class="empty">Aucun thème proche. Essaie un autre mot.</p>';
BIND.anniv = (el) => {
  $('#nq', el).oninput = (e) => { P.nq = e.target.value; rerender(); setTimeout(() => { const i = $('#nq'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 0); };
  $$('[data-an]', el).forEach(b => b.onclick = () => annivSheet(+b.dataset.an));
  const v = () => $('#an-free').value.trim() || 'anniversaire enfant';
  $('#an-i').onclick = () => window.open(gi(v()), '_blank');
  $('#an-s').onclick = () => window.open(gs(v()), '_blank');
  $('#an-v').onclick = () => window.open(yt(v()), '_blank');
};

/* Événements */
RENDER.events = () => `<h2 class="h2">Organiser un événement</h2><p class="sub">Des idées de thèmes, un déroulé et une liste pour chaque occasion.</p>
  ${EVENTS.map((a, n) => `<button class="act" data-ev="${n}" style="width:100%;text-align:left"><div class="em">${a.em}</div><div style="flex:1;min-width:0"><h4>${esc(a.t)}</h4><p>${esc(a.ages)} · ${esc(a.duree)}</p></div></button>`).join('')}`;
BIND.events = (el) => $$('[data-ev]', el).forEach(b => b.onclick = () => eventSheet(+b.dataset.ev));

/* Santé */
RENDER.sante = () => {
  const q = P.sq.trim(); const base = P.st === 'maladies' ? MALADIES : BLESSURES;
  let l = base;
  if (q) l = base.map(m => [fzScore(q, mk('', '', m.n, '', m.n + ' ' + m.k + ' ' + m.s, null)), m]).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]).map(x => x[1]);
  return `<h2 class="h2">Malades ou blessés ?</h2>
  <div class="warnbox"><b>Urgence : 15 (SAMU)</b>, 18 (pompiers) ou 112 (numéro européen).<br>${esc(SANTE_ALERTE)}</div>
  <input id="sq" type="search" placeholder="Cherche : fièvre, varicelle, brûlure…" value="${esc(P.sq)}" ${INP}>
  ${chips([['maladies', 'Maladies'], ['blessures', 'Blessures et bobos']], P.st, 'st')}
  <div id="slist">${santeList(l)}</div>`;
};
const santeList = (l) => l.map((m) => `<button class="act" data-sm="${esc(m.n)}" style="width:100%;text-align:left"><div class="em">${P.st === 'maladies' ? '🩺' : '🩹'}</div><div style="flex:1;min-width:0"><h4>${esc(m.n)}</h4><p>${esc(m.s.length > 80 ? m.s.slice(0, 78) + '…' : m.s)}</p></div></button>`).join('') || '<p class="empty">Rien de proche. Essaie un autre mot, ou demande à ton médecin ou ton pharmacien.</p>';
BIND.sante = (el) => {
  const all = MALADIES.concat(BLESSURES);
  const q = $('#sq', el);
  const bind = () => $$('[data-sm]', el).forEach(b => b.onclick = () => santeSheet(all.find(m => m.n === b.dataset.sm)));
  q.oninput = () => { P.sq = q.value; const base = P.st === 'maladies' ? MALADIES : BLESSURES; const t = P.sq.trim(); const l = t ? base.map(m => [fzScore(t, mk('', '', m.n, '', m.n + ' ' + m.k + ' ' + m.s, null)), m]).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]).map(x => x[1]) : base; $('#slist', el).innerHTML = santeList(l); bind(); };
  $$('[data-st]', el).forEach(b => b.onclick = () => { P.st = b.dataset.st; rerender(); });
  bind();
};

/* Astuces */
RENDER.astuces = () => {
  const q = P.aq.trim(); let l = ASTUCES.filter(a => a.g === P.ag);
  if (q) l = ASTUCES.map(m => [fzScore(q, mk('', '', m.n, '', m.n + ' ' + m.t, null)), m]).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]).map(x => x[1]);
  return `<h2 class="h2">Astuces de grand-mère</h2><p class="sub">Des gestes simples qui dépannent. Pas un remède : en cas de doute, on demande un avis médical.</p>
  <input id="aq" type="search" placeholder="Cherche : toux, tache, chewing-gum…" value="${esc(P.aq)}" ${INP}>
  ${chips([['bobos', 'Bobos et petits maux'], ['maison', 'Maison et quotidien']], P.ag, 'ag')}
  ${l.map(m => `<div class="qa open"><b>${esc(m.n)}</b><div class="sub" style="margin-top:4px;color:var(--ink)">${esc(m.t)}</div>${m.w ? `<div class="sub" style="margin-top:6px">⚠️ ${esc(m.w)}</div>` : ''}</div>`).join('') || '<p class="empty">Rien de proche. Essaie un autre mot.</p>'}`;
};
BIND.astuces = (el) => {
  $('#aq', el).oninput = (e) => { P.aq = e.target.value; rerender(); setTimeout(() => { const i = $('#aq'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 0); };
  $$('[data-ag]', el).forEach(b => b.onclick = () => { P.ag = b.dataset.ag; P.aq = ''; rerender(); });
};

/* Bons plans */
RENDER.bonsplans = () => {
  const cats = [...new Set(BONSPLANS.map(b => b.c))];
  return `<h2 class="h2">Bons plans du quotidien</h2><p class="sub">Mis à jour : ${esc(BONSPLANS_DATE)}. On met à jour souvent.</p>
  <div class="warnbox" style="background:#FFF4D6;border-color:#E0C46C">Je ne donne aucun code promo inventé : les codes changent vite et certains sites sont trompeurs. Les boutons ouvrent une recherche ou le site officiel. Vérifie toujours les conditions et la date, et ne donne jamais tes coordonnées bancaires à un site inconnu.</div>
  ${cats.map(c => `<h3 class="h3" style="margin:16px 0 8px">${esc(c)}</h3>${BONSPLANS.filter(b => b.c === c).map(b => `<div class="qa open"><b>${esc(b.t)}</b><div class="sub" style="margin-top:4px">${esc(b.d)}</div><div class="row2">${b.l.map(([l, u]) => ext(l, u)).join('')}</div></div>`).join('')}`).join('')}`;
};

/* Agenda */
function agendaForm(titre, date) {
  openSheet(`<h3>Nouveau rendez-vous</h3>
    <label class="sub" for="ag-t">Quoi ?</label><input id="ag-t" type="text" maxlength="60" value="${esc(titre || '')}" ${INP}>
    <label class="sub" for="ag-d">Quel jour ?</label><input id="ag-d" type="date" value="${esc(date || ds(today.getFullYear(), today.getMonth(), today.getDate()))}" ${INP}>
    <label class="sub" for="ag-h">À quelle heure ? (facultatif)</label><input id="ag-h" type="time" ${INP}>
    <label class="sub" for="ag-n">Une note (facultatif)</label><input id="ag-n" type="text" maxlength="100" ${INP}>
    <button class="btn" id="ag-ok">Enregistrer</button>`);
  $('#ag-ok').onclick = () => {
    const t = $('#ag-t').value.trim(), d = $('#ag-d').value;
    if (!t || !d) return toast('Écris un titre et choisis un jour');
    S.agenda.push({ id: Date.now(), t, d, h: $('#ag-h').value, n: $('#ag-n').value.trim() }); save(); closeSheet(); toast('Ajouté à ton agenda');
    if (P.page === 'agenda' || P.page === 'calendrier') rerender();
  };
}
function icsFor(e) {
  const d = e.d.replace(/-/g, ''); const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const when = e.h ? ['DTSTART:' + d + 'T' + e.h.replace(':', '') + '00', 'DTEND:' + d + 'T' + e.h.replace(':', '') + '00'] : ['DTSTART;VALUE=DATE:' + d];
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Mams//FR', 'BEGIN:VEVENT', 'UID:' + e.id + '@mams', 'DTSTAMP:' + stamp].concat(when, ['SUMMARY:' + e.t.replace(/[,;]/g, ' '), 'DESCRIPTION:' + (e.n || '').replace(/[,;]/g, ' '), 'END:VEVENT', 'END:VCALENDAR']).join('\r\n');
}
RENDER.agenda = () => {
  const now = ds(today.getFullYear(), today.getMonth(), today.getDate());
  const all = S.agenda.slice().sort((a, b) => (a.d + (a.h || '')).localeCompare(b.d + (b.h || '')));
  const up = all.filter(e => e.d >= now), past = all.filter(e => e.d < now);
  const card = (e) => `<div class="qa"><b>${esc(e.t)}</b><div class="sub" style="margin-top:2px">${fmtDate(e.d)}${e.h ? ' à ' + esc(e.h) : ''}${e.n ? ' · ' + esc(e.n) : ''}</div><div class="row2"><button class="chip" data-ics="${e.id}">📱 Dans mon téléphone</button><button class="chip" data-agd="${e.id}">Supprimer</button></div></div>`;
  return `<h2 class="h2">Agenda</h2><p class="sub">Tes rendez-vous et événements à ne pas manquer. Ils restent sur ton téléphone.</p>
  <button class="btn" id="ag-add">Ajouter un rendez-vous</button>
  <h3 class="h3" style="margin:16px 0 8px">À venir</h3>${up.map(card).join('') || '<p class="empty">Rien de prévu pour l\'instant.</p>'}
  ${past.length ? `<h3 class="h3" style="margin:16px 0 8px">Passés</h3>${past.slice(-5).reverse().map(card).join('')}` : ''}`;
};
BIND.agenda = (el) => {
  $('#ag-add', el).onclick = () => agendaForm();
  $$('[data-agd]', el).forEach(b => b.onclick = () => { if (confirm('Supprimer ce rendez-vous ?')) { S.agenda = S.agenda.filter(e => e.id !== +b.dataset.agd); save(); rerender(); } });
  $$('[data-ics]', el).forEach(b => b.onclick = () => {
    const e = S.agenda.find(x => x.id === +b.dataset.ics); if (!e) return;
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([icsFor(e)], { type: 'text/calendar' })); a.download = 'rendez-vous.ics'; document.body.appendChild(a); a.click(); a.remove();
  });
};

/* Calendrier */
function easter(y) { const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1; return new Date(y, mo - 1, da); }
const feries = {};
function feriesOf(y) {
  if (feries[y]) return feries[y];
  const o = {}; const add = (m, d, n) => { o[ds(y, m, d)] = n; };
  add(0, 1, "Jour de l'an"); add(4, 1, 'Fête du travail'); add(4, 8, 'Victoire 1945'); add(6, 14, 'Fête nationale'); add(7, 15, 'Assomption'); add(10, 1, 'Toussaint'); add(10, 11, 'Armistice'); add(11, 25, 'Noël');
  const e = easter(y); const plus = (n, nom) => { const t = new Date(e); t.setDate(t.getDate() + n); o[ds(t.getFullYear(), t.getMonth(), t.getDate())] = nom; };
  plus(1, 'Lundi de Pâques'); plus(39, 'Ascension'); plus(50, 'Lundi de Pentecôte');
  return feries[y] = o;
}
const vacOn = (date) => VACANCES.find(v => v.z.includes(S.zone) && date >= v.d && date <= v.f);
RENDER.calendrier = () => {
  const y = P.cy, m = P.cm; const first = new Date(y, m, 1); const lead = (first.getDay() + 6) % 7; const nd = new Date(y, m + 1, 0).getDate();
  const todayS = ds(today.getFullYear(), today.getMonth(), today.getDate());
  let cells = JOURS.map(j => `<div class="h">${j}</div>`).join('') + '<i></i>'.repeat(lead);
  for (let d = 1; d <= nd; d++) {
    const k = ds(y, m, d); const cls = [feriesOf(y)[k] ? 'fer' : '', vacOn(k) ? 'vac' : '', k === todayS ? 'tod' : '', S.agenda.some(e => e.d === k) ? 'ev' : ''].join(' ');
    cells += `<button class="${cls}" data-day="${k}">${d}</button>`;
  }
  const nextV = VACANCES.filter(v => v.z.includes(S.zone) && v.f >= todayS).sort((a, b) => a.d.localeCompare(b.d))[0];
  let info = '';
  if (nextV) { const cur = todayS >= nextV.d; const dd = Math.round((new Date(nextV.d) - new Date(todayS)) / 864e5); info = `<div class="qa open"><b>${cur ? 'En ce moment :' : 'Prochaines vacances :'} ${esc(nextV.n)}</b><div class="sub" style="margin-top:4px">Du ${fmtDate(nextV.d)} au ${fmtDate(nextV.f)}${cur ? '' : ' (dans ' + dd + ' jour' + (dd > 1 ? 's' : '') + ')'}</div></div>`; }
  return `<h2 class="h2">Calendrier</h2><p class="sub">Vacances scolaires et jours fériés. Choisis ta zone.</p>
  ${chips([['A', 'Zone A'], ['B', 'Zone B'], ['C', 'Zone C']], S.zone, 'zn')}
  <p class="sub">${esc(VAC_ZONES[S.zone])}</p>${info}
  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px"><button class="chip" id="cm-p">‹</button><b>${MOIS[m]} ${y}</b><button class="chip" id="cm-n">›</button></div>
  <div class="cal">${cells}</div>
  <div class="leg"><span style="--c:#CFE3F5">Vacances</span><span style="--c:#F4C6CE">Jour férié</span><span style="--c:#2A8B5A">Ton agenda</span></div>
  <p class="note">Calendrier officiel 2026-2027 (Éducation nationale). Corse et outre-mer ont leurs propres dates. Les jours fériés sont calculés pour toutes les années.</p>
  <button class="btn" id="cal-add">Ajouter un rendez-vous</button>`;
};
BIND.calendrier = (el) => {
  $$('[data-zn]', el).forEach(b => b.onclick = () => { S.zone = b.dataset.zn; save(); rerender(); });
  $('#cm-p', el).onclick = () => { P.cm--; if (P.cm < 0) { P.cm = 11; P.cy--; } rerender(); };
  $('#cm-n', el).onclick = () => { P.cm++; if (P.cm > 11) { P.cm = 0; P.cy++; } rerender(); };
  $('#cal-add', el).onclick = () => agendaForm();
  $$('[data-day]', el).forEach(b => b.onclick = () => {
    const k = b.dataset.day; const y = +k.slice(0, 4); const f = feriesOf(y)[k]; const v = vacOn(k); const ev = S.agenda.filter(e => e.d === k);
    openSheet(`<h3>${fmtDate(k)}</h3>${f ? `<p class="lead">🎉 Jour férié : ${esc(f)}</p>` : ''}${v ? `<p class="lead">🏖️ Vacances : ${esc(v.n)}</p>` : ''}
      ${ev.map(e => `<div class="qa"><b>${esc(e.t)}</b><div class="sub">${e.h ? esc(e.h) : 'Toute la journée'}${e.n ? ' · ' + esc(e.n) : ''}</div></div>`).join('')}
      ${!f && !v && !ev.length ? '<p class="sub">Rien de particulier ce jour-là.</p>' : ''}
      <button class="btn" id="day-add" style="margin-top:12px">Ajouter un rendez-vous ce jour</button>`);
    $('#day-add').onclick = () => agendaForm('', k);
  });
};

/* Points */
RENDER.points = () => {
  const l = level(); const cur = LEVELS[l][0], nx = LEVELS[l + 1]; const pct = nx ? Math.round((S.pts - cur) / (nx[0] - cur) * 100) : 100;
  const av = Object.entries(S.avis);
  return `<h2 class="h2">Mes points</h2>
  <div class="qa open" style="text-align:center"><div style="font-size:44px;font-weight:700">${S.pts}</div><div><b>${LEVELS[l][1]}</b></div>
    <div class="bar" style="margin:10px 0 6px"><div style="width:${pct}%"></div></div><div class="sub">${nx ? 'Encore ' + (nx[0] - S.pts) + ' points pour devenir « ' + nx[1] + ' »' : 'Niveau maximum, bravo !'}</div></div>
  <h3 class="h3" style="margin:16px 0 8px">Comment gagner des points</h3>
  <div class="qa"><div class="sub" style="color:var(--ink)">Faire une activité : +10<br>Ajouter un souvenir au journal : +5<br>Réaliser une recette : +5<br>Donner un avis sur une activité : +3<br>Partager avec des copines : +3<br>Bonne réponse au quiz : +2<br>Une blague qui fait rire : +1<br>Ouvrir l'appli chaque jour : +1</div></div>
  <h3 class="h3" style="margin:16px 0 8px">Mes derniers points</h3>
  ${S.ptsLog.slice(0, 8).map(x => `<div class="qa"><b>+${x[1]}</b> · ${esc(x[2])}</div>`).join('') || '<p class="empty">Fais une activité pour commencer.</p>'}
  <h3 class="h3" style="margin:16px 0 8px">Mes avis</h3>
  ${av.map(([t, a]) => `<div class="qa"><b>${esc(t)}</b><div>${'★'.repeat(a.n)}${'☆'.repeat(5 - a.n)}</div>${a.c ? `<div class="sub">${esc(a.c)}</div>` : ''}</div>`).join('') || '<p class="empty">Ouvre une activité et donne ton avis, c\'est facultatif.</p>'}`;
};

/* ---------- Avis dans les fiches d'activité ---------- */
const _openAct = openAct;
openAct = function (i) {
  _openAct(i);
  const a = ACTS[i]; const cur = S.avis[a.title] || { n: 0, c: '' };
  const box = document.createElement('div');
  box.innerHTML = `<h5 style="margin-top:22px">Ton avis (facultatif)</h5>
    <div class="stars" id="av-stars">${[1, 2, 3, 4, 5].map(n => `<button type="button" data-n="${n}" class="${n <= cur.n ? 'on' : ''}" aria-label="${n} sur 5">★</button>`).join('')}</div>
    <textarea id="av-c" rows="2" placeholder="Un petit mot pour les autres mams ?" style="width:100%;padding:12px;border-radius:12px;border:1px solid var(--line);margin:6px 0 10px;font:inherit">${esc(cur.c)}</textarea>
    <div class="row2"><button class="btn alt small" id="av-save">Enregistrer mon avis</button><button class="btn alt small" id="av-share">Partager</button></div>`;
  $('#sheet').appendChild(box);
  let n = cur.n;
  $$('#av-stars button').forEach(b => b.onclick = () => { n = +b.dataset.n; $$('#av-stars button').forEach(x => x.classList.toggle('on', +x.dataset.n <= n)); });
  $('#av-save').onclick = () => { if (!n) return toast('Choisis une note'); S.avis[a.title] = { n, c: $('#av-c').value.trim() }; save(); if (!addPts(3, 'avis donné', 'av' + a.title)) toast('Avis mis à jour'); };
  $('#av-share').onclick = () => { if (!n) return toast('Choisis une note'); S.avis[a.title] = { n, c: $('#av-c').value.trim() }; save(); shareText('Mon avis sur « ' + a.title + ' » dans Mams : ' + '★'.repeat(n) + '☆'.repeat(5 - n) + ($('#av-c').value.trim() ? '\n' + $('#av-c').value.trim() : '')); };
};
/* Points quand on marque une activité */
const _markDone = markDone;
markDone = function (a) {
  const first = !S.done[a.title];
  _markDone(a);
  const pts = first ? 10 : 2; S.pts += pts; S.ptsLog.unshift([Date.now(), pts, 'activité faite']); save();
  toast((first ? 'Noté, bravo !' : 'Noté une nouvelle fois') + ' · +' + pts + ' points');
};

/* ---------- Accueil : blague et devinette du jour ---------- */
function renderHomeFun() {
  const el = $('#home-fun'); if (!el) return;
  const j = BLAGUES.filter(x => x.a !== 'f')[dayKey % BLAGUES.filter(x => x.a !== 'f').length];
  const d = DEVINETTES[(dayKey * 7) % DEVINETTES.length];
  el.innerHTML = `<div class="sec-title"><h3>Pour rire</h3><button class="link" id="hf-more" style="font-size:13px;font-weight:600;color:var(--accent)">Tout voir</button></div>
    <div class="qa"><div class="sub">Blague du jour</div><b>${esc(j.q)}</b><button class="btn alt small" data-rv style="margin-top:8px">Voir la réponse</button><div class="ans">${esc(j.r)}</div></div>
    <div class="qa"><div class="sub">Devinette du jour</div><b>${esc(d.q)}</b><button class="btn alt small" data-rv style="margin-top:8px">Voir la réponse</button><div class="ans">${esc(d.r)}</div></div>`;
  $$('[data-rv]', el).forEach(b => b.onclick = () => b.closest('.qa').classList.add('open'));
  $('#hf-more').onclick = () => goPlus('jeux');
}
renderHomeFun();

/* ---------- Points dans la page Famille ---------- */
const nest = $('#view-nest');
if (nest) { const pn = document.createElement('div'); pn.className = 'panel'; pn.style.marginTop = '12px'; pn.innerHTML = '<b>Mes points</b><div id="nest-pts" style="margin:8px 0"></div><button class="btn alt" id="nest-pts-go">Voir mes points et mes avis</button>'; nest.insertBefore(pn, nest.children[2] || null); const upd = () => { $('#nest-pts').innerHTML = `<span class="ptschip">⭐ ${S.pts} point${S.pts > 1 ? 's' : ''} · ${LEVELS[level()][1]}</span>`; }; upd(); $('#nest-pts-go').onclick = () => goPlus('points'); const _rn = window.renderNest; if (_rn) window.renderNest = function () { _rn.apply(this, arguments); upd(); }; }

/* ---------- Bulles partout : petits dessins sur les boutons ---------- */
const EMO = [['tous les ages', '🌈'], ['toutes les cat', '🌈'], ['toute la famille', '👨‍👩‍👧'], ['peu importe', '✨'], ['15 min', '⏱️'], ['30 min', '⏱️'], ['45 min', '⏳'], ['1 h', '⏱️'], ['plus long', '⏳'], ['toutes durees', '⏱️'], ['maison et quotidien', '🏠'], ['maison', '🏠'], ['dehors', '🌳'],
  ['0 2 ans', '🍼'], ['3 5 ans', '🧸'], ['6 8 ans', '🎒'], ['9 14 ans', '🛹'], ['3 6 ans', '🧸'], ['7 10 ans', '🎒'], ['11 ans', '🛹'], ['entre mams', '👭'], ['3 ans', '🧸'], ['5 ans', '🎈'], ['7 ans', '🎒'], ['10 ans', '🛹'], ['13 ans', '🎧'],
  ['histoires audio', '🎧'], ['dessin et arts', '🎨'], ['dessin', '✏️'], ['peinture', '🎨'], ['construction', '🧱'], ['bricolage', '✂️'], ['cuisine', '🍳'], ['nature', '🌿'], ['science', '🔬'], ['jeux', '🎲'], ['bouger', '🤸'], ['tout petits', '🍼'], ['au calme', '🧘'], ['calme', '🧘'], ['musique', '🎵'], ['lire', '📚'], ['en famille', '👨‍👩‍👧'], ['grands', '🧑‍🎓'], ['fetes', '🎉'], ['3 minutes', '⏱️'], ['creation', '🧵'], ['creatif', '🎨'], ['pleut', '☔'], ['soir', '🌙'],
  ['netflix', '📺'], ['disney', '🏰'], ['prime', '📦'], ['canal', '📡'], ['apple tv', '🍎'], ['hbo', '🎞️'], ['max', '🎞️'], ['paramount', '⛰️'], ['france tv', '🇫🇷'],
  ['nouveautes', '🆕'], ['plateformes', '📺'], ['au cinema', '🍿'], ['classiques', '🎞️'], ['cinemas', '🍿'], ['cinema', '🍿'], ['tout', '🌈'],
  ['parcs d attractions', '🎢'], ['parcs et aires', '🛝'], ['kid parks', '🎈'], ['zoos', '🦁'], ['musees', '🖼️'], ['mediatheques', '📚'], ['piscines', '🏊'], ['judo', '🥋'], ['foot', '⚽'], ['basket', '🏀'], ['natation', '🏊'], ['danse', '💃'], ['gym', '🤸'], ['tennis', '🎾'], ['equitation', '🐴'], ['arts martiaux', '🥋'], ['theatre', '🎭'], ['eveil bebe', '🍼'], ['centres de loisirs', '🏕️'], ['sorties enfants', '🎈'], ['week end', '📅'], ['agenda', '📅'], ['spectacles', '🎪'], ['marches de noel', '🎄'], ['ateliers', '🧑‍🎨'],
  ['youtube', '▶️'], ['tiktok', '🎶'],
  ['blagues', '😄'], ['devinettes', '🤔'], ['enigmes', '🧩'], ['quiz', '❓'],
  ['repas rapide', '⚡'], ['idees gateaux', '🍰'], ['mijoter', '🍲'], ['gouters', '🍪'], ['petit dejeuner', '🥐'], ['sans four', '🧊'], ['soupes', '🥣'], ['avec les enfants', '👧'], ['toutes', '🌈'], ['sucre et sale', '🍽️'], ['sale', '🧂'], ['sucre', '🍬'],
  ['maladies', '🩺'], ['blessures', '🩹'], ['bobos', '🩹'], ['zone a', '🗺️'], ['zone b', '🗺️'], ['zone c', '🗺️']];
const PICTO = /\p{Extended_Pictographic}/u;
function decorate() {
  $$('.chip:not([data-d])').forEach(c => {
    c.dataset.d = '1'; const t = c.textContent.trim(); if (!t || PICTO.test(t)) return;
    const n = norm(t); const hit = EMO.find(([k]) => n.includes(k)); if (hit) c.insertAdjacentHTML('afterbegin', '<span class="ce">' + hit[1] + '</span>');
  });
}
let decoT = null;
new MutationObserver(() => { if (decoT) return; decoT = requestAnimationFrame(() => { decoT = null; decorate(); }); }).observe(document.body, { childList: true, subtree: true });
decorate();
const TILE_STYLE = { audio: ['#E9D9F2', '🎧📖🌙⭐'], actu: ['#FCE7C2', '📰🎬😂📣'], jeux: ['#F7D9E3', '🎲😂🎈⭐'], recettes: ['#FCE7C2', '🥕🍰🍳🥖'], commu: ['#D6ECE2', '👭💬🌸🤝'], cine: ['#F9D6D6', '🎬🍿📺⭐'], cuisine: ['#FCE7C2', '🥕🍰🍳🥖'], '3min': ['#D3E4F4', '⏱️⚡✨🎯'], pluie: ['#D8EAF0', '☔💧🌈🏠'] };
$$('.tile').forEach(t => { const d = TILE_STYLE[t.dataset.go]; if (d) { t.style.setProperty('--t', d[0]); const e = [...d[1]]; const pos = [[8, 30, -12], [58, 24, 10], [26, 72, 8], [70, 80, -8]]; const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">${pos.map((p, i) => `<text x="${p[0]}" y="${p[1]}" font-size="20" transform="rotate(${p[2]} ${p[0]} ${p[1]})">${e[i % e.length]}</text>`).join('')}</svg>`; t.style.setProperty('--pat', "url('data:image/svg+xml," + encodeURIComponent(svg).replace(/'/g, '%27') + "')"); } });

const topbar = $('header.top');
if (topbar) { const jb = document.createElement('button'); jb.type = 'button'; jb.className = 'joinb'; jb.setAttribute('aria-label', 'Rejoindre la communauté des mams'); jb.innerHTML = '<span class="e">👭</span>Rejoindre la communauté des mams'; jb.onclick = () => showTab('commu'); topbar.appendChild(jb); }
})();
