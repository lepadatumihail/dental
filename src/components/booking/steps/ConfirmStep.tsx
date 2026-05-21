'use client'

import { useLocale, useTranslations } from 'next-intl'

import { findEventType } from '@/lib/agenda/event-types'
import { formatDateLong } from '../format'
import { canPickService, type WizardState, type WizardStep } from '../wizard-state'

function locationSummary(state: WizardState): string {
  const a = state.availability
  if (!a) return '—'
  if (a.locationType === 'predefined') {
    const addr = a.addresses?.find(
      (x) => x.alias === state.selectedAddressAlias,
    )
    return addr?.label ?? '—'
  }
  return (
    [state.clientAddress, state.clientZipCode].filter(Boolean).join(', ') || '—'
  )
}

export function ConfirmStep({
  state,
  onEdit,
}: {
  state: WizardState
  onEdit: (step: WizardStep) => void
}) {
  const t = useTranslations('booking')
  const locale = useLocale()
  const eventType = state.eventTypeId
    ? findEventType(state.eventTypeId)
    : undefined

  const when =
    state.selectedDate && state.selectedTime
      ? `${formatDateLong(state.selectedDate, locale)}, ${state.selectedTime}`
      : '—'

  const rows: { label: string; value: string; editStep?: WizardStep }[] = []
  if (eventType) {
    rows.push({
      label: t('confirm.serviceLabel'),
      value: t(`services.${eventType.key}.name`),
      editStep: canPickService() ? 'service' : undefined,
    })
  }
  rows.push({
    label: t('confirm.whenLabel'),
    value: when,
    editStep: 'datetime',
  })
  rows.push({
    label: t('confirm.whereLabel'),
    value: locationSummary(state),
    editStep: 'location',
  })
  rows.push({
    label: t('confirm.contactLabel'),
    value: `${state.clientName} · ${state.clientEmail} · ${state.clientPhone}`,
    editStep: 'details',
  })

  return (
    <div>
      <p className="text-sm text-taupe">{t('steps.confirm.stepName')}</p>
      <dl className="mt-4 divide-y divide-mocha/10 rounded-2xl border border-mocha/15 bg-white">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-4 px-5 py-3.5"
          >
            <div className="min-w-0">
              <dt className="text-[11px] font-medium tracking-wide text-taupe uppercase">
                {row.label}
              </dt>
              <dd className="mt-0.5 text-sm break-words text-warm-dark">
                {row.value}
              </dd>
            </div>
            {row.editStep ? (
              <button
                type="button"
                onClick={() => onEdit(row.editStep as WizardStep)}
                className="shrink-0 text-xs font-semibold text-mocha transition-colors hover:text-mocha-dark"
              >
                {t('confirm.edit')}
              </button>
            ) : null}
          </div>
        ))}
      </dl>
      {state.notes.trim() ? (
        <p className="mt-3 text-xs text-taupe">
          <span className="font-medium">{t('details.notesLabel')}:</span>{' '}
          {state.notes.trim()}
        </p>
      ) : null}
    </div>
  )
}
