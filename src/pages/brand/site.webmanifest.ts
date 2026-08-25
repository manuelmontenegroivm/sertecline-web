import type { APIRoute } from 'astro';
import { siteConfig } from '../../config/site';

/**
 * Web App Manifest publicado en /brand/site.webmanifest.
 *
 * Vive como ruta de Astro y no como archivo en public/ porque su copia de marca
 * —`name`, `short_name`, `description`— es la misma que BaseLayout ya sirve en
 * <title>, og:site_name y meta description. Mientras fue un JSON estático esa
 * copia era una segunda fuente de verdad, y derivó: siguió publicando la grafía
 * antigua de la marca y una lista de equipos que el catálogo actual ya no
 * destaca. Derivarla de `siteConfig` hace que no pueda volver a desalinearse.
 *
 * Se prerenderiza durante el build (output estático): el resultado es un
 * archivo en dist/brand/site.webmanifest, con la misma URL y la misma extensión
 * que tenía antes. No agrega runtime, dependencias ni JavaScript de cliente.
 *
 * Tampoco convierte el sitio en PWA — no hay service worker. El manifest solo
 * aporta identidad, colores e iconos cuando el navegador ofrece "agregar a
 * pantalla de inicio".
 *
 * Solo se derivan de `siteConfig` los valores con más de un consumidor, que son
 * los que pueden desalinearse entre superficies. Lo que solo se usa aquí queda
 * literal, con su origen anotado.
 */
const manifest = {
  name: siteConfig.name,
  // No existe una forma corta oficial de la marca y no se inventa una: el
  // nombre completo son 10 caracteres y entra en el rótulo de pantalla de
  // inicio sin truncarse.
  short_name: siteConfig.name,
  // Misma descripción que meta description y og:description de la home. Es un
  // resumen del posicionamiento, no un volcado del catálogo: los 12 registros
  // de src/data/services.ts incluyen capacidades que no se publican como
  // servicio destacado y no deben ascender a copy de marca.
  description: siteConfig.description,
  lang: siteConfig.defaultLocale,
  dir: 'ltr',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  // color.paper — ver src/config/design/tokens.json. Único consumidor.
  background_color: '#F4F1EB',
  // Debe coincidir con la <meta name="theme-color"> que emite BaseLayout.
  theme_color: siteConfig.themeColor,
  categories: ['business', 'utilities'],
  icons: [
    { src: '/brand/pwa/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/brand/pwa/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    {
      src: '/brand/pwa/icon-512-maskable.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
