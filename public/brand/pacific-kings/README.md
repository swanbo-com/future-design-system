## PACIFIC KINGS — brand assets v1.0c

Generated 14 April 2026 from `OhnoBlazeface-72Point.otf` (Roman) and `OhnoBlazeface-72PointItalic.otf`. Every file is self-contained — paths are baked in, no font dependency at render time. Safe to upload anywhere.

### Lockup (wordmark + flankers)

| File | Use |
|---|---|
| `pacific-kings-lockup.svg` | **Canonical horizontal.** PACIFIC KINGS with Pair B vertical fleur-de-lis fleuron flankers (`uniF0002` / `uniF0003` patched to U+E002 / U+E003). Top hook wraps over the first letter, wide body in the middle, bottom curl. |
| `pacific-kings-lockup-{ink,cream,vermillion}.svg` + `.png` | Horizontal lockup pre-filled with ink `#111111`, cream `#F5F1EA`, or vermillion `#D93A2B`. PNGs rendered at 4800×467. |
| `pacific-kings-lockup-stacked.svg` | **Canonical stacked.** PACIFIC on top, KINGS below, Pair B flankers scaled 2.45× to span both lines. For square / tall aspect contexts. |
| `pacific-kings-lockup-stacked-{ink,cream,vermillion}.svg` + `.png` | Stacked lockup in each brand colour. PNGs rendered at 4800×941. |
| `pacific-kings-lockup-alt-teardrop.svg` | Alternate horizontal with U+2196 three-teardrop sprig flankers. Kept for reference; **not canonical**. |
| `pacific-kings-wordmark.svg` | Wordmark only, no flankers. |

All three use `fill="currentColor"` so you can drop them into any colour context (`style="color: #111"`).

### Favicon — Blazeface Italic `f.`

- `favicon.svg` — transparent bg, ink fill (drop into any context)
- `favicon-cream-bg.svg` — cream bg, ink fill (light mode)
- `favicon-ink.svg` — ink bg, cream fill (dark mode)
- `favicon-vermillion.svg` — vermillion bg, cream fill (accent)
- `favicon-{16,32,48,64,180,192,256,512,1024}.png` — rasterised at common sizes

Wire into `app/src/app/layout.tsx`:
```tsx
export const metadata = {
  icons: {
    icon: [
      { url: '/brand/pacific-kings/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/pacific-kings/favicon-32.png', sizes: '32x32' },
      { url: '/brand/pacific-kings/favicon-192.png', sizes: '192x192' },
    ],
    apple: '/brand/pacific-kings/favicon-180.png',
  },
};
```

### Social preview images (SVG + PNG @2x retina)

| File | Dimensions | Use |
|---|---|---|
| `social-og-1200x630.*` | 1200×630 | **OG default.** `og:image`, Twitter/X summary_large_image, LinkedIn. |
| `social-og-1200x630-dark.*` | 1200×630 | Ink bg variant for dark-theme contexts. |
| `social-og-1200x630-transparent.*` | 1200×630 | No bg — drop onto custom backgrounds. |
| `social-square-1080.*` | 1080×1080 | Instagram feed, general square. |
| `social-square-1080-vermillion.*` | 1080×1080 | Vermillion accent variant. |
| `social-story-1080x1920.*` | 1080×1920 | Instagram / TikTok story, 9:16. |
| `social-x-2400x1260.*` | 2400×1260 | X/Twitter large image retina. |
| `social-banner-1500x500.*` | 1500×500 | X/Twitter profile banner. |
| `social-wordmark-2400x600-transparent.*` | 2400×600 | Wordmark-only wide strip, transparent. |

PNGs are rendered at 2× the declared dimension for retina.

### Glyph provenance

- **Wordmark letters** — OhnoBlazeface 72 Point Roman at full cap height (upem 1000, cap 630). Letter-spacing +40 units for the all-caps lockup.
- **Canonical flankers (Pair B)** — `uniF0002` / `uniF0003`, the left/right mirrored vertical fleur-de-lis fleuron pair the foundry shipped orphaned at plane-15 PUA. Patched into the BMP PUA cmap at `U+E002` / `U+E003` in our OTF copies so they're reachable from plain text. Advance width 1081 upem, ink bounds roughly (28, -12) → (1041, 679). Visually confirmed against the OH no Type Co "EXTRA FANCY ORNAMENTS" specimen as the multi-curl flanker shown around "AG". See `docs/DECISIONS.md` §12 draft 3 (14 Apr 2026 PM) for the correction trail — earlier drafts proposed U+2196 and Pair A; both were wrong.
- **Alt flankers (`-alt-teardrop`)** — `uni2196` at Unicode codepoint U+2196 (a three-teardrop burst sprig). Kept as a reference alternate only; **not canonical**.
- **Favicon** — `f` + `period` glyphs from OhnoBlazeface 72 Point **Italic**, composed so the fat period sits tight against the stem's foot.

### Regenerating

The Python that builds these lives inline in the conversation that produced them (14 Apr 2026 session). If you need to regenerate or add a new size, extract the path data from the OTFs with `fontTools.pens.svgPathPen.SVGPathPen` — rendering at the 72 pt cut preserves the display-cut contour. Don't use a smaller cut; the optical-size discipline in §3 of `docs/DECISIONS.md` applies at generation time, not just runtime.

### Known issues / next-up

1. The current social composites still use the horizontal lockup. A follow-up session could rebuild `social-square-1080` and `social-story-1080x1920` with the new stacked variant for better vertical fill.
2. Tagline in social composites is rendered in a system sans fallback (`Instrument Sans, Helvetica Neue, Arial`). For pixel-perfect previews, convert the tagline to paths too.
3. No `.ico` multi-resolution file — modern browsers are fine with `favicon.svg`, but a classic `.ico` for legacy Windows pinning can be added via `uv tool install pillow && python -c "..."`.
