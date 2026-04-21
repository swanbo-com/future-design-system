# future.ly — Content & Editorial Strategy

**Version:** 1.0 — MVP
**Date:** March 2026

---

## The Content Philosophy

The documentary is the content engine. future.ly doesn't scramble for content — it curates from a professional production pipeline. The platform is the documentary's companion experience. People follow the story on future.ly while the full film is being made.

This flips the biggest risk (stale content) into an advantage: the documentary produces more material than the platform can use. The challenge becomes curation, not creation.

Every future campaign should aim for this model: a documentary or serious content production backing the campaign, not phone footage and afterthoughts.

---

## Content Pipeline

### Documentary-Driven Production

Campaign Zero is backed by a documentary shoot. Rick and Bren produce hours of footage; the platform draws from it.

| Cadence | Content Type | Source |
|---------|-------------|--------|
| Daily (during shoot) | Short video clips (15-60s), behind-the-scenes stills | Documentary dailies — Rick and Bren select the best moments |
| Weekly | Edited video update (1-3 min) + written context | Rough cuts from documentary footage, edited for the platform |
| On milestone | Content unlock — exclusive documentary scene | Scenes from the film that won't be in the final cut, or early previews |
| Post-campaign | Living story updates as documentary progresses | Edit room updates, festival submissions, screening dates |

### Content Roles

| Person | Role | Commitment |
|--------|------|-----------|
| **Bren** | Campaign Zero content lead | Weekly platform updates for the 30-day window. Selects daily moments from shoot. |
| **Rick** | Video / editorial direction | Documentary production. Edits platform-specific video content from footage. |
| **John** | Platform publishing | Receives content from Bren/Rick, publishes via Strapi admin. Writes supporting copy. |

### Minimum Content Commitment

Even with documentary backing, every campaign must have:
- A named content lead committed to weekly updates for the 30-day window
- The documentary provides raw material; someone still needs to edit and publish platform-specific content
- Automated "days since last update" tracker in the admin dashboard
- If no update for 14+ days: campaign paused, funders notified

---

## The Living Story Structure

A living story is not a blog. It's a narrative timeline that shows how a project evolves from idea → funded → built → impact.

### Story Elements

| Element | Content | When | Access |
|---------|---------|------|--------|
| **Origin** | The founding story. How this started. Why it matters. Photos, video, raw emotion. | Launch | Public |
| **The Goal** | What specifically will be built/achieved. Transparent budget breakdown. | Launch | Public |
| **Exchange Showcase** | Photos and descriptions of what funders receive. | Launch | Public |
| **Progress Updates** | Video updates from the shoot, written context, what the money bought. | Ongoing (weekly min) | **Donor-gated** |
| **Milestone Unlocks** | Content unlocks at 25/50/75/100% funded — exclusive documentary scenes. | As achieved | **Public** (maximise sharing) |
| **Community Wall** | Names and messages from funders. Social proof and belonging. | Ongoing | Public |
| **Impact Report** | What was accomplished. Photos of the result. What's next. | Campaign complete | Public |

---

## Content Gating Model

Two types of gated content serve different purposes:

### Donor-Gated Updates (Exclusivity)

Progress updates are visible only to people who've funded the campaign. Non-donors see a teaser thumbnail + blurred excerpt with a prompt to support the story.

**Purpose:** Creates a tangible benefit of funding beyond the physical exchange. Funders feel like insiders, following a story nobody else can see.

**Implementation:** `is_gated: true` flag on Story Update in Strapi. Next.js checks PostgreSQL for active order on the campaign (user identified via Clerk session). Authenticated users with an order see full content; others see the teaser.

### Public Milestone Unlocks (Virality)

Content unlocks at 25/50/75/100% funded are public — visible to everyone. This is deliberate: public unlocks maximise sharing and reach.

**Purpose:** Creates collective momentum. "We just unlocked a new video — help us get to 75%." Shareable moments that drive organic growth.

**Implementation:** `content_unlocks` table in PostgreSQL tracks `is_unlocked` state (write-once: once true, never set back to false). Triggered server-side when `amount_raised_cents / funding_goal_cents >= milestone_percent`. Pusher broadcasts the unlock event. Push notification via Resend to all supporters.

---

## Content Unlock Plan (Campaign Zero)

Content is pre-planned and pre-loaded before launch. It's revealed, not created on the fly. Quality matters — each unlock should feel like a reward, not filler.

| Milestone | Unlock Content | Why It Works |
|-----------|---------------|-------------|
| **25% funded** | 2-minute documentary teaser — the kids, the boards, the barangay. Cinematic. This is the trailer people share. | Gives funders something powerful to share: "Watch this. Then help us fund it." |
| **50% funded** | Extended raw scene — building a board from scrap wood. Unedited, intimate. Shows the craft and reality. | No polish, just truth. The authenticity is the appeal. |
| **75% funded** | Personal video — the kids speaking directly to the community. Subtitled. Their words, their faces. | Emotional peak. The most shareable moment of the campaign. |
| **100% funded** | Full rough-cut scene from the documentary (5-10 min). An exclusive preview of the film. | Rewards the community with something genuinely exclusive. Creates anticipation for full documentary release. |

**Coordination required:** Bren and Rick plan these four content pieces before launch. The 25% teaser needs to be polished enough to share widely. The 100% unlock needs to be substantial enough to feel like a real reward.

---

## The Documentary ↔ Platform Flywheel

The documentary and the platform feed each other:

1. **Documentary → Platform:** Daily footage, edited scenes, behind-the-scenes stills become platform content
2. **Platform → Documentary:** The platform funds the project the documentary covers (equipment, ramps, gear)
3. **Platform → Documentary audience:** Platform supporters become the documentary's built-in audience (screening invites, premiere access)
4. **Documentary → Platform traffic:** The documentary's release drives new traffic back to future.ly for the next campaign

This flywheel is the long-term model. Every future.ly campaign should ideally have a documentary or serious content production attached.

---

## The Editorial Scroll Framework

The wireframe (`wireframe-editorial-scroll.html`) defines the scroll-driven narrative experience. This is the core design pattern for how stories are told on the platform.

### Key Principles

- **Photo-led.** Short paragraphs. Big images. Inline video. The content speaks for itself.
- **Full-bleed imagery.** Key images use full viewport width. Text blocks constrained to 640px. The contrast between constrained text and full-bleed images creates rhythm.
- **Inline video clips.** Short clips (10-30s) autoplay muted on scroll. Sound of wheels on concrete, kids laughing, waves. Native, embedded, seamless — not behind YouTube embeds.
- **Scroll-driven narrative.** Story unfolds as you scroll. New sections reveal as you move down. Inspired by NYT/Guardian multimedia longform.
- **One idea per scroll.** Generous whitespace. Content breathes. 48-64px between major blocks.

### Content Format Priority (MVP)

**Video-first.** The documentary backing means the platform should feel like watching a documentary. Inline clips (15-60s) play as you scroll. Full video pieces anchor the content unlocks. Photography fills gaps and works for social sharing, email, and community wall.

Video is delivered via Mux: adaptive streaming (HLS), inline player, per-minute pricing. No YouTube embeds. No iframe wrappers. First-class media.

### Ambient Audio (Optional Enhancement)

A small play button in the corner plays ambient sound from the location while you read. Optional, not intrusive. The barangay comes alive. Not MVP-critical but a powerful immersion tool for V2.

---

## Video Strategy (Mux)

### Why Mux

Documentary footage requires professional video delivery: adaptive bitrate streaming, HLS, thumbnail generation, and a clean inline player. YouTube embeds break the immersive scroll experience. Mux provides:

- Per-minute pricing ($0.007/min stored, $0.04/min delivered)
- Built-in player that can be styled to match the platform
- Adaptive streaming (adjusts quality to connection speed)
- Thumbnail and GIF generation for teasers
- Analytics (engagement, watch time)

### Video Content Types

| Type | Duration | Context | Delivery |
|------|----------|---------|----------|
| Inline scroll clips | 10-30s | Autoplay muted within story body | Mux, loop, no controls |
| Story updates | 1-3 min | Weekly progress videos | Mux, full controls, donor-gated |
| Content unlocks | 2-10 min | Milestone reveal content | Mux, full controls, public |
| Documentary scenes | 5-10 min | 100% unlock exclusive | Mux, cinema mode |

### Storage Estimates (Campaign Zero)

- 30 inline clips × 20s average = 10 min stored
- 4 weekly updates × 2 min average = 8 min stored
- 4 content unlocks × 5 min average = 20 min stored
- Total: ~38 min stored = ~$0.27/month storage
- Delivery: depends on traffic. 1,000 views × 5 min average = $200/month at peak

---

## Content Moderation

### Pre-Publication Review

All content featuring children is reviewed before publication:
- No content that could be considered exploitative, sexualising, or endangering
- No full names of children without explicit parental consent
- Location specificity limited to barangay level, not home addresses
- Two-person review for content featuring minors (Bren creates, John reviews)

### Community Wall Moderation

Funder messages on the community wall are displayed as submitted. Moderation approach:
- MVP: Manual review (low volume expected). Admin dashboard flags new entries.
- Automated filter for obvious abuse (profanity, spam) in V2.
- Right to remove entries that violate platform terms.

### Content Licensing

Projects grant future.ly a license to display content on the platform, in social media promotion, and in email communications. Photographers retain copyright and can use content in their own portfolios. License terms documented in campaign agreements.

---

## Social Content Strategy

See `@future-ly-launch-plan.md` for full marketing details. Content principles for social:

- **Visual-first.** Let the image or clip carry it. Caption is one line.
- **Platform brand stays subtle.** The story is the star, not future.ly.
- **No emoji spam.** No "Check out this INCREDIBLE moment!" energy.
- **Content from the documentary.** Same quality bar as the platform.

Example: `[Full-bleed photo of kid mid-kickflip on a hand-built board] "Siargao. Day 12."`

---

## Related Documents

| Document | Relevance |
|----------|-----------|
| `future-ly-brand-spec.md` | Voice, tone, writing principles, "what we never say" |
| `campaign-zero-siargao.md` | Campaign Zero content calendar, shoot schedule |
| `future-ly-ux-spec.md` | Editorial scroll design, animation, scroll interactions |
| `future-ly-architecture.md` | Strapi content types, Mux integration, data flow |
| `future-ly-security.md` | Content moderation, safeguarding for minors |
| `wireframe-editorial-scroll.html` | Editorial scroll wireframe (dev handoff ready) |

---

*Content strategy designed around the documentary-first model. The production pipeline creates a content surplus — the platform curates rather than scrambles.*
