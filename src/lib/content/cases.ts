import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// Único punto de consulta de la collection `cases`. Selección editorial de un
// único caso por ID (ver src/data/featuredWork.ts#caseId) — sin listados ni
// filtros hasta que exista una épica que los necesite (/trabajos).
export async function getPublishedCaseById(
  caseId: string
): Promise<CollectionEntry<'cases'> | undefined> {
  const entry = await getEntry('cases', caseId);
  if (!entry || entry.data.draft) return undefined;
  return entry;
}

// Orden determinista entre casos del mismo servicio. Sin un criterio explícito
// el resultado dependería del orden de lectura del sistema de archivos, que no
// es estable entre máquinas de build.
// El desempate final compara los IDs con `<`/`>` y no con localeCompare(): este
// último usa la locale del sistema, así que el mismo contenido podría ordenarse
// distinto en dos máquinas. Los IDs son slugs ASCII, donde el orden de código
// es el orden alfabético esperado.
// Ya no participa `featured`: esa bandera desapareció del schema en EPIC 7 —
// Checkpoint 7.2. Convivía con `featuredWorkContent.caseId` (src/data/
// featuredWork.ts) con un significado distinto —una era una propiedad del caso,
// el otro una selección editorial de home— y ninguna superficie usaba la
// bandera para seleccionar: solo desempataba este orden. El criterio ahora es
// exclusivamente factual (fecha real del trabajo, luego ID), así que ordenar no
// puede colarse como una forma implícita de destacar. La portada la sigue
// eligiendo una persona, por ID.
function compareCases(a: CollectionEntry<'cases'>, b: CollectionEntry<'cases'>): number {
  // completedAt es opcional en el schema (casos históricos sin fecha confirmada
  // la omiten en vez de inventarla): los que no la declaran van al final.
  const aTime = a.data.completedAt?.getTime();
  const bTime = b.data.completedAt?.getTime();

  if (aTime !== bTime) {
    if (aTime === undefined) return 1;
    if (bTime === undefined) return -1;
    return bTime - aTime;
  }

  if (a.id !== b.id) return a.id < b.id ? -1 : 1;
  return 0;
}

/**
 * Casos publicados de un servicio, para las fichas de servicio (EPIC 4.0 —
 * Checkpoint 13). Usa la relación que ya declara cada caso en su frontmatter
 * (`service`, validado contra los IDs de src/data/services.ts por el enum de
 * content.config.ts): no existe ni debe existir una segunda tabla de
 * correspondencias servicio → casos.
 *
 * `limit` se aplica después de filtrar y ordenar, para que recortar no altere
 * qué caso queda primero.
 *
 * Invariante del schema: `evidence.result` es obligatorio (ver
 * src/content.config.ts), así que todo caso devuelto tiene al menos la
 * fotografía del resultado. Por eso no se filtra por ausencia de evidencia ni
 * se inventa una imagen de reemplazo. Lo que sí puede faltar es
 * `evidence.before`, y esa rama la resuelve la capa de presentación
 * (src/components/cases/CaseEvidence.astro), no esta consulta.
 */
export async function getRelatedCases(
  serviceId: string,
  limit: number
): Promise<CollectionEntry<'cases'>[]> {
  const entries = await getCollection(
    'cases',
    (entry) => !entry.data.draft && entry.data.service === serviceId
  );

  return entries.sort(compareCases).slice(0, limit);
}
