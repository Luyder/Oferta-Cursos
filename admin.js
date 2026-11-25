/* Editor de la oferta de cursos (Facultad de Educación).
   Lee datos.js, edita una copia y publica el nuevo datos.js (y las fotos subidas)
   directamente en el repositorio de GitHub con la API de contenidos.
   Sin token de GitHub, descarga los archivos para subirlos a mano.
   Basado en el editor del micrositio de Educación Continua. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  const CATEGORIAS = [["pregrado", "Pregrado"], ["posgrado", "Posgrado"]];
  const TIPOS = [["LIC", "Licenciatura (LIC)"], ["MS", "Maestría (MS)"], ["ESP", "Especialización (ESP)"], ["DOC", "Doctorado (DOC)"]];
  const TRACKS = [["profundizacion", "Profundización"], ["investigacion", "Investigación"], ["compartido", "Compartido (ambos tracks)"]];
  const MODALIDADES = [["PRESENCIAL", "Presencial"], ["VIRTUAL", "Virtual"], ["HÍBRIDA", "Hyflex - Híbrida"]];
  const DIAS = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"];
  const PROGRAMAS = [
    ["General", ["Todos los programas", "Todos los pregrados", "Todos los posgrados"]],
    ["Pregrado — Licenciaturas", ["Licenciatura en Artes", "Licenciatura en Biología", "Licenciatura en Educación Infantil", "Licenciatura en Español y Filología", "Licenciatura en Filosofía", "Licenciatura en Física", "Licenciatura en Historia", "Licenciatura en Matemáticas", "Licenciatura en Química", "Opción en Pedagogía"]],
    ["Especializaciones", ["Especialización en Innovación Curricular y Pedagógica", "Especialización en Liderazgo y Política Educativa"]],
    ["Maestrías", ["Maestría en Educación – Profundización (virtual)", "Maestría en Educación – Profundización (semipresencial)", "Maestría en Educación – Investigación (semipresencial)", "Maestría en Educación Matemática"]],
    ["Doctorado", ["Doctorado en Educación"]]
  ];
  const CAMPOS_CURSO = ["id", "oculto", "titulo", "titulo2", "categoria", "tipo", "track", "codigo", "creditos", "semanas", "modalidad", "imagen", "descripcion", "prerrequisitos", "fijarPrerrequisitos", "correquisitos", "observaciones", "obligatoriaEn", "electivaEn", "secciones"];
  const CAMPOS_PROFE = ["id", "oculto", "nombre", "cargo", "imagen", "bio"];

  const LS = (() => { try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); return localStorage; } catch (e) { return null; } })();

  let publicado = clone(window.OFERTA);
  let D = clone(publicado);
  let base = generar(D);
  let pendientes = {};          // ruta → { b64, dataUrl } de fotos subidas sin publicar
  let sel = { cursos: cursosPorCodigo()[0]?.id, profes: D.profesores[0]?.id };

  /* ---------- Generar datos.js ---------- */
  function limpiar(o, campos) {
    const r = {};
    campos.forEach((k) => {
      const v = o[k];
      if (Array.isArray(v)) { r[k] = v; return; }
      if (v === "" || v == null || v === false) return;
      r[k] = v;
    });
    Object.keys(o).forEach((k) => { if (!campos.includes(k) && !k.startsWith("__") && o[k] !== "" && o[k] != null) r[k] = o[k]; });
    return r;
  }
  function generar(d) {
    const salida = Object.assign({}, d, {
      cursos: d.cursos.map((c) => limpiar(c, CAMPOS_CURSO)),
      profesores: d.profesores.map((p) => limpiar(p, CAMPOS_PROFE))
    });
    return "/* Datos de la oferta de cursos — Facultad de Educación, Uniandes.\n" +
      "   Se edita desde admin.html. Si lo editas a mano, conserva el formato JSON.\n\n" +
      "   categoria = pregrado | posgrado; tipo = LIC | MS | ESP | DOC;\n" +
      "   track (solo MS) = profundizacion | investigacion | compartido;\n" +
      "   secciones[].profesores = ids de profesores. */\n\n" +
      "window.OFERTA = " + JSON.stringify(salida, null, 2) + ";\n";
  }
  function idNuevo(prefijo, lista) {
    let id;
    do { id = prefijo + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); } while (lista.some((x) => x.id === id));
    return id;
  }

  /* ---------- Estado de la barra ---------- */
  const sucio = () => generar(D) !== base || Object.keys(pendientes).length > 0;
  function problemas() {
    const p = [];
    D.cursos.forEach((c) => {
      if (!c.titulo?.trim()) p.push("Hay un curso sin título.");
      (c.secciones || []).forEach((s) => (s.horario || []).forEach((b) => {
        if (!b.dia || !b.inicio?.trim() || !b.fin?.trim()) p.push(`«${c.titulo || "Curso sin título"}» tiene un bloque de horario incompleto.`);
      }));
    });
    D.profesores.forEach((x) => { if (!x.nombre?.trim()) p.push("Hay un profesor sin nombre."); });
    return p;
  }
  function cambio(repintarListas = true) {
    const s = sucio();
    const prob = problemas();
    $("#barra").classList.toggle("sucio", s);
    $("#estado").textContent = prob.length ? prob[0] : s ? "Cambios sin publicar" : "Sin cambios";
    $("#guardar").disabled = !s || prob.length > 0;
    $("#descartar").hidden = !s;
    if (repintarListas) { pintarListaCursos(); pintarListaProfes(); }
  }

  /* ---------- Utilidades de formulario ---------- */
  function campo(etiqueta, control, ayuda, ancho) {
    const l = document.createElement("label");
    l.className = "ad-campo" + (ancho ? " ancho" : "");
    l.innerHTML = `<span>${esc(etiqueta)}</span>`;
    l.appendChild(control);
    if (ayuda) l.insertAdjacentHTML("beforeend", `<small>${ayuda}</small>`);
    return l;
  }
  function texto(valor, alCambiar, opc = {}) {
    const i = document.createElement(opc.area ? "textarea" : "input");
    i.className = "campo" + (opc.bajo ? " bajo" : "");
    if (!opc.area) i.type = opc.tipo || "text";
    if (opc.placeholder) i.placeholder = opc.placeholder;
    if (opc.min != null) i.min = opc.min;
    i.value = valor ?? "";
    i.addEventListener("input", () => { alCambiar(i.value, i); cambio(opc.repintar !== false); });
    return i;
  }
  function selector(valor, opciones, alCambiar, vacio) {
    const s = document.createElement("select");
    s.className = "campo";
    s.innerHTML = (vacio != null ? `<option value="">${esc(vacio)}</option>` : "") +
      opciones.map(([v, t]) => `<option value="${esc(v)}"${v === valor ? " selected" : ""}>${esc(t)}</option>`).join("");
    s.addEventListener("change", () => { alCambiar(s.value); cambio(); });
    return s;
  }
  function boton(t, fn, cls = "") {
    const x = document.createElement("button");
    x.type = "button"; x.className = "boton " + cls; x.textContent = t;
    x.addEventListener("click", fn);
    return x;
  }
  const numero = (v) => (v === "" ? "" : Math.max(0, parseInt(v, 10) || 0));
  const parrafos = (v) => v.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const fotoUrl = (ruta) => (ruta && pendientes[ruta] ? pendientes[ruta].dataUrl : ruta);

  function bloqueFoto(item, cuadrada) {
    const caja = document.createElement("div");
    caja.className = "ad-foto" + (cuadrada ? " cuadrada" : "");
    const pintar = () => {
      caja.innerHTML = item.imagen ? `<img src="${esc(fotoUrl(item.imagen))}" alt="">` : `<span class="vacia">Sin foto</span>`;
      const archivo = document.createElement("input");
      archivo.type = "file"; archivo.accept = "image/*"; archivo.hidden = true;
      caja.appendChild(archivo);
      archivo.addEventListener("change", async (e) => {
        const f = e.target.files[0];
        if (!f) return;
        try {
          const r = await procesarFoto(f, cuadrada);
          const ruta = `media/${item.id}-${Date.now().toString(36)}.${r.ext}`;
          if (item.imagen && pendientes[item.imagen]) delete pendientes[item.imagen];
          pendientes[ruta] = r;
          item.imagen = ruta;
          pintar(); cambio();
        } catch (err) { aviso("No se pudo leer la imagen: " + err.message, true); }
      });
      caja.appendChild(boton(item.imagen ? "Cambiar foto" : "Subir foto", () => archivo.click()));
      if (item.imagen) caja.appendChild(boton("Quitar foto", () => { delete pendientes[item.imagen]; item.imagen = ""; pintar(); cambio(); }));
    };
    pintar();
    return caja;
  }

  /* Reduce la foto en el navegador y la convierte a WebP (o JPEG si el navegador no sabe). */
  async function procesarFoto(archivo, cuadrada) {
    const bm = await createImageBitmap(archivo);
    let sx = 0, sy = 0, sw = bm.width, sh = bm.height, w, h;
    if (cuadrada) {
      const lado = Math.min(sw, sh);
      sx = (sw - lado) / 2; sy = (sh - lado) / 3; sw = sh = lado;
      w = h = Math.min(600, lado);
    } else {
      w = Math.min(1000, sw); h = Math.round(sh * (w / sw));
    }
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    c.getContext("2d").drawImage(bm, sx, sy, sw, sh, 0, 0, w, h);
    let dataUrl = c.toDataURL("image/webp", 0.8);
    if (!dataUrl.startsWith("data:image/webp")) dataUrl = c.toDataURL("image/jpeg", 0.82);
    return { dataUrl, b64: dataUrl.split(",")[1], ext: dataUrl.startsWith("data:image/webp") ? "webp" : "jpg" };
  }

  function botonesItem(lista, item, clave, alNuevo) {
    const caja = document.createElement("div");
    caja.className = "ad-acciones-item";
    const i = lista.indexOf(item);
    const b = (t, fn, cls) => caja.appendChild(boton(t, fn, cls));
    b("↑ Subir", () => { [lista[i - 1], lista[i]] = [lista[i], lista[i - 1]]; cambio(); pintarForms(); }).disabled = i === 0;
    b("↓ Bajar", () => { [lista[i + 1], lista[i]] = [lista[i], lista[i + 1]]; cambio(); pintarForms(); }).disabled = i === lista.length - 1;
    b("Duplicar", () => alNuevo(clone(item)));
    b(item.oculto ? "Mostrar en el sitio" : "Ocultar", () => { item.oculto = !item.oculto; cambio(); pintarForms(); }, item.oculto ? "negro" : "");
    b("Eliminar", () => {
      const nombre = item.titulo || item.nombre || "este elemento";
      if (!confirm(`¿Eliminar «${nombre}»? Desaparecerá del sitio al publicar.`)) return;
      lista.splice(i, 1);
      if (clave === "profes") D.cursos.forEach((c) => (c.secciones || []).forEach((s) => { s.profesores = (s.profesores || []).filter((p) => p !== item.id); }));
      if (item.imagen) delete pendientes[item.imagen];
      sel[clave] = lista[Math.min(i, lista.length - 1)]?.id;
      cambio(); pintarForms();
    }, "peligro");
    return caja;
  }

  /* ---------- Cursos ---------- */
  const etiqueta = (pares, v) => (pares.find(([k]) => k === v) || [, v || ""])[1];
  /* La lista del editor va por código, de menor a mayor (número y luego prefijo); los cursos sin código, primero.
     Es solo la vista: el orden del sitio sigue siendo el de D.cursos. */
  function cursosPorCodigo() {
    const num = (c) => parseInt(/\d+/.exec(c.codigo || "")?.[0] ?? "-1", 10);
    return [...D.cursos].sort((a, b) => num(a) - num(b) || (a.codigo || "").localeCompare(b.codigo || ""));
  }
  function pintarListaCursos() {
    const q = norm($("#filtro-cursos").value).trim();
    $("#lista-cursos").innerHTML = cursosPorCodigo().filter((c) => !q || norm(c.titulo).includes(q) || norm(c.codigo).includes(q)).map((c) => `
      <li class="${c.oculto ? "oculto" : ""}"><button data-id="${esc(c.id)}" aria-current="${c.id === sel.cursos}">
        ${c.imagen ? `<img class="mini" src="${esc(fotoUrl(c.imagen))}" alt="">` : `<span class="mini"></span>`}
        <span>${esc(c.titulo || "(sin título)")}
        <small>${c.codigo ? esc(c.codigo) + " · " : ""}${c.oculto ? "OCULTO · " : ""}${esc(etiqueta(CATEGORIAS, c.categoria))} · ${esc(c.tipo)}${(c.secciones || []).length > 1 ? " · " + c.secciones.length + " secciones" : ""}</small></span>
      </button></li>`).join("") || `<li class="ad-vacio">Sin resultados</li>`;
  }

  function checksProgramas(c, clave) {
    const caja = document.createElement("div");
    const conocidos = new Set(PROGRAMAS.flatMap(([, ps]) => ps));
    const grupos = [...PROGRAMAS];
    const extra = (c[clave] || []).filter((p) => !conocidos.has(p));
    if (extra.length) grupos.push(["Otros", extra]);
    grupos.forEach(([titulo, ps]) => {
      const g = document.createElement("div");
      g.className = "ad-grupo";
      g.innerHTML = `<b>${esc(titulo)}</b>`;
      const ch = document.createElement("div");
      ch.className = "ad-checks";
      ps.forEach((p) => {
        const l = document.createElement("label");
        l.innerHTML = `<input type="checkbox" ${(c[clave] || []).includes(p) ? "checked" : ""}> ${esc(p)}`;
        l.querySelector("input").addEventListener("change", (e) => {
          const actual = c[clave] || [];
          c[clave] = e.target.checked ? [...actual, p] : actual.filter((x) => x !== p);
          cambio();
        });
        ch.appendChild(l);
      });
      g.appendChild(ch);
      caja.appendChild(g);
    });
    return caja;
  }

  function editorSecciones(c) {
    const caja = document.createElement("div");
    const pintar = () => {
      caja.innerHTML = "";
      c.secciones.forEach((s, si) => {
        const box = document.createElement("div");
        box.className = "ad-sec";
        const cab = document.createElement("div");
        cab.className = "ad-sec-cab";
        cab.innerHTML = `<b>Sección ${si + 1}</b>`;
        const quitar = boton("Quitar sección", () => {
          if (!confirm(`¿Quitar la sección ${si + 1}${s.nrc ? " (NRC " + s.nrc + ")" : ""}?`)) return;
          c.secciones.splice(si, 1); pintar(); cambio();
        });
        quitar.disabled = c.secciones.length === 1;
        cab.appendChild(quitar);
        box.appendChild(cab);

        const g = document.createElement("div");
        g.className = "ad-rejilla";
        g.appendChild(campo("NRC", texto(s.nrc, (v) => { s.nrc = v.trim(); }, { placeholder: "74944" })));
        box.appendChild(g);

        box.insertAdjacentHTML("beforeend", `<p class="ad-seccion" style="margin-top:14px">Horario</p>`);
        (s.horario = s.horario || []).forEach((b, bi) => {
          const fila = document.createElement("div");
          fila.className = "ad-bloque";
          fila.appendChild(selector(b.dia, DIAS.map((d) => [d, d.charAt(0) + d.slice(1).toLowerCase()]), (v) => { b.dia = v; }, "Día…"));
          fila.appendChild(texto(b.inicio, (v) => { b.inicio = v; }, { placeholder: "8:00 AM" }));
          fila.appendChild(texto(b.fin, (v) => { b.fin = v; }, { placeholder: "9:50 AM" }));
          const x = document.createElement("button");
          x.type = "button"; x.className = "ad-x"; x.textContent = "×"; x.title = "Quitar bloque";
          x.addEventListener("click", () => { s.horario.splice(bi, 1); pintar(); cambio(); });
          fila.appendChild(x);
          box.appendChild(fila);
        });
        box.appendChild(boton("+ Agregar bloque de horario", () => { s.horario.push({ dia: "", inicio: "", fin: "" }); pintar(); cambio(); }, "ad-mini"));

        box.insertAdjacentHTML("beforeend", `<p class="ad-seccion" style="margin-top:14px">Profesores de esta sección</p>`);
        const ch = document.createElement("div");
        ch.className = "ad-checks";
        s.profesores = s.profesores || [];
        D.profesores.forEach((p) => {
          const l = document.createElement("label");
          l.innerHTML = `<input type="checkbox" ${s.profesores.includes(p.id) ? "checked" : ""}> ${esc(p.nombre || "(sin nombre)")}`;
          l.querySelector("input").addEventListener("change", (e) => {
            s.profesores = e.target.checked ? [...s.profesores, p.id] : s.profesores.filter((x) => x !== p.id);
            cambio();
          });
          ch.appendChild(l);
        });
        box.appendChild(ch);
        caja.appendChild(box);
      });
      caja.appendChild(boton("+ Agregar sección", () => { c.secciones.push({ nrc: "", horario: [], profesores: [] }); pintar(); cambio(); }, "negro"));
    };
    pintar();
    return caja;
  }

  function pintarFormCurso() {
    const f = $("#form-curso");
    const c = D.cursos.find((x) => x.id === sel.cursos);
    f.innerHTML = "";
    if (!c) { f.innerHTML = `<p class="ad-vacio">Elige un curso de la lista o crea uno nuevo.</p>`; return; }
    c.secciones = c.secciones || [];
    f.insertAdjacentHTML("beforeend", `<h2>${esc(c.titulo || "Nuevo curso")}</h2><p class="sub">${c.oculto ? "<b class=\"ad-oculto\">Oculto: no aparece en el sitio.</b> " : ""}La lista está ordenada por código. En el sitio este curso va en la posición ${D.cursos.indexOf(c) + 1} de ${D.cursos.length} (contando ocultos): «Subir» y «Bajar» cambian esa posición. Los cambios se ven después de publicar.</p>`);
    f.appendChild(botonesItem(D.cursos, c, "cursos", (copia) => {
      copia.titulo = (copia.titulo || "") + " (copia)";
      copia.id = idNuevo("c", D.cursos); copia.imagen = ""; copia.codigo = ""; delete copia.fijarPrerrequisitos;   // la copia es otro curso: sin el código del original
      D.cursos.splice(D.cursos.indexOf(c) + 1, 0, copia);
      sel.cursos = copia.id; cambio(); pintarForms();
    }));

    const g = document.createElement("div");
    g.className = "ad-rejilla";
    g.appendChild(campo("Nombre del curso", texto(c.titulo, (v) => { c.titulo = v; $("#form-curso h2").textContent = v || "Nuevo curso"; }), null, true));
    g.appendChild(campo("Segunda línea del nombre (opcional)", texto(c.titulo2, (v) => { c.titulo2 = v; }, { repintar: false }), null, true));
    g.appendChild(campo("Categoría", selector(c.categoria, CATEGORIAS, (v) => {
      c.categoria = v;
      if (v === "pregrado") { c.tipo = "LIC"; delete c.track; }
      else if (c.tipo === "LIC") c.tipo = "MS";
      pintarFormCurso();
    })));
    g.appendChild(campo("Tipo de programa", selector(c.tipo, TIPOS.filter(([k]) => (c.categoria === "pregrado") === (k === "LIC")), (v) => { c.tipo = v; if (v !== "MS") delete c.track; pintarFormCurso(); })));
    if (c.tipo === "MS") {
      g.appendChild(campo("Track de maestría", selector(c.track || "", TRACKS, (v) => { c.track = v; }, "— Según obligatoria/electiva —"),
        "Define en qué pestaña de maestría aparece."));
    }
    g.appendChild(campo("Código", texto(c.codigo, (v) => { c.codigo = v.trim(); }, { placeholder: "EDUC-1100" })));
    g.appendChild(campo("Créditos", texto(c.creditos, (v) => { c.creditos = numero(v); }, { tipo: "number", min: 0 })));
    g.appendChild(campo("Semanas", texto(c.semanas, (v) => { c.semanas = numero(v); }, { tipo: "number", min: 0 })));
    g.appendChild(campo("Modalidad", selector(c.modalidad, MODALIDADES, (v) => { c.modalidad = v; })));
    f.appendChild(g);

    f.insertAdjacentHTML("beforeend", `<p class="ad-seccion">Foto</p>`);
    f.appendChild(bloqueFoto(c, false));

    f.insertAdjacentHTML("beforeend", `<p class="ad-seccion">Secciones (NRC, horario y profesores)</p>`);
    f.appendChild(editorSecciones(c));

    f.insertAdjacentHTML("beforeend", `<p class="ad-seccion">Contenido</p>`);
    const g2 = document.createElement("div");
    g2.className = "ad-rejilla";
    g2.appendChild(campo("Descripción", texto((c.descripcion || []).join("\n\n"), (v) => { c.descripcion = parrafos(v); }, { area: true, repintar: false }), "Separa los párrafos con una línea en blanco.", true));
    // Los prerrequisitos se regeneran al actualizar desde Oferta de Cursos, salvo que estén fijados.
    // Editarlos a mano los fija automáticamente (la casilla queda a la vista para desmarcarla).
    const fijar = document.createElement("label");
    fijar.className = "ad-check ad-campo ancho";
    fijar.innerHTML = `<input type="checkbox" ${c.fijarPrerrequisitos ? "checked" : ""}> No actualizar los prerrequisitos de este curso desde Oferta de Cursos`;
    const casilla = fijar.querySelector("input");
    casilla.addEventListener("change", () => { c.fijarPrerrequisitos = casilla.checked; cambio(false); });
    g2.appendChild(campo("Prerrequisitos", texto(c.prerrequisitos, (v) => { c.prerrequisitos = v; c.fijarPrerrequisitos = true; casilla.checked = true; }, { area: true, bajo: true, repintar: false }),
      "Se actualizan solos con «Actualizar desde Oferta de Cursos». Si los editas a mano, quedan fijos. Déjalo vacío si no aplica.", true));
    g2.appendChild(fijar);
    g2.appendChild(campo("Correquisitos", texto(c.correquisitos, (v) => { c.correquisitos = v; }, { area: true, bajo: true, repintar: false }), "Déjalo vacío si no aplica.", true));
    g2.appendChild(campo("Observaciones / restricciones", texto(c.observaciones, (v) => { c.observaciones = v; }, { area: true, bajo: true, repintar: false }), null, true));
    f.appendChild(g2);

    f.insertAdjacentHTML("beforeend", `<p class="ad-seccion">Obligatoria o electiva por programa</p>`);
    const dos = document.createElement("div");
    dos.className = "ad-dos-col";
    [["obligatoriaEn", "Obligatoria en…"], ["electivaEn", "Electiva en…"]].forEach(([k, t]) => {
      const col = document.createElement("div");
      col.innerHTML = `<p>${t}</p>`;
      col.appendChild(checksProgramas(c, k));
      dos.appendChild(col);
    });
    f.appendChild(dos);
  }

  function nuevoCurso() {
    const c = { id: idNuevo("c", D.cursos), titulo: "", categoria: "pregrado", tipo: "LIC", modalidad: "PRESENCIAL", semanas: 16, descripcion: [], obligatoriaEn: [], electivaEn: [], secciones: [{ nrc: "", horario: [], profesores: [] }] };
    D.cursos.unshift(c);
    sel.cursos = c.id;
    $("#filtro-cursos").value = "";
    cambio(); pintarForms();
    $("#form-curso input")?.focus();
  }

  /* ---------- Profesores ---------- */
  function pintarListaProfes() {
    const q = norm($("#filtro-profes").value).trim();
    $("#lista-profes").innerHTML = D.profesores.filter((p) => !q || norm(p.nombre).includes(q)).map((p) => `
      <li class="${p.oculto ? "oculto" : ""}"><button data-id="${esc(p.id)}" aria-current="${p.id === sel.profes}">
        ${p.imagen ? `<img class="mini" src="${esc(fotoUrl(p.imagen))}" alt="">` : `<span class="mini"></span>`}
        <span>${esc(p.nombre || "(sin nombre)")}<small>${p.oculto ? "OCULTO · " : ""}${esc(p.cargo || "")}</small></span>
      </button></li>`).join("") || `<li class="ad-vacio">Sin resultados</li>`;
  }

  function pintarFormProfe() {
    const f = $("#form-profe");
    const p = D.profesores.find((x) => x.id === sel.profes);
    f.innerHTML = "";
    if (!p) { f.innerHTML = `<p class="ad-vacio">Elige un profesor de la lista o crea uno nuevo.</p>`; return; }
    const cursos = D.cursos.filter((c) => (c.secciones || []).some((s) => (s.profesores || []).includes(p.id)));
    f.insertAdjacentHTML("beforeend", `<h2>${esc(p.nombre || "Nuevo profesor")}</h2><p class="sub">${p.oculto ? "<b class=\"ad-oculto\">Oculto: no aparece en el sitio.</b> " : ""}${cursos.length ? "Dicta: " + cursos.map((c) => esc(c.titulo)).join(" · ") : "Asígnalo a sus cursos desde la pestaña Cursos (en cada sección)."}</p>`);
    f.appendChild(botonesItem(D.profesores, p, "profes", (copia) => {
      copia.nombre += " (copia)"; copia.id = idNuevo("p", D.profesores); copia.imagen = "";
      D.profesores.splice(D.profesores.indexOf(p) + 1, 0, copia);
      sel.profes = copia.id; cambio(); pintarForms();
    }));
    const g = document.createElement("div");
    g.className = "ad-rejilla";
    g.appendChild(campo("Nombre", texto(p.nombre, (v) => { p.nombre = v; $("#form-profe h2").textContent = v || "Nuevo profesor"; }), null, true));
    g.appendChild(campo("Cargo", texto(p.cargo, (v) => { p.cargo = v; }, { placeholder: "Profesora Asociada" }), null, true));
    g.appendChild(campo("Biografía", texto((p.bio || []).join("\n\n"), (v) => { p.bio = parrafos(v); }, { area: true, repintar: false }), "Separa los párrafos con una línea en blanco.", true));
    f.appendChild(g);
    f.insertAdjacentHTML("beforeend", `<p class="ad-seccion">Foto</p>`);
    f.appendChild(bloqueFoto(p, true));
  }

  function nuevoProfe() {
    const p = { id: idNuevo("p", D.profesores), nombre: "", cargo: "", bio: [] };
    D.profesores.unshift(p);
    sel.profes = p.id;
    $("#filtro-profes").value = "";
    cambio(); pintarForms();
    $("#form-profe input")?.focus();
  }

  function pintarForms() { pintarFormCurso(); pintarFormProfe(); pintarListaCursos(); pintarListaProfes(); }

  /* ---------- Actualizar desde Oferta de Cursos (ofertadecursos.uniandes.edu.co) ----------
     Consulta el servicio público que usa esa página (permite consultas desde otros sitios).
     Por código de curso: actualiza secciones, horarios, profesores, créditos, semanas, modalidad
     y prerrequisitos; conserva fotos, descripciones, obligatoria/electiva, track y orden.
     Los cursos que no están en el periodo elegido se ocultan; los nuevos entran visibles. */
  const API = "https://ofertadecursos.uniandes.edu.co/api";
  const DIA_LETRA = { l: "LUNES", m: "MARTES", i: "MIÉRCOLES", j: "JUEVES", v: "VIERNES", s: "SÁBADO", d: "DOMINGO" };
  const qs = (o) => Object.entries(o).map(([k, v]) => k + "=" + encodeURIComponent(v ?? "")).join("&");
  async function apiGet(ruta) {
    const r = await fetch(API + ruta, { cache: "no-store", signal: AbortSignal.timeout(30000) }).catch((e) => {
      throw new Error(e.name === "TimeoutError" ? "Oferta de Cursos no respondió a tiempo" : "No se pudo conectar con Oferta de Cursos");
    });
    if (!r.ok) throw new Error("Oferta de Cursos respondió " + r.status);
    return r.json();
  }
  const etiquetaPeriodo = (t) => t.slice(0, 4) + "-" + ({ "10": "1", "20": "2" }[t.slice(4)] || t.slice(4));
  const hora = (h) => { const n = parseInt(h, 10), hh = Math.floor(n / 100), mm = String(n % 100).padStart(2, "0"); return (((hh + 11) % 12) + 1) + ":" + mm + (hh < 12 ? " AM" : " PM"); };
  const palabras = (s) => norm(s).split(/[^a-z]+/).filter((t) => t.length > 1);
  const tituloPropio = (s) => s.toLowerCase().replace(/(^|\s)(\S)/g, (m, a, b) => a + b.toUpperCase());

  function tipoPorCodigo(codigo, nivel) {
    const n = parseInt((codigo.split("-")[1] || "0"), 10);
    if (nivel === "PRE" || n < 4000) return "LIC";
    if (n < 5000) return "MS";
    if (n < 6000) return "ESP";
    return "DOC";
  }
  function modalidadDe(secs) {
    const c = {};
    secs.forEach((s) => { const m = /VIRTUAL/.test(s.campus) ? (/PRESENCIAL/.test(s.campus) ? "HÍBRIDA" : "VIRTUAL") : "PRESENCIAL"; c[m] = (c[m] || 0) + 1; });
    return Object.entries(c).sort((a, b) => b[1] - a[1])[0][0];
  }
  function horarioDe(sec) {
    const vistos = new Set(), out = [];
    (sec.schedules || []).forEach((h) => Object.keys(DIA_LETRA).forEach((l) => {
      if (!h[l] || !h.time_ini || !h.time_fin) return;
      const b = { dia: DIA_LETRA[l], inicio: hora(h.time_ini), fin: hora(h.time_fin) };
      const k = b.dia + b.inicio + b.fin;
      if (!vistos.has(k)) { vistos.add(k); out.push(b); }
    }));
    const orden = Object.values(DIA_LETRA);
    return out.sort((a, b) => orden.indexOf(a.dia) - orden.indexOf(b.dia));
  }
  /* Banner escribe «APELLIDOS NOMBRES»; el sitio, «Nombres Apellidos». Coincide si todas las
     palabras del nombre del sitio (mínimo dos) aparecen en el de Banner. */
  function profeDe(d, nombreBanner, nuevos) {
    const tb = new Set(palabras(nombreBanner));
    let mejor = null, puntos = 0;
    d.profesores.forEach((p) => {
      const tp = palabras(p.nombre);
      const comunes = tp.filter((t) => tb.has(t)).length;
      if (comunes >= 2 && comunes === tp.length && comunes > puntos) { mejor = p; puntos = comunes; }
    });
    if (mejor) return mejor.id;
    const partes = nombreBanner.trim().split(/\s+/);
    const corte = partes.length >= 3 ? 2 : 1;
    const nombre = tituloPropio([...partes.slice(corte), ...partes.slice(0, corte)].join(" "));
    const p = { id: idNuevo("p", d.profesores), nombre, cargo: "", bio: [] };
    d.profesores.push(p); nuevos.push(nombre);
    return p.id;
  }

  async function consultarOferta(term, prefijosExtra) {
    const pedir = (prefix) => apiGet("/courses?" + qs({ term, ptrm: "", prefix, attr: "", nameInput: "", campus: "", attrs: "", timeStart: "", offset: 0, limit: 1000 }));
    const lotes = await Promise.all(["EDUC", ...prefijosExtra].map(pedir));
    if (lotes.some((l) => l.length >= 1000)) throw new Error("La consulta llegó al límite de 1000 secciones; avisa para ajustar el editor");
    return lotes.flat().filter((x) => x.term === term);
  }
  /* Agrupa las secciones por código y une los códigos que en Banner tienen el mismo nombre y
     nivel (p. ej. «Trabajo de grado I» con EDUC-4208 y EDUC-4210). De otros prefijos (CBU…)
     solo entran los cursos que ya tiene el sitio. */
  function agrupar(registros, codigosSitio) {
    const porCodigo = new Map();
    registros.forEach((x) => {
      const codigo = x.class + "-" + x.course;
      if (x.class !== "EDUC" && !codigosSitio.has(codigo)) return;
      if (!porCodigo.has(codigo)) porCodigo.set(codigo, []);
      porCodigo.get(codigo).push(x);
    });
    const grupos = new Map();
    porCodigo.forEach((secs, codigo) => {
      const k = secs[0].levele + "|" + norm(secs[0].title.trim());
      if (!grupos.has(k)) grupos.set(k, { codigos: [], secs: [], cuenta: {} });
      const g = grupos.get(k);
      g.codigos.push(codigo); g.secs.push(...secs); g.cuenta[codigo] = secs.length;
    });
    return [...grupos.values()].map((g) => Object.assign(g, { codigo: Object.entries(g.cuenta).sort((a, b) => b[1] - a[1])[0][0] }));
  }

  /* Banner da los prerrequisitos como una expresión de códigos («(LENG 2999 O LENG 1103 …) Y EDUC 2103»)
     y otra paralela con nombres abreviados. Se convierten a texto legible en dos líneas:
       Educación General: requisitos de fuera de la Facultad (inglés, etc.)
       Educación: cursos EDUC
     El grupo de equivalencias de inglés se resume en «Inglés 3 o English 06». */
  const INGLES = { "LENG 1103": "Inglés 3", "LENG 1156": "English 06" };
  const esIngles = (cod) => /^(LENG|ENGL|INGL|INLE|RLEC|RLEN)/.test(cod) && !/^LENG 69\d\d/.test(cod);
  const ROMANOS = /\b(i{1,3}|iv|vi{0,3}|ix|x)\b/g;
  // Banner y algunos títulos vienen sin tildes: se corrigen las palabras más frecuentes.
  const TILDES = { evaluacion: "evaluación", curriculo: "currículo", pedagogia: "pedagogía", elaboracion: "elaboración", investigacion: "investigación", educacion: "educación", practica: "práctica", pedagogica: "pedagógica", innovacion: "innovación", teorias: "teorías", diseno: "diseño", ingles: "inglés", colombia: "Colombia" };
  const frase = (s) => {
    const t = String(s).replace(/\*/g, "").trim().toLowerCase().replace(/[a-zñ]+/g, (w) => TILDES[w] || w).replace(ROMANOS, (m) => m.toUpperCase()).replace(/\bcbu\b/g, "CBU");
    return t.charAt(0).toUpperCase() + t.slice(1);
  };

  function trozos(expr) {   // separa una expresión en códigos/nombres, operadores y paréntesis
    return expr.replace(/\(/g, " ( ").replace(/\)/g, " ) ").split(/\s+(?=[YO]\s)|(?<=\s[YO])\s+|\s*(\(|\))\s*/).map((t) => (t || "").trim()).filter(Boolean);
  }
  function arbol(tokens) {  // expr := termino (op termino)* ; termino := código | ( expr )
    let i = 0;
    const expr = () => {
      const hijos = [termino()];
      let op = null;
      while (i < tokens.length && (tokens[i] === "Y" || tokens[i] === "O")) { op = op || tokens[i]; i++; hijos.push(termino()); }
      return hijos.length === 1 ? hijos[0] : { op, hijos };
    };
    const termino = () => {
      if (tokens[i] === "(") { i++; const e = expr(); if (tokens[i] === ")") i++; return e; }
      return { cod: (tokens[i++] || "").replace(/\*$/, "").replace(/\s+/g, " ") };
    };
    return expr();
  }
  /* Empareja cada código con su nombre en la descripción paralela. Si algún nombre contiene « Y »
     sobran fragmentos: se prueban las formas de unirlos y se elige la que más coincide con los
     nombres ya conocidos (títulos del sitio o de Banner). */
  const huella = (s) => new Set(norm(s).split(/[^a-z0-9]+/).filter((t) => t.length > 2));
  function parecido(a, b) {
    const x = huella(a), y = huella(b);
    if (!x.size || !y.size) return 0;
    let c = 0; x.forEach((t) => { if (y.has(t)) c++; });
    return c / Math.max(x.size, y.size);
  }
  function alinear(codigos, textos, nombres) {
    const k = codigos.length, n = textos.length, out = {};
    if (!k || n < k) return out;
    if (n === k) { codigos.forEach((c, i) => { out[c] = textos[i]; }); return out; }
    const conocido = (c) => INGLES[c] || nombres[c.replace(" ", "-")] || "";
    const memo = new Map();
    const mejor = (i, j) => {   // mejor reparto de textos[j..] entre codigos[i..]
      if (i === k) return j === n ? { p: 0, cortes: [] } : null;
      const clave = i + "," + j;
      if (memo.has(clave)) return memo.get(clave);
      let res = null;
      for (let f = j + 1; f <= n - (k - i - 1); f++) {
        const resto = mejor(i + 1, f);
        if (!resto) continue;
        const nom = conocido(codigos[i]);
        const p = resto.p + (nom ? parecido(nom, textos.slice(j, f).join(" y ")) : 0) - (f - j - 1) * 0.01;
        if (!res || p > res.p) res = { p, cortes: [f, ...resto.cortes] };
      }
      memo.set(clave, res);
      return res;
    };
    const r = mejor(0, 0);
    if (!r) return out;
    let j = 0;
    r.cortes.forEach((f, i) => { out[codigos[i]] = textos.slice(j, f).join(" y "); j = f; });
    return out;
  }

  /* Secuencias numeradas («Práctica formativa 1 · 2 · 3»): si se exigen todas, basta con la última;
     si son alternativas, se compactan en «Práctica formativa 1, 2 o 3». */
  const ROM = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
  const serie = (t) => { const m = /^(.*\S)\s+(\d+|[IVX]+)$/.exec(t); const v = m && (/^\d+$/.test(m[2]) ? +m[2] : ROM[m[2]]); return v && v <= 20 ? { base: m[1], clave: norm(m[1]), num: m[2], v } : null; };   // números pequeños: no confunde códigos («EDUC 6000»)
  function soloLaUltima(items) {
    const max = {};
    items.forEach((t) => { const s = serie(t); if (s && (!max[s.clave] || s.v > max[s.clave].v)) max[s.clave] = { v: s.v, t }; });
    const vistos = new Set();
    return items.map((t) => { const s = serie(t); return s && max[s.clave] ? max[s.clave].t : t; }).filter((t) => (vistos.has(t) ? false : vistos.add(t)));
  }
  function alternativas(items) {
    const ss = items.map(serie);
    if (items.length > 1 && ss.every((s) => s && s.clave === ss[0].clave)) {
      const nums = ss.sort((a, b) => a.v - b.v).map((s) => s.num);
      return ss[0].base + " " + nums.slice(0, -1).join(", ") + " o " + nums[nums.length - 1];
    }
    return items.join(" o ");
  }

  /* Lo que un curso exige obligatoriamente (sin contar alternativas «o»): sirve para quitar
     requisitos redundantes («Práctica profesional 1» ya incluye «Práctica formativa 3», 2 y 1). */
  const obligatorios = (n) => (n.cod ? [n.cod] : n.op === "Y" ? n.hijos.flatMap(obligatorios) : []);
  function clausuras(crudos) {   // código («EDUC 2203») → todo lo que exige, directa o indirectamente
    const directos = {};
    Object.entries(crudos).forEach(([cod, lista]) => {
      directos[cod.replace("-", " ")] = (lista || []).flatMap((x) => (String(x.code || "").trim() ? obligatorios(arbol(trozos(String(x.code)))) : []));
    });
    const memo = {};
    const clausura = (cod, visto = new Set()) => {
      if (memo[cod]) return memo[cod];
      if (visto.has(cod)) return new Set();
      visto.add(cod);
      const r = new Set();
      (directos[cod] || []).forEach((d) => { r.add(d); clausura(d, visto).forEach((x) => r.add(x)); });
      return (memo[cod] = r);
    };
    return clausura;
  }

  function textoPrerrequisitos(lista, nombres, clausura = () => new Set()) {
    const lineas = { general: [], educ: [], otras: [] };
    lista.forEach(({ code, descr }) => {
      code = String(code || "").trim(); descr = String(descr || "").trim();
      if (!code) return;
      const tc = trozos(code), td = trozos(descr);
      const codigos = tc.filter((t) => !["Y", "O", "(", ")"].includes(t)).map((t) => t.replace(/\*$/, "").replace(/\s+/g, " "));
      const textos = td.filter((t) => !["Y", "O", "(", ")"].includes(t));
      // Banner a veces corta la descripción al final («… Y EXAMEN COMPRENSIVO Y»): se alinean los nombres que sí llegaron
      const cortada = /\s[YO]$/.test(descr) && textos.length < codigos.length;
      const desc = alinear(cortada ? codigos.slice(0, textos.length) : codigos, textos, nombres);
      const nombre = (c) => INGLES[c] || nombres[c.replace(" ", "-")] || desc[c] || "";
      const hojas = (n) => (n.cod ? [n.cod] : n.hijos.flatMap(hojas));
      const texto = (n) => {
        if (n.cod) return nombre(n.cod) ? frase(nombre(n.cod)) : n.cod;   // sin nombre conocido: el código tal cual
        const cs = hojas(n);
        if (n.op === "O" && cs.every(esIngles) && cs.some((c) => INGLES[c] || /^(ENGL|INGL|INLE|RLEC|RLEN)/.test(c))) {
          const ing = cs.filter((c) => INGLES[c]).map((c) => INGLES[c]);
          return ing.length ? ing.join(" o ") : "Requisito de inglés";
        }
        const partes = [...new Set(n.hijos.map(texto))];
        return "(" + (n.op === "O" ? alternativas(partes) : soloLaUltima(partes).join(" · ")) + ")";
      };
      const raiz = arbol(tc);
      const partes = raiz.cod ? [raiz] : raiz.op === "Y" ? raiz.hijos : hojas(raiz).every(esIngles) ? [raiz] : null;   // un OR de puro inglés cuenta como una sola parte
      if (!partes) { lineas.otras.push("Una de estas opciones: " + raiz.hijos.map((h) => texto(h).replace(/^\((.*)\)$/, "$1")).join("; o ")); return; }
      const implicitos = (q) => { const r = new Set(); obligatorios(q).forEach((c) => clausura(c).forEach((x) => r.add(x))); return r; };
      const sobra = (p) => partes.some((q) => q !== p && (p.cod ? implicitos(q).has(p.cod) : p.op === "O" && hojas(p).some((c) => implicitos(q).has(c))));
      partes.filter((p) => !sobra(p)).forEach((p) => {
        const t = texto(p).replace(/^\((.*)\)$/, "$1");
        (hojas(p).every((c) => /^EDUC\b/.test(c)) ? lineas.educ : lineas.general).push(t);
      });
    });
    const out = [];
    if (lineas.general.length) out.push("Educación General: " + soloLaUltima(lineas.general).join(" · "));
    if (lineas.educ.length) out.push("Educación: " + soloLaUltima(lineas.educ).join(" · "));
    return out.concat(lineas.otras).join("\n");
  }

  async function prerrequisitos(grupos, alAvanzar, nombres) {
    const crudos = {};
    let i = 0;
    for (const g of grupos) {
      const codigo = g.codigo, s = g.secs.find((x) => x.class + "-" + x.course === codigo);
      try {
        const det = await apiGet("/courseDetails?" + qs({ term: s.term, ptrm: s.ptrm, nrc: s.nrc }));
        crudos[codigo] = det.prereq || [];
      } catch (e) { /* sin detalle: se conserva lo que había */ }
      alAvanzar(++i, grupos.length);
    }
    const clausura = clausuras(crudos), out = {};
    Object.entries(crudos).forEach(([codigo, lista]) => { const t = textoPrerrequisitos(lista, nombres, clausura); if (t) out[codigo] = t; });
    return out;
  }

  function planificar(base, grupos, prereqs, term) {
    const d = clone(base);
    const r = { periodoAntes: d.periodo || "", periodo: etiquetaPeriodo(term), actualizados: [], nuevos: [], ocultados: [], mostrados: [], profesNuevos: [] };
    const usados = new Set();
    grupos.forEach(({ codigo, codigos, secs }) => {
      const categoria = secs[0].levele === "PRE" ? "pregrado" : "posgrado";
      let c = d.cursos.find((x) => codigos.includes(x.codigo) && !usados.has(x)) ||
              d.cursos.find((x) => !usados.has(x) && x.categoria === categoria && norm(x.titulo) === norm(secs[0].title.trim()));
      const secciones = secs.map((s) => ({
        nrc: s.nrc,
        horario: horarioDe(s),
        profesores: [...new Set((s.instructors || []).filter((i) => i.name && i.name.trim()).map((i) => profeDe(d, i.name, r.profesNuevos)))]
      }));
      const datos = { secciones, creditos: parseInt(secs[0].credits, 10) || "", semanas: parseInt(secs[0].ptrmdesc, 10) || 16, modalidad: modalidadDe(secs) };
      if (c) {
        usados.add(c);
        const antes = JSON.stringify([c.secciones, c.creditos, c.semanas, c.modalidad, c.prerrequisitos]);
        // «Campus principal» es el valor por defecto de Banner: no reemplaza una modalidad ya definida (p. ej. Hyflex)
        if (datos.modalidad === "PRESENCIAL" && c.modalidad) datos.modalidad = c.modalidad;
        Object.assign(c, datos, { codigo });
        if (prereqs[codigo] && !c.fijarPrerrequisitos) c.prerrequisitos = prereqs[codigo];
        if (c.oculto) r.mostrados.push(c.titulo);
        delete c.oculto;
        if (JSON.stringify([c.secciones, c.creditos, c.semanas, c.modalidad, c.prerrequisitos]) !== antes) r.actualizados.push(c.titulo);
      } else {
        const nivel = secs[0].levele;
        c = Object.assign({ id: idNuevo("c", d.cursos), titulo: secs[0].title.trim(), categoria, tipo: tipoPorCodigo(codigo, nivel), codigo, descripcion: [], obligatoriaEn: [], electivaEn: [] }, datos);
        if (prereqs[codigo]) c.prerrequisitos = prereqs[codigo];
        d.cursos.push(c); usados.add(c);
        r.nuevos.push(c.titulo + " (" + codigo + ")");
      }
    });
    d.cursos.forEach((c) => { if (!usados.has(c) && !c.oculto) { c.oculto = true; r.ocultados.push(c.titulo + (c.codigo ? " (" + c.codigo + ")" : "")); } });
    d.periodo = r.periodo;
    d.periodoCodigo = term;
    return { d, r };
  }

  function modal(html) {
    let m = $("#ad-modal");
    if (!m) { m = document.createElement("div"); m.id = "ad-modal"; m.className = "ad-modal"; document.body.appendChild(m); }
    m.innerHTML = `<div class="ad-modal-caja" role="dialog" aria-modal="true">${html}</div>`;
    return m;
  }
  const cerrarModal = () => $("#ad-modal")?.remove();
  const listaHtml = (titulo, items, vacio) => `<details ${items.length && items.length <= 12 ? "open" : ""}><summary><b>${items.length}</b> ${esc(titulo)}</summary>${items.length ? "<ul>" + items.map((t) => "<li>" + esc(t) + "</li>").join("") + "</ul>" : `<p class="sub">${esc(vacio)}</p>`}</details>`;

  async function sincronizar() {
    const m = modal(`<h2>Actualizar desde Oferta de Cursos</h2><p class="sub">Consultando los periodos disponibles…</p>`);
    let terms;
    try { terms = (await apiGet("/terms")).filter((t) => /SEMESTRE/.test(t.term_name)); }
    catch (e) { m.querySelector(".ad-modal-caja").innerHTML = `<h2>No se pudo consultar</h2><p class="sub">${esc(e.message)}. Revisa la conexión e inténtalo de nuevo.</p><button class="boton negro" id="m-cerrar">Cerrar</button>`; $("#m-cerrar").onclick = cerrarModal; return; }
    const actual = D.periodoCodigo || "";
    const elegido = terms.find((t) => t.term_desc === actual) ? actual : terms.map((t) => t.term_desc).sort().pop();
    m.querySelector(".ad-modal-caja").innerHTML = `<h2>Actualizar desde Oferta de Cursos</h2>
      <p class="sub">Trae de ofertadecursos.uniandes.edu.co los cursos EDUC (y los CBU que ya tiene el sitio): secciones, horarios, profesores, créditos, modalidad y prerrequisitos. Conserva fotos, descripciones, obligatoria/electiva y orden. Antes de aplicar verás un resumen.</p>
      <label class="ad-campo"><span>Periodo</span><select class="campo" id="m-term">${terms.map((t) => `<option value="${esc(t.term_desc)}"${t.term_desc === elegido ? " selected" : ""}>${esc(etiquetaPeriodo(t.term_desc))} · ${esc(tituloPropio(t.term_name))}</option>`).join("")}</select></label>
      <div class="ad-modal-botones"><button class="boton" id="m-cerrar">Cancelar</button><button class="boton negro" id="m-consultar">Consultar</button></div>`;
    $("#m-cerrar").onclick = cerrarModal;
    $("#m-consultar").onclick = async () => {
      const term = $("#m-term").value;
      const caja = m.querySelector(".ad-modal-caja");
      caja.innerHTML = `<h2>Consultando ${esc(etiquetaPeriodo(term))}…</h2><p class="sub" id="m-prog">Descargando la oferta…</p>`;
      try {
        const extra = [...new Set(D.cursos.map((c) => (c.codigo || "").split("-")[0]).filter((p) => p && p !== "EDUC"))];
        const registros = await consultarOferta(term, extra);
        if (!registros.length) throw new Error("Oferta de Cursos no devolvió cursos para ese periodo");
        const grupos = agrupar(registros, new Set(D.cursos.map((c) => c.codigo).filter(Boolean)));
        const nombres = {};   // código → nombre: primero lo que dice Banner este periodo, luego los títulos (curados) del sitio
        registros.forEach((x) => { nombres[x.class + "-" + x.course] = x.title.trim(); });
        D.cursos.forEach((c) => { if (c.codigo && c.titulo) nombres[c.codigo] = c.titulo; });
        const prereqs = await prerrequisitos(grupos, (i, n) => { const p = $("#m-prog"); if (p) p.textContent = `Leyendo prerrequisitos: ${i} de ${n} cursos…`; }, nombres);
        const { d, r } = planificar(D, grupos, prereqs, term);
        caja.innerHTML = `<h2>Resumen de cambios</h2>
          <p class="sub">Periodo del sitio: <b>${esc(r.periodoAntes || "(sin definir)")}</b> → <b>${esc(r.periodo)}</b>. Nada se publica hasta que presiones «Publicar».</p>
          ${listaHtml("cursos actualizados", r.actualizados, "Ninguno cambió.")}
          ${listaHtml("cursos nuevos (visibles, sin foto ni descripción todavía)", r.nuevos, "No hay cursos nuevos.")}
          ${listaHtml("cursos que se ocultan (no están en este periodo)", r.ocultados, "Ninguno se oculta.")}
          ${r.mostrados.length ? listaHtml("cursos ocultos que vuelven a mostrarse (están en este periodo)", r.mostrados, "") : ""}
          ${listaHtml("profesores nuevos (sin foto ni biografía)", r.profesNuevos, "No hay profesores nuevos.")}
          <div class="ad-modal-botones"><button class="boton" id="m-cerrar">Cancelar</button><button class="boton negro" id="m-aplicar">Aplicar cambios</button></div>`;
        $("#m-cerrar").onclick = cerrarModal;
        $("#m-aplicar").onclick = () => {
          D = d;
          sel = { cursos: cursosPorCodigo().find((c) => !c.oculto)?.id || D.cursos[0]?.id, profes: D.profesores[0]?.id };
          cerrarModal(); pintarPeriodo(); cambio(); pintarForms();
          aviso(`Listo: ${r.actualizados.length} actualizados, ${r.nuevos.length} nuevos, ${r.ocultados.length} ocultos. Revisa y presiona «Publicar».`);
        };
      } catch (e) {
        caja.innerHTML = `<h2>No se pudo actualizar</h2><p class="sub">${esc(e.message)}.</p><button class="boton negro" id="m-cerrar">Cerrar</button>`;
        $("#m-cerrar").onclick = cerrarModal;
      }
    };
  }

  function pintarPeriodo() { $("#periodo").value = D.periodo || ""; }

  /* ---------- Conexión con GitHub ---------- */
  function ghInicial() {
    let g = { owner: "", repo: "", branch: "main", folder: "", token: "" };
    const m = /^([a-z0-9-]+)\.github\.io$/i.exec(location.hostname);
    if (m) {
      g.owner = m[1];
      const partes = location.pathname.split("/").filter(Boolean);
      if (partes.length && /(\.html?|^admin|^index)$/.test(partes[partes.length - 1])) partes.pop();
      g.repo = partes.shift() || `${m[1]}.github.io`;
      g.folder = partes.join("/");
    }
    try { Object.assign(g, JSON.parse(LS?.getItem("oferta_gh") || "{}")); } catch (e) {}
    return g;
  }
  const gh = ghInicial();
  const ghListo = () => gh.owner && gh.repo && gh.token;
  const recordar = () => !!LS?.getItem("oferta_gh_recordar");
  function guardarGh() { if (recordar()) LS.setItem("oferta_gh", JSON.stringify(gh)); }

  function pintarGitHub() {
    const f = $("#form-github");
    f.innerHTML = `<h2>Conexión con GitHub</h2>
      <p class="sub">El sitio vive en GitHub Pages. Para publicar desde este editor necesitas un token personal (se hace una sola vez):</p>
      <ol>
        <li>Entra a GitHub ▸ <b>Settings</b> ▸ <b>Developer settings</b> ▸ <b>Personal access tokens</b> ▸ <b>Fine-grained tokens</b> ▸ <b>Generate new token</b>.</li>
        <li>En <b>Repository access</b> elige <b>Only select repositories</b> y marca el repositorio del sitio.</li>
        <li>En <b>Permissions ▸ Contents</b> elige <b>Read and write</b>. Crea el token y pégalo abajo.</li>
      </ol>
      <p><a href="tutorial-token.html" target="_blank" rel="noopener"><b>Ver el tutorial paso a paso, con imágenes ↗</b></a></p>`;
    const g = document.createElement("div");
    g.className = "ad-rejilla";
    [["owner", "Usuario u organización"], ["repo", "Repositorio"], ["branch", "Rama"], ["folder", "Carpeta dentro del repositorio (vacío = raíz)"]].forEach(([k, t]) => {
      g.appendChild(campo(t, texto(gh[k], (v) => { gh[k] = v.trim(); guardarGh(); modo(); }, { repintar: false })));
    });
    g.appendChild(campo("Token de GitHub", texto(gh.token, (v) => { gh.token = v.trim(); guardarGh(); modo(); }, { tipo: "password", placeholder: "github_pat_…", repintar: false }), null, true));
    f.appendChild(g);
    const r = document.createElement("label");
    r.className = "ad-check";
    r.innerHTML = `<input type="checkbox" ${recordar() ? "checked" : ""}> Recordar en este navegador (no lo actives en computadores compartidos)`;
    r.querySelector("input").addEventListener("change", (e) => {
      if (!LS) return;
      if (e.target.checked) { LS.setItem("oferta_gh_recordar", "1"); guardarGh(); }
      else { LS.removeItem("oferta_gh_recordar"); LS.removeItem("oferta_gh"); }
    });
    f.appendChild(r);
    const probar = boton("Probar conexión", async () => {
      try {
        const res = await ghFetch(rutaRepo("datos.js") + "?ref=" + encodeURIComponent(gh.branch || "main"));
        if (res.ok) aviso("Conexión correcta: el editor puede publicar en " + gh.owner + "/" + gh.repo + ".");
        else throw new Error(mensajeGh(res.status, "datos.js"));
      } catch (e) { aviso("No se pudo conectar: " + e.message, true); }
    });
    probar.style.marginTop = "18px";
    f.appendChild(probar);
  }

  function modo() {
    const m = ghListo() ? "github" : "descarga";
    $("#guardar").textContent = m === "github" ? "Publicar en el sitio" : "Descargar datos.js";
    $("#modo").textContent = m === "github"
      ? `Se publica en ${gh.owner}/${gh.repo}; el sitio se actualiza en 1–2 minutos.`
      : "Sin conexión con GitHub: se descargarán los archivos para subirlos a mano (o configura la pestaña Conexión con GitHub).";
  }

  function rutaRepo(ruta) {
    const pre = gh.folder ? gh.folder.replace(/^\/+|\/+$/g, "") + "/" : "";
    return (pre + ruta).split("/").map(encodeURIComponent).join("/");
  }
  function ghFetch(ruta, opc = {}) {
    opc.headers = Object.assign({ Authorization: "Bearer " + gh.token, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" }, opc.headers || {});
    opc.cache = "no-store";
    return fetch(`https://api.github.com/repos/${encodeURIComponent(gh.owner)}/${encodeURIComponent(gh.repo)}/contents/${ruta}`, opc);
  }
  function mensajeGh(status, archivo) {
    if (status === 401) return "el token no es válido o venció";
    if (status === 403) return "el token no tiene permiso de escritura en el repositorio";
    if (status === 404) return "no se encontró el repositorio, la rama o la carpeta (revisa la pestaña Conexión con GitHub)";
    if (status === 409 || status === 422) return `alguien cambió ${archivo} al mismo tiempo; recarga la página y vuelve a intentarlo`;
    return `GitHub respondió ${status} con ${archivo}`;
  }

  function b64texto(s) {
    const bytes = new TextEncoder().encode(s);
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }
  function archivos(d = D, texto = generar(d)) {
    const usadas = new Set([...d.cursos, ...d.profesores].map((x) => x.imagen));
    const lista = Object.entries(pendientes).filter(([r]) => usadas.has(r)).map(([ruta, v]) => ({ ruta, b64: v.b64 }));
    lista.push({ ruta: "datos.js", b64: b64texto(texto) });   // al final: las fotos ya existen cuando el sitio las pide
    return lista;
  }

  async function publicarGitHub(lista) {
    const rama = gh.branch || "main";
    for (const a of lista) {
      const ruta = rutaRepo(a.ruta);
      const leer = await ghFetch(ruta + "?ref=" + encodeURIComponent(rama));
      if (!leer.ok && (leer.status !== 404 || a.ruta === "datos.js")) throw new Error(mensajeGh(leer.status, a.ruta));
      const actual = leer.ok ? await leer.json() : null;
      const res = await ghFetch(ruta, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Actualiza ${a.ruta} desde el editor de la oferta de cursos`, content: a.b64, branch: rama, ...(actual?.sha ? { sha: actual.sha } : {}) })
      });
      if (!res.ok) throw new Error(mensajeGh(res.status, a.ruta));
    }
  }

  function descargar() {
    const bajar = (nombre, href) => { const a = document.createElement("a"); a.href = href; a.download = nombre; document.body.appendChild(a); a.click(); a.remove(); };
    const url = URL.createObjectURL(new Blob([generar(D)], { type: "text/javascript;charset=utf-8" }));
    bajar("datos.js", url);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    const fotos = archivos().filter((a) => a.ruta !== "datos.js");
    fotos.forEach((a, i) => setTimeout(() => bajar(a.ruta.split("/").pop(), pendientes[a.ruta].dataUrl), 300 * (i + 1)));
    return fotos;
  }

  /* Marca como publicado solo lo que se envió: si se editó durante la subida, sigue pendiente. */
  function trasGuardar(enviado, texto, lista) {
    base = texto;
    publicado = enviado;
    lista.forEach((a) => { delete pendientes[a.ruta]; });
    cambio(); pintarForms();
  }

  $("#guardar").addEventListener("click", async () => {
    const b = $("#guardar");
    if (!ghListo()) {
      const fotos = descargar();
      aviso("Descargado datos.js" + (fotos.length ? ` y ${fotos.length} foto(s); súbelas a la carpeta media` : "") + ". Reemplaza datos.js en el repositorio de GitHub; luego recarga este editor.");
      return;
    }
    b.disabled = true; b.textContent = "Publicando…";
    const enviado = clone(D), texto = generar(enviado), lista = archivos(enviado, texto);
    try {
      await publicarGitHub(lista);
      trasGuardar(enviado, texto, lista);
      aviso("Publicado ✓ El sitio mostrará los cambios en 1–2 minutos.");
    } catch (e) {
      aviso("No se pudo publicar: " + e.message, true);
      cambio();
    }
    modo();
  });

  $("#descartar").addEventListener("click", () => {
    if (!confirm("¿Descartar todos los cambios sin publicar?")) return;
    D = clone(publicado);
    pendientes = {};
    sel = { cursos: cursosPorCodigo()[0]?.id, profes: D.profesores[0]?.id };
    pintarPeriodo(); cambio(); pintarForms();
  });

  /* ---------- Aviso ---------- */
  let tAviso;
  function aviso(msg, error) {
    const t = $("#toast");
    t.textContent = msg; t.className = "ad-toast" + (error ? " error" : ""); t.hidden = false;
    clearTimeout(tAviso); tAviso = setTimeout(() => { t.hidden = true; }, 8000);
  }

  /* ---------- Pestañas y listas ---------- */
  document.querySelector(".ad-tabs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]");
    if (!b) return;
    document.querySelectorAll(".ad-tabs [data-tab]").forEach((x) => x.setAttribute("aria-selected", x === b));
    ["cursos", "profes", "github"].forEach((t) => { $("#tab-" + t).hidden = t !== b.dataset.tab; });
    if (b.dataset.tab === "cursos") pintarFormCurso();   // refresca la lista de profesores en las secciones
  });
  $("#lista-cursos").addEventListener("click", (e) => { const b = e.target.closest("[data-id]"); if (b) { sel.cursos = b.dataset.id; pintarFormCurso(); pintarListaCursos(); } });
  $("#lista-profes").addEventListener("click", (e) => { const b = e.target.closest("[data-id]"); if (b) { sel.profes = b.dataset.id; pintarFormProfe(); pintarListaProfes(); } });
  $("#filtro-cursos").addEventListener("input", pintarListaCursos);
  $("#filtro-profes").addEventListener("input", pintarListaProfes);
  $("#nuevo-curso").addEventListener("click", nuevoCurso);
  $("#sincronizar").addEventListener("click", sincronizar);
  $("#periodo").addEventListener("input", (e) => { D.periodo = e.target.value.trim(); cambio(false); });
  $("#nuevo-profe").addEventListener("click", nuevoProfe);
  window.addEventListener("beforeunload", (e) => { if (sucio()) { e.preventDefault(); e.returnValue = ""; } });

  pintarGitHub();
  pintarPeriodo();
  modo();
  cambio(); pintarForms();
})();
