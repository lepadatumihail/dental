// Bookable services for Prisma Clinic Marbella (agenda tenant tenant-1780397603138).
//
// Each entry is one agenda "event-type". `key` maps to i18n strings under
// `booking.services.<key>` (name + description). The wizard shows a service
// picker when this list has more than one entry.

export interface BookableEventType {
  id: string
  key: string
}

export const EVENT_TYPES: readonly BookableEventType[] = [
  { id: 'evt-1780397835146-x72x5x5', key: 'dental' },
  { id: 'evt-1780397865184-0uanogf', key: 'aesthetics' },
  { id: 'evt-1780397850300-m056dna', key: 'medical' },
]

export function findEventType(id: string): BookableEventType | undefined {
  return EVENT_TYPES.find((e) => e.id === id)
}

/** Look up an event type by its semantic key (e.g. 'dental', 'aesthetics'). */
export function findEventTypeByKey(key: string): BookableEventType | undefined {
  return EVENT_TYPES.find((e) => e.key === key)
}

export function isKnownEventType(id: string): boolean {
  return EVENT_TYPES.some((e) => e.id === id)
}
