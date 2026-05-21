'use client'

import type { Dispatch } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { formatDateShort } from '../format'
import type { WizardAction, WizardState } from '../wizard-state'

export function DateTimeStep({
  state,
  dispatch,
  onRetry,
}: {
  state: WizardState
  dispatch: Dispatch<WizardAction>
  onRetry: () => void
}) {
  const t = useTranslations('booking')
  const locale = useLocale()

  if (
    state.availabilityStatus === 'idle' ||
    state.availabilityStatus === 'loading'
  ) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-mocha/25 border-t-mocha" />
        <p className="text-sm text-taupe">{t('datetime.loading')}</p>
      </div>
    )
  }

  if (state.availabilityStatus === 'error' || !state.availability) {
    return (
      <div className="rounded-2xl border border-mocha/15 bg-white px-5 py-10 text-center">
        <p className="text-sm text-taupe">{t('datetime.loadError')}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-mocha px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-mocha-dark"
        >
          {t('actions.retry')}
        </button>
      </div>
    )
  }

  const { availableDates, slotsByDate } = state.availability

  if (availableDates.length === 0) {
    return (
      <div className="rounded-2xl border border-mocha/15 bg-white px-5 py-10 text-center">
        <p className="text-sm text-taupe">{t('datetime.noAvailability')}</p>
      </div>
    )
  }

  const slots = state.selectedDate
    ? (slotsByDate[state.selectedDate] ?? [])
    : []

  return (
    <div>
      <p className="text-sm text-taupe">{t('steps.datetime.stepName')}</p>

      <h3 className="mt-4 text-sm font-semibold text-warm-dark">
        {t('datetime.selectDate')}
      </h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {availableDates.map((date) => {
          const active = date === state.selectedDate
          return (
            <button
              key={date}
              type="button"
              onClick={() => dispatch({ type: 'select_date', date })}
              className={`rounded-xl border px-3.5 py-2 text-sm font-medium capitalize transition-colors duration-150 ${
                active
                  ? 'border-mocha bg-mocha text-white'
                  : 'border-mocha/20 bg-white text-warm-dark hover:border-mocha'
              }`}
            >
              {formatDateShort(date, locale)}
            </button>
          )
        })}
      </div>

      {state.selectedDate ? (
        <>
          <h3 className="mt-6 text-sm font-semibold text-warm-dark">
            {t('datetime.selectTime')}
          </h3>
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {slots.map((time) => {
              const active = time === state.selectedTime
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => dispatch({ type: 'select_time', time })}
                  className={`rounded-xl border px-2 py-2 text-sm font-medium transition-colors duration-150 ${
                    active
                      ? 'border-mocha bg-mocha text-white'
                      : 'border-mocha/20 bg-white text-warm-dark hover:border-mocha'
                  }`}
                >
                  {time}
                </button>
              )
            })}
          </div>
          <p className="mt-3 text-xs text-taupe/80">
            {t('datetime.timezoneNote')}
          </p>
        </>
      ) : null}
    </div>
  )
}
