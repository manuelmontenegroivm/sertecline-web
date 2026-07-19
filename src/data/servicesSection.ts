export interface ServicesSectionContent {
  eyebrow: string;
  heading: string;
  intro: string;
}

// Copy de la sección "Nuestros servicios" (home). Mismo patrón que
// featuredWork.ts: contenido editorial separado del componente que lo
// renderiza. El catálogo de servicios en sí vive en src/data/services.ts.
export const servicesSectionContent: ServicesSectionContent = {
  eyebrow: 'Qué hacemos',
  heading: 'Nuestros servicios',
  intro:
    'Atendemos línea blanca a domicilio en Santiago: diagnóstico, reparación, mantención e instalación de los equipos que más se usan en la casa, con visita técnica agendada y trabajo documentado.',
};
