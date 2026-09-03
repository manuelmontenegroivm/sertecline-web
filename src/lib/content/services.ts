import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { getServiceById, services as serviceCatalog, type Service } from '../../data/services';

/**
 * Entrada del catálogo a la que pertenece un contenido de servicio, o error de
 * build si no existe (EPIC 8 — Checkpoint 8.2).
 *
 * INVARIANTE: `src/content/services/<id>.mdx` → `<id>` DEBE existir en
 * src/data/services.ts. El catálogo es la identidad del servicio —su
 * denominación pública, su ícono, su pertenencia a la portada—; la colección
 * solo aporta el cuerpo editorial. Un archivo cuyo nombre no corresponde a
 * ninguna entrada del catálogo no es un servicio con contenido: es un servicio
 * que no existe.
 *
 * Antes eso generaba página igual. `[slug].astro` resolvía el catálogo con
 * `.find()` y caía a `service.id` cuando no encontraba nada, así que un typo en
 * el nombre del archivo publicaba una ficha real, indexable y en el sitemap,
 * titulada con el slug técnico ("reparacion-lavdoras") y sin `seoTitle`. La
 * ausencia del dato se rellenaba con el identificador en vez de detenerse.
 *
 * Por qué aquí y no en el frontmatter: agregar un `serviceId:` al MDX sería
 * duplicar el nombre del archivo dentro del propio archivo —un segundo lugar
 * donde la verdad puede desincronizarse— y no cerraría nada, porque el que
 * genera la ruta sigue siendo el ID de la entrada. Y tampoco en
 * content.config.ts: el schema valida el frontmatter, no ve el ID de la
 * entrada, y derivarlo ahí obligaría a reimplementar la generación de IDs del
 * loader de Astro. Esta capa es la que ya declara ser el único punto de consulta
 * de la colección, así que es donde el invariante alcanza a todos sus
 * consumidores sin que ninguno tenga que acordarse de comprobarlo.
 *
 * Devuelve la entrada además de validarla: la ficha necesita su `title` y su
 * `seoTitle`, y resolver el catálogo dos veces —una para comprobar, otra para
 * leer— dejaría abierta la posibilidad de leerlo sin comprobarlo. Con esta
 * función el fallback al slug técnico deja de existir porque deja de haber
 * `undefined` que rellenar.
 */
export function getServiceCatalogEntry(id: string): Service {
  const entry = getServiceById(id);

  if (!entry) {
    throw new Error(
      `Contenido de servicio sin entrada en el catálogo: "${id}". ` +
        `src/content/services/${id}.mdx no corresponde a ningún servicio de src/data/services.ts. ` +
        `Corrige el nombre del archivo o agrega el servicio al catálogo — no se publica una ficha ` +
        `cuya identidad pública sea su slug técnico.`
    );
  }

  return entry;
}

// Único punto de consulta de la collection `services`. El catálogo (title,
// shortDescription, featured) vive en src/data/services.ts — este módulo solo
// resuelve el contenido editorial largo (metaDescription, intro, faqs, etc.).
//
// Aquí se comprueba el invariante de catálogo, una vez y para todos los
// consumidores. Se comprueba sobre TODAS las entradas y no solo sobre las
// publicadas: un archivo en `draft` cuyo nombre no existe en el catálogo es el
// mismo error de contenido, y descubrirlo al quitar el borrador —cuando ya es
// una publicación— sería descubrirlo tarde.
export async function getAllServices(): Promise<CollectionEntry<'services'>[]> {
  const entries = await getCollection('services');

  for (const entry of entries) {
    getServiceCatalogEntry(entry.id);
  }

  return entries;
}

// Deriva de getAllServices() y no de un segundo getCollection() con filtro: así
// el invariante de catálogo se comprueba también por esta vía, que es la que
// usan getStaticPaths() y todas las superficies del sitio.
export async function getPublishedServices(): Promise<CollectionEntry<'services'>[]> {
  const entries = await getAllServices();
  return entries.filter((entry) => !entry.data.draft);
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
 *
 * Termina en barra porque esa es la forma canónica de la ruta: es la que el
 * build emite (`servicios/<id>/index.html`), la que declara
 * `<link rel="canonical">` y la que publica el sitemap. Enlazar sin ella
 * mandaba a cada visita —y a cada rastreador— por una redirección hacia la
 * URL que el propio sitio declara como autoritativa (EPIC 8 — CP 8.5.1).
 */
export function buildServicePath(id: string): string {
  return `/servicios/${id}/`;
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
