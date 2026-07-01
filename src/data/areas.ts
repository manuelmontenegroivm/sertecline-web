export interface ServiceArea {
  id: string;
  name: string;
  region: string;
  slug: string;
}

// TODO: confirmar comunas reales donde Sertecline presta servicio a domicilio
// Placeholder: comunas de Santiago (Región Metropolitana).
// Usado para "areaServed" en el JSON-LD de LocalBusiness y para SEO local.
export const serviceAreas: ServiceArea[] = [
  {
    id: 'santiago-centro',
    name: 'Santiago Centro',
    region: 'Región Metropolitana',
    slug: 'santiago-centro',
  }, // TODO
  { id: 'providencia', name: 'Providencia', region: 'Región Metropolitana', slug: 'providencia' }, // TODO
  { id: 'nunoa', name: 'Ñuñoa', region: 'Región Metropolitana', slug: 'nunoa' }, // TODO
  { id: 'las-condes', name: 'Las Condes', region: 'Región Metropolitana', slug: 'las-condes' }, // TODO
  { id: 'vitacura', name: 'Vitacura', region: 'Región Metropolitana', slug: 'vitacura' }, // TODO
  { id: 'la-reina', name: 'La Reina', region: 'Región Metropolitana', slug: 'la-reina' }, // TODO
  { id: 'macul', name: 'Macul', region: 'Región Metropolitana', slug: 'macul' }, // TODO
  { id: 'san-miguel', name: 'San Miguel', region: 'Región Metropolitana', slug: 'san-miguel' }, // TODO
  { id: 'la-florida', name: 'La Florida', region: 'Región Metropolitana', slug: 'la-florida' }, // TODO
  { id: 'maipu', name: 'Maipú', region: 'Región Metropolitana', slug: 'maipu' }, // TODO
];
