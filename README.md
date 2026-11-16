# *Circulo Invierno — Portafolio Artístico & Editorial

Sitio de portafolio construido con **React 19 + TypeScript + Vite 8 + Tailwind CSS 4**.
Tres secciones: **Ilustraciones**, **Fanzines** y **Experimentos**.

## Requisitos

- Node.js 22 (LTS)
- npm (viene incluido con Node)

## Inicio rápido en Windows (sin usar la terminal)

1. Haz doble clic en **`INICIAR-WEB.bat`**.
2. Se abre una ventana negra y, a los pocos segundos, la web en el navegador.
3. Para detenerla, cierra esa ventana.

Si el navegador muestra un error, espera 5 segundos y recarga: el servidor tarda un momento en arrancar.

## Desarrollo local (terminal)

> **Importante:** los comandos deben ejecutarse **dentro de la carpeta del proyecto**
> (la que contiene `package.json`), no en `C:\Users\Usuario`.
> Si aparece `npm error code ENOENT ... package.json`, estás en la carpeta equivocada.

```bash
cd "ruta/a/esta/carpeta"
npm install
npm run dev
```

La web queda disponible en `http://localhost:3000`.

Para generar la versión de producción:

```bash
npm run build     # genera la carpeta dist/
npm run preview   # sirve dist/ localmente para revisar
```

## Dónde se edita cada cosa

| Qué quiero cambiar | Archivo |
| --- | --- |
| Bio, textos de Fanzines, textos de Experimentos, contacto, pie de página | `src/data/portfolioData.ts` → `SITE_TEXTS` |
| Lista de ilustraciones | `src/data/portfolioData.ts` → `ARTWORKS_DATA` |
| Obra destacada de la portada | `ARTWORKS_DATA` → el campo `featured: true` (solo una pieza) |
| Lista de fanzines (portada + insert A y B) | `src/data/portfolioData.ts` → `FANZINES_DATA` |
| Lista de experimentos | `src/data/portfolioData.ts` → `EXPERIMENTS_DATA` |
| Colores, tipografías y animaciones | `src/index.css` |
| Color de acento (azul tinta) | `src/index.css` → `--color-accent` |
| Textura de tinta de los fondos | `public/textures/tinta-estudio.png` |
| Título, descripción y URL del sitio (SEO) | `src/data/site.ts` |
| Imagen para compartir en redes | `public/og-circulo-invierno.jpg` |
| Título y metadatos del navegador | `index.html` |

Las dos ilustraciones que siguen a la destacada se muestran en tamaño grande
(la grilla de 6 columnas les da 3 columnas a cada una); el resto va en tamaño normal.
Para cambiar cuáles son las grandes, mueve esas piezas en el arreglo `ARTWORKS_DATA`.

Cada pieza tiene año, formato y herramienta. En la tarjeta se ve el resumen
(`2020 · Digital`) y en la ficha el dato completo (`Digital · Procreate · 2020`).
Si un campo queda vacío, no se muestra: no hay que borrar nada.

## Páginas y rutas

| Dirección | Contenido |
| --- | --- |
| `/` | Portada: obra destacada, bio, galería y contacto |
| `/fanzines` | Catálogo de fanzines |
| `/experimentos` | Archivo de experimentos |
| `/obra/:slug` | Ficha de una ilustración (ej. `/obra/baby-bear`) |
| `/fanzine/:slug` | Ficha de un fanzine (ej. `/fanzine/azul`) |
| `/experimento/:slug` | Ficha de un experimento (ej. `/experimento/carta`) |

Cada obra tiene su propia dirección, con su título, su descripción y su imagen para
compartir. El `slug` es el que aparece en la URL y se define en `portfolioData.ts`;
si alguna vez lo cambias, la dirección anterior deja de funcionar.

Cada ficha se cierra de tres maneras: con el botón **Cerrar** de arriba, con el botón
**Cerrar y volver** del final, con la tecla **Escape** o con el botón atrás del navegador.
Si llegaste desde la galería, el cierre devuelve a la misma posición de scroll; si
abriste la ficha desde un enlace compartido, va a la sección correspondiente.

### Cómo se genera el sitio

`npm run build` hace tres pasos:

1. **Build web:** compila React y Tailwind en `dist/`.
2. **Build SSR:** compila `src/entry-server.tsx` en `.ssr/` (solo para prerenderizar).
3. **Prerender:** `scripts/prerender.mjs` escribe un HTML por ruta en `dist/`,
   más `404.html`, `robots.txt` y `sitemap.xml`.

Resultado: 24 páginas con contenido real, sin depender de JavaScript para que Google
las lea. El navegador igual hidrata el sitio después, así que la navegación sigue
siendo instantánea (sin recargar).

**Para agregar una obra nueva** solo hay que añadir su bloque en el arreglo
correspondiente (con `slug` único) y subir la imagen. El build crea la tarjeta, su
página, su entrada en el sitemap y sus metadatos: no se escribe ninguna página a mano.

## SEO

- **Una sola fuente de verdad:** `SITE_URL` en `src/data/site.ts`. Al cambiarla se
  actualizan solos el `canonical`, `og:url`, los datos estructurados, `robots.txt` y `sitemap.xml`.
- **Metadatos por página:** cada ruta tiene su título, descripción, canonical,
  Open Graph y Twitter Card, calculados en `src/lib/seo-head.ts`.
- **Datos estructurados (JSON-LD):** `WebSite` y `Person` en la portada,
  `VisualArtwork` en cada ilustración, `Book` en cada fanzine y `CreativeWork` en
  cada experimento.
- **`robots.txt` y `sitemap.xml`:** se generan en cada build con las 24 direcciones.
- **Al compartir:** la portada usa `public/og-circulo-invierno.jpg` (1200 × 630);
  cada obra usa su propia imagen.
- **404:** Vercel sirve `404.html` para direcciones inexistentes.

Después de publicar en Vercel:

1. Cambia `SITE_URL` por el dominio real y vuelve a desplegar.
2. Entra a [Google Search Console](https://search.google.com/search-console), añade la propiedad
   y envía `https://tu-dominio/sitemap.xml`.
3. Comparte el enlace una vez en WhatsApp o LinkedIn: si la tarjeta aparece bien, el
   `og:image` está correcto.

> **Nota sobre pruebas locales:** con `npm run dev` las direcciones profundas
> (`/obra/kiss`) funcionan igual que en producción. Con `npm run preview` hay que abrir
> `/obra/kiss/` con barra final (o el archivo `index.html` directo): es una limitación
> del servidor de previsualización de Vite, no del sitio. En Vercel funcionan ambas.

## Imágenes

Todas las imágenes viven dentro de `public/` y se referencian con rutas root-relative, por ejemplo:

```
/public/ilustraciones/01-baby-bear.jpg   →   /ilustraciones/01-baby-bear.jpg
/public/fanzines/01-insert-a.jpg         →   /fanzines/01-insert-a.jpg
/public/experimentos/01-carta.jpg        →   /experimentos/01-carta.jpg
```

- `public/ilustraciones/` — 9 ilustraciones de la galería.
- `public/fanzines/` — 21 archivos: 7 portadas (`01-` a `07-`) y los insertos `01-insert-a` / `01-insert-b` de cada fanzine.
- `public/experimentos/` — las imágenes de los experimentos. `Video Drone` no es una imagen: es un enlace a YouTube declarado en `videoUrl`.

**Las imágenes están optimizadas para web:** lado mayor máximo de 1600 px, JPEG progresivo
de calidad 88 y transparencias aplanadas sobre blanco. El set completo pesa ~4 MB
(antes ~26 MB). Si un archivo se ve mal en JPEG (arte lineal muy fino o tramas de
semitonos), conviene mantener su PNG original, como se hizo con las portadas `01`, `02`,
`03` y con `experimentos/03-pixel.jpg`.

Para reemplazar una imagen, sobrescribe el archivo con el mismo nombre o cambia la ruta en `portfolioData.ts`.

## Despliegue en Vercel

1. Sube el proyecto a un repositorio de GitHub (la carpeta `node_modules/` está ignorada).
2. En Vercel: **Add New → Project → Import** el repositorio.
3. Vercel detecta Vite automáticamente:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy**. No necesitas variables de entorno.

## Formulario de contacto

Los dos formularios del sitio (la ventana «Contacto / Correspondencia» y el bloque
«Contacto / trabajemos» de la portada) envían correos reales mediante
[FormSubmit](https://formsubmit.co), así que el sitio sigue siendo estático y funciona
en Vercel sin servidor propio.

- Los correos llegan a **circulodeinvierno@gmail.com** con copia (CC) a **dimeinvierno@gmail.com**.
- Las direcciones están en `src/data/portfolioData.ts` → `CONTACT_EMAILS`.
- El envío está en `src/lib/contact.ts`.

### Activación (una sola vez)

La primera vez que se envía el formulario, FormSubmit manda un correo de confirmación a
la dirección principal. Hay que abrirlo y pulsar el enlace de activación. Desde ese
momento todos los envíos llegan normalmente (revisa también la carpeta de spam).

### Notas

- No hay CAPTCHA: el formulario usa un campo trampa invisible para filtrar bots.
- Si quieres ocultar las direcciones del código fuente, FormSubmit entrega un alias
  aleatorio al confirmar la cuenta; se cambia solo en `src/lib/contact.ts`.
- El correo de quien escribe queda como *Reply-To*, así que basta responder al mensaje
  recibido para contestarle.

## Licencia

Código bajo Apache-2.0 (ver cabeceras de los archivos). Obras, textos e imágenes
pertenecen a Cristóbal / Circulo Invierno.
