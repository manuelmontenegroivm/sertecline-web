/**
 * Trigger + panel de navegación móvil. Patrón "disclosure" no modal
 * (WAI-ARIA APG): no usa role="dialog", focus trap ni scrim — el resto de
 * la página permanece interactivo. Cierra con Escape, clic exterior o al
 * seleccionar un link, y devuelve el foco al trigger al cerrar con Escape.
 * Hidratación client:load: es navegación primaria above-the-fold (ver
 * CLAUDE.md, regla de hidratación — excepción explícita para lo crítico).
 */
import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { NavItem } from '../../data/navigation';

interface Props {
  items: NavItem[];
}

export default function MobileMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div className="relative md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setOpen((value) => !value)}
        className="text-ink hover:bg-paper-2 inline-flex size-10 items-center justify-center rounded-md transition-colors [transition-duration:var(--duration-fast)]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-[var(--icon-lg)]"
          aria-hidden="true"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            ref={panelRef}
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            className="border-hairline bg-paper absolute inset-x-0 top-full overflow-hidden border-b shadow-md"
          >
            <nav aria-label="Principal (móvil)" className="flex flex-col gap-1 px-4 py-4">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-ink-2 hover:bg-paper-2 hover:text-ink rounded-md px-3 py-2 text-base font-medium transition-colors [transition-duration:var(--duration-fast)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
