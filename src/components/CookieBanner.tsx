'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent'
const COOKIE_PREFERENCES_KEY = 'cookie-preferences'

function Toggle({
  checked,
  disabled,
  label,
  onChange,
}: {
  checked: boolean
  disabled?: boolean
  label: string
  onChange?: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={clsx('cookie-switch', checked && 'is-on')}
    >
      <span />
    </button>
  )
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showCustomization, setShowCustomization] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
  })

  const t = useTranslations('cookieBanner')

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      setIsVisible(true)
    } else {
      // Load existing preferences
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences))
      }
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs))

    // Update Google Analytics consent based on preferences
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
        ad_user_data: prefs.marketing ? 'granted' : 'denied',
        ad_personalization: prefs.marketing ? 'granted' : 'denied',
      })
    }

    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    savePreferences(allAccepted)
  }

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    savePreferences(necessaryOnly)
  }

  const handleDeclineAll = () => {
    const declined = {
      necessary: true, // Necessary cookies cannot be declined
      analytics: false,
      marketing: false,
    }
    savePreferences(declined)
  }

  const handleSaveCustom = () => {
    savePreferences(preferences)
  }

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return // Cannot change necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  if (!isVisible) return null

  const categories = [
    { key: 'necessary', locked: true },
    { key: 'analytics', locked: false },
    { key: 'marketing', locked: false },
  ] as const

  return (
    <section className="cookie-card" aria-label={t('title')}>
      {!showCustomization ? (
        <>
          <p className="eyebrow">{t('title')}</p>
          <p className="cookie-copy">
            {t('description')}{' '}
            <button type="button" onClick={() => setShowCustomization(true)}>
              {t('learnMore')}
            </button>
          </p>
          <div className="cookie-actions">
            <button
              type="button"
              className="button dark"
              onClick={handleAcceptAll}
            >
              {t('acceptAll')}
            </button>
            <button
              type="button"
              className="button outline"
              onClick={handleAcceptNecessary}
            >
              {t('acceptNecessary')}
            </button>
          </div>
          <button
            type="button"
            className="text-link"
            onClick={() => setShowCustomization(true)}
          >
            {t('customize')}
          </button>
        </>
      ) : (
        <>
          <div className="cookie-head">
            <p className="eyebrow">{t('customize')}</p>
            <button
              type="button"
              className="cookie-close"
              onClick={() => setShowCustomization(false)}
              aria-label="Close customization panel"
            >
              ×
            </button>
          </div>
          <ul className="cookie-list">
            {categories.map(({ key, locked }) => (
              <li key={key}>
                <div>
                  <strong>{t(`${key}Title`)}</strong>
                  <p>{t(`${key}Description`)}</p>
                </div>
                <Toggle
                  checked={preferences[key]}
                  disabled={locked}
                  label={t(`${key}Title`)}
                  onChange={() => handlePreferenceChange(key)}
                />
              </li>
            ))}
          </ul>
          <div className="cookie-actions">
            <button
              type="button"
              className="button dark"
              onClick={handleSaveCustom}
            >
              {t('save')}
            </button>
            <button
              type="button"
              className="button outline"
              onClick={handleDeclineAll}
            >
              {t('decline')}
            </button>
          </div>
        </>
      )}
    </section>
  )
}

// Utility function to check cookie consent status
export function getCookieConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null

  const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (!consent) return null

  const preferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)
  if (!preferences) return null

  return JSON.parse(preferences)
}

// Utility function to check if a specific cookie type is allowed
export function isCookieAllowed(type: keyof CookiePreferences): boolean {
  const consent = getCookieConsent()
  if (!consent) return false

  return consent[type]
}

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      parameters: Record<string, string>,
    ) => void
  }
}
