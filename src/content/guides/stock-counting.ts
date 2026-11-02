import type { Guide } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// TajirPoint claims: stock per branch/warehouse, stock movements history,
// adjustments with a reason and maker-checker approval (owner/manager may
// approve their own; inventory AdjustmentService.SELF_APPROVE_ROLES), wastage
// reasons (TP-186), transfers, reorder alerts + suggestions, batches & expiry
// (web features/inventory/*Screen.tsx). Kitchen stock page with start / in /
// used / wasted / count / now and a day report (restaurants counted_stock,
// live 19-86). No claim of a retail "count session" screen: the backend
// StockTakeSession exists but no web screen was found on 2 Nov 2026.
const guide: Guide = {
  slug: "stock-counting",
  category: "Stock",
  title: "Stock counting: how to find and stop stock loss",
  seoTitle: "Stock Counting: How to Stop Stock Loss",
  seoDescription:
    "How to count stock properly, find where stock goes missing, and stop it: full and cycle counts, a step-by-step count, variances, shrinkage and simple controls.",
  keywords: [
    "stock counting",
    "stock take",
    "how to do a stock count",
    "stock loss",
    "inventory shrinkage",
    "cycle count",
    "stock variance",
  ],
  summary:
    "Every shop loses some stock. The ones that make money find out where, quickly. Here is how to count, what to do with the differences, and the controls that stop the leaks.",
  shortAnswer:
    "To stop stock loss, compare what your system says you should have with what is actually on the shelf, regularly. Count high-value and fast-moving items often (cycle counts), do a full count a few times a year, record every difference with a reason, and fix the cause: wastage, receiving mistakes, unrecorded sales or theft.",
  keyPoints: [
    "Why stock goes missing, and the usual causes",
    "Full counts vs cycle counts, and which items to count most",
    "A step-by-step count that gives numbers you can trust",
    "What to do with the differences, and how to prevent them",
  ],
  sections: [
    {
      id: "why-count",
      heading: "Why stock counts matter",
      blocks: [
        {
          type: "p",
          text: "Your POS knows what you bought and what you sold, so it knows what you **should** have. A stock count tells you what you **actually** have. The gap between the two is your stock loss, also called **shrinkage**.",
        },
        {
          type: "p",
          text: "Without counting, that gap stays hidden. Your reports say you made a profit, but the cash never shows up, because part of the profit walked out as stock. Counting is how you find out, and the earlier you find out, the cheaper it is to fix.",
        },
      ],
    },
    {
      id: "causes",
      heading: "Where does stock go?",
      blocks: [
        {
          type: "table",
          caption: "Common causes of stock loss and how to spot them",
          head: ["Cause", "How it usually shows up"],
          rows: [
            [
              "Wastage and expiry",
              "Fresh items, dairy, medicines and kitchen ingredients short after the expiry date",
            ],
            ["Receiving mistakes", "Supplier delivered less than the invoice and nobody checked"],
            ["Sales not rung up", 'Cash sales during rush hours, "friends and family" items'],
            ["Wrong item scanned", "One item over, a similar one under by the same amount"],
            ["Unrecorded transfers", "One branch over and another under"],
            ["Theft", "Small, high-value items short again and again"],
            ["Wrong units", "Cartons entered as pieces, kg entered as grams"],
          ],
        },
        {
          type: "p",
          text: "Notice that most of these are **mistakes, not theft**. Treat the first count as a way to find process problems. Accusing staff before you know the cause is the fastest way to lose good people.",
        },
      ],
    },
    {
      id: "full-vs-cycle",
      heading: "Full counts vs cycle counts",
      blocks: [
        {
          type: "p",
          text: "A **full count** (or stock take) counts everything at once, usually with the shop closed. It is accurate but slow, so most shops do it a few times a year and at the end of the financial year.",
        },
        {
          type: "p",
          text: "A **cycle count** counts a small group of items every day or week, in rotation. It catches problems in days instead of months, and nobody has to close the shop.",
        },
        {
          type: "h3",
          text: "Count the right items most often (the ABC method)",
        },
        {
          type: "list",
          items: [
            "**A items:** the 10-20% of products that make most of your sales value, plus anything small and expensive. Count weekly.",
            "**B items:** steady sellers in the middle. Count monthly.",
            "**C items:** slow, low-value items. Count every quarter or at the full count.",
          ],
        },
        {
          type: "note",
          tone: "info",
          title: "For restaurants",
          text: "Count your expensive ingredients (meat, chicken, cheese, oil) every day at closing, and everything else weekly. Food cost moves too fast for monthly counts.",
        },
      ],
    },
    {
      id: "how-to-count",
      heading: "How to do a stock count, step by step",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**Pick a time with no movement.** Before opening or after closing. Finish receiving deliveries and transfers first, or leave them aside until after the count.",
            "**Tidy first.** Put items in their places and group the same items together. Counting a mess gives a messy number.",
            "**Count by location, shelf by shelf.** Work in one direction so nothing is counted twice or missed. Remember the back store, the fridge and the display.",
            '**Count blind.** The person counting should not see the expected number. Otherwise people "find" what they expect.',
            "**Use the right unit.** Count loose pieces and full cartons separately, and weigh loose items.",
            "**Recount big differences.** Anything far off gets a second count by a different person before you accept it.",
            "**Enter the count straight away,** while the stock is still not moving.",
          ],
        },
      ],
    },
    {
      id: "faster-counts",
      heading: "Make counting faster (so you actually do it)",
      blocks: [
        {
          type: "p",
          text: "Counts that take all night get skipped. A few habits cut the time in half:",
        },
        {
          type: "list",
          items: [
            "**Count in pairs:** one person counts out loud, the other enters the number.",
            "**Scan, don't search.** A barcode scanner or a phone camera finds the item in a second; typing names does not.",
            '**Label shelves and bins** so every item has one home. Most "missing" stock is in the wrong place.',
            '**Fix the day and time.** "Every Monday before opening, A items" becomes a habit; "when we get time" never happens.',
            "**Keep counts small.** Twenty items done properly beat two hundred done in a hurry.",
            "**Close the loop the same day.** Enter the counts and look at the differences while everyone still remembers the week.",
          ],
        },
      ],
    },
    {
      id: "after-the-count",
      heading: "What to do with the differences",
      blocks: [
        {
          type: "p",
          text: "The difference between counted and expected stock is the **variance**. Do not just overwrite the system number. Record each difference as an adjustment with a reason, so you can see patterns later.",
        },
        {
          type: "list",
          items: [
            "Give every adjustment a reason: wastage, expiry, damage, count correction, theft (suspected).",
            "Have someone other than the counter approve big adjustments.",
            "Look for pairs: one item over and a similar one under usually means a scanning or receiving mistake, not loss.",
            "Check recent deliveries for the items that are short.",
          ],
        },
        {
          type: "h3",
          text: "Measure shrinkage, then watch the trend",
        },
        {
          type: "p",
          text: "**Shrinkage %** = value of stock lost ÷ sales for the same period × 100. Example: you lost Rs 18,000 of stock in a month with Rs 1,200,000 of sales, so shrinkage is 1.5%. The exact number matters less than its direction. If it climbs month after month, a control is missing.",
        },
      ],
    },
    {
      id: "prevent",
      heading: "Ten controls that stop most stock loss",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Check every delivery against the purchase order before you sign.",
            "Ring up every sale, including staff meals and samples.",
            "Give each staff member their own login; no shared passwords.",
            "Make voids, discounts and refunds need a manager.",
            "Record wastage the same day, with a reason.",
            "Sell the oldest stock first (first expiry, first out).",
            "Record transfers between branches in the system, not on paper.",
            "Keep small, expensive items behind the counter.",
            "Set reorder levels so you are not over-stocked on items that expire.",
            "Count A items weekly, and act on what you find.",
          ],
        },
      ],
    },
    {
      id: "tajirpoint",
      heading: `How ${BRAND_NAME} helps`,
      blocks: [
        {
          type: "list",
          items: [
            "Live stock per branch or warehouse, updated by every sale, purchase and transfer",
            "A full history of stock movements for every item",
            "Stock adjustments with a reason; staff adjustments wait for an owner or manager to approve them",
            "Wastage reasons you set yourself, so losses are grouped by cause",
            "Transfers between branches, so stock never moves on paper",
            "Reorder alerts and suggestions",
            "Batches and expiry dates for pharmacies and food",
            "For restaurants: recipes linked to dishes and a kitchen stock page showing opening stock, stock in, used, wasted, your count and what is left, with a day report",
          ],
        },
        {
          type: "p",
          text: "See it for your kind of business: [grocery and kiryana](/business/grocery-kiryana), [pharmacy](/business/pharmacy) or [restaurants](/business/restaurants). The Light plan is free for 3 months; see [pricing](/pricing).",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How often should a shop count its stock?",
      a: "Count high-value and fast-moving items weekly, everything else monthly or quarterly, and do a full count at least once a year. Restaurants should count expensive ingredients daily.",
    },
    {
      q: "What is the difference between a stock take and a cycle count?",
      a: "A stock take counts everything at once, often with the shop closed. A cycle count counts a small group of items in rotation, so problems are found sooner without closing.",
    },
    {
      q: "What is a normal level of stock loss?",
      a: "It depends on the trade: fresh food and fashion lose more than hardware. Measure your own shrinkage % every month and work to bring it down, rather than comparing to a general number.",
    },
    {
      q: "Should I tell staff when a count is happening?",
      a: "For a full count, yes, because you need their help. Spot checks of a few items work best without warning. Either way, the person counting should not see the expected number.",
    },
    {
      q: `How do I record a stock difference in ${BRAND_NAME}?`,
      a: "Make a stock adjustment with the counted quantity and a reason. If a staff member makes it, an owner or manager approves it before stock changes.",
    },
  ],
  links: [
    {
      label: "Grocery & kiryana POS",
      href: "/business/grocery-kiryana",
      note: "Barcodes, kg and cartons, khata",
    },
    {
      label: "Pharmacy software",
      href: "/business/pharmacy",
      note: "Batches, expiry and first-expiry-first-out",
    },
    {
      label: "Restaurant POS",
      href: "/business/restaurants",
      note: "Recipes and the kitchen stock page",
    },
    {
      label: "Accounting",
      href: "/features/accounting",
      note: "Double-entry books posted from sales and purchases",
    },
    {
      label: "Get a call back",
      href: "/get-a-call",
      note: "Ask how to set up stock for your shop",
    },
  ],
  related: ["excel-to-pos", "choose-restaurant-pos", "digital-khata"],
  datePublished: "2026-11-02",
  dateModified: "2026-11-02",
  og: {
    eyebrow: "Guide · Stock counting",
    title: "Find where your stock goes, and stop it.",
    sub: "Full and cycle counts, a step-by-step count, variances, shrinkage and ten simple controls.",
    pills: ["Stock take", "Cycle counts", "Wastage", "Shrinkage"],
  },
};

export default guide;
