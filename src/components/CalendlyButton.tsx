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
      url="https://calendly.com/robin-moazzez"
      rootElement={rootElement}
      text={t('button')}
      className={clsx(
        'cursor-pointer rounded-lg px-3 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors duration-150',
        'bg-mocha text-white hover:bg-mocha-dark',
      )}
    />
  )
}
