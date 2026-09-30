# Prisma Clinic Marbella — Design System

## 1. Brand Identity

Prisma Clinic Marbella (PRISMA) is a private dental, aesthetic-medicine and general-medicine clinic with two locations in Marbella and Puerto Banús. The site should feel like an editorial luxury brand — calm, precise and confident — rather than a clinical office.

**Brand voice:** Warm, confident, elevated. Professional without being cold. Luxurious without being ostentatious.

**Design philosophy:** Monochrome editorial minimalism. Black and white only, large serif headlines, hairline rules instead of cards and shadows, generous whitespace and square corners. Photography carries the warmth; the interface stays quiet.

## 2. Color Palette

The palette is strictly monochrome. CSS variables live in `src/styles/prisma.css`; Tailwind tokens in `src/styles/tailwind.css`.

| Variable | Tailwind token | Value | Role |
|----------|----------------|-------|------|
| `--black` | `black` | `#050505` | Dark sections, primary buttons, footer, mobile menu |
| `--ink` / `--gold` | `ink` | `#111111` | Text and "accent" (the accent *is* ink) |
| `--white` / `--ivory` | `white` | `#ffffff` | Page background, light buttons |
| `--line` | `line` | `#d8d8d8` | Hairline rules and grid borders on white |
| `--muted` | `muted` | `#505050` | Secondary copy, numbers, captions |
| — | — | `#333` / `#383838` / `#555` | Rules and borders on black sections |
| — | — | `#aaa` / `#777` | Secondary copy on black sections |

**Emergency / urgent:** Tailwind `red-500` (`#ef4444`, hover `#dc2626`) via `.button.urgent` — the only colour in the interface, reserved for "call now" actions on emergency and general-medicine pages.

**Legacy tokens:** `mocha`, `taupe`, `sand`, `forest`, `warm-dark`, `surface-*` still exist but are remapped to the monochrome values above so older markup (booking wizard, cookie banner, blog) follows the design. Don't use them in new code — use `ink`, `muted`, `line`, `black`, `white`.

**Photography:** treatment-area and atmosphere images are shown in grayscale (`filter: grayscale()`); portraits of specialists and clinic interiors stay in colour.

## 3. Typography

| Role | Font | Notes |
|------|------|-------|
| Display (h1–h3, blockquotes, numbers) | **Playfair Display** (variable, normal + italic) via `next/font` → `--font-playfair`, Tailwind `font-display` | Weight 400, letter-spacing `-0.035em` |
| Body / UI | **Raleway** via `next/font` → `--font-raleway`, Tailwind `font-sans` | Body weight 300; labels 500 |

### Scale

| Role | Size | Details |
|------|------|---------|
| h1 | `clamp(4.7rem, 7.2vw, 7.6rem)`, line-height 0.88 | **Uppercase**. Smaller on service heroes (`.service-hero h1`) and profiles |
| h2 | `clamp(3.6rem, 6.1vw, 7rem)`, line-height 0.96 | Sentence case; second line often `<em>` italic |
| Section h2 (content pages) | `clamp(2.6rem, 4.6vw, 5.4rem)` | `.split-heading`, `.statement`, `.expert-feature` |
| h3 | ~1.7–2.2rem | Playfair, used in grids and cards |
| Eyebrow (`.eyebrow`) | 0.68rem, weight 500 | Uppercase, letter-spacing 0.21em |
| Body | ~0.85–1.1rem, line-height 1.7–1.85 | Muted colour for supporting copy |
| Button label | 0.69rem, weight 500 | Uppercase, letter-spacing 0.15em |

### Principles

- **Serif for statements, sans for structure.** Playfair for headlines, quotes and big numbers; Raleway for everything functional.
- **Two-line headlines.** Most section titles are two short lines, the second in italic: `"Your next chapter<br></br><em>starts here.</em>"` (rendered with `t.rich(key, richTags)` from `src/lib/rich.tsx`).
- **Uppercase only for h1, eyebrows, buttons and nav micro-labels.**

## 4. Components

All components are semantic classes in `src/styles/prisma.css` (inside `@layer components`, so Tailwind utilities can still override them).

### Buttons & links
- `.button.dark` — black fill, white text, 64px tall, square, trailing `↗` (`<Arrow />`). Primary action.
- `.button.light` — white fill, black text; used on black sections (on `.final-cta` it renders dark).
- `.button.urgent` — red-500 fill for emergency calls only.
- `.button.wide` — full width (forms, membership cards).
- `.text-link` — uppercase micro-label link with trailing arrow; `.light-link` on black.
- Booking buttons use `BookTrigger` (`src/components/booking/BookButton.tsx`) with these classes; pass `service="dental" | "aesthetics" | "medical"` to pre-select a service.

### Shared page parts
- **Header** (`SiteHeader`): absolute over the first section, utility bar (locations + EN · ES · SE), wordmark, nav, "Book a consultation". Collapses to a full-screen black menu below 1450px.
- **Footer** (`Footer`): black, wordmark (inverted), four columns, copyright + cookie settings + credit.
- **WhatsApp widget** (`WhatsAppWidget`): black pill bottom-right that opens a topic picker and hands off to WhatsApp or a call.
- **Inner hero** (`InnerHero` / `PageIntro`): white, monogram watermark, eyebrow, uppercase h1, intro, CTA. Accounts for the absolute header (padding-top 230px desktop).
- **Final CTA** (`FinalCta`): "Your next chapter starts here." band before the footer.
- **Split heroes**: `.tourism-hero` (+ `.service-hero`), `.care-hero`, `.profile-hero` — copy beside an image.

### Section patterns
- `.split-heading` — eyebrow + h2 left, supporting copy right.
- `.statement` — headline left, lead (`.statement-lead`) + body right.
- Numbered hairline grids: `.service-grid`, `.condition-grid`, `.price-grid`, `.review-grid`, `.steps` — cells separated by 1px `--line` borders, a small muted `01` number, Playfair h3, muted copy.
- Lists with rules: `.home-specialist-list`, `.profile-treatment-list`, `.routing-list`, `.tourism-process`.
- Black bands: `.dark-section`, `.cta-band`, `.care-cta`, `.profile-cta`, `.emergency-hotline`, `.emergency-strip`.
- Tags: `.detail-tags span`, `.service-list span` — 1px bordered chips, no radius.

### Forms
- Underline inputs in modals (`.booking-modal`), bordered inputs on black (`.planner-form`), square corners everywhere.

## 5. Layout

- Horizontal page padding: `7vw` desktop, `1.2rem` mobile (≤700px).
- Section padding: `8–10rem` vertical desktop, `6–6.5rem` mobile.
- Grids use fractional columns (`1.2fr 1fr`, `0.85fr 1.15fr`) rather than a 12-column system.
- **No border radius** (Tailwind radius tokens are 0; pills via `rounded-full` only for the WhatsApp trigger and round icon buttons).
- **No shadows** except floating UI (WhatsApp widget, modals).
- Separation comes from 1px rules, black/white section alternation and whitespace.

## 6. Motion

- Hover: buttons lift `translateY(-2px)`; nav links grow an underline; grid cards shift to `#f5f5f5`; access tiles invert to black.
- Hero image fades/scales in (`heroScale`, 1.1s).
- `prefers-reduced-motion` disables all transitions and animations.

## 7. Responsive

| Breakpoint | Changes |
|------------|---------|
| ≤1450px | Nav collapses to the full-screen black menu (with language links) |
| ≤1180px | Smaller header, 2-column grids, treatment tabs stack |
| ≤700px | Single column, 1.2rem gutters, h1 ~3.5rem, hero CTAs stack full width, footer 2 columns |

Mobile: hero actions stack; keep tap targets ≥44px.

## 8. Logo

- Wordmark: `src/images/prisma/brand/prisma-wordmark.png` (inverted in the footer).
- Monogram: `src/images/prisma/brand/prisma-monogram.png`, used as a faint watermark (opacity ~0.04–0.06) in inner heroes and the homepage intro.

## 9. Agent Prompt Guide

1. Black, white and greys only; red-500 exclusively for emergency call buttons.
2. Playfair Display for headlines (uppercase h1, sentence-case h2 with an italic second line); Raleway 300 for body.
3. Reuse the semantic classes in `src/styles/prisma.css` before writing new CSS; add new ones there, in the same vocabulary.
4. Hairline rules, square corners, no shadows, no decorative icons — use numbers (`01`, `02`) and the `↗` arrow instead.
5. Every page starts with a hero that clears the absolute header (`InnerHero`, a split hero, or `.page-offset`).
6. Copy goes in `locales/{en,es,se}.json`; headings with line breaks use `<br></br>` and `<em>` with `t.rich(key, richTags)`.
