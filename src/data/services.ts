export interface Service {
  id: string;
  slug: string;
  title: string;
  /**
   * Denominación editorial del servicio para superficies extensas — h1, <title>,
   * breadcrumb, JSON-LD y mensaje de contacto. Se define cuando `title` (pensado
   * para UI corta: Badge, ServiceCard) no sirve tal cual fuera de esa UI: porque
   * omite la entidad principal del servicio y resulta ambiguo, o porque su
   * formato de rótulo no corresponde a un texto corrido. Ver
   * src/lib/seo/services.ts#resolveServiceName. Si no se define, esas
   * superficies reutilizan `title`.
   */
  seoTitle?: string;
  shortDescription: string;
  /** Nombre de ícono Lucide (kebab-case) resuelto por ServiceIcon.astro. */
  icon: string;
  featured: boolean;
  order: number;
}

/**
 * Catálogo de servicios de Sertecline (EPIC 4.1 — Checkpoint 4.1.6).
 *
 * Qué es una entrada: una intención de contratación sobre un equipo. Una
 * intención merece entrada propia cuando la búsqueda y la contratación están
 * suficientemente diferenciadas *y* existe conocimiento técnico real para
 * desarrollarla sin caer en contenido delgado. Ambas condiciones, no una.
 * No hay una regla por tipo de trabajo: que un equipo tenga entrada de
 * reparación no implica que también deba tener una de mantención o
 * instalación, ni al revés. Cuando la intención no se sostiene sola, el trabajo
 * se cubre como sección dentro de la ficha del equipo.
 *
 * Por eso calefones tiene tres entradas (reparación, mantención e instalación
 * son decisiones de compra distintas) y secadoras o lavavajillas tienen una:
 * su mantención es real y periódica, pero comparte el cuerpo técnico de la
 * reparación del mismo equipo.
 *
 * Una entrada aquí NO crea una URL. Las rutas las genera
 * src/pages/servicios/[slug].astro desde la colección `services`, es decir
 * desde los archivos de src/content/services/ — el nombre del archivo es el
 * slug publicado. Un servicio sin MDX aparece como tarjeta sin enlace (ver
 * src/lib/content/services.ts#ServiceCardModel) y no genera página ni entra al
 * sitemap. El catálogo puede por lo tanto ir por delante del contenido sin
 * riesgo de publicar fichas vacías.
 *
 * Corolario para los dos servicios ya publicados (`reparacion-lavadoras` y
 * `limpieza-lavadoras`): su `id` y su `seoTitle` son superficie viva. El `id`
 * resuelve el título de la ficha en [slug].astro y valida `cases.service` en
 * content.config.ts; el `seoTitle` alimenta el h1, el <title>, el nombre del
 * nodo Service y el rastro de navegación. `title` y `shortDescription`, en
 * cambio, solo se ven en la tarjeta de home.
 *
 * `featured` marca los servicios visibles en la sección "Nuestros servicios"
 * de home; `order` los ordena entre sí. Hoy son seis y cubren los equipos
 * comercialmente prioritarios — no la totalidad del catálogo, que es más amplio
 * de lo que esa sección debe mostrar.
 *
 * Fuera del catálogo por ahora (DEFER): mantención de secadoras y de
 * lavavajillas por separado; instalación de lavadoras, secadoras y lavavajillas
 * —no confirmada como intención independiente—; termos eléctricos; aire
 * acondicionado, que es una capacidad real pero no es línea blanca y no debe
 * diluir el foco temático del catálogo.
 *
 * Deuda registrada: `slug` no tiene ningún consumidor (las rutas usan el `id`
 * de colección — ver src/lib/content/services.ts#buildServicePath). Su
 * eliminación es una limpieza de modelo aparte de esta realineación.
 *
 * TIPADO (EPIC 6 — Checkpoint 6.4). El array literal se declara aquí con
 * `as const satisfies readonly Service[]` y se exporta abajo como
 * `readonly Service[]`. `satisfies` sigue validando cada entrada contra
 * `Service` —un campo mal escrito o faltante rompe el build igual que antes—,
 * pero a diferencia de una anotación no ensancha los literales a `string`, así
 * que los `id` reales sobreviven al tipo y `ServiceId` puede derivarse de ellos.
 * `as const` es lo que los preserva: con `satisfies` a secas el tipo contextual
 * `Service['id']` es `string` y el ensanchamiento ocurre igual — comprobado con
 * el compilador del proyecto antes de elegir esta forma.
 *
 * Por qué la constante literal es local y la exportada lleva anotación: si se
 * exportara el array const tal cual, cada entrada sería su propio tipo literal y
 * `.find()` devolvería la unión de las doce. Los consumidores que leen un campo
 * opcional dejarían de compilar —`catalogEntry?.seoTitle` en [slug].astro falla
 * contra la entrada de refrigeradores, que no lo declara—, y el tipado se
 * cobraría en superficies que este checkpoint no debe tocar. Con la anotación
 * `readonly Service[]` el contrato público del catálogo queda como estaba: doce
 * `Service` uniformes, con sus opcionales declarados. La información literal se
 * usa solo para derivar `ServiceId`, que es lo único que se necesitaba.
 *
 * `readonly` y no `Service[]`: es lo correcto para una fuente única y nadie lo
 * muta hoy. Los dos `.sort()` del repositorio (Footer.astro y
 * lib/content/services.ts) operan sobre el array nuevo que devuelve `.filter()`,
 * como sus propios comentarios ya documentan, así que ninguno ordenaba este
 * array.
 */
const serviceCatalog = [
  {
    id: 'reparacion-lavadoras',
    slug: 'reparacion-lavadoras',
    title: 'Reparación de Lavadoras',
    seoTitle: 'Reparación de lavadoras',
    shortDescription: 'Diagnóstico y reparación de fallas comunes en lavadoras.',
    icon: 'washing-machine',
    featured: true,
    order: 1,
  },
  {
    id: 'limpieza-lavadoras',
    slug: 'limpieza-lavadoras',
    // Único `title` de la grilla que no nombraba el equipo. No toca la ficha
    // publicada: su h1 y su <title> salen de `seoTitle`, que no cambia.
    title: 'Mantención y Limpieza de Lavadoras',
    seoTitle: 'Limpieza y mantención de lavadoras',
    shortDescription:
      'Mantención preventiva y limpieza técnica para cuidar el funcionamiento del equipo.',
    icon: 'sparkles',
    featured: true,
    order: 2,
  },
  {
    id: 'reparacion-calefones',
    slug: 'reparacion-calefones',
    title: 'Reparación de Calefones',
    seoTitle: 'Reparación de calefones',
    shortDescription: 'Diagnóstico y reparación de fallas comunes en calefones.',
    icon: 'heater',
    featured: true,
    order: 3,
  },
  {
    id: 'reparacion-secadoras',
    slug: 'reparacion-secadoras',
    title: 'Reparación de Secadoras',
    seoTitle: 'Reparación de secadoras',
    shortDescription: 'Diagnóstico y reparación de fallas comunes en secadoras.',
    icon: 'wind',
    featured: true,
    order: 4,
  },
  {
    id: 'reparacion-lavavajillas',
    slug: 'reparacion-lavavajillas',
    title: 'Reparación de Lavavajillas',
    seoTitle: 'Reparación de lavavajillas',
    shortDescription: 'Diagnóstico y reparación de fallas comunes en lavavajillas.',
    icon: 'droplets',
    featured: true,
    order: 5,
  },
  {
    id: 'reparacion-cocinas',
    slug: 'reparacion-cocinas',
    title: 'Reparación de Cocinas',
    seoTitle: 'Reparación de cocinas',
    shortDescription: 'Diagnóstico y reparación de fallas comunes en cocinas.',
    icon: 'flame',
    featured: true,
    order: 6,
  },
  // Cocinas, encimeras y hornos son entidades separadas porque son equipos
  // distintos, no variantes de uno. La redacción que fija el referente de cada
  // ficha —qué cubre cada una y cómo se enlazan entre sí— se resuelve al
  // escribir su contenido, no aquí: por eso ninguna declara todavía un
  // `seoTitle` que las delimite.
  {
    id: 'mantencion-calefones',
    slug: 'mantencion-calefones',
    title: 'Mantención de Calefones',
    seoTitle: 'Mantención de calefones',
    shortDescription: 'Mantención preventiva de calefones con visita técnica agendada.',
    icon: 'calendar-check',
    featured: false,
    order: 7,
  },
  {
    id: 'instalacion-calefones',
    slug: 'instalacion-calefones',
    title: 'Instalación de Calefones',
    seoTitle: 'Instalación de calefones',
    shortDescription: 'Instalación de calefones con visita técnica agendada.',
    icon: 'hard-hat',
    featured: false,
    order: 8,
  },
  {
    id: 'reparacion-encimeras',
    slug: 'reparacion-encimeras',
    title: 'Reparación de Encimeras',
    seoTitle: 'Reparación de encimeras',
    shortDescription: 'Diagnóstico y reparación de encimeras eléctricas y a gas.',
    icon: 'grid-2x2',
    featured: false,
    order: 9,
  },
  {
    id: 'reparacion-hornos',
    slug: 'reparacion-hornos',
    title: 'Reparación de Hornos',
    seoTitle: 'Reparación de hornos',
    shortDescription: 'Diagnóstico y reparación de fallas comunes en hornos.',
    icon: 'microwave',
    featured: false,
    order: 10,
  },
  {
    id: 'instalacion-linea-blanca',
    slug: 'instalacion-linea-blanca',
    title: 'Instalación y Revisión',
    seoTitle: 'Instalación de línea blanca',
    shortDescription: 'Instalación y revisión general de equipos de línea blanca.',
    icon: 'wrench',
    featured: false,
    order: 11,
  },
  // Se atiende, no se promociona: el negocio redujo el foco comercial sobre
  // refrigeradores. Sale de home pero permanece en el catálogo, porque la
  // capacidad sigue siendo real y este archivo es donde se registra.
  {
    id: 'reparacion-refrigeradores',
    slug: 'reparacion-refrigeradores',
    title: 'Reparación de Refrigeradores',
    shortDescription: 'Diagnóstico y reparación de fallas comunes en refrigeradores.',
    icon: 'refrigerator',
    featured: false,
    order: 12,
  },
] as const satisfies readonly Service[];

/**
 * Unión de los `id` realmente presentes en el catálogo, derivada del propio
 * array (EPIC 6 — Checkpoint 6.4). No es una segunda lista: si arriba se agrega,
 * renombra o elimina un servicio, este tipo cambia con él en el mismo commit,
 * porque no hay nada que mantener sincronizado a mano.
 *
 * Existe porque un mapping editorial que referencia servicios por `id` —hoy
 * src/data/accreditations.ts#servicesWithAccreditations— necesita que un `id`
 * inexistente sea un error de compilación y no un bloque que simplemente deja
 * de renderizarse en silencio. `content.config.ts` ya hacía la comprobación
 * equivalente en tiempo de ejecución para el frontmatter de las colecciones
 * (`z.enum(serviceIds)`); esto es la misma garantía para el código TypeScript.
 */
export type ServiceId = (typeof serviceCatalog)[number]['id'];

export const services: readonly Service[] = serviceCatalog;

/**
 * Resuelve un `id` contra el catálogo, o `undefined` si no existe
 * (EPIC 7 — Checkpoint 7.3).
 *
 * Para superficies que solo necesitan el rótulo del servicio al que pertenece
 * otro contenido —una tarjeta de trabajo, la ficha de un trabajo—: ahí el `id`
 * llega desde el frontmatter de un Case, ya validado contra este mismo catálogo
 * por el enum de src/content.config.ts, así que un ID inexistente falla el build
 * mucho antes de llegar a un componente.
 *
 * Devolver el `Service` completo y no su `title` deja que cada superficie elija
 * el campo que le corresponde (`title` para UI compacta, `seoTitle` para
 * denominaciones extensas — ver #seoTitle arriba) sin multiplicar funciones de
 * lectura.
 *
 * Mismo criterio y misma forma que getPlaceById() en src/data/places.ts. NO
 * resuelve la ruta de la ficha: que un servicio exista en el catálogo no
 * significa que tenga página publicada, y esa pregunta la responde
 * src/lib/content/services.ts contra la colección.
 */
export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
