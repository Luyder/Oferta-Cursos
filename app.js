/* Sitio de la oferta de cursos — lee window.OFERTA (datos.js). */
"use strict";
const O = window.OFERTA;
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const jsq = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const normP = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const MODLABEL = { PRESENCIAL: 'Presencial', VIRTUAL: 'Virtual', 'HÍBRIDA': 'Hyflex - Híbrida' };

/* ---- obligatoria / electiva según la pestaña de posgrado ---- */
function matchesTrack(pn, track) {
  if (pn === 'todos los programas') return true;
  if (pn === 'todos los posgrados') return ['profundizacion', 'investigacion', 'esp', 'doc'].includes(track);
  if (pn === 'todos los pregrados') return false;
  switch (track) {
    case 'profundizacion': if (pn.includes('profundiz')) return true; return pn.includes('maestria') && !pn.includes('investigaci');
    case 'investigacion': if (pn.includes('investigaci')) return true; return pn.includes('maestria') && !pn.includes('profundiz');
    case 'esp': return pn.includes('especializ');
    case 'doc': return pn.includes('doctorado');
    default: return false;
  }
}
function requirementsForTrack(obl, ele, track) {
  const set = new Set();
  const add = (arr, label) => { for (const p of (arr || [])) { if (!track || matchesTrack(normP(p), track)) set.add(label); } };
  add(obl, 'obligatoria'); add(ele, 'electiva');
  return ['obligatoria', 'electiva'].filter(r => set.has(r));
}
const belongsToTrack = (o, e, t) => requirementsForTrack(o, e, t).length > 0;

const parrafos = (arr) => (arr && arr.length) ? '<div class="rich">' + arr.map(p => '<p>' + esc(p) + '</p>').join('') + '</div>' : '';

/* ---- datos visibles ---- */
const PROFS = O.profesores.filter(p => !p.oculto);
const PROF = new Map(PROFS.map(p => [p.id, p]));
const CURSOS = O.cursos.filter(c => !c.oculto);
const PREGRADO = CURSOS.filter(c => c.categoria === 'pregrado');
const POSGRADO = CURSOS.filter(c => c.categoria === 'posgrado');
const profsDe = (sec) => (sec.profesores || []).map(id => PROF.get(id)).filter(Boolean);

function inMaestria(c, trackKey, subVals) {
  if (c.track) return subVals.includes(c.track);
  if ((c.obligatoriaEn || []).length + (c.electivaEn || []).length > 0) return belongsToTrack(c.obligatoriaEn, c.electivaEn, trackKey);
  return true;
}
function posgradoSections() {
  const ms = CURSOS.filter(c => c.tipo === 'MS');
  const prof = ms.filter(c => inMaestria(c, 'profundizacion', ['profundizacion', 'compartido']));
  const inv = ms.filter(c => inMaestria(c, 'investigacion', ['investigacion', 'compartido']));
  const esp = CURSOS.filter(c => c.tipo === 'ESP' || belongsToTrack(c.obligatoriaEn, c.electivaEn, 'esp'));
  const doc = CURSOS.filter(c => c.tipo === 'DOC' || belongsToTrack(c.obligatoriaEn, c.electivaEn, 'doc'));
  const s = [];
  if (prof.length) s.push({ key: 'profundizacion', label: 'Maestría', sublabel: 'Profundización', courses: prof, dark: false });
  if (inv.length) s.push({ key: 'investigacion', label: 'Maestría', sublabel: 'Investigación', courses: inv, dark: true });
  if (!prof.length && !inv.length && ms.length) s.push({ key: 'ms', label: 'Maestría', courses: ms, dark: false });
  if (esp.length) s.push({ key: 'esp', label: 'Especialización', courses: esp, dark: false });
  if (doc.length) s.push({ key: 'doc', label: 'Doctorado', courses: doc, dark: true });
  return s;
}
const cursosDe = (pid) => CURSOS.filter(c => c.secciones.some(s => (s.profesores || []).includes(pid)));

/* ---- estado y pintado ---- */
const state = { view: 'home', posTab: 0, search: '', modality: 'all', requirement: 'all' };
const app = document.getElementById('app');
let searchFocus = false;
let animar = true;   // las tarjetas entran en cascada al navegar o filtrar, no al escribir en el buscador
const entra = () => (animar ? ' entra' : '');

function render() {
  if (state.view === 'home') renderHome();
  else if (state.view === 'pregrado') renderList();
  else if (state.view === 'posgrado') renderPosgrado();
  else if (state.view === 'profes') renderProfes();
  animar = false;
}
const tabBtn = (v, l, active) => '<button class="tab' + (active === v ? ' active' : '') + '" onclick="go(\'' + v + '\')">' + l + '</button>';
function header(active) {
  return '<header class="bar"><div class="row">'
    + '<button class="brand" onclick="go(\'home\')"><span class="b1 display">Cursos</span><span class="b2 display">Facultad de Educación</span></button>'
    + '<div class="tabs">' + tabBtn('pregrado', 'Pregrado', active) + tabBtn('posgrado', 'Posgrado', active) + tabBtn('profes', 'Profes', active) + '</div>'
    + '</div></header>';
}
const navBtn = (v, l, cls, n) => '<button class="navbtn ' + cls + '" onclick="go(\'' + v + '\')"><span class="fill"></span><span class="t">' + l + '</span><span class="n">' + n + '</span></button>';
function renderHome() {
  app.innerHTML = '<div class="home">'
    + '<div class="blob" style="top:-128px;right:-128px;width:384px;height:384px"></div>'
    + '<div class="blob" style="bottom:-160px;left:-160px;width:448px;height:448px"></div>'
    + '<div class="inner"><div class="hero"><span class="periodo">Oferta 2026-2</span><h1 class="display">Cursos</h1><p class="sub display">Facultad de Educación</p><div class="rule"></div></div>'
    + '<div class="navgrid"><div class="navgrid two">' + navBtn('pregrado', 'PREGRADO', '', PREGRADO.length + ' cursos') + navBtn('posgrado', 'POSGRADO', '', POSGRADO.length + ' cursos') + '</div>'
    + navBtn('profes', 'PROFES', 'small', PROFS.length + ' profesores') + '</div>'
    + '<img class="logo" src="assets/logo-faceduc.webp" alt="Universidad de los Andes · Facultad de Educación · 10 años transformando la educación" width="900" height="123">'
    + '</div></div>';
}

function courseCard(c, track, i) {
  const isPos = ['MS', 'ESP', 'DOC'].includes(c.tipo);
  const reqs = isPos ? requirementsForTrack(c.obligatoriaEn, c.electivaEn, track) : [];
  let reqHtml = '';
  if (reqs.length) reqHtml = '<div class="reqs">' + reqs.map(r => '<span class="badge ' + (r === 'obligatoria' ? 'oblig' : 'elect') + '">' + (r === 'obligatoria' ? 'OBLIGATORIA' : 'ELECTIVA') + '</span>').join('') + '</div>';
  const secBadge = c.secciones.length > 1 ? '<span class="badge sec">' + c.secciones.length + ' secc.</span>' : '';
  const img = c.imagen ? '<img src="' + esc(c.imagen) + '" alt="" loading="lazy">' : '<span class="noimg">Sin imagen</span>';
  return '<button class="card" style="--i:' + Math.min(i, 11) + '" onclick="openCourse(' + jsq(c.id) + ')">'
    + '<div class="head"><h3 class="display">' + esc(c.titulo) + (c.titulo2 ? '<br>' + esc(c.titulo2) : '') + '</h3></div>'
    + '<div class="imgarea">' + img + reqHtml
    + '<div class="foot">' + secBadge + '<span class="badge cat">' + (c.categoria === 'pregrado' ? 'PREGRADO' : 'POSGRADO') + '</span></div>'
    + '</div></button>';
}
const chip = (l, on, fn) => '<button class="chip' + (on ? ' on' : '') + '" onclick="' + fn + '">' + l + '</button>';
function filterBar(courses, track) {
  const mods = [...new Set(courses.map(c => c.modalidad).filter(Boolean))];
  const reqSet = new Set();
  for (const c of courses) for (const r of requirementsForTrack(c.obligatoriaEn, c.electivaEn, track)) reqSet.add(r);
  const reqs = ['obligatoria', 'electiva'].filter(r => reqSet.has(r));
  let h = '<div class="filters">';
  if (mods.length) {
    h += '<div class="frow"><span class="flabel">Modalidad</span>' + chip('Todas', state.modality === 'all', "setMod('all')");
    for (const m of mods) h += chip(MODLABEL[m] || m, state.modality === m, "setMod('" + m + "')");
    h += '</div>';
  }
  if (reqs.length) {
    h += '<div class="frow"><span class="flabel">Tipo</span>' + chip('Todos', state.requirement === 'all', "setReq('all')");
    for (const r of reqs) h += chip(r === 'obligatoria' ? 'Obligatoria' : 'Electiva', state.requirement === r, "setReq('" + r + "')");
    h += '</div>';
  }
  return h + '</div>';
}
function applyFilters(courses, track) {
  const q = normP(state.search);
  return courses.filter(c => {
    if (q && !normP(c.titulo).includes(q)) return false;
    if (state.modality !== 'all' && c.modalidad !== state.modality) return false;
    if (state.requirement !== 'all' && !requirementsForTrack(c.obligatoriaEn, c.electivaEn, track).includes(state.requirement)) return false;
    return true;
  });
}
const LUPA = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
const searchBox = () => '<div class="search">' + LUPA + '<input type="search" aria-label="Buscar curso por nombre" placeholder="Buscar curso por nombre…" value="' + esc(state.search) + '" oninput="onSearch(this.value)">'
  + (state.search ? '<button class="limpiar" aria-label="Borrar búsqueda" onclick="clearSearch()">×</button>' : '') + '</div>';
const gridHtml = (list, track) => list.length ? '<div class="grid' + entra() + '">' + list.map((c, i) => courseCard(c, track, i)).join('') + '</div>' : '<p class="empty">No hay cursos que coincidan.</p>';
const conteo = (n, total) => (n < total ? '<p class="conteo">Mostrando ' + n + ' de ' + total + ' cursos</p>' : '');
const footerHtml = () => '<footer class="foot">Universidad de los Andes · Facultad de Educación · Oferta 2026-2</footer>';

function renderList() {
  app.innerHTML = header('pregrado') + '<div class="wrap' + entra() + '">'
    + '<div class="sechead"><h2 class="display">Pregrado</h2><p>' + PREGRADO.length + ' cursos · 2026-2</p></div>'
    + searchBox() + filterBar(PREGRADO) + (() => { const l = applyFilters(PREGRADO); return conteo(l.length, PREGRADO.length) + gridHtml(l); })() + footerHtml() + '</div>';
  restoreSearchFocus();
}
function renderPosgrado() {
  const sections = posgradoSections();
  if (!sections.length) { app.innerHTML = header('posgrado') + '<div class="wrap"><p class="empty">No hay cursos de posgrado.</p></div>'; return; }
  if (state.posTab >= sections.length) state.posTab = 0;
  const cur = sections[state.posTab];
  let pt = '<div class="ptabs">';
  sections.forEach((s, i) => {
    const on = i === state.posTab ? (s.dark ? 'on-dark' : 'on-green') : '';
    pt += '<button class="ptab ' + on + '" onclick="setPosTab(' + i + ')">' + s.label + (s.sublabel ? ' <span class="sl">' + s.sublabel + '</span>' : '') + '<span class="cnt">' + s.courses.length + '</span></button>';
  });
  pt += '</div>';
  const lista = applyFilters(cur.courses, cur.key);
  app.innerHTML = header('posgrado') + '<div class="wrap' + entra() + '">'
    + '<div class="sechead"><h2 class="display">Posgrado</h2><p>' + POSGRADO.length + ' cursos · 2026-2</p></div>' + pt
    + searchBox() + filterBar(cur.courses, cur.key) + conteo(lista.length, cur.courses.length) + gridHtml(lista, cur.key) + footerHtml() + '</div>';
  restoreSearchFocus();
}
const iniciales = (n) => n.split(' ').slice(0, 2).map(w => w[0] || '').join('');
function renderProfes() {
  const cards = PROFS.map((p, i) => {
    const n = cursosDe(p.id).length;
    const ph = p.imagen ? '<img src="' + esc(p.imagen) + '" alt="" loading="lazy">' : '<span class="ini display">' + esc(iniciales(p.nombre)) + '</span>';
    return '<button class="pcard" style="--i:' + Math.min(i, 11) + '" onclick="openProf(' + jsq(p.id) + ')"><div class="ph">' + ph + '</div>'
      + '<div><p class="pn display">' + esc(p.nombre) + '</p>' + (p.cargo ? '<p class="pr">' + esc(p.cargo) + '</p>' : '')
      + (n ? '<p class="pc">' + n + (n === 1 ? ' curso' : ' cursos') + '</p>' : '') + '</div></button>';
  }).join('');
  app.innerHTML = header('profes') + '<div class="wrap' + entra() + '">'
    + '<div class="sechead"><h2 class="display">Profes de la Facu</h2><p>' + PROFS.length + ' profesores</p></div>'
    + '<div class="pgrid' + entra() + '">' + cards + '</div>' + footerHtml() + '</div>';
}

/* ---- fichas (drawers) ---- */
function closeDrawer(instantaneo) {
  const b = document.getElementById('drawer-root');
  if (!b) return;
  b.removeAttribute('id');
  document.body.style.overflow = '';
  const rapido = instantaneo === true || matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (rapido) { b.remove(); return; }
  b.classList.add('saliendo');
  setTimeout(() => b.remove(), 260);
}
function mountDrawer(html) {
  closeDrawer(true);
  const div = document.createElement('div'); div.id = 'drawer-root';
  div.innerHTML = '<div class="backdrop" onclick="closeDrawer()"></div><div class="drawer" role="dialog" aria-modal="true">' + html + '</div>';
  document.body.appendChild(div); document.body.style.overflow = 'hidden';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

function openCourse(id) {
  const c = CURSOS.find(x => x.id === id);
  if (!c) return;
  const metaPrim = [c.codigo, c.semanas ? c.semanas + ' SEMANAS' : null, c.creditos ? c.creditos + ' CRD' : null].filter(Boolean);
  const metaSec = c.modalidad ? [MODLABEL[c.modalidad] || c.modalidad] : [];
  let secHtml = '';
  if (c.secciones.length) {
    secHtml = '<div class="secbar">' + c.secciones.map((s, i) => {
      let h = '<div class="sblock">'; const hdr = [];
      if (c.secciones.length > 1) hdr.push('<span class="badge sec">SECCIÓN ' + (i + 1) + '</span>');
      if (s.nrc) hdr.push('<span style="font-size:.72rem;color:#737373">NRC ' + esc(s.nrc) + '</span>');
      if (hdr.length) h += '<div style="display:flex;align-items:center;gap:12px">' + hdr.join('') + '</div>';
      if ((s.horario || []).length) h += '<div class="slotwrap">' + s.horario.map(b => '<div class="slot"><div class="d display">' + esc(b.dia) + '</div><div class="h">' + esc(b.inicio) + ' – ' + esc(b.fin) + '</div></div>').join('') + '</div>';
      const ps = profsDe(s);
      if (ps.length) h += '<div style="display:flex;flex-wrap:wrap;gap:4px 12px">' + ps.map(p => '<button class="proflink" onclick="openProf(' + jsq(p.id) + ')">' + esc(p.nombre) + (p.cargo ? ' · ' + esc(p.cargo) : '') + '</button>').join('') + '</div>';
      return h + '</div>';
    }).join('') + '</div>';
  }
  let reqTags = '';
  if ((c.obligatoriaEn || []).length || (c.electivaEn || []).length) {
    reqTags = '<div class="chiprow">' + (c.obligatoriaEn || []).map(p => '<span class="tag oblig">Obligatoria · ' + esc(p) + '</span>').join('')
      + (c.electivaEn || []).map(p => '<span class="tag elect">Electiva · ' + esc(p) + '</span>').join('') + '</div>';
  }
  const fila = (l, v) => v ? '<div><div class="l">' + l + '</div><div class="v">' + esc(v) + '</div></div>' : '';
  const info = (c.prerrequisitos || c.correquisitos || c.observaciones)
    ? '<div class="info">' + fila('Prerrequisitos', c.prerrequisitos) + fila('Correquisitos', c.correquisitos) + fila('Observaciones', c.observaciones) + '</div>' : '';
  mountDrawer('<div class="top"><button class="closeb k" onclick="closeDrawer()">←</button><span class="badge cat" style="padding:6px 16px">' + esc(c.tipo) + '</span></div>'
    + (c.imagen ? '<div class="pdphoto"><img src="' + esc(c.imagen) + '" alt=""></div>' : '')
    + '<div class="dpad"><h2 class="dtitle display">' + esc(c.titulo) + (c.titulo2 ? '<br>' + esc(c.titulo2) : '') + '</h2>'
    + ((metaPrim.length || metaSec.length) ? '<div class="dmeta">' + (metaPrim.length ? '<div>' + metaPrim.map(esc).join('  |  ') + '</div>' : '') + (metaSec.length ? '<div>' + metaSec.map(esc).join('  |  ') + '</div>' : '') + '</div>' : '')
    + secHtml + (c.descripcion && c.descripcion.length ? '<div style="margin-top:24px">' + parrafos(c.descripcion) + '</div>' : '') + reqTags + info + '</div>');
}
function openProf(id) {
  const p = PROF.get(id);
  if (!p) return;
  const cursos = cursosDe(id);
  const item = (c, dark) => '<button class="courselink" onclick="openCourse(' + jsq(c.id) + ')"><span class="pt ' + (dark ? 'k' : 'g') + '">' + esc(c.tipo) + '</span><span class="ct display">' + esc(c.titulo) + '</span>' + (c.codigo ? '<span class="cc">' + esc(c.codigo) + '</span>' : '') + '</button>';
  const grupo = (titulo, lista, dark, mb) => lista.length ? '<div' + (mb ? ' style="margin-bottom:16px"' : '') + '><p class="grouplabel">' + titulo + '</p><div style="display:flex;flex-direction:column;gap:8px">' + lista.map(c => item(c, dark)).join('') + '</div></div>' : '';
  const preg = cursos.filter(c => c.categoria === 'pregrado'), posg = cursos.filter(c => c.categoria === 'posgrado');
  const cursosHtml = cursos.length ? '<div style="margin-top:32px"><p class="grouplabel">Cursos que dicta</p>' + grupo('Pregrado', preg, false, true) + grupo('Posgrado', posg, true) + '</div>' : '';
  mountDrawer('<div class="top"><button class="closeb g" onclick="closeDrawer()">←</button>' + (p.cargo ? '<span class="rankpill">' + esc(p.cargo) + '</span>' : '') + '</div>'
    + (p.imagen ? '<div class="pdphoto"><img src="' + esc(p.imagen) + '" alt=""></div>' : '<div class="pdphoto"><div class="fallback"><span>' + esc(iniciales(p.nombre)) + '</span></div></div>')
    + '<div class="dpad"><h2 class="dtitle display">' + esc(p.nombre) + '</h2>'
    + (p.bio && p.bio.length ? '<div style="margin-top:20px;border-top:1px solid #f0f0f0;padding-top:20px">' + parrafos(p.bio) + '</div>' : '')
    + cursosHtml + '</div>');
}

/* ---- acciones ---- */
function go(v) { state.view = v; state.search = ''; state.modality = 'all'; state.requirement = 'all'; state.posTab = 0; closeDrawer(true); window.scrollTo(0, 0); animar = true; render(); }
function onSearch(v) { state.search = v; searchFocus = true; render(); }
function setMod(m) { state.modality = m; searchFocus = false; animar = true; render(); }
function setReq(r) { state.requirement = r; searchFocus = false; animar = true; render(); }
function clearSearch() { state.search = ''; searchFocus = true; animar = true; render(); }
function setPosTab(i) { state.posTab = i; state.requirement = 'all'; state.modality = 'all'; animar = true; render(); }
function restoreSearchFocus() { if (searchFocus) { const el = app.querySelector('input[type=search]'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } searchFocus = false; } }

render();
