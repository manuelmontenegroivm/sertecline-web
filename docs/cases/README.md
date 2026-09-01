# Contrato de captura de trabajos reales (EPIC 7 — Checkpoint 7.2)

Cómo entra un trabajo realizado a la colección `cases`. Aplica a **todo trabajo
capturado a partir de este checkpoint**.

El caso ya publicado (`limpieza-profunda-lavadora`) es anterior a este contrato:
no tiene comuna, fecha ni hechos técnicos registrados, y **no se le inventan**.
Ver «Compatibilidad histórica» al final.

## El flujo

```
trabajo realizado
  → captura (preguntas al técnico + fotografías)
  → validación factual      (¿lo que dice el registro es lo que pasó?)
  → validación técnica      (¿la descripción es correcta?)
  → revisión de privacidad  (docs/cases/privacidad-fotografias.md)
  → preparación del contenido (frontmatter + assets)
  → aprobación humana
  → publicación (draft: false)
```

Ningún paso se salta y ninguno es automático. **La captura no publica.** No
existe —ni debe existir— un mecanismo que lleve un trabajo capturado a
`draft: false` sin que una persona lo apruebe. No hay backend, ni CMS, ni
formulario público, ni automatización autónoma: la publicación es una edición de
archivos en el repositorio, revisada como cualquier otro cambio.

## 1. Preguntas al técnico

Estas once preguntas son la captura completa. Se responden después del trabajo,
idealmente el mismo día.

| #   | Pregunta                                              | Obligatoria | Campo                         |
| --- | ----------------------------------------------------- | ----------- | ----------------------------- |
| 1   | ¿Qué servicio se realizó?                             | Sí          | `service`                     |
| 2   | ¿En qué comuna o sector se realizó?                   | Sí          | `area`                        |
| 3   | ¿Qué día se realizó?                                  | Sí          | `completedAt`                 |
| 4   | ¿Hay fotografía del resultado?                        | Sí          | `evidence.result`             |
| 5   | ¿Hay fotografía previa?                               | Sí/No       | `evidence.before` (si la hay) |
| 6   | ¿El cliente autorizó publicar las fotografías?        | Sí          | — (bloquea la publicación)    |
| 7   | ¿Qué problema reportó el cliente, si hubo uno?        | Si existió  | `reportedIssue`               |
| 8   | ¿Qué encontraste al revisar, si hubo un hallazgo?     | Si existió  | `technicalFinding`            |
| 9   | ¿Qué trabajo hiciste?                                 | Sí          | `workPerformed`               |
| 10  | ¿Cómo quedó el equipo?                                | Sí          | `outcome`                     |
| 11  | ¿Marca del equipo, si está confirmada y aporta valor? | Opcional    | `brand`                       |

Notas:

- **Sin fotografía del resultado no hay caso.** Es la evidencia mínima. No se
  reemplaza por una imagen de archivo, ni por una foto de otro trabajo, ni por la
  misma foto duplicada como "antes".
- **La pregunta 5 puede responderse "no".** Un trabajo con una sola fotografía es
  representable y se muestra como fotografía estática. No se inventa un "antes".
- **La pregunta 6 es bloqueante.** Sin autorización del cliente, el trabajo no se
  publica. No es un campo del schema porque el consentimiento no es un dato del
  caso: es la condición para que el caso exista.
- **Las preguntas 7 y 8 pueden no aplicar.** Una mantención preventiva o una
  limpieza no parten de una avería. Si no hubo síntoma o no hubo hallazgo, el
  campo **se omite**. No se escribe `N/A`, `No aplica` ni `Sin información`: el
  schema los rechaza y el build falla (ver `src/content.config.ts`).

### Lo que NO se pregunta ni se registra

Nombre del cliente · RUT · teléfono · dirección · altura · número de
departamento · número de serie del equipo · cualquier otro dato personal que el
caso no necesite.

Un caso publica **un trabajo**, no un cliente. La comuna es la única referencia
geográfica que se registra, y es deliberadamente gruesa.

## 2. Validación factual y técnica

Antes de escribir el frontmatter, alguien distinto de quien capturó revisa:

- que cada afirmación corresponda al trabajo realizado;
- que la descripción técnica sea correcta y no prometa más de lo que se hizo;
- que no haya garantías, plazos, precios ni resultados extrapolables a otros
  equipos;
- que la comuna sea la real y exista en el vocabulario geográfico
  (`src/data/places.ts`). Un ID inexistente falla el build.

## 3. Revisión de privacidad

Obligatoria para toda fotografía, sin excepción. Procedimiento completo en
[`privacidad-fotografias.md`](./privacidad-fotografias.md).

Regla de oro:

```
foto cruda del teléfono → inspección / sanitización → activo aprobado → repositorio
```

Nunca:

```
foto cruda del teléfono → repositorio → "después revisamos"
```

## 4. Preparación del contenido

Un archivo en `src/content/cases/<slug>.mdx`. Las fotografías aprobadas en
`src/assets/images/cases/<slug>/`.

```yaml
---
title: 'Título del trabajo'
shortDescription: 'Una frase de qué se hizo.'
service: reparacion-lavadoras # ID de src/data/services.ts
area: nunoa # ID de src/data/places.ts
completedAt: 2026-03-14
brand: samsung # solo si está confirmada
evidence:
  result: ../../assets/images/cases/<slug>/result.jpg # OBLIGATORIA
  before: ../../assets/images/cases/<slug>/before.jpg # solo si existe
  caption: 'Pie de foto opcional.'
reportedIssue: 'Lo que reportó el cliente.' # solo si existió
technicalFinding: 'Lo que se encontró.' # solo si existió
workPerformed: 'Lo que se hizo.'
outcome: 'Cómo quedó.'
draft: true # entra siempre en borrador
---
```

Reglas del frontmatter:

- **Entra siempre con `draft: true`.** Pasa a `false` solo en el paso 6.
- **Un campo sin dato se omite**, no se rellena. La ausencia de un dato se
  representa como ausencia.
- El cuerpo MDX es opcional. Hoy ninguna superficie lo renderiza (queda para la
  página de detalle, CP 7.3), así que no se escribe prosa por escribirla.

## 5. Aprobación humana

Una persona revisa el caso completo —texto, fotografías, consentimiento— y
aprueba. Esta aprobación es explícita y no la sustituye ningún check
automatizado: `npm run validate:case-images` cubre metadata de archivo, nada
más.

## 6. Publicación

`draft: false` + `npm run check`, `npx tsc --noEmit` y `npm run build` en verde.

La selección del caso que aparece en la portada es una decisión editorial
aparte: se declara por ID en `src/data/featuredWork.ts#caseId`. Publicar un caso
no lo destaca, y no existe una selección automática del "último caso".

## Compatibilidad histórica

El schema (`src/content.config.ts`) mantiene `area`, `completedAt`, `brand` y los
cuatro campos factuales como **opcionales**. Esto es deliberado y no contradice
este documento:

> Que un campo sea obligatorio para trabajos nuevos no significa que se pueda
> inventar en un caso histórico que no lo tiene.

El único caso publicado se registró antes de este contrato. Volver `area` o
`completedAt` obligatorios en el schema obligaría a inventarle una comuna y una
fecha para que el sitio compilara — exactamente lo que este proyecto no hace.

La obligatoriedad para trabajos nuevos vive **aquí**, en el contrato de captura,
y se hace cumplir en la revisión humana. Cuando todos los casos publicados tengan
estos datos, el schema puede endurecerse; hasta entonces, la diferencia entre las
dos columnas es intencional.

Lo que el schema **sí** obliga, para todos por igual:

- `evidence.result` — sin fotografía del resultado no hay caso;
- `service`, `area` y `brand` válidos contra sus catálogos: un ID inexistente
  falla el build, no desaparece en silencio;
- campos factuales sin marcadores de relleno.
