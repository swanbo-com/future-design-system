# future.ly — Campaign Zero MVP Sprint Plan

**Launch target:** Thursday 30 April 2026
**Sprint length:** 19 calendar days (11 April → 30 April)
**Revised by:** John Asbury, after the 11 April kickoff call with Waleed Rajput
**Source docs:** `/projects/future/*.md` + `future-ly-platform-v1-dev-spec.pdf` (§26b for fulfilment)
**Authority:** This document *revises* the scope of the existing dev spec for Campaign Zero only. Where this and the dev spec disagree, **this document wins for the April 30 launch**. The dev spec remains the source of truth for the broader platform vision after launch.

---

## 1. TL;DR for the team

We're shipping a single-campaign, one-page-plus-checkout fundraising commerce site by April 30. It runs on the Swanbo boilerplate (Next 16 / React 19 / Prisma / Postgres / Clerk / Lago / Strapi / Resend — all already wired in via feature flags). Campaign Zero — *Siargao Skate Kids* — is the only campaign, with milestone-based funding goals, four exchange tiers including a **live auction** for the handmade board, a Cebu-finished + ShipBob-distributed fulfilment flow for prints, a **recurring donation upsell** on checkout, and a radically transparent money dashboard.

**What's explicitly out of scope for April 30:** multi-campaign management, creator onboarding flows, content locking/paywalls, advanced moderation tooling, second-language localisation, in-app fulfilment dashboards for partners other than ShipBob, mobile app, PWA installability, and anything not on the feature list in §3.

**The honest timeline reality:** 19 days × 2.5 devs (Abdul full-time, Waleed hybrid senior, John front-end + PM) = ~48 dev-days. The scope as chosen is ~55–65 dev-days of work. We will therefore pre-commit to **two drop-dead fallbacks** (see §4) so that if we slip, we slip to a *known lesser launch*, not a panic.

---

## 2. What's changed since the original dev spec

The existing `/projects/future/*.md` spec was written against a more ambitious platform vision. Campaign Zero is now an MVP of that vision, not the full thing. These are the deliberate deltas:

| Area | Original spec | Revised for Campaign Zero MVP | Why |
|---|---|---|---|
| **Content locking / unlocks** | Tiered unlocks gated by donation level | **Removed entirely.** Story, video, milestones all public. Email signup required only to comment and subscribe to updates. | John 11 Apr: "I've added feature creep with locking. The goal is viral reach; locking out little kids in the Philippines who can't pay but want to share is the opposite of what we want." |
| **Funding goal structure** | Single £5,000 goal | **Four milestone cascade** — £800 safety gear, £2,200 cumulative mini ramp, **£4,800 cumulative classroom build**, £7,800 cumulative concrete skate park. Education slots in as milestone #3 on the single ladder. Each milestone unlocks the next on the UI. See §2b. | Milestones feel achievable and create repeat "we just hit X!" moments. Collapsing education into the same cascade (not a parallel track) tells a single coherent "one community, one budget" story — which is both simpler to build and simpler to trust. |
| **CMS** | Strapi v5 day 1 | **Unchanged — Strapi v5 from day 1** (boilerplate already has it wired). | Confirmed by John 11 Apr. |
| **Billing layer** | Lago + Stripe | **Unchanged — Lago + Stripe** (boilerplate already has Lago wired). | Boilerplate removes the time cost that made this a tradeoff. |
| **Auction** | Spec says "auction, starting bid £100, reserve £200" | **Live auction with real-time bidding via Pusher.** Countdown, current high bid, outbid email. 5 boards, sealed bids excluded. | Confirmed by John 11 Apr. Flagged as the single highest-risk item in the sprint — has a hard fallback (see §4). |
| **Recurring revenue** | Not in spec | **Post-purchase monthly donation upsell** at checkout ("Add £5/mo to keep future.ly running"). Stripe Subscriptions via Lago. | Confirmed by John 11 Apr: "all about creating a high-converting ecommerce site." |
| **Fulfilment** | Prodigi / Gelato print-on-demand | **Cebu-finished hero units + ShipBob distributed (US / UK / AU / CA) + Cebu self-ship for Asia.** See dev spec §26b. | Confirmed by John 10–11 Apr. 1,000 prints being made in Cebu. |
| **Transparency UI** | Mentioned but under-specified | **Per-project transparency dashboard inspired by Trustmeter** — funds raised, unit economics table, costs, where money is going. Not a leaderboard. | Confirmed by John 11 Apr. "Radical transparency" is core to the thesis. |
| **Community wall** | Name + amount displayed | **Name + city only (no amounts, no tier names).** | UX rule from existing spec: "leaderboards by amount celebrate wealth, not generosity". Kept as-is. |
| **Multi-currency** | Multi-processor abstraction | **Display conversion to 8 currencies; charge in GBP** (with Stripe currency-conversion for major markets in v1.1). Open Exchange Rates API, cached hourly. | Pragmatic v1 shortcut — multi-currency charging adds bank/FX complexity we can't absorb in 19 days. |
| **Safeguarding** | Launch blocker | **Unchanged — still a launch blocker.** Parental consent forms, two-person content review, NBI clearance. Nothing ships until this is signed off. | Non-negotiable per existing `future-ly-security.md`. |
| **Scope of content the platform manages** | Unlimited campaigns | **Exactly one campaign (Campaign Zero).** Routes hard-code the campaign slug. Second-campaign architecture exists in Strapi but isn't exposed in UI. | Stops us from building a CMS admin UX we don't need on April 30. |

---

## 2b. Education as milestone #3 — one cascade, one story

### The decision (simplified from v1.1)

Earlier drafts of this plan modelled education as a **parallel 60/40 track** with its own progress bar, its own ledger, and its own milestones — a second, co-equal column on the campaign page. That's been cut.

Instead, **the school classroom build is milestone #3 on a single four-step cascade.** One progress bar. One ledger. One story. The campaign is still about the school — more clearly so, because it now sits inside the same narrative ladder as the skate park, not competing with it.

**Why the change:** the parallel-track model was solving a problem we don't actually have. Backers don't need a choose-your-cause toggle at checkout — they trust the cascade because the cascade is transparent, not because the funding is split. A single ladder is cheaper to build (~3–4 dev-days saved), easier to explain, and honestly tells a better story: *"here's the whole community programme in one budget"* rather than *"here are two causes, pick one."*

### The four-step cascade

| # | Milestone | Cumulative target (£) | What it buys | Track |
|---|---|---|---|---|
| 1 | **Safety gear** | 800 | Helmets + pads for ~40 kids, shipped direct from Manila | Skate |
| 2 | **Mini ramp build** | 2,200 | Plywood quarter-pipe at the existing slab, built on weekends with the older kids | Skate |
| 3 | **School classroom build** | 4,800 | Bamboo + concrete learning space. Structured English lessons 5 days/week. Graduates earn a reward skateboard (which also fixes the "school rewards English with skateboards but has none" problem from §2c). Coordinated by **Janiece** + a local builder. | **Education** |
| 4 | **Concrete skate park** | 7,800 | Permanent bowl, poured by a Cebu crew, community-owned forever | Skate |

**Campaign Zero headline figure:** £7,800 stretch target. First-unlock target: £800.

### 2c. Partner context (from call, 11 April)

- There is an **existing school** in the area already running volunteer-led English classes.
- That school **rewards students with skateboards when they complete English classes** — but currently has no skateboards to give.
- The school lacks **structured scheduling, a proper learning space, and operational funding**.
- **Janiece** (our safeguarding officer on Campaign Zero) **will also coordinate the classroom milestone** — her existing safeguarding role plus a new, scoped "education coordinator" remit for this one build. Not a third full-time hat: a scoped deliverable.
- The classroom milestone pays for: **the learning-space build itself**, **six months of basic teacher stipend + materials**, and **the first batch of reward skateboards** for the English-class completion programme (which doubles as the reason the whole campaign exists).

### Disbursement & partnership — still real, just scoped

Even without a parallel fund-split, sending part of the cascade to a school in the Philippines is still a cross-border grant-making activity. This cannot be hand-waved — see Risk 8 (simplified). At minimum we need:

- A short **Letter of Intent (LOI)** between future.ly CIC and the school by Day 15 (a full MoU can follow post-launch when the classroom milestone actually unlocks).
- A **disbursement mechanism** — Wise or direct bank transfer, written down, before the classroom milestone is triggered.
- A **tax advisor check-in** — not a full sign-off on a grant-making framework, just confirmation that paying a foreign builder for a community-build project is treatable as a project expense under the CIC's activities.

If the LOI isn't signed by Day 28, the classroom milestone is still visible on the page (it's part of the cascade, the story needs it) but the disbursement pauses until the paperwork lands — and that pause is communicated honestly on the transparency ledger.

### Safeguarding implications

- **Janiece's role** — safeguarding officer + education coordinator (scoped, not full-time) + two-person content review. John needs to confirm her capacity this week (§10 open questions).
- **No individual naming of minors** — same rule across all content. Show the school, class sizes, group photos with consent. No "meet Jun-Jun, age 8."
- **Parental consent forms cover all campaign content uses** — skate, classroom, and reward-skateboard moments, under one consent scope.

---

## 3. MVP feature list (locked for April 30)

### In scope

**Content & story**
- Single-campaign homepage with documentary-style editorial scroll
- Hero video (Mux-hosted, public, no auth wall)
- Living-story updates feed (Strapi-authored, published live during campaign)
- **Single four-step milestone cascade** — safety gear £800 → mini ramp £2,200 → **classroom build £4,800** → concrete park £7,800, all on one progress bar
- **Single transparency dashboard** — one ledger with funds raised, fees, costs, running balance, and the classroom disbursement line as a milestone-triggered ledger entry
- About / team / founder story page with Bren (skate lead) and Janiece (safeguarding + classroom milestone coordinator) profiled
- Community wall (name + city only)

**Commerce & tiers**
- Tier 1 — Handmade Skateboard (live auction, 5 units, Pusher realtime)
- Tier 2 — Darkroom Print (£45, 1,000 units, ShipBob routing)
- Tier 3 — Thank-You Card (£15, Cebu manual fulfil, batch ship)
- Tier 4 — Supporter / Name on Wall (donation, £5 minimum, digital-only)
- Post-purchase monthly donation upsell (£5 / £10 / £20 / custom)
- Backer portal (order history, tracking, update subscriptions)

**Payments**
- Lago + Stripe, one-time + subscription
- GBP charge currency, 8-currency display via Open Exchange Rates (USD, EUR, AUD, CAD, PHP, SGD, HKD, JPY)
- VAT / donation distinction at checkout (tier 4 = donation path, tiers 1–3 = commerce path)
- **Single-ledger write** — one `TransparencyLedgerEntry` per paid order, aggregating into `Campaign.total_raised` which drives the single cascade bar
- **"Where your money goes" explainer** — every tier confirm screen shows the current milestone being funded
- Stripe webhook → Lago → our DB, every event logged to `webhook_events` before processing

**Fulfilment**
- `fulfillment_strategy` routing per tier (see dev spec §26b)
- ShipBob API integration for tiers routed to `shipbob_*`
- Cebu self-ship task queue (Strapi collection) for Asia and signed editions
- Tracking number capture + email to backer via Resend

**Auth & accounts**
- Clerk — Google, Apple, email link
- No password-based signup for v1
- Signup required only for commenting + update subscriptions + backer portal
- Anonymous checkout supported (email + shipping address → post-purchase "claim your account" flow)

**Safeguarding & compliance**
- Parental consent form records (Strapi collection, not exposed to UI)
- Two-person review log for any child-featuring content
- GDPR cookie banner + privacy policy + data deletion flow
- UK CIC compliance paperwork referenced but not in-product

**Analytics & launch**
- Plausible self-hosted on the same DO VPS as app
- UTM capture on every inbound link
- Stranger-ratio tracker (funders outside founder networks, target 50% by day 7)
- Sentry for errors
- UptimeRobot on homepage + /api/health

### Out of scope for April 30 (v1.1 or later)

Multi-campaign management UI · creator onboarding · content gating / paywalls · second languages · mobile app · PWA installability · multi-processor payment abstraction (Square, Razorpay etc.) · ShipBob multi-warehouse distribution UI *(single inbound WRO for MVP — distribution decisions live outside the app)* · advanced moderation dashboard · admin financial reporting beyond the public transparency view · physical product returns flow · auction proxy bidding · auction reserve-not-met logic · anything not listed in the "in scope" block above.

---

## 4. Critical risks & honest recommendations

### Risk 1 — Live auction is the single biggest timeline threat

Real-time auctions are deceptively hard. Pusher wiring, bid race conditions, outbid emails, countdown sync, and the anti-abuse work (rate limiting, bid validation, refunding losing holds) genuinely take 4–6 days of focused work, not including QA. Inside a 19-day sprint where we also need Strapi content modelling, Lago+Stripe, and fulfilment, this is the thing most likely to eat the schedule.

**Recommendation — Two-stage auction fallback:**
1. **Target (Phase 4):** full live auction with Pusher, countdown, current high bid, outbid email, bid holds via Stripe PaymentIntent.
2. **Fallback if Phase 4 hits day 15 without being testable end-to-end:** switch to a **sealed-bid auction** — one form, bid + email, backend stores bids, admin picks winner and charges manually 24h after campaign closes. Same outcome for the 5 boards, one-day build, zero realtime risk.

Waleed or John makes the fallback call at end-of-day on **24 April** (day 14) based on Phase 4 burn-down.

### Risk 2 — "Production ready" is a feeling, not a spec

John's quote: "It's got to look production ready when we go live. It has to, we're asking for donations." Agreed, but this needs to be a checklist, not a vibe. See §9 pre-launch checklist — that *is* the definition of production-ready for this launch. If an item there isn't green, we don't launch.

### Risk 3 — Safeguarding cannot slip

The existing `future-ly-security.md` treats safeguarding as a launch blocker. That's unchanged. **Parental consent forms (bilingual), two-person review sign-off, and NBI clearance for Bren and Rick must be complete before any child-featuring content goes public on the site.** This is non-negotiable. The filming team starts the shoot tomorrow — John needs to confirm consent forms are already in hand before Day 1 of the shoot.

### Risk 4 — Multi-currency temptation

Charging in 8 currencies means 8 Stripe balance buckets, 8 reconciliation flows, FX losses, and accountant headaches. **We display in 8 currencies, we charge in GBP.** Backers see "≈ $56 USD" next to "£45 GBP" at the point of conversion. Stripe handles their side of the FX transparently. We revisit true multi-currency in v1.1 after Campaign Zero closes.

### Risk 5 — ShipBob receiving lag

ShipBob receiving is 1–3 weeks from pallet arrival to "live in inventory". Prints cannot be sold until they're live at the warehouse. **Action:** John should lock the Cebu print run this week, ship air freight no later than 16 April, and build a 3-week receiving buffer into the comms timeline. Backers should not be able to pay for prints until inventory is live.

**Mitigation inside the app:** tier 2 checkout has a `pre_order` state until inventory shows available in all four ShipBob regions. Copy: "Print dispatching from 1 May. Your pledge is collected now; your print ships as soon as it arrives at our regional hub."

### Risk 6 — Team bandwidth honesty

Waleed is on 15 days' notice at his current job and joining a German company remote. Realistic allocation for Waleed on this sprint: ~4–5 hours/day of focused work, hybrid role. Abdul is the full-time build owner. John is front-end + PM + content. If we need a third pair of hands, John mentioned other juniors — we should decide before Day 3 whether to bring one in for polish/QA tasks in Phase 5–6.

### Risk 7 — "Build-in-public" is not free

John wants to build this in public. Good for marketing, but every Discord channel message that's public creates PR surface area. Recommend one **public** "launch journey" channel (curated, John posts), and one **private** engineering channel where the team talks honestly about bugs and blockers.

### Risk 8 — Disbursing to the school is still a real legal surface (simplified from v1.1)

Even though the classroom is now just milestone #3 on a single cascade, the moment the cascade reaches £4,800 we're still sending money across a border to pay for a community build. That's a real compliance surface and has to be handled — but it's *much* simpler than the v1.1 parallel-track model suggested, because there's only one flow to protect.

**What must be true before the classroom milestone is triggered (not before launch):**
- A **Letter of Intent** between future.ly CIC and the school — one page, scope + disbursement + receipts — signed by Day 15 of the sprint.
- A **disbursement mechanism** chosen and documented — most likely Wise GBP→PHP direct to the builder on the school's behalf, with receipts collected by Janiece.
- A **tax advisor check-in** (not a full grant-making sign-off) — John confirms with his advisor that paying a foreign builder for a community-build project is within normal CIC expense treatment.

**If the LOI isn't signed by Day 28:** the cascade still launches with all four milestones on the page (the story needs milestone #3 visible). When the cascade actually reaches £4,800, the classroom disbursement **pauses** and we communicate it honestly on the ledger — "classroom milestone reached, building fund released when school partnership paperwork is signed." This is better than cutting the milestone, because the cascade tells the whole story even when paperwork lags real-time fundraising.

**Recommendation:** LOI is a Phase 6 task owned by John. No code changes needed — there's no feature flag, no dual ledger, no split-override UI. One progress bar, one ledger, one human-communicated pause if the paperwork slips.

---

## 5. Team & roles

| Person | Role | Allocation | Primary responsibilities |
|---|---|---|---|
| **John Asbury** | Product owner, front-end marketing, content lead | Full-time | Front-end marketing sections, brand/UX, Strapi content authoring, content review (two-person), safeguarding liaison, campaign launch comms |
| **Abdul Rajput** | Hands-on developer, phase owner | Full-time | Data model, API routes, Clerk auth, Lago+Stripe wiring, backer portal, Notion phase maintenance, daily updates in Discord |
| **Waleed Rajput** | Senior dev, hybrid oversight | ~4–5h/day | Architecture decisions, security review, live auction design, realtime infra, code review on every PR, blocker unblocking |
| **Bren** | On-ground content lead (Siargao) | Per shoot schedule | Filming, photography, parental consent collection, Cebu printer liaison |
| **Rick** | Video lead (Siargao) | Per shoot schedule | Cinematography, content unlock pieces |
| **Janiece** | Safeguarding officer | As needed | Sign-off on any child-featuring content |
| **(TBD)** | Junior dev for Phase 5–6 polish | ~20h total | QA, accessibility fixes, content QA, cross-browser testing |

**Daily ritual:** 15-min async standup in Discord by 09:00 UTC+7 (John's timezone). Each person posts: *Yesterday / Today / Blockers*. Notion phase page gets updated by Abdul at end of day.

**Decision cadence:** any scope change requires John's approval in writing in Discord. Any architecture change requires Waleed's approval in writing in Discord. No silent scope creep.

---

## 6. Sprint plan — phases & milestones

Nineteen days, seven phases. Phase 0 runs in parallel with Phase 1. Phases 2–4 are the critical path. Phases 5–6 can partially overlap.

| # | Phase | Dates | Days | Owner | Waleed senior review | Deliverable |
|---|---|---|---|---|---|---|
| **0** | **Kickoff & infra** | Fri 11 → Sat 12 Apr | 2 | Abdul | Day 0 repo + Day 1 env review | Boilerplate forked, env configured, Docker up, DO VPS provisioned, Discord channels, Notion phases live |
| **1** | **Foundation — schema, auth, Strapi content types** | Sat 12 → Wed 16 Apr | 5 | Abdul | Data model review Day 2, Strapi schema review Day 4 | Prisma schema migrated, Clerk working, Strapi content types modelled and seeded with Campaign Zero data, routes stubbed |
| **2** | **Commerce core — Lago+Stripe, tiers 2-4, upsell** | Thu 17 → Mon 21 Apr | 5 | Abdul | Checkout flow review Day 19, webhook pipeline review Day 20 | One-time checkout for tiers 2/3/4, recurring donation upsell, multi-currency display, webhook logging, order confirmation emails |
| **3** | **Campaign page + transparency dashboard** | Sun 20 → Tue 22 Apr (parallel) | 3 | John (front-end) | UI review Day 21 | Single-campaign editorial page, milestone progress, transparency dashboard, community wall, about page |
| **4** | **Live auction (with fallback path)** | Mon 21 → Fri 25 Apr | 5 | Waleed (design) + Abdul (build) | Continuous pair review | Pusher wiring, bid API, countdown, outbid email, Stripe hold logic. **Day 14 (24 Apr) decision gate: ship live OR fall back to sealed-bid.** |
| **5** | **Fulfilment & ShipBob integration** | Wed 23 → Sat 26 Apr | 4 | Abdul | API integration review Day 25 | ShipBob API wiring for tier 2 routing, Cebu self-ship task queue, tracking email flow, pre-order state until inventory lives |
| **6** | **Polish, QA, safeguarding, launch rehearsal** | Sun 27 → Wed 29 Apr | 3 | All | Waleed runs launch-readiness review Day 28 | Pre-launch checklist (§9) all green, full stage rehearsal on staging, content loaded, safeguarding signed off |
| **🚀** | **LAUNCH** | **Thu 30 Apr** | — | John | — | Go live, press outreach, waitlist email drops |

### Critical-path dependencies

Phase 2 depends on Phase 1 data model (blocks Day 6 if schema slips)
Phase 3 depends on Phase 1 Strapi content types (blocks Day 7 if Strapi slips)
Phase 4 depends on Phase 2 Stripe hold logic (blocks Day 11 if Stripe wiring slips)
Phase 5 depends on Phase 2 order/tier model (blocks Day 13 if commerce slips)
Phase 6 depends on *everything* being testable end-to-end by Day 15

### Slippage rules
- **If Phase 2 slips by more than 1 day**, notify John immediately. Stripe is the heartbeat of commerce — we cannot fall behind here.
- **If Phase 4 slips past Day 14 (24 Apr)**, auto-trigger the sealed-bid fallback. No debate.
- **If Phase 5 slips**, the fallback is "manual CSV export from DB → ShipBob dashboard upload daily." In-app integration becomes v1.1.
- **If Phase 6 hits Day 28 with red items**, we pre-announce a 48-hour launch slip. Better to slip deliberately than ship broken.

---

## 7. Phase-by-phase tasks (Notion-ready)

Copy each block into Notion as a page under the "Campaign Zero Sprint" database. Each task becomes a row with Owner, Est (days), Status, and Depends-on columns.

### Phase 0 — Kickoff & infra (Day 0–1)

| Task | Owner | Est | Depends on | Done when |
|---|---|---|---|---|
| Fork `swanbo-com/boilerplate` to `swanbo-com/futurely` | Abdul | 0.1 | — | Repo exists, Waleed + John have access |
| Run boilerplate setup CLI, enable feature flags: auth, email, billing, cms | Abdul | 0.25 | Fork | `features.json` committed with the 4 flags on |
| Configure `.env` + `@t3-oss/env-nextjs` schema for Clerk, Resend, Lago, Stripe, Strapi, Postgres, Pusher, Mux, Sentry, Plausible | Abdul | 0.5 | Setup CLI | `env.ts` validates locally; `.env.example` committed |
| Provision DO VPS (2 vCPU, 4GB), Docker + Traefik, point staging domain | Abdul | 0.75 | Env schema | `staging.future.ly` resolves to the boilerplate default page |
| Spin up Docker Compose locally — Lago, Strapi, Postgres, Redis | Abdul | 0.5 | Env schema | `npm run dev` boots full stack, no errors |
| Set up Discord: #futurely-public, #futurely-eng (private), #futurely-standup | John | 0.1 | — | Waleed + Abdul invited to eng + standup |
| Create Notion database "Campaign Zero Sprint" with Phases 0–6 pages | Abdul | 0.25 | — | All 7 phase pages exist, John has comment access |
| Invite Waleed + Abdul to Notion workspace | John | 0.1 | Notion db | Both can edit |
| Read existing dev spec PDF (§§14, 16, 17, 22, 26, 26b) + this plan | Waleed | 0.5 | — | Waleed confirms in Discord: "read, no blockers" |
| Repo README: "how to run the stack + env-var reference" | Abdul | 0.25 | Docker compose up | README lives in repo, Waleed reviewed |

### Phase 1 — Foundation: schema, auth, Strapi content (Day 2–6)

| Task | Owner | Est | Depends on | Done when |
|---|---|---|---|---|
| Prisma schema: `User`, `Campaign`, `ExchangeTier`, `Order`, `OrderItem`, `AuctionBid`, `Subscription`, `TransparencyLedgerEntry`, `WebhookEvent`, `ParentalConsent`, `CommunityWallEntry`, `Milestone` (with `kind` enum: `skate` \| `education`), `SchoolPartner` | Abdul | 1 | Phase 0 | `prisma migrate dev` clean, schema reviewed by Waleed |
| Add fulfilment fields per dev spec §26b (`fulfillment_strategy`, `routing_region`, `fulfillment_partner`, `external_order_id`, `fulfillment_status`, `tracking_number`) | Abdul | 0.25 | Schema | Fields in migration, types generated |
| Clerk wiring: sign-in with Google, Apple, email link. No password. | Abdul | 0.5 | Schema | `/sign-in` works on staging, user row upserts into Postgres |
| Anonymous checkout → post-purchase "claim your account" flow design | Abdul | 0.5 | Clerk | Design doc in Notion, Waleed approved |
| Strapi content types: `Campaign` (one record, hard-coded slug), `Milestone` (4 rows — 3 skate + 1 education classroom), `StoryUpdate`, `ExchangeTier`, `TransparencyEntry`, `TeamMember`, `FAQItem`, `SchoolPartner` (school name, partnership status, LOI signed date, disbursement log) | Abdul | 1 | Schema | Strapi admin shows all types, locales disabled (EN-GB only) |
| Join key strategy documented: `campaign.slug = "siargao-skate-kids-0"`, hard-coded in MVP | Abdul | 0.25 | Strapi | Doc in repo `docs/content-sync.md` |
| Seed Campaign Zero content into Strapi from `campaign-zero-siargao.md` — includes the classroom milestone copy as part of the single cascade narrative | John | 1 | Strapi types | Campaign visible in Strapi admin, all 4 milestones populated, validated by Abdul |
| Draft classroom-milestone narrative copy — "the school that rewards English class with skateboards", Janiece's role, LOI status line for the ledger | John | 0.5 | — | Copy in Notion ready for Strapi entry, reviewed by Janiece |
| Next.js routes stubbed: `/`, `/about`, `/backer`, `/checkout`, `/checkout/success`, `/admin` | Abdul | 0.5 | Clerk | All routes return 200, proxy middleware guards `/admin` and `/backer` |
| API routes stubbed: `/api/tiers`, `/api/orders`, `/api/bids`, `/api/webhooks/stripe`, `/api/webhooks/shipbob`, `/api/transparency` | Abdul | 0.5 | Schema | All return typed placeholder responses |
| Data-model review session with Waleed | Waleed + Abdul | 0.5 | Schema | Waleed signs off in #futurely-eng |

### Phase 2 — Commerce core: Lago, Stripe, tiers 2–4, upsell (Day 6–10)

| Task | Owner | Est | Depends on | Done when |
|---|---|---|---|---|
| Lago setup: tenant, API key, webhook secret, plan templates | Abdul | 0.5 | Phase 1 | Lago admin shows 2 plans: "one-time-exchange", "monthly-supporter" |
| Stripe Connect in Lago — test-mode first | Abdul | 0.5 | Lago setup | Test charge flows Lago → Stripe → Lago webhook |
| Checkout page: tier selection → customer details → Stripe Elements | Abdul | 1 | Stripe connected | Stripe test card (4242) completes one-time £45 charge |
| Webhook pipeline: Stripe → Lago → `/api/webhooks/lago` → `webhook_events` table → consumer (idempotent) | Abdul | 1 | Checkout | 10 test charges all logged once, consumed once. Replay-safe. |
| Order creation on successful charge (tier 2, 3, 4 flows) | Abdul | 0.75 | Webhooks | Orders in Postgres match Stripe charges, `fulfillment_status = pending` |
| **Single-ledger write on every paid order** — one `TransparencyLedgerEntry` row per paid order (gross + fees + net), aggregated against the single `Campaign.total_raised` running sum which drives the cascade progress bar | Abdul | 0.25 | Orders | 10 test orders produce 10 ledger rows, `Campaign.total_raised` matches gross-of-fees to the penny |
| Tier 4 (Supporter) donation path: no shipping address, Gift Aid checkbox for UK | Abdul | 0.5 | Orders | Tier 4 checkout skips address form, donation flag persists on Order |
| **Checkout copy — "where your money goes" explainer** — one paragraph on every confirm screen: *"Your £X joins the cascade — we're currently funding [current milestone]. Full breakdown on the transparency page."* | John + Abdul | 0.25 | Orders | Shows on all 4 tier confirm screens with the live current-milestone name |
| **Recurring donation upsell component** — post-purchase modal, £5 / £10 / £20 / custom, one-click Stripe subscription | Abdul | 1 | Orders | Subscription created in Stripe + Lago after test click |
| Multi-currency display: Open Exchange Rates, hourly cache in Redis, 8 currencies shown inline | John + Abdul | 0.75 | Checkout | Changing currency dropdown updates all prices, charge still GBP |
| Order confirmation email via Resend | Abdul | 0.5 | Orders | Test order triggers email with order ID + tracking placeholder |
| Admin-only refund endpoint (manual only, not self-serve) | Abdul | 0.25 | Webhooks | Waleed can trigger a refund via an authenticated POST |
| Commerce review session with Waleed | Waleed + Abdul | 0.5 | Upsell | Waleed signs off in #futurely-eng |

### Phase 3 — Campaign page + transparency dashboard (Day 9–11, parallel)

| Task | Owner | Est | Depends on | Done when |
|---|---|---|---|---|
| Editorial scroll layout — hero video, story blocks, documentary aesthetic, "one cascade, one community" framing throughout | John | 1.5 | Strapi content | Looks "production ready" at 320px, 768px, 1280px, 1920px |
| **Single milestone cascade component** — one progress bar with 4 milestones (safety gear £800 → mini ramp £2,200 → classroom build £4,800 → concrete park £7,800). Current total pulled from `Campaign.total_raised`. Milestone #3 visually tagged with an education-pencil glyph but sits in the same bar. | John + Abdul | 0.75 | Ledger rows | Bar updates within 5s of a test order; milestone unlock animations tested for each step |
| Exchange tier cards — all 4 tiers, CTAs route to checkout (or auction page for tier 1) | John | 0.5 | Editorial scroll | Clicking tier card routes correctly |
| **Single transparency dashboard** — one ledger table showing income / fees / costs / running balance / money-out log. Classroom milestone disbursements appear as line items in the same ledger when they happen (no separate column). School receipts appear inline when available. | John + Abdul | 1 | Ledger rows | Real numbers update on order; running balance reconciles; classroom milestone disbursement line ships with "paused" state if LOI isn't signed |
| Community wall — name + city only, 20 most recent | Abdul | 0.5 | Orders | Opt-in checkbox at checkout drives inclusion |
| About page — team, mission, CIC registration note | John | 0.5 | Strapi | Published |
| Story updates feed — published from Strapi, no auth gate | John + Abdul | 0.75 | Strapi | New update in Strapi appears on site within 60s |
| Accessibility pass — keyboard nav, contrast, reduced-motion, screen reader labels | John | 0.5 | All UI done | Axe score ≥95 on homepage |

### Phase 4 — Live auction (Day 10–14, with decision gate Day 14)

| Task | Owner | Est | Depends on | Done when |
|---|---|---|---|---|
| Auction architecture design doc — Pusher channels, bid state, race-condition handling, outbid flow | Waleed | 0.5 | Phase 2 Stripe | Doc in Notion, John + Abdul approve |
| `AuctionBid` model + API routes (`/api/bids/place`, `/api/bids/current`) with idempotent bid insert, serial via Postgres advisory lock | Abdul | 1 | Auction doc | 1000 concurrent-bid load test passes with no double-top |
| Stripe PaymentIntent hold for leading bid (captures on win, refunds on outbid) | Abdul | 1 | Bid API | Manual test: 3 bidders, only winner charged |
| Pusher channel per auction, broadcast new-top-bid + countdown tick | Waleed + Abdul | 0.75 | Bid API | Two browser windows see each other's bids in <300ms |
| Outbid email template via Resend | Abdul | 0.25 | Bid API | Losing test bidder gets outbid email within 10s |
| Auction UI — current bid, your bid, time remaining, "you are leading" / "you've been outbid" states | John + Abdul | 1 | Pusher | Full flow works on staging |
| Auction close logic — cron every 10s near end, grace period for last-minute bids (2-min extension if bid <2min from close) | Abdul | 0.5 | Bid API | End-of-auction test passes |
| Admin auction monitor page — live top bidders, refund overrides | Abdul | 0.5 | Auction UI | Waleed can monitor from staging |
| **Day 14 decision gate: is auction testable end-to-end on staging?** If NO, invoke sealed-bid fallback. | John + Waleed | — | All of above | Decision posted in #futurely-eng by 18:00 UTC+7, 24 Apr |
| **Sealed-bid fallback (if invoked):** single-form bid, email + amount, admin picks winner after close | Abdul | 1 | Decision gate | Form works, bids in DB, email confirmation |

### Phase 5 — Fulfilment & ShipBob integration (Day 12–15)

| Task | Owner | Est | Depends on | Done when |
|---|---|---|---|---|
| ShipBob account setup + sandbox API credentials | John | 0.25 | — | Creds in password manager, shared with Abdul |
| Four WROs drafted for US / UK / AU / CA (per dev spec §26b) | John | 0.5 | ShipBob account | WROs visible in ShipBob dashboard, barcode PDFs downloaded |
| ShipBob Orders API integration: POST on paid order with `reference_id = order.uuid`, idempotent | Abdul | 0.75 | Phase 2 orders | Test order creates ShipBob order in sandbox |
| Routing algorithm implementation (per dev spec §26b pseudocode): `route_order(order, tier) → fulfillment_partner` | Abdul | 0.5 | Orders | Unit tests cover all 6 routing branches |
| ShipBob webhook receiver: `/api/webhooks/shipbob`, log to `webhook_events` before processing | Abdul | 0.5 | Webhook pipeline | Sandbox shipment_delivered event updates DB |
| Fulfilment status state machine: `pending → in_production → received_at_warehouse → picked → label_created → shipped → in_transit → delivered → exception` | Abdul | 0.5 | Webhook receiver | Status transitions tested |
| Tracking email flow (Resend) with carrier tracking link | Abdul | 0.25 | State machine | Test delivery email received |
| Cebu self-ship task queue — Strapi collection with printable picklist view for Bren | Abdul + John | 0.75 | Routing | Bren can see pending Asia + signed-edition orders |
| **Pre-order state for tier 2** until inventory is live in all 4 ShipBob regions | Abdul | 0.5 | ShipBob orders | Checkout displays "Dispatching from 1 May" until inventory flag flips |
| Manual CSV export as fallback for v1.1 split | Abdul | 0.25 | State machine | Admin can download CSV of pending orders with shipping info |

### Phase 6 — Polish, QA, safeguarding, launch rehearsal (Day 16–18)

| Task | Owner | Est | Depends on | Done when |
|---|---|---|---|---|
| Full stage rehearsal on `staging.future.ly` — end-to-end: land → read → bid → buy → upsell → confirmation → tracking email | All | 1 | Phase 5 | Rehearsal video recorded, zero showstoppers |
| Cross-browser pass: Chrome, Safari, Firefox, iOS Safari, Android Chrome | John + junior (TBD) | 0.5 | Rehearsal | No critical layout bugs |
| Safeguarding sign-off: parental consent forms in hand, two-person review complete for Week 1 content | John + Janiece | 0.25 | Content ready | Written sign-off in Notion |
| Content load: Campaign Zero story, 4 content unlock pieces, about page, FAQ, team bios | John | 1 | Strapi | Content visible on staging |
| Plausible self-hosted installed, UTM capture verified, goal events configured | Abdul | 0.5 | — | Test visit shows in Plausible |
| Sentry: errors captured from staging, alerting set up for John + Waleed | Abdul | 0.25 | — | Force-triggered error appears in Sentry |
| UptimeRobot on `/` + `/api/health` | Abdul | 0.1 | — | Two monitors green |
| GDPR: cookie banner, privacy policy, data deletion request flow | John + Abdul | 0.5 | — | All three exist and work |
| Legal review: CIC paperwork referenced on site, "how donations work" copy approved by John's tax advisor | John | 0.5 | — | Written sign-off from advisor |
| Backup + restore dry run — Postgres snapshot to DO Spaces | Abdul | 0.25 | — | Snapshot exists, restore tested on local |
| DNS cutover plan: `future.ly` → prod, keep `staging.future.ly` for post-launch fixes | Abdul | 0.25 | — | Doc in Notion, TTLs lowered |
| Pre-launch checklist (§9) green-across-the-board | All | — | All above | Every box ticked in Notion |
| Launch rehearsal retro — what broke, what to watch on launch day | All | 0.5 | Rehearsal | Retro notes in Notion |

---

## 8. Daily ritual

**09:00 UTC+7** — async standup in `#futurely-standup`. Each person posts:

> **Yesterday:** what got done
> **Today:** what I'm doing
> **Blockers:** anything stopping me

Abdul updates the Notion phase page at end of day, marking tasks as done / in progress / blocked. John reads the updates at the start of his day and responds in thread.

**Wednesday + Saturday** — 30-min video sync on Google Meet, whole team, phase burn-down review.

**End of every PR** — Waleed reviews. No PR merges without a Waleed ✓ except trivial content/copy changes where John's ✓ is enough.

---

## 9. Pre-launch checklist (must be green to launch)

### Product
- [ ] Homepage loads in <2s on 3G
- [ ] Mobile layout passes review on iPhone SE (smallest realistic)
- [ ] Story video plays on iOS + Android + desktop
- [ ] All 4 tier CTAs route correctly
- [ ] Checkout completes with a Stripe test card
- [ ] Recurring upsell modal appears after test purchase
- [ ] Confirmation email arrives within 30s
- [ ] Community wall shows name + city only, with opt-out respected
- [ ] Transparency dashboard numbers match test orders
- [ ] **Single cascade progress bar renders correctly and updates within 5s of a test order**
- [ ] **All four milestones visible with correct unlock states (£800 / £2,200 / £4,800 / £7,800)**
- [ ] **Classroom milestone card shows Janiece's byline and LOI status line (signed or pending)**

### Auction (or sealed-bid fallback)
- [ ] Placing a bid creates a Stripe hold
- [ ] Outbidding another bidder releases the previous hold
- [ ] Countdown is accurate to ±1s across two browser windows
- [ ] Outbid email arrives within 10s
- [ ] Auction close triggers winner charge + refunds losers

### Payments
- [ ] Stripe in live mode with webhooks pointing at prod
- [ ] Lago in live mode, plans published
- [ ] All webhooks logged to `webhook_events` before processing
- [ ] Test refund works in live mode
- [ ] Multi-currency display shows correct conversion

### Fulfilment
- [ ] ShipBob inventory live in at least US + UK warehouses for tier 2
- [ ] Tier 2 pre-order state removable with a feature flag
- [ ] Cebu self-ship queue visible to Bren
- [ ] Tracking email template tested on a real delivery event

### Safeguarding & compliance
- [ ] Parental consent forms in hand for every minor featured — one consent scope covering skate + classroom + reward-skateboard content uses
- [ ] Two-person review log complete for Week 1 content
- [ ] NBI clearance for Bren and Rick on file
- [ ] Privacy policy + cookie banner + data-deletion flow live
- [ ] No full surnames, no home addresses, no individual student names anywhere on site
- [ ] **Janiece has confirmed her capacity (safeguarding officer + scoped classroom-milestone coordinator + content review)**

### Classroom milestone (disbursement readiness, not launch blocker)
- [ ] **Letter of Intent** drafted between future.ly CIC and the partner school (signed by Day 15 if possible, by classroom-milestone trigger at the latest)
- [ ] **Disbursement mechanism chosen** (Wise GBP→PHP most likely, documented in Notion)
- [ ] **Tax advisor check-in** confirming CIC expense treatment for a foreign community-build project
- [ ] **Classroom milestone budget confirmed** with Janiece (breakdown of what the £4,800 covers)
- [ ] **Ledger pause state** tested on staging — when classroom milestone unlocks, the disbursement line renders in "pending LOI" state cleanly if paperwork isn't in

### Ops
- [ ] Sentry alerting John + Waleed on prod errors
- [ ] UptimeRobot monitoring / and /api/health
- [ ] Plausible capturing prod traffic
- [ ] Postgres backup + restore tested
- [ ] Secrets in DO / 1Password, nothing in git
- [ ] `npm audit` clean, dependencies pinned
- [ ] Rollback plan written (how to revert within 5 min)

### Content
- [ ] Story copy signed off by John
- [ ] Hero video final cut uploaded to Mux
- [ ] All imagery optimised (WebP/AVIF), lazy-loaded
- [ ] 4 content unlock pieces ready to publish on milestone hit
- [ ] About page team bios final
- [ ] FAQ covers: where does my money go, what do I get, shipping, taxes, returns
- [ ] 404 page exists and doesn't look broken

### Launch-day
- [ ] Waitlist email drafted and tested
- [ ] Vice / Vans / Thrasher press one-pagers ready
- [ ] Day-1 Instagram posts queued (Bren)
- [ ] Founder post by John scheduled for 09:00 UTC
- [ ] Launch thread in `#futurely-public` ready

---

## 10. Open questions (for the next 48 hours)

These are the decisions the team needs from John or outside parties before we can execute. Each one is tagged with "by when" and who.

1. **Consent forms** — are bilingual parental consent forms already in hand before the filming shoot starts? (John, **today**)
2. **Junior dev for Phase 5–6** — bring one in for QA/polish, yes or no? (John, **by Day 3 = 14 Apr**)
3. **Cebu print run lock-in** — final dimensions + weight of hero unit for freight quoting, and air-freight booking date (John + Cebu printer, **by Day 5 = 16 Apr**)
4. **Tax advisor call** — CIC VAT treatment on tier 4 donation vs tiers 1–3 commerce, multi-currency reconciliation (John, **by Day 7 = 18 Apr**)
5. **Stripe Connect vs standard account** — Lago plugs into either; we need to know which before Phase 2 starts (Waleed + John, **by Day 5 = 16 Apr**)
6. **Subdomain plan** — `future.ly` root or `join.future.ly`? Marketing vs product split? (John, **by Day 7**)
7. **Safeguarding officer availability** — Janiece confirmed on-call through the sprint? (John, **by Day 3**)
8. **Auction close time** — what day/time does the tier 1 auction close? Needs to be set in content before launch. (John, **by Day 10**)
9. **Content unlock trigger rule** — milestone hit = auto-publish or manual-publish? (John, **by Day 10**)
10. **Inventory cut-off** — exact date prints are expected live in each ShipBob warehouse (John + ShipBob, **by Day 8**)

### Classroom milestone specifics (simpler in v1.2 — no longer a launch blocker)

11. **Classroom milestone budget breakdown** — the £4,800 figure needs to be validated by Janiece. What exactly does it cover: build cost, teacher stipend period, materials, first batch of reward skateboards? (Janiece, **by Day 7 = 18 Apr**)
12. **Partner school contact + legal name** — who's the formal point of contact, what's the school's legal name, does it have any registration? (John + Janiece, **by Day 5**)
13. **Janiece capacity confirmation** — safeguarding officer + scoped classroom-milestone coordinator + content review. Is this achievable inside the sprint and the 30-day campaign? Paid or volunteer? (John, **by Day 3 = 14 Apr**)
14. **Letter of Intent draft** — one-pager between future.ly CIC and the school, covering scope, disbursement, receipts, exit. (John, **draft by Day 10 = 21 Apr; signed by Day 15 = 26 Apr**)
15. **Disbursement mechanism** — Wise, direct wire, or intermediary? One-line answer in Notion. (John + tax advisor, **by Day 10**)
16. **Tax advisor check-in** (not full sign-off) — confirm paying a foreign builder for a community-build project falls under normal CIC expense treatment. (John, **by Day 10**)

---

## 11. What this document is *not*

It's not the dev spec. `/projects/future/future-ly-platform-v1-dev-spec.pdf` remains the canonical reference for stack, data model, and architecture. This document is the **19-day sprint overlay** on top of that spec — it says *what subset of the vision ships on April 30, in what order, by whom, and with what fallbacks*. Everything out-of-scope here is not cancelled — it's queued for v1.1.

---

**Document owner:** John Asbury
**Phase owner:** Abdul Rajput
**Senior dev & review authority:** Waleed Rajput
**Last revised:** 11 April 2026 (v1.2 — education collapsed to milestone #3 on a single cascade)

### Change log
- **v1.0 — 11 April 2026:** Initial revision after the Waleed kickoff call.
- **v1.1 — 11 April 2026:** Added §2b (Education Fund parallel track), Risk 8 (NGO partnership compliance), new Phase 1 fund-split data-model tasks, Phase 2 dual-ledger write, Phase 3 dual-track progress + two-column transparency dashboard, Education Fund checklist, and open questions 11–19.
- **v1.2 — 11 April 2026:** **Simplification revert.** John flagged v1.1 as too complex for the 19-day sprint. Education collapsed from a parallel 60/40 track into **milestone #3 of a single four-step cascade** (£800 → £2,200 → £4,800 classroom → £7,800 park). Removed: `Campaign.fund_splits` JSON, `FundTrack` enum, `Milestone.fund_track`/`TransparencyLedgerEntry.fund_track` FKs, `Order.split_override`, dual-ledger write, split-disclosure engine, dual-track progress bars, two-column transparency dashboard, tier-4 override UI, and the hard "education track launch blocker" gate. Risk 8 softened from "cannot launch without MoU" to "cannot disburse without LOI" — classroom milestone remains on the page regardless, with a visible paused-disbursement state if paperwork slips. Open questions 11–19 collapsed to 11–16. Saves an estimated **3–4 dev-days** across Phases 1–3 and removes an entire compliance surface from the launch-blocker list. See also `wireframe-campaign-simplified.html` in this folder for the visual rationale.
