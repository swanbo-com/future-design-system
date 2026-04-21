# future.ly — Marketing & Launch Plan

**Version:** 2.0 — MVP
**Date:** March 2026

---

## The "One Story" Launch

future.ly doesn't launch as a platform. It launches as a story. The entire site IS Campaign Zero. There's no "browse campaigns" page, no marketplace, no empty grid. One story, full focus, 30-day countdown.

This is the launch strategy: tell one story so well that people share it, fund it, and sign up for the next one.

---

## Pre-Launch (Before Campaign Zero Goes Live)

### Waitlist Building

A simple landing page before the campaign launches. One field, one sentence, one photo.

- **URL:** future.ly (or future.ly/next)
- **Copy:** "One story at a time. Leave your email. You'll be first to know."
- **Image:** A single powerful photo from Bren's existing Siargao content
- **Goal:** 200+ signups before launch

### Waitlist Sources

| Source | Action | Target | UTM |
|--------|--------|--------|-----|
| Bren's Instagram | Teaser posts from Siargao. "Something's coming." No hard pitch. | 50-100 signups | `?utm_source=bren_ig&utm_medium=social` |
| John's network | Direct shares to friends, colleagues, surf/skate community | 30-50 signups | `?utm_source=john&utm_medium=direct` |
| Rick's network | Film/photography community | 20-30 signups | `?utm_source=rick&utm_medium=direct` |
| Sam Graham (Vice) | Soft intro to the story. "Would you cover this?" | Relationship, not signups yet | `?utm_source=vice&utm_medium=press` |
| Vans Philippines | Cross-promotion potential (they've already sent decks) | Brand relationship | `?utm_source=vans_ph&utm_medium=partner` |
| Surf/skate forums | Reddit r/skateboarding, surf forums. Genuine posts, not spam. | 20-30 signups | `?utm_source=reddit&utm_medium=social_organic` |

**Every link shared gets a UTM.** This is critical for stranger ratio measurement. No naked links.

### Pre-Launch Content (Bren's Channels)

Bren builds anticipation on his Instagram with documentary-style content from Siargao. No mention of future.ly yet — just the story. The platform reveal comes at launch.

| Week Before Launch | Content |
|-------------------|---------|
| -3 weeks | Behind-the-scenes stills. Kids skating. No context. Just powerful images. |
| -2 weeks | Short video clip (15s). Sound of wheels on asphalt. "Coming soon" energy. |
| -1 week | "The story behind the photo." One post explaining what's happening. First mention of "something we're building." |
| Launch day | Full reveal. Link to future.ly. "This is live. 30 days." |

---

## Launch Day

### The Launch Sequence

1. **Email the waitlist.** Subject: "It's live. 30 days. One story." Link to future.ly. Short, documentary-tone email. No hype. UTM: `?utm_source=waitlist&utm_medium=email&utm_campaign=launch`
2. **Bren posts on Instagram.** Full-bleed photo. "Siargao. The kids who build skateboards from scrap wood. The story is live. Link in bio." One post, one story slide, one reel. Link: `?utm_source=bren_ig&utm_medium=social&utm_campaign=launch`
3. **John shares to network.** Personal, authentic message. "We built this. Here's why." UTM: `?utm_source=john&utm_medium=direct&utm_campaign=launch`
4. **Rick shares to film/photo community.** "I'm documenting this. Watch the story unfold." UTM: `?utm_source=rick&utm_medium=direct&utm_campaign=launch`
5. **Monitor.** Track signups, exchanges, stranger ratio from hour one via Plausible + admin dashboard.

### Launch Day Targets

- 10+ exchanges in first 24 hours
- 30+ waitlist signups for "next story"
- Activity feed showing real transactions (social proof)
- First content unlock (25%) feels achievable within the week

---

## Analytics & Measurement

### Plausible Analytics (Self-Hosted)

Self-hosted on the VPS alongside the app. No cookies, no consent banner, GDPR-compliant. Not blocked by ad blockers when served from the same domain.

**Page-level tracking (automatic):**
- Campaign page views, time on page, bounce rate
- Referral sources and UTM breakdown
- Geographic distribution (which countries are visiting)
- Device breakdown (mobile vs desktop — expect 60%+ mobile from Instagram)

**Custom events (instrumented in code):**

| Event | Trigger | Properties |
|-------|---------|-----------|
| `tier_selected` | User clicks an exchange tier | `tier`, `utm_source` |
| `checkout_started` | User reaches checkout page | `tier`, `utm_source` |
| `exchange_complete` | Stripe payment confirmed | `tier`, `utm_source`, `currency` |
| `waitlist_signup` | Email submitted on waitlist form | `source` (footer, /next page, etc.), `utm_source` |
| `content_unlock_viewed` | User views unlocked content | `milestone_percent` |
| `auction_bid` | User places a bid | `item`, `utm_source` |
| `story_update_viewed` | Funder views a gated update | `update_id` |

**Funnel analysis:**
`page_view → tier_selected → checkout_started → exchange_complete`

Track this funnel by UTM source to identify which channels convert, not just which channels drive traffic.

### Stranger Ratio Measurement

The most important distribution metric. Concrete implementation:

**Step 1: UTM capture on first visit**
- JavaScript on page load: capture `utm_source`, `utm_medium`, `utm_campaign` from URL
- Store in a cookie (`_futurely_utm`, 30-day expiry) so it persists across pages
- If no UTM present: source = 'organic' (direct traffic, SEO, unattributed social)

**Step 2: UTM attached to every order**
- At checkout, read the UTM cookie and write to `orders.utm_source`, `orders.utm_medium`, `orders.utm_campaign`
- Auto-classify `acquisition_source`:
  - `utm_source` in ('john', 'rick', 'janiece', 'bren_direct') → `acquisition_source = 'direct_share'`, `is_known_network = true`
  - `utm_source` = 'waitlist' → check if waitlist signup itself came from a known-network UTM → classify accordingly
  - `utm_source` in ('bren_ig') → `acquisition_source = 'social_organic'`, `is_known_network = false` (Bren's audience are strangers to John)
  - `utm_source` in ('vice', 'huck', 'thrasher', etc.) → `acquisition_source = 'press'`, `is_known_network = false`
  - `utm_source` = 'reddit' → `acquisition_source = 'social_organic'`, `is_known_network = false`
  - No UTM (organic) → `acquisition_source = 'organic'`, `is_known_network = false`

**Step 3: Manual override**
- Admin dashboard: orders list with "Mark as known network" toggle
- For when someone you know finds the site organically (no UTM) but you recognise the name/email

**Step 4: Dashboard display**
- Admin dashboard shows live stranger ratio: `stranger_count / total_count`
- Day-7 snapshot and day-30 snapshot (saved to a `metrics_snapshots` table or calculated on demand)
- Breakdown by acquisition source (table: source, medium, count, total £, conversion rate)

**Classification summary:**

| UTM Source | Known Network? | Rationale |
|-----------|---------------|-----------|
| `john` | Yes | Personal network |
| `rick` | Yes | Personal network |
| `janiece` | Yes | Personal network |
| `bren_direct` | Yes | Direct share from team member |
| `bren_ig` | No | Bren's Instagram audience are strangers to the platform team |
| `waitlist` | Depends | Trace back to original waitlist signup UTM |
| `vice`, `huck`, `thrasher` | No | Press/media audience |
| `reddit` | No | Organic discovery |
| `vans_ph` | No | Partner audience |
| No UTM (organic) | No | Direct traffic, SEO, unattributed |

### Kill Signal Dashboard

The admin panel should surface these metrics prominently:

| Metric | Target | Alert Threshold | Kill Signal |
|--------|--------|----------------|------------|
| Day 7 funding % | 30%+ | Below 20% (amber) | Below 15% (red) |
| Stranger ratio (day 7) | 50%+ | Below 30% (amber) | Below 20% (red) |
| Total exchanges (day 30) | 50+ | Below 30 (amber) | Below 20 (red) |
| Average exchange value | £30+ | Below £20 (amber) | Below £15 (red) |
| Time on page | 3+ min | Below 2 min (amber) | Below 1 min (red) |
| Waitlist signups | 100+ | Below 50 (amber) | Below 30 (red) |

Colour-coded cards on the admin dashboard. Checked daily during the 30-day window.

---

## Distribution Strategy (30-Day Campaign)

### Priority Channels

| Priority | Region | Channels | Why | UTM |
|----------|--------|----------|-----|-----|
| 1 | US West Coast | Instagram, TikTok, skate media | Largest skate culture, highest disposable income | per-channel |
| 2 | UK | Instagram, X, surf/skate UK media | Home market. CIC credibility. Bren's existing audience. | per-channel |
| 3 | Australia | Instagram, surf media | Strong surf/skate culture. Proximity to SE Asia. | per-channel |
| 4 | Philippines | Facebook, Instagram, local media | Local pride. Diaspora audience. Bren's community. | per-channel |
| 5 | Europe (DE, FR, NL) | Instagram, skate media | Growing skate scenes post-Olympics. | per-channel |

### Channel Strategy

#### Instagram (Primary)

- **Bren's account:** Daily content from Siargao during shoot. Authentic, not branded. Let the story sell itself. All links: `?utm_source=bren_ig&utm_medium=social`
- **future.ly account:** Campaign updates, milestone celebrations, content unlock announcements. All links: `?utm_source=futurely_ig&utm_medium=social`
- **Format:** Single image posts (most shareable for this audience), Stories for daily updates, Reels for short clips.
- **Tone:** Visual-first. Minimal caption. "Siargao. Day 12." — not "Check out this INCREDIBLE moment!"

#### Vice / Editorial Coverage

- **Contact:** Sam Graham (confirmed)
- **Pitch:** Documentary-style feature. "The kids building skateboards from coconut wood — and the platform that funds the story."
- **Timing:** Ideally Week 2 (campaign has momentum, content unlocks happening, social proof established)
- **Assets:** High-res photos from Bren, video clips, behind-the-scenes access
- **Angle:** Not a "crowdfunding platform" story. A documentary/community story that happens to be funded through a platform.
- **UTM:** `?utm_source=vice&utm_medium=press&utm_campaign=campaign_zero`

#### Surf & Skate Media

| Publication | Angle | Timing | UTM Source |
|------------|-------|--------|-----------|
| Huck Magazine | Community / grassroots skateboarding | Week 1-2 | `huck` |
| Surfer's Journal | Documentary angle, visual storytelling | Week 2 | `surfers_journal` |
| Thrasher | Skateboarding culture, DIY ethos | Week 1 | `thrasher` |
| Free Magazine | UK surf/skate community | Week 1 | `free_mag` |
| Local Philippines media | Local pride, Siargao community | Pre-launch or Week 1 | `ph_media` |

#### Reddit & Forums

Organic only. Genuine posts. No spam. Links use `?utm_source=reddit&utm_medium=social_organic`

- r/skateboarding — if story gains traction, share documentary clips
- r/Philippines — local interest angle
- r/filmmaking — documentary process angle
- Surf/skate forums — community-specific, genuine engagement

#### Email

- **Launch email** to waitlist (launch day). UTM: `?utm_source=waitlist&utm_medium=email&utm_campaign=launch`
- **Week 1 update** to waitlist + supporters: momentum report, first content unlock. UTM: `&utm_campaign=week1_update`
- **Week 2 milestone** email: 50% funded (if achieved), second content unlock
- **Final 48 hours** email: urgency (legitimate — campaign closes), last chance for exchanges
- **Post-campaign** email: thank you, impact summary, tease next story

Email tone: like a message from someone on location. Short, specific, one photo. Not a marketing blast.

---

## Growth Mechanics (Built Into the Product)

### "Sign Up for the Next Story" (Growth Engine)

Below the campaign, a simple CTA: "This is our first story. The next one is coming. Sign up to be the first to know." Email capture with a teaser of Campaign One (Our Ocean School — one image, one line).

This converts every visitor into a lead for the next campaign, even if they don't fund this one. Plausible tracks `waitlist_signup` events with source attribution.

### Content Unlocks as Share Triggers

When a milestone is hit and content is unlocked, it's public — visible to everyone. This is the share moment: "We just unlocked new documentary footage — help us get to 75%." Supporters share because they feel ownership; visitors see the quality and want in.

### Activity Feed as Social Proof

The live activity feed ("Sarah from Bristol backed the Standard tier — 3 min ago") creates herding behaviour. Late-stage visitors see real people, real transactions, real momentum. Powered by Pusher for realtime updates.

### Founding Supporter Status

First 50 backers get a numbered badge. "Founding Supporter #23." Creates early-bird urgency without discounting. The badge is permanent — visible on the community wall forever.

---

## The Stranger Ratio (Critical Metric)

The most important distribution metric is the **stranger ratio**: what percentage of funders are NOT within the personal network of the team?

| Metric | Target | Kill Signal |
|--------|--------|------------|
| Day 7 stranger ratio | 50%+ | Below 20% |
| Day 30 stranger ratio | 60%+ | Below 30% |

If 80%+ of funders are known contacts at day 30, the story isn't reaching strangers. The product works but distribution doesn't. Before launching, invest in:
1. Vice feature timing (editorial coverage brings strangers)
2. Bren's audience activation (his followers are strangers to John)
3. Surf/skate media outreach (new audiences entirely)

See **Analytics & Measurement** section above for full implementation details.

---

## Post-Campaign Transition

### Campaign Zero → Living Story Mode

After 30 days (or if fully funded earlier):
1. Exchange tiers close (7-day grace period if partially funded)
2. Campaign page transitions to living story mode (updates continue)
3. Homepage begins teasing Campaign One with a signup wall
4. "This was our first story. Here's what happened. The next one is coming."

### Building Toward Campaign One

| Action | Timing |
|--------|--------|
| Tease Campaign One on future.ly | Post Campaign Zero close |
| Email Campaign Zero waitlist about Campaign One | 2 weeks after close |
| Campaign One content production (Rick + Our Ocean School) | Month 2 |
| Campaign One launches | Month 3 |
| Measure: 20%+ of Campaign Zero funders also support Campaign One | Campaign One close |

### The Narrative Arc of the Platform

Campaign Zero → Campaign One → Campaign Two creates the platform's own story: "This was our first. Then came Mentawai. Now meet [the next community]." Each campaign builds on the last. The waitlist grows. The community compounds.

---

## Budget (Marketing)

MVP marketing budget is effectively £0. Organic distribution only.

| Channel | Cost | Notes |
|---------|------|-------|
| Instagram (organic) | £0 | Bren's existing audience + future.ly account |
| Email (Resend) | £0 | Free tier (100/day) |
| Press outreach | £0 | Direct relationships (Sam Graham, etc.) |
| Reddit/forums | £0 | Organic, genuine engagement |
| Plausible analytics | £0 | Self-hosted on VPS |
| Paid Instagram/Meta ads | £0 (MVP) | V2 consideration if organic proves conversion |

If organic distribution fails (stranger ratio below 30% at day 14), consider:
- Paid Instagram boost on Bren's best-performing content (£100-200 test budget)
- Targeted at skate/surf interest audiences in US/UK/AUS
- UTM: `?utm_source=meta_ads&utm_medium=paid&utm_campaign=campaign_zero`

---

## Related Documents

| Document | Relevance |
|----------|-----------|
| `campaign-zero-siargao.md` | Campaign-specific distribution plan, content calendar |
| `future-ly-brand-spec.md` | Voice, tone, social content principles |
| `future-ly-content-strategy.md` | Content pipeline, social content format |
| `future-ly-project-brief.md` | Success/kill signals, timeline |
| `future-ly-data-model.md` | UTM fields on orders and waitlist tables, stranger ratio queries |
| `future-ly-architecture.md` | Plausible setup, Pusher for realtime |

---

*Launch strategy built on the "one story" constraint. No marketing budget. No paid acquisition. Tell one story so well that people share it. Every link gets a UTM. Measure the stranger ratio from day one. If strangers find and fund the story, the platform thesis works.*
