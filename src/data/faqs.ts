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
// gratuidad ni tiempos de respuesta sin validar por el negocio. Mismo shape
// {question, answer} que usará el futuro FAQPage JSON-LD (src/lib/seo/).
export const faqs: Faq[] = [
  {
    id: 'reparan-lavadoras',
    question: '¿Reparan lavadoras?',
    answer: 'Sí. Diagnosticamos y reparamos fallas comunes en lavadoras.',
  },
  {
    id: 'que-equipos-reparan',
    question: '¿Qué equipos de línea blanca reparan?',
    answer:
      'Lavadoras, refrigeradores, secadoras y cocinas, además de instalación y revisión general de línea blanca.',
  },
  {
    id: 'hacen-mantenciones',
    question: '¿Hacen mantenciones o solo reparaciones?',
    answer:
      'Ambas cosas. Además de reparar fallas, ofrecemos mantención preventiva y limpieza técnica para cuidar el funcionamiento del equipo.',
  },
  {
    id: 'que-marcas-atienden',
    question: '¿Qué marcas de línea blanca atienden?',
    answer:
      'La atención puede depender de la marca, el modelo y el tipo de falla. Escríbenos con los datos del equipo para revisar el caso.',
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
    answer: 'Contáctanos, cuéntanos qué equipo presenta el problema y revisaremos cómo ayudarte.',
  },
];
