import type { ReactNode } from 'react'

/**
 * Tags available to `t.rich()` in the editorial headings, e.g.
 * `"Everything you need.<br></br><em>One considered experience.</em>"`.
 */
export const richTags = {
  br: () => <br />,
  em: (chunks: ReactNode) => <em>{chunks}</em>,
}

/**
 * The up-right arrow that trails CTAs. An SVG rather than the ↗ glyph so it
 * renders identically on every platform; it nudges on hover (see prisma.css).
 */
export function Arrow() {
  return (
    <svg
      className="arrow"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 9 9 3M4.5 3H9v4.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  )
}
