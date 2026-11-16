/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { EXPERIMENTS_DATA, SITE_TEXTS, joinMeta } from '../data/portfolioData';
import { Link } from '../lib/router';
import { paths } from '../lib/routes';

interface ExperimentosViewProps {
  onProposeCollab: () => void;
}

/** Altura uniforme del marco de cada experimento. */
const MEDIA_FRAME_CLASS = 'relative w-full h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden';

export const ExperimentosView: React.FC<ExperimentosViewProps> = ({ onProposeCollab }) => {
  return (
    <div className="w-full flex-grow animate-fadeIn">
      {/* Header of Section */}
      <div className="pt-2 pb-10 border-b border-[#E5E5E5]">
        <span className="text-xs font-mono-meta text-accent tracking-widest uppercase block mb-1">
          ARCHIVO ABIERTO
        </span>
        <h1 className="text-3xl md:text-5xl font-normal tracking-tight text-[#0D0D0D]">
          {SITE_TEXTS.experimentosHeadline}
        </h1>
        <p className="font-editorial-bio text-[15px] md:text-[16px] text-[#2C2C2C] leading-[1.72] mt-5 max-w-3xl whitespace-pre-line">
          {SITE_TEXTS.experimentosIntro}
        </p>
      </div>

      {/* Irregular Editorial Grid */}
      <section aria-label="Galería de experimentos" className="relative z-10 my-8 md:my-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-7">
          {EXPERIMENTS_DATA.map((item) => {
            const caption = (
              <div className="px-4 py-3 border-t border-[#E5E5E5] font-mono-meta">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-[#737373] uppercase tracking-wider">{item.code}</span>
                  <h2 className="text-xs font-normal text-[#0D0D0D]">{item.title}</h2>
                </div>
                <span className="block mt-1 text-[10px] uppercase tracking-wider text-[#737373]">
                  {joinMeta(item.year, item.format)}
                </span>
              </div>
            );

            return (
              <article
                key={item.id}
                className={`${item.colSpanClass} group border border-[#E5E5E5] bg-white hover:border-[#0D0D0D] transition-colors duration-500 flex flex-col justify-between overflow-hidden`}
              >
                <Link
                  to={paths.experiment(item.slug)}
                  aria-label={`Ver ${item.title}`}
                  className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
                >
                  {item.type === 'video' ? (
                    <div className={`${MEDIA_FRAME_CLASS} bg-[#F6F3F2] flex flex-col items-center justify-center gap-4`}>
                      <span className="w-16 h-16 border border-[#0D0D0D] flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
                        <svg className="w-5 h-5 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      <span className="text-[10px] font-mono-meta uppercase tracking-widest text-[#444748]">
                        Ver video ↗
                      </span>
                    </div>
                  ) : item.imageUrl ? (
                    <div className={`${MEDIA_FRAME_CLASS} bg-[#F4F4F2]`}>
                      <img
                        src={item.imageUrl}
                        alt={`Experimento «${item.title}» de Circulo Invierno, ${item.format} (${item.year})`}
                        loading="lazy"
                        className="w-full h-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/[0.05] transition-colors duration-500" />
                    </div>
                  ) : (
                    <div className={`${MEDIA_FRAME_CLASS} bg-[#F6F3F2] p-6 md:p-8`}>
                      <blockquote className="font-editorial-quote text-base md:text-lg text-[#0D0D0D] leading-relaxed border-l-2 border-[#0D0D0D] pl-4">
                        {item.quoteText}
                      </blockquote>
                    </div>
                  )}
                  {caption}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom Collaboration Callout */}
      <div className="mt-12 mb-8 p-6 bg-[#F0EDED] border border-[#E5E5E5] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <p className="text-sm md:text-base font-editorial-bio text-[#2C2C2C] leading-relaxed max-w-xl">
          ¿Te interesó algo de lo que viste? ¿Curiosidad? Hablemos!
        </p>

        <button
          onClick={onProposeCollab}
          className="px-5 py-2.5 bg-[#0D0D0D] hover:bg-[#262626] text-white text-xs font-mono-meta tracking-wider uppercase transition-colors duration-300 cursor-pointer shrink-0 w-fit"
        >
          PROPONER COLABORACIÓN
        </button>
      </div>
    </div>
  );
};
