// Derivación de los enlaces de contacto a partir del NAP (EPIC 4.0 — Checkpoint 12).
// Extraído del frontmatter de src/components/sections/Contact.astro, que era su
// único consumidor hasta que las fichas de servicio necesitaron el mismo par de
// acciones. El número real vive solo en src/data/contact.ts: ningún componente
// vuelve a escribirlo ni a normalizarlo por su cuenta.
//
// La normalización se conserva exactamente como estaba: `tel:` quita espacios y
// preserva el `+` (formato E.164), mientras que wa.me exige solo dígitos.
import { contactInfo } from '../../data/contact';

/** Mensaje precargado cuando el contacto no viene de un contexto concreto. */
export const DEFAULT_WHATSAPP_MESSAGE = 'Hola, necesito ayuda con un equipo de línea blanca.';

export function buildPhoneHref(): string {
  return `tel:${contactInfo.phone.replace(/\s+/g, '')}`;
}

export function buildWhatsappHref(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const whatsappNumber = contactInfo.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
