import type { BusinessSlug } from "@/lib/marketing/businesses";

/**
 * Location pages (/pos and /pos/<place>).
 *
 * These are NOT "swap the city name" doorway pages. Each page carries what is
 * actually different for a shop there: the currency, which tax authority
 * applies and whether TajirPoint connects to it (honestly — most do not yet),
 * the payment methods people use and the live status of our add-ons for them,
 * the kinds of business common there, and a local FAQ.
 *
 * Rules for anyone editing these files:
 *  - Every product claim must be true in the backend today (or already on the
 *    live site). Say "coming soon" or "not connected" when that is the truth.
 *  - No addresses, offices, customers, reviews, counters or prices. We publish
 *    no street address, so there is no LocalBusiness markup on these pages.
 *  - Add-on statuses are NOT written into the copy: list the add-on slug in an
 *    `addons` block and the page shows the backend's live status badge. A
 *    FAQ answer that must name a status is a function of `status(slug)`.
 */

export const LOCATION_SLUGS = [
  "pakistan",
  "lahore",
  "karachi",
  "islamabad-rawalpindi",
  "faisalabad",
  "uk",
] as const;

export type LocationSlug = (typeof LOCATION_SLUGS)[number];

/** Site locales the footer and hub labels are written in. */
export type LabelLocale = "en" | "ur" | "ar";

export interface LocationFact {
  label: string;
  value: string;
}

/** How far TajirPoint goes with one tax authority, when it is not an add-on. */
export type SupportTone = "ready" | "partial" | "no";

export interface TaxRow {
  /** Short name as people say it: "FBR", "PRA", "HMRC". */
  short: string;
  /** Full name: "Federal Board of Revenue". */
  name: string;
  /** What it taxes for a business here, in one line. */
  covers: string;
  /** When set, our status is this add-on's live status from the backend. */
  addon?: string;
  /** Otherwise a fixed, honest status. */
  ours?: { tone: SupportTone; label: string };
  /** What that means for the owner, in one or two sentences. */
  note: string;
}

/** Things that work today, then add-ons shown with their live status. */
export interface AddonBlock {
  id: string;
  heading: string;
  intro: string;
  /** Works today with no add-on. */
  now: string[];
  /** Add-on slugs from the backend catalogue; unknown slugs are skipped. */
  addons: string[];
}

export interface LocationBusiness {
  slug: BusinessSlug;
  /** Why this kind of business here, in one sentence. */
  why: string;
}

export interface LocationSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

/** `status("fbr-integration")` → "coming soon", "available now", … */
export type StatusPhrase = (slug: string) => string;

export interface LocationFaq {
  q: string;
  a: string | ((status: StatusPhrase) => string);
}

export interface LocationPage {
  slug: LocationSlug;
  kind: "country" | "city";
  /** ISO 3166-1 alpha-2. */
  countryCode: "PK" | "GB";
  /** The country page above a city in the breadcrumb trail. */
  parent?: LocationSlug;
  /** Name in English, as used in headings: "Lahore". */
  name: string;
  /** Footer and hub link label per site locale. */
  label: Record<LabelLocale, string>;
  /** One line for the hub card and llms.txt. */
  summary: string;
  seo: { title: string; description: string; keywords: string[] };
  /** Share card (1200×630) — see src/lib/seo/og-cards.ts. */
  og: { eyebrow: string; title: string; sub: string; pills: string[] };
  hero: { eyebrow: string; headline: string; sub: string };
  facts: LocationFact[];
  tax: { heading: string; intro: string; rows: TaxRow[]; note?: string };
  blocks: AddonBlock[];
  businesses: { heading: string; intro?: string; items: LocationBusiness[] };
  sections: LocationSection[];
  faqs: LocationFaq[];
  cta: { headline: string; sub: string };
  related: LocationSlug[];
  /** Date the page content last changed (sitemap <lastmod>). */
  updated: string;
}
