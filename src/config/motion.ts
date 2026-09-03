import type { Transition } from 'framer-motion';

/**
 * Duraciones y curvas compartidas de las animaciones de cliente.
 *
 * TODO: ajustar valores finales una vez definida la identidad de movimiento de
 * la marca.
 *
 * Único preset del módulo desde EPIC 8 — Checkpoint 8.2. Convivía con tres
 * `Variants` —`fadeUp`, `fadeIn` y `staggerContainer`— que ningún componente
 * importó nunca: eran un vocabulario de movimiento escrito por adelantado, sin
 * superficie asignada ni responsabilidad documentada, y con dos consecuencias
 * concretas. Fijaban decisiones de animación (24px de desplazamiento, 120ms de
 * escalonado) que la identidad de movimiento de la marca todavía no tomó, y
 * ofrecían a quien llegara un preset con apariencia de acuerdo vigente. La
 * única island animada del sitio —BeforeAfterComparatorIsland— usa
 * `transitions.fast` y no usaba ninguno de ellos.
 */
export const transitions: Record<'fast' | 'base' | 'slow', Transition> = {
  fast: { duration: 0.2, ease: 'easeOut' },
  base: { duration: 0.4, ease: 'easeOut' },
  slow: { duration: 0.7, ease: 'easeOut' },
};
