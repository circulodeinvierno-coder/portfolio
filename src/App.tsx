/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Circulo Invierno — Portafolio Artístico & Editorial
 */
import React, { useState } from 'react';
import { GrainOverlay } from './components/GrainOverlay';
import { Header } from './components/Header';
import { IlustracionesView } from './components/IlustracionesView';
import { FanzinesView } from './components/FanzinesView';
import { ExperimentosView } from './components/ExperimentosView';
import { ContactModal, ContactReason } from './components/ContactModal';
import { Footer } from './components/Footer';
import { ArtworkPage } from './pages/ArtworkPage';
import { FanzinePage } from './pages/FanzinePage';
import { ExperimentPage } from './pages/ExperimentPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useRouter } from './lib/router';
import { routeSection } from './lib/routes';
import { usePageMeta } from './lib/seo';

export default function App() {
  const { route } = useRouter();
  usePageMeta(route);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactReason, setContactReason] = useState<ContactReason>('general');
  const [contactSubjectTitle, setContactSubjectTitle] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => setToastMessage(null), 4500);
  };

  const handleOpenGeneralContact = () => {
    setContactReason('general');
    setContactSubjectTitle(undefined);
    setIsContactOpen(true);
  };

  const handleOpenCopyInquiry = () => {
    setContactReason('catalogo');
    setContactSubjectTitle('Solicitud de copia de Fanzine');
    setIsContactOpen(true);
  };

  const handleProposeCollab = () => {
    setContactReason('collab');
    setContactSubjectTitle('Experimentos // Propuesta de colaboración');
    setIsContactOpen(true);
  };

  const renderRoute = () => {
    switch (route.name) {
      case 'home':
        return <IlustracionesView onSuccessMessage={showToast} />;
      case 'fanzines':
        return <FanzinesView onOpenContact={handleOpenCopyInquiry} />;
      case 'experimentos':
        return <ExperimentosView onProposeCollab={handleProposeCollab} />;
      case 'artwork':
        return <ArtworkPage slug={route.slug} />;
      case 'fanzine':
        return <FanzinePage slug={route.slug} />;
      case 'experiment':
        return <ExperimentPage slug={route.slug} />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-[#0D0D0D] bg-[#FFFFFF] selection:bg-[#0D0D0D] selection:text-white">
      <GrainOverlay />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 py-10 md:py-16 relative z-10 flex flex-col min-h-screen justify-between">
        <Header
          activeSection={routeSection(route)}
          brandAs={route.name === 'home' ? 'h1' : 'p'}
          onOpenContact={handleOpenGeneralContact}
        />

        <main className="w-full flex-grow">{renderRoute()}</main>

        <Footer />
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialReason={contactReason}
        referenceItemTitle={contactSubjectTitle}
        onSuccessNotification={showToast}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0D0D0D] text-white text-xs font-mono-meta py-3 px-5 border border-white/20 shadow-lg flex items-center gap-3 animate-fadeIn">
          <span>✓</span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-neutral-400 hover:text-white cursor-pointer"
            aria-label="Cerrar aviso"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
