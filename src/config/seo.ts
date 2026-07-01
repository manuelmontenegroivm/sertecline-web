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

// TODO: ajustar título/descripción por defecto cuando se defina el copy final
export const seoDefaults: SeoDefaults = {
  titleTemplate: '%s | Sertecline',
  defaultTitle: 'Sertecline', // TODO
  defaultDescription: siteConfig.description,
  defaultImage: siteConfig.logo.og,
  twitterHandle: '@TODO_usuario', // TODO: confirmar si aplica o eliminar
  locale: siteConfig.defaultLocale,
  organizationType: 'LocalBusiness', // TODO: confirmar según alcance geográfico real
};
