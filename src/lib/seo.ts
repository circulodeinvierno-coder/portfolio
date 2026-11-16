/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Metadatos del documento en el navegador. El cálculo vive en seo-head.ts
 * (compartido con el prerender); aquí solo se aplica al <head>.
 */

import { useEffect } from 'react';
import { buildSeoHead } from './seo-head';
import type { Route } from './routes';

const setMeta = (attribute: 'name' | 'property', key: string, value: string) => {
  const element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (element) element.setAttribute('content', value);
};

export function usePageMeta(route: Route): void {
  const key = `${route.name}:${'slug' in route ? route.slug : ''}`;

  useEffect(() => {
    const head = buildSeoHead(route);

    document.title = head.title;
    setMeta('name', 'description', head.description);
    setMeta('name', 'robots', head.robots);
    setMeta('property', 'og:title', head.title);
    setMeta('property', 'og:description', head.description);
    setMeta('property', 'og:url', head.canonical);
    setMeta('property', 'og:image', head.image);
    setMeta('property', 'og:image:alt', head.imageAlt);
    setMeta('property', 'og:type', head.type);
    setMeta('name', 'twitter:title', head.title);
    setMeta('name', 'twitter:description', head.description);
    setMeta('name', 'twitter:image', head.image);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', head.canonical);

    const structuredData = document.getElementById('seo-json-ld');
    if (structuredData) structuredData.textContent = head.jsonLd;
    // `route` cambia junto con `key`; se omite del arreglo de dependencias a propósito.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
