import { useTranslations } from 'next-intl'

import { GOOGLE_REVIEWS_URL } from '@/lib/clinic'
import { Arrow } from '@/lib/rich'

type TestimonialItem = {
  name: string
  text: string
}

export function TestimonialsGrid() {
  const t = useTranslations('home.testimonialsGrid')
  // Six keep the grid even; the full set lives on Google.
  const items = (t.raw('items') as TestimonialItem[]).slice(0, 6)

  return (
    <section className="section-block">
      <div className="split-heading">
        <div>
          <p className="eyebrow">Google</p>
          <h2>{t('title')}</h2>
        </div>
        <div>
          <p>{t('description')}</p>
          <a
            className="text-link"
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('viewAll')} <Arrow />
          </a>
        </div>
      </div>
      <div className="review-grid">
        {items.map((item) => (
          <figure key={item.name}>
            <blockquote>&ldquo;{item.text}&rdquo;</blockquote>
            <figcaption>
              {item.name}
              <small>Google review</small>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
