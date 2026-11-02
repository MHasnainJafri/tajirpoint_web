/**
 * Comparison and alternatives pages (/compare, /compare/<slug>).
 *
 * Rules for every file in this folder (owner, 2 Nov 2026):
 * - TajirPoint claims must be true in the backend today or already on the
 *   live site; anything not released says "coming soon" / "not yet".
 * - A fact about another company is only written here with a `source` (its own
 *   public page) and the date we read it (`CHECKED`). No guesses: when we could
 *   not read something, the row is left out rather than marked "No".
 * - Fair tone. Every competitor page lists where they are stronger.
 * - Legal / fairness review by the owner before release.
 */

/** The day the competitor pages were read. Change it only after re-checking every source. */
export const CHECKED = "1 Nov 2026";
/** The same date for <time dateTime> and the sitemap. */
export const CHECKED_ISO = "2026-11-01";

/**
 * yes      — offered (green tick)
 * partial  — offered with a limit, on a higher plan, or through an add-on
 * soon     — TajirPoint only: built or being built, not released yet
 * no       — not offered (used for TajirPoint, paper, Excel and tills only;
 *            never for a competitor — see the folder rule above)
 * info     — a plain fact with no tick or cross (prices, devices)
 */
export type Mark = "yes" | "partial" | "soon" | "no" | "info";

export interface Cell {
  mark: Mark;
  text: string;
  /** 1-based index into the page's `sources` (competitor cells). */
  source?: number;
  /** Internal page that backs a TajirPoint claim. */
  href?: string;
}

export interface Row {
  feature: string;
  tajirpoint: Cell;
  other: Cell;
}

export interface Source {
  label: string;
  url: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Comparison {
  slug: string;
  /** "alternative" = paper, Excel, a till. "competitor" = another company's product. */
  kind: "alternative" | "competitor";
  /** The other side, as written in the table header: "Paper khata", "Loyverse". */
  otherName: string;
  /** Hub card and related-links label. */
  label: string;
  /** One line under the label on the hub. */
  blurb: string;
  /** Who the page is mostly for (shown on the hub card). */
  audience: string;
  seo: { title: string; description: string; keywords: string[] };
  og: { eyebrow: string; title: string; sub: string; pills: string[] };
  hero: { eyebrow: string; h1: string; sub: string };
  /** The short, honest answer near the top. */
  verdict: { tajirpoint: string; other: string };
  /** Where TajirPoint helps (TajirPoint facts only). */
  tajirpointStrengths: string[];
  /** Where the other option is stronger or a better fit. */
  otherStrengths: string[];
  rows: Row[];
  /** Longer plain-English sections for owners who want the detail. */
  sections: Array<{ heading: string; paragraphs: string[] }>;
  faqs: Faq[];
  /** Competitor pages: the public pages every competitor fact comes from. */
  sources: Source[];
  /** Other comparison slugs to link at the bottom. */
  related: string[];
}
