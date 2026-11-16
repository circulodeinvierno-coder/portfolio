/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Router mínimo, sin dependencias. Guarda la ruta en el historial del navegador
 * para que funcionen atrás/adelante y las direcciones se puedan compartir.
 */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { matchRoute, type Route } from './routes';

interface RouterValue {
  path: string;
  route: Route;
  navigate: (to: string) => void;
  /** Vuelve atrás si se llegó navegando dentro del sitio; si no, va a `fallback`. */
  goBack: (fallback: string) => void;
}

const RouterContext = createContext<RouterValue | null>(null);

/** Marca las entradas de historial creadas por el sitio. */
const HISTORY_STATE = { circuloInvierno: true };

interface RouterProviderProps {
  /** Ruta inicial: la del navegador al cargar, o la que se prerenderizó en el build. */
  initialPath: string;
  children: React.ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ initialPath, children }) => {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to === window.location.pathname) return;
    window.history.pushState(
      { ...HISTORY_STATE, from: window.location.pathname },
      '',
      to,
    );
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const goBack = useCallback(
    (fallback: string) => {
      // Se vuelve atrás solo si la persona llegó desde esa misma sección: así se
      // recupera la posición del scroll. Si viene de otra ficha o de un enlace
      // compartido, se navega a la sección para no terminar en el lugar equivocado.
      const state = window.history.state as { circuloInvierno?: boolean; from?: string } | null;
      if (state?.circuloInvierno && state.from === fallback) {
        window.history.back();
      } else {
        navigate(fallback);
      }
    },
    [navigate],
  );

  const value = useMemo<RouterValue>(
    () => ({ path, route: matchRoute(path), navigate, goBack }),
    [path, navigate, goBack],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export function useRouter(): RouterValue {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter debe usarse dentro de RouterProvider');
  return context;
}

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/** Enlace interno: usa el historial sin recargar la página. */
export const Link: React.FC<LinkProps> = ({ to, children, onClick, ...rest }) => {
  const { navigate } = useRouter();

  return (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
};
