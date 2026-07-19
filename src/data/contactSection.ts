export interface ContactSectionContent {
  eyebrow: string;
  heading: string;
  intro: string;
  note: string;
}

// Copy de la sección "Contacto" (home). Mismo patrón que faqSectionContent.ts,
// coverageSectionContent.ts y servicesSectionContent.ts: contenido editorial
// separado del NAP, que vive en src/data/contact.ts.
export const contactSectionContent: ContactSectionContent = {
  eyebrow: 'Hablemos',
  heading: '¿Necesitas ayuda con tu equipo?',
  intro: 'Cuéntanos qué equipo presenta el problema y revisaremos cómo ayudarte.',
  note: 'Ten a mano la marca, el modelo y una breve descripción de la falla.',
} as const;
