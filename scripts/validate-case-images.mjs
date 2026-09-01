/**
 * Compuerta de privacidad automatizada para las fotografías de Cases
 * (EPIC 7 — Checkpoint 7.2).
 *
 * Revisa TODO archivo bajo src/assets/images/cases/ y falla si encuentra:
 *
 *   1. Metadata incrustada: EXIF, XMP o IPTC. Ahí es donde una fotografía de
 *      teléfono guarda coordenadas GPS, fecha y hora exactas, modelo y número
 *      de serie del equipo, identificador del dueño del dispositivo, software
 *      de edición e historial. Nada de eso es visible al mirar la imagen, y por
 *      eso es justo lo que se publica sin querer.
 *   2. Un formato fuera de la lista permitida para Cases.
 *
 * Se rechaza toda la metadata, no solo el bloque GPS: un activo aprobado no
 * tiene ninguna razón para conservar EXIF, y una regla binaria ("cero
 * metadata") es auditable, mientras que "EXIF sí pero sin GPS" obliga a
 * mantener una lista de campos sensibles que siempre queda corta.
 *
 * LO QUE ESTA COMPUERTA **NO** PUEDE HACER: nada de lo que se ve dentro de la
 * imagen. Rostros, reflejos en superficies pulidas, documentos, boletas,
 * órdenes de trabajo, números de serie, patentes, nombres, teléfonos,
 * direcciones, números de departamento, objetos personales identificables y el
 * consentimiento del cliente son revisión humana obligatoria, sin excepción.
 * Ver docs/cases/privacidad-fotografias.md. Este script pasando NO significa
 * que una fotografía sea publicable.
 *
 * Sin dependencias nuevas: `sharp` ya está instalado porque es el servicio de
 * imágenes de Astro (dependencia opcional de `astro`, y este proyecto la usa en
 * cada build vía getImage()/<Image>). Si no estuviera, el script falla en vez
 * de pasar en silencio: una compuerta que se desactiva sola no es una
 * compuerta.
 */
import { readdir } from 'node:fs/promises';
import { join, relative, extname, sep } from 'node:path';
import process from 'node:process';

const CASES_IMAGES_DIR = 'src/assets/images/cases';

// Formatos permitidos para evidencia de Cases. JPEG y PNG son lo que entrega un
// teléfono; WebP y AVIF los produce Astro en build y no deberían aparecer aquí
// como fuente, pero si alguien los agrega igual se revisan.
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const ALLOWED_FORMATS = new Set(['jpeg', 'png', 'webp', 'avif']);

// Bloques de metadata que sharp expone y que no deben viajar a producción.
const METADATA_BLOCKS = [
  ['exif', 'EXIF (puede contener GPS, fecha/hora, equipo y número de serie)'],
  ['xmp', 'XMP (puede contener autor, historial de edición y ubicación)'],
  ['iptc', 'IPTC (puede contener autor, descripción y ubicación)'],
];

async function loadSharp() {
  try {
    const module = await import('sharp');
    return module.default;
  } catch (error) {
    console.error('[case-images] No se pudo cargar `sharp`, requerido por esta validación.');
    console.error('[case-images] `sharp` es el servicio de imágenes de Astro: si falta, el');
    console.error('[case-images] build tampoco puede procesar las fotografías. Instala las');
    console.error('[case-images] dependencias del proyecto (`npm install`) y vuelve a ejecutar.');
    console.error(`[case-images] Detalle: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
}

async function collectFiles(dir) {
  let entries;

  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];

  for (const entry of entries) {
    const full = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(full)));
    } else if (entry.isFile() && entry.name !== '.gitkeep') {
      files.push(full);
    }
  }

  // Orden estable: el reporte debe ser el mismo en cualquier máquina.
  return files.sort();
}

async function inspect(sharp, file) {
  const problems = [];
  const extension = extname(file).toLowerCase();

  if (!ALLOWED_EXTENSIONS.has(extension)) {
    problems.push(
      `extensión no permitida para evidencia de Cases: ${extension || '(sin extensión)'}`
    );
    return problems;
  }

  let metadata;

  try {
    metadata = await sharp(file).metadata();
  } catch (error) {
    problems.push(`no se pudo leer como imagen: ${error instanceof Error ? error.message : error}`);
    return problems;
  }

  if (!ALLOWED_FORMATS.has(metadata.format)) {
    problems.push(`formato no permitido: ${metadata.format}`);
  }

  for (const [key, description] of METADATA_BLOCKS) {
    const block = metadata[key];
    if (block && block.length > 0) {
      problems.push(
        `contiene metadata ${key.toUpperCase()} (${block.length} bytes) — ${description}`
      );
    }
  }

  return problems;
}

const sharp = await loadSharp();
const files = await collectFiles(CASES_IMAGES_DIR);

if (files.length === 0) {
  console.log(`[case-images] Sin fotografías de Cases en ${CASES_IMAGES_DIR}/ — nada que validar.`);
  process.exit(0);
}

let failed = 0;

for (const file of files) {
  const problems = await inspect(sharp, file);
  const label = relative(process.cwd(), file).split(sep).join('/');

  if (problems.length === 0) {
    console.log(`[case-images] OK      ${label}`);
    continue;
  }

  failed += 1;
  console.error(`[case-images] RECHAZA ${label}`);
  for (const problem of problems) {
    console.error(`[case-images]           - ${problem}`);
  }
}

console.log(`[case-images] ${files.length} archivo(s) revisado(s), ${failed} rechazado(s).`);

if (failed > 0) {
  console.error('');
  console.error('[case-images] Una fotografía con metadata NO entra al repositorio.');
  console.error('[case-images] Sanitízala antes de volver a intentar — el procedimiento está en');
  console.error('[case-images] docs/cases/privacidad-fotografias.md.');
  process.exit(1);
}

// Recordatorio deliberado: esta compuerta cubre metadata, no contenido visible.
console.log('[case-images] Metadata limpia. La revisión visual y el consentimiento son humanos:');
console.log('[case-images] ver docs/cases/privacidad-fotografias.md.');
