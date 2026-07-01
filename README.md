# Sertecline

Sitio web oficial de **Sertecline**, servicio técnico de línea blanca a domicilio (reparación y mantención de lavadoras, refrigeradores y otros artefactos) en la Región Metropolitana, Chile.

> Estado: en desarrollo activo. Este README se actualiza a medida que avanza el proyecto.

## Objetivo

Landing page premium orientada a conversión y SEO local, con blog técnico para posicionamiento orgánico, preparada para escalar (más servicios, más comunas, más contenido) sin rehacer la arquitectura base.

## Stack tecnológico

| Categoría         | Tecnología                                                                      |
| ----------------- | ------------------------------------------------------------------------------- |
| Framework         | [Astro](https://astro.build) (SSG/estático)                                     |
| UI interactiva    | [React](https://react.dev) (solo para componentes que requieren interactividad) |
| Estilos           | [Tailwind CSS v4](https://tailwindcss.com)                                      |
| Animaciones       | [Framer Motion](https://www.framer.com/motion/)                                 |
| Contenido         | Astro Content Collections (Markdown/MDX)                                        |
| SEO               | `@astrojs/sitemap`, JSON-LD, metadata propia                                    |
| Lenguaje          | TypeScript                                                                      |
| Formato de código | Prettier (+ plugins Astro y Tailwind)                                           |

## Requisitos

- Node.js `>= 22.12.0` (ver `engines` en `package.json`)
- npm

## Cómo ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:4321)
npm run dev

# Build de producción (genera ./dist)
npm run build

# Previsualizar el build de producción
npm run preview

# Revisar tipos y diagnósticos de Astro
npm run check

# Formatear el código con Prettier
npm run format

# Verificar formato sin escribir cambios (usado en CI)
npm run format:check
```

## Estructura de carpetas

```
sertecline/
├── public/                  # Assets estáticos sin procesar (favicon, robots.txt, fuentes)
├── src/
│   ├── assets/              # Imágenes e íconos procesados por Astro (astro:assets)
│   │   └── images/          # brand/ hero/ services/ blog/ og/
│   ├── components/          # Componentes .astro y .tsx organizados por rol
│   │   ├── ui/               # Átomos sin significado de negocio (Button, Card, Badge)
│   │   ├── layout/            # Header, Footer, Nav, Container
│   │   ├── sections/          # Bloques de la landing (Hero, ServicesGrid, CTA...)
│   │   ├── blog/               # PostCard, TableOfContents, RelatedPosts
│   │   ├── forms/               # Formularios (interactivos, React donde corresponda)
│   │   └── seo/                  # SeoHead, JsonLd
│   ├── layouts/              # Layouts base de página (BaseLayout, BlogPostLayout...)
│   ├── content/              # Content Collections (contenido editorial versionado)
│   │   ├── blog/               # Artículos .mdx
│   │   ├── services/            # Fichas de servicio extensas (si aplica)
│   │   └── testimonials/         # Testimonios de clientes
│   ├── data/                 # Datos estructurados del negocio (no editoriales vía CMS)
│   │   ├── navigation.ts       # Enlaces de menú
│   │   ├── services.ts          # Catálogo liviano de servicios
│   │   ├── areas.ts              # Comunas/zonas de cobertura
│   │   ├── brands.ts              # Marcas de línea blanca atendidas
│   │   └── contact.ts              # Datos de contacto (NAP)
│   ├── config/               # Configuración técnica de la app
│   │   ├── site.ts              # Configuración global del sitio
│   │   ├── seo.ts                # Valores SEO por defecto
│   │   └── motion.ts              # Presets de Framer Motion
│   ├── types/                # Tipos TypeScript compartidos
│   ├── hooks/                # Hooks de React (solo para componentes interactivos)
│   ├── lib/                  # Lógica de aplicación (consultas de contenido, SEO, forms, utils)
│   ├── styles/                # global.css (Tailwind) y fuentes
│   └── pages/                 # Rutas del sitio (index, servicios/, blog/, etc.)
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Scripts disponibles

| Script                 | Descripción                                                |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Levanta el servidor de desarrollo con recarga en caliente  |
| `npm run build`        | Genera el sitio estático en `dist/`                        |
| `npm run preview`      | Sirve el build de producción localmente                    |
| `npm run astro`        | Acceso directo al CLI de Astro (`npm run astro -- --help`) |
| `npm run check`        | Corre `astro check` (tipos y diagnósticos de `.astro`)     |
| `npm run format`       | Formatea todo el proyecto con Prettier                     |
| `npm run format:check` | Verifica el formato sin modificar archivos                 |

## Licencia

Distribuido bajo licencia [MIT](./LICENSE).
