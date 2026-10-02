import { getTranslations } from 'next-intl/server'

import { BookLink, type BookingTopic } from '@/components/BookLink'
import { Arrow, richTags } from '@/lib/rich'

/** Closing "Your next chapter starts here." band shared by most pages. */
export async function FinalCta({ service }: { service?: BookingTopic }) {
  const t = await getTranslations('site')

  return (
    <section className="final-cta">
      <div>
        <p className="eyebrow gold">{t('finalCta.eyebrow')}</p>
        <h2>{t.rich('finalCta.title', richTags)}</h2>
      </div>
      <BookLink service={service} className="button light">
        {t('bookYourConsultation')} <Arrow />
      </BookLink>
    </section>
  )
}
