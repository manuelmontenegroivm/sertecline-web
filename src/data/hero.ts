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
export const heroContent: HeroContent = {
  badge: 'Servicio técnico especializado en línea blanca',
  title: 'Servicio técnico de línea blanca en Santiago',
  subtitle:
    'Diagnóstico, reparación y mantención realizados con precisión, repuestos adecuados y atención personalizada.',
  primaryCtaLabel: 'Solicitar diagnóstico',
  secondaryCtaLabel: 'Ver trabajos realizados',
};
