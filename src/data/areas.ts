export type ServiceAreaKind = 'comuna' | 'sector';

/**
 * Prioridad comercial interna: dato de planificación —qué zonas atiende el
 * negocio con prioridad y en qué orden se produce contenido—, nunca un dato de
 * presentación.
 *
 * Regla: ninguna superficie pública puede derivarse de este campo. Ni orden
 * visual, ni badges, ni copy, ni rutas, ni datos estructurados. En particular
 * no debe existir un `.filter((area) => area.priority === 'focus')` alimentando
 * HTML: publicaría la segmentación comercial aunque el valor nunca se imprima.
 * Lo que la home muestra se declara aparte, por IDs y con criterio editorial
 * propio — ver src/data/coverageSection.ts#featuredAreaIds.
 *
 * `standard` significa "sin prioridad declarada", no "secundaria".
 */
export type ServiceAreaPriority = 'focus' | 'standard';

export interface ServiceArea {
  id: string;
  name: string;
  kind: ServiceAreaKind;
  /**
   * `id` de la comuna que contiene al sector. Presente solo cuando `kind` es
   * 'sector': un sector no es una unidad administrativa y modelarlo como
   * comuna declararía una división que no existe.
   */
  parentId?: string;
  region: string;
  priority: ServiceAreaPriority;
}

// Las 41 entidades del catálogo están en la misma región; la constante evita
// repetir la cadena en cada fila sin sacar el campo del tipo, que sí tiene
// consumidor (ServiceCase.astro y FeaturedCase.astro lo imprimen).
const REGION_METROPOLITANA = 'Región Metropolitana';

/**
 * Catálogo de cobertura de Sertecline (EPIC 4.1 — Checkpoint 4.1.4).
 *
 * Alcance confirmado con el negocio: las 32 comunas de la Provincia de
 * Santiago —conjunto administrativo, enumerable y estable, que es lo que el
 * negocio quiere decir con "todo Santiago"— más 7 comunas confirmadas una a
 * una fuera de esa provincia: Puente Alto (Cordillera); Colina (Chacabuco);
 * Calera de Tango y San Bernardo (Maipo); Padre Hurtado, Peñaflor y Talagante
 * (Talagante).
 *
 * No se usó "Gran Santiago": es una definición censal del continuo urbano, sin
 * límite legal, que varía entre 34 y 37 comunas según la fuente — un catálogo
 * de datos no debe depender de un conjunto cuya enumeración exige elegir
 * fuente. Tampoco la Región Metropolitana completa (52 comunas): incluiría
 * Alhué, Melipilla o Tiltil, donde no hay cobertura. La provincia sirvió para
 * derivar el conjunto y no se guarda como campo, porque nadie la lee.
 *
 * Estar en este array *es* estar cubierto: no hay ni debe haber un campo
 * `covered`, igual que la ausencia de `href` es el estado "sin página" en
 * src/lib/content/services.ts#ServiceCardModel.
 *
 * Orden: ASCII ascendente por `id`. Determinista entre máquinas de build (no
 * localeCompare — ver src/lib/content/cases.ts#compareCases) y neutral: el
 * orden físico no comunica prioridad, y la home no depende de él.
 *
 * Este catálogo NO alimenta hoy ningún JSON-LD. El único `areaServed` que el
 * sitio emite es la constante de texto de src/lib/seo/services.ts, que no
 * importa este archivo. Cuando exista un nodo LocalBusiness, este catálogo
 * será su origen.
 */
export const serviceAreas: ServiceArea[] = [
  {
    id: 'calera-de-tango',
    name: 'Calera de Tango',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'cerrillos',
    name: 'Cerrillos',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'cerro-navia',
    name: 'Cerro Navia',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'chicureo',
    name: 'Chicureo',
    kind: 'sector',
    parentId: 'colina',
    region: REGION_METROPOLITANA,
    priority: 'focus',
  },
  {
    id: 'colina',
    name: 'Colina',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'focus',
  },
  {
    id: 'conchali',
    name: 'Conchalí',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'el-bosque',
    name: 'El Bosque',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'estacion-central',
    name: 'Estación Central',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'huechuraba',
    name: 'Huechuraba',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'independencia',
    name: 'Independencia',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'la-cisterna',
    name: 'La Cisterna',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'la-dehesa',
    name: 'La Dehesa',
    kind: 'sector',
    parentId: 'lo-barnechea',
    region: REGION_METROPOLITANA,
    priority: 'focus',
  },
  {
    id: 'la-florida',
    name: 'La Florida',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'la-granja',
    name: 'La Granja',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'la-pintana',
    name: 'La Pintana',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'la-reina',
    name: 'La Reina',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'focus',
  },
  {
    id: 'las-condes',
    name: 'Las Condes',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'focus',
  },
  {
    id: 'lo-barnechea',
    name: 'Lo Barnechea',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'focus',
  },
  {
    id: 'lo-espejo',
    name: 'Lo Espejo',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'lo-prado',
    name: 'Lo Prado',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'macul',
    name: 'Macul',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'maipu',
    name: 'Maipú',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'nunoa',
    name: 'Ñuñoa',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'focus',
  },
  {
    id: 'padre-hurtado',
    name: 'Padre Hurtado',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'pedro-aguirre-cerda',
    name: 'Pedro Aguirre Cerda',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'penaflor',
    name: 'Peñaflor',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'penalolen',
    name: 'Peñalolén',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'providencia',
    name: 'Providencia',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'focus',
  },
  {
    id: 'pudahuel',
    name: 'Pudahuel',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'puente-alto',
    name: 'Puente Alto',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'quilicura',
    name: 'Quilicura',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'quinta-normal',
    name: 'Quinta Normal',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'recoleta',
    name: 'Recoleta',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'renca',
    name: 'Renca',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'san-bernardo',
    name: 'San Bernardo',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'san-joaquin',
    name: 'San Joaquín',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'san-miguel',
    name: 'San Miguel',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'san-ramon',
    name: 'San Ramón',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'santiago',
    name: 'Santiago',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'talagante',
    name: 'Talagante',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'standard',
  },
  {
    id: 'vitacura',
    name: 'Vitacura',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
    priority: 'focus',
  },
];

// Índice por `id`. Map y no `.find()` por llamada: el catálogo ya tiene 41
// entradas y quien resuelve una selección editorial consulta una vez por ID.
const serviceAreasById = new Map(serviceAreas.map((area) => [area.id, area]));

/**
 * Resuelve una lista de IDs contra el catálogo, en el orden recibido.
 *
 * Existe para que una selección editorial (src/data/coverageSection.ts) declare
 * solo IDs: nombre, kind, parentId, región y prioridad siguen viviendo en un
 * único lugar y no pueden desincronizarse de una copia.
 *
 * El orden de salida es el de `ids`, no el del catálogo: la secuencia visible
 * es una decisión editorial y el orden ASCII de este archivo es un criterio
 * interno de determinismo, no de presentación.
 *
 * Lanza ante un ID desconocido en vez de omitirlo. El sitio es estático, así
 * que el build es la validación: una comuna que desaparece en silencio de la
 * cobertura publicada es un error de negocio invisible. Mismo criterio que
 * src/pages/servicios/[slug].astro ante una ficha inexistente.
 */
export function resolveServiceAreas(ids: readonly string[]): ServiceArea[] {
  return ids.map((id) => {
    const area = serviceAreasById.get(id);

    if (!area) {
      throw new Error(`Unknown service area id: ${id}`);
    }

    return area;
  });
}
