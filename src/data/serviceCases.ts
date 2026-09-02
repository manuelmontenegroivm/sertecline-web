export interface ServiceCasesContent {
  heading: string;
  intro?: string;
  /**
   * Rótulo de la lista de enlaces a los demás trabajos publicados del servicio.
   * Solo se renderiza cuando hay más de uno — ver ServiceLayout.astro.
   */
  moreHeading: string;
}

// Copy de la sección "caso real" de las fichas de servicio (EPIC 4.0 —
// Checkpoint 13). Mismo patrón que serviceCta.ts y faqSection.ts: copy
// editorial fuera del componente que lo renderiza.
// Deliberadamente sin `eyebrow`: la sección de FAQ que va justo debajo dentro
// de la misma ficha tampoco lleva uno, y agregarlo solo aquí rompería el ritmo
// interno de la página (a diferencia de home, donde todas las secciones sí lo
// usan).
// El copy solo describe lo que la sección muestra —la evidencia de un trabajo
// realizado— sin declarar garantías, plazos, precios, certificaciones ni
// resultados extrapolables a otros equipos.
//
// El `intro` decía "Fotografías del antes y el después" hasta EPIC 7 —
// Checkpoint 7.3. Esa frase dejó de ser universalmente verdadera en CP 7.2,
// cuando el modelo de evidencia pasó a exigir `evidence.result` y volvió
// opcional `evidence.before`: un caso válido puede tener una sola fotografía, y
// entonces el texto afirmaba un "antes" que la página no muestra. Tampoco podía
// resolverse pluralizando —"fotografías" es falso para un caso de una sola
// imagen— ni condicionando el texto por caso, que duplicaría en copy la
// decisión que CaseEvidence ya toma según el contenido. "Evidencia fotográfica"
// es verdadera con una imagen y con dos, y es el mismo vocabulario con que el
// schema nombra el campo.
//
// `moreHeading` se agrega en EPIC 7 — Checkpoint 7.3, cuando la ficha deja de
// pedir un solo caso a la capa de acceso. `heading` sigue describiendo lo que
// hay bajo él —el trabajo que se muestra completo, con su evidencia— y
// `moreHeading` rotula la lista de enlaces a los demás trabajos publicados del
// mismo servicio, que antes se descartaban sin señal. Con un caso publicado esa
// lista no existe y la ficha se lee exactamente como hasta ahora.
export const serviceCasesContent: ServiceCasesContent = {
  heading: 'Un trabajo real de este servicio',
  intro: 'Evidencia fotográfica de un trabajo realizado por Sertecline.',
  moreHeading: 'Otros trabajos de este servicio',
} as const;
