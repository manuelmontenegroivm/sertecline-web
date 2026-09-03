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
 * La comparación ignora la barra final. Desde EPIC 8 — CP 8.5.1 el ítem del
 * menú declara la forma canónica de la ruta (`/trabajos/`), la misma que emite
 * el build, así que hoy ambos lados ya coinciden; normalizar queda como
 * garantía de que un destino escrito sin la barra —o un pathname servido con
 * ella— no pierda su `aria-current` en silencio.
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
