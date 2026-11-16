/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { INSTAGRAM_URL } from '../data/site';
import { Link } from '../lib/router';
import { paths } from '../lib/routes';

export type Section = 'ilustraciones' | 'fanzines' | 'experimentos';

interface HeaderProps {
  activeSection: Section | null;
  /** En la portada el nombre del sitio es el h1; en las demás páginas el h1 es la obra. */
  brandAs?: 'h1' | 'p';
  onOpenContact: () => void;
}

interface NavItemProps {
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
}

/**
 * Ítem del menú. La barra inferior crece desde la izquierda al pasar el mouse
 * y se queda fija en la sección activa.
 */
const NavItem: React.FC<NavItemProps> = ({ label, to, active = false, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    aria-current={active ? 'page' : undefined}
    className={`group/nav relative py-1 cursor-pointer transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D] ${
      active ? 'text-[#0D0D0D] font-medium' : 'text-[#737373] hover:text-[#0D0D0D]'
    }`}
  >
    {label}
    <span
      aria-hidden="true"
      className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#0D0D0D] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        active ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
      }`}
    />
  </Link>
);

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  brandAs = 'p',
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  const brandClasses = 'wordmark text-4xl md:text-5xl lg:text-[54px] font-normal text-[#0D0D0D] leading-[1.08] select-none';
  const BrandTag = brandAs;

  return (
    <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 md:pb-14 relative z-20" data-purpose="site-header">
      {/* Brand Identity */}
      <div className="flex items-center justify-between" data-purpose="brand-identity">
        <Link
          to={paths.home}
          aria-label="Circulo Invierno inicio"
          className="group text-left focus:outline-none cursor-pointer"
          onClick={closeMenu}
        >
          {/* El nombre se eleva y abre el interletrado al pasar el mouse (.wordmark en index.css) */}
          <BrandTag className={brandClasses}>
            <span className="wordmark-mark inline-block font-editorial-quote mr-1 select-none">
              *
            </span>
            Circulo<br />Invierno
          </BrandTag>
        </Link>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#0D0D0D] border border-[#E5E5E5] hover:bg-[#F4F4F2] transition-colors duration-300 focus:outline-none"
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="square" strokeLinejoin="miter" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav
        aria-label="Navegación principal"
        className="hidden md:flex items-center space-x-7 sm:space-x-9 text-[17px] md:text-[19px] font-normal tracking-tight pt-2"
      >
        <NavItem label="Ilustraciones" to={paths.home} active={activeSection === 'ilustraciones'} />
        <NavItem label="Fanzines" to={paths.fanzines} active={activeSection === 'fanzines'} />
        <NavItem label="Experimentos" to={paths.experimentos} active={activeSection === 'experimentos'} />

        <button
          onClick={onOpenContact}
          className="cursor-pointer text-[#737373] hover:text-[#0D0D0D] transition-colors duration-300 py-1 focus:outline-none"
        >
          Contacto
        </button>

        {/* Instagram External Link */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram de Circulo Invierno"
          className="text-[#0D0D0D] hover:opacity-60 transition-opacity duration-300 pl-1 inline-flex items-center"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.8" viewBox="0 0 24 24">
            <rect height="20" rx="0" ry="0" width="20" x="2" y="2"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
        </a>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegación móvil"
          className="md:hidden flex flex-col space-y-4 pt-4 pb-6 border-b border-[#E5E5E5] bg-[#FFFFFF] animate-fadeIn"
        >
          <Link
            to={paths.home}
            onClick={closeMenu}
            className={`text-left text-xl py-2 px-1 ${
              activeSection === 'ilustraciones' ? 'font-medium text-[#0D0D0D] border-l-2 border-[#0D0D0D] pl-3' : 'text-[#737373]'
            }`}
          >
            Ilustraciones
          </Link>
          <Link
            to={paths.fanzines}
            onClick={closeMenu}
            className={`text-left text-xl py-2 px-1 ${
              activeSection === 'fanzines' ? 'font-medium text-[#0D0D0D] border-l-2 border-[#0D0D0D] pl-3' : 'text-[#737373]'
            }`}
          >
            Fanzines
          </Link>
          <Link
            to={paths.experimentos}
            onClick={closeMenu}
            className={`text-left text-xl py-2 px-1 ${
              activeSection === 'experimentos' ? 'font-medium text-[#0D0D0D] border-l-2 border-[#0D0D0D] pl-3' : 'text-[#737373]'
            }`}
          >
            Experimentos
          </Link>
          <button
            onClick={() => {
              closeMenu();
              onOpenContact();
            }}
            className="text-left text-xl py-2 px-1 text-[#737373] hover:text-[#0D0D0D] transition-colors duration-300"
          >
            Contacto
          </button>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-sm text-[#737373] pt-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect height="20" width="20" x="2" y="2"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
            <span>Instagram @circulodeinvierno</span>
          </a>
        </nav>
      )}
    </header>
  );
};
