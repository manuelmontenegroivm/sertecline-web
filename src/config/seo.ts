import { siteConfig } from './site';

export interface SeoDefaults {
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  locale: string;
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
  // Sin `twitterHandle` (EPIC 8 — Checkpoint 8.2). Valía '@TODO_usuario' y no
  // lo leía nadie: BaseLayout emite twitter:card, :title, :description e
  // :image, y ninguna de esas etiquetas lleva un handle —`twitter:site` y
  // `twitter:creator` no se emiten—. El negocio no tiene cuenta confirmada, así
  // que no había valor real que poner ni etiqueta que alimentar. Si algún día
  // existe la cuenta, se agrega el campo junto con la etiqueta que lo publica.
  locale: siteConfig.defaultLocale,
};
