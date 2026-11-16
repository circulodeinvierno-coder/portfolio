/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Link } from '../lib/router';
import { paths } from '../lib/routes';

export const NotFoundPage: React.FC = () => (
  <section className="w-full flex-grow animate-fadeIn py-10 md:py-16">
    <p className="text-xs font-mono-meta uppercase tracking-widest text-accent mb-3">
      Error 404
    </p>
    <h1 className="font-editorial-title text-4xl md:text-6xl text-[#0D0D0D] leading-[1.05] max-w-2xl">
      Esta página no existe
    </h1>
    <p className="font-editorial-bio text-[15px] md:text-[16px] text-[#2C2C2C] leading-[1.72] mt-5 max-w-xl">
      Puede que el enlace esté mal escrito o que la pieza haya cambiado de dirección.
      Desde la portada puedes llegar a todo el archivo.
    </p>
    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono-meta uppercase tracking-wider">
      <Link to={paths.home} className="text-accent border-b border-accent pb-0.5 hover:opacity-65 transition-opacity duration-300">
        Ir a la portada
      </Link>
      <Link to={paths.fanzines} className="text-[#737373] hover:text-accent transition-colors duration-300">
        Fanzines
      </Link>
      <Link to={paths.experimentos} className="text-[#737373] hover:text-accent transition-colors duration-300">
        Experimentos
      </Link>
    </div>
  </section>
);
