# future.ly — Design Decisions (LOCKED)

**Version:** 1.0
**Date:** 14 April 2026
**Status:** awaiting John's sign-off on §10 open questions

This document is the **single source of truth** for every brand and UI decision made so far. When we iterate, we reference THIS document, we don't re-invent. Anything not locked here is either open (§10) or inherited from `docs/brand-spec.md` / `docs/logo-wordmark-brief.md` v1.6.

If a decision here conflicts with those parent docs, **this document wins** — it captures every clarification and reversal we've been through.

---

## 1. Canonical identity

| Concept | Locked value |
|---|---|
| Platform name | `future.ly` (lowercase, period is part of the mark) |
| First campaign name | `PACIFIC KINGS` (all caps) |
| Campaign naming model | Each campaign gets an all-caps project name in Blazeface Roman |
| Platform wordmark (standalone) | **JetBrains Mono Bold, lowercase** — `future.ly` |
| Campaign wordmark | **Ohno Blazeface Roman, all caps** — `PACIFIC KINGS` |
| Favicon | **Ohno Blazeface Italic** — `f.` (period is part of the mark) |
| Attribution line | `a future.ly project` in Blazeface Italic |

**Why Mono for the platform logo:** chosen in Logo Lab v1.6 after rejecting Blazeface Italic (felt feminine), Blazeface Roman (felt "expected"), and Instrument Sans Bold (too deferential). Mono reads as documentary metadata — the platform's actual voice.

**Why Blazeface Italic for the favicon:** chosen after the "128 Italic" favicon option in the design system landed. The flowing connected `f.` silhouette survives the 16 px crunch better than Roman.

---

## 2. Colour — LOCKED

No teal. No navy. No forest green. The palette is **cream + ink + vermillion**, full stop.

| Role | Hex | Where |
|---|---|---|
| **Cream** | `#F5F1EA` | Main light-mode background (informational pages, sponsor landing) |
| **Surface** | `#FFFDF8` | Cards, panels, form fields on cream |
| **Ink** | `#111111` | Primary text, 1 px borders, rules |
| **Mute / Stone** | `#6B645A` | Secondary text, captions |
| **Rule / Sand** | `#CFC4AF` | Subtle borders, subtle dividers |
| **Kraft** | `#C4A882` | Print backgrounds, photography placeholders |
| **Vermillion** | `#D93A2B` | Accent, CTA, highlighted ledger lines, focus rings |
| Vermillion Dark | `#B22D21` | Hover / destructive |
| Vermillion Light | `#E5524A` | Focus ring on dark mode |
| Amber | `#D97706` | **Only** used for countdown warning in final 48 hours |
| Dark BG | `#0F0F0F` | Dark-mode sections: waitlist, video chrome, post-conversion |
| Dark Text | `#FAFAF9` | Text on dark backgrounds |
| Dark Accent | `#F28C83` | Focus ring + links on dark backgrounds |

**Dark-mode usage rule:** dark mode is NOT the default. It appears only on the campaign page (post-launch), the waitlist capture block, and anything brand-spec §6 describes as "conversion moments." Everything else is cream.

---

## 3. Typography — LOCKED

| Family | Purpose | Self-hosted | Notes |
|---|---|---|---|
| **Ohno Blazeface** (Roman + Italic) | Display — campaign hero, section titles, story panel, merch, poster headlines | ✅ 18 OTFs | **§4a optical-size discipline is mandatory.** Never use a cut at a rendering size outside its zone. |
| **Instrument Sans** (variable 400–700) | Body / UI — campaign page body, forms, buttons, nav, UI chrome | ✅ WOFF2 variable | Self-hosted per the "no Google Fonts CDN" privacy posture |
| **JetBrains Mono** (variable 400–800) | `future.ly` wordmark, ledger amounts, milestone cascade, countdown, tabular numerals | ✅ WOFF2 variable | `font-variant-numeric: tabular-nums` on all printed numerals |

### Optical-size zones (Blazeface) — LOCKED

At 96 dpi, 1 pt ≈ 1.33 px. Pick the cut whose native zone contains the rendering size:

| Cut | Native render size | Use for |
|---|---|---|
| 72 pt | ~96 px | Hero, 72–144 px |
| 60 pt | ~80 px | Large campaign names, 60–90 px |
| 48 pt | ~64 px | T-shirt chest, story panel title, 48–72 px |
| 36 pt | ~48 px | Slide titles, press-kit headers, 36–55 px |
| 24 pt | ~32 px | Section titles, 24–40 px |
| 18 pt | ~24 px | Pull quotes, subtitles, 18–28 px |
| 16 pt | ~21 px | Editorial body, 16–23 px |
| 14 pt | ~18 px | Small italic callouts, 13–20 px |
| 12 pt | ~16 px | Smallest print, 10–15 px |

**Below 10 px rendering, don't use Blazeface at all.** Fall back to Instrument Sans or a solid shape (U+25A0 ■).

### Font loading — LOCKED

- All fonts self-hosted in `app/public/fonts/`
- Blazeface OTFs are **cmap-patched** to expose the 10 orphaned ornament glyphs at `U+E000`–`U+E009`
- `fonts.css` declares every face; `globals.css` `@theme` binds them to `--font-sans` / `--font-mono` / `--font-display` / `--font-display-{cut}`

---

## 4. Glyph vocabulary — LOCKED ROLES

Every mark has exactly ONE job. No cross-over.

### Dingbats + arrows (Unicode, directly addressable)

| Glyph | Codepoint | Role |
|---|---|---|
| **❉** | `U+2749` | **Canonical inline mark.** Ledger bullets, countdown flankers, email subject, story-panel divider, stamp divider, sticker seal (solo @ 56 px). |
| ✸ | `U+2738` | Surf-poster heritage accent. Used sparingly. |
| ✹ | `U+2739` | Star-stamp applications (Lockup B4). |
| ✺ | `U+273A` | 16-pt asterisk, rare. |
| ★ | `U+2605` | Rating / ranking contexts only. Not the brand mark. |
| **➤** | `U+27A4` | **Primary CTA arrow.** Story-panel CTA, mailer origin, press-kit kicker. |
| **➥** | `U+27A5` | **The only editorial link glyph.** "Back to all updates." |
| **➾** | `U+27BE` | **Closing flourish.** End-of-story mark, press-kit kicker flankers. |
| ✍ | `U+270D` | Founder / editor voice. "Note from John" updates. |
| ✒ | `U+2712` | Editor's mark. "Edited for length and clarity." |
| ☞ | `U+261E` | Rare press pointer. |
| ✌ | `U+270C` | Founding-supporter reveal. Single-use. |
| ■ | `U+25A0` | **Sub-12 px bullet** where Blazeface hairlines collapse. |

### Fleuron pairs (patched into cmap at BMP PUA)

Five left/right mirrored pairs. **Used only as paired flankers around titles, never as bullets or running borders.** Maximum one pair per composition.

| Pair | Codepoints | Width (upem) | Canonical role |
|---|---|---|---|
| A | `U+E000` / `U+E001` | 1184 | Editorial / secondary. Story-panel kicker at smaller scale. Was v1.0 primary; demoted in v1.0c after visual A/B against the specimen. |
| B | `U+E002` / `U+E003` | 1081 | Secondary hero flanker. Press-kit title card, pitch-deck section header, dark-mode hero alternate. Was primary hero in v1.0c–v1.0d; demoted 17 Apr 2026 after contact-sheet visual confirmation (Plan 01-02). |
| C | `U+E004` / `U+E005` | 967 | Small-scale chapter mark ("CHAPTER ONE") |
| **D** | `U+E006` / `U+E007` | 1123 | **Primary hero flanker.** PACIFIC KINGS canonical lockup (horizontal + stacked), campaign hero, launch poster title. Confirmed visually by John against the full contact sheet, 17 Apr 2026. |
| E | `U+E008` / `U+E009` | 914 | Smallest / founding-supporter badge |

### Hard rules for ornaments

1. **Flankers only.** Always paired left/right around a title. Never bullet, divider, or solo decoration.
2. **One line only.** Title must fit on one line between the flankers. If it wraps, the composition breaks.
3. **One pair per composition.** Never two flanker pairs on the same page.
4. **Never mix glyph types.** A composition gets one of: ❉-dingbat, flanker-pair, or ➾-flourish. Never two at once.
5. **Colour: ink or vermillion only.** No teal, no amber, no kraft fills on glyphs.

### Flanker confirmation — GLYPH-CONFIRMED

**Date confirmed:** 2026-04-17
**Confirmed by:** John (visual inspection of full contact sheet — all 5 pairs flanking PACIFIC KINGS at real lockup scale)
**Confirmed pair:** Pair D — U+E006 (left) / U+E007 (right)
**Codepoints:** LEFT_CP = 0xE006, RIGHT_CP = 0xE007
**Width (upem):** 1123
**Rationale:** Confirmed visually matches the correct flanker profile at lockup scale. Pair B (previous primary) is demoted to secondary hero role (press-kit, pitch-deck, dark-mode alternate).
**Assets regenerated:** 2026-04-17 — all lockup SVGs, all social composite SVGs, all PNGs
**Script used:** app/public/brand/pacific-kings/_build/regen_all_assets.py
**Files affected:** 25 SVGs (21 horizontal + 4 stacked rebuilt), 25 PNGs (see script output in 01-03-SUMMARY.md)

---

### Gap: the "teardrop border guy"

The OH no Type specimen shows a row of simple teardrop shapes captioned "YOU CAN USE THIS LITTLE GUY FOR BORDERS." **That glyph is not in the font files we have.** We have only 10 fleuron glyphs (U+E000–U+E009 after the cmap patch), all of them elaborate curly fleurons. The teardrop border is either (a) in a newer Blazeface release, (b) a show-piece drawn for the specimen but not shipped, or (c) something we misremember.

**Path forward** (needs sign-off — see §10):
- (a) Contact OH no Type Co to confirm whether a newer Blazeface ships the teardrop border glyph; if yes, update our OTFs.
- (b) Draw a custom SVG teardrop border element that matches the specimen exactly. 30 minutes of vector work; lives as a React component, scales cleanly, can be inverted/mirrored.
- (c) Use one of our existing fleuron pairs as the closest substitute. Pair E is the simplest/smallest and reads best as a repeated border element.

---

## 5. Image treatment — LOCKED (per brand-spec §Photography)

1. **1 px ink border** on every photograph, always. CSS: `border: 1px solid var(--brand-ink)`. Matches the brand-spec "full-bleed priority" rule.
2. **Aspect ratios** by content type:
   - **4:5** portrait — story beats, hero portraits
   - **2:3** portrait — taller story beats (matches the source hero photo we have)
   - **5:4** landscape — location context shots
   - **1:1** square — community close-ups
   - **16:9** — video frames
3. **Grain overlay** on every photo (SVG turbulence noise, 14–18% opacity, `mix-blend-multiply`). Softens upscaling and adds film texture.
4. **Never crop the subject.** If the source resolution can't support the display size at the intended crop, **cap the display width** to avoid upscaling. No forced crops to fit a layout.
5. **Placeholder treatment** while real photos are pending: kraft diagonal pinstripe pattern + mono label (`PHOTO · 35mm · Siargao 2026`).
6. **No stock photography, ever.** Every image is real, from the project.
7. **Unpolished is fine** — motion blur, grain, dust, handheld natural light.

### Hero photo — resolution constraint

The current hero source (`/images/hero-pacific-kings.png`) is **1024×1536 pixels**. At that source resolution:
- Mobile viewports (≤1024 px wide): photo downscales to fit — crisp.
- Medium viewports (1025–1440 px): photo upscales up to ~140% — slight softness, masked by grain.
- Wide viewports (>1440 px): we cap container `max-width: 1440 px` and centre with cream margins to prevent further upscaling.

**Real fix:** John supplies a higher-resolution source (target 2400×3600 or better). Until then, the cap + grain is the compromise.

---

## 6. Hero composition — LOCKED

The sponsor-landing hero has this exact structure. Nothing can be added or reordered without updating this doc.

```
┌───────────────────────────────────────────────┐
│ [NAV] transparent over photo, solidifies on   │
│       scroll (80 px threshold)                 │
├───────────────────────────────────────────────┤
│                                               │
│ [COUNTDOWN PILL] floats top-right over photo  │
│                                               │
│   [BORDER RULE] Blazeface fleuron row         │
│                                               │
│   [PAIR A LEFT]  PACIFIC KINGS  [PAIR A RIGHT] │
│                                               │
│          a future.ly project  (italic)        │
│                                               │
│   [BORDER RULE] Blazeface fleuron row         │
│                                               │
│                                               │
│        [FULL-WIDTH PHOTO, 1 PX INK BORDER]    │
│              (max-width 1440 px)              │
│                                               │
│   [CAPTION] pill bottom-right of photo        │
│   [SCROLL CUE] bottom-centre of photo         │
│                                               │
├───────────────────────────────────────────────┤
│ [CREAM LEDE BAND]                             │
│                                               │
│   Thirty days.                                │
│   One story.                                  │
│   Every receipt on the table.                 │
│                                               │
│   [BECOME A SPONSOR]  [JOIN WAITLIST]         │
│                                               │
└───────────────────────────────────────────────┘
```

### Hero typography overlay — exact spec

- **Dark gradient** at top of photo for readability: `linear-gradient(to bottom, rgba(15,15,15,0.82) 0%, rgba(15,15,15,0.55) 35%, rgba(15,15,15,0.15) 70%, transparent 100%)` — covers top 55% of photo
- **Border rule** (top + bottom): `<BlazefaceBorder pair="A" count={5} size={18} variant="rule" />` — thin rule flanking alternating Pair A fleurons. **Pair A is the canonical hero flanker per §4.**
- **Flanker-left** at 72 px, cream, using `\uE000`
- **Campaign wordmark**: Blazeface Roman 72 pt cut, clamp font-size `64px, 8.5vw, 148px`, `line-height: 0.88`
- **LiquidTitle wave motion**: each letter bobs 6 px sine-wave, 2.8 s duration, 0.1 s stagger, infinite yoyo, starts 1.4 s after entrance completes
- **Flanker-right** at 72 px, cream, using `\uE001`
- **Italic sub**: Blazeface 36 pt italic, clamp `20px, 2.4vw, 38px`, opacity 90%

### Hero lede band — exact spec

- Cream background, 24 px top + bottom padding on mobile, 32 px on desktop
- 3-line kinetic lede, Blazeface 36 cut, ink, `clamp(40px, 5vw, 68px)`, line-height 1.02
  - Line 1: "Thirty days."
  - Line 2: "One story."
  - Line 3: "Every receipt on the table."
- Reveal: scroll-triggered (`top 80%`), y:32/opacity:0 → stagger 0.1s
- Dual CTA below: vermillion primary "Become a sponsor" → `#sponsor-tiers`; outline secondary "Join the waitlist" → `#waitlist`
- Both CTAs are `<Link>` styled with `buttonVariants()` — NOT wrapped in `<Button>` (Base UI Button warns against non-native buttons)

---

## 7. Motion vocabulary — LOCKED

From the UX spec §Micro-Interactions, plus GSAP additions:

| Use case | Duration | Easing | Notes |
|---|---|---|---|
| Button feedback | < 100 ms | `ease-out` | Tailwind default transition |
| Hover / focus | 200 ms | `ease-out` | CTA hovers, nav hovers |
| Entrance reveal | 600–900 ms | `power3.out` / `power4.out` | On mount or `ScrollTrigger` viewport enter |
| Stagger offset | 0.04–0.10 s | — | Between list items |
| Countdown colon pulse | 1.4 s | `ease-in-out` | Infinite, subtle opacity 1 → 0.3 |
| **Liquid title wave** | **2.8 s** | **`sine.inOut`** | **Letter bob, 6 px amplitude, stagger 0.1 s, infinite yoyo. Only on PACIFIC KINGS hero.** |
| Parallax on scroll | scroll-linked | — | 5–10 px max offset, subtle |
| Progress bar fill | 400 ms | `ease-out` | On value change |
| Milestone pulse | 800 ms total | — | When milestone crosses |
| Gated content unlock | 700 ms | `ease-out` | Glass frost dissolve 300 ms + fade in 400 ms |

**Hard rule:** every animation is gated by `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` or a CSS equivalent. Reduced-motion mode = final state only, no animation.

### Cursor / hover vocabulary

**What we DO:**
- Subtle link hover (underline draw, 200 ms)
- CTA hover (background shift, 200 ms)
- Card hover (2 px lift + shadow, 200 ms)

**What we do NOT do (rejected in iteration):**
- ~~Cursor spotlight / radial glow following mouse~~ — felt generic, out.
- ~~Cursor ripple trail~~ — deferred until we explicitly decide we want it.
- ~~3D card tilt on sponsor tier hover~~ — deferred to Phase 6; not in the hero.

---

## 8. Components — what exists and what they're for

### Locked, canonical primitives (in `app/src/components/brand/`)

| Component | Purpose |
|---|---|
| `<Glyph>` | Inline dingbat with correct optical cut. |
| `<Flanker>` / `<TitleFlanker>` | Paired fleurons around a title. |
| `<BlazefaceBorder>` | Decorative horizontal rule — variants: `rule` (thin lines + fleurons in centre), `row` (pure fleuron row), `framed` (rules top + bottom). **Only pair to use = A** for hero, pair D for secondary. |
| `<LiquidTitle>` | Wave-motion letter bob on a title. Scoped to hero PACIFIC KINGS, not a general primitive. |
| `<Grain>` | SVG noise overlay, 14–18% opacity, `mix-blend-multiply`. |
| `<Spotlight>` | Cursor-follow radial glow. **Currently unused in hero — see §7 cursor rules.** Kept as a primitive in case we want it back. |
| `<CountdownPill>` | D:H:M countdown, colon pulse, amber final-48h. Dark + light variants. |
| `<Container>` | Max-width layout wrapper. Widths: prose / default / wide / full. |
| `<Section>`, `<SectionLabel>`, `<SectionTitle>`, `<SectionDesc>`, `<SubHead>` | Section scaffolding with consistent rhythm. |
| `<Lede>`, `<PullQuote>`, `<SunDivider>`, `<StoryImage>` | Editorial primitives. |

### Locked shadcn components (in `app/src/components/ui/`)

`badge`, `button`, `card`, `dialog`, `dropdown-menu`, `input`, `label`, `separator`, `sheet`, `skeleton`, `sonner`, `tooltip` — all from the shadcn base-nova preset, Base UI primitives under the hood.

**Button usage rule:** Base UI's `<Button>` only accepts native `<button>` children. For button-styled links, use `<Link className={buttonVariants({...})}>` — do NOT use `render={<Link/>}` on `<Button>` (triggers Base UI native-button warning).

### Installed motion + interaction tooling

- `gsap` + `@gsap/react` (core + ScrollTrigger — MIT/free)
- `motion` (Framer Motion successor, used by any Aceternity components we copy-paste)
- `react-hook-form` + `zod` + `@hookform/resolvers` — **not yet used**, waiting for the real waitlist form backend

---

## 9. Design-system-to-app port status

| Item | Status | Location |
|---|---|---|
| HTML design system | Archived | `docs/design-system-reference/` (read-only) |
| React port at `/design-system` | ✅ live | `app/src/app/design-system/page.tsx` + `app/src/components/design-system/` |
| Brand tokens (`globals.css` @theme) | ✅ locked | `app/src/app/globals.css` |
| Fonts self-hosted (patched OTFs + WOFF2) | ✅ done | `app/public/fonts/` |
| Landing page at `/` | ⚠ in progress | `app/src/app/page.tsx` — hero iterated 5× this session, other sections still from v0.1 pass |
| Design decisions doc | ✅ **this file** | `docs/DECISIONS.md` |
| `future-repo/CLAUDE.md` | ⚠ stale in places | Update after this doc is approved |

---

## 10. Open questions — need John's call before I code more

These are the things I've been guessing at across iterations. Every answer becomes a new locked decision above.

### 10.1 Fleuron pair for the hero masthead

**Q:** Pair A or Pair D? The logo brief v1.6 called A "canonical primary" and D "canonical secondary." I've been swapping between them.

**My recommendation:** **Pair A** everywhere on the sponsor landing hero, with Pair D reserved for the press-kit lockup (which we haven't built yet). Lock it now and stop swapping.

### 10.2 Border element on the photograph

**Q:** You said "I wanted an edge border on the image, not the fleurons." Confirming the spec:

- Add `border: 1 px solid var(--brand-ink)` to the photo container
- No fleurons on the photo edges; the fleurons stay on the masthead border rule above/below the title
- The photo sits framed like a print plate

**My recommendation:** ✅ do exactly this. Matches brand-spec §Photography. I lock it.

### 10.3 "Teardrop border guy" from the Blazeface specimen — AUDIT RESULT

**Full glyph audit (14 Apr) — exhaustive fontTools inspection of the 72 pt OTF:**

- **432 total glyphs** in the font
- **438 cmap entries** across all subtables (format 4 + format 6)
- **31 unmapped glyphs** accounted for: 9 × `.alt` accent variants, 10 × `.numr` numerals (superscript via `sups`), 10 × `.dnom` numerals (fraction via `frac`), `thinspace`, `.notdef`. **Zero extra ornaments.**
- **11 BMP PUA entries** in the cmap: the 10 fleuron pairs I patched at U+E000–U+E009, plus `commaaccent` at U+F6C3. **No additional ornament glyphs at any codepoint.**
- **GSUB features:** `dnom`, `frac`, `locl`, `sups`. **Zero stylistic sets** (`ss01`–`ss20`). **Zero character variants** (`cv01`+). No hidden substitution chains.
- **Zip archive contents:** 18 × Desktop OTFs + 2 × license PDFs + 1 × receipt. **21 files total.** No web fonts, no variable fonts, no alternate source files, no SVG glyph libraries.

**The "teardrop border guy" shown in the OH no Type specimen is NOT in the font files we purchased.** It is either:
- (i) a marketing show-piece drawn for the specimen PDF and never shipped
- (ii) a glyph exclusive to a Web font license (we bought Desktop — `License for Desktop, 1–3 users.pdf`)
- (iii) a glyph in a newer Blazeface release after our 13 Apr 2026 purchase date

**Options forward:**
- **(a) Email OH no Type Co** — ask if the teardrop border ships in the Web license or a newer release. ~1–3 day turnaround. Clean answer.
- **(b) Buy the Web license** upgrade (~$179 again) — gamble, may not contain anything new.
- **(c) Draw a custom SVG teardrop** matching the specimen shape. 30–45 min of vector work. Ship as `<TeardropBorder>` React primitive. Scales to any size, can be left/right mirrored.
- **(d) Substitute** with Pair E fleurons repeated as a border — cleanest in-font option but visually different from the reference.

**My recommendation: (c) — draw the custom SVG.** It's deterministic, one session, and gives us a primitive that scales anywhere. If you later get the real glyph from OH no Type Co, it's a one-line import swap. Lock this after you say yes.

### 10.4 Hero-photo "full width" vs. pixelation

**Q:** Source is 1024×1536. "Full width" on a 1920 px screen = 87% upscale = pixelation. You've flagged pixelation twice.

**My recommendation:** Keep the `max-width: 1440 px` cap on the photo container. On wide desktop viewports the photo has cream margins on the sides — framed like a magazine spread, not edge-to-edge. **Real fix is a higher-res source** — you said you'd supply. Until then, the cap holds.

### 10.5 Hero wordmark scale on the photograph

**Q:** The current PACIFIC KINGS clamp is `64px, 8.5vw, 148px`. On desktop that's ~130 px; on mobile ~64 px. Some iterations felt too small, some too big.

**My recommendation:** Lock at clamp `72px, 9vw, 168px` — slightly bigger, reads as hero on all viewports. Lock it.

### 10.6 Cursor / hover effect on the hero

**Q:** I added a spotlight, you rejected it, I removed it. Should there be ANY cursor reactivity on the hero, or is it static?

**My recommendation:** **Keep it static.** No cursor effect on the hero. The wave motion on PACIFIC KINGS is the only dynamic element the eye needs. Cursor effects feel gimmicky on documentary content. Lock it.

### 10.7 Liquid wave motion — keep or drop?

**Q:** I added a sine-wave bob to the PACIFIC KINGS letters. You haven't reacted yet either way.

**My recommendation:** **Keep it** — it's the "water / pacific" motion you asked for, it's performant, it respects reduced-motion, and it gives the hero a heartbeat without being loud. If you hate it, I disable by flipping `entrance={false}` and removing the continuous wave timeline — 5 min change.

### 10.8 When does the hero image get a HIGHER-RES replacement?

**Q:** You said you'd supply a bigger version. Can I assume I'm working with 1024×1536 for the rest of this session? I don't want to keep blocking on image resolution.

**My recommendation:** Assume 1024×1536 for this session. I'll add a TODO in the code: `// TODO: replace with 2400×3600 source when available`. Lock the layout around a higher-res target so a swap is one line.

### 10.9 Production readiness — what's the scope of "production ready"?

**Q:** You said "it's not production ready." I want to know the bar.

**My interpretation:** production ready = (a) hero is visually locked and matches brand spec, (b) every section of the landing has real content not placeholders, (c) motion is subtle and consistent, (d) mobile responsive at 375 px, (e) accessibility audit passes (contrast, reduced-motion, keyboard nav), (f) copy is tight, (g) real photography loaded, (h) waitlist form POSTs to a real endpoint.

**My recommendation:** we ship the hero FIRST (locked to §6), then knock the rest of the landing page into the same quality bar section by section. A production-ready landing page is ~2–3 more focused sessions of work after this doc is approved.

### 10.10 Review the design system reference — any drift to re-lock?

**Q:** You said "review the design system and get the logo and stuff documented." This document IS that review. Anything in it you want to change before I sign and stop iterating?

**My recommendation:** Read §1–§7, approve or redline, we commit this doc to the repo, and every subsequent change references it.

---

## 11. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 14 Apr 2026 | Initial lock. Captures every decision across the design-system port + 5 hero iterations. Surfaces 10 open questions in §10. |
| 1.0a | 14 Apr 2026 | **Glyph-audit addendum (see §12).** Flags that §4 is incomplete — the font contains real ornament glyphs at Unicode symbol codepoints (U+2196, U+2197, U+2198, U+2199, U+27BB, U+27BC, U+27BD, U+27BE and more) that the v1.0 audit missed because it was reading glyph names (generic `uni2196`) rather than rendering outlines. §4 must be fully re-walked in the next session. |
| 1.0b | 14 Apr 2026 PM | **§12 correction + stacked lockup.** Withdraws the v1.0a claim that the PACIFIC KINGS lockup had been regenerated with U+2196 flankers (it hadn't — path-signature audit confirmed all 25 SVGs ship with Pair A). Visual A/B against the specimen (mis-)read Pair A as the correct match. Adds stacked PACIFIC/KINGS lockup (SVG + PNG, ink/cream/vermillion/currentColor). Font-wide ornament audit at §12.10.3 still stands for a follow-up session, non-blocking for launch. |
| 1.0c | 14 Apr 2026 PM | **Canonical flanker pair corrected to Pair B (U+E002 / U+E003).** The v1.0b visual read was wrong — the specimen's flanker is Pair B's vertical fleur-de-lis, not Pair A's S-curve. A clean per-pair picker sheet confirmed the pick with the user. All 25 SVGs in `app/public/brand/pacific-kings/` swapped from Pair A paths to Pair B paths with width-aware translate adjustment. Stacked lockups regenerated from scratch with Pair B ink bounds. `app/src/components/landing/landing-hero.tsx` updated from `\uE000`/`\uE001` → `\uE002`/`\uE003`. §4c Pair table relabelled in-place (Pair B = primary hero, Pair A = editorial). |
| 1.0d | 14 Apr 2026 PM | **Brand spec compliance audit + landing-hero cleanup + CTA arrow wired.** Removed the two `BlazefaceBorder` calls from `landing-hero.tsx` (flankers-as-dividers — stacked §4c hard-rule violation: "flankers only as paired flankers around titles" AND "one flanker pair per composition"). GSAP `.hero-border-top/bottom` selectors cleaned up. `<Glyph>` primitive now spreads HTML attributes so it accepts `aria-hidden` for decorative usage. Primary CTA "Become a sponsor" now renders `➤` (U+27A4) after the label — first live use of the canonical CTA arrow from the brief. `TitleFlanker` default pair flipped from `"A"` to `"B"`. `glyph.tsx` `FLEURON_PAIRS` comments updated to reflect Pair B canonical / Pair A demoted. `design-system/page.tsx` header label swapped from "Pair A" to "Pair B". `title-treatments.tsx` explanatory copy rewritten to name Pair B as canonical hero (Pair D still secondary); `HeroLockup pair="A"` demo swapped to `pair="B"`. Adds §13 deferred dark-mode vision. |
| 1.0e | 17 Apr 2026 | **Canonical flanker corrected to Pair D (U+E006 / U+E007).** Full contact sheet (all 5 pairs flanking PACIFIC KINGS at real lockup scale) reviewed by John. Pair D confirmed as primary hero flanker. §4c Pair table updated in-place: Pair D = primary, Pair B = secondary (press-kit / pitch-deck / dark-mode alternate). GLYPH-CONFIRMED block added to §4c for machine-readable signal. Asset regeneration follows in Plan 01-03. |

---

## 12. §4 glyph-vocabulary audit — incomplete (flagged 14 Apr 2026)

**Status:** the v1.0 glyph inventory in §4 is provably incomplete. Do not treat it as canonical.

### What happened

v1.0 §10.3 concluded that the "teardrop border guy" from the OH no Type Co specimen was not in the font files, based on an audit that walked the cmap, counted unmapped glyphs by name (`.notdef`, `.alt`, `.numr`, `.dnom`, `thinspace`), and concluded "no extra ornaments." That audit was **wrong** because it never rendered the glyph outlines — it only read glyph names.

A follow-up render-based audit on `OhnoBlazeface-72Point.otf` (14 Apr 2026) discovered the foundry stores its full ornament library at **real Unicode codepoints in the symbol/dingbat range**, using generic `uniXXXX` glyph names that gave no hint of what the glyphs actually depict:

| Codepoint | Unicode meaning | Blazeface glyph |
|---|---|---|
| U+2196 | NW arrow | **3-teardrop burst sprig (upper-left lean)** |
| U+2197 | NE arrow | 3-teardrop burst sprig (upper-right lean, likely mirror of 2196) |
| U+2198 | SE arrow | 3-teardrop burst sprig |
| U+2199 | SW arrow | 3-teardrop burst sprig |
| U+273A | 16-pt asterisk | large dahlia flower ornament |
| U+2744 | Snowflake | large radial starburst ornament |
| U+27A7 | chevron | flag-arrow ornament |
| U+27BB | — | single paisley leaf with tail |
| U+27BC | — | flag-arrow with stem |
| U+27BD | — | complex leaf with wave base |
| U+27BE | — | 5-teardrop splash (the "closing flourish" in §4) |

Plus the 10 fleuron pairs at U+E000–U+E009 that v1.0 DID catalogue correctly.

### Implications

- §4's "the font has 10 fleurons + a dingbat list" framing is not the whole picture. Blazeface's ornament vocabulary is **roughly 3× larger** than documented and includes genuine teardrop, leaf, starburst, and splash shapes.
- The "teardrop border guy" from the specimen is **not** the U+2196 glyph as-is (U+2196 is a multi-teardrop burst, not a single repeating teardrop). The single-teardrop shape may still not be in the font — but we now have several real teardrop-family glyphs to work with before resorting to custom SVG.
- §4 role assignments (❉ = inline mark, ➤ = CTA, ➥ = back-link, etc.) are still valid. They're just no longer the full set.
- The PACIFIC KINGS lockup at `app/public/brand/pacific-kings/` ships with **Pair B (U+E002 / U+E003)** as the canonical flanker pair. See the correction trail below — this section has been rewritten twice and earlier drafts were wrong in different ways.

### Correction trail — 14 Apr 2026 PM

**Draft 1 (withdrawn):** §12 claimed the lockup had been regenerated with `U+2196 (left) + mirrored U+2196 (right)` as canonical flankers, "replacing the v1.0 Pair A (fleuron) assumption." That claim was wrong in two ways: (1) the regeneration was never executed — all 25 SVGs on disk still carried Pair A paths, and (2) the `U+2196` sprig is a three-teardrop burst, not a specimen match in the first place.

**Draft 2 (withdrawn):** A path-signature audit confirmed Pair A was on disk, and a visual A/B against the OH no Type Co "EXTRA FANCY ORNAMENTS" specimen was read as "Pair A matches — files are already correct." That read was wrong. Pair A is a simple S-curve wave with one spiral bulb and doesn't match the specimen's multi-curl profile.

**Draft 3 (this one — current):** A clean per-pair flanker picker sheet (see `app/public/brand/pacific-kings/_build/fleuron-picker.svg`, committed alongside the assets) rendered all 5 fleuron pairs flanking "PACIFIC KINGS" at real lockup scale (flanker 1.1968×, letters 1×), and the user confirmed visually: the specimen's flanker is **Pair B (U+E002 / U+E003)** — vertical fleur-de-lis profile, top hook wrapping over the letter, wide body in the middle, bottom curl. Every file in `app/public/brand/pacific-kings/` (the four horizontal lockup variants, the four stacked lockup variants, the seventeen social composites — 25 files total) was then swapped from Pair A to Pair B via `app/public/brand/pacific-kings/_build/swap_pair_a_to_b.py`, with the LEFT flanker's `translate` x adjusted so Pair B's ink right-edge sits in the same SVG position Pair A's did (preserving the gap to the first letter). The four stacked lockup variants were regenerated from scratch by `app/public/brand/pacific-kings/_build/build_stacked_lockup.py`, which extracts the chosen pair's ink bounds from the 72 pt font and positions the flankers explicitly.

**Canonical flankers for PACIFIC KINGS are Pair B (U+E002 / U+E003).** The v1.0 §4c table (still live above) assigned Pair B to "Small-scale update kicker" — that assignment is **wrong** and should be updated in v1.1. Pair A moves to the "secondary / editorial" role Pair B was previously in; Pair D remains secondary hero flanker for dark-mode and press-kit contexts.

**Verification evidence** — path-signature grep after the swap:
- `M1041 265C1041 473 1011 595` (Pair B left): found in all 25 files
- `M28 265C28 100 37 -12 102 -12` (Pair B right): found in all 25 files
- `M103 165C103 275 157 325` (Pair A left, old): 0 hits in any file
- `M694 45C743 93 775 159 688 247` (alt-teardrop left): only in `pacific-kings-lockup-alt-teardrop.svg` as intended

### New deliverable — stacked lockup (14 Apr 2026 PM)

A stacked PACIFIC/KINGS variant has been added alongside the horizontal hero, for contexts where a square or tall aspect ratio is needed (app icon prototypes, merch back panels, mailer front cover). The stacked lockup uses Pair B flankers scaled 2.45× so they span both text lines vertically, and centers KINGS under PACIFIC horizontally.

Files added:
- `pacific-kings-lockup-stacked.svg` (currentColor)
- `pacific-kings-lockup-stacked-ink.svg` + `.png` (4800 × 941)
- `pacific-kings-lockup-stacked-cream.svg` + `.png`
- `pacific-kings-lockup-stacked-vermillion.svg` + `.png`

### What still needs doing

The font-wide ornament audit at §12 (10.3) stands — Blazeface contains more glyphs than v1.0 catalogued (the teardrop sprigs, the dahlia, the radial starburst, the paisley leaf, etc. at U+2196–99, U+273A, U+2744, U+27BB–U+27BE). Those aren't blockers for the launch lockup — Pair B now fills the hero flanker role — but §4 should be re-walked in a follow-up session to document those glyphs as additional ornaments for editorial contexts (not as flanker replacements).

The current `app/public/brand/pacific-kings/` deliverables are **v1.0d — canonical and shipped**.

---

## 13. Deferred: dark-mode visual treatment

**Status:** deferred — not a launch blocker, vision captured so it doesn't get lost.

Dark mode for future.ly is **not a colour flip**. It is a complete change of imagery, mood, and atmosphere — the beauty of night.

Where light mode is cream paper, documentary photography at golden hour, and ink letterpress, dark mode should be:

- **Night photography** — the same story locations shot after dark. Siargao under a field of stars, kids' skateboards catching moonlight, the ramp lit only by a single lamp. Not "light mode with a black background." A different frame, a different hour, a different feeling.
- **Stars, constellations, celestial marks** — Blazeface already ships ✸ (U+2738, 8-pt star), ✹ (U+2739, 12-pt star), ✺ (U+273A, 16-pt asterisk), and ❉ (U+2749, balloon floret). In dark mode these become more than dingbats — they become a field of stars across the background, a scatter of celestial marks in the margins, a constellation tracing the countdown. The sun dingbat is already canonical; dark mode lets the star family speak.
- **Deep blue, not black** — the `#0F0F0F` ink black currently used in the dark-gradient top of the landing hero is placeholder. The real dark mode should be a very deep blue (think night sky around 10pm, not midnight), with cream text and vermillion accent unchanged.
- **Atmospheric, not austere** — subtle grain, gentle gradients, soft edges. The light mode is documentary and grounded; the dark mode is dreamlike and reflective. It should feel like the moment at the end of a day when the story gets told around a fire.

**What this means for the code:**
- No dark-mode CSS variables are correct yet. The `#0F0F0F` currently in `globals.css` and in the landing-hero top gradient is a placeholder and should be swapped for a deep blue (TBD exact token) before dark mode ships.
- Dark-mode components should have their own photography, not auto-inverted versions of light-mode hero images. Budget time for a separate photo session or selection.
- The star dingbats (✸, ✹, ✺) should get a `<Starfield>` composition component for scattered decorative use in dark mode — separate from their inline dingbat role in light mode.
- Dark-mode lockups can stay with Pair B flankers (consistent brand), or explore Pair D as the designated dark-mode alternate per §4c. Pick during dark-mode implementation session, not now.

**Trigger for implementation:** when the campaign launches and the 30-day story is telling itself, the late-night update posts and donor-only gated content become the natural home for dark mode. Plan to implement in the first week of launch at the earliest, probably the second.

