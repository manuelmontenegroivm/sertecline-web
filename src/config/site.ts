export interface SiteConfig {
  name: string;
  description: string;
  /** Debe coincidir con `site` en astro.config.mjs */
  url: string;
  defaultLocale: string;
  locales: string[];
  themeColor: string;
  logo: {
    default: string;
    icon: string;
    og: string;
  };
}

// Sin `legalName` (EPIC 8 — Checkpoint 8.2). Declaraba 'Sertecline SpA', una
// razón social que el negocio nunca confirmó, con un TODO de meses y cero
// consumidores: ni el Footer, ni el JSON-LD, ni ninguna otra superficie lo leía
// —lib/seo/organization.ts documenta explícitamente que lo omite—. Un
// placeholder inventado esperando en la configuración solo puede terminar de
// una forma: publicado por quien lo encuentre y lo dé por confirmado. Cuando
// exista la razón social real, la agrega el checkpoint que la publique, junto
// con su consumidor.
export const siteConfig: SiteConfig = {
  name: 'Sertecline',
  // Descripción por defecto del sitio: la sirve BaseLayout como meta
  // description, og:description y twitter:description de cualquier página sin
  // descripción propia — hoy, la home. Solo afirma lo verificado; "según el
  // equipo" evita leer las tres acciones como universales (ver
  // src/data/services.ts, donde la regla del catálogo dice lo mismo).
  description:
    'Servicio técnico a domicilio en Santiago: reparación, mantención e instalación de línea blanca y calefones, según el equipo. Agendamos la visita técnica.',
  url: 'https://www.sertecline.cl',
  defaultLocale: 'es-CL',
  locales: ['es-CL'],
  themeColor: '#4C9E5D', // color.brand — ver src/config/design/tokens.json
  logo: {
    default: '/brand/logo/logo.svg',
    icon: '/brand/favicon/favicon.svg',
    og: '/brand/social/og-image.png',
  },
};
