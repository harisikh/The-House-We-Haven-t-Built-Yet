# Product

## Register

brand

## Users

One reader: **Bebu** — the partner this is made for. She opens it (likely on a phone, possibly desktop) on or after the anniversary, knowing only that it's "a gift." She is not a user completing a task; she is a guest being walked through a place. Her context is private and emotional, not productive. A distant second audience is **"H."** (the maker), who edits config, captions, and the unlock switch before sending it.

The "job to be done" is emotional, not functional: move her through a three-beat arc —
1. *"this looks like a real house"* (a credible architect's blueprint),
2. *"this feels like our house"* (the rooms are about their specific shared life),
3. *"this is actually a love letter"* (the letter writes itself; the house was the envelope).

## Product Purpose

An interactive love letter disguised as an architect's working drawing — a future home that doesn't exist yet, explored room by room, each room holding a short piece of writing about a shared future life. It exists to make an imaginary house feel real enough to be moving. Success is not engagement metrics; success is that she feels seen, and that the final screen lands. Pure vanilla HTML/CSS/JS, runs offline by opening `index.html`, prints to one A4-landscape keepsake.

## Brand Personality

**Tender · handcrafted · quietly precise.** The voice is intimate and a little wry (the Kitchen "ownership papers," the Argument Bench rules), never sentimental-saccharine. Warmth is carried by *light, handwriting, and small human marks* — not by loud color. Two registers coexist with one soul: the blueprint speaks in cool drafting precision; the rooms speak in warm serif-and-handwriting intimacy. Emotional goals, in order: **moved → at-home → delighted.** Optimize every decision for emotion; if a change is more technically correct but less emotional, reject it.

## Anti-references

- **Anything templated or "AI-generated."** If someone could glance at it and say "a tool made that," it has failed.
- **SaaS / landing-page grammar:** per-section uppercase eyebrows, `01/02/03` numbered markers, identical icon-heading-text card grids, hero-metric blocks, gradient text, decorative glassmorphism.
- **Generic romance kitsch:** stock hearts everywhere, script-font overload, pink gradients, confetti.
- **A heavy black rooftop slab, floating centred furniture, label/wall collisions** — the blueprint must read as a real drawing, not a diagram.

## Design Principles

1. **Emotion is the spec.** Every trade-off resolves toward what she feels, not what validates.
2. **Two worlds, one soul.** Crisp architect's sheet vs. warm paper rooms — the contrast is intentional; create warmth with light and human marks, never by recoloring the blueprint.
3. **The content is sacred.** Room names, copy, numbers, order, the letter, the marks (H♥M, "For Bebu ♥", "a home · approx. forever") are verbatim and load-bearing. Rebuild the shell freely; never reword the soul.
4. **Discovered, not announced.** Signs of life, easter eggs, and the love-letter reveal are found, not labeled. Quiet beats loud.
5. **Handcrafted to the millimetre.** Real wall poché, swing arcs, wall-anchored furniture, calm typography lifted off the walls, zero overlaps. Authenticity refined, not removed.

## Accessibility & Inclusion

- **`prefers-reduced-motion`** is honored throughout (crossfade/instant fallbacks for every reveal, draw-in, stagger, and ambient effect).
- **Offline-first:** must run fully from a loose `index.html` with no network; Google Fonts degrade to system fonts gracefully.
- **Print:** the blueprint must print clean to a single A4-landscape page as a framable keepsake.
- **Audio is opt-in:** ambient sound is OFF by default and never autoplays.
- **Targets & motion:** room hotspots and controls remain keyboard-focusable (`role="button"`, `tabindex`); contrast on room *names* stays high (dark ink), while the faint "RM · m²" annotation is intentionally light, as on a real drawing.
- Works on mobile (pannable plan) and desktop; respects the reader's local clock for time-of-day mood.
