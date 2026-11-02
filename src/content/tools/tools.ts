/**
 * The free tools at /tools — copy, SEO fields and FAQs, in one place.
 *
 * Every tool runs entirely in the visitor's browser: nothing typed is sent
 * to a server or stored. The "In TajirPoint" line under each tool only names
 * things the product really does (checked against tajirpos_backend on
 * 2 Nov 2026: recipe costing with cost per portion and food-cost % in
 * domains/restaurants/services/recipe_service.py; margin analysis net of
 * returns in domains/reporting/services/cogs_reports.py; tax at checkout and
 * printed invoices/receipts as described on /features/e-invoicing).
 *
 * English only for now: the /ur and /ar copies canonicalise to English
 * (see TRANSLATED_PATHS in src/lib/seo/metadata.ts).
 */

export type ToolSlug =
  | "profit-margin-calculator"
  | "vat-calculator"
  | "invoice-generator"
  | "break-even-calculator"
  | "food-cost-calculator";

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolInfo {
  slug: ToolSlug;
  /** Short name for cards, breadcrumbs and the footer. */
  name: string;
  /** One line for the hub card and llms.txt. */
  summary: string;
  /** The <h1>. */
  heading: string;
  /** Sentence under the h1. */
  intro: string;
  seo: { title: string; description: string; keywords: string[] };
  /** Lucide icon name, resolved in the hub page. */
  icon: "percent" | "receipt" | "file-text" | "scale" | "chef-hat";
  /** How to use it — short steps (rendered as a list, not HowTo markup). */
  steps: string[];
  /** The formula(s) in plain words. */
  formula: string[];
  faqs: ToolFaq[];
  /** Soft CTA: what TajirPoint does for this job (true in the product today). */
  inProduct: string;
  /** Who it's most useful for — links to business pages. */
  forBusinesses: Array<{ label: string; href: string }>;
}

export const TOOLS: ToolInfo[] = [
  {
    slug: "profit-margin-calculator",
    name: "Profit margin calculator",
    summary:
      "Work out profit, margin % and markup % from cost and price — or the price for a target margin.",
    heading: "Profit margin & markup calculator",
    intro:
      "Type what an item costs you and what you sell it for. See your profit, margin and markup at once — or find the price that gives the margin you want.",
    seo: {
      title: "Profit Margin & Markup Calculator (Free)",
      description:
        "Free profit margin calculator for shops and restaurants. Enter cost and selling price to get profit, margin % and markup %, or the price for a target margin.",
      keywords: [
        "profit margin calculator",
        "markup calculator",
        "margin vs markup",
        "selling price calculator",
      ],
    },
    icon: "percent",
    steps: [
      "Enter the cost of one item (what you paid, including delivery if you want it counted).",
      "Enter the selling price — or switch to “Find my price” and enter the margin or markup you want.",
      "Read profit, margin % and markup % straight away. Nothing is saved or sent.",
    ],
    formula: [
      "Profit = selling price − cost",
      "Margin % = profit ÷ selling price × 100",
      "Markup % = profit ÷ cost × 100",
      "Price for a target margin = cost ÷ (1 − margin ÷ 100)",
    ],
    faqs: [
      {
        question: "What is the difference between margin and markup?",
        answer:
          "Both use the same profit. Margin compares it with the selling price; markup compares it with the cost. An item that costs 100 and sells for 150 has a 50% markup but a 33.3% margin.",
      },
      {
        question: "Should the price include sales tax or VAT?",
        answer:
          "No. Use the price before tax. The tax is collected for the government, so it is not your profit. Our sales tax / VAT calculator can take tax out of a price for you.",
      },
      {
        question: "Why can't I get a 100% margin?",
        answer:
          "A 100% margin would mean the item cost you nothing. Any margin under 100% works; markup has no upper limit.",
      },
      {
        question: "Is my data saved?",
        answer:
          "No. The calculator runs in your browser. What you type is not sent to us or stored anywhere.",
      },
    ],
    inProduct:
      "TajirPoint records the cost of each item you buy and shows the margin you actually made on what you sold — after returns.",
    forBusinesses: [
      { label: "Retail & fashion", href: "/business/retail-fashion" },
      { label: "Grocery & kiryana", href: "/business/grocery-kiryana" },
      { label: "Electronics & mobile", href: "/business/electronics-mobile" },
    ],
  },
  {
    slug: "vat-calculator",
    name: "Sales tax / VAT calculator",
    summary: "Add sales tax or VAT to a price, or take it out of a price that already includes it.",
    heading: "Sales tax & VAT calculator",
    intro:
      "Add tax to a price, or take the tax out of a price that already includes it. Type any rate, or pick a standard rate for Pakistan, the UK, the UAE or Saudi Arabia.",
    seo: {
      title: "Sales Tax & VAT Calculator: Add or Remove Tax",
      description:
        "Free sales tax and VAT calculator. Add tax to a price or remove it from a tax-inclusive price, with standard rates for Pakistan, the UK, UAE and Saudi Arabia.",
      keywords: [
        "VAT calculator",
        "sales tax calculator",
        "remove VAT from price",
        "GST calculator Pakistan",
        "UAE VAT calculator",
        "Saudi VAT calculator",
      ],
    },
    icon: "receipt",
    steps: [
      "Enter the amount.",
      "Type the tax rate, or tap a country's standard rate (each shows where we checked it).",
      "Choose whether the amount is before tax (add tax) or already includes tax (remove tax).",
    ],
    formula: [
      "Add tax: tax = amount × rate ÷ 100; total = amount + tax",
      "Remove tax: amount before tax = total ÷ (1 + rate ÷ 100); tax = total − amount before tax",
    ],
    faqs: [
      {
        question: "How do I take VAT out of a price that already includes it?",
        answer:
          "Divide the price by 1 plus the rate. At 20%, a price of 120 is 120 ÷ 1.20 = 100 before VAT, so the VAT is 20. Do not take 20% of 120 — that gives 24, which is wrong.",
      },
      {
        question: "Are the country rates always right for my items?",
        answer:
          "They are the standard rates, read from each tax authority on the date shown. Many items have a reduced, zero or exempt rate, and some services are taxed by a province or emirate at a different rate. Check with your tax adviser for your items.",
      },
      {
        question: "Does this work for GST?",
        answer:
          "Yes. GST, VAT and sales tax are calculated the same way here — type your rate and choose add or remove.",
      },
      {
        question: "Is my data saved?",
        answer: "No. The calculator runs in your browser and nothing you type is sent or stored.",
      },
    ],
    inProduct:
      "TajirPoint adds tax at checkout — on prices with or without tax — and shows it on every receipt and in your sales reports.",
    forBusinesses: [
      { label: "Restaurants", href: "/business/restaurants" },
      { label: "Retail & fashion", href: "/business/retail-fashion" },
      { label: "Distributors & wholesale", href: "/business/distributors-wholesale" },
    ],
  },
  {
    slug: "invoice-generator",
    name: "Invoice generator",
    summary: "Fill in a simple invoice, then print it or save it as a PDF. Nothing is stored.",
    heading: "Free invoice generator",
    intro:
      "Fill in your details and your items, then print the invoice or save it as a PDF from your browser. Nothing is saved on our side — close the page and it's gone.",
    seo: {
      title: "Free Invoice Generator: Print or Save as PDF",
      description:
        "Make a simple invoice in your browser: add your business, customer, items, discount and tax, then print or save it as a PDF. Free, no sign-up, nothing stored.",
      keywords: ["invoice generator", "free invoice maker", "invoice template PDF", "bill maker"],
    },
    icon: "file-text",
    steps: [
      "Fill in your business name and your customer's details.",
      "Add each item with its quantity and price. Add a discount and tax rate if you need them.",
      "Press “Print / Save as PDF”. In the print window choose your printer, or “Save as PDF”.",
    ],
    formula: [
      "Line amount = quantity × price",
      "Subtotal = sum of line amounts",
      "Tax = (subtotal − discount) × tax rate ÷ 100",
      "Total = subtotal − discount + tax",
    ],
    faqs: [
      {
        question: "How do I save the invoice as a PDF?",
        answer:
          "Press “Print / Save as PDF”. In the print window, change the printer to “Save as PDF” (on a phone: Share → Print, then save). The page prints only the invoice.",
      },
      {
        question: "Is this a tax invoice for FBR, HMRC, the FTA or ZATCA?",
        answer:
          "No. It is a simple invoice. Registered businesses may need extra details — for example a tax registration number, or an e-invoice sent to the tax authority. Check what your tax authority requires.",
      },
      {
        question: "Do you keep a copy of my invoice?",
        answer:
          "No. Everything stays in your browser. If you close or reload the page, the invoice is cleared, so save the PDF first.",
      },
      {
        question: "Can I add my logo?",
        answer:
          "Not in this free tool. In TajirPoint your receipts and invoices carry your shop's name and details automatically.",
      },
    ],
    inProduct:
      "In TajirPoint every sale already has its receipt or invoice, with your shop's details, ready to print or share — no retyping.",
    forBusinesses: [
      { label: "Distributors & wholesale", href: "/business/distributors-wholesale" },
      { label: "Salons & services", href: "/business/salons-services" },
      { label: "Furniture & home", href: "/business/furniture-home" },
    ],
  },
  {
    slug: "break-even-calculator",
    name: "Break-even calculator",
    summary: "How many sales a month cover your rent, salaries and other fixed costs.",
    heading: "Break-even calculator",
    intro:
      "Find out how many sales you need each month before you start making a profit. Enter your fixed costs, your average sale and what each sale costs you.",
    seo: {
      title: "Break-Even Calculator for Shops and Restaurants",
      description:
        "Free break-even calculator: enter monthly fixed costs, average sale price and cost per sale to see how many sales a month, and per day, you need to cover costs.",
      keywords: [
        "break even calculator",
        "break even point",
        "restaurant break even",
        "how many sales to break even",
      ],
    },
    icon: "scale",
    steps: [
      "Add up your fixed costs for one month: rent, salaries, bills, loan payments.",
      "Enter your average sale (or the price of one item) and what that sale costs you — stock, packaging, card fees.",
      "Optionally enter the days you open each month to see sales needed per day.",
    ],
    formula: [
      "Contribution per sale = average sale − cost per sale",
      "Break-even sales = fixed costs ÷ contribution per sale (rounded up)",
      "Break-even revenue = break-even sales × average sale",
    ],
    faqs: [
      {
        question: "What counts as a fixed cost?",
        answer:
          "Costs you pay whether you sell or not: rent, salaries, electricity standing charges, internet, software, loan payments. Costs that grow with each sale — stock, packaging, delivery, card fees — go in “cost per sale”.",
      },
      {
        question: "Why does it say break-even is not possible?",
        answer:
          "If each sale costs you as much as you charge (or more), every extra sale adds to the loss. Raise the price or lower the cost per sale first.",
      },
      {
        question: "Should I use prices with or without tax?",
        answer: "Without tax. The tax you collect is passed on to the government.",
      },
      {
        question: "Is my data saved?",
        answer: "No. The calculator runs in your browser and nothing you type is sent or stored.",
      },
    ],
    inProduct:
      "TajirPoint shows sales, cost of goods and margin for any dates you pick, so you can see how close each month is to break-even.",
    forBusinesses: [
      { label: "Restaurants", href: "/business/restaurants" },
      { label: "Cafés & bakeries", href: "/business/cafes-bakeries" },
      { label: "Cloud kitchens", href: "/business/cloud-kitchens" },
    ],
  },
  {
    slug: "food-cost-calculator",
    name: "Food cost calculator",
    summary:
      "Food cost % for a dish or a whole month, and the menu price for your target food cost.",
    heading: "Restaurant food cost calculator",
    intro:
      "Work out the food cost % of one dish, or of your whole kitchen for a month — and the menu price that hits your target food cost.",
    seo: {
      title: "Restaurant Food Cost % Calculator (Free)",
      description:
        "Free restaurant food cost calculator. Get the food cost % of a dish or a month of stock and sales, and the menu price that hits your target food cost %.",
      keywords: [
        "food cost calculator",
        "food cost percentage",
        "restaurant menu price calculator",
        "plate cost",
      ],
    },
    icon: "chef-hat",
    steps: [
      "For one dish: enter what the ingredients for one plate cost, and the menu price before tax.",
      "Add a target food cost % to see the menu price that hits it.",
      "For a month: switch to “Whole kitchen” and enter opening stock, purchases, closing stock and food sales.",
    ],
    formula: [
      "Food cost % (dish) = plate cost ÷ menu price × 100",
      "Menu price for a target = plate cost ÷ (target % ÷ 100)",
      "Food used (month) = opening stock + purchases − closing stock",
      "Food cost % (month) = food used ÷ food sales × 100",
    ],
    faqs: [
      {
        question: "What is a good food cost percentage?",
        answer:
          "It depends on your menu, prices and portion sizes, so there is no one right number. Set your own target from your costs and the profit you need, and check that it stays steady month to month.",
      },
      {
        question: "Should the menu price include tax?",
        answer:
          "No. Use the price before sales tax or VAT, otherwise your food cost looks lower than it really is.",
      },
      {
        question: "Why is my monthly food cost higher than my dish food costs?",
        answer:
          "The monthly figure also counts waste, staff meals, over-portioning and stock that went missing. A big gap between the two is worth looking into.",
      },
      {
        question: "Is my data saved?",
        answer: "No. The calculator runs in your browser and nothing you type is sent or stored.",
      },
    ],
    inProduct:
      "TajirPoint costs each recipe from your ingredient prices and shows the cost per portion and food cost % next to the menu price.",
    forBusinesses: [
      { label: "Restaurants", href: "/business/restaurants" },
      { label: "Cafés & bakeries", href: "/business/cafes-bakeries" },
      { label: "Cloud kitchens", href: "/business/cloud-kitchens" },
    ],
  },
];

export const TOOL_SLUGS: ToolSlug[] = TOOLS.map((t) => t.slug);

export function getTool(slug: string): ToolInfo | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

/** Hub page copy. */
export const TOOLS_HUB = {
  seo: {
    title: "Free Business Tools for Shops and Restaurants",
    description:
      "Free calculators for shop and restaurant owners: profit margin, sales tax and VAT, break-even and food cost, plus a simple invoice maker. Nothing is stored.",
  },
  heading: "Free tools for shops and restaurants",
  intro:
    "Quick calculators for the sums you do every week. They work on your phone, need no sign-up, and nothing you type leaves your browser.",
  faqs: [
    {
      question: "Are these tools really free?",
      answer: "Yes. No sign-up, no card, no limit on how often you use them.",
    },
    {
      question: "Do you store what I type?",
      answer:
        "No. Every tool runs in your browser. The numbers and details you enter are not sent to us or saved. If you accepted analytics cookies, we only count which tool was used — never what you typed.",
    },
    {
      question: "Can I use them on my phone?",
      answer: "Yes. Every tool works on a phone, tablet or computer.",
    },
  ] satisfies ToolFaq[],
} as const;

/** Footer link text per locale — kept here so messages/*.json stay untouched. */
export const FREE_TOOLS_LABEL: Record<string, string> = {
  en: "Free tools",
  ur: "مفت ٹولز",
  ar: "أدوات مجانية",
};
