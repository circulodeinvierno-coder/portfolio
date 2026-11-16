/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Envío de correspondencia del sitio.
 *
 * Usa FormSubmit (https://formsubmit.co): un servicio que recibe el POST y lo
 * reenvía por correo, sin necesidad de servidor propio. El sitio sigue siendo
 * estático y funciona igual en Vercel.
 *
 * IMPORTANTE — activación (una sola vez):
 * la primera vez que alguien envíe el formulario, FormSubmit manda un correo de
 * confirmación a CONTACT_EMAILS.primary. Hay que abrirlo y pulsar el enlace.
 * Desde ese momento todos los envíos llegan a esa dirección y con copia (CC) a
 * CONTACT_EMAILS.copy.
 */

import { CONTACT_EMAILS } from '../data/portfolioData';

const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAILS.primary}`;

export interface ContactMessage {
  /** Nombre o colectivo de quien escribe. */
  name?: string;
  /** Correo de quien escribe (se usa como Reply-To). */
  email: string;
  /** Motivo elegido en el formulario. */
  reason?: string;
  /** Cuerpo del mensaje. */
  message: string;
  /** Asunto del correo que recibirá el taller. */
  subject: string;
  /** Campo trampa: si viene relleno, es un bot y no se envía. */
  honeypot?: string;
}

/** Error de envío con un mensaje ya listo para mostrar en pantalla. */
export class ContactError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContactError';
  }
}

export async function sendContactMessage(payload: ContactMessage): Promise<void> {
  // Los bots rellenan el campo oculto; se ignora el envío sin avisar.
  if (payload.honeypot) return;

  const body = {
    _subject: payload.subject,
    _cc: CONTACT_EMAILS.copy,
    _template: 'table',
    _captcha: 'false',
    _replyto: payload.email,
    'Nombre o colectivo': payload.name?.trim() || 'No indicado',
    Correo: payload.email,
    Motivo: payload.reason || 'Consulta general',
    Mensaje: payload.message,
  };

  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ContactError(
      'No pudimos conectar con el servicio de correo. Revisa tu conexión e inténtalo otra vez.',
    );
  }

  if (response.status === 429) {
    throw new ContactError(
      'Se enviaron demasiados mensajes en poco tiempo. Espera unos minutos e inténtalo de nuevo.',
    );
  }

  if (!response.ok) {
    throw new ContactError(
      `El servicio de correo respondió con un error (${response.status}). Inténtalo más tarde.`,
    );
  }

  const data = (await response.json().catch(() => null)) as
    | { success?: boolean | string; message?: string }
    | null;

  if (data && (data.success === false || data.success === 'false')) {
    const detail = data.message ?? '';
    if (/activat|confirm/i.test(detail)) {
      throw new ContactError(
        `El formulario todavía no está activado. Escríbenos directamente a ${CONTACT_EMAILS.primary}.`,
      );
    }
    throw new ContactError(
      detail || 'No se pudo enviar el mensaje. Inténtalo otra vez en un momento.',
    );
  }
}
