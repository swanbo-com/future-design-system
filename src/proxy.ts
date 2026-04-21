import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * UTM capture proxy — per launch-plan.md stranger-ratio strategy.
 *
 * On every page request we peek at the URL for utm_source / utm_medium /
 * utm_campaign / utm_content / utm_term. If any are present AND the visitor
 * doesn't already have a _futurely_utm cookie, we write one (30-day expiry,
 * SameSite=Lax, httpOnly=false so client JS can read it at waitlist submit).
 *
 * "First-touch attribution" — once set, never overwritten. This matches the
 * spec in launch-plan.md §Analytics Step 1.
 *
 * Renamed from `middleware.ts` to `proxy.ts` per the Next.js 16 file
 * convention change — same semantics, new filename + export name.
 */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
const COOKIE_NAME = "_futurely_utm";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function proxy(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  // Collect any UTM params present on this request.
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = searchParams.get(key);
    if (value) utm[key] = value;
  }

  // Only set the cookie if (a) UTMs are present on this visit and
  // (b) the visitor doesn't already have one. First-touch wins.
  const alreadySet = req.cookies.has(COOKIE_NAME);
  if (Object.keys(utm).length === 0 || alreadySet) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.cookies.set(COOKIE_NAME, encodeURIComponent(JSON.stringify(utm)), {
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: false, // client needs to read on waitlist submit
    path: "/",
  });
  return response;
}

export const config = {
  // Run on every page but skip Next.js internals, API routes, and static files.
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
