import type { Guide } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// TajirPoint claims are the ones on /business/restaurants (live): counter POS
// with modifiers and deals, split bills, service charge and tax, receipts in
// en/ur/ar, floor plan and tables, KDS per station or printed tickets,
// courses, waiter app (Android), order receiver board + packer screen, own
// online order page, rider app, branded customer app, Z-report. Recipes and
// kitchen stock: live since backend 19-86 / web 19-87 (restaurants
// counted_stock, recipe_service). Offline selling: /features/offline. "No
// transaction fees": pricing share card on the live site. HubRise = Contact
// us add-on. FBR = Coming soon.
const guide: Guide = {
  slug: "choose-restaurant-pos",
  category: "Restaurants",
  title: "How to choose a POS for your restaurant: a buyer's checklist",
  seoTitle: "How to Choose a POS for Your Restaurant",
  seoDescription:
    "A plain checklist for choosing a restaurant POS: dine-in, takeaway and delivery needs, kitchen screens, offline selling, tax, hardware and real costs.",
  keywords: [
    "restaurant POS",
    "how to choose a restaurant POS",
    "best POS for restaurant",
    "restaurant POS system Pakistan",
    "takeaway POS UK",
    "kitchen display system",
    "restaurant billing software",
  ],
  summary:
    "The right restaurant POS depends on how you serve: dine-in, takeaway, delivery or all three. Use this checklist to compare systems on what matters on a busy night.",
  shortAnswer:
    "Choose a restaurant POS by matching it to how you serve. Check that it takes orders fast with your modifiers and deals, sends them to the kitchen by screen or printer, handles tables, takeaway and delivery, keeps selling offline, handles your tax, and gives clear end-of-day reports. Then compare the full cost: subscription, hardware, add-ons and payment fees.",
  keyPoints: [
    "Start from your service style, not from a feature list",
    "The 12 things to test before you sign",
    "How to work out the real monthly cost",
    "Questions to ask every vendor, and red flags",
  ],
  sections: [
    {
      id: "start-with-service",
      heading: "Start with how you serve",
      blocks: [
        {
          type: "p",
          text: "A fine-dining restaurant, a burger takeaway and a cloud kitchen all need a POS, but not the same one. Before you look at any system, write down how orders reach you and how food leaves.",
        },
        {
          type: "table",
          caption: "What each service style needs most",
          head: ["Service style", "Needs most"],
          rows: [
            [
              "Dine-in",
              "Floor plan and tables, waiter ordering, courses, split bills, service charge",
            ],
            [
              "Takeaway / counter",
              "Very fast order entry, deals and combos, order numbers, a kitchen screen",
            ],
            [
              "Delivery (own riders)",
              "Online order page, an order board that rings, rider app, cash settlement",
            ],
            ["Delivery (apps)", "A way to bring app orders into the same kitchen flow"],
            [
              "Cloud kitchen",
              "Several brands, one kitchen, packer screen, clean handover to riders",
            ],
          ],
        },
        {
          type: "p",
          text: "Most restaurants do two or three of these. The POS must handle all of yours in one place, so sales, stock and reports are not split across systems.",
        },
      ],
    },
    {
      id: "checklist",
      heading: "The 12-point restaurant POS checklist",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**Order speed.** Ring up your five most common orders, with their extras, in a demo. Count the taps. On a Friday night every second counts.",
            '**Modifiers and deals.** Sizes, spice levels, extra cheese, "no onion", combos and time-limited deals must work the way your menu actually works.',
            "**Kitchen tickets.** Orders should reach the right station (grill, tandoor, drinks) on a kitchen display (KDS) or a printer, with clear notes.",
            "**Tables and courses** (if you seat guests). Open, move and merge tables, hold mains until starters are done, add rounds to an open bill.",
            "**Waiter ordering.** Waiters taking orders on a phone at the table saves walking and mistakes.",
            "**Online orders and delivery.** Your own order link (for Instagram, Facebook and WhatsApp), an order board that rings until someone accepts, and a rider flow.",
            "**Payments.** Split bills, cash and card on one bill, service charge, discounts that need a manager's OK.",
            "**Works offline.** The internet will drop on a busy night. The till must keep selling and sync later without double counting.",
            "**Tax.** In Pakistan, check sales tax on services and FBR or provincial reporting. In the UK, VAT on hot food and takeaway. In the Gulf, VAT invoices.",
            "**Stock and recipes.** Link dishes to ingredients so you can see what the kitchen used and what is running low.",
            "**Staff control.** Own logins, roles, and every void and discount recorded with a name.",
            "**Reports.** A Z-report per register, item sales, best sellers, tax by rate, by day, shift and branch.",
          ],
        },
      ],
    },
    {
      id: "hardware",
      heading: "Hardware: what you actually need",
      blocks: [
        {
          type: "p",
          text: "Ask early which devices a system runs on. Being tied to one brand of till can double your start-up cost. Systems that run in a browser, on Windows and on Android let you reuse what you have.",
        },
        {
          type: "list",
          items: [
            "**Counter:** a PC, laptop or tablet, a receipt printer, a cash drawer.",
            "**Kitchen:** a screen (any tablet or monitor) or a kitchen printer per station.",
            "**Waiters:** Android phones or tablets.",
            "**Delivery:** riders' own Android phones.",
            "**Card payments:** a terminal from your bank or payment provider.",
          ],
        },
      ],
    },
    {
      id: "real-cost",
      heading: "How to work out the real cost",
      blocks: [
        {
          type: "p",
          text: "The monthly price on a pricing page is only part of it. Add these up for a full year before you compare:",
        },
        {
          type: "list",
          items: [
            "Subscription per branch, and per register or device if charged that way",
            "Add-ons you will need (online ordering, accounting, delivery, loyalty)",
            "Hardware, and whether you must buy the vendor's own",
            "Transaction fees or a percentage taken from each order",
            "Set-up, training and data migration fees",
            "What happens to the price after any free period",
          ],
        },
        {
          type: "note",
          tone: "info",
          title: "Percentages add up",
          text: "A small percentage on every online order can cost more than the whole subscription once you are busy. Ask whether the POS takes a cut of your sales, and check what your payment provider charges separately.",
        },
      ],
    },
    {
      id: "questions",
      heading: "Questions to ask every vendor",
      blocks: [
        {
          type: "list",
          items: [
            "Can I try it free on my own menu before paying?",
            "What happens when the internet goes down, exactly?",
            "Who moves my menu, customers and balances over, and is that free?",
            "Can I export all my data if I leave?",
            "How do I reach support on a Saturday night, and in which languages?",
            'Which features are released today, and which are "coming soon"?',
            "Does it handle the tax rules in my country and province?",
          ],
        },
        {
          type: "h3",
          text: "Red flags",
        },
        {
          type: "list",
          items: [
            "A demo that never shows your real menu or a busy-hour order",
            "Long contracts with exit fees",
            'No offline mode, or "offline" that only shows a message',
            "Hardware you can only buy from the vendor",
            "Vague answers about data export or who owns your data",
          ],
        },
      ],
    },
    {
      id: "score",
      heading: "A simple way to compare systems",
      blocks: [
        {
          type: "p",
          text: "Give each system a score from 0 to 2 on each of the 12 checklist points (0 = missing, 1 = works but awkward, 2 = works well for us). Double the score on the three points that matter most for your service style. The highest total, at a cost you can carry for a year, is usually the right choice.",
        },
      ],
    },
    {
      id: "tajirpoint",
      heading: `Where ${BRAND_NAME} fits`,
      blocks: [
        {
          type: "p",
          text: `${BRAND_NAME} is built for restaurants first. Here is how it maps to the checklist, honestly:`,
        },
        {
          type: "list",
          items: [
            "Counter POS with modifiers, deals and combos; split bills, cash and card on one bill; service charge and tax on every bill; receipts in English, Urdu or Arabic",
            "Floor plan, tables, courses and a waiter app for Android",
            "Kitchen display per station, or printed kitchen tickets",
            "Your own online order page, an order board that rings until accepted, a packer screen and a rider app",
            "Recipes linked to dishes, with a kitchen stock page and low-stock alerts",
            "Keeps selling offline on web, Windows and Android, and syncs afterwards",
            "Z-report per register, item sales, tax by rate, by day, shift and branch",
            "Delivery apps through HubRise: our team sets it up with you ([HubRise add-on](/extensions/hubrise))",
            "FBR reporting for Pakistan is coming soon (see our [FBR guide](/guides/fbr-pos-integration))",
          ],
        },
        {
          type: "p",
          text: "The Light plan is free for 3 months with no card, and we move your menu and data for you, free. See the [restaurant POS page](/business/restaurants), [pricing](/pricing), or [book a demo](/book-demo) on your own menu.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need a kitchen display or is a kitchen printer enough?",
      a: "A printer is fine for a small kitchen with one station. A kitchen display helps once you have several stations or many online orders, because tickets can be marked ready and nothing gets lost on paper.",
    },
    {
      q: "Can a restaurant POS work without internet?",
      a: "A good one can. It saves each sale on the device and syncs when the connection returns. Ask the vendor to show it in the demo by switching the Wi-Fi off.",
    },
    {
      q: "Should I buy hardware from the POS company?",
      a: "Only if it is cheaper or better. Systems that run in the browser, on Windows and on Android let you use standard printers, tablets and phones.",
    },
    {
      q: "What reports should a restaurant check every day?",
      a: "The Z-report per register (takings by payment type), item sales and best sellers, voids and discounts by staff member, and tax by rate.",
    },
    {
      q: "How long does it take to switch POS?",
      a: "For most restaurants a few days: load the menu and modifiers, set up tables and kitchen stations, train staff, then go live on a quiet day.",
    },
    {
      q: `Does ${BRAND_NAME} work for takeaways and cloud kitchens?`,
      a: "Yes. Fast counter ordering, your own online order page, an order board, a packer screen and a rider app all come in the same system.",
    },
  ],
  links: [
    {
      label: "Restaurant POS",
      href: "/business/restaurants",
      note: "Tables, KDS, waiter app, online orders and delivery",
    },
    {
      label: "Cloud kitchens",
      href: "/business/cloud-kitchens",
      note: "Several brands, one kitchen",
    },
    {
      label: "Cafes & bakeries",
      href: "/business/cafes-bakeries",
      note: "Fast counter, loyalty and recipes",
    },
    {
      label: "Offline POS",
      href: "/features/offline",
      note: "Keep selling when the internet drops",
    },
    { label: "Add-ons", href: "/extensions", note: "Accounting, payments, delivery and more" },
    { label: "Book a demo", href: "/book-demo", note: "See it run on your own menu" },
  ],
  related: [
    "best-pos-software-pakistan",
    "restaurant-opening-checklist",
    "stock-counting",
    "excel-to-pos",
  ],
  datePublished: "2026-11-02",
  dateModified: "2026-11-02",
  og: {
    eyebrow: "Guide · Restaurant POS",
    title: "How to choose a POS for your restaurant.",
    sub: "A 12-point checklist, the real cost, and the questions to ask every vendor.",
    pills: ["Dine-in", "Takeaway", "Delivery", "Checklist"],
  },
};

export default guide;
