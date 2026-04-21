# future.ly — Project Brief

> One story. One countdown. One community.

**Version:** 1.0
**Date:** March 2026
**Entity:** future.ly CIC (UK Community Interest Company)
**Status:** MVP Build
**Confidential**

---

## What future.ly Is

A documentary-driven storytelling fundraising platform for grassroots action-sports communities. One campaign at a time. The entire site IS the story. People follow the journey, support the project, and get something real in exchange — not a donation receipt.

Run as a UK CIC. Every pound accounted for. The platform disappears; the content carries the colour.

### What Makes This Different

Three things nobody else combines:

1. **Living stories** — Campaigns don't end when they're funded. Updates, photos, and documentary footage keep the story alive. Funders stay connected to the communities they supported.
2. **Tangible exchanges** — Funders receive real things: handmade skateboards, signed darkroom prints, handwritten thank-you cards. Something you'd hang on your wall.
3. **Radical transparency** — Every campaign has a public budget. Every pound is accounted for. Fee breakdown shown at checkout. Creator revenue shares published quarterly.

### The Positioning Gap

| Platform | Model | Gap |
|----------|-------|-----|
| GoFundMe | Open crowdfunding, donations | No story arc, no exchange, no curation. Aggressive tipping. |
| Kickstarter | Reward-based, all-or-nothing | Creator/product focused. Story ends at funding. |
| charity: water | Story-driven donations | Single org, not a platform. No exchange model. |
| Patreon | Subscription content | Creator tool, not project funding. 15%+ effective fees. |
| **future.ly** | **Story-driven exchanges** | **One story at a time. Living narratives + tangible rewards + radical transparency + gamified momentum.** |

---

## Goals

### MVP Goals (Campaign Zero)

- Ship a working platform with Campaign Zero (Siargao Skate Kids) live within 2 weeks
- Prove the exchange model works: people will pay for tangible items connected to a story
- Prove distribution works: strangers (not just personal network) fund the campaign
- Build a waitlist for Campaign One (Our Ocean School)
- Validate the "one story" model: full focus, 30-day countdown, living updates

### Success Signals (30 Days)

- Hit 30% funded in first 7 days (triggers the 30/90 rule — 90% chance of full funding)
- 50%+ of funders are strangers (not personal network)
- 50+ funded exchanges total
- Board auction bids exceed £200
- 100+ email signups for "next story" waitlist
- Campaign page time-on-page: 3+ minutes

### Kill Signals

- Below 15% funded at day 7
- 80%+ of funders within 2 degrees of personal network
- Fewer than 20 total exchanges at day 30
- High page views but sub-2% conversion (story resonates, exchange model doesn't)
- Safeguarding compliance can't be completed pre-launch

---

## Personas

### The People in the Story (Primary Community)

The kids in Siargao building skateboards from scrap wood. The surfers in Cornwall. The communities these projects serve. They're not recipients — they're the protagonists. They appear on the platform with dignity and agency: first names, ages, one-line stories, documentary photography. No rescue framing, no poverty porn.

**Needs:** Representation with respect. Informed consent. Real benefit from funds raised.
**Safeguarding:** Written bilingual parental consent for all minors. No surnames published. Location limited to barangay level.

### Creators (Photographers, Videographers, Community Organisers)

People like Bren (left his media career to document grassroots communities in SE Asia) and Rick (produces documentary content). They shoot for free upfront and earn a revenue share when the campaign succeeds. They're not employees — they're equity holders in the story.

**Needs:** Fair compensation (8% lead photographer, 5% videographer revenue shares). Visible credit on the platform. Equipment and travel support via Creator Fund.
**Motivation:** Tell stories that matter. Build a portfolio. Earn from their work without a salary dependency.

### Supporters (Funders)

People who fund, follow, and share the story. They're not donors — they're participants. They range from the £5 supporter (name on the wall) to the £200+ auction bidder (handmade skateboard). Skewed toward action-sports communities: US West Coast, UK, Australia, Philippines diaspora.

**Needs:** Something tangible in return. Proof their money went where promised. Updates that feel like messages from a friend on location. A story they can follow and share.
**Behaviour:** Discovers via Instagram/TikTok, reads the full story, chooses an exchange tier, follows updates, shares with friends.

### Visitors (Not Yet Funders)

People who land on the site, scroll the story, but don't fund. They might sign up for the waitlist ("next story") or share the content. They're the growth engine — every visitor is a potential lead for the next campaign.

**Needs:** A compelling scroll experience. No guilt-tripping. A clear way to stay connected (waitlist signup).

---

## Scope

### In Scope (MVP)

- **Campaign page:** The homepage IS the campaign. Hero, story, countdown, exchange tiers, progress bar, content unlocks, activity feed, community wall, budget transparency, next story signup.
- **Exchange system:** Four tiers (Premium auction, Standard prints, Personal thank-you cards, Supporter name on wall). Fixed-price checkout + auction bidding.
- **Payments:** Lago + Stripe. Fee breakdown at checkout (£2 platform + £1 Creator Fund + processing). Multi-currency display.
- **Living story:** Story updates timeline (donor-gated progress updates + public milestone unlocks). Weekly minimum cadence.
- **Engagement mechanics:** 30-day countdown, live activity feed (Pusher realtime), milestone progress bar with content unlocks at 25/50/75/100%, founding supporter badges (#1-50), supporter count.
- **Funder dashboard:** `/me` — campaigns supported, exchange status, updates.
- **Admin panel:** Publish updates, manage tiers, view orders, track fulfillment.
- **Email:** Transactional via Resend (receipts, update alerts, auction notifications).
- **Print fulfillment:** API integration with Prodigi/Gelato for standard tier prints.
- **Static pages:** About, safeguarding policy, terms, privacy.
- **Archived stories:** `/story/[slug]` for completed campaigns in "living story" mode.
- **Waitlist:** Email capture for next story, with campaign source tracking.
- **Content:** Campaign Zero populated with Bren's existing Siargao content + documentary footage.

### Out of Scope (V2+)

- Campaign creator self-service / submission form (`/submit`)
- Campaign browsing / discovery (multi-campaign homepage)
- Brand sponsorship infrastructure
- QR codes on prints linking back to campaign story
- Advanced analytics for campaign creators
- Social sharing optimisation (OG cards, etc.)
- Mobile native app
- Comment threads / chat (too moderation-heavy for MVP)
- Automated content pipeline (editorial is manual for MVP)

---

## Constraints

### Technical

- **Boilerplate:** Built on swanbo-com/boilerplate (Next.js 16, Tailwind v4, Clerk, Lago, shadcn/ui). Deployed via swanbo-com/deployment (Docker + Traefik on DO VPS). See `@future-ly-architecture.md`.
- **Hosting:** DigitalOcean VPS (existing infrastructure). Docker + Traefik. Blue/green deploys. Strapi on VPS, Next.js on VPS, PostgreSQL on VPS. GitHub Actions CI/CD.
- **Budget:** $39-145/month infrastructure. No VC. CIC structure means lean ops.
- **Architecture principles:** Feature-based folder structure, max 200 lines per file, colocated tests, path aliases (`@/`). See `@Code Architecture Principles.md`.

### Content

- **No stock photography.** If we don't have real photos, we don't launch.
- **Documentary backing.** Campaign Zero is backed by a documentary shoot (Bren + Rick). This is the content engine — the platform is the documentary's companion experience.
- **Minimum content commitment:** Named content lead (Bren) committed to weekly updates for the 30-day window.

### Legal & Compliance

- **CIC structure:** Asset lock. All fund transfers to external project bodies require CIC Regulator consent. CIC36 must include this language.
- **Safeguarding:** Launch blocker. Written parental consent (bilingual), DBS/NBI clearance, content review process, published safeguarding policy. See `@future-ly-security.md`.
- **VAT:** Exchanges are commercial sales (VATable above £90k threshold). Donations are not. Structure from day one.
- **GDPR:** Full compliance. Data handling for minors requires extra care.
- **Philippines compliance:** SEC registration check, DSWD clearance, RA 7610 and RA 9775 compliance.

### Brand

- **Voice:** Documentary filmmaker. Short, punchy, real. Never charity-guilt or startup-hype. See `@future-ly-brand-spec.md`.
- **Visual:** Dark mode primary for campaign pages. Light mode for informational pages. Teal accent (#0D9488). The platform disappears; the content is the design.
- **Never say:** "Donate", "help these people", "make a difference", "revolutionary", "amazing", "just £5 can…"

---

## Timeline

### Phase 1: MVP (2 Weeks)

| Week | Deliverables |
|------|-------------|
| **Week 1** | Boilerplate setup + PostgreSQL schema. Homepage + campaign page (story, tiers, budget). Fixed-price checkout (Lago + Stripe). Story update timeline. Community wall. Admin panel (publish updates, manage tiers, view orders). |
| **Week 2** | Auction system (bidding, countdown, winner notification). Funder dashboard (`/me`). Email notifications (Resend). Print fulfillment API (Prodigi/Gelato). About + safeguarding + terms pages. Mobile responsive pass + polish. Deploy to production. |

### Phase 2: Multi-Campaign (Month 2)

Campaign One (Our Ocean School) goes live. Campaign browsing/discovery. Submission form. Enhanced admin analytics. QR codes on prints. Social sharing optimisation.

### Phase 3: Growth (Month 3-4)

Campaign creator self-service. Brand sponsorship. Advanced video hosting (Mux/Cloudflare Stream). Creator analytics. API for third-party integrations.

### Pre-Launch Blockers

1. CIC resubmission (CIC36 with Regulator consent language)
2. Accountant consultation (VAT, exchange-vs-donation split)
3. Safeguarding framework complete (consent forms, policy, named officer)
4. Content shoot planning (Siargao trip dates, shot list aligned to campaign page)
5. Print partner setup (Prodigi/Gelato accounts, test prints, API confirmed)

---

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Platform feels empty with 1-2 campaigns | **Solved** | "One Story" model makes this a feature. The homepage IS the campaign. Scarcity is the design. |
| Story updates go stale | High | Content commitment agreement. Weekly minimum. Automated reminders. Dashboard shows "days since last update." Documentary backing provides content surplus. |
| Shipping economics don't work for premium items | Medium | Price shipping into auction reserve. Offer local pickup. Use global POD for prints. Minimum auction price £200 (covers PH→UK freight + customs). |
| VAT/tax treatment is wrong | High | Accountant advice before launch. Separate exchanges (VATable) from donations (not VATable) from day one. |
| Safeguarding incident | Critical | Complete policy before launch. Written consent for every child. No content without review. Incident response plan. Named safeguarding officer. **Launch blocker.** |
| Campaign funds misused | High | Funds held by CIC, not project. Disbursed against budget line items with receipts. CIC Regulator consent for all transfers. Public budget shows spend vs. plan. |
| All funders are personal network | Medium | Track "degrees of separation." If 80%+ are known contacts at day 30, distribution failed. Invest in Vice feature, Bren's audience, surf/skate media before launch. |
| Payment processor failure | Medium | Stripe primary + Wise backup. Multi-currency resilience via CIC Wise Business Account. |

---

## Team

| Person | Role | Responsibility |
|--------|------|---------------|
| **John (Swanbo)** | Platform / Strategy | Platform build, campaign structure, business strategy, distribution |
| **Bren** | Content / On-ground (Siargao) | Campaign Zero content lead, community relationships, weekly updates |
| **Rick** | Video / Photography | Documentary production, editorial direction |
| **Janiece** | Nonprofit Ops / Safeguarding | CIC governance, safeguarding policy, named safeguarding officer |
| **Sam Graham** | Editorial / Distribution | Vice connection, editorial coverage, launch amplification |

---

## Related Documents

| Document | Purpose |
|----------|---------|
| `future-ly-brand-spec.md` | Visual identity, voice, tone, positioning |
| `future-ly-architecture.md` | Technical architecture, stack, folder structure, data flow |
| `future-ly-data-model.md` | Database schema (PostgreSQL) + Strapi content types |
| `CLAUDE.md` | Project context for Claude Code dev handoff |
| `future-ly-content-strategy.md` | Content pipeline, gating model, editorial scroll framework |
| `campaign-zero-siargao.md` | Campaign Zero: budget, exchanges, schedule, narrative arc |
| `future-ly-economics.md` | Fee model, multi-currency, creator payouts, projections |
| `future-ly-launch-plan.md` | Channels, waitlist strategy, pre-launch, "one story" launch |
| `future-ly-ux-spec.md` | Emotional design, micro-interactions, accessibility, mobile-first |
| `future-ly-testing.md` | Critical paths, testing pyramid, QA strategy |
| `future-ly-security.md` | Payment security, GDPR, safeguarding, content moderation |
| `wireframe-editorial-scroll.html` | Editorial scroll wireframe (ready for dev handoff) |

---

*Built from the future.ly MVP Platform Spec v1.0. References: Brand Spec, Code Architecture Principles, Emotional Design Framework, UX Foundations, Mobile First Design Principles.*
