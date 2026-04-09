# Prisma Clinic Marbella — Design System

## 1. Brand Identity

Prisma Clinic Marbella (PRISMA) is a cosmetic & general dentistry and advanced aesthetics clinic in the heart of Marbella. The brand experience is defined by refined luxury, medical expertise, and timeless elegance. Every touchpoint — from the website to social media — should feel like visiting a high-end wellness destination, not a clinical office.

**Brand voice:** Warm, confident, elevated. Professional without being cold. Luxurious without being ostentatious.

**Design philosophy:** Warm minimalism. Generous whitespace, muted earth tones, and restrained typography create a sense of calm and trust. Accents are used sparingly to guide attention without competing for it.

## 2. Color Palette

### Brand Colors (from Brandbook)

| Name | Hex | Role |
|------|-----|------|
| **Mocha** | `#846652` | Primary accent — warm brown used for headings, accent borders, highlights, and interactive elements. The signature brand tone. |
| **Taupe** | `#958B81` | Secondary/muted — subtle text, captions, borders, and inactive states. Sophisticated neutral warmth. |
| **Sand** | `#CEC2B5` | Surface/canvas — warm beige for page backgrounds, section fills, and card surfaces. The "cream" of the brand. |
| **Forest** | `#32351A` | Primary text — deep dark olive for headings and body text. Rich and grounded, not a cold black. |
| **White** | `#FFFFFF` | Clean surface — cards, modals, areas needing maximum contrast against sand backgrounds. |
| **Black** | `#000000` | Minimal use — reserved for high-contrast text in specific contexts (footer, overlays). |

### Extended Palette

Derived from the core palette for UI needs:

| Token | Value | Use |
|-------|-------|-----|
| `sand-light` | `#DDD4C9` | Lighter sand for hover states, subtle fills |
| `sand-dark` | `#B8AA9C` | Darker sand for pressed states, deeper surfaces |
| `mocha-light` | `#9A8070` | Lighter mocha for hover accents |
| `mocha-dark` | `#6E523F` | Darker mocha for pressed/active accent states |

### Semantic Colors

| Role | Value | Notes |
|------|-------|-------|
| **Emergency/Urgent** | Tailwind `red-500` (`#ef4444`) | Standard red for medical urgency — not the brand accent. Used for emergency CTA borders and badges. |
| **Success** | `#5A7A5E` | Warm muted green, nature-aligned with the brand |
| **Warning** | `#C4943A` | Warm amber |
| **Info** | `#6B8CA6` | Muted slate blue |

### Surface Scale (Current Implementation)

The codebase currently uses a warm cream surface scale. These should trend toward the brandbook Sand (`#CEC2B5`):

| Token | Current Value | Notes |
|-------|---------------|-------|
| `surface-100` | `#f7f7f4` | Lightest surface |
| `surface-200` | `#f2f1ed` | Primary page background |
| `surface-300` | `#ebeae5` | Button default, subtle emphasis |
| `surface-400` | `#e6e5e0` | Card backgrounds |
| `surface-500` | `#e1e0db` | Deeper emphasis |

## 3. Typography

### Font Families (from Brandbook)

| Role | Font | Style | Fallbacks |
|------|------|-------|-----------|
| **Display / Headlines** | Dream Avenue | Decorative script | cursive, serif |
| **Body / UI** | Raleway | Regular (400) | system-ui, -apple-system, sans-serif |
| **Body Light** | Raleway | ExtraLight (200) | system-ui, -apple-system, sans-serif |

**Dream Avenue** is a flowing, elegant script typeface used exclusively for display moments — hero headlines, section titles, and brand signatures. It communicates luxury and personal touch. Never use it for body text or UI labels.

**Raleway** is a clean, geometric sans-serif with excellent readability. The Regular weight handles body text, buttons, and navigation. ExtraLight provides an airy, sophisticated voice for subheadings, pull quotes, and decorative labels.

### Current Implementation

The codebase currently uses **Mona Sans** (variable font, weight 200–900) as the primary typeface via `@font-face`. It serves both `--font-sans` and `--font-display` roles. This should be migrated toward the brandbook fonts.

### Hierarchy

| Role | Font | Size | Weight | Letter Spacing | Use |
|------|------|------|--------|----------------|-----|
| Display Hero | Dream Avenue | 48–72px | 400 | normal | Hero headlines, brand statements |
| Section Title | Dream Avenue | 32–40px | 400 | normal | Section introductions |
| Heading 1 | Raleway | 28–36px | 600 | -0.02em | Page headings, service titles |
| Heading 2 | Raleway | 22–28px | 600 | -0.01em | Sub-sections, card headings |
| Heading 3 | Raleway | 18–22px | 600 | normal | Small headings, list titles |
| Body | Raleway | 16–18px | 400 | normal | Paragraphs, descriptions |
| Body Light | Raleway | 16–18px | 200 | 0.02em | Subheadings, pull quotes, decorative labels |
| Button Label | Raleway | 14–16px | 500 | 0.05em | Button text, CTAs |
| Caption | Raleway | 12–14px | 400 | 0.02em | Meta text, timestamps, fine print |
| Micro | Raleway | 11–12px | 500 | 0.05em | Badges, tags, uppercase labels |

### Principles

- **Script for soul, sans for structure.** Dream Avenue creates emotional moments; Raleway handles everything functional.
- **Weight restraint.** Raleway hierarchy relies on size and spacing more than weight. Regular (400) for body, SemiBold (600) for headings, ExtraLight (200) for decorative elegance.
- **Generous line height.** Body text at 1.6–1.75 line-height for comfortable reading. Headings tighter at 1.2–1.3.
- **Uppercase sparingly.** Reserve all-caps for micro labels, badges, and navigation items. Never for body text or headings.

## 4. Component Styling

### Buttons

**Primary CTA**
- Background: `#846652` (Mocha)
- Text: `#FFFFFF` (White)
- Padding: 12px 24px
- Radius: 8px
- Hover: `#6E523F` (Mocha Dark)
- Font: Raleway 500, 14–16px, letter-spacing 0.05em
- Transition: background-color 150ms ease

**Secondary CTA**
- Background: transparent
- Text: `#846652` (Mocha)
- Border: 1px solid `#846652`
- Padding: 12px 24px
- Radius: 8px
- Hover: background shifts to `#846652` at 10% opacity
- Font: Raleway 500, 14–16px

**Emergency CTA**
- Background: `#FFFFFF` or `surface-100`
- Text: `red-500`
- Border: 1px solid `red-500`
- Hover: background `red-500`, text white
- Transition: background-color 150ms, color 150ms

**Ghost / Tertiary**
- Background: transparent
- Text: `#958B81` (Taupe)
- Hover: text shifts to `#846652` (Mocha)
- No border

### Cards

- Background: `#FFFFFF` or `surface-100`
- Border: 1px solid `#CEC2B5` (Sand) or `rgba(50, 53, 26, 0.08)`
- Radius: 12px
- Shadow: `0 2px 12px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02)`
- Hover: shadow intensifies to `0 8px 32px rgba(0, 0, 0, 0.08)`
- Padding: 24–32px

### Navigation

- Background: warm cream surface with backdrop blur
- Font: Raleway 500, 14px
- Text: `#32351A` (Forest)
- Active link: `#846652` (Mocha) with subtle underline or weight shift
- CTA button: Primary style (Mocha bg, white text)
- Mobile: slide-out panel on warm cream surface

### Forms & Inputs

- Background: `#FFFFFF`
- Border: 1px solid `#CEC2B5` (Sand)
- Focus border: `#846652` (Mocha)
- Text: `#32351A` (Forest)
- Placeholder: `#958B81` (Taupe)
- Radius: 8px
- Padding: 12px 16px
- Label: Raleway 500, 14px, `#32351A`

## 5. Layout Principles

### Spacing

- Base unit: 8px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128px
- Section padding: 64–96px vertical on desktop, 40–64px on mobile
- Container max-width: ~1200px, centered

### Grid

- 12-column grid on desktop
- 2-column for service cards, comparison layouts
- Single column on mobile
- Generous gutters: 24–32px

### Whitespace Philosophy

Whitespace is a luxury signal. The warm Sand/cream backgrounds give empty space texture and warmth — large open areas feel intentional and inviting, not empty. Prefer fewer elements with more breathing room over dense layouts.

### Border Radius Scale

| Level | Value | Use |
|-------|-------|-----|
| Subtle | 4px | Small inline elements, tags |
| Standard | 8px | Buttons, inputs, small cards |
| Comfortable | 12px | Cards, content containers |
| Rounded | 16px | Featured cards, image frames |
| Pill | 9999px | Pill buttons, badges, tags |

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow | Page background, inline text |
| Subtle (1) | `0 1px 3px rgba(0,0,0,0.04)` | Default cards, inputs |
| Raised (2) | `0 4px 16px rgba(0,0,0,0.06)` | Hover cards, dropdowns |
| Elevated (3) | `0 8px 32px rgba(0,0,0,0.08)` | Modals, popovers, featured elements |
| Overlay | `0 16px 48px rgba(0,0,0,0.12)` | Full-screen overlays, lightboxes |

Shadow philosophy: Subtle and diffused. Shadows should feel like natural light, never hard-edged. The warm surface backgrounds reduce the need for heavy shadows — tonal shifts between Sand and White already create visual separation.

## 7. Interaction & Motion

### Hover States
- Buttons: smooth background/color transition (150ms ease)
- Cards: shadow elevation increase + subtle scale (1.01) on hover
- Links: color shift to Mocha (`#846652`) or underline fade-in
- Images: subtle scale (1.03) with overflow hidden, 300ms ease

### Focus States
- Ring: 2px solid `#846652` with 2px offset
- Inputs: border color transition to Mocha
- Consistent warm tone — no cold blue focus rings

### Transitions
- Color/opacity: 150ms ease
- Shadow/transform: 200ms ease
- Layout shifts: 300ms ease
- Page transitions: fade-in 400ms with subtle upward translate

### Scroll Animations
- Elements fade in and translate up (20px) on scroll intersection
- Stagger delay of 100–150ms between sibling elements
- Use `prefers-reduced-motion` to disable all motion

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, reduced padding, stacked CTAs |
| Tablet | 640–1024px | 2-column grids, sidebar collapses |
| Desktop | >1024px | Full layout, max content width |

### Mobile Specifics (from learned preferences)
- Hero CTAs: keep primary and secondary on one row with smaller padding and type so both fit
- Dream Avenue display sizes scale down proportionally (72px → ~36px)
- Touch targets: minimum 44px height for buttons and interactive elements
- Section spacing compresses: 96px → 48–64px

### Image Treatment
- Service/treatment photos: warm color grading, natural lighting
- Rounded corners (12–16px) with subtle border
- Responsive: maintain aspect ratio, never crop faces
- Lazy loading with blur placeholder

## 9. Logo Usage

Two variants per the brandbook:
- **Full logo**: used for website header, signage, flyers
- **Compact mark**: used for social media, watermarks, small stamps (favicon)

Minimum clear space: equal to the height of the "P" in PRISMA on all sides.

## 10. Agent Prompt Guide

### Quick Color Reference
- Page background: Sand `#CEC2B5` or current `surface-200` (`#f2f1ed`)
- Primary text: Forest `#32351A`
- Secondary text: Taupe `#958B81`
- Primary accent: Mocha `#846652`
- Emergency: Tailwind `red-500` (`#ef4444`)
- Cards/white surface: `#FFFFFF`
- Borders: Sand `#CEC2B5` or `rgba(50, 53, 26, 0.08)`

### Example Component Prompts

- "Create a hero section with warm cream background (`surface-200`). Headline in Dream Avenue at 48–72px, color `#32351A`. Subtitle in Raleway ExtraLight 18px, color `#958B81`. Primary CTA button (Mocha `#846652` bg, white text, 8px radius, 12px 24px padding). Secondary CTA with Mocha border, transparent bg."

- "Design a service card: white bg, 1px border `#CEC2B5`, 12px radius, subtle shadow. Title in Raleway 600 at 22px, color `#32351A`. Description in Raleway 400 at 16px, color `#958B81`. Link accent in `#846652`."

- "Build navigation: sticky warm cream bg with backdrop blur. Raleway 500 at 14px for links, `#32351A` text. CTA button right-aligned with Mocha bg (`#846652`) and white text. Emergency button with `red-500` border and text."

### Iteration Guide

1. Always use warm earth tones — never pure white backgrounds for main surfaces; use Sand/cream instead
2. Two fonts, two voices: Dream Avenue for display/emotional moments, Raleway for everything functional
3. Mocha (`#846652`) is the primary accent — use it for CTAs, links, and interactive elements
4. Forest (`#32351A`) for text, not pure black — keeps everything warm
5. Emergency elements use standard `red-500`, not brand accent colors
6. Shadows are diffused and subtle — the warm surface tones do most of the visual separation work
7. Mobile CTAs stay on one row; use smaller padding and type to fit both
8. No decorative icons when sections already have enough visual weight — keep it clean
9. Generous whitespace is intentional — it signals luxury and calm
10. Dream Avenue should never appear in body text, buttons, or UI controls — it's strictly decorative display
