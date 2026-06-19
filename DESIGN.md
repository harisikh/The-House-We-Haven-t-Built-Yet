# Design

> Visual system of record for *The House We Haven't Built Yet*. Two worlds, one soul: a **crisp architect's blueprint** and **warm paper room pages**, on a shared warm-graphite/terracotta ink. Source of truth lives in `css/variables.css`; this document explains intent and usage. Tokens below are the real values in the codebase — keep them in sync if you change either.

## Theme

- **Mood:** intimate, handcrafted, cinematic, premium. A drafting desk by warm lamplight.
- **Two registers:**
  - **Blueprint** (`#screen-blueprint`): a near-white architect's sheet (`#FAFAF8`), dark ink walls/poché, cool-gray hairlines, faint graph grid, **one** warm accent (terracotta). Reads as a real drawing.
  - **Rooms** (`.room-screen`): warm cream paper stock, serif display + clean sans body, deep layered shadow, a soft overhead light source. Intimate and quiet.
- **Surface stack:** dotted "desk" background → paper sheets float on it with grain + vignette overlays → a screen-level light gradient sits behind each page.
- **Time-of-day:** a veil tints the *desk* (never the paper) by the reader's local clock — morning warm, evening golden, night dim/cool — and a cursor-following lamp glow strengthens after dark.

## Color

Warm-graphite ink + drafting-blue + a single terracotta accent. **Identity is fixed — do not re-hue.** Warmth comes from light and ink, not from recoloring surfaces.

### Foundations (`css/variables.css`)
| Role | Token | Value |
|---|---|---|
| Desk bg | `--desk` / `--desk-dark` | `#E7DECC` / `#DCD2BD` |
| Desk grid line | `--desk-line` | `rgba(84,112,138,.10)` |
| Paper | `--paper` / `--paper-warm` | `#F8F3EA` / `#FCF8F0` |
| Paper edge / fold | `--paper-edge` / `--paper-fold` | `#EDE4D3` / `#E3D9C5` |
| Ink (primary text) | `--ink` | `#2C2419` |
| Ink soft / mid / faint / ghost | `--ink-soft`…`--ink-ghost` | `#4E4434` · `#6B5F4C` · `#93876F` · `#BFB49C` |
| Drafting line | `--draft` / `--draft-soft` / `--draft-faint` | `#50708C` · `#8AA1B6` · `#BFCEDB` |
| **Accent — terracotta** | `--terra` / `--terra-soft` / `--terra-faint` | `#AE5232` · `#C9764F` · `rgba(174,82,50,.12)` |
| Materials | `--brass` / `--brass-soft` / `--sage` / `--wood` / `--wood-dark` | `#BC965A` · `#DCC18C` · `#7B9070` · `#6E5840` · `#4E3F2D` |

### Blueprint sub-palette (`css/scene.css`, scoped to `.house-plan`)
`--bp-paper:#FAFAF8` · `--bp-ink:#20242B` (walls/labels) · interior poché `#373C44` · `--bp-line:#474D56` (furniture) · `--bp-hair:#C2C7CE` (hairlines/annotation) · `--bp-accent: var(--terra)`. Annotation grays (`#9AA0A8` "RM · m²") are intentionally faint, as on a real drawing; room **names** stay full-ink for contrast.

### Color rules
- **One accent.** Terracotta is the only warm color on the blueprint — for the title-block monogram, the revision/seal, "comes-alive" tints, and signs of life. Don't add a second accent.
- **Comes-alive:** a visited room warms (`#F8EADF`), its **exterior windows glow brass** (strongest at night), it gets a terracotta ✓; all-seen flips status to "Under Construction" and stamps the seal.
- **Functional warmth only:** sage = thriving/ok, brass = reserved/material, terracotta = love/accent.

## Typography

Pair on a contrast axis: **serif display + geometric sans body + a handwriting voice.** (`css/typography.css`)

- **Serif (display/headings):** `Cormorant Garamond` — weights 300–600, italic available. Used for `.display`, `.room-title`, `.modal-title`, salutations.
- **Sans (body/UI/drafting labels):** `Inter` — 300–600. Body is **weight 300**, line-height ~1.6–2.05. Drafting voice = `.stencil` (uppercase, 0.22em tracking, `--draft`).
- **Hand (intimacy):** `Caveat` — for emotional asides, scene notes, the letter, the "day N of us ♥" counter.
- **Scale:** `--t-xs .72rem` → `--t-5xl 4.4rem`. Display caps at `--t-5xl`; letter-spacing on display ≥ `-0.02em`. Mobile steps the display down a rung.
- **Rules:** body ≤ ~65–75ch; serif headings get even line-breaks; never pair two similar sans/serifs — the three families are the contrast system.

## Spacing & Layout

- **Spacing scale (`--s1`–`--s10`):** 4·8·12·16·24·32·48·64·88·120 px. Vary it for rhythm; don't flatten.
- **Radius:** `--r-sm 3` · `--r-md 6` · `--r-lg 14` · `--r-xl 22`.
- **Sheets:** room pages max-width ~560–600px, generous `clamp()` padding, terracotta margin rule + drafting registration/crop marks in the corners.
- **Blueprint plan:** SVG `viewBox 1240×728`, fixed wide sheet (`min(1180px,96vw)`), horizontally pannable on phones (≤760px) rather than shrunk. **Three-band tiling, zero overlaps:** social row (bottom) → circulation (centre) → private/service (top); Garden spans full width; Rooftop is a light terrace at top-centre. Labels sit in a clear band above each room's furniture — never colliding with walls or furniture.
- **Hierarchy on the plan:** label tiers `.t1` (Living Room, Bedroom — boldest) → `.t2` (Kitchen/Dining/Garden/Rooftop) → `.t3` (circulation) → `.t4` (service: Laundry/Washroom/Wardrobe — lightest). Eye reads social → private → service.
- **Z-index scale (semantic):** content `1–5` → back/badges `200` → modal `500` → ceremony `9000` → grain/vignette overlays `9990–9991`.

## Components

- **Buttons:** `.btn` (dark ink fill, terracotta wipes up from below on hover, arrow nudges, tracking opens on hover); `.btn-line` (underline draws in); `.back-btn` (fixed, top-left).
- **Sheet / room-sheet:** floating paper with layered warm shadow, margin rule, corner crop marks.
- **Blueprint primitives:** `.pl-wall` (poché), `.pl-wall-int` (thinner partitions), `.pl-door` (swing arcs), `.pl-win`/`.glass` (glazed windows — light up when visited), `.frn`/`.frn-fill`/`.frn-soft` (furniture), `.life` (terracotta signs of life), `.rn-fill`/`.rn-label`/`.rn-sub`/`.rn-check`, title block (`H♥M` monogram, sheet `A-101`, revision triangle, scale bar, north arrow, "Every Room Seen ♥" seal).
- **Room scenes:** tactile objects (`.obj` — lamp lights, fridge opens, mirror fogs, washer spins, rain falls), physical not modal; `.scene-note` reveals the object's line.
- **Memory Cabinet:** wood `.cabinet` with `.drawer`s (brass pulls, slide-out on hover, lockable, one writable).
- **Modal:** single `<dialog>`-style overlay with backdrop blur, used only for drawers.
- **Letter:** wax-sealed `.envelope` opens; `.lw` lines reveal one by one.
- **Fixed affordances:** ambient toggle (bottom-left, off by default), hidden 🌻 (bottom-right), time-of-day badge (top-right).

## Motion

- **Easing:** decelerate into place — `--e-out cubic-bezier(.16,1,.3,1)` (out-expo/quint), `--e-soft` for fades, `--e-spring` only for playful pops (seal, envelope). **No bounce/elastic on UI.**
- **Durations:** `--d-1 200` → `--d-5 1600`. Screen transitions ~880–1000ms; line reveals ~720ms.
- **Signature moments:** plan inks itself wall-by-wall; rooms settle in on a soft blur-up; the title's accent rule draws itself; body text arrives **line by line** (staggered); windows warm up room-by-room; first-open ceremony stamps a wax seal.
- **Hover = physical & quiet:** a room warms and lifts a hair on a soft shadow — presence, not flash.
- **Reduced motion is mandatory:** every animation has a crossfade/instant fallback; reveals enhance already-visible defaults (content never gated behind a class that might not fire).

## Imagery & Iconography

- **No raster, no emoji-as-structural-icon, no icon library.** Everything is hand-built inline SVG (keys, door, furniture, scene objects, rooftop) drawn in the drafting line language. The only intentional emoji are the heart `♥/♥️` and the secret 🌻 / drawer pins — emotional glyphs, not UI controls.
- **Texture:** inline SVG paper grain (`--grain`), dotted desk, vignette — all offline-safe data-URIs.

## Constraints (hard)

Pure HTML/CSS/vanilla JS · no framework/bundler/npm · runs offline from `index.html` · Google Fonts via `<link>` only · mobile + desktop · `prefers-reduced-motion` · **blueprint prints to one A4-landscape page** · `PREVIEW_MODE: true` in `js/config.js` stays true during review · content & marks (H♥M, "For Bebu ♥", "a home · approx. forever") are verbatim.
