/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Rutas del sitio. Este módulo es puro (no toca el DOM) para poder usarlo
 * tanto en el navegador como en el prerender de Node.
 */

import { ARTWORKS_DATA, EXPERIMENTS_DATA, FANZINES_DATA } from '../data/portfolioData';

export type Route =
  | { name: 'home' }
  | { name: 'fanzines' }
  | { name: 'experimentos' }
  | { name: 'artwork'; slug: string }
  | { name: 'fanzine'; slug: string }
  | { name: 'experiment'; slug: string }
  | { name: 'notFound' };

export const paths = {
  home: '/',
  fanzines: '/fanzines',
  experimentos: '/experimentos',
  artwork: (slug: string) => `/obra/${slug}`,
  fanzine: (slug: string) => `/fanzine/${slug}`,
  experiment: (slug: string) => `/experimento/${slug}`,
};

/** Normaliza la barra final para que /fanzines/ y /fanzines sean lo mismo. */
const normalize = (pathname: string): string => {
  const clean = pathname.replace(/\/+$/, '');
  return clean.length > 0 ? clean : '/';
};

export function matchRoute(pathname: string): Route {
  const path = normalize(pathname);

  if (path === '/' || path === '/ilustraciones') return { name: 'home' };
  if (path === '/fanzines') return { name: 'fanzines' };
  if (path === '/experimentos') return { name: 'experimentos' };

  const artwork = /^\/obra\/([^/]+)$/.exec(path);
  if (artwork && ARTWORKS_DATA.some((item) => item.slug === artwork[1])) {
    return { name: 'artwork', slug: artwork[1] };
  }

  const fanzine = /^\/fanzine\/([^/]+)$/.exec(path);
  if (fanzine && FANZINES_DATA.some((item) => item.slug === fanzine[1])) {
    return { name: 'fanzine', slug: fanzine[1] };
  }

  const experiment = /^\/experimento\/([^/]+)$/.exec(path);
  if (experiment && EXPERIMENTS_DATA.some((item) => item.slug === experiment[1])) {
    return { name: 'experiment', slug: experiment[1] };
  }

  return { name: 'notFound' };
}

/** Sección del menú que corresponde a cada ruta (para el subrayado activo). */
export function routeSection(route: Route): 'ilustraciones' | 'fanzines' | 'experimentos' | null {
  switch (route.name) {
    case 'home':
    case 'artwork':
      return 'ilustraciones';
    case 'fanzines':
    case 'fanzine':
      return 'fanzines';
    case 'experimentos':
    case 'experiment':
      return 'experimentos';
    default:
      return null;
  }
}

/** Todas las direcciones públicas: alimenta el prerender y el sitemap. */
export function allRoutes(): string[] {
  return [
    paths.home,
    paths.fanzines,
    paths.experimentos,
    ...ARTWORKS_DATA.map((item) => paths.artwork(item.slug)),
    ...FANZINES_DATA.map((item) => paths.fanzine(item.slug)),
    ...EXPERIMENTS_DATA.map((item) => paths.experiment(item.slug)),
  ];
}

/** Archivo HTML que corresponde a cada ruta dentro de dist/. */
export function routeToFile(pathname: string): string {
  const path = normalize(pathname);
  return path === '/' ? 'index.html' : `${path.slice(1)}/index.html`;
}
