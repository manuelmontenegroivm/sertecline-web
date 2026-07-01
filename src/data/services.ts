export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  /** Nombre de ícono; TODO: definir set de íconos final */
  icon: string;
  featured: boolean;
  order: number;
}

// Servicio técnico de línea blanca a domicilio.
// Nota: este es el catálogo liviano usado en grillas/menús/home.
// Si un servicio necesita una página propia extensa, su contenido detallado
// vive en src/content/services/ (Content Collection) referenciado por `slug`.
export const services: Service[] = [
  {
    id: 'reparacion-lavadoras',
    slug: 'reparacion-lavadoras',
    title: 'Reparación de Lavadoras',
    shortDescription: 'TODO: descripción breve del servicio.',
    icon: 'washing-machine', // TODO: confirmar set de íconos
    featured: true,
    order: 1,
  },
  {
    id: 'mantencion-lavadoras',
    slug: 'mantencion-lavadoras',
    title: 'Mantención de Lavadoras',
    shortDescription: 'TODO: descripción breve del servicio.',
    icon: 'wrench', // TODO
    featured: true,
    order: 2,
  },
  {
    id: 'limpieza-lavadoras',
    slug: 'limpieza-lavadoras',
    title: 'Limpieza Profunda de Lavadoras',
    shortDescription: 'TODO: descripción breve del servicio.',
    icon: 'sparkles', // TODO
    featured: true,
    order: 3,
  },
  {
    id: 'reparacion-refrigeradores',
    slug: 'reparacion-refrigeradores',
    title: 'Reparación de Refrigeradores',
    shortDescription: 'TODO: descripción breve del servicio.',
    icon: 'snowflake', // TODO
    featured: true,
    order: 4,
  },
  {
    id: 'instalacion-linea-blanca',
    slug: 'instalacion-linea-blanca',
    title: 'Instalación de Línea Blanca',
    shortDescription: 'TODO: descripción breve del servicio.',
    icon: 'truck', // TODO
    featured: true,
    order: 5,
  },
  {
    id: 'reparacion-secadoras',
    slug: 'reparacion-secadoras',
    title: 'Reparación de Secadoras',
    shortDescription: 'TODO: descripción breve del servicio.', // TODO: confirmar si se ofrece este servicio
    icon: 'wind', // TODO
    featured: false,
    order: 6,
  },
  {
    id: 'reparacion-cocinas',
    slug: 'reparacion-cocinas',
    title: 'Reparación de Cocinas',
    shortDescription: 'TODO: descripción breve del servicio.', // TODO: confirmar si se ofrece este servicio
    icon: 'flame', // TODO
    featured: false,
    order: 7,
  },
  {
    id: 'reparacion-lavavajillas',
    slug: 'reparacion-lavavajillas',
    title: 'Reparación de Lavavajillas',
    shortDescription: 'TODO: descripción breve del servicio.', // TODO: confirmar si se ofrece este servicio
    icon: 'droplets', // TODO
    featured: false,
    order: 8,
  },
];
