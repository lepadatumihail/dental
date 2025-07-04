'use client'

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'
import { Offices } from '@/components/Offices'
import { SocialMedia } from '@/components/SocialMedia'
import { WhatsappLogo } from '@phosphor-icons/react'
import Image from 'next/image'
import LanguageSelector from '@/components/LanguageSelector'

import LogoSmall from '../../public/logo-small.png'
import LogoLight from '../../public/logo-light.png'
import LogoDark from '../../public/logo-dark.png'

type LayoutTranslations = {
  header: {
    home: string
    emergency: string
    contact: string
    toggleNavigation: string
  }
  navigation: {
    services: string
    blog: string
    emergency: {
      title: string
      badge: string
    }
    contact: string
  }
  footer: {
    followUs: string
  }
}

const RootLayoutContext = createContext<{
  logoHovered: boolean
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

function Header({
  panelId,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
  invert = false,
}: {
  panelId: string
  icon: React.ComponentType<{ className?: string }>
  expanded: boolean
  onToggle: () => void
  toggleRef: React.RefObject<HTMLButtonElement>
  invert?: boolean
}) {
  const { logoHovered, setLogoHovered } = useContext(RootLayoutContext) ?? {
    logoHovered: false,
    setLogoHovered: () => {},
  }
  const t = useTranslations('layout')

  const translations: LayoutTranslations = {
    header: {
      home: t('header.home'),
      emergency: t('header.emergency'),
      contact: t('header.contact'),
      toggleNavigation: t('header.toggleNavigation'),
    },
    navigation: {
      services: t('navigation.services'),
      blog: t('navigation.blog'),
      emergency: {
        title: t('navigation.emergency.title'),
        badge: t('navigation.emergency.badge'),
      },
      contact: t('navigation.contact'),
    },
    footer: {
      followUs: t('footer.followUs'),
    },
  }

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label={translations.header.home}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <div className="hidden sm:block">
            <Image
              src={invert ? LogoLight : LogoDark}
              alt="Prisma Clinic Marbella"
              width={180}
              height={100}
            />
          </div>
          <div className="sm:hidden">
            <Image
              src={LogoDark}
              alt="Prisma Clinic Marbella"
              width={80}
              height={80}
            />
          </div>
        </Link>
        <div className="flex items-center gap-x-4">
          <LanguageSelector />
          <Button
            href="/services/emergency"
            className="border border-red-400 text-red-500"
            invert
            aria-label="Access emergency dental services"
          >
            {translations.header.emergency}
          </Button>
          <div className="hidden sm:block">
            <Button href="/contact" invert={invert}>
              {translations.header.contact}
            </Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded ? 'true' : 'false'}
            aria-controls={panelId}
            className={clsx(
              'group -m-2.5 rounded-full p-2.5 transition',
              invert ? 'hover:bg-white/10' : 'hover:bg-neutral-950/10',
            )}
            aria-label={translations.header.toggleNavigation}
          >
            <Icon
              className={clsx(
                'h-6 w-6',
                invert
                  ? 'fill-white group-hover:fill-neutral-200'
                  : 'fill-neutral-950 group-hover:fill-neutral-700',
              )}
            />
          </button>
        </div>
      </div>
    </Container>
  )
}

function NavigationRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="even:mt-px sm:bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  )
}

function NavigationItem({
  href,
  children,
  ariaLabel,
}: {
  href: string
  children: React.ReactNode
  ariaLabel?: string
}) {
  return (
    <Link
      href={href}
      className="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
      aria-label={ariaLabel}
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  )
}

function Navigation() {
  const t = useTranslations('layout')

  const translations: LayoutTranslations = {
    header: {
      home: t('header.home'),
      emergency: t('header.emergency'),
      contact: t('header.contact'),
      toggleNavigation: t('header.toggleNavigation'),
    },
    navigation: {
      services: t('navigation.services'),
      blog: t('navigation.blog'),
      emergency: {
        title: t('navigation.emergency.title'),
        badge: t('navigation.emergency.badge'),
      },
      contact: t('navigation.contact'),
    },
    footer: {
      followUs: t('footer.followUs'),
    },
  }

  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-white">
      <NavigationRow>
        <NavigationItem href="/services">
          {translations.navigation.services}
        </NavigationItem>
        <NavigationItem href="/blog">
          {translations.navigation.blog}
        </NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem
          href="/services/emergency"
          ariaLabel="Access 24/7 emergency dental services"
        >
          <span className="flex items-center">
            <span>{translations.navigation.emergency.title}</span>
            <span className="ml-4 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wider uppercase">
              {translations.navigation.emergency.badge}
            </span>
          </span>
        </NavigationItem>
        <NavigationItem href="/contact">
          {translations.navigation.contact}
        </NavigationItem>
      </NavigationRow>
    </nav>
  )
}

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  const panelId = useId()
  const [expanded, setExpanded] = useState(false)
  const openRef = useRef<React.ElementRef<'button'>>(null)
  const closeRef = useRef<React.ElementRef<'button'>>(null)
  const navRef = useRef<React.ElementRef<'div'>>(null)
  const shouldReduceMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)
  const t = useTranslations('layout')

  const translations: LayoutTranslations = {
    header: {
      home: t('header.home'),
      emergency: t('header.emergency'),
      contact: t('header.contact'),
      toggleNavigation: t('header.toggleNavigation'),
    },
    navigation: {
      services: t('navigation.services'),
      blog: t('navigation.blog'),
      emergency: {
        title: t('navigation.emergency.title'),
        badge: t('navigation.emergency.badge'),
      },
      contact: t('navigation.contact'),
    },
    footer: {
      followUs: t('footer.followUs'),
    },
  }

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('a')?.href === window.location.href
      ) {
        setExpanded(false)
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <header>
        <div
          className="absolute top-2 right-0 left-0 z-40 pt-14"
          aria-hidden={expanded ? 'true' : false}
          // @ts-ignore (https://github.com/facebook/react/issues/17157)
          inert={expanded ? '' : undefined}
        >
          <Header
            panelId={panelId}
            icon={MenuIcon}
            toggleRef={openRef}
            expanded={expanded}
            onToggle={() => {
              setExpanded((expanded) => !expanded)
              window.setTimeout(() =>
                closeRef.current?.focus({ preventScroll: true }),
              )
            }}
          />
        </div>

        <motion.div
          layout
          id={panelId}
          style={{ height: expanded ? 'auto' : '0.5rem' }}
          className="relative z-50 overflow-hidden bg-neutral-950 pt-2"
          aria-hidden={expanded ? undefined : 'true'}
          // @ts-ignore (https://github.com/facebook/react/issues/17157)
          inert={expanded ? undefined : ''}
        >
          <motion.div layout className="bg-neutral-800">
            <div ref={navRef} className="bg-neutral-950 pt-14 pb-16">
              <Header
                invert
                panelId={panelId}
                icon={XIcon}
                toggleRef={closeRef}
                expanded={expanded}
                onToggle={() => {
                  setExpanded((expanded) => !expanded)
                  window.setTimeout(() =>
                    openRef.current?.focus({ preventScroll: true }),
                  )
                }}
              />
            </div>
            <Navigation />
            <div className="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800">
              <Container>
                <div className="grid grid-cols-1 gap-y-10 pt-10 pb-16 sm:grid-cols-2 sm:pt-16">
                  <div>
                    <Offices
                      invert
                      className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
                    />
                  </div>
                  <div className="sm:border-l sm:border-transparent sm:pl-16">
                    <h2 className="font-display text-base font-semibold text-white">
                      {translations.footer.followUs}
                    </h2>
                    <SocialMedia className="mt-6" invert />
                  </div>
                </div>
              </Container>
            </div>
          </motion.div>
        </motion.div>
      </header>

      <motion.div
        layout
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-white pt-14"
      >
        <motion.div
          layout
          className="relative isolate flex w-full flex-col pt-9"
        >
          <GridPattern
            className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-gray-100"
            yOffset={-96}
            interactive
          />

          <main className="w-full flex-auto">{children}</main>
          <a
            href="https://wa.me/+34673290786"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed right-10 bottom-10 rounded-full bg-green-400 p-3"
            aria-label="Contact us on WhatsApp"
          >
            <WhatsappLogo size={26} className="text-white" />
          </a>

          <Footer />
        </motion.div>
      </motion.div>
    </MotionConfig>
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
