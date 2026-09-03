# CLAUDE.md — Guía permanente del proyecto Sertecline

Esta guía rige cualquier trabajo de Claude Code en este repositorio. Ante conflicto entre esta guía y una preferencia genérica de framework, esta guía tiene prioridad.

## Objetivo del proyecto

Sitio web de **Sertecline**: servicio técnico de línea blanca a domicilio (reparación y mantención de lavadoras, refrigeradores y otros artefactos) en comunas de Santiago, Región Metropolitana, Chile.

El sitio es una **landing premium orientada a conversión y SEO local**, con fichas de servicio y un registro de trabajos realizados publicados, y un **blog técnico planificado** para posicionamiento orgánico —la colección existe y está vacía; todavía no hay superficie publicada—. Debe estar preparado para crecer (más servicios, más comunas, más contenido) sin rehacer la arquitectura base.

## Stack técnico actual

- **Astro** — framework principal, salida 100% estática (SSG), sin adapter SSR.
- **React** (`@astrojs/react`) — únicamente para componentes que requieren interactividad real.
- **Tailwind CSS v4** — vía plugin de Vite (`@tailwindcss/vite`), no la integración legacy `@astrojs/tailwind`.
- **MDX** (`@astrojs/mdx`) — contenido editorial de las colecciones. Hoy lo usan `services/` y `cases/`; `blog/` está declarada y vacía.
- **Framer Motion** — animaciones.
- **`@astrojs/sitemap`** — sitemap automático.
- **TypeScript** (modo estricto, heredado de `astro/tsconfigs/strict`).
- **Prettier** + `prettier-plugin-astro` + `prettier-plugin-tailwindcss`.

No asumas otras librerías o integraciones salvo que ya estén en `package.json` o el usuario las pida explícitamente.

## Arquitectura acordada

El proyecto sigue una versión ligera de Clean Architecture adaptada a un sitio mayormente estático: el contenido y las reglas de negocio no dependen de Astro ni de un proveedor externo concreto.

| Capa                    | Qué es                                                  | Dónde vive                           |
| ----------------------- | ------------------------------------------------------- | ------------------------------------ |
| Entidades               | Modelo de dominio: Service, Case, Place/Area, Brand     | `src/content.config.ts`, `src/data/` |
| Casos de uso            | Funciones puras que consultan/transforman ese contenido | `src/lib/`                           |
| Adaptadores de interfaz | Componentes que presentan esos datos                    | `src/components/`, `src/layouts/`    |
| Detalles/Frameworks     | Astro, hosting, proveedor de email/CRM del formulario   | `astro.config.mjs`, integraciones    |

**Regla de dependencia:** nada en `src/lib/` importa un componente `.astro` o `.tsx`. Los componentes importan de `src/lib/`, `src/data/` y `src/config/` — nunca al revés.

### Modelo de dominio

| Entidad     | Qué representa                                                  | Fuente de verdad                                                             |
| ----------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Service** | Una intención de contratación sobre un equipo                   | catálogo `src/data/services.ts` + ficha editorial en la colección `services` |
| **Case**    | Un trabajo que Sertecline realizó, con su evidencia fotográfica | colección `cases` (`src/content/cases/`)                                     |
| **Place**   | Vocabulario geográfico: dónde ocurrió un trabajo                | `src/data/places.ts`                                                         |
| **Area**    | Cobertura comercial declarada: dónde el negocio atiende         | `src/data/areas.ts`                                                          |
| **Brand**   | Marcas de línea blanca atendidas                                | `src/data/brands.ts`                                                         |

`Place` y `Area` son entidades distintas a propósito: un trabajo realizado en un lugar no convierte ese lugar en plaza declarada. `cases.area` se valida contra `places.ts`, nunca contra `areas.ts`.

Colecciones editoriales declaradas en `src/content.config.ts`: `services` y `cases` (con contenido), `blog` y `testimonials` (declaradas y vacías). Una colección vacía no es una superficie publicada.

## Convenciones de carpetas

```
src/
├── assets/       # Imágenes/íconos procesados por Astro (astro:assets)
├── components/   # Organizados por ROL, no por página:
│                 #   ui/ layout/ sections/ services/ cases/ contact/ faq/
│                 #   blog/ forms/ seo/ (creadas, aún sin componentes)
├── layouts/      # BaseLayout, ServiceLayout
├── content/      # Content Collections: services/ cases/ (con contenido), blog/ testimonials/ (vacías)
├── data/         # Datos tipados del negocio: navigation, services, areas, places, brands, contact
│                 # y el copy por sección (hero, servicesSection, coverageSection, faqSection…)
├── config/       # Configuración técnica: site, seo, motion + design/tokens.json
├── types/        # Tipos TypeScript compartidos
├── hooks/        # Hooks de React (solo consumidos por islands React) — vacía hoy
├── lib/          # Lógica de aplicación: content/ seo/ utils/ (forms/ vacía)
├── styles/       # global.css (entrada) + tokens.css (design tokens) + brand.css (fuentes/documento)
└── pages/        # Rutas del sitio: index, servicios/[slug], trabajos/ (índice + [slug]),
                  # robots.txt.ts, brand/site.webmanifest.ts
```

Las carpetas vacías conservan un `.gitkeep`: reservan el sitio de una capa acordada (blog, forms, hooks) sin fingir que ya existe.

Reglas:

- Un componente nuevo va en la carpeta de su **rol**, no en una carpeta por feature/página.
- `data/` es para datos tipo negocio editables (nav, servicios, comunas, marcas, contacto). `config/` es para configuración técnica de la app (SEO defaults, presets de animación). No mezclar ambos.
- Contenido largo/editorial (posts, fichas de servicio extensas) va en `content/`, nunca en `data/`.
- No crear carpetas nuevas de nivel superior sin que el usuario lo pida.

## Reglas para Astro

- Rutas planas en `src/pages/`, sin prefijo de idioma (el sitio es mono-idioma `es-CL`) salvo instrucción explícita en contrario.
- La lógica de obtención/transformación de datos vive en `src/lib/`, no inline en el frontmatter de un `.astro`.
- `getStaticPaths()` para rutas dinámicas (hoy `servicios/[slug]` y `trabajos/[slug]`) resuelto desde Content Collections, a través de la capa de acceso de `src/lib/content/` — una entrada en `draft` no genera ruta ni entra al sitemap.
- Al levantar el servidor de desarrollo, usar modo background:
  ```
  astro dev --background
  ```
  Gestionarlo con `astro dev stop`, `astro dev status`, `astro dev logs`.

## Reglas para React

- React se usa **solo** para interactividad real: formularios con validación/estado, carruseles, menús con estado complejo, animaciones controladas por interacción. Todo lo demás se hace en `.astro`.
- Directivas de cliente explícitas y mínimas: preferir `client:visible` o `client:idle` sobre `client:load`, salvo que el componente sea crítico above-the-fold.
- Un componente React no importa un componente `.astro`.
- Hooks reutilizables en `src/hooks/`; no duplicar lógica de estado entre islands.

## Reglas para Tailwind

- Todo estilo nuevo usa utilities de Tailwind sobre los tokens definidos en `src/styles/tokens.css` (bloque `@theme` de Tailwind v4). No introducir valores mágicos de color/espaciado sueltos.
- Reparto de las tres hojas de `src/styles/`: `global.css` es solo la entrada de composición (`@import` de `tailwindcss` → `tokens.css` → `brand.css`, en ese orden); `tokens.css` define los design tokens; `brand.css` declara las `@font-face` de marca y las reglas de documento. Un token nuevo va en `tokens.css`, nunca en `global.css`.
- Si un valor se repite, se extiende el tema/tokens — no se parchea con clases arbitrarias (`w-[123px]`) como primera opción.
- Diseño mobile-first; validar en los breakpoints estándar antes de dar una tarea de UI por cerrada.

## Reglas para MDX

- El MDX del proyecto es el cuerpo editorial de las Content Collections. Superficies con contenido hoy: `src/content/services/` (ficha extensa de cada servicio publicado) y `src/content/cases/` (nota sobre un trabajo realizado; su cuerpo es opcional). `src/content/blog/` está declarada en `src/content.config.ts` pero vacía: el blog técnico es contenido planificado, no una superficie publicada.
- Todo archivo debe cumplir el schema Zod de su colección en `src/content.config.ts`. Los objetos de frontmatter son `z.strictObject()`: una clave que el schema no declara **falla el build** en vez de descartarse en silencio. No agregar campos al frontmatter sin agregarlos también al schema y darles un consumidor.
- Un campo opcional que no se conoce se **omite**; no se rellena con `N/A`, `Sin información` ni prosa genérica — el schema de `cases` rechaza explícitamente esos marcadores en los campos factuales.
- Cuando el blog se active: todo artículo vive en `src/content/blog/` y cumple `title`, `description`, `pubDate`, `author`, `tags`, `draft` (obligatorios), más `updatedDate` y `heroImage` (opcionales). No publicar un post con `draft` sin definir o con campos del schema incompletos.
- Componentes usados dentro de un `.mdx` se importan explícitamente en ese archivo; no depender de globals.

## Reglas de SEO, SEO local, GEO y AEO

- **Dónde vive el SEO:** no existe un componente `SeoHead`. El `<head>` lo emite `src/layouts/BaseLayout.astro` —title, description, canónica, `noindex`, favicons/PWA, Open Graph y Twitter—, con los valores por defecto de `src/config/seo.ts`. La política y los builders viven en `src/lib/seo/` (`page.ts` para canónica y `BreadcrumbList`, `services.ts` para las fichas de servicio, `organization.ts` para la entidad canónica, `schema.ts` para el vocabulario schema.org). Cada página o layout entrega sus datos: pasa `title`/`description`/`canonical` a `BaseLayout` e inyecta su JSON-LD por el `slot="head"`.
- Ninguna página se cierra sin title, description, canónica y Open Graph correctamente resueltos por esa vía. Si la página necesita datos estructurados, se construyen con los builders de `src/lib/seo/` — nunca con JSON-LD escrito a mano en el `.astro`.
- JSON-LD obligatorio: `Organization` (home), `Service` en cada página de servicio, `Article` en cada post de blog, `BreadcrumbList` donde exista jerarquía de navegación.
- **Entidad de negocio canónica:** el sitio declara `Organization` —no `LocalBusiness`—, definida en `src/lib/seo/organization.ts` y publicada únicamente en home. Su `@id` (`SERTECLINE_ORGANIZATION_ID`) es estable; cada `Service` la referencia vía `provider` con ese mismo `@id`, nunca redeclarando una organización aparte.
- **No migrar a `LocalBusiness` por defecto:** mientras SERTECLINE no disponga de una dirección comercial real, confirmada y publicable, la entidad canónica se mantiene en `Organization`. `src/data/contact.ts` omite dirección, horarios y email deliberadamente porque el negocio no los ha confirmado. `LocalBusiness` solo se evalúa mediante una decisión arquitectónica explícita, cuando existan datos reales suficientes para representarlo correctamente.
- **Nunca inventar datos de negocio** (`address`, `legalName`, horarios, email, redes) para completar un tipo de schema.org: si el dato no está confirmado, la propiedad no se declara.
- Cambiar el `@type` de la entidad canónica es una decisión arquitectónica explícita del usuario, nunca un efecto colateral de otra tarea, y debe conservar el `@id` para no romper las referencias `provider` existentes.
- **SEO local:** el `areaServed` del schema y el contenido de páginas de servicio deben reflejar las comunas reales listadas en `src/data/areas.ts` — no inventar cobertura geográfica.
- **AEO/GEO (optimización para respuestas de IA):** es una propiedad del contenido, no del markup — respuestas directas a preguntas concretas, frases autocontenidas, headings claros, listas donde correspondan, y el texto presente en el HTML visible (nunca solo detrás de JS). Priorizar afirmaciones verificables sobre relleno genérico. Ningún tipo de schema.org se justifica por un supuesto beneficio AEO/GEO.
- **`FAQPage` no es automático:** que una página tenga una sección de preguntas frecuentes no obliga a emitirlo. Se añade solo por decisión semántica explícita para esa página, y cada `Question`/`Answer` debe derivar 1:1 del mismo dataset que renderiza el HTML visible — nunca una segunda fuente de verdad, nunca preguntas que solo vean las máquinas. No se justifica por rich results, ranking ni beneficios en respuestas de IA no demostrados.
- **Estado actual de `FAQPage`:** las fichas de servicio lo emiten —ancladas a su `Service` vía `about`, dentro del mismo `@graph`— y se mantienen así. Home no lo incorpora: sus preguntas frecuentes se quedan en HTML visible. Cambiar cualquiera de las dos cosas es una decisión explícita del usuario, nunca un efecto colateral de otra tarea.
- `site` en `astro.config.mjs` y el sitemap deben mantenerse coherentes ante cualquier cambio de dominio.
- `robots.txt`: cualquier cambio en la política de crawlers de IA debe ser una decisión explícita, nunca un valor por defecto sin revisar.

## Reglas de accesibilidad y performance

- Contraste mínimo AA, foco visible en todo elemento interactivo, `prefers-reduced-motion` respetado en cualquier animación de Framer Motion.
- Imágenes propias siempre vía `astro:assets` (nunca `<img>` crudo para assets del proyecto), con dimensiones explícitas y formatos modernos (WebP/AVIF).
- Criterio de aceptación de performance: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- No cargar React ni Framer Motion en páginas/secciones que no los necesiten.

## Principios visuales de marca

- **Paleta:** verde, gris, blanco y negro. No introducir colores fuera de esta paleta sin aprobación explícita del usuario.
- **Atributos que cada decisión visual y de copy debe reforzar:** confianza, limpieza, cercanía, sostenibilidad, modernidad.
- Ante la duda sobre un componente, animación o texto: preguntarse si refuerza estos atributos o si se siente genérico/frío. Evitar la estética "IA por defecto" (ver skill `frontend-design`).

## Qué NO hacer

- No agregar SSR ni ningún adapter (Node, Vercel, Cloudflare, Netlify). El sitio es 100% estático.
- No integrar un CMS headless.
- No crear backend ni API routes propias sin que el usuario lo pida explícitamente.
- No agregar dependencias nuevas sin justificar la necesidad real (nada de librerías de estado, UI kits completos, o una segunda librería de animación).
- No implementar funcionalidad fuera del alcance de la tarea actual, aunque parezca "una mejora obvia".

## Flujo de trabajo

- Un cambio a la vez. No mezclar tareas no relacionadas en el mismo commit.
- Antes de dar por cerrada cualquier tarea de código, ejecutar y confirmar que pasan sin errores:
  1. `npm run check` (`astro check`)
  2. `npx tsc --noEmit`
  3. `npm run build`
- Formatear con `npm run format` antes de cerrar cambios de código.
- No hacer commit ni push salvo pedido explícito del usuario.

## Documentación de referencia

Documentación completa: https://docs.astro.build

Consultar estas guías antes de trabajar en tareas relacionadas:

- [Páginas, rutas dinámicas y middleware](https://docs.astro.build/en/guides/routing/)
- [Componentes de Astro](https://docs.astro.build/en/basics/astro-components/)
- [Componentes de React/Vue/Svelte](https://docs.astro.build/en/guides/framework-components/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Estilos y Tailwind](https://docs.astro.build/en/guides/styling/)
- [Internacionalización](https://docs.astro.build/en/guides/internationalization/)
