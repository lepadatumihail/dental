import type { ReactNode } from 'react'

/**
 * Tags available to `t.rich()` in the editorial headings, e.g.
 * `"Everything you need.<br></br><em>One considered experience.</em>"`.
 */
export const richTags = {
  br: () => <br />,
  em: (chunks: ReactNode) => <em>{chunks}</em>,
}

/** The ↗ glyph that trails CTAs in the Prisma design. */
export function Arrow() {
  return <span aria-hidden="true">↗</span>
}
