// Mock data for the agenda booking integration.
// Used only when AGENDA_API_BASE_URL is unset (mock mode) so the booking UI is
// fully developable/testable without live agenda credentials.

import { findEventType } from './event-types'
import type {
  AgendaResult,
  AvailabilityResponse,
  BookingSuccess,
  CreateBookingPayload,
  LocationType,
} from './types'

const ADDRESS_CENTRO = {
  alias: 'marbella-centro',
  label: 'Prisma Clinic — Marbella Centro, Av. Ricardo Soriano 12',
  address: 'Av. Ricardo Soriano 12',
  zipcode: '29601',
}
const ADDRESS_BANUS = {
  alias: 'puerto-banus',
  label: 'Prisma Clinic — Puerto Banús, C. Ramón Areces 3',
  address: 'C. Ramón Areces 3',
  zipcode: '29660',
}

const SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
  '12:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
]

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

/** Mock availability response. */
export function mockAvailability(
  eventTypeId: string,
  days: number,
): AvailabilityResponse {
  const availableDates: string[] = []
  const slotsByDate: Record<string, string[]> = {}
  const today = new Date()

  for (let i = 1; i <= days; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    if (d.getDay() === 0) continue // skip Sundays
    if (i % 6 === 4) continue // a few fully-booked days
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    const count = 5 + ((i * 4) % (SLOTS.length - 5))
    availableDates.push(key)
    slotsByDate[key] = SLOTS.slice(0, count)
  }

  // Vary locationType / address count by service so every wizard branch
  // (multi-address picker, single-address auto-select, client-address fields)
  // is reachable in dev.
  const key = findEventType(eventTypeId)?.key
  const locationType: LocationType =
    key === 'aesthetics' ? 'client_address' : 'predefined'
  const addresses =
    locationType === 'predefined'
      ? key === 'medical'
        ? [ADDRESS_CENTRO]
        : [ADDRESS_CENTRO, ADDRESS_BANUS]
      : undefined

  return {
    availableDates,
    slotsByDate,
    locationType,
    addresses,
    availabilityToken: `mock.${eventTypeId}.${Date.now()}`,
  }
}

/**
 * Mock booking creation. Magic strings in the client email exercise error
 * paths in dev: `+expired` → 410, `+taken` → 409, `+conflict` → 201 w/ conflict.
 */
export function mockCreateBooking(
  payload: CreateBookingPayload,
): AgendaResult<BookingSuccess> {
  const email = payload.clientEmail.toLowerCase()

  if (email.includes('+expired')) {
    return {
      ok: false,
      error: {
        code: 'token_expired',
        httpStatus: 410,
        rawMessage: 'Availability token has expired.',
      },
    }
  }
  if (email.includes('+taken')) {
    return {
      ok: false,
      error: {
        code: 'slot_taken',
        httpStatus: 409,
        rawMessage:
          'No contractors are available for the selected day and time.',
      },
    }
  }

  return {
    ok: true,
    data: {
      bookingId: `mock-booking-${Date.now()}`,
      status: 'pending_confirmation',
    },
  }
}
