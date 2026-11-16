/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { sendContactMessage, ContactError } from '../lib/contact';

export type ContactReason = 'general' | 'artwork' | 'collab' | 'catalogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialReason?: ContactReason;
  referenceItemTitle?: string;
  onSuccessNotification: (msg: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialReason = 'general',
  referenceItemTitle,
  onSuccessNotification,
}) => {
  const [reason, setReason] = useState<ContactReason>(initialReason);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setReason(initialReason);
      setError(null);
    }
  }, [isOpen, initialReason]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    try {
      await sendContactMessage({
        name,
        email,
        message,
        honeypot,
        reason: reason === 'catalogo' ? 'Solicitud de copia o catálogo' : reason === 'collab' ? 'Propuesta de colaboración' : 'Consulta general',
        subject: referenceItemTitle
          ? `Circulo Invierno — consulta sobre ${referenceItemTitle}`
          : 'Circulo Invierno — nuevo mensaje desde el sitio',
      });

      setName('');
      setEmail('');
      setMessage('');
      onSuccessNotification('Mensaje enviado. Gracias por escribir.');
      onClose();
    } catch (err) {
      setError(
        err instanceof ContactError
          ? err.message
          : 'No se pudo enviar el mensaje. Inténtalo otra vez en un momento.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Formulario de contacto"
    >
      <div
        className="relative bg-white max-w-xl w-full border border-[#0D0D0D] p-6 sm:p-8 overflow-y-auto max-h-[90vh] animate-modalIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar ventana"
          className="absolute top-4 right-4 w-8 h-8 border border-[#0D0D0D] flex items-center justify-center hover:bg-[#0D0D0D] hover:text-white transition-colors duration-300 cursor-pointer text-xs"
        >
          ✕
        </button>

        <h3 className="text-2xl sm:text-3xl font-normal text-[#0D0D0D] tracking-tight mb-2 pr-10">
          Contacto / Correspondencia
        </h3>
        <p className="text-xs sm:text-sm font-editorial-bio text-[#444748] mb-6">
          Escríbenos para consultas de catálogo, copias de fanzines, comisiones editoriales o colaboraciones.
        </p>

        {referenceItemTitle && (
          <div className="bg-[#F6F3F2] p-3 border border-[#E5E5E5] mb-6 text-xs font-mono-meta">
            <span className="text-[#737373]">CONSULTA RELATIVA A: </span>
            <span className="text-[#0D0D0D] font-medium">{referenceItemTitle}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo trampa para bots: invisible para las personas */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-honey">No completar</label>
            <input
              id="contact-honey"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="contact-reason"
              className="block text-xs font-mono-meta text-[#0D0D0D] uppercase tracking-wider mb-1"
            >
              Motivo de contacto
            </label>
            <select
              id="contact-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value as ContactReason)}
              className="w-full px-3 py-2 text-xs bg-white border border-[#CCCCCC] focus:outline-none focus:border-[#0D0D0D] font-mono-meta cursor-pointer"
            >
              <option value="general">Consulta general / Información</option>
              <option value="catalogo">Solicitud de copia o catálogo</option>
              <option value="collab">Propuesta de colaboración artística</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-mono-meta text-[#0D0D0D] uppercase tracking-wider mb-1"
            >
              Nombre o colectivo
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre o seudónimo"
              className="w-full px-3 py-2 text-xs bg-white border border-[#CCCCCC] focus:outline-none focus:border-[#0D0D0D] font-sans"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-mono-meta text-[#0D0D0D] uppercase tracking-wider mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu-correo@dominio.com"
              className="w-full px-3 py-2 text-xs bg-white border border-[#CCCCCC] focus:outline-none focus:border-[#0D0D0D] font-sans"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-mono-meta text-[#0D0D0D] uppercase tracking-wider mb-1"
            >
              Mensaje o especificaciones
            </label>
            <textarea
              id="contact-message"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe tu propuesta, dirección de envío o consulta..."
              className="w-full px-3 py-2 text-xs bg-white border border-[#CCCCCC] focus:outline-none focus:border-[#0D0D0D] font-sans leading-relaxed"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="text-xs text-[#7A1C1C] bg-[#FBF1F1] border-l-2 border-[#7A1C1C] px-3 py-2 leading-relaxed"
            >
              {error}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-[#0D0D0D] hover:bg-[#262626] disabled:bg-[#5E5E5E] disabled:cursor-wait text-white text-xs font-mono-meta uppercase tracking-wider transition-colors duration-300 cursor-pointer"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
