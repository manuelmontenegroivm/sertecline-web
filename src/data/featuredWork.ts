export interface FeaturedWorkContent {
  eyebrow: string;
  heading: string;
  intro: string;
  /** ID (src/content/cases/) del caso seleccionado editorialmente para esta sección. */
  caseId: string;
}

// Copy de la sección "Trabajos reales" (home). Mismo patrón que hero.ts:
// contenido editorial separado del componente que lo renderiza.
export const featuredWorkContent: FeaturedWorkContent = {
  eyebrow: 'Evidencia real',
  heading: 'Trabajos reales, resultados verificables',
  intro:
    'Cada intervención de Sertecline queda documentada con fotografías reales del antes y el después. Así puedes comprobar, sin promesas de por medio, el nivel de detalle con el que trabajamos en cada visita técnica a domicilio en Santiago.',
  caseId: 'limpieza-profunda-lavadora',
};
