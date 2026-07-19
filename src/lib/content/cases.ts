import { getEntry } from 'astro:content';
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
