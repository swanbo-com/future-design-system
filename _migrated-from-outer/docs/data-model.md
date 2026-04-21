# future.ly — Database Schema & Data Model

**Version:** 2.0 — MVP
**Date:** March 2026

---

## Ownership Model

Two systems, clear ownership. The campaign `slug` is the join key between them.

| System | Owns | Why |
|--------|------|-----|
| **Strapi v5** (Managed PG on DigitalOcean) | All editorial content: campaign narratives, story updates, media, person profiles, exchange tier descriptions, content unlock media, about/safeguarding text | Non-technical team members edit content via Strapi's visual admin. Dynamic zones for flexible layouts. RBAC for admin/editor/photographer. |
| **PostgreSQL** (on VPS) | All transactional data: orders, payments, bids, community wall, funding totals, waitlist, creator shares, content unlock state, founding supporters, webhook logs, UTM/acquisition tracking | Everything involving money, user state, or operational data. Direct PostgreSQL connection from Next.js via connection pool. |
| **Clerk** | Authentication and user identity: email, name, avatar, session tokens | Managed auth service. The `profiles` table extends Clerk's user object with app-specific fields via `clerk_user_id`. |

### The Join Points

- Exchange tiers: descriptions and images live in Strapi; pricing, inventory, and order data live in PostgreSQL. Joined by `campaign.slug`.
- Content unlocks: media and descriptions in Strapi; `is_unlocked` state and trigger logic in PostgreSQL.
- Campaign stories: narrative content in Strapi; `amount_raised_cents`, `supporter_count`, and live status in PostgreSQL.
- Users: identity and auth in Clerk; app-specific profile data in PostgreSQL `profiles` table via `clerk_user_id`.

---

## PostgreSQL Schema (Transactional)

### campaigns

The core entity. One active campaign at a time for MVP.

```sql
create table campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  description text not null,
  hero_image_url text,
  status text default 'draft',           -- draft, live, funded, completed, paused
  funding_goal_cents int not null,
  amount_raised_cents int default 0,
  currency text default 'GBP',
  supporter_count int default 0,
  starts_at timestamptz,
  ends_at timestamptz,                   -- 30-day countdown target
  location text,                         -- e.g. "Siargao, Philippines"
  sport text,                            -- e.g. "skateboarding", "surfing"
  content_lead text,                     -- Name of person responsible for updates
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### campaign_phases

Roadmap phases tied to funding targets. Displayed as visual progress on the campaign page.

```sql
create table campaign_phases (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id),
  title text not null,                   -- e.g. "Phase 1: Proper setups and safety gear"
  description text,
  funding_target_cents int,
  status text default 'upcoming',        -- upcoming, active, funded, completed
  sort_order int default 0,
  created_at timestamptz default now()
);
```

### budget_items

Transparent budget. Every line item is public. Shows planned vs. actual spend.

```sql
create table budget_items (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id),
  phase_id uuid references campaign_phases(id),
  description text not null,             -- e.g. "10x complete skateboard setups"
  amount_cents int not null,
  spent_cents int default 0,
  category text,                         -- equipment, shipping, labor, materials
  sort_order int default 0
);
```

### exchange_tiers

Pricing and inventory for exchange tiers. Descriptions and images come from Strapi.

```sql
create table exchange_tiers (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id),
  title text not null,                   -- e.g. "Premium — Handmade Board"
  description text not null,
  image_url text,
  price_cents int,                       -- null for auction tiers
  price_type text default 'fixed',       -- fixed, auction, donation
  min_donation_cents int,                -- for donation tier
  quantity_total int,                    -- null = unlimited
  quantity_remaining int,
  shipping_note text,                    -- e.g. "Ships worldwide. Allow 6-8 weeks."
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);
```

### auction_items

Premium tier items with time-limited bidding.

```sql
create table auction_items (
  id uuid primary key default gen_random_uuid(),
  tier_id uuid references exchange_tiers(id),
  campaign_id uuid references campaigns(id),
  title text not null,
  description text,
  image_urls text[],
  reserve_price_cents int not null,
  current_bid_cents int default 0,
  bid_count int default 0,
  winner_id text,                        -- Clerk user ID
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text default 'upcoming',        -- upcoming, live, ended, paid, shipped
  created_at timestamptz default now()
);
```

### bids

Individual auction bids. Pusher broadcasts inserts for live bid updates.

```sql
create table bids (
  id uuid primary key default gen_random_uuid(),
  auction_item_id uuid references auction_items(id),
  user_id text not null,                 -- Clerk user ID
  amount_cents int not null,
  created_at timestamptz default now()
);
```

### orders

Every exchange transaction. Full fee breakdown stored per order. UTM/acquisition data for stranger ratio tracking.

```sql
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,                 -- Clerk user ID
  campaign_id uuid references campaigns(id),
  tier_id uuid references exchange_tiers(id),
  auction_item_id uuid references auction_items(id),
  amount_cents int not null,
  platform_fee_cents int not null,        -- £2 flat (200)
  creator_fund_cents int not null,        -- £1 flat (100)
  processing_fee_cents int not null,      -- Stripe ~2.9% + 30p
  net_to_project_cents int not null,
  currency text default 'GBP',
  status text default 'pending',         -- pending, paid, fulfilled, shipped, delivered, refunded
  shipping_address jsonb,
  tracking_number text,
  lago_invoice_id text,
  stripe_payment_intent_id text,
  funder_message text,                   -- optional message for community wall
  is_anonymous boolean default false,
  -- Acquisition / stranger ratio tracking
  acquisition_source text,               -- 'organic', 'direct_share', 'press', 'social_organic', 'paid'
  acquisition_medium text,               -- 'instagram', 'vice', 'email_waitlist', 'reddit', etc.
  utm_source text,                       -- raw UTM param captured at session start
  utm_medium text,
  utm_campaign text,
  is_known_network boolean default false, -- manually flagged by admin or auto-classified
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### story_updates

The living story timeline. Content may be in Strapi (rich editorial) or PostgreSQL (quick updates).

```sql
create table story_updates (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id),
  title text,
  body text not null,                    -- markdown
  media_urls text[],
  media_type text default 'image',       -- image, video, mixed
  is_milestone boolean default false,
  milestone_label text,                  -- e.g. "Phase 1 Complete"
  published_at timestamptz,
  status text default 'draft',           -- draft, published
  created_at timestamptz default now()
);
```

### community_wall_entries

Funder names and messages. Social proof and belonging. Auto-created from orders.

```sql
create table community_wall_entries (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  campaign_id uuid references campaigns(id),
  display_name text,                     -- or "Anonymous"
  city text,                             -- for activity feed: "Sarah from Bristol"
  message text,
  amount_cents int,
  show_amount boolean default false,
  created_at timestamptz default now()
);
```

### profiles

Extends Clerk's user object with app-specific data.

```sql
create table profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,    -- Clerk's user ID
  full_name text,
  email text,
  city text,                             -- for activity feed display
  avatar_url text,
  notification_preferences jsonb default '{"story_updates": true, "campaign_milestones": true}',
  created_at timestamptz default now()
);
```

### content_unlocks

Milestone-triggered content reveals. Media pre-loaded before campaign launch. State tracked here.

**CRITICAL RULE:** `is_unlocked` is write-once. Once set to `true`, it is never set back to `false`, even if refunds drop funding below the milestone threshold.

```sql
create table content_unlocks (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id),
  milestone_percent int not null,         -- 25, 50, 75, 100
  title text not null,
  description text,
  media_urls text[],                      -- pre-loaded content
  media_type text default 'video',        -- video, gallery, message
  teaser_image_url text,                  -- shown while locked
  is_unlocked boolean default false,      -- WRITE-ONCE: false → true only
  unlocked_at timestamptz,
  sort_order int default 0
);
```

### waitlist

Email capture for the "next story" growth engine. Includes UTM tracking for stranger ratio.

```sql
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  source text,                            -- e.g. "campaign_zero_footer", "direct"
  campaign_referred_from text,            -- which campaign page they signed up on
  utm_source text,                        -- for tracking if signup came from known network
  utm_medium text,
  utm_campaign text,
  created_at timestamptz default now()
);
```

### founding_supporters

First 50 backers per campaign receive a numbered badge.

```sql
create table founding_supporters (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,                  -- Clerk user ID
  campaign_id uuid references campaigns(id),
  badge_number int not null,              -- 1-50
  created_at timestamptz default now(),
  unique(campaign_id, badge_number)
);
```

### campaign_media

Media gallery metadata. Actual files stored in Cloudinary/R2.

```sql
create table campaign_media (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id),
  url text not null,
  type text default 'image',             -- image, video
  caption text,
  sort_order int default 0,
  section text,                          -- hero, story, gallery, exchange
  created_at timestamptz default now()
);
```

### creator_shares

Revenue share tracking for photographers and videographers.

```sql
create table creator_shares (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id),
  creator_name text not null,
  creator_email text not null,
  role text not null,                     -- lead_photographer, videographer, contributor
  share_percent numeric(4,2) not null,    -- e.g. 8.00
  total_earned_cents int default 0,
  total_paid_cents int default 0,
  payment_method text,                    -- wise, paypal, bank
  created_at timestamptz default now()
);
```

### creator_payouts

Individual payout records. Distributed monthly, starting 30 days after campaign close.

```sql
create table creator_payouts (
  id uuid primary key default gen_random_uuid(),
  creator_share_id uuid references creator_shares(id),
  amount_cents int not null,
  period_start date not null,
  period_end date not null,
  status text default 'pending',          -- pending, paid, failed
  paid_at timestamptz,
  wise_transfer_id text,
  created_at timestamptz default now()
);
```

### webhook_events

Logs all incoming webhooks for monitoring, debugging, and retry logic.

```sql
create table webhook_events (
  id uuid primary key default gen_random_uuid(),
  source text not null,                   -- 'stripe', 'lago'
  event_type text not null,               -- e.g. 'checkout.session.completed'
  event_id text,                          -- external event ID (for idempotency)
  payload jsonb not null,
  status text default 'received',         -- received, processed, failed, retried
  error_message text,
  attempts int default 1,
  max_attempts int default 4,             -- 1 initial + 3 retries
  next_retry_at timestamptz,             -- exponential backoff: 1min, 5min, 30min
  processed_at timestamptz,
  created_at timestamptz default now()
);

-- Unique constraint for idempotency
create unique index idx_webhook_events_idempotency
  on webhook_events(source, event_id)
  where event_id is not null;
```

---

## Access Control

Authentication is handled by Clerk middleware. Database access control is enforced at the application layer (Next.js server actions and API routes), not via database-level RLS.

### Access Rules (Enforced in Application Code)

| Resource | Public | Authenticated | Admin |
|----------|--------|--------------|-------|
| Campaigns | Read | Read | Read/Write |
| Exchange tiers | Read | Read | Read/Write |
| Orders | - | Own orders only | All orders |
| Bids | Read (transparency) | Read + Create own | All |
| Community wall | Read | Read | Read/Write/Delete |
| Profiles | - | Own profile | All profiles |
| Waitlist | - (insert only) | - | Read |
| Webhook events | - | - | Read/Retry |
| Content unlocks | Read (public state) | Read | Read/Write |
| Gated story updates | Teaser only | Full (if has order) | Full |
| Creator shares | - | - | Read/Write |

### Admin Access

Admin routes (`/admin/*`) are protected by Clerk's role-based access. Admin role is assigned in the Clerk dashboard. All admin API routes check `auth().sessionClaims.role === 'admin'` before processing.

---

## Strapi v5 Content Types

### Campaign Story (Collection Type)

| Field | Type | Notes |
|-------|------|-------|
| title | Text | Campaign title |
| slug | UID | Unique, linked to title |
| hero_image | Media | Full-width cinematic image |
| story_body | Dynamic Zone | Flexible: text blocks, image galleries, video embeds, pull quotes |
| subtitle | Text | One-line description |
| location | Text | e.g. "Siargao, Philippines" |
| sport | Text | e.g. "skateboarding" |
| geo_variants | Component (repeatable) | region, subtitle_override, social_proof_override |

**Dynamic Zone blocks for story_body:**
- `text-block`: rich text paragraph
- `image-gallery`: array of images with captions
- `video-embed`: Mux playback ID, thumbnail, caption
- `pull-quote`: quote text, attribution
- `person-spotlight`: linked Person Profile with inline context

### Story Update (Collection Type)

| Field | Type | Notes |
|-------|------|-------|
| title | Text | Update title |
| body | Rich Text | Markdown content |
| media | Media (multiple) | Images and video |
| campaign | Relation | → Campaign Story |
| is_milestone | Boolean | Milestone flag |
| milestone_label | Text | e.g. "Phase 1 Complete" |
| is_gated | Boolean | Donor-only content |
| published_at | DateTime | |

### Person Profile (Collection Type)

| Field | Type | Notes |
|-------|------|-------|
| name | Text | First name only for minors |
| photo | Media | Documentary-quality portrait |
| role | Enumeration | kid, photographer, videographer, volunteer, team |
| one_line_bio | Text | e.g. "Kael, 11 — rides plywood down a hill and calls it heaven" |
| consent_status | Enumeration | pending, granted, withdrawn |
| consent_date | Date | |
| is_minor | Boolean | Triggers safeguarding rules |
| campaign | Relation | → Campaign Story |

### Content Unlock (Collection Type)

| Field | Type | Notes |
|-------|------|-------|
| milestone_percent | Integer | 25, 50, 75, or 100 |
| title | Text | e.g. "Documentary Teaser" |
| description | Text | What this unlock contains |
| teaser_image | Media | Shown while locked |
| locked_media | Media (multiple) | Video/gallery revealed on unlock |
| mux_playback_id | Text | For video unlocks |
| campaign | Relation | → Campaign Story |

### Exchange Tier (Collection Type)

| Field | Type | Notes |
|-------|------|-------|
| title | Text | e.g. "Standard — Darkroom Print" |
| description | Rich Text | What you get, what the money funds |
| images | Media (multiple) | Product photos |
| shipping_notes | Text | Fulfillment details |
| campaign | Relation | → Campaign Story |
| sort_order | Integer | Display order |

### Campaign Phase (Collection Type)

| Field | Type | Notes |
|-------|------|-------|
| title | Text | e.g. "Phase 1: Proper setups and safety gear" |
| description | Rich Text | What this phase achieves |
| campaign | Relation | → Campaign Story |
| sort_order | Integer | Display order |

---

## Entity Relationship Diagram

```
                    STRAPI                              POSTGRESQL (VPS)
            ┌─────────────────┐                 ┌─────────────────┐
            │ Campaign Story  │←── slug join ──→│   campaigns     │
            │ (content)       │                 │ (state/funding) │
            └───────┬─────────┘                 └───────┬─────────┘
                    │                                   │
         ┌──────────┼──────────┐            ┌───────────┼───────────┐
         │          │          │            │           │           │
    ┌────▼───┐ ┌───▼────┐ ┌──▼──────┐ ┌───▼────┐ ┌───▼────┐ ┌───▼────────┐
    │ Story  │ │ Person │ │Content  │ │exchange│ │campaign│ │budget_items│
    │ Update │ │Profile │ │Unlock   │ │_tiers  │ │_phases │ │            │
    │(Strapi)│ │        │ │(Strapi) │ │        │ │        │ │            │
    └────────┘ └────────┘ └─────────┘ └───┬────┘ └────────┘ └────────────┘
                                          │
                                    ┌─────┴──────┐
                                    │            │
                              ┌─────▼──┐  ┌─────▼──────┐
                              │ orders │  │auction_items│
                              │        │  │             │
                              └───┬────┘  └──────┬──────┘
                                  │              │
                           ┌──────┼────┐    ┌────▼──┐
                           │      │    │    │ bids  │
                      ┌────▼─┐ ┌──▼──┐ │   └───────┘
                      │comm. │ │found│ │
                      │wall  │ │supp │ │
                      └──────┘ └─────┘ │
                                  ┌────▼──────┐
                                  │creator    │
                                  │_shares    │
                                  └─────┬─────┘
                                        │
                                  ┌─────▼─────┐
                                  │creator    │
                                  │_payouts   │
                                  └───────────┘

              ┌────────┐    ┌──────────┐    ┌──────────────┐
              │profiles│    │ waitlist  │    │webhook_events│
              │(Clerk  │    │          │    │              │
              │ extend)│    └──────────┘    └──────────────┘
              └────────┘

                         CLERK (External)
                      ┌────────────────┐
                      │ Users          │
                      │ • email        │
                      │ • name         │
                      │ • avatar       │
                      │ • role (admin) │
                      │ • sessions     │
                      └────────────────┘
```

---

## Indexes (Recommended)

```sql
-- High-traffic queries
create index idx_orders_campaign on orders(campaign_id);
create index idx_orders_user on orders(user_id);
create index idx_orders_status on orders(status);
create index idx_orders_is_known_network on orders(campaign_id, is_known_network);
create index idx_bids_auction on bids(auction_item_id);
create index idx_bids_user on bids(user_id);
create index idx_community_wall_campaign on community_wall_entries(campaign_id);
create index idx_story_updates_campaign on story_updates(campaign_id);
create index idx_content_unlocks_campaign on content_unlocks(campaign_id);
create index idx_exchange_tiers_campaign on exchange_tiers(campaign_id);
create index idx_auction_items_campaign on auction_items(campaign_id);
create index idx_auction_items_status_ends on auction_items(status, ends_at);
create index idx_waitlist_email on waitlist(email);
create index idx_founding_supporters_campaign on founding_supporters(campaign_id);
create index idx_creator_shares_campaign on creator_shares(campaign_id);
create index idx_webhook_events_status on webhook_events(status);
create index idx_webhook_events_source on webhook_events(source, event_type);
create index idx_profiles_clerk_user on profiles(clerk_user_id);
```

---

## Stranger Ratio Queries

```sql
-- Live stranger ratio for a campaign
select
  count(*) filter (where not is_known_network) as stranger_count,
  count(*) as total_count,
  round(
    count(*) filter (where not is_known_network)::numeric / nullif(count(*), 0) * 100,
    1
  ) as stranger_ratio_percent
from orders
where campaign_id = $1
  and status in ('paid', 'fulfilled', 'shipped', 'delivered');

-- Stranger ratio by day (for tracking trend)
select
  date_trunc('day', created_at) as day,
  count(*) filter (where not is_known_network) as strangers,
  count(*) as total,
  round(
    count(*) filter (where not is_known_network)::numeric / nullif(count(*), 0) * 100,
    1
  ) as ratio
from orders
where campaign_id = $1
  and status in ('paid', 'fulfilled', 'shipped', 'delivered')
group by 1
order by 1;

-- Breakdown by acquisition source
select
  acquisition_source,
  acquisition_medium,
  count(*) as order_count,
  sum(amount_cents) as total_cents
from orders
where campaign_id = $1
  and status in ('paid', 'fulfilled', 'shipped', 'delivered')
group by 1, 2
order by 3 desc;
```

---

## Related Documents

| Document | Relevance |
|----------|-----------|
| `future-ly-architecture.md` | What lives where, data flow, API contracts, Pusher channels |
| `future-ly-economics.md` | Fee calculation logic stored in orders table |
| `future-ly-security.md` | Access control, data handling for minors, GDPR |
| `future-ly-launch-plan.md` | Stranger ratio measurement, UTM strategy |
| `campaign-zero-siargao.md` | Seed data for Campaign Zero |

---

*Schema designed for a single-campaign MVP. Multi-campaign support in V2 requires no schema changes — the `campaign_id` foreign keys already support multiple campaigns. Webhook logging and UTM tracking built in from day one for observability and kill-signal measurement.*
