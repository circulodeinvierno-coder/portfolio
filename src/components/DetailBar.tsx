/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Barra superior de las fichas: volver a la sección, numeración y un botón de
 * cierre explícito. También cierra con la tecla Escape.
 */

import React, { useEffect } from 'react';
import { Link, useRouter } from '../lib/router';

interface DetailBarProps {
  /** Ruta de la sección a la que se vuelve. */
  backTo: string;
  /** Nombre visible de esa sección. */
  backLabel: string;
  /** Numeración de la pieza, por ejemplo «Obra 02 / 09». */
  counter: string;
}

export const DetailBar: React.FC<DetailBarProps> = ({ backTo, backLabel, counter }) => {
  const { goBack } = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') goBack(backTo);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goBack, backTo]);

  return (
    <div className="flex items-center justify-between gap-3 pt-2 pb-6 md:pb-8">
      <Link
        to={backTo}
        className="inline-flex items-center gap-2 border border-[#E5E5E5] px-3 py-2 text-[10px] font-mono-meta uppercase tracking-wider text-[#0D0D0D] hover:border-[#0D0D0D] transition-colors duration-300"
      >
        <span aria-hidden="true">←</span>
        {backLabel}
      </Link>

      <div className="flex items-center gap-3 md:gap-5">
        <span className="hidden sm:inline text-[10px] font-mono-meta uppercase tracking-wider text-accent">
          {counter}
        </span>
        <button
          type="button"
          onClick={() => goBack(backTo)}
          className="inline-flex items-center gap-2 border border-[#0D0D0D] px-3 py-2 text-[10px] font-mono-meta uppercase tracking-wider text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <span aria-hidden="true">✕</span>
          Cerrar
        </button>
      </div>
    </div>
  );
};

/**
 * Cierre al final de la ficha: quien llegó hasta abajo no tiene que volver a subir.
 */
export const CloseFooter: React.FC<{ backTo: string; backLabel: string }> = ({
  backTo,
  backLabel,
}) => {
  const { goBack } = useRouter();

  return (
    <div className="mt-12 pt-6 border-t border-[#E5E5E5] flex justify-end">
      <button
        type="button"
        onClick={() => goBack(backTo)}
        className="inline-flex items-center gap-2 border border-[#E5E5E5] px-3 py-2 text-[10px] font-mono-meta uppercase tracking-wider text-[#0D0D0D] hover:border-[#0D0D0D] transition-colors duration-300 cursor-pointer"
      >
        <span aria-hidden="true">✕</span>
        Cerrar y volver a {backLabel}
      </button>
    </div>
  );
};
