'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

import { useFocusTrap } from '@/hooks/useFocusTrap'
import { BookingWizard } from './BookingWizard'
import { useBookingModal } from './BookingProvider'

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

export function BookingModal() {
  const { isOpen, initialEventTypeId, close } = useBookingModal()
  const t = useTranslations('booking')
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(panelRef, isOpen)

  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-warm-dark/60 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        tabIndex={-1}
        className="relative my-4 w-full max-w-xl rounded-3xl bg-surface-100 shadow-[0_24px_64px_rgba(50,53,26,0.28)] outline-none sm:my-8"
      >
        <div className="flex items-center justify-between border-b border-mocha/10 px-6 py-5 sm:px-8">
          <h2
            id="booking-modal-title"
            className="font-display text-lg font-semibold text-warm-dark"
          >
            {t('modal.title')}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label={t('modal.close')}
            className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-taupe transition-colors duration-150 hover:bg-warm-dark/5 hover:text-warm-dark"
          >
            <CloseIcon className="h-5 w-5 fill-current" />
          </button>
        </div>
        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <BookingWizard
            variant="modal"
            initialEventTypeId={initialEventTypeId}
            onClose={close}
          />
        </div>
      </div>
    </div>
  )
}
