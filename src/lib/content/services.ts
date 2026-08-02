import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { services as serviceCatalog, type Service } from '../../data/services';

// Único punto de consulta de la collection `services`. El catálogo (title,
// shortDescription, featured) vive en src/data/services.ts — este módulo solo
// resuelve el contenido editorial largo (metaDescription, intro, faqs, etc.).
export async function getAllServices(): Promise<CollectionEntry<'services'>[]> {
  return getCollection('services');
}

export async function getPublishedServices(): Promise<CollectionEntry<'services'>[]> {
  return getCollection('services', (entry) => !entry.data.draft);
}

export async function getServiceBySlug(
  slug: string
): Promise<CollectionEntry<'services'> | undefined> {
  const services = await getPublishedServices();
  return services.find((service) => service.id === slug);
}

/**
 * Un servicio del catálogo tal como lo consume una grilla de tarjetas
 * (EPIC 4.0 — Checkpoint 14).
 *
 * `href` está presente si —y solo si— el servicio tiene ficha publicada. La
 * ausencia del dato *es* el estado "sin página": no existe ni debe existir una
 * bandera aparte (`published`, `hasPage`) que lo declare, porque sería un
 * segundo lugar donde la verdad puede desincronizarse del contenido real.
 */
export interface ServiceCardModel {
  service: Service;
  href?: string;
}

/**
 * Ruta de una ficha de servicio. Espeja src/pages/servicios/[slug].astro: si
 * esa carpeta se renombra, este es el único punto a corregir.
 *
 * Recibe el `id` de la entrada de colección — el mismo valor que
 * getStaticPaths() usa como `params.slug` —, nunca el `slug` del catálogo: hoy
 * son idénticos, pero solo el primero es el que el build realmente genera, así
 * que un enlace construido así no puede apuntar a una ruta inexistente.
 */
export function buildServicePath(id: string): string {
  return `/servicios/${id}`;
}

// IDs con ficha publicada. Set y no array: quien arma una grilla consulta una
// vez por servicio y el lookup debe ser O(1) aunque el catálogo crezca.
async function getPublishedServiceIds(): Promise<Set<string>> {
  const published = await getPublishedServices();
  return new Set(published.map((service) => service.id));
}

/**
 * Servicios de la sección "Nuestros servicios" de home: los `featured` del
 * catálogo, ordenados por `order`, cada uno con su `href` resuelto.
 *
 * El filtro y el orden viven aquí y no en el frontmatter de Services.astro
 * (regla de CLAUDE.md: la obtención/transformación de datos vive en src/lib/).
 *
 * La publicación se deriva de getPublishedServices(), exactamente la misma
 * función con la que src/pages/servicios/[slug].astro genera sus rutas. Por eso
 * enlazar un servicio sin página es imposible por construcción, y publicar o
 * despublicar una ficha (`draft` en su MDX) mueve la ruta y el enlace en el
 * mismo build. Sin condicionales por servicio: agregar el servicio número 20 no
 * toca este archivo.
 *
 * `.filter()` devuelve un array nuevo, así que el `.sort()` posterior no
 * reordena el catálogo importado.
 */
export async function getFeaturedServiceCards(): Promise<ServiceCardModel[]> {
  const publishedIds = await getPublishedServiceIds();

  return serviceCatalog
    .filter((service) => service.featured)
    .sort((a, b) => a.order - b.order)
    .map((service) => ({
      service,
      href: publishedIds.has(service.id) ? buildServicePath(service.id) : undefined,
    }));
}
