'use client'

import clsx from 'clsx'

import { findEventTypeByKey } from '@/lib/agenda/event-types'

import { useBookingModal } from './BookingProvider'

type BookButtonVariant = 'primary' | 'invert' | 'hero'

const VARIANT_CLASS: Record<BookButtonVariant, string> = {
  primary: 'px-5 py-3 bg-mocha text-white hover:bg-mocha-dark',
  invert: 'px-5 py-3 bg-white text-forest hover:bg-surface-200',
  hero: 'px-6 py-3.5 bg-white text-warm-dark hover:bg-surface-200',
}

/**
 * Booking CTA — opens the site-wide booking modal. Drop-in for any "Book"
 * button. `eventTypeId` optionally pre-selects a service.
 */
export function BookButton({
  label,
  eventTypeId,
  variant = 'primary',
  className,
}: {
  label: string
  eventTypeId?: string
  variant?: BookButtonVariant
  className?: string
}) {
  const { open } = useBookingModal()
  return (
    <button
      type="button"
      onClick={() => open(eventTypeId)}
      className={clsx(
        'inline-flex cursor-pointer items-center rounded-lg text-sm font-medium transition-colors duration-150',
        VARIANT_CLASS[variant],
        className,
      )}
    >
      {label}
    </button>
  )
}

/**
 * Unstyled booking trigger for server-rendered layouts that bring their own
 * classes (e.g. `button dark`). Opens the booking modal like BookButton;
 * `service` pre-selects an event type by key (e.g. 'dental').
 */
export function BookTrigger({
  service,
  className,
  children,
  onClick,
}: {
  service?: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}) {
  const { open } = useBookingModal()
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.()
        open(service ? findEventTypeByKey(service)?.id : undefined)
      }}
      className={className}
    >
      {children}
    </button>
  )
}
