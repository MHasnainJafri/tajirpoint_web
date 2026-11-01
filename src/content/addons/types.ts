/**
 * The site's own long-form write-up for one add-on (owner, 1 Nov 2026: "for
 * each extension write an in-depth detail page").
 *
 * The backend owns the facts that change — name, icon, status, price, the
 * short description and the feature list (`GET /api/v1/public/extensions/`).
 * This file owns the explanation around them. Rules for every entry:
 *
 * - Accurate: written from what the backend code actually does. Never promise
 *   a feature that does not exist; for a Coming soon add-on say what it will
 *   do and that it is coming.
 * - No prices or plan prices in the copy. The price comes from the API and
 *   the page prints it next to the copy, so an admin edit never contradicts
 *   the text.
 * - Plain, short, friendly English for shop and restaurant owners in
 *   Pakistan, the UK and the Gulf. No jargon (no "webhook", "HMAC", "OAuth",
 *   "idempotent", "JWT", "Celery", "ETag").
 * - The brand is written "TajirPoint" in copy (as on the rest of the site).
 *
 * The admin can override any of these fields per add-on with the API's
 * `marketing` object; see `lib/marketing/addons.ts`.
 */

export interface AddonFaq {
  q: string;
  a: string;
}

export interface AddonFeatureCopy {
  title: string;
  body: string;
}

export interface AddonStep {
  title: string;
  body: string;
}

export interface AddonProblem {
  /** The pain, in the owner's words: "Riders forget to hand over cash." */
  problem: string;
  /** How the add-on fixes it, one or two sentences. */
  fix: string;
}

export interface AddonContent {
  slug: string;
  /** <title> without the brand (the layout template adds it). Max ~60 chars. */
  seoTitle: string;
  /** Meta description, 120-160 characters. */
  seoDescription: string;
  /** Search phrases people actually type, 3-8. */
  keywords: string[];
  /** schema.org applicationSubCategory, e.g. "Restaurant POS add-on". */
  schemaSubCategory: string;
  /** One sentence under the name in the hero. */
  headline: string;
  /** "What it is": 2-3 short paragraphs. */
  overview: string[];
  /** "Who it's for": 3-6 short bullets. */
  whoFor: string[];
  /** "Problems it solves": 3-5 pairs. */
  problems: AddonProblem[];
  /** "Key features": 4-8, each a title and one or two sentences. */
  features: AddonFeatureCopy[];
  /** "How it works": 3-6 steps, in order. */
  howItWorks: AddonStep[];
  /** "What you need": accounts, hardware, documents. 2-6 bullets. */
  needs: string[];
  /** "Pricing & setup": who sets it up, outside fees, what is included. No amounts. */
  setup: string[];
  /** 5-8 questions a shop owner would really ask. */
  faqs: AddonFaq[];
  /** Coming soon add-ons only: one honest line on where it stands. */
  comingSoonNote?: string;
}
