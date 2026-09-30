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
| `--muted` | `muted` | `#454545` | Secondary copy, numbers, captions |
| `--soft` | — | `#f3f3f1` | Soft panel behind CTA bands |
| — | — | `#333` / `#383838` / `#555` | Rules and borders on black sections |
| — | — | `#aaa` / `#777` | Secondary copy on black sections |

**Emergency / urgent:** Tailwind `red-500` (`#ef4444`, hover `#dc2626`) via `.button.urgent` — the only colour in the interface, reserved for "call now" actions on emergency and general-medicine pages.

**Legacy tokens:** `mocha`, `taupe`, `sand`, `forest`, `warm-dark`, `surface-*` still exist but are remapped to the monochrome values above so older markup (booking wizard, cookie banner, blog) follows the design. Don't use them in new code — use `ink`, `muted`, `line`, `black`, `white`.

**Photography:** always in full colour — against the monochrome interface the photos provide the warmth and contrast. Never apply grayscale filters.

## 3. Typography

| Role | Font | Notes |
|------|------|-------|
| Display (h1–h3, blockquotes, numbers) | **Playfair Display** (variable, normal + italic) via `next/font` → `--font-playfair`, Tailwind `font-display` | Weight 400, letter-spacing `-0.035em` |
| Body / UI | **Raleway** via `next/font` → `--font-raleway`, Tailwind `font-sans` | Body weight 300; labels 500 |

### Scale

| Role | Size | Details |
|------|------|---------|
| h1 | `clamp(4.2rem, 6.6vw, 7rem)`, line-height 0.9 | **Uppercase** for short titles. Service heroes (`.service-hero h1`) carry full-sentence titles, so they are sentence case at `clamp(2.8rem, 4vw, 4.6rem)` |
| h2 | `clamp(2.8rem, 4.8vw, 5.4rem)`, line-height 0.96 | Sentence case; second line often `<em>` italic |
| Section h2 (content pages) | `clamp(2.6rem, 4.6vw, 5.4rem)` | `.split-heading`, `.statement`, `.expert-feature` |
| h3 | ~1.7–2.2rem | Playfair, used in grids and cards |
| Eyebrow (`.eyebrow`) | 0.68rem, weight 500 | Uppercase, letter-spacing 0.21em |
| Body | ~0.85–1.1rem, line-height 1.7–1.85 | Muted colour for supporting copy |
| Button label | 0.69rem, weight 500 | Uppercase, letter-spacing 0.15em |

### Principles

- **Serif for statements, sans for structure.** Playfair for headlines, quotes and big numbers; Raleway for everything functional.
- **Two-line headlines.** Most section titles are two short lines, the second in italic: `"Your next chapter<br></br><em>starts here.</em>"` (rendered with `t.rich(key, richTags)` from `src/lib/rich.tsx`).
- **Uppercase only for short h1s, eyebrows, buttons and nav micro-labels.** Anything longer than ~5 words stays in sentence case.

## 4. Components

All components are semantic classes in `src/styles/prisma.css` (inside `@layer components`, so Tailwind utilities can still override them).

### Buttons & links
- `.button.dark` — black fill, white text, 64px tall, square, trailing `↗` (`<Arrow />`). Primary action.
- `.button.light` — white fill, black text; used on black sections (on `.final-cta` it renders dark).
- `.button.urgent` — red-500 fill for emergency calls only.
- `.button.wide` — full width (forms, membership cards).
- `.button.outline` — white with an ink hairline; the secondary choice beside a dark button.
- `.text-link` — uppercase micro-label link with trailing arrow; `.light-link` on black.
- **Arrow:** always the `<Arrow />` SVG from `src/lib/rich.tsx` (never the ↗ glyph). It nudges up-right on hover. Tabs and toggles get no arrow — arrows mean "goes somewhere".
- Booking buttons use `BookTrigger` (`src/components/booking/BookButton.tsx`) with these classes; pass `service="dental" | "aesthetics" | "medical"` to pre-select a service.

### Shared page parts
- **Header** (`SiteHeader`): fixed; utility bar (locations, secondary links Doctor Online / Dental Tourism / Prisma Care, EN · ES · SE) above the wordmark, six primary links and "Book a consultation". The current page is underlined. It tucks away while scrolling down and returns without the utility bar when scrolling up. Below 1180px it collapses to a left-aligned full-screen black menu.
- **Footer** (`Footer`): black, wordmark (inverted), four columns, copyright + cookie settings + credit.
- **WhatsApp widget** (`WhatsAppWidget`): round 56px black button bottom-right (icon cross-fades to ×) that opens a topic picker and hands off to WhatsApp or a call.
- **Cookie consent** (`CookieBanner`): compact card bottom-left, equal-weight "Accept all" / "Necessary only".
- **Inner hero** (`InnerHero` / `PageIntro`): white, monogram watermark, eyebrow, uppercase h1, intro, CTA. Accounts for the absolute header (padding-top 230px desktop).
- **Final CTA** (`FinalCta`): "Your next chapter starts here." band before the footer.
- **Split heroes**: `.tourism-hero` (+ `.service-hero`), `.care-hero`, `.profile-hero` — copy beside an image.

### Section patterns
- `.split-heading` — eyebrow + h2 left, supporting copy right.
- `.statement` — headline left, lead (`.statement-lead`) + body right.
- Numbered hairline grids: `.service-grid`, `.condition-grid`, `.price-grid`, `.review-grid`, `.steps` — cells separated by 1px `--line` borders, a small muted `01` number, Playfair h3, muted copy.
- Lists with rules: `.home-specialist-list`, `.profile-treatment-list`, `.routing-list`, `.tourism-process`.
- CTA bands (`.compact-emergency`, `.cta-band`, `.care-cta`, `.profile-cta`, `.influencer-membership`, `.emergency-hotline`, `.emergency-strip`) sit on the soft `--soft` panel with dark buttons. Black is reserved for the footer and a few feature blocks (trip planner, emergency steps, featured membership card, active tab) — never stack black bands.
- Tags: `.detail-tags span`, `.service-chips span` — 1px bordered chips, no radius.
- Price list: `.price-grid` — one row per group, name (sticky) on the left, prices on the right.
- People lists: `.home-specialist-list` rows with a 64px `.specialist-thumb` (grayscale, colour on hover) from `Specialist.thumb`.

### Forms
- Underline inputs in modals (`.booking-modal`), bordered inputs on black (`.planner-form`), square corners everywhere.

## 5. Layout

- One gutter everywhere: `--gutter` (`clamp(1.2rem, 5vw, 6rem)`) for the header, heroes and sections, so all edges line up.
- Section padding: `--section-y` (`clamp(5.5rem, 9vw, 8.5rem)`) desktop, `6–6.5rem` mobile.
- Dividers on white are always the light hairline (`--line`); solid black is reserved for surfaces (bands, buttons, the featured card).
- Grids use fractional columns (`1.2fr 1fr`, `0.85fr 1.15fr`) rather than a 12-column system.
- **No border radius** (Tailwind radius tokens are 0; pills via `rounded-full` only for the WhatsApp trigger and round icon buttons).
- **No shadows** except floating UI (WhatsApp widget, modals).
- Separation comes from 1px rules, black/white section alternation and whitespace.

## 6. Motion

Tokens: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`.

- Interactions stay under 300ms and name their properties (never `transition: all`).
- Press: buttons, the WhatsApp trigger and round icon buttons scale to `0.96` on `:active`.
- Hover (gated behind `(hover: hover) and (pointer: fine)`): arrows nudge `translate(2px, -2px)`; nav links grow an underline from the left; specialist photos scale to `1.03`; thumbnails regain colour; inactive tabs tint `#f6f6f6`.
- Entrance: the opening copy of each page rises in once, staggered 100ms (`rise`, 700ms); the hero image fades/scales in (`heroScale`). The mobile menu items stagger 30ms as it slides in (450ms, drawer curve).
- Popovers (WhatsApp panel, cookie card) enter with `@starting-style` from `opacity: 0; translateY(8–16px)`.
- `prefers-reduced-motion` disables all transitions and animations.

### Focus
- `:focus-visible` shows a 2px ring in `--focus` (ink on white; black surfaces set `--focus: #fff`).

## 7. Responsive

| Breakpoint | Changes |
|------------|---------|
| ≤1180px | Nav collapses to the full-screen menu (secondary links and languages move into it); 2-column grids; treatment tabs stack |
| ≤700px | Single column; the homepage hero becomes a normal flow (copy → photo → proof bar); hero CTAs stack full width; footer 2 columns |

Mobile: hero actions stack; keep tap targets ≥44px.

## 8. Logo

- Wordmark: `src/images/prisma/brand/prisma-wordmark.png` (inverted in the footer).
- Monogram: `src/images/prisma/brand/prisma-monogram.png`, used as a faint watermark (opacity ~0.04–0.06) in inner heroes and the homepage intro.

## 9. Agent Prompt Guide

1. Black, white and greys only; red-500 exclusively for emergency call buttons.
2. Playfair Display for headlines (uppercase h1, sentence-case h2 with an italic second line); Raleway 300 for body.
3. Reuse the semantic classes in `src/styles/prisma.css` before writing new CSS; add new ones there, in the same vocabulary.
4. Hairline rules, square corners, no shadows, no decorative icons or Unicode symbols — use numbers (`01`, `02`) and the `<Arrow />` SVG instead.
7. Never set text on top of a photo; give photos their own column (the homepage team photo fades into white on its left edge).
5. Every page starts with a hero that clears the absolute header (`InnerHero`, a split hero, or `.page-offset`).
6. Copy goes in `locales/{en,es,se}.json`; headings with line breaks use `<br></br>` and `<em>` with `t.rich(key, richTags)`.
