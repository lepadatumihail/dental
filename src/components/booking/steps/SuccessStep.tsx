'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/Button'

function CheckCircle(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 12.4l2.6 2.6L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SuccessStep({
  variant,
  onClose,
  onReset,
}: {
  variant: 'inline' | 'modal'
  onClose?: () => void
  onReset: () => void
}) {
  const t = useTranslations('booking')

  return (
    <div className="flex flex-col items-center py-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-warm-success/10 text-warm-success">
        <CheckCircle className="h-8 w-8" />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold text-warm-dark">
        {t('success.title')}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-taupe">{t('success.body')}</p>
      <Button
        type="button"
        className="mt-7"
        onClick={() => (variant === 'modal' ? onClose?.() : onReset())}
      >
        {t('success.done')}
      </Button>
    </div>
  )
}
