import { describe, expect, it } from "vitest";
import {
  LOCATIONS,
  LOCATIONS_HUB,
  LOCATION_SLUGS,
  getLocation,
  locationPath,
} from "@/content/locations";
import { BUSINESS_SLUGS } from "@/lib/marketing/businesses";
import { ADDON_SNAPSHOT } from "@/content/addons/snapshot";
import { OG_CARDS, ogImageForPath } from "@/lib/seo/og-cards";
import { fullTitle } from "@/lib/seo/metadata";
import { resolveFaqs } from "@/components/marketing/locations/LocationView";

// Things a location page must never say: fake offices, addresses, customer
// counts, reviews, or a tax link we do not have.
const BANNED =
  /our (lahore|karachi|islamabad|faisalabad|peshawar|sialkot|london|dubai) office|street address|trusted by|\d[\d,]* (shops|restaurants|businesses|customers)|rated \d|stars?\b|ZATCA[- ]ready|FBR[- ](certified|approved)|MTD[- ](compatible|recognised)/i;

const snapshotSlugs = new Set(
  (ADDON_SNAPSHOT as ReadonlyArray<{ slug: string }>).map((r) => r.slug)
);

describe("location pages", () => {
  it("lists every slug exactly once", () => {
    expect(LOCATIONS.map((l) => l.slug)).toEqual([...LOCATION_SLUGS]);
    for (const slug of LOCATION_SLUGS) expect(getLocation(slug)?.slug).toBe(slug);
  });

  it("keeps titles within 60 characters and descriptions within 140–160", () => {
    for (const page of [...LOCATIONS, LOCATIONS_HUB]) {
      expect(fullTitle(page.seo.title).length).toBeLessThanOrEqual(60);
      expect(page.seo.description.length).toBeGreaterThanOrEqual(140);
      expect(page.seo.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("links only to real businesses, places and add-ons", () => {
    for (const page of LOCATIONS) {
      for (const b of page.businesses.items) expect(BUSINESS_SLUGS).toContain(b.slug);
      for (const r of page.related) expect(getLocation(r)).toBeDefined();
      // A city sits under its province or the country; a province under the country.
      if (page.parent) {
        const parent = getLocation(page.parent);
        expect(parent).toBeDefined();
        if (page.kind === "province") expect(parent?.kind).toBe("country");
        else expect(["country", "province"]).toContain(parent?.kind);
      }
      for (const c of page.cities?.items ?? []) expect(getLocation(c.slug)?.kind).toBe("city");
      for (const s of page.sources ?? []) expect(s.url).toMatch(/^https:\/\//);
      for (const block of page.blocks)
        for (const slug of block.addons) expect(snapshotSlugs.has(slug)).toBe(true);
      for (const row of page.tax.rows) {
        if (row.addon) expect(snapshotSlugs.has(row.addon)).toBe(true);
        else expect(row.ours).toBeDefined();
      }
    }
  });

  it("has a share card for the hub and every page", () => {
    expect(ogImageForPath("/pos")).toBe("/og/pos.png");
    for (const page of LOCATIONS) {
      expect(ogImageForPath(locationPath(page.slug))).toBe(`/og/pos-${page.slug}.png`);
      expect(OG_CARDS[`pos-${page.slug}`]?.title.length).toBeLessThanOrEqual(60);
    }
  });

  it("never invents offices, counts, reviews or certifications", () => {
    const text = JSON.stringify([LOCATIONS, LOCATIONS_HUB]);
    expect(text).not.toMatch(BANNED);
  });

  it("states add-on status from the catalogue in FAQ answers", () => {
    const pk = getLocation("pakistan")!;
    const answers = resolveFaqs(pk.faqs, (slug) => `<${slug}>`);
    expect(answers.some((f) => f.a.includes("<fbr-integration>"))).toBe(true);
    expect(answers.every((f) => typeof f.a === "string" && f.a.length > 40)).toBe(true);
  });

  it("is not a city-name swap: city pages differ in tax rows, sections and FAQs", () => {
    const cities = LOCATIONS.filter((l) => l.kind === "city");
    const keys = cities.map((c) =>
      JSON.stringify([c.hero, c.sections, c.tax.intro, c.faqs.map((f) => f.q)])
    );
    expect(new Set(keys).size).toBe(cities.length);
  });
});
