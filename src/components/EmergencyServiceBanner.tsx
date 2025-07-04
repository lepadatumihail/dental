import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Phone, FirstAid, Clock } from '@phosphor-icons/react/dist/ssr'
import { useTranslations } from 'next-intl'

type EmergencyServiceBannerTranslations = {
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
  availability: {
    title: string
    subtitle: string
  }
  contact: {
    title: string
    number: string
  }
  footer: {
    label: string
    title: string
  }
}

export function EmergencyServiceBanner() {
  const t = useTranslations('emergency')

  const translations: EmergencyServiceBannerTranslations = {
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
    availability: {
      title: t('availability.title'),
      subtitle: t('availability.subtitle'),
    },
    contact: {
      title: t('contact.title'),
      number: t('contact.number'),
    },
    footer: {
      label: t('footer.label'),
      title: t('footer.title'),
    },
  }

  return (
    <Container className="mt-12">
      <FadeIn>
        <div className="overflow-hidden rounded-2xl bg-neutral-900 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 text-white md:p-12">
              <div className="mb-4 flex items-center gap-3">
                <FirstAid size={32} weight="duotone" className="text-white" />
                <h2 className="font-display text-3xl font-medium tracking-tight text-white">
                  {translations.title}
                </h2>
              </div>
              <p className="mb-6 text-white/80">{translations.description}</p>
              <ul className="mb-8 list-disc space-y-1 pl-5 text-white/80">
                <li>{translations.conditions.toothache}</li>
                <li>{translations.conditions.broken}</li>
                <li>{translations.conditions.lost}</li>
                <li>{translations.conditions.trauma}</li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button aria-label={translations.learnMore} href="/services/emergency" invert>
                  {translations.learnMore}
                </Button>
                <Button
                  href="tel:+34673290786"
                  invert
                  className="border border-white bg-transparent hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="mr-2" size={20} />
                    {translations.emergencyHotline}
                  </div>
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-10 text-white md:p-12">
              <div className="flex h-full flex-col justify-between">
                <div className="mb-6 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <Clock size={24} className="text-white/80" />
                    <div>
                      <h3 className="font-semibold text-white">
                        {translations.availability.title}
                      </h3>
                      <p className="text-sm text-white/70">
                        {translations.availability.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={24} className="text-white/80" />
                    <div>
                      <h3 className="font-semibold text-white">
                        {translations.contact.title}
                      </h3>
                      <p className="text-sm text-white/70">
                        {translations.contact.number}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-sm font-medium tracking-wider text-white/60 uppercase">
                    {translations.footer.label}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {translations.footer.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
