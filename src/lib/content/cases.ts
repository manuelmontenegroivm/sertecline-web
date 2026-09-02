import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// Único punto de consulta de la collection `cases`. Todas las superficies que
// publican trabajos reales —/trabajos, /trabajos/[slug], las fichas de servicio
// y la home— entran por aquí (regla de dependencia, ver CLAUDE.md): ninguna
// página ni componente vuelve a llamar a getCollection('cases') ni repite el
// filtro de borradores.
export async function getPublishedCaseById(
  caseId: string
): Promise<CollectionEntry<'cases'> | undefined> {
  const entry = await getEntry('cases', caseId);
  if (!entry || entry.data.draft) return undefined;
  return entry;
}

// Orden determinista entre casos. Sin un criterio explícito el resultado
// dependería del orden de lectura del sistema de archivos, que no es estable
// entre máquinas de build.
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
 * Todos los casos publicados, en el orden determinista del dominio
 * (EPIC 7 — Checkpoint 7.3).
 *
 * Es la consulta canónica de la colección: el índice /trabajos la recorre
 * entera, /trabajos/[slug] genera una ruta por entrada y getRelatedCases() la
 * filtra. Un archivo nuevo en src/content/cases/ aparece en las tres
 * superficies con solo publicarse, sin tocar un componente ni una constante.
 *
 * Un caso en `draft` no sale por aquí, así que no lista, no genera URL y no
 * entra al sitemap: la exclusión ocurre una vez, en la capa de acceso, y no en
 * cada página.
 *
 * NO construye rutas ni conoce la UI. La ruta pública de un caso la arma
 * buildCasePath(), y qué se muestra de él lo deciden los componentes.
 */
export async function getPublishedCases(): Promise<CollectionEntry<'cases'>[]> {
  const entries = await getCollection('cases', (entry) => !entry.data.draft);
  return entries.sort(compareCases);
}

/**
 * Casos publicados de un servicio, para las fichas de servicio (EPIC 4.0 —
 * Checkpoint 13). Usa la relación que ya declara cada caso en su frontmatter
 * (`service`, validado contra los IDs de src/data/services.ts por el enum de
 * content.config.ts): no existe ni debe existir una segunda tabla de
 * correspondencias servicio → casos.
 *
 * Devuelve la colección COMPLETA del servicio y ya no acepta un `limit`
 * (EPIC 7 — Checkpoint 7.3). Antes la ruta pedía 1 y los demás casos
 * publicados de ese servicio desaparecían sin señal: un trabajo real
 * publicado quedaba invisible porque una llamada lo recortaba en silencio.
 * Cuántos casos mostrar y cómo es una decisión de presentación, y ahora se
 * toma donde se ve (ServiceLayout muestra el primero completo y enlaza el
 * resto), no en la consulta.
 *
 * Invariante del schema: `evidence.result` es obligatorio (ver
 * src/content.config.ts), así que todo caso devuelto tiene al menos la
 * fotografía del resultado. Por eso no se filtra por ausencia de evidencia ni
 * se inventa una imagen de reemplazo. Lo que sí puede faltar es
 * `evidence.before`, y esa rama la resuelve la capa de presentación
 * (src/components/cases/CaseEvidence.astro), no esta consulta.
 */
export async function getRelatedCases(serviceId: string): Promise<CollectionEntry<'cases'>[]> {
  const published = await getPublishedCases();
  return published.filter((entry) => entry.data.service === serviceId);
}

/**
 * Ruta pública de un caso. Espeja src/pages/trabajos/[slug].astro: si esa
 * carpeta se renombra, este es el único punto a corregir.
 *
 * Recibe el `id` de la entrada de colección —el mismo valor que
 * getStaticPaths() usa como `params.slug`, derivado del nombre del archivo—,
 * así que un enlace construido con esta función no puede apuntar a una ruta
 * que el build no haya generado. El slug no se declara en el frontmatter: eso
 * sería una segunda fuente de verdad para el mismo dato.
 *
 * Mismo criterio y misma forma que buildServicePath() en
 * src/lib/content/services.ts.
 */
export function buildCasePath(id: string): string {
  return `/trabajos/${id}`;
}
