'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Globe, CaretDown, Check } from '@phosphor-icons/react/dist/ssr'
import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'se', name: 'Svenska' },
] as const

export default function LanguageSelector() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const handleLanguageChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
    setIsOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const currentLanguage =
    languages.find((lang) => lang.code === locale) ?? languages[0]

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-1.5 rounded-full border border-mocha/15 bg-surface-100/60 px-3 py-1.5 text-[12px] font-semibold tracking-[0.1em] text-warm-dark uppercase transition-colors duration-150 hover:border-mocha/30 hover:bg-surface-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha/40"
      >
        <Globe size={14} weight="regular" className="text-mocha" />
        <span>{currentLanguage.code.toUpperCase()}</span>
        <CaretDown
          size={10}
          weight="bold"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="lang-menu"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            className="absolute right-0 z-50 mt-2 w-44 origin-top-right overflow-hidden rounded-xl border border-mocha/10 bg-surface-100 shadow-[0_12px_32px_rgba(50,53,26,0.12)]"
            role="listbox"
          >
            <ul className="py-1">
              {languages.map((language) => {
                const isActive = language.code === locale
                return (
                  <li key={language.code}>
                    <button
                      type="button"
                      onClick={() => handleLanguageChange(language.code)}
                      role="option"
                      aria-selected={isActive}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                        isActive
                          ? 'bg-surface-300 font-semibold text-warm-dark'
                          : 'text-taupe hover:bg-surface-200 hover:text-warm-dark'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] tracking-wider text-mocha uppercase">
                          {language.code}
                        </span>
                        <span>{language.name}</span>
                      </span>
                      {isActive ? (
                        <Check
                          size={14}
                          weight="bold"
                          className="text-mocha"
                        />
                      ) : null}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
