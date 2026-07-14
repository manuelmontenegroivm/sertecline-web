# Sistema de marca — integración (EPIC 3.1)

Origen: `sertecline-brand-kit` (checkpoint 3.2, derivado de la Dirección Creativa
aprobada en EPIC 2). `logo-kit` es material fuente anterior y no se integró
(ver «Excluido» abajo).

## Producción

| Contenido                                                           | Ubicación                       |
| ------------------------------------------------------------------- | ------------------------------- |
| Logos (SVG + PNG: primary, dark, light, mono, horizontal, monogram) | `public/brand/logo/`            |
| Favicons (ico, svg, apple-touch-icon, PNG 16/32/48)                 | `public/brand/favicon/`         |
| Iconos PWA (192, 512, 512 maskable)                                 | `public/brand/pwa/`             |
| Web app manifest                                                    | `public/brand/site.webmanifest` |
| Imágenes sociales (OG, Twitter card, WhatsApp preview)              | `public/brand/social/`          |
| Design tokens — Tailwind v4 `@theme`                                | `src/styles/tokens.css`         |
| Design tokens — JSON (fuente de verdad, no-CSS)                     | `src/config/design/tokens.json` |

Ninguno de estos archivos está referenciado todavía desde el `<head>` del
sitio ni desde componentes: la integración de uso (Layout, `<BrandHead>`,
componente `<Logo>`) queda para un checkpoint posterior. Ver «Próximos pasos».

## Referencia (no producción)

`reference-components/` contiene los componentes de ejemplo tal como los
entregó el kit. Se guardan como referencia de implementación, **no se
integraron a `src/`** porque la tarea actual es solo el asset system
(EPIC 3.1) y no la creación de componentes:

- `BrandHead.astro` — snippet de `<head>` (favicons, manifest, OG, Twitter).
- `Logo.astro` / `Logo.tsx` — wrapper de logo por variante (Astro y React).
- `brand.css.example` — borrador temprano de tokens (checkpoint pre-3.2).
  **Superseded por `tokens.css`**: varios valores no coinciden con el
  design system aprobado (p. ej. `--color-brand-dark` difiere de
  `brandOnDark` en `tokens.json`). Se conserva solo como referencia
  histórica; no debe usarse como fuente de tokens.

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
  esta tarea ("no crear nuevas decisiones visuales").

Si alguna de esas variantes es necesaria a futuro, debe pasar primero por
aprobación de Dirección Creativa y añadirse explícitamente al brand kit.

## Próximos pasos (fuera de alcance de esta integración)

1. Reemplazar los favicons placeholder de Astro (`public/favicon.ico`,
   `public/favicon.svg`, generados por el scaffold) por los de
   `public/brand/favicon/` en el `<head>` real del sitio.
2. Crear el Layout base y montar `BrandHead.astro` (o su equivalente) usando
   `reference-components/BrandHead.astro` como punto de partida.
3. Crear el componente `<Logo>` de producción en `src/components/` a partir
   de `reference-components/Logo.astro` / `Logo.tsx`.
4. Actualizar `src/config/site.ts` (`logo.default`, `logo.icon`, `logo.og`)
   para apuntar a `/brand/logo/logo.svg`, `/brand/favicon/favicon.svg` y
   `/brand/social/og-image.png` respectivamente (hoy apuntan a rutas TODO
   en `src/assets/images/brand/`).
5. Decidir si `src/styles/brand.css` debe existir como capa aparte de
   `tokens.css` (p. ej. solo para `@import` de fuentes Archivo/JetBrains
   Mono) — no se creó en esta integración para no fabricar una decisión de
   diseño no aprobada.
6. Importar `tokens.css` desde `src/styles/global.css` cuando se decida
   activar el design system (no se tocó `global.css` en esta integración).
