export interface Faq {
  id: string;
  question: string;
  answer: string;
}

// Preguntas frecuentes de la home (EPIC 3.9). El orden del array es el orden
// de despliegue — no hay filtro/orden dinámico todavía (a diferencia de
// services.ts), así que no se agrega `featured`/`order` hasta que exista una
// vista que los necesite (ej. una página /preguntas-frecuentes más extensa).
// Respuestas deliberadamente conservadoras: nada de marcas, comunas,
// gratuidad ni tiempos de respuesta sin validar por el negocio. El shape
// {question, answer} es representable como structured data si algún día un
// consumidor legítimo lo necesita, pero home no emite FAQPage: se descartó
// explícitamente (EPIC 4.2 — Checkpoint 4.2.6) y estas preguntas viven solo
// en el HTML visible de la sección.
//
// Alcance (EPIC 4.1 — Checkpoint 4.1.7): a esta lista le corresponde cómo
// funciona el negocio —tipos de trabajo, equipos, marcas en general, cobertura
// y contacto—, transversal a todos los servicios. Lo específico de un equipo
// (síntomas, qué incluye, cada cuánto) pertenece al frontmatter `faqs` de su
// ficha en src/content/services/, no aquí: son dos datasets distintos y
// duplicar una pregunta entre ambos hace competir a la home con su propia
// ficha. Las preguntas por comuna esperan a que exista una página de cobertura,
// y las de credenciales a que exista una de confianza.
export const faqs: Faq[] = [
  {
    id: 'tipos-de-trabajo',
    question: '¿Qué tipos de trabajo realizan?',
    answer:
      'Reparación, mantención, limpieza técnica e instalación. No todos aplican a todos los equipos: depende del artefacto y de lo que necesite. Cuéntanos cuál es y qué ocurre.',
  },
  {
    id: 'que-equipos-atienden',
    // Orden por prioridad comercial, con refrigeradores en una frase aparte:
    // se siguen atendiendo, pero el negocio redujo su foco (ver services.ts).
    question: '¿Qué equipos atienden?',
    answer:
      'Lavadoras, calefones, secadoras, lavavajillas, cocinas, hornos y encimeras. También atendemos refrigeradores.',
  },
  {
    id: 'que-marcas-atienden',
    // Sin nombrar marcas: que src/data/brands.ts las tenga verificadas no
    // convierte esta respuesta en un listado. Tampoco declara servicio oficial,
    // autorización del fabricante ni cobertura de cualquier modelo.
    question: '¿Qué marcas atienden?',
    answer:
      'Atendemos equipos de distintas marcas. La atención depende de la marca, el modelo y el trabajo que necesite el equipo. Escríbenos con esos datos y revisamos tu caso.',
  },
  {
    id: 'trabajan-en-mi-comuna',
    question: '¿Trabajan en mi comuna?',
    answer:
      'Prestamos servicio en distintas comunas de Santiago. Si no ves tu comuna en la sección de cobertura, escríbenos y revisamos la disponibilidad.',
  },
  {
    id: 'como-solicitar-visita',
    question: '¿Cómo solicito atención?',
    answer:
      'Escríbenos por WhatsApp o llámanos. Cuéntanos qué equipo es, la marca, el modelo y qué ocurre, y coordinamos la visita técnica.',
  },
];
