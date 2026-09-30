'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'

import { BookTrigger } from '@/components/booking/BookButton'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

import wordmark from '@/images/prisma/brand/prisma-wordmark.png'

export const NAV_ITEMS = [
  { key: 'treatments', href: '/services' },
  { key: 'specialists', href: '/specialists' },
  { key: 'prices', href: '/pricing' },
  { key: 'memberships', href: '/memberships' },
  { key: 'doctorOnline', href: '/doctor-online' },
  { key: 'dentalTourism', href: '/dental-tourism' },
  { key: 'prismaCare', href: '/prisma-care' },
  { key: 'clinics', href: '/clinics' },
  { key: 'emergency', href: '/services/emergency' },
] as const

function LanguageLinks({ className }: { className: string }) {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <span className={className}>
      {routing.locales.map((code, index) => (
        <span key={code}>
          {index > 0 ? <i /> : null}
          <Link
            href={pathname}
            locale={code}
            aria-current={code === locale ? 'true' : undefined}
            className={clsx(
              'transition-opacity duration-150 hover:opacity-100',
              code === locale ? 'font-semibold' : 'opacity-60',
            )}
          >
            {code.toUpperCase()}
          </Link>
        </span>
      ))}
    </span>
  )
}

export function SiteHeader() {
  const t = useTranslations('site')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="utility-bar">
        <span>
          Marbella <i /> Puerto Banús
        </span>
        <LanguageLinks className="languages" />
      </div>
      <div className="main-nav">
        <Link href="/" className="brand" aria-label={t('nav.home')}>
          <Image
            src={wordmark}
            alt="Prisma — Dental, Aesthetics, General Medicine"
            priority
            sizes="220px"
          />
        </Link>
        <nav className={open ? 'nav open' : 'nav'} aria-label={t('nav.label')}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={close}
              className={item.key === 'emergency' ? 'emergency-nav' : undefined}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <BookTrigger className="nav-book mobile-only" onClick={close}>
            {t('nav.bookNow')}
          </BookTrigger>
          <LanguageLinks className="nav-languages" />
        </nav>
        <div className="header-actions">
          <BookTrigger className="nav-book desktop-only">
            {t('bookConsultation')}
          </BookTrigger>
          <button
            type="button"
            className="menu-button"
            aria-label={open ? t('nav.close') : t('nav.menu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
