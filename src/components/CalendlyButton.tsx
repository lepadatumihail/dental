'use client'

import { PopupButton } from 'react-calendly'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

export default function CalendlyButton() {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setRootElement(document?.body)
  }, [])

  if (!rootElement) {
    return null
  }

  return (
    <PopupButton
      url="https://calendly.com/viktorstoiclifeinc/onboarding-call"
      rootElement={rootElement}
      text="Get Free Consultation"
      className={clsx(
        'rounded-lg px-4 py-2 text-sm font-semibold transition',
        'bg-neutral-950 text-white hover:bg-neutral-800',
      )}
    />
  )
}
