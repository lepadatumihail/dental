'use client'

import { createContext, useContext, useEffect, useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CaretDown, WhatsappLogo } from '@phosphor-icons/react'

import { useBookingModal } from '@/components/booking/BookingProvider'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import LanguageSelector from '@/components/LanguageSelector'

import LogoDark from '../../public/logo-dark.png'

type NavItemKey =
  | 'treatments'
  | 'theClinic'
  | 'ourPrices'
  | 'emergencies'
  | 'contact'

type SubItemKey = 'dental' | 'aesthetic' | 'medical'

const NAV_ITEMS: ReadonlyArray<{
  key: NavItemKey
  href: string
  children?: ReadonlyArray<{ key: SubItemKey; href: string }>
}> = [
  {
    key: 'treatments',
    href: '/services',
    children: [
      { key: 'dental', href: '/services/dental' },
      { key: 'aesthetic', href: '/services/aesthetics' },
      { key: 'medical', href: '/services/general-medicine' },
    ],
  },
  { key: 'theClinic', href: '/about' },
  { key: 'ourPrices', href: '/pricing' },
  { key: 'emergencies', href: '/services/emergency' },
  { key: 'contact', href: '/contact' },
]

const RootLayoutContext = createContext<{
  logoHovered: boolean
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

function HamburgerIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 6.5h18v1.5H3zM3 16h18v1.5H3z" />
    </svg>
  )
}

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function PrismaLogo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dims = size === 'sm' ? { w: 110, h: 60 } : { w: 160, h: 80 }
  // Shrink the header logo on mobile so the navbar isn't so thick;
  // restore intrinsic size on sm+ and for the watermark (md).
  const className =
    size === 'sm' ? 'h-8 w-auto sm:h-auto' : 'h-auto w-auto'
  return (
    <Image
      src={LogoDark}
      alt="Prisma Clinic Marbella"
      width={dims.w}
      height={dims.h}
      priority
      className={className}
    />
  )
}

function DesktopNav() {
  const t = useTranslations('layout.navigation.items')

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-x-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.key} className="group relative">
            <Link
              href={item.href}
              className="inline-flex items-center gap-1 px-4 py-2 text-[13px] font-semibold tracking-[0.12em] text-warm-dark uppercase transition-colors duration-150 hover:text-mocha"
            >
              {item.key === 'treatments' ? t('treatments.label') : t(item.key)}
              {item.children ? (
                <CaretDown
                  weight="bold"
                  className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
                />
              ) : null}
            </Link>

            {item.children ? (
              <div
                className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
                role="menu"
              >
                <div className="min-w-[200px] rounded-xl border border-mocha/10 bg-surface-100 p-2 shadow-[0_12px_32px_rgba(50,53,26,0.12)]">
                  {item.children.map((child) => (
                    <Link
                      key={child.key}
                      href={child.href}
                      className="block rounded-lg px-4 py-2.5 text-[13px] font-semibold tracking-[0.12em] text-warm-dark uppercase transition-colors duration-150 hover:bg-surface-300 hover:text-mocha"
                      role="menuitem"
                    >
                      {t(`treatments.${child.key}`)}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  )
}

function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('layout.navigation')
  const tItems = useTranslations('layout.navigation.items')
  const tBooking = useTranslations('booking')
  const { open: openBooking } = useBookingModal()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="drawer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
          className="fixed inset-0 z-[60] overflow-y-auto bg-surface-200"
          role="dialog"
          aria-modal="true"
          aria-label={t('menu')}
        >
          {/* Watermark logo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            <div className="relative h-[120%] w-[120%] opacity-[0.06]">
              <Image
                src={LogoDark}
                alt=""
                fill
                priority={false}
                className="object-contain"
              />
            </div>
          </div>

          <Container className="relative">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                delay: 0.05,
              }}
              className="flex flex-col"
            >
              <div className="flex items-center justify-between pt-6 sm:pt-10">
                <LanguageSelector align="left" />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('close')}
                  className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-warm-dark transition-colors duration-150 hover:bg-warm-dark/5"
                >
                  <CloseIcon className="h-5 w-5 fill-current" />
                </button>
              </div>

              <p className="mt-12 text-[11px] font-semibold tracking-[0.3em] text-taupe uppercase sm:mt-16">
                {t('menu')}
              </p>

              <nav className="mt-6 pb-16">
                <ul className="flex flex-col gap-y-2">
                  {NAV_ITEMS.map((item) => {
                    const isBookNow = item.key === 'contact'
                    const label = isBookNow
                      ? tBooking('bookNow')
                      : item.key === 'treatments'
                        ? tItems('treatments.label')
                        : tItems(item.key)

                    return (
                      <li key={item.key}>
                        {isBookNow ? (
                          <button
                            type="button"
                            onClick={() => {
                              onClose()
                              openBooking()
                            }}
                            className="block w-full py-2 text-left text-3xl font-semibold tracking-tight text-mocha transition-colors duration-150 hover:text-mocha-dark sm:text-4xl"
                            style={{ letterSpacing: '-0.5px' }}
                          >
                            {label}
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="block py-2 text-3xl font-semibold tracking-tight text-warm-dark transition-colors duration-150 hover:text-mocha sm:text-4xl"
                            style={{ letterSpacing: '-0.5px' }}
                          >
                            {label}
                          </Link>
                        )}
                        {item.children ? (
                          <ul className="mt-1 ml-2 flex flex-col gap-y-1 border-l border-mocha/15 pl-5">
                            {item.children.map((child) => (
                              <li key={child.key}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="block py-1.5 text-base font-medium tracking-wide text-taupe transition-colors duration-150 hover:text-mocha sm:text-xl"
                                >
                                  {tItems(`treatments.${child.key}`)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </motion.div>
          </Container>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Header({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const t = useTranslations('layout')
  const { setLogoHovered } = useContext(RootLayoutContext) ?? {
    logoHovered: false,
    setLogoHovered: () => {},
  }

  return (
    <Container className="py-3 sm:py-4">
      <div className="flex items-center justify-between gap-x-6">
        <Link
          href="/"
          aria-label={t('header.home')}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="flex shrink-0 items-center"
        >
          <div className="hidden sm:block">
            <PrismaLogo size="sm" />
          </div>
          <div className="sm:hidden">
            <PrismaLogo size="sm" />
          </div>
        </Link>

        <DesktopNav />

        <div className="flex shrink-0 items-center gap-x-2">
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-label={
              open ? t('navigation.close') : t('header.toggleNavigation')
            }
            className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-warm-dark transition-colors duration-150 hover:bg-warm-dark/5 lg:hidden"
          >
            <HamburgerIcon className="h-6 w-6 fill-current" />
          </button>
        </div>
      </div>
    </Container>
  )
}

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-mocha/8 bg-surface-200/90 backdrop-blur-md">
        <Header open={open} onToggle={() => setOpen((v) => !v)} />
      </header>

      <MenuDrawer open={open} onClose={() => setOpen(false)} />

      <motion.div
        layout
        transition={shouldReduceMotion ? { duration: 0 } : undefined}
        className="relative flex flex-auto flex-col overflow-hidden bg-surface-200"
      >
        <main id={panelId} className="w-full flex-auto">
          {children}
        </main>

        <a
          href="https://wa.me/+34673290786"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-6 bottom-6 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-warm-success shadow-[0_8px_24px_rgba(90,122,94,0.35)] transition-transform duration-150 hover:scale-105 sm:right-10 sm:bottom-10 sm:h-14 sm:w-14"
          aria-label="Contact us on WhatsApp"
        >
          <WhatsappLogo size={26} className="text-white" />
        </a>

        <Footer />
      </motion.div>
    </>
  )
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [logoHovered, setLogoHovered] = useState(false)

  return (
    <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
      <RootLayoutInner key={pathname}>{children}</RootLayoutInner>
    </RootLayoutContext.Provider>
  )
}
