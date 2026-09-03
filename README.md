# Sertecline

Sitio web oficial de **Sertecline**, servicio técnico de línea blanca a domicilio (reparación y mantención de lavadoras, refrigeradores y otros artefactos) en la Región Metropolitana, Chile.

> Estado: en desarrollo activo. Este README se actualiza a medida que avanza el proyecto.

## Objetivo

Landing page premium orientada a conversión y SEO local, con fichas de servicio y un registro público de trabajos realizados. El blog técnico para posicionamiento orgánico está **planificado**: la colección existe y está vacía, todavía sin superficie publicada. La arquitectura está preparada para escalar (más servicios, más comunas, más contenido) sin rehacerla.

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
├── docs/                    # Documentación operativa (sistema de marca, contrato de Cases)
├── public/                  # Assets estáticos sin procesar
│   ├── brand/               # logo/ favicon/ pwa/ social/ (brand asset system)
│   └── fonts/               # Archivo y JetBrains Mono self-hosted (.woff2 + licencias)
├── scripts/
│   └── validate-case-images.mjs   # Compuerta de privacidad de las fotos de Cases
├── src/
│   ├── assets/              # Imágenes e íconos procesados por Astro (astro:assets)
│   │   └── images/          # brand/ hero/ services/ cases/ og/ blog/
│   ├── components/          # Componentes .astro y .tsx organizados por ROL
│   │   ├── ui/              # Átomos sin significado de negocio (Button, ButtonLink, Badge, Logo, TextLink, VisuallyHidden)
│   │   ├── layout/          # Header, Navbar, NavLink, MobileMenu, Footer, Container, Section, Breadcrumbs
│   │   ├── sections/        # Bloques de la home (Hero, Services, FeaturedWork, Coverage, FAQ, Accreditations, Contact)
│   │   ├── services/        # ServiceCard, ServiceCta, ServiceIcon
│   │   ├── cases/           # CaseCard, CaseEvidence, CaseResultImage, ServiceCase, BeforeAfterComparator (+ island React)
│   │   ├── contact/         # ContactActions (par WhatsApp + llamada)
│   │   ├── faq/             # FaqItem
│   │   ├── blog/            # (reservada, sin componentes todavía)
│   │   ├── forms/           # (reservada, sin componentes todavía)
│   │   └── seo/             # (reservada, sin componentes todavía)
│   ├── layouts/             # BaseLayout (documento + metadata) y ServiceLayout (ficha de servicio)
│   ├── content/             # Content Collections (contenido editorial versionado)
│   │   ├── services/        # Fichas de servicio extensas (.mdx)
│   │   ├── cases/           # Trabajos realizados (.mdx)
│   │   ├── blog/            # (declarada y vacía)
│   │   └── testimonials/    # (declarada y vacía)
│   ├── data/                # Datos estructurados del negocio y copy por sección
│   │   ├── navigation.ts    # Enlaces de menú
│   │   ├── services.ts      # Catálogo liviano de servicios
│   │   ├── areas.ts         # Comunas/zonas de cobertura comercial declarada
│   │   ├── places.ts        # Vocabulario geográfico (dónde ocurrió un trabajo)
│   │   ├── brands.ts        # Marcas de línea blanca atendidas
│   │   └── contact.ts       # Datos de contacto (NAP)
│   ├── config/              # Configuración técnica de la app
│   │   ├── site.ts          # Configuración global del sitio
│   │   ├── seo.ts           # Valores SEO por defecto
│   │   ├── motion.ts        # Presets de Framer Motion
│   │   └── design/          # tokens.json — fuente de verdad no-CSS de los design tokens
│   ├── types/               # Tipos TypeScript compartidos
│   ├── hooks/               # Hooks de React (reservada, sin hooks todavía)
│   ├── lib/                 # Lógica de aplicación
│   │   ├── content/         # Consultas a las colecciones (cases, services)
│   │   ├── seo/             # Política y builders de metadata/JSON-LD
│   │   ├── utils/           # contact, date, navigation
│   │   └── forms/           # (reservada)
│   ├── styles/              # global.css (entrada) · tokens.css (design tokens) · brand.css (fuentes y documento)
│   ├── content.config.ts    # Schemas Zod de las colecciones
│   └── pages/               # Rutas del sitio
│       ├── index.astro
│       ├── servicios/[slug].astro
│       ├── trabajos/        # index.astro + [slug].astro
│       ├── robots.txt.ts
│       └── brand/site.webmanifest.ts
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Scripts disponibles

| Script                         | Descripción                                                            |
| ------------------------------ | ---------------------------------------------------------------------- |
| `npm run dev`                  | Levanta el servidor de desarrollo con recarga en caliente              |
| `npm run build`                | **Build canónico**: corre `validate:case-images` y luego `astro build` |
| `npm run preview`              | Sirve el build de producción localmente                                |
| `npm run astro`                | Acceso directo al CLI de Astro (`npm run astro -- --help`)             |
| `npm run check`                | Corre `astro check` (tipos y diagnósticos de `.astro`)                 |
| `npm run format`               | Formatea todo el proyecto con Prettier                                 |
| `npm run format:check`         | Verifica el formato sin modificar archivos                             |
| `npm run validate:case-images` | Compuerta de privacidad de las fotografías de Cases (ver abajo)        |

## Build y compuerta de privacidad de imágenes

El build de producción es **`npm run build`**, y son dos pasos encadenados:

```
npm run build
  → npm run validate:case-images     # node scripts/validate-case-images.mjs
  → astro build
```

`validate:case-images` revisa todo archivo bajo `src/assets/images/cases/` y **falla el build** si encuentra metadata incrustada (EXIF, XMP o IPTC — donde una foto de teléfono guarda GPS, fecha exacta, modelo del equipo y dueño del dispositivo) o un formato fuera de la lista permitida.

Por eso `astro build` a secas **no** es equivalente al build canónico: se salta la compuerta. Cualquier pipeline de CI o despliegue debe invocar `npm run build`.

La compuerta cubre solo la metadata del archivo. Lo que se ve _dentro_ de la imagen —rostros, documentos, números de serie, direcciones, consentimiento del cliente— es revisión humana obligatoria: ver [`docs/cases/privacidad-fotografias.md`](./docs/cases/privacidad-fotografias.md).

## Documentación del repositorio

| Documento                                                                        | Contenido                                              |
| -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [`CLAUDE.md`](./CLAUDE.md)                                                       | Guía permanente de arquitectura, SEO, estilo y alcance |
| [`docs/brand/README.md`](./docs/brand/README.md)                                 | Sistema de marca: assets, tokens y sus consumidores    |
| [`docs/cases/README.md`](./docs/cases/README.md)                                 | Contrato de captura y publicación de un Case           |
| [`docs/cases/privacidad-fotografias.md`](./docs/cases/privacidad-fotografias.md) | Política de privacidad de la evidencia fotográfica     |

## Licencia

Distribuido bajo licencia [MIT](./LICENSE).
