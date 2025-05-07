'use client'

import { PopupButton } from 'react-calendly'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function CalendlyButton() {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)
  const t = useTranslations('common.calendly')

  useEffect(() => {
    setRootElement(document?.body)
  }, [])

  if (!rootElement) {
    return null
  }

  return (
    <PopupButton
      url="https://calendly.com/robin-moazzez/30min"
      rootElement={rootElement}
      text={t('button')}
      className={clsx(
        'cursor-pointer rounded-lg px-5 py-3 font-display text-sm font-semibold transition',
        'bg-neutral-950 text-white hover:bg-neutral-800',
      )}
    />
  )
}
