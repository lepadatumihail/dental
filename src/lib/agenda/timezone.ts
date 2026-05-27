// Wall-clock → UTC conversion for the agenda booking integration.
//
// Availability slots come back as `HH:mm` in the tenant's local time with no
// offset; the booking POST needs an ISO-8601 UTC `dateTime`. This converts a
// tenant-local wall-clock date+time to a UTC ISO string, DST-correct, using the
// JS runtime's built-in IANA timezone data — no date library.

/** Offset (ms) of `timeZone` from UTC at `instant`, where local = utc + offset. */
function tzOffsetMs(instant: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(new Date(instant))

  const map: Record<string, number> = {}
  for (const p of parts) {
    if (p.type !== 'literal') map[p.type] = Number(p.value)
  }
  const hour = map.hour === 24 ? 0 : map.hour
  const asUtc = Date.UTC(
    map.year,
    map.month - 1,
    map.day,
    hour,
    map.minute,
    map.second,
  )
  return asUtc - instant
}

/**
 * Convert a wall-clock date (`YYYY-MM-DD`) and time (`HH:mm`) in `timeZone`
 * to a UTC ISO string, e.g. `2026-07-10T12:00:00Z`.
 */
export function wallClockToUtcIso(
  date: string,
  time: string,
  timeZone: string,
): string {
  const [y, mo, d] = date.split('-').map(Number)
  const [h, mi] = time.split(':').map(Number)
  const wallAsUtc = Date.UTC(y, mo - 1, d, h, mi, 0)

  // Two-pass refinement: the offset depends on the instant we're solving for,
  // so evaluate it, correct, and re-evaluate. Converges within two iterations.
  let utc = wallAsUtc
  for (let i = 0; i < 2; i++) {
    const corrected = wallAsUtc - tzOffsetMs(utc, timeZone)
    if (corrected === utc) break
    utc = corrected
  }

  return new Date(utc).toISOString().replace(/\.\d{3}Z$/, 'Z')
}
