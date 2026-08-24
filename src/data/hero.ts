export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}

// Los CTAs quedan sin destino funcional hasta que existan la épica de
// contacto y la épica de trabajos realizados — ver componentes/sections/Hero.astro
// (botones renderizados `disabled` mientras tanto).
//
// Posicionamiento (EPIC 4.1 — Checkpoint 4.1.7): el h1 nombra "línea blanca y
// calefones" en vez de solo "línea blanca". Los calefones son prioridad
// comercial y no pertenecen a esa categoría, así que el término se acompaña en
// vez de sustituirse: sigue siendo la denominación reconocible del rubro. El
// badge aporta el modelo de atención —a domicilio— en lugar de repetir el h1.
// El subtítulo declara que las acciones dependen del equipo: ninguna superficie
// pública debe sugerir que reparación, mantención e instalación aplican por
// igual a todo el catálogo (misma regla que src/data/services.ts).
export const heroContent: HeroContent = {
  badge: 'Servicio técnico a domicilio',
  title: 'Servicio técnico de línea blanca y calefones en Santiago',
  subtitle:
    'Reparación, mantención e instalación según el tipo de equipo. Coordinamos una visita técnica y revisamos tu equipo a domicilio.',
  primaryCtaLabel: 'Solicitar diagnóstico',
  secondaryCtaLabel: 'Ver trabajos realizados',
};
