## Learned User Preferences

- Keep homepage and shared chrome aligned with `DESIGN.md`: warm, minimalist, luxury-leaning (cream surfaces, warm-dark text, gold and crimson accents used sparingly).
- For emergency or urgent medical signaling, use Tailwind `red-500` when they want a strong standard red, not only the brand crimson/accent token.
- On mobile, keep hero primary and secondary CTAs on one row with smaller padding and type so both buttons fit comfortably.
- When rebuilding or restyling the home page, they have pointed at Novera-style layout polish and Sensor23-style structural pillars as references alongside `DESIGN.md`.
- They iterate with screenshots; they have asked to drop hero layouts with a large image directly under the headline and to remove decorative icons when sections feel busy.

## Learned Workspace Facts

- Production canonical URLs and sitemaps target `https://www.prismaclinicmarbella.es` (see `src/lib/canonical.ts` and sitemap routes); confirm the domain before changing SEO or metadata.
- The per-locale sitemap uses an explicit `ROUTES` list in `src/app/[locale]/sitemap.xml/route.ts`; new `[locale]` pages must be added there or they will not appear in the sitemap. Blog posts are added automatically from `loadArticles()` in `src/lib/mdx.ts` (English only, `/en` sitemap).
- Page metadata goes through `createPageMetadata` in `src/lib/canonical.ts` (canonical, hreflang with `se` → `sv` and `x-default`, per-page Open Graph/Twitter). Pass a short title (the root template appends the brand) or `{ absolute }`.
- Clinic facts (addresses, phone, hours, languages, specialists, services) live in `src/lib/clinic.ts` and feed the footer, JSON-LD (`src/lib/structured-data.ts`, `src/lib/page-graphs.ts`) and `/llms.txt`; keep them in sync with `locales/*.json`.
- Internal links must use `Link` from `@/i18n/navigation`, not `next/link`, so they keep the current locale prefix.
- `<html>`/`<body>` live in `src/app/[locale]/layout.tsx` (for `lang`); `src/app/not-found.tsx` renders its own. Don't gate layout rendering on client mount: crawlers need server-rendered content.
- Open Graph and Twitter image URLs resolve from `metadataBase` in `src/app/layout.tsx` (fed from the same canonical base); if dev still warns about localhost, verify the running tree, clear `.next`, and restart.
