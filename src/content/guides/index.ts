import type { Guide, GuideBlock } from "./types";
import fbrPosIntegration from "./fbr-pos-integration";
import digitalKhata from "./digital-khata";
import chooseRestaurantPos from "./choose-restaurant-pos";
import stockCounting from "./stock-counting";
import restaurantOpeningChecklist from "./restaurant-opening-checklist";
import excelToPos from "./excel-to-pos";

export type { Guide } from "./types";

/** Every guide, in the order the hub lists them. */
export const GUIDES: readonly Guide[] = [
  fbrPosIntegration,
  chooseRestaurantPos,
  restaurantOpeningChecklist,
  digitalKhata,
  stockCounting,
  excelToPos,
];

export const GUIDE_SLUGS: readonly string[] = GUIDES.map((g) => g.slug);

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** The hub's own copy (English; the guides are not translated yet). */
export const GUIDES_HUB = {
  path: "/guides",
  title: "Guides for shop and restaurant owners",
  seoTitle: "Guides for Shop & Restaurant Owners",
  seoDescription:
    "Plain, practical guides for shop and restaurant owners: FBR POS integration, digital khata, stock counting, choosing a restaurant POS and opening a takeaway.",
  intro:
    "Practical, plain-English guides on the things that cost owners time and money: tax rules, credit, stock, opening and switching systems. Free to read, no sign-up.",
  updated: "2026-11-02",
} as const;

/** Strips the inline link/bold markup so text can be counted or used in JSON-LD. */
export function plainText(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}

function blockText(b: GuideBlock): string {
  switch (b.type) {
    case "p":
    case "h3":
      return b.text;
    case "note":
      return `${b.title ?? ""} ${b.text}`;
    case "list":
      return b.items.join(" ");
    case "table":
      return [b.head.join(" "), ...b.rows.map((r) => r.join(" "))].join(" ");
  }
}

/** Words in the guide body, answer box and FAQs. */
export function guideWordCount(g: Guide): number {
  const parts = [
    g.shortAnswer,
    ...g.keyPoints,
    ...g.sections.flatMap((s) => [s.heading, ...s.blocks.map(blockText)]),
    ...g.faqs.flatMap((f) => [f.q, f.a]),
  ];
  return plainText(parts.join(" ")).split(/\s+/).filter(Boolean).length;
}

/** Reading time at ~200 words a minute, rounded up. */
export function readMinutes(g: Guide): number {
  return Math.max(1, Math.ceil(guideWordCount(g) / 200));
}

/** "2 November 2026" from "2026-11-02". */
export function formatGuideDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
