import { siteConfig } from '../../config/site';

// Ubicación usada para enriquecer título/descripción de páginas de servicio
// con contexto de búsqueda local. Santiago es la plaza de cobertura formal
// del proyecto (ver CLAUDE.md) — label regional, no una comuna puntual de
// src/data/areas.ts.
const DEFAULT_SERVICE_LOCATION = 'Santiago';

// Título SEO reutilizable para cualquier página de servicio.
//
// `catalogTitle` es el nombre corto pensado para UI (Badge, ServiceCard —
// ver src/data/services.ts#title). Cuando ese nombre omite la entidad
// principal del servicio y por eso resulta ambiguo como <title> de buscador,
// el catálogo puede declarar `seoTitle`, que esta función prioriza. Sin
// `seoTitle`, se reutiliza `catalogTitle` tal cual — mismo mecanismo para
// cualquier servicio, sin mapas ni condicionales por slug.
// El sufijo de marca ("| Sertecline") lo agrega BaseLayout vía
// seoDefaults.titleTemplate — esta función no debe duplicarlo.
export function buildServiceSeoTitle(
  catalogTitle: string,
  seoTitleOverride?: string,
  location: string = DEFAULT_SERVICE_LOCATION
): string {
  return `${seoTitleOverride ?? catalogTitle} en ${location}`;
}

// Meta description reutilizable: parte del metaDescription editorial
// (src/content/services/*.mdx) y le agrega marca + contexto local, sin
// pedirle a cada ficha de servicio que repita esos datos en su contenido.
export function buildServiceMetaDescription(
  metaDescription: string,
  location: string = DEFAULT_SERVICE_LOCATION
): string {
  const normalized = metaDescription.trim().replace(/\.?$/, '.');
  return `${normalized} ${siteConfig.name}, servicio técnico a domicilio en ${location}.`;
}
