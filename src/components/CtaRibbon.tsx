import { BookLink, type BookingTopic } from '@/components/BookLink'
import { Arrow } from '@/lib/rich'

type CtaRibbonProps = {
  title: string
  subtitle?: string
  ctaLabel: string
  /** Treatment area named in the pre-filled WhatsApp message. */
  service?: BookingTopic
}

/** Booking band between sections. */
export function CtaRibbon({
  title,
  subtitle,
  ctaLabel,
  service,
}: CtaRibbonProps) {
  return (
    <section className="cta-band">
      <div>
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <BookLink service={service} className="button light">
        {ctaLabel} <Arrow />
      </BookLink>
    </section>
  )
}
