'use client'

import { useEffect, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { Container } from '@/components/Container'

import aestheticsImage from '@/images/clinic/aesthetics-1.jpg'
import dentalImage from '@/images/clinic/dentists.jpg'
import medicalImage from '@/images/clinic/clinic1.jpg'

type SlideKey = 'aesthetic' | 'dental' | 'medical'

type Slide = {
  key: SlideKey
  image: StaticImageData
  href: string
  external?: boolean
}

const slides: Slide[] = [
  { key: 'aesthetic', image: aestheticsImage, href: '/services/aesthetics' },
  { key: 'dental', image: dentalImage, href: '/services/dental' },
  {
    key: 'medical',
    image: medicalImage,
    href: 'https://wa.me/+34673290786',
    external: true,
  },
]

const ROTATION_MS = 8000
const PAUSE_AFTER_INTERACTION_MS = 12000

export function HeroSlideshow() {
  const t = useTranslations('home.hero.slides')
  const shouldReduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [pausedUntil, setPausedUntil] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return
    const id = window.setInterval(() => {
      if (Date.now() < pausedUntil) return
      setActive((i) => (i + 1) % slides.length)
    }, ROTATION_MS)
    return () => window.clearInterval(id)
  }, [shouldReduceMotion, pausedUntil])

  const goTo = (index: number) => {
    setActive(index)
    setPausedUntil(Date.now() + PAUSE_AFTER_INTERACTION_MS)
  }

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: shouldReduceMotion ? 1 : 1 }}
              animate={{ scale: shouldReduceMotion ? 1 : 1.06 }}
              transition={{ duration: ROTATION_MS / 1000, ease: 'linear' }}
            >
              <Image
                src={slides[active].image}
                alt=""
                fill
                priority={active === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-warm-dark/55 via-warm-dark/35 to-warm-dark/70"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <Container className="relative z-10 flex h-full items-center">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[active].key}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -16 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-3xl text-white"
            >
              <h1
                className="text-4xl font-semibold sm:text-6xl lg:text-7xl"
                style={{ letterSpacing: '-1px', lineHeight: 1.08 }}
              >
                {t(`${slides[active].key}.h1`)}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-xl">
                {t(`${slides[active].key}.h2`)}
              </p>
              <div className="mt-10">
                {slides[active].external ? (
                  <a
                    href={slides[active].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 text-sm font-medium text-warm-dark transition-colors duration-150 hover:bg-surface-200"
                  >
                    {t(`${slides[active].key}.cta`)}
                  </a>
                ) : (
                  <Link
                    href={slides[active].href}
                    className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 text-sm font-medium text-warm-dark transition-colors duration-150 hover:bg-surface-200"
                  >
                    {t(`${slides[active].key}.cta`)}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {slides.map((slide, index) => {
          const isActive = index === active
          return (
            <button
              key={slide.key}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={isActive}
              onClick={() => goTo(index)}
              className="group relative h-2 rounded-full transition-all duration-300"
              style={{ width: isActive ? 36 : 10 }}
            >
              <span
                className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-white' : 'bg-white/45 group-hover:bg-white/70'
                }`}
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}
