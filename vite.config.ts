import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig, type Plugin} from 'vite';
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from './src/data/site';

const SITE_BASE = SITE_URL.replace(/\/$/, '');

/**
 * Reemplaza los marcadores de index.html por los datos reales del sitio.
 * El bloque de SEO por ruta lo escribe después scripts/prerender.mjs.
 */
function circuloSeo(): Plugin {
  return {
    name: 'circulo-invierno-seo',
    transformIndexHtml(html) {
      const tokens: Record<string, string> = {
        __SITE_TITLE__: SITE_TITLE,
        __SITE_DESCRIPTION__: SITE_DESCRIPTION,
        __OG_IMAGE_ALT__: OG_IMAGE_ALT,
        __OG_IMAGE__: new URL(OG_IMAGE, `${SITE_BASE}/`).href,
        __SITE_URL__: SITE_BASE,
      };

      return Object.entries(tokens).reduce(
        (result, [token, value]) => result.replaceAll(token, value),
        html,
      );
    },
  };
}

export default defineConfig(({ isSsrBuild }) => {
  return {
    plugins: [react(), tailwindcss(), circuloSeo()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname),
      },
    },
    build: {
      // El build SSR no necesita copiar las imágenes: ya están en dist.
      copyPublicDir: !isSsrBuild,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
