# future.ly — Technical Architecture

**Version:** 2.0 — MVP
**Date:** March 2026
**Boilerplate:** swanbo-com/boilerplate

---

## Architecture Overview

Three core systems with clear separation of concerns:

- **Strapi v5** handles everything content: stories, updates, media, campaign narratives, photographer profiles, editorial content.
- **PostgreSQL** (on VPS) handles everything transactional: orders, payments, auctions, waitlist, user state, webhook logs.
- **Clerk** handles authentication: email link, Google OAuth, session management, user profiles.
- **Next.js 16 (App Router)** sits in front of all three, rendering the platform.

Content flows from Strapi → Next.js (ISR/SSR). Transactional data flows from PostgreSQL → Next.js (server actions + Pusher for realtime). Payments flow through Lago (billing orchestration) → Stripe (processing). Auth flows through Clerk middleware.

```
┌────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                        │
│                Next.js 16 App Router (SSR / ISR)               │
│                   Clerk session middleware                      │
└─────────┬──────────────────────┬──────────────────┬────────────┘
          │                      │                  │
          ▼                      ▼                  ▼
┌─────────────────┐  ┌────────────────────┐  ┌──────────────┐
│   Strapi v5     │  │   PostgreSQL       │  │ Lago + Stripe│
│   (Content)     │  │   (Transactions)   │  │  (Payments)  │
│                 │  │                    │  │              │
│ • Stories       │  │ • Orders           │  │ • Checkout   │
│ • Updates       │  │ • Bids             │  │ • Invoicing  │
│ • Media         │  │ • Community wall   │  │ • Receipts   │
│ • Profiles      │  │ • Waitlist         │  │ • Multi-curr │
│ • Content types │  │ • Funding totals   │  │ • Commissions│
│ • Exchange desc │  │ • Creator shares   │  │              │
│                 │  │ • Webhook events   │  │              │
│   Managed PG    │  │                    │  │              │
│   (DO)          │  │   PostgreSQL (VPS) │  │              │
└─────────────────┘  └────────────────────┘  └──────────────┘
          │                      │
          ▼                      ▼
┌─────────────────┐  ┌────────────────────┐  ┌──────────────┐
│  Cloudinary /   │  │      Resend        │  │   Pusher     │
│  Cloudflare R2  │  │   (Transactional   │  │  (Realtime)  │
│  (Media CDN)    │  │      Email)        │  │              │
└─────────────────┘  └────────────────────┘  └──────────────┘
          │
          ▼
┌─────────────────┐  ┌────────────────────┐  ┌──────────────┐
│   Mux           │  │   Plausible        │  │   Sentry     │
│ (Video Stream)  │  │  (Analytics)       │  │  (Errors)    │
│ HLS delivery    │  │  Self-hosted       │  │              │
│ Adaptive bitrate│  │  on VPS            │  │              │
└─────────────────┘  └────────────────────┘  └──────────────┘
```

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 16 (App Router) | From boilerplate. SSR for SEO. ISR for story pages. Turbopack dev. |
| **Styling** | Tailwind CSS v4 | Rapid UI development. Consistent design system. Dark mode via class strategy. |
| **UI Components** | shadcn/ui + Base UI | From boilerplate. CVA + clsx for variants. Lucide icons. |
| **CMS** | Strapi v5 | Headless CMS for all content. Dynamic zones for flexible story layouts. Visual admin for non-technical creators. RBAC for admin/editor/photographer roles. |
| **Transactional DB** | PostgreSQL (on VPS) | Orders, payments, bids, waitlist, webhook logs. Everything involving money or user state. Direct connection from Next.js via connection pool. |
| **Auth** | Clerk | Email link (low friction) + Google OAuth. Session middleware. User management dashboard. From boilerplate. |
| **Payments** | Lago + Stripe | Lago for billing orchestration (invoicing, receipts, fee calculation, commissions, auction settlements). Stripe for payment processing. Multi-currency handled by Stripe. From boilerplate. |
| **Realtime** | Pusher | Activity feed, live auction bids, funding progress updates. Free tier: 200k messages/day (covers MVP). Three channels: `activity-feed`, `auction-{id}`, `campaign-{id}`. |
| **Media CDN** | Cloudinary or Cloudflare R2 | Image optimisation, responsive sizes. Strapi media library uploads to Cloudinary via plugin. |
| **Video** | Mux | Documentary footage requires adaptive streaming, HLS delivery, thumbnail generation. Per-minute pricing ($0.007/min stored, $0.04/min delivered). Videos served inline, not behind embeds. |
| **Email** | Resend | Transactional (receipts, update alerts, auction notifications) + waitlist notifications. From boilerplate. |
| **Analytics** | Plausible (self-hosted) | Privacy-first. No cookies, no consent banner. Self-hosted in Docker on VPS. Custom events for exchange completions, tier selections, content unlocks, waitlist signups. Not blocked by ad blockers when self-hosted. |
| **Error Monitoring** | Sentry | Next.js SDK. Automatic error capture (server + client). Custom context: campaign_id, order_id, user_id. Payment-path errors → immediate Discord alert. |
| **Uptime** | UptimeRobot or Better Stack | HTTP checks every 60s on campaign page + webhook endpoints. Discord alerts on downtime. Free tier. |
| **Hosting** | DigitalOcean VPS | Docker + Traefik reverse proxy. Blue/green deploys on main, single-container on dev. GitHub Actions CI/CD. From deployment repo. |

### Infrastructure Costs (Estimated)

| Service | Resource | Est. Cost/Month |
|---------|----------|----------------|
| DO VPS (Next.js + Postgres + Plausible) | Droplet (4GB RAM) | $24 |
| Strapi v5 | Separate Droplet or same VPS | $12-24 |
| Strapi database | Managed PostgreSQL (Basic) or on VPS | $0-15 |
| Clerk | Free tier (10k MAU) | $0 |
| Pusher | Free tier (200k msg/day) | $0 |
| Cloudinary | Free tier → Paid | $0-49 |
| Resend | Free tier | $0-20 |
| Mux | Per-minute pricing | $10-50 |
| Sentry | Free tier (5k errors/month) | $0 |
| Plausible | Self-hosted (on VPS) | $0 |
| UptimeRobot | Free tier | $0 |
| **Total** | | **$46-182/month** |

---

## What Lives Where

### Strapi (Content)

Everything editorial, everything a non-technical team member would create or edit:

- Campaign stories and narratives (dynamic zones: text blocks, image galleries, video embeds, pull quotes)
- Story updates and media
- Person profiles (kids, team, photographers) — with consent status
- Content unlock media (pre-loaded before campaign launch)
- Exchange tier descriptions and images
- Budget descriptions
- About page content, safeguarding policy text
- Geo-targeted content variants (localised subtitle and social proof copy)

### PostgreSQL on VPS (Transactions)

Everything involving money, user state, or operational data:

- Orders and payment records (with full fee breakdown)
- Auction bids
- Community wall entries
- Funding totals and supporter counts
- Waitlist signups (with source tracking and UTM data)
- Founding supporter badges (#1-50)
- Creator revenue share tracking and payouts
- Content unlock state (is_unlocked flag, triggered by funding milestones)
- Campaign media gallery metadata
- Webhook event logs (Stripe, Lago)
- Acquisition/UTM tracking data per order

### Clerk (Auth)

- User authentication (email link + Google OAuth)
- Session management (middleware-based)
- User profiles (name, email, avatar)
- The `profiles` table in PostgreSQL extends Clerk's user with app-specific fields (clerk_user_id as foreign key)

### Pusher (Realtime)

Three channels for MVP:

| Channel | Events | Purpose |
|---------|--------|---------|
| `activity-feed-{campaign_id}` | `new-entry` | Live activity feed (new orders) |
| `auction-{item_id}` | `new-bid` | Live auction bid updates |
| `campaign-{campaign_id}` | `funding-update`, `content-unlock` | Progress bar updates, milestone celebrations |

Events are triggered server-side (Next.js API routes / webhook handlers) after database writes.

### The Join Points

Next.js bridges the systems. Campaign pages fetch content from Strapi (ISR, revalidated on update) and live data from PostgreSQL (server components + Pusher for realtime). The `campaign_id` and `slug` are the primary join keys.

Exchange tiers have descriptions and images in Strapi, but pricing, inventory, and order data in PostgreSQL. The Strapi `slug` maps to the PostgreSQL `campaigns.slug`.

---

## Folder Structure

Feature-based architecture per the Code Architecture Principles. Max 200 lines per file. Colocated tests. Path aliases via `@/`.

```
/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (campaign)/               # Campaign route group
│   │   │   ├── page.tsx              # Homepage = active campaign
│   │   │   ├── layout.tsx            # Dark mode campaign layout
│   │   │   └── loading.tsx
│   │   ├── story/[slug]/
│   │   │   └── page.tsx              # Archived living story
│   │   ├── campaign/[slug]/
│   │   │   ├── updates/page.tsx      # Full updates feed
│   │   │   └── budget/page.tsx       # Transparent budget
│   │   ├── auction/[item-slug]/
│   │   │   └── page.tsx              # Auction item + bidding
│   │   ├── checkout/
│   │   │   └── page.tsx              # Payment flow
│   │   ├── me/
│   │   │   └── page.tsx              # Funder dashboard
│   │   ├── about/page.tsx
│   │   ├── wall/[slug]/page.tsx      # Community wall
│   │   ├── next/page.tsx             # Next story waitlist
│   │   ├── admin/                    # Internal admin panel
│   │   │   ├── page.tsx
│   │   │   ├── updates/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── tiers/page.tsx
│   │   │   └── webhooks/page.tsx     # Webhook monitoring
│   │   ├── api/                      # API routes
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/route.ts
│   │   │   │   └── lago/route.ts
│   │   │   ├── auction/bid/route.ts
│   │   │   ├── waitlist/route.ts
│   │   │   └── fulfillment/route.ts
│   │   ├── layout.tsx                # Root layout (Clerk provider)
│   │   └── globals.css
│   │
│   ├── modules/                      # Feature modules (boilerplate convention)
│   │   ├── campaign/
│   │   │   ├── components/
│   │   │   │   ├── CampaignHero.tsx
│   │   │   │   ├── CountdownTimer.tsx
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   ├── StorySection.tsx
│   │   │   │   ├── BudgetBreakdown.tsx
│   │   │   │   └── CampaignPhases.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useCampaign.ts
│   │   │   │   └── useFundingProgress.ts
│   │   │   ├── services/
│   │   │   │   ├── campaign-api.ts
│   │   │   │   └── strapi-content.ts
│   │   │   ├── types/
│   │   │   │   └── campaign.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── exchange/
│   │   │   ├── components/
│   │   │   │   ├── ExchangeTierCard.tsx
│   │   │   │   ├── TierSelector.tsx
│   │   │   │   └── CheckoutForm.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useExchange.ts
│   │   │   ├── services/
│   │   │   │   ├── checkout-api.ts
│   │   │   │   └── lago-client.ts
│   │   │   └── types/
│   │   │       └── exchange.types.ts
│   │   │
│   │   ├── auction/
│   │   │   ├── components/
│   │   │   │   ├── AuctionItem.tsx
│   │   │   │   ├── BidForm.tsx
│   │   │   │   └── BidHistory.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuction.ts
│   │   │   │   └── useBidding.ts       # Pusher subscription
│   │   │   └── services/
│   │   │       └── auction-api.ts
│   │   │
│   │   ├── story/
│   │   │   ├── components/
│   │   │   │   ├── StoryUpdate.tsx
│   │   │   │   ├── UpdateTimeline.tsx
│   │   │   │   ├── ContentUnlock.tsx
│   │   │   │   └── GatedContent.tsx     # Donor-only vs public
│   │   │   ├── hooks/
│   │   │   │   └── useStoryUpdates.ts
│   │   │   └── services/
│   │   │       └── story-api.ts
│   │   │
│   │   ├── community/
│   │   │   ├── components/
│   │   │   │   ├── CommunityWall.tsx
│   │   │   │   ├── ActivityFeed.tsx     # Pusher subscription
│   │   │   │   ├── FoundingBadge.tsx
│   │   │   │   └── SupporterCount.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useActivityFeed.ts
│   │   │   └── services/
│   │   │       └── community-api.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   └── AuthModal.tsx        # Clerk sign-in modal
│   │   │   └── services/
│   │   │       └── auth-api.ts
│   │   │
│   │   ├── waitlist/
│   │   │   ├── components/
│   │   │   │   └── WaitlistSignup.tsx
│   │   │   └── services/
│   │   │       └── waitlist-api.ts
│   │   │
│   │   └── admin/
│   │       ├── components/
│   │       │   └── WebhookMonitor.tsx
│   │       ├── hooks/
│   │       └── services/
│   │
│   ├── components/                   # Shared UI (shadcn + custom)
│   │   ├── ui/                       # shadcn components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── CurrencyDisplay.tsx
│   │   └── VideoPlayer.tsx           # Mux player wrapper
│   │
│   ├── lib/                          # Shared libraries
│   │   ├── db.ts                     # PostgreSQL connection pool
│   │   ├── pusher-server.ts          # Pusher server instance
│   │   ├── pusher-client.ts          # Pusher client instance
│   │   ├── strapi-client.ts
│   │   ├── lago-client.ts
│   │   ├── mux-client.ts
│   │   ├── sentry.ts                 # Sentry init + helpers
│   │   ├── utm.ts                    # UTM capture + stranger ratio logic
│   │   ├── currency-formatting.ts
│   │   ├── date-formatting.ts
│   │   └── fee-calculator.ts
│   │
│   ├── env.js                        # t3-env runtime validation
│   ├── middleware.ts                  # Clerk auth middleware
│   │
│   └── types/                        # Global TypeScript types
│       ├── database.types.ts
│       └── strapi.types.ts
│
├── lago/                             # Lago configuration (from boilerplate)
│   ├── docker-compose.yml
│   └── ...
│
├── strapi/                           # Strapi v5 project (separate deployment)
│   ├── src/
│   │   └── api/
│   │       ├── campaign-story/
│   │       ├── story-update/
│   │       ├── person-profile/
│   │       ├── content-unlock/
│   │       ├── campaign-phase/
│   │       └── exchange-tier/
│   └── config/
│
├── scripts/
│   ├── dev.js                        # Dev server orchestration
│   ├── setup.js                      # Project setup
│   └── close-auctions.ts            # Cron job: close expired auctions
│
├── docker-compose.yml                # Production: Next.js + Postgres + Plausible
├── Dockerfile
├── .dockerignore
├── deploy.sh                         # Blue/green deploy script
├── .github/
│   └── workflows/
│       └── deploy.yml                # CI/CD: build, test, deploy
│
├── docs/                             # Project documentation
├── CLAUDE.md
├── package.json
├── tsconfig.json
└── next.config.js
```

---

## Data Flow

### Campaign Page Load (Homepage)

```
1. Next.js ISR fetches campaign story from Strapi (revalidate: 60s)
2. Next.js server component fetches live data from PostgreSQL:
   - Campaign funding totals, supporter count
   - Exchange tier availability (quantity remaining)
   - Content unlock states
3. Client hydrates with Pusher subscriptions:
   - activity-feed-{campaign_id} (new orders stream in)
   - auction-{item_id} (live bid updates, if auction page)
   - campaign-{campaign_id} (progress bar updates, content unlocks)
4. Geo detection via Cloudflare CF-IPCountry header
   - Currency display converted using cached exchange rates
   - Geo-targeted subtitle and social proof copy from Strapi
5. UTM parameters captured on first visit, stored in cookie for order attribution
```

### Checkout Flow (Fixed-Price Exchange)

```
1. Funder selects exchange tier
2. Auth check → Clerk sign-in modal if not authenticated
3. Collect shipping address (if physical exchange)
4. Display fee breakdown:
   - Tier price (in local currency)
   - Platform fee: £2
   - Creator Fund: £1
   - Processing: ~2.9% + 30p
   - Net to project: remainder
5. Create Lago invoice (fee breakdown, line items)
6. Lago triggers Stripe Checkout session
7. Funder completes payment on Stripe
8. Stripe webhook → Next.js API route:
   a. Log webhook event to webhook_events table
   b. Mark Lago invoice as paid
   c. Create order record in PostgreSQL (with UTM/acquisition data)
   d. Update campaign funding totals
   e. Create community wall entry
   f. Check founding supporter eligibility (#1-50)
   g. Check milestone thresholds → unlock content if crossed (once unlocked, always unlocked)
   h. Trigger fulfillment API (Prodigi/Gelato for prints)
   i. Send confirmation email via Resend
   j. Trigger Pusher events: new activity feed entry, funding update
   k. Report to Sentry on any failure in steps a-j
9. Plausible custom event: exchange_complete (with tier and source)
```

### Auction Flow

```
1. Funder views auction item page
2. Auth required to bid (Clerk)
3. Funder places bid (no charge at bid time)
   - Bid stored in PostgreSQL bids table
   - Validation: bid > current highest + minimum increment
   - Pusher triggers new-bid event to auction-{item_id} channel
4. Auction countdown reaches zero
5. Cron job (node-cron, runs every minute) checks for expired auctions:
   - Determines winner (highest bid)
   - Winner receives Stripe payment link via email (Resend)
   - Winner has 48 hours to pay
6. If unpaid after 48h: next highest bidder receives payment link
7. On payment: same webhook flow as fixed-price (order created, fulfillment triggered)
```

### Content Unlock Flow

```
1. Order webhook updates campaign.amount_raised_cents
2. Server checks: amount_raised_cents / funding_goal_cents >= milestone %
3. If milestone crossed:
   a. Set content_unlocks.is_unlocked = true
   b. Set unlocked_at timestamp
   c. Send push notification to all supporters (via Resend)
   d. Trigger Pusher event: content-unlock on campaign-{campaign_id}
4. Client shows unlocked content (video/gallery/message)
5. Locked content shows teaser thumbnail + "Unlocks at X% funded"

CRITICAL RULE: Once unlocked, always unlocked. Refunds that drop funding
below a milestone do NOT re-lock content. The is_unlocked flag is
write-once (false → true, never true → false).
```

---

## API Contracts

### Strapi v5 REST API

```
GET  /api/campaign-stories?filters[slug][$eq]={slug}&populate=deep
GET  /api/story-updates?filters[campaign][slug][$eq]={slug}&sort=publishedAt:desc
GET  /api/content-unlocks?filters[campaign][slug][$eq]={slug}&sort=milestone_percent:asc
GET  /api/person-profiles?filters[campaign][slug][$eq]={slug}
GET  /api/exchange-tiers?filters[campaign][slug][$eq]={slug}&sort=sort_order:asc
```

### Pusher (Client-Side)

```typescript
import Pusher from 'pusher-js'

const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
})

// Activity feed
const activityChannel = pusher.subscribe(`activity-feed-${campaignId}`)
activityChannel.bind('new-entry', (data: ActivityEntry) => {
  // Add to feed
})

// Auction bids
const auctionChannel = pusher.subscribe(`auction-${itemId}`)
auctionChannel.bind('new-bid', (data: BidUpdate) => {
  // Update bid display
})

// Campaign progress
const campaignChannel = pusher.subscribe(`campaign-${campaignId}`)
campaignChannel.bind('funding-update', (data: FundingUpdate) => {
  // Update progress bar
})
campaignChannel.bind('content-unlock', (data: UnlockEvent) => {
  // Reveal content
})
```

### Pusher (Server-Side — in webhook handlers / API routes)

```typescript
import Pusher from 'pusher'

const pusher = new Pusher({
  appId: env.PUSHER_APP_ID,
  key: env.PUSHER_KEY,
  secret: env.PUSHER_SECRET,
  cluster: env.PUSHER_CLUSTER,
})

// After order creation
await pusher.trigger(`activity-feed-${campaignId}`, 'new-entry', {
  displayName: order.isAnonymous ? 'Someone' : profile.firstName,
  city: profile.city,
  tierTitle: tier.title,
  createdAt: new Date().toISOString(),
})

await pusher.trigger(`campaign-${campaignId}`, 'funding-update', {
  amountRaisedCents: campaign.amountRaisedCents,
  supporterCount: campaign.supporterCount,
})
```

### Next.js API Routes

```
POST /api/webhooks/stripe         # Stripe payment webhooks
POST /api/webhooks/lago           # Lago invoice webhooks
POST /api/auction/bid             # Place auction bid
POST /api/waitlist                # Waitlist signup
POST /api/fulfillment             # Trigger print fulfillment (internal)
```

---

## Error Monitoring & Observability

### Sentry (Error Tracking)

- Next.js SDK with automatic error capture on server and client
- Custom context attached to every error: `campaign_id`, `order_id`, `clerk_user_id`
- Alert rules:
  - Any error in `/api/webhooks/*` → immediate Discord notification
  - Any error in checkout flow → immediate Discord notification
  - Error rate spike (>5 errors/minute) → Discord notification
- Performance monitoring: track slow API routes (webhook handlers, Lago calls)

### Webhook Monitoring (Custom)

All incoming webhooks (Stripe, Lago) are logged to the `webhook_events` table before processing:

```
webhook_events:
  id, source, event_type, payload (jsonb),
  status (received/processed/failed/retried),
  error_message, attempts, processed_at, created_at
```

- Failed webhooks: retry 3x with exponential backoff (1min, 5min, 30min)
- Admin dashboard page (`/admin/webhooks`): failed webhook count, drill-down, retry button
- Daily digest to Discord: webhook success rate, any unresolved failures

### Uptime Monitoring (UptimeRobot / Better Stack)

- HTTP check on campaign page every 60s
- HTTP check on `/api/webhooks/stripe` health endpoint every 60s
- Discord alert on any downtime
- Status page (optional): public status for transparency

### Plausible Analytics (Self-Hosted)

- Self-hosted in Docker on the VPS alongside the app
- No cookies, no consent banner, GDPR-compliant
- Not blocked by ad blockers when served from same domain
- Custom events tracked:

| Event | Properties | Purpose |
|-------|-----------|---------|
| `exchange_complete` | tier, source, currency | Conversion tracking |
| `tier_selected` | tier, source | Funnel: selection → checkout |
| `checkout_started` | tier, source | Funnel: checkout intent |
| `content_unlock_viewed` | milestone_percent | Engagement with unlocks |
| `waitlist_signup` | source, campaign_referred_from | Growth tracking |
| `auction_bid` | item, source | Auction engagement |

- UTM parameters automatically captured by Plausible for source attribution
- API available to pull data into admin dashboard

---

## Deployment

### VPS Architecture (Docker + Traefik)

```
DigitalOcean VPS (4GB+ RAM)
├── Traefik (reverse proxy, auto-SSL via Let's Encrypt)
│   ├── future.ly → Next.js container (production, blue/green)
│   ├── dev.future.ly → Next.js container (dev, single)
│   └── analytics.future.ly → Plausible container
├── Next.js 16 (Docker container)
│   └── Connects to PostgreSQL, Clerk, Stripe, Lago, Pusher, Mux
├── PostgreSQL (Docker container or managed DO database)
│   └── Transactional data, webhook logs
├── Plausible (Docker container)
│   └── Self-hosted analytics
└── node-cron job (inside Next.js container or separate)
    └── Auction close checker (every 60s)

Strapi v5 (separate VPS or same VPS)
├── Strapi application (Docker container)
└── PostgreSQL (Strapi's own database)
```

### CI/CD Pipeline (GitHub Actions)

```
On push to main:
  1. Run linter + typecheck
  2. Run test suite (Vitest)
  3. Build Docker image
  4. Push to registry
  5. SSH to VPS, pull image
  6. Blue/green deploy via deploy.sh
  7. Traefik routes traffic to new container
  8. Health check passes → old container removed
  9. Discord notification: deploy success/failure

On push to dev:
  1. Same build + test
  2. Single-container deploy to dev.future.ly
  3. Discord notification
```

### Environment Variables

```bash
# Next.js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=                    # PostgreSQL connection string
STRAPI_URL=
STRAPI_API_TOKEN=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
LAGO_API_KEY=
LAGO_WEBHOOK_SECRET=
LAGO_API_URL=
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
RESEND_API_KEY=
CLOUDINARY_URL=
NEXT_PUBLIC_MUX_ENV_KEY=
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=    # future.ly
NEXT_PUBLIC_PLAUSIBLE_API_HOST=  # https://analytics.future.ly

# Strapi
DATABASE_URL=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

---

## Scheduled Jobs

### Auction Close Checker

Runs every 60 seconds via `node-cron` (inside the Next.js process or a separate worker container):

```typescript
// scripts/close-auctions.ts
// 1. Query: SELECT * FROM auction_items WHERE status = 'live' AND ends_at <= NOW()
// 2. For each expired auction:
//    a. Determine winner (highest bid)
//    b. Set status = 'ended'
//    c. Generate Stripe payment link for winner
//    d. Send email via Resend with payment link
//    e. Log to webhook_events for tracking
// 3. Also check: auctions ended > 48h ago with status 'ended' (winner hasn't paid)
//    a. Move to next highest bidder
//    b. Send new payment link
```

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Strapi + PostgreSQL (dual system) | Content and transactions have fundamentally different access patterns. Strapi gives non-technical team members a visual CMS. PostgreSQL gives us full control over transactional data. |
| Clerk for auth | Already in the boilerplate. Handles email link + Google OAuth, session management, user dashboard. No password management overhead. |
| Lago for billing orchestration | Handles multi-currency invoicing, fee calculation, receipt generation, commission tracking for creators, and auction settlement invoicing. Already in the boilerplate. Complexity justified by auction settlements, print commissions, and creator revenue share calculations. |
| Pusher for realtime | Simplest managed realtime solution. Free tier covers MVP (200k msgs/day). Three channels needed. Drops into Next.js easily. No infrastructure to manage. |
| Mux for video | Documentary footage needs adaptive streaming (HLS), not YouTube embeds. Mux has the best API, built-in player, and per-minute pricing. Videos play inline in the story scroll. |
| Docker + Traefik on DO VPS | Existing deployment infrastructure. Blue/green deploys for zero downtime. GitHub Actions CI/CD. Cost-predictable. Full control. |
| Plausible (self-hosted) over GA4 | No cookies = no consent banner. GDPR-compliant. Not blocked by ad blockers when self-hosted. Custom events for the specific metrics that matter (stranger ratio, conversion by source). GA4 blocked by ~40% of users. |
| Sentry for errors | Free tier sufficient. Next.js integration is first-class. Payment-path error alerting is critical for a platform handling real money. |
| node-cron for auction jobs | Simple. Runs inside the container. Checks every 60s. No external scheduler needed. |

### Known Issues

- **Strapi v5 memory leak:** Admin panel slows after 48+ hours continuous runtime. Workaround: weekly auto-restart via cron on VPS.
- **Dual system complexity:** Two databases means two sources of truth. Campaign slug is the join key. Document clearly which system owns which data.
- **Pusher free tier limit:** 200k messages/day. If a campaign goes viral, this could be hit. Monitor usage and upgrade to paid ($49/mo) if needed.

---

## Related Documents

| Document | Relevance |
|----------|-----------|
| `future-ly-data-model.md` | Full database schema (PostgreSQL) + Strapi content types |
| `future-ly-project-brief.md` | Project scope, constraints, timeline |
| `CLAUDE.md` | Dev handoff context with architecture summary |
| `future-ly-economics.md` | Payment flow details, fee model, multi-currency |
| `future-ly-launch-plan.md` | Analytics setup, stranger ratio measurement |

---

*Architecture designed for MVP build with Campaign Zero. Docker + Traefik deployment from existing infrastructure. Clerk auth, Lago billing, and Pusher realtime provide managed services where complexity isn't worth self-hosting. Sentry + Plausible + webhook monitoring give full observability from day one.*
