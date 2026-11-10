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
  const DIAS = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
  const PROGRAMAS = [
    ["General", ["Todos los programas", "Todos los pregrados", "Todos los posgrados"]],
    ["Pregrado — Licenciaturas", ["Licenciatura en Artes", "Licenciatura en Biología", "Licenciatura en Educación Infantil", "Licenciatura en Español y Filología", "Licenciatura en Filosofía", "Licenciatura en Física", "Licenciatura en Historia", "Licenciatura en Matemáticas", "Licenciatura en Química", "Opción en Pedagogía"]],
    ["Especializaciones", ["Especialización en Innovación Curricular y Pedagógica", "Especialización en Liderazgo y Política Educativa"]],
    ["Maestrías", ["Maestría en Educación – Profundización (virtual)", "Maestría en Educación – Profundización (semipresencial)", "Maestría en Educación – Investigación (semipresencial)", "Maestría en Educación Matemática"]],
    ["Doctorado", ["Doctorado en Educación"]]
  ];
  const CAMPOS_CURSO = ["id", "oculto", "titulo", "titulo2", "categoria", "tipo", "track", "codigo", "creditos", "semanas", "modalidad", "imagen", "descripcion", "prerrequisitos", "correquisitos", "observaciones", "obligatoriaEn", "electivaEn", "secciones"];
  const CAMPOS_PROFE = ["id", "oculto", "nombre", "cargo", "imagen", "bio"];

  const LS = (() => { try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); return localStorage; } catch (e) { return null; } })();

  let publicado = clone(window.OFERTA);
  let D = clone(publicado);
  let base = generar(D);
  let pendientes = {};          // ruta → { b64, dataUrl } de fotos subidas sin publicar
  let sel = { cursos: D.cursos[0]?.id, profes: D.profesores[0]?.id };

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
  function pintarListaCursos() {
    const q = norm($("#filtro-cursos").value).trim();
    $("#lista-cursos").innerHTML = D.cursos.filter((c) => !q || norm(c.titulo).includes(q) || norm(c.codigo).includes(q)).map((c) => `
      <li class="${c.oculto ? "oculto" : ""}"><button data-id="${esc(c.id)}" aria-current="${c.id === sel.cursos}">
        ${c.imagen ? `<img class="mini" src="${esc(fotoUrl(c.imagen))}" alt="">` : `<span class="mini"></span>`}
        <span>${esc(c.titulo || "(sin título)")}
        <small>${c.oculto ? "OCULTO · " : ""}${esc(etiqueta(CATEGORIAS, c.categoria))} · ${esc(c.tipo)}${(c.secciones || []).length > 1 ? " · " + c.secciones.length + " secciones" : ""}</small></span>
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
    f.insertAdjacentHTML("beforeend", `<h2>${esc(c.titulo || "Nuevo curso")}</h2><p class="sub">${c.oculto ? "<b class=\"ad-oculto\">Oculto: no aparece en el sitio.</b> " : ""}El orden de la lista es el orden en que aparecen en el sitio. Los cambios se ven después de publicar.</p>`);
    f.appendChild(botonesItem(D.cursos, c, "cursos", (copia) => {
      copia.titulo = (copia.titulo || "") + " (copia)";
      copia.id = idNuevo("c", D.cursos); copia.imagen = "";
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
    g2.appendChild(campo("Prerrequisitos", texto(c.prerrequisitos, (v) => { c.prerrequisitos = v; }, { area: true, bajo: true, repintar: false }), "Déjalo vacío si no aplica.", true));
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
    sel = { cursos: D.cursos[0]?.id, profes: D.profesores[0]?.id };
    cambio(); pintarForms();
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
  $("#nuevo-profe").addEventListener("click", nuevoProfe);
  window.addEventListener("beforeunload", (e) => { if (sucio()) { e.preventDefault(); e.returnValue = ""; } });

  pintarGitHub();
  modo();
  cambio(); pintarForms();
})();
