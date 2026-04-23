"""
Extract every candidate ornament glyph from OhnoBlazeface-72Point.otf across
all known hidden codepoint ranges and write individual SVG files to
/tmp/blazeface-glyphs/.

Ranges scanned:
  U+E000–U+E009  5 mirrored fleuron pairs (PUA-patched)
  U+2196–U+2199  directional arrow codepoints (potential hidden ornaments)
  U+273A, U+2744 symbol codepoints (potential hidden ornaments)
  U+27BB–U+27BE  arrow codepoints (potential hidden ornaments)

Also catches any "uni*"-named glyphs with non-zero contours outside standard
Latin/punctuation ranges.
"""
from pathlib import Path
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont

FONT = Path.home() / "Documents/projects/future/future-repo/app/public/fonts/OhnoBlazeface-72Point.otf"
OUT_DIR = Path("/tmp/blazeface-glyphs")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Standard Latin + common punctuation codepoint range to exclude from "uni*" scan
STANDARD_RANGES = list(range(0x0020, 0x007F)) + list(range(0x00A0, 0x0180))

CODEPOINT_RANGES = [
    range(0xE000, 0xE00A),   # PUA fleuron pairs
    range(0x2196, 0x219A),   # directional arrows
    [0x273A, 0x2744],        # snowflake / asterisk symbol codepoints
    range(0x27BB, 0x27BF),   # arrow codepoints
]

font = TTFont(str(FONT))
cmap = font.getBestCmap()
glyph_set = font.getGlyphSet()

extracted = {}  # cp -> (name, width, bounds, path_data)

def extract_glyph(cp, name):
    """Extract path + metrics for a glyph. Returns (width, bounds, path_data) or None."""
    if name not in glyph_set:
        return None
    glyph = glyph_set[name]

    # SVG path
    svg_pen = SVGPathPen(glyph_set)
    glyph.draw(svg_pen)
    d = svg_pen.getCommands()
    if not d:
        return None  # empty glyph

    # Bounds
    bounds_pen = BoundsPen(glyph_set)
    glyph.draw(bounds_pen)
    bounds = bounds_pen.bounds  # (xMin, yMin, xMax, yMax) or None

    return glyph.width, bounds, d


# 1. Scan known codepoint ranges
print(f"{'codepoint':<10} {'glyph name':<20} {'width':<8} {'bounds':<30} path (first 80 chars)")
print("-" * 120)

for cp_range in CODEPOINT_RANGES:
    for cp in cp_range:
        name = cmap.get(cp)
        if name is None:
            continue
        result = extract_glyph(cp, name)
        if result is None:
            continue
        width, bounds, d = result
        extracted[cp] = (name, width, bounds, d)
        bounds_str = f"({bounds[0]:.0f},{bounds[1]:.0f},{bounds[2]:.0f},{bounds[3]:.0f})" if bounds else "none"
        print(f"U+{cp:04X}    {name:<20} {width:<8} {bounds_str:<30} {d[:80]}")

# 2. Scan all "uni*" glyphs not in standard ranges
print("\n--- uni* glyph scan (non-standard codepoints, non-empty) ---")
reverse_cmap = {v: k for k, v in cmap.items()}
for gname, glyph in glyph_set.items():
    if not gname.startswith("uni"):
        continue
    cp = reverse_cmap.get(gname)
    if cp is None:
        continue
    if cp in STANDARD_RANGES:
        continue
    if cp in extracted:
        continue  # already captured above
    result = extract_glyph(cp, gname)
    if result is None:
        continue
    width, bounds, d = result
    # Verify non-zero contours: path data must contain at least one move + close pair
    if d.count("M") < 1:
        continue
    extracted[cp] = (gname, width, bounds, d)
    bounds_str = f"({bounds[0]:.0f},{bounds[1]:.0f},{bounds[2]:.0f},{bounds[3]:.0f})" if bounds else "none"
    print(f"U+{cp:04X}    {gname:<20} {width:<8} {bounds_str:<30} {d[:80]}")

# 3. Write individual SVG files
print(f"\nWriting {len(extracted)} individual SVG files to {OUT_DIR} ...")
PADDING = 50

for cp, (name, width, bounds, d) in sorted(extracted.items()):
    if bounds:
        xmin, ymin, xmax, ymax = bounds
        vx = xmin - PADDING
        vy = ymin - PADDING
        vw = (xmax - xmin) + PADDING * 2
        vh = (ymax - ymin) + PADDING * 2
    else:
        vx, vy, vw, vh = 0, 0, width or 1200, 1200

    # Font coords are Y-up; SVG is Y-down. Flip via transform.
    svg_content = (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="{vx} {-(vy + vh) + (vy)} {vw} {vh}">\n'
        f'  <rect width="{vw}" height="{vh}" fill="#F5F1EA"/>\n'
        f'  <g transform="translate({-vx},{vh + vy}) scale(1,-1)">\n'
        f'    <path d="{d}" fill="#111111"/>\n'
        f'  </g>\n'
        f'</svg>\n'
    )
    out_path = OUT_DIR / f"glyph-U{cp:04X}.svg"
    out_path.write_text(svg_content)

print(f"Done. {len(extracted)} glyphs extracted.")
print(f"Files: {OUT_DIR}/glyph-U*.svg")
print("\nSummary by range:")
pua = [cp for cp in extracted if 0xE000 <= cp <= 0xE009]
secondary = [cp for cp in extracted if cp not in pua]
print(f"  PUA fleuron pairs (U+E000–E009): {len(pua)} glyphs")
print(f"  Other ranges:                    {len(secondary)} glyphs")
