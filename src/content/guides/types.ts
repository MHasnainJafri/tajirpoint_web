/**
 * Long-form guides for shop and restaurant owners (/guides).
 *
 * Rules for every guide:
 * - Genuinely useful on its own, even to someone who never buys TajirPoint.
 * - Every TajirPoint claim must be true in the backend code or already on the
 *   live site. Anything not released says "coming soon".
 * - Laws, deadlines and penalties only with an official source in `sources`,
 *   and the date we checked it in `checked`.
 * - Plain, short, friendly English. No prices (they come from the plans API).
 *
 * Inline text supports two bits of markup, rendered by GuideText:
 *   [label](/internal-path)  or  [label](https://external)  → a link
 *   **bold**                                                → <strong>
 */

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "note"; tone: "info" | "warn"; title?: string; text: string };

export interface GuideSection {
  /** Anchor id, kebab-case. */
  id: string;
  /** The h2. Question-style where it matches what people search. */
  heading: string;
  blocks: GuideBlock[];
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideSource {
  label: string;
  url: string;
  /** Who publishes it, e.g. "FBR". */
  publisher: string;
}

export interface GuideLink {
  label: string;
  href: string;
  note: string;
}

export interface GuideOgCard {
  eyebrow: string;
  title: string;
  sub: string;
  pills: string[];
}

export interface Guide {
  slug: string;
  /** Hub card label, e.g. "Tax & compliance". */
  category: string;
  /** The h1. */
  title: string;
  /** <title> without the brand. With " | TajirPoint" it should stay <= 60. */
  seoTitle: string;
  /** Meta description, 140-160 characters. */
  seoDescription: string;
  keywords: string[];
  /** One or two sentences for the hub card and the intro under the h1. */
  summary: string;
  /** The answer box at the top: 40-70 words, self-contained (AI Overviews). */
  shortAnswer: string;
  /** "In this guide you will learn" style key points, 3-5. */
  keyPoints: string[];
  sections: GuideSection[];
  faqs: GuideFaq[];
  /** Official sources. Required for any law, deadline or penalty. */
  sources?: GuideSource[];
  /** The date the sources were checked, as shown on the page. */
  checked?: string;
  /** Internal links: features, add-ons, pricing, get-a-call. */
  links: GuideLink[];
  /** Slugs of related guides. */
  related: string[];
  datePublished: string;
  dateModified: string;
  og: GuideOgCard;
}
