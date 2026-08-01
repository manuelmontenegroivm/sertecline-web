/**
 * Constructores de JSON-LD (schema.org) — capa de vocabulario.
 *
 * Sabe cómo se escribe schema.org, no qué declara Sertecline: recibe datos ya
 * resueltos y devuelve nodos, sin importar Astro ni config. La política (qué
 * organización, qué área, qué canónica) vive en src/lib/seo/services.ts.
 */

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
    '@id': `${input.url}#service`,
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
