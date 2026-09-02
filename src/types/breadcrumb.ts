/**
 * Elemento del rastro de navegación de una página con jerarquía.
 *
 * Declaración única compartida por el `<ol>` visible
 * (components/layout/Breadcrumbs.astro) y por el BreadcrumbList JSON-LD
 * (lib/seo/schema.ts): el mismo array alimenta ambos, así que el rastro
 * estructurado no puede describir una jerarquía distinta de la que el lector
 * ve.
 *
 * Se llamaba `ServiceBreadcrumb` mientras las fichas de servicio eran la única
 * superficie con rastro. Con la página de detalle de un trabajo (EPIC 7 —
 * Checkpoint 7.3) son dos, y un tipo que nombra a una de ellas describiría mal
 * a la otra. El contrato no cambia: mismo shape, mismos consumidores, más uno.
 */
export interface Breadcrumb {
  name: string;
  /**
   * Ruta relativa al raíz del sitio de un ancestro navegable.
   *
   * Ausente únicamente en el elemento actual, que siempre es el último. Que la
   * ausencia del dato defina el elemento actual evita repetir un
   * `index === length - 1` en el render y en el schema: el `<ol>` lo muestra
   * como texto con aria-current y el JSON-LD le omite `item`, ambos por la
   * misma razón y sin coordinarse.
   */
  href?: string;
}
