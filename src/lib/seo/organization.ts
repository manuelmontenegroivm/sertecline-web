/**
 * Entidad Sertecline en el grafo del sitio (EPIC 4.1 — Checkpoint 4.1.16).
 *
 * Capa de política, no de vocabulario: decide qué declara Sertecline sobre sí
 * misma y le pide a src/lib/seo/schema.ts que lo escriba. Es la contraparte de
 * services.ts —que hace lo mismo para cada ficha— y su dependencia: un servicio
 * lo presta la organización, así que el `provider` y el área de cobertura salen
 * de aquí y no al revés.
 *
 * @type es Organization y no LocalBusiness: LocalBusiness exige `address`, y
 * src/data/contact.ts omite dirección, horarios y correo a propósito porque el
 * negocio no los ha confirmado. Un LocalBusiness sin dirección declara un tipo
 * que incumple su propia propiedad requerida. Cuando existan esos datos, basta
 * cambiar el @type manteniendo el mismo @id: las fichas de servicio no se
 * enteran.
 *
 * No se consumen siteConfig.legalName ni contactInfo.legalName: ambos son un
 * placeholder sin confirmar.
 */
import { siteConfig } from '../../config/site';
import { contactInfo } from '../../data/contact';
import { buildOrganizationSchema, serializeJsonLdGraph, type OrganizationRef } from './schema';

/**
 * @id canónico de la entidad. **Definición única del literal `#organization` en
 * todo `src/`**: las fichas de servicio lo referencian desde su `provider` y
 * home publica el nodo con este mismo valor, así que dos cadenas construidas
 * por separado dejarían la referencia colgando sin que falle el build.
 *
 * Es un fragmento de la URL raíz, y por eso el nodo se emite en home
 * (src/pages/index.astro) y en ninguna otra página: un @id que apunta a un
 * fragmento de `/` debe definirse en `/`.
 */
export const SERTECLINE_ORGANIZATION_ID = new URL('/#organization', siteConfig.url).toString();

/**
 * Referencia a la organización para el `provider` de cada Service. Solo
 * identidad —@id, nombre y URL—: el resto de las propiedades vive en el nodo
 * completo que publica home, y JSON-LD las fusiona por @id.
 */
export const SERTECLINE_ORGANIZATION: OrganizationRef = {
  id: SERTECLINE_ORGANIZATION_ID,
  name: siteConfig.name,
  url: new URL('/', siteConfig.url).toString(),
};

/**
 * Plaza de cobertura formal del proyecto (ver CLAUDE.md). Label regional, no
 * una comuna puntual de src/data/areas.ts.
 *
 * Vive aquí y no en services.ts porque describe al negocio: las fichas la
 * heredan para enriquecer título y descripción con contexto local.
 */
export const SERTECLINE_LOCATION = 'Santiago';

/**
 * `areaServed` de la organización y de cada servicio — un solo valor, así que
 * el grafo no puede declarar dos coberturas distintas.
 *
 * Texto y no un Place estructurado: no hay dirección ni coordenadas. Tampoco
 * las 41 entidades de src/data/areas.ts, que ese archivo reserva a propósito
 * para un futuro LocalBusiness: home muestra una selección de 14 comunas, y
 * declarar 41 publicaría una cobertura sin contraparte visible. El detalle por
 * comuna corresponde a las páginas GEO, donde cada una tendrá la suya.
 * Región y país sí son verificables y desambiguan "Santiago".
 */
export const SERTECLINE_AREA_SERVED = `${SERTECLINE_LOCATION}, Región Metropolitana, Chile`;

/**
 * JSON-LD de home: el string ya serializado, para que la página no arme objetos.
 *
 * Cada propiedad sale de la SSOT que ya la publica en el HTML, y solo se
 * declaran las que tienen contraparte visible en home: el nombre (Header),
 * el teléfono (CTA "Llamar al …"), la descripción (subtítulo del hero y FAQ),
 * el área (sección Cobertura) y el logo (Header). Quedan fuera dirección,
 * correo, horarios, redes y razón social: ninguno está confirmado.
 *
 * `telephone` es contactInfo.phone tal cual, con sus espacios: schema.org lo
 * define como texto, el número trae código de país, y así la cadena del grafo
 * es idéntica a la que el visitante lee en pantalla. La normalización de
 * lib/utils/contact.ts existe para los esquemas `tel:` y wa.me, no para esto.
 *
 * WhatsApp no aparece: el número ya está declarado una vez en `telephone`, y
 * schema.org no tiene forma de decir "este número atiende por WhatsApp"
 * —`sameAs` identifica entidades, no enlaces de acción con mensaje precargado—.
 *
 * Devuelve un @graph de un solo nodo, no el nodo suelto: el grafo de home va a
 * crecer (WebSite, las preguntas frecuentes que ya se muestran), y entonces
 * será un elemento más del array en vez de un rediseño del bloque.
 */
export function buildOrganizationStructuredData(): string {
  return serializeJsonLdGraph([
    buildOrganizationSchema({
      id: SERTECLINE_ORGANIZATION.id,
      name: SERTECLINE_ORGANIZATION.name,
      url: SERTECLINE_ORGANIZATION.url,
      description: siteConfig.description,
      telephone: contactInfo.phone,
      areaServed: SERTECLINE_AREA_SERVED,
      logo: new URL(siteConfig.logo.default, siteConfig.url).toString(),
    }),
  ]);
}
