/**
 * The business pages in the visitor's language.
 *
 * English comes from the catalog (`lib/marketing/businesses.ts`); Urdu and
 * Arabic overlay it word for word (`businesses.ur.ts`, `businesses.ar.ts`).
 * Anything a translation leaves out falls back to English, so a new feature
 * added to the catalog never breaks a page — it only shows in English until
 * it is translated.
 */
import {
  APPS,
  COMMON_FAQS,
  MIGRATION,
  OFFER_LINE,
  SHOP_PLAN_NOTE,
  type AppId,
  type Business,
} from "@/lib/marketing/businesses";
import type { BusinessUiCopy, BusinessesTranslation } from "./businesses.types";
import ur from "./businesses.ur";
import ar from "./businesses.ar";

const TRANSLATIONS: Record<string, BusinessesTranslation> = { ur, ar };

export const EN_BUSINESS_UI: BusinessUiCopy = {
  home: "Home",
  businesses: "Businesses",
  breadcrumbLabel: "Breadcrumb",
  bookDemo: "Book a free demo",
  startFree: "Start free — 3 months",
  offerLine: OFFER_LINE,
  shopPlanNote: SHOP_PLAN_NOTE,
  comingSoon: "Coming soon",
  whatYouGet: "What you get",
  onThisPage: "On this page",
  appsTitle: "The apps your team will use",
  faqTitle: (name) => `Questions from ${name.toLowerCase()}`,
  illustration: (title) => `${title} — feature illustration`,
  index: {
    metaTitle: "POS System for Every Kind of Business",
    metaDescription:
      "TajirPoint POS for restaurants, cafés, cloud kitchens, clothing, grocery and kiryana stores, pharmacies, mobile shops, salons, distributors and factories.",
    badge: "Find your business",
    headline: "One POS system, shaped around your counter.",
    sub: "Pick your kind of business to see the screens, apps and reports you would use — then book a free demo or start free.",
    notSure: "Not sure which fits?",
    itemListName: "TajirPoint by business type",
  },
  planTeaser: {
    eyebrow: "Pricing",
    headline: "Start free. Upgrade when you grow.",
    fallbackTitle: "Light — free for 3 months",
    fallbackBody: "One shop, two staff logins, 30 products and 100 orders a day. No card needed.",
    compare: "Compare all plans",
  },
  migration: {
    eyebrow: MIGRATION.eyebrow,
    headline: MIGRATION.headline,
    sub: MIGRATION.sub,
    points: [...MIGRATION.points],
    cta: MIGRATION.cta,
  },
  commonFaqs: COMMON_FAQS,
  apps: Object.fromEntries(
    Object.entries(APPS).map(([id, a]) => [id, { name: a.name, line: a.line }])
  ) as Record<AppId, { name: string; line: string }>,
};

/** The page chrome (buttons, headings, shared bands) in `locale`, else English. */
export function businessUi(locale: string): BusinessUiCopy {
  return TRANSLATIONS[locale]?.ui ?? EN_BUSINESS_UI;
}

/**
 * The catalog entry with its words in `locale`. Structure (ids, icons, media
 * slots, apps, statuses) always comes from the English catalog; only the text
 * is swapped. A feature the translation does not cover stays English.
 */
export function localizeBusiness(b: Business, locale: string): Business {
  const t = TRANSLATIONS[locale];
  const copy = t?.businesses[b.slug];
  if (!t || !copy) return b;
  const plan = (note?: string) => (note === SHOP_PLAN_NOTE ? t.ui.shopPlanNote : note);
  const label = locale === "ur" || locale === "ar" ? b.localized[locale] : undefined;

  return {
    ...b,
    name: label?.name ?? b.name,
    navLine: label?.navLine ?? b.navLine,
    // Meta keywords are ignored by search engines; English ones on an Urdu
    // page would only add noise.
    seo: { title: copy.seo.title, description: copy.seo.description, keywords: [] },
    schemaSubCategory: copy.schemaSubCategory,
    hero: {
      eyebrow: copy.hero.eyebrow,
      headline: copy.hero.headline,
      sub: copy.hero.sub,
      media: { ...b.hero.media, alt: copy.hero.alt },
    },
    features: b.features.map((f) => {
      const fc = copy.features[f.id];
      if (!fc) return f;
      return {
        ...f,
        title: fc.title,
        benefit: fc.benefit,
        bullets: fc.bullets,
        media: { ...f.media, alt: fc.alt },
        plan: plan(f.plan),
      };
    }),
    faqs: copy.faqs,
    cta: copy.cta,
  };
}

/** One app's name and line in `locale`, plus its (localised) plan note. */
export function localizeApp(id: AppId, locale: string) {
  const app = APPS[id];
  const ui = businessUi(locale);
  const words = ui.apps[id] ?? { name: app.name, line: app.line };
  return {
    ...app,
    ...words,
    plan: app.plan === SHOP_PLAN_NOTE ? ui.shopPlanNote : app.plan,
  };
}
