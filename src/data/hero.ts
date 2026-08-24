export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
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
};
