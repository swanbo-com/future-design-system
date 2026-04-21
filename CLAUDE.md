@AGENTS.md

# future.ly — design system + landing pages

> Frontend design system and two landing pages for future.ly. Shipped to the platform developer as a **zip**, not deployed from this repo.

## Scope

This repo contains **only** the frontend:

1. `/` — the future.ly parent homepage (waitlist + Pacific Kings kickoff).
2. `/pacific-kings` — the Pacific Kings campaign pitch page (Campaign Zero).
3. The design system that powers them (tokens, typography, brand assets, components).
4. The design-system reference (`/design-system` route — a live React port of the design doc).

**Out of scope for this repo:** backend, database, auth, payments, admin panels, API routes, deployment infra, hosting. The platform dev owns all of that in their own repo and will integrate this design system by receiving a zip.

If something sounds like platform work (Strapi, Clerk, Prisma, Lago, Stripe, Mux, Pusher, webhooks, VPS, Docker, admin dashboards) — it does not live here. Ignore or remove if encountered.

## Delivery model

Work lands in this repo, gets reviewed, then `scripts/build-delivery-zip.sh` produces a dated zip in `deliveries/` that the platform dev drops into their app directory. The dev reconciles any overlap with their own tracked files.

## Stack

- Next.js 16 (App Router, Turbopack dev)
- Tailwind CSS v4 (class-strategy dark mode)
- shadcn/ui + @base-ui/react (CVA + clsx + tailwind-merge)
- Lucide icons, Motion / GSAP for animation
- Self-hosted fonts in `public/fonts/` (Ohno Blazeface, Instrument Sans, JetBrains Mono)
- Playwright for E2E

Nothing server-side. No auth middleware. No database. If `package.json` sprouts `@clerk/*`, `@prisma/client`, `stripe`, `pusher`, `@mux/*`, something has drifted.

## File layout

```
src/
  app/                       # Next App Router pages
    page.tsx                 # Parent homepage
    pacific-kings/page.tsx   # Campaign page
    design-system/page.tsx   # Live design-system reference
    deck/page.tsx            # Pitch deck
    sponsor/page.tsx         # Redirects to /pacific-kings
    privacy, terms, safeguarding/ # Marketing legal pages (content only)
  components/
    ui/                      # shadcn primitives
    brand/                   # Brand primitives (Glyph, TitleFlanker, wordmark)
    design-system/           # Live design-system sections
    landing/                 # Landing-page sections (in-use + _parked/)
  lib/                       # brand constants, utils, gsap helpers
public/
  brand/pacific-kings/       # Brand assets (SVG, PNG, favicon set, _build scripts)
  fonts/                     # Self-hosted OTFs/WOFF2s
  images/pitch/              # Tigasao documentary imagery
docs/
  brand-spec.md              # Brand bible
  logo-wordmark-brief.md     # Wordmark/mark/flanker decisions
  GLYPHS.md                  # Blazeface codepoint table
  DECISIONS.md               # Running decision log
  design-system-reference/   # Archived static HTML reference (read-only)
scripts/
  build-deck.mjs             # Build the pitch deck
  build-delivery-zip.sh      # Package the zip for handoff
```

## Brand — voice and palette

**Voice:** documentary filmmaker. Short, punchy, real. Never charity-guilt or startup-hype.

- Never say: "donate", "help these people", "make a difference", "revolutionary", "amazing".
- Always frame as: exchange, backing, joining, supporting the work, getting something real in return.

**Parent shell palette (neutrals only):**

| Token | Hex | Role |
|-------|-----|------|
| Cream | `#F5F1EA` | Light bg |
| Surface | `#FFFDF8` | Card / panel |
| Ink | `#111111` | Primary text |
| Stone | `#6B645A` | Secondary text |
| Sand | `#CFC4AF` | Borders |
| Vermillion | `#D93A2B` | **Accent / CTA** |
| Vermillion Dark | `#B22D21` | Hover / destructive |

Campaign pages carry their own per-campaign palette (Pacific Kings: red-on-white + cream). See `docs/brand-spec.md`.

**Typography:**
- Display: Ohno Blazeface (9 optical sizes × Roman + Italic) — headlines, campaign title, poster type. Optical-size discipline is mandatory.
- Body/UI: Instrument Sans Variable.
- Mono: JetBrains Mono — canonical `future.ly` wordmark, ledger numerals, tabular figures.

**Ornaments:** Blazeface dingbat vocabulary — see `docs/GLYPHS.md`. Canonical inline mark is the balloon floret `❉` (U+2749). Pair B (U+E002/E003) is the canonical hero title-flanker — **Pair A has been demoted to editorial** (v1.0c).

## Conventions

- Max 200 lines per file; split by responsibility if longer.
- One component per file.
- Path alias: `@/` → `./src/`
- Specific nouns and verbs as file/function names. No `utils.ts`, `helpers.ts`, `misc.ts`.
- Colocate tests with source.
- Index files for public exports only.
- **No stock photography.** Every image is from the real project (Tigasao in `public/images/pitch/`).
- **Dark mode primary** for campaign pages. Light mode primary for informational pages.

## Next.js 16 gotchas

- Arbitrary Tailwind utilities like `aspect-[16/9]` and `md:grid-cols-5` do not always compile under Tailwind v4. Prefer inline `style={{ aspectRatio: "16/9" }}` and explicit CSS rules (see `src/app/globals.css` `.highway-strip-grid`).
- `next/image` optimizer sets `Content-Disposition: attachment` + sandbox CSP by default since v15 — browsers still render these via `<img>`, but direct navigation to the URL will download the file rather than display it. Not a bug.
- `next/image` is `loading="lazy"` by default. Below-the-fold images won't render during fullPage screenshots until scrolled into view. Add `priority` for above-the-fold images; everything else stays lazy.
- Before writing Next-specific code, consult `node_modules/next/dist/docs/` — the installed version's docs, not training data.

## Critical rules (carry over from the brand bible)

1. **No stock photography.**
2. **Safeguarding is real.** Written parental consent required before any content featuring minors goes public. This is a content-ops rule that applies to assets placed in this repo.
3. **Content unlock media is pre-loaded.** Revealed at milestones, not created on the fly.
4. **Every shared link should use a UTM** when produced by the marketing team. Not enforced by this repo, but copy and CTAs should be designed with UTM-aware sharing in mind.
