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
    /**
     * Sin `filter`: todas las rutas HTML que el build genera son públicas e
     * indexables. El único `filter` que existió excluía /preview-comparador,
     * la ruta de QA visual eliminada en EPIC 8 — Checkpoint 8.2; conservarlo
     * dejaría una regla que nombra una página inexistente.
     */
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
