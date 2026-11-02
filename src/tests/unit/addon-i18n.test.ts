import { describe, expect, it } from "vitest";
import { ADDON_CONTENT } from "@/content/addons";
import { ADDON_SNAPSHOT } from "@/content/addons/snapshot";
import { ADDON_CHROME, ADDON_TRANSLATIONS, TRANSLATED_ADDON_SLUGS } from "@/content/addons/i18n";
import { localizeAddon, localizePrice, planLineFor } from "@/lib/marketing/addon-i18n";
import { applyMarketing, buildCatalogue } from "@/lib/marketing/addons";
import { isTranslated, localeAlternates } from "@/lib/seo/metadata";

const MONEY = /[$£€]\s?\d|\bRs\.?\s?\d|\bPKR\s?\d|\bUSD\s?\d/;
const ARRAY_FIELDS = [
  "overview",
  "whoFor",
  "problems",
  "features",
  "howItWorks",
  "needs",
  "setup",
  "faqs",
] as const;

describe("add-on translations", () => {
  it("cover every English write-up in Urdu and Arabic", () => {
    for (const slug of Object.keys(ADDON_CONTENT)) {
      expect(ADDON_TRANSLATIONS.ur?.[slug], `ur/${slug}`).toBeDefined();
      expect(ADDON_TRANSLATIONS.ar?.[slug], `ar/${slug}`).toBeDefined();
      expect(TRANSLATED_ADDON_SLUGS.has(slug)).toBe(true);
    }
  });

  it("keep the same number of items as the English write-up", () => {
    for (const [locale, bySlug] of Object.entries(ADDON_TRANSLATIONS)) {
      for (const [slug, t] of Object.entries(bySlug)) {
        const en = ADDON_CONTENT[slug];
        expect(en, `${locale}/${slug} has no English write-up`).toBeDefined();
        for (const field of ARRAY_FIELDS) {
          if (t[field] === undefined) continue;
          expect(t[field]?.length, `${locale}/${slug}.${field}`).toBe(en?.[field].length);
        }
        expect(Boolean(t.comingSoonNote)).toBe(Boolean(en?.comingSoonNote));
      }
    }
  });

  it("never print a price and keep titles short", () => {
    for (const bySlug of Object.values(ADDON_TRANSLATIONS)) {
      for (const t of Object.values(bySlug)) {
        expect(JSON.stringify(t)).not.toMatch(MONEY);
        expect((t.seoTitle ?? "").length).toBeLessThanOrEqual(60);
        expect((t.seoDescription ?? "").length).toBeLessThanOrEqual(160);
      }
    }
  });

  it("have the same chrome keys in every locale", () => {
    const keys = (o: object) => Object.keys(o).sort();
    for (const chrome of Object.values(ADDON_CHROME)) {
      expect(keys(chrome)).toEqual(keys(ADDON_CHROME.en!));
      expect(keys(chrome.groups)).toEqual(keys(ADDON_CHROME.en!.groups));
    }
  });
});

describe("localizeAddon", () => {
  const catalogue = buildCatalogue({ results: ADDON_SNAPSHOT });
  const coupons = catalogue.find((a) => a.slug === "coupons")!;

  it("leaves English untouched", () => {
    expect(localizeAddon(coupons, "en")).toBe(coupons);
  });

  it("swaps in the translation but keeps the add-on name", () => {
    const ur = localizeAddon(coupons, "ur");
    expect(ur.name).toBe(coupons.name);
    expect(ur.content.headline).toBe(ADDON_TRANSLATIONS.ur!.coupons!.headline);
    expect(ur.summary).toBe(ADDON_TRANSLATIONS.ur!.coupons!.headline);
    expect(ur.content.slug).toBe("coupons");
  });

  it("keeps a field the admin overrode in English", () => {
    const overridden = {
      ...coupons,
      content: applyMarketing(ADDON_CONTENT.coupons!, { headline: "Admin headline" }),
    };
    const ar = localizeAddon(overridden, "ar");
    expect(ar.content.headline).toBe("Admin headline");
    expect(ar.content.overview).toBe(ADDON_TRANSLATIONS.ar!.coupons!.overview);
  });
});

describe("price and plan words", () => {
  it("translates the price label, keeping the amount", () => {
    const ur = ADDON_CHROME.ur!;
    expect(localizePrice("Free", ur)).toBe(ur.free);
    expect(localizePrice("Ask us", ur)).toBe(ur.askUs);
    expect(localizePrice("$12/month", ur)).toBe(ur.perMonth("$12"));
    expect(localizePrice("$40 one-time", ur)).toBe(ur.oneTime("$40"));
    expect(localizePrice("something else", ur)).toBe("something else");
  });

  it("says which plan an add-on needs", () => {
    expect(planLineFor("coupons", "ar")).toBe(ADDON_CHROME.ar!.planLight);
    expect(planLineFor("hrm", "ar")).toBe(ADDON_CHROME.ar!.planShop);
  });
});

describe("hreflang for add-on pages", () => {
  it("treats translated add-on pages as translated", () => {
    expect(isTranslated("/extensions/coupons")).toBe(true);
    expect(isTranslated("/extensions/not-a-real-addon")).toBe(false);
    expect(isTranslated("/extensions/")).toBe(false);
  });

  it("gives a translated add-on page its own canonical per language", () => {
    const alt = localeAlternates("/extensions/coupons", "ur");
    expect(alt?.canonical).toMatch(/\/ur\/extensions\/coupons$/);
    expect(Object.keys(alt?.languages ?? {}).sort()).toEqual(["ar", "en", "ur", "x-default"]);
  });
});
