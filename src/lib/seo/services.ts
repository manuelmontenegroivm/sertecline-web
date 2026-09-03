import { siteConfig } from '../../config/site';
import {
  SERTECLINE_AREA_SERVED,
  SERTECLINE_LOCATION,
  SERTECLINE_ORGANIZATION,
} from './organization';
import {
  buildFaqPageSchema,
  buildServiceNodeId,
  buildServiceSchema,
  serializeJsonLdGraph,
  type JsonLdNode,
} from './schema';
import { buildBreadcrumbListNode } from './page';
import type { Breadcrumb } from '../../types/breadcrumb';
import type { ServiceFaq } from '../../types/serviceFaq';

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
  location: string = SERTECLINE_LOCATION
): string {
  return `${resolveServiceName(catalogTitle, seoTitleOverride)} en ${location}`;
}

// Meta description reutilizable: parte del metaDescription editorial
// (src/content/services/*.mdx) y le agrega marca + contexto local, sin
// pedirle a cada ficha de servicio que repita esos datos en su contenido.
export function buildServiceMetaDescription(
  metaDescription: string,
  location: string = SERTECLINE_LOCATION
): string {
  const normalized = metaDescription.trim().replace(/\.?$/, '.');
  return `${normalized} ${siteConfig.name}, servicio técnico a domicilio en ${location}.`;
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
export function buildServiceBreadcrumbs(serviceName: string): Breadcrumb[] {
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
  breadcrumbs?: readonly Breadcrumb[];
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
      areaServed: SERTECLINE_AREA_SERVED,
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

  // Mismo nodo y misma derivación de base que publican las rutas de trabajos —
  // ver lib/seo/page.ts#buildBreadcrumbListNode. Aquí entra al @graph junto al
  // Service y al FAQPage en vez de viajar solo.
  const breadcrumbList = buildBreadcrumbListNode(breadcrumbs, canonical);

  if (breadcrumbList) {
    nodes.push(breadcrumbList);
  }

  return serializeJsonLdGraph(nodes);
}
