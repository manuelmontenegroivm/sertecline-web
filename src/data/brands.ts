export interface Brand {
  id: string;
  name: string;
  /** Ruta al logo en src/assets/images/brand/ */
  logo: string;
  url?: string;
}

// Marcas de línea blanca atendidas por Sertecline.
// TODO: agregar los archivos de logo reales en src/assets/images/brand/
export const brands: Brand[] = [
  { id: 'lg', name: 'LG', logo: '/src/assets/images/brand/lg.svg' },
  { id: 'samsung', name: 'Samsung', logo: '/src/assets/images/brand/samsung.svg' },
  { id: 'mademsa', name: 'Mademsa', logo: '/src/assets/images/brand/mademsa.svg' },
  { id: 'fensa', name: 'Fensa', logo: '/src/assets/images/brand/fensa.svg' },
  { id: 'bosch', name: 'Bosch', logo: '/src/assets/images/brand/bosch.svg' },
  { id: 'whirlpool', name: 'Whirlpool', logo: '/src/assets/images/brand/whirlpool.svg' },
  { id: 'electrolux', name: 'Electrolux', logo: '/src/assets/images/brand/electrolux.svg' },
  { id: 'mabe', name: 'Mabe', logo: '/src/assets/images/brand/mabe.svg' },
  { id: 'daewoo', name: 'Daewoo', logo: '/src/assets/images/brand/daewoo.svg' },
  { id: 'sindelen', name: 'Sindelen', logo: '/src/assets/images/brand/sindelen.svg' },
  {
    id: 'ursus-trotter',
    name: 'Ursus Trotter',
    logo: '/src/assets/images/brand/ursus-trotter.svg',
  },
];
