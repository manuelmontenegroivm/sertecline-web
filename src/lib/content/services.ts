import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// Único punto de consulta de la collection `services`. El catálogo (title,
// shortDescription, featured) vive en src/data/services.ts — este módulo solo
// resuelve el contenido editorial largo (metaDescription, intro, faqs, etc.).
export async function getAllServices(): Promise<CollectionEntry<'services'>[]> {
  return getCollection('services');
}

export async function getPublishedServices(): Promise<CollectionEntry<'services'>[]> {
  return getCollection('services', (entry) => !entry.data.draft);
}

export async function getServiceBySlug(
  slug: string
): Promise<CollectionEntry<'services'> | undefined> {
  const services = await getPublishedServices();
  return services.find((service) => service.id === slug);
}
