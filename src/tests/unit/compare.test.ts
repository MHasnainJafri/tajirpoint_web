import { describe, expect, it } from "vitest";
import { COMPARE_HUB, COMPARE_SLUGS, COMPARISONS, getComparison } from "@/content/compare";
import { OG_CARDS, ogImageForPath } from "@/lib/seo/og-cards";

// Written 2 Nov 2026, not run on the dev Mac (owner rule) — runs in the final test pass.

describe("compare pages", () => {
  it("has unique slugs that all start with tajirpoint-vs-", () => {
    expect(new Set(COMPARE_SLUGS).size).toBe(COMPARE_SLUGS.length);
    for (const slug of COMPARE_SLUGS) expect(slug).toMatch(/^tajirpoint-vs-[a-z0-9-]+$/);
  });

  it("keeps titles within 60 characters and descriptions within 140–160", () => {
    for (const seo of [COMPARE_HUB.seo, ...COMPARISONS.map((c) => c.seo)]) {
      expect(seo.title.length).toBeLessThanOrEqual(60);
      expect(seo.description.length).toBeGreaterThanOrEqual(140);
      expect(seo.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("sources every competitor fact and never marks a competitor 'no'", () => {
    for (const c of COMPARISONS.filter((x) => x.kind === "competitor")) {
      expect(c.sources.length).toBeGreaterThan(0);
      for (const s of c.sources) expect(s.url).toMatch(/^https:\/\//);
      for (const row of c.rows) {
        expect(row.other.mark).not.toBe("no");
        expect(row.other.source).toBeDefined();
        expect(row.other.source!).toBeGreaterThanOrEqual(1);
        expect(row.other.source!).toBeLessThanOrEqual(c.sources.length);
      }
    }
  });

  it("lists where the other option is stronger on every page", () => {
    for (const c of COMPARISONS) {
      expect(c.otherStrengths.length).toBeGreaterThan(0);
      expect(c.faqs.length).toBeGreaterThan(0);
    }
  });

  it("links only to comparisons that exist", () => {
    for (const c of COMPARISONS) {
      for (const slug of c.related) {
        expect(slug).not.toBe(c.slug);
        expect(getComparison(slug)).toBeDefined();
      }
    }
  });

  it("has a share card for the hub and every comparison", () => {
    expect(ogImageForPath("/compare")).toBe("/og/compare.png");
    expect(OG_CARDS.compare).toBeDefined();
    for (const c of COMPARISONS) {
      expect(ogImageForPath(`/compare/${c.slug}`)).toBe(`/og/compare-${c.slug}.png`);
      const card = OG_CARDS[`compare-${c.slug}`];
      expect(card).toBeDefined();
      expect(card?.title.length ?? 0).toBeLessThanOrEqual(60);
      expect(card?.pills.length ?? 0).toBeLessThanOrEqual(4);
    }
  });
});
