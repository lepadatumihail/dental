// Pure reply-routing logic for the WhatsApp re-engagement campaign.
//
// Patients receive an opt-in template that asks them to reply:
//   1 → dental, 2 → aesthetics, 3 → both, BAJA → unsubscribe.
// This module turns an inbound message body into an intent + the Spanish
// reply we send back (with a deep link into the existing booking wizard).
//
// Kept dependency-free and side-effect-free so it can be unit-tested and
// reused by the webhook route.

import { findEventTypeByKey } from '@/lib/agenda/event-types'

export type Intent = 'dental' | 'aesthetics' | 'both' | 'baja' | 'unknown'

/** Normalize an inbound WhatsApp body to an intent. */
export function parseIntent(body: string): Intent {
  const t = (body || '').trim().toLowerCase()
  // Accept the bare number, or the number with the emoji/word the patient
  // might echo back ("1", "1 dental", "opción 1", "1️⃣").
  if (/^(1|1️⃣|uno|dental)\b/.test(t)) return 'dental'
  if (/^(2|2️⃣|dos|estetica|estética|medicina)\b/.test(t)) return 'aesthetics'
  if (/^(3|3️⃣|tres|ambas|las dos|todo)\b/.test(t)) return 'both'
  if (/^(baja|stop|cancelar|no|unsubscribe|darme de baja)\b/.test(t)) return 'baja'
  return 'unknown'
}

export interface ReplyContext {
  /** Patient first name for personalization (already cleaned). */
  name?: string
  /** Public site origin, e.g. https://prismaclinic.es (no trailing slash). */
  baseUrl: string
  /** Patient reference (Nº Historia) threaded into the booking link. */
  ref?: string
}

export interface RoutedReply {
  intent: Intent
  /** Spanish message to send back. */
  text: string
  /** True when the patient asked to be removed. */
  optOut: boolean
  /** Interest tag to record, or null. */
  interest: 'dental' | 'aesthetics' | 'both' | null
}

/** Build a deep link that opens the booking wizard with a service preselected. */
export function bookingLink(
  serviceKey: 'dental' | 'aesthetics' | 'all',
  ctx: ReplyContext,
): string {
  const params = new URLSearchParams({ book: serviceKey })
  if (ctx.ref) params.set('ref', ctx.ref)
  return `${ctx.baseUrl}/?${params.toString()}`
}

const HELLO = (name?: string) => (name ? `${name}, ` : '')

/** Map an inbound message to the reply we send back. */
export function routeReply(body: string, ctx: ReplyContext): RoutedReply {
  const intent = parseIntent(body)

  switch (intent) {
    case 'dental':
      return {
        intent,
        interest: 'dental',
        optOut: false,
        text:
          `¡Genial! 🦷 ${HELLO(ctx.name)}reserva tu revisión dental gratuita ` +
          `aquí:\n${bookingLink('dental', ctx)}`,
      }
    case 'aesthetics':
      return {
        intent,
        interest: 'aesthetics',
        optOut: false,
        text:
          `¡Perfecto! ✨ ${HELLO(ctx.name)}reserva tu consulta de medicina ` +
          `estética aquí:\n${bookingLink('aesthetics', ctx)}`,
      }
    case 'both':
      return {
        intent,
        interest: 'both',
        optOut: false,
        text:
          `¡Estupendo! ${HELLO(ctx.name)}reserva aquí y elige el servicio ` +
          `que prefieras:\n${bookingLink('all', ctx)}`,
      }
    case 'baja':
      return {
        intent,
        interest: null,
        optOut: true,
        text:
          'Hecho ✅ No volverás a recibir más mensajes nuestros. ' +
          'Gracias y un saludo del equipo de Prisma Clinic.',
      }
    default:
      return {
        intent,
        interest: null,
        optOut: false,
        text:
          'Gracias por tu mensaje 🙂 Responde *1* para revisión dental, ' +
          '*2* para medicina estética o *3* para ambas, y te damos cita esta ' +
          'semana. Si no quieres recibir más mensajes, responde *BAJA*.',
      }
  }
}

// Re-exported for callers that need the service→event-type mapping.
export { findEventTypeByKey }
