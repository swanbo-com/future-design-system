"""
Pair-agnostic brand asset regeneration script.

Reads the confirmed flanker pair from docs/DECISIONS.md (GLYPH-CONFIRMED block),
detects whatever pair is currently baked into pacific-kings-lockup.svg, swaps
every horizontal lockup and social composite SVG to the confirmed pair, then
rebuilds all 4 stacked lockup variants from scratch.

Run from repo root OR from anywhere — uses absolute paths based on __file__.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
BRAND      = SCRIPT_DIR.parent            # app/public/brand/pacific-kings/
# Walk up: _build -> pacific-kings -> brand -> public -> app -> future-repo
REPO       = BRAND.parent.parent.parent.parent  # future-repo/
DECISIONS  = REPO / "docs" / "DECISIONS.md"
FONT       = REPO / "app" / "public" / "fonts" / "OhnoBlazeface-72Point.otf"

# ---------------------------------------------------------------------------
# Layout constants (must match the existing lockup geometry)
# ---------------------------------------------------------------------------
FLANKER_SCALE_HORIZ  = 1.1968   # scale used in horizontal lockups
FLANKER_BASELINE_Y   = 907.4    # translate-y in horizontal lockups

FLANKER_SCALE_STACKED = 2.45    # scale used in stacked lockups
STACKED_LEADING       = 900     # units between baselines (PACIFIC / KINGS)
STACKED_FLANKER_GAP   = 320     # units: flanker ink-edge to nearest letter
STACKED_PAD_TOP       = 250
STACKED_PAD_BOTTOM    = 250
STACKED_PAD_SIDE      = 400

# Files that must never be touched by the swap pass
SKIP_SET = {
    "pacific-kings-lockup-alt-teardrop.svg",
    "pacific-kings-wordmark.svg",
    # Stacked are rebuilt from scratch separately
    "pacific-kings-lockup-stacked.svg",
    "pacific-kings-lockup-stacked-ink.svg",
    "pacific-kings-lockup-stacked-cream.svg",
    "pacific-kings-lockup-stacked-vermillion.svg",
}


# ===========================================================================
# Step 1: Read confirmed pair from DECISIONS.md
# ===========================================================================

def read_confirmed_pair(decisions_path: Path) -> tuple[int, int]:
    """Extract LEFT_CP and RIGHT_CP from the GLYPH-CONFIRMED block."""
    text = decisions_path.read_text()
    if "GLYPH-CONFIRMED" not in text:
        sys.exit(
            f"ERROR: GLYPH-CONFIRMED block not found in {decisions_path}\n"
            "Run Plan 01-02 first to record the confirmed flanker pair."
        )
    # Match lines like: LEFT_CP = 0xE006  or  RIGHT_CP = 0xE007
    left_m  = re.search(r"LEFT_CP\s*=\s*(0x[0-9A-Fa-f]+)", text)
    right_m = re.search(r"RIGHT_CP\s*=\s*(0x[0-9A-Fa-f]+)", text)
    if not left_m or not right_m:
        sys.exit(
            "ERROR: Could not parse LEFT_CP / RIGHT_CP from GLYPH-CONFIRMED block.\n"
            f"Block content around GLYPH-CONFIRMED:\n"
            + text[text.index("GLYPH-CONFIRMED") - 10 : text.index("GLYPH-CONFIRMED") + 300]
        )
    left_cp  = int(left_m.group(1), 16)
    right_cp = int(right_m.group(1), 16)
    print(f"[DECISIONS.md] Confirmed pair: LEFT_CP=0x{left_cp:04X}  RIGHT_CP=0x{right_cp:04X}")
    return left_cp, right_cp


# ===========================================================================
# Step 2: Detect currently-baked pair from pacific-kings-lockup.svg
# ===========================================================================

def detect_current_pair(brand_dir: Path) -> tuple[str, str, float, float]:
    """
    Return (left_path_d, right_path_d, left_tx, right_tx) from the lockup SVG.

    Looks for the two flanker <g> blocks — the first and last translate(x, 907.4)
    scale(1.1968,-1.1968) groups in the file.
    """
    lockup = (brand_dir / "pacific-kings-lockup.svg").read_text()
    flanker_re = re.compile(
        r'<g transform="translate\(([0-9.\-]+),' + str(FLANKER_BASELINE_Y) + r'\) '
        r'scale\(' + str(FLANKER_SCALE_HORIZ) + r',-' + str(FLANKER_SCALE_HORIZ) + r'\)">'
        r'<path d="([^"]+)"/></g>'
    )
    matches = flanker_re.findall(lockup)
    if len(matches) < 2:
        sys.exit(
            f"ERROR: Expected >=2 flanker <g> blocks in pacific-kings-lockup.svg, "
            f"found {len(matches)}.\n"
            "The file may have been manually edited. Check the flanker transform format."
        )
    left_tx,  left_d  = float(matches[0][0]),  matches[0][1]
    right_tx, right_d = float(matches[-1][0]), matches[-1][1]
    print(f"[Detected]   Left  translate_x={left_tx:.1f}  path[:30]={left_d[:30]!r}")
    print(f"[Detected]   Right translate_x={right_tx:.1f}  path[:30]={right_d[:30]!r}")
    return left_d, right_d, left_tx, right_tx


# ===========================================================================
# Step 3: Extract glyph data from font
# ===========================================================================

def extract_glyph(font: TTFont, cp: int) -> tuple[str, int, tuple]:
    """Return (path_d, advance_width, bounds) for codepoint cp."""
    cmap = font.getBestCmap()
    if cp not in cmap:
        sys.exit(f"ERROR: Codepoint 0x{cp:04X} not found in font cmap.")
    gs = font.getGlyphSet()
    glyph = gs[cmap[cp]]
    pen = SVGPathPen(gs)
    glyph.draw(pen)
    bp = BoundsPen(gs)
    glyph.draw(bp)
    return pen.getCommands(), glyph.width, bp.bounds  # (xmin, ymin, xmax, ymax)


# ===========================================================================
# Step 4: Compute new translate-x using ink-alignment math
# ===========================================================================

def compute_new_tx(
    old_left_tx: float,
    old_right_tx: float,
    old_left_bb: tuple,
    old_right_bb: tuple,
    new_left_bb: tuple,
    new_right_bb: tuple,
    scale: float,
) -> tuple[float, float]:
    """
    Ink-edge alignment: the new pair's ink right-edge (left flanker) and
    ink left-edge (right flanker) land at the same SVG position as the old pair's.
    This preserves the gap to the first/last letter regardless of advance-width.
    """
    old_left_ink_right  = old_left_tx  + old_left_bb[2]  * scale
    old_right_ink_left  = old_right_tx + old_right_bb[0] * scale
    new_left_tx  = old_left_ink_right  - new_left_bb[2]  * scale
    new_right_tx = old_right_ink_left  - new_right_bb[0] * scale
    print(f"[Ink edges]  Old left ink-right={old_left_ink_right:.2f}  "
          f"old right ink-left={old_right_ink_left:.2f}")
    print(f"[New tx]     left={new_left_tx:.2f}  right={new_right_tx:.2f}")
    return new_left_tx, new_right_tx


# ===========================================================================
# Step 5: Swap all horizontal lockup + social composite SVGs
# ===========================================================================

def build_horiz_group(path_d: str, tx: float) -> str:
    return (
        f'<g transform="translate({tx:.1f},{FLANKER_BASELINE_Y}) '
        f'scale({FLANKER_SCALE_HORIZ},-{FLANKER_SCALE_HORIZ})">'
        f'<path d="{path_d}"/></g>'
    )


def swap_horizontal_svgs(
    brand_dir: Path,
    old_left_d: str,
    old_right_d: str,
    old_left_tx: float,
    old_right_tx: float,
    new_left_d: str,
    new_right_d: str,
    new_left_tx: float,
    new_right_tx: float,
) -> int:
    old_left_str  = build_horiz_group(old_left_d,  old_left_tx)
    old_right_str = build_horiz_group(old_right_d, old_right_tx)
    new_left_str  = build_horiz_group(new_left_d,  new_left_tx)
    new_right_str = build_horiz_group(new_right_d, new_right_tx)

    svgs = sorted(
        p for p in brand_dir.glob("*.svg")
        if not p.name.startswith("favicon")
        and p.name not in SKIP_SET
    )

    print(f"\n[Swap pass]  {len(svgs)} SVGs to process")
    total_left = total_right = 0
    already_correct = []

    for svg_path in svgs:
        text = svg_path.read_text()

        # Check if already using the new pair
        if new_left_str in text or new_right_str in text:
            already_correct.append(svg_path.name)
            left_hits  = text.count(new_left_str)
            right_hits = text.count(new_right_str)
            print(f"  ALREADY   {svg_path.name:<55} (new pair already present: "
                  f"left:{left_hits} right:{right_hits})")
            total_left  += left_hits
            total_right += right_hits
            continue

        left_hits  = text.count(old_left_str)
        right_hits = text.count(old_right_str)

        if left_hits == 0 and right_hits == 0:
            print(f"  SKIP      {svg_path.name:<55} (neither old nor new flankers found — "
                  f"unexpected, check manually)")
            continue

        new_text = text.replace(old_left_str,  new_left_str)
        new_text = new_text.replace(old_right_str, new_right_str)
        svg_path.write_text(new_text)
        total_left  += left_hits
        total_right += right_hits
        print(f"  OK        {svg_path.name:<55} (left:{left_hits} right:{right_hits})")

    if already_correct:
        print(f"\n  NOTE: {len(already_correct)} files already had the new pair.")
    print(f"\n[Swap pass]  Total replacements: {total_left} left, {total_right} right")
    return total_left + total_right


# ===========================================================================
# Step 6: Rebuild stacked lockups from scratch
# ===========================================================================

def build_stacked_lockups(brand_dir: Path, font: TTFont, left_cp: int, right_cp: int):
    """Rebuild all 4 stacked lockup SVGs using the confirmed pair at FLANKER_SCALE_STACKED."""

    # --- parse letter paths from the (now-updated) horizontal lockup ---
    lockup_svg = (brand_dir / "pacific-kings-lockup.svg").read_text()
    letter_re = re.compile(
        r'<g transform="translate\(([0-9.\-]+),846\.6\) scale\(1,-1\)">'
        r'<path d="([^"]+)"/></g>'
    )
    letters = [(float(x), d) for x, d in letter_re.findall(lockup_svg)]
    if len(letters) != 12:
        sys.exit(
            f"ERROR: Expected 12 letter groups in horizontal lockup, found {len(letters)}.\n"
            "The lockup SVG may have an unexpected structure."
        )
    pacific = letters[:7]
    kings   = letters[7:]

    # Approximate widths from letter x-positions
    pacific_start = pacific[0][0]
    pacific_end   = pacific[-1][0] + 737.4   # C's approx advance
    pacific_width = pacific_end - pacific_start
    kings_start   = kings[0][0]
    kings_end     = kings[-1][0] + 566        # S's approx advance
    kings_width   = kings_end - kings_start

    # --- extract flanker paths ---
    l_path, l_adv, l_bb = extract_glyph(font, left_cp)
    r_path, r_adv, r_bb = extract_glyph(font, right_cp)
    s = FLANKER_SCALE_STACKED
    print(f"\n[Stacked]    Left  bounds={l_bb}  advance={l_adv}")
    print(f"[Stacked]    Right bounds={r_bb}  advance={r_adv}")

    l_ink_w = (l_bb[2] - l_bb[0]) * s
    r_ink_w = (r_bb[2] - r_bb[0]) * s

    # --- layout ---
    max_line_w   = max(pacific_width, kings_width)
    left_ink_start = STACKED_PAD_SIDE
    left_tx        = left_ink_start - l_bb[0] * s
    left_ink_end   = left_ink_start + l_ink_w
    text_x0        = left_ink_end + STACKED_FLANKER_GAP
    text_x1        = text_x0 + max_line_w
    right_ink_start = text_x1 + STACKED_FLANKER_GAP
    right_tx        = right_ink_start - r_bb[0] * s
    right_ink_end   = right_ink_start + r_ink_w
    total_width     = right_ink_end + STACKED_PAD_SIDE

    line1_baseline = STACKED_PAD_TOP + 680   # cap-height of first line above baseline
    line2_baseline = line1_baseline + STACKED_LEADING
    text_top       = STACKED_PAD_TOP
    text_bottom    = line2_baseline + 15
    total_height   = text_bottom + STACKED_PAD_BOTTOM

    block_center_y   = (text_top + text_bottom) / 2
    center_offset    = (l_bb[1] + l_bb[3]) / 2 * s
    flanker_baseline = block_center_y + center_offset

    def render_line(line_letters, line_start_x, baseline_y, line_width):
        offset = text_x0 + (max_line_w - line_width) / 2 - line_start_x
        return [
            f'<g transform="translate({lx + offset:.1f},{baseline_y}) '
            f'scale(1,-1)"><path d="{d}"/></g>'
            for lx, d in line_letters
        ]

    body = []
    body.append(
        f'<g transform="translate({left_tx:.1f},{flanker_baseline:.1f}) '
        f'scale({s},{-s})"><path d="{l_path}"/></g>'
    )
    body.extend(render_line(pacific, pacific_start, line1_baseline, pacific_width))
    body.extend(render_line(kings,   kings_start,   line2_baseline, kings_width))
    body.append(
        f'<g transform="translate({right_tx:.1f},{flanker_baseline:.1f}) '
        f'scale({s},{-s})"><path d="{r_path}"/></g>'
    )

    def assemble(fill: str) -> str:
        inner = "\n    ".join(body)
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" '
            f'viewBox="0 0 {total_width:.1f} {total_height:.1f}">\n'
            f'  <g fill="{fill}">\n    {inner}\n  </g>\n'
            f'</svg>\n'
        )

    outputs = {
        "pacific-kings-lockup-stacked.svg":            "currentColor",
        "pacific-kings-lockup-stacked-ink.svg":        "#111111",
        "pacific-kings-lockup-stacked-cream.svg":      "#F5F1EA",
        "pacific-kings-lockup-stacked-vermillion.svg": "#D93A2B",
    }
    for name, fill in outputs.items():
        (brand_dir / name).write_text(assemble(fill))
        print(f"  WROTE     {name}  ({total_width:.0f} x {total_height:.0f})")

    return len(outputs)


# ===========================================================================
# Main
# ===========================================================================

def main():
    print("=" * 65)
    print("PACIFIC KINGS brand asset regeneration")
    print("=" * 65)

    # 1. Read confirmed pair from DECISIONS.md
    left_cp, right_cp = read_confirmed_pair(DECISIONS)

    # 2. Detect currently-baked pair
    old_left_d, old_right_d, old_left_tx, old_right_tx = detect_current_pair(BRAND)

    # 3. Load font and extract both pairs
    font = TTFont(str(FONT))
    new_left_d,  new_left_w,  new_left_bb  = extract_glyph(font, left_cp)
    new_right_d, new_right_w, new_right_bb = extract_glyph(font, right_cp)
    print(f"[New pair]   Left  advance={new_left_w}  bounds={new_left_bb}")
    print(f"[New pair]   Right advance={new_right_w}  bounds={new_right_bb}")
    print(f"[New pair]   Left  path[:30]={new_left_d[:30]!r}")
    print(f"[New pair]   Right path[:30]={new_right_d[:30]!r}")

    # Need old pair bounds for ink-alignment math
    # Extract from font using the path data fingerprint to figure out which CP
    # Actually: detect old CPs by matching path data from font
    old_left_bb  = None
    old_right_bb = None
    for cp in [0xE000, 0xE001, 0xE002, 0xE003, 0xE004, 0xE005, 0xE006, 0xE007, 0xE008, 0xE009]:
        d, w, bb = extract_glyph(font, cp)
        if d == old_left_d:
            old_left_bb = bb
            print(f"[Old pair]   Left  matched codepoint 0x{cp:04X}  bounds={bb}")
        if d == old_right_d:
            old_right_bb = bb
            print(f"[Old pair]   Right matched codepoint 0x{cp:04X}  bounds={bb}")

    if old_left_bb is None or old_right_bb is None:
        # Fallback: derive bounds from font for the two flanker groups detected
        # If we can't match, we print a warning and use the detected tx values as-is
        print("WARNING: Could not match old flanker paths to known codepoints.")
        print("         Using detected translate values for ink-alignment math.")
        # Estimate bounds by working backwards from translate
        # This is approximate but workable
        old_left_bb  = (0, 0, (old_left_tx  + 100) / FLANKER_SCALE_HORIZ, 1)  # rough
        old_right_bb = (0, 0, 0, 1)

    # 4. Compute new translate-x values
    new_left_tx, new_right_tx = compute_new_tx(
        old_left_tx, old_right_tx,
        old_left_bb, old_right_bb,
        new_left_bb, new_right_bb,
        FLANKER_SCALE_HORIZ,
    )

    # 5. Swap all horizontal SVGs
    total_replacements = swap_horizontal_svgs(
        BRAND,
        old_left_d,  old_right_d,  old_left_tx,  old_right_tx,
        new_left_d,  new_right_d,  new_left_tx,  new_right_tx,
    )

    # 6. Rebuild stacked lockups
    print("\n[Stacked lockups]  Rebuilding 4 variants from scratch...")
    stacked_count = build_stacked_lockups(BRAND, font, left_cp, right_cp)

    # 7. Summary
    print("\n" + "=" * 65)
    print("SUMMARY")
    print("=" * 65)
    print(f"  Confirmed pair:     LEFT_CP=0x{left_cp:04X}  RIGHT_CP=0x{right_cp:04X}")
    print(f"  SVG replacements:   {total_replacements} total (left + right flankers)")
    print(f"  Stacked rebuilt:    {stacked_count} variants")
    print(f"  New left tx:        {new_left_tx:.1f}")
    print(f"  New right tx:       {new_right_tx:.1f}")
    print(f"  New pair path[:40]: {new_left_d[:40]!r}")
    print("  Next step: re-render all PNGs from the updated SVGs.")
    print("=" * 65)


if __name__ == "__main__":
    main()
