/**
 * Isla del comparador antes/después (EPIC 3.6.1). Arrastre vía Pointer Events
 * unificados (mouse + touch + pen, mismo patrón que MobileMenu.astro) sobre un
 * useMotionValue: Framer Motion escribe clip-path/left directo al DOM sin
 * pasar por el ciclo de render de React en cada pointermove. Solo se
 * sincroniza a estado de React (throttled a 1x por frame) el valor entero
 * necesario para aria-valuenow/aria-valuetext.
 * Patrón de accesibilidad: WAI-ARIA APG "Slider" (mismo estándar que ya
 * sigue MobileMenu.astro con el patrón "Disclosure").
 */
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { transitions } from '../../config/motion';

export interface ComparatorImage {
  src: string;
  width: number;
  height: number;
  /**
   * Candidatos de resolución y ancho de presentación (EPIC 8 — Checkpoint 8.3,
   * F-15). Los arma el wrapper con getImage() en build —ver
   * BeforeAfterComparator.astro— y aquí solo se imprimen: la isla sigue sin
   * saber nada del pipeline de imágenes, igual que no conoce `ImageMetadata`.
   * Opcionales: sin ellos el <img> queda con una sola densidad, que es el
   * comportamiento de todos los checkpoints anteriores.
   */
  srcSet?: string;
  sizes?: string;
}

// Unión cerrada (no CSS libre): única fuente del mapeo proporción → valor
// CSS, compartida por este Island y su wrapper BeforeAfterComparator.astro
// (que solo reexporta el tipo, sin duplicar el mapa).
export type AspectRatio = 'natural' | 'square' | 'fourThree';

const ASPECT_RATIO_CSS: Record<Exclude<AspectRatio, 'natural'>, string> = {
  square: '1/1',
  fourThree: '4/3',
};

interface Props {
  before: ComparatorImage;
  after: ComparatorImage;
  /** Base del texto alternativo cuando `beforeAlt`/`afterAlt` no se declaran. */
  alt: string;
  /**
   * Texto alternativo completo de cada imagen. Opcionales: sin ellos se
   * conserva el compuesto histórico "<alt> — <etiqueta en minúscula>". Existen
   * porque un caso puede declarar el suyo (`evidence.beforeAlt` /
   * `evidence.resultAlt`), y no se derivan de `beforeLabel`/`afterLabel`:
   * aquellas son las insignias visibles del comparador, no una descripción.
   */
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  /** Proporción del contenedor. @default 'natural' (proporción real de `after`) */
  aspectRatio?: AspectRatio;
}

const MIN = 0;
const MAX = 100;
const STEP = 5;

function clamp(value: number) {
  return Math.min(MAX, Math.max(MIN, value));
}

export default function BeforeAfterComparatorIsland({
  before,
  after,
  alt,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Antes',
  afterLabel = 'Después',
  caption,
  aspectRatio = 'natural',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const captionId = useId();

  const reduceMotion = useReducedMotion();

  const pct = useMotionValue(50);
  const [value, setValue] = useState(50);

  // Capa "before" recortada con clip-path (compositing en GPU, sin reflow)
  // en vez de animar `width`.
  const clipPath = useTransform(pct, (v) => `inset(0 ${100 - v}% 0 0)`);
  const dividerLeft = useTransform(pct, (v) => `${v}%`);

  useMotionValueEvent(pct, 'change', (latest) => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      setValue(Math.round(latest));
      rafRef.current = null;
    });
  });

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const setFromClientX = useCallback(
    (clientX: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0) return;
      pct.set(clamp(((clientX - rect.left) / rect.width) * 100));
    },
    [pct]
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
    handleRef.current?.focus({ preventScroll: true });
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    setFromClientX(event.clientX);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: ReactKeyboardEvent) => {
    const current = pct.get();
    let next: number;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = clamp(current - STEP);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        next = clamp(current + STEP);
        break;
      case 'Home':
        next = MIN;
        break;
      case 'End':
        next = MAX;
        break;
      default:
        return;
    }
    event.preventDefault();
    // El arrastre es 1:1 (sin easing). El paso por teclado sí anima para dar
    // feedback de "salto" — se omite con prefers-reduced-motion.
    if (reduceMotion) {
      pct.set(next);
    } else {
      animate(pct, next, transitions.fast);
    }
  };

  return (
    <figure className="flex flex-col gap-3">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // touch-pan-y y no touch-none: con `none` el navegador cede al componente
        // TODOS los gestos táctiles sobre la imagen, incluido el desplazamiento
        // vertical de la página. Con la fotografía en su proporción real (9:16,
        // ver FeaturedWork.astro) el comparador ocupa 637px de los 844 de un
        // teléfono —el 75% de la pantalla—, así que un usuario que arrastrara el
        // dedo hacia arriba sobre la foto no podía seguir bajando por la página:
        // solo quedaban scrollables los 16px de gutter a cada lado. `pan-y`
        // devuelve el desplazamiento vertical al navegador y conserva el
        // horizontal para el arrastre del divisor, que es el único eje que este
        // componente necesita. Cuando el navegador se queda el gesto emite
        // pointercancel, que onPointerCancel ya trata como fin de arrastre.
        className="border-hairline bg-paper-2 relative w-full touch-pan-y overflow-hidden rounded-2xl border select-none"
        style={{
          aspectRatio:
            aspectRatio === 'natural'
              ? `${after.width} / ${after.height}`
              : ASPECT_RATIO_CSS[aspectRatio],
        }}
      >
        <img
          src={after.src}
          srcSet={after.srcSet}
          sizes={after.sizes}
          width={after.width}
          height={after.height}
          alt={afterAlt ?? `${alt} — ${afterLabel.toLowerCase()}`}
          className="pointer-events-none absolute inset-0 size-full object-cover"
          loading="lazy"
          decoding="async"
          draggable={false}
        />

        <motion.div className="pointer-events-none absolute inset-0" style={{ clipPath }}>
          <img
            src={before.src}
            srcSet={before.srcSet}
            sizes={before.sizes}
            width={before.width}
            height={before.height}
            alt={beforeAlt ?? `${alt} — ${beforeLabel.toLowerCase()}`}
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </motion.div>

        <span className="bg-stage/70 text-ink-on-dark pointer-events-none absolute top-3 left-3 rounded-full px-3 py-1 text-xs leading-none font-medium backdrop-blur-sm">
          {beforeLabel}
        </span>
        <span className="bg-stage/70 text-ink-on-dark pointer-events-none absolute top-3 right-3 rounded-full px-3 py-1 text-xs leading-none font-medium backdrop-blur-sm">
          {afterLabel}
        </span>

        <motion.div
          ref={handleRef}
          role="slider"
          tabIndex={0}
          aria-orientation="horizontal"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={value}
          aria-valuetext={`${value}% — mostrando ${value < 50 ? beforeLabel : afterLabel}`}
          aria-label="Comparar antes y después"
          aria-describedby={caption ? captionId : undefined}
          onKeyDown={onKeyDown}
          className="absolute inset-y-0 flex w-10 -translate-x-1/2 cursor-ew-resize items-center justify-center"
          style={{ left: dividerLeft }}
        >
          <span
            aria-hidden="true"
            className="bg-paper absolute inset-y-0 left-1/2 w-[var(--border-emphasis)] -translate-x-1/2"
          />
          <span
            aria-hidden="true"
            className="border-hairline-strong bg-paper text-ink-2 relative flex size-9 items-center justify-center rounded-full border shadow-md"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[var(--icon-md)]"
            >
              <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
            </svg>
          </span>
        </motion.div>
      </div>

      {caption && (
        <figcaption id={captionId} className="text-ink-2 text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
