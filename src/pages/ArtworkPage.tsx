/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { ARTWORKS_DATA, joinMeta } from '../data/portfolioData';
import { DetailBar, CloseFooter } from '../components/DetailBar';
import { Link } from '../lib/router';
import { paths } from '../lib/routes';
import { NotFoundPage } from './NotFoundPage';

interface ArtworkPageProps {
  slug: string;
}

export const ArtworkPage: React.FC<ArtworkPageProps> = ({ slug }) => {
  const index = ARTWORKS_DATA.findIndex((item) => item.slug === slug);
  if (index < 0) return <NotFoundPage />;

  const artwork = ARTWORKS_DATA[index];
  const total = ARTWORKS_DATA.length;
  const prev = ARTWORKS_DATA[(index - 1 + total) % total];
  const next = ARTWORKS_DATA[(index + 1) % total];

  return (
    <article className="w-full flex-grow animate-fadeIn">
      <DetailBar
        backTo={paths.home}
        backLabel="Ilustraciones"
        counter={`Obra ${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-8 bg-[#F4F4F2] border border-[#EEEEEE] p-5 md:p-8">
          <img
            src={artwork.imageUrl}
            alt={`Ilustración «${artwork.title}» de Circulo Invierno, ${artwork.tool} (${artwork.year})`}
            className="w-full h-auto max-h-[72vh] object-contain mx-auto"
          />
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between gap-10">
          <div>
            <h1 className="font-editorial-title text-4xl md:text-5xl text-[#0D0D0D] leading-[1.05]">
              {artwork.title}
            </h1>
            <p className="text-[10px] font-mono-meta uppercase tracking-wider text-[#737373] mt-3">
              {joinMeta(artwork.format, artwork.tool, artwork.year)}
            </p>
            <p className="font-editorial-bio text-[15px] md:text-[16px] text-[#2C2C2C] leading-[1.72] mt-5">
              {artwork.description}
            </p>
            {artwork.link && (
              <a
                href={artwork.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-xs font-mono-meta uppercase tracking-wider text-accent border-b border-accent pb-0.5 hover:opacity-65 transition-opacity duration-300"
              >
                {artwork.linkLabel ?? 'Ver enlace'}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          <nav aria-label="Otras obras" className="flex items-start justify-between gap-4 pt-6 border-t border-[#E5E5E5] text-xs">
            <Link to={paths.artwork(prev.slug)} className="group max-w-[45%]">
              <span className="block font-mono-meta uppercase tracking-wider text-[#737373]">← Anterior</span>
              <span className="block mt-1 text-[#0D0D0D] group-hover:text-accent transition-colors duration-300">
                {prev.title}
              </span>
            </Link>
            <Link to={paths.artwork(next.slug)} className="group max-w-[45%] text-right">
              <span className="block font-mono-meta uppercase tracking-wider text-[#737373]">Siguiente →</span>
              <span className="block mt-1 text-[#0D0D0D] group-hover:text-accent transition-colors duration-300">
                {next.title}
              </span>
            </Link>
          </nav>
        </div>
      </div>

      <CloseFooter backTo={paths.home} backLabel="Ilustraciones" />
    </article>
  );
};
