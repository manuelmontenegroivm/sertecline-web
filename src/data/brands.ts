export interface Brand {
  id: string;
  name: string;
}

/**
 * Catálogo de marcas de Sertecline (EPIC 4.1 — Checkpoint 4.1.5).
 *
 * Estar aquí indica que Sertecline atiende equipos de esa marca. No implica
 * servicio técnico oficial, servicio autorizado por el fabricante, afiliación
 * ni representación de la marca.
 *
 * Solo marcas confirmadas por el negocio. La cobertura no se infiere desde otra
 * marca —grupo empresarial, similitud técnica o disponibilidad de repuestos no
 * son evidencia— ni se declara como placeholder a la espera de confirmación.
 *
 * Fuente única: estos IDs son el enum que valida `services.relatedBrands` y
 * `cases.brand` en src/content.config.ts. Una marca ausente de este archivo no
 * puede referenciarse desde contenido: el build falla.
 *
 * Cada fila declara `id` y `name`, nada más. No hay campo de logo: el proyecto
 * no tiene assets de logo de marca, y una ruta en texto plano hacia `src/` no
 * es un asset válido en Astro. Publicarlos exigiría astro:assets, no un string.
 *
 * Orden: ASCII ascendente por `id`. Determinista entre máquinas de build (mismo
 * criterio que src/data/areas.ts) y neutral: el orden físico no comunica
 * prioridad comercial ni jerarquía entre marcas.
 */
export const brands: Brand[] = [
  { id: 'bosch', name: 'Bosch' },
  { id: 'fensa', name: 'Fensa' },
  { id: 'junkers', name: 'Junkers' },
  { id: 'lg', name: 'LG' },
  { id: 'mabe', name: 'Mabe' },
  { id: 'midea', name: 'Midea' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'sindelen', name: 'Sindelen' },
  { id: 'teka', name: 'Teka' },
];
