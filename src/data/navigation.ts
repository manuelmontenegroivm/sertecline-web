export interface NavItem {
  label: string;
  href: string;
  /** false mientras no exista una página o sección real para este destino — ver EPIC 3.5. */
  available: boolean;
  external?: boolean;
}

// El href de los ítems no disponibles queda como referencia para la épica que
// construya ese destino (página o sección con ese id). No se renderizan hasta
// que `available` pase a `true`.
export const primaryNav: NavItem[] = [
  { label: 'Servicios', href: '/#servicios', available: true }, // EPIC 3.7: ancla a la sección Services en home; promover a /servicios cuando exista esa página
  { label: 'Trabajos', href: '/#trabajos', available: true }, // EPIC 3.6.2: ancla a la sección FeaturedWork en home
  { label: 'Cobertura', href: '/#cobertura', available: true }, // EPIC 3.8: ancla a la sección Coverage en home; promover a /comunas cuando exista esa página
  { label: 'Mantención', href: '#mantencion', available: false },
  { label: 'Contacto', href: '/#contacto', available: true }, // EPIC 3.10: ancla a la sección Contact en home; phone/whatsapp confirmados en src/data/contact.ts
];

export const availableNav: NavItem[] = primaryNav.filter((item) => item.available);

export const footerNav: NavItem[] = [
  { label: 'Aviso legal', href: '/aviso-legal', available: false },
  { label: 'Política de privacidad', href: '/politica-privacidad', available: false },
];
