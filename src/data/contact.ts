export interface Address {
  street: string;
  comuna: string;
  region: string;
  country: string;
  postalCode?: string;
}

export interface SocialLink {
  platform: 'instagram' | 'linkedin' | 'facebook' | 'whatsapp';
  url: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email?: string;
  address?: Address;
  hours?: string;
  social?: SocialLink[];
}

// NAP: solo se declaran los campos ya confirmados por el negocio (EPIC 3.10).
// email, address, hours y social quedan sin declarar (no `undefined` explícito,
// no placeholder) hasta que existan valores reales — ver ContactInfo, opcionales.
//
// `legalName` se eliminó en EPIC 8 — Checkpoint 8.2 por la misma regla que ya
// gobierna este archivo: era 'Sertecline SpA', una razón social sin confirmar,
// sin un solo lector, y su presencia contradecía el criterio con el que aquí se
// omiten dirección, correo y horarios. Ver src/config/site.ts.
export const contactInfo: ContactInfo = {
  phone: '+56 9 9222 7231',
  whatsapp: '+56 9 9222 7231',
};
