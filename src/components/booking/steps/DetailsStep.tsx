'use client'

import type { Dispatch } from 'react'
import { useTranslations } from 'next-intl'

import { TextAreaField, TextField } from '../fields'
import type { ClientField, WizardAction, WizardState } from '../wizard-state'

export function DetailsStep({
  state,
  dispatch,
}: {
  state: WizardState
  dispatch: Dispatch<WizardAction>
}) {
  const t = useTranslations('booking')

  const update =
    (field: ClientField) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      dispatch({ type: 'set_field', field, value: e.target.value })

  return (
    <div>
      <p className="text-sm text-taupe">{t('steps.details.stepName')}</p>
      <div className="mt-4 space-y-4">
        <TextField
          label={t('details.nameLabel')}
          value={state.clientName}
          error={state.fieldErrors.clientName}
          maxLength={200}
          autoComplete="name"
          onChange={update('clientName')}
        />
        <TextField
          label={t('details.emailLabel')}
          type="email"
          value={state.clientEmail}
          error={state.fieldErrors.clientEmail}
          maxLength={254}
          autoComplete="email"
          onChange={update('clientEmail')}
        />
        <TextField
          label={t('details.phoneLabel')}
          type="tel"
          value={state.clientPhone}
          error={state.fieldErrors.clientPhone}
          maxLength={30}
          autoComplete="tel"
          placeholder="+34 600 000 000"
          onChange={update('clientPhone')}
        />
        <TextAreaField
          label={t('details.notesLabel')}
          value={state.notes}
          rows={3}
          maxLength={2000}
          placeholder={t('details.notesPlaceholder')}
          onChange={update('notes')}
        />
      </div>
    </div>
  )
}
