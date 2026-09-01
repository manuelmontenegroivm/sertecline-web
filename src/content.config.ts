import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { brands as brandCatalog } from './data/brands';
import { placeIds } from './data/places';
import { services as serviceCatalog } from './data/services';

const serviceIds = serviceCatalog.map((service) => service.id) as [string, ...string[]];
const brandIds = brandCatalog.map((brand) => brand.id) as [string, ...string[]];

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      author: z.string(),
    }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  // title, shortDescription y featured NO viven aquí: son datos de catálogo
  // y siguen viviendo exclusivamente en src/data/services.ts (fuente única).
  // Esta colección solo aporta el contenido editorial largo por servicio.
  schema: ({ image }) =>
    z.object({
      metaDescription: z.string(),
      intro: z.string(),
      heroImage: image().optional(),
      // Validado contra el catálogo de src/data/brands.ts (brandIds arriba), no
      // contra strings libres: una marca que el negocio no confirmó no puede
      // entrar por contenido. Mismo criterio que `service` en la colección
      // `cases`.
      relatedBrands: z.array(z.enum(brandIds)).default([]),
      faqs: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        )
        .default([]),
      draft: z.boolean().default(false),
    }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/testimonials' }),
  schema: z.object({
    customerName: z.string(),
    location: z.string(),
    service: reference('services'),
    rating: z.number().int().min(1).max(5),
    quote: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

/**
 * Marcadores de relleno que un campo factual NO puede contener.
 *
 * Un Case describe un trabajo que ocurrió. "N/A" o "Sin información" no son
 * datos: son la ausencia de un dato escrita como si fuera uno, y publicada
 * queda como una afirmación sobre el trabajo que nadie hizo. La ausencia se
 * representa omitiendo el campo, que es exactamente lo que permite que todos
 * estos campos sean opcionales.
 */
const FACTUAL_PLACEHOLDER = /^(n\/?a|no aplica|sin (informaci[oó]n|datos?)|pendiente|-+|\.+)$/i;

/**
 * Texto factual de un Case: qué reportó el cliente, qué encontró el técnico,
 * qué se hizo y cómo quedó. Se recorta y se rechaza vacío o relleno.
 */
const factualText = z
  .string()
  .trim()
  .min(1, 'Un campo factual no puede ser una cadena vacía: omítelo.')
  .refine((value) => !FACTUAL_PLACEHOLDER.test(value), {
    message:
      'Marcador de relleno en un campo factual. La ausencia de un dato se representa omitiendo el campo, no escribiendo "N/A".',
  });

const cases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cases' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortDescription: z.string(),
      // No usa reference('services'): eso validaría contra la content collection
      // `services`, que está vacía hoy. La fuente real es el catálogo liviano
      // src/data/services.ts — el enum se deriva de sus IDs (serviceIds arriba)
      // para no duplicarlos a mano y mantener una sola fuente de verdad.
      service: z.enum(serviceIds),
      // `brand` se valida contra el catálogo de src/data/brands.ts (brandIds
      // arriba): una marca inexistente falla el build en vez de publicarse.
      // Opcional: un caso histórico cuya marca no se confirmó omite el campo en
      // vez de inventarla.
      brand: z.enum(brandIds).optional(),
      /**
       * Dónde se hizo el trabajo (EPIC 7 — Checkpoint 7.2).
       *
       * Validado contra el vocabulario geográfico de src/data/places.ts, NO
       * contra el catálogo de cobertura de src/data/areas.ts: dónde ocurrió un
       * trabajo y dónde el negocio declara atender son dos afirmaciones
       * distintas, y hacer que la primera dependa de la segunda convertiría
       * cada caso publicado en una afirmación implícita de cobertura.
       *
       * Antes era `z.string()` sin validar, así que un ID mal escrito
       * desaparecía en silencio: los componentes tratan un ID desconocido como
       * "sin ubicación" y el build pasaba igual. Ahora un ID inexistente falla
       * el build.
       *
       * Sigue siendo OPCIONAL por compatibilidad histórica: el único caso
       * publicado no tiene comuna registrada y no se le va a inventar una
       * (ni inferir desde la cobertura, ni desde el servicio, ni desde las
       * fotografías). Un caso sin `area` es válido y simplemente no imprime
       * ubicación.
       *
       * Para todo trabajo capturado a partir de este checkpoint la comuna SÍ es
       * obligatoria, pero como parte del contrato de captura —una pregunta al
       * técnico— y no del schema, que debe seguir aceptando lo que ya existe.
       * Ver docs/cases/README.md.
       */
      area: z.enum(placeIds).optional(),
      /**
       * Evidencia fotográfica real del trabajo (EPIC 7 — Checkpoint 7.2).
       *
       * Reemplaza a `pairs`, que exigía obligatoriamente un par
       * before + after. Ese contrato tenía dos defectos:
       *
       * 1. Un trabajo del que solo existe la fotografía del resultado —el caso
       *    más frecuente en terreno— no podía representarse sin inventar o
       *    duplicar una fotografía. El schema no debe obligar a inventar un
       *    hecho para compilar.
       * 2. `pairs` aceptaba `pairs[1+]`, que ninguna superficie renderizaba:
       *    evidencia almacenada e invisible.
       *
       * De ahí la forma actual: exactamente 1 `result` y 0..1 `before`. NO hay
       * galería, ni `additionalImages`, ni múltiples pares — el schema no debe
       * aceptar en silencio evidencia que el sitio no muestra. Cuando exista un
       * trabajo real que necesite más, el dominio evoluciona entonces.
       *
       * `result` es la fotografía del estado resultante del trabajo y es la
       * evidencia mínima de un Case. No implica que exista un "antes".
       *
       * La presencia de `before` es lo único que decide el modo de
       * presentación (comparador interactivo vs. fotografía estática) — ver
       * src/components/cases/CaseEvidence.astro.
       */
      evidence: z.object({
        result: image(),
        before: image().optional(),
        caption: z.string().optional(),
        /**
         * Texto alternativo específico. Opcionales: sin ellos se compone desde
         * el título del caso ("<título> — antes" / "<título> — después"), que
         * es lo que hacen hoy las dos superficies publicadas. Se declaran
         * porque una fotografía puede necesitar describir algo que el título no
         * dice, y un campo aceptado por el schema debe tener consumidor:
         * CaseEvidence los propaga hasta el <img>.
         */
        resultAlt: z.string().optional(),
        beforeAlt: z.string().optional(),
      }),
      /**
       * Hechos técnicos del trabajo (EPIC 7 — Checkpoint 7.2).
       *
       * Todos opcionales por compatibilidad histórica: el caso ya publicado no
       * los tiene y no se le van a inventar. Para trabajos nuevos, el contrato
       * de captura (docs/cases/README.md) pide `workPerformed` y `outcome`
       * siempre; `reportedIssue` y `technicalFinding` solo cuando existieron —
       * una mantención preventiva o una limpieza no parten de una avería, y
       * forzar un síntoma ahí sería inventarlo.
       *
       * Su presentación corresponde a la página de detalle (CP 7.3): este
       * checkpoint define el contrato de ingreso, no una superficie nueva.
       */
      reportedIssue: factualText.optional(),
      technicalFinding: factualText.optional(),
      workPerformed: factualText.optional(),
      outcome: factualText.optional(),
      // Opcional: casos históricos sin fecha confirmada omiten este campo en vez
      // de inventarla. El contrato de captura sí exige la fecha real para todo
      // trabajo nuevo.
      completedAt: z.coerce.date().optional(),
      // Sin `featured`: la selección de portada es editorial y explícita, y vive
      // en src/data/featuredWork.ts#caseId. Dos mecanismos con significados
      // distintos —una bandera en el caso y un ID en la home— eran ambiguos, y
      // la bandera no quedó con ninguna responsabilidad propia: el orden entre
      // casos lo determina `completedAt` + ID (ver
      // src/lib/content/cases.ts#compareCases).
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, services, testimonials, cases };
