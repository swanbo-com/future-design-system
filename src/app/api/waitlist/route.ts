import { NextResponse } from "next/server";

/**
 * POST /api/waitlist
 *
 * Pre-launch waitlist capture. No database yet — instead we fire two
 * transactional emails via Resend:
 *   1. Confirmation to the user ("you're on the list")
 *   2. Notification to WAITLIST_NOTIFY_TO (John's inbox as the pre-launch DB)
 *
 * When John creates a proper Resend audience (dashboard), upgrade this to
 * also POST to /audiences/{id}/contacts so we get deduplication, opt-out
 * handling, and a real list we can blast on launch day.
 */

type Body = { email?: string; utm?: Record<string, string | undefined> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM_ADDRESS = "future.ly <onboarding@resend.dev>"; // Resend's default sender — works without verifying a custom domain. Swap to hello@future.ly once DNS is verified.

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend ${res.status}: ${text}`);
  }
  return res.json() as Promise<{ id: string }>;
}

function confirmationHtml(email: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:40px 20px;font-family:Helvetica,Arial,sans-serif;background:#F5F1EA;color:#111111;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;margin:0 auto;">
      <tr><td style="padding:0 0 32px 0;">
        <p style="font-family:Menlo,Monaco,monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#6B645A;margin:0;">
          future.ly · pacific kings
        </p>
      </td></tr>
      <tr><td style="padding:0 0 24px 0;">
        <h1 style="font-size:32px;line-height:1.15;margin:0;color:#111111;">
          You're on the list.
        </h1>
      </td></tr>
      <tr><td style="padding:0 0 24px 0;">
        <p style="font-size:16px;line-height:1.6;margin:0;color:#111111;">
          We'll email you twice. Once when the trailer drops (mid-April) and once on launch day, 30 April 2026.
        </p>
        <p style="font-size:16px;line-height:1.6;margin:16px 0 0 0;color:#111111;">
          Nothing else. No tracking, no cookies, no newsletter drip.
        </p>
      </td></tr>
      <tr><td style="padding:24px 0 0 0;border-top:1px solid #CFC4AF;">
        <p style="font-family:Menlo,Monaco,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6B645A;margin:0;">
          ${email}
        </p>
      </td></tr>
    </table>
  </body>
</html>`;
}

function notificationHtml(email: string, utm: Record<string, string | undefined>) {
  const utmRows = Object.entries(utm)
    .filter(([, v]) => Boolean(v))
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6B645A;font-size:12px;">${k}</td><td style="font-size:12px;font-family:Menlo,monospace;">${v}</td></tr>`,
    )
    .join("");
  return `<!doctype html>
<html>
  <body style="font-family:Helvetica,Arial,sans-serif;color:#111111;padding:24px;">
    <p style="margin:0 0 12px;font-size:14px;">New waitlist signup:</p>
    <p style="margin:0 0 20px;font-size:18px;font-family:Menlo,monospace;font-weight:700;">${email}</p>
    ${utmRows ? `<table cellspacing="0" cellpadding="0">${utmRows}</table>` : "<p style=\"color:#6B645A;font-size:12px;\">No UTM captured.</p>"}
  </body>
</html>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.WAITLIST_NOTIFY_TO;

  if (!apiKey || !notifyTo) {
    return NextResponse.json(
      { ok: false, error: "Waitlist not configured" },
      { status: 500 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const utm = body.utm ?? {};

  try {
    await sendEmail(apiKey, {
      from: FROM_ADDRESS,
      to: [email],
      subject: "You're on the future.ly waitlist",
      html: confirmationHtml(email),
    });

    await sendEmail(apiKey, {
      from: FROM_ADDRESS,
      to: [notifyTo],
      reply_to: email,
      subject: `Waitlist signup: ${email}`,
      html: notificationHtml(email, utm),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Send failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
