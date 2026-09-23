import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { ContactBooking } from '@/components/booking/ContactBooking'
import { JsonLd } from '@/components/JsonLd'
import { createPageMetadata } from '@/lib/canonical'
import { simplePageJsonLd } from '@/lib/page-graphs'

interface PageProps {
  params: { locale: string }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'booking' })

  return createPageMetadata({
    path: 'contact',
    locale,
    title: { absolute: t('meta.title') },
    description: t('meta.description'),
  })
}

export default async function Contact() {
  const t = await getTranslations('booking')

  return (
    <>
      <JsonLd data={await simplePageJsonLd('contact')} />
      <PageIntro eyebrow={t('inline.eyebrow')} title={t('inline.title')}>
        <p>{t('inline.intro')}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <FadeIn className="lg:order-last">
            <ContactBooking />
          </FadeIn>

          <FadeIn>
            <h2 className="font-display text-base font-semibold text-warm-dark">
              {t('contact.locationTitle')}
            </h2>
            <p className="mt-6 text-base text-taupe">
              {t('contact.locationBody')}
            </p>

            <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

            <Border className="mt-16 pt-16">
              <h2 className="font-display text-base font-semibold text-warm-dark">
                {t('contact.followTitle')}
              </h2>
              <SocialMedia className="mt-6" />
            </Border>
          </FadeIn>
        </div>
      </Container>
    </>
  )
}
