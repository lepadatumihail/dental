// Shared types for the agenda public booking API integration.
// Types only — safe to import from both server and client code.

export type LocationType = 'predefined' | 'client_address'

export interface AgendaAddress {
  alias: string
  label: string
  address: string
  zipcode: string
}

export interface AvailabilityResponse {
  availableDates: string[]
  slotsByDate: Record<string, string[]>
  locationType: LocationType
  addresses?: AgendaAddress[]
  availabilityToken: string
}

export interface BookingSuccess {
  bookingId: string
  status: string
}

/**
 * Payload the browser wizard POSTs to our own /api/booking/create proxy.
 * `tenantId` and the UTC `dateTime` are derived server-side — the wizard sends
 * only the tenant-local wall-clock `date` + `time`.
 */
export interface CreateBookingPayload {
  eventTypeId: string
  date: string // YYYY-MM-DD, tenant-local
  time: string // HH:mm, tenant-local
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress?: string
  clientZipCode?: string
  selectedAddressAlias?: string
  notes?: string
  availabilityToken: string
}

export type AgendaErrorCode =
  | 'validation'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'token_expired'
  | 'slot_taken'
  | 'payload_too_large'
  | 'unsupported_media'
  | 'rate_limited'
  | 'network'
  | 'unknown'

export interface NormalizedError {
  code: AgendaErrorCode
  httpStatus: number
  rawMessage?: string
  fieldMessages?: string[]
}

export type AgendaResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: NormalizedError }
