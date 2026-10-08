/* ════════════════════════════════════════════════════════════════
   EL CIRCUITO DEL TIEMPO — con ramas en paralelo
   ─────────────────────────────────────────────────────────────────
   Como en un circuito eléctrico real, la trayectoria se divide en
   dos ramas paralelas que arrancan del mismo nodo (2013) y se
   reencuentran en "Hoy":
     · Rama superior  = experiencia PROFESIONAL
     · Rama inferior  = experiencia COMPLEMENTARIA
   Además, la rama complementaria tiene un SUB-PARALELO entre 2015 y
   2017: dos experiencias simultáneas (Burgos Acoge y la natación)
   se muestran apiladas a la misma altura temporal, como dos
   componentes en paralelo.
   Al pulsar un hito, la "corriente" ilumina TODAS las ramas hasta
   ese momento del tiempo: lo que ocurría a la vez, se enciende a la vez.

   CÓMO AÑADIR UN HITO NUEVO:
   1. Añade un objeto a DATA_HITOS (mejor en orden cronológico).
   2. "rail" puede ser: 'prof' (rama superior), 'comp' (rama inferior)
      o 'fin' (nodo final donde se unen las ramas).
   3. Si dos experiencias complementarias ocurren A LA VEZ, añade a
      cada una el campo paralelo: 'arriba' o 'abajo' y dales el mismo
      "anio": se colocarán apiladas dentro de la ventana del
      sub-paralelo (entre ANIO_PAR_INICIO y ANIO_PAR_FIN).
   4. "anio" es un número y coloca el hito en el tiempo: 2018 lo sitúa
      en 2018; 2018.5 a mediados de ese año. La posición horizontal
      se calcula sola. Si dos hitos de la misma rama quedan muy
      juntos, sepáralos con decimales (p. ej. 2019.6 y 2020.3).
   5. "tipo": condensador, resistencia, bobina, diodo, led, chip o nodo.
   6. Si el circuito se queda pequeño con los años, sube ANIO_MAX.
   La versión móvil se genera sola a partir de esta misma lista.
   ════════════════════════════════════════════════════════════════ */

const DATA_HITOS = [
  {
    rail: 'comp', anio: 2013.7, tipo: 'bobina', anioTexto: '2013', corto: 'Scouts',
    periodo: 'Sep 2013 – Sep 2021 · 8 años',
    titulo: 'Monitor de ocio y tiempo libre',
    entidad: 'Grupo Scout Antorcha',
    desc: 'Monitor de un grupo Scout: aventura, valores, voluntariado, respeto por la naturaleza y habilidades para la vida. Mi primera escuela como educador, en paralelo a toda la etapa universitaria. Una bobina de larga duración que continúa mi etapa de 10 años como scout.'
  },
  {
    rail: 'comp', paralelo: 'arriba', anio: 2015.9, tipo: 'condensador', anioTexto: '2015', corto: 'B. Acoge',
    periodo: 'Sep 2015 – Ago 2016 · 1 año',
    titulo: 'Profesor de apoyo escolar voluntario',
    entidad: 'Burgos Acoge',
    desc: 'Apoyo escolar a niños y niñas de familias migrantes para mejorar sus competencias y resultados en el aula. Las primeras clases de verdad.'
  },
  {
    rail: 'comp', paralelo: 'abajo', anio: 2015.91, tipo: 'diodo', anioTexto: '2015', corto: 'Natación',
    periodo: 'Oct 2015 – May 2018 · 2 años y 7 meses',
    titulo: 'Monitor de natación voluntario',
    entidad: 'Asociación Síndrome Down Burgos',
    desc: 'Actividades lúdicas en la piscina con niños y niñas de entre 5 y 10 años. Enseñar desde el corazón y la empatía.'
  },
  {
    rail: 'comp', anio: 2017.7, tipo: 'resistencia', anioTexto: '2017', corto: 'MotoStudent',
    periodo: 'Sep 2017 – Sep 2018 · 1 año',
    titulo: 'Ingeniero de diseño · MotoStudent V edición',
    entidad: 'Universidad de Burgos',
    desc: 'Diseño y estandarización de una moto de competición de 250 cc con el equipo de la UBU, con prueba final en Motorland Aragón. Ingeniería en equipo y contra el crono.'
  },
  {
    rail: 'prof', anio: 2018.1, tipo: 'resistencia', anioTexto: '2018', corto: 'Antolin',
    periodo: 'Feb 2018 – Nov 2019 · 1 año y 9 meses',
    titulo: 'Ingeniero de diseño de producto',
    entidad: 'Grupo Antolin · departamento de I+D',
    desc: 'Diseño 3D de producto e ingeniería inversa: mecanismos, diseño para impresión 3D y análisis de mercado y de tecnologías. La etapa que me dio rigor técnico, dominio del CAD profesional y me ayudó a entender la importancia del equipo humano detrás del trabajo.'
  },
  {
    rail: 'comp', anio: 2020.05, tipo: 'led', anioTexto: '2020', corto: 'Tanzania',
    periodo: 'Ene 2020 – Mar 2020 · 2 meses',
    titulo: 'Profesor de apoyo voluntario',
    entidad: 'Kutembea Na Tanzania',
    desc: 'Desarrollo e implementación de un proyecto deportivo en un centro de día en Arusha (Tanzania) como profesor de educación física, con apoyo en matemáticas, lectura y ciencias. El viaje que confirmó el cambio de rumbo: de diseñar piezas a diseñar experiencias de aprendizaje.'
  },
  {
    rail: 'prof', anio: 2021.1, tipo: 'chip', anioTexto: '2021', corto: 'La Estación',
    periodo: 'Feb 2021 – Actualidad · 5 años',
    titulo: 'Docente en La Estación de la Ciencia y la Tecnología',
    entidad: 'Universidad de Burgos',
    desc: 'El componente central: diseño y facilitación de programas STEAM para todos los públicos (robótica, maker, ciencia, videojuegos, IA, etc.), formación de docentes y apoyo desde el área tecnológica.'
  },
  {
    rail: 'fin', anio: 2026, tipo: 'nodo', anioTexto: 'Hoy',
    periodo: '2026',
    titulo: 'Las dos ramas se encuentran',
    entidad: 'Ingeniero + educador',
    desc: 'Docente enfocado en Tecnología Educativa, formador de docentes y doctorando en Didácticas Específicas. El circuito sigue creciendo.'
  }
];

/* Hito seleccionado al cargar la página (6 = La Estación, el chip) */
const HITO_INICIAL = 6;

/* ── Geometría del circuito (coordenadas del viewBox 1000×260) ── */
const X_NODO_INICIO = 20,  X_SPLIT = 60, X_UNION = 940, X_NODO_FIN = 980;
const Y_CENTRO = 130, Y_PROF = 70, Y_COMP = 190;
const Y_SUB_ARRIBA = 170, Y_SUB_ABAJO = 210;   /* sub-paralelo de la rama comp */
const ANIO_MIN = 2013, ANIO_MAX = 2026;
const X_MIN = 115, X_MAX = 895;

/* Ventana temporal del sub-paralelo (experiencias simultáneas 2015-2017) */
const ANIO_PAR_INICIO = 2015.1, ANIO_PAR_FIN = 2017.0;

function xDeAnio(anio) {
  return X_MIN + (anio - ANIO_MIN) / (ANIO_MAX - ANIO_MIN) * (X_MAX - X_MIN);
}
const X_PAR_INI = Math.round(xDeAnio(ANIO_PAR_INICIO));
const X_PAR_FIN = Math.round(xDeAnio(ANIO_PAR_FIN));

const SVG_NS = 'http://www.w3.org/2000/svg';
const capaHitos = document.getElementById('capa-hitos');
const capaVias  = document.getElementById('capa-vias');
const tramoFinal = document.getElementById('tramo-final');

/* ── Trazado de las pistas ──────────────────────────────────────
   La rama complementaria se construye aquí (y no en el HTML) porque
   su forma depende de la ventana del sub-paralelo. Consta de:
   tramo 1 → sub-rama arriba + sub-rama abajo (en paralelo) → tramo 2 */
const D_COMP_1    = `M 60 130 V 190 H ${X_PAR_INI}`;
const D_PAR_UP    = `M ${X_PAR_INI} 190 V ${Y_SUB_ARRIBA} H ${X_PAR_FIN} V 190`;
const D_PAR_DOWN  = `M ${X_PAR_INI} 190 V ${Y_SUB_ABAJO} H ${X_PAR_FIN} V 190`;
const D_COMP_2    = `M ${X_PAR_FIN} 190 H 940 V 130`;

const tramos = [
  { base: 'base-comp-1',   luz: 'luz-comp-1',   d: D_COMP_1 },
  { base: 'base-par-up',   luz: 'luz-par-up',   d: D_PAR_UP },
  { base: 'base-par-down', luz: 'luz-par-down', d: D_PAR_DOWN },
  { base: 'base-comp-2',   luz: 'luz-comp-2',   d: D_COMP_2 }
];
const luces = {};
tramos.forEach(t => {
  document.getElementById(t.base).setAttribute('d', t.d);
  const luz = document.getElementById(t.luz);
  luz.setAttribute('d', t.d);
  luz._len = luz.getTotalLength();
  luz.style.strokeDasharray = luz._len;
  luz.style.strokeDashoffset = luz._len;
  luces[t.luz] = luz;
});

const luzProf = document.getElementById('luz-prof');
luzProf._len = luzProf.getTotalLength();
luzProf.style.strokeDasharray = luzProf._len;
luzProf.style.strokeDashoffset = luzProf._len;

/* Vías en las bifurcaciones del sub-paralelo, como en una placa PCB */
[[X_PAR_INI, Y_COMP], [X_PAR_FIN, Y_COMP]].forEach(([cx, cy]) => {
  const via = document.createElementNS(SVG_NS, 'circle');
  via.setAttribute('cx', cx); via.setAttribute('cy', cy); via.setAttribute('r', 3);
  capaVias.appendChild(via);
});

/* Dibuja el símbolo de cada tipo de componente, centrado en (0,0) */
function crearSimbolo(tipo) {
  const g = document.createElementNS(SVG_NS, 'g');
  const el = (nombre, attrs) => {
    const e = document.createElementNS(SVG_NS, nombre);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    g.appendChild(e);
    return e;
  };
  if (tipo === 'chip') {
    el('rect', { class: 'pad', x: -22, y: -16, width: 44, height: 32, rx: 4 });
    [-13, -4, 5, 14].forEach(x => {
      el('line', { class: 'simbolo', x1: x, y1: -16, x2: x, y2: -22 });
      el('line', { class: 'simbolo', x1: x, y1: 16,  x2: x, y2: 22 });
    });
    const t = el('text', { x: 0, y: 4, 'text-anchor': 'middle' });
    t.textContent = 'UBU';
    t.style.fontSize = '11px';
  } else {
    el('circle', { class: 'pad', r: 13 });
    if (tipo === 'condensador') {
      el('line', { class: 'simbolo', x1: -3, y1: -6, x2: -3, y2: 6 });
      el('line', { class: 'simbolo', x1: 3,  y1: -6, x2: 3,  y2: 6 });
    } else if (tipo === 'resistencia') {
      el('path', { class: 'simbolo', d: 'M -8 0 l 2 -5 l 3 10 l 3 -10 l 3 10 l 2 -5' });
    } else if (tipo === 'bobina') {
      el('path', { class: 'simbolo', d: 'M -8 2 a 2.7 2.7 0 0 1 5.4 0 a 2.7 2.7 0 0 1 5.4 0 a 2.7 2.7 0 0 1 5.4 0' });
    } else if (tipo === 'diodo') {
      el('path', { class: 'relleno', d: 'M -5 -5 L -5 5 L 4 0 Z' });
      el('line', { class: 'simbolo', x1: 5, y1: -5, x2: 5, y2: 5 });
    } else if (tipo === 'led') {
      el('path', { class: 'relleno led-parpadeo', d: 'M -5 -5 L -5 5 L 4 0 Z' });
      el('line', { class: 'simbolo', x1: 5, y1: -5, x2: 5, y2: 5 });
    } else { /* nodo */
      el('circle', { class: 'relleno', r: 5 });
    }
  }
  return g;
}

/* Coloca cada hito en su rama (o sub-rama) y prepara su interacción */
const gruposHitos = DATA_HITOS.map((hito, i) => {
  const esFin = hito.rail === 'fin';
  const x = esFin ? X_NODO_FIN : xDeAnio(hito.anio);
  const y = esFin ? Y_CENTRO
          : hito.rail === 'prof' ? Y_PROF
          : hito.paralelo === 'arriba' ? Y_SUB_ARRIBA
          : hito.paralelo === 'abajo'  ? Y_SUB_ABAJO
          : Y_COMP;
  hito._x = x; /* se guarda para calcular la iluminación */

  const g = crearSimbolo(hito.tipo);
  g.setAttribute('class', 'hito');
  g.setAttribute('transform', `translate(${x}, ${y})`);
  g.setAttribute('role', 'button');
  g.setAttribute('tabindex', '0');
  g.setAttribute('aria-label', `${hito.anioTexto}: ${hito.titulo}, ${hito.entidad}`);

  /* Etiquetas visibles: nombre corto + año, para que los hitos se
     entiendan de un vistazo sin interactuar. Van encima en la rama
     profesional y en la sub-rama superior; debajo en el resto */
  const esChip = hito.tipo === 'chip';
  const arriba = hito.rail === 'prof' || hito.paralelo === 'arriba';
  const anadirTexto = (contenido, clase, y) => {
    const t = document.createElementNS(SVG_NS, 'text');
    t.textContent = contenido;
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('class', clase);
    t.setAttribute('y', y);
    g.appendChild(t);
  };
  if (esFin) {
    anadirTexto(hito.anioTexto, 'anio-etq', -22);
  } else if (arriba) {
    anadirTexto(hito.corto, 'corto', esChip ? -46 : -38);
    anadirTexto(hito.anioTexto, 'anio-etq', esChip ? -30 : -22);
  } else {
    anadirTexto(hito.anioTexto, 'anio-etq', 32);
    anadirTexto(hito.corto, 'corto', 48);
  }

  g.addEventListener('click', () => activarHito(i));
  g.addEventListener('keydown', ev => {
    if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); activarHito(i); }
  });
  capaHitos.appendChild(g);
  return g;
});

/* ── Iluminación ────────────────────────────────────────────────
   Ilumina TODAS las ramas hasta el instante del hito elegido. En
   los tramos horizontales, la longitud recorrida hasta la
   coordenada x coincide con x (bajada inicial de 60 + tramo x-60),
   lo que simplifica los cálculos de cada tramo. */
function encenderHasta(path, recorrido) {
  path.style.strokeDashoffset = path._len - Math.max(0, Math.min(recorrido, path._len));
}

function activarHito(i) {
  const hito = DATA_HITOS[i];
  const esFin = hito.rail === 'fin';
  const xLimite = esFin ? X_UNION : hito._x;

  /* Rama profesional (un solo tramo) */
  encenderHasta(luzProf, esFin ? luzProf._len : xLimite);

  /* Rama complementaria (tramo 1 → sub-paralelo → tramo 2) */
  encenderHasta(luces['luz-comp-1'], esFin ? Infinity : xLimite);
  const recorridoSub = esFin ? Infinity
    : xLimite <= X_PAR_INI ? 0
    : 20 + (Math.min(xLimite, X_PAR_FIN) - X_PAR_INI) + (xLimite >= X_PAR_FIN ? 20 : 0);
  encenderHasta(luces['luz-par-up'], recorridoSub);
  encenderHasta(luces['luz-par-down'], recorridoSub);
  encenderHasta(luces['luz-comp-2'], esFin ? Infinity : xLimite - X_PAR_FIN);

  tramoFinal.classList.toggle('encendido', esFin);

  gruposHitos.forEach((g, j) => {
    g.classList.toggle('encendido', DATA_HITOS[j]._x <= xLimite || esFin);
    g.classList.toggle('activo', j === i);
  });

  document.getElementById('hito-periodo').textContent = hito.periodo;
  document.getElementById('hito-titulo').textContent  = hito.titulo;
  document.getElementById('hito-entidad').textContent = hito.entidad;
  document.getElementById('hito-desc').textContent    = hito.desc;
  const insignia = document.getElementById('hito-rail');
  if (hito.rail === 'prof') {
    insignia.textContent = 'experiencia profesional';
    insignia.className = 'insignia-rail prof';
  } else if (hito.rail === 'comp') {
    insignia.textContent = hito.paralelo ? 'experiencia complementaria · en paralelo' : 'experiencia complementaria';
    insignia.className = 'insignia-rail';
  } else {
    insignia.textContent = 'punto de unión';
    insignia.className = 'insignia-rail prof';
  }
}

activarHito(HITO_INICIAL);


/* ── Dinamismo: electrones y latido del nodo final ──────────────
   Puntos de luz ámbar que recorren las pistas en bucle, como la
   corriente del circuito. Se omiten por completo si el visitante
   tiene activado "reducir movimiento" en su sistema. */
const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefiereQuieto) {
  const svgCircuito = document.querySelector('.circuito-escritorio');

  /* Rutas completas (invisibles) que siguen los electrones */
  const rutas = [
    { id: 'ruta-prof',   d: `M 20 130 H 60 V 70 H 940 V 130 H 980`, dur: '11s', begin: '0s' },
    { id: 'ruta-comp-a', d: `M 20 130 H 60 V 190 H ${X_PAR_INI} V ${Y_SUB_ARRIBA} H ${X_PAR_FIN} V 190 H 940 V 130 H 980`, dur: '13s', begin: '-5s' },
    { id: 'ruta-comp-b', d: `M 20 130 H 60 V 190 H ${X_PAR_INI} V ${Y_SUB_ABAJO} H ${X_PAR_FIN} V 190 H 940 V 130 H 980`, dur: '13s', begin: '-10s' }
  ];
  rutas.forEach(ruta => {
    const camino = document.createElementNS(SVG_NS, 'path');
    camino.setAttribute('id', ruta.id);
    camino.setAttribute('d', ruta.d);
    camino.setAttribute('fill', 'none');
    svgCircuito.insertBefore(camino, capaHitos);
  });
  /* Electrones con aleatoriedad (Comeau): duración base ±25 % y
     arranque en un punto distinto de la ruta. Se regeneran al usar
     el interruptor de movimiento. */
  const electronesCreados = [];
  function crearElectrones() {
    electronesCreados.splice(0).forEach(e => e.remove());
    if (document.body.classList.contains('sin-movimiento')) return;
    rutas.forEach(ruta => {
      for (let n = 0; n < 2; n++) {
        /* Electrón e⁻: círculo con la letra e y su carga negativa */
        const electron = document.createElementNS(SVG_NS, 'g');
        electron.setAttribute('class', 'electron');
        const cuerpo = document.createElementNS(SVG_NS, 'circle');
        cuerpo.setAttribute('r', 6);
        cuerpo.setAttribute('class', 'e-cuerpo');
        const letra = document.createElementNS(SVG_NS, 'text');
        letra.textContent = 'e';
        letra.setAttribute('class', 'e-letra');
        letra.setAttribute('text-anchor', 'middle');
        letra.setAttribute('y', 3);
        const carga = document.createElementNS(SVG_NS, 'text');
        carga.textContent = '−';
        carga.setAttribute('class', 'e-carga');
        carga.setAttribute('x', 7);
        carga.setAttribute('y', -5);
        electron.appendChild(cuerpo);
        electron.appendChild(letra);
        electron.appendChild(carga);
        const mov = document.createElementNS(SVG_NS, 'animateMotion');
        /* Velocidad uniforme: la aleatoriedad queda solo en el punto de arranque */
        const dur = parseFloat(ruta.dur);
        mov.setAttribute('dur', dur + 's');
        mov.setAttribute('begin', (-Math.random() * dur).toFixed(2) + 's');
        mov.setAttribute('repeatCount', 'indefinite');
        const mpath = document.createElementNS(SVG_NS, 'mpath');
        mpath.setAttribute('href', '#' + ruta.id);
        mov.appendChild(mpath);
        electron.appendChild(mov);
        svgCircuito.insertBefore(electron, capaHitos);
        electronesCreados.push(electron);
      }
    });
  }
  crearElectrones();
  document.addEventListener('cambio-movimiento', crearElectrones);

  /* Anillo que late alrededor del nodo "Hoy" */
  const indiceFin = DATA_HITOS.findIndex(h => h.rail === 'fin');
  if (indiceFin >= 0) {
    const anillo = document.createElementNS(SVG_NS, 'circle');
    anillo.setAttribute('r', 9);
    anillo.setAttribute('class', 'anillo-pulso');
    gruposHitos[indiceFin].insertBefore(anillo, gruposHitos[indiceFin].firstChild);
  }
}

/* ── Versión móvil: lista vertical desplegable, en orden cronológico ── */
const listaMovil = document.getElementById('circuito-movil');
[...DATA_HITOS]
  .map((hito, i) => ({ hito, i }))
  .sort((a, b) => a.hito.anio - b.hito.anio)
  .forEach(({ hito, i }) => {
    const li = document.createElement('li');
    const nombreRail = hito.rail === 'prof' ? 'profesional'
                     : hito.rail === 'comp' ? (hito.paralelo ? 'complementaria · en paralelo' : 'complementaria')
                     : 'unión';
    li.innerHTML = `
      <button aria-expanded="false">
        <span class="anio">${hito.anioTexto} · ${hito.periodo} · ${nombreRail}</span>
        ${hito.titulo}
      </button>
      <div class="detalle">
        <span class="entidad">${hito.entidad}</span>
        <p>${hito.desc}</p>
      </div>`;
    const boton = li.querySelector('button');
    boton.addEventListener('click', () => {
      const abierto = li.classList.toggle('abierto');
      boton.setAttribute('aria-expanded', abierto);
    });
    if (i === HITO_INICIAL) {
      li.classList.add('abierto');
      boton.setAttribute('aria-expanded', 'true');
    }
    listaMovil.appendChild(li);
  });
