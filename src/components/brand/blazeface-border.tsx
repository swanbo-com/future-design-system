import { cn } from "@/lib/utils";
import { FLEURON_PAIRS, type FleuronPair } from "./glyph";

/**
 * BlazefaceBorder — decorative horizontal rule built from real Blazeface
 * fleurons. Reusable across the landing page as a section divider or as
 * the ornamental frame above/below a masthead/hero wordmark.
 *
 * Composition: [thin rule] · [alternating fleurons] · [thin rule]
 *
 * Variants:
 *   - `variant="rule"` — thin rule on each side of a single fleuron pair
 *   - `variant="row"` — no side rules, just a row of alternating fleurons
 *   - `variant="framed"` — double-rule top+bottom + alternating fleurons inside
 */

type Variant = "rule" | "row" | "framed";

type BlazefaceBorderProps = {
  pair?: FleuronPair;
  count?: number;
  size?: number;
  variant?: Variant;
  className?: string;
  color?: string;
  maxWidth?: number | string;
};

export function BlazefaceBorder({
  pair = "D",
  count = 5,
  size = 22,
  variant = "rule",
  className,
  color,
  maxWidth,
}: BlazefaceBorderProps) {
  const { left, right } = FLEURON_PAIRS[pair];
  const items = Array.from({ length: count }, (_, i) => (i % 2 === 0 ? left : right));

  const glyphStyle = {
    fontFamily: "var(--font-display-48)",
    fontSize: size,
    fontWeight: 900 as const,
    lineHeight: 0.9,
  };

  if (variant === "row") {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        style={{ color, maxWidth, gap: size * 0.8 }}
      >
        {items.map((ch, i) => (
          <span key={i} className="inline-block" style={glyphStyle}>
            {ch}
          </span>
        ))}
      </div>
    );
  }

  if (variant === "framed") {
    return (
      <div
        className={cn("flex flex-col items-center gap-2", className)}
        style={{ color, maxWidth }}
      >
        <div className="h-px w-full bg-current opacity-60" />
        <div className="flex items-center" style={{ gap: size * 0.8 }}>
          {items.map((ch, i) => (
            <span key={i} className="inline-block" style={glyphStyle}>
              {ch}
            </span>
          ))}
        </div>
        <div className="h-px w-full bg-current opacity-60" />
      </div>
    );
  }

  // Default: rule variant — thin lines flanking the fleurons
  return (
    <div
      className={cn("flex items-center", className)}
      style={{ color, maxWidth, gap: size * 0.6 }}
    >
      <span className="h-px flex-1 bg-current opacity-50" />
      <div className="flex items-center shrink-0" style={{ gap: size * 0.5 }}>
        {items.map((ch, i) => (
          <span key={i} className="inline-block" style={glyphStyle}>
            {ch}
          </span>
        ))}
      </div>
      <span className="h-px flex-1 bg-current opacity-50" />
    </div>
  );
}
