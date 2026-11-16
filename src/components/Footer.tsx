/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { SITE_TEXTS } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer 
      className="pt-8 pb-4 text-xs font-mono-meta text-[#737373] flex justify-between items-center border-t border-[#E5E5E5] relative z-10"
      data-purpose="colophon"
    >
      <p>{SITE_TEXTS.colophon}</p>
      <p className="hidden sm:block uppercase tracking-wider">{SITE_TEXTS.colophonSub}</p>
    </footer>
  );
};
