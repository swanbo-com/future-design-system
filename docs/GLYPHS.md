# Blazeface glyph reference — future.ly design system

Derived directly from `fonts/OhnoBlazeface-72Point.otf` cmap. Roman and Italic ship identical glyph sets (391 glyphs each) and identical OpenType feature sets. No `ornm`, `ss01`, or `salt` — every dingbat/arrow/flourish lives at a direct Unicode codepoint, so plain HTML text is enough to render them. Fractions use the `frac` feature.

## Ornaments — fleuron pairs (5 mirrored pairs)

Blazeface ships **10 classical pen-flourish fleurons** drawn in the same hand as the Roman. These are the most decorative shapes in the family and the closest the font gets to Victorian/Art Nouveau ornament work. They arrive as **5 symmetric pairs** — each top-row glyph has a bottom-row mirror partner, so you can flank a title with matching left/right ornaments.

**Important — foundry cmap omission, patched locally.** The shipped OTFs contain the outlines but ship no cmap entries for these glyphs (they were intended at U+F0000–U+F0009 in plane 15 PUA, but format-4 cmap subtables can't encode plane-15 codepoints, and the foundry didn't add a format-12 subtable). The orphaned glyphs are visible in the specimen PDF as the "ornaments" row, but unreachable from HTML/CSS as shipped. We've patched all 18 OTFs in `design-system/fonts/` to add cmap entries at **U+E000–U+E009** (BMP PUA) so they render everywhere a normal character renders. The patch preserves every other cmap entry and does not touch outlines, kerning, or GSUB — it is reversible and license-compliant.

| Codepoint | Glyph name | Width | Pair |
|-----------|------------|-------|------|
| U+E000    | uniF0000   | 1184  | A-left  |
| U+E001    | uniF0001   | 1184  | A-right |
| U+E002    | uniF0002   | 1081  | B-left  |
| U+E003    | uniF0003   | 1081  | B-right |
| U+E004    | uniF0004   | 967   | C-left  |
| U+E005    | uniF0005   | 967   | C-right |
| U+E006    | uniF0006   | 1123  | D-left  |
| U+E007    | uniF0007   | 1123  | D-right |
| U+E008    | uniF0008   | 914   | E-left  |
| U+E009    | uniF0009   | 914   | E-right |

**How to use:** CSS `content: "\E000"`, HTML `&#xE000;`, or a literal `` character in markup (if your editor supports PUA). Apply the Blazeface font family as usual — the correct optical size cut still applies.

**Rule — ornaments only appear as paired flankers.** Never use one half of a pair alone. Never use an ornament as an inline bullet, divider, or CTA — that's the job of the dingbats (✸ ❉ ➤ etc). Ornaments are reserved for the **flanker slot around titles**: `[left-orn] PACIFIC KINGS [right-orn]`. Reserved slots: story-panel kicker, press-kit title card, pitch-deck section headers, campaign hero alternate lockup, launch poster title.

**Restraint:** one ornament pair per composition. Never stack them, never put two pairs on the same page. Two colours max per physical product still applies.

## Star / sun dingbats

| Codepoint | Glyph | Name                           | Use for                                                              |
|-----------|-------|--------------------------------|----------------------------------------------------------------------|
| U+2738    | ✸     | Heavy 8-pointed black star     | **The sun dingbat.** Primary brand mark. Use everywhere the brief writes `✸`. |
| U+2739    | ✹     | 12-pointed black star          | Alternate sun. Reserve for rare pairings with ✸.                      |
| U+273A    | ✺     | 16-pointed asterisk            | Density variant. Avoid unless deliberately busier.                   |
| U+2749    | ❉     | Balloon-spoked asterisk        | Flourish variant — softer, floral. Editorial flourishes only.        |
| U+2605    | ★     | Black star (5-pt)              | Stars for rating/ranking contexts. Not the sun.                      |

## Arrows

| Codepoint | Glyph | Use for                                                       |
|-----------|-------|---------------------------------------------------------------|
| U+27A4    | ➤     | **Primary CTA arrow.** Brief §6.2 specifies this exact glyph. |
| U+27A5    | ➥     | Return / "see more" back-loop                                 |
| U+27A7    | ➧     | Narrow alternate                                              |
| U+27A8    | ➨     | Wide alternate                                                |
| U+27B0    | ➰     | Curly loop — playful moments only                             |
| U+27B5    | ➵     | Fat directional                                               |
| U+27BB    | ➻     | Ornamental                                                    |
| U+27BC    | ➼     | Ornamental                                                    |
| U+27BD    | ➽     | Ornamental                                                    |
| U+27BE    | ➾     | Ornamental tail                                               |
| U+2190–93 | ←↑→↓ | Plain directional (utility, not decorative)                   |
| U+2196–99 | ↖↗↘↙ | Plain diagonal                                                |

## Hands

| Codepoint | Glyph | Use for                                                  |
|-----------|-------|----------------------------------------------------------|
| U+261C    | ☜     | Pointing left — rare, press/editorial only               |
| U+261E    | ☞     | Pointing right — press/editorial only                    |
| U+270C    | ✌     | Peace — community moments, founding-supporter reveal     |
| U+270D    | ✍     | Writing hand — author notes, founder letter              |
| U+2712    | ✒     | Black nib — editor's mark, correction, editorial note    |

## Solid shapes (for sizes below 12pt)

| Codepoint | Glyph | Note                                                            |
|-----------|-------|-----------------------------------------------------------------|
| U+25A0    | ■     | Black square. **Use below 12px** where ✸ hairlines collapse.    |
| U+25CF    | ●     | Black circle. Bullet alternate.                                 |
| U+2022    | •     | Standard bullet. Body copy only.                                |

## Fractions

Blazeface exposes proper fractions via the `frac` feature. Write `1/2` in markup and apply `font-feature-settings: "frac"` — Blazeface substitutes to `½`. Works for any numerator/denominator pair, not just the common three. Also applies to the `dnom` and `sups` features for denominators and superiors.

```css
.frac { font-feature-settings: "frac" on; }
```

```html
<span class="frac">1/2 OFF · 3/4 FUNDED · 7/10 DAYS</span>
```

## Optical size → rendering size cheat sheet

At 96 dpi, 1pt ≈ 1.33px. Match the cut to the rendering size:

| Cut    | Native (px) | Use for rendering sizes |
|--------|-------------|-------------------------|
| 72pt   | ~96px       | 72–144px                |
| 60pt   | ~80px       | 60–90px                 |
| 48pt   | ~64px       | 48–72px                 |
| 36pt   | ~48px       | 36–55px                 |
| 24pt   | ~32px       | 24–40px                 |
| 18pt   | ~24px       | 18–28px                 |
| 16pt   | ~21px       | 16–23px                 |
| 14pt   | ~18px       | 13–20px                 |
| 12pt   | ~16px       | 10–15px                 |

Below 10px rendering, don't use Blazeface at all — hairlines collapse. Fall back to Instrument Sans or a solid shape.

## Critical restraint

From the brief §4b: the dingbats are **punctuation, not illustration**. Never colour the sun (except vermillion on the sticker seal), never gradient, never make it the hero. It's the full stop at the end of a sentence, in a typeface that matches the headline.
