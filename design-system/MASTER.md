# Proxima — Design system MASTER

Source of truth for every screen. Tokens live in `src/styles/global.css` (`@theme`).

## Intent

- **Product job**: turn a Cameroonian visitor's Canada dream into a first contact (free evaluation or WhatsApp) within one visit.
- **Users**: 20–40 y.o., French-speaking, mobile-first, WhatsApp-native, wary of immigration scams.
- **Subject world**: the flight Douala (DLA) → Canada (YUL). Boarding passes, departure boards, contrails.
- **Signature**: the red contrail from the logo's X. It reveals behind the hero photo on load (take-off), draws the 5-step journey on scroll with a plane following it, and returns as faint wedges on dark bands. Its job: show progress and direction toward the visa.
- **Ritual**: glance (what Proxima does) → choose a project → see the steps → send a pre-written WhatsApp request.

## Color (light theme — shipped)

| Role | Token | Hex | Use |
| --- | --- | --- | --- |
| Brand blue | `blue` | `#0F70B7` | Trust: links, highlights, selected states, key numbers |
| Blue deep | `blue-deep` | `#0A4F85` | Text on `blue-mist` |
| Blue mist | `blue-mist` | `#E6F0F9` | Soft fills, icon wells |
| Contrail red | `red` | `#E30713` | Primary actions and the contrail signature only |
| Red deep | `red-deep` | `#B8050F` | Primary hover |
| Ink | `ink` | `#0A1F33` | Headings, body |
| Ink soft / mute | `ink-soft` / `ink-mute` | `#3B5268` / `#5D7287` | Secondary text |
| Paper / surface | `paper` / `surface` | `#F5F8FB` / `#FFFFFF` | Page / cards |
| Night | `night` | `#071A2C` | Dark bands, footer, departure board |
| Sky | `sky` | `#8CC4EF` | Accents on night |
| WhatsApp | — | `#1F9D55` | WhatsApp actions only |

Rule: red is never decoration on text blocks. One red primary action per view.

## Dark theme (“Vol de nuit” — planned, not shipped)

Same hue family: base `#071A2C`, surface `#0E2A44`, ink `#EAF2F9`, blue lifted `#4DA3E8`, red lifted `#FF3B47`. The contrail stays red.

## Type

- **Display**: Archivo Variable at `font-stretch: 125%`, weight 800, tight tracking (`.display`). Airport-signage voice. Headlines only.
- **Body**: Archivo Variable at 100% width.
- **Utility**: JetBrains Mono for flight codes, eyebrows, the NCLC board (`.eyebrow`).

## Motion

1. Hero take-off: contrail clip reveal then plane lands in and floats.
2. Journey: contrail `pathLength` bound to scroll, plane follows the path, steps light up when reached.
3. NCLC board: split-flap flip when a value changes.

Plus quiet scroll reveals and Astro view transitions. All respect `prefers-reduced-motion`.

## Components

`btn-primary` (red), `btn-ghost`, `btn-whatsapp`, `.display`, `.eyebrow`, `.container-page`, `.section`, `data-reveal`.

## Anti-patterns

- Purple or generic gradients, glow stacks, emoji icons
- Stats crammed into the first viewport
- Fake client portraits (testimonials use initials)
- Promising a guaranteed visa
- More than one red CTA competing in a view
