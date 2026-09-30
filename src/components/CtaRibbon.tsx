import { BookTrigger } from '@/components/booking/BookButton'
import { Arrow } from '@/lib/rich'

type CtaRibbonProps = {
  title: string
  subtitle?: string
  ctaLabel: string
}

/** Black booking band between sections. */
export function CtaRibbon({ title, subtitle, ctaLabel }: CtaRibbonProps) {
  return (
    <section className="cta-band">
      <div>
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <BookTrigger className="button light">
        {ctaLabel} <Arrow />
      </BookTrigger>
    </section>
  )
}
