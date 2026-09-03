/**
 * Semántica de "página actual" de la navegación principal (EPIC 8 —
 * Checkpoint 8.2).
 *
 * Extraída sin cambios de comportamiento desde NavLink.astro, donde vivía
 * mientras la navegación desktop era la única que la comunicaba. MobileMenu
 * representa exactamente los mismos destinos y no lo hacía: quien navegaba con
 * lector de pantalla en móvil no recibía ninguna señal de en qué página estaba,
 * y quien lo hacía en desktop sí. Duplicar la regla en el island habría dejado
 * dos definiciones de "estoy aquí" capaces de divergir en el próximo destino
 * que se agregue al menú; con una sola función, las dos navegaciones no pueden
 * responder distinto.
 *
 * La comparación ignora la barra final porque el build emite `/trabajos/` y el
 * ítem del menú declara `/trabajos`: sin normalizar, el único destino de
 * navegación que hoy es una página propia nunca obtendría su `aria-current`.
 *
 * Es coincidencia EXACTA y no un prefijo: `/trabajos/limpieza-profunda-lavadora`
 * es una página distinta —la ficha de un trabajo, no el índice— y marcarla como
 * "página actual" del ítem "Trabajos" le mentiría a quien navega con lector de
 * pantalla. El rastro de navegación de esa ficha es el que dice dónde está.
 *
 * Los demás ítems son anclas a secciones de home (`/#servicios`), que nunca
 * coinciden con un pathname y por lo tanto nunca se marcan: correcto, porque
 * una sección no es una página. Sin JavaScript: esto se resuelve en build, en
 * las dos navegaciones (ver Navbar.astro).
 */
const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';

export function isCurrentNavItem(pathname: string, href: string): boolean {
  return normalizePath(pathname) === normalizePath(href);
}
