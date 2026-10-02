'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'

import { BookLink } from '@/components/BookLink'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

import wordmark from '@/images/prisma/brand/prisma-wordmark.png'

/** Main navigation; the secondary items sit in the utility bar on desktop. */
const PRIMARY_NAV = [
  { key: 'treatments', href: '/services' },
  { key: 'specialists', href: '/specialists' },
  { key: 'prices', href: '/pricing' },
  { key: 'memberships', href: '/memberships' },
  { key: 'clinics', href: '/clinics' },
  { key: 'emergency', href: '/services/emergency' },
] as const

const SECONDARY_NAV = [
  { key: 'doctorOnline', href: '/doctor-online' },
  { key: 'dentalTourism', href: '/dental-tourism' },
  { key: 'prismaCare', href: '/prisma-care' },
] as const

/** How far the header travels when only the utility bar is tucked away. */
const UTILITY_BAR_HEIGHT = 40

type HeaderState = 'top' | 'compact' | 'hidden'

function isCurrent(pathname: string, href: string) {
  if (href === '/services') {
    return (
      pathname.startsWith('/services') &&
      !pathname.startsWith('/services/emergency')
    )
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Tucks the header away while scrolling down and brings the main bar back
 * (without the utility bar) as soon as the visitor scrolls up.
 */
function useHeaderState(): HeaderState {
  const [state, setState] = useState<HeaderState>('top')

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = Math.max(window.scrollY, 0)
      const delta = y - lastY
      if (y < UTILITY_BAR_HEIGHT) {
        setState('top')
      } else if (Math.abs(delta) > 6) {
        setState(delta > 0 && y > 160 ? 'hidden' : 'compact')
      } else {
        return
      }
      lastY = y
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    // A reload can restore the page mid-scroll: start compact there.
    if (lastY > UTILITY_BAR_HEIGHT) setState('compact')
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return state
}

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
              code === locale ? 'font-semibold' : 'opacity-55',
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
  const pathname = usePathname()
  const state = useHeaderState()
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
  const current = (href: string) =>
    isCurrent(pathname, href) ? ('page' as const) : undefined

  return (
    <header className="site-header" data-state={state}>
      <div className="utility-bar">
        <span>
          Marbella <i /> Puerto Banús
        </span>
        <div className="utility-links">
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={current(item.href)}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <LanguageLinks className="languages" />
        </div>
      </div>
      <div className="main-nav">
        <Link href="/" className="brand" aria-label={t('nav.home')}>
          <Image
            src={wordmark}
            alt="Prisma — Dental, Aesthetics, General Medicine"
            priority
            sizes="190px"
          />
        </Link>
        <nav className={open ? 'nav open' : 'nav'} aria-label={t('nav.label')}>
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={close}
              aria-current={current(item.href)}
              className={item.key === 'emergency' ? 'emergency-nav' : undefined}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={close}
              aria-current={current(item.href)}
              className="mobile-only"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <BookLink className="nav-book mobile-only" onClick={close}>
            {t('nav.bookNow')}
          </BookLink>
          <LanguageLinks className="nav-languages" />
        </nav>
        <div className="header-actions">
          <BookLink className="nav-book desktop-only">
            {t('bookConsultation')}
          </BookLink>
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
