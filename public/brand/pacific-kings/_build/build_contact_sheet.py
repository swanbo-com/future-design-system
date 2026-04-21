"""
Build a labeled contact sheet SVG at /tmp/blazeface-glyphs/contact-sheet.svg
and render to PNG via cairosvg.

SECTION 1 — All candidate glyphs (4-per-row grid with labels)
SECTION 2 — 5 fleuron pairs flanking "PACIFIC KINGS" at lockup scale (replicates
            build_fleuron_picker.py logic exactly)

Render: 2800px-wide PNG + 2000px-wide tall version.
"""
from __future__ import annotations
import re
import subprocess
from pathlib import Path
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont

REPO = Path.home() / "Documents/projects/future/future-repo"
FONT = REPO / "app/public/fonts/OhnoBlazeface-72Point.otf"
LOCKUP_SVG = REPO / "app/public/brand/pacific-kings/pacific-kings-lockup.svg"
OUT_DIR = Path("/tmp/blazeface-glyphs")
OUT_SVG = OUT_DIR / "contact-sheet.svg"
OUT_PNG = OUT_DIR / "contact-sheet.png"
OUT_TALL = OUT_DIR / "contact-sheet-tall.png"

# ── Constants ──────────────────────────────────────────────────────────────────

FLANKER_SCALE = 1.1968
BG_CREAM = "#F5F1EA"
BG_SURFACE = "#FFFDF8"
INK = "#111111"
VERMILLION = "#D93A2B"
STONE = "#6B645A"
SAND = "#CFC4AF"
MONO_FONT = "Menlo, Monaco, monospace"

FLEURON_PAIRS = [
    ("A", 0xE000, 0xE001),
    ("B", 0xE002, 0xE003),
    ("C", 0xE004, 0xE005),
    ("D", 0xE006, 0xE007),
    ("E", 0xE008, 0xE009),
]

# ── Load font ──────────────────────────────────────────────────────────────────

font = TTFont(str(FONT))
cmap = font.getBestCmap()
glyph_set = font.getGlyphSet()


def gpath(cp):
    """Return (path_data, width, bounds) for a codepoint, or None if absent."""
    name = cmap.get(cp)
    if name is None:
        return None
    g = glyph_set[name]
    svg_pen = SVGPathPen(glyph_set)
    g.draw(svg_pen)
    d = svg_pen.getCommands()
    if not d:
        return None
    bp = BoundsPen(glyph_set)
    g.draw(bp)
    return d, g.width, bp.bounds  # bounds: (xmin, ymin, xmax, ymax) or None


# ── Load all extracted glyphs (same list as extract_all_ornaments.py) ──────────

CODEPOINT_RANGES = [
    range(0xE000, 0xE00A),
    range(0x2196, 0x219A),
    [0x273A, 0x2744],
    range(0x27BB, 0x27BF),
]

STANDARD_RANGES = set(range(0x0020, 0x007F)) | set(range(0x00A0, 0x0180))

all_glyphs: list[tuple[int, str, str, int, tuple | None]] = []  # (cp, label, d, width, bounds)

seen_cps = set()

for cp_range in CODEPOINT_RANGES:
    for cp in cp_range:
        name = cmap.get(cp)
        if name is None:
            continue
        res = gpath(cp)
        if res is None:
            continue
        d, w, bounds = res
        all_glyphs.append((cp, name, d, w, bounds))
        seen_cps.add(cp)

# uni* scan
reverse_cmap = {v: k for k, v in cmap.items()}
for gname, _g in glyph_set.items():
    if not gname.startswith("uni"):
        continue
    cp = reverse_cmap.get(gname)
    if cp is None or cp in STANDARD_RANGES or cp in seen_cps:
        continue
    res = gpath(cp)
    if res is None:
        continue
    d, w, bounds = res
    if d.count("M") < 1:
        continue
    all_glyphs.append((cp, gname, d, w, bounds))
    seen_cps.add(cp)

all_glyphs.sort(key=lambda x: x[0])

print(f"Loaded {len(all_glyphs)} glyphs for contact sheet.")

# ── Load letter paths from lockup SVG ─────────────────────────────────────────

LETTER_RE = re.compile(
    r'<g transform="translate\(([0-9.\-]+),846\.6\) scale\(1,-1\)">'
    r'<path d="([^"]+)"/></g>'
)
lockup_text = LOCKUP_SVG.read_text()
LETTERS = [(float(x), d) for x, d in LETTER_RE.findall(lockup_text)]
LETTERS_MIN_X = min(x for x, _ in LETTERS)
LETTERS_MAX_X_PLUS = max(x for x, _ in LETTERS) + 700  # advance past last glyph

# ── Section 1: Grid layout ─────────────────────────────────────────────────────

COLS = 4
CELL_SIZE = 600        # square cell for glyph
CELL_PAD = 50          # padding around glyph within cell
LABEL_H = 120          # height for label below glyph
CELL_TOTAL_W = CELL_SIZE + 80   # cell + column gap
CELL_TOTAL_H = CELL_SIZE + LABEL_H + 40

GRID_MARGIN_X = 200
GRID_MARGIN_TOP = 300   # space for title
GRID_MARGIN_BOT = 100

n_rows = (len(all_glyphs) + COLS - 1) // COLS
grid_w = COLS * CELL_TOTAL_W + GRID_MARGIN_X * 2
grid_h = GRID_MARGIN_TOP + n_rows * CELL_TOTAL_H + GRID_MARGIN_BOT

# ── Section 2: Fleuron pairs (reuse build_fleuron_picker.py logic exactly) ────

pair_glyphs = {}
for _, l, r in FLEURON_PAIRS:
    for cp in (l, r):
        res = gpath(cp)
        if res:
            pair_glyphs[cp] = (res[0], res[1])  # (d, width)

slot_w = max(w for _, w in pair_glyphs.values()) * FLANKER_SCALE + 300
gap = 280
letters_w = LETTERS_MAX_X_PLUS - LETTERS_MIN_X

pair_row_h = 1800
pair_label_h = 280
pair_row_total = pair_row_h + pair_label_h

PAIR_MARGIN = 400
pair_row_w = slot_w + gap + letters_w + gap + slot_w
pair_canvas_w_inner = pair_row_w + PAIR_MARGIN * 2 + 900  # +900 for pair label clearance

pairs_h = PAIR_MARGIN * 2 + pair_row_total * len(FLEURON_PAIRS)
pairs_title_h = 300  # section 2 header

# ── Canvas dimensions ─────────────────────────────────────────────────────────

canvas_w = max(grid_w, int(pair_canvas_w_inner))
total_h = int(grid_h + pairs_title_h + pairs_h + 200)  # 200 extra bottom padding

# ── Build SVG ─────────────────────────────────────────────────────────────────

out: list[str] = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {canvas_w} {total_h}">',
    f'<rect width="{canvas_w}" height="{total_h}" fill="{BG_CREAM}"/>',
]

# ── Section 1 title ────────────────────────────────────────────────────────────
out.append(
    f'<text x="{GRID_MARGIN_X}" y="{GRID_MARGIN_TOP - 80}" '
    f'font-size="120" fill="{INK}" font-family="{MONO_FONT}" font-weight="700">'
    f'BLAZEFACE 72PT — ALL ORNAMENT CANDIDATES ({len(all_glyphs)} glyphs)</text>'
)

# ── Section 1 cells ────────────────────────────────────────────────────────────
for i, (cp, name, d, w, bounds) in enumerate(all_glyphs):
    row = i // COLS
    col = i % COLS
    cx = GRID_MARGIN_X + col * CELL_TOTAL_W
    cy = GRID_MARGIN_TOP + row * CELL_TOTAL_H

    # Alternating background for readability
    bg_color = BG_SURFACE if (row + col) % 2 == 0 else BG_CREAM
    out.append(
        f'<rect x="{cx}" y="{cy}" width="{CELL_SIZE}" height="{CELL_SIZE}" '
        f'fill="{bg_color}" rx="8"/>'
    )

    # Scale glyph to fit in CELL_SIZE - 2*CELL_PAD
    if bounds:
        xmin, ymin, xmax, ymax = bounds
        gw = xmax - xmin
        gh = ymax - ymin
        if gw > 0 and gh > 0:
            max_side = max(gw, gh)
            scale = (CELL_SIZE - 2 * CELL_PAD) / max_side
        else:
            scale = 0.5
    else:
        scale = (CELL_SIZE - 2 * CELL_PAD) / (w if w else 1000)
        xmin, ymin, xmax, ymax = 0, 0, w or 1000, 1000
        gw = xmax - xmin
        gh = ymax - ymin

    # Center glyph within cell
    scaled_w = gw * scale
    scaled_h = gh * scale
    tx = cx + (CELL_SIZE - scaled_w) / 2 - xmin * scale
    # Y: font is Y-up, SVG is Y-down. Glyph bottom (ymin) maps to visual top after flip.
    # After scale(s,-s): point (x,y) -> (x*s, -y*s)
    # We want the glyph to be centered vertically in [cy, cy+CELL_SIZE].
    # The glyph occupies [ymin..ymax] in font coords. After flip: [-ymax..-ymin]*s in SVG.
    # So visual top = cy + (CELL_SIZE - scaled_h)/2 requires:
    # -ymax*scale + ty_translate = cy + (CELL_SIZE - scaled_h)/2
    ty = cy + (CELL_SIZE - scaled_h) / 2 + ymax * scale

    out.append(
        f'<g transform="translate({tx:.1f},{ty:.1f}) scale({scale:.4f},{-scale:.4f})">'
        f'<path d="{d}" fill="{INK}"/></g>'
    )

    # Label: "U+XXXX / name"
    label_text = f'U+{cp:04X} / {name}'
    out.append(
        f'<text x="{cx + CELL_SIZE // 2}" y="{cy + CELL_SIZE + 70}" '
        f'font-size="60" fill="{STONE}" font-family="{MONO_FONT}" '
        f'text-anchor="middle">{label_text}</text>'
    )

# ── Section 2 title ────────────────────────────────────────────────────────────
s2_y = grid_h
out.append(
    f'<rect x="0" y="{s2_y}" width="{canvas_w}" height="{pairs_title_h}" fill="{INK}"/>'
)
out.append(
    f'<text x="{PAIR_MARGIN}" y="{s2_y + 200}" '
    f'font-size="120" fill="{BG_CREAM}" font-family="{MONO_FONT}" font-weight="700">'
    f'FLEURON PAIRS — PACIFIC KINGS LOCKUP SCALE (FLANKER_SCALE={FLANKER_SCALE})</text>'
)

# ── Section 2 rows ─────────────────────────────────────────────────────────────
pairs_start_y = s2_y + pairs_title_h

for i, (label, l_cp, r_cp) in enumerate(FLEURON_PAIRS):
    y0 = pairs_start_y + PAIR_MARGIN + i * pair_row_total

    # Alternating stripe
    if i % 2 == 0:
        out.append(
            f'<rect x="0" y="{y0 - 60}" width="{canvas_w}" '
            f'height="{pair_row_total}" fill="{BG_SURFACE}"/>'
        )

    baseline = y0 + 1100

    # Pair label (left column)
    out.append(
        f'<text x="{PAIR_MARGIN}" y="{y0 + 200}" font-size="260" '
        f'fill="{VERMILLION}" font-family="{MONO_FONT}" font-weight="700">'
        f'PAIR {label}</text>'
    )
    out.append(
        f'<text x="{PAIR_MARGIN}" y="{y0 + 450}" font-size="130" '
        f'fill="{STONE}" font-family="{MONO_FONT}">'
        f'U+{l_cp:04X} / U+{r_cp:04X}</text>'
    )

    # Horizontal rule
    out.append(
        f'<line x1="{PAIR_MARGIN}" y1="{y0 + pair_row_h + 100}" '
        f'x2="{canvas_w - PAIR_MARGIN}" y2="{y0 + pair_row_h + 100}" '
        f'stroke="{SAND}" stroke-width="6"/>'
    )

    # Compose the lockup, centered horizontally (leaving room for pair label)
    x_cursor = PAIR_MARGIN + 900

    # LEFT flanker
    l_d, l_w = pair_glyphs[l_cp]
    l_w_scaled = l_w * FLANKER_SCALE
    offset = (slot_w - l_w_scaled) / 2
    out.append(
        f'<g transform="translate({x_cursor + offset:.1f},{baseline}) '
        f'scale({FLANKER_SCALE},{-FLANKER_SCALE})">'
        f'<path d="{l_d}" fill="{INK}"/></g>'
    )
    x_cursor += slot_w + gap

    # LETTERS
    shift = x_cursor - LETTERS_MIN_X
    for (lx, ld) in LETTERS:
        out.append(
            f'<g transform="translate({lx + shift:.1f},{baseline}) '
            f'scale(1,-1)"><path d="{ld}" fill="{INK}"/></g>'
        )
    x_cursor += letters_w + gap

    # RIGHT flanker
    r_d, r_w = pair_glyphs[r_cp]
    r_w_scaled = r_w * FLANKER_SCALE
    offset = (slot_w - r_w_scaled) / 2
    out.append(
        f'<g transform="translate({x_cursor + offset:.1f},{baseline}) '
        f'scale({FLANKER_SCALE},{-FLANKER_SCALE})">'
        f'<path d="{r_d}" fill="{INK}"/></g>'
    )

out.append("</svg>")

# ── Write SVG ─────────────────────────────────────────────────────────────────
OUT_DIR.mkdir(parents=True, exist_ok=True)
OUT_SVG.write_text("\n".join(out))
print(f"SVG written: {OUT_SVG}  ({OUT_SVG.stat().st_size // 1024} KB)")

# ── Render PNGs ───────────────────────────────────────────────────────────────
CAIROSVG = Path.home() / ".local/bin/cairosvg"

print(f"Rendering 2800px PNG ...")
result = subprocess.run(
    [str(CAIROSVG), str(OUT_SVG), "-o", str(OUT_PNG), "--output-width", "2800"],
    capture_output=True, text=True,
)
if result.returncode != 0:
    print(f"cairosvg error: {result.stderr}")
else:
    print(f"PNG written: {OUT_PNG}  ({OUT_PNG.stat().st_size // 1024} KB)")

print(f"Rendering 2000px tall version ...")
result2 = subprocess.run(
    [str(CAIROSVG), str(OUT_SVG), "-o", str(OUT_TALL), "--output-width", "2000"],
    capture_output=True, text=True,
)
if result2.returncode != 0:
    print(f"cairosvg error (tall): {result2.stderr}")
else:
    print(f"Tall PNG written: {OUT_TALL}  ({OUT_TALL.stat().st_size // 1024} KB)")

print(f"\nDone. Open: {OUT_PNG}")
