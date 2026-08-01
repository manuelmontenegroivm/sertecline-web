import { siteConfig } from '../../config/site';
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildServiceNodeId,
  buildServiceSchema,
  serializeJsonLdGraph,
  type JsonLdNode,
  type OrganizationRef,
} from './schema';
import type { ServiceBreadcrumb } from '../../types/serviceBreadcrumb';
import type { ServiceFaq } from '../../types/serviceFaq';

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

/**
 * Rastro de navegación de una ficha de servicio.
 *
 * Hoy son dos niveles: la home y la ficha. Deliberadamente **no** existe un
 * nivel intermedio "Servicios": ese destino sería `/#servicios`, un fragmento
 * de la home, y un ancla dentro de otra página no es una página padre.
 * Declararla como tal inventaría una jerarquía que el sitio no tiene.
 * Cuando exista una página `/servicios` real, el nivel se agrega aquí — es el
 * único punto a tocar, porque de este array salen tanto el `<ol>` visible
 * como el BreadcrumbList.
 *
 * `serviceName` debe venir ya resuelto con resolveServiceName(): el rastro usa
 * la denominación completa del servicio, no el título corto de UI, y esa regla
 * ya vive en un solo lugar.
 */
export function buildServiceBreadcrumbs(serviceName: string): ServiceBreadcrumb[] {
  return [{ name: 'Inicio', href: '/' }, { name: serviceName }];
}

export interface ServiceStructuredDataInput {
  /** Ya resuelto con resolveServiceName(). */
  name: string;
  /** metaDescription editorial en crudo — ver nota abajo. */
  description: string;
  canonical: string;
  /**
   * Exactamente el mismo array que ServiceLayout renderiza en la sección
   * "Preguntas frecuentes". Si está vacío, no se emite nodo FAQPage: no debe
   * existir dato estructurado sin su contraparte visible en el HTML.
   */
  faqs?: readonly ServiceFaq[];
  /**
   * Exactamente el mismo array que ServiceLayout renderiza en el `<nav>` de
   * breadcrumbs — ver buildServiceBreadcrumbs().
   */
  breadcrumbs?: readonly ServiceBreadcrumb[];
}

/**
 * Punto único de entrada del JSON-LD de una ficha de servicio: devuelve el
 * string listo para inyectar, para que el layout no arme objetos.
 *
 * `description` usa el metaDescription editorial en crudo, no el compuesto por
 * buildServiceMetaDescription(): marca y ubicación ya están expresadas en
 * `provider` y `areaServed`, y repetirlas en prosa duplicaría en el grafo lo
 * que el grafo ya declara.
 *
 * Service siempre está; FAQPage y BreadcrumbList solo cuando la ficha muestra
 * preguntas y rastro. Todos viajan en un único @graph, no en bloques <script>
 * separados: así el FAQPage puede referenciar al Service por @id (`about`) y
 * declarar de qué trata, en vez de quedar como un set de preguntas suelto.
 */
export function buildServiceStructuredData({
  name,
  description,
  canonical,
  faqs = [],
  breadcrumbs = [],
}: ServiceStructuredDataInput): string {
  const nodes: JsonLdNode[] = [
    buildServiceSchema({
      name,
      description: description.trim(),
      url: canonical,
      areaServed: SERVICE_AREA_SERVED,
      provider: SERTECLINE_ORGANIZATION,
    }),
  ];

  const faqPage = buildFaqPageSchema({
    url: canonical,
    faqs,
    aboutId: buildServiceNodeId(canonical),
  });

  if (faqPage) {
    nodes.push(faqPage);
  }

  // Base explícita en la raíz del sitio, derivada de la propia canónica: los
  // href del rastro son relativos al raíz, y tomar el origen de la canónica
  // evita que las URLs del breadcrumb queden en un dominio distinto del que
  // se acaba de declarar como canónico.
  const breadcrumbList = buildBreadcrumbListSchema({
    items: breadcrumbs,
    url: canonical,
    baseUrl: new URL('/', canonical).toString(),
  });

  if (breadcrumbList) {
    nodes.push(breadcrumbList);
  }

  return serializeJsonLdGraph(nodes);
}
