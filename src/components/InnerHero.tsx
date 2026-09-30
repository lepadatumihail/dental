import Image from 'next/image'
import clsx from 'clsx'
import { getTranslations } from 'next-intl/server'

import { BookTrigger } from '@/components/booking/BookButton'
import { Arrow } from '@/lib/rich'

import monogram from '@/images/prisma/brand/prisma-monogram.png'

/**
 * Opening section of an inner page: monogram watermark, eyebrow, uppercase
 * headline, intro and a CTA (booking by default).
 */
export async function InnerHero({
  eyebrow,
  title,
  intro,
  action,
  service,
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  /** Replaces the default "Book a consultation" button. */
  action?: React.ReactNode
  /** Booking service key pre-selected by the default button. */
  service?: string
  className?: string
}) {
  const t = await getTranslations('site')

  return (
    <section className={clsx('inner-hero', className)}>
      <Image src={monogram} alt="" priority sizes="600px" />
      <div>
        <p className="eyebrow gold">{eyebrow}</p>
        <h1>{title}</h1>
        {intro ? <p>{intro}</p> : null}
        {action ?? (
          <BookTrigger service={service} className="button dark">
            {t('bookConsultation')} <Arrow />
          </BookTrigger>
        )}
      </div>
    </section>
  )
}
