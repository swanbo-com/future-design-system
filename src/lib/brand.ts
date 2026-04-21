/**
 * Brand constants — handles, contact addresses, and other strings
 * that should not be hardcoded in component JSX.
 *
 * Authoritative source: docs/brand/parent-shell.md (parent shell surfaces)
 * and docs/campaigns/pacific-kings/brand.md (campaign-specific).
 */

export const PARENT = {
  wordmark: "future.ly",
  legal: "future.ly CIC",
  copyright: "future.ly · UK CIC pending",
} as const;

export const SOCIAL = {
  instagram: {
    handle: "@the.future.projects",
    url: "https://www.instagram.com/the.future.projects/",
  },
} as const;

export const CONTACT = {
  hello: "hello@future.ly",
  sponsor: "sponsor@future.ly",
  safeguarding: "safeguarding@future.ly",
  privacy: "privacy@future.ly",
} as const;

export const CAMPAIGN_ZERO = {
  slug: "pacific-kings",
  publicName: "Pacific Kings",
  internalName: "Campaign Zero",
  location: "Siargao · Philippines",
} as const;
