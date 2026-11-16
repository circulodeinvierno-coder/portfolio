/**
 * Prerender del sitio: genera un HTML por ruta a partir de la plantilla de Vite,
 * con su bloque de metadatos y el contenido ya dibujado. También escribe
 * robots.txt y sitemap.xml, así que todo sale de la misma fuente de datos.
 *
 * Se ejecuta después de los dos builds (web y SSR).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, '.ssr', 'entry-server.js');

if (!fs.existsSync(ssrEntry)) {
  console.error('No se encontró el bundle SSR. Ejecuta primero los builds.');
  process.exit(1);
}

const { render, allRoutes, routeToFile, SITE_URL } = await import(pathToFileURL(ssrEntry).href);

const BASE = SITE_URL.replace(/\/$/, '');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!SEO_BLOCK.test(template)) {
  console.error('La plantilla no tiene los marcadores <!--seo:start--> / <!--seo:end-->.');
  process.exit(1);
}

function buildPage(rendered) {
  const withSeo = template.replace(
    SEO_BLOCK,
    `<!--seo:start-->\n${rendered.seoBlock}\n    <!--seo:end-->`,
  );

  if (!withSeo.includes('<div id="root"></div>')) {
    console.error('No se encontró <div id="root"></div> en la plantilla.');
    process.exit(1);
  }

  return withSeo.replace('<div id="root"></div>', `<div id="root">${rendered.html}</div>`);
}

const routes = allRoutes();

for (const route of routes) {
  const file = path.join(dist, routeToFile(route));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buildPage(render(route)), 'utf8');
}

// Página 404 (Vercel la usa para direcciones inexistentes)
fs.writeFileSync(path.join(dist, '404.html'), buildPage(render('/404')), 'utf8');

// robots.txt
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`,
  'utf8',
);

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .map(
    (route) => `  <url>
    <loc>${BASE}${route === '/' ? '/' : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n');

fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
  'utf8',
);

console.log(`Prerender listo: ${routes.length} páginas + 404, robots.txt y sitemap.xml`);
