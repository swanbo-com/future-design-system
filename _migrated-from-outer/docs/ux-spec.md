# future.ly — Emotional Design & UX Spec

**Version:** 1.0 — MVP
**Date:** March 2026
**References:** Emotional Design Framework, UX Foundations, Mobile First Design Principles, Brand Spec

---

## Design Philosophy

**The platform disappears. The content is the design.**

future.ly is a dark, minimal frame for documentary photography and video. The UI stays back. The images and clips carry all the colour, energy, and emotion. When you're scrolling a campaign, you should barely notice the platform — you're in the story.

"Minimal" doesn't mean cold. It means warm and inviting with generous whitespace, easy to read, easy to share.

---

## The Emotional Arc

Every visitor goes through an emotional journey. The page is designed to move them through these stages:

| Stage | Feeling | Design Trigger |
|-------|---------|---------------|
| **Landing** | "I found something genuine" | Full-bleed hero image. Dark background. Cinematic. Countdown visible but not screaming. |
| **Discovery** | "I want to know more" | Story unfolds on scroll. Short paragraphs. Big images. Inline video clips autoplay muted. |
| **Connection** | "I know these people" | "Meet the people" section. Individual profiles with faces, names, one-line stories. Specific. Human. |
| **Trust** | "I can see where the money goes" | Budget breakdown. Fee transparency. CIC disclosure. Everything visible. |
| **Participation** | "I want to be part of this" | Exchange tiers with tangible items. Clear CTA. Activity feed showing others funding. |
| **Belonging** | "I'm in. I'm one of them." | Community wall. Founding supporter badge. Funder message. Update notifications. |
| **Advocacy** | "I need to share this" | Content unlocks are shareable. Milestone celebrations. Social proof numbers. |

### Norman's Three Levels Applied

| Level | future.ly Application |
|-------|----------------------|
| **Visceral** (first impression) | Dark cinematic canvas. Full-bleed photography. Teal accent pops. Immediate feeling: "this is premium, this is real." |
| **Behavioural** (ease of use) | Clear scroll narrative. Obvious exchange tiers. Simple checkout. Instant feedback on every action. |
| **Reflective** (identity) | "I'm the kind of person who finds real stories and supports them." Founding Supporter #23. Print on the wall. Story I can tell friends. |

---

## Mobile-First Design

Mobile is the primary experience. 60%+ of traffic will be mobile (Instagram → campaign page flow).

### Core Principles

- **One column.** Single-column narrative scroll. No sidebar on mobile.
- **Touch targets:** Minimum 44×44px for all interactive elements.
- **Thumb zone:** Primary CTAs (fund, bid) in the bottom center of the screen.
- **Full-bleed images:** Images break out to full viewport width on all screen sizes. This is the visual signature.
- **Text width:** Body text constrained to ~640px (desktop). On mobile, full-width with comfortable side padding (20px).
- **Performance:** Lazy load images. Skeleton screens while loading. Small initial payload. Progressive video loading via Mux (adaptive bitrate).

### Responsive Breakpoints

| Breakpoint | Layout Changes |
|-----------|----------------|
| **Mobile (<640px)** | Single column. Exchange tiers as stacked cards. Countdown in sticky header on scroll. Navigation collapses to hamburger. |
| **Tablet (640-1024px)** | Still single column for story. Exchange tiers 2-up grid. More whitespace. |
| **Desktop (1024px+)** | Story column (640px) with sticky sidebar for exchange tiers and progress. Full navigation. |

---

## Micro-Interactions & Animation

### Principles

Based on the Emotional Design Framework:
- Button feedback: < 100ms
- Page transitions: 200-300ms
- Loading indicators: appear after 300ms
- Complex animations: max 400ms
- **If users perform an action hundreds of times, don't animate it.** Animation should enrich, not slow down.

### Key Interactions

#### Countdown Timer

- Large, beautiful, always visible in sticky header on scroll.
- Format: **Days : Hours : Minutes** — not seconds. Seconds feel like a sales timer. Days and hours feel like a deadline.
- Gentle pulse animation on the colon separators (1s interval, subtle).
- Final 48 hours: timer transitions to amber warning colour. Text updates: "Final hours."

#### Progress Bar

- Not a simple fill bar. A narrative progress bar with four milestone markers at 25/50/75/100%.
- **Animation:** Fills smoothly when funding total updates (400ms ease-out). Milestone marker pulses briefly when crossed.
- **Labels:** Each milestone shows what that funding level unlocks for the project. "25% — Safety gear for all 15 kids."
- **Celebration:** When a milestone is crossed, a brief confetti burst or glow effect on the milestone marker. 800ms total. Not over the top.

#### Activity Feed

- Real-time ticker via Pusher: "Sarah from Bristol backed the Standard tier — 3 min ago."
- **Animation:** New entries slide in from the top (200ms ease-out). Previous entries shift down.
- **Privacy:** First name + city only. Anonymous backers: "Someone from London." No amounts shown (avoids wealth signalling).
- Shows last 10 entries, auto-scrolls.

#### Content Unlocks

- Locked state: teaser thumbnail with frosted glass overlay. Lock icon. "Unlocks at 50% funded."
- **Unlock animation:** Glass frost dissolves (300ms). Content fades in (400ms). Brief shimmer/glow on the milestone marker.
- Unlocked content: fully viewable, shareable. Clear "Play" button for video unlocks.

#### Exchange Tier Cards

- **Hover (desktop):** Subtle lift (2px translate-y, shadow increase). 200ms.
- **Selection:** Teal border appears. Selected state clear and persistent.
- **Sold out / limited:** "3 remaining" counter. When 0: card dims, "Sold out" badge. No fake scarcity.

#### Checkout

- Fee breakdown appears as a stacked animation: each line item slides in sequentially (100ms intervals).
- "Net to project" line highlighted in teal — the money going to the community.
- Payment confirmation: green checkmark with brief scale-up (300ms). "You're in. Welcome to the story."

#### Community Wall

- Names appear as soft fade-in tiles. No jarring grid layout.
- Founding Supporter badges: numbered, teal accent, slightly larger tile.
- Funder messages appear below the name in smaller text.

#### Scroll-Driven Narrative

- Story sections reveal with subtle fade-in as they enter the viewport (IntersectionObserver, 400ms fade).
- Full-bleed images have a parallax hint (very subtle, 5-10px). Not aggressive.
- Inline video clips autoplay muted when they enter the viewport. Sound icon pulsates once to suggest tap-to-unmute.

---

## Gamification (Ethical Engagement)

These are behavioural design mechanics grounded in research. Every mechanic serves the story and community. Nothing is fake, nothing is manipulative, everything is transparent.

### What We Do

| Mechanic | Psychology | Implementation |
|----------|-----------|----------------|
| 30-day countdown | Legitimate deadline. Creates narrative arc: launch energy → mid-campaign → final push. | Sticky header. Days:Hours:Minutes. |
| Milestone progress bar | Goal gradient effect. Closer to goal = more motivation. | Visual milestones with content unlock rewards. |
| Content unlocks | Collective achievement. "We did this together." | Public reveals at 25/50/75/100%. |
| Activity feed | Social proof / herding. 50% more likely to back when seeing peer activity. | Pusher realtime. First name + city. |
| Supporter count | Tribal psychology. People join forming crowds. | "147 people are funding this story" — prominent, next to progress. |
| Founding supporter badges | Identity, not perks. Numbered. Permanent. | First 50 backers. "#23" visible on community wall. |

### What We Deliberately Don't Do

| Mechanic | Why We Skip It |
|----------|---------------|
| Fake scarcity ("only 10 left!") | Prints are unlimited. Lying destroys trust. Premium boards have real scarcity — we don't need to manufacture it. |
| Auto-sharing to social media | Never post without explicit action. Social manipulation backfires. |
| Gamified amounts ("coffee = £5") | Patronising. Cheapens the exchange model. |
| Streak mechanics | Doesn't fit a 30-day campaign. Streaks are for daily-use apps. |
| Leaderboards by amount | Celebrates wealth, not generosity. A £10 supporter is as valuable as a £200 one. |
| Countdown in seconds | Seconds feel like Black Friday. Days and hours feel like a deadline. |
| Guilt modals | No popups, no "are you sure you want to leave?", no sad-face overlays. |

---

## Accessibility

### WCAG 2.1 AA Compliance

| Requirement | Implementation |
|------------|----------------|
| **Colour contrast** | Teal (#0D9488) on dark (#0F0F0F) = 4.6:1 ratio. Meets AA for large text. For small text, use lighter teal (#14B8A6) which hits 5.3:1. Text (#FAFAF9) on dark (#0F0F0F) = 18.5:1. |
| **Keyboard navigation** | All interactive elements focusable. Focus ring visible (teal outline). Tab order follows visual hierarchy. |
| **Screen readers** | Semantic HTML. ARIA labels for dynamic content (activity feed, countdown, progress bar). Alt text for all images. |
| **Motion sensitivity** | Respect `prefers-reduced-motion`. Disable parallax, auto-scroll, and entrance animations. Countdown still updates but without animation. |
| **Text sizing** | Body 1rem (16px) mobile, 1.125rem (18px) desktop. Line-height 1.65. Users can zoom to 200% without layout breaking. |
| **Touch targets** | Minimum 44×44px. 8px minimum spacing between targets. |
| **Video** | All documentary content subtitled. Mux player supports closed captions. Transcripts available for screen readers. |
| **Colour alone** | Never use colour as the only indicator. Progress bar has labels + numbers + colour. Locked/unlocked content uses icon + text + visual treatment. |

### Dark Mode Accessibility Notes

Dark mode is the primary UI but requires careful contrast handling:
- Avoid pure white (#FFFFFF) on pure black — use warm white (#FAFAF9) on near-black (#0F0F0F) for reduced eye strain
- UI elements use surface colour (#1A1A1A) for layered depth
- Light mode available for informational pages (about, transparency, legal) where extended reading is expected

---

## Design System Tokens

### Colour

```css
/* Core */
--bg: #0F0F0F;
--surface: #1A1A1A;
--accent: #0D9488;
--accent-light: #14B8A6;
--accent-muted: #0F766E;
--accent-wash: rgba(13,148,136,0.1);
--text-primary: #FAFAF9;
--text-secondary: #A8A29E;

/* Semantic */
--success: #059669;
--warning: #D97706;
--error: #DC2626;

/* Light mode (informational pages) */
--bg-light: #FAFAF9;
--surface-light: #FFFFFF;
--text-light: #171717;
```

### Typography

```css
/* Font: Inter */
--font-display: 2.5rem;     /* 40px — campaign title */
--font-h1: 2rem;             /* 32px — section headers */
--font-h2: 1.5rem;           /* 24px — sub-sections */
--font-h3: 1.25rem;          /* 20px — labels */
--font-body: 1rem;           /* 16px mobile, 18px desktop */
--font-small: 0.875rem;      /* 14px — captions, metadata */
--font-micro: 0.75rem;       /* 12px — badges, timestamps */

--line-height: 1.65;
--content-width: 640px;      /* Max width for text blocks */
```

### Spacing

```css
--space-unit: 4px;
--radius-default: 8px;
--radius-card: 12px;
--gap-major: 48-64px;        /* Between major sections */
--gap-minor: 24-32px;        /* Within sections */
```

---

## Page-by-Page UX Notes

### Homepage / Campaign Page (Dark Mode)

The homepage IS the campaign. Eight sections in a single scroll:

1. **Hero:** Full-bleed cinematic image. Countdown. One-sentence pitch. "Support this story" CTA. Supporter count.
2. **The Story:** Photo-led narrative. Editorial scroll framework. Full-bleed images. Inline video clips.
3. **Exchange Tiers:** Sticky sidebar (desktop) / card section (mobile). Photo of what you get. Price. "What your money funds." Remaining count if limited.
4. **Content Unlocks:** Four locked/unlocked visual blocks. Teaser thumbnails for locked. Playable for unlocked.
5. **Activity Feed + Community Wall:** Live ticker. Full wall grid with founding badges.
6. **Budget:** Transparent breakdown. Collapsible but visible. The trust mechanic.
7. **Next Story:** Teaser image from Campaign One. One line. Email signup.
8. **Footer:** CIC info. Links. Creator Fund transparency.

### Checkout (Dark Mode)

Clean. Transparent. No surprises.
- Fee breakdown visible before "Pay" button
- Net to project highlighted in teal
- Shipping address form (if physical exchange)
- Funder message field ("Leave a message for the community wall")
- Anonymous option checkbox
- Post-payment: celebration confirmation. "You're in. Welcome to the story."

### Funder Dashboard `/me` (Dark Mode)

- Campaigns supported (list with hero images)
- Exchange status per order (pending, fulfilled, shipped, delivered)
- Tracking numbers when available
- Access to donor-gated updates
- Founding supporter badge display

### About / Transparency Pages (Light Mode)

Informational context. Extended reading. Light mode for readability.
- The CIC story. Budget diagrams. Team photos. Honest language.
- Creator Fund transparency: quarterly reports.
- Safeguarding policy.

---

## Related Documents

| Document | Relevance |
|----------|-----------|
| `future-ly-brand-spec.md` | Complete visual identity, colour palette, typography, photography principles |
| `wireframe-editorial-scroll.html` | Editorial scroll wireframe (dev handoff ready) |
| `future-ly-architecture.md` | Component structure, Mux integration for video, Pusher realtime |
| `future-ly-content-strategy.md` | Content format priorities, editorial scroll framework |
| `Emotional Design Framework.md` | Foundation principles for emotional design |
| `UX Foundations.md` | Nielsen's heuristics, cognitive psychology |
| `Mobile First Design Principles.md` | Mobile-first methodology |

---

*UX designed for documentary immersion. The platform disappears; the story commands attention. Mobile-first because the primary flow is Instagram → campaign page. Ethical gamification: every mechanic serves the story, nothing is fake.*
