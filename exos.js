/* Mams · onglet « Exercices » : de la petite section à la 3e, dans toutes les matières.
   Les exercices s'affichent directement dans l'appli, et chaque série peut être imprimée ou enregistrée en PDF. */
(function () {
'use strict';
const E = window.ECOLE || {}, CY = window.ECOLE_CYCLES || {};

const LEVELS = [
  ['ps', 'Petite section', 3], ['ms', 'Moyenne section', 4], ['gs', 'Grande section', 5],
  ['cp', 'CP', 6], ['ce1', 'CE1', 7], ['ce2', 'CE2', 8], ['cm1', 'CM1', 9], ['cm2', 'CM2', 10],
  ['6e', '6e', 11], ['5e', '5e', 12], ['4e', '4e', 13], ['3e', '3e', 14],
];
const MAT = ['ps', 'ms', 'gs'];
const SUBJ = {
  calc: ['🧮', 'Calcul mental'],
  ma: ['📐', 'Maths : nombres, formes, mesures'],
  fr: ['📖', 'Français'],
  monde: ['🌍', 'Découvrir le monde'],
  sci: ['🔬', 'Sciences'],
  hg: ['🏛️', 'Histoire et géographie'],
  en: ['🇬🇧', 'Anglais'],
  es: ['🇪🇸', 'Espagnol'],
  de: ['🇩🇪', 'Allemand'],
  emc: ['🤝', 'Vivre ensemble (EMC)'],
  arts: ['🎨', 'Arts et musique'],
  eps: ['⚽', 'Sport et santé'],
  tech: ['💻', 'Technologie'],
};
const SUB_ALIAS = { arts2: 'arts', arts3: 'arts', emc2: 'emc', emc3: 'emc', eps2: 'eps' };

/* ---------- Banque : questions écrites + questions de calcul fabriquées à la demande ---------- */
const parse = (s) => { const [q, r, e] = s.split('|'); const o = r.split(';'); return { q, good: o[0], bad: o.slice(1), e: e || '' }; };
function bank(lv) {
  const out = {};
  Object.entries(E[lv] || {}).forEach(([m, arr]) => { out[m] = (out[m] || []).concat(arr); });
  Object.entries(CY).forEach(([k, c]) => { if (c.lv.includes(lv)) { const m = SUB_ALIAS[k] || k; out[m] = (out[m] || []).concat(c.q); } });
  return out;
}

const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pickA = (a) => a[Math.floor(Math.random() * a.length)];
const nf = (x) => { const s = (Math.round(x * 1000) / 1000).toString().replace('.', ','); return s; };
function wrongs(good, cands) {
  const g = String(good), out = [];
  cands.map(String).forEach(c => { if (c !== g && !out.includes(c)) out.push(c); });
  return out.slice(0, 3);
}
const near = (n, step) => wrongs(n, [n + step, n - step, n + 2 * step, n + 1, n - 1, n + 10].filter(x => x >= 0));
const EM = ['🍎', '⭐', '🐟', '🎈', '🍓', '🐞', '🚗', '🌸', '🧸', '🍪'];
const NAMES = ['Léa', 'Adam', 'Inès', 'Noah', 'Jade', 'Yanis', 'Sofia', 'Malik', 'Emma', 'Lucas'];

const GEN = {
  ps: [() => { const n = R(1, 3), e = pickA(EM); return [`Combien y a-t-il de ${e} ?  ${(e + ' ').repeat(n)}`, n, near(n, 1), `On compte en montrant du doigt : il y en a ${n}.`]; }],
  ms: [
    () => { const n = R(1, 6), e = pickA(EM); return [`Combien y a-t-il de ${e} ?  ${(e + ' ').repeat(n)}`, n, near(n, 1), `On compte un par un : ${n}.`]; },
    () => { const n = R(1, 8); return [`Quel nombre vient juste après ${n} ?`, n + 1, near(n + 1, 1), `On récite : … ${n}, ${n + 1}.`]; },
  ],
  gs: [
    () => { const n = R(3, 10), e = pickA(EM); return [`Combien y a-t-il de ${e} ?  ${(e + ' ').repeat(n)}`, n, near(n, 1), `Il y en a ${n}.`]; },
    () => { const a = R(1, 5), b = R(1, 4), e = pickA(EM); return [`${(e).repeat(a)} + ${(e).repeat(b)} : combien en tout ?`, a + b, near(a + b, 1), `${a} + ${b} = ${a + b}.`]; },
    () => { const xs = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 3), m = Math.max(...xs); return ['Quel est le plus grand nombre ?', m, xs.filter(x => x !== m), `${m} est le plus grand.`]; },
  ],
  cp: [
    () => { const a = R(2, 12), b = R(1, 8); return [`${a} + ${b} = ?`, a + b, near(a + b, 1), `On peut compter à partir de ${a} : ${a + b}.`]; },
    () => { const a = R(6, 19), b = R(1, a - 1); return [`${a} - ${b} = ?`, a - b, near(a - b, 1), `${a} - ${b} = ${a - b}.`]; },
    () => { const d = R(1, 9), u = R(0, 9); return [`Quel nombre a ${d} dizaine${d > 1 ? 's' : ''} et ${u} unité${u > 1 ? 's' : ''} ?`, d * 10 + u, wrongs(d * 10 + u, [u * 10 + d, d + u, d * 10 + u + 10]), `${d} dizaines = ${d * 10}, plus ${u} = ${d * 10 + u}.`]; },
    () => { const n = R(10, 90); return [`Quel nombre vient juste avant ${n} ?`, n - 1, near(n - 1, 1), `… ${n - 1}, ${n}.`]; },
  ],
  ce1: [
    () => { const a = R(12, 60), b = R(5, 39); return [`${a} + ${b} = ?`, a + b, near(a + b, 10), `Dizaines puis unités : ${a + b}.`]; },
    () => { const a = R(30, 99), b = R(5, a - 5); return [`${a} - ${b} = ?`, a - b, near(a - b, 10), `${a} - ${b} = ${a - b}.`]; },
    () => { const a = R(2, 5), b = R(2, 10); return [`${a} × ${b} = ?`, a * b, near(a * b, a), `Table de ${a} : ${a} × ${b} = ${a * b}.`]; },
    () => { const n = R(5, 50); return [`Quel est le double de ${n} ?`, 2 * n, near(2 * n, 2), `${n} + ${n} = ${2 * n}.`]; },
    () => { const p = pickA(NAMES), a = R(10, 40), b = R(3, 9); return [`${p} a ${a} billes. Il en gagne ${b}. Combien en a-t-il maintenant ?`, a + b, near(a + b, 1), `${a} + ${b} = ${a + b} billes.`]; },
  ],
  ce2: [
    () => { const a = R(120, 600), b = R(50, 380); return [`${a} + ${b} = ?`, a + b, near(a + b, 10), `${a} + ${b} = ${a + b}.`]; },
    () => { const a = R(300, 999), b = R(100, a - 50); return [`${a} - ${b} = ?`, a - b, near(a - b, 10), `${a} - ${b} = ${a - b}.`]; },
    () => { const a = R(2, 10), b = R(2, 10); return [`${a} × ${b} = ?`, a * b, near(a * b, a), `${a} × ${b} = ${a * b}.`]; },
    () => { const a = R(11, 40), b = R(2, 5); return [`${a} × ${b} = ?`, a * b, near(a * b, 10), `${a} × ${b} = ${a * b}.`]; },
    () => { const h = R(1, 4); return [`Combien de minutes dans ${h} heure${h > 1 ? 's' : ''} ?`, 60 * h, wrongs(60 * h, [100 * h, 60 * h + 30, 30 * h]), `1 heure = 60 minutes, donc ${60 * h} minutes.`]; },
    () => { const p = pickA(NAMES), n = R(3, 8), c = R(2, 6); return [`${p} achète ${n} cahiers à ${c} € l'un. Combien paie-t-il ?`, n * c + ' €', wrongs(n * c + ' €', [(n + c) + ' €', (n * c + c) + ' €', (n * c - 1) + ' €']), `${n} × ${c} = ${n * c} €.`]; },
  ],
  cm1: [
    () => { const a = R(12, 99), b = R(11, 45); return [`${a} × ${b} = ?`, a * b, near(a * b, 10), `${a} × ${b} = ${a * b}.`]; },
    () => { const b = R(3, 9), q = R(12, 99), r = R(0, b - 1); const a = b * q + r; return [`Dans la division de ${a} par ${b}, quel est le quotient ?`, q, near(q, 1), `${b} × ${q} = ${b * q}, reste ${r}.`]; },
    () => { const d = pickA([2, 3, 4, 5, 10]), n = d * R(2, 12); return [`Combien vaut 1/${d} de ${n} ?`, n / d, near(n / d, 1), `${n} ÷ ${d} = ${n / d}.`]; },
    () => { const a = R(11, 99) / 10, b = R(11, 99) / 10; return [`${nf(a)} + ${nf(b)} = ?`, nf(a + b), wrongs(nf(a + b), [nf(a + b + 1), nf(a + b - 0.1), nf(a + b + 0.1)]), `On aligne les virgules : ${nf(a + b)}.`]; },
    () => { const L = R(3, 15), l = R(2, 9); return [`Quel est le périmètre d'un rectangle de ${L} cm sur ${l} cm ?`, 2 * (L + l) + ' cm', wrongs(2 * (L + l) + ' cm', [L * l + ' cm', (L + l) + ' cm', 2 * (L + l) + 2 + ' cm']), `2 × (${L} + ${l}) = ${2 * (L + l)} cm.`]; },
  ],
  cm2: [
    () => { const a = R(11, 999) / 100, k = pickA([10, 100]); return [`${nf(a)} × ${k} = ?`, nf(a * k), wrongs(nf(a * k), [nf(a * k / 10), nf(a * k * 10), nf(a + k)]), `Multiplier par ${k} décale la virgule de ${k === 10 ? 1 : 2} rang${k === 10 ? '' : 's'} vers la droite.`]; },
    () => { const p = pickA([10, 20, 25, 50]), n = pickA([40, 60, 80, 100, 120, 200]); return [`Combien font ${p} % de ${n} ?`, n * p / 100, near(n * p / 100, 5), `${p} % de ${n} = ${n} × ${p} ÷ 100 = ${n * p / 100}.`]; },
    () => { const L = R(4, 15), l = R(2, 12); return [`Quelle est l'aire d'un rectangle de ${L} m sur ${l} m ?`, L * l + ' m²', wrongs(L * l + ' m²', [2 * (L + l) + ' m²', (L + l) + ' m²', L * l + 10 + ' m²']), `${L} × ${l} = ${L * l} m².`]; },
    () => { const k = R(2, 9) + pickA([0, 0.5, 0.25]); return [`Combien de grammes dans ${nf(k)} kg ?`, nf(k * 1000) + ' g', wrongs(nf(k * 1000) + ' g', [nf(k * 100) + ' g', nf(k * 10) + ' g', nf(k * 1000 + 100) + ' g']), `1 kg = 1 000 g.`]; },
    () => { const a = R(2, 9), b = R(2, 9), c = R(2, 9); return [`${a} + ${b} × ${c} = ?`, a + b * c, wrongs(a + b * c, [(a + b) * c, a + b + c, a * b + c]), `On fait d'abord la multiplication : ${b} × ${c} = ${b * c}, puis + ${a}.`]; },
  ],
  '6e': [
    () => { const a = R(20, 80), b = R(20, 160 - a); return [`Dans un triangle, deux angles mesurent ${a}° et ${b}°. Combien mesure le troisième ?`, 180 - a - b + '°', wrongs(180 - a - b + '°', [360 - a - b + '°', 90 - a + '°', 180 - a + '°']), `180 - ${a} - ${b} = ${180 - a - b}°.`]; },
    () => { const d = pickA([3, 4, 5, 6, 8]), k = R(2, d - 1), n = d * R(2, 10); return [`Combien vaut ${k}/${d} de ${n} ?`, n / d * k, near(n / d * k, n / d), `${n} ÷ ${d} × ${k} = ${n / d * k}.`]; },
    () => { const u = R(2, 6), q1 = R(2, 5), q2 = R(6, 12); return [`${q1} baguettes coûtent ${nf(u * q1 / 2)} €. Combien coûtent ${q2} baguettes ?`, nf(u * q2 / 2) + ' €', wrongs(nf(u * q2 / 2) + ' €', [nf(u * q2 / 2 + 1) + ' €', nf(u * q1 / 2 + q2) + ' €', nf(u * q2) + ' €']), `Prix d'une baguette : ${nf(u / 2)} €, puis × ${q2}.`]; },
    () => { const a = R(101, 999) / 100, b = R(11, 99) / 10; return [`${nf(a)} + ${nf(b)} = ?`, nf(a + b), wrongs(nf(a + b), [nf(a + b + 1), nf(a + b - 0.1), nf(a * 10 + b)]), `On aligne les virgules : ${nf(a + b)}.`]; },
    () => { const n = R(2, 12) * 3; return ['Quel nombre est divisible par 3 ?', n, wrongs(n, [n + 1, n + 2, n - 1]), `La somme des chiffres de ${n} est un multiple de 3.`]; },
  ],
  '5e': [
    () => { const a = R(-12, 12), b = R(-12, 12); return [`(${a}) + (${b}) = ?`, a + b, wrongs(a + b, [a - b, -(a + b), a + b + 2]), `Résultat : ${a + b}.`]; },
    () => { const a = R(-10, 10), b = R(-10, 10); return [`(${a}) - (${b}) = ?`, a - b, wrongs(a - b, [a + b, b - a, a - b - 2]), `Soustraire, c'est ajouter l'opposé : ${a} + (${-b}) = ${a - b}.`]; },
    () => { const a = R(2, 9), b = R(2, 9), c = R(2, 9); return [`${a} × (${b} + ${c}) = ?`, a * (b + c), wrongs(a * (b + c), [a * b + c, a + b * c, a * b * c]), `D'abord les parenthèses : ${b + c}, puis × ${a}.`]; },
    () => { const k = R(2, 6), a = R(1, 7), b = R(a + 1, 9); return [`Simplifie ${a * k}/${b * k}.`, `${a}/${b}`, wrongs(`${a}/${b}`, [`${a * k}/${b}`, `${a + 1}/${b}`, `${b}/${a}`]), `On divise en haut et en bas par ${k}.`]; },
    () => { const p = pickA([10, 20, 30, 15]), n = pickA([40, 60, 80, 200, 120]); return [`Un pull à ${n} € est soldé à -${p} %. Quel est son nouveau prix ?`, nf(n - n * p / 100) + ' €', wrongs(nf(n - n * p / 100) + ' €', [nf(n - p) + ' €', nf(n * p / 100) + ' €', nf(n + n * p / 100) + ' €']), `Remise : ${nf(n * p / 100)} €, donc ${nf(n - n * p / 100)} €.`]; },
  ],
  '4e': [
    () => { const a = R(-9, 9), b = R(-9, 9); return [`(${a}) × (${b}) = ?`, a * b, wrongs(a * b, [-a * b, a + b, a * b + 1]), `Signes : ${(a < 0) !== (b < 0) ? 'différents → négatif' : 'identiques → positif'}.`]; },
    () => { const n = R(2, 6); return [`10^${n} = ?`, '1' + '0'.repeat(n), wrongs('1' + '0'.repeat(n), ['1' + '0'.repeat(n - 1), '1' + '0'.repeat(n + 1), String(10 * n)]), `On écrit 1 suivi de ${n} zéros.`]; },
    () => { const a = R(2, 7), x = R(-5, 9), b = R(-9, 9), c = a * x + b; return [`Résous : ${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${c}`, 'x = ' + x, wrongs('x = ' + x, ['x = ' + (x + 1), 'x = ' + (-x || 1), 'x = ' + (c - b)]), `${a}x = ${c - b}, donc x = ${x}.`]; },
    () => { const t = pickA([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]]); return [`Triangle rectangle : les côtés de l'angle droit mesurent ${t[0]} et ${t[1]}. Longueur de l'hypoténuse ?`, t[2], wrongs(t[2], [t[0] + t[1], t[2] + 1, t[2] - 1]), `${t[0]}² + ${t[1]}² = ${t[2] * t[2]} = ${t[2]}².`]; },
    () => { const d = pickA([2, 3, 4, 5]), a = R(1, d - 1), e = pickA([2, 3, 4, 5].filter(x => x !== d)), b = R(1, e - 1), num = a * e + b * d, den = d * e; return [`${a}/${d} + ${b}/${e} = ?`, `${num}/${den}`, wrongs(`${num}/${den}`, [`${a + b}/${d + e}`, `${a + b}/${den}`, `${num}/${d + e}`]), `Même dénominateur ${den} : ${a * e}/${den} + ${b * d}/${den}.`]; },
  ],
  '3e': [
    () => { const A = R(3, 9), C = R(1, A - 1), X = R(-6, 9), B = R(-9, 9), D = (A - C) * X + B; return [`Résous : ${A}x ${B < 0 ? '-' : '+'} ${Math.abs(B)} = ${C === 1 ? '' : C}x ${D < 0 ? '-' : '+'} ${Math.abs(D)}`, 'x = ' + X, wrongs('x = ' + X, ['x = ' + (X + 1), 'x = ' + (X - 2), 'x = ' + (-X || 3)]), `On regroupe les x : ${A - C}x = ${D - B}, donc x = ${X}.`]; },
    () => { const n = R(2, 15); return [`√${n * n} = ?`, n, near(n, 1), `${n} × ${n} = ${n * n}.`]; },
    () => { const a = R(-5, 5) || 2, b = R(-9, 9), x = R(-5, 5); return [`f(x) = ${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}. Combien vaut f(${x}) ?`, a * x + b, wrongs(a * x + b, [a * x - b, a + x + b, a * x]), `${a} × (${x}) ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${a * x + b}.`]; },
    () => { const k = R(2, 9), a = R(1, 9); return [`Développe ${k}(x + ${a}).`, `${k}x + ${k * a}`, wrongs(`${k}x + ${k * a}`, [`${k}x + ${a}`, `x + ${k * a}`, `${k + a}x`]), `${k} × x + ${k} × ${a}.`]; },
    () => { const r = R(1, 6), b = R(2, 8); return [`Un sac contient ${r} billes rouges et ${b} bleues. Probabilité de tirer une rouge ?`, `${r}/${r + b}`, wrongs(`${r}/${r + b}`, [`${r}/${b}`, `${b}/${r + b}`, `1/${r + b}`]), `Cas favorables ${r} sur ${r + b} billes.`]; },
  ],
};

/* ---------- Une série ---------- */
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function genQ(lv) {
  const g = GEN[lv] || []; if (!g.length) return null;
  for (let t = 0; t < 30; t++) {
    const [q, good, bad, e] = pickA(g)(); const G = String(good);
    let w = wrongs(G, bad);
    if (w.length < 3 && /^-?\d+$/.test(G)) w = wrongs(G, w.concat([+G + 1, +G - 1, +G + 2, +G - 2].filter(x => x >= 0 || +G < 0 || /\(-/.test(q)).map(String)));
    if (w.length >= 2) return { q, good: G, bad: w.slice(0, 3), e, gen: 1 };
  }
  return null;
}
function series(lv, sub, n) {
  const B = bank(lv); let pool = [];
  if (sub === 'calc') { const out = []; for (let i = 0; i < n; i++) out.push(genQ(lv)); return out.filter(Boolean).map(x => Object.assign(x, { opts: shuffle([x.good].concat(x.bad)) })); }
  if (sub === 'all') { Object.values(B).forEach(a => pool = pool.concat(a)); }
  else pool = (B[sub] || []).slice();
  let out = shuffle(pool.map(parse)).slice(0, n);
  if (sub === 'all' || sub === 'ma') { const k = sub === 'all' ? 3 : Math.max(0, n - out.length); for (let i = 0; i < k; i++) { const g = genQ(lv); if (g) out.push(g); } out = shuffle(out).slice(0, n); }
  return out.map(x => Object.assign(x, { opts: shuffle([x.good].concat(x.bad)) }));
}

/* ---------- Écran ---------- */
S.ecole = S.ecole || { lv: null, best: {} };
const ST = { sub: 'all' };
const lvName = (k) => { const L = LEVELS.find(l => l[0] === k); return L ? L[1] : k; };
function subjectsOf(lv) {
  const B = bank(lv), out = [];
  if (GEN[lv]) out.push(['calc', '∞']);
  Object.keys(SUBJ).forEach(k => { if (k !== 'calc' && B[k] && B[k].length) out.push([k, B[k].length]); });
  return out;
}
function total() { let n = 0; LEVELS.forEach(([k]) => Object.values(bank(k)).forEach(a => n += a.length)); return n; }

function render() {
  const el = $('#exos-body'); if (!el) return;
  const lv = S.ecole.lv || (S.kids && S.kids[0] && S.kids[0].age != null ? (LEVELS.find(l => l[2] === Math.min(14, Math.max(3, +S.kids[0].age))) || LEVELS[3])[0] : 'cp');
  if (!S.ecole.lv) S.ecole.lv = lv;
  const subs = subjectsOf(lv);
  if (ST.sub !== 'all' && !subs.find(s => s[0] === ST.sub)) ST.sub = 'all';
  el.innerHTML = `<h2 class="h2">Exercices</h2>
  <p class="sub">${total()} questions écrites et des calculs à l'infini, de la petite section à la 3e, selon le programme scolaire. Tout se fait ici, dans l'appli, et chaque série s'imprime ou s'enregistre en PDF.</p>
  <div class="label">Classe</div>
  <div class="wch exlv">${LEVELS.map(([k, n, a]) => `<button class="chip ${k === lv ? 'on' : ''}" data-exlv="${k}"><span class="ce">${MAT.includes(k) ? '🧸' : (['cp', 'ce1', 'ce2', 'cm1', 'cm2'].includes(k) ? '🎒' : '🎓')}</span>${esc(n)}</button>`).join('')}</div>
  ${MAT.includes(lv) ? '<div class="warnbox" style="margin-top:10px">À lire à voix haute avec ton enfant : il répond en montrant la bonne réponse.</div>' : ''}
  <div class="label">Matière</div>
  <div class="exsubs">
    <button class="exs ${ST.sub === 'all' ? 'on' : ''}" data-exsub="all"><span>🎲</span><b>Un peu de tout</b><i>${esc(lvName(lv))}</i></button>
    ${subs.map(([k, c]) => { const b = S.ecole.best[lv + '_' + k]; return `<button class="exs ${ST.sub === k ? 'on' : ''}" data-exsub="${k}"><span>${SUBJ[k][0]}</span><b>${esc(SUBJ[k][1])}</b><i>${c === '∞' ? 'Sans fin' : c + ' questions'}${b != null ? ' · ⭐ ' + b + '/10' : ''}</i></button>`; }).join('')}
  </div>
  <div class="row2" style="margin-top:14px"><button class="btn" id="ex-go">▶️ Commencer 10 questions</button><button class="btn alt" id="ex-print">🖨️ Fiche à imprimer (PDF)</button></div>`;
  $$('[data-exlv]', el).forEach(b => b.onclick = () => { S.ecole.lv = b.dataset.exlv; save(); render(); });
  $$('[data-exsub]', el).forEach(b => b.onclick = () => { ST.sub = b.dataset.exsub; render(); });
  $('#ex-go', el).onclick = () => play(lv, ST.sub);
  $('#ex-print', el).onclick = () => printSheet(lv, ST.sub);
}

function play(lv, sub) {
  const Q = { lv, sub, list: series(lv, sub, 10), n: 0, ok: 0, picked: null };
  if (!Q.list.length) { toast('Pas encore de questions ici'); return; }
  const draw = () => {
    if (Q.n >= Q.list.length) {
      const k = lv + '_' + sub, prev = S.ecole.best[k]; if (prev == null || Q.ok > prev) S.ecole.best[k] = Q.ok; save();
      if (Q.ok) window.addPts && addPts(Q.ok, 'exercices réussis');
      openSheet(`<div class="kicker">${esc(lvName(lv))} · ${esc(sub === 'all' ? 'Un peu de tout' : SUBJ[sub][1])}</div><h3 style="margin-top:4px">${Q.ok >= 8 ? 'Bravo, champion ! 🏆' : Q.ok >= 5 ? 'Bien joué ! 👏' : 'On continue de s\'entraîner 💪'}</h3>
        <div class="exscore">${Q.ok}<small>/${Q.list.length}</small></div><p class="lead">${'⭐'.repeat(Math.round(Q.ok / 2))}</p>
        <div class="row2"><button class="btn" id="ex-again">🔁 Une autre série</button><button class="btn alt" id="ex-close">Terminer</button></div>`);
      $('#ex-again').onclick = () => play(lv, sub); $('#ex-close').onclick = () => { closeSheet(); render(); };
      return;
    }
    const q = Q.list[Q.n];
    openSheet(`<div class="kicker">${esc(lvName(lv))} · Question ${Q.n + 1} sur ${Q.list.length}</div>
      <div class="exbar"><i style="width:${(Q.n / Q.list.length) * 100}%"></i></div>
      <h3 class="exq">${esc(q.q)}</h3>
      <div class="exopts">${q.opts.map((o, i) => { let c = ''; if (Q.picked !== null) { if (o === q.good) c = 'good'; else if (i === Q.picked) c = 'bad'; } return `<button class="exo ${c}" data-exo="${i}">${esc(o)}</button>`; }).join('')}</div>
      ${Q.picked !== null ? `<div class="exfb ${q.opts[Q.picked] === q.good ? 'ok' : 'ko'}"><b>${q.opts[Q.picked] === q.good ? 'Bravo ! ✅' : 'Pas tout à fait ❌'}</b>${q.e ? '<br>' + esc(q.e) : ''}</div><button class="btn" id="ex-next" style="margin-top:12px">${Q.n + 1 < Q.list.length ? 'Question suivante' : 'Voir mon score'}</button>` : ''}`);
    $$('[data-exo]').forEach(b => b.onclick = () => { if (Q.picked !== null) return; Q.picked = +b.dataset.exo; if (q.opts[Q.picked] === q.good) Q.ok++; draw(); });
    const nx = $('#ex-next'); if (nx) nx.onclick = () => { Q.n++; Q.picked = null; draw(); };
  };
  draw();
}

/* ---------- Fiche à imprimer / PDF ---------- */
function printSheet(lv, sub) {
  const list = series(lv, sub, 15); const L = 'ABCD';
  const title = lvName(lv) + ' · ' + (sub === 'all' ? 'Un peu de tout' : SUBJ[sub][1]);
  openSheet(`<div class="noprint"><div class="kicker">Fiche à imprimer</div><h3 style="margin-top:4px">${esc(title)}</h3>
    <p class="sub">Touche « Imprimer ou enregistrer en PDF », puis choisis « Enregistrer au format PDF » pour la garder sur ton téléphone.</p>
    <div class="row2"><button class="btn" id="ex-doprint">🖨️ Imprimer ou enregistrer en PDF</button><button class="btn alt" id="ex-new">🔁 Autres questions</button></div></div>
    <div class="exsheet">
      <div class="exhead"><b>Mams · Exercices</b><span>${esc(title)}</span></div>
      <div class="exline">Prénom : ____________________ &nbsp; Date : ____________</div>
      <ol class="exlist">${list.map(q => `<li><div class="exqq">${esc(q.q)}</div><div class="exch">${q.opts.map((o, i) => `<span>☐ ${L[i]}. ${esc(o)}</span>`).join('')}</div></li>`).join('')}</ol>
      <div class="excorr"><b>Corrigé</b><ol>${list.map(q => `<li>${L[q.opts.indexOf(q.good)]}. ${esc(q.good)}${q.e ? ' : ' + esc(q.e) : ''}</li>`).join('')}</ol></div>
    </div>`);
  $('#ex-doprint').onclick = () => { document.body.classList.add('printing'); setTimeout(() => { window.print(); }, 300); };
  $('#ex-new').onclick = () => printSheet(lv, sub);
}
window.addEventListener('afterprint', () => document.body.classList.remove('printing'));

/* ---------- Styles ---------- */
const st = document.createElement('style');
st.textContent = `
.exlv .chip{width:74px;height:74px;font-size:11.5px}
.exsubs{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.exs{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:3px;padding:16px 10px;border-radius:999px/60px;color:var(--ink);
  background:radial-gradient(ellipse at 22% 12%,rgba(255,255,255,.95) 0 8%,rgba(255,255,255,0) 30%),linear-gradient(180deg,rgba(255,255,255,.6),rgba(255,236,246,.28));
  border:1.5px solid rgba(255,255,255,.92);box-shadow:inset 0 0 10px rgba(255,255,255,.7),inset -4px -5px 10px rgba(120,180,255,.25),inset 4px 5px 10px rgba(255,150,205,.25),0 6px 14px -10px rgba(60,30,60,.6)}
.exs span{font-size:26px;line-height:1}.exs b{font-size:13.5px;line-height:1.2}.exs i{font-style:normal;font-size:11.5px;opacity:.75}
.exs.on{color:#fff;background:radial-gradient(ellipse at 22% 12%,rgba(255,255,255,.7) 0 8%,rgba(255,255,255,0) 30%),linear-gradient(180deg,#A84A72,#5B1D3A)}
.exbar{height:8px;border-radius:99px;background:rgba(255,255,255,.6);overflow:hidden;margin:10px 0 4px}.exbar i{display:block;height:100%;background:linear-gradient(90deg,#E58FB0,#8EC5E8)}
.exq{margin:12px 0 14px;font-size:21px;line-height:1.35}
.exopts{display:flex;flex-direction:column;gap:10px}
.exo{padding:14px 18px;border-radius:999px;font-size:16px;font-weight:600;color:var(--ink);text-align:center;border:1.5px solid rgba(255,255,255,.95);
  background:radial-gradient(ellipse at 15% 15%,rgba(255,255,255,.95) 0 7%,rgba(255,255,255,0) 28%),linear-gradient(180deg,rgba(255,255,255,.7),rgba(230,240,255,.35));box-shadow:0 5px 12px -9px rgba(60,30,60,.6)}
.exo.good{background:linear-gradient(180deg,#CFEFD9,#9ED7B1);border-color:#7CC596}.exo.bad{background:linear-gradient(180deg,#F8D3DA,#EFA9B6);border-color:#E58FA0}
.exfb{margin-top:14px;padding:14px 16px;border-radius:28px;font-size:14.5px;line-height:1.45}.exfb.ok{background:rgba(158,215,177,.35)}.exfb.ko{background:rgba(239,169,182,.3)}
.exscore{font-size:64px;font-weight:800;text-align:center;margin:10px 0 0;color:#7A2C4E}.exscore small{font-size:26px;opacity:.6}
.exsheet{direction:ltr;unicode-bidi:isolate;margin-top:16px;background:#fff;color:#222;border-radius:24px;padding:18px 16px;font-size:14px;line-height:1.45}
.exhead{display:flex;justify-content:space-between;gap:8px;border-bottom:2px solid #7A2C4E;padding-bottom:6px;margin-bottom:8px}.exhead b{color:#7A2C4E}
.exline{margin:6px 0 10px;color:#555}
.exlist{padding-left:22px;margin:0}.exlist li{margin:0 0 12px;break-inside:avoid}.exqq{font-weight:600;margin-bottom:4px}
.exch{display:flex;flex-wrap:wrap;gap:4px 16px}
.excorr{margin-top:18px;padding-top:10px;border-top:1px dashed #999;font-size:12.5px;color:#444}.excorr ol{padding-left:20px;margin:6px 0 0}
@media print{
  body.printing>*:not(#back){display:none!important}
  body.printing #back{position:static!important;display:block!important;background:none!important}
  body.printing .sheet{max-height:none!important;overflow:visible!important;box-shadow:none!important;background:#fff!important;border:0!important;padding:0!important;animation:none!important}
  body.printing .noprint,body.printing .grab{display:none!important}
  body.printing .exsheet{margin:0;border-radius:0;padding:0;font-size:13pt}
  body.printing .excorr{break-before:page}
  body{background:#fff!important}
}
`;
document.head.appendChild(st);

window.renderExos = render;
window.MAMS_EXOS = { series, GEN, LEVELS };
render();
})();
