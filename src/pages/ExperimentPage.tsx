/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { EXPERIMENTS_DATA, joinMeta } from '../data/portfolioData';
import { DetailBar, CloseFooter } from '../components/DetailBar';
import { Link } from '../lib/router';
import { paths } from '../lib/routes';
import { NotFoundPage } from './NotFoundPage';

interface ExperimentPageProps {
  slug: string;
}

export const ExperimentPage: React.FC<ExperimentPageProps> = ({ slug }) => {
  const index = EXPERIMENTS_DATA.findIndex((item) => item.slug === slug);
  if (index < 0) return <NotFoundPage />;

  const experiment = EXPERIMENTS_DATA[index];
  const total = EXPERIMENTS_DATA.length;
  const prev = EXPERIMENTS_DATA[(index - 1 + total) % total];
  const next = EXPERIMENTS_DATA[(index + 1) % total];
  const gallery = experiment.galleryImages ?? (experiment.imageUrl ? [experiment.imageUrl] : []);

  return (
    <article className="w-full flex-grow animate-fadeIn">
      <DetailBar
        backTo={paths.experimentos}
        backLabel="Experimentos"
        counter={`Experimento ${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-8">
          {gallery.length > 0 ? (
            <div className={`grid gap-4 ${gallery.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              {gallery.map((src, imageIndex) => (
                <div key={src} className="bg-[#F4F4F2] border border-[#EEEEEE] p-3 flex justify-center">
                  <img
                    src={src}
                    alt={`Experimento «${experiment.title}» de Circulo Invierno, ${experiment.format} (${experiment.year})`}
                    className="w-full h-auto max-h-[62vh] object-contain"
                    loading={imageIndex === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="aspect-[4/3] bg-[#F6F3F2] border border-[#E5E5E5] flex flex-col items-center justify-center gap-4">
              <span className="text-[10px] font-mono-meta uppercase tracking-widest text-[#444748]">
                Video · YouTube
              </span>
              {experiment.videoUrl && (
                <a
                  href={experiment.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 border border-[#0D0D0D] flex items-center justify-center hover:bg-[#0D0D0D] hover:text-white transition-colors duration-300"
                  aria-label={`Ver ${experiment.title} en YouTube`}
                >
                  <svg className="w-5 h-5 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between gap-10">
          <div>
            <p className="text-[10px] font-mono-meta uppercase tracking-wider text-accent mb-2">
              {experiment.code}
            </p>
            <h1 className="font-editorial-title text-4xl md:text-5xl text-[#0D0D0D] leading-[1.05]">
              {experiment.title}
            </h1>
            <p className="text-[10px] font-mono-meta uppercase tracking-wider text-[#737373] mt-3">
              {joinMeta(experiment.format, experiment.tool, experiment.year)}
            </p>
            <p className="font-editorial-bio text-[15px] md:text-[16px] text-[#2C2C2C] leading-[1.72] mt-5">
              {experiment.description}
            </p>
            {experiment.videoUrl && (
              <a
                href={experiment.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-xs font-mono-meta uppercase tracking-wider text-accent border-b border-accent pb-0.5 hover:opacity-65 transition-opacity duration-300"
              >
                Ver en YouTube
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          <nav aria-label="Otros experimentos" className="flex items-start justify-between gap-4 pt-6 border-t border-[#E5E5E5] text-xs">
            <Link to={paths.experiment(prev.slug)} className="group max-w-[45%]">
              <span className="block font-mono-meta uppercase tracking-wider text-[#737373]">← Anterior</span>
              <span className="block mt-1 text-[#0D0D0D] group-hover:text-accent transition-colors duration-300">
                {prev.title}
              </span>
            </Link>
            <Link to={paths.experiment(next.slug)} className="group max-w-[45%] text-right">
              <span className="block font-mono-meta uppercase tracking-wider text-[#737373]">Siguiente →</span>
              <span className="block mt-1 text-[#0D0D0D] group-hover:text-accent transition-colors duration-300">
                {next.title}
              </span>
            </Link>
          </nav>
        </div>
      </div>

      <CloseFooter backTo={paths.experimentos} backLabel="Experimentos" />
    </article>
  );
};
