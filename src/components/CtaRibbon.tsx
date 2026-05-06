import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

type CtaRibbonProps = {
  title: string
  subtitle?: string
  ctaLabel: string
  ctaHref: string
}

export function CtaRibbon({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: CtaRibbonProps) {
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
            <Button
              href={ctaHref}
              invert
              className="shrink-0 whitespace-nowrap"
            >
              {ctaLabel}
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
