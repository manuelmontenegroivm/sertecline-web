export interface FeaturedWorkContent {
  eyebrow: string;
  heading: string;
  intro: string;
  /** ID (src/content/cases/) del caso seleccionado editorialmente para esta sección. */
  caseId: string;
}

// Copy de la sección "Trabajos reales" (home). Mismo patrón que hero.ts:
// contenido editorial separado del componente que lo renderiza.
//
// El `intro` se reescribió en EPIC 5 — Checkpoint 5.3 por dos motivos, ninguno
// estético:
//
// 1. VERACIDAD. La versión anterior abría con "Cada intervención de Sertecline
//    queda documentada con fotografías reales del antes y el después": una
//    afirmación sobre la totalidad del trabajo del negocio que ninguna fuente
//    del repositorio respalda —la colección `cases` publica exactamente un
//    caso—. La regla del proyecto sobre no publicar datos de negocio sin
//    confirmar (ver CLAUDE.md) aplica igual a una práctica declarada que a una
//    dirección o un horario. La versión actual solo afirma lo que el propio
//    caso demuestra: que esto es un trabajo real y que está fotografiado antes
//    y después. También cae "sin promesas de por medio", que era registro
//    publicitario y no información.
//
// 2. LONGITUD. Ocupaba cuatro líneas y empujaba la fotografía —el contenido
//    que la sección existe para mostrar— por debajo del pliegue en móvil. El
//    audit de CP 5.1 ya había señalado que la evidencia real aparecía tarde.
//
// La frase se mantiene genérica a propósito (no nombra lavadora ni limpieza):
// el caso mostrado lo decide `caseId`, así que un copy que describiera este
// equipo en particular quedaría desmentido al cambiar esa línea.
//
// La indicación de uso del comparador viaja aquí y no en un texto suelto junto
// a la imagen: es la última frase del intro, que en móvil queda inmediatamente
// encima de la fotografía y en escritorio a su costado. Así el checkpoint 5.3
// cubre el affordance sin agregar una instrucción decorativa aparte ni un
// tutorial (ver FeaturedWork.astro).
export const featuredWorkContent: FeaturedWorkContent = {
  eyebrow: 'Evidencia real',
  heading: 'Trabajos reales, resultados verificables',
  intro:
    'Este es un trabajo real de Sertecline, fotografiado antes y después de la intervención. Mueve el control sobre la imagen para comparar.',
  caseId: 'limpieza-profunda-lavadora',
};
