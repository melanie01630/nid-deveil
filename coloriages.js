/* Mams · Coloriages à imprimer : mandalas (fabriqués à la demande), dessins, coloriages magiques.
   Tout est dessiné par l'appli : rien n'est téléchargé sur Internet. Chaque page s'imprime ou s'enregistre en PDF. */
(function () {
'use strict';
const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const f = (x) => Math.round(x * 10) / 10;

/* ---------- Mandalas ---------- */
function mandala(level, seed) {
  const C = 300, n = level === 1 ? pick([6, 8]) : level === 2 ? pick([8, 10, 12]) : pick([12, 14, 16, 18]);
  const rings = level === 1 ? 3 : level === 2 ? 5 : 7;
  const out = [`<circle cx="${C}" cy="${C}" r="${level === 1 ? 34 : 24}"/>`];
  let r = level === 1 ? 34 : 24; const step = (280 - r) / rings;
  const P = (rad, a) => [f(C + rad * Math.cos(a)), f(C + rad * Math.sin(a))];
  for (let k = 0; k < rings; k++) {
    const r1 = r, r2 = r + step, kind = pick(['petal', 'petal', 'arc', 'tri', 'dots', 'double']);
    const m = (kind === 'dots' && level > 1) ? n * 2 : n, w = Math.PI / m;
    for (let i = 0; i < m; i++) {
      const a = (2 * Math.PI * i) / m + (k % 2 ? w : 0);
      if (kind === 'petal' || kind === 'double') {
        const [x1, y1] = P(r1, a - w * .95), [x2, y2] = P(r2, a), [x3, y3] = P(r1, a + w * .95), [c1x, c1y] = P(r2 * .98, a - w * .9), [c2x, c2y] = P(r2 * .98, a + w * .9);
        out.push(`<path d="M${x1} ${y1}Q${c1x} ${c1y} ${x2} ${y2}Q${c2x} ${c2y} ${x3} ${y3}"/>`);
        if (kind === 'double') { const ri = r1 + step * .55, [u1, v1] = P(r1, a - w * .45), [u2, v2] = P(ri, a), [u3, v3] = P(r1, a + w * .45), [d1, e1] = P(ri, a - w * .4), [d2, e2] = P(ri, a + w * .4); out.push(`<path d="M${u1} ${v1}Q${d1} ${e1} ${u2} ${v2}Q${d2} ${e2} ${u3} ${v3}"/>`); }
      } else if (kind === 'arc') {
        const [x1, y1] = P(r1, a - w), [x3, y3] = P(r1, a + w);
        out.push(`<path d="M${x1} ${y1}A${f(r2 - r1)} ${f(r2 - r1)} 0 0 1 ${x3} ${y3}"/>`);
      } else if (kind === 'tri') {
        const [x1, y1] = P(r1, a - w), [x2, y2] = P(r2, a), [x3, y3] = P(r1, a + w);
        out.push(`<path d="M${x1} ${y1}L${x2} ${y2}L${x3} ${y3}"/>`);
      } else {
        const [x, y] = P((r1 + r2) / 2, a); out.push(`<circle cx="${x}" cy="${y}" r="${f(Math.min(step * .32, Math.PI * (r1 + r2) / 2 / m * .38))}"/>`);
      }
    }
    if (kind !== 'arc') out.push(`<circle cx="${C}" cy="${C}" r="${f(r2)}"/>`);
    r = r2;
  }
  out.push(`<circle cx="${C}" cy="${C}" r="290"/>`);
  return svg(600, out.join(''), level === 3 ? 1.6 : 2.4);
}

/* ---------- Dessins ---------- */
const DRAW = {
  'Le soleil qui sourit': '<circle cx="150" cy="150" r="58"/><circle cx="130" cy="138" r="6"/><circle cx="170" cy="138" r="6"/><path d="M122 165q28 24 56 0"/>' + Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, c = Math.cos(a), s = Math.sin(a); return `<path d="M${f(150 + 72 * c)} ${f(150 + 72 * s)}L${f(150 + 112 * c)} ${f(150 + 112 * s)}"/>`; }).join(''),
  'La maison et son arbre': '<path d="M40 150L110 90L180 150"/><rect x="55" y="150" width="110" height="100"/><rect x="95" y="190" width="30" height="60"/><rect x="65" y="165" width="22" height="22"/><rect x="133" y="165" width="22" height="22"/><rect x="140" y="98" width="16" height="30"/><path d="M10 250H290"/><rect x="225" y="190" width="18" height="60"/><circle cx="234" cy="160" r="38"/><circle cx="60" cy="40" r="14"/><path d="M200 50q15-15 30 0q15-15 30 0"/>',
  'Le poisson': '<path d="M60 150Q140 70 220 150Q140 230 60 150Z"/><path d="M220 150L275 110L262 150L275 190Z"/><circle cx="100" cy="140" r="9"/><path d="M130 110q18 40 0 80M160 105q18 45 0 90"/><path d="M125 95q25-30 55-5"/><circle cx="60" cy="90" r="8"/><circle cx="45" cy="60" r="11"/><circle cx="62" cy="30" r="6"/>',
  'Le papillon': '<path d="M150 90V220"/><circle cx="150" cy="80" r="12"/><path d="M146 70q-15-30-30-35M154 70q15-30 30-35"/><path d="M146 110Q60 30 50 120Q60 165 146 145Z"/><path d="M154 110Q240 30 250 120Q240 165 154 145Z"/><path d="M146 155Q80 160 85 215Q120 240 146 185Z"/><path d="M154 155Q220 160 215 215Q180 240 154 185Z"/><circle cx="95" cy="110" r="14"/><circle cx="205" cy="110" r="14"/><circle cx="115" cy="200" r="9"/><circle cx="185" cy="200" r="9"/>',
  'La fleur': '<circle cx="150" cy="110" r="22"/>' + Array.from({ length: 8 }, (_, i) => `<ellipse cx="150" cy="62" rx="16" ry="28" transform="rotate(${i * 45} 150 110)"/>`).join('') + '<path d="M150 132V275"/><path d="M150 220q-45-35-70-10q30 30 70 10M150 200q45-35 70-10q-30 30-70 10"/><path d="M60 275H240"/>',
  'Le chat': '<circle cx="150" cy="135" r="70"/><path d="M95 95L92 40L130 70M205 95L208 40L170 70"/><ellipse cx="125" cy="125" rx="10" ry="14"/><ellipse cx="175" cy="125" rx="10" ry="14"/><path d="M142 152h16l-8 10z"/><path d="M150 162q-10 14-24 8M150 162q10 14 24 8"/><path d="M60 145h45M62 160h43M195 145h45M195 160h43"/><path d="M100 200q-20 70 50 75q70-5 50-75"/>',
  'La voiture': '<path d="M30 190V160Q30 150 45 148L85 140L115 100H200L235 145L265 152Q275 156 275 170V190Z"/><path d="M122 108H160V142H95ZM168 108H195L222 142H168Z"/><circle cx="85" cy="195" r="26"/><circle cx="85" cy="195" r="10"/><circle cx="220" cy="195" r="26"/><circle cx="220" cy="195" r="10"/><rect x="250" y="160" width="18" height="10"/><path d="M10 222H290"/>',
  'La fusée': '<path d="M150 30Q200 80 195 180H105Q100 80 150 30Z"/><circle cx="150" cy="105" r="22"/><circle cx="150" cy="105" r="13"/><path d="M105 150L70 200L105 190ZM195 150L230 200L195 190Z"/><path d="M120 180L130 215H170L180 180"/><path d="M135 215q-5 30 15 50q20-20 15-50"/>' + '<path d="M40 50l6 12l13 2l-10 9l3 13l-12-7l-12 7l3-13l-10-9l13-2Z"/><circle cx="250" cy="70" r="5"/><circle cx="240" cy="250" r="7"/>',
  'Le bonhomme de neige': '<circle cx="150" cy="215" r="60"/><circle cx="150" cy="120" r="42"/><path d="M118 85H182M128 85V45H172V85"/><circle cx="137" cy="112" r="5"/><circle cx="163" cy="112" r="5"/><path d="M150 122L178 130L150 132Z"/><path d="M110 150q40 20 80 0"/><path d="M110 195L60 160M190 195L240 160"/><circle cx="150" cy="195" r="5"/><circle cx="150" cy="220" r="5"/><circle cx="150" cy="245" r="5"/>',
  'Le bateau': '<path d="M50 190H250L220 235H80Z"/><path d="M150 40V190"/><path d="M150 50L215 170H150Z"/><path d="M145 70L95 170H145Z"/><path d="M150 40L180 50L150 60"/><path d="M20 250q20-15 40 0t40 0t40 0t40 0t40 0t40 0t40 0"/>',
  'La chouette': '<ellipse cx="150" cy="160" rx="80" ry="100"/><path d="M85 85L95 45L125 75M215 85L205 45L175 75"/><circle cx="118" cy="120" r="28"/><circle cx="182" cy="120" r="28"/><circle cx="118" cy="120" r="11"/><circle cx="182" cy="120" r="11"/><path d="M140 145L150 165L160 145Z"/><path d="M110 190q12 10 24 0q12 10 24 0q12 10 24 0M110 215q12 10 24 0q12 10 24 0q12 10 24 0"/><path d="M110 258l-8 15M130 260l0 15M170 260l0 15M190 258l8 15"/><path d="M60 275H240"/>',
  'La pomme': '<path d="M150 90C95 60 50 100 60 160C70 230 120 265 150 245C180 265 230 230 240 160C250 100 205 60 150 90Z"/><path d="M150 90Q145 60 160 35"/><path d="M155 60Q190 30 215 55Q185 80 155 60Z"/><path d="M90 140q5-30 30-40"/>',
  'La licorne': '<path d="M100 120Q120 70 170 80Q225 95 220 150Q215 190 190 205L185 260H150L150 215Q115 210 100 175Z"/><path d="M170 80L190 20L192 88"/><path d="M178 60h10M175 70h14"/><circle cx="185" cy="120" r="6"/><path d="M135 95Q100 110 95 160Q85 205 115 240M150 88Q115 120 120 170"/><path d="M205 160q10 6 5 15"/><path d="M160 92q-10-25 10-30"/>',
  'Le dinosaure': '<path d="M40 210Q60 140 120 140Q150 80 200 85Q245 90 250 120Q252 140 225 140L200 142Q205 175 190 200Q180 210 160 210L155 250H135L135 210H105L100 250H80L80 205Q60 215 40 210Z"/><circle cx="220" cy="108" r="6"/><path d="M228 128h18"/><path d="M110 140l10-18l12 16l12-20l12 18l12-20l10 16"/><path d="M175 165l20 8"/>',
  'Le château': '<rect x="70" y="110" width="160" height="140"/><path d="M70 110V90H90V110M110 110V90H130V110M150 110V90H170V110M190 110V90H210V110"/><rect x="30" y="80" width="40" height="170"/><rect x="230" y="80" width="40" height="170"/><path d="M25 80L50 35L75 80M225 80L250 35L275 80"/><path d="M130 250V200Q150 175 170 200V250"/><rect x="95" y="140" width="20" height="28"/><rect x="185" y="140" width="20" height="28"/><path d="M50 35V15L65 22L50 28M250 35V15L265 22L250 28"/>',
  'La tortue': '<path d="M70 180Q80 95 160 95Q235 100 240 180Z"/><path d="M110 180L125 135L160 120L195 135L210 180M125 135L105 115M195 135L215 115M160 120V97"/><path d="M240 165Q270 150 275 170Q270 190 240 182"/><circle cx="262" cy="166" r="3"/><path d="M90 180q-5 30 15 35q15 0 15-30M190 180q-5 30 15 35q15 0 15-30"/><path d="M70 175L45 185"/><path d="M30 250H280"/>',
};
function drawing(name) { return svg(300, DRAW[name], 3); }

/* ---------- Coloriages magiques (calcul → couleur) ---------- */
const PIX = {
  'Le cœur': ['..........', '.11....11.', '1221..1221', '1222112221', '1222222221', '.12222221.', '..122221..', '...1221...', '....11....', '..........'],
  'Le champignon': ['...1111...', '..122221..', '.12322321.', '1222222221', '1232222321', '.11111111.', '...4444...', '...4554...', '...4444...', '..........'],
  'Le poisson': ['..........', '....111...', '..1122211.', '.12222221.1', '1232222221', '.12222222.1', '..1122211.', '....111...', '..........', '..........'],
  'La maison': ['....11....', '...1221...', '..122221..', '.12222221.', '1111111111', '1333333331', '1343334331', '1343355331', '1333355331', '1111111111'],
  'Le sapin': ['....1.....', '...121....', '..12321...', '...121....', '..12221...', '.1232321..', '..12221...', '.1222221..', '1223232221', '....44....'],
  'Le smiley': ['...1111...', '..122221..', '.12222221.', '1223223221', '1222222221', '1232222321', '1223333221', '.12222221.', '..122221..', '...1111...'],
};
const COLS = { 1: ['noir', '#222'], 2: ['rouge', '#E5484D'], 3: ['jaune', '#F5C542'], 4: ['marron', '#8B5A2B'], 5: ['vert', '#3BAA5C'] };
const COLS_BY = {
  'Le cœur': { 1: ['rouge foncé', '#9B1B30'], 2: ['rouge', '#E5484D'] },
  'Le champignon': { 1: ['noir', '#222'], 2: ['rouge', '#E5484D'], 3: ['blanc (ne pas colorier)', '#fff'], 4: ['beige', '#E9D3B0'], 5: ['marron', '#8B5A2B'] },
  'Le poisson': { 1: ['bleu foncé', '#1F4E8C'], 2: ['orange', '#F28C28'], 3: ['noir', '#222'] },
  'La maison': { 1: ['marron', '#8B5A2B'], 2: ['rouge', '#E5484D'], 3: ['jaune', '#F5C542'], 4: ['bleu', '#4A90D9'], 5: ['vert', '#3BAA5C'] },
  'Le sapin': { 1: ['vert foncé', '#1E6B3A'], 2: ['vert', '#3BAA5C'], 3: ['rouge', '#E5484D'], 4: ['marron', '#8B5A2B'] },
  'Le smiley': { 1: ['orange', '#F28C28'], 2: ['jaune', '#F5C542'], 3: ['noir', '#222'] },
};
function task(code, lv) {
  if (lv === 0) return String(code);
  if (lv === 1) { if (code === 1) return pick(["1+0", "0+1"]); const a = R(1, code - 1); return `${a}+${code - a}`; }
  if (lv === 2) { const b = R(1, 9); return `${code + b}-${b}`; }
  const k = pick([2, 3, 4, 5]); return pick([`${code * k}÷${k}`, `${k}×${code}-${(k - 1) * code}`]);
}
function magic(name, lv) {
  const g = PIX[name], key = COLS_BY[name], cs = 54, W = cs * 10, H = cs * 10; const out = [];
  g.forEach((row, y) => row.slice(0, 10).split('').forEach((ch, x) => {
    const code = /[1-9]/.test(ch) ? +ch : 0, X = x * cs, Y = y * cs;
    out.push(`<rect x="${X}" y="${Y}" width="${cs}" height="${cs}"/>`);
    if (code) { const t = task(code, lv); out.push(`<text x="${X + cs / 2}" y="${Y + cs / 2 + 5}" font-size="${t.length > 4 ? 12 : 15}" text-anchor="middle" font-family="Arial" stroke="none" fill="#333">${t}</text>`); }
  }));
  const keyH = 30 * Object.keys(key).length + 20;
  const kk = Object.entries(key).map(([c, [n, col]], i) => `<rect x="10" y="${H + 20 + i * 30}" width="22" height="22" fill="${col}"/><text x="42" y="${H + 37 + i * 30}" font-size="17" font-family="Arial" stroke="none" fill="#222">${c} = ${n}</text>`).join('');
  return `<svg viewBox="-4 -4 ${W + 8} ${H + keyH + 8}" xmlns="http://www.w3.org/2000/svg" style="direction:ltr;unicode-bidi:isolate" fill="none" stroke="#222" stroke-width="1.4">${out.join('')}${kk}</svg>`;
}
function svg(size, body, sw) { return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" fill="#fff" stroke="#111" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`; }

/* ---------- Écran ---------- */
const CL = { tab: 'dessins' };
const MLV = [[1, 'Facile', '3 à 6 ans'], [2, 'Moyen', '6 à 10 ans'], [3, 'Difficile', '10 ans et +']];
const MAG = [[0, 'Je reconnais les nombres', 'Maternelle'], [1, 'Additions', 'CP-CE1'], [2, 'Soustractions', 'CE1-CE2'], [3, 'Multiplications et divisions', 'CE2-CM2']];
function render() {
  const el = $('#colo-body'); if (!el) return;
  let body = '';
  if (CL.tab === 'dessins') body = `<div class="cogrid">${Object.keys(DRAW).map(n => `<button class="cocard" data-co="d:${esc(n)}">${drawing(n)}<b>${esc(n)}</b></button>`).join('')}</div>`;
  else if (CL.tab === 'mandalas') body = `<div class="cogrid">${MLV.map(([l, n, a]) => `<button class="cocard" data-co="m:${l}">${mandala(l)}<b>${esc(n)}</b><i>${esc(a)}</i></button>`).join('')}</div><p class="sub" style="margin-top:8px">Chaque mandala est nouveau : touche-le pour en créer un autre à l'infini.</p>`;
  else body = `<div class="cogrid">${Object.keys(PIX).map(n => `<button class="cocard" data-co="p:${esc(n)}">${magic(n, 0)}<b>${esc(n)}</b></button>`).join('')}</div>
    <div class="label">Niveau des calculs</div><div class="wch">${MAG.map(([l, n]) => `<button class="chip ${CL.mlv === l ? 'on' : ''}" data-cml="${l}">${esc(n)}</button>`).join('')}</div>`;
  el.innerHTML = `<h2 class="h2" style="margin-top:26px">Coloriages à imprimer</h2>
    <p class="sub">Des coloriages dessinés par Mams, à imprimer ou à enregistrer en PDF.</p>
    <div class="wch"><button class="chip ${CL.tab === 'dessins' ? 'on' : ''}" data-cot="dessins">🖍️ Dessins</button><button class="chip ${CL.tab === 'mandalas' ? 'on' : ''}" data-cot="mandalas">🌀 Mandalas</button><button class="chip ${CL.tab === 'magiques' ? 'on' : ''}" data-cot="magiques">✨ Coloriages magiques</button></div>${body}`;
  $$('[data-cot]', el).forEach(b => b.onclick = () => { CL.tab = b.dataset.cot; render(); });
  $$('[data-cml]', el).forEach(b => b.onclick = () => { CL.mlv = +b.dataset.cml; render(); });
  $$('[data-co]', el).forEach(b => b.onclick = () => open(b.dataset.co));
}
CL.mlv = 1;
function open(id) {
  const [t, v] = [id.slice(0, 1), id.slice(2)];
  let art, title;
  if (t === 'd') { art = drawing(v); title = v; }
  else if (t === 'm') { art = mandala(+v); title = 'Mandala · ' + MLV[+v - 1][1]; }
  else { art = magic(v, CL.mlv); title = 'Coloriage magique · ' + v; }
  openSheet(`<div class="noprint"><div class="kicker">Coloriage à imprimer</div><h3 style="margin-top:4px">${esc(title)}</h3>
    ${t === 'p' ? '<p class="sub">Fais le calcul de chaque case, puis colorie avec la couleur du résultat.</p>' : ''}
    <div class="row2"><button class="btn" id="co-print">🖨️ Imprimer ou enregistrer en PDF</button>${t === 'm' ? '<button class="btn alt" id="co-new">🔁 Un autre mandala</button>' : ''}</div></div>
    <div class="cosheet"><div class="cohead"><b>Mams · Coloriage</b><span>${esc(title)}</span></div>${art}<div class="coname">Prénom : ____________________</div></div>`);
  $('#co-print').onclick = () => { document.body.classList.add('printing'); setTimeout(() => window.print(), 300); };
  const nw = $('#co-new'); if (nw) nw.onclick = () => open(id);
}

const st = document.createElement('style');
st.textContent = `
.cogrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
.cocard{display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 12px 16px;border-radius:44px;color:var(--ink);border:1.5px solid rgba(255,255,255,.95);
  background:radial-gradient(ellipse at 20% 10%,rgba(255,255,255,.95) 0 8%,rgba(255,255,255,0) 30%),linear-gradient(180deg,rgba(255,255,255,.7),rgba(236,242,255,.35));box-shadow:0 6px 14px -10px rgba(60,30,60,.6)}
.cocard svg{width:100%;height:auto;aspect-ratio:1;background:#fff;border-radius:28px;padding:6px;box-sizing:border-box}
.cocard b{font-size:13px;text-align:center}.cocard i{font-style:normal;font-size:11.5px;opacity:.7}
.cosheet{margin-top:14px;background:#fff;border-radius:24px;padding:16px;color:#222}
.cosheet svg{width:100%;height:auto;display:block}
.cohead{display:flex;justify-content:space-between;gap:8px;border-bottom:2px solid #7A2C4E;padding-bottom:6px;margin-bottom:10px}.cohead b{color:#7A2C4E}
.coname{margin-top:10px;color:#555}
@media print{body.printing .cosheet{margin:0;border-radius:0;padding:0}body.printing .cosheet svg{max-height:85vh}}
`;
document.head.appendChild(st);
window.renderColo = render;
render();
})();
