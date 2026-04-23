"""
Render just the 5 fleuron pairs (U+E000..E009) each flanking 'PACIFIC KINGS'
at proper lockup scale (flanker 1.1968x, letters 1x), tall and clean so
the user can pick visually.
"""
from __future__ import annotations
import re
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont

REPO = Path.home() / "Documents/projects/future/future-repo"
FONT = REPO / "app/public/fonts/OhnoBlazeface-72Point.otf"
LOCKUP_SVG = REPO / "app/public/brand/pacific-kings/pacific-kings-lockup.svg"
OUT_SVG = Path("/tmp/blazeface-glyphs/fleuron-picker.svg")

FLANKER_SCALE = 1.1968
LETTER_RE = re.compile(
    r'<g transform="translate\(([0-9.\-]+),846\.6\) scale\(1,-1\)">'
    r'<path d="([^"]+)"/></g>'
)

LETTERS = [(float(x), d) for x, d in LETTER_RE.findall(LOCKUP_SVG.read_text())]
LETTERS_MIN_X = min(x for x, _ in LETTERS)
LETTERS_MAX_X_PLUS = max(x for x, _ in LETTERS) + 700


def gpath(font, cp):
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    name = cmap[cp]
    g = gs[name]
    p = SVGPathPen(gs)
    g.draw(p)
    return p.getCommands(), g.width


def build():
    font = TTFont(str(FONT))
    pairs = [
        ("A", 0xE000, 0xE001),
        ("B", 0xE002, 0xE003),
        ("C", 0xE004, 0xE005),
        ("D", 0xE006, 0xE007),
        ("E", 0xE008, 0xE009),
    ]
    glyphs = {}
    for _, l, r in pairs:
        glyphs[l] = gpath(font, l)
        glyphs[r] = gpath(font, r)

    # Uniform flanker slot width
    slot_w = max(w for _, w in glyphs.values()) * FLANKER_SCALE + 300
    gap = 280
    letters_w = LETTERS_MAX_X_PLUS - LETTERS_MIN_X

    margin = 400
    row_w = slot_w + gap + letters_w + gap + slot_w
    canvas_w = row_w + margin * 2

    row_h = 1800  # big enough for flanker overshoot
    label_h = 280
    row_total = row_h + label_h

    canvas_h = margin * 2 + row_total * len(pairs)

    out = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {canvas_w} {canvas_h}">',
        f'<rect width="{canvas_w}" height="{canvas_h}" fill="#F5F1EA"/>',
    ]

    for i, (label, l_cp, r_cp) in enumerate(pairs):
        y0 = margin + i * row_total
        if i % 2 == 0:
            out.append(
                f'<rect x="0" y="{y0 - 60}" width="{canvas_w}" height="{row_total}" fill="#FFFDF8"/>'
            )

        baseline = y0 + 1100  # enough headroom for flanker top

        # Big pair label on left
        out.append(
            f'<text x="{margin}" y="{y0 + 200}" font-size="260" '
            f'fill="#D93A2B" font-family="Menlo, Monaco, monospace" '
            f'font-weight="700">PAIR {label}</text>'
        )
        out.append(
            f'<text x="{margin}" y="{y0 + 450}" font-size="130" '
            f'fill="#6B645A" font-family="Menlo, Monaco, monospace">'
            f'U+{l_cp:04X} / U+{r_cp:04X}</text>'
        )

        # Horizontal rule under label for readability
        out.append(
            f'<line x1="{margin}" y1="{y0 + row_h + 100}" '
            f'x2="{canvas_w - margin}" y2="{y0 + row_h + 100}" '
            f'stroke="#CFC4AF" stroke-width="6"/>'
        )

        # Compose the mini-lockup, centered horizontally starting at margin
        x_cursor = margin + 900  # clear space for the label
        # LEFT flanker
        l_path, l_w = glyphs[l_cp]
        l_w_scaled = l_w * FLANKER_SCALE
        offset = (slot_w - l_w_scaled) / 2
        out.append(
            f'<g transform="translate({x_cursor + offset},{baseline}) '
            f'scale({FLANKER_SCALE},{-FLANKER_SCALE})">'
            f'<path d="{l_path}" fill="#111111"/></g>'
        )
        x_cursor += slot_w + gap

        # LETTERS
        shift = x_cursor - LETTERS_MIN_X
        for (lx, d) in LETTERS:
            out.append(
                f'<g transform="translate({lx + shift},{baseline}) '
                f'scale(1,-1)"><path d="{d}" fill="#111111"/></g>'
            )
        x_cursor += letters_w + gap

        # RIGHT flanker
        r_path, r_w = glyphs[r_cp]
        r_w_scaled = r_w * FLANKER_SCALE
        offset = (slot_w - r_w_scaled) / 2
        out.append(
            f'<g transform="translate({x_cursor + offset},{baseline}) '
            f'scale({FLANKER_SCALE},{-FLANKER_SCALE})">'
            f'<path d="{r_path}" fill="#111111"/></g>'
        )

    out.append("</svg>")
    OUT_SVG.write_text("\n".join(out))
    print(f"wrote {OUT_SVG}")


if __name__ == "__main__":
    build()
