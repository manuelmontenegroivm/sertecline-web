import { resolvePlace, type Place, type PlaceKind } from './places';

/**
 * Reexportado desde ./places: la identidad de un lugar (incluido su tipo) ya no
 * vive en este archivo. Se conserva el nombre porque es el que usan los
 * consumidores de cobertura y renombrarlo no aportaría nada.
 */
export type ServiceAreaKind = PlaceKind;

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

/**
 * Un lugar del vocabulario geográfico + lo que el negocio decidió sobre él.
 *
 * La forma pública no cambia respecto de checkpoints anteriores (id, name,
 * kind, parentId, region, priority): lo que cambia es de dónde viene cada
 * campo. Los cinco primeros los aporta `Place` (src/data/places.ts) y `priority`
 * es el único dato que pertenece a este dominio.
 */
export interface ServiceArea extends Place {
  priority: ServiceAreaPriority;
}

interface CoverageDecision {
  placeId: string;
  priority: ServiceAreaPriority;
}

/**
 * Catálogo de cobertura de Sertecline (EPIC 4.1 — Checkpoint 4.1.4; separado de
 * la identidad geográfica en EPIC 7 — Checkpoint 7.2).
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
 * Esta tabla declara **solo decisiones comerciales**: qué lugares del
 * vocabulario están cubiertos y con qué prioridad. Nombre, tipo, comuna madre y
 * región se resuelven contra src/data/places.ts, así que no existen dos copias
 * que puedan desincronizarse.
 *
 * Estar en esta tabla *es* estar cubierto: no hay ni debe haber un campo
 * `covered`, igual que la ausencia de `href` es el estado "sin página" en
 * src/lib/content/services.ts#ServiceCardModel. La enumeración es explícita a
 * propósito: agregar un lugar al vocabulario geográfico NO debe publicar
 * cobertura nueva por efecto colateral — esa es una afirmación de negocio y
 * necesita esta línea.
 *
 * Orden: el mismo del vocabulario (ASCII ascendente por `id`), determinista
 * entre máquinas de build y neutral: el orden físico no comunica prioridad, y
 * la home no depende de él.
 *
 * Este catálogo NO alimenta hoy ningún JSON-LD. El único `areaServed` que el
 * sitio emite es la constante de texto de src/lib/seo/services.ts, que no
 * importa este archivo. Cuando exista un nodo LocalBusiness, este catálogo
 * será su origen.
 */
const coverage: readonly CoverageDecision[] = [
  { placeId: 'calera-de-tango', priority: 'standard' },
  { placeId: 'cerrillos', priority: 'standard' },
  { placeId: 'cerro-navia', priority: 'standard' },
  { placeId: 'chicureo', priority: 'focus' },
  { placeId: 'colina', priority: 'focus' },
  { placeId: 'conchali', priority: 'standard' },
  { placeId: 'el-bosque', priority: 'standard' },
  { placeId: 'estacion-central', priority: 'standard' },
  { placeId: 'huechuraba', priority: 'standard' },
  { placeId: 'independencia', priority: 'standard' },
  { placeId: 'la-cisterna', priority: 'standard' },
  { placeId: 'la-dehesa', priority: 'focus' },
  { placeId: 'la-florida', priority: 'standard' },
  { placeId: 'la-granja', priority: 'standard' },
  { placeId: 'la-pintana', priority: 'standard' },
  { placeId: 'la-reina', priority: 'focus' },
  { placeId: 'las-condes', priority: 'focus' },
  { placeId: 'lo-barnechea', priority: 'focus' },
  { placeId: 'lo-espejo', priority: 'standard' },
  { placeId: 'lo-prado', priority: 'standard' },
  { placeId: 'macul', priority: 'standard' },
  { placeId: 'maipu', priority: 'standard' },
  { placeId: 'nunoa', priority: 'focus' },
  { placeId: 'padre-hurtado', priority: 'standard' },
  { placeId: 'pedro-aguirre-cerda', priority: 'standard' },
  { placeId: 'penaflor', priority: 'standard' },
  { placeId: 'penalolen', priority: 'standard' },
  { placeId: 'providencia', priority: 'focus' },
  { placeId: 'pudahuel', priority: 'standard' },
  { placeId: 'puente-alto', priority: 'standard' },
  { placeId: 'quilicura', priority: 'standard' },
  { placeId: 'quinta-normal', priority: 'standard' },
  { placeId: 'recoleta', priority: 'standard' },
  { placeId: 'renca', priority: 'standard' },
  { placeId: 'san-bernardo', priority: 'standard' },
  { placeId: 'san-joaquin', priority: 'standard' },
  { placeId: 'san-miguel', priority: 'standard' },
  { placeId: 'san-ramon', priority: 'standard' },
  { placeId: 'santiago', priority: 'standard' },
  { placeId: 'talagante', priority: 'standard' },
  { placeId: 'vitacura', priority: 'focus' },
];

/**
 * Cobertura publicable: identidad del lugar + prioridad comercial.
 *
 * `resolvePlace()` lanza ante un ID que no exista en el vocabulario, así que
 * una decisión de cobertura sobre un lugar inexistente falla el build en vez de
 * producir una entrada a medias.
 */
export const serviceAreas: ServiceArea[] = coverage.map((decision) => ({
  ...resolvePlace(decision.placeId),
  priority: decision.priority,
}));

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
 * Lanza ante un ID desconocido en vez de omitirlo. Aquí "desconocido" significa
 * *no cubierto*: un lugar puede existir en el vocabulario geográfico y aun así
 * no estar en este catálogo, y esa distinción es justamente la que el
 * checkpoint 7.2 vino a preservar. El sitio es estático, así que el build es la
 * validación: una comuna que desaparece en silencio de la cobertura publicada
 * es un error de negocio invisible. Mismo criterio que
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
