'use client'

import { useTranslations } from 'next-intl'

import { EVENT_TYPES } from '@/lib/agenda/event-types'

function ChevronRight(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ServiceStep({
  onSelect,
}: {
  onSelect: (eventTypeId: string) => void
}) {
  const t = useTranslations('booking')

  return (
    <div>
      <p className="text-sm text-taupe">{t('steps.service.stepName')}</p>
      <div className="mt-4 grid gap-3">
        {EVENT_TYPES.map((eventType) => (
          <button
            key={eventType.id}
            type="button"
            onClick={() => onSelect(eventType.id)}
            className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-mocha/15 bg-white px-5 py-4 text-left transition-colors duration-150 hover:border-mocha hover:bg-surface-200"
          >
            <span>
              <span className="block font-display text-base font-semibold text-warm-dark">
                {t(`services.${eventType.key}.name`)}
              </span>
              <span className="mt-0.5 block text-sm text-taupe">
                {t(`services.${eventType.key}.description`)}
              </span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-mocha" />
          </button>
        ))}
      </div>
    </div>
  )
}
