"""
Rebuild the stacked PACIFIC/KINGS lockup with Pair B flankers.

Unlike v1, this version extracts Pair B directly from the font via
fontTools and positions flankers by their ink bounds, so it's pair-
agnostic and correctly sized regardless of the chosen pair.
"""
from __future__ import annotations

import re
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont

REPO = Path.home() / "Documents/projects/future/future-repo"
BRAND = REPO / "app/public/brand/pacific-kings"
FONT = REPO / "app/public/fonts/OhnoBlazeface-72Point.otf"

# Config — Pair B is canonical
LEFT_CP  = 0xE002
RIGHT_CP = 0xE003
FLANKER_SCALE = 2.45
LEADING = 900              # units between baselines of PACIFIC and KINGS
FLANKER_GAP = 320          # units between flanker ink edge and nearest letter
PAD_TOP = 250
PAD_BOTTOM = 250


def extract(font, cp):
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    glyph = gs[cmap[cp]]
    pen = SVGPathPen(gs)
    glyph.draw(pen)
    bp = BoundsPen(gs)
    glyph.draw(bp)
    return pen.getCommands(), glyph.width, bp.bounds


def main():
    # --- parse letter paths from the (now Pair-B) horizontal lockup ----
    lockup_svg = (BRAND / "pacific-kings-lockup.svg").read_text()
    letter_re = re.compile(
        r'<g transform="translate\(([0-9.\-]+),846\.6\) scale\(1,-1\)">'
        r'<path d="([^"]+)"/></g>'
    )
    letters = [(float(x), d) for x, d in letter_re.findall(lockup_svg)]
    assert len(letters) == 12
    pacific = letters[:7]
    kings = letters[7:]

    # Widths from existing x-positions
    pacific_start = pacific[0][0]
    pacific_end = pacific[-1][0] + 737.4  # C's approx advance
    pacific_width = pacific_end - pacific_start
    kings_start = kings[0][0]
    kings_end = kings[-1][0] + 566  # S's approx advance
    kings_width = kings_end - kings_start

    # --- flankers ------------------------------------------------------
    font = TTFont(str(FONT))
    l_path, l_adv, l_bb = extract(font, LEFT_CP)
    r_path, r_adv, r_bb = extract(font, RIGHT_CP)
    print(f"left bounds:  {l_bb}  advance: {l_adv}")
    print(f"right bounds: {r_bb}  advance: {r_adv}")

    # ink widths after scale
    l_ink_w = (l_bb[2] - l_bb[0]) * FLANKER_SCALE
    r_ink_w = (r_bb[2] - r_bb[0]) * FLANKER_SCALE

    # --- layout --------------------------------------------------------
    max_line_w = max(pacific_width, kings_width)

    # Place left flanker at x=PAD_SIDE (ink starts at PAD_SIDE)
    PAD_SIDE = 400
    left_ink_start = PAD_SIDE
    # translate_x = left_ink_start - bb.xmin * scale
    left_tx = left_ink_start - l_bb[0] * FLANKER_SCALE
    # right ink edge:
    left_ink_end = left_ink_start + l_ink_w

    text_x0 = left_ink_end + FLANKER_GAP
    text_x1 = text_x0 + max_line_w

    right_ink_start = text_x1 + FLANKER_GAP
    # translate_x = right_ink_start - bb.xmin * scale
    right_tx = right_ink_start - r_bb[0] * FLANKER_SCALE
    right_ink_end = right_ink_start + r_ink_w

    total_width = right_ink_end + PAD_SIDE

    # Baselines
    line1_baseline = PAD_TOP + 680  # cap height of first line above baseline
    line2_baseline = line1_baseline + LEADING
    text_top = PAD_TOP
    text_bottom = line2_baseline + 15
    total_height = text_bottom + PAD_BOTTOM

    # Flanker baseline: vertically center the ink on the text block
    block_center_y = (text_top + text_bottom) / 2
    # Glyph ink extends from y=bb.ymin to y=bb.ymax. After scale(s, -s),
    # the ink spans vertically from base_y - bb.ymax*s to base_y - bb.ymin*s.
    # Center of that span = base_y - (bb.ymin + bb.ymax)/2 * s.
    # Set = block_center_y → base_y = block_center_y + (bb.ymin + bb.ymax)/2 * s
    center_offset = (l_bb[1] + l_bb[3]) / 2 * FLANKER_SCALE
    flanker_baseline_y = block_center_y + center_offset

    # --- emit ----------------------------------------------------------
    def render_line(line_letters, line_start_x, baseline_y, line_width):
        line_x_offset = text_x0 + (max_line_w - line_width) / 2 - line_start_x
        return [
            f'<g transform="translate({lx + line_x_offset:.1f},{baseline_y}) '
            f'scale(1,-1)"><path d="{d}"/></g>'
            for lx, d in line_letters
        ]

    body = []
    body.append(
        f'<g transform="translate({left_tx:.1f},{flanker_baseline_y:.1f}) '
        f'scale({FLANKER_SCALE},{-FLANKER_SCALE})"><path d="{l_path}"/></g>'
    )
    body.extend(render_line(pacific, pacific_start, line1_baseline, pacific_width))
    body.extend(render_line(kings, kings_start, line2_baseline, kings_width))
    body.append(
        f'<g transform="translate({right_tx:.1f},{flanker_baseline_y:.1f}) '
        f'scale({FLANKER_SCALE},{-FLANKER_SCALE})"><path d="{r_path}"/></g>'
    )

    def assemble(fill):
        inner = "\n    ".join(body)
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" '
            f'viewBox="0 0 {total_width:.1f} {total_height:.1f}">\n'
            f'  <g fill="{fill}">\n    {inner}\n  </g>\n'
            f'</svg>\n'
        )

    outputs = {
        "pacific-kings-lockup-stacked.svg": "currentColor",
        "pacific-kings-lockup-stacked-ink.svg": "#111111",
        "pacific-kings-lockup-stacked-cream.svg": "#F5F1EA",
        "pacific-kings-lockup-stacked-vermillion.svg": "#D93A2B",
    }
    for name, fill in outputs.items():
        (BRAND / name).write_text(assemble(fill))
        print(f"wrote {name}  ({total_width:.0f} x {total_height:.0f})")


if __name__ == "__main__":
    main()
