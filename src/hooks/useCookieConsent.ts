'use client'

import { useState, useEffect } from 'react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent'
const COOKIE_PREFERENCES_KEY = 'cookie-preferences'

export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return

    const checkConsent = () => {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
      const prefs = localStorage.getItem(COOKIE_PREFERENCES_KEY)

      setHasConsent(!!consent)

      if (prefs) {
        setPreferences(JSON.parse(prefs))
      }

      setIsLoading(false)
    }

    checkConsent()

    // Listen for changes to local storage (e.g., from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_KEY || e.key === COOKIE_PREFERENCES_KEY) {
        checkConsent()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const isCookieAllowed = (type: keyof CookiePreferences): boolean => {
    if (!preferences) return false
    return preferences[type]
  }

  const updatePreferences = (newPreferences: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences))

    setHasConsent(true)
    setPreferences(newPreferences)

    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: newPreferences.analytics ? 'granted' : 'denied',
        ad_storage: newPreferences.marketing ? 'granted' : 'denied',
        ad_user_data: newPreferences.marketing ? 'granted' : 'denied',
        ad_personalization: newPreferences.marketing ? 'granted' : 'denied',
      })
    }
  }

  const revokeConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY)
    localStorage.removeItem(COOKIE_PREFERENCES_KEY)

    setHasConsent(false)
    setPreferences(null)

    // Revoke all consent except necessary
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
    }
  }

  return {
    hasConsent,
    preferences,
    isLoading,
    isCookieAllowed,
    updatePreferences,
    revokeConsent,
  }
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
