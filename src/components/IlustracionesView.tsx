/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { ARTWORKS_DATA, SITE_TEXTS, joinMeta } from '../data/portfolioData';
import { Link } from '../lib/router';
import { paths } from '../lib/routes';
import { ContactSection } from './ContactSection';

interface IlustracionesViewProps {
  onSuccessMessage?: (msg: string) => void;
}

export const IlustracionesView: React.FC<IlustracionesViewProps> = ({ onSuccessMessage }) => {
  const featured = ARTWORKS_DATA.find((artwork) => artwork.featured) ?? ARTWORKS_DATA[0];
  const rest = ARTWORKS_DATA.filter((artwork) => artwork.id !== featured.id);
  const featuredMeta = joinMeta(featured.format, featured.tool, featured.year);

  return (
    <div className="w-full flex-grow animate-fadeIn">
      {/* Obra destacada */}
      <section
        aria-label="Obra destacada"
        className="relative z-10 my-2 md:my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
      >
        <Link
          to={paths.artwork(featured.slug)}
          aria-label={`Ver ficha de ${featured.title}`}
          className="group lg:col-span-7 relative block w-full aspect-square bg-[#F3F3F3] overflow-hidden border border-[#EEEEEE] hover:border-[#0D0D0D] transition-colors duration-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
        >
          <img
            src={featured.imageUrl}
            alt={`Ilustración «${featured.title}» de Circulo Invierno, ${featured.tool} (${featured.year})`}
            fetchPriority="high"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors duration-500" />
        </Link>

        <div className="lg:col-span-5">
          <span className="text-xs font-mono-meta text-accent uppercase tracking-widest block mb-2">
            Destacado / 01
          </span>
          <h1 className="font-editorial-title text-4xl md:text-6xl text-[#0D0D0D] leading-[1.02]">
            {featured.title}
          </h1>
          {featuredMeta && (
            <p className="text-xs uppercase font-mono-meta text-[#5E5E5E] mt-3">
              {featuredMeta}
            </p>
          )}
          <p className="font-editorial-bio text-[15px] md:text-[16px] text-[#2C2C2C] leading-[1.72] mt-5 max-w-md">
            {featured.description}
          </p>
          <Link
            to={paths.artwork(featured.slug)}
            className="mt-6 inline-flex items-center gap-2 text-xs font-mono-meta uppercase tracking-wider text-accent border-b border-accent pb-0.5 hover:opacity-65 transition-opacity duration-300"
          >
            Ver ficha completa
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* Bio */}
      <section
        aria-label="Sobre el autor"
        className="mt-14 md:mt-20 pt-8 border-t border-[#E5E5E5] grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8"
      >
        <h2 className="lg:col-span-3 text-2xl md:text-[30px] font-normal tracking-tight text-[#0D0D0D]">
          {SITE_TEXTS.bioHeadline}
        </h2>
        <p className="lg:col-span-9 font-editorial-bio text-[15px] md:text-[16px] text-[#2C2C2C] leading-[1.72] max-w-3xl whitespace-pre-line">
          {SITE_TEXTS.bioContent}
        </p>
      </section>

      {/* Galería: dos piezas grandes y el resto en grilla de tres */}
      <section
        aria-label="Galería de ilustraciones"
        className="relative z-10 mt-12 md:mt-16"
        id="ilustraciones"
      >
        <h2 className="sr-only">Ilustraciones</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-4 sm:gap-x-5 lg:gap-x-6 gap-y-8 md:gap-y-10">
          {rest.map((artwork, index) => {
            const compactMeta = joinMeta(artwork.year, artwork.format);
            const span = index < 2 ? 'col-span-2 md:col-span-3' : 'col-span-1 md:col-span-2';

            return (
              <div key={artwork.id} className={`${span} group flex flex-col`}>
                <Link
                  to={paths.artwork(artwork.slug)}
                  aria-label={`Ver ficha de ${artwork.title}`}
                  className="relative block w-full aspect-square bg-[#F3F3F3] overflow-hidden border border-[#EEEEEE] transition-colors duration-500 hover:border-[#0D0D0D] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
                >
                  <img
                    src={artwork.imageUrl}
                    alt={`Ilustración «${artwork.title}» de Circulo Invierno, ${artwork.tool} (${artwork.year})`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/[0.05] transition-colors duration-500" />
                </Link>

                {/* Pie de lámina: título + año y formato */}
                <div className="mt-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-2">
                  <h3 className="text-sm text-[#0D0D0D] leading-tight truncate">
                    <Link to={paths.artwork(artwork.slug)} className="hover:text-accent transition-colors duration-300">
                      {artwork.title}
                    </Link>
                  </h3>
                  <span className="text-[10px] font-mono-meta uppercase tracking-wider text-[#737373] whitespace-nowrap">
                    {compactMeta}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contacto */}
      <ContactSection onSuccessMessage={onSuccessMessage} />
    </div>
  );
};
