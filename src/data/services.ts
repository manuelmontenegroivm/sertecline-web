export interface Service {
  id: string;
  slug: string;
  title: string;
  /**
   * Denominación completa para el <title> de buscador. Solo se define cuando
   * `title` (pensado para UI corta: Badge, ServiceCard) omite la entidad
   * principal del servicio y por eso resulta ambiguo como <title> — ver
   * src/lib/seo/services.ts#buildServiceSeoTitle. Si no se define, el SEO
   * reutiliza `title` tal cual.
   */
  seoTitle?: string;
  shortDescription: string;
  /** Nombre de ícono Lucide (kebab-case) resuelto por ServiceIcon.astro. */
  icon: string;
  featured: boolean;
  order: number;
}

// Servicio técnico de línea blanca a domicilio.
// Nota: este es el catálogo liviano usado en grillas/menús/home.
// `featured` marca los servicios que se muestran en la sección "Nuestros
// servicios" de la home (EPIC 3.7) — mismo mecanismo que `featured` en
// content/cases. `order` solo ordena entre sí a los `featured: true`.
// Si un servicio necesita una página propia extensa, su contenido detallado
// vive en src/content/services/ (Content Collection) referenciado por `slug`.
export const services: Service[] = [
  {
    id: 'reparacion-lavadoras',
    slug: 'reparacion-lavadoras',
    title: 'Reparación de Lavadoras',
    shortDescription: 'Diagnóstico y reparación de fallas comunes en lavadoras.',
    icon: 'washing-machine',
    featured: true,
    order: 1,
  },
  {
    id: 'limpieza-lavadoras',
    slug: 'limpieza-lavadoras',
    title: 'Mantención y Limpieza',
    seoTitle: 'Limpieza y mantención de lavadoras',
    shortDescription:
      'Mantención preventiva y limpieza técnica para cuidar el funcionamiento del equipo.',
    icon: 'sparkles',
    featured: true,
    order: 2,
  },
  {
    id: 'reparacion-refrigeradores',
    slug: 'reparacion-refrigeradores',
    title: 'Reparación de Refrigeradores',
    shortDescription: 'Diagnóstico y reparación de fallas comunes en refrigeradores.',
    icon: 'refrigerator',
    featured: true,
    order: 3,
  },
  {
    id: 'reparacion-secadoras',
    slug: 'reparacion-secadoras',
    title: 'Reparación de Secadoras',
    shortDescription: 'Diagnóstico y reparación de fallas comunes en secadoras.',
    icon: 'wind',
    featured: true,
    order: 4,
  },
  {
    id: 'reparacion-cocinas',
    slug: 'reparacion-cocinas',
    title: 'Reparación de Cocinas',
    shortDescription: 'Diagnóstico y reparación de fallas comunes en cocinas.',
    icon: 'flame',
    featured: true,
    order: 5,
  },
  {
    id: 'instalacion-linea-blanca',
    slug: 'instalacion-linea-blanca',
    title: 'Instalación y Revisión',
    shortDescription: 'Instalación y revisión general de equipos de línea blanca.',
    icon: 'wrench',
    featured: true,
    order: 6,
  },
  {
    id: 'mantencion-lavadoras',
    slug: 'mantencion-lavadoras',
    title: 'Mantención de Lavadoras',
    shortDescription: 'TODO: descripción breve del servicio.',
    icon: 'wrench',
    featured: false,
    order: 7,
  },
  {
    id: 'reparacion-lavavajillas',
    slug: 'reparacion-lavavajillas',
    title: 'Reparación de Lavavajillas',
    shortDescription: 'TODO: descripción breve del servicio.', // TODO: confirmar si se ofrece este servicio
    icon: 'droplets',
    featured: false,
    order: 8,
  },
];
