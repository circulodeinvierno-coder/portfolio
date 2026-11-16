/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Circulo Invierno — Archivo y Datos de Portafolio
 *
 * Estructura limpia y modular para actualizar contenidos e imágenes fácilmente.
 * Los archivos viven en /public y se referencian con rutas root-relative,
 * de modo que funcionan igual en local, en GitHub y en Vercel.
 *
 * Los textos de las obras vienen de "bajada de imagenes.txt".
 * Los datos técnicos (año, formato y herramienta) vienen de "especificos.txt".
 */

export interface Artwork {
  id: string;
  /** Dirección estable de la obra: /obra/{slug} */
  slug: string;
  title: string;
  imageUrl: string;
  year: string;
  format: string;
  tool: string;
  description: string;
  link?: string;
  linkLabel?: string;
  /** Pieza que se muestra en grande al inicio de la portada. */
  featured?: boolean;
}

export interface Fanzine {
  id: string;
  /** Dirección estable del fanzine: /fanzine/{slug} */
  slug: string;
  title: string;
  /** Portada que se muestra en la tarjeta del catálogo. */
  imageUrl: string;
  /** Insertos que se abren en la ventana flotante (insert A + insert B). */
  insertImageUrls: string[];
  year: string;
  format: string;
  tool: string;
  description: string;
  archiveText: string;
}

export type ExperimentType = 'fotografia' | 'texto' | 'video';

export interface Experiment {
  id: string;
  /** Dirección estable del experimento: /experimento/{slug} */
  slug: string;
  code: string;
  type: ExperimentType;
  title: string;
  year: string;
  format: string;
  tool: string;
  subtitle: string;
  description: string;
  /** Imagen principal de la tarjeta. */
  imageUrl?: string;
  /** Vistas adicionales que se abren en la ventana flotante. */
  galleryImages?: string[];
  /** Enlace externo cuando el experimento es un video alojado fuera del sitio. */
  videoUrl?: string;
  quoteText?: string;
  fragmentLabel?: string;
  /** Posición dentro del grid editorial de 12 columnas. */
  colSpanClass: string;
}

/** Une los datos disponibles con un separador tipográfico. */
export const joinMeta = (...parts: Array<string | undefined>): string =>
  parts.filter((part) => part && part.trim().length > 0).join(' · ');

/* ------------------------------------------------------------------ *
 * ILUSTRACIONES — /public/ilustraciones
 * ------------------------------------------------------------------ */
export const ARTWORKS_DATA: Artwork[] = [
  {
    id: 'ilustracion-01',
    slug: 'baby-bear',
    title: 'Baby Bear',
    imageUrl: '/ilustraciones/01-baby-bear.jpg',
    year: '2020',
    format: 'Digital',
    tool: 'Procreate',
    description:
      'Esta es una comisión que me encargaron desde Brasil. Busca recoger de manera simple y directa, la diversidad corporal en un mundo de pantallas y virtualidad que exige cuerpos skinny.',
    featured: true,
  },
  {
    id: 'ilustracion-03',
    slug: 'lourdes-maps',
    title: 'Lourdes - Maps',
    imageUrl: '/ilustraciones/03-lourdes.jpg',
    year: '2025',
    format: 'Digital',
    tool: 'Procreate',
    description:
      'Una comisión realizada para Lourdes. Se trata de la portada de su single Maps (Cover de Yeah Yeah Yeahs). Me gustó mucho este trabajo, que reunió dos de mis placeres: la música y la ilustración.',
    link: 'https://music.youtube.com/watch?v=5r24RUG6Ruo&si=iSKnIIe6hqZ9pgaT&drli=1',
    linkLabel: 'Escuchar Maps',
  },
  {
    id: 'ilustracion-04',
    slug: 'kiss',
    title: 'Kiss',
    imageUrl: '/ilustraciones/04-kiss.jpg',
    year: '2018',
    format: 'Digital',
    tool: 'Procreate / Photoshop',
    description:
      'Mi desafío era lograr una ilustración con alto nivel de detalles, pesos y densidades. Y creo que se logró.',
  },
  {
    id: 'ilustracion-02',
    slug: 'chest',
    title: 'Chest',
    imageUrl: '/ilustraciones/02-chest.jpg',
    year: '2018',
    format: 'Digital',
    tool: 'Procreate / Photoshop',
    description:
      'De las primeras ilustraciones que hice de manera digital, hace muchos años atrás. Me gusta esa sensación de erotismo encubierto y no explícito.',
  },
  {
    id: 'ilustracion-05',
    slug: 'androx',
    title: 'Androx',
    imageUrl: '/ilustraciones/05-androx.jpg',
    year: '2019',
    format: 'Digital',
    tool: 'Procreate / Photoshop',
    description:
      'Una ilustración que busca evocar un cuerpo andrógino, jugando con la suavidad de la textura de acuarela, los tonos azules y la dureza del trazo.',
  },
  {
    id: 'ilustracion-06',
    slug: 'poetry',
    title: 'Poetry',
    imageUrl: '/ilustraciones/06-poetry.jpg',
    year: '2019',
    format: 'Digital',
    tool: 'Procreate',
    description:
      'Esta ilustración la hice para probar un estilo más recargado, de trazo mas simple, pero con aire a ilustración de los años 50.',
  },
  {
    id: 'ilustracion-07',
    slug: 'back',
    title: 'Back',
    imageUrl: '/ilustraciones/07-back.jpg',
    year: '2017',
    format: 'Digital',
    tool: 'Procreate / Photoshop',
    description:
      'Amo esta ilustración. Recuerdo haber tomado la referencia de Tumblr y le dediqué mucho tiempo a cada detalle y al cuidado de los trazos.',
  },
  {
    id: 'ilustracion-08',
    slug: 'depto',
    title: 'Depto',
    imageUrl: '/ilustraciones/08-depto.jpg',
    year: '2016',
    format: 'Digital',
    tool: 'Photoshop',
    description:
      'Este dibujo es el back del disco Esquimal de Wentru, con quienes estuve colaborando mucho tiempo. Tiene la idea de fondo de lo cotidiano, lo simple y el uso del blanco.',
  },
  {
    id: 'ilustracion-09',
    slug: 'twin-peaks',
    title: 'Twin Peaks',
    imageUrl: '/ilustraciones/09-twin-peaks.jpg',
    year: '2024',
    format: 'Digital',
    tool: 'Procreate / Photoshop',
    description:
      '¿Qué puedo decir sobre Log Lady? Aquí además de mi claro fanatismo, me puse a jugar con un estilo mas juguetón, menos serio, menos acartonado o limpio.',
  },
];

/* ------------------------------------------------------------------ *
 * FANZINES — /public/fanzines
 * Portada en la tarjeta + insert A y insert B en la ventana flotante.
 * ------------------------------------------------------------------ */
export const FANZINES_DATA: Fanzine[] = [
  {
    id: 'fanzine-01',
    slug: 'canciones-para-una-pequena-muerte',
    title: 'Canciones para una pequeña muerte',
    imageUrl: '/fanzines/01-canciones-para-una-pequena-muerte.png',
    insertImageUrls: ['/fanzines/01-insert-a.jpg', '/fanzines/01-insert-b.jpg'],
    year: '2019',
    format: 'Digital',
    tool: 'Procreate',
    description:
      'El primer fanzine que me animé a realizar, luego de una ruptura amorosa, cargado de mucha música e imágenes simbólicas que buscaban sanar. Y lo terminaron haciendo (ja). Formato Digital',
    archiveText: '',
  },
  {
    id: 'fanzine-02',
    slug: 'y-si-tu-ser-estalla',
    title: 'Y si tu ser estalla será un corazón el que sangre',
    imageUrl: '/fanzines/02-y-si-tu-ser-estalla.png',
    insertImageUrls: ['/fanzines/02-insert-a.jpg', '/fanzines/02-insert-b.jpg'],
    year: '2019',
    format: 'Digital',
    tool: 'Procreate + Canva',
    description:
      'Mi segundo fanzine (completamente digital) que nace en medio de la crisis mental emocional de la pandemia. No tiene mucha lógica, sino más bien, tiene simbolismos en todas partes.',
    archiveText: '',
  },
  {
    id: 'fanzine-03',
    slug: 'pandemia',
    title: 'Pandemia',
    imageUrl: '/fanzines/03-pandemia.png',
    insertImageUrls: ['/fanzines/03-insert-a.jpg', '/fanzines/03-insert-b.jpg'],
    year: '2020',
    format: 'Físico (17 ejemplares)',
    tool: 'Procreate / Photoshop',
    description:
      'Mi tercer fanzine, se configura como un ejercicio colectivo colaborativo ante la pandemia y sus consecuencias. 9 personas y nueve experiencias que se articulan ante una vivencia compartida, pero vivenciada de forma subjetiva. Es la primera en ser en formato físico y digital.',
    archiveText: '',
  },
  {
    id: 'fanzine-04',
    slug: 'azul',
    title: 'Azul',
    imageUrl: '/fanzines/04-azul.jpg',
    insertImageUrls: ['/fanzines/04-insert-a.jpg', '/fanzines/04-insert-b.jpg'],
    year: '2020',
    format: 'Digital',
    tool: 'Procreate / Photoshop',
    description:
      'El cuarto fanzine, dedicado a explorar la profundidad del color azul como tono de emociones. Habla de desprenderse de la comodidad de ser y entregarse al amor de otro. Tiene mucho texto e ilustraciones.',
    archiveText: '',
  },
  {
    id: 'fanzine-05',
    slug: 'las-batallas-diarias',
    title: 'Las batallas diarias',
    imageUrl: '/fanzines/05-las-batallas-diarias.jpg',
    insertImageUrls: ['/fanzines/05-insert-a.jpg', '/fanzines/05-insert-b.jpg'],
    year: '2022',
    format: 'Digital',
    tool: 'Procreate / Indesign',
    description:
      'Mi quinto fanzine(Mayo 2022), dedicado a mi madre e inspirado en la canción “Daily Battles” de Thom Yorke del año 2019. Letra e ilustraciones con un poco de libertad emocional para fraguar la pena asociada a la muerte de mi madre.',
    archiveText: '',
  },
  {
    id: 'fanzine-06',
    slug: 'erase-una-vez-una-montana',
    title: 'Érase una vez una montaña',
    imageUrl: '/fanzines/06-erase-una-vez-una-montana.jpg',
    insertImageUrls: ['/fanzines/06-insert-a.jpg', '/fanzines/06-insert-b.jpg'],
    year: '2023',
    format: 'Físico',
    tool: 'Photoshop / Canva',
    description:
      'Fanzine en formato librito del cual hice 30 copias que regalé y dejé en lugares públicos. Trata de la melancolía y la soledad ante la pérdida.',
    archiveText: '',
  },
  {
    id: 'fanzine-07',
    slug: 'polly-gem-club',
    title: 'Polly - Gem Club',
    imageUrl: '/fanzines/07-polly-gem-club.jpg',
    insertImageUrls: ['/fanzines/07-insert-a.jpg', '/fanzines/07-insert-b.jpg'],
    year: '2025',
    format: 'Físico',
    tool: 'Procreate',
    description:
      'Un librito tipo fanzine ilustrando el video “Polly” del grupo Gem Club. Mucho trazo libre, uso de texturas y colores.',
    archiveText: '',
  },
];

/* ------------------------------------------------------------------ *
 * EXPERIMENTOS — /public/experimentos
 * Los 5 archivos de la carpeta. "Carta" reúne sus dos vistas.
 * ------------------------------------------------------------------ */
export const EXPERIMENTS_DATA: Experiment[] = [
  {
    id: 'experimento-01',
    slug: 'carta',
    code: '01 / FOTOGRAFÍA',
    type: 'fotografia',
    title: 'Carta',
    imageUrl: '/experimentos/01-carta.jpg',
    galleryImages: ['/experimentos/01-carta.jpg', '/experimentos/01-carta-2.jpg'],
    year: '2023',
    format: 'Digital',
    tool: '',
    subtitle: '',
    description:
      'Este fue la idea de un pequeño cuaderno de apuntes y mensajes de mi versión niño hacia el adulto que soy, tratando de darle sentido a ciertas emociones y heridas que aparecen cada cierto rato.',
    colSpanClass: 'md:col-span-4',
  },
  {
    id: 'experimento-02',
    slug: 'diario',
    code: '02 / FOTOGRAFÍA',
    type: 'fotografia',
    title: 'Diario',
    imageUrl: '/experimentos/02-diario.jpg',
    year: '2025',
    format: 'Digital post edición de imágenes',
    tool: '',
    subtitle: '',
    description:
      'El 2025, alrededor de abril, tuve un gran cuadro depresivo y me dediqué a sacar una foto diaria pero borrosa, para ir graficando como me iba sintiendo o reflejando algo que quería posterizar.',
    colSpanClass: 'md:col-span-4',
  },
  {
    id: 'experimento-03',
    slug: 'pixel-selfie',
    code: '03 / FOTOGRAFÍA',
    type: 'fotografia',
    title: 'Pixel Selfie',
    imageUrl: '/experimentos/03-pixel.jpg',
    year: '2021',
    format: 'Digital / BMP',
    tool: '',
    subtitle: '',
    description: 'Una pixel selfie en 3 tonos (rojo, negro, blanco).',
    colSpanClass: 'md:col-span-4',
  },
  {
    id: 'experimento-04',
    slug: 'video-drone',
    code: '04 / VIDEO',
    type: 'video',
    title: 'Video Drone',
    videoUrl: 'https://youtube.com/shorts/fJu360a_ow8?si=95pkPMIOX7iDJiAE',
    year: '2021',
    format: 'Video / Youtube',
    tool: '',
    subtitle: '',
    description:
      'Un invento que hice en pandemia. Musica alterada de Beach House, pelo largo y cabezasos de realidad.',
    colSpanClass: 'md:col-span-6',
  },
  {
    id: 'experimento-05',
    slug: 'selfie',
    code: '05 / FOTOGRAFÍA',
    type: 'fotografia',
    title: 'Selfie',
    imageUrl: '/experimentos/05-selfie.jpg',
    year: '2026',
    format: 'Digital',
    tool: '',
    subtitle: '',
    description: 'Doble exposición.',
    colSpanClass: 'md:col-span-6',
  },
];

/* ------------------------------------------------------------------ *
 * TEXTOS DEL SITIO
 * Bio y presentaciones copiadas textualmente del archivo textos.txt
 * (solo se corrigieron las tildes de "vía" e "imágenes").
 * La bajada de contacto viene de "bajada de imagenes.txt".
 * ------------------------------------------------------------------ */
export const SITE_TEXTS = {
  brandName: 'Circulo Invierno',
  tagline: 'Laboratorio de autoedición & exploración visual',

  bioHeadline: 'Bio',
  bioContent:
    'Cristóbal, 45 años, nací en Viña del Mar, Chile. Psicólogo de profesión y ¿Artista? de espíritu. Mucho de lo que hago es desde la curiosidad humana de testear emociones, formatos y límites. He realizado trabajos para otros siendo una excelente forma de ingresar a nuevos mundos de interpretación. Ah...no uso IA en mis trabajos.',

  fanzinesHeadline: 'Fanzines & Autoedición',
  fanzinesIntro:
    'No tengo formación o autoridad para diseñar fanzines, pero lo hago como vía de escape. Empecé hace años atrás buscando una forma distinta de poder procesar emociones (en ese momento una ruptura) y me fui metiendo en este mundo, leyendo, viendo videos, tutoriales y consumiendo fanzines.\n\nMe gusta jugar con los formatos. Empecé con digital y dibujos y luego transité hacia la publicación física. Aquí comparto algunos de los fanzines que he desarrollado:',

  experimentosHeadline: 'Experimentos',
  experimentosIntro:
    'La inquietud viva de estar probando formatos, técnicas y la dispersión curiosa de ir picoteando temas, me ha llevado a ir jugando con letras, música, imágenes. Aquí voy colgando algo de esos experimentos.',

  contactHeadline: 'Contacto / trabajemos',
  contactContent:
    'Abierto a encargos y colaboraciones gráficas, distribución de fanzines o proyectos personales. Escribe para consultas o para solicitar más info.',

  colophon: '© 2026 Circulo Invierno. Todos los derechos reservados.',
  colophonSub: 'Publicación & Autoedición',
};

/* ------------------------------------------------------------------ *
 * CORREO DE CONTACTO
 * Cambia aquí las direcciones si algún día cambian.
 * ------------------------------------------------------------------ */
export const CONTACT_EMAILS = {
  primary: 'circulodeinvierno@gmail.com',
  copy: 'dimeinvierno@gmail.com',
};
