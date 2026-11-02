/**
 * Share cards for /guides and every guide, merged into OG_CARDS and the
 * path map in src/lib/seo/og-cards.ts. Imports nothing from lib/seo, so
 * og-cards.ts can import this file without a cycle.
 */
import { GUIDES } from "./index";
import type { GuideOgCard } from "./types";

export const GUIDE_OG_CARDS: Record<string, GuideOgCard> = {
  guides: {
    eyebrow: "Guides",
    title: "Plain guides for shop and restaurant owners.",
    sub: "FBR POS integration, digital khata, stock counting, choosing a POS and opening a takeaway.",
    pills: ["FBR", "Khata", "Stock", "Restaurants"],
  },
  ...Object.fromEntries(GUIDES.map((g) => [`guide-${g.slug}`, g.og])),
};

export const GUIDE_CARD_BY_PATH: Record<string, string> = {
  "/guides": "guides",
  ...Object.fromEntries(GUIDES.map((g) => [`/guides/${g.slug}`, `guide-${g.slug}`])),
};
