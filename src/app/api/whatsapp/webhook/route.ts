// Inbound WhatsApp webhook (Twilio → here).
//
// Twilio POSTs an application/x-www-form-urlencoded body for every inbound
// message. We verify the signature, route the reply (1/2/3/BAJA), log the
// event to the campaign sheet, and answer with TwiML so Twilio sends our reply
// back to the patient — no second API call needed.
//
// Configure this URL in Twilio: Messaging → Senders → your sender → webhook.

import { type NextRequest } from 'next/server'

import { routeReply } from '@/lib/whatsapp/router'
import { logEvent } from '@/lib/whatsapp/sheets'
import { validateTwilioSignature } from '@/lib/whatsapp/twilio'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function twiml(message: string): Response {
  const body = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${xmlEscape(
    message,
  )}</Message></Response>`
  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'text/xml', 'Cache-Control': 'no-store' },
  })
}

export async function POST(request: NextRequest) {
  const raw = await request.text()
  const params = Object.fromEntries(new URLSearchParams(raw)) as Record<string, string>

  // Verify the request really came from Twilio (when an auth token is set).
  const authToken = process.env.TWILIO_AUTH_TOKEN
  if (authToken) {
    const url = process.env.WHATSAPP_WEBHOOK_URL || request.url
    const signature = request.headers.get('x-twilio-signature')
    if (!validateTwilioSignature(authToken, url, params, signature)) {
      return new Response('Invalid signature', { status: 403 })
    }
  }

  const from = params.From || '' // "whatsapp:+34..."
  const phone = from.replace('whatsapp:', '')
  const body = params.Body || ''

  const reply = routeReply(body, {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
  })

  // Best-effort logging — never let a sheet hiccup break the patient reply.
  try {
    await logEvent({
      timestampIso: new Date().toISOString(),
      phone,
      intent: reply.intent,
      optOut: reply.optOut,
      rawBody: body,
    })
  } catch (err) {
    console.error('[whatsapp] sheet log failed:', err)
  }

  return twiml(reply.text)
}
