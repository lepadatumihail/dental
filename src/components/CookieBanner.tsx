'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import clsx from 'clsx'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent'
const COOKIE_PREFERENCES_KEY = 'cookie-preferences'

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white shadow-2xl"
      >
        <Container>
          <div className="py-6">
            {!showCustomization ? (
              // Main banner
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <h3 className="mb-2 font-display text-lg font-semibold text-neutral-950">
                    {t('title')}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {t('description')}{' '}
                    <button
                      onClick={() => setShowCustomization(true)}
                      className="text-neutral-950 underline hover:no-underline"
                    >
                      {t('learnMore')}
                    </button>
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
                  <Button onClick={handleAcceptNecessary}>
                    {t('acceptNecessary')}
                  </Button>
                  <Button onClick={() => setShowCustomization(true)}>
                    {t('customize')}
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-neutral-950 text-white hover:bg-neutral-800"
                  >
                    {t('acceptAll')}
                  </Button>
                </div>
              </div>
            ) : (
              // Customization panel
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-neutral-950">
                    {t('customize')}
                  </h3>
                  <button
                    onClick={() => setShowCustomization(false)}
                    className="text-neutral-600 hover:text-neutral-950"
                    aria-label="Close customization panel"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
                  {/* Necessary Cookies */}
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-semibold text-neutral-950">
                        {t('necessaryTitle')}
                      </h4>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={preferences.necessary}
                          disabled
                          className="sr-only"
                        />
                        <div className="relative h-6 w-11 rounded-full bg-neutral-300">
                          <div className="absolute top-1 left-1 h-4 w-4 translate-x-5 transform rounded-full bg-white transition-transform"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600">
                      {t('necessaryDescription')}
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-semibold text-neutral-950">
                        {t('analyticsTitle')}
                      </h4>
                      <button
                        onClick={() => handlePreferenceChange('analytics')}
                        className="relative"
                      >
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          readOnly
                          className="sr-only"
                        />
                        <div
                          className={clsx(
                            'relative h-6 w-11 rounded-full transition-colors',
                            preferences.analytics
                              ? 'bg-neutral-950'
                              : 'bg-neutral-300',
                          )}
                        >
                          <div
                            className={clsx(
                              'absolute top-1 h-4 w-4 rounded-full bg-white transition-transform',
                              preferences.analytics ? 'left-6' : 'left-1',
                            )}
                          ></div>
                        </div>
                      </button>
                    </div>
                    <p className="text-sm text-neutral-600">
                      {t('analyticsDescription')}
                    </p>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-semibold text-neutral-950">
                        {t('marketingTitle')}
                      </h4>
                      <button
                        onClick={() => handlePreferenceChange('marketing')}
                        className="relative"
                      >
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          readOnly
                          className="sr-only"
                        />
                        <div
                          className={clsx(
                            'relative h-6 w-11 rounded-full transition-colors',
                            preferences.marketing
                              ? 'bg-neutral-950'
                              : 'bg-neutral-300',
                          )}
                        >
                          <div
                            className={clsx(
                              'absolute top-1 h-4 w-4 rounded-full bg-white transition-transform',
                              preferences.marketing ? 'left-6' : 'left-1',
                            )}
                          ></div>
                        </div>
                      </button>
                    </div>
                    <p className="text-sm text-neutral-600">
                      {t('marketingDescription')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-end gap-3 sm:flex-row">
                  <Button
                    onClick={handleDeclineAll}
                    className="border border-red-300 bg-red-500 text-red-600"
                  >
                    {t('decline')}
                  </Button>
                  <Button
                    onClick={handleSaveCustom}
                    className="bg-neutral-950 text-white hover:bg-neutral-800"
                  >
                    {t('save')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </motion.div>
    </AnimatePresence>
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
