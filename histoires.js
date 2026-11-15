/* Mams · Histoires à lire : lecture dans l'appli, taille du texte réglable, impression ou PDF.
   Le raccourci « Histoires » de l'accueil propose de choisir entre écouter et lire. */
(function () {
'use strict';
const H = window.HISTOIRES || [];
const AGES = [['all', 'Tous les âges'], ['2-4', '2-4 ans'], ['4-6', '4-6 ans'], ['6-8', '6-8 ans'], ['8-11', '8-11 ans'], ['11-14', '11-14 ans']];
const ST = { age: 'all', size: 1 };
S.lus = S.lus || {};

function render() {
  const list = H.map((h, i) => [h, i]).filter(([h]) => ST.age === 'all' || h.a === ST.age);
  return `<h2 class="h2">Histoires à lire</h2>
    <p class="sub">${H.length} histoires écrites pour Mams, à lire ensemble ou tout seul, à imprimer ou à enregistrer en PDF. De nouvelles histoires arrivent chaque semaine.</p>
    <button class="btn alt" id="hi-audio" style="margin:6px 0 4px">🎧 Plutôt écouter une histoire ?</button>
    <div class="wch" style="margin-top:10px">${AGES.map(([v, l]) => `<button class="chip ${ST.age === v ? 'on' : ''}" data-hia="${v}">${esc(l)}</button>`).join('')}</div>
    <div class="hilist">${list.map(([h, i]) => `<button class="hicard" data-hi="${i}"><span class="hie">${h.e}</span><div><b>${esc(h.t)}</b><p>${esc(h.d)}</p><i>${esc(h.a)} ans · ${h.m} min${S.lus[h.t] ? ' · ✅ Lue' : ''}</i></div></button>`).join('') || '<p class="empty">Bientôt des histoires pour cet âge.</p>'}</div>`;
}
function bind(el) {
  $$('[data-hia]', el).forEach(b => b.onclick = () => { ST.age = b.dataset.hia; plusRerender(); });
  $$('[data-hi]', el).forEach(b => b.onclick = () => read(+b.dataset.hi));
  $('#hi-audio', el).onclick = () => goTile('audio');
}

function read(i) {
  const h = H[i]; if (!h) return;
  openSheet(`<div class="noprint"><div class="kicker">${h.e} À lire · ${esc(h.a)} ans · ${h.m} min</div>
      <div class="hitools"><button class="chip" data-hs="-1" aria-label="Texte plus petit">A−</button><button class="chip" data-hs="1" aria-label="Texte plus grand">A+</button><button class="chip" id="hi-print">🖨️ PDF</button></div></div>
    <div class="histsheet hs${ST.size}">
      <div class="hihead"><b>Mams · Histoires</b><span>${esc(h.a)} ans</span></div>
      <h3 class="hititle">${h.e} ${esc(h.t)}</h3>
      ${h.p.map(x => `<p>${esc(x)}</p>`).join('')}
      <p class="hiend">Fin</p>
      ${h.q ? `<div class="hiq"><b>💬 On en parle ?</b><br>${esc(h.q)}</div>` : ''}
      <div class="hidraw onlyprint">Dessine ton moment préféré de l'histoire :</div>
    </div>
    <div class="row2 noprint" style="margin-top:14px"><button class="btn" id="hi-done">${S.lus[h.t] ? '✅ Déjà lue' : '✅ On l\'a lue !'}</button><button class="btn alt" id="hi-print2">🖨️ Imprimer ou enregistrer en PDF</button></div>`);
  $$('[data-hs]').forEach(b => b.onclick = () => { ST.size = Math.max(0, Math.min(3, ST.size + +b.dataset.hs)); const s = $('.histsheet'); s.className = 'histsheet hs' + ST.size; });
  const pr = () => { document.body.classList.add('printing'); setTimeout(() => window.print(), 300); };
  $('#hi-print').onclick = pr; $('#hi-print2').onclick = pr;
  $('#hi-done').onclick = () => { if (!S.lus[h.t]) { S.lus[h.t] = Date.now(); save(); if (window.addPts) addPts(3, 'histoire lue', 'lu' + h.t); } closeSheet(); if (window.plusRerender) plusRerender(); };
}

window.openHistChoice = function () {
  openSheet(`<div class="kicker">Histoires</div><h3 style="margin-top:4px">On écoute ou on lit ?</h3>
    <div class="hichoice">
      <button class="hich" id="hc-audio"><span>🎧</span><b>À écouter</b><i>Sans écran, les yeux fermés</i></button>
      <button class="hich" id="hc-lire"><span>📖</span><b>À lire</b><i>Pour tous les âges, à imprimer en PDF</i></button>
    </div>`);
  $('#hc-audio').onclick = () => { closeSheet(); goTile('audio'); };
  $('#hc-lire').onclick = () => { closeSheet(); goPlus('lire'); window.scrollTo(0, 0); };
};
window.readHistoire = read;

if (window.plusAdd) plusAdd('lire', ['📖', 'Histoires à lire', 'Pour tous les âges, en PDF', '#E9D9F2'], render, bind, '📖🌙⭐🦔', 1);

const st = document.createElement('style');
st.textContent = `
.hilist{display:flex;flex-direction:column;gap:12px;margin-top:14px}
.hicard{display:flex;gap:14px;align-items:center;text-align:left;padding:16px 20px;border-radius:999px/70px;color:var(--ink);border:1.5px solid rgba(255,255,255,.95);
  background:radial-gradient(ellipse at 15% 12%,rgba(255,255,255,.95) 0 6%,rgba(255,255,255,0) 26%),linear-gradient(180deg,rgba(255,255,255,.66),rgba(240,228,250,.35));box-shadow:0 6px 14px -10px rgba(60,30,60,.6)}
.hicard .hie{flex:none;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;background:radial-gradient(circle at 30% 28%,#fff 0 18%,rgba(255,255,255,.4) 45%),rgba(233,217,242,.8);border:1.5px solid #fff}
.hicard b{display:block;font-size:15px;line-height:1.25}.hicard p{margin:3px 0 4px;font-size:13px;line-height:1.35;opacity:.85}.hicard i{font-style:normal;font-size:11.5px;opacity:.7}
.hitools{display:flex;gap:8px;margin-top:10px}.hitools .chip{width:auto!important;height:auto!important;aspect-ratio:auto!important;border-radius:999px!important;padding:8px 14px!important;font-size:14px}
.histsheet{margin-top:12px;background:#FFFDF8;color:#2a2228;border-radius:28px;padding:20px 18px;line-height:1.65}
.histsheet p{margin:0 0 12px}
.histsheet.hs0{font-size:15px}.histsheet.hs1{font-size:17px}.histsheet.hs2{font-size:20px}.histsheet.hs3{font-size:24px}
.hihead{display:flex;justify-content:space-between;border-bottom:2px solid #7A2C4E;padding-bottom:6px;margin-bottom:12px;font-size:13px}.hihead b{color:#7A2C4E}
.hititle{font-size:1.35em;margin:0 0 14px;line-height:1.25}
.hiend{text-align:center;font-style:italic;opacity:.6}
.hiq{background:#F3E6F2;border-radius:22px;padding:12px 16px;font-size:.92em;margin-top:8px}
.onlyprint{display:none}
.hichoice{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
.hich{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;padding:22px 12px;border-radius:50%/42%;color:var(--ink);border:1.5px solid rgba(255,255,255,.95);
  background:radial-gradient(ellipse at 25% 15%,rgba(255,255,255,.95) 0 8%,rgba(255,255,255,0) 30%),linear-gradient(180deg,rgba(255,255,255,.7),rgba(233,217,242,.45));box-shadow:0 8px 16px -10px rgba(60,30,60,.6)}
.hich span{font-size:38px;line-height:1}.hich b{font-size:16px}.hich i{font-style:normal;font-size:12px;opacity:.75}
@media print{
  body.printing .histsheet{background:#fff;border-radius:0;padding:0;font-size:14pt!important;line-height:1.6}
  body.printing .histsheet p{break-inside:avoid}
  body.printing .onlyprint{display:block}
  body.printing .hidraw{margin-top:16px;border:2px dashed #999;border-radius:16px;height:9cm;padding:10px;color:#666;break-inside:avoid}
}
`;
document.head.appendChild(st);
})();
