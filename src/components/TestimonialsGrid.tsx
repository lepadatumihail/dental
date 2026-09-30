import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { Arrow } from '@/lib/rich'

type TestimonialItem = {
  name: string
  text: string
}

const GOOGLE_REVIEWS_HREF =
  'https://www.google.com/search?sa=X&sca_esv=d4004dff2930eec9&hl=es-ES&q=Prisma+Clinic+Marbella+Rese%C3%B1as&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2MjY0NDU2MrcwNjE3tzA1MDGw3MDI-IpRPqAoszg3UcE5JzMvM1nBN7EoKTUnJ1EhKLU49fDGxOJFrIRUAADaG9GUXgAAAA&rldimm=2311532783477850409&tbm=lcl#lkt=LocalPoiReviews'

export function TestimonialsGrid() {
  const t = useTranslations('home.testimonialsGrid')
  const tReviews = useTranslations('landing.reviews')
  // Six keep the grid even; the full set lives on /results.
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
            href={GOOGLE_REVIEWS_HREF}
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
      <div className="section-actions">
        <Link className="text-link" href="/results">
          {tReviews('cta')} <Arrow />
        </Link>
      </div>
    </section>
  )
}
