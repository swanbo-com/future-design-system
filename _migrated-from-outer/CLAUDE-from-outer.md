# CLAUDE.md — future.ly

> Documentary-driven storytelling fundraising platform for grassroots action-sports communities.

## What This Is

A UK CIC-registered platform where one story runs at a time. 30-day countdown. Tangible exchanges (not donations). Living updates. Radical transparency. The homepage IS the campaign.

First campaign: Siargao Skate Kids (Campaign Zero). Filipino kids building skateboards from scrap wood. Documentary-backed.

## Architecture

### Three Systems — Content + Transactions + Auth

**Strapi v5** = content (stories, updates, media, profiles, exchange descriptions).
**PostgreSQL** (on VPS) = transactions (orders, payments, bids, community wall, waitlist, webhook logs).
**Clerk** = authentication (email link, Google OAuth, sessions, user management).
**Next.js 16 App Router** sits in front of all three.

Campaign `slug` is the join key between Strapi and PostgreSQL.

### Stack

- **Framework:** Next.js 16 (App Router) — SSR for SEO, ISR for story pages, Turbopack dev
- **Styling:** Tailwind CSS v4 — dark mode via class strategy
- **UI:** shadcn/ui + Base UI — CVA + clsx for variants, Lucide icons
- **CMS:** Strapi v5 — dynamic zones, RBAC, visual admin for non-technical team
- **DB:** PostgreSQL (on VPS) — transactional data, webhook logs, UTM tracking
- **Auth:** Clerk — email link + Google OAuth, session middleware, admin roles
- **Payments:** Lago (billing orchestration) + Stripe (processing)
- **Realtime:** Pusher — activity feed, auction bids, funding progress (3 channels)
- **Video:** Mux — adaptive streaming, HLS, inline player (not embeds)
- **Media:** Cloudinary or Cloudflare R2
- **Email:** Resend — transactional + waitlist
- **Analytics:** Plausible (self-hosted on VPS) — no cookies, no consent banner
- **Errors:** Sentry — payment-path alerts to Discord
- **Uptime:** UptimeRobot — 60s health checks
- **Hosting:** DigitalOcean VPS — Docker + Traefik, blue/green deploys, GitHub Actions CI/CD
- **Env validation:** @t3-oss/env-nextjs

### Folder Structure

The actual app lives at `app/` (Next.js 16 App Router). Docs + wireframes + archived design system sit at the repo root alongside.

```
future-repo/                  (this repo, swanbo-com/future)
├── CLAUDE.md                 # this file
├── README.md
├── docs/
│   ├── brand-spec.md
│   ├── logo-wordmark-brief.md
│   ├── GLYPHS.md
│   ├── architecture.md, data-model.md, ux-spec.md, …
│   └── design-system-reference/      # ARCHIVED static HTML design system
│       ├── index.html
│       ├── styles.css, tokens.css, fonts.css
│       ├── fonts/                    # 18 patched Blazeface OTFs + 2 WOFF2
│       └── README.md
├── wireframes/               # disposable HTML prototypes
└── app/                      # ← THE NEXT.JS APP
    ├── src/
    │   ├── app/              # App Router — pages, layout, globals.css, fonts.css
    │   ├── modules/          # Feature modules (self-contained)
    │   │   ├── campaign/     # Campaign hero, countdown, progress
    │   │   ├── exchange/     # Tier cards, checkout, Lago integration
    │   │   ├── auction/      # Auction items, bidding, Pusher realtime
    │   │   ├── story/        # Updates timeline, content unlocks, gated content
    │   │   ├── community/    # Wall, activity feed, founding badges
    │   │   ├── auth/         # Clerk sign-in modal
    │   │   ├── waitlist/     # Email capture
    │   │   └── admin/        # Internal admin panel + webhook monitor
    │   ├── components/
    │   │   ├── ui/           # shadcn primitives (button, card, dialog, …)
    │   │   ├── brand/        # shared brand primitives (TitleFlanker, Glyph, …)
    │   │   └── design-system/ # live design system sections (React port of the archived HTML)
    │   ├── lib/              # Shared libraries (db, pusher, strapi, lago, mux, sentry, utm, fees)
    │   └── types/            # Global TS types
    ├── public/
    │   └── fonts/            # 18 patched Blazeface OTFs + 2 variable WOFF2
    ├── components.json       # shadcn config (base-nova style, lucide icons)
    ├── package.json
    ├── tsconfig.json
    └── next.config.ts
```

### Where Things Go

- New feature component? → `app/src/modules/{feature}/components/`
- New shared brand primitive? → `app/src/components/brand/`
- New shadcn primitive? → `app/src/components/ui/` (via `npx shadcn@latest add <name>`)
- New API call? → `app/src/modules/{feature}/services/`
- New hook? → `app/src/modules/{feature}/hooks/` (or `app/src/lib/` if 3+ features use it)
- New page? → `app/src/app/` (App Router)
- New API route? → `app/src/app/api/`

### Running the app

```bash
cd app
npm run dev       # Turbopack dev server, hot reload
npm run build     # production build
npx tsc --noEmit  # typecheck
npm run lint      # eslint
```

Dev server runs on `http://localhost:3000` by default (or `PORT=xxxx npm run dev`). The design system index is at `/` — eventually this moves to `/design-system` and `/` becomes the actual landing page.

## Conventions

- **Max 200 lines per file.** Split by responsibility if longer.
- **One component per file.**
- **Feature-based architecture.** Related code lives together in `modules/`.
- **Colocate tests** with source (`Button.tsx`, `Button.test.tsx`).
- **Index files** for public exports only.
- **Path aliases:** `@/` → `./src/`
- **Naming:** specific nouns and verbs. No `utils.ts`, `helpers.js`, `misc.ts`.

## Brand & Design

**Sources of truth:**
- `docs/brand-spec.md` — full brand specification (colour, voice, product catalog)
- `docs/logo-wordmark-brief.md` — wordmark + mark + ornament decisions (current **v1.6**)
- `docs/GLYPHS.md` — Blazeface codepoint table and use rules
- `docs/design-system-reference/index.html` — archived HTML reference, read-only
- `app/src/components/design-system/` — **live canonical React port**, served at `http://localhost:3178` via `cd app && npm run dev`

### Palette

Cream + ink + vermillion. **Navy and teal are not part of this system.** Two colours max on any physical product.

| Token | Hex | Role |
|-------|-----|------|
| Cream | `#F5F1EA` | Light-mode background |
| Surface | `#FFFDF8` | Card / panel background |
| Ink | `#111111` | Primary text, rules |
| Stone / Mute | `#6B645A` | Secondary text |
| Sand / Rule | `#CFC4AF` | Borders, subtle dividers |
| Kraft | `#C4A882` | Print materials background |
| **Vermillion** | `#D93A2B` | **Accent / primary CTA** |
| Vermillion Dark | `#B22D21` | Hover state, destructive |
| Amber | `#D97706` | Secondary accent (sparing) |

Dark-mode campaign pages use ink `#0F0F0F` bg, cream `#FAFAF9` text, vermillion accent unchanged.

### Typography

- **Display — Ohno Blazeface** (OH no Type Co, 18 cuts: 9 optical sizes × Roman + Italic). Used for the `PACIFIC KINGS` campaign hero, section titles, story panel, merch, poster headlines. §4a optical-size discipline is mandatory — never use a cut at a rendering size it wasn't drawn for.
- **Body / UI — Instrument Sans** (Rodrigo Fuenzalida). Campaign page body copy, form fields, button labels, nav, UI chrome.
- **Mono — JetBrains Mono Bold**. Used for the **canonical `future.ly` wordmark**, ledger amounts, milestone cascade figures, transparency numerals (`font-variant-numeric: tabular-nums` where figures need to align).

All three are **self-hosted** in `app/public/fonts/` — no Google Fonts CDN, no external network requests (matches the Plausible / cookies-free posture).

### Marks & ornaments

Blazeface ships a vocabulary of real glyph marks. Each has a specific role — see `docs/GLYPHS.md` for the full table and §4c of the logo brief. Headlines:

- **Balloon floret `❉` (U+2749)** — **canonical inline mark.** Dividers, bullets, flankers, countdown, seal. Also used at 56 px as the sticker seal hero.
- **8-point star `✸` (U+2738)** — heritage surf-poster mark, used sparingly in retro contexts.
- **12-point star `✹` (U+2739)** — star-stamp alternate (Lockup B4).
- **CTA arrow `➤` (U+27A4)** — primary CTA affordance on story panels, mailer origin lines, press-kit kickers.
- **Return arrow `➥` (U+27A5)** — the only editorial link glyph ("back to all updates").
- **Closing flourish `➾` (U+27BE)** — end-of-story mark, press-kit kicker flankers.
- **Writing hand `✍` (U+270D)** — founder/editor voice, "Note from John" updates.
- **Editor's nib `✒` (U+2712)** — correction / "edited for length" lines.
- **Fleuron pairs (U+E000–U+E009)** — five mirrored left/right pairs, **patched into the OTF cmaps** (the foundry shipped them orphaned at plane-15 PUA). Reserved strictly for the **title-flanker slot** — never as bullets. Pair A is canonical hero, Pair D canonical secondary; the rest earn their keep at smaller editorial scale.

### Voice

Documentary filmmaker. Short, punchy, real. Never charity-guilt or startup-hype.

**Never say:** "donate", "help these people", "make a difference", "revolutionary", "amazing".

**Always frame as:** exchange, backing, joining, supporting the work, getting something real in return.

### Dark-mode posture

Campaign pages (the one-story-at-a-time live campaign view) are **dark-mode primary** — ink bg, cream text, vermillion CTA. Informational pages (sponsor landing, about, press kit, FAQ) are **light-mode primary** — cream bg, ink text. Both modes use the same vermillion for accent and CTA.

## Key Business Logic

### Fee Calculation (per order)

```
Platform fee:    £2 flat (200 cents)
Creator Fund:    £1 flat (100 cents)
Processing:      ~2.9% + 30p (Stripe)
Net to project:  amount - platform - creator - processing
```

Logic in `src/lib/fee-calculator.ts`.

### Exchange Tiers

| Tier | Price Model | Supply |
|------|-------------|--------|
| Premium | Auction (reserve ~£200) | Scarce (5-10) |
| Standard | Fixed (£25-50) | Unlimited |
| Personal | Fixed (£10-15) | Scales with community |
| Supporter | Donation (min £5) | Unlimited |

### Engagement Mechanics

- **Countdown:** 30-day. Days:Hours:Minutes (not seconds).
- **Activity feed:** Pusher realtime. First name + city. Last 10 entries.
- **Progress bar:** Milestones at 25/50/75/100% with content unlocks.
- **Founding supporters:** First 50 backers get numbered badge.
- **Content unlocks:** Pre-loaded. Revealed at milestones. Public (for sharing). **Once unlocked, always unlocked** (write-once, never re-locked even if refunds drop below milestone).
- **Gated updates:** Donor-only progress updates. Non-donors see teaser + blur.

### Multi-Currency

- Base currency: GBP (all internal accounting)
- Display: GBP, USD, EUR, AUD, CAD at launch
- Detection: Cloudflare `CF-IPCountry` header → cached exchange rates
- Stripe handles actual conversion at checkout

### UTM / Stranger Ratio Tracking

- Every shared link gets a UTM (`?utm_source=john&utm_medium=direct`)
- UTM captured on first visit, stored in cookie, attached to order at checkout
- Auto-classified: `john/rick/janiece` = known_network, `bren_ig/vice/reddit/organic` = stranger
- Admin can manually override classification
- Stranger ratio = most important distribution metric (target: 50%+ at day 7)
- Logic in `src/lib/utm.ts`

## Data Flow Patterns

### Campaign page load:
1. ISR fetch campaign story from Strapi (revalidate 60s)
2. Server component fetch live data from PostgreSQL (funding totals, tier availability, unlock states)
3. Client: Pusher subscriptions (activity feed, bids, funding total, content unlocks)

### Checkout:
1. Select tier → Clerk auth check → collect shipping → show fee breakdown
2. Create Lago invoice → Stripe Checkout session
3. Stripe webhook → log to webhook_events → create order (with UTM) → update totals → check milestones → trigger fulfillment → send email → trigger Pusher events
4. Plausible custom event: exchange_complete

### Auction:
1. Bid stored in PostgreSQL (no charge) → Pusher broadcast
2. Cron job (node-cron, every 60s) closes expired auctions → winner gets Stripe payment link (48h to pay)
3. Unpaid → next highest bidder

### Webhook handling:
1. All webhooks logged to `webhook_events` table before processing
2. Idempotency via `event_id` unique constraint
3. Failed webhooks: 3 retries with exponential backoff (1min, 5min, 30min)
4. Admin dashboard (`/admin/webhooks`) for monitoring and manual retry

## Critical Rules

1. **No stock photography.** Every image is real, from the actual project.
2. **Safeguarding is a launch blocker.** Written parental consent for all minors before any content goes public.
3. **Separate exchanges from donations** in payment system from day one (VAT treatment differs).
4. **All fund transfers to external bodies require CIC Regulator consent.**
5. **Content unlock media is pre-loaded before campaign launch.** Revealed, not created on the fly.
6. **Content unlocks are permanent.** Once `is_unlocked = true`, never set back to false.
7. **Every webhook is logged** to `webhook_events` before processing. Idempotent via event_id.
8. **Every shared link gets a UTM.** No naked links. Stranger ratio depends on this.
9. **Strapi v5 known issue:** Memory leak after 48h+ runtime. Set up weekly auto-restart via cron.

## Monitoring

- **Sentry:** Payment-path errors → immediate Discord alert. Custom context: campaign_id, order_id, clerk_user_id.
- **Webhook monitor:** `/admin/webhooks` — failed count, drill-down, manual retry. Daily Discord digest.
- **Plausible:** Self-hosted. Custom events for exchange_complete, tier_selected, waitlist_signup, etc.
- **UptimeRobot:** 60s checks on campaign page + `/api/health` endpoint.

## Testing

- Integration tests for critical paths: auth → checkout → order creation → fulfillment trigger → webhook logging
- Unit tests for fee calculation, milestone detection, bid validation, UTM classification
- E2E for full funder journey (Playwright)
- Webhook retry logic tested as first-class concern
- See `@future-ly-testing.md`

## Related Docs

- `future-ly-project-brief.md` — scope, goals, personas, timeline
- `future-ly-architecture.md` — full technical architecture, data flow, API contracts
- `future-ly-data-model.md` — complete PostgreSQL schema + Strapi content types
- `future-ly-brand-spec.md` — visual identity, voice, colour palette
- `future-ly-content-strategy.md` — content pipeline, gating model
- `future-ly-economics.md` — payment model, creator payouts, projections
- `future-ly-ux-spec.md` — emotional design, animations, accessibility
- `future-ly-testing.md` — testing strategy, critical paths
- `future-ly-security.md` — safeguarding, GDPR, payment security, error monitoring
- `future-ly-launch-plan.md` — analytics, UTM strategy, stranger ratio measurement
- `campaign-zero-siargao.md` — Campaign Zero specifics
- `wireframe-editorial-scroll.html` — editorial scroll wireframe (dev handoff ready)
