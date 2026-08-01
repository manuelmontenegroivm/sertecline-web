/**
 * Par pregunta/respuesta de una ficha de servicio.
 *
 * Declaración única compartida por el render visible (ServiceLayout →
 * FaqItem) y por el FAQPage JSON-LD (lib/seo/schema.ts): el mismo array
 * alimenta ambos, de modo que el dato estructurado no pueda describir algo
 * que no esté en el HTML.
 *
 * Estructuralmente compatible con el frontmatter `faqs` validado por Zod en
 * src/content.config.ts, que es su origen real — este tipo no lo reemplaza,
 * solo le da nombre en las capas que lo consumen.
 *
 * No confundir con `Faq` de src/data/faqs.ts: ese modelo alimenta la sección
 * de preguntas frecuentes de la home y lleva `id` propio para su listado.
 * Otro dataset, otra responsabilidad — deliberadamente sin unificar.
 */
export interface ServiceFaq {
  question: string;
  answer: string;
}
