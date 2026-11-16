/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { SITE_TEXTS, CONTACT_EMAILS } from '../data/portfolioData';
import { sendContactMessage, ContactError } from '../lib/contact';

interface ContactSectionProps {
  onSuccessMessage?: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccessMessage }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!email.trim() || !message.trim()) return;

    setError(null);
    setIsSubmitting(true);

    try {
      await sendContactMessage({
        email,
        message,
        honeypot,
        subject: 'Circulo Invierno — contacto desde la portada',
      });

      setSubmitted(true);
      if (onSuccessMessage) {
        onSuccessMessage(`Mensaje enviado. Te responderemos a ${email}.`);
      }
      setEmail('');
      setMessage('');

      window.setTimeout(() => setSubmitted(false), 5000);
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
    <section
      id="contacto"
      className="mt-16 md:mt-24 pt-10 pb-12 border-t border-[#E5E5E5] relative z-10"
      data-purpose="contact"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Columna Izquierda: Texto */}
        <div className="max-w-xl" data-purpose="collaboration">
          <h2 className="text-3xl md:text-[34px] font-normal tracking-tight mb-5 text-[#0D0D0D]">
            {SITE_TEXTS.contactHeadline}
          </h2>
          <p className="font-editorial-bio text-[15px] md:text-[15.5px] text-[#2C2C2C] mb-4 leading-relaxed">
            {SITE_TEXTS.contactContent}
          </p>
          <a
            href={`mailto:${CONTACT_EMAILS.primary}`}
            className="inline-flex items-center gap-2 text-xs font-mono-meta uppercase tracking-wider text-[#0D0D0D] border-b border-[#0D0D0D] pb-0.5 hover:opacity-65 transition-opacity duration-300"
          >
            {CONTACT_EMAILS.primary}
          </a>
        </div>

        {/* Columna Derecha: Formulario */}
        <div className="max-w-xl lg:pl-6" data-purpose="quick-contact-form">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3" id="contact-form">
            <div className="hidden" aria-hidden="true">
              <label htmlFor="quick-honey">No completar</label>
              <input
                id="quick-honey"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <label className="sr-only" htmlFor="email-input">
              Correo electrónico
            </label>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 text-sm bg-transparent border border-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-[#0D0D0D] focus:border-[#0D0D0D] transition placeholder:text-[#888888] font-sans"
            />

            <label className="sr-only" htmlFor="quick-message">
              Mensaje
            </label>
            <textarea
              id="quick-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Cuéntame brevemente qué necesitas"
              required
              rows={4}
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 text-sm bg-transparent border border-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-[#0D0D0D] focus:border-[#0D0D0D] transition placeholder:text-[#888888] font-sans leading-relaxed resize-y"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 text-sm font-normal text-white transition-colors duration-200 tracking-wide text-center cursor-pointer font-mono-meta w-full sm:w-fit ${
                submitted ? 'bg-neutral-800' : 'bg-[#262626] hover:bg-[#0D0D0D]'
              } disabled:bg-[#5E5E5E] disabled:cursor-wait`}
            >
              {submitted ? 'Enviado ✓' : isSubmitting ? 'Enviando...' : 'Escríbeme'}
            </button>
          </form>

          {submitted && (
            <p className="mt-3 text-xs text-[#5E5E5E] font-mono-meta animate-fadeIn">
              ✓ Solicitud recibida. Revisaremos el correo en breve.
            </p>
          )}

          {error && (
            <p
              role="alert"
              className="mt-3 text-xs text-[#7A1C1C] bg-[#FBF1F1] border-l-2 border-[#7A1C1C] px-3 py-2 leading-relaxed"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
