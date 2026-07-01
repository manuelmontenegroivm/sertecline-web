import type { Transition, Variants } from 'framer-motion';

// TODO: ajustar valores finales una vez definida la identidad de movimiento de la marca
export const transitions: Record<'fast' | 'base' | 'slow', Transition> = {
  fast: { duration: 0.2, ease: 'easeOut' },
  base: { duration: 0.4, ease: 'easeOut' },
  slow: { duration: 0.7, ease: 'easeOut' },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};
