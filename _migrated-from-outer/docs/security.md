# future.ly — Security, Monitoring & Safeguarding

**Version:** 2.0 — MVP
**Date:** March 2026
**Entity:** future.ly CIC (UK)
**Status:** Launch Blocker (Safeguarding)

---

## Safeguarding Policy (Launch Blocker)

No campaign featuring children goes live without all safeguarding requirements completed. This is non-negotiable.

### Before Any Content Goes Public

1. **Written parental consent.** Bilingual consent forms (English + local language) walked through with each family in person. Covers: use of images/video on the platform, use in social media promotion, right to withdraw consent at any time. Forms signed, scanned, stored securely.

2. **Safeguarding policy document.** Published on the site at `/safeguarding`. Covers: how we work with children, who's responsible, how to report concerns, data handling for minors. Based on UK Safeguarding framework.

3. **Content review process.** All images/video featuring children are reviewed before publication. Two-person review: creator produces, admin reviews. No content that could be considered exploitative, sexualising, or endangering. No full names of children published without explicit parental consent. Location specificity limited to barangay level, not home addresses.

4. **Background checks.** All adults working directly with children undergo checks:
   - UK: DBS (Disclosure and Barring Service)
   - Philippines: NBI clearance (National Bureau of Investigation)
   - Indonesia: SKCK (Police clearance certificate)

5. **Named safeguarding officer.** Janiece is the designated safeguarding officer. Contact details published on the safeguarding page. Responsible for: reviewing consent forms, approving content featuring minors, handling concerns, maintaining safeguarding records.

6. **Incident response plan.** Documented process for handling safeguarding concerns. Includes: immediate content removal, investigation procedure, notification obligations, reporting to relevant authorities.

### Philippines-Specific Compliance

- SEC registration check for foreign entity working with children
- DSWD (Department of Social Welfare and Development) clearance for child welfare activities
- Compliance with RA 7610 (Special Protection of Children Against Abuse, Exploitation and Discrimination Act)
- Compliance with RA 9775 (Anti-Child Pornography Act) for all published content
- Special Protections for Working Children (RA 9231) — ensure no child labour issues in exchange fulfillment (e.g. handwritten cards as educational activity, not work)

### UK Online Safety Act Compliance

- Platform risk assessment completed and documented
- Age-appropriate content guidelines published
- Content moderation process documented
- Reporting mechanism for concerns (on the safeguarding page)
- Designated contact for online safety concerns

### Content Rules for Minors

| Rule | Detail |
|------|--------|
| Names | First name only. No surnames. |
| Age | Can be stated (e.g. "Kael, 11") if consent covers it. |
| Location | Barangay level only. No home addresses, no school names. |
| Images | Fully clothed. In context of activity (skating, building). No staged "sad" poses. |
| Video | Subtitled for non-English speakers. No content where children appear distressed. |
| Consent withdrawal | If a parent withdraws consent, all content featuring that child is removed within 24 hours. |

---

## Payment Security

### PCI Compliance

future.ly never stores or processes card data directly. All payment data flows through Stripe (PCI Level 1 certified). This means:

- No card numbers touch our servers
- Stripe Checkout handles the payment form (hosted by Stripe)
- Stripe Elements used if inline forms are needed (iframe, not our DOM)
- PCI SAQ A compliance (simplest level — we redirect to Stripe)

### Stripe Webhook Security

- Webhook signatures verified using `stripe.webhooks.constructEvent()` with the webhook secret
- All webhook handlers are idempotent (replay-safe via `webhook_events.event_id` unique constraint)
- All webhooks logged to `webhook_events` table before processing
- Failed webhooks retried 3x with exponential backoff (1min, 5min, 30min)
- Webhook secret stored as environment variable, never in code

### Lago Webhook Security

- Webhook signatures verified via Lago's signature header
- Same logging and retry pattern as Stripe webhooks
- All Lago API calls logged with response time and status

### Payment Data Storage

| Data | Where Stored | Security |
|------|-------------|----------|
| Stripe Payment Intent ID | PostgreSQL `orders` table | Reference only. No card data. |
| Lago Invoice ID | PostgreSQL `orders` table | Reference only. |
| Order amounts and fees | PostgreSQL `orders` table | Cents (integer). No floating point. |
| Shipping addresses | PostgreSQL `orders` table (JSONB) | Encrypted at rest (disk-level encryption on VPS). |
| Funder email | Clerk (primary) + PostgreSQL `profiles` | For auth and communications only. |

### Refund Handling

- Full refund if exchange is not fulfilled within stated timeframe
- Partial refund option if project is paused or cancelled (funder chooses: refund or reallocation to another campaign)
- Auction items: no refund after payment (standard auction terms, disclosed before bidding)
- All refunds processed through Stripe (original payment method)
- Refunded orders: status updated to 'refunded', campaign totals decremented
- **Critical rule:** Refunds that drop funding below a milestone do NOT re-lock content. Content unlocks are permanent (write-once).

---

## Error Monitoring & Observability

### Sentry (Error Tracking)

- **SDK:** Next.js Sentry SDK with automatic error capture on server and client
- **Custom context:** Every error includes `campaign_id`, `order_id`, `clerk_user_id` where available
- **Alert rules:**
  - Any error in `/api/webhooks/*` → immediate Discord notification
  - Any error in checkout flow → immediate Discord notification
  - Error rate spike (>5 errors/minute) → Discord notification
  - Unhandled exception on any page → logged with full stack trace
- **Performance monitoring:** Track slow API routes, especially webhook handlers and Lago API calls
- **Free tier:** 5,000 errors/month (sufficient for MVP)

### Webhook Monitoring (Custom)

All incoming webhooks are logged to the `webhook_events` table:

| Field | Purpose |
|-------|---------|
| `source` | 'stripe' or 'lago' |
| `event_type` | e.g. 'checkout.session.completed' |
| `event_id` | External event ID (idempotency key) |
| `payload` | Full webhook payload (JSONB) |
| `status` | received → processed / failed / retried |
| `error_message` | Error details if processing failed |
| `attempts` | Number of processing attempts |
| `next_retry_at` | Exponential backoff: 1min, 5min, 30min |

**Retry logic:**
1. Webhook received → status = 'received'
2. Processing succeeds → status = 'processed'
3. Processing fails → status = 'failed', `error_message` set, `next_retry_at` calculated
4. Retry worker (node-cron, every 60s) picks up failed webhooks where `next_retry_at <= NOW()` and `attempts < max_attempts`
5. After 3 retries (4 total attempts): stays as 'failed', requires manual intervention

**Admin dashboard (`/admin/webhooks`):**
- Count of failed webhooks in last 24h (red badge in nav if > 0)
- Table: source, event_type, status, error_message, attempts, created_at
- Drill-down: full payload view
- Manual retry button per webhook
- Daily digest to Discord: success rate, any unresolved failures

### Uptime Monitoring (UptimeRobot / Better Stack)

- HTTP GET on campaign homepage every 60s
- HTTP GET on `/api/health` endpoint every 60s (checks DB connection, Stripe reachable, Lago reachable)
- Alert to Discord on any downtime (after 2 consecutive failures)
- Optional: public status page for transparency

### Lago Health Monitoring

- Every Lago API call: log response time and HTTP status to application logs
- If Lago returns 5xx: alert to Discord, log error to Sentry
- If Lago is unreachable for > 5 minutes: alert to Discord
- Fallback: if Lago is down during checkout, hold the order and retry invoice creation when Lago recovers (do not block the Stripe payment)

### Print Fulfillment Monitoring

- Every Prodigi/Gelato API call: log response and status
- Fulfillment failure handling:
  1. API error → order stays in 'paid' status (not 'fulfilled')
  2. Sentry alert with order ID and error details
  3. Automatic retry: 3 attempts with exponential backoff (5min, 30min, 2hr)
  4. After 3 failed retries: admin notified via Discord, manual intervention required
  5. Funder sees "Processing your order" status (not an error) during retry window
  6. Admin dashboard shows "Fulfillment pending" orders with retry status

---

## Data Protection (GDPR)

### Data We Collect

| Data | Purpose | Legal Basis | Retention |
|------|---------|-------------|-----------|
| Email address | Auth (via Clerk), communications, receipts | Contract (exchange transaction) | Until account deletion or 6 years after last transaction (tax records) |
| Full name | Order fulfillment, community wall | Contract | Until account deletion |
| Shipping address | Exchange fulfillment | Contract | Until fulfillment complete + 6 months, then deleted |
| IP address (geo) | Currency detection | Legitimate interest | Not stored — processed ephemerally via Cloudflare headers |
| UTM parameters | Acquisition source tracking | Legitimate interest | Stored per order, anonymised after 12 months |
| Payment method | Transaction processing | Contract | Not stored by us — held by Stripe |
| Funder messages | Community wall | Consent (provided at checkout) | Until campaign archive or user request |
| Waitlist email | Future campaign notifications | Consent | Until unsubscribe |
| City (from profile) | Activity feed display | Consent (user provides voluntarily) | Until profile deletion |

### Data Handling for Minors

Special GDPR considerations for children featured in campaigns:

- No personal data of children collected by the platform (they're not users)
- Consent for their image/likeness handled via parental consent forms (separate from GDPR — covered by safeguarding policy)
- Children's data in Strapi Person Profiles: first name, age, one-line bio only. Minimal data principle.
- Consent status tracked: `consent_status` field (pending/granted/withdrawn)
- Withdrawal: if consent withdrawn, profile and all associated media removed within 24 hours

### User Rights

| Right | Implementation |
|-------|---------------|
| Access | User can view all their data via `/me` dashboard |
| Rectification | User can update profile information via Clerk + `/me` |
| Erasure | User can request account deletion. Clerk account deleted. PostgreSQL profile anonymised. Order records retained (anonymised) for financial reporting. Community wall entry changed to "Anonymous." |
| Portability | Data export available on request (JSON format via admin) |
| Objection to processing | Unsubscribe from all communications. Account remains active for order history. |

### Data Processing

- **Clerk:** SOC 2 Type II compliant. Data encrypted at rest. EU data processing available.
- **Stripe:** PCI Level 1 compliant. Data processed in EU.
- **Strapi:** Hosted on DigitalOcean VPS. Media stored in Cloudinary.
- **Resend:** Email processing. Privacy policy compliant.
- **Mux:** Video processing. US-based but GDPR compliant (DPA available).
- **Pusher:** Realtime messages. EU cluster available. Messages are transient (not stored).
- **Plausible:** Self-hosted on our VPS. No data leaves our infrastructure. No cookies.
- **Sentry:** Error data may contain user IDs. EU data centre available. PII scrubbing enabled.

### Cookie Policy

Minimal cookies:
- Clerk session token (essential, functional)
- Currency preference (functional)
- UTM capture cookie (functional — stores first-touch UTM for order attribution, expires after 30 days)
- No advertising cookies
- No third-party tracking cookies
- **No cookie consent banner required** — Plausible is cookieless, Clerk session is essential, UTM is functional. All cookies are strictly necessary or functional under GDPR.

---

## Authentication & Access Control

### Clerk Auth

- **Methods:** Email link (low friction) + Google OAuth
- **Session management:** Clerk middleware in Next.js. httpOnly session cookies.
- **Session expiry:** Configurable via Clerk dashboard (default 7 days)
- **Rate limiting:** Clerk handles rate limiting on auth endpoints
- **No passwords stored:** Email link eliminates password attack surface
- **Roles:** Admin role managed in Clerk dashboard. Checked in middleware and API routes.

### API Security

- Clerk middleware protects authenticated routes
- Admin routes check `sessionClaims.role === 'admin'`
- Stripe webhooks verified via signature (`stripe.webhooks.constructEvent()`)
- Lago webhooks verified via signature header
- Rate limiting on bid creation (prevent auction sniping bots) — implemented in API route with simple in-memory counter (per user, max 1 bid per 5 seconds)
- CORS configured for production domain only

### Environment Variables

- All secrets stored as environment variables (never in code, never in git)
- Docker containers receive env vars via `.env` file (excluded from git)
- GitHub Actions secrets for CI/CD deployment
- `NEXT_PUBLIC_` prefix only for truly public values (Clerk publishable key, Pusher key, Plausible domain)
- Validated at startup via `@t3-oss/env-nextjs` (from boilerplate)

### Hosting Security

- DigitalOcean VPS: SSH key auth only, firewall configured, regular OS updates
- Traefik: automatic SSL via Let's Encrypt, HTTPS redirect
- Docker: containers run as non-root user, minimal base images
- PostgreSQL: not exposed to public internet (container network only)
- Regular dependency audits (`npm audit`)

---

## Content Moderation

### Pre-Publication Review

All content is created by the team (Bren, Rick, John) for MVP. No user-generated content except funder messages on the community wall.

| Content Type | Review Process |
|-------------|---------------|
| Campaign stories | Created in Strapi by admin. Published by admin. |
| Story updates | Created by editor/photographer. Reviewed by admin before publish. |
| Content featuring minors | **Two-person review.** Creator produces, admin + safeguarding officer review. |
| Community wall messages | Submitted at checkout. Displayed immediately. Admin moderation dashboard for removal if needed. |

### Community Wall Moderation

- MVP: Manual review (low volume). Admin dashboard flags new entries for review.
- Automated filter for obvious abuse (profanity list, spam URLs) planned for V2.
- Right to remove entries violating platform terms.
- Users can report concerning wall messages (reporting link on wall page).

### Content Removal

| Trigger | Action | Timeline |
|---------|--------|----------|
| Safeguarding concern | Immediate content removal. Investigation. Report to authorities if required. | Within 1 hour |
| Consent withdrawal (minor) | Remove all content featuring that individual. | Within 24 hours |
| Inappropriate wall message | Remove message. Notify user if intentional violation. | Within 24 hours |
| Copyright claim | Review claim. Remove content if valid. | Within 72 hours |

---

## Financial Controls (CIC-Specific)

### Fund Handling

- All campaign funds received by future.ly CIC bank account (Wise Business)
- CIC asset lock ensures funds stay tied to social mission
- **All transfers to external project bodies require CIC Regulator consent.** This is built into the disbursement workflow.
- Disbursements made against budget line items with receipts
- `budget_items.spent_cents` updated as funds are disbursed

### Transparency

- Public budget on every campaign page: line items with planned amounts and actual spend
- Fee breakdown shown at checkout (platform fee, Creator Fund, processing)
- Creator Fund quarterly report: how much collected, who was paid, what for
- CIC annual accounts filed publicly (Companies House)

### Banking

- **Primary:** Wise Business Account (multi-currency: GBP, USD, PHP, IDR)
- Real exchange rates for international transfers (no markup)
- Payment links for manual invoice handling
- **Backup:** Do not depend on a single banking partner

---

## Incident Response

### Security Incident

1. **Identify:** What was compromised? User data? Payment data? Content?
2. **Contain:** Disable affected service. Rotate compromised credentials immediately.
3. **Notify:** Inform affected users within 72 hours (GDPR requirement). Inform ICO if personal data breach.
4. **Remediate:** Fix vulnerability. Patch and redeploy.
5. **Review:** Post-incident review. Update security measures.

### Safeguarding Incident

1. **Immediate:** Remove any concerning content from the platform.
2. **Report:** Safeguarding officer (Janiece) notified immediately.
3. **Assess:** Determine severity and appropriate authority to contact (local police, NSPCC, Philippines DSWD).
4. **Document:** Record incident details, actions taken, outcomes.
5. **Support:** Ensure wellbeing of affected individuals.

### Payment Incident

1. **Identify:** Failed charges? Incorrect amounts? Duplicate charges?
2. **Contain:** Pause checkout flow if systematic issue.
3. **Rectify:** Process refunds for incorrect charges immediately.
4. **Notify:** Email affected users with explanation and resolution.
5. **Prevent:** Root cause analysis. Add regression test.

### Webhook Failure Incident

1. **Detect:** Sentry alert or admin dashboard shows failed webhooks.
2. **Assess:** Is this a transient error (timeout) or systematic (bad code, schema change)?
3. **Retry:** Use admin dashboard retry button for transient failures.
4. **Fix:** For systematic failures, hotfix and redeploy. Then replay missed webhooks.
5. **Verify:** Check that all affected orders/payments are in correct state.

---

## Pre-Launch Security Checklist

### Safeguarding
- [ ] Safeguarding policy drafted and reviewed by Janiece
- [ ] Bilingual consent forms prepared
- [ ] Named safeguarding officer confirmed (Janiece)
- [ ] DBS/NBI clearance initiated for all adults working with children
- [ ] Philippines compliance requirements identified (DSWD, SEC)

### Auth & Access
- [ ] Clerk configured with email link + Google OAuth
- [ ] Admin role configured in Clerk dashboard
- [ ] Admin routes protected by role check
- [ ] Rate limiting on bid creation endpoint

### Payments
- [ ] Stripe webhook signature verification implemented
- [ ] Lago webhook signature verification implemented
- [ ] Webhook idempotency via `event_id` unique constraint
- [ ] Webhook retry logic tested
- [ ] Fee calculation unit tests passing

### Infrastructure
- [ ] Environment variables secured (not in code/git, validated by t3-env)
- [ ] CORS configured for production domain
- [ ] PostgreSQL not exposed to public internet
- [ ] SSH key auth only on VPS
- [ ] Traefik SSL configured
- [ ] Docker containers running as non-root

### Monitoring
- [ ] Sentry configured with Discord alerts for payment-path errors
- [ ] Webhook monitoring dashboard (`/admin/webhooks`) functional
- [ ] UptimeRobot/Better Stack configured with 60s checks
- [ ] `/api/health` endpoint returns DB + Stripe + Lago status
- [ ] Plausible self-hosted and receiving events

### Legal
- [ ] Privacy policy page created
- [ ] Terms of service created (exchanges are purchases, not donations)
- [ ] Refund policy documented
- [ ] Cookie policy page created (note: no consent banner needed)

### Code Quality
- [ ] `npm audit` passing with no critical vulnerabilities
- [ ] Dependency versions pinned in package-lock.json
- [ ] No secrets in git history

---

## Related Documents

| Document | Relevance |
|----------|-----------|
| `future-ly-data-model.md` | Database schema, access control rules, webhook_events table |
| `future-ly-economics.md` | Payment flow, fee handling, CIC fund disbursement |
| `future-ly-architecture.md` | Full stack, Sentry/Plausible/Pusher integration |
| `future-ly-testing.md` | Security-related test cases |
| `future-ly-project-brief.md` | CIC legal structure, compliance constraints |
| `campaign-zero-siargao.md` | Philippines-specific compliance, consent requirements |

---

*Security, monitoring, and safeguarding are launch blockers. No content featuring children without completed consent. No payments without Stripe PCI compliance. No data handling without GDPR compliance. Full observability from day one: Sentry for errors, webhook logging for payment reliability, Plausible for analytics, UptimeRobot for availability.*
