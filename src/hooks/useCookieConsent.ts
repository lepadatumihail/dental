'use client'

import { useState, useEffect } from 'react'

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export const NECESSARY_COOKIES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
}

export function getCookieConsent(): CookiePreferences | null {
  try {
    if (!localStorage.getItem('cookie-consent')) return null
    const saved = JSON.parse(
      localStorage.getItem('cookie-preferences') || 'null',
    )
    if (!saved) return null
    return {
      necessary: true,
      analytics: saved.analytics === true,
      marketing: saved.marketing === true,
    }
  } catch {
    return null
  }
}

export function saveCookiePreferences(preferences: CookiePreferences) {
  try {
    localStorage.setItem('cookie-consent', 'true')
    localStorage.setItem(
      'cookie-preferences',
      JSON.stringify({ ...preferences, necessary: true }),
    )
  } catch {
    // Storage is unavailable: optional scripts remain disabled on the next load.
  }
  // Unload any previously enabled third-party scripts when consent changes.
  window.location.reload()
}

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setPreferences(getCookieConsent())
    setIsLoading(false)
    const handleStorage = (event: StorageEvent) => {
      if (
        !event.key ||
        event.key === 'cookie-consent' ||
        event.key === 'cookie-preferences'
      ) {
        window.location.reload()
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return { preferences, isLoading, updatePreferences: saveCookiePreferences }
}
