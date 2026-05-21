// Bookable services for Prisma Clinic Marbella (agenda tenant tenant-1779314436891).
//
// Each entry is one agenda "event-type". `key` maps to i18n strings under
// `booking.services.<key>` (name + description). The wizard shows a service
// picker when this list has more than one entry.

export interface BookableEventType {
  id: string
  key: string
}

export const EVENT_TYPES: readonly BookableEventType[] = [
  { id: 'evt-1779314660755-x04m67p', key: 'dental' },
  { id: 'evt-1779314681830-g4u8ins', key: 'aesthetics' },
  { id: 'evt-1779314699830-j95zf6g', key: 'medical' },
]

export function findEventType(id: string): BookableEventType | undefined {
  return EVENT_TYPES.find((e) => e.id === id)
}

export function isKnownEventType(id: string): boolean {
  return EVENT_TYPES.some((e) => e.id === id)
}
