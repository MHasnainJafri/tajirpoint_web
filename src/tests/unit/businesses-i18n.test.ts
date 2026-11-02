import { describe, expect, it } from "vitest";
import { APPS, BUSINESSES, BUSINESS_SLUGS, SHOP_PLAN_NOTE } from "@/lib/marketing/businesses";
import {
  EN_BUSINESS_UI,
  businessUi,
  localizeApp,
  localizeBusiness,
} from "@/content/i18n/businesses";
import ur from "@/content/i18n/businesses.ur";
import ar from "@/content/i18n/businesses.ar";
import { isTranslated } from "@/lib/seo/metadata";

const TRANSLATIONS = { ur, ar } as const;
// Same list as businesses.test.ts — and no "Dubai" in Arabic script either.
const BANNED = /forever|calendly|ISO 27001|SOC ?2|PECHS|Dubai|دبي|\bPvt\b|14[_ -]day/i;

describe.each(Object.entries(TRANSLATIONS))("business pages in %s", (locale, t) => {
  it("translates every business, feature, FAQ and app in the catalog", () => {
    expect(Object.keys(t.businesses).sort()).toEqual([...BUSINESS_SLUGS].sort());
    for (const b of BUSINESSES) {
      const copy = t.businesses[b.slug];
      expect(Object.keys(copy.features).sort(), b.slug).toEqual(b.features.map((f) => f.id).sort());
      for (const f of b.features) {
        const fc = copy.features[f.id]!;
        expect(fc.bullets.length, `${b.slug}/${f.id}`).toBe(f.bullets.length);
        for (const v of [fc.title, fc.benefit, fc.alt, ...fc.bullets]) expect(v.trim()).not.toBe("");
      }
      expect(copy.faqs.length, b.slug).toBe(b.faqs.length);
      for (const v of [copy.hero.eyebrow, copy.hero.headline, copy.hero.sub, copy.hero.alt, copy.cta.headline, copy.cta.sub]) {
        expect(v.trim()).not.toBe("");
      }
    }
    expect(Object.keys(t.ui.apps).sort()).toEqual(Object.keys(APPS).sort());
    expect(t.ui.commonFaqs.length).toBe(EN_BUSINESS_UI.commonFaqs.length);
    expect(t.ui.migration.points.length).toBe(EN_BUSINESS_UI.migration.points.length);
  });

  it("keeps titles and descriptions inside what Google shows", () => {
    const pages = [
      { title: t.ui.index.metaTitle, description: t.ui.index.metaDescription },
      ...Object.values(t.businesses).map((c) => c.seo),
    ];
    for (const { title, description } of pages) {
      expect(title.length, title).toBeLessThanOrEqual(60);
      expect(description.length, description).toBeGreaterThanOrEqual(120);
      expect(description.length, description).toBeLessThanOrEqual(160);
    }
  });

  it("localises a business without changing its structure", () => {
    for (const b of BUSINESSES) {
      const l = localizeBusiness(b, locale);
      expect(l.slug).toBe(b.slug);
      expect(l.name).toBe(b.localized[locale as "ur" | "ar"].name);
      expect(l.features.map((f) => [f.id, f.icon, f.status, f.media.slot])).toEqual(
        b.features.map((f) => [f.id, f.icon, f.status, f.media.slot])
      );
      for (const [i, f] of b.features.entries()) {
        if (f.plan === SHOP_PLAN_NOTE) expect(l.features[i]?.plan).toBe(t.ui.shopPlanNote);
      }
      expect(l.hero.media.slot).toBe(b.hero.media.slot);
    }
    expect(localizeApp("receiver", locale).plan).toBe(t.ui.shopPlanNote);
    expect(businessUi(locale)).toBe(t.ui);
  });

  it("contains no banned claims", () => {
    expect(JSON.stringify(t)).not.toMatch(BANNED);
  });
});

describe("business page fallbacks and hreflang", () => {
  it("serves English for English and unknown locales", () => {
    const b = BUSINESSES[0]!;
    expect(localizeBusiness(b, "en")).toBe(b);
    expect(localizeBusiness(b, "fr")).toBe(b);
    expect(businessUi("en")).toBe(EN_BUSINESS_UI);
  });

  it("lists every business page as translated", () => {
    expect(isTranslated("/business")).toBe(true);
    for (const slug of BUSINESS_SLUGS) expect(isTranslated(`/business/${slug}`)).toBe(true);
  });
});
