import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { useTranslations } from 'next-intl'

type ContactSectionTranslations = {
  title: string
  description: string
  conditions: {
    toothache: string
    broken: string
    lost: string
    trauma: string
  }
  learnMore: string
  emergencyHotline: string
  location: {
    title: string
  }
}

export function ContactSection() {
  const t = useTranslations('contact')

  const translations: ContactSectionTranslations = {
    title: t('title'),
    description: t('description'),
    conditions: {
      toothache: t('conditions.toothache'),
      broken: t('conditions.broken'),
      lost: t('conditions.lost'),
      trauma: t('conditions.trauma'),
    },
    learnMore: t('learnMore'),
    emergencyHotline: t('emergencyHotline'),
    location: {
      title: t('location.title'),
    },
  }

  return (
    <Container className="mt-24 sm:mt-32 mb-24 sm:mb-32">
      <FadeIn className="-mx-4 rounded-2xl border border-mocha/10 bg-surface-300 px-6 py-20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:mx-0 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 
            className="text-3xl font-semibold [text-wrap:balance] text-warm-dark sm:text-4xl"
            style={{ letterSpacing: '-0.5px', lineHeight: 1.2 }}
          >
            {translations.title}
          </h2>
          <div className="mt-6 flex w-full flex-col justify-between gap-8 sm:flex-row sm:gap-4">
            <div className="w-full sm:w-1/2">
              <p className="text-base leading-relaxed text-taupe">
                {translations.description}
              </p>
            </div>
            <ul className="hidden list-disc space-y-2 pl-5 text-base text-taupe sm:block">
              <li>{translations.conditions.toothache}</li>
              <li>{translations.conditions.broken}</li>
              <li>{translations.conditions.lost}</li>
              <li>{translations.conditions.trauma}</li>
            </ul>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              aria-label={translations.learnMore}
              href="/services/emergency"
            >
              {translations.learnMore}
            </Button>
            <Button
              target="_blank"
              href="https://wa.me/+34673290786"
              className="!border !border-red-500 !bg-white !text-red-500 hover:!bg-red-500 hover:!text-white transition-colors"
            >
              {translations.emergencyHotline}
            </Button>
          </div>
          <div className="mt-16 border-t border-mocha/10 pt-10">
            <h3 className="text-base font-semibold text-warm-dark">
              {translations.location.title}
            </h3>
            <Offices className="mt-6 w-full" />
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
