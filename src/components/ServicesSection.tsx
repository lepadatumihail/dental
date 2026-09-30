import { Arrow } from '@/lib/rich'

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

/** Numbered grid of treatments with a closing CTA. */
export function ServicesSection({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  ctaExternal = false,
  items,
}: ServicesSectionProps) {
  return (
    <section className="section-block">
      <div className="split-heading">
        <div>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2>{title}</h2>
        </div>
        <p>{body}</p>
      </div>

      {items && items.length > 0 ? (
        <div className="service-grid">
          {items.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              {item.description ? <p>{item.description}</p> : null}
            </article>
          ))}
        </div>
      ) : null}

      <div className="section-actions">
        <a
          className="button dark"
          href={ctaHref}
          {...(ctaExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {ctaLabel} <Arrow />
        </a>
      </div>
    </section>
  )
}
