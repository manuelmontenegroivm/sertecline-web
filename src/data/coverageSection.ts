export interface CoverageSectionContent {
  eyebrow: string;
  heading: string;
  intro: string;
  note: string;
}

// Copy de la sección "Cobertura" (home). Mismo patrón que servicesSection.ts y
// featuredWork.ts: contenido editorial separado del dato de negocio. Las áreas
// en sí viven en src/data/areas.ts (única fuente) — este archivo no las
// duplica: la selección de abajo declara solo IDs.
export const coverageSectionContent: CoverageSectionContent = {
  eyebrow: 'Dónde trabajamos',
  heading: 'Cobertura en Santiago',
  intro:
    'Prestamos servicios de reparación, mantención e instalación de línea blanca en distintas comunas de Santiago.',
  note: '¿No ves tu comuna? Escríbenos y revisaremos la disponibilidad del servicio.',
};

/**
 * Áreas visibles en la sección "Cobertura" de home, en orden de despliegue.
 *
 * Capa editorial, no catálogo: src/data/areas.ts declara las 41 entidades
 * cubiertas y este array elige cuáles se muestran. Sin esta separación, home
 * renderizaría las 41 como badges. Agregar una comuna al catálogo por lo tanto
 * ya no la muestra en home — es el objetivo de esta capa, pero conviene tenerlo
 * presente al editar.
 *
 * Criterio de selección: **representatividad geográfica**. La sección debe
 * comunicar "cubrimos todo Santiago", así que el muestreo abarca oriente,
 * centro, norte, sur y poniente. Deliberadamente NO es el conjunto
 * `priority: 'focus'` del catálogo ni nada derivable de él: la prioridad
 * comercial es interna (ver areas.ts#ServiceAreaPriority) y una lista que la
 * espeje la publicaría igual, con un rodeo. La mayoría de las áreas de abajo
 * son `standard`, y esa mezcla es intencional.
 *
 * Sin sectores: home declara cobertura a nivel de comuna. La Dehesa y Chicureo
 * siguen en el catálogo como entidades de búsqueda, pero listarlos junto a
 * comunas sugeriría una segmentación que esta sección no comunica.
 *
 * Solo IDs. Nombre, kind, parentId, región y prioridad se resuelven contra el
 * catálogo (areas.ts#resolveServiceAreas), que además falla el build si alguno
 * de estos IDs deja de existir.
 */
export const featuredAreaIds: string[] = [
  'las-condes',
  'vitacura',
  'providencia',
  'nunoa',
  'la-reina',
  'lo-barnechea',
  'santiago',
  'la-florida',
  'puente-alto',
  'maipu',
  'san-miguel',
  'penalolen',
  'huechuraba',
  'colina',
];
