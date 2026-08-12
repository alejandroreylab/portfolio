/* ── Pantalla de carga: se oculta cuando todo está listo ── */
(function () {
  const pantalla = document.getElementById('pantalla-carga');
  if (!pantalla) return;
  const ocultar = () => {
    pantalla.classList.add('oculta');
    setTimeout(() => pantalla.remove(), 450);
  };
  if (document.readyState === 'complete') ocultar();
  else window.addEventListener('load', ocultar);
  setTimeout(ocultar, 3000); /* red de seguridad: nunca más de 3 s */
})();

/* ════════════════════════════════════════════════════════════════
   ANIMACIONES GLOBALES — aparición suave al hacer scroll
   Este archivo lo cargan todas las páginas. Añade la clase .revelar
   a tarjetas y bloques y los hace visibles cuando entran en
   pantalla. Si el visitante tiene activado "reducir movimiento" en
   su sistema, no se aplica ninguna animación.
   ════════════════════════════════════════════════════════════════ */
(function () {
  const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefiereQuieto || !('IntersectionObserver' in window)) return;

  const objetivos = document.querySelectorAll(
   '.tarjeta-proyecto, .grupo-competencia, .bloque-tema, .bloque-herramientas, .borne, .terminal'
  );
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  objetivos.forEach(el => {
    el.classList.add('revelar');
    const caja = el.getBoundingClientRect();
    if (caja.top < window.innerHeight && caja.bottom > 0) {
      /* ya está en pantalla al cargar: se enciende sin esperar */
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
    } else {
      observador.observe(el);
    }
  });
})();
/* ════════════ HALO DEL CURSOR + INTERRUPTOR DE MOVIMIENTO ════════════ */
(function () {
  const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sinMovimiento = () => prefiereQuieto || document.body.classList.contains('sin-movimiento');

  /* Halo: el centro del degradado sigue al puntero */
  const esTactil = window.matchMedia('(hover: none)').matches;
  if (!esTactil) document.addEventListener('pointermove', ev => {
    if (sinMovimiento()) return;
    document.body.style.setProperty('--mx', ev.clientX + 'px');
    document.body.style.setProperty('--my', ev.clientY + 'px');
  }, { passive: true });

  /* Interruptor manual (regla de Comeau: si algo se mueve, que se
     pueda apagar). Si el sistema ya pide quietud, no hace falta. */
  if (prefiereQuieto) return;
  const boton = document.createElement('button');
  boton.className = 'interruptor-movimiento mono';
  boton.setAttribute('aria-pressed', 'false');
  boton.innerHTML = '<span class="led-mov" aria-hidden="true"></span><span>movimiento: ON</span>';
  document.body.appendChild(boton);
  boton.addEventListener('click', () => {
    const apagado = document.body.classList.toggle('sin-movimiento');
    boton.setAttribute('aria-pressed', apagado);
    boton.lastElementChild.textContent = apagado ? 'movimiento: OFF' : 'movimiento: ON';
    document.dispatchEvent(new CustomEvent('cambio-movimiento', { detail: { apagado } }));
  });
})();

/* ════════════════════════════════════════════════════════════════
   TECLEADO DE LAS CABECERAS
   Escribe letra a letra la frase verde que va sobre cada <h1>: la
   del héroe (index) y la de las cabeceras del resto de páginas.
   La frase se lee del propio HTML, así que para cambiarla basta
   con editar el texto del <p> en su página. No hay que tocar esto.
   Si el visitante pide "reducir movimiento" o apaga el interruptor,
   la frase aparece entera y sin animación.
   ════════════════════════════════════════════════════════════════ */
(function () {
  const cabeceras = document.querySelectorAll('.heroe-eyebrow, .cabecera-pagina .eyebrow');
  if (!cabeceras.length) return;

  const RITMO  = 40;   /* milisegundos entre letra y letra */
  const ESPERA = 350;  /* pausa inicial, para que no pise a la pantalla de carga */

  const sinMovimiento = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.body.classList.contains('sin-movimiento');

  cabeceras.forEach(parrafo => {
    const frase = parrafo.textContent.trim();
    if (!frase) return;

    /* Se reserva la altura que ya ocupa el párrafo para que el resto
       de la página no dé un salto mientras se escribe la frase */
    parrafo.style.minHeight = parrafo.offsetHeight + 'px';

    /* Se vacía y se monta dentro: el texto que crece + el cursor */
    const texto  = document.createElement('span');
    const cursor = document.createElement('span');
    cursor.className = 'cursor-tecleo';
    cursor.setAttribute('aria-hidden', 'true');
    parrafo.textContent = '';
    parrafo.append(texto, cursor);

    if (sinMovimiento()) { texto.textContent = frase; return; }

    let i = 0;
    const teclear = () => {
      texto.textContent = frase.slice(0, ++i);
      if (i < frase.length && !sinMovimiento()) setTimeout(teclear, RITMO);
      else texto.textContent = frase; /* remate por si se apagó a media frase */
    };
    setTimeout(teclear, ESPERA);
  });
})();
