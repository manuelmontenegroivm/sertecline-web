export interface CoverageSectionContent {
  eyebrow: string;
  heading: string;
  intro: string;
  note: string;
}

// Copy de la sección "Cobertura" (home). Mismo patrón que servicesSection.ts y
// featuredWork.ts: contenido editorial separado del dato de negocio. Las
// comunas en sí viven en src/data/areas.ts (única fuente, también usada por
// el areaServed del JSON-LD de LocalBusiness) — este archivo no las duplica.
export const coverageSectionContent: CoverageSectionContent = {
  eyebrow: 'Dónde trabajamos',
  heading: 'Cobertura en Santiago',
  intro:
    'Prestamos servicios de reparación, mantención e instalación de línea blanca en distintas comunas de Santiago.',
  note: '¿No ves tu comuna? Escríbenos y revisaremos la disponibilidad del servicio.',
};
