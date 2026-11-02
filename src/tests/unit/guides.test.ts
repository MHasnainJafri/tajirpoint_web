import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { GUIDES, GUIDES_HUB, GUIDE_SLUGS, guideWordCount, getGuide } from "@/content/guides";
import { GUIDE_CARD_BY_PATH, GUIDE_OG_CARDS } from "@/content/guides/og";
import { TITLE_SUFFIX } from "@/lib/seo/metadata";

// Written by reading only (owner rule: no test runs on the dev Mac).
const root = path.resolve(__dirname, "../../..");
const appDir = path.join(root, "src/app/[locale]/(marketing)");
const LINK = /\[[^\]]+\]\(([^)\s]+)\)/g;

/** Does an internal path (without query or hash) have a page in the app? */
function pageExists(href: string): boolean {
  const clean = href.split(/[?#]/)[0]!;
  if (clean === "/") return true;
  const parts = clean.replace(/^\//, "").split("/");
  if (parts[0] === "guides" && parts.length === 2) return GUIDE_SLUGS.includes(parts[1]!);
  // Dynamic routes ([slug]) are covered by their own data tests.
  const direct = path.join(appDir, ...parts, "page.tsx");
  const dynamic = path.join(appDir, parts[0]!, "[slug]", "page.tsx");
  return fs.existsSync(direct) || (parts.length === 2 && fs.existsSync(dynamic));
}

function allText(g: (typeof GUIDES)[number]): string {
  return JSON.stringify(g);
}

describe("guides", () => {
  it("has unique slugs and six guides", () => {
    expect(new Set(GUIDE_SLUGS).size).toBe(GUIDES.length);
    expect(GUIDES.length).toBe(6);
  });

  it.each(GUIDES.map((g) => [g.slug, g] as const))("%s fits the SEO limits", (_slug, g) => {
    expect(`${g.seoTitle}${TITLE_SUFFIX}`.length).toBeLessThanOrEqual(60);
    expect(g.seoDescription.length).toBeGreaterThanOrEqual(140);
    expect(g.seoDescription.length).toBeLessThanOrEqual(160);
    const words = g.shortAnswer.split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(40);
    expect(words).toBeLessThanOrEqual(75);
    expect(g.faqs.length).toBeGreaterThanOrEqual(5);
  });

  it.each(GUIDES.map((g) => [g.slug, g] as const))("%s is 1,200-2,000 words", (_slug, g) => {
    const n = guideWordCount(g);
    expect(n).toBeGreaterThanOrEqual(1200);
    expect(n).toBeLessThanOrEqual(2000);
  });

  it.each(GUIDES.map((g) => [g.slug, g] as const))(
    "%s links only to pages that exist",
    (_slug, g) => {
      const hrefs = [
        ...[...allText(g).matchAll(LINK)].map((m) => m[1]!),
        ...g.links.map((l) => l.href),
      ].filter((h) => h.startsWith("/"));
      for (const h of hrefs) expect(pageExists(h), h).toBe(true);
      for (const r of g.related) expect(getGuide(r), r).toBeDefined();
    }
  );

  it("FBR guide cites FBR and says the integration is coming soon", () => {
    const fbr = getGuide("fbr-pos-integration")!;
    expect(fbr.checked).toBeTruthy();
    expect(fbr.sources?.length).toBeGreaterThan(0);
    for (const s of fbr.sources ?? [])
      expect(new URL(s.url).hostname).toMatch(/(^|\.)fbr\.gov\.pk$/);
    expect(allText(fbr)).toMatch(/coming soon/i);
  });

  it("every guide and the hub has a share card", () => {
    expect(GUIDE_CARD_BY_PATH[GUIDES_HUB.path]).toBe("guides");
    for (const g of GUIDES) {
      const id = GUIDE_CARD_BY_PATH[`/guides/${g.slug}`]!;
      expect(GUIDE_OG_CARDS[id]).toBeDefined();
      expect(GUIDE_OG_CARDS[id]!.title.length).toBeLessThanOrEqual(60);
    }
  });

  it("makes no banned claims", () => {
    const BANNED =
      /testimonial|trusted by \d|\d+\+ (shops|restaurants|businesses)|ISO 27001|SOC ?2|FBR[- ]certified/i;
    for (const g of GUIDES) expect(allText(g)).not.toMatch(BANNED);
  });
});
