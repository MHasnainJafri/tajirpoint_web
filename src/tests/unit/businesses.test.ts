import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  APPS,
  BUSINESSES,
  BUSINESS_SLUGS,
  COMMON_FAQS,
  LEGACY_SOLUTION_REDIRECTS,
  allMediaSlots,
  businessLabel,
  demoCampaign,
  facebookAdLink,
  getBusiness,
  isBusinessSlug,
} from "@/lib/marketing/businesses";
// Plain .mjs helper shared with scripts/media.mjs.
import { IMAGE_EXT, VIDEO_EXT, renderBusinessReadme } from "../../../scripts/media-lib.mjs";
import manifest from "@/lib/media/manifest.json";

const root = path.resolve(__dirname, "../../..");
const CONTACT_LABELS = [
  "General retail / Kiryana",
  "Restaurant / Food",
  "Electronics / Mobile",
  "Services / Salon",
  "Distributor / Wholesale",
  "Other",
];
const BANNED = /forever|calendly|ISO 27001|SOC ?2|PECHS|Dubai|\bPvt\b|14[_ -]day/i;

describe("business catalog", () => {
  it("has one entry per slug, in slug order, with unique slugs", () => {
    expect(BUSINESSES.map((b) => b.slug)).toEqual([...BUSINESS_SLUGS]);
    expect(new Set(BUSINESS_SLUGS).size).toBe(BUSINESS_SLUGS.length);
    for (const slug of BUSINESS_SLUGS) {
      expect(getBusiness(slug)?.slug).toBe(slug);
      expect(isBusinessSlug(slug)).toBe(true);
    }
    expect(getBusiness("nope")).toBeUndefined();
  });

  it.each(BUSINESSES.map((b) => [b.slug, b] as const))("%s has every required field", (_slug, b) => {
    expect(b.slug).toMatch(/^[a-z]+(-[a-z]+)*$/);
    for (const v of [b.name, b.navLine, b.icon, b.seo.title, b.seo.description, b.schemaSubCategory, b.hero.eyebrow, b.hero.headline, b.hero.sub, b.cta.headline, b.cta.sub]) {
      expect(v.trim().length).toBeGreaterThan(0);
    }
    expect(b.seo.title.length).toBeLessThanOrEqual(70);
    expect(b.seo.description.length).toBeLessThanOrEqual(320);
    expect(b.seo.keywords.length).toBeGreaterThan(0);
    expect(CONTACT_LABELS).toContain(b.contactLabel);
    for (const loc of ["ur", "ar"] as const) {
      expect(b.localized[loc].name.trim()).not.toBe("");
      expect(b.localized[loc].navLine.trim()).not.toBe("");
      expect(businessLabel(b, loc).name).toBe(b.localized[loc].name);
    }
    expect(businessLabel(b, "en").name).toBe(b.name);
    expect(b.apps.length).toBeGreaterThan(0);
    for (const app of b.apps) expect(APPS[app]).toBeDefined();
    expect(b.features.length).toBeGreaterThanOrEqual(3);
    expect(new Set(b.features.map((f) => f.id)).size).toBe(b.features.length);
    for (const f of b.features) {
      expect(f.id).toMatch(/^[a-z]+(-[a-z]+)*$/);
      expect(f.title.trim()).not.toBe("");
      expect(f.benefit.trim()).not.toBe("");
      expect(f.bullets.length).toBeGreaterThan(0);
    }
    expect(b.faqs.length).toBeGreaterThan(0);
  });

  it("never repeats a media slot within a business and every slot is described", () => {
    for (const b of BUSINESSES) {
      const slots = [b.hero.media, ...b.features.map((f) => f.media)].map((m) => m.slot);
      expect(new Set(slots).size, b.slug).toBe(slots.length);
    }
    for (const { media } of allMediaSlots()) {
      expect(media.slot).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(media.alt.trim().length).toBeGreaterThan(10);
      expect(["video", "image", "phone"]).toContain(media.expect);
    }
  });

  it("media manifest only lists files that exist and belong to a known slot", () => {
    const known = new Set(
      allMediaSlots().map(({ business, media }) => `business/${business}/${media.slot}`)
    );
    for (const file of manifest.files as string[]) {
      expect(fs.existsSync(path.join(root, "public/media", file)), file).toBe(true);
      const ext = path.extname(file).toLowerCase();
      expect([...IMAGE_EXT, ...VIDEO_EXT]).toContain(ext);
      const stem = file.slice(0, -ext.length).replace(/-poster$/, "");
      if (stem.startsWith("business/")) expect(known.has(stem), file).toBe(true);
    }
  });

  it("each business media README matches the catalog (run `pnpm media:docs`)", () => {
    for (const b of BUSINESSES) {
      const file = path.join(root, "public/media/business", b.slug, "README.md");
      expect(fs.readFileSync(file, "utf8"), b.slug).toBe(renderBusinessReadme(b));
    }
  });

  it("maps every old /solutions page to a real business", () => {
    for (const to of Object.values(LEGACY_SOLUTION_REDIRECTS)) expect(isBusinessSlug(to)).toBe(true);
    expect(Object.keys(LEGACY_SOLUTION_REDIRECTS).sort()).toEqual(
      ["distributors", "electronics", "general-retail", "restaurants", "services"].sort()
    );
  });

  it("builds Facebook ad links with the agreed tags", () => {
    expect(demoCampaign("pharmacy")).toBe("demo_pharmacy");
    const url = new URL(facebookAdLink("https://tajirpoint.com", "cafes-bakeries"));
    expect(url.pathname).toBe("/book-demo");
    expect(url.searchParams.get("type")).toBe("cafes-bakeries");
    expect(url.searchParams.get("utm_source")).toBe("facebook");
    expect(url.searchParams.get("utm_medium")).toBe("paid_social");
    expect(url.searchParams.get("utm_campaign")).toBe("demo_cafes-bakeries");
  });

  it("contains no banned claims", () => {
    const text = JSON.stringify({ BUSINESSES, APPS, COMMON_FAQS });
    expect(text).not.toMatch(BANNED);
  });
});
