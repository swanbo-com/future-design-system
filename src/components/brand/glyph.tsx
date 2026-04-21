import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Glyph primitives.
 *
 * `<Glyph>` renders a real Blazeface character (dingbat, arrow, hand,
 * fraction, ornament) at the correct optical cut for the render size.
 * See design-system/GLYPHS.md for codepoints and restraint rules.
 *
 * `<Flanker>` is a `<Glyph>` specialised for the fleuron-pair flanker slot
 * (U+E000–U+E009, paired). Never use a single flanker — always left + right.
 *
 * `<TitleFlanker>` composes a full kicker / section / hero title with its
 * matching flanker pair around the label.
 */

type GlyphSize = "xs" | "sm" | "md" | "lg" | "xl";

/** Match the optical cut variables defined in globals.css @theme. */
const GLYPH_SIZE_FONT: Record<GlyphSize, string> = {
  xs: "var(--font-display-12)", //  10–15 px
  sm: "var(--font-display-16)", //  16–23 px
  md: "var(--font-display-24)", //  24–40 px
  lg: "var(--font-display-48)", //  48–72 px
  xl: "var(--font-display)", //     72–144 px (display-72)
};

type GlyphProps = Omit<HTMLAttributes<HTMLSpanElement>, "color"> & {
  char: string;
  size?: GlyphSize;
  fontSize?: number | string;
  italic?: boolean;
  color?: string;
};

export function Glyph({
  char,
  size = "sm",
  fontSize,
  italic = false,
  color,
  className,
  style,
  ...rest
}: GlyphProps) {
  return (
    <span
      {...rest}
      className={cn("inline-block align-middle leading-none font-black", className)}
      style={{
        fontFamily: GLYPH_SIZE_FONT[size],
        fontStyle: italic ? "italic" : "normal",
        fontSize,
        color,
        ...style,
      }}
    >
      {char}
    </span>
  );
}

/* ============================================
   Named dingbat + ornament characters
   ============================================ */
export const DINGBATS = {
  sun8: "\u2738", //   ✸  8-point star (heritage)
  floret: "\u2749", // ❉  balloon floret — CANONICAL inline mark
  star12: "\u2739", // ✹  12-point star (seal stamp option)
  star16: "\u273A", // ✺  16-point asterisk
  star5: "\u2605", //  ★  5-point star
  bulletSq: "\u25A0", // ■  solid square (sub-12 px bullet)
  bulletDot: "\u25CF", // ●  solid circle
} as const;

export const ARROWS = {
  cta: "\u27A4", //    ➤  primary CTA arrow
  back: "\u27A5", //   ➥  return / back-link
  flourish: "\u27BE", // ➾ closing flourish
  curly1: "\u27BB", // ➻
  curly2: "\u27BC", // ➼
  curly3: "\u27BD", // ➽
} as const;

export const HANDS = {
  pointLeft: "\u261C", //  ☜
  pointRight: "\u261E", // ☞
  peace: "\u270C", //      ✌
  writing: "\u270D", //    ✍  editor / founder voice
  nib: "\u2712", //        ✒  editor's mark
} as const;

/* ============================================
   Fleuron flanker pairs — U+E000–U+E009
   Patched into the OTF cmaps; see GLYPHS.md.
   Pairs are labeled A–E by width.
   ============================================ */
export const FLEURON_PAIRS = {
  A: { left: "\uE000", right: "\uE001" }, // editorial (v1.0c: was primary hero, demoted)
  B: { left: "\uE002", right: "\uE003" }, // canonical hero (v1.0c)
  C: { left: "\uE004", right: "\uE005" },
  D: { left: "\uE006", right: "\uE007" }, // canonical secondary (press kit / dark-mode alternate)
  E: { left: "\uE008", right: "\uE009" },
} as const;

export type FleuronPair = keyof typeof FLEURON_PAIRS;

type FlankerProps = {
  pair: FleuronPair;
  side: "left" | "right";
  fontSize?: number | string;
  className?: string;
  style?: CSSProperties;
};

export function Flanker({ pair, side, fontSize = 44, className, style }: FlankerProps) {
  return (
    <span
      className={cn("inline-block align-middle leading-[0.9] font-black", className)}
      style={{
        fontFamily: "var(--font-display-48)",
        fontSize,
        ...style,
      }}
    >
      {FLEURON_PAIRS[pair][side]}
    </span>
  );
}

/* ============================================
   Title with flanker pair — the hero pattern
   ============================================ */
type TitleFlankerProps = {
  pair?: FleuronPair;
  flankerSize?: number;
  gap?: number;
  className?: string;
  children: ReactNode;
};

export function TitleFlanker({
  pair = "B",
  flankerSize = 44,
  gap = 20,
  className,
  children,
}: TitleFlankerProps) {
  return (
    <div
      className={cn("inline-flex items-center justify-center whitespace-nowrap", className)}
      style={{ gap }}
    >
      <Flanker pair={pair} side="left" fontSize={flankerSize} />
      <div>{children}</div>
      <Flanker pair={pair} side="right" fontSize={flankerSize} />
    </div>
  );
}
