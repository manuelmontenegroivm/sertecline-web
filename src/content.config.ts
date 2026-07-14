import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { services as serviceCatalog } from './data/services';

const serviceIds = serviceCatalog.map((service) => service.id) as [string, ...string[]];

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
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    featured: z.boolean().default(false),
    category: z.string(),
    // IDs de src/data/brands.ts
    relatedBrands: z.array(z.string()).default([]),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .default([]),
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
      // IDs de src/data/brands.ts / src/data/areas.ts — sin validar contra el catálogo (igual que services.relatedBrands).
      brand: z.string().optional(),
      area: z.string().optional(),
      // pairs[0] es el par principal (comparador). pairs[1+] se tratan como
      // galería adicional — decisión de render, no de schema.
      pairs: z
        .array(
          z.object({
            before: image(),
            after: image(),
            caption: z.string().optional(),
          })
        )
        .min(1),
      // Opcional: casos históricos sin fecha confirmada omiten este campo en vez de inventarla.
      completedAt: z.coerce.date().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, services, testimonials, cases };
