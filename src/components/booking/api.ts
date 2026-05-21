// Browser-side calls to our own same-origin booking proxy routes.

import type {
  AgendaResult,
  AvailabilityResponse,
  BookingSuccess,
  CreateBookingPayload,
  NormalizedError,
} from '@/lib/agenda/types'

const NETWORK_ERROR: NormalizedError = { code: 'network', httpStatus: 0 }

function extractError(status: number, body: unknown): NormalizedError {
  if (body && typeof body === 'object' && 'error' in body) {
    const err = (body as { error: unknown }).error
    if (err && typeof err === 'object' && 'code' in err) {
      return err as NormalizedError
    }
  }
  return { code: 'unknown', httpStatus: status }
}

export async function getAvailability(
  eventTypeId: string,
  days = 14,
): Promise<AgendaResult<AvailabilityResponse>> {
  try {
    const res = await fetch(
      `/api/booking/availability?eventTypeId=${encodeURIComponent(
        eventTypeId,
      )}&days=${days}`,
      { method: 'GET' },
    )
    const body = await res.json().catch(() => null)
    if (res.ok && body) {
      return { ok: true, data: body as AvailabilityResponse }
    }
    return { ok: false, error: extractError(res.status, body) }
  } catch {
    return { ok: false, error: NETWORK_ERROR }
  }
}

export async function postBooking(
  payload: CreateBookingPayload,
): Promise<AgendaResult<BookingSuccess>> {
  try {
    const res = await fetch('/api/booking/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const body = await res.json().catch(() => null)
    if (res.ok && body) {
      return { ok: true, data: body as BookingSuccess }
    }
    return { ok: false, error: extractError(res.status, body) }
  } catch {
    return { ok: false, error: NETWORK_ERROR }
  }
}
