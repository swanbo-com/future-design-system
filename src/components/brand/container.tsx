import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Max-width layout wrapper. Every landing page section should sit inside a
 * Container so content lines up to the same grid.
 *
 * Widths: "prose" = 720 px (body text), "default" = 1200 px (most sections),
 * "wide" = 1400 px (hero + mockup showcase), "full" = no max-width.
 */
type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: "prose" | "default" | "wide" | "full";
};

const WIDTHS = {
  prose: "max-w-[720px]",
  default: "max-w-[1200px]",
  wide: "max-w-[1400px]",
  full: "",
};

export function Container({ width = "default", className, children, ...rest }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 md:px-10", WIDTHS[width], className)} {...rest}>
      {children}
    </div>
  );
}
