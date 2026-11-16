/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Entrada para el prerender: renderiza cada ruta a HTML en Node y devuelve
 * también su bloque de metadatos. No importa CSS (eso lo aporta el build web).
 */

import { renderToString } from 'react-dom/server';
import App from './App';
import { RouterProvider } from './lib/router';
import { buildSeoHead, renderSeoBlock } from './lib/seo-head';
import { matchRoute } from './lib/routes';

export interface RenderedRoute {
  html: string;
  seoBlock: string;
}

export function render(pathname: string): RenderedRoute {
  const html = renderToString(
    <RouterProvider initialPath={pathname}>
      <App />
    </RouterProvider>,
  );

  const head = buildSeoHead(matchRoute(pathname));

  return { html, seoBlock: renderSeoBlock(head) };
}

export { allRoutes, matchRoute, routeToFile } from './lib/routes';
export { SITE_URL } from './data/site';
