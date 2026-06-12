// Minimal server-side Twilio helpers for WhatsApp — raw REST, no SDK.
// Used by the inbound webhook (signature check) and any server-initiated send.

import crypto from 'node:crypto'

/**
 * Validate Twilio's X-Twilio-Signature for an incoming webhook request.
 *
 * Twilio signs: the full request URL + every POST param, the params sorted by
 * key and concatenated as key+value with no separators, HMAC-SHA1 with the
 * account Auth Token, base64-encoded. See:
 * https://www.twilio.com/docs/usage/security#validating-requests
 */
export function validateTwilioSignature(
  authToken: string,
  url: string,
  params: Record<string, string>,
  signature: string | null,
): boolean {
  if (!signature) return false
  const data =
    url +
    Object.keys(params)
      .sort()
      .map((k) => k + params[k])
      .join('')
  const expected = crypto
    .createHmac('sha1', authToken)
    .update(Buffer.from(data, 'utf-8'))
    .digest('base64')
  const a = Buffer.from(expected)
  const b = Buffer.from(signature)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

const API_BASE = 'https://api.twilio.com/2010-04-01'

function authHeader(): string {
  const sid = process.env.TWILIO_ACCOUNT_SID ?? ''
  const token = process.env.TWILIO_AUTH_TOKEN ?? ''
  return 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64')
}

/**
 * Send a free-form WhatsApp message (only valid inside the 24h customer-service
 * window — i.e. in reply to a patient who just messaged us). For cold/outbound
 * use a template instead (see scripts/wa-send.mjs).
 */
export async function sendFreeform(to: string, body: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const from = process.env.TWILIO_WHATSAPP_FROM // e.g. "whatsapp:+46764799995"
  if (!sid || !from) throw new Error('Twilio env not configured')

  const res = await fetch(`${API_BASE}/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      From: from,
      To: to.startsWith('whatsapp:') ? to : `whatsapp:${to}`,
      Body: body,
    }),
  })
  if (!res.ok) {
    throw new Error(`Twilio send failed ${res.status}: ${await res.text()}`)
  }
}
