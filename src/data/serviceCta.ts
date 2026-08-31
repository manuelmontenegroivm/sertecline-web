export interface ServiceCtaContent {
  eyebrow: string;
  heading: string;
  intro: string;
  /**
   * Plantilla del mensaje precargado de WhatsApp. `{servicio}` se reemplaza con
   * el nombre resuelto del servicio (resolveServiceName) en ServiceLayout.astro,
   * que la interpola una sola vez para las dos acciones de contacto de la ficha
   * —la temprana del hero y la de cierre— y así no pueden divergir.
   */
  whatsappMessageTemplate: string;
}

// Copy del CTA que cierra cada ficha de servicio (EPIC 4.0 — Checkpoint 12).
// Mismo patrón que contactSection.ts, faqSection.ts y coverageSection.ts:
// copy separado del NAP, que vive en src/data/contact.ts.
// Deliberadamente no declara precios, plazos de respuesta, garantías, horarios
// ni disponibilidad: nada de eso está confirmado por el negocio. Tampoco
// declara `note` (a diferencia de contactSection.ts) — `intro` ya dice qué
// datos conviene tener a mano, y repetirlo abajo sería relleno.
export const serviceCtaContent: ServiceCtaContent = {
  eyebrow: 'Hablemos',
  heading: '¿Conversamos sobre tu equipo?',
  intro:
    'Cuéntanos la marca, el modelo y qué necesitas revisar, limpiar o reparar, y vemos cómo ayudarte.',
  whatsappMessageTemplate: 'Hola, necesito ayuda con: {servicio}.',
} as const;
