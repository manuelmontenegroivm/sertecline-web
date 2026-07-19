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
  legalName: string;
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
export const contactInfo: ContactInfo = {
  legalName: 'Sertecline SpA', // TODO: confirmar razón social
  phone: '+56 9 9222 7231',
  whatsapp: '+56 9 9222 7231',
};
