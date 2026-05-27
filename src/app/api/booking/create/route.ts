import { NextResponse, type NextRequest } from 'next/server'

import { createBooking } from '@/lib/agenda/client'
import { isKnownEventType } from '@/lib/agenda/event-types'
import type { CreateBookingPayload } from '@/lib/agenda/types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const NO_STORE = { 'Cache-Control': 'no-store' }

const REQUIRED: (keyof CreateBookingPayload)[] = [
  'eventTypeId',
  'date',
  'time',
  'clientName',
  'clientEmail',
  'clientPhone',
  'availabilityToken',
]

const MAX_LENGTHS: Partial<Record<keyof CreateBookingPayload, number>> = {
  clientName: 200,
  clientEmail: 254,
  clientPhone: 30,
  clientAddress: 500,
  clientZipCode: 20,
  selectedAddressAlias: 200,
  notes: 2000,
}

function errorResponse(status: number, error: object) {
  return NextResponse.json({ error }, { status, headers: NO_STORE })
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return errorResponse(415, { code: 'unsupported_media', httpStatus: 415 })
  }

  let body: Partial<CreateBookingPayload>
  try {
    body = (await request.json()) as Partial<CreateBookingPayload>
  } catch {
    return errorResponse(400, { code: 'validation', httpStatus: 400 })
  }

  const fieldMessages: string[] = []
  for (const field of REQUIRED) {
    const value = body[field]
    if (typeof value !== 'string' || value.trim() === '') {
      fieldMessages.push(`the ${field} is required`)
    }
  }
  if (body.eventTypeId && !isKnownEventType(body.eventTypeId)) {
    fieldMessages.push('the eventTypeId is invalid')
  }
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const value = body[field as keyof CreateBookingPayload]
    if (typeof value === 'string' && value.length > max) {
      fieldMessages.push(`the ${field} must not exceed ${max} characters`)
    }
  }
  if (fieldMessages.length > 0) {
    return errorResponse(400, {
      code: 'validation',
      httpStatus: 400,
      fieldMessages,
    })
  }

  const result = await createBooking(body as CreateBookingPayload)
  if (result.ok) {
    return NextResponse.json(result.data, { headers: NO_STORE })
  }
  return errorResponse(result.error.httpStatus || 502, result.error)
}
