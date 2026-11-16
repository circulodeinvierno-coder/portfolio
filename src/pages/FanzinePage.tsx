/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { FANZINES_DATA, joinMeta } from '../data/portfolioData';
import { DetailBar, CloseFooter } from '../components/DetailBar';
import { Link } from '../lib/router';
import { paths } from '../lib/routes';
import { NotFoundPage } from './NotFoundPage';

interface FanzinePageProps {
  slug: string;
}

export const FanzinePage: React.FC<FanzinePageProps> = ({ slug }) => {
  const index = FANZINES_DATA.findIndex((item) => item.slug === slug);
  if (index < 0) return <NotFoundPage />;

  const fanzine = FANZINES_DATA[index];
  const total = FANZINES_DATA.length;
  const prev = FANZINES_DATA[(index - 1 + total) % total];
  const next = FANZINES_DATA[(index + 1) % total];

  return (
    <article className="w-full flex-grow animate-fadeIn">
      <DetailBar
        backTo={paths.fanzines}
        backLabel="Fanzines"
        counter={`Fanzine ${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-7 bg-[#EFEBE4] border border-[#E7E2D9] p-6 md:p-10">
          <img
            src={fanzine.imageUrl}
            alt={`Portada del fanzine «${fanzine.title}» de Circulo Invierno, ${fanzine.format} (${fanzine.year})`}
            className="cover-object w-full h-auto max-h-[70vh] object-contain mx-auto"
          />
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between gap-10">
          <div>
            <h1 className="font-editorial-title text-4xl md:text-5xl text-[#0D0D0D] leading-[1.05]">
              {fanzine.title}
            </h1>
            <p className="text-[10px] font-mono-meta uppercase tracking-wider text-[#737373] mt-3">
              {joinMeta(fanzine.format, fanzine.tool, fanzine.year)}
            </p>
            <p className="font-editorial-bio text-[15px] md:text-[16px] text-[#2C2C2C] leading-[1.72] mt-5">
              {fanzine.description}
            </p>
          </div>

          <nav aria-label="Otros fanzines" className="flex items-start justify-between gap-4 pt-6 border-t border-[#E5E5E5] text-xs">
            <Link to={paths.fanzine(prev.slug)} className="group max-w-[45%]">
              <span className="block font-mono-meta uppercase tracking-wider text-[#737373]">← Anterior</span>
              <span className="block mt-1 text-[#0D0D0D] group-hover:text-accent transition-colors duration-300">
                {prev.title}
              </span>
            </Link>
            <Link to={paths.fanzine(next.slug)} className="group max-w-[45%] text-right">
              <span className="block font-mono-meta uppercase tracking-wider text-[#737373]">Siguiente →</span>
              <span className="block mt-1 text-[#0D0D0D] group-hover:text-accent transition-colors duration-300">
                {next.title}
              </span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Insertos */}
      <section aria-label="Insertos del fanzine" className="mt-12 md:mt-16">
        <h2 className="text-xs font-mono-meta uppercase tracking-widest text-accent mb-5">
          Insertos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {fanzine.insertImageUrls.map((src, insertIndex) => (
            <figure key={src}>
              <div className="bg-[#F4F4F2] border border-[#EEEEEE] p-4 flex justify-center">
                <img
                  src={src}
                  alt={`${fanzine.title} — inserto ${String.fromCharCode(65 + insertIndex)} del fanzine, ${fanzine.format} (${fanzine.year})`}
                  loading="lazy"
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>
              <figcaption className="mt-2 text-[10px] font-mono-meta uppercase tracking-widest text-[#737373]">
                Insert {String.fromCharCode(65 + insertIndex)}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {fanzine.archiveText && (
        <p className="mt-8 text-sm text-[#444748] font-editorial-bio leading-relaxed max-w-3xl">
          {fanzine.archiveText}
        </p>
      )}

      <CloseFooter backTo={paths.fanzines} backLabel="Fanzines" />
    </article>
  );
};
