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

// TODO: confirmar razón social exacta y descripción final con el cliente
export const siteConfig: SiteConfig = {
  name: 'Sertecline',
  legalName: 'Sertecline SpA', // TODO: confirmar razón social real
  description: 'TODO: descripción corta de Sertecline (qué hace, para quién, diferenciador).',
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
