import { NextResponse, type NextRequest } from 'next/server'

import { fetchAvailability } from '@/lib/agenda/client'
import { isKnownEventType } from '@/lib/agenda/event-types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const NO_STORE = { 'Cache-Control': 'no-store' }

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const eventTypeId = searchParams.get('eventTypeId')?.trim() ?? ''

  if (!eventTypeId || !isKnownEventType(eventTypeId)) {
    return NextResponse.json(
      { error: { code: 'validation', httpStatus: 400 } },
      { status: 400, headers: NO_STORE },
    )
  }

  let days = Number.parseInt(searchParams.get('days') ?? '14', 10)
  if (!Number.isFinite(days)) days = 14
  days = Math.min(60, Math.max(1, days))

  const startDate = searchParams.get('startDate')?.trim() || undefined

  const result = await fetchAvailability(eventTypeId, { days, startDate })
  if (result.ok) {
    return NextResponse.json(result.data, { headers: NO_STORE })
  }
  return NextResponse.json(
    { error: result.error },
    { status: result.error.httpStatus || 502, headers: NO_STORE },
  )
}
