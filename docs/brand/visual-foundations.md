# CP 9.2 — El oficio, a la vista

Dirección A aprobada. **El trabajo real debe ser visualmente más importante que
la interfaz.** C, «Cuaderno de intervención», participa solo en pies, líneas e
iconografía técnica. B queda descartada. Esta entrega demuestra fundamentos en
Home y Trabajos; el Hero fotográfico definitivo y los momentos de firma siguen
pendientes.

## Auditoría del sistema existente

| Decisión            | Elementos                                                                                                        | Aplicación                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| KEEP                | Paleta, Archivo, JetBrains Mono, logo, Container 720/1200/1360, escala 4px, botones, enlaces, foco               | Identidad y piso funcional conservados.                                              |
| REFINE              | Jerarquía de titulares, Section, imágenes, servicios, duraciones                                                 | Escala fluida; ritmo local; fotografía completa; lista editorial.                    |
| DEPRECATED VISUALLY | Badge como apertura universal, alternancia automática paper/paper-2, foto como tarjeta, grillas de peso uniforme | No retirar las primitivas que aún usan otras rutas; dejar de aplicarlas por defecto. |
| DEPRECATED VISUALLY | Sombras en fotografías, texto pequeño ink-3, revelados de 400ms                                                  | La evidencia se separa por espacio y línea; captions ink-2; sin nuevos reveals.      |

CSS es la fuente de implementación; `src/config/design/tokens.json` refleja los
valores para consumidores no CSS. `src/config/motion.ts` importa sus duraciones.
Cambiar un token implica mantener ambas representaciones alineadas.

## Gramática de composición

### A. Editorial Split

`EditorialSplit.astro`: contenido seguido de media real en el DOM. Una columna
hasta 1024px; dos columnas 1.2:1 desde ahí, con separación fluida de 32–64px.
La foto vertical se alinea al borde derecho y se limita a 384px; no hay columna
vacía cuando falta el slot de media. Consumidores reales: Hero y CaseCard.
El slot admite una figura con caption sin inventar un sistema de props.

Hero usa provisionalmente el resultado del caso seleccionado por
`featuredWorkContent.caseId`, resuelto mediante la consulta existente. Si se
despublica ese caso, la figura desaparece y el contenido ocupa una columna.
La referencia demuestra proporción y jerarquía; no sustituye la revisión de I15.

### B. Evidence Stage

FeaturedWork conserva DOM encabezado → evidencia → contexto. Desde 768px la
evidencia ocupa la columna derecha y las dos filas; en móvil queda inmediatamente
después de la introducción. Máximo 384px móvil y 480px escritorio para este
original vertical; sin recorte, filtro ni sombra. No se extiende una foto 9:16
a 1200px de ancho: su altura y resolución dejarían de ser creíbles.

`CaseEvidence` y el comparador aceptan `presentation="editorial"`. La variante
ajusta marco y candidatos de imagen; el valor por defecto conserva las fichas.
Una futura foto horizontal puede ocupar más ancho dentro de Container, tras
revisar su resolución. Evidence Stage es una regla compositiva, no otro wrapper
genérico con opciones anticipadas.

### C. Technical Note

`TechnicalNote.astro`: párrafo o figcaption, Archivo 13px, peso 500, tracking
wide (0.025em), interlínea relajada, tinta secundaria y filete fino. Contexto breve y factual. Se usa en
la foto provisional, la evidencia y el servicio asociado al trabajo.
No genera órdenes de trabajo, números de caso, fechas, lugares o mediciones.
La información proviene del modelo actual. Párrafos y navegación usan Archivo.

### D. Work Strip

CaseCard es ahora un artículo editorial independiente. Una lista vertical de
artículos permite 1, 2, 3–4 o más trabajos sin huecos ni celdas ficticias.
El resultado conserva su proporción: retrato limitado; horizontal con mayor
ancho disponible. No se asume un aspect ratio compartido entre casos.

El contrato permite una figura única o una pareja en el slot de media de
EditorialSplit. `CaseEvidence` ya resuelve pareja/resultado desde el modelo.
El índice demuestra **solo resultado**, evitando hidratar un comparador por
artículo. Antes/proceso/cover/galería/video siguen siendo capacidades futuras;
no se agregan campos al schema para simularlas ni se publica contenido ficticio.

## Tipografía, superficies y controles

- Display: 39–61px fluidos, Archivo 900, interlínea 1.05, tracking -0.03em.
- Editorial: 31–49px, Archivo 800, interlínea 1.1. Servicios: 25–31px, peso 700.
- Cuerpo: Archivo 16/20px. Medida de lectura máxima 65ch; sin Mono en párrafos.
- Microtexto factual: 13px ink-2. El token de 10px no se usa en esta entrega.
- Paper enlaza apertura, evidencia, servicios y cobertura. Paper-2 conserva
  su pausa de contacto; no se añade stage oscuro por decoración.
- Botones mantienen radios y tamaños actuales. Foto editorial: radio 2px,
  sin borde de tarjeta. Las fichas retienen su presentación por defecto.
- Las líneas separan contexto o servicios; no dibujan una cuadrícula ornamental.
- Servicios conserva seis enlaces HTML, nombres y explicaciones siempre visibles.

## Fotografía y tamaño

Solo assets ya aprobados de `src/assets/images/cases/`. `componentes` permanece
read-only: esta entrega no ingiere ni transforma sus archivos.

Conservar contexto, imperfecciones útiles, orientación y evidencia. Sin filtros,
grano falso, gradación dramática, reconstrucción por IA ni recortes que retiren
información. Los candidatos de Astro se limitan al ancho del original. Declarar
width/height y sizes acordes al contenedor. El original actual es 720×1280:
384px es el tamaño compacto y 480px el máximo de evidencia de esta entrega;
720px es techo de archivo, nunca promesa de nitidez 2× a 480px.

La imagen de apertura es eager/high; las siguientes son lazy. La repetición
temporal del mismo resultado en Hero/evidencia es una limitación de material,
no un patrón que deba extenderse al rediseño final.

## Iconografía

Caja 24×24, trazo 1.75, extremos y uniones redondos, color heredado, formas
simples sin fondos decorativos. Ejemplo nuevo: cepillo + gota para limpieza;
WashingMachine de Lucide valida la convivencia con el repertorio actual.
`sparkles` mantiene su llave de datos por compatibilidad, con nueva geometría.
Iconos decorativos `aria-hidden`; el nombre visible del servicio da significado.
La familia completa se diseña en un checkpoint posterior.

## Movimiento y reduced motion

| Familia   | Token                     | Valor | Uso                                        |
| --------- | ------------------------- | ----- | ------------------------------------------ |
| Micro     | duration-micro → fast     | 120ms | Color y respuesta de controles.            |
| Editorial | duration-editorial → slow | 260ms | Disponible para cambios de estado futuros. |
| Signature | duration-signature        | 200ms | Reservado; ninguna interacción nueva.      |

Curva quieta cubic-bezier(0.2, 0.8, 0.2, 1), sin rebote ni stagger por defecto.
El arrastre del comparador sigue 1:1 y su teclado usa fast desde el JSON.
`useReducedMotion` conserva su actualización inmediata. Los tokens nuevos se
vuelven 0ms con reduced motion y los nuevos hover no desplazan elementos en
ese modo. Nada empieza oculto ni depende de animación para ser legible.

## Responsive y accesibilidad

Viewports de aceptación: 375×812, 390×844, 768×1024, 1024×768, 1280×800,
1440×900, 1920×1080. Comprobar también reflow a 320px (1280 al 400%).
Gutters 16px móvil/24px escritorio; el contenido precede la foto del Hero.
No se cambia el orden de headings, FAQs o navegación. Foco visible, nombres
accesibles, teclado y scroll vertical sobre el comparador se conservan.
No usar el filete hairline como única señal de un control interactivo.

## Contrato WhatsApp — activar solo en CP 9.9

- z-contact 75: sobre sticky 50, bajo dropdown 100 y drawer 300. Ocultarlo o
  desactivarlo cuando haya menú/modal abierto; nunca competir con sus focos.
- Objetivo mínimo 48px; offset 16px más safe-area inferior y lateral.
- Reservar 80px + safe-area en el final del contenido **solo cuando exista**
  el CTA. Actualmente ningún contenedor consume contact-reserve.
- Evitar colisión con ContactActions, footer, comparador y navegación móvil:
  suprimir el flotante al entrar en la sección de contacto y durante overlays.
- Un solo enlace con nombre claro, posición lógica en el DOM y foco visible;
  sin autofocus ni trampa. No ocultar un elemento enfocado; cualquier traslado
  de foco debe ser explícito y devolverlo al disparador apropiado.
- Probar teclado, notch, orientación y zoom antes de activar el contrato.

## Presupuestos de aceptación

| Recurso                                | Presupuesto                                 |
| -------------------------------------- | ------------------------------------------- |
| JS inicial sin comparador              | ≤8KiB gzip                                  |
| JS total con comparador                | ≤110KiB gzip                                |
| Incremento visual                      | ≤6KiB gzip, preferir 0 islas nuevas         |
| Video inicial                          | 0B                                          |
| Imágenes sobre el pliegue              | objetivo ≤120KiB móvil / ≤220KiB escritorio |
| Media automática Home, incluido scroll | ≤650KiB móvil / ≤1MiB escritorio            |
| CLS                                    | ≤0.05                                       |

Presupuesto total de fuentes: **≤60 KiB**. CP 9.2.1 mantiene JetBrains Mono como
**DORMANT-BUT-INTENTIONAL**: sin uso en páginas ni petición de red. Archivo es la
única fuente activa; se conservan el asset, la licencia, el token y la declaración
de Mono para un futuro uso técnico sujeto a aprobación y presupuesto.

Medir HTML, CSS, JS inline/externo, fuentes y media con caché fría. DPR 1 y móvil DPR 2 deben
medirse por separado. Las capturas y resultados de CP 9.2 viven fuera del repo;
no confundir estas mediciones locales con métricas de campo.

## Fuera de alcance

Sin nuevos casos, hechos, schema, dependencias, video, parallax, View Transitions,
WhatsApp flotante, ingesta de I15 ni momentos de firma. FAQ, acreditaciones,
contacto y fichas conservan su diseño actual, salvo tokens compartidos y la
duración de teclado del comparador. El siguiente gate sigue siendo revisión CTO.

## CP 9.2.1 — clasificación de resize

La observación anterior de «texto al 200% + 320px» se produjo con
`document.documentElement.style.fontSize = '200%'` en un viewport emulado de
320×900. Cambia la raíz de 16 a 32px y duplica también medidas de layout en rem;
no es zoom de página ni un modo nativo de zoom exclusivo de texto.

Reproducción independiente, Chromium 149, mismas condiciones en baseline
7cc4f0c y CP 9.2:

| Ruta                  | scrollWidth / clientWidth, ambos estados | Delta | Causa del extremo derecho                     |
| --------------------- | ---------------------------------------- | ----- | --------------------------------------------- |
| Home                  | 526 / 320px                              | 206px | Titular «Acreditaciones del técnico» ampliado |
| Trabajos              | 479 / 320px                              | 159px | Header: logo y disparador del menú en rem     |
| Limpieza de lavadoras | 518 / 320px                              | 198px | Palabra del h1 ampliado                       |

Esta modificación sintética requiere desplazamiento horizontal y puede dejar
texto de los CTA centrados fuera del borde izquierdo. No se describe como una
prueba sin recortes, ni se usa para declarar conformidad o incumplimiento WCAG.

La prueba pertinente utiliza zoom real de Chromium mediante `chrome.tabs.setZoom`,
verificado con `getZoom`, sobre una ventana de contenido de 1280×1024: 200%
produce 640×512 CSS px y 400% produce 320×256, con raíz CSS de 16px. En las tres
rutas, baseline, CP 9.2 y remediación conservan scrollWidth = clientWidth,
texto visible sin recortes y funcionamiento de menú, Escape/foco, CTA, FAQ y
comparador cuando existen. No se detectó pérdida de contenido ni funcionalidad
en esos modos. Chromium no proporciona zoom nativo exclusivo de texto en este
harness; no se afirma haberlo probado.

Clasificación del hallazgo anterior: **PREEXISTING NON-MATERIAL TEST ARTIFACT**.
Se refiere al indicador sintético como supuesto fallo de zoom/reflow: no se
reproduce con el zoom real. **NO FIX REQUIRED** en estilos responsive; no se
introducen cambios para llevar a cero el overflow de una modificación del CSS.

Referencias de evaluación: [WCAG 1.4.4 Resize Text](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html)
y [WCAG 1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).
Los resultados son de los modos y rutas ensayados, no una recertificación global.
