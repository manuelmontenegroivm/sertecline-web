export interface SiteConfig {
  name: string;
  legalName: string;
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

// TODO: confirmar razón social exacta con el cliente
export const siteConfig: SiteConfig = {
  name: 'Sertecline',
  legalName: 'Sertecline SpA', // TODO: confirmar razón social real
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
