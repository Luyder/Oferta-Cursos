/* Sitio de la oferta de cursos — lee window.OFERTA (datos.js). */
"use strict";
const O = window.OFERTA;
const PERIODO = O.periodo || '';
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const jsq = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const normP = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const MODLABEL = { PRESENCIAL: 'Presencial', VIRTUAL: 'Virtual', 'HÍBRIDA': 'Hyflex - Híbrida' };

/* ---- Pensums: redirigen a los que ya existen en el nodo de licenciaturas.
   Aquí solo se copian nombre, color, semestres y créditos para las tarjetas (tomados de QR-Hub/pensum/data). ---- */
const NODO = location.hostname === 'localhost' ? 'http://localhost:8765/' : 'https://luyder.github.io/faceduc-qr/';   // en pruebas locales, los pensums locales
const PENSUMS = [
  { id: 'artes', nombre: 'Artes', color: '#ff5900', sem: 8, cr: 123 },
  { id: 'biologia', nombre: 'Biología', color: '#00bf63', sem: 8, cr: 124 },
  { id: 'infantil', nombre: 'Educación Infantil', color: '#f7aac8', sem: 8, cr: 123 },
  { id: 'espanol-filologia', nombre: 'Español y Filología', color: '#d42e2b', sem: 8, cr: 123 },
  { id: 'filosofia', nombre: 'Filosofía', color: '#7300ff', sem: 8, cr: 122 },
  { id: 'fisica', nombre: 'Física', color: '#1852c8', sem: 8, cr: 125 },
  { id: 'historia', nombre: 'Historia', color: '#eba636', sem: 8, cr: 123 },
  { id: 'matematicas', nombre: 'Matemáticas', color: '#96cdf5', sem: 8, cr: 125 },
  { id: 'quimica', nombre: 'Química', color: '#00a3a3', sem: 8, cr: 125 }
].map((p) => Object.assign(p, { nivel: 'pregrado', tipo: 'nodo', prefijo: 'Licenciatura en' }));
/* Posgrados: planes publicados en las páginas oficiales de la Facultad (educacion.uniandes.edu.co).
   Los Genially se muestran tal cual; la malla del doctorado y el PDF de Educación Matemática se copiaron
   a pensums/ porque su servidor no deja mostrarlos dentro de otros sitios. */
const GENIALLY = 'https://view.genially.com/';
PENSUMS.push(
  { id: 'ms-profundizacion', nivel: 'posgrado', tipo: 'genially', prefijo: 'Maestría en Educación', nombre: 'Profundización', color: '#2347c5', src: GENIALLY + '6a71fbffbeebe9d0d67cbab4', meta: 'Plan de estudios interactivo' },
  { id: 'ms-investigacion', nivel: 'posgrado', tipo: 'genially', prefijo: 'Maestría en Educación', nombre: 'Investigación', color: '#d8382d', src: GENIALLY + '6a7203bb25f592923e143acb', meta: 'Plan de estudios interactivo' },
  { id: 'esp-innovacion', nivel: 'posgrado', tipo: 'genially', prefijo: 'Especialización en', nombre: 'Innovación Curricular y Pedagógica', color: '#e9a63a', src: GENIALLY + '66a10c6951ad4fd5cef26ffe/interactive-content-especializacion-en-curriculo-y-pedagogia', meta: 'Plan de estudios interactivo' },
  { id: 'esp-liderazgo', nivel: 'posgrado', tipo: 'genially', prefijo: 'Especialización en', nombre: 'Liderazgo y Política Educativa', color: '#12a95a', src: GENIALLY + '67b38374e52dcf4bcce62d35/interactive-content-especializacion-en-liderazgo-y-politica-educativa', meta: 'Plan de estudios interactivo' },
  { id: 'ms-matematica', nivel: 'posgrado', tipo: 'pdf', prefijo: 'Maestría en', nombre: 'Educación Matemática', color: '#f4c3cb', src: 'pensums/maestria-educacion-matematica.pdf', meta: 'Plan de estudios · PDF' },
  { id: 'doctorado', nivel: 'posgrado', tipo: 'imagen', prefijo: 'Doctorado en', nombre: 'Educación', color: '#2e4a6e', src: 'pensums/doctorado-malla.webp', meta: '9 semestres · 94 créditos' }
);
const urlPensum = (p) => (p.tipo === 'nodo' ? pensumUrl(p.id) : p.src);
const pensumUrl = (id) => NODO + 'pensum/ver.html?p=' + encodeURIComponent(id) + '&src=oferta-cursos';   // src: la analítica del nodo distingue estas visitas

/* ---- Prueba de look «folleto» (estética de los folletos y del nodo): se activa con ?look=folleto ---- */
const FOLLETO = document.documentElement.dataset.look === 'folleto';   // lo activa el <head> de index.html con ?look=folleto
// En el look folleto los títulos (que vienen en MAYÚSCULAS) se muestran en tipo oración
const SIGLAS = { cbu: 'CBU', ia: 'IA', 'edu+ia': 'EDU+IA', steam: 'STEAM', 'conecta-te': 'CONECTA-TE', i: 'I', ii: 'II', iii: 'III', iv: 'IV', v: 'V', vi: 'VI' };
// la sigla se reconoce aunque vaya pegada a puntuación («IA:», «(CBU)»)
const oracion = (t) => { const x = String(t || '').toLowerCase().replace(/[^\s]+/g, (w) => { const m = /^([("¿¡]*)(.*?)([.,:;)"?!]*)$/.exec(w); return m[1] + (SIGLAS[m[2]] || m[2]) + m[3]; }); return x.charAt(0).toUpperCase() + x.slice(1); };
const tit = (t) => (FOLLETO ? oracion(t) : t);
const encabezado = (plano, conEm) => (FOLLETO ? conEm : esc(plano));

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

/* ---- cupos en vivo ----
   Se consultan en Oferta de Cursos (Banner) desde el navegador de quien visita; no se guardan en datos.js.
   Se piden al abrir, cada 2 minutos con la pestaña a la vista, al volver a ella y al abrir una ficha. Si Banner no responde,
   se conserva la última lectura (con su hora) y, pasados 15 minutos, se deja de mostrar. */
const CUPOS_API = 'https://ofertadecursos.uniandes.edu.co/api/courses';
const CUPOS_CADA = 2 * 60 * 1000, CUPOS_VENCE = 15 * 60 * 1000;
let cupos = new Map(), cuposHora = 0, cuposIntento = 0, cuposPidiendo = false;
const cupoDe = (nrcs) => {
  const l = nrcs.map(n => cupos.get(n)).filter(x => x && x.total > 0);
  return l.length ? { libres: l.reduce((a, x) => a + x.libres, 0), total: l.reduce((a, x) => a + x.total, 0) } : null;
};
const nCupos = (n) => (n === 0 ? 'Sin cupos' : n + (n === 1 ? ' cupo' : ' cupos'));
function pintarCupos() {
  const vigente = cuposHora && Date.now() - cuposHora < CUPOS_VENCE;
  document.querySelectorAll('[data-cupos]').forEach(el => {
    const nrcs = el.dataset.cupos.split(',');
    const k = vigente ? cupoDe(nrcs) : null;
    const ficha = el.classList.contains('cupos-sec');
    const sinAsignar = ficha && vigente && !k && nrcs.some(n => cupos.has(n));
    el.hidden = !k && !sinAsignar;
    el.classList.toggle('lleno', !!k && k.libres === 0);
    el.textContent = k ? (ficha && k.libres ? nCupos(k.libres) + (k.libres === 1 ? ' disponible' : ' disponibles') + ' de ' + k.total : nCupos(k.libres)) : (sinAsignar ? 'Cupos sin asignar' : '');
  });
  document.querySelectorAll('[data-cupos-hora]').forEach(el => {
    el.hidden = !vigente;
    el.textContent = vigente ? 'Cupos actualizados a las ' + new Date(cuposHora).toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' }) : '';
  });
}
async function pedirCupos() {
  if (cuposPidiendo || !O.periodoCodigo || document.hidden) return;
  cuposPidiendo = true; cuposIntento = Date.now();
  try {
    const prefijos = [...new Set(['EDUC', ...CURSOS.map(c => (c.codigo || '').split('-')[0])])].filter(Boolean);
    const lotes = await Promise.all(prefijos.map(async (p) => {
      const r = await fetch(CUPOS_API + '?term=' + encodeURIComponent(O.periodoCodigo) + '&ptrm=&prefix=' + encodeURIComponent(p) + '&attr=&nameInput=&campus=&attrs=&timeStart=&offset=0&limit=1000', { cache: 'no-store', signal: AbortSignal.timeout(20000) });
      if (!r.ok) throw new Error(r.status);
      return r.json();
    }));
    const m = new Map();
    lotes.flat().forEach(s => {
      const total = parseInt(s.maxenrol, 10), libres = parseInt(s.seatsavail, 10);
      if (s.term === O.periodoCodigo && total >= 0 && Number.isFinite(libres)) m.set(String(s.nrc), { total, libres: Math.max(0, libres) });
    });
    if (m.size) { cupos = m; cuposHora = Date.now(); }
  } catch (e) { console.warn('No se pudieron leer los cupos', e); }
  cuposPidiendo = false;
  pintarCupos();
}
const cuposSpan = (secs, cls) => { const n = secs.map(s => s.nrc).filter(Boolean); return n.length ? '<span class="' + cls + '" data-cupos="' + esc(n.join(',')) + '" hidden></span>' : ''; };
const cuposHoraHtml = '<span class="cupos-hora" data-cupos-hora hidden></span>';
setInterval(pedirCupos, CUPOS_CADA);
document.addEventListener('visibilitychange', () => { if (!document.hidden) { pintarCupos(); if (Date.now() - cuposIntento > 30000) pedirCupos(); } });

/* ---- estado y pintado ---- */
const state = { view: 'home', posTab: 0, penNivel: 'pregrado', search: '', modality: 'all', requirement: 'all' };
const app = document.getElementById('app');
let searchFocus = false;
let animar = true;   // las tarjetas entran en cascada al navegar o filtrar, no al escribir en el buscador
const entra = () => (animar ? ' entra' : '');

function render() {
  if (state.view === 'home') renderHome();
  else if (state.view === 'pregrado') renderList();
  else if (state.view === 'posgrado') renderPosgrado();
  else if (state.view === 'profes') renderProfes();
  else if (state.view === 'pensums') renderPensums();
  animar = false;
  pintarCupos();
}
const tabBtn = (v, l, active) => '<button class="tab' + (active === v ? ' active' : '') + '" onclick="go(\'' + v + '\')">' + l + '</button>';
function header(active) {
  return '<header class="bar"><div class="row">'
    + '<button class="brand" onclick="go(\'home\')"><span class="b1 display">Cursos</span><span class="b2 display">Facultad de Educación</span></button>'
    + '<div class="tabs">' + tabBtn('pregrado', 'Pregrado', active) + tabBtn('posgrado', 'Posgrado', active) + tabBtn('profes', 'Profes', active) + tabBtn('pensums', 'Pensums', active) + '</div>'
    + '</div></header>';
}
const navBtn = (v, l, cls) => '<button class="navbtn ' + cls + '" onclick="go(\'' + v + '\')"><span class="t">' + l + '</span></button>';
const letras = (t) => [...t].map((c, i) => '<span class="l" style="--l:' + i + '">' + c + '</span>').join('');
function renderHome() {
  if (FOLLETO) return renderHomeFolleto();
  app.innerHTML = '<div class="home">'
    + '<div class="blob" style="top:-128px;right:-128px;width:384px;height:384px"></div>'
    + '<div class="blob" style="bottom:-160px;left:-160px;width:448px;height:448px"></div>'
    + '<div class="inner"><div class="hero">' + (PERIODO ? '<span class="periodo">Oferta ' + esc(PERIODO) + '</span>' : '') + '<h1 class="display" aria-label="Cursos">' + letras('Cursos') + '</h1><p class="sub display">Facultad de Educación</p><div class="rule"></div></div>'
    + '<div class="navgrid"><div class="navgrid two">' + navBtn('pregrado', 'PREGRADO', '') + navBtn('posgrado', 'POSGRADO', '') + '</div>'
    + '<div class="navgrid two">' + navBtn('profes', 'PROFES', 'small') + navBtn('pensums', 'PENSUMS', 'small') + '</div></div>'
    + '<img class="logo" src="assets/logo-faceduc.webp" alt="Universidad de los Andes · Facultad de Educación · 10 años transformando la educación" width="900" height="123">'
    + '</div></div>';
}

const LOGO = '<img class="logo" src="assets/logo-faceduc.webp" alt="Universidad de los Andes · Facultad de Educación · 10 años transformando la educación" width="900" height="123">';
function renderHomeFolleto() {
  const item = (n, v, txt) => '<button class="fol-item" onclick="go(\'' + v + '\')"><em>0' + n + '</em><span>' + txt + '</span><i class="fol-flecha" aria-hidden="true">→</i></button>';
  app.innerHTML = '<div class="fol-home"><i class="fol-sol" aria-hidden="true"></i><div class="fol-in">'
    + LOGO
    + '<h1 class="fol-h1">Oferta de <em>cursos</em></h1>'
    + '<p class="fol-sub">Facultad de Educación' + (PERIODO ? ' · Periodo ' + esc(PERIODO) : '') + '</p>'
    + '<nav class="fol-menu">' + item(1, 'pregrado', 'Cursos de pregrado') + item(2, 'posgrado', 'Cursos de posgrado') + item(3, 'profes', 'Profesores') + item(4, 'pensums', 'Pensums') + '</nav>'
    + '<div class="fol-formas" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>'
    + '</div></div>';
}

function renderPensums() {
  const tarjeta = (p, i) => '<button class="pen-card" style="--c:' + p.color + ';--i:' + i + '" onclick="openPensum(' + jsq(p.id) + ')">'
    + '<span class="pen-forma" aria-hidden="true"></span>'
    + '<span class="pen-lic">' + esc(p.prefijo) + '</span><span class="pen-nom">' + esc(p.nombre) + '</span>'
    + '<span class="pen-meta">' + (p.meta ? esc(p.meta) : p.sem + ' semestres · ' + p.cr + ' créditos') + '</span>'
    + '<span class="pen-ver">Ver pensum</span></button>';
  const lista = PENSUMS.filter((p) => p.nivel === state.penNivel);
  const nums = (n) => PENSUMS.filter((p) => p.nivel === n).length;
  const opcion = (n, txt, sub) => '<button class="pen-op ' + n + '" aria-pressed="' + (state.penNivel === n) + '" onclick="setPenNivel(\'' + n + '\')"><span class="pen-op-t display">' + txt + '</span><span class="pen-op-s">' + sub + '</span></button>';
  const rejilla = (l) => '<div class="pen-grid' + entra() + '">' + l.map(tarjeta).join('') + '</div>';
  const grupo = (titulo, re) => { const l = lista.filter((p) => re.test(p.prefijo)); return l.length ? '<h3 class="pen-grupo display">' + titulo + '</h3>' + rejilla(l) : ''; };
  app.innerHTML = header('pensums') + '<div class="wrap">'
    + '<h2 class="solo-lector">Pensums</h2>'
    + '<div class="pen-ops">' + opcion('pregrado', 'Pregrado', nums('pregrado') + ' licenciaturas') + opcion('posgrado', 'Posgrado', nums('posgrado') + ' programas') + '</div>'
    + (state.penNivel === 'pregrado' ? rejilla(lista) : grupo('Maestrías', /^Maestría/) + grupo('Especializaciones', /^Especialización/) + grupo('Doctorado', /^Doctorado/))
    + footerHtml() + '</div>';
}

/* Licenciaturas en las que el curso es obligatorio según los pensums; null si no es obligatorio en ninguna. */
const LICS = PENSUMS.filter(p => p.nivel === 'pregrado').map(p => p.prefijo + ' ' + p.nombre);
const enTodasLasLics = (l) => LICS.every(x => l.includes(x));
function obligLic(c) {
  const l = (c.obligatoriaEn || []).filter(p => LICS.includes(p) || p === 'Todos los pregrados' || p === 'Todos los programas');
  if (!l.length) return null;
  return l.some(p => !LICS.includes(p)) || enTodasLasLics(l) ? 'todas' : l;
}
const NIVELES = { LIC: 'Licenciatura', MS: 'Maestría', ESP: 'Especialización', DOC: 'Doctorado' };
function courseCard(c, track, i) {
  const isPos = ['MS', 'ESP', 'DOC'].includes(c.tipo);
  const reqs = isPos ? requirementsForTrack(c.obligatoriaEn, c.electivaEn, track) : [];
  let reqHtml = '';
  if (reqs.length) reqHtml = '<div class="reqs">' + reqs.map(r => '<span class="badge ' + (r === 'obligatoria' ? 'oblig' : 'elect') + '">' + (r === 'obligatoria' ? 'OBLIGATORIA' : 'ELECTIVA') + '</span>').join('') + '</div>';
  if (c.tipo === 'LIC') {
    const o = obligLic(c);
    if (o) reqHtml = '<div class="reqs"><span class="badge oblig">OBLIGATORIA' + (o === 'todas' ? '' : ' · ' + (o.length === 1 ? esc(o[0].replace('Licenciatura en ', '').toUpperCase()) : o.length + ' LICENCIATURAS')) + '</span></div>';
  }
  const notaComun = c.secciones.length && c.secciones.every(s => s.nota && s.nota === c.secciones[0].nota) ? c.secciones[0].nota : '';
  if (notaComun) reqHtml = reqHtml ? reqHtml.replace('<div class="reqs">', () => '<div class="reqs"><span class="badge nota">' + esc(notaComun.toUpperCase()) + '</span>') : '<div class="reqs"><span class="badge nota">' + esc(notaComun.toUpperCase()) + '</span></div>';
  const secBadge = c.secciones.length > 1 ? '<span class="badge sec">' + c.secciones.length + ' secc.</span>' : '';
  const img = c.imagen ? '<img src="' + esc(c.imagen) + '" alt="" loading="lazy">' : '';
  const h3 = (t) => '<h3 class="display">' + esc(tit(t)) + (c.titulo2 ? '<br>' + esc(tit(c.titulo2)) : '') + '</h3>';
  let head = h3(c.titulo);
  if (FOLLETO) {   // mismo orden que las tarjetas de pensum: antetítulo, nombre, datos, enlace
    const cbu = /^CBU\s*-\s*/i;
    const ante = cbu.test(c.titulo || '') ? 'CBU' : NIVELES[c.tipo];
    const datos = [c.creditos ? c.creditos + (c.creditos === 1 ? ' crédito' : ' créditos') : '', c.modalidad ? (MODLABEL[c.modalidad] || c.modalidad) : ''].filter(Boolean).join(' · ');
    head = (ante ? '<span class="cur-ante">' + ante + '</span>' : '') + h3((c.titulo || '').replace(cbu, '')) + (datos ? '<span class="cur-datos">' + esc(datos) + '</span>' : '') + '<span class="cur-ver">Ver curso</span>';
  }
  return '<button class="card" style="--i:' + Math.min(i, 11) + '" onclick="openCourse(' + jsq(c.id) + ')">'
    + '<div class="head">' + head + '</div>'
    + '<div class="imgarea">' + img + reqHtml
    + '<div class="foot">' + secBadge + cuposSpan(c.secciones, 'badge cupos') + '<span class="badge cat">' + (c.categoria === 'pregrado' ? 'PREGRADO' : 'POSGRADO') + '</span></div>'
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
// «Trabajo de grado 1» encuentra «Trabajo de grado I»: los romanos sueltos (I–VI) se comparan como números
const ROMANOS = { i: '1', ii: '2', iii: '3', iv: '4', v: '5', vi: '6' };
const normB = (s) => normP(s).replace(/\b(iii|ii|iv|vi|v|i)\b/g, (m) => ROMANOS[m]);
function applyFilters(courses, track) {
  const q = normB(state.search);
  return courses.filter(c => {
    if (q && !normB(c.titulo).includes(q)) return false;
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
const footerHtml = () => '<footer class="foot">Universidad de los Andes · Facultad de Educación' + (PERIODO ? ' · Oferta ' + esc(PERIODO) : '') + '</footer>';

function renderList() {
  app.innerHTML = header('pregrado') + '<div class="wrap' + entra() + '">'
    + '<div class="sechead"><h2 class="display">' + encabezado('Pregrado', '<em>Pregrado</em>') + '</h2><p>' + PREGRADO.length + ' cursos' + (PERIODO ? ' · ' + esc(PERIODO) : '') + cuposHoraHtml + '</p></div>'
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
    + '<div class="sechead"><h2 class="display">' + encabezado('Posgrado', '<em>Posgrado</em>') + '</h2><p>' + POSGRADO.length + ' cursos' + (PERIODO ? ' · ' + esc(PERIODO) : '') + cuposHoraHtml + '</p></div>' + pt
    + searchBox() + filterBar(cur.courses, cur.key) + conteo(lista.length, cur.courses.length) + gridHtml(lista, cur.key) + footerHtml() + '</div>';
  restoreSearchFocus();
}
const iniciales = (n) => n.split(' ').slice(0, 2).map(w => w[0] || '').join('');
function renderProfes() {
  const profes = PROFS.filter(p => cursosDe(p.id).length);   // solo quienes dictan algún curso visible en el periodo
  const cards = profes.map((p, i) => {
    const n = cursosDe(p.id).length;
    const ph = p.imagen ? '<img src="' + esc(p.imagen) + '" alt="" loading="lazy">' : '<span class="ini display">' + esc(iniciales(p.nombre)) + '</span>';
    return '<button class="pcard" style="--i:' + Math.min(i, 11) + '" onclick="openProf(' + jsq(p.id) + ')"><div class="ph">' + ph + '</div>'
      + '<div><p class="pn display">' + esc(p.nombre) + '</p>' + (p.cargo ? '<p class="pr">' + esc(p.cargo) + '</p>' : '')
      + (n ? '<p class="pc">' + n + (n === 1 ? ' curso' : ' cursos') + '</p>' : '') + '</div></button>';
  }).join('');
  app.innerHTML = header('profes') + '<div class="wrap' + entra() + '">'
    + '<div class="sechead"><h2 class="display">' + encabezado('Profes de la Facu', 'Profes de la <em>Facu</em>') + '</h2><p>' + profes.length + ' profesores</p></div>'
    + '<div class="pgrid' + entra() + '">' + cards + '</div>' + footerHtml() + '</div>';
}

/* ---- fichas (drawers) ---- */
/* Pensum: se muestra en una ventana sobre la página con el visor que ya existe en el nodo */
function openPensum(id) {
  const p = PENSUMS.find((x) => x.id === id);
  if (!p) return;
  closeDrawer(true);
  const div = document.createElement('div'); div.id = 'drawer-root';
  const url = urlPensum(p), nombre = p.prefijo + ' ' + p.nombre;
  const cuerpo = p.tipo === 'imagen'
    ? '<div class="visor-img"><img src="' + esc(url) + '" alt="Malla curricular: ' + esc(nombre) + '"></div>'
    : '<iframe src="' + esc(url) + '" title="Pensum: ' + esc(nombre) + '" allow="fullscreen" allowfullscreen></iframe>';
  div.innerHTML = '<div class="backdrop" onclick="closeDrawer()"></div>'
    + '<div class="visor" role="dialog" aria-modal="true" aria-label="Pensum: ' + esc(nombre) + '" style="--c:' + p.color + '">'
    + '<div class="visor-top"><span class="visor-tit">' + esc(p.prefijo) + ' <em>' + esc(p.nombre) + '</em></span>'
    + '<a class="visor-nueva' + (p.tipo === 'pdf' ? ' siempre' : '') + '" href="' + esc(url) + '" target="_blank" rel="noopener">Abrir en pestaña nueva ↗</a>'
    + '<button class="closeb k" onclick="closeDrawer()" aria-label="Cerrar">✕</button></div>'
    + cuerpo + '</div>';
  document.body.appendChild(div); document.body.style.overflow = 'hidden';
  div.querySelector('.closeb').focus();
}
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
  pintarCupos();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

function openCourse(id) {
  const c = CURSOS.find(x => x.id === id);
  if (!c) return;
  if (Date.now() - cuposIntento > 30000) pedirCupos();   // al abrir una ficha, lectura reciente
  const metaPrim = [c.codigo, c.semanas ? c.semanas + ' SEMANAS' : null, c.creditos ? c.creditos + ' CRD' : null].filter(Boolean);
  const metaSec = c.modalidad ? [MODLABEL[c.modalidad] || c.modalidad] : [];
  let secHtml = '';
  if (c.secciones.length) {
    secHtml = '<div class="secbar">' + c.secciones.map((s, i) => {
      let h = '<div class="sblock">'; const hdr = [];
      if (c.secciones.length > 1) hdr.push('<span class="badge sec">SECCIÓN ' + (i + 1) + '</span>');
      if (s.nrc) hdr.push('<span style="font-size:.72rem;color:#737373">NRC ' + esc(s.nrc) + '</span>');
      const cs = cuposSpan([s], 'cupos-sec'); if (cs) hdr.push(cs);
      if (hdr.length) h += '<div style="display:flex;align-items:center;gap:6px 12px;flex-wrap:wrap">' + hdr.join('') + '</div>';
      if (s.nota) h += '<div class="snota">' + esc(s.nota) + '</div>';
      if ((s.horario || []).length) h += '<div class="slotwrap">' + s.horario.map(b => '<div class="slot"><div class="d display">' + esc(b.dia) + '</div><div class="h">' + esc(b.inicio) + ' – ' + esc(b.fin) + '</div></div>').join('') + '</div>';
      const ps = profsDe(s);
      if (ps.length) h += '<div style="display:flex;flex-wrap:wrap;gap:4px 12px">' + ps.map(p => '<button class="proflink" onclick="openProf(' + jsq(p.id) + ')">' + esc(p.nombre) + (p.cargo ? ' · ' + esc(p.cargo) : '') + '</button>').join('') + '</div>';
      return h + '</div>';
    }).join('') + cuposHoraHtml + '</div>';
  }
  let reqTags = '';
  if ((c.obligatoriaEn || []).length || (c.electivaEn || []).length) {
    reqTags = '<div class="chiprow">' + (c.obligatoriaEn && enTodasLasLics(c.obligatoriaEn) ? ['Todas las licenciaturas', ...c.obligatoriaEn.filter(p => !LICS.includes(p))] : c.obligatoriaEn || []).map(p => '<span class="tag oblig">Obligatoria · ' + esc(p) + '</span>').join('')
      + (c.electivaEn || []).map(p => '<span class="tag elect">Electiva · ' + esc(p) + '</span>').join('') + '</div>';
  }
  // Cada línea «Etiqueta: texto» (p. ej. «Educación General: …») se muestra en su propio renglón con la etiqueta destacada
  const lineas = (v) => String(v).split('\n').filter((x) => x.trim()).map((x) => { const m = /^([^:]{3,40}):\s*(.+)$/.exec(x); return '<div class="ln">' + (m ? '<b>' + esc(m[1]) + ':</b> ' + esc(m[2]) : esc(x)) + '</div>'; }).join('');
  const fila = (l, v) => v ? '<div><div class="l">' + l + '</div><div class="v">' + lineas(v) + '</div></div>' : '';
  const info = (c.prerrequisitos || c.correquisitos || c.observaciones)
    ? '<div class="info">' + fila('Prerrequisitos', c.prerrequisitos) + fila('Correquisitos', c.correquisitos) + fila('Observaciones', c.observaciones) + '</div>' : '';
  mountDrawer('<div class="top"><button class="closeb k" onclick="closeDrawer()">←</button><span class="badge cat" style="padding:6px 16px">' + esc(c.tipo) + '</span></div>'
    + (c.imagen ? '<div class="pdphoto"><img src="' + esc(c.imagen) + '" alt=""></div>' : '')
    + '<div class="dpad"><h2 class="dtitle display">' + esc(tit(c.titulo)) + (c.titulo2 ? '<br>' + esc(tit(c.titulo2)) : '') + '</h2>'
    + ((metaPrim.length || metaSec.length) ? '<div class="dmeta">' + (metaPrim.length ? '<div>' + metaPrim.map(esc).join('  |  ') + '</div>' : '') + (metaSec.length ? '<div>' + metaSec.map(esc).join('  |  ') + '</div>' : '') + '</div>' : '')
    + secHtml + (c.descripcion && c.descripcion.length ? '<div style="margin-top:24px">' + parrafos(c.descripcion) + '</div>' : '') + reqTags + info + '</div>');
}
function openProf(id) {
  const p = PROF.get(id);
  if (!p) return;
  const cursos = cursosDe(id);
  const item = (c, dark) => '<button class="courselink" onclick="openCourse(' + jsq(c.id) + ')"><span class="pt ' + (dark ? 'k' : 'g') + '">' + esc(c.tipo) + '</span><span class="ct display">' + esc(tit(c.titulo)) + '</span>' + (c.codigo ? '<span class="cc">' + esc(c.codigo) + '</span>' : '') + '</button>';
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
function go(v) { state.view = v; state.search = ''; state.modality = 'all'; state.requirement = 'all'; state.posTab = 0; state.penNivel = 'pregrado'; closeDrawer(true); window.scrollTo(0, 0); animar = true; render(); }
function onSearch(v) { state.search = v; searchFocus = true; render(); }
function setMod(m) { state.modality = m; searchFocus = false; animar = true; render(); }
function setReq(r) { state.requirement = r; searchFocus = false; animar = true; render(); }
function clearSearch() { state.search = ''; searchFocus = true; animar = true; render(); }
function setPenNivel(n) { if (n === state.penNivel) return; state.penNivel = n; animar = true; render(); const b = app.querySelector('.pen-op.' + n); if (b) b.focus({ preventScroll: true }); }
function setPosTab(i) { state.posTab = i; state.requirement = 'all'; state.modality = 'all'; animar = true; render(); }
function restoreSearchFocus() { if (searchFocus) { const el = app.querySelector('input[type=search]'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } searchFocus = false; } }

render();
pedirCupos();
