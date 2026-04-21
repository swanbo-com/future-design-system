"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/brand/container";
import { SectionHeading } from "@/components/brand/section-heading";
import { Glyph, DINGBATS } from "@/components/brand/glyph";

/**
 * Waitlist capture — the big bottom-of-page email capture block.
 *
 * Uses controlled React state for now — no backend validation, no API call.
 * Swap for react-hook-form + zod + Resend/Strapi POST when the backend wires up.
 */
export function WaitlistCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("That doesn't look like an email. Try again.");
      return;
    }

    setStatus("submitting");

    // Read the UTM cookie set by middleware (if present) so we can attribute
    // the signup source. Cookie is JSON-encoded `_futurely_utm` (30d).
    const utmCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("_futurely_utm="));
    let utm: Record<string, string | undefined> = {};
    if (utmCookie) {
      try {
        utm = JSON.parse(decodeURIComponent(utmCookie.split("=")[1] ?? ""));
      } catch {
        // ignore malformed cookie
      }
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, utm }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Try again in a minute.",
      );
    }
  }

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden border-t border-rule bg-ink py-28 text-[#FAFAF9] md:py-36"
    >
      <Container width="default">
        <div className="mx-auto max-w-[720px] text-center">
          <div className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F28C83]">
            <Glyph char={DINGBATS.floret} size="xs" fontSize={12} />
            <span>30 April 2026</span>
            <Glyph char={DINGBATS.floret} size="xs" fontSize={12} />
          </div>

          <SectionHeading
            title="Be here when it goes live"
            titleSize="xl"
            align="center"
            sub="One email when the trailer drops. Another the day we launch. Nothing else — no tracking, no cookies, no newsletter drip."
          />

          {status === "success" ? (
            <div
              className="mx-auto mt-12 max-w-[480px] rounded-sm border border-[#F28C83]/40 bg-[#1A1A1A] p-8 text-center"
            >
              <Glyph char={DINGBATS.floret} size="md" fontSize={32} color="var(--brand-vermillion)" />
              <h3
                className="mt-4 text-[24px] leading-tight"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                You&apos;re on the list.
              </h3>
              <p
                className="mt-3 text-[13px] uppercase tracking-[0.12em] text-[#9a9388]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {email}
              </p>
              <p className="mx-auto mt-4 max-w-[360px] text-[14px] leading-relaxed text-[#9a9388]">
                We&apos;ll email when the trailer ships (mid April) and again on launch day
                (30 April).
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-12 flex w-full max-w-[520px] flex-col gap-4"
              noValidate
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@goodemail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-[#9a9388]/30 bg-[#1A1A1A] text-[16px] text-[#FAFAF9] placeholder:text-[#6e685f] focus-visible:ring-vermillion"
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="h-12 whitespace-nowrap"
                >
                  {status === "submitting" ? "Joining…" : "Join the waitlist"}
                </Button>
              </div>
              {error ? (
                <p
                  className="text-left text-[12px] text-[#F28C83]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {error}
                </p>
              ) : null}
              <p
                className="text-[11px] uppercase tracking-[0.12em] text-[#6e685f]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                No tracking · no cookies · one email when we launch
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
