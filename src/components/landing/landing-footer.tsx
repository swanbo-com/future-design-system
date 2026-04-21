import Link from "next/link";
import { Container } from "@/components/brand/container";
import { Glyph, DINGBATS } from "@/components/brand/glyph";

/**
 * Landing page footer — logo, credit line, legal, contact.
 */
export function LandingFooter() {
  return (
    <footer className="mt-24 border-t border-rule py-16 text-mute">
      <Container width="wide">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left: logo + credit */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-[28px] tracking-[-0.02em] text-foreground no-underline"
              style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
            >
              <Glyph char={DINGBATS.floret} size="sm" fontSize={18} />
              future.ly
            </Link>
            <p className="max-w-[360px] text-[13px] leading-relaxed">
              Documentary-driven storytelling fundraising. One campaign at a time. UK CIC-registered.
              Every pound on the ledger.
            </p>
          </div>

          {/* Centre: nav / legal */}
          <nav className="flex flex-col gap-3 text-[12px] uppercase tracking-[0.14em]" style={{ fontFamily: "var(--font-sans)" }}>
            <Link href="#thesis" className="transition-colors hover:text-foreground">The project</Link>
            <Link href="#campaign-zero" className="transition-colors hover:text-foreground">Pacific Kings</Link>
            <Link href="#mockups" className="transition-colors hover:text-foreground">What we&apos;re building</Link>
            <Link href="#timeline" className="transition-colors hover:text-foreground">Timeline</Link>
            <Link href="#sponsor-tiers" className="transition-colors hover:text-foreground">Become a sponsor</Link>
          </nav>

          {/* Right: contact + legal */}
          <div className="flex flex-col gap-3 text-[12px] uppercase tracking-[0.14em]" style={{ fontFamily: "var(--font-sans)" }}>
            <a href="mailto:hello@future.ly" className="transition-colors hover:text-foreground">hello@future.ly</a>
            <a href="mailto:press@future.ly" className="transition-colors hover:text-foreground">Press inquiries</a>
            <Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">Terms</Link>
            <Link href="/safeguarding" className="transition-colors hover:text-foreground">Safeguarding</Link>
          </div>
        </div>

        {/* Bottom rule + fine print */}
        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 text-[11px] md:flex-row md:items-center md:justify-between">
          <p className="m-0" style={{ fontFamily: "var(--font-mono)" }}>
            future.ly Ltd · UK CIC pending · © 2026
          </p>
          <p className="m-0 uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-sans)" }}>
            Ohno Blazeface · Instrument Sans · JetBrains Mono
          </p>
        </div>
      </Container>
    </footer>
  );
}
