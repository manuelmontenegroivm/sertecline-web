export interface FaqSectionContent {
  eyebrow: string;
  heading: string;
  intro: string;
  note: string;
}

// Copy de la sección "Preguntas frecuentes" (home). Mismo patrón que
// coverageSectionContent.ts y servicesSectionContent.ts: contenido editorial
// separado del dato de negocio, que vive en src/data/faqs.ts.
export const faqSectionContent: FaqSectionContent = {
  eyebrow: 'Resolvemos tus dudas',
  heading: 'Preguntas frecuentes',
  intro:
    'Respuestas breves y directas sobre cómo trabajamos. Si tu duda no está aquí, escríbenos y te ayudamos a resolverla.',
  note: '¿Tienes otra pregunta? Contáctanos y te respondemos directamente.',
};
