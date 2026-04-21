"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/brand/container";
import { cn } from "@/lib/utils";

/**
 * Top nav — transparent over the hero photo, solidifies on scroll.
 *
 *   [ future.ly (mono) ]                         [ Join the waitlist ]
 *
 * No menu — single-page landing. Sticky so the CTA follows the user down
 * the page. A `scrolled` class snaps in past ~80px of scroll to give the
 * nav a backdrop-blur background when it's no longer over the hero photo.
 */
export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase =
    "inline-block text-[10px] font-medium uppercase tracking-[0.12em] transition-colors sm:text-[11px] md:text-[12px] md:tracking-[0.14em]";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-rule/50 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container width="wide">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className={cn(
              "text-[22px] tracking-[-0.02em] no-underline transition-colors",
              scrolled ? "text-foreground" : "text-cream drop-shadow-md",
            )}
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            future.ly
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#thesis"
              className={cn(
                linkBase,
                scrolled ? "text-mute hover:text-foreground" : "text-cream/80 hover:text-cream",
              )}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Project
            </Link>
            <Link
              href="#sponsor-tiers"
              className={cn(
                linkBase,
                scrolled ? "text-mute hover:text-foreground" : "text-cream/80 hover:text-cream",
              )}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Sponsor
            </Link>
            <Link
              href="#waitlist"
              className={cn(
                buttonVariants({ size: "sm" }),
                "ml-1 h-9 px-3 text-[11px] no-underline sm:ml-2 sm:h-10 sm:px-4 sm:text-[13px]",
              )}
            >
              <span className="hidden sm:inline">Join the waitlist</span>
              <span className="sm:hidden">Waitlist</span>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
