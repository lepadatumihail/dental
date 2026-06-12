// Tiny Google Sheets store for the WhatsApp campaign — append + read, using
// the service-account creds already in .env.local (GOOGLE_CLIENT_EMAIL /
// GOOGLE_PRIVATE_KEY / GOOGLE_SHEET_ID). No new dependency: we mint the OAuth
// JWT with node:crypto and call the Sheets REST API directly.
//
// We write campaign events (opt-in interest, opt-out) to a dedicated tab so we
// never touch whatever else lives in the spreadsheet. The send script reads the
// opt-out list from here to suppress unsubscribed patients.

import crypto from 'node:crypto'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SHEETS_BASE = 'https://sheets.googleapis.com/v4/spreadsheets'
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets'

export const CAMPAIGN_TAB = process.env.WHATSAPP_SHEET_TAB || 'wa_campaign'

let cachedToken: { value: string; expMs: number } | null = null

function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString('base64url')
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expMs - 60_000) {
    return cachedToken.value
  }
  const email = process.env.GOOGLE_CLIENT_EMAIL
  const key = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
  if (!email || !key) throw new Error('GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY missing')

  const now = Math.floor(Date.now() / 1000)
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = b64url(
    JSON.stringify({
      iss: email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  )
  const signer = crypto.createSign('RSA-SHA256')
  signer.update(`${header}.${claim}`)
  signer.end()
  const signature = signer.sign(key).toString('base64url')
  const jwt = `${header}.${claim}.${signature}`

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  const json = (await res.json()) as { access_token?: string; expires_in?: number }
  if (!json.access_token) {
    throw new Error(`Sheets auth failed: ${JSON.stringify(json)}`)
  }
  cachedToken = {
    value: json.access_token,
    expMs: Date.now() + (json.expires_in ?? 3600) * 1000,
  }
  return cachedToken.value
}

function sheetId(): string {
  const id = process.env.GOOGLE_SHEET_ID
  if (!id) throw new Error('GOOGLE_SHEET_ID missing')
  return id
}

/** Create the campaign tab if it doesn't exist yet (idempotent, best-effort). */
export async function ensureCampaignTab(): Promise<void> {
  const token = await getAccessToken()
  const meta = await fetch(`${SHEETS_BASE}/${sheetId()}?fields=sheets.properties.title`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json() as Promise<{ sheets?: { properties: { title: string } }[] }>)

  const exists = meta.sheets?.some((s) => s.properties.title === CAMPAIGN_TAB)
  if (exists) return

  await fetch(`${SHEETS_BASE}/${sheetId()}:batchUpdate`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [{ addSheet: { properties: { title: CAMPAIGN_TAB } } }],
    }),
  })
  // Header row
  await appendRow([
    'timestamp',
    'phone',
    'historia',
    'name',
    'intent',
    'opt_out',
    'raw_body',
  ])
}

/** Append a row to the campaign tab. */
export async function appendRow(values: (string | number)[]): Promise<void> {
  const token = await getAccessToken()
  const range = `${encodeURIComponent(CAMPAIGN_TAB)}!A:G`
  const res = await fetch(
    `${SHEETS_BASE}/${sheetId()}/values/${range}:append?valueInputOption=RAW`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [values] }),
    },
  )
  if (!res.ok) throw new Error(`Sheets append failed ${res.status}: ${await res.text()}`)
}

/** Record an inbound reply event. */
export async function logEvent(e: {
  timestampIso: string
  phone: string
  historia?: string
  name?: string
  intent: string
  optOut: boolean
  rawBody: string
}): Promise<void> {
  await appendRow([
    e.timestampIso,
    e.phone,
    e.historia ?? '',
    e.name ?? '',
    e.intent,
    e.optOut ? 'yes' : '',
    e.rawBody.slice(0, 300),
  ])
}

/** Return the set of opted-out phone numbers (E.164, no whatsapp: prefix). */
export async function getOptOuts(): Promise<Set<string>> {
  const token = await getAccessToken()
  const range = `${encodeURIComponent(CAMPAIGN_TAB)}!A:G`
  const res = await fetch(`${SHEETS_BASE}/${sheetId()}/values/${range}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) return new Set()
  const json = (await res.json()) as { values?: string[][] }
  const out = new Set<string>()
  for (const row of json.values ?? []) {
    // columns: timestamp, phone, historia, name, intent, opt_out, raw_body
    if (row[5] === 'yes' && row[1]) out.add(row[1].replace('whatsapp:', ''))
  }
  return out
}
