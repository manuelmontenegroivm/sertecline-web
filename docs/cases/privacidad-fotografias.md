# Compuerta de privacidad para fotografías de Cases (EPIC 7 — Checkpoint 7.2)

Procedimiento obligatorio para **toda** fotografía que entre a
`src/assets/images/cases/`. Sin excepciones y sin "después lo revisamos".

```
foto cruda del teléfono
  → inspección / sanitización
  → activo aprobado
  → repositorio
```

Nunca:

```
foto cruda del teléfono
  → repositorio
  → "después revisamos"
```

La razón del orden: el repositorio tiene historia. Una fotografía con
coordenadas GPS que se sube y se corrige después **sigue estando** en el
historial de Git, y borrarla de ahí exige reescribir historia. La revisión ocurre
antes de que el archivo exista en el repositorio, porque después ya es tarde.

## Parte A — Metadata (automatizada)

```bash
npm run validate:case-images
```

También corre solo, como parte de `npm run build`: un archivo con metadata **no
llega a producción**, y la compuerta no depende de que alguien se acuerde de
ejecutarla.

> **El comando canónico de build de este proyecto es `npm run build`**, nunca
> `astro build` directo. `astro build` salta el script `build` de
> `package.json` y con él esta compuerta, dejando pasar a producción
> exactamente lo que esta página existe para impedir. Aplica al build local, a
> cualquier pipeline de CI y a la configuración de build del hosting.
>
> Verificado en CP 7.2: el repositorio no contiene configuración de deployment
> —sin workflows de CI, sin `netlify.toml`, `vercel.json` ni equivalente—, así
> que hoy no existe ningún build automatizado que pueda estar saltándose la
> compuerta. El día que se configure uno, debe invocar `npm run build`.

Qué hace: recorre todo `src/assets/images/cases/` y **rechaza** cualquier archivo
que contenga bloques de metadata incrustados —EXIF, XMP o IPTC— o cuyo formato
esté fuera de la lista permitida (JPEG, PNG, WebP, AVIF).

Ahí es donde una fotografía de teléfono guarda, sin que se vea nada al mirarla:

| Bloque | Qué puede llevar                                                                  |
| ------ | --------------------------------------------------------------------------------- |
| EXIF   | Coordenadas GPS, fecha y hora exactas, marca/modelo del teléfono, número de serie |
| XMP    | Autor, historial de edición, software, identificadores, ubicación                 |
| IPTC   | Autor, descripción, créditos, ubicación                                           |

Se rechaza **toda** la metadata, no solo el bloque GPS. Un activo aprobado no
tiene ninguna razón para conservar EXIF, y "cero metadata" es una regla binaria y
auditable; "EXIF sí, pero sin GPS" obliga a mantener una lista de campos
sensibles que siempre queda corta.

Sin dependencias nuevas: usa `sharp`, que ya está instalado porque es el servicio
de imágenes de Astro. Si `sharp` faltara, el script **falla** en vez de pasar en
silencio — una compuerta que se desactiva sola no es una compuerta.

### Cómo sanitizar

La forma más simple y verificable, con lo que el proyecto ya tiene:

```bash
node -e "const s=require('sharp'); s('cruda.jpg').rotate().jpeg({quality:82}).toFile('limpia.jpg')"
```

`sharp` no copia metadata al archivo de salida salvo que se lo pida
explícitamente (`.withMetadata()` / `.withExif()` — **no usar**). `.rotate()` sin
argumentos aplica la orientación EXIF a los píxeles antes de descartarla, para
que la imagen no quede girada al perder ese campo.

Después: mover el archivo limpio a `src/assets/images/cases/<slug>/` y volver a
correr `npm run validate:case-images`.

## Parte B — Contenido visible (revisión humana obligatoria)

**La Parte A no mira dentro de la imagen.** Ningún check automatizado de este
repositorio detecta lo que sigue, y ninguno lo hará: son juicios, no formatos.
Que `validate:case-images` pase **no significa** que una fotografía sea
publicable.

Revisar cada fotografía, a tamaño completo y con zoom, contra esta lista:

- [ ] **Rostros** — de personas, en primer plano o al fondo.
- [ ] **Reflejos** — en el tambor, el vidrio de la puerta, azulejos, espejos,
      pantallas o cualquier superficie pulida. Un reflejo puede mostrar a quien
      toma la foto o el interior de la vivienda.
- [ ] **Documentos** — a la vista o parcialmente visibles.
- [ ] **Boletas y facturas.**
- [ ] **Órdenes de trabajo** — propias o de terceros.
- [ ] **Números de serie** — del equipo o de sus componentes, incluidas
      etiquetas del fabricante.
- [ ] **Patentes de vehículos.**
- [ ] **Nombres** — en documentos, etiquetas, correspondencia, ropa, mochilas.
- [ ] **Teléfonos** — anotados en cualquier superficie, incluidos imanes y
      calendarios de refrigerador.
- [ ] **Direcciones** — placas, sobres, boletas de servicios.
- [ ] **Números de departamento** — puertas, buzones, llaveros.
- [ ] **Objetos personales identificables** — fotos familiares, diplomas,
      medicamentos, correspondencia, ropa distintiva.
- [ ] **Consentimiento del cliente** — ¿autorizó publicar estas fotografías?

Reglas al resolver un hallazgo:

- **Recortar antes que difuminar.** Un recorte quita el dato; un difuminado deja
  el original debajo si se hace mal y siempre deja la pregunta de si fue
  suficiente.
- **Si el recorte destruye la evidencia, la fotografía se descarta.** Una foto no
  publicable es una foto que no se publica; no se compensa con otra cosa.
- **Ante la duda, no se publica.** El costo de descartar una fotografía es cero.

Sobre el consentimiento: es **bloqueante y previo**. No es un campo del
frontmatter porque no es un dato del caso, es la condición para que el caso
exista. Sin autorización del cliente, la fotografía no se sanitiza, no se guarda
y no se prepara: se descarta.

## Resumen: qué cubre cada parte

| Riesgo                                         | Automatizado | Humano |
| ---------------------------------------------- | ------------ | ------ |
| EXIF (incluye GPS, fecha, equipo, nº de serie) | ✅           |        |
| XMP                                            | ✅           |        |
| IPTC                                           | ✅           |        |
| Formato de archivo no permitido                | ✅           |        |
| Rostros                                        |              | ✅     |
| Reflejos                                       |              | ✅     |
| Documentos, boletas, órdenes de trabajo        |              | ✅     |
| Números de serie visibles                      |              | ✅     |
| Patentes                                       |              | ✅     |
| Nombres, teléfonos, direcciones, departamento  |              | ✅     |
| Objetos personales identificables              |              | ✅     |
| Consentimiento para publicación                |              | ✅     |

La columna automatizada es **todo** lo que una herramienta puede decidir con lo
que este proyecto tiene instalado. El resto no está pendiente de automatizar:
no es automatizable, y presentarlo como cubierto sería simular una protección
que no existe.
