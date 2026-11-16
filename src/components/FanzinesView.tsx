/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { FANZINES_DATA, SITE_TEXTS, joinMeta } from '../data/portfolioData';
import { Link } from '../lib/router';
import { paths } from '../lib/routes';

interface FanzinesViewProps {
  onOpenContact: () => void;
}

export const FanzinesView: React.FC<FanzinesViewProps> = ({ onOpenContact }) => {
  return (
    <div className="w-full flex-grow animate-fadeIn">
      {/* Header of Section */}
      <div className="pt-2 pb-10 border-b border-[#E5E5E5]">
        <span className="text-xs font-mono-meta text-accent tracking-wider uppercase block mb-1">
          CATÁLOGO EDITORIAL
        </span>
        <h1 className="text-3xl md:text-5xl font-normal tracking-tight text-[#0D0D0D]">
          {SITE_TEXTS.fanzinesHeadline}
        </h1>
        <p className="font-editorial-bio text-[15px] md:text-[16px] text-[#2C2C2C] leading-[1.72] mt-5 max-w-3xl whitespace-pre-line">
          {SITE_TEXTS.fanzinesIntro}
        </p>
      </div>

      {/* Fanzines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 my-10">
        {FANZINES_DATA.map((zine, index) => (
          <article
            key={zine.id}
            className="group border border-[#E5E5E5] bg-white p-5 md:p-6 flex flex-col justify-between hover:border-[#0D0D0D] transition-colors duration-500"
          >
            <div>
              {/* Cover */}
              <Link
                to={paths.fanzine(zine.slug)}
                aria-label={`Abrir ${zine.title}`}
                className="relative block w-full aspect-square bg-[#EFEBE4] overflow-hidden mb-5 border border-[#E7E2D9] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
              >
                <img
                  src={zine.imageUrl}
                  alt={`Portada del fanzine «${zine.title}» de Circulo Invierno, ${zine.format} (${zine.year})`}
                  loading="lazy"
                  className="cover-object w-full h-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </Link>

              {/* Number, Title & Description */}
              <span className="block text-[10px] font-mono-meta uppercase tracking-[0.2em] text-accent mb-1">
                Fanzine {String(index + 1).padStart(2, '0')} / {String(FANZINES_DATA.length).padStart(2, '0')}
              </span>
              <h2 className="font-editorial-title text-2xl md:text-3xl text-[#0D0D0D] leading-tight mb-1">
                <Link to={paths.fanzine(zine.slug)} className="hover:text-accent transition-colors duration-300">
                  {zine.title}
                </Link>
              </h2>

              <span className="block text-[10px] font-mono-meta uppercase tracking-wider text-[#737373] mb-2">
                {joinMeta(zine.year, zine.format)}
              </span>

              {zine.description && (
                <p className="text-sm text-[#444748] font-editorial-bio mb-5 leading-relaxed line-clamp-2">
                  {zine.description}
                </p>
              )}
            </div>

            {/* Default Action Button */}
            <Link
              to={paths.fanzine(zine.slug)}
              className="mt-4 w-full py-2.5 px-4 bg-[#E5E2E1] hover:bg-[#DCD9D9] text-[#0D0D0D] text-xs font-mono-meta uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              VER FÁNZINE
            </Link>
          </article>
        ))}
      </div>

      {/* Minimal Bottom Callout */}
      <div className="mt-12 mb-10 py-8 border-t border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm md:text-base font-editorial-bio text-[#2C2C2C]">
          Si necesitas una copia, escríbeme.
        </p>
        <button
          onClick={onOpenContact}
          className="px-6 py-2.5 bg-[#0D0D0D] hover:bg-[#262626] text-white text-xs font-mono-meta uppercase tracking-wider transition-colors duration-300 cursor-pointer w-fit"
        >
          Escríbeme
        </button>
      </div>
    </div>
  );
};
