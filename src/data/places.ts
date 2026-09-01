export type PlaceKind = 'comuna' | 'sector';

/**
 * Identidad geográfica: qué es un lugar, no qué hace el negocio en él.
 *
 * Deliberadamente sin `priority`, sin `covered` y sin ningún campo comercial.
 * Este vocabulario responde una sola pregunta —"¿existe este lugar y cómo se
 * llama?"— y por eso puede ser consultado por dominios que no tienen nada que
 * ver entre sí.
 */
export interface Place {
  id: string;
  name: string;
  kind: PlaceKind;
  /**
   * `id` de la comuna que contiene al sector. Presente solo cuando `kind` es
   * 'sector': un sector no es una unidad administrativa y modelarlo como
   * comuna declararía una división que no existe.
   */
  parentId?: string;
  region: string;
}

// Las 41 entidades del vocabulario están en la misma región; la constante evita
// repetir la cadena en cada fila sin sacar el campo del tipo, que sí tiene
// consumidor (los componentes que imprimen la ubicación de un caso y la sección
// de cobertura).
const REGION_METROPOLITANA = 'Región Metropolitana';

/**
 * Vocabulario geográfico controlado (EPIC 7 — Checkpoint 7.2).
 *
 * Extraído sin alteración desde src/data/areas.ts, que hasta este checkpoint
 * mezclaba dos cosas distintas en una sola tabla: **la identidad de un lugar**
 * (id, nombre, tipo, comuna madre, región) y **la decisión comercial de
 * cubrirlo** (pertenencia al catálogo de cobertura y `priority`). Mientras el
 * único consumidor era la sección Cobertura de home esa mezcla no costaba nada.
 * Deja de ser inocua cuando un Case declara dónde se hizo un trabajo real:
 *
 *     cobertura comercial  ≠  lugar real de un trabajo
 *
 * Validar la ubicación de un Case contra el catálogo de cobertura convertiría
 * cada trabajo publicado en una afirmación implícita de cobertura, y volvería
 * imposible representar un trabajo hecho fuera de ella sin antes declarar —en
 * datos, y por tanto en el sitio— una cobertura que el negocio no confirmó.
 * Con este archivo, los dos dominios leen la misma identidad y ninguno hereda
 * las decisiones del otro:
 *
 *                        Place (este archivo)
 *                                │
 *                    ┌───────────┴───────────┐
 *              ServiceArea                 Case.area
 *          (cobertura + priority)      (dónde ocurrió el trabajo)
 *
 * Las 41 entidades son exactamente las que ya existían: 32 comunas de la
 * Provincia de Santiago, 7 comunas confirmadas una a una fuera de ella (Puente
 * Alto, Colina, Calera de Tango, San Bernardo, Padre Hurtado, Peñaflor y
 * Talagante) y 2 sectores (Chicureo, La Dehesa). El criterio con que se armó
 * ese conjunto —y por qué no se usó "Gran Santiago" ni la Región Metropolitana
 * completa— sigue documentado en src/data/areas.ts, que es el dominio donde esa
 * decisión se tomó. Este checkpoint NO agrega, quita ni renombra lugares: un
 * lugar nuevo aquí es una entidad nueva publicable y requiere su propia
 * decisión.
 *
 * Estar en este array NO significa que el negocio atienda ahí. Eso lo declara
 * exclusivamente src/data/areas.ts.
 *
 * Orden: ASCII ascendente por `id`. Determinista entre máquinas de build (no
 * localeCompare — ver src/lib/content/cases.ts#compareCases) y neutral: el
 * orden físico no comunica prioridad ni preferencia.
 */
export const places: Place[] = [
  {
    id: 'calera-de-tango',
    name: 'Calera de Tango',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'cerrillos',
    name: 'Cerrillos',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'cerro-navia',
    name: 'Cerro Navia',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'chicureo',
    name: 'Chicureo',
    kind: 'sector',
    parentId: 'colina',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'colina',
    name: 'Colina',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'conchali',
    name: 'Conchalí',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'el-bosque',
    name: 'El Bosque',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'estacion-central',
    name: 'Estación Central',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'huechuraba',
    name: 'Huechuraba',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'independencia',
    name: 'Independencia',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'la-cisterna',
    name: 'La Cisterna',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'la-dehesa',
    name: 'La Dehesa',
    kind: 'sector',
    parentId: 'lo-barnechea',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'la-florida',
    name: 'La Florida',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'la-granja',
    name: 'La Granja',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'la-pintana',
    name: 'La Pintana',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'la-reina',
    name: 'La Reina',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'las-condes',
    name: 'Las Condes',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'lo-barnechea',
    name: 'Lo Barnechea',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'lo-espejo',
    name: 'Lo Espejo',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'lo-prado',
    name: 'Lo Prado',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'macul',
    name: 'Macul',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'maipu',
    name: 'Maipú',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'nunoa',
    name: 'Ñuñoa',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'padre-hurtado',
    name: 'Padre Hurtado',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'pedro-aguirre-cerda',
    name: 'Pedro Aguirre Cerda',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'penaflor',
    name: 'Peñaflor',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'penalolen',
    name: 'Peñalolén',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'providencia',
    name: 'Providencia',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'pudahuel',
    name: 'Pudahuel',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'puente-alto',
    name: 'Puente Alto',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'quilicura',
    name: 'Quilicura',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'quinta-normal',
    name: 'Quinta Normal',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'recoleta',
    name: 'Recoleta',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'renca',
    name: 'Renca',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'san-bernardo',
    name: 'San Bernardo',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'san-joaquin',
    name: 'San Joaquín',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'san-miguel',
    name: 'San Miguel',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'san-ramon',
    name: 'San Ramón',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'santiago',
    name: 'Santiago',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'talagante',
    name: 'Talagante',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
  {
    id: 'vitacura',
    name: 'Vitacura',
    kind: 'comuna',
    region: REGION_METROPOLITANA,
  },
];

// Índice por `id`. Map y no `.find()` por llamada: el vocabulario ya tiene 41
// entradas y sus dos consumidores resuelven por ID.
const placesById = new Map(places.map((place) => [place.id, place]));

/**
 * IDs del vocabulario, para derivar validaciones sin duplicar la lista.
 *
 * El cast a tupla no vacía es lo que pide `z.enum()` en
 * src/content.config.ts. Mismo patrón —y misma razón— que `serviceIds` y
 * `brandIds` en ese archivo: el enum se deriva del catálogo en vez de
 * transcribirse a mano, así que no puede desincronizarse.
 */
export const placeIds = places.map((place) => place.id) as [string, ...string[]];

/**
 * Resuelve un ID contra el vocabulario, o `undefined` si no existe.
 *
 * Para consumidores que solo presentan el dato. Quien necesite que un ID
 * desconocido falle el build debe usar `resolvePlace()` — o, en el caso de
 * un Case, apoyarse en el enum del schema, que rechaza el ID mucho antes de
 * llegar a un componente.
 */
export function getPlaceById(id: string): Place | undefined {
  return placesById.get(id);
}

/**
 * Resuelve un ID contra el vocabulario y lanza si no existe.
 *
 * El sitio es estático, así que el build es la validación: un lugar que
 * desaparece en silencio de una superficie publicada es un error de negocio
 * invisible. Mismo criterio que src/pages/servicios/[slug].astro ante una ficha
 * inexistente.
 */
export function resolvePlace(id: string): Place {
  const place = placesById.get(id);

  if (!place) {
    throw new Error(`Unknown place id: ${id}`);
  }

  return place;
}
