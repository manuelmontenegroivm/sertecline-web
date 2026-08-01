import { siteConfig } from '../../config/site';
import { buildServiceSchema, serializeJsonLdGraph, type OrganizationRef } from './schema';

// Ubicación usada para enriquecer título/descripción de páginas de servicio
// con contexto de búsqueda local. Santiago es la plaza de cobertura formal
// del proyecto (ver CLAUDE.md) — label regional, no una comuna puntual de
// src/data/areas.ts.
const DEFAULT_SERVICE_LOCATION = 'Santiago';

// areaServed como texto: las comunas de src/data/areas.ts siguen marcadas
// como placeholder sin confirmar, y no hay dirección ni coordenadas para
// declarar un Place estructurado. Región y país sí son verificables y
// desambiguan "Santiago".
const SERVICE_AREA_SERVED = `${DEFAULT_SERVICE_LOCATION}, Región Metropolitana, Chile`;

// Prestador de todos los servicios. El @id se mantiene estable para que un
// futuro nodo de organización (home/contacto, con el NAP real) se fusione con
// estas referencias sin tocar las fichas.
const SERTECLINE_ORGANIZATION: OrganizationRef = {
  id: new URL('/#organization', siteConfig.url).toString(),
  name: siteConfig.name,
  url: new URL('/', siteConfig.url).toString(),
};

// Denominación del servicio como entidad. `catalogTitle` es el nombre corto
// pensado para UI (ver src/data/services.ts#title); el catálogo puede declarar
// `seoTitle` cuando ese nombre resulta ambiguo fuera de la UI. Regla única
// compartida por el <title> y el JSON-LD, sin condicionales por slug.
export function resolveServiceName(catalogTitle: string, seoTitleOverride?: string): string {
  return seoTitleOverride ?? catalogTitle;
}

// Título SEO reutilizable para cualquier página de servicio.
// El sufijo de marca ("| Sertecline") lo agrega BaseLayout vía
// seoDefaults.titleTemplate — esta función no debe duplicarlo.
export function buildServiceSeoTitle(
  catalogTitle: string,
  seoTitleOverride?: string,
  location: string = DEFAULT_SERVICE_LOCATION
): string {
  return `${resolveServiceName(catalogTitle, seoTitleOverride)} en ${location}`;
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

// Canónica de una ficha de servicio. Replica la derivación por defecto de
// BaseLayout para que el layout la calcule una vez y la comparta con
// <link rel="canonical"> y el JSON-LD: un solo valor, imposible que diverjan.
export function buildServiceCanonicalUrl(pathname: string, site?: URL): string {
  return new URL(pathname, site ?? siteConfig.url).toString();
}

export interface ServiceStructuredDataInput {
  /** Ya resuelto con resolveServiceName(). */
  name: string;
  /** metaDescription editorial en crudo — ver nota abajo. */
  description: string;
  canonical: string;
}

/**
 * Punto único de entrada del JSON-LD de una ficha de servicio: devuelve el
 * string listo para inyectar, para que el layout no arme objetos.
 *
 * `description` usa el metaDescription editorial en crudo, no el compuesto por
 * buildServiceMetaDescription(): marca y ubicación ya están expresadas en
 * `provider` y `areaServed`, y repetirlas en prosa duplicaría en el grafo lo
 * que el grafo ya declara.
 */
export function buildServiceStructuredData({
  name,
  description,
  canonical,
}: ServiceStructuredDataInput): string {
  return serializeJsonLdGraph([
    buildServiceSchema({
      name,
      description: description.trim(),
      url: canonical,
      areaServed: SERVICE_AREA_SERVED,
      provider: SERTECLINE_ORGANIZATION,
    }),
  ]);
}
