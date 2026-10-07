'use client'

import { useId, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { Link } from '@/i18n/navigation'
import {
  getCookieConsent,
  NECESSARY_COOKIES,
  saveCookiePreferences,
} from '@/hooks/useCookieConsent'

export function CookieSettings({ className }: { className?: string }) {
  const t = useTranslations('cookieBanner')
  const legal = useTranslations('legal')
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [preferences, setPreferences] = useState(NECESSARY_COOKIES)

  function openSettings() {
    setPreferences(getCookieConsent() || NECESSARY_COOKIES)
    dialog.current?.showModal()
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={openSettings}
        className="underline underline-offset-4"
      >
        {t('settings')}
      </button>
      <dialog ref={dialog} aria-labelledby={titleId} className="cookie-dialog">
        <div className="cookie-head">
          <h2 id={titleId}>{t('settings')}</h2>
          <button
            type="button"
            className="cookie-close"
            onClick={() => dialog.current?.close()}
            aria-label={t('close')}
          >
            ×
          </button>
        </div>
        <ul className="cookie-list">
          {(['necessary', 'analytics', 'marketing'] as const).map((key) => (
            <li key={key}>
              <div>
                <strong>{t(`${key}Title`)}</strong>
                <p>{t(`${key}Description`)}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={preferences[key]}
                aria-label={t(`${key}Title`)}
                disabled={key === 'necessary'}
                className={clsx('cookie-switch', preferences[key] && 'is-on')}
                onClick={() =>
                  setPreferences((current) => ({
                    ...current,
                    [key]: !current[key],
                  }))
                }
              >
                <span />
              </button>
            </li>
          ))}
        </ul>
        <Link
          href="/cookie-policy"
          onClick={() => dialog.current?.close()}
          className="text-link"
        >
          {legal('cookies.title')}
        </Link>
        <div className="cookie-actions">
          <button
            type="button"
            className="button dark"
            onClick={() => saveCookiePreferences(preferences)}
          >
            {t('save')}
          </button>
          <button
            type="button"
            className="button outline"
            onClick={() => saveCookiePreferences(NECESSARY_COOKIES)}
          >
            {t('revoke')}
          </button>
        </div>
      </dialog>
    </div>
  )
}
