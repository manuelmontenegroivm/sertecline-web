/**
 * Formato de fecha para superficies publicadas (EPIC 7 — Checkpoint 7.3).
 *
 * GRANULARIDAD: mes y año, nunca día ni hora. `completedAt` almacena la fecha
 * real del trabajo (ver docs/cases/README.md) y ese valor no cambia; lo que se
 * publica es más grueso a propósito. Un día exacto junto a una comuna es un
 * dato más fino de lo que un trabajo publicado necesita —y de lo que conviene
 * a la privacidad del cliente, que es la misma razón por la que no se registra
 * dirección ni altura—, mientras que "marzo de 2026" ya responde la pregunta
 * que un lector se hace: si esto es reciente.
 *
 * `timeZone: 'UTC'` no es un detalle. `z.coerce.date()` interpreta `2026-03-01`
 * como medianoche UTC; formateado en la zona local de Chile (UTC−3/−4) esa
 * fecha cae el 29 de febrero y el mes publicado sería el anterior al real. Se
 * formatea en la misma zona en que se almacena.
 *
 * La mayúscula inicial se aplica aquí porque el valor se imprime como dato
 * suelto —una fila de "Fecha" en la ficha, una línea de metadatos en la
 * tarjeta—, no dentro de una frase, donde el español pide el mes en minúscula.
 */
const MONTH_YEAR = new Intl.DateTimeFormat('es-CL', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatMonthYear(date: Date): string {
  const formatted = MONTH_YEAR.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
