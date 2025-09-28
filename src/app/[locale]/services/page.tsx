import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { IconProps } from '@phosphor-icons/react'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'
import { createCanonicalMetadata } from '@/lib/canonical'
import logoMailSmirk from '@/images/clients/phobia/logo-dark.svg'
import { EmergencyServiceBanner } from '@/components/EmergencyServiceBanner'

import { FirstAidKit, Syringe, Tooth } from '@phosphor-icons/react/dist/ssr'

interface Service {
  id: number
  icon: React.ComponentType<IconProps>
  client: string
  service: string
  title: string
  summary: string[]
  href: string
  testimonial: {
    author: {
      name: string
      role: string
    }
    content: string
  }
}

function Services() {
  const t = useTranslations('layout.services')
  const services: Service[] = [
    {
      id: 1,
      icon: Tooth,
      client: t('dental.client'),
      service: t('dental.service'),
      title: t('dental.title'),
      summary: t.raw('dental.summary') as string[],
      href: '/services/dental',
      testimonial: {
        author: {
          name: t('dental.testimonial.author'),
          role: t('dental.testimonial.role'),
        },
        content: t('dental.testimonial.content'),
      },
    },
    {
      id: 2,
      icon: Syringe,
      client: t('aesthetics.client'),
      service: t('aesthetics.service'),
      title: t('aesthetics.title'),
      summary: t.raw('aesthetics.summary') as string[],
      href: '/services/aesthetics',
      testimonial: {
        author: {
          name: t('aesthetics.testimonial.author'),
          role: t('aesthetics.testimonial.role'),
        },
        content: t('aesthetics.testimonial.content'),
      },
    },
    {
      id: 3,
      icon: FirstAidKit,
      client: t('generalMedicine.client'),
      service: t('generalMedicine.service'),
      title: t('generalMedicine.title'),
      summary: t.raw('generalMedicine.summary') as string[],
      href: '/services/general-medicine',
      testimonial: {
        author: {
          name: t('generalMedicine.testimonial.author'),
          role: t('generalMedicine.testimonial.role'),
        },
        content: t('generalMedicine.testimonial.content'),
      },
    },
  ]

  return (
    <Container className="mt-24">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          {t('page.title')}
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24">
        {services.map((service) => (
          <FadeIn key={service.id}>
            <article>
              <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-10">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                  <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                    <service.icon size={42} />
                    <h3 className="mt-6 font-display text-2xl font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                      {service.client}
                    </h3>
                  </div>
                  <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                      {service.service}
                    </p>
                  </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <p className="font-display text-4xl font-medium text-neutral-950">
                    <Link href={service.href}>{service.title}</Link>
                  </p>
                  <div className="mt-6 space-y-6 text-base text-neutral-600">
                    {Array.isArray(service.summary) &&
                      service.summary.map(
                        (paragraph: string, index: number) => (
                          <p key={`${service.id}-paragraph-${index}`}>
                            {paragraph}
                          </p>
                        ),
                      )}
                  </div>
                  <div className="mt-8 flex">
                    <Button
                      href={service.href}
                      aria-label={`${t('page.learnMore')} ${service.client}`}
                    >
                      {t('page.learnMore')}
                    </Button>
                  </div>
                  {service.testimonial && (
                    <Blockquote
                      author={service.testimonial.author}
                      className="mt-12"
                    >
                      {service.testimonial.content}
                    </Blockquote>
                  )}
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params

  return {
    title: 'Our Services | Prisma Clinic Marbella',
    description:
      'Medical and dental services in Marbella including emergency 24/7 dental care, cosmetic dentistry, and aesthetic treatments.',
    ...createCanonicalMetadata('services', locale),
  }
}

// Generate static params for all locales
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

export default function ServicesPage() {
  const t = useTranslations('layout.services')

  return (
    <>
      <PageIntro eyebrow={t('page.title')} title={t('page.subtitle')}>
        <p>{t('page.description')}</p>
      </PageIntro>

      <EmergencyServiceBanner />

      <Services />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: t('page.testimonial.client'), logo: logoMailSmirk }}
      >
        {t('page.testimonial.content')}
      </Testimonial>

      {/* <Clients />  */}

      {/* <ContactSection /> */}
    </>
  )
}
