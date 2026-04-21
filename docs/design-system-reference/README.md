# Design System — HTML Reference (archived)

This is the **archived static HTML design system** used as the iteration playground for the brand work. It is no longer the source of truth — the **canonical version is the React port at `app/`**, served from `http://localhost:3178` when the dev server is running.

## Why it's still here

1. **Static reference.** Open `index.html` in any browser, no dev server required. Useful for comparing against the React version when porting additional patterns.
2. **Provenance.** Every brand decision from logo-wordmark-brief v1.2 through v1.6 was made in this doc — the logo lab, the fleuron discovery, the optical-size discipline, the mark canonization, the sticker seal, the favicon Italic pick, the cascade legibility fix. The change log in `docs/logo-wordmark-brief.md` points back to sections here.
3. **Fallback.** If the React port's font pipeline, Tailwind @theme, or component tree ever breaks, this static HTML still renders. It's the known-good baseline.

## What's in it

| File | Purpose |
|------|---------|
| `index.html` | Full design system single-page reference, 18 sections, ~800 lines |
| `styles.css` | Component and layout styles for every section |
| `tokens.css` | Brand design tokens (colour, spacing, type aliases) |
| `fonts.css` | `@font-face` declarations for all 18 Blazeface cuts + Instrument Sans + JetBrains Mono |
| `fonts/` | 18 patched Blazeface OTFs (Roman + Italic, 9 optical sizes) + 2 variable WOFF2 |
| `GLYPHS.md` | Canonical glyph reference — codepoints, pairs, patch notes. **Live copy at `docs/GLYPHS.md`.** |

## What NOT to edit

This directory is **read-only reference**. Any new brand work — adding a pattern, tweaking a colour, adjusting a lockup — happens in the React port at `app/src/components/design-system/` and its brand token files. Editing the HTML here will cause drift.

If you genuinely need to run the HTML (e.g. to double-check a pattern against the original), open `index.html` directly:

```bash
open docs/design-system-reference/index.html
```

## The blazeface cmap patch

The 18 OTFs in `fonts/` were **cmap-patched in place** to add the 10 classical pen-flourish fleurons at `U+E000`–`U+E009` (BMP PUA). The foundry shipped the glyph outlines but orphaned them at plane-15 PUA codepoints that format-4 cmap subtables cannot encode. The patch adds format-4 cmap entries only — no outline, kerning, or GSUB changes. License-compliant under the logo/brand use clause. See `GLYPHS.md` for the full codepoint table and rationale.

The React port in `app/public/fonts/` uses copies of these patched OTFs.
