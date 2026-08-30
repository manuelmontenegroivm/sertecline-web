/**
 * Acreditaciones publicables del técnico (EPIC 4.1 — Checkpoint 4.1.15).
 *
 * PERTENENCIA: estas acreditaciones son de la PERSONA que realiza los trabajos,
 * no de Sertecline. El nombre de la constante lo dice para que la distinción no
 * dependa de leer este comentario: cualquier superficie que la consuma debe
 * atribuirlas al técnico. Ninguna redacción puede derivar de aquí que la empresa
 * esté certificada, acreditada o autorizada — igual que estar en
 * src/data/brands.ts no implica servicio oficial de esa marca.
 *
 * Rótulos LITERALES, transcritos tal como el negocio los confirmó. No declaran
 * alcance regulatorio: "clase 3" y "clase D" son la denominación de la
 * categoría, no una descripción de qué trabajos habilitan. Ninguna superficie
 * debe expandirlos ("autorizado para…", "habilitado para…") ni inferir de ellos
 * qué servicios puede prestar el negocio.
 *
 * QUÉ NO MODELAR — NUNCA, tampoco "más adelante":
 * número de registro, folio, licencia, identificador, fecha de emisión o
 * vigencia, organismo emisor, URL de verificación, imagen o copia del
 * documento, RUT, domicilio, nombre del titular. El técnico pidió expresamente
 * no compartir los datos ni los documentos de sus acreditaciones porque podrían
 * usarse para falsificarlas, y un campo opcional preparado "por si acaso" es
 * una invitación a llenarlo. Por eso el modelo es una lista de rótulos y no un
 * objeto con campos: no hay dónde guardar lo que no debe guardarse.
 *
 * Sin `id` a propósito: no habría consumidor. No existe lookup, ni relación
 * declarada con src/data/services.ts, ni ruta derivada de estos valores — el
 * orden del array es el orden de despliegue, como en src/data/faqs.ts. Si algún
 * día una ficha de servicio necesita referenciar una acreditación concreta, ese
 * checkpoint agrega la clave junto con su consumidor, no antes (ver la deuda ya
 * registrada de `Service.slug` en src/data/services.ts, un campo sin lector).
 *
 * Son dos, no tres: el negocio mencionó además una acreditación asociada a la
 * Superintendencia de Electricidad y Combustibles, pero su denominación formal
 * exacta no está confirmada. No se publica un rótulo aproximado ni un
 * placeholder a la espera de confirmación — mismo criterio con el que
 * src/data/contact.ts omite email, dirección y horarios en vez de inventarlos.
 * Cuando exista la denominación exacta, se agrega una fila más aquí y el
 * componente no cambia.
 */
export const technicianAccreditations: readonly string[] = [
  'Instalador de gas clase 3',
  'Instalador eléctrico clase D',
];

export interface AccreditationsContent {
  heading: string;
  intro: string;
  note: string;
}

/**
 * Copy del bloque que muestra las acreditaciones. En este archivo y no en un
 * `accreditationsSection.ts` aparte: la separación catálogo/copy que sí tienen
 * areas.ts y coverageSection.ts existe porque allí hay 41 entidades y una
 * selección editorial que elegir entre ellas. Aquí hay dos rótulos fijos que se
 * renderizan completos, así que un segundo archivo no separaría nada — mismo
 * criterio con el que src/data/featuredWork.ts guarda copy y dato juntos.
 *
 * `heading` (EPIC 5 — Checkpoint 5.6) nombra la sección y, con ello, hace la
 * atribución en el elemento de mayor peso del bloque: "del técnico" es la
 * distinción que este contenido no puede perder, y decirla en el h2 significa
 * que también la recibe quien solo escanea titulares o navega por encabezados.
 * Dice "del técnico" y no "de nuestro técnico" ni "de nuestro equipo": el
 * posesivo lo devolvería al terreno de la empresa, que es exactamente lo que el
 * `note` niega tres líneas más abajo. No enumera, no cuenta ("dos
 * acreditaciones") ni califica ("acreditaciones vigentes", "oficiales"): la
 * cantidad la anuncia la lista y la vigencia no está confirmada.
 *
 * `intro` carga la atribución en frase completa: nombra al técnico como sujeto
 * y califica la acreditación de "personal". Termina en dos puntos porque la
 * lista es su complemento gramatical, no un adorno junto a ella; leída sola,
 * sigue siendo una afirmación completa y verificable — que es lo que un motor
 * generativo puede citar (ver reglas AEO en CLAUDE.md). Se conserva palabra por
 * palabra pese a solaparse con el nuevo `heading`: el solape es deliberado, es
 * la misma atribución dicha en dos registros (rótulo y oración), y es la
 * oración —no el titular— la unidad que una respuesta generativa cita.
 *
 * `note` repite la atribución en negativo. No es redundancia: es la distinción
 * que el checkpoint exige dejar inequívoca, y el lector que solo escanea los
 * rótulos necesita encontrarla debajo de ellos, no solo encima.
 *
 * Deliberadamente ausentes: años de experiencia, garantías, reseñas, número de
 * trabajos, nombres de comunas, de servicios y de marcas. Nada de eso está
 * confirmado y ninguno pertenece a una afirmación sobre quién ejecuta el
 * trabajo — mismo criterio que src/data/serviceCta.ts.
 */
export const accreditationsContent: AccreditationsContent = {
  heading: 'Acreditaciones del técnico',
  intro: 'Las visitas técnicas las realiza un técnico con acreditación personal como:',
  note: 'Son acreditaciones de la persona que hace el trabajo, no de la empresa.',
} as const;
