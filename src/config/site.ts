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
  themeColor: '#000000', // TODO: reemplazar con el color de marca real
  logo: {
    default: '/src/assets/images/brand/logo.svg', // TODO: agregar archivo real
    icon: '/src/assets/images/brand/icon.svg', // TODO: agregar archivo real
    og: '/src/assets/images/og/default-og.jpg', // TODO: agregar archivo real
  },
};
