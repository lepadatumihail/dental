'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { CLINIC_PHONE_E164, whatsappLink } from '@/lib/clinic'
import { Arrow } from '@/lib/rich'

const TOPICS = [
  'dental',
  'dentalTourism',
  'emergency',
  'aesthetic',
  'medical',
  'surgery',
  'massage',
  'doctorOnline',
  'memberships',
  'prismaCare',
  'other',
] as const

/** Floating contact box: pick a topic, then continue on WhatsApp or call. */
export function WhatsAppWidget() {
  const t = useTranslations('site.whatsapp')
  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>(TOPICS[0])
  const [note, setNote] = useState('')

  const topicLabel = t(`topics.${topic}`)
  const message = [t('template', { topic: topicLabel }), note.trim()]
    .filter(Boolean)
    .join(' ')

  return (
    <aside
      className={open ? 'whatsapp-widget open' : 'whatsapp-widget'}
      aria-label={t('label')}
    >
      {open ? (
        <div className="whatsapp-panel">
          <button
            type="button"
            className="whatsapp-close"
            onClick={() => setOpen(false)}
            aria-label={t('closeLabel')}
          >
            ×
          </button>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h3>{t('title')}</h3>
          <label>
            {t('topicLabel')}
            <select
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value as (typeof TOPICS)[number])
              }
            >
              {TOPICS.map((key) => (
                <option key={key} value={key}>
                  {t(`topics.${key}`)}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t('messageLabel')}
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('messagePlaceholder')}
            />
          </label>
          <a
            className="whatsapp-action primary"
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('write')} <Arrow />
          </a>
          <a className="whatsapp-action" href={`tel:${CLINIC_PHONE_E164}`}>
            {t('call', { topic: topicLabel })} <Arrow />
          </a>
          <small>{t('emergencyNote')}</small>
        </div>
      ) : null}
      <button
        type="button"
        className="whatsapp-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span aria-hidden="true">◉</span>
        <b>{open ? t('close') : t('trigger')}</b>
      </button>
    </aside>
  )
}
