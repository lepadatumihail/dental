'use client'

import { useEffect, useReducer } from 'react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/Button'
import type { AgendaErrorCode, CreateBookingPayload } from '@/lib/agenda/types'
import { getAvailability, postBooking } from './api'
import { ConfirmStep } from './steps/ConfirmStep'
import { DateTimeStep } from './steps/DateTimeStep'
import { DetailsStep } from './steps/DetailsStep'
import { LocationStep } from './steps/LocationStep'
import { ServiceStep } from './steps/ServiceStep'
import { SuccessStep } from './steps/SuccessStep'
import {
  canPickService,
  createInitialState,
  wizardReducer,
  type WizardStep,
} from './wizard-state'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_HREF = 'tel:+34673290786'
const WHATSAPP_HREF = 'https://wa.me/+34673290786'

const ERROR_KEY: Record<AgendaErrorCode, string> = {
  validation: 'errors.validation',
  unauthorized: 'errors.sessionExpired',
  forbidden: 'errors.unavailable',
  not_found: 'errors.unavailable',
  token_expired: 'errors.sessionExpired',
  slot_taken: 'errors.slotTaken',
  payload_too_large: 'errors.tooLong',
  unsupported_media: 'errors.generic',
  rate_limited: 'errors.rateLimited',
  network: 'errors.network',
  unknown: 'errors.generic',
}

// Codes that signal a configuration/system fault — offer a phone fallback.
const FALLBACK_CODES: ReadonlySet<AgendaErrorCode> = new Set([
  'forbidden',
  'not_found',
  'unknown',
  'unsupported_media',
])

const NEXT_STEP: Partial<Record<WizardStep, WizardStep>> = {
  datetime: 'location',
  location: 'details',
  details: 'confirm',
}

const PREV_STEP: Partial<Record<WizardStep, WizardStep>> = {
  datetime: 'service',
  location: 'datetime',
  details: 'location',
  confirm: 'details',
}

const PROGRESS_STEPS: WizardStep[] = [
  'service',
  'datetime',
  'location',
  'details',
  'confirm',
]

function WizardProgress({ current }: { current: WizardStep }) {
  const t = useTranslations('booking')
  const steps = canPickService()
    ? PROGRESS_STEPS
    : PROGRESS_STEPS.filter((step) => step !== 'service')
  const currentIdx = steps.indexOf(current)

  return (
    <ol className="flex items-stretch gap-1.5">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-1 flex-col gap-1.5">
          <span
            className={`h-1 rounded-full transition-colors ${
              i <= currentIdx ? 'bg-mocha' : 'bg-mocha/15'
            }`}
          />
          <span
            className={`text-[10px] font-medium tracking-wide uppercase ${
              i === currentIdx ? 'text-mocha' : 'text-taupe/70'
            }`}
          >
            {t(`steps.${step}.label`)}
          </span>
        </li>
      ))}
    </ol>
  )
}

function WizardErrorBanner({ code }: { code: AgendaErrorCode }) {
  const t = useTranslations('booking')
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      <p>{t(ERROR_KEY[code])}</p>
      {FALLBACK_CODES.has(code) ? (
        <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <a href={PHONE_HREF} className="font-semibold underline">
            {t('errors.fallbackCall')}
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            {t('errors.fallbackWhatsapp')}
          </a>
        </p>
      ) : null}
    </div>
  )
}

interface BookingWizardProps {
  variant: 'inline' | 'modal'
  initialEventTypeId?: string | null
  onClose?: () => void
}

export function BookingWizard({
  variant,
  initialEventTypeId = null,
  onClose,
}: BookingWizardProps) {
  const t = useTranslations('booking')
  const [state, dispatch] = useReducer(
    wizardReducer,
    initialEventTypeId,
    createInitialState,
  )

  const { eventTypeId, reloadKey } = state

  // Fetch availability whenever the event-type changes or a reload is requested
  // (retry / token-expiry recovery). Each fetch yields a fresh token.
  useEffect(() => {
    if (!eventTypeId) return
    let cancelled = false
    getAvailability(eventTypeId).then((res) => {
      if (cancelled) return
      if (res.ok) dispatch({ type: 'availability_loaded', data: res.data })
      else dispatch({ type: 'availability_error', error: res.error })
    })
    return () => {
      cancelled = true
    }
  }, [eventTypeId, reloadKey])

  function canAdvance(): boolean {
    if (state.step === 'datetime') {
      return (
        state.availabilityStatus === 'ready' &&
        !!state.selectedDate &&
        !!state.selectedTime
      )
    }
    if (state.step === 'location') {
      const loc = state.availability?.locationType
      if (loc === 'predefined') return !!state.selectedAddressAlias
      if (loc === 'client_address') {
        return state.clientAddress.trim().length > 0
      }
    }
    return true
  }

  function handleNext() {
    if (state.step === 'details') {
      const fieldErrors: Record<string, string> = {}
      if (!state.clientName.trim()) {
        fieldErrors.clientName = t('validation.required')
      }
      if (!state.clientEmail.trim()) {
        fieldErrors.clientEmail = t('validation.required')
      } else if (!EMAIL_RE.test(state.clientEmail.trim())) {
        fieldErrors.clientEmail = t('validation.invalidEmail')
      }
      if (!state.clientPhone.trim()) {
        fieldErrors.clientPhone = t('validation.required')
      }
      if (Object.keys(fieldErrors).length > 0) {
        dispatch({ type: 'invalid', fieldErrors })
        return
      }
    }
    const target = NEXT_STEP[state.step]
    if (target) dispatch({ type: 'go_next', step: target })
  }

  function handleBack() {
    const target = PREV_STEP[state.step]
    if (target) dispatch({ type: 'go_back', step: target })
  }

  async function handleSubmit() {
    const { availability, selectedDate, selectedTime } = state
    if (!eventTypeId || !availability || !selectedDate || !selectedTime) {
      return
    }
    dispatch({ type: 'submit_start' })

    const payload: CreateBookingPayload = {
      eventTypeId,
      date: selectedDate,
      time: selectedTime,
      clientName: state.clientName.trim(),
      clientEmail: state.clientEmail.trim(),
      clientPhone: state.clientPhone.trim(),
      availabilityToken: availability.availabilityToken,
    }
    const notes = state.notes.trim()
    if (notes) payload.notes = notes
    if (availability.locationType === 'predefined') {
      if (state.selectedAddressAlias) {
        payload.selectedAddressAlias = state.selectedAddressAlias
      }
    } else {
      const addr = state.clientAddress.trim()
      const zip = state.clientZipCode.trim()
      if (addr) payload.clientAddress = addr
      if (zip) payload.clientZipCode = zip
    }

    const res = await postBooking(payload)
    if (res.ok) {
      dispatch({ type: 'submit_success', data: res.data })
    } else if (
      res.error.code === 'token_expired' ||
      res.error.code === 'slot_taken'
    ) {
      dispatch({ type: 'recover', error: res.error })
    } else if (res.error.code === 'validation') {
      dispatch({ type: 'submit_error', error: res.error, step: 'details' })
    } else {
      dispatch({ type: 'submit_error', error: res.error })
    }
  }

  const isConfirm = state.step === 'confirm'
  const showNav = state.step !== 'service' && state.step !== 'success'
  const hasBack =
    state.step === 'confirm' ||
    state.step === 'details' ||
    state.step === 'location' ||
    (state.step === 'datetime' && canPickService())

  return (
    <div className="flex flex-col">
      {state.step !== 'success' ? (
        <WizardProgress current={state.step} />
      ) : null}

      {state.error ? (
        <div className="mt-4">
          <WizardErrorBanner code={state.error.code} />
        </div>
      ) : null}

      <div className="mt-5">
        {state.step === 'service' ? (
          <ServiceStep
            onSelect={(id) =>
              dispatch({ type: 'select_service', eventTypeId: id })
            }
          />
        ) : null}
        {state.step === 'datetime' ? (
          <DateTimeStep
            state={state}
            dispatch={dispatch}
            onRetry={() => dispatch({ type: 'retry_availability' })}
          />
        ) : null}
        {state.step === 'location' ? (
          <LocationStep state={state} dispatch={dispatch} />
        ) : null}
        {state.step === 'details' ? (
          <DetailsStep state={state} dispatch={dispatch} />
        ) : null}
        {state.step === 'confirm' ? (
          <ConfirmStep
            state={state}
            onEdit={(step) => dispatch({ type: 'go_back', step })}
          />
        ) : null}
        {state.step === 'success' ? (
          <SuccessStep
            variant={variant}
            onClose={onClose}
            onReset={() => dispatch({ type: 'reset' })}
          />
        ) : null}
      </div>

      {showNav ? (
        <div className="mt-8 flex items-center justify-between gap-3">
          {hasBack ? (
            <button
              type="button"
              onClick={handleBack}
              className="rounded-lg px-4 py-3 text-sm font-medium text-warm-dark transition-colors duration-150 hover:bg-warm-dark/5"
            >
              {t('actions.back')}
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          <Button
            type="button"
            onClick={isConfirm ? handleSubmit : handleNext}
            disabled={state.submitting || (!isConfirm && !canAdvance())}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isConfirm
              ? state.submitting
                ? t('confirm.submitting')
                : t('confirm.submit')
              : t('actions.next')}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
