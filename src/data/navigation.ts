export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// TODO: confirmar estructura final de menú (¿dropdown de servicios?, ¿casos de éxito?)
export const primaryNav: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Nosotros', href: '/nosotros' }, // TODO: confirmar si existirá esta página
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
];

export const footerNav: NavItem[] = [
  { label: 'Aviso legal', href: '/aviso-legal' },
  { label: 'Política de privacidad', href: '/politica-privacidad' },
];
