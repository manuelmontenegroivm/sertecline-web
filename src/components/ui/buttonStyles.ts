// Contrato visual compartido entre Button.astro (<button>) y ButtonLink.astro
// (<a>) — única fuente de verdad de variantes/tamaños para ambas primitivas.
// No incluye estados exclusivos de <button> (disabled) ni el mapa de tamaño
// de ícono (--btn-icon-size): esos siguen siendo responsabilidad local de
// Button.astro, que es el único de los dos que los necesita.

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const BUTTON_BASE_CLASSES =
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors [transition-duration:var(--duration-base)] [transition-timing-function:var(--ease-out)]';

// Contraste verificado en tokens.json: brand-ink whiteOn 6.36:1 AA (fondo sólido);
// ghost/outline usan brand-ink como texto sobre papel, 5.64:1 AA.
export const BUTTON_VARIANT_CLASSES = {
  primary: 'bg-brand-ink text-paper hover:opacity-90 active:opacity-80',
  secondary:
    'border border-hairline bg-paper-2 text-ink hover:border-hairline-strong hover:bg-paper active:bg-paper-2',
  ghost: 'bg-transparent text-brand-ink hover:bg-paper-2 active:bg-paper',
  outline: 'border border-brand-ink bg-transparent text-brand-ink hover:bg-paper-2 active:bg-paper',
} satisfies Record<ButtonVariant, string>;

// Padding/tamaños de texto tomados directamente de la escala de espaciado y
// tipografía de tokens.css (4·8·12·16·20·24 / text-sm·base·lg) — nada arbitrario.
export const BUTTON_SIZE_CLASSES = {
  sm: 'gap-1.5 rounded-sm px-4 py-2 text-sm',
  md: 'gap-2 rounded-md px-5 py-3 text-base',
  lg: 'gap-2.5 rounded-lg px-6 py-4 text-lg',
} satisfies Record<ButtonSize, string>;
