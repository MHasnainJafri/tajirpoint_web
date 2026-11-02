/**
 * Shape of a translation of the business pages (/business and
 * /business/<slug>). The English catalog in `lib/marketing/businesses.ts`
 * stays the source of truth for structure (which features, apps, media slots
 * and plan notes a page has); a translation only replaces the words.
 *
 * Rules for translators:
 *  - Translate what the English says — never add a claim it does not make.
 *  - Keep plan names (Light, Shop, Business), the brand (TajirPoint) and the
 *    trade words people actually use (POS, KDS, IMEI, FEFO) in Latin script.
 *  - `seo.title` must fit 60 characters with " | TajirPoint" where possible
 *    (it is dropped automatically when it does not fit); `seo.description`
 *    should be 120–160 characters.
 */
import type { AppId, BusinessSlug, Faq } from "@/lib/marketing/businesses";

export interface BusinessFeatureCopy {
  title: string;
  benefit: string;
  bullets: string[];
  /** Alt text for the feature's photo or video. */
  alt: string;
}

export interface BusinessCopy {
  seo: { title: string; description: string };
  /** schema.org applicationSubCategory in this language. */
  schemaSubCategory: string;
  hero: { eyebrow: string; headline: string; sub: string; alt: string };
  /** Keyed by the English feature `id`; a missing id falls back to English. */
  features: Record<string, BusinessFeatureCopy>;
  faqs: Faq[];
  cta: { headline: string; sub: string };
}

/** The words around the catalog: buttons, headings, shared bands. */
export interface BusinessUiCopy {
  home: string;
  businesses: string;
  breadcrumbLabel: string;
  bookDemo: string;
  startFree: string;
  offerLine: string;
  shopPlanNote: string;
  comingSoon: string;
  whatYouGet: string;
  onThisPage: string;
  appsTitle: string;
  /** FAQ heading for one business, given its (localised) name. */
  faqTitle: (name: string) => string;
  /** Screen-reader label of the placeholder artwork shown until a photo exists. */
  illustration: (title: string) => string;
  index: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    headline: string;
    sub: string;
    notSure: string;
    itemListName: string;
  };
  planTeaser: {
    eyebrow: string;
    headline: string;
    fallbackTitle: string;
    fallbackBody: string;
    compare: string;
  };
  migration: {
    eyebrow: string;
    headline: string;
    sub: string;
    points: string[];
    cta: string;
  };
  commonFaqs: Faq[];
  apps: Record<AppId, { name: string; line: string }>;
}

export interface BusinessesTranslation {
  ui: BusinessUiCopy;
  businesses: Record<BusinessSlug, BusinessCopy>;
}
