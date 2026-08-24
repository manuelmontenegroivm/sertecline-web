export interface ServicesSectionContent {
  eyebrow: string;
  heading: string;
  intro: string;
}

// Copy de la sección "Nuestros servicios" (home). Mismo patrón que
// featuredWork.ts: contenido editorial separado del componente que lo
// renderiza. El catálogo de servicios en sí vive en src/data/services.ts.
//
// El intro describe exactamente las seis tarjetas `featured` que aparecen
// inmediatamente debajo —cinco reparaciones más la mantención y limpieza de
// lavadoras—, así que enumerarlas aquí no es relleno de keywords: es el
// resumen de lo que el lector está por ver. Por lo mismo no menciona
// instalación: el negocio la presta, pero ninguna tarjeta destacada la
// representa (ver src/data/services.ts#instalacion-calefones, featured: false).
// Si cambia el conjunto de `featured`, este texto debe cambiar con él.
export const servicesSectionContent: ServicesSectionContent = {
  eyebrow: 'Qué hacemos',
  heading: 'Nuestros servicios',
  intro:
    'Reparación a domicilio de lavadoras, calefones, secadoras, lavavajillas y cocinas, además de mantención y limpieza técnica de lavadoras. Coordinamos una visita técnica en Santiago.',
};
