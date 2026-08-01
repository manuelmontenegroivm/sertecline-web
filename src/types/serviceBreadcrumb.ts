/**
 * Elemento del rastro de navegación de una ficha de servicio.
 *
 * Declaración única compartida por el `<ol>` visible (ServiceLayout) y por el
 * BreadcrumbList JSON-LD (lib/seo/schema.ts): el mismo array alimenta ambos,
 * así que el rastro estructurado no puede describir una jerarquía distinta de
 * la que el lector ve.
 */
export interface ServiceBreadcrumb {
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
