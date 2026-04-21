# PACIFIC KINGS brand asset build scripts

Scripts used to generate the `pacific-kings-lockup*.svg` files and to swap
flanker pairs across every composite in one sweep. Ship with the assets
so the next regen doesn't have to re-derive the bounds math.

**Paths inside these scripts are hard-coded to `~/Documents/projects/future/future-repo/`.**
If you move the repo, update the `REPO` / `FONT` / `BRAND` constants at
the top of each file before running.

## Prerequisites

```bash
uv tool install cairosvg    # PNG rendering — do NOT use qlmanage, it mangles aspect ratio
pip install fonttools       # in a venv; or use uv tool install fonttools if available
```

## Scripts

### `identify_glyphs.py`
Diagnostic — dumps U+E000..E009 path-starts and glyph widths from
`OhnoBlazeface-72Point.otf`. Used to confirm which fleuron sits at which
codepoint before swapping. Run when in doubt about cmap mapping.

### `build_fleuron_picker.py`
Generates `fleuron-picker.svg` — a tall contact sheet showing all 5
fleuron pairs (A–E) each flanking "PACIFIC KINGS" at real lockup scale
(flanker 1.1968×, letters 1×). Render to PNG with:

```bash
~/.local/bin/cairosvg fleuron-picker.svg -o fleuron-picker.png \
    --output-width 2800 --output-height 2000
```

Use this when the canonical flanker pair needs to be re-picked against a
new specimen or a new Blazeface release. **The current `fleuron-picker.svg`
checked in alongside is the one the user picked Pair B from on
14 Apr 2026.**

### `swap_pair_a_to_b.py`
The swap that moved every SVG in this folder from Pair A (`U+E000/E001`)
to Pair B (`U+E002/E003`) on 14 Apr 2026. Does a string-level find-and-
replace of the Pair A flanker `<g>` blocks with Pair B blocks, and adjusts
the LEFT flanker's `translate` x so Pair B's ink right-edge sits in the
same SVG position Pair A's did (so the gap to the first letter stays
tight regardless of the advance-width difference between pairs).

**To swap to a different pair** (e.g., D), you need to:
1. Edit the `extract_glyph(font, 0xE002)` / `0xE003` calls to the new
   codepoints (e.g., `0xE006` / `0xE007` for Pair D).
2. Change the `old_left` / `old_right` regexes to match whatever pair is
   currently on disk (i.e., the `M103 165...` / `M1081 165...` Pair A
   strings in the current script will need to be updated to the current
   Pair B strings `M1041 265...` / `M28 265...`).
3. Run the script.
4. Re-run `build_stacked_lockup.py` (below) with the new LEFT/RIGHT
   constants.
5. Re-render every PNG.

A proper pair-agnostic version of this script (takes `--from` and `--to`
pair letters) is a follow-up — not needed for the launch push.

### `build_stacked_lockup.py`
Regenerates the four stacked PACIFIC/KINGS lockup variants
(`pacific-kings-lockup-stacked{,-ink,-cream,-vermillion}.svg`) from
scratch. Extracts the chosen flanker pair directly from the font via
fontTools, uses `BoundsPen` for ink bounds, positions the flankers at
2.45× scale vertically centered on the 2-line text block.

Change `LEFT_CP` / `RIGHT_CP` at the top to swap the pair.

After running, re-render PNGs:

```bash
cd /path/to/app/public/brand/pacific-kings
for v in ink cream vermillion; do
  ~/.local/bin/cairosvg "pacific-kings-lockup-stacked-${v}.svg" \
    -o "pacific-kings-lockup-stacked-${v}.png" \
    --output-width 4800 --output-height 941
done
```

## Verifying a swap

After any swap, grep the LEFT and RIGHT path-start fingerprints across
every SVG in the folder. Both should land in all 25 files, and the
previous pair's fingerprints should return zero hits:

```bash
rg 'M1041 265C1041 473 1011 595' app/public/brand/pacific-kings/*.svg | wc -l  # Pair B left
rg 'M28 265C28 100 37 -12 102 -12' app/public/brand/pacific-kings/*.svg | wc -l # Pair B right
rg 'M103 165C103 275 157 325' app/public/brand/pacific-kings/*.svg              # old Pair A — should be empty
```

`pacific-kings-lockup-alt-teardrop.svg` is always excluded from the swap
(it's an intentional alternate using `U+2196`) and will not match either
fingerprint.
