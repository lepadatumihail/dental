import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { BookButton } from '@/components/booking/BookButton'

type CtaRibbonProps = {
  title: string
  subtitle?: string
  ctaLabel: string
}

export function CtaRibbon({ title, subtitle, ctaLabel }: CtaRibbonProps) {
  return (
    <section className="border-y border-mocha-dark/20 bg-mocha py-10 sm:py-12">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div className="max-w-2xl">
              <h2
                className="text-xl font-semibold text-white sm:text-2xl"
                style={{ letterSpacing: '-0.3px', lineHeight: 1.25 }}
              >
                {title}
              </h2>
              {subtitle ? (
                <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
                  {subtitle}
                </p>
              ) : null}
            </div>
            <BookButton
              label={ctaLabel}
              variant="invert"
              className="shrink-0 whitespace-nowrap"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
