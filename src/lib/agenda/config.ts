// Server-side configuration for the agenda booking integration.
// Reads non-public env vars — must only be imported by server code
// (route handlers / the agenda client), never by client components.

const DEFAULT_API_BASE_URL = 'https://agenda.aceresearch.net'
const DEFAULT_TENANT_ID = 'tenant-1779314436891'

/** Agenda API base URL (override with AGENDA_API_BASE_URL for staging). */
export function getApiBaseUrl(): string {
  const url = process.env.AGENDA_API_BASE_URL?.trim()
  return (url || DEFAULT_API_BASE_URL).replace(/\/+$/, '')
}

/**
 * Mock mode — serves local fake data instead of calling the agenda API.
 * Opt-in via AGENDA_MOCK=true for offline development / error-path testing.
 */
export function isMockMode(): boolean {
  return process.env.AGENDA_MOCK === 'true'
}

export function getTenantId(): string {
  return process.env.AGENDA_TENANT_ID?.trim() || DEFAULT_TENANT_ID
}

/** IANA timezone the agenda returns slot times in. Marbella → Europe/Madrid. */
export function getTenantTimezone(): string {
  return process.env.AGENDA_TENANT_TIMEZONE?.trim() || 'Europe/Madrid'
}
