/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';

export const GrainOverlay: React.FC = () => {
  return (
    <>
      {/* Dynamic granular paper noise overlay across whole screen */}
      <div 
        aria-hidden="true" 
        className="grain-canvas-overlay" 
      />

      {/* Primary diffused stipple splash at the right edge */}
      <div 
        aria-hidden="true" 
        className="stipple-overlay" 
        data-purpose="decorative-stipple-pattern" 
      />

      {/* Secondary ambient stipple grain at the lower left */}
      <div 
        aria-hidden="true" 
        className="stipple-overlay-secondary" 
        data-purpose="decorative-stipple-pattern-secondary" 
      />
    </>
  );
};
