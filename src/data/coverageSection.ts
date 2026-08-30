export interface CoverageSectionContent {
  eyebrow: string;
  heading: string;
  intro: string;
  note: string;
  /**
   * Rótulo del enlace de contacto que cierra la sección. Texto y destino van
   * separados a propósito: el href lo deriva el componente desde el NAP
   * (lib/utils/contact.ts#buildWhatsappHref) y aquí no se escribe el número.
   * Repite literalmente el rótulo del CTA primario de contact/ContactActions
   * porque es la misma acción vista dos veces, no dos ofertas distintas.
   */
  ctaLabel: string;
}

// Copy de la sección "Cobertura" (home). Mismo patrón que servicesSection.ts y
// featuredWork.ts: contenido editorial separado del dato de negocio. Las áreas
// en sí viven en src/data/areas.ts (única fuente) — este archivo no las
// duplica: la selección de abajo declara solo IDs.
// El intro no enumera tipos de trabajo: hacerlo aquí los presentaría como
// disponibles por igual en todo equipo, que es justo lo que el catálogo evita.
// "Estas son algunas de ellas" señala, antes del listado, que las comunas
// visibles son una selección editorial y no la cobertura completa — el `note`
// lo repite después, de modo que la señal rodea al listado por ambos lados.
//
// Peñaflor, Talagante y Calera de Tango se nombran en el intro (EPIC 5 —
// Checkpoint 5.6). Están confirmadas en el catálogo (areas.ts: las tres son de
// las 7 comunas verificadas una a una fuera de la Provincia de Santiago) pero,
// a diferencia de Puente Alto o Colina, no se leen como "Santiago": un cliente
// de Talagante que solo veía "comunas de Santiago" y una lista sin su comuna
// tenía dos señales para concluir que no hay cobertura, cuando sí la hay. No es
// un claim nuevo: es el mismo dato del catálogo dicho donde el usuario decide.
// Las otras cuatro del catálogo no se nombran aquí: Puente Alto y Colina ya
// aparecen en el listado de abajo, y San Bernardo y Padre Hurtado se leen como
// parte del continuo de Santiago. Enumerarlas todas convertiría el intro en un
// segundo catálogo desincronizable, y el `note` ya cubre lo que quede fuera.
export const coverageSectionContent: CoverageSectionContent = {
  eyebrow: 'Dónde trabajamos',
  heading: 'Cobertura en Santiago',
  intro:
    'Prestamos servicio técnico a domicilio en distintas comunas de Santiago, además de Peñaflor, Talagante y Calera de Tango. Estas son algunas de ellas.',
  note: '¿No ves tu comuna? Revisamos la disponibilidad del servicio.',
  ctaLabel: 'Escríbenos por WhatsApp',
};

/**
 * Áreas visibles en la sección "Cobertura" de home, en orden de despliegue.
 *
 * Capa editorial, no catálogo: src/data/areas.ts declara las 41 entidades
 * cubiertas y este array elige cuáles se muestran. Sin esta separación, home
 * renderizaría las 41 como badges. Agregar una comuna al catálogo por lo tanto
 * ya no la muestra en home — es el objetivo de esta capa, pero conviene tenerlo
 * presente al editar.
 *
 * Criterio de selección: **representatividad geográfica**. La sección debe
 * comunicar "cubrimos todo Santiago", así que el muestreo abarca oriente,
 * centro, norte, sur y poniente. Deliberadamente NO es el conjunto
 * `priority: 'focus'` del catálogo ni nada derivable de él: la prioridad
 * comercial es interna (ver areas.ts#ServiceAreaPriority) y una lista que la
 * espeje la publicaría igual, con un rodeo. La mayoría de las áreas de abajo
 * son `standard`, y esa mezcla es intencional.
 *
 * Orden: **alfabético por nombre** (EPIC 5 — Checkpoint 5.6). Antes era
 * geográfico —oriente, centro, sur, poniente, norte—, un agrupamiento real pero
 * invisible: sin rótulos de zona el lector veía una secuencia arbitraria y, para
 * responder "¿atienden en mi comuna?", tenía que leer las catorce. El orden
 * alfabético convierte esa lectura en una búsqueda directa, que es la única
 * tarea que esta lista sirve. El criterio de *selección* no cambia: las mismas
 * catorce comunas, mismo muestreo de zonas; lo que cambia es cómo se recorren.
 * Ordenar aquí y no en el componente mantiene la regla de resolveServiceAreas
 * (el orden de salida es el de `ids`) y deja la secuencia visible declarada en
 * la capa editorial, donde se decide. No se ordena por código: `id` y `name`
 * divergen en las comunas con tilde o con eñe (`nunoa` → "Ñuñoa"), y un sort
 * automático las colocaría por su slug ASCII y no por lo que el usuario lee.
 *
 * Sin sectores: home declara cobertura a nivel de comuna. La Dehesa y Chicureo
 * siguen en el catálogo como entidades de búsqueda, pero listarlos junto a
 * comunas sugeriría una segmentación que esta sección no comunica.
 *
 * Solo IDs. Nombre, kind, parentId, región y prioridad se resuelven contra el
 * catálogo (areas.ts#resolveServiceAreas), que además falla el build si alguno
 * de estos IDs deja de existir.
 */
export const featuredAreaIds: string[] = [
  'colina',
  'huechuraba',
  'la-florida',
  'la-reina',
  'las-condes',
  'lo-barnechea',
  'maipu',
  'nunoa',
  'penalolen',
  'providencia',
  'puente-alto',
  'san-miguel',
  'santiago',
  'vitacura',
];
