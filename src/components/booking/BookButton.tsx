'use client'

import clsx from 'clsx'

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
