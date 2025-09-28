'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/Button'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import clsx from 'clsx'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieSettingsProps {
  className?: string
}

export function CookieSettings({ className }: CookieSettingsProps) {
  const { preferences, updatePreferences, revokeConsent } = useCookieConsent()
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(
    preferences || {
      necessary: true,
      analytics: false,
      marketing: false,
    },
  )
  const [isOpen, setIsOpen] = useState(false)

  const t = useTranslations('cookieBanner')

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return // Cannot change necessary cookies

    setLocalPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const handleSave = () => {
    updatePreferences(localPreferences)
    setIsOpen(false)
  }

  const handleRevoke = () => {
    revokeConsent()
    setLocalPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    })
    setIsOpen(false)
  }

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-neutral-600 underline hover:text-neutral-950"
      >
        {t('cookiePolicy')}
      </button>

      {isOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-neutral-950">
                  {t('cookiePolicy')}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-600 hover:text-neutral-950"
                  aria-label="Close cookie settings"
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

              <div className="space-y-6">
                <p className="text-sm text-neutral-600">{t('description')}</p>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold text-neutral-950">
                        {t('necessaryTitle')}
                      </h3>
                      <div className="relative">
                        <div className="relative h-6 w-11 rounded-full bg-neutral-300">
                          <div className="absolute top-1 left-1 h-4 w-4 translate-x-5 transform rounded-full bg-white"></div>
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
                      <h3 className="font-semibold text-neutral-950">
                        {t('analyticsTitle')}
                      </h3>
                      <button
                        onClick={() => handlePreferenceChange('analytics')}
                        className="relative"
                      >
                        <div
                          className={clsx(
                            'relative h-6 w-11 rounded-full transition-colors',
                            localPreferences.analytics
                              ? 'bg-neutral-950'
                              : 'bg-neutral-300',
                          )}
                        >
                          <div
                            className={clsx(
                              'absolute top-1 h-4 w-4 rounded-full bg-white transition-transform',
                              localPreferences.analytics ? 'left-6' : 'left-1',
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
                      <h3 className="font-semibold text-neutral-950">
                        {t('marketingTitle')}
                      </h3>
                      <button
                        onClick={() => handlePreferenceChange('marketing')}
                        className="relative"
                      >
                        <div
                          className={clsx(
                            'relative h-6 w-11 rounded-full transition-colors',
                            localPreferences.marketing
                              ? 'bg-neutral-950'
                              : 'bg-neutral-300',
                          )}
                        >
                          <div
                            className={clsx(
                              'absolute top-1 h-4 w-4 rounded-full bg-white transition-transform',
                              localPreferences.marketing ? 'left-6' : 'left-1',
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

                <div className="flex flex-col justify-end gap-3 border-t border-neutral-200 pt-4 sm:flex-row">
                  <Button
                    onClick={handleRevoke}
                    className="border border-red-300 bg-white text-red-600 hover:bg-red-50"
                  >
                    Revoke All Consent
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="border border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-neutral-950 text-white hover:bg-neutral-800"
                  >
                    {t('save')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
