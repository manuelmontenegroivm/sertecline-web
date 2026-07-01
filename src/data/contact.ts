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
  email: string;
  address: Address;
  hours: string;
  social: SocialLink[];
}

// TODO: reemplazar todos los valores con los datos reales (NAP) de Sertecline
export const contactInfo: ContactInfo = {
  legalName: 'Sertecline SpA', // TODO
  phone: '+56 9 0000 0000', // TODO
  whatsapp: '+56 9 0000 0000', // TODO
  email: 'contacto@sertecline.cl', // TODO: confirmar casilla real
  address: {
    street: 'TODO: calle y número',
    comuna: 'TODO: comuna',
    region: 'TODO: región',
    country: 'Chile',
  },
  hours: 'TODO: horario de atención',
  social: [
    { platform: 'instagram', url: 'https://instagram.com/TODO' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/TODO' },
  ],
};
