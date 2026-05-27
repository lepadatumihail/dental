// Server-side client for the agenda public booking API.
// Imported only by the /api/booking/* route handlers. Short-circuits to mock
// data when mock mode is on (no AGENDA_API_BASE_URL).

import {
  getApiBaseUrl,
  getTenantId,
  getTenantTimezone,
  isMockMode,
} from './config'
import { mockAvailability, mockCreateBooking } from './mock'
import { wallClockToUtcIso } from './timezone'
import type {
  AgendaResult,
  AvailabilityResponse,
  BookingSuccess,
  CreateBookingPayload,
  NormalizedError,
} from './types'

const TIMEOUT_MS = 12_000

const CODE_BY_STATUS: Record<number, NormalizedError['code']> = {
  400: 'validation',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not_found',
  409: 'slot_taken',
  410: 'token_expired',
  413: 'payload_too_large',
  415: 'unsupported_media',
  429: 'rate_limited',
}

function normalizeError(status: number, body: unknown): NormalizedError {
  const rawMessage =
    body && typeof body === 'object' && 'message' in body
      ? String((body as { message: unknown }).message)
      : undefined
  const fieldMessages = rawMessage
    ? rawMessage
        .split(';')
        .map((s) => s.trim())
        .filter(Boolean)
    : undefined
  return {
    code: CODE_BY_STATUS[status] ?? (status >= 500 ? 'network' : 'unknown'),
    httpStatus: status,
    rawMessage,
    fieldMessages,
  }
}

function networkError(err: unknown): NormalizedError {
  return {
    code: 'network',
    httpStatus: 0,
    rawMessage: err instanceof Error ? err.message : 'Network error',
  }
}

async function agendaFetch(
  path: string,
  init: RequestInit & { headers?: Record<string, string> },
): Promise<{ status: number; body: unknown }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${getApiBaseUrl()}${path}`, {
      ...init,
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...init.headers,
      },
    })
    const text = await res.text()
    let body: unknown = null
    if (text) {
      try {
        body = JSON.parse(text)
      } catch {
        body = { message: text.slice(0, 200) }
      }
    }
    return { status: res.status, body }
  } finally {
    clearTimeout(timer)
  }
}

export async function fetchAvailability(
  eventTypeId: string,
  opts: { days: number; startDate?: string },
): Promise<AgendaResult<AvailabilityResponse>> {
  if (isMockMode()) {
    return { ok: true, data: mockAvailability(eventTypeId, opts.days) }
  }

  try {
    const params = new URLSearchParams({
      tenantId: getTenantId(),
      eventTypeId,
      days: String(opts.days),
    })
    if (opts.startDate) params.set('startDate', opts.startDate)

    const { status, body } = await agendaFetch(
      `/api/public/availability?${params.toString()}`,
      { method: 'GET' },
    )
    if (status === 200 && body && typeof body === 'object') {
      return { ok: true, data: body as AvailabilityResponse }
    }
    return { ok: false, error: normalizeError(status, body) }
  } catch (err) {
    return { ok: false, error: networkError(err) }
  }
}

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<AgendaResult<BookingSuccess>> {
  if (isMockMode()) {
    return mockCreateBooking(payload)
  }

  try {
    const dateTime = wallClockToUtcIso(
      payload.date,
      payload.time,
      getTenantTimezone(),
    )
    const requestBody: Record<string, unknown> = {
      tenantId: getTenantId(),
      eventTypeId: payload.eventTypeId,
      dateTime,
      clientName: payload.clientName,
      clientEmail: payload.clientEmail,
      clientPhone: payload.clientPhone,
    }
    if (payload.clientAddress) requestBody.clientAddress = payload.clientAddress
    if (payload.clientZipCode) requestBody.clientZipCode = payload.clientZipCode
    if (payload.selectedAddressAlias) {
      requestBody.selectedAddressAlias = payload.selectedAddressAlias
    }
    if (payload.notes) requestBody.notes = payload.notes

    const { status, body } = await agendaFetch('/api/public/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-availability-token': payload.availabilityToken,
      },
      body: JSON.stringify(requestBody),
    })

    if (status === 201 && body && typeof body === 'object') {
      const b = body as { bookingId?: string; status?: string }
      return {
        ok: true,
        data: {
          bookingId: b.bookingId ?? '',
          status: b.status ?? 'pending_confirmation',
        },
      }
    }
    return { ok: false, error: normalizeError(status, body) }
  } catch (err) {
    return { ok: false, error: networkError(err) }
  }
}
