/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Cálculo de los metadatos de cada ruta (título, descripción, canonical,
 * imagen para compartir y datos estructurados). Es puro: se usa en el
 * navegador y también en el prerender de Node.
 */

import {
  ARTWORKS_DATA,
  EXPERIMENTS_DATA,
  FANZINES_DATA,
  joinMeta,
} from '../data/portfolioData';
import {
  INSTAGRAM_URL,
  OG_IMAGE,
  OG_IMAGE_ALT,
  SECTION_META,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from '../data/site';
import { paths, type Route } from './routes';

const BASE = SITE_URL.replace(/\/$/, '');

const absolute = (path: string): string => new URL(path, `${BASE}/`).href;

/** Recorta una descripción sin cortar palabras, para las meta descripciones. */
const trim = (text: string, max = 158): string => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 60 ? lastSpace : max - 1).trimEnd()}…`;
};

const artist = {
  '@type': 'Person',
  '@id': `${BASE}/#person`,
  name: 'Cristóbal',
  alternateName: SITE_NAME,
  url: `${BASE}/`,
  sameAs: [INSTAGRAM_URL],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Viña del Mar',
    addressCountry: 'CL',
  },
};

export interface SeoHead {
  title: string;
  description: string;
  canonical: string;
  image: string;
  imageAlt: string;
  /** Solo cuando la imagen es la tarjeta 1200 × 630; las obras usan su propia proporción. */
  imageWidth?: number;
  imageHeight?: number;
  robots: string;
  type: 'website' | 'article';
  jsonLd: string;
}

const graph = (items: object[]): string =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': items }, null, 2);

export function buildSeoHead(route: Route): SeoHead {
  const base: Omit<SeoHead, 'title' | 'description' | 'canonical' | 'jsonLd'> = {
    image: absolute(OG_IMAGE),
    imageAlt: OG_IMAGE_ALT,
    imageWidth: 1200,
    imageHeight: 630,
    robots: 'index, follow, max-image-preview:large',
    type: 'website',
  };

  switch (route.name) {
    case 'home':
      return {
        ...base,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        canonical: `${BASE}/`,
        jsonLd: graph([
          {
            '@type': 'WebSite',
            '@id': `${BASE}/#website`,
            url: `${BASE}/`,
            name: SITE_NAME,
            description: SITE_DESCRIPTION,
            inLanguage: SITE_LOCALE.replace('_', '-'),
            publisher: { '@id': `${BASE}/#person` },
          },
          {
            ...artist,
            image: absolute(OG_IMAGE),
            description: 'Portafolio de ilustración, fanzines y experimentos desde Viña del Mar, Chile.',
            knowsAbout: ['Ilustración digital', 'Fanzine', 'Autoedición', 'Diseño editorial'],
          },
        ]),
      };

    case 'fanzines':
    case 'experimentos': {
      const isFanzines = route.name === 'fanzines';
      const meta = SECTION_META[route.name];
      const list = isFanzines ? FANZINES_DATA : EXPERIMENTS_DATA;

      return {
        ...base,
        title: meta.title,
        description: meta.description,
        canonical: absolute(isFanzines ? paths.fanzines : paths.experimentos),
        jsonLd: graph([
          {
            '@type': 'CollectionPage',
            '@id': `${absolute(isFanzines ? paths.fanzines : paths.experimentos)}#page`,
            name: meta.title,
            description: meta.description,
            inLanguage: SITE_LOCALE.replace('_', '-'),
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: list.length,
              itemListElement: list.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.title,
                url: absolute(
                  isFanzines
                    ? paths.fanzine((item as { slug: string }).slug)
                    : paths.experiment((item as { slug: string }).slug),
                ),
              })),
            },
          },
          artist,
        ]),
      };
    }

    case 'artwork': {
      const artwork = ARTWORKS_DATA.find((item) => item.slug === route.slug);
      if (!artwork) break;

      return {
        ...base,
        type: 'article',
        title: `${artwork.title} — ${joinMeta(artwork.format, artwork.year)} — ${SITE_NAME}`,
        description: trim(`${artwork.title} (${artwork.year}). ${artwork.description}`),
        canonical: absolute(paths.artwork(artwork.slug)),
        image: absolute(artwork.imageUrl),
        imageAlt: `Ilustración «${artwork.title}» de Circulo Invierno`,
        imageWidth: undefined,
        imageHeight: undefined,
        jsonLd: graph([
          {
            '@type': 'VisualArtwork',
            '@id': `${absolute(paths.artwork(artwork.slug))}#artwork`,
            name: artwork.title,
            url: absolute(paths.artwork(artwork.slug)),
            image: absolute(artwork.imageUrl),
            description: artwork.description,
            dateCreated: artwork.year,
            artform: artwork.format,
            artMedium: artwork.tool,
            creator: { '@id': `${BASE}/#person` },
          },
          artist,
        ]),
      };
    }

    case 'fanzine': {
      const fanzine = FANZINES_DATA.find((item) => item.slug === route.slug);
      if (!fanzine) break;

      return {
        ...base,
        type: 'article',
        title: `${fanzine.title} — fanzine ${fanzine.year} — ${SITE_NAME}`,
        description: trim(`${fanzine.title} (${fanzine.year}). ${fanzine.description}`),
        canonical: absolute(paths.fanzine(fanzine.slug)),
        image: absolute(fanzine.imageUrl),
        imageAlt: `Portada del fanzine «${fanzine.title}» de Circulo Invierno`,
        imageWidth: undefined,
        imageHeight: undefined,
        jsonLd: graph([
          {
            '@type': 'Book',
            '@id': `${absolute(paths.fanzine(fanzine.slug))}#book`,
            name: fanzine.title,
            url: absolute(paths.fanzine(fanzine.slug)),
            image: absolute(fanzine.imageUrl),
            description: fanzine.description,
            datePublished: fanzine.year,
            genre: 'Fanzine',
            author: { '@id': `${BASE}/#person` },
            ...(fanzine.format.toLowerCase().startsWith('digital') ? { bookFormat: 'EBook' } : {}),
          },
          artist,
        ]),
      };
    }

    case 'experiment': {
      const experiment = EXPERIMENTS_DATA.find((item) => item.slug === route.slug);
      if (!experiment) break;

      return {
        ...base,
        type: 'article',
        title: `${experiment.title} — experimento ${experiment.year} — ${SITE_NAME}`,
        description: trim(`${experiment.title} (${experiment.year}). ${experiment.description}`),
        canonical: absolute(paths.experiment(experiment.slug)),
        image: absolute(experiment.imageUrl ?? OG_IMAGE),
        imageAlt: `Experimento «${experiment.title}» de Circulo Invierno`,
        imageWidth: undefined,
        imageHeight: undefined,
        jsonLd: graph([
          {
            '@type': 'CreativeWork',
            '@id': `${absolute(paths.experiment(experiment.slug))}#work`,
            name: experiment.title,
            url: absolute(paths.experiment(experiment.slug)),
            description: experiment.description,
            dateCreated: experiment.year,
            ...(experiment.imageUrl ? { image: absolute(experiment.imageUrl) } : {}),
            creator: { '@id': `${BASE}/#person` },
          },
          artist,
        ]),
      };
    }
  }

  return {
    ...base,
    title: `Página no encontrada — ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    canonical: `${BASE}/`,
    robots: 'noindex, follow',
    jsonLd: graph([artist]),
  };
}

const escape = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Bloque de metadatos que se inyecta en el <head> durante el prerender. */
export function renderSeoBlock(head: SeoHead): string {
  const t = escape(head.title);
  const d = escape(head.description);
  const canonical = escape(head.canonical);
  const image = escape(head.image);
  const imageAlt = escape(head.imageAlt);
  const imageType = head.image.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
  const imageSize =
    head.imageWidth && head.imageHeight
      ? `
    <meta property="og:image:width" content="${head.imageWidth}" />
    <meta property="og:image:height" content="${head.imageHeight}" />`
      : '';

  return `<title>${t}</title>
    <meta name="description" content="${d}" />
    <link rel="canonical" href="${canonical}" />
    <meta name="robots" content="${escape(head.robots)}" />
    <meta name="theme-color" content="#FFFFFF" />

    <!-- Open Graph (WhatsApp, Instagram, LinkedIn, Facebook) -->
    <meta property="og:type" content="${head.type}" />
    <meta property="og:site_name" content="${escape(SITE_NAME)}" />
    <meta property="og:locale" content="${SITE_LOCALE}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:type" content="${imageType}" />${imageSize}
    <meta property="og:image:alt" content="${imageAlt}" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${image}" />

    <!-- Datos estructurados -->
    <script type="application/ld+json" id="seo-json-ld">
${head.jsonLd}
    </script>`;
}
