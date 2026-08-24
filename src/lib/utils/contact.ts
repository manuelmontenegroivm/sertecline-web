// Derivación de los enlaces de contacto a partir del NAP (EPIC 4.0 — Checkpoint 12).
// Extraído del frontmatter de src/components/sections/Contact.astro, que era su
// único consumidor hasta que las fichas de servicio necesitaron el mismo par de
// acciones. El número real vive solo en src/data/contact.ts: ningún componente
// vuelve a escribirlo ni a normalizarlo por su cuenta.
//
// La normalización se conserva exactamente como estaba: `tel:` quita espacios y
// preserva el `+` (formato E.164), mientras que wa.me exige solo dígitos.
import { contactInfo } from '../../data/contact';

/**
 * Mensaje precargado cuando el contacto no viene de un contexto concreto: hoy
 * el CTA del hero y la sección Contacto de home, que comparten intención
 * genérica. Una ficha de servicio sí tiene contexto y pasa el suyo — ver
 * src/data/serviceCta.ts#whatsappMessageTemplate.
 *
 * No nombra una categoría de equipo. Decirlo aquí ("de línea blanca") dejaba
 * fuera a los calefones, que son prioridad comercial y no pertenecen a esa
 * categoría; el h1 de home ya resolvió lo mismo nombrando ambas (ver
 * src/data/hero.ts).
 */
export const DEFAULT_WHATSAPP_MESSAGE =
  'Hola, necesito ayuda con un equipo. Quiero consultar por una visita técnica.';

export function buildPhoneHref(): string {
  return `tel:${contactInfo.phone.replace(/\s+/g, '')}`;
}

export function buildWhatsappHref(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const whatsappNumber = contactInfo.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
