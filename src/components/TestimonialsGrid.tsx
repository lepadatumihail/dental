import { useTranslations } from 'next-intl'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

type TestimonialItem = {
  name: string
  text: string
}

function GoogleMark() {
  return (
    <span
      aria-label="Google review"
      title="Google review"
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M21.6 12.227c0-.708-.064-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.995 3.018v2.51h3.231c1.89-1.74 2.982-4.305 2.982-7.351z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 4.964-.895 6.618-2.422l-3.23-2.51c-.895.6-2.04.954-3.388.954-2.605 0-4.81-1.76-5.598-4.123H3.064v2.59A9.996 9.996 0 0 0 12 22z"
        />
        <path
          fill="#FBBC05"
          d="M6.402 13.9A6.005 6.005 0 0 1 6.09 12c0-.66.114-1.3.31-1.9V7.51H3.064A9.996 9.996 0 0 0 2 12c0 1.614.386 3.14 1.064 4.49l3.338-2.59z"
        />
        <path
          fill="#EA4335"
          d="M12 5.977c1.468 0 2.786.505 3.823 1.495l2.868-2.868C16.96 3.022 14.696 2 12 2A9.996 9.996 0 0 0 3.064 7.51l3.338 2.59C7.19 7.737 9.395 5.977 12 5.977z"
        />
      </svg>
    </span>
  )
}

export function TestimonialsGrid() {
  const t = useTranslations('home.testimonialsGrid')
  const items = t.raw('items') as TestimonialItem[]

  return (
    <section className="py-24">
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

        <div
          className="relative mt-16"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
          }}
        >
          <FadeInStagger faster>
            <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {items.map((item, index) => (
                <li key={index} className="mb-6 break-inside-avoid">
                  <FadeIn>
                    <figure className="rounded-2xl border border-mocha/8 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                      <blockquote>
                        <p className="line-clamp-[9] text-sm leading-relaxed text-warm-dark sm:text-base">
                          &ldquo;{item.text}&rdquo;
                        </p>
                      </blockquote>
                      <figcaption className="mt-5 flex items-center gap-3">
                        <GoogleMark />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-warm-dark">
                            {item.name}
                          </p>
                          <p className="text-xs text-taupe">Google review</p>
                        </div>
                      </figcaption>
                    </figure>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </FadeInStagger>
        </div>
      </Container>
    </section>
  )
}
