import { useTranslations } from 'next-intl'
import {
  MapPin,
  Phone,
  WhatsappLogo,
  Clock,
} from '@phosphor-icons/react/dist/ssr'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

const PHONE_TEL = '+34673290786'
const WHATSAPP_HREF = 'https://wa.me/+34673290786'

type OfficeCardProps = {
  name: string
  address: string
  directionsHref: string
  phoneLabel: string
  phoneDisplay: string
  whatsappLabel: string
  hoursLabel: string
  hoursValue: string
  directionsLabel: string
}

function OfficeCard({
  name,
  address,
  directionsHref,
  phoneLabel,
  phoneDisplay,
  whatsappLabel,
  hoursLabel,
  hoursValue,
  directionsLabel,
}: OfficeCardProps) {
  return (
    <article className="flex w-full flex-col gap-8 rounded-2xl border border-mocha/10 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] md:flex-row md:items-stretch md:gap-12 md:p-10">
      <div className="flex flex-1 flex-col">
        <div className="mb-1 flex items-start gap-3">
          <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mocha/10 text-mocha">
            <MapPin weight="fill" className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-xl font-semibold text-warm-dark sm:text-2xl">
              {name}
            </h3>
            <address className="my-2 text-sm leading-relaxed text-taupe not-italic sm:text-base">
              {address}
            </address>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-mocha/15 bg-surface-100 px-4 py-2 text-sm text-mocha transition-colors duration-150 hover:bg-mocha hover:text-white md:mt-auto"
            >
              {directionsLabel} &rarr;
            </a>
          </div>
        </div>
      </div>

      <dl className="grid flex-1 grid-cols-1 gap-x-8 gap-y-5 border-t border-mocha/10 pt-6 text-sm sm:grid-cols-2 md:border-t-0 md:border-l md:pt-0 md:pl-12">
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-mocha" />
          <div className="min-w-0">
            <dt className="font-medium text-warm-dark">{phoneLabel}</dt>
            <dd className="mt-0.5">
              <a
                href={`tel:${PHONE_TEL}`}
                className="text-taupe transition-colors hover:text-mocha"
              >
                {phoneDisplay}
              </a>
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <WhatsappLogo className="mt-0.5 h-4 w-4 shrink-0 text-warm-success" />
          <div className="min-w-0">
            <dt className="font-medium text-warm-dark">{whatsappLabel}</dt>
            <dd className="mt-0.5">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-success underline transition-colors hover:text-warm-success/80"
              >
                {phoneDisplay}
              </a>
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:col-span-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-mocha" />
          <div className="min-w-0">
            <dt className="font-medium text-warm-dark">{hoursLabel}</dt>
            <dd className="mt-0.5 text-taupe">{hoursValue}</dd>
          </div>
        </div>
      </dl>
    </article>
  )
}

export function LocationsSection() {
  const t = useTranslations('home.locations')

  const offices = [
    {
      name: t('banus.name'),
      address: t('banus.address'),
      directionsHref:
        'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(
          'Calle Ramón Areces, Plaza Marina Banús, 29660 Marbella',
        ),
    },
    {
      name: t('oldTown.name'),
      address: t('oldTown.address'),
      directionsHref:
        'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent('Av. de Nabeul, 14, 29601 Marbella'),
    },
  ]

  return (
    <section className="border-t border-mocha/8 bg-surface-200 py-24 sm:py-32">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2
            className="text-4xl font-semibold text-warm-dark sm:text-5xl"
            style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
          >
            {t('title')}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-taupe">
            {t('description')}
          </p>
        </FadeIn>

        <FadeInStagger className="mt-16 flex flex-col gap-6">
          {offices.map((office) => (
            <FadeIn key={office.name} className="flex">
              <OfficeCard
                name={office.name}
                address={office.address}
                directionsHref={office.directionsHref}
                phoneLabel={t('phoneLabel')}
                phoneDisplay={t('phoneNumber')}
                whatsappLabel={t('whatsappLabel')}
                hoursLabel={t('openingHoursLabel')}
                hoursValue={t('openingHoursValue')}
                directionsLabel={t('directions')}
              />
            </FadeIn>
          ))}
        </FadeInStagger>

        <FadeIn className="mt-12 rounded-2xl border border-red-500/25 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold text-warm-dark sm:text-2xl">
                {t('emergency.title')}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-taupe sm:text-base">
                {t('emergency.description')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/services/emergency">
                {t('emergency.learnMore')}
              </Button>
              <Button
                href={WHATSAPP_HREF}
                target="_blank"
                className="!border !border-red-500 !bg-white !text-red-500 transition-colors hover:!bg-red-500 hover:!text-white"
              >
                {t('emergency.hotline')}
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
