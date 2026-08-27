export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  /**
   * Encabeza la señal de confianza del hero. Los rótulos que le siguen NO se
   * escriben aquí: se leen de src/data/accreditations.ts#technicianAccreditations,
   * su única fuente. Ver el comentario de `trustNote` más abajo.
   */
  trustNote: string;
}

// Solo copy. Los destinos de los CTAs no viven aquí: el de WhatsApp se deriva
// del NAP en build (lib/utils/contact.ts#buildWhatsappHref) y el secundario es
// un ancla de la propia página, así que ambos los resuelve Hero.astro. Mismo
// reparto que src/data/serviceCta.ts, que guarda la plantilla del mensaje y
// deja el href al componente.
//
// Posicionamiento (EPIC 4.1 — Checkpoint 4.1.7): el h1 nombra "línea blanca y
// calefones" en vez de solo "línea blanca". Los calefones son prioridad
// comercial y no pertenecen a esa categoría, así que el término se acompaña en
// vez de sustituirse: sigue siendo la denominación reconocible del rubro. El
// badge aporta el modelo de atención —a domicilio— en lugar de repetir el h1.
// El subtítulo declara que las acciones dependen del equipo: ninguna superficie
// pública debe sugerir que reparación, mantención e instalación aplican por
// igual a todo el catálogo (misma regla que src/data/services.ts).
export const heroContent: HeroContent = {
  badge: 'Servicio técnico a domicilio',
  title: 'Servicio técnico de línea blanca y calefones en Santiago',
  subtitle:
    'Reparación, mantención e instalación según el tipo de equipo. Coordinamos una visita técnica y revisamos tu equipo a domicilio.',
  // El primario nombra el canal: el usuario sabe qué se abre antes de pulsar,
  // y es el mismo rótulo ya usado por ContactActions. "Solicitar diagnóstico"
  // sugería un formulario que no existe.
  primaryCtaLabel: 'Escríbenos por WhatsApp',
  secondaryCtaLabel: 'Ver servicios',
  // Señal de confianza above-the-fold (EPIC 5 — Checkpoint 5.2). El audit de
  // CP 5.1 midió que las acreditaciones —el único respaldo verificable del
  // negocio— aparecían al 85% del scroll, mientras el primer viewport no tenía
  // ninguna señal de confianza.
  //
  // Por qué el copy vive aquí y los rótulos no: es el mismo reparto que ya
  // aplican src/data/coverageSection.ts sobre areas.ts y src/data/servicesSection.ts
  // sobre services.ts —el dato en su catálogo, el encuadre editorial junto al
  // resto del copy de su superficie—. 'Instalador de gas clase 3' y
  // 'Instalador eléctrico clase D' se importan de accreditations.ts y no se
  // repiten en ningún otro archivo.
  //
  // Deliberadamente NO reutiliza accreditationsContent.intro: esa frase la
  // imprime la sección Acreditaciones más abajo en la misma página, y
  // renderizarla dos veces sería duplicación literal de contenido comercial.
  // Esta versión es más corta porque encabeza una franja subordinada, no una
  // sección.
  //
  // La atribución es lo único que esta frase no puede perder al acortarse: el
  // sujeto es el técnico y la acreditación es "personal". Ninguna redacción
  // futura puede derivar de aquí que Sertecline esté certificada, acreditada o
  // autorizada — misma regla que documenta accreditations.ts, que además
  // prohíbe publicar folio, registro, organismo, vigencia o documento.
  trustNote: 'Técnico con acreditación personal:',
};
