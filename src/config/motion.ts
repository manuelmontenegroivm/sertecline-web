import type { Transition } from 'framer-motion';
import { duration } from './design/tokens.json';

/** Runtime uses the same durations as the documented CSS tokens.
 * Comparator drag stays 1:1; its keyboard transition honors useReducedMotion.
 * No reveal, stagger or signature interaction is enabled here.
 */
const quietEase: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
export const transitions: Record<'fast' | 'base' | 'slow', Transition> = {
  fast: { duration: parseFloat(duration.fast) / 1000, ease: quietEase },
  base: { duration: parseFloat(duration.base) / 1000, ease: quietEase },
  slow: { duration: parseFloat(duration.slow) / 1000, ease: quietEase },
};
