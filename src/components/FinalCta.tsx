import { getTranslations } from 'next-intl/server'

import { BookTrigger } from '@/components/booking/BookButton'
import { Arrow, richTags } from '@/lib/rich'

/** Closing "Your next chapter starts here." band shared by most pages. */
export async function FinalCta({ service }: { service?: string }) {
  const t = await getTranslations('site')

  return (
    <section className="final-cta">
      <div>
        <p className="eyebrow gold">{t('finalCta.eyebrow')}</p>
        <h2>{t.rich('finalCta.title', richTags)}</h2>
      </div>
      <BookTrigger service={service} className="button light">
        {t('bookYourConsultation')} <Arrow />
      </BookTrigger>
    </section>
  )
}
