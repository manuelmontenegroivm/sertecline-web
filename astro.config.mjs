// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sertecline.cl',
  integrations: [
    react(),
    mdx(),
    sitemap({
      /**
       * /preview-comparador/ publica <meta name="robots" content="noindex, nofollow">
       * (ver src/pages/preview-comparador.astro). Anunciarla en el sitemap emite la
       * señal contraria — el sitemap propone para indexación lo que la propia página
       * prohíbe — así que se excluye de la lista de URLs.
       *
       * La exclusión vive aquí y no en robots.txt de forma deliberada: el crawler
       * necesita poder solicitar la página para leer su noindex (ver el comentario
       * de política en src/pages/robots.txt.ts). Las tres señales quedan coherentes:
       * crawl permitido, noindex en la página, URL fuera del sitemap.
       *
       * `filter` recibe la URL absoluta ya resuelta contra `site`, de modo que se
       * compara sobre el pathname y no sobre el string completo; el `replace` final
       * hace la comparación indiferente al trailing slash.
       */
      filter: (page) => new URL(page).pathname.replace(/\/$/, '') !== '/preview-comparador',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
