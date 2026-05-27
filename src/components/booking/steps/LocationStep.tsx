'use client'

import type { Dispatch } from 'react'
import { useTranslations } from 'next-intl'

import { TextField } from '../fields'
import type { WizardAction, WizardState } from '../wizard-state'

export function LocationStep({
  state,
  dispatch,
}: {
  state: WizardState
  dispatch: Dispatch<WizardAction>
}) {
  const t = useTranslations('booking')
  const availability = state.availability
  if (!availability) return null

  if (availability.locationType === 'client_address') {
    return (
      <div>
        <p className="text-sm text-taupe">
          {t('location.clientAddressTitle')}
        </p>
        <div className="mt-4 space-y-4">
          <TextField
            label={t('location.addressLabel')}
            value={state.clientAddress}
            error={state.fieldErrors.clientAddress}
            maxLength={500}
            autoComplete="street-address"
            onChange={(e) =>
              dispatch({
                type: 'set_field',
                field: 'clientAddress',
                value: e.target.value,
              })
            }
          />
          <TextField
            label={t('location.zipLabel')}
            value={state.clientZipCode}
            maxLength={20}
            autoComplete="postal-code"
            onChange={(e) =>
              dispatch({
                type: 'set_field',
                field: 'clientZipCode',
                value: e.target.value,
              })
            }
          />
        </div>
      </div>
    )
  }

  const addresses = availability.addresses ?? []
  return (
    <div>
      <p className="text-sm text-taupe">{t('location.predefinedTitle')}</p>
      <div className="mt-4 grid gap-3">
        {addresses.length === 0 ? (
          <p className="text-sm text-taupe">{t('location.noLocations')}</p>
        ) : null}
        {addresses.map((addr) => {
          const active = addr.alias === state.selectedAddressAlias
          return (
            <button
              key={addr.alias}
              type="button"
              onClick={() =>
                dispatch({ type: 'select_address', alias: addr.alias })
              }
              className={`flex w-full items-start gap-3 rounded-2xl border px-5 py-4 text-left transition-colors duration-150 ${
                active
                  ? 'border-mocha bg-surface-200'
                  : 'border-mocha/15 bg-white hover:border-mocha'
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  active ? 'border-mocha' : 'border-mocha/40'
                }`}
              >
                {active ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-mocha" />
                ) : null}
              </span>
              <span>
                <span className="block text-sm font-semibold text-warm-dark">
                  {addr.label}
                </span>
                <span className="mt-0.5 block text-xs text-taupe">
                  {addr.address}
                  {addr.zipcode ? `, ${addr.zipcode}` : ''}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
