import type { OgCard } from "@/lib/seo/og-cards";
import { TOOLS } from "./tools";

/** Share cards for /tools and each tool — spread into OG_CARDS in og-cards.ts. */
const PILLS: Record<string, string[]> = {
  "profit-margin-calculator": ["Margin %", "Markup %", "Target price"],
  "vat-calculator": ["Add tax", "Remove tax", "PK · UK · UAE · KSA"],
  "invoice-generator": ["Print", "Save as PDF", "Nothing stored"],
  "break-even-calculator": ["Sales per month", "Sales per day", "Fixed costs"],
  "food-cost-calculator": ["Per dish", "Per month", "Target price"],
};

export const TOOL_OG_CARDS: Record<string, OgCard> = {
  tools: {
    eyebrow: "Free tools",
    title: "Free calculators for shops and restaurants.",
    sub: "Margin, VAT, break-even, food cost and a simple invoice maker. No sign-up, nothing stored.",
    pills: ["Margin", "VAT", "Break-even", "Invoice"],
  },
  ...Object.fromEntries(
    TOOLS.map((t) => [
      `tool-${t.slug}`,
      {
        eyebrow: "Free tool",
        title: t.heading,
        sub: t.summary,
        pills: PILLS[t.slug] ?? [],
      } satisfies OgCard,
    ])
  ),
};

/** Which card each tools path uses — spread into CARD_BY_PATH. */
export const TOOL_CARD_BY_PATH: Record<string, string> = {
  "/tools": "tools",
  ...Object.fromEntries(TOOLS.map((t) => [`/tools/${t.slug}`, `tool-${t.slug}`])),
};
