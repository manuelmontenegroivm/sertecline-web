export interface ServiceCasesContent {
  heading: string;
  intro?: string;
}

// Copy de la sección "caso real" de las fichas de servicio (EPIC 4.0 —
// Checkpoint 13). Mismo patrón que serviceCta.ts y faqSection.ts: copy
// editorial fuera del componente que lo renderiza.
// Deliberadamente sin `eyebrow`: la sección de FAQ que va justo debajo dentro
// de la misma ficha tampoco lleva uno, y agregarlo solo aquí rompería el ritmo
// interno de la página (a diferencia de home, donde todas las secciones sí lo
// usan).
// El copy solo describe lo que la sección muestra —fotografías de un trabajo
// realizado— sin declarar garantías, plazos, precios, certificaciones ni
// resultados extrapolables a otros equipos.
export const serviceCasesContent: ServiceCasesContent = {
  heading: 'Un trabajo real de este servicio',
  intro: 'Fotografías del antes y el después de un trabajo realizado por Sertecline.',
} as const;
