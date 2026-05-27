import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export type ServiceItem = { title: string; description?: string }

type ServicesSectionProps = {
  eyebrow?: string
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
  ctaExternal?: boolean
  items?: ServiceItem[]
}

export function ServicesSection({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  ctaExternal = false,
  items,
}: ServicesSectionProps) {
  const hasItems = Boolean(items && items.length > 0)

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mocha">
              {eyebrow}
            </p>
          ) : null}
          <h2
            className={`text-3xl font-semibold text-warm-dark sm:text-4xl lg:text-5xl ${eyebrow ? 'mt-5' : ''}`}
            style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
          >
            {title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-taupe sm:text-lg">
            {body}
          </p>
        </FadeIn>

        {hasItems ? (
          <FadeInStagger faster>
            <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items!.map((item) => (
                <FadeIn key={item.title} className="flex">
                  <article className="group relative w-full overflow-hidden rounded-xl border border-mocha/10 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-mocha/25 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:p-7">
                    <span
                      className="absolute top-6 left-0 h-8 w-0.5 bg-mocha sm:top-7"
                      aria-hidden="true"
                    />
                    <h3
                      className="text-base font-semibold text-warm-dark sm:text-lg"
                      style={{ letterSpacing: '-0.2px' }}
                    >
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-taupe">
                        {item.description}
                      </p>
                    ) : null}
                  </article>
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>
        ) : null}

        <FadeIn
          className={`flex justify-center ${hasItems ? 'mt-14' : 'mt-10'}`}
        >
          {ctaExternal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg bg-warm-success px-6 py-3.5 text-sm font-medium text-white shadow-[0_4px_16px_rgba(90,122,94,0.25)] transition-all duration-150 hover:bg-warm-success/90 hover:shadow-[0_6px_20px_rgba(90,122,94,0.3)]"
            >
              <WhatsappLogo weight="fill" className="h-5 w-5" />
              {ctaLabel}
            </a>
          ) : (
            <a
              href={ctaHref}
              className="inline-flex items-center rounded-lg bg-mocha px-6 py-3.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-mocha-dark"
            >
              {ctaLabel}
            </a>
          )}
        </FadeIn>
      </Container>
    </section>
  )
}
