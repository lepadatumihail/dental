'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { findEventTypeByKey } from '@/lib/agenda/event-types'

import { BookingModal } from './BookingModal'

interface BookingModalContextValue {
  isOpen: boolean
  /** Event-type to pre-select when the modal opens, or null for the picker. */
  initialEventTypeId: string | null
  open: (eventTypeId?: string) => void
  close: () => void
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null)

export function useBookingModal(): BookingModalContextValue {
  const ctx = useContext(BookingModalContext)
  if (!ctx) {
    throw new Error('useBookingModal must be used within BookingModalProvider')
  }
  return ctx
}

/**
 * Provides the site-wide booking modal. Mounted once near the root so any
 * descendant (a BookButton anywhere) can open it via useBookingModal().
 */
export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialEventTypeId, setInitialEventTypeId] = useState<string | null>(
    null,
  )

  const value = useMemo<BookingModalContextValue>(
    () => ({
      isOpen,
      initialEventTypeId,
      open: (eventTypeId?: string) => {
        setInitialEventTypeId(eventTypeId ?? null)
        setIsOpen(true)
      },
      close: () => setIsOpen(false),
    }),
    [isOpen, initialEventTypeId],
  )

  // Deep link: a WhatsApp reply links here with ?book=<service> to open the
  // wizard straight on the date-picker for that service ("all" → service
  // picker). Runs once on mount.
  useEffect(() => {
    const book = new URLSearchParams(window.location.search).get('book')
    if (!book) return
    if (book === 'all') {
      setIsOpen(true)
      return
    }
    const evt = findEventTypeByKey(book)
    if (evt) {
      setInitialEventTypeId(evt.id)
      setIsOpen(true)
    }
  }, [])

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModal />
    </BookingModalContext.Provider>
  )
}
