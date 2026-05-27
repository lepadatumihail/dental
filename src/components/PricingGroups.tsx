import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export type PriceItem = { service: string; price: string }
export type PriceGroup = { title: string; subtitle: string; items: PriceItem[] }

type PricingGroupsProps = {
  groups: PriceGroup[]
  withContainer?: boolean
  className?: string
}

const groupAccents = [
  { bar: 'bg-step-consult', dot: 'bg-step-consult' },
  { bar: 'bg-step-diagnose', dot: 'bg-step-diagnose' },
  { bar: 'bg-step-treat', dot: 'bg-step-treat' },
  { bar: 'bg-step-care', dot: 'bg-step-care' },
  { bar: 'bg-mocha', dot: 'bg-mocha' },
  { bar: 'bg-warm-success', dot: 'bg-warm-success' },
] as const

function PricingGrid({ groups }: { groups: PriceGroup[] }) {
  return (
    <FadeInStagger faster>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, idx) => {
          const accent = groupAccents[idx % groupAccents.length]
          return (
            <FadeIn key={group.title} className="flex">
              <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-mocha/10 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)]">
                <div
                  className={`h-1 w-full ${accent.bar}`}
                  aria-hidden="true"
                />
                <header className="flex items-start gap-3 px-6 pt-7 pb-5 sm:px-7">
                  <span
                    className={`mt-2 inline-block h-2 w-2 shrink-0 rounded-full ${accent.dot}`}
                    aria-hidden="true"
                  />
                  <div>
                    <h3
                      className="text-lg font-semibold text-warm-dark sm:text-xl"
                      style={{ letterSpacing: '-0.3px' }}
                    >
                      {group.title}
                    </h3>
                    <p className="mt-1 text-xs tracking-wide text-taupe uppercase">
                      {group.subtitle}
                    </p>
                  </div>
                </header>
                <ul className="flex flex-1 flex-col">
                  {group.items.map((item, i) => (
                    <li
                      key={`${group.title}-${i}`}
                      className="flex items-center justify-between gap-3 border-t border-mocha/8 px-6 py-3.5 transition-colors duration-150 hover:bg-surface-100 sm:px-7"
                    >
                      <span className="text-sm leading-snug text-warm-dark">
                        {item.service}
                      </span>
                      <span className="shrink-0 text-sm font-semibold tracking-tight text-mocha tabular-nums">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          )
        })}
      </div>
    </FadeInStagger>
  )
}

export function PricingGroups({
  groups,
  withContainer = true,
  className,
}: PricingGroupsProps) {
  if (!withContainer) {
    return <PricingGrid groups={groups} />
  }
  return (
    <section className={className ?? 'pb-24 sm:pb-28'}>
      <Container>
        <PricingGrid groups={groups} />
      </Container>
    </section>
  )
}
