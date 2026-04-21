# future.ly — Testing & QA Strategy

**Version:** 2.0 — MVP
**Date:** March 2026
**References:** Testing & QA Strategy (principles), Code Architecture Principles

---

## Testing Philosophy

Tests are how Claude (and you) verify that code works. Without tests, AI-assisted development becomes AI-assisted guessing.

**The ratio:** ~70% integration tests, ~20% unit tests, ~10% E2E tests.

**The minimum viable testing for MVP:**
1. Critical paths have integration tests
2. Complex logic has unit tests
3. Every bug fix includes a regression test

---

## Critical Paths

These are the flows where failure = broken product or lost money. They get the most testing attention.

### 1. Authentication Flow

| Test | Type | What to Verify |
|------|------|---------------|
| Clerk email link triggers | Integration | Email sent via Clerk, link contains valid token |
| Email link login completes | Integration | Clerk session created, profile row created/updated in PostgreSQL |
| Google OAuth login | Integration | OAuth flow completes, Clerk session created, profile synced |
| Unauthenticated user can browse | Integration | Campaign page loads without auth, exchange tiers visible |
| Auth required for checkout | Integration | Redirect to Clerk sign-in modal when clicking "Support this story" without session |
| Auth required for bidding | Integration | Bid attempt without session returns 401 |
| Admin role check | Integration | Non-admin user accessing `/admin/*` gets redirected |

### 2. Payment & Checkout Flow (Highest Priority)

| Test | Type | What to Verify |
|------|------|---------------|
| Fee calculation | Unit | £2 platform + £1 creator + processing = correct for every tier price |
| Lago invoice creation | Integration | Invoice created with correct line items, amounts, currency |
| Stripe Checkout session | Integration | Session created with correct amount, success/cancel URLs |
| Stripe webhook processing | Integration | `checkout.session.completed` → order created in PostgreSQL |
| Webhook event logging | Integration | Every webhook logged to `webhook_events` before processing |
| Webhook idempotency | Integration | Same webhook delivered twice (same `event_id`) → only one order created |
| Order record accuracy | Integration | All fee fields populated correctly, net_to_project calculated right |
| UTM capture on order | Integration | UTM cookie values written to order's utm_source/utm_medium/utm_campaign fields |
| Stranger ratio classification | Unit | Auto-classification logic: john→known, bren_ig→stranger, organic→stranger |
| Campaign totals update | Integration | `amount_raised_cents` and `supporter_count` increment after payment |
| Multi-currency display | Integration | Prices display in detected currency, Stripe charges in local currency |
| Payment failure handling | Integration | Failed payment → user sees clear error, no order created, no totals updated |
| Refund flow | Integration | Stripe refund → order status = 'refunded' → totals decremented |
| Refund does not re-lock content | Integration | Refund drops funding below milestone → `content_unlocks.is_unlocked` stays true |

### 3. Content Gating

| Test | Type | What to Verify |
|------|------|---------------|
| Donor-gated updates | Integration | Authenticated user with order sees full content; user without order sees teaser + blur |
| Public milestone unlocks | Integration | Unlocked content visible to everyone (no auth required) |
| Milestone detection | Unit | Correct milestone triggered when funding crosses 25/50/75/100% threshold |
| Content unlock state change | Integration | `is_unlocked` flips to true, `unlocked_at` set, Pusher event broadcast |
| Content unlock is permanent | Unit | `is_unlocked` cannot be set back to false (write-once) |
| Edge case: exact threshold | Unit | Funding hitting exactly 75.00% triggers 75% unlock |

### 4. Auction & Bidding

| Test | Type | What to Verify |
|------|------|---------------|
| Bid validation | Unit | Bid must exceed current highest + minimum increment. Bid below reserve rejected. |
| Bid creation | Integration | Bid stored in PostgreSQL, `auction_items.current_bid_cents` updated, `bid_count` incremented |
| Pusher bid broadcast | Integration | New bid triggers Pusher event on `auction-{item_id}` channel |
| Bid rate limiting | Integration | Same user bidding twice within 5 seconds → second bid rejected |
| Auction close (cron) | Integration | Cron job finds expired auctions, determines winner, sends payment link email |
| Unpaid winner fallback | Integration | After 48h unpaid, next highest bidder receives payment link |
| Auction item status transitions | Unit | upcoming → live → ended → paid → shipped |
| Concurrent bid handling | Integration | Two bids arriving simultaneously: only highest wins, no race condition |

### 5. Exchange Fulfillment

| Test | Type | What to Verify |
|------|------|---------------|
| Print fulfillment trigger | Integration | Paid order for Standard tier → Prodigi/Gelato API called with image URL + shipping address |
| Fulfillment API error handling | Integration | API failure → order stays in 'paid' status, Sentry alert, retry scheduled |
| Fulfillment retry logic | Integration | 3 retries with exponential backoff (5min, 30min, 2hr). After 3 failures: admin notified. |
| Order status updates | Integration | Status transitions: pending → paid → fulfilled → shipped → delivered |
| Tracking number storage | Integration | When fulfillment partner provides tracking, stored on order record |
| Limited quantity decrement | Integration | Purchase of limited tier → `quantity_remaining` decrements. Zero remaining → tier marked inactive. |

### 6. Community & Engagement

| Test | Type | What to Verify |
|------|------|---------------|
| Community wall entry creation | Integration | Order confirmed → wall entry created with display_name + city + message |
| Anonymous support | Integration | `is_anonymous: true` → wall entry shows "Anonymous" not real name |
| Activity feed Pusher event | Integration | New order → Pusher event on `activity-feed-{campaign_id}` → feed entry with first name + city |
| Founding supporter assignment | Integration | First 50 backers → sequential badge numbers. #51 does not get badge. |
| Waitlist signup | Integration | Email captured, source tracked, UTM captured, no duplicate emails |
| Supporter count accuracy | Integration | Count matches actual number of unique funders (not order count) |

### 7. Webhook Reliability

| Test | Type | What to Verify |
|------|------|---------------|
| Webhook signature verification (Stripe) | Integration | Invalid signature → 401, valid signature → processed |
| Webhook signature verification (Lago) | Integration | Invalid signature → 401, valid signature → processed |
| Webhook logging | Integration | Every webhook creates a `webhook_events` row with payload before processing |
| Webhook retry on failure | Integration | Failed webhook → `next_retry_at` set → retry worker picks it up |
| Webhook max retries | Integration | After 4 attempts (1 + 3 retries) → stays failed, no more retries |
| Webhook admin dashboard | Integration | Admin can view failed webhooks, see error details, trigger manual retry |

---

## Unit Tests (Pure Logic)

Focus on business logic that's complex enough to warrant isolation:

```
src/lib/fee-calculator.ts
  ✓ calculates platform fee as flat 200 cents
  ✓ calculates creator fund as flat 100 cents
  ✓ calculates processing fee as 2.9% + 30p
  ✓ calculates net to project correctly
  ✓ handles minimum donation (£5) correctly
  ✓ handles high auction values (£500+) correctly
  ✓ rounds all values to whole cents (no floating point issues)

src/lib/currency-formatting.ts
  ✓ formats GBP with £ symbol
  ✓ formats USD with $ symbol
  ✓ formats PHP with ₱ symbol
  ✓ handles zero amounts
  ✓ handles large amounts (£10,000+)

src/lib/utm.ts
  ✓ classifies john as known_network
  ✓ classifies rick as known_network
  ✓ classifies bren_ig as stranger (social_organic)
  ✓ classifies vice as stranger (press)
  ✓ classifies reddit as stranger (social_organic)
  ✓ classifies organic (no UTM) as stranger
  ✓ handles missing utm_source gracefully

src/modules/auction/services/bid-validation.ts
  ✓ rejects bid below current highest
  ✓ rejects bid below reserve price
  ✓ rejects bid below minimum increment
  ✓ accepts valid bid above current highest + increment
  ✓ handles first bid on item correctly

src/modules/campaign/services/milestone-detection.ts
  ✓ returns correct milestone for 24.9% (none)
  ✓ returns correct milestone for 25.0% (25%)
  ✓ returns correct milestone for 49.9% (25%)
  ✓ returns correct milestone for 50.0% (50%)
  ✓ returns correct milestone for 100% (100%)
  ✓ detects newly crossed milestones (previous vs current)

src/lib/date-formatting.ts
  ✓ formats countdown as "14 days, 6 hours, 32 minutes"
  ✓ handles final day (hours and minutes only)
  ✓ handles expired countdown
```

---

## Integration Tests

Using Vitest + PostgreSQL test database. Tests run against a local or test PostgreSQL instance.

### Test Setup

```typescript
// test/setup.ts
// Reset test database between test suites
// Seed with Campaign Zero test data
// Mock Stripe webhooks (with valid signatures)
// Mock Lago API calls
// Mock Resend email sending
// Mock Prodigi/Gelato fulfillment API
// Mock Pusher (capture triggered events)
// Mock Clerk (test user sessions)
```

### Key Integration Tests

```
src/modules/exchange/services/checkout-api.test.ts
  ✓ creates Lago invoice with correct line items
  ✓ creates Stripe Checkout session with correct amount
  ✓ handles multi-currency conversion
  ✓ rejects checkout for inactive tier
  ✓ rejects checkout for sold-out tier
  ✓ captures UTM data from cookie to order

src/app/api/webhooks/stripe/route.test.ts
  ✓ logs webhook event before processing
  ✓ processes checkout.session.completed webhook
  ✓ creates order with correct fee breakdown and UTM data
  ✓ updates campaign funding totals
  ✓ creates community wall entry
  ✓ assigns founding supporter badge (if under 50)
  ✓ triggers content unlock when milestone crossed
  ✓ does NOT re-lock content on refund below milestone
  ✓ triggers print fulfillment for Standard tier
  ✓ sends confirmation email via Resend
  ✓ triggers Pusher events (activity feed + funding update)
  ✓ ignores duplicate webhook (same event_id → idempotent)
  ✓ rejects webhook with invalid signature

src/modules/auction/services/auction-api.test.ts
  ✓ creates bid for authenticated user
  ✓ rejects bid for unauthenticated user
  ✓ rejects bid below current highest
  ✓ rate-limits rapid bids from same user
  ✓ updates auction item current_bid and bid_count
  ✓ triggers Pusher event on new bid
  ✓ handles concurrent bids correctly

src/scripts/close-auctions.test.ts
  ✓ closes expired auctions
  ✓ determines correct winner
  ✓ sends payment link email to winner
  ✓ handles unpaid winner after 48h (next bidder)
  ✓ does not close auctions that haven't ended yet

src/app/api/webhooks/stripe/retry.test.ts
  ✓ retries failed webhook after backoff period
  ✓ increments attempt count
  ✓ stops retrying after max attempts
  ✓ sends Discord alert on final failure
```

---

## E2E Tests (Playwright)

Focus on the complete funder journey. Run against staging environment.

### Critical E2E Flows

```
tests/e2e/funder-journey.spec.ts
  ✓ Visit campaign page → scroll story → view exchange tiers
  ✓ Select Standard tier → authenticate via Clerk → enter shipping → complete checkout
  ✓ After checkout: order appears in /me dashboard
  ✓ After checkout: name appears on community wall
  ✓ After checkout: activity feed shows new entry

tests/e2e/auction-flow.spec.ts
  ✓ Visit auction item → place bid → see bid confirmed
  ✓ Outbid notification appears when another user bids higher

tests/e2e/content-gating.spec.ts
  ✓ Non-funder sees blurred gated content with teaser
  ✓ Funder sees full gated content after authentication

tests/e2e/mobile-responsive.spec.ts
  ✓ Campaign page renders correctly on 375px viewport
  ✓ Exchange tiers stack as cards on mobile
  ✓ Countdown visible in sticky header on scroll
  ✓ Touch targets meet 44px minimum

tests/e2e/admin-dashboard.spec.ts
  ✓ Admin can view orders list
  ✓ Admin can view webhook events and retry failed ones
  ✓ Admin can mark order as known network
  ✓ Stranger ratio displays correctly
```

---

## Testing Tools

| Tool | Purpose |
|------|---------|
| **Vitest** | Unit and integration tests. Fast, ESM-native, compatible with Next.js. |
| **Playwright** | E2E tests. Cross-browser. Mobile viewport testing. |
| **PostgreSQL (test instance)** | Local or Docker PostgreSQL for integration tests. Seeded and reset per suite. |
| **MSW (Mock Service Worker)** | Mock external APIs (Stripe, Lago, Prodigi, Resend, Pusher) in integration tests. |
| **Testing Library** | Component rendering tests. Screen reader accessibility assertions. |
| **Clerk testing tokens** | Clerk provides test session tokens for integration testing without real OAuth flows. |

---

## Test Data Strategy

### Seed Data (Campaign Zero)

```sql
-- Campaign Zero test data
INSERT INTO campaigns (slug, title, funding_goal_cents, status, currency)
VALUES ('siargao-skate-kids', 'Siargao Skate Kids', 500000, 'live', 'GBP');

-- Exchange tiers
INSERT INTO exchange_tiers (campaign_id, title, price_cents, price_type, quantity_total)
VALUES
  (campaign_id, 'Premium — Handmade Board', NULL, 'auction', 5),
  (campaign_id, 'Standard — Darkroom Print', 4500, 'fixed', NULL),
  (campaign_id, 'Personal — Thank-You Card', 1500, 'fixed', NULL),
  (campaign_id, 'Supporter — Name on Wall', NULL, 'donation', NULL);

-- Content unlocks (locked)
INSERT INTO content_unlocks (campaign_id, milestone_percent, title, is_unlocked)
VALUES
  (campaign_id, 25, 'Documentary Teaser', false),
  (campaign_id, 50, 'Board Building Scene', false),
  (campaign_id, 75, 'Kids Message to Community', false),
  (campaign_id, 100, 'Documentary Rough Cut', false);

-- Test profiles
INSERT INTO profiles (clerk_user_id, full_name, email, city)
VALUES
  ('test_user_1', 'Sarah Test', 'sarah@test.com', 'Bristol'),
  ('test_admin_1', 'Admin Test', 'admin@test.com', 'London');
```

---

## QA Checklist (Pre-Launch)

### Payment Path

- [ ] Complete a real £5 test transaction (Stripe test mode)
- [ ] Verify Lago invoice created with correct line items
- [ ] Verify fee breakdown matches unit economics table
- [ ] Verify order created in PostgreSQL with all fields populated
- [ ] Verify UTM data captured on order
- [ ] Verify campaign totals update correctly
- [ ] Verify confirmation email received (Resend)
- [ ] Verify community wall entry appears
- [ ] Verify Pusher events fire (activity feed + funding update)
- [ ] Test payment failure → clean error message, no order created
- [ ] Test Stripe webhook replay → no duplicate orders (idempotency)
- [ ] Verify webhook logged to `webhook_events` table

### Monitoring

- [ ] Sentry capturing errors (trigger a test error)
- [ ] Sentry Discord alerts working for payment-path errors
- [ ] Webhook monitoring dashboard showing events
- [ ] UptimeRobot/Better Stack health checks passing
- [ ] `/api/health` endpoint returning correct status
- [ ] Plausible receiving page views and custom events

### Content

- [ ] All Campaign Zero content loaded in Strapi
- [ ] Content unlocks configured with pre-loaded media
- [ ] Gated content shows teaser for non-funders
- [ ] Video playback works via Mux (adaptive streaming)
- [ ] All images optimised (Cloudinary responsive sizes)

### Mobile

- [ ] Full scroll experience on iPhone SE (375px) through iPhone 15 Pro Max
- [ ] Touch targets ≥ 44px on all interactive elements
- [ ] Countdown readable in sticky header
- [ ] Exchange tiers usable as card layout
- [ ] Checkout flow completable on mobile

### Accessibility

- [ ] Keyboard navigation through entire page
- [ ] Screen reader announces dynamic content (activity feed, progress updates)
- [ ] Colour contrast meets WCAG 2.1 AA
- [ ] `prefers-reduced-motion` respected (no parallax, no auto-scroll)
- [ ] All images have alt text
- [ ] Video has closed captions

### Cross-Browser

- [ ] Chrome (latest)
- [ ] Safari (latest — primary mobile browser)
- [ ] Firefox (latest)
- [ ] Safari iOS
- [ ] Chrome Android

---

## Related Documents

| Document | Relevance |
|----------|-----------|
| `future-ly-architecture.md` | API contracts to test against, webhook handling, Pusher channels |
| `future-ly-data-model.md` | Schema for test data setup, webhook_events table |
| `future-ly-economics.md` | Fee calculation expected values |
| `future-ly-ux-spec.md` | Accessibility requirements, mobile breakpoints |
| `future-ly-security.md` | Security-related test cases (auth, payment, webhook verification) |
| `future-ly-launch-plan.md` | UTM classification logic to test |

---

*Testing strategy focused on money paths, webhook reliability, and critical user journeys. Integration tests are the workhorse (70%). Unit tests for complex business logic (fees, milestones, UTM classification). E2E for the full funder journey. Every bug fix gets a regression test. Webhook monitoring tested as a first-class concern.*
