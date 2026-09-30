type InterestSectionProps = {
  eyebrow?: string
  title: string
  subheadline?: string
  body: string
  media?: React.ReactNode
}

/** Two-column statement: headline left, lead and body copy right. */
export function InterestSection({
  eyebrow,
  title,
  subheadline,
  body,
  media,
}: InterestSectionProps) {
  return (
    <section className="statement">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      <div className="statement-body">
        {subheadline ? <p className="statement-lead">{subheadline}</p> : null}
        <p>{body}</p>
      </div>
      {media ? <div className="statement-media">{media}</div> : null}
    </section>
  )
}
