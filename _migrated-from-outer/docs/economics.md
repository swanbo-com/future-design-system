# future.ly — Payment & Economics Model

**Version:** 1.0 — MVP
**Date:** March 2026
**Entity:** future.ly CIC (UK)

---

## The Fee Model

A hybrid model designed to be the fairest in the space: a small fixed fee per exchange that covers platform costs, plus a dedicated Creator Fund that pays the storytellers. No percentage-based fees that scale greedily with donation size. Every penny accounted for publicly.

### Fee Structure

| Component | Amount | Purpose | Recipient |
|-----------|--------|---------|-----------|
| **Platform fee** | £2 flat per exchange | Covers hosting, development, operations, support. Does not scale with exchange size. | future.ly CIC |
| **Creator Fund** | £1 per exchange + voluntary funder contributions | Pays photographers, videographers, content creators. Published transparently. | Creator Fund (ring-fenced) |
| **Payment processing** | ~2.9% + 30p | Unavoidable. Passed through at cost. Shown transparently. | Stripe |
| **Net to project** | Remainder | Everything else goes to the campaign project. | Campaign project (via Wise transfer, with CIC Regulator consent) |

### Why This Is Different

| Platform | Effective Fee |
|----------|--------------|
| Kickstarter | 5% + 3-5% processing = 8-10% |
| GoFundMe | 13.5% default "tip" prompt + processing |
| Patreon | 10-15% |
| **future.ly** | £2 + £1 flat + ~3% processing |

On a £50 exchange, future.ly's total deduction is ~8.5%. On a £200 auction item, it drops to ~4.5%. The bigger the contribution, the more goes to the project.

---

## Unit Economics

### Per Exchange (GBP)

| Exchange Value | Platform Fee | Creator Fund | Processing (~2.9% + 30p) | Net to Project | Effective % to Project |
|---------------|-------------|-------------|--------------------------|---------------|----------------------|
| £5 (min donation) | £2.00 | £1.00 | £0.45 | £1.55 | 31.0% |
| £15 (personal tier) | £2.00 | £1.00 | £0.74 | £11.26 | 75.1% |
| £25 (standard low) | £2.00 | £1.00 | £1.03 | £20.98 | 83.9% |
| £45 (standard print) | £2.00 | £1.00 | £1.61 | £40.40 | 89.8% |
| £50 | £2.00 | £1.00 | £1.75 | £45.25 | 90.5% |
| £100 | £2.00 | £1.00 | £3.20 | £93.80 | 93.8% |
| £200 (auction) | £2.00 | £1.00 | £6.10 | £190.90 | 95.5% |
| £500 (high auction) | £2.00 | £1.00 | £14.80 | £482.20 | 96.4% |

**Note:** The £5 minimum donation has poor unit economics by design — it's the "name on the wall" tier. The exchange model is designed around the £15-200 range where 75-95% reaches the project.

### Campaign Zero Projections

Assuming £5,000 funding target with this exchange mix:

| Tier | Avg. Price | Est. Qty | Revenue | Platform Fee | Creator Fund | Processing | Net to Project |
|------|-----------|----------|---------|-------------|-------------|------------|---------------|
| Premium (auction) | £250 | 4 | £1,000 | £8 | £4 | £33 | £955 |
| Standard (print) | £45 | 40 | £1,800 | £80 | £40 | £64 | £1,616 |
| Personal (card) | £15 | 30 | £450 | £60 | £30 | £22 | £338 |
| Supporter (donation) | £10 | 50 | £500 | £100 | £50 | £18 | £332 |
| **Totals** | | **124** | **£3,750** | **£248** | **£124** | **£137** | **£3,241** |

**Revenue to future.ly CIC:** £248 (platform fees)
**Creator Fund collected:** £124
**Net to Siargao project:** £3,241 (86.4% of total revenue)

To hit the £4,000 project budget, the funding target needs to be ~£4,700-5,000 to account for fee deductions.

---

## Payment Architecture

### Three Payment Types

| Type | Flow | Implementation |
|------|------|---------------|
| **Fixed-price exchange** | Select tier → Stripe Checkout → Lago invoice → Confirmation | Standard Stripe Checkout session. Lago handles invoicing, receipts, fee calculation. |
| **Auction** | Place bid (no charge) → Auction ends → Winner gets Stripe payment link → Lago invoice | Bids stored in DB. No payment at bid time. Winner has 48h to pay. Unpaid → next bidder. |
| **Donation (supporter tier)** | Enter custom amount (min £5) → Stripe Checkout → Lago invoice → Name on wall | Custom amount input. No physical exchange. Digital acknowledgement only. |

### Payment Flow (Fixed-Price)

```
1. Funder selects exchange tier
2. Auth check (magic link / Google if needed)
3. Collect shipping address (if physical exchange)
4. Display fee breakdown at checkout:
   ┌──────────────────────────────────┐
   │  Darkroom Print — "Highway"      │
   │  A2 giclée, numbered, signed     │
   │                                   │
   │  Print:                    £45.00 │
   │  Platform fee:              £2.00 │
   │  Creator Fund:              £1.00 │
   │  Processing:                £1.61 │
   │  ─────────────────────────────── │
   │  Total:                    £49.61 │
   │                                   │
   │  £40.40 goes directly to the     │
   │  Siargao Skate Kids project      │
   └──────────────────────────────────┘
5. Create Lago invoice (line items, fee breakdown)
6. Lago triggers Stripe Checkout session
7. Funder completes payment
8. Stripe webhook → order created → totals updated → fulfillment triggered
```

### Lago Integration

Lago sits between future.ly and Stripe as the billing orchestration layer:

- **Invoicing:** Creates itemised invoices with platform fee, Creator Fund, and processing fee as separate line items
- **Receipts:** Generates receipts for funders (important for tax purposes — exchanges are purchases, not donations)
- **Multi-currency:** Handles currency conversion display; Stripe processes in funder's local currency, settles in GBP
- **Subscription potential:** V2 — recurring support / monthly contributions

### Stripe Configuration

- **Account type:** Standard Stripe account (future.ly CIC)
- **Settlement currency:** GBP
- **Multi-currency:** Enabled. Stripe converts funder's local currency to GBP at Stripe's rate.
- **Webhook events:** `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
- **Refunds:** Handled via Stripe dashboard or API. Full refund if exchange not fulfilled within stated timeframe.

---

## Multi-Currency

### Currency Display

| Aspect | Implementation |
|--------|---------------|
| **Detection** | IP-based via Cloudflare `CF-IPCountry` header. Fallback: browser locale. |
| **Display currencies** | GBP, USD, EUR, AUD, CAD at launch. Expand based on traffic data. |
| **Exchange rates** | Stripe handles actual conversion at checkout. Display prices use daily rates from exchangerate.host API, cached 24h. |
| **Base currency** | GBP (CIC home currency). All internal accounting in GBP. |
| **User override** | Currency selector in header. Preference stored in cookie/localStorage. |

### Geo-Targeted Pricing Display

Prices are displayed in the visitor's local currency but all internal accounting stays in GBP. The display conversion is approximate (cached daily rates); the actual charge uses Stripe's live rate at checkout.

| Region | Display Currency | Approx. Standard Print Price |
|--------|-----------------|------------------------------|
| UK | GBP | £45 |
| US/Canada | USD | $57 |
| Europe | EUR | €53 |
| Australia/NZ | AUD | $87 |
| Philippines | PHP | ₱3,200 |

### Content Geo-Targeting

Different regions see adapted messaging (not different stories, but different framing):

| Region | Adapted Element | Example |
|--------|----------------|---------|
| US/Canada | Hero subtitle, social proof | "147 people across 12 countries are funding this story" + USD |
| UK | CIC credibility | "UK Community Interest Company. Every pound accounted for." + GBP |
| Australia/NZ | Proximity to SE Asia | "Just a few hours from here..." + AUD |
| Philippines | Local pride | "From Siargao to the world. Filipino kids inspiring a global community." + PHP |

Content variants stored as localised fields in Strapi. Next.js middleware reads geo header and passes locale to page components. Minimal overhead — just subtitle and social proof copy.

---

## Creator Economics

### Revenue Share Model

Photographers and videographers shoot for free upfront. When a campaign succeeds, they earn. This is itself a story worth telling — published transparently.

| Role | Share | Payout Schedule |
|------|-------|----------------|
| Lead photographer | 8% of net campaign revenue | Monthly, starting 30 days after campaign closes |
| Videographer | 5% of net campaign revenue | Same |
| Contributing photographer | 3% of net campaign revenue | For update contributors (not the initial shoot) |

### Example Payouts

| Net Revenue | Lead Photographer (8%) | Videographer (5%) |
|-------------|----------------------|-------------------|
| £3,000 | £240 | £150 |
| £5,000 | £400 | £250 |
| £10,000 | £800 | £500 |
| £15,000 | £1,200 | £750 |

### Why This Works

The revenue share turns "free work" into "invested work." Creators aren't volunteers — they're equity holders in the story. They're incentivised to promote the campaign to their own audiences, keep creating content during the 30-day window, and contribute updates even after the campaign closes.

### Creator Fund Mechanics

The £1-per-exchange Creator Fund serves a different purpose from the revenue share:

- **Equipment and travel costs** for photographers going to remote locations
- **Emergency support** if a campaign underperforms (so creators aren't left with nothing)
- **New creator onboarding** — covering costs for photographers on their first campaign before revenue share kicks in

The fund is published transparently. Quarterly report: how much collected, what it was used for.

### Fund Disbursement

All fund transfers to external project bodies require CIC Regulator consent. Process:

1. Campaign closes → net revenue calculated
2. Creator shares calculated → logged in `creator_shares` table
3. Monthly payout cycle begins (30 days post-close)
4. Payouts via Wise (international transfers at real exchange rate)
5. Project disbursement via Wise, with CIC Regulator consent
6. All disbursements recorded with receipts against budget line items

---

## VAT & Tax Treatment

### Exchange Types

| Type | Tax Treatment |
|------|--------------|
| Exchange tiers (physical item received) | Commercial sale. VAT applicable above £90k threshold. |
| Supporter tier (donation, no exchange) | Not a commercial sale. Not subject to VAT. |
| Platform fee (£2) | Service charge. VAT treatment to confirm with accountant. |
| Creator Fund (£1) | Service charge. VAT treatment to confirm with accountant. |

### Key Rules

- HMRC treats exchanges as commercial sales, not donations
- The CIC pays corporation tax on surpluses
- VAT applies at 20% above the £90k threshold (as of 2026)
- **Structure from day one:** Separate donation-only contributions from exchange purchases in the payment system. Don't retrofit.
- Register for VAT when total taxable turnover exceeds £90,000

### Pre-Launch Requirement

Get professional accountant advice before writing any code. Confirm:
1. VAT treatment of exchange tiers vs. donation tier
2. VAT treatment of platform fee and Creator Fund
3. Corporation tax obligations for the CIC
4. Gift Aid eligibility for the donation (supporter) tier
5. International VAT implications (EU/US customers buying physical goods)

---

## Projections (First 12 Months)

### Assumptions

- Campaign Zero (Month 1): £5,000 target, 124 exchanges
- Campaign One (Month 3): £8,000 target, 180 exchanges
- Campaign Two (Month 5): £10,000 target, inbound project
- Growth: 20% increase per campaign in average exchange count

| Campaign | Revenue | Platform Fees | Creator Fund | Processing | Net to Project |
|----------|---------|--------------|-------------|------------|---------------|
| Zero (M1) | £3,750 | £248 | £124 | £137 | £3,241 |
| One (M3) | £6,400 | £360 | £180 | £215 | £5,645 |
| Two (M5) | £8,500 | £432 | £216 | £282 | £7,570 |
| Three (M8) | £10,000 | £518 | £259 | £330 | £8,893 |
| **Year 1 Total** | **£28,650** | **£1,558** | **£779** | **£964** | **£25,349** |

**Platform revenue (Year 1):** ~£1,558 from platform fees
**Creator Fund (Year 1):** ~£779

This does not cover infrastructure costs (~$49-195/month = £500-1,800/year). The platform operates at a loss in Year 1. Sustainability comes from:
1. Scale: more campaigns, more exchanges
2. Brand sponsorships (V2): brands sponsor campaigns
3. Premium tools (V3): analytics and storytelling features for campaign creators

---

## Related Documents

| Document | Relevance |
|----------|-----------|
| `future-ly-architecture.md` | Payment flow, Lago/Stripe integration, webhook handling |
| `future-ly-data-model.md` | Orders table (fee breakdown), creator_shares, creator_payouts |
| `campaign-zero-siargao.md` | Campaign Zero budget and exchange tier pricing |
| `future-ly-project-brief.md` | CIC structure, legal constraints |
| `future-ly-security.md` | Payment security, PCI compliance |

---

*Economics model designed for transparency and fairness. Flat fees mean the bigger the contribution, the more goes to the project. Year 1 operates at a loss — the platform proves the thesis before pursuing sustainability.*
