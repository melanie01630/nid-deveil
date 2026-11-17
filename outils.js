/* =====================================================================
   Mams — outils du quotidien : Mes papiers, Carnet de santé, Frigo anti-gaspi
   Tout reste sur le téléphone (localStorage, clé « mams-outils »).
   ===================================================================== */
(function () {
  const KEY = 'mams-outils';
  let O = { papiers: [], carnet: [], frigo: [] };
  try { Object.assign(O, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  const saveO = () => { try { localStorage.setItem(KEY, JSON.stringify(O)); } catch (e) { toast('Impossible d\'enregistrer : mémoire du téléphone pleine ?'); } };
  window.MAMS_OUTILS = O;

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const DAY = 864e5;
  const today0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const isoToday = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const daysTo = s => s ? Math.round((new Date(s + 'T00:00:00') - today0()) / DAY) : null;
  const fmt = s => s ? new Date(s + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const fmtS = s => s ? new Date(s + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const plural = (n, w) => n + ' ' + w + (Math.abs(n) > 1 ? 's' : '');
  const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/œ/g, 'oe').trim();
  const stem = w => norm(w).replace(/(s|x)$/, '');
  const kidNames = () => (S.kids || []).map(k => k.n).filter(Boolean);
  const inp = 'width:100%;padding:12px;border-radius:12px;border:1px solid var(--line);margin:6px 0 12px;font:inherit';

  /* ---------- Agenda : lien Google Agenda + fichier .ics ---------- */
  const ymd = s => s.replace(/-/g, '');
  const nextDay = s => { const d = new Date(s + 'T00:00:00'); d.setDate(d.getDate() + 1); return d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0'); };
  function gcalUrl(title, date, details) {
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(title) + '&dates=' + ymd(date) + '/' + nextDay(date) + '&details=' + encodeURIComponent(details || 'Rappel ajouté depuis Mams');
  }
  function icsDownload(title, date, details) {
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    const clean = t => String(t).replace(/[\\;,]/g, m => '\\' + m).replace(/\n/g, '\\n');
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Mams//FR', 'BEGIN:VEVENT', 'UID:' + uid() + '@mams', 'DTSTAMP:' + stamp,
      'DTSTART;VALUE=DATE:' + ymd(date), 'DTEND;VALUE=DATE:' + nextDay(date), 'SUMMARY:' + clean(title), 'DESCRIPTION:' + clean(details || 'Rappel ajouté depuis Mams'),
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + clean(title), 'TRIGGER:PT9H', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'rappel-mams.ics';
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  const agendaBtns = (title, date, details) => `<div class="btns" style="display:flex;flex-direction:column;gap:8px;margin-top:12px">
    <a class="btn" href="${esc(gcalUrl(title, date, details))}" target="_blank" rel="noopener">📅 Ajouter à Google Agenda</a>
    <button class="btn alt" data-ics="1">📥 Autre agenda (fichier)</button></div>`;
  const bindIcs = (root, title, date, details) => { const b = $('[data-ics]', root); if (b) b.onclick = () => icsDownload(title, date, details); };


  /* ---------- Code secret (facultatif) pour Mes papiers et Carnet de santé ---------- */
  let UNLOCK = false, hiddenAt = 0;
  async function hashPin(pin) {
    const txt = 'mams-pin:' + pin;
    try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
    catch (e) { let h = 5381; for (const ch of txt) h = ((h << 5) + h + ch.charCodeAt(0)) >>> 0; return 'x' + h.toString(16); }
  }
  const locked = () => !!O.pin && !UNLOCK;
  const pinInput = (id, ph) => `<input id="${id}" type="password" inputmode="numeric" autocomplete="off" maxlength="4" pattern="[0-9]*" placeholder="${ph || '• • • •'}" style="${inp};text-align:center;font-size:24px;letter-spacing:10px;border-radius:999px;border:1.5px solid rgba(255,255,255,.95);background:rgba(255,255,255,.7)">`;
  const lockScreen = (page, title) => `<h2 class="h2" data-otl="${page}">${title}</h2>
      <div class="panel" style="margin-top:14px;text-align:center"><div style="font-size:44px">🔒</div>
        <b>Cette rubrique est protégée</b><p class="sub" style="margin:6px 0 10px">Tape ton code secret à 4 chiffres.</p>
        ${pinInput('pin-in')}<button class="btn" id="pin-ok">Déverrouiller</button>
        <button class="link" id="pin-lost" style="margin-top:14px;font-size:13px;color:var(--accent);font-weight:600">Code oublié ?</button></div>`;
  function bindLock(el) {
    const go = async () => {
      const v = $('#pin-in', el).value.trim();
      if (!/^\d{4}$/.test(v)) { toast('Le code fait 4 chiffres'); return; }
      if (await hashPin(v) === O.pin) { UNLOCK = true; refresh(); window.scrollTo(0, 0); }
      else { toast('Code incorrect'); $('#pin-in', el).value = ''; $('#pin-in', el).focus(); }
    };
    $('#pin-ok', el).onclick = go;
    $('#pin-in', el).onkeydown = e => { if (e.key === 'Enter') go(); };
    $('#pin-in', el).oninput = e => { if (e.target.value.length === 4) go(); };
    $('#pin-lost', el).onclick = () => {
      openSheet(`<div class="kicker">Code oublié</div><h3 style="margin-top:4px">Impossible de retrouver le code</h3>
        <p class="lead">Pour protéger tes informations, personne ne peut retrouver ton code, pas même Mams.</p>
        <p>Tu peux supprimer le code, mais <b>tous tes papiers et tous les carnets de santé seront effacés</b> de ce téléphone. Le frigo et le reste de l'appli ne bougent pas.</p>
        <button class="btn alt" id="pin-reset" style="margin-top:12px">Tout effacer et supprimer le code</button>`);
      $('#pin-reset').onclick = () => { if (confirm('Effacer définitivement tes papiers et les carnets de santé ?')) { O.papiers = []; O.carnet = []; delete O.pin; UNLOCK = false; C.sel = null; saveO(); closeSheet(); toast('Code supprimé'); refresh(); } };
    };
  }
  const pinPanel = () => `<div class="panel" style="margin-top:14px"><b>🔒 Code secret</b>
      <p class="sub" style="margin:4px 0 10px">${O.pin ? 'Activé : il protège « Mes papiers » et le « Carnet de santé ».' : 'Facultatif : protège « Mes papiers » et le « Carnet de santé » si quelqu\'un d\'autre utilise ton téléphone.'}</p>
      ${O.pin ? `<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn small" id="pin-lock" style="width:auto">Verrouiller maintenant</button><button class="btn alt small" id="pin-chg" style="width:auto">Changer</button><button class="btn alt small" id="pin-del" style="width:auto">Supprimer le code</button></div>` : `<button class="btn alt" id="pin-new">Créer un code secret</button>`}</div>`;
  function bindPinPanel(el) {
    const n = $('#pin-new', el); if (n) n.onclick = () => pinForm(false);
    const c = $('#pin-chg', el); if (c) c.onclick = () => pinForm(true);
    const l = $('#pin-lock', el); if (l) l.onclick = () => { UNLOCK = false; C.sel = null; refresh(); window.scrollTo(0, 0); toast('Verrouillé'); };
    const d = $('#pin-del', el); if (d) d.onclick = () => pinForm(true, true);
  }
  function pinForm(needOld, remove) {
    openSheet(`<div class="kicker">Code secret</div><h3 style="margin-top:4px">${remove ? 'Supprimer le code' : needOld ? 'Changer le code' : 'Créer un code secret'}</h3>
      ${needOld ? `<label class="sub" for="pf-old">Code actuel</label>${pinInput('pf-old')}` : ''}
      ${remove ? '' : `<label class="sub" for="pf-a">Nouveau code (4 chiffres)</label>${pinInput('pf-a')}<label class="sub" for="pf-b">Confirme le code</label>${pinInput('pf-b')}
      <p class="sub" style="margin:0 0 12px">⚠️ Retiens-le bien : si tu l'oublies, la seule solution est d'effacer tes papiers et les carnets de santé.</p>`}
      <button class="btn" id="pf-go">${remove ? 'Supprimer le code' : 'Enregistrer le code'}</button>`);
    $('#pf-go').onclick = async () => {
      if (needOld) { const o = $('#pf-old').value.trim(); if (await hashPin(o) !== O.pin) { toast('Code actuel incorrect'); return; } }
      if (remove) { delete O.pin; saveO(); closeSheet(); toast('Code supprimé'); refresh(); return; }
      const a = $('#pf-a').value.trim(), b = $('#pf-b').value.trim();
      if (!/^\d{4}$/.test(a)) { toast('Le code doit faire 4 chiffres'); return; }
      if (a !== b) { toast('Les deux codes ne sont pas pareils'); return; }
      O.pin = await hashPin(a); UNLOCK = true; saveO(); closeSheet(); toast('Code secret activé 🔒'); refresh();
    };
  }
  /* Reverrouille si l'appli reste en arrière-plan plus de 2 minutes */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hiddenAt = Date.now();
    else if (O.pin && UNLOCK && hiddenAt && Date.now() - hiddenAt > 120000) { UNLOCK = false; C.sel = null; refresh(); }
  });

  /* =====================================================================
     1. MES PAPIERS
     ===================================================================== */
  const DOCS = {
    cni: ['🪪', 'Carte d\'identité', 90, 'Valable 10 ans (certaines anciennes cartes d\'adulte : 15 ans).', 'Fais ta pré-demande en ligne sur le site de l\'ANTS, puis prends rendez-vous dans une mairie équipée. Les délais peuvent atteindre plusieurs semaines : anticipe.', 'https://ants.gouv.fr'],
    passeport: ['🛂', 'Passeport', 90, 'Valable 10 ans pour un adulte, 5 ans pour un enfant.', 'Pré-demande sur le site de l\'ANTS, puis rendez-vous en mairie. Avant un voyage, vérifie aussi la durée de validité exigée par le pays.', 'https://ants.gouv.fr'],
    permis: ['🚗', 'Permis de conduire', 90, 'Le permis au format carte est à renouveler tous les 15 ans.', 'Le renouvellement se fait en ligne sur le site de l\'ANTS.', 'https://ants.gouv.fr'],
    sejour: ['📄', 'Titre de séjour', 120, 'La durée dépend du titre.', 'Fais ta demande de renouvellement en ligne sur le site de l\'ANEF, plusieurs mois avant la date de fin.', 'https://administration-etrangers-en-france.interieur.gouv.fr'],
    vitale: ['💳', 'Carte Vitale', 30, 'Elle n\'expire pas, mais doit être mise à jour une fois par an.', 'Mets-la à jour en pharmacie ou sur une borne, ou utilise l\'appli carte Vitale. Note ici la date de ta prochaine mise à jour.', 'https://www.ameli.fr'],
    mutuelle: ['🩺', 'Mutuelle', 45, 'L\'attestation change en général chaque année.', 'Télécharge la nouvelle attestation sur l\'espace en ligne de ta mutuelle et compare les offres avant l\'échéance.', 'https://www.service-public.fr'],
    auto: ['🚙', 'Assurance auto', 45, 'Échéance en général annuelle.', 'Après un an de contrat, tu peux changer d\'assurance à tout moment : compare avant l\'échéance.', 'https://www.service-public.fr'],
    habitation: ['🏠', 'Assurance habitation', 45, 'Échéance en général annuelle.', 'Après un an de contrat, tu peux changer d\'assurance à tout moment : compare avant l\'échéance.', 'https://www.service-public.fr'],
    ct: ['🔧', 'Contrôle technique', 60, 'Tous les 2 ans (le premier avant les 4 ans de la voiture).', 'Prends rendez-vous dans un centre agréé un mois avant : la date limite est écrite sur ta carte grise.', 'https://www.service-public.fr'],
    ecole: ['🎒', 'École / cantine / assurance scolaire', 30, 'À refaire en général à chaque rentrée.', 'Vérifie les dates d\'inscription sur le site de ta mairie ou de l\'école.', 'https://www.service-public.fr'],
    abo: ['📺', 'Abonnement / box / forfait', 30, 'Note la fin de l\'engagement.', 'Un mois avant la fin de l\'engagement : compare, négocie ou résilie.', ''],
    autre: ['📁', 'Autre papier', 30, '', '', '']
  };
  const docState = p => {
    const n = daysTo(p.date), lead = (DOCS[p.type] || DOCS.autre)[2];
    if (n == null) return { c: '⚪', t: 'Pas de date', lvl: 3 };
    if (n < 0) return { c: '🔴', t: 'Expiré depuis ' + plural(-n, 'jour'), lvl: 0 };
    if (n === 0) return { c: '🔴', t: 'Expire aujourd\'hui', lvl: 0 };
    if (n <= lead) return { c: '🟠', t: 'Expire dans ' + plural(n, 'jour') + ' : à renouveler', lvl: 1 };
    return { c: '🟢', t: 'Valable jusqu\'au ' + fmtS(p.date), lvl: 2 };
  };
  const papLabel = p => (DOCS[p.type] || DOCS.autre)[1] + (p.qui ? ' · ' + p.qui : '');
  const sortedPap = () => O.papiers.slice().sort((a, b) => (a.date || '9999') < (b.date || '9999') ? -1 : 1);

  function renderPapiers() {
    const l = sortedPap(), st = l.map(docState);
    const cnt = k => st.filter(s => s.lvl === k).length;
    CUR = 'papiers';
    if (locked()) return lockScreen('papiers', 'Mes papiers');
    return `<h2 class="h2" data-otl="papiers">Mes papiers</h2>
      <p class="sub">Toutes les dates importantes de la famille au même endroit. Mams te prévient avant qu'il soit trop tard.</p>
      ${l.length ? `<div class="panel" style="margin:10px 0"><b>${cnt(0) ? '🔴 ' + cnt(0) + ' expiré' + (cnt(0) > 1 ? 's' : '') + ' · ' : ''}${cnt(1) ? '🟠 ' + cnt(1) + ' à renouveler · ' : ''}🟢 ${cnt(2)} en règle</b></div>` : ''}
      <div id="pap-list">${l.map((p, i) => { const d = DOCS[p.type] || DOCS.autre, s = st[i]; return `<button class="act" data-pap="${p.id}" style="width:100%;text-align:left"><div class="em">${d[0]}</div><div style="flex:1;min-width:0"><h4>${esc(papLabel(p))}</h4><p>${s.c} ${esc(s.t)}</p>${p.note ? `<span class="sub">${esc(p.note)}</span>` : ''}</div></button>`; }).join('') ||
        '<p class="empty">Aucun papier pour l\'instant. Commence par ta carte d\'identité ou ton passeport : tu ne seras plus jamais prise de court.</p>'}</div>
      <button class="btn" id="pap-add" style="margin-top:10px">＋ Ajouter un papier</button>
      <div class="warn" style="margin-top:14px">🔒 Note seulement les <b>dates</b> : ne mets jamais de numéro de carte ou de document. Tout reste sur ton téléphone.</div>${pinPanel()}`;
  }
  function bindPapiers(el) {
    if (locked()) return bindLock(el);
    bindPinPanel(el);
    $('#pap-add', el).onclick = () => papForm();
    $$('[data-pap]', el).forEach(b => b.onclick = () => papOpen(b.dataset.pap));
  }
  function papOpen(id) {
    const p = O.papiers.find(x => x.id === id); if (!p) return;
    const d = DOCS[p.type] || DOCS.autre, s = docState(p);
    const lead = d[2], n = daysTo(p.date);
    const remind = p.date ? (n > lead ? (() => { const r = new Date(p.date + 'T00:00:00'); r.setDate(r.getDate() - lead); return r.toISOString().slice(0, 10); })() : isoToday()) : null;
    const title = 'Renouveler : ' + papLabel(p);
    openSheet(`<div class="kicker">${d[0]} Mes papiers</div><h3 style="margin-top:4px">${esc(papLabel(p))}</h3>
      <p class="lead">${s.c} ${esc(s.t)}${p.date ? '<br><span class="sub">Date de fin : ' + esc(fmt(p.date)) + '</span>' : ''}</p>
      ${p.note ? `<p>${esc(p.note)}</p>` : ''}
      ${d[3] ? `<div class="panel" style="margin:10px 0"><b>Bon à savoir</b><p class="sub" style="margin:4px 0 0">${esc(d[3])}</p>${d[4] ? `<p class="sub" style="margin:8px 0 0">${esc(d[4])}</p>` : ''}${d[5] ? `<a class="btn alt small" href="${d[5]}" target="_blank" rel="noopener" style="margin-top:10px">Site officiel ↗</a>` : ''}</div>` : ''}
      ${remind ? `<b>Me le rappeler ${n > lead ? 'le ' + esc(fmt(remind)) : 'aujourd\'hui'}</b>${agendaBtns(title, remind, 'Date de fin : ' + fmt(p.date) + (d[4] ? '\n' + d[4] : ''))}` : ''}
      <div style="display:flex;gap:8px;margin-top:14px"><button class="btn alt" id="pp-edit">Modifier</button><button class="btn alt" id="pp-del">Supprimer</button></div>`);
    if (remind) bindIcs($('#sheet'), title, remind, 'Date de fin : ' + fmt(p.date));
    $('#pp-edit').onclick = () => papForm(p);
    $('#pp-del').onclick = () => { if (confirm('Supprimer ce papier ?')) { O.papiers = O.papiers.filter(x => x.id !== id); saveO(); closeSheet(); refresh(); } };
  }
  function papForm(p) {
    const cur = p || { type: 'cni', qui: '', date: '', note: '' };
    openSheet(`<div class="kicker">Mes papiers</div><h3 style="margin-top:4px">${p ? 'Modifier' : 'Ajouter un papier'}</h3>
      <label class="sub">Quel papier ?</label>
      <div class="chips otl-chips" id="pf-type" style="flex-wrap:wrap;margin:6px 0 12px">${Object.entries(DOCS).map(([k, d]) => `<button class="chip ${cur.type === k ? 'on' : ''}" data-t="${k}">${d[0]} ${esc(d[1])}</button>`).join('')}</div>
      <label class="sub" for="pf-qui">Pour qui ?</label>
      <input id="pf-qui" type="text" maxlength="30" list="pf-names" value="${esc(cur.qui)}" placeholder="Moi, Léa, la voiture…" style="${inp}">
      <datalist id="pf-names">${['Moi'].concat(kidNames()).map(n => `<option value="${esc(n)}">`).join('')}</datalist>
      <label class="sub" for="pf-date">Date de fin de validité (ou prochaine échéance)</label>
      <input id="pf-date" type="date" value="${esc(cur.date)}" style="${inp}">
      <label class="sub" for="pf-note">Note (facultatif, sans numéro)</label>
      <input id="pf-note" type="text" maxlength="80" value="${esc(cur.note)}" placeholder="ex : rendez-vous mairie à prendre" style="${inp}">
      <button class="btn" id="pf-save">Enregistrer</button>`);
    let type = cur.type;
    $$('#pf-type .chip').forEach(c => c.onclick = () => { type = c.dataset.t; $$('#pf-type .chip').forEach(x => x.classList.toggle('on', x === c)); });
    $('#pf-save').onclick = () => {
      const v = { id: p ? p.id : uid(), type, qui: $('#pf-qui').value.trim(), date: $('#pf-date').value, note: $('#pf-note').value.trim() };
      if (!v.date && !confirm('Pas de date : Mams ne pourra pas te prévenir. Enregistrer quand même ?')) return;
      if (p) Object.assign(p, v); else O.papiers.push(v);
      saveO(); closeSheet(); toast('Papier enregistré'); refresh();
    };
  }

  /* =====================================================================
     2. CARNET DE SANTÉ
     ===================================================================== */
  const C = { sel: null };
  let CUR = null;
  const child = () => O.carnet.find(c => c.id === C.sel);
  const nextOf = c => {
    const ev = [];
    (c.vaccins || []).forEach(v => { if (v.rappel) ev.push({ d: v.rappel, t: 'Rappel ' + v.nom, e: '💉' }); });
    (c.rdv || []).forEach(r => { if (r.date) ev.push({ d: r.date, t: r.quoi || 'Rendez-vous', e: '🩺' }); });
    return ev.filter(e => daysTo(e.d) >= -7).sort((a, b) => a.d < b.d ? -1 : 1);
  };
  const ageTxt = s => { if (!s) return ''; const b = new Date(s + 'T00:00:00'), n = new Date(); let m = (n.getFullYear() - b.getFullYear()) * 12 + n.getMonth() - b.getMonth(); if (n.getDate() < b.getDate()) m--; return m < 24 ? plural(Math.max(m, 0), 'mois').replace('moiss', 'mois') : plural(Math.floor(m / 12), 'an'); };

  function renderCarnet() {
    CUR = 'carnet';
    if (locked()) return lockScreen('carnet', 'Carnet de santé');
    const c = child();
    if (!c) {
      return `<h2 class="h2" data-otl="carnet">Carnet de santé</h2>
        <p class="sub">Vaccins, rendez-vous, taille et poids, allergies : toujours sur toi, même sans le carnet papier.</p>
        <div id="cs-kids">${O.carnet.map(k => { const nx = nextOf(k)[0]; return `<button class="act" data-kid="${k.id}" style="width:100%;text-align:left"><div class="em">🧒</div><div style="flex:1;min-width:0"><h4>${esc(k.nom)}</h4><p>${k.naissance ? esc(ageTxt(k.naissance)) : 'Âge non renseigné'}${k.allergies ? ' · ⚠️ Allergies notées' : ''}</p>${nx ? `<span class="sub">${nx.e} ${esc(nx.t)} : ${esc(fmtS(nx.d))}</span>` : ''}</div></button>`; }).join('') ||
          '<p class="empty">Ajoute ton premier enfant pour commencer son carnet.</p>'}</div>
        <button class="btn" id="cs-add" style="margin-top:10px">＋ Ajouter un enfant</button>
        ${urgences()}
        <div class="warn" style="margin-top:14px">Ce carnet ne remplace pas le carnet de santé officiel ni l'avis d'un médecin. Tout reste sur ton téléphone.</div>${pinPanel()}`;
    }
    const nx = nextOf(c);
    const mes = (c.mesures || []).slice().sort((a, b) => a.date < b.date ? 1 : -1);
    const vac = (c.vaccins || []).slice().sort((a, b) => (a.date || '') < (b.date || '') ? 1 : -1);
    return `<span data-otl="carnet"></span><button class="link" id="cs-back" style="color:var(--accent);font-weight:600;margin:6px 0">‹ Tous les enfants</button>
      <h2 class="h2">🧒 ${esc(c.nom)}</h2>
      <p class="sub">${c.naissance ? 'Né(e) le ' + esc(fmt(c.naissance)) + ' · ' + esc(ageTxt(c.naissance)) : ''}</p>
      ${nx.length ? `<div class="panel" style="margin:10px 0"><b>À venir</b>${nx.slice(0, 4).map(e => { const n = daysTo(e.d); return `<p style="margin:6px 0 0">${e.e} ${esc(e.t)} · <b>${n < 0 ? 'en retard' : n === 0 ? 'aujourd\'hui' : 'dans ' + plural(n, 'jour')}</b> <span class="sub">(${esc(fmtS(e.d))})</span></p>`; }).join('')}</div>` : ''}
      <div class="panel" style="margin:10px 0"><b>🚑 Fiche d'urgence</b>
        <p style="margin:8px 0 0"><span class="sub">Allergies :</span> ${esc(c.allergies || 'aucune notée')}</p>
        <p style="margin:4px 0 0"><span class="sub">Traitements :</span> ${esc(c.traitements || 'aucun noté')}</p>
        ${c.groupe ? `<p style="margin:4px 0 0"><span class="sub">Groupe sanguin :</span> ${esc(c.groupe)}</p>` : ''}
        <p style="margin:4px 0 0"><span class="sub">Médecin :</span> ${esc(c.medecin || 'non renseigné')}${c.medTel ? ` · <a href="tel:${esc(c.medTel.replace(/\s/g, ''))}">📞 ${esc(c.medTel)}</a>` : ''}</p>
        ${c.notes ? `<p style="margin:4px 0 0"><span class="sub">À savoir :</span> ${esc(c.notes)}</p>` : ''}
        <div style="display:flex;gap:8px;margin-top:12px"><button class="btn alt small" id="cs-edit">Modifier</button><button class="btn small" id="cs-share">Partager la fiche</button></div>
        <p class="sub" style="margin:8px 0 0">Pratique pour la nounou, l'école ou les grands-parents.</p></div>
      <div class="panel" style="margin:10px 0"><div style="display:flex;justify-content:space-between;align-items:center"><b>💉 Vaccins</b><button class="btn alt small" id="cs-vac" style="width:auto">＋ Ajouter</button></div>
        ${vac.map(v => `<div style="display:flex;gap:8px;align-items:center;margin-top:10px"><div style="flex:1"><b style="font-size:14px">${esc(v.nom)}</b><br><span class="sub">${v.date ? 'Fait le ' + esc(fmtS(v.date)) : ''}${v.rappel ? ' · Rappel : ' + esc(fmtS(v.rappel)) : ''}</span></div>${v.rappel ? `<button class="btn alt small" data-vrem="${v.id}" style="width:auto">📅</button>` : ''}<button class="btn alt small" data-vdel="${v.id}" style="width:auto">✕</button></div>`).join('') || '<p class="sub" style="margin:8px 0 0">Aucun vaccin noté.</p>'}
        <a class="sub" href="https://vaccination-info-service.fr" target="_blank" rel="noopener" style="display:block;margin-top:10px">Le calendrier officiel des vaccinations ↗</a></div>
      <div class="panel" style="margin:10px 0"><div style="display:flex;justify-content:space-between;align-items:center"><b>🩺 Rendez-vous</b><button class="btn alt small" id="cs-rdv" style="width:auto">＋ Ajouter</button></div>
        ${(c.rdv || []).slice().sort((a, b) => a.date < b.date ? -1 : 1).map(r => `<div style="display:flex;gap:8px;align-items:center;margin-top:10px"><div style="flex:1"><b style="font-size:14px">${esc(r.quoi)}</b><br><span class="sub">${esc(fmt(r.date))}${daysTo(r.date) < 0 ? ' · passé' : ''}</span></div><button class="btn alt small" data-rrem="${r.id}" style="width:auto">📅</button><button class="btn alt small" data-rdel="${r.id}" style="width:auto">✕</button></div>`).join('') || '<p class="sub" style="margin:8px 0 0">Aucun rendez-vous.</p>'}</div>
      <div class="panel" style="margin:10px 0"><div style="display:flex;justify-content:space-between;align-items:center"><b>📏 Taille et poids</b><button class="btn alt small" id="cs-mes" style="width:auto">＋ Ajouter</button></div>
        ${mes.length ? `<table style="width:100%;margin-top:10px;border-collapse:collapse;font-size:14px"><tr class="sub"><td>Date</td><td>Taille</td><td>Poids</td><td></td></tr>${mes.map(m => `<tr><td style="padding:5px 0">${esc(fmtS(m.date))}</td><td>${m.taille ? esc(m.taille) + ' cm' : '–'}</td><td>${m.poids ? esc(m.poids) + ' kg' : '–'}</td><td style="text-align:right"><button class="link" data-mdel="${m.id}" aria-label="Supprimer">✕</button></td></tr>`).join('')}</table>` : '<p class="sub" style="margin:8px 0 0">Aucune mesure notée.</p>'}</div>
      ${urgences()}
      <button class="btn alt" id="cs-delkid" style="margin-top:12px">Supprimer le carnet de ${esc(c.nom)}</button>
      <div class="warn" style="margin-top:14px">Ce carnet ne remplace pas le carnet de santé officiel ni l'avis d'un médecin. Tout reste sur ton téléphone.</div>`;
  }
  const urgences = () => `<div class="panel" style="margin:12px 0 0"><b>☎️ Numéros d'urgence</b>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">
      <a class="btn alt small" href="tel:15">15 · SAMU</a><a class="btn alt small" href="tel:112">112 · Urgence</a>
      <a class="btn alt small" href="tel:18">18 · Pompiers</a><a class="btn alt small" href="sms:114">114 · Par SMS</a></div>
    <p class="sub" style="margin:8px 0 0">Intoxication, produit avalé : appelle le 15, qui te met en lien avec le centre antipoison.</p></div>`;

  function bindCarnet(el) {
    if (locked()) return bindLock(el);
    const c = child();
    if (!c) {
      bindPinPanel(el);
      $('#cs-add', el).onclick = () => kidForm();
      $$('[data-kid]', el).forEach(b => b.onclick = () => { C.sel = b.dataset.kid; refresh(); window.scrollTo(0, 0); });
      return;
    }
    $('#cs-back', el).onclick = () => { C.sel = null; refresh(); window.scrollTo(0, 0); };
    $('#cs-edit', el).onclick = () => kidForm(c);
    $('#cs-share', el).onclick = () => shareKid(c);
    $('#cs-vac', el).onclick = () => vacForm(c);
    $('#cs-rdv', el).onclick = () => rdvForm(c);
    $('#cs-mes', el).onclick = () => mesForm(c);
    $('#cs-delkid', el).onclick = () => { if (confirm('Supprimer tout le carnet de ' + c.nom + ' ?')) { O.carnet = O.carnet.filter(x => x.id !== c.id); C.sel = null; saveO(); refresh(); } };
    const del = (attr, arr) => $$('[' + attr + ']', el).forEach(b => b.onclick = () => { if (confirm('Supprimer ?')) { c[arr] = c[arr].filter(x => x.id !== b.getAttribute(attr)); saveO(); refresh(); } });
    del('data-vdel', 'vaccins'); del('data-rdel', 'rdv'); del('data-mdel', 'mesures');
    $$('[data-vrem]', el).forEach(b => b.onclick = () => { const v = c.vaccins.find(x => x.id === b.dataset.vrem); remindSheet('Rappel vaccin ' + v.nom + ' · ' + c.nom, v.rappel); });
    $$('[data-rrem]', el).forEach(b => b.onclick = () => { const r = c.rdv.find(x => x.id === b.dataset.rrem); remindSheet(r.quoi + ' · ' + c.nom, r.date); });
  }
  function remindSheet(title, date) {
    openSheet(`<div class="kicker">Rappel</div><h3 style="margin-top:4px">${esc(title)}</h3><p class="lead">${esc(fmt(date))}</p>${agendaBtns(title, date)}`);
    bindIcs($('#sheet'), title, date);
  }
  function shareKid(c) {
    const t = `Fiche santé de ${c.nom}${c.naissance ? ' (né(e) le ' + fmt(c.naissance) + ')' : ''}\n• Allergies : ${c.allergies || 'aucune connue'}\n• Traitements : ${c.traitements || 'aucun'}${c.groupe ? '\n• Groupe sanguin : ' + c.groupe : ''}\n• Médecin : ${c.medecin || 'non renseigné'}${c.medTel ? ' (' + c.medTel + ')' : ''}${c.notes ? '\n• À savoir : ' + c.notes : ''}\n• En cas d'urgence : 15 (SAMU) ou 112\n\nEnvoyé depuis Mams`;
    if (navigator.share) navigator.share({ title: 'Fiche santé de ' + c.nom, text: t }).catch(() => {});
    else (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast('Fiche copiée : colle-la dans un message'), () => openSheet(`<h3>Fiche à copier</h3><textarea style="width:100%;height:220px;${inp}">${esc(t)}</textarea>`));
  }
  function kidForm(c) {
    const cur = c || { nom: '', naissance: '', allergies: '', traitements: '', groupe: '', medecin: '', medTel: '', notes: '' };
    const sugg = kidNames().filter(n => !O.carnet.some(k => k.nom === n));
    openSheet(`<div class="kicker">Carnet de santé</div><h3 style="margin-top:4px">${c ? 'Modifier la fiche' : 'Ajouter un enfant'}</h3>
      ${!c && sugg.length ? `<div class="chips otl-chips" style="flex-wrap:wrap;margin:6px 0 10px">${sugg.map(n => `<button class="chip" data-sn="${esc(n)}">${esc(n)}</button>`).join('')}</div>` : ''}
      <label class="sub" for="kf-nom">Prénom</label><input id="kf-nom" type="text" maxlength="30" value="${esc(cur.nom)}" style="${inp}">
      <label class="sub" for="kf-nais">Date de naissance</label><input id="kf-nais" type="date" value="${esc(cur.naissance)}" style="${inp}">
      <label class="sub" for="kf-all">Allergies</label><input id="kf-all" type="text" maxlength="120" value="${esc(cur.allergies)}" placeholder="ex : arachide, pénicilline" style="${inp}">
      <label class="sub" for="kf-trt">Traitements en cours</label><input id="kf-trt" type="text" maxlength="120" value="${esc(cur.traitements)}" placeholder="ex : Ventoline si besoin" style="${inp}">
      <label class="sub" for="kf-grp">Groupe sanguin (facultatif)</label><input id="kf-grp" type="text" maxlength="5" value="${esc(cur.groupe)}" placeholder="ex : O+" style="${inp}">
      <label class="sub" for="kf-med">Médecin ou pédiatre</label><input id="kf-med" type="text" maxlength="60" value="${esc(cur.medecin)}" style="${inp}">
      <label class="sub" for="kf-tel">Téléphone du médecin</label><input id="kf-tel" type="tel" maxlength="20" value="${esc(cur.medTel)}" style="${inp}">
      <label class="sub" for="kf-not">À savoir (facultatif)</label><input id="kf-not" type="text" maxlength="160" value="${esc(cur.notes)}" placeholder="ex : a peur des piqûres, doudou indispensable" style="${inp}">
      <button class="btn" id="kf-save">Enregistrer</button>`);
    $$('[data-sn]').forEach(b => b.onclick = () => { $('#kf-nom').value = b.dataset.sn; });
    $('#kf-save').onclick = () => {
      const nom = $('#kf-nom').value.trim(); if (!nom) { toast('Écris le prénom'); return; }
      const v = { nom, naissance: $('#kf-nais').value, allergies: $('#kf-all').value.trim(), traitements: $('#kf-trt').value.trim(), groupe: $('#kf-grp').value.trim(), medecin: $('#kf-med').value.trim(), medTel: $('#kf-tel').value.trim(), notes: $('#kf-not').value.trim() };
      if (c) Object.assign(c, v); else { const k = Object.assign({ id: uid(), vaccins: [], mesures: [], rdv: [] }, v); O.carnet.push(k); C.sel = k.id; }
      saveO(); closeSheet(); toast('Carnet enregistré'); refresh();
    };
  }
  function vacForm(c) {
    const V = ['DTCaPolio', 'Coqueluche', 'Hépatite B', 'Pneumocoque', 'Méningocoque', 'ROR (rougeole, oreillons, rubéole)', 'BCG', 'HPV', 'Grippe', 'Covid'];
    openSheet(`<div class="kicker">Vaccin · ${esc(c.nom)}</div><h3 style="margin-top:4px">Ajouter un vaccin</h3>
      <label class="sub" for="vf-nom">Vaccin</label><input id="vf-nom" type="text" list="vf-l" maxlength="60" style="${inp}"><datalist id="vf-l">${V.map(v => `<option value="${esc(v)}">`).join('')}</datalist>
      <label class="sub" for="vf-date">Fait le</label><input id="vf-date" type="date" value="${isoToday()}" style="${inp}">
      <label class="sub" for="vf-rap">Prochain rappel (facultatif, d'après le médecin)</label><input id="vf-rap" type="date" style="${inp}">
      <button class="btn" id="vf-save">Enregistrer</button>`);
    $('#vf-save').onclick = () => { const nom = $('#vf-nom').value.trim(); if (!nom) { toast('Écris le nom du vaccin'); return; } (c.vaccins = c.vaccins || []).push({ id: uid(), nom, date: $('#vf-date').value, rappel: $('#vf-rap').value }); saveO(); closeSheet(); toast('Vaccin noté'); refresh(); };
  }
  function rdvForm(c) {
    openSheet(`<div class="kicker">Rendez-vous · ${esc(c.nom)}</div><h3 style="margin-top:4px">Ajouter un rendez-vous</h3>
      <label class="sub" for="rf-q">Quoi ?</label><input id="rf-q" type="text" maxlength="60" placeholder="ex : Pédiatre, dentiste, orthophoniste" style="${inp}">
      <label class="sub" for="rf-d">Quand ?</label><input id="rf-d" type="date" style="${inp}">
      <button class="btn" id="rf-save">Enregistrer</button>`);
    $('#rf-save').onclick = () => { const q = $('#rf-q').value.trim(), d = $('#rf-d').value; if (!q || !d) { toast('Écris le rendez-vous et sa date'); return; } (c.rdv = c.rdv || []).push({ id: uid(), quoi: q, date: d }); saveO(); closeSheet(); toast('Rendez-vous noté'); refresh(); };
  }
  function mesForm(c) {
    openSheet(`<div class="kicker">Mesures · ${esc(c.nom)}</div><h3 style="margin-top:4px">Taille et poids</h3>
      <label class="sub" for="mf-d">Date</label><input id="mf-d" type="date" value="${isoToday()}" style="${inp}">
      <label class="sub" for="mf-t">Taille (cm)</label><input id="mf-t" type="number" inputmode="decimal" step="0.1" min="30" max="200" style="${inp}">
      <label class="sub" for="mf-p">Poids (kg)</label><input id="mf-p" type="number" inputmode="decimal" step="0.01" min="1" max="150" style="${inp}">
      <button class="btn" id="mf-save">Enregistrer</button>`);
    $('#mf-save').onclick = () => { const t = $('#mf-t').value, p = $('#mf-p').value; if (!t && !p) { toast('Note au moins la taille ou le poids'); return; } (c.mesures = c.mesures || []).push({ id: uid(), date: $('#mf-d').value || isoToday(), taille: t, poids: p }); saveO(); closeSheet(); toast('Mesure notée'); refresh(); };
  }

  /* =====================================================================
     3. FRIGO ANTI-GASPI
     ===================================================================== */
  const SUGG = ['Œufs', 'Lait', 'Fromage', 'Jambon', 'Poulet', 'Tomates', 'Courgettes', 'Carottes', 'Pommes de terre', 'Pâtes', 'Riz', 'Crème', 'Yaourts', 'Pain', 'Bananes', 'Lardons'];
  const fState = f => { const n = daysTo(f.dlc); if (n == null) return { c: '', t: '', lvl: 3 }; if (n < 0) return { c: '🔴', t: 'Date dépassée', lvl: 0 }; if (n === 0) return { c: '🔴', t: 'À finir aujourd\'hui', lvl: 0 }; if (n <= 2) return { c: '🟠', t: 'À finir d\'ici ' + plural(n, 'jour'), lvl: 1 }; return { c: '🟢', t: 'Jusqu\'au ' + fmtS(f.dlc), lvl: 2 }; };
  const sortedFrigo = () => O.frigo.slice().sort((a, b) => (a.dlc || '9999') < (b.dlc || '9999') ? -1 : 1);
  function matchRecipes() {
    const R = window.RECETTES || []; if (!O.frigo.length) return [];
    const items = O.frigo.map(f => ({ k: stem(f.nom).split(/\s+/).filter(w => w.length > 2), u: fState(f).lvl <= 1, n: f.nom }));
    return R.map((r, n) => {
      const ing = String(r.i || '').split(/,|\bet\b/).map(norm).filter(Boolean);
      const used = [], seen = new Set(); let score = 0;
      items.forEach(it => { if (!it.k.length) return; const hit = ing.some(x => it.k.every(w => x.split(/\s+/).map(stem).some(y => y === w || y.startsWith(w) || w.startsWith(y) && y.length > 3))); if (hit && !seen.has(it.n)) { seen.add(it.n); used.push(it.n); score += it.u ? 3 : 1; } });
      return { r, n, used, score, miss: Math.max(ing.length - used.length, 0) };
    }).filter(x => x.used.length).sort((a, b) => b.score - a.score || a.miss - b.miss || a.r.m - b.r.m).slice(0, 8);
  }
  function renderFrigo() {
    const l = sortedFrigo(), recs = matchRecipes();
    CUR = 'frigo';
    return `<h2 class="h2" data-otl="frigo">Frigo anti-gaspi</h2>
      <p class="sub">Note ce qu'il reste, Mams te dit quoi finir en premier et quoi cuisiner avec.</p>
      <div class="panel" style="margin:10px 0"><b>Ajouter un aliment</b>
        <div style="display:flex;gap:8px;margin-top:8px"><input id="fr-nom" type="text" maxlength="40" placeholder="ex : courgettes" style="flex:1;min-width:0;padding:12px;border-radius:12px;border:1px solid var(--line);font:inherit"><input id="fr-dlc" type="date" aria-label="Date limite (facultatif)" style="flex:none;width:44%;padding:12px;border-radius:12px;border:1px solid var(--line);font:inherit"></div>
        <button class="btn" id="fr-add" style="margin-top:10px">Ajouter</button>
        <p class="sub" style="margin:10px 0 6px">Ajout rapide :</p>
        <div class="chips otl-chips" style="flex-wrap:wrap">${SUGG.map(s => `<button class="chip" data-sg="${esc(s)}">${esc(s)}</button>`).join('')}</div></div>
      <div class="sec-title" style="margin-top:14px"><h3>Dans mon frigo${l.length ? ' (' + l.length + ')' : ''}</h3>${l.length ? '<button class="link" id="fr-clear" style="font-size:13px;color:var(--accent);font-weight:600">Tout vider</button>' : ''}</div>
      ${l.map(f => { const s = fState(f); return `<div class="act" style="width:100%"><div class="em">${s.c || '🥕'}</div><div style="flex:1;min-width:0"><h4>${esc(f.nom)}</h4>${s.t ? `<p>${esc(s.t)}</p>` : '<p class="sub">Pas de date</p>'}</div><button class="btn alt small" data-fdel="${f.id}" style="width:auto">✓ Fini</button></div>`; }).join('') || '<p class="empty">Ton frigo est vide dans Mams. Ajoute ce qu\'il te reste pour voir les recettes possibles.</p>'}
      ${l.length ? `<div class="sec-title" style="margin-top:18px"><h3>🍳 Que cuisiner avec ?</h3></div>
        ${recs.map(x => `<button class="act" data-frn="${x.n}" style="width:100%;text-align:left"><div class="em">${x.r.g === 'd' ? '🍰' : '🍲'}</div><div style="flex:1;min-width:0"><h4>${esc(x.r.t)}</h4><p>Utilise : ${esc(x.used.join(', '))}</p><span class="sub">${x.r.m} min · ${x.miss ? 'il manque ' + plural(x.miss, 'ingrédient') : 'tu as tout !'}</span></div></button>`).join('') || '<p class="empty">Pas encore de recette avec ces aliments. Essaie d\'en ajouter d\'autres (œufs, pâtes, fromage…).</p>'}` : ''}
      <div class="panel" style="margin-top:16px"><b>💡 Les bons réflexes</b>
        <p class="sub" style="margin:6px 0 0"><b>« À consommer jusqu'au »</b> (DLC) : ne pas dépasser la date.</p>
        <p class="sub" style="margin:6px 0 0"><b>« À consommer de préférence avant »</b> (DDM) : encore bon après la date si l'emballage est intact, il perd seulement un peu de goût.</p>
        <p class="sub" style="margin:6px 0 0">Range devant ce qui périme en premier.</p>
        <p class="sub" style="margin:6px 0 0">Pain rassis : pain perdu. Bananes trop mûres : gâteau ou smoothie.</p>
        <p class="sub" style="margin:6px 0 0">Les restes se congèlent très bien en petites portions.</p></div>`;
  }
  function bindFrigo(el) {
    const add = (nom, dlc) => { nom = String(nom || '').trim(); if (!nom) { toast('Écris un aliment'); return; } O.frigo.push({ id: uid(), nom: nom.charAt(0).toUpperCase() + nom.slice(1), dlc: dlc || '' }); saveO(); refresh(); toast(nom + ' ajouté'); };
    $('#fr-add', el).onclick = () => add($('#fr-nom').value, $('#fr-dlc').value);
    $('#fr-nom', el).onkeydown = e => { if (e.key === 'Enter') add($('#fr-nom').value, $('#fr-dlc').value); };
    $$('[data-sg]', el).forEach(b => b.onclick = () => add(b.dataset.sg, ''));
    $$('[data-fdel]', el).forEach(b => b.onclick = () => { O.frigo = O.frigo.filter(x => x.id !== b.dataset.fdel); saveO(); refresh(); });
    $$('[data-frn]', el).forEach(b => b.onclick = () => window.openRecette && openRecette(+b.dataset.frn));
    const cl = $('#fr-clear', el); if (cl) cl.onclick = () => { if (confirm('Vider tout le frigo ?')) { O.frigo = []; saveO(); refresh(); } };
  }

  /* =====================================================================
     Branchement dans l'appli (onglet Plus + accueil)
     ===================================================================== */
  const refresh = () => {
    const v = document.getElementById('view-plus'), body = document.getElementById('plus-body');
    if (CUR && v && v.classList.contains('active') && body && body.querySelector('[data-otl="' + CUR + '"]')) { const y = window.scrollY; goPlus(CUR); window.scrollTo(0, y); }
    renderHomeTools();
  };
  if (window.plusAdd) {
    plusAdd('papiers', ['📄', 'Mes papiers', 'Dates de validité et rappels', '#D3E4F4'], renderPapiers, bindPapiers, '🪪🛂📅🔔', 0);
    plusAdd('carnet', ['🩺', 'Carnet de santé', 'Vaccins, rendez-vous, mesures', '#F9D6D6'], () => renderCarnet(), bindCarnet, '💉🩺📏❤️', 1);
    plusAdd('frigo', ['🥕', 'Frigo anti-gaspi', 'Que cuisiner avec ce qui reste', '#D6ECE2'], renderFrigo, bindFrigo, '🥕🧀🥚🍅', 2);
  }

  const ost = document.createElement('style');
  ost.textContent = '.otl-chips{gap:8px}.otl-chips .chip{width:auto!important;height:auto!important;min-height:0!important;aspect-ratio:auto!important;border-radius:999px!important;padding:8px 14px!important;font-size:14px!important;flex:none!important}';
  document.head.appendChild(ost);

  /* Alertes de l'accueil */
  function homeAlerts() {
    let a = [];
    O.papiers.forEach(p => { const s = docState(p); if (s.lvl <= 1) a.push({ lvl: s.lvl, e: s.c, t: papLabel(p) + ' : ' + s.t.toLowerCase(), go: 'papiers' }); });
    O.carnet.forEach(c => nextOf(c).forEach(ev => { const n = daysTo(ev.d); if (n <= 14) a.push({ lvl: n < 0 ? 0 : 1, e: ev.e, t: ev.t + ' · ' + c.nom + ' : ' + (n < 0 ? 'en retard' : n === 0 ? 'aujourd\'hui' : 'dans ' + plural(n, 'jour')), go: 'carnet', kid: c.id }); }));
    if (locked()) {
      const np = a.filter(x => x.go === 'papiers').length, nc = a.filter(x => x.go === 'carnet').length;
      a = [];
      if (np) a.push({ lvl: 1, e: '🔒', t: plural(np, 'rappel') + ' dans Mes papiers', go: 'papiers' });
      if (nc) a.push({ lvl: 1, e: '🔒', t: plural(nc, 'rappel') + ' dans le Carnet de santé', go: 'carnet' });
    }
    const urg = O.frigo.filter(f => fState(f).lvl <= 1);
    if (urg.length) a.push({ lvl: 1, e: '🥕', t: plural(urg.length, 'aliment') + ' à finir vite : ' + urg.slice(0, 3).map(f => f.nom.toLowerCase()).join(', '), go: 'frigo' });
    return a.sort((x, y) => x.lvl - y.lvl);
  }
  function renderHomeTools() {
    const el = document.getElementById('home-tools'); if (!el) return;
    const a = homeAlerts();
    const cnt = { papiers: O.papiers.length, carnet: O.carnet.length, frigo: O.frigo.length };
    el.innerHTML = `<div class="sec-title"><h3>Mon quotidien</h3></div>
      ${a.length ? `<div class="panel" style="margin-bottom:10px"><b>🔔 À ne pas oublier</b>${a.slice(0, 4).map((x, i) => `<button class="link" data-ha="${i}" style="display:block;width:100%;text-align:left;margin-top:8px;font-size:14px;color:var(--ink)">${x.e} ${esc(x.t)} ›</button>`).join('')}</div>` : ''}
      <div class="tiles">
        <button class="tile" data-tool="papiers"><span style="font-size:24px">📄</span><div><b>Mes papiers</b><span>${cnt.papiers ? plural(cnt.papiers, 'papier') + ' suivi' + (cnt.papiers > 1 ? 's' : '') : 'Ne rate plus aucune date'}</span></div></button>
        <button class="tile" data-tool="carnet"><span style="font-size:24px">🩺</span><div><b>Carnet de santé</b><span>${cnt.carnet ? plural(cnt.carnet, 'carnet') : 'Vaccins, rendez-vous, mesures'}</span></div></button>
        <button class="tile" data-tool="frigo"><span style="font-size:24px">🥕</span><div><b>Frigo anti-gaspi</b><span>${cnt.frigo ? plural(cnt.frigo, 'aliment') + ' dans le frigo' : 'Cuisine ce qu\'il reste'}</span></div></button>
      </div>`;
    const TS = { papiers: ['#D3E4F4', '🪪🛂📅🔔'], carnet: ['#F9D6D6', '💉🩺📏❤️'], frigo: ['#D6ECE2', '🥕🧀🥚🍅'] };
    $$('[data-tool]', el).forEach(t => {
      const d = TS[t.dataset.tool]; t.style.setProperty('--t', d[0]);
      const e = [...d[1]], pos = [[8, 30, -12], [58, 24, 10], [26, 72, 8], [70, 80, -8]];
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">${pos.map((p, i) => `<text x="${p[0]}" y="${p[1]}" font-size="20" transform="rotate(${p[2]} ${p[0]} ${p[1]})">${e[i % e.length]}</text>`).join('')}</svg>`;
      t.style.setProperty('--pat', "url('data:image/svg+xml," + encodeURIComponent(svg).replace(/'/g, '%27') + "')");
      t.onclick = () => { C.sel = null; goPlus(t.dataset.tool); window.scrollTo(0, 0); };
    });
    $$('[data-ha]', el).forEach(b => b.onclick = () => { const x = a[+b.dataset.ha]; C.sel = x.kid || null; goPlus(x.go); window.scrollTo(0, 0); });
  }
  renderHomeTools();
  if (typeof showTab === 'function') { const _st = showTab; showTab = function (t) { if (t === 'home') renderHomeTools(); _st(t); }; }

  /* Effacer mes données : effacer aussi les outils */
  const rs = document.getElementById('reset');
  if (rs) rs.onclick = () => { if (confirm('Effacer toutes tes données (enfants, activités faites, planning, papiers, carnets de santé, frigo) ?')) { try { localStorage.removeItem('nid2'); localStorage.removeItem(KEY); } catch (e) {} location.reload(); } };
})();
