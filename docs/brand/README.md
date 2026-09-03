# Sistema de marca — integración (EPIC 3.1)

Origen: `sertecline-brand-kit` (checkpoint 3.2, derivado de la Dirección Creativa
aprobada en EPIC 2). `logo-kit` es material fuente anterior y no se integró
(ver «Excluido» abajo).

## Producción

| Contenido                                                           | Ubicación                             |
| ------------------------------------------------------------------- | ------------------------------------- |
| Logos (SVG + PNG: primary, dark, light, mono, horizontal, monogram) | `public/brand/logo/`                  |
| Favicons (ico, svg, apple-touch-icon, PNG 16/32/48)                 | `public/brand/favicon/`               |
| Iconos PWA (192, 512, 512 maskable)                                 | `public/brand/pwa/`                   |
| Web app manifest (generado desde `siteConfig`)                      | `src/pages/brand/site.webmanifest.ts` |
| Imágenes sociales (OG, Twitter card, WhatsApp preview)              | `public/brand/social/`                |
| Design tokens — Tailwind v4 `@theme`                                | `src/styles/tokens.css`               |
| Design tokens — JSON (fuente de verdad, no-CSS)                     | `src/config/design/tokens.json`       |

### Consumidores actuales

El sistema está integrado: estos assets se sirven hoy desde el sitio y no quedan
a la espera de un checkpoint de uso.

| Asset                                                      | Quién lo consume                                                                                             |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`       | `<head>` de `src/layouts/BaseLayout.astro`                                                                   |
| `src/pages/brand/site.webmanifest.ts`                      | `<link rel="manifest">` de `BaseLayout`; su copia se deriva de `siteConfig`                                  |
| `public/brand/pwa/icon-192 · icon-512 · icon-512-maskable` | array `icons` del webmanifest                                                                                |
| `public/brand/social/og-image.png`                         | `siteConfig.logo.og` → `seoDefaults.defaultImage` → `og:image` y `twitter:image` en `BaseLayout`             |
| `public/brand/logo/*.svg`                                  | mapa `LOGO_FILES` de `src/components/ui/Logo.astro`, montado por `Header.astro` y `Footer.astro` (`primary`) |
| `/brand/logo/logo.svg` vía `siteConfig.logo.default`       | propiedad `logo` del nodo `Organization` (`src/lib/seo/organization.ts`)                                     |
| `src/styles/tokens.css`                                    | importado por `src/styles/global.css`; define el `@theme` de Tailwind v4 del que salen las utilidades        |
| `src/styles/brand.css`                                     | importado por `src/styles/global.css`; `@font-face` de las familias de marca + reglas de documento           |
| `src/config/design/tokens.json`                            | fuente de verdad no-CSS de los valores y de los contrastes verificados; no se importa en runtime             |

Sin consumidor a la fecha: `public/brand/social/twitter-card.png` y
`whatsapp-preview.png` —`BaseLayout` sirve `og-image.png` también para
`twitter:image`—, los PNG `favicon-16/32/48.png` —el `<head>` declara SVG +
`.ico`— y `siteConfig.logo.icon`. Se conservan como parte del kit; ninguno
representa trabajo pendiente.

## Marca textual

- **Marca textual canónica: `Sertecline`.** Es la forma que usan metadata,
  datos estructurados, manifest, nombres accesibles, `alt`, copy y esta
  documentación.
- **Wordmark visual: `SERTECLine`.** Es intencional y vive únicamente dentro de
  los SVG de `public/brand/logo/` y del favicon SVG, como forma dibujada de la
  marca. No es un nombre alternativo y no se usa como texto en ninguna
  superficie.

## Geometría del wordmark (EPIC 8 — Checkpoint 8.4.2)

Los siete SVG de marca dibujan el wordmark y el monograma como **contornos
vectoriales**, no como `<text>` vivo. Hasta 8.4.2 declaraban
`font-family: 'Arial Black', Arial, Helvetica, sans-serif`, así que el dibujo de
cada glifo lo resolvía la fuente instalada en el equipo del visitante: sólo
Windows veía la forma aprobada, y los demás sistemas recibían una sustitución
que perdía entre 12 % y 29 % del área de tinta.

La geometría actual proviene de **Archivo 900**, la familia que el sitio ya
self-hostea bajo SIL OFL 1.1 (`public/fonts/archivo-OFL.txt`), convertida a
`<path>`. Consecuencias que conviene no reabrir por accidente:

- Los assets no dependen de ninguna fuente instalada ni embebida: el render es
  idéntico en Windows, macOS, Linux, Android e iOS.
- `logo.svg`, `logo-dark.svg`, `logo-light.svg` y `logo-mono.svg` comparten la
  misma geometría y sólo difieren en los `fill`. `favicon.svg` y
  `logo-monogram.svg` siguen siendo el mismo archivo.
- Editar el wordmark ya no es editar texto: exige regenerar los contornos desde
  Archivo 900 y vuelve a requerir aprobación de marca.
- La marca textual canónica sigue siendo `Sertecline`, y es la que usan `alt`,
  `aria-label` y toda la metadata.

## Referencia (no producción)

`reference-components/` contiene los componentes de ejemplo tal como los
entregó el kit. Se guardan como referencia de implementación, **no se
integraron a `src/`** porque la tarea de EPIC 3.1 era solo el asset system y no
la creación de componentes:

- `BrandHead.astro` — snippet de `<head>` (favicons, manifest, OG, Twitter).
- `Logo.astro` / `Logo.tsx` — wrapper de logo por variante (Astro y React).
- `brand.css.example` — borrador temprano de tokens (checkpoint pre-3.2).
  **Superseded por `tokens.css`**: varios valores no coinciden con el
  design system aprobado (p. ej. `--color-brand-dark` difiere de
  `brandOnDark` en `tokens.json`). Se conserva solo como referencia
  histórica; no debe usarse como fuente de tokens.

Estos tres archivos escriben `SERTECLine` en sus encabezados y su copy porque
así los entregó el kit. Es material histórico congelado y no se corrige: la
marca textual del proyecto es la de arriba.

## Excluido

`./logo-kit` (raíz del repo, fuera de este proyecto) es el export de assets
previo a `sertecline-brand-kit`. Se revisó y no se integró porque:

- Está superseded por `sertecline-brand-kit` (checkpoint 3.2): el favicon,
  el monogram y el wordmark en color/mono ya existen en `public/brand/`
  con nombres normalizados y variantes equivalentes.
- Contiene variantes adicionales que **no forman parte del kit aprobado**
  (`combo/lockup-dark.png`, `monogram/isotipo-S-green.png`,
  `monogram/isotipo-S-white.png`, `social/whatsapp-avatar.png`,
  `wordmark/sertecline-original.png`, `wordmark/sertecline-black.*`).
  Integrarlas ahora implicaría introducir variantes visuales que no están
  referenciadas ni aprobadas en el checkpoint 3.2 — fuera del alcance de
  esa tarea ("no crear nuevas decisiones visuales").

Si alguna de esas variantes es necesaria a futuro, debe pasar primero por
aprobación de Dirección Creativa y añadirse explícitamente al brand kit.

## Integración completada

Los seis puntos que EPIC 3.1 dejó fuera de su alcance están resueltos. Se
conservan aquí —con su resolución, no como pendientes— porque cada uno registra
una decisión y dónde vive hoy:

1. **Favicons de marca en el `<head>` real.** `BaseLayout.astro` declara
   `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` y el manifest desde
   `public/brand/`. Los placeholders del scaffold de Astro (`public/favicon.ico`,
   `public/favicon.svg`) ya no existen en el repositorio.
2. **Layout base con la metadata de marca.** `src/layouts/BaseLayout.astro`
   sirve título/description/canónica, favicons y PWA, Open Graph y Twitter. No
   se creó un `<BrandHead>` aparte: con un único layout base, ese componente
   intermedio habría tenido un solo consumidor.
3. **Componente `<Logo>` de producción.** `src/components/ui/Logo.astro`, con
   las seis variantes del kit, `alt` `Sertecline` por defecto y modo
   `decorative` para cuando ya hay un texto equivalente al lado. Lo montan
   `Header.astro` y `Footer.astro`.
4. **Rutas de `src/config/site.ts`.** `logo.default`, `logo.icon` y `logo.og`
   apuntan a `/brand/logo/logo.svg`, `/brand/favicon/favicon.svg` y
   `/brand/social/og-image.png`. Ya no quedan rutas TODO hacia
   `src/assets/images/brand/`.
5. **`src/styles/brand.css` como capa aparte de `tokens.css`.** Existe, y su
   responsabilidad quedó acotada: las `@font-face` de Archivo y JetBrains Mono
   —self-hosted desde EPIC 8, checkpoint 8.3— y las reglas de documento
   (`body`, `::selection`, `:focus-visible`, `scroll-behavior`). No redefine
   ningún valor del sistema: todo lo referencia vía `var(--token)`.
6. **`tokens.css` importado desde `global.css`.** El design system está activo.
   El orden de import es `tailwindcss` → `tokens.css` → `brand.css`.
