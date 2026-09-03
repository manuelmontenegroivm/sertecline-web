/**
 * Política SEO que no pertenece a un tipo de página concreto (EPIC 8 —
 * Checkpoint 8.2).
 *
 * Es la contraparte de services.ts —que resuelve lo propio de una ficha de
 * servicio— para lo que cualquier ruta necesita por igual: su canónica y el
 * rastro de navegación que publica en el @graph. Ambas cosas dejaron de ser
 * específicas de un tipo de página cuando /trabajos y /trabajos/[slug]
 * pasaron a mostrar jerarquía visible, y dejarlas en services.ts habría
 * obligado a un módulo de servicios a servir a rutas de trabajos, o —peor— a
 * copiar la derivación en cada página.
 *
 * Sigue siendo capa de política, no de vocabulario: qué se declara se decide
 * aquí, cómo se escribe schema.org lo resuelve lib/seo/schema.ts.
 */
import { siteConfig } from '../../config/site';
import { buildBreadcrumbListSchema, serializeJsonLdGraph, type JsonLdNode } from './schema';
import type { Breadcrumb } from '../../types/breadcrumb';

/**
 * Canónica de una página. Replica la derivación por defecto de BaseLayout para
 * que la página la calcule una vez y la comparta con <link rel="canonical"> y
 * el JSON-LD: un solo valor, imposible que diverjan.
 *
 * Se llamaba buildServiceCanonicalUrl() mientras las fichas de servicio eran la
 * única superficie con JSON-LD propio. La regla nunca fue específica de ellas.
 */
export function buildCanonicalUrl(pathname: string, site?: URL): string {
  return new URL(pathname, site ?? siteConfig.url).toString();
}

/**
 * BreadcrumbList del rastro visible de una página, como nodo de su @graph.
 *
 * Envuelve a buildBreadcrumbListSchema() solo para fijar en un punto la
 * derivación de `baseUrl`: los `href` del rastro son relativos al raíz del
 * sitio y se absolutizan contra el origen de la propia canónica, de modo que
 * las URLs del breadcrumb no puedan quedar en un dominio distinto del que la
 * página acaba de declarar como canónico. Antes esa decisión vivía dentro de
 * buildServiceStructuredData(); con tres superficies emitiendo el rastro, una
 * copia por superficie es exactamente lo que no debe existir.
 *
 * Devuelve `null` con menos de dos elementos — ver buildBreadcrumbListSchema().
 */
export function buildBreadcrumbListNode(
  items: readonly Breadcrumb[],
  canonical: string
): JsonLdNode | null {
  return buildBreadcrumbListSchema({
    items,
    url: canonical,
    baseUrl: new URL('/', canonical).toString(),
  });
}

/**
 * JSON-LD listo para inyectar en una página cuyo único dato estructurado es su
 * rastro de navegación — hoy, las dos rutas de trabajos.
 *
 * Recibe exactamente el mismo array que <Breadcrumbs> renderiza, así que lo
 * estructurado no puede declarar una jerarquía distinta de la visible. No
 * agrega ningún otro nodo: la ficha de un trabajo no emite Article,
 * BlogPosting, ImageObject, Review ni un tipo propio de caso, y el índice no
 * emite CollectionPage ni ItemList. Se publica el rastro porque el rastro ya
 * existe en el HTML; nada más.
 *
 * Devuelve `null` cuando no hay jerarquía que declarar, para que la página
 * omita el <script> en vez de emitir un bloque vacío.
 */
export function buildBreadcrumbStructuredData(
  items: readonly Breadcrumb[],
  canonical: string
): string | null {
  const node = buildBreadcrumbListNode(items, canonical);
  return node ? serializeJsonLdGraph([node]) : null;
}
