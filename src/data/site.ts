/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Datos del sitio para SEO y para compartir en redes.
 *
 * ⚠️  ÚNICO LUGAR QUE HAY QUE CAMBIAR CUANDO HAYA DOMINIO:
 *     reemplaza SITE_URL por la dirección final (sin barra al final).
 *     Con eso se actualizan solos: canonical, og:url, sitemap.xml, robots.txt
 *     y los datos estructurados.
 */

export const SITE_URL = 'https://circuloinvierno.com';

export const SITE_NAME = 'Circulo Invierno';

export const SITE_TITLE = 'Circulo Invierno — Ilustración, fanzines y autoedición';

export const SITE_DESCRIPTION =
  'Portafolio de Cristóbal (Circulo Invierno): ilustraciones, fanzines de autoedición y experimentos visuales desde Viña del Mar, Chile.';

export const SITE_LANG = 'es';

export const SITE_LOCALE = 'es_CL';

/** Imagen que se muestra al compartir el enlace (1200 × 630). */
export const OG_IMAGE = '/og-circulo-invierno.jpg';

export const OG_IMAGE_ALT =
  'Ilustración «Baby Bear» de Circulo Invierno junto al nombre del portafolio';

export const INSTAGRAM_URL = 'https://www.instagram.com/circulodeinvierno/';

/** Título y descripción por sección: se aplican al cambiar de pestaña. */
export const SECTION_META = {
  ilustraciones: {
    title: 'Ilustraciones — Circulo Invierno',
    description:
      'Nueve ilustraciones digitales de Circulo Invierno entre 2016 y 2025: encargos, retratos y estudios de cuerpo, color y textura.',
  },
  fanzines: {
    title: 'Fanzines y autoedición — Circulo Invierno',
    description:
      'Siete fanzines de Circulo Invierno entre 2019 y 2025, en formato digital y físico, con sus insertos y su historia.',
  },
  experimentos: {
    title: 'Experimentos — Circulo Invierno',
    description:
      'Experimentos visuales de Circulo Invierno: cartas, diarios fotográficos, pixel art, video y dobles exposiciones.',
  },
} as const;
