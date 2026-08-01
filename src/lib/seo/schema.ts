/**
 * Constructores de JSON-LD (schema.org) — capa de vocabulario.
 *
 * Sabe cómo se escribe schema.org, no qué declara Sertecline: recibe datos ya
 * resueltos y devuelve nodos, sin importar Astro ni config. La política (qué
 * organización, qué área, qué canónica) vive en src/lib/seo/services.ts.
 */
import type { ServiceBreadcrumb } from '../../types/serviceBreadcrumb';
import type { ServiceFaq } from '../../types/serviceFaq';

/** Nodo JSON-LD ya construido, listo para entrar en un @graph. */
export type JsonLdNode = Record<string, unknown>;

/**
 * Prestador del servicio. `id` es un @id estable, no una URL navegable: deja
 * que un futuro nodo de organización completo (con el NAP real) se fusione
 * con estas referencias sin reescribir las fichas de servicio.
 */
export interface OrganizationRef {
  id: string;
  name: string;
  url: string;
}

export interface ServiceSchemaInput {
  /** Denominación completa del servicio, sin marca ni ubicación. */
  name: string;
  description: string;
  /** URL canónica de la ficha. */
  url: string;
  areaServed: string;
  provider: OrganizationRef;
}

/**
 * @id del nodo Service de una ficha, derivado de su canónica.
 *
 * Existe como función y no como plantilla repetida porque otros nodos del
 * mismo @graph necesitan apuntar a ese Service (ver `about` en
 * buildFaqPageSchema): con una sola definición, la referencia no puede quedar
 * apuntando a un @id que ya no existe.
 */
export function buildServiceNodeId(url: string): string {
  return `${url}#service`;
}

/**
 * Service schema.
 *
 * `provider` es Organization y no LocalBusiness ni un subtipo de
 * HomeAndConstructionBusiness: no hay dirección ni datos de contacto
 * confirmados (src/data/contact.ts los omite a propósito), y ningún subtipo
 * de schema.org describe servicio técnico de línea blanca.
 */
export function buildServiceSchema(input: ServiceSchemaInput): JsonLdNode {
  return {
    '@type': 'Service',
    '@id': buildServiceNodeId(input.url),
    name: input.name,
    description: input.description,
    url: input.url,
    areaServed: input.areaServed,
    provider: {
      '@type': 'Organization',
      '@id': input.provider.id,
      name: input.provider.name,
      url: input.provider.url,
    },
  };
}

export interface FaqPageSchemaInput {
  /** URL canónica de la página que muestra estas preguntas. */
  url: string;
  /** Exactamente el array que la página renderiza — no una copia editada. */
  faqs: readonly ServiceFaq[];
  /** @id del nodo que estas preguntas describen (ver buildServiceNodeId). */
  aboutId?: string;
}

/**
 * FAQPage schema a partir de las preguntas visibles de la página.
 *
 * Correspondencia 1:1 con el HTML: una Question por elemento recibido, en el
 * mismo orden, sin filtrar ni fusionar. Aplicar aquí cualquier criterio
 * propio — deduplicar, descartar, reordenar — haría que el grafo describiera
 * un conjunto distinto del que ve el lector, que es justo lo que este
 * checkpoint evita al alimentar ambas salidas con un único array.
 *
 * Devuelve `null` cuando no hay preguntas: un FAQPage con `mainEntity` vacío
 * es inválido, y la mayoría de las fichas todavía no declara ninguna. Que sea
 * el llamador quien decida es preferible a emitir un nodo vacío.
 *
 * El texto solo se recorta en los extremos: las respuestas son contenido
 * editorial y esta capa no las reescribe.
 */
export function buildFaqPageSchema({ url, faqs, aboutId }: FaqPageSchemaInput): JsonLdNode | null {
  if (faqs.length === 0) {
    return null;
  }

  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    ...(aboutId ? { about: { '@id': aboutId } } : {}),
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.trim(),
      },
    })),
  };
}

export interface BreadcrumbListSchemaInput {
  /** Exactamente el array que la página renderiza — no una copia editada. */
  items: readonly ServiceBreadcrumb[];
  /** Canónica de la página, para el @id. */
  url: string;
  /** Base sobre la que se absolutizan los `href` relativos de los items. */
  baseUrl: string;
}

/**
 * BreadcrumbList schema a partir del rastro visible de la página.
 *
 * Correspondencia 1:1 con el `<ol>`: un ListItem por elemento, en el mismo
 * orden y con el `name` tal como llega. `position` arranca en 1 porque
 * schema.org numera desde uno, no desde el índice del array.
 *
 * Los `href` del rastro son relativos —el HTML no debe enlazar con URLs
 * absolutas— y aquí se absolutizan contra `baseUrl`, que es lo que el JSON-LD
 * sí exige. Es una derivación del mismo dato, no una segunda lista de rutas.
 *
 * El elemento actual no trae `href` y por eso sale sin `item`: schema.org
 * admite omitirlo en el último tramo, que es la propia página.
 *
 * Devuelve `null` con menos de dos elementos: un rastro de un solo nodo no
 * describe jerarquía y emitirlo sería declarar una estructura inexistente.
 */
export function buildBreadcrumbListSchema({
  items,
  url,
  baseUrl,
}: BreadcrumbListSchemaInput): JsonLdNode | null {
  if (items.length < 2) {
    return null;
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: new URL(item.href, baseUrl).toString() } : {}),
    })),
  };
}

/**
 * Serializa los nodos en un único bloque JSON-LD.
 *
 * Todo `<` se escapa a su secuencia unicode: el string se inyecta con set:html
 * dentro de un <script>, y un cierre de etiqueta escrito en el contenido
 * editorial podría cerrarlo antes de tiempo. El JSON sigue siendo válido y
 * produce el mismo resultado al parsearse.
 */
export function serializeJsonLdGraph(nodes: readonly JsonLdNode[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes,
  }).replace(/</g, '\\u003c');
}
