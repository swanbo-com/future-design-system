# future.ly Action Plan

Last updated: 2026-04-17
Based on: interrupted Claude Code session (14 Apr) + current repo audit

## Where we left off

The Apr 14 session was verifying brand assets and planning commits. It:
- Confirmed all 21 SVGs carry Pair A flanker signatures (since superseded by Pair B in v1.0c)
- Found the entire `app/` directory is untracked from the outer repo
- Found `CLAUDE.md` and `docs/brand-spec.md` had 384 insertions / 87 deletions unstaged
- Was mid-thought on how to split commits when the session was interrupted ("Envisioning...")

Since then, significant work happened:
- Pair A demoted to editorial; Pair B is now the canonical hero flanker (v1.0c)
- v1.0d addendum written (brand compliance audit, dark-mode vision deferred)
- Build scripts added (`_build/swap_pair_a_to_b.py`, stacked lockup builder, etc.)
- Stacked lockups created and regenerated with Pair B
- Asset count grew from ~50 to 59 files

## Current repo state

- Branch: `main`, 1 commit ahead of `origin/main`
- Unstaged: `docs/DECISIONS.md` (v1.0d addendum)
- Untracked: entire `app/` directory (has its own nested `.git`)
- Last pushed commit: `296878a` (brand spec + glyph reference + v1.0c)

---

## Phase 1: Git housekeeping (do first)

### 1.1 Commit v1.0d DECISIONS.md
The unstaged changes to `docs/DECISIONS.md` capture the brand compliance audit:
BlazefaceBorder removal, Glyph primitive cleanup, CTA arrow wiring, TitleFlanker
default flip A→B, and deferred dark-mode vision (section 13).

Stage and commit this as a standalone commit on `main`.

### 1.2 Push to GitHub
Push `main` to `origin` — currently 1 commit ahead plus the new v1.0d commit.

### 1.3 Decide on app/ git structure
The `app/` directory has its own `.git` — this is the key architectural decision
that was deferred. Options:

- **A) Git submodule** — keep app/ as a separate repo, reference from outer repo.
  Pro: independent versioning, separate CI. Con: submodule friction, two repos to manage.
- **B) Absorb into outer repo** — delete app/.git, add app/ to the outer repo.
  Pro: single repo, simpler workflow. Con: large initial commit, mixing docs with code.
- **C) Monorepo with workspaces** — restructure as packages/app + packages/docs.
  Pro: clean separation with single repo. Con: most work to set up.

Recommendation: **B (absorb)** unless there's a reason to keep them separate. The
outer repo already has CLAUDE.md referencing app/ paths, and the docs are tightly
coupled to the app. One repo, one history.

If absorbing:
1. Remove `app/.git` directory
2. Stage `app/` (excluding node_modules, .next, .env.local per .gitignore)
3. Commit as "Add Next.js app (Campaign Zero landing page)"
4. Push

---

## Phase 2: Brand asset verification

### 2.1 Re-verify flankers post Pair B migration
The Apr 14 session verified Pair A signatures. Since v1.0c flipped to Pair B, need
to re-verify that:
- All social composite SVGs now carry Pair B (U+E002/E003) signatures
- The `swap_pair_a_to_b.py` build script ran correctly across all assets
- `landing-hero.tsx` renders Pair B flankers (not Pair A or Pair D)
- The stacked lockups use Pair B

### 2.2 Verify favicon pipeline
59 assets include favicons from 16px to 1024px plus SVG variants. Confirm
the correct f. monogram (Blazeface 72pt Italic) renders at all sizes, and that
favicon.ico in `src/app/` matches the brand set.

### 2.3 Clean up alt-teardrop lockup
`pacific-kings-lockup-alt-teardrop.svg` still exists with the old teardrop-burst
flankers. Decide: keep as archival variant, or remove from the shipped assets.

---

## Phase 3: App code alignment

### 3.1 Verify component compliance with DECISIONS.md v1.0d
v1.0d mandates:
- No `BlazefaceBorder` calls in landing-hero.tsx
- Glyph primitive accepts `aria-hidden` via spread
- Primary CTA renders U+27A4 after label
- TitleFlanker defaults to Pair B

Audit `src/components/brand/` and `src/components/landing/` against these rules.

### 3.2 Fix any lingering Pair D/A references in code
The conversation noted `landing-hero.tsx` referenced Pair D (U+E006/E007). Grep
the entire `src/` tree for E000, E001, E006, E007 references that should now be
E002/E003 (Pair B).

### 3.3 Optical size discipline check
DECISIONS.md section 4a mandates optical-size discipline for Blazeface. Verify
that font-size declarations in CSS/components use the correct cut (72pt for display,
48pt for subheads, etc.) per the cheat sheet in GLYPHS.md.

---

## Phase 4: Dev environment / build

### 4.1 Confirm app builds and runs
```
cd app && npm install && npm run dev
```
Verify the landing page renders correctly with Pair B flankers, correct colors,
and no console errors.

### 4.2 Check for stale dependencies
`package.json` targets Next.js 16 (bleeding edge). Verify compatibility, especially
with Tailwind v4 and shadcn/ui.

### 4.3 Verify API route (waitlist)
`src/app/api/waitlist/route.ts` exists — confirm it's wired up (presumably using
Resend from package.json). Test the waitlist capture form end-to-end.

---

## Phase 5: Pre-launch prep (Campaign Zero)

### 5.1 Content readiness
- Siargao Skate Kids documentary content — is footage/photography ready?
- Founder letter component (`founder-letter.tsx`) — real content or placeholder?
- Sponsor tiers (`sponsor-tiers.tsx`) — final pricing confirmed?

### 5.2 Legal pages
`/privacy`, `/safeguarding`, `/terms` routes exist — confirm content is final
and reviewed (CIC compliance, UK law).

### 5.3 Analytics + monitoring
- Plausible (self-hosted) configured?
- Sentry DSN set?
- UptimeRobot health endpoint wired?
- UTM classification + stranger ratio tracking implemented?

### 5.4 Dark mode (deferred per section 13)
Explicitly deferred to first week of campaign launch. Needs: night photography
session, deep-blue-not-black palette, constellation/atmospheric treatment.
Do not start this until launch week.

---

## Decision log

| Decision | Status | Notes |
|----------|--------|-------|
| Pair B = canonical hero flanker | Locked (v1.0c) | Pair A demoted to editorial |
| BlazefaceBorder removed from hero | Locked (v1.0d) | Violated section 4c |
| Dark mode | Deferred | Trigger = first week of campaign launch |
| App git structure | OPEN | Submodule vs. absorb — needs decision |
| DECISIONS.md v1.0d | Needs commit | Unstaged changes ready |
