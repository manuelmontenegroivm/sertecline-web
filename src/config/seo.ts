import { siteConfig } from './site';

export interface SeoDefaults {
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  twitterHandle: string;
  locale: string;
  /** Tipo usado como base para el JSON-LD de la organización */
  organizationType: 'Organization' | 'LocalBusiness';
}

export const seoDefaults: SeoDefaults = {
  titleTemplate: '%s | Sertecline',
  // Se usa en crudo, sin pasar por `titleTemplate`: BaseLayout solo aplica la
  // plantilla cuando la página declara un `title` propio. Por eso el sufijo de
  // marca va escrito aquí, en el mismo orden que produce la plantilla para las
  // fichas de servicio ("… en Santiago | Sertecline").
  defaultTitle: 'Servicio técnico de línea blanca y calefones en Santiago | Sertecline',
  defaultDescription: siteConfig.description,
  defaultImage: siteConfig.logo.og,
  twitterHandle: '@TODO_usuario', // TODO: confirmar si aplica o eliminar
  locale: siteConfig.defaultLocale,
  organizationType: 'LocalBusiness', // TODO: confirmar según alcance geográfico real
};
