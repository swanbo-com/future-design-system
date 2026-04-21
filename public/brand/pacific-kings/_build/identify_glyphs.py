"""
For each codepoint U+E000..U+E009, extract the SVG path data from
OhnoBlazeface-72Point.otf and print the first 60 characters. Also
check which one matches the left-flanker path currently baked into
pacific-kings-lockup.svg (`M103 165C103 275 157 325...`). This tells
us definitively which pair is actually in the shipped file.
"""
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont

FONT = Path.home() / "Documents/projects/future/future-repo/app/public/fonts/OhnoBlazeface-72Point.otf"

# Path starts used as fingerprints
BAKED_LEFT_START = "M103 165C103 275 157 325"
BAKED_RIGHT_START = "M1081 165C1081 67 1049 20"

font = TTFont(str(FONT))
cmap = font.getBestCmap()
glyph_set = font.getGlyphSet()

print(f"{'cp':<8} {'glyph name':<14} {'width':<6} path start")
print("-" * 90)

for cp in range(0xE000, 0xE00A):
    name = cmap.get(cp)
    if name is None:
        print(f"U+{cp:04X}   (not mapped)")
        continue
    glyph = glyph_set[name]
    pen = SVGPathPen(glyph_set)
    glyph.draw(pen)
    d = pen.getCommands()
    match_l = "◀ MATCH baked left"  if d.startswith(BAKED_LEFT_START)  else ""
    match_r = "▶ MATCH baked right" if d.startswith(BAKED_RIGHT_START) else ""
    marker = match_l or match_r
    print(f"U+{cp:04X}  {name:<14} {glyph.width:<6} {d[:60]}  {marker}")
