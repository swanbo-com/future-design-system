"use client";

import { useState, type FormEvent } from "react";
import { Glyph, ARROWS, DINGBATS } from "@/components/brand/glyph";

/**
 * WaitlistInlineForm — compact single-row waitlist capture for the teaser
 * landing. Same POST target as the detailed WaitlistCapture section
 * (`/api/waitlist`), same UTM cookie read, same validation — but minimal
 * chrome and no full-section success state.
 *
 * On success, swaps to a single-line confirmation that sits in the same
 * spot so layout doesn't shift.
 */
export function WaitlistInlineForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Not a valid email.");
      return;
    }

    setStatus("submitting");

    // Read the UTM cookie set by proxy.ts (first-touch attribution).
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

  if (status === "success") {
    return (
      <div
        className="flex items-center justify-center gap-3 rounded-full border border-cream/30 bg-ink/60 px-6 py-4 text-cream backdrop-blur-md"
        role="status"
      >
        <Glyph char={DINGBATS.floret} size="sm" fontSize={16} />
        <span
          className="text-[13px] uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}
        >
          You&apos;re on the list
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col items-center gap-3">
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-0">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@goodemail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email address"
          className="h-12 flex-1 rounded-sm border border-cream/25 bg-ink/50 px-4 text-[15px] text-cream placeholder:text-cream/35 backdrop-blur-md transition-colors focus:border-cream/60 focus:outline-none focus:ring-2 focus:ring-vermillion/40 sm:rounded-r-none sm:border-r-0"
          style={{ fontFamily: "var(--font-sans)" }}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-vermillion px-6 text-[14px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-vermillion-dark disabled:opacity-60 sm:rounded-l-none"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {status === "submitting" ? (
            "Joining…"
          ) : (
            <>
              Join the waitlist
              <Glyph char={ARROWS.cta} size="xs" fontSize={14} aria-hidden />
            </>
          )}
        </button>
      </div>
      {error ? (
        <p
          className="text-[12px] text-vermillion-light"
          style={{ fontFamily: "var(--font-sans)" }}
          role="alert"
        >
          {error}
        </p>
      ) : (
        <p
          className="text-[10px] uppercase tracking-[0.14em] text-cream/50"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          No tracking · no cookies · two emails max
        </p>
      )}
    </form>
  );
}
