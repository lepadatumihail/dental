'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { BookLink } from '@/components/BookLink'
import { Link } from '@/i18n/navigation'
import { whatsappLink } from '@/lib/clinic'
import { Arrow } from '@/lib/rich'

/** Dental-tourism request builder that hands the summary over to WhatsApp. */
export function TripPlanner() {
  const t = useTranslations('dentalTourism.planner')
  const legal = useTranslations('legal')
  const treatments = t.raw('treatments') as Array<string>
  const stays = t.raw('stays') as Array<string>
  const supports = t.raw('supports') as Array<string>

  const [treatment, setTreatment] = useState(treatments[0])
  const [month, setMonth] = useState('')
  const [stay, setStay] = useState(stays[1])
  const [support, setSupport] = useState(supports[0])

  const message = t('message', {
    treatment,
    month: month || t('notDecided'),
    stay,
    support,
  })

  return (
    <form className="planner-form" onSubmit={(e) => e.preventDefault()}>
      <label>
        {t('treatmentLabel')}
        <select
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        >
          {treatments.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label>
        {t('monthLabel')}
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </label>
      <label>
        {t('stayLabel')}
        <select value={stay} onChange={(e) => setStay(e.target.value)}>
          {stays.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label>
        {t('supportLabel')}
        <select value={support} onChange={(e) => setSupport(e.target.value)}>
          {supports.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <div className="planner-summary">
        <p className="eyebrow">{t('summaryEyebrow')}</p>
        <strong>{treatment}</strong>
        <span>
          {month || t('flexible')} · {stay}
        </span>
        <span>{support}</span>
      </div>
      <a
        className="button light wide"
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('send')} <Arrow />
      </a>
      <Link href="/privacy-policy" className="planner-call">
        {legal('privacyLink')}
      </Link>
      <BookLink service="dental" className="planner-call">
        {t('orBook')}
      </BookLink>
    </form>
  )
}
