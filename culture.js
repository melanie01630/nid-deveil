/* Mams · Culture G : quiz de culture générale par âge et par thème, en solo ou à plusieurs (en famille, entre amis).
   S'affiche dans l'onglet « Exercices », à côté de l'école. */
(function () {
'use strict';
const C = window.CULTURE || {};
const AGES = [['4-6', '4-6 ans', '🧸'], ['7-9', '7-9 ans', '🎒'], ['10-12', '10-12 ans', '🚲'], ['13-17', '13-17 ans', '🎧'], ['adultes', 'Adultes', '☕']];
const CATS = {
  hist: ['🏛️', 'Histoire'], perso: ['👑', 'Grands personnages'], geo: ['🌍', 'Pays et géographie'], nat: ['🦁', 'Animaux et nature'],
  sci: ['🔬', 'Sciences et espace'], cine: ['🎬', 'Cinéma, séries et dessins animés'], mus: ['🎵', 'Musique'], star: ['⭐', 'Célébrités'],
  sport: ['⚽', 'Sport'], art: ['🎨', 'Arts et livres'], cuis: ['🍳', 'Cuisine'], lang: ['💬', 'Mots et expressions'],
};
const ST = { free: !!(S.cg && S.cg.free), mode: (S.ecole && S.ecole.mode) || 'ecole', age: (S.cg && S.cg.age) || '7-9', cat: 'all', n: 10, group: false, names: (S.cg && S.cg.names) || ['', ''] };
S.cg = S.cg || { age: ST.age, names: ST.names, best: {} };

const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const parse = (s) => { const [q, r, e] = s.split('|'); const o = r.split(';'); return { q, good: o[0], opts: shuffle(o.slice()), e: e || '' }; };
const countAge = (a) => Object.values(C[a] || {}).reduce((x, y) => x + y.length, 0);
const total = () => AGES.reduce((x, [a]) => x + countAge(a), 0);

/* ---------- Bascule École / Culture G ---------- */
function mountSwitch() {
  const v = $('#view-exos'); if (!v || $('#exmode')) return;
  const sw = document.createElement('div'); sw.id = 'exmode'; sw.className = 'exmode';
  const cb = document.createElement('div'); cb.id = 'culture-body';
  v.insertBefore(sw, v.firstChild); v.appendChild(cb);
  draw();
}
function draw() {
  const sw = $('#exmode'); if (!sw) return;
  sw.innerHTML = `<button class="exm ${ST.mode === 'ecole' ? 'on' : ''}" data-exm="ecole"><span>📚</span>École</button><button class="exm ${ST.mode === 'cg' ? 'on' : ''}" data-exm="cg"><span>🧠</span>Culture G</button>`;
  $$('[data-exm]', sw).forEach(b => b.onclick = () => { ST.mode = b.dataset.exm; S.ecole = S.ecole || {}; S.ecole.mode = ST.mode; save(); draw(); window.scrollTo(0, 0); });
  const cg = ST.mode === 'cg';
  ['#exos-body', '#colo-body'].forEach(s => { const e = $(s); if (e) e.style.display = cg ? 'none' : ''; });
  const cb = $('#culture-body'); cb.style.display = cg ? '' : 'none';
  if (cg) render();
}

function render() {
  const cb = $('#culture-body'); if (!cb) return;
  const data = C[ST.age] || {};
  const cats = Object.keys(CATS).filter(k => data[k] && data[k].length);
  if (ST.cat !== 'all' && !cats.includes(ST.cat)) ST.cat = 'all';
  const best = S.cg.best[ST.age + '_' + ST.cat];
  cb.innerHTML = `<h2 class="h2">Culture G</h2>
    <p class="sub">${total()} questions de culture générale pour tous les âges, de 4 ans aux adultes. À faire seul ou à plusieurs, en famille ou entre amis. De nouvelles questions arrivent chaque semaine.</p>
    <div class="label">Pour qui ?</div>
    <div class="wch cgages">${AGES.map(([a, l, e]) => `<button class="chip ${ST.age === a ? 'on' : ''}" data-cga="${a}"><span class="ce">${e}</span>${esc(l)}</button>`).join('')}</div>
    <div class="label">Thème</div>
    <div class="exsubs">
      <button class="exs ${ST.cat === 'all' ? 'on' : ''}" data-cgc="all"><span>🎲</span><b>Tout mélangé</b><i>${countAge(ST.age)} questions</i></button>
      ${cats.map(k => `<button class="exs ${ST.cat === k ? 'on' : ''}" data-cgc="${k}"><span>${CATS[k][0]}</span><b>${esc(CATS[k][1])}</b><i>${data[k].length} questions</i></button>`).join('')}
    </div>
    <div class="label">Combien de questions ?</div>
    <div class="wch cgn">${[10, 20, 30].map(n => `<button class="chip ${ST.n === n ? 'on' : ''}" data-cgn="${n}">${n}</button>`).join('')}</div>
    <div class="label">Réponses</div>
    <div class="cgmode"><button class="exm ${!ST.free ? 'on' : ''}" data-cgf="0"><span>🔘</span>Avec choix</button><button class="exm ${ST.free ? 'on' : ''}" data-cgf="1"><span>💭</span>Sans choix</button></div>
    ${ST.free ? '<p class="sub" style="margin:-4px 0 6px">Pas de propositions : on répond à voix haute, puis on découvre la réponse et on dit honnêtement si on avait bon.</p>' : ''}
    <div class="label">On joue comment ?</div>
    <div class="cgmode"><button class="exm ${!ST.group ? 'on' : ''}" data-cgg="0"><span>🙋</span>Seul</button><button class="exm ${ST.group ? 'on' : ''}" data-cgg="1"><span>👨‍👩‍👧‍👦</span>À plusieurs</button></div>
    ${ST.group ? `<div class="cgnames">${ST.names.map((n, i) => `<div class="cgname"><input class="input" data-cgp="${i}" placeholder="Joueur ${i + 1}" value="${esc(n)}" maxlength="16">${ST.names.length > 2 ? `<button class="chip" data-cgx="${i}" aria-label="Retirer">✕</button>` : ''}</div>`).join('')}
      ${ST.names.length < 8 ? '<button class="btn alt small" id="cg-add" style="margin-top:6px">➕ Ajouter un joueur</button>' : ''}</div>` : ''}
    ${best != null && !ST.group ? `<p class="sub" style="margin-top:10px">⭐ Ton meilleur score ici : ${best}</p>` : ''}
    <button class="btn cggo" id="cg-go">🚀 C'est parti !</button>`;
  $$('[data-cga]', cb).forEach(b => b.onclick = () => { ST.age = b.dataset.cga; S.cg.age = ST.age; save(); render(); });
  $$('[data-cgc]', cb).forEach(b => b.onclick = () => { ST.cat = b.dataset.cgc; render(); });
  $$('[data-cgn]', cb).forEach(b => b.onclick = () => { ST.n = +b.dataset.cgn; render(); });
  $$('[data-cgg]', cb).forEach(b => b.onclick = () => { ST.group = b.dataset.cgg === '1'; render(); });
  $$('[data-cgf]', cb).forEach(b => b.onclick = () => { ST.free = b.dataset.cgf === '1'; S.cg.free = ST.free; save(); render(); });
  $$('[data-cgp]', cb).forEach(i => i.oninput = () => { ST.names[+i.dataset.cgp] = i.value; S.cg.names = ST.names; save(); });
  $$('[data-cgx]', cb).forEach(b => b.onclick = () => { ST.names.splice(+b.dataset.cgx, 1); S.cg.names = ST.names; save(); render(); });
  const add = $('#cg-add', cb); if (add) add.onclick = () => { ST.names.push(''); render(); };
  $('#cg-go', cb).onclick = start;
}

/* ---------- La partie ---------- */
function start() {
  const data = C[ST.age] || {};
  let pool = ST.cat === 'all' ? Object.values(data).flat() : (data[ST.cat] || []).slice();
  const recent = (S.cg.seen = S.cg.seen || {})[ST.age] || [];
  // on évite de reposer tout de suite les dernières questions vues
  const fresh = pool.filter(q => !recent.includes(q.split('|')[0]));
  if (fresh.length >= ST.n) pool = fresh;
  const list = shuffle(pool.slice()).slice(0, ST.n).map(parse);
  if (!list.length) { toast('Pas encore de questions ici'); return; }
  S.cg.seen[ST.age] = recent.concat(list.map(x => x.q)).slice(-300); save();
  const players = ST.group ? ST.names.map((n, i) => (n || '').trim() || 'Joueur ' + (i + 1)) : ['Toi'];
  const G = { list, n: 0, picked: null, shown: false, ok: false, players, score: players.map(() => 0) };
  const who = () => G.n % players.length;
  const step = () => {
    if (G.n >= G.list.length) return end(G);
    const q = G.list[G.n], p = who();
    openSheet(`<div class="kicker">🧠 ${esc(AGES.find(a => a[0] === ST.age)[1])} · Question ${G.n + 1} sur ${G.list.length}</div>
      <div class="exbar"><i style="width:${(G.n / G.list.length) * 100}%"></i></div>
      ${ST.group ? `<div class="cgturn">🎯 Au tour de <b>${esc(players[p])}</b></div>` : ''}
      <h3 class="exq">${esc(q.q)}</h3>
      ${ST.free ? (G.shown ? `<div class="cgans"><small>La réponse</small><b>${esc(q.good)}</b></div>${G.picked === null ? `<div class="cgself"><button class="exo good" data-cgok="1">✅ J'avais bon</button><button class="exo bad" data-cgok="0">❌ Raté</button></div>` : ''}` : `<button class="btn" id="cg-show" style="margin-top:6px">👀 Voir la réponse</button>`)
      : `<div class="exopts">${q.opts.map((o, i) => { let c = ''; if (G.picked !== null) { if (o === q.good) c = 'good'; else if (i === G.picked) c = 'bad'; } return `<button class="exo ${c}" data-cgo="${i}">${esc(o)}</button>`; }).join('')}</div>`}
      ${G.picked !== null ? `<div class="exfb ${G.ok ? 'ok' : 'ko'}"><b>${G.ok ? 'Bravo ! ✅' : (ST.free ? 'Ce sera pour la prochaine ! ❌' : 'Pas tout à fait ❌')}</b>${q.e ? '<br>' + esc(q.e) : ''}</div>
        <button class="btn" id="cg-next" style="margin-top:12px">${G.n + 1 < G.list.length ? 'Question suivante' : 'Voir les résultats'}</button>` : ''}
      ${ST.group ? `<div class="cgscore">${players.map((n, i) => `<span class="${i === p ? 'me' : ''}">${esc(n)} <b>${G.score[i]}</b></span>`).join('')}</div>` : `<div class="cgscore"><span class="me">Score <b>${G.score[0]}</b></span></div>`}`);
    $$('[data-cgo]').forEach(b => b.onclick = () => { if (G.picked !== null) return; G.picked = +b.dataset.cgo; G.ok = q.opts[G.picked] === q.good; if (G.ok) G.score[p]++; step(); });
    const sh = $('#cg-show'); if (sh) sh.onclick = () => { G.shown = true; step(); };
    $$('[data-cgok]').forEach(b => b.onclick = () => { if (G.picked !== null) return; G.picked = 0; G.ok = b.dataset.cgok === '1'; if (G.ok) G.score[p]++; step(); });
    const nx = $('#cg-next'); if (nx) nx.onclick = () => { G.n++; G.picked = null; G.shown = false; G.ok = false; step(); };
  };
  step();
}
function end(G) {
  const order = G.players.map((n, i) => [n, G.score[i]]).sort((a, b) => b[1] - a[1]);
  if (!ST.group) { const k = ST.age + '_' + ST.cat, prev = S.cg.best[k]; if (prev == null || G.score[0] > prev) S.cg.best[k] = G.score[0]; if (G.score[0] && window.addPts) addPts(G.score[0], 'bonnes réponses en culture G'); save(); }
  const medals = ['🥇', '🥈', '🥉'];
  const top = order[0][1], tie = order.filter(x => x[1] === top).length > 1;
  openSheet(`<div class="kicker">🧠 Culture G</div>
    ${ST.group ? `<h3 style="margin-top:4px">${tie ? 'Égalité ! 🤝' : '🏆 Bravo ' + esc(order[0][0]) + ' !'}</h3>
      <div class="cgpod">${order.map(([n, s], i) => `<div class="cgp"><span>${medals[i] || '🎈'}</span><b>${esc(n)}</b><i>${s} point${s > 1 ? 's' : ''}</i></div>`).join('')}</div>`
    : `<h3 style="margin-top:4px">${G.score[0] >= G.list.length * .8 ? 'Quelle culture ! 🏆' : G.score[0] >= G.list.length / 2 ? 'Bien joué ! 👏' : 'On rejoue pour progresser ? 💪'}</h3>
      <div class="exscore">${G.score[0]}<small>/${G.list.length}</small></div>`}
    <div class="row2"><button class="btn" id="cg-again">🔁 Rejouer</button><button class="btn alt" id="cg-close">Terminer</button></div>`);
  $('#cg-again').onclick = start; $('#cg-close').onclick = () => { closeSheet(); render(); };
}

const st = document.createElement('style');
st.textContent = `
#exmode{margin-top:64px!important}
.exmode,.cgmode{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:6px 0 14px}
.exm{display:flex;align-items:center;justify-content:center;gap:8px;padding:14px 10px;border-radius:999px;font-size:16px;font-weight:700;color:var(--ink);border:1.5px solid rgba(255,255,255,.95);
  background:radial-gradient(ellipse at 18% 15%,rgba(255,255,255,.95) 0 8%,rgba(255,255,255,0) 30%),linear-gradient(180deg,rgba(255,255,255,.65),rgba(236,242,255,.3));box-shadow:0 6px 14px -10px rgba(60,30,60,.6)}
.exm span{font-size:22px}.exm.on{color:#fff;background:radial-gradient(ellipse at 18% 15%,rgba(255,255,255,.7) 0 8%,rgba(255,255,255,0) 30%),linear-gradient(180deg,#A84A72,#5B1D3A)}
.cgages .chip{width:74px;height:74px;font-size:11.5px}
.cgn .chip{width:56px;height:56px;font-size:16px;font-weight:700}
.cgnames{display:flex;flex-direction:column;gap:8px}.cgname{display:flex;gap:8px;align-items:center}.cgname .input{flex:1;border-radius:999px;padding:12px 16px}
.cgname .chip{width:40px!important;height:40px!important;flex:none}
.cggo{margin-top:18px;font-size:18px;padding:16px}
.cgans{margin:6px 0 12px;padding:16px 20px;border-radius:30px;background:rgba(255,255,255,.85);border:1.5px solid #fff;text-align:center}.cgans small{display:block;font-size:12px;opacity:.65;text-transform:uppercase;letter-spacing:.06em}.cgans b{display:block;font-size:20px;margin-top:4px}
.cgself{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cgturn{margin:12px 0 0;padding:10px 16px;border-radius:999px;background:rgba(255,255,255,.7);text-align:center;font-size:16px}
.cgscore{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:16px}
.cgscore span{padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.6);font-size:13px}.cgscore span.me{background:#7A2C4E;color:#fff}
.cgpod{display:flex;flex-direction:column;gap:10px;margin:14px 0}
.cgp{display:flex;align-items:center;gap:12px;padding:12px 18px;border-radius:999px;background:rgba(255,255,255,.7);border:1.5px solid #fff}
.cgp span{font-size:26px}.cgp b{flex:1;font-size:16px}.cgp i{font-style:normal;font-weight:700}
`;
document.head.appendChild(st);
mountSwitch();
})();
