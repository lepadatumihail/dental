import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

type InterestSectionProps = {
  eyebrow?: string
  title: string
  subheadline?: string
  body: string
  media?: React.ReactNode
}

export function InterestSection({
  eyebrow,
  title,
  subheadline,
  body,
  media,
}: InterestSectionProps) {
  return (
    <section className="border-y border-mocha/8 bg-surface-200 py-24 sm:py-28">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              {eyebrow ? (
                <p className="text-xs font-semibold tracking-[0.18em] text-mocha uppercase">
                  {eyebrow}
                </p>
              ) : null}
              <h2
                className={`text-3xl font-semibold text-warm-dark sm:text-4xl lg:text-5xl ${eyebrow ? 'mt-5' : ''}`}
                style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
              >
                {title}
              </h2>
            </div>
            <div className="lg:col-span-7">
              {subheadline ? (
                <p className="text-lg leading-relaxed text-mocha sm:text-xl">
                  {subheadline}
                </p>
              ) : null}
              <p
                className={`text-base leading-relaxed text-taupe sm:text-xl ${subheadline ? 'mt-6' : ''}`}
              >
                {body}
              </p>
            </div>
          </div>
          {media ? <div className="mt-12 lg:mt-16">{media}</div> : null}
        </FadeIn>
      </Container>
    </section>
  )
}
