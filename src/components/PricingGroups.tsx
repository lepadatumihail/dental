export type PriceItem = { service: string; price: string }
export type PriceGroup = { title: string; subtitle: string; items: PriceItem[] }

type PricingGroupsProps = {
  groups: PriceGroup[]
  /** Wrap the grid in its own padded section (default). */
  withContainer?: boolean
  className?: string
}

function PricingGrid({ groups }: { groups: PriceGroup[] }) {
  return (
    <div className="price-grid">
      {groups.map((group, index) => (
        <article key={group.title}>
          <header>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{group.title}</h3>
          </header>
          <p className="price-group-note">{group.subtitle}</p>
          {group.items.map((item) => (
            <div className="price-row" key={item.service}>
              <span>{item.service}</span>
              <strong>{item.price}</strong>
            </div>
          ))}
        </article>
      ))}
    </div>
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
    <section className={className ?? 'section-block'}>
      <PricingGrid groups={groups} />
    </section>
  )
}
