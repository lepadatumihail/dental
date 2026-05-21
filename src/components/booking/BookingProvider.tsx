'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

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

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModal />
    </BookingModalContext.Provider>
  )
}
