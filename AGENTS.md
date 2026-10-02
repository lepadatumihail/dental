## Learned User Preferences

- Keep every page aligned with `DESIGN.md`: monochrome editorial luxury (black/white, Playfair Display headlines, Raleway body, hairline rules, square corners). In September 2026 they chose this design, from a ChatGPT-built prototype, over the earlier warm cream/mocha palette.
- For emergency or urgent medical signaling, use Tailwind `red-500` when they want a strong standard red, not only the brand crimson/accent token.
- On mobile, keep hero primary and secondary CTAs on one row with smaller padding and type so both buttons fit comfortably.
- When rebuilding or restyling the home page, they have pointed at Novera-style layout polish and Sensor23-style structural pillars as references alongside `DESIGN.md`.
- They iterate with screenshots; they have asked to drop hero layouts with a large image directly under the headline and to remove decorative icons when sections feel busy.
- The clinic's feedback often arrives second-hand and without examples (October 2026: "faces cropped", "image quality bad", "font too big on mobile"); check every page at phone, tablet and desktop widths rather than asking for specifics.
- Never crop a face: photos of people sit in `aspect-ratio` frames that match the file (4:5 portraits, uncropped team photo), with a `focus` where a frame must crop.
- On phones keep display type modest (h1 ≈ 32–36px, h2 28px) and supporting copy at 14px or more; see the mobile scale in `DESIGN.md`.
- No online booking: in October 2026 the clinic asked for the booking system to be removed and every "book" action to open WhatsApp with a pre-filled message.

## Learned Workspace Facts

- Production canonical URLs and sitemaps target `https://www.prismaclinicmarbella.es` (see `src/lib/canonical.ts` and sitemap routes); confirm the domain before changing SEO or metadata.
- The per-locale sitemap uses an explicit `ROUTES` list in `src/app/[locale]/sitemap.xml/route.ts`; new `[locale]` pages must be added there or they will not appear in the sitemap. Blog posts are added automatically from `loadArticles()` in `src/lib/mdx.ts` (English only, `/en` sitemap).
- Page metadata goes through `createPageMetadata` in `src/lib/canonical.ts` (canonical, hreflang with `se` → `sv` and `x-default`, per-page Open Graph/Twitter). Pass a short title (the root template appends the brand) or `{ absolute }`.
- Clinic facts (addresses, phone, hours, languages, specialists, services) live in `src/lib/clinic.ts` and feed the footer, JSON-LD (`src/lib/structured-data.ts`, `src/lib/page-graphs.ts`) and `/llms.txt`; keep them in sync with `locales/*.json`.
- Internal links must use `Link` from `@/i18n/navigation`, not `next/link`, so they keep the current locale prefix.
- `<html>`/`<body>` live in `src/app/[locale]/layout.tsx` (for `lang`); `src/app/not-found.tsx` renders its own. Don't gate layout rendering on client mount: crawlers need server-rendered content.
- Page styling lives in semantic classes in `src/styles/prisma.css` (`button dark`, `inner-hero`, `split-heading`, `service-grid`…); old Tailwind tokens (`mocha`, `surface-*`, `taupe`) are remapped to monochrome values in `src/styles/tailwind.css`, and radius tokens are 0.
- Specialists: portraits (4:5) and gallery live in `src/lib/specialists.ts`, copy under `specialists.people.<slug>`, and JSON-LD/llms.txt facts in `SPECIALISTS` in `src/lib/clinic.ts`. Profile pages are `/specialists/<slug>`.
- Booking buttons use `BookLink` (`src/components/BookLink.tsx`): a WhatsApp link (`whatsappLink()` in `src/lib/clinic.ts`) whose pre-filled message comes from `site.bookMessage.*`, chosen by a `service` key (`dental`, `aesthetics`, `medical`, `massage`) or a `specialist` name. Doctor Online, memberships and dental-tourism requests hand off to WhatsApp the same way. There is no booking API or modal.
- Photographs render through `Photo` (`src/components/Photo.tsx`): quality 90 plus an optional `focus` (`object-position`). The WhatsApp campaign webhook (`src/app/api/whatsapp/webhook`, `src/lib/whatsapp/`) is separate from site booking; its replies link to `/es/contact`.
- Open Graph and Twitter image URLs resolve from `metadataBase` in `src/app/layout.tsx` (fed from the same canonical base); if dev still warns about localhost, verify the running tree, clear `.next`, and restart.
