import { legal } from "@/lib/config/site";
import type { Comparison } from "./types";
import { cashRegister, excel, paperKhata } from "./alternatives";
import { cornPos, foodics, loyverse, square } from "./competitors";
import { oscar } from "./oscar";
import { BRAND_NAME } from "@/lib/config/brand";

export { CHECKED, CHECKED_ISO, checkedOn } from "./types";
export type { Cell, Comparison, Faq, Mark, Row, Source } from "./types";

/** Hub order: the ways people run a shop today first, then other POS products. */
export const COMPARISONS: Comparison[] = [
  paperKhata,
  excel,
  cashRegister,
  loyverse,
  square,
  foodics,
  cornPos,
  oscar,
];

export const COMPARE_SLUGS = COMPARISONS.map((c) => c.slug);

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export { COMPARE_LABEL } from "./label";

export const COMPARE_HUB = {
  seo: {
    title: `Compare ${BRAND_NAME} with Other POS Options`,
    description: `Honest comparisons of ${BRAND_NAME} with paper khata, Excel, a cash register, Loyverse, Square, Foodics, CORN POS and Oscar. Sources and dates on every competitor fact.`,
    keywords: [
      "POS comparison",
      "POS alternatives",
      "best POS Pakistan",
      "khata app vs POS",
      "POS software comparison",
    ],
  },
  og: {
    eyebrow: "Compare",
    title: `Compare ${BRAND_NAME}, honestly.`,
    sub: "Paper khata, Excel, a cash register and other POS systems, with sources and dates.",
    pills: ["Paper khata", "Excel", "Loyverse", "Square"],
  },
  faqs: [
    {
      question: "Who wrote these comparisons?",
      answer: `The ${BRAND_NAME} team. We are not neutral, so every fact about another company links to that company's own page and shows the date we read it. Where they are stronger, we say so.`,
    },
    {
      question: "How often are they updated?",
      answer:
        "We plan to re-check each competitor page every three months and when a company announces a big change. Prices change often, so always check the other company's site before you decide.",
    },
    {
      question: "I found a mistake. What do I do?",
      answer: `Email ${legal.email} with the page and the correction. We fix factual errors as soon as we can confirm them.`,
    },
  ],
} as const;
