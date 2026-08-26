import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

/**
 * robots.txt publicado en /robots.txt.
 *
 * Vive como ruta de Astro y no como archivo en public/ por la única línea que
 * no es constante: la directiva `Sitemap`, que debe ser absoluta y llevar el
 * dominio canónico. Un archivo estático lo hardcodearía, dejando una tercera
 * copia del dominio junto a `site` (astro.config.mjs) y `siteConfig.url` —
 * exactamente el desalineamiento que CLAUDE.md pide evitar ante un cambio de
 * dominio. Derivarla de `site` la ata al mismo valor con el que @astrojs/sitemap
 * genera el sitemap, así que ambas URLs no pueden divergir.
 *
 * Se prerenderiza durante el build (output estático): el resultado es
 * dist/robots.txt, servido como text/plain por extensión. No agrega runtime,
 * dependencias ni JavaScript de cliente.
 *
 * Política: crawling general permitido, sin grupos por bot. El sitio es una web
 * comercial pública y no hay ruta que convenga ocultar al rastreo. En
 * particular /preview-comparador/ NO se bloquea: ya se excluye por `noindex`
 * (ver preview-comparador.astro) y un crawler necesita poder leer esa página
 * para descubrir la directiva. robots.txt no es una herramienta de noindex.
 *
 * Sobre crawlers de IA (CLAUDE.md exige que sea decisión revisada, no default):
 * el wildcard permite hoy tanto OAI-SearchBot —descubrimiento y citación en
 * ChatGPT Search, alineado con los objetivos GEO/AEO del proyecto— como GPTBot,
 * cuya finalidad es distinta (uso del contenido para entrenamiento). No se
 * escribe una regla anti-training porque el negocio no ha tomado esa decisión;
 * si la toma, se añade aquí un grupo explícito para GPTBot.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('/sitemap-index.xml', site ?? siteConfig.url).toString();

  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
