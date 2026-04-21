import { cn } from "@/lib/utils";

/**
 * Grain — SVG noise overlay for the cinematic film-grain look.
 * Drop anywhere with `absolute inset-0` parent to get a subtle grain
 * texture over the content behind it. Inline SVG, no network request.
 *
 * `opacity` controls intensity — 0.08 is good for cream sections, 0.15
 * for dark sections where the grain reads more strongly.
 */
type GrainProps = {
  opacity?: number;
  className?: string;
};

export function Grain({ opacity = 0.08, className }: GrainProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 mix-blend-multiply", className)}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
      }}
    />
  );
}
