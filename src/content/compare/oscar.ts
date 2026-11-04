import type { Comparison } from "./types";
import { TP } from "./tajirpoint";
import { BRAND_NAME } from "@/lib/config/brand";

/**
 * Tajir Point vs Oscar POS (oscar.pk), a Pakistani POS for restaurants,
 * retail and services.
 *
 * Every fact about Oscar has a `source` (1-based index into `sources`) and was
 * read on 5 Nov 2026 (NOT the shared CHECKED date of 1 Nov 2026) from
 * oscar.pk or Oscar's own App Store listing (linked from oscar.pk). Where
 * Oscar does not publish something, the cell says "not published"; we never
 * write "No" for a competitor.
 */

export const oscar: Comparison = {
  slug: "tajirpoint-vs-oscar",
  checked: { label: "5 Nov 2026", iso: "2026-11-05" },
  kind: "competitor",
  otherName: "Oscar POS",
  label: `${BRAND_NAME} vs Oscar POS`,
  blurb:
    "A free POS paid for by card fees, with FBR built in, or a POS with khata, riders and Urdu that works with your own bank.",
  audience: "Shops and restaurants in Pakistan",
  seo: {
    title: `${BRAND_NAME} vs Oscar POS: FBR, Price & Features`,
    description: `Oscar POS or ${BRAND_NAME}? A fair look at FBR and provincial tax, the free card machine offer, offline mode, khata, riders and Urdu, with sources.`,
    keywords: [
      "Oscar POS alternative",
      "Oscar POS vs",
      "Oscar POS price",
      "FBR integrated POS",
      "free POS Pakistan",
      "POS with khata",
    ],
  },
  og: {
    eyebrow: "Compare",
    title: `${BRAND_NAME} vs Oscar POS.`,
    sub: "FBR, price, offline, khata and riders, compared fairly with sources.",
    pills: ["Khata", "Riders", "Urdu", "No card fees"],
  },
  hero: {
    eyebrow: `${BRAND_NAME} vs Oscar POS`,
    h1: `${BRAND_NAME} vs Oscar POS: which POS fits your business?`,
    sub: `Oscar POS is a Pakistani POS with FBR, SRB and PRA links and a free card machine offer. ${BRAND_NAME} adds khata, your own riders and Urdu screens, with no card fees. Here is where each one is stronger.`,
  },
  verdict: {
    tajirpoint: `Choose ${BRAND_NAME} if many customers buy on credit, you deliver with your own riders, you want Urdu or Arabic screens and a Windows desktop app, or you want to keep your own bank's card terminal with no transaction fee from us.`,
    other:
      "Choose Oscar POS if you must report sales to FBR, SRB or PRA today, want a free POS and card machine paid for through card fees, need full offline mode at the tables, or want an iPhone or iPad app now.",
  },
  tajirpointStrengths: [
    "Khata built in: credit limits, 30/60/90-day aging, reminders and PDF statements for customers who buy on credit.",
    "A rider app for your own riders, with jobs, navigation, proof of delivery and rider cash per shift.",
    "App and receipts in Urdu and Arabic, with right-to-left screens, plus a Windows desktop app.",
    `No transaction fee from ${BRAND_NAME}: keep your own bank's card terminal and rates.`,
    "Plans in USD and screens in English, Urdu and Arabic, so one system works in Pakistan, the Gulf or the UK.",
    "Our team moves your products, customers, credit balances and stock for free.",
  ],
  otherStrengths: [
    `Tax links today: it says every invoice is reported to FBR in real time, with SRB and PRA included and no integrator fee. ${BRAND_NAME}'s FBR connector is coming soon and provincial links are not built.`,
    `A free POS and a free card machine for restaurants, paid for through card fees (1.2% + Rs 10 per card payment on its Free POS page). ${BRAND_NAME}'s free Light plan lasts 3 months.`,
    `Offline mode for restaurant service: orders, KOTs and billing keep going without internet. ${BRAND_NAME}'s offline mode for tables and the kitchen screen is not released yet.`,
    `Accounting and Oscar AI reports are listed as built in. ${BRAND_NAME}'s accounting is an add-on and its AI tools are coming soon.`,
    `An iPhone and iPad app today. ${BRAND_NAME}'s iOS app is coming soon.`,
    "Foodpanda and other delivery-app orders sync straight into the POS.",
    "Ready-made setups for pharmacies (batch, expiry, DRAP) and petrol pumps (nozzle-wise sales, tank dips), with well-known Pakistani customers such as Burger Lab and Cinnabon.",
  ],
  rows: [
    {
      feature: "Price to start",
      tajirpoint: TP.freeStart,
      other: {
        mark: "yes",
        text: "Free POS software and a free card machine for restaurants (its Free POS page).",
        source: 2,
      },
    },
    {
      feature: "Card payment fees",
      tajirpoint: TP.cardProcessing,
      other: {
        mark: "info",
        text: "1.2% + Rs 10 per card payment on its Free POS offer.",
        source: 2,
      },
    },
    {
      feature: "Hardware",
      tajirpoint: TP.hardware,
      other: {
        mark: "info",
        text: "Free card machine with its Free POS offer, which can also work as the POS.",
        source: 2,
      },
    },
    {
      feature: "FBR (federal sales tax)",
      tajirpoint: TP.fbr,
      other: {
        mark: "yes",
        text: "Says every invoice is reported to FBR in real time, with QR-coded receipts.",
        source: 2,
      },
    },
    {
      feature: "PRA, SRB, KPRA (provincial)",
      tajirpoint: TP.provincialTax,
      other: {
        mark: "yes",
        text: "Lists SRB and PRA. KPRA is not published.",
        source: 2,
      },
    },
    {
      feature: "Works offline",
      tajirpoint: TP.offlineRetail,
      other: {
        mark: "yes",
        text: "Keeps taking orders, sending KOTs and billing offline; syncs later.",
        source: 3,
      },
    },
    {
      feature: "Kitchen display",
      tajirpoint: TP.kds,
      other: { mark: "yes", text: "Kitchen KOT and kitchen display (KDS).", source: 3 },
    },
    {
      feature: "Table-side ordering",
      tajirpoint: TP.waiter,
      other: {
        mark: "yes",
        text: "Table-side ordering, including on its card machine.",
        source: 2,
      },
    },
    {
      feature: "Online ordering",
      tajirpoint: TP.orderPage,
      other: {
        mark: "yes",
        text: "Branded ordering page for pickup, delivery and QR dine-in, zero commission.",
        source: 2,
      },
    },
    {
      feature: "Own riders",
      tajirpoint: TP.riders,
      other: {
        mark: "info",
        text: "Rider app not published. Foodpanda and delivery-app orders sync into the POS.",
        source: 3,
      },
    },
    {
      feature: "Customer credit (khata)",
      tajirpoint: TP.khata,
      other: {
        mark: "yes",
        text: "Tracks customer balances. Credit limits and aging are not published.",
        source: 6,
      },
    },
    {
      feature: "Accounting",
      tajirpoint: TP.accounting,
      other: {
        mark: "yes",
        text: "Journal entries, ledger, receivables and payables, P&L and balance sheet.",
        source: 4,
      },
    },
    {
      feature: "AI reports",
      tajirpoint: TP.ai,
      other: {
        mark: "yes",
        text: "Oscar AI answers questions about sales, stock and staff.",
        source: 3,
      },
    },
    {
      feature: "More than one branch",
      tajirpoint: TP.multiBranch,
      other: {
        mark: "yes",
        text: "Pricing, stock and reports for all branches from one dashboard.",
        source: 1,
      },
    },
    {
      feature: "Devices",
      tajirpoint: TP.devices,
      other: {
        mark: "info",
        text: "iPhone and iPad app; its listing also describes Android devices. A Windows app is not published.",
        source: 6,
      },
    },
    {
      feature: "Languages",
      tajirpoint: TP.languages,
      other: {
        mark: "info",
        text: "Urdu screens are not published. Its App Store listing shows English.",
        source: 6,
      },
    },
    {
      feature: "Moving your data",
      tajirpoint: TP.migration,
      other: {
        mark: "info",
        text: "Free onboarding for setup, training and configuration. Data import is not published.",
        source: 1,
      },
    },
    {
      feature: "Kinds of business",
      tajirpoint: TP.industries,
      other: {
        mark: "yes",
        text: "Restaurants, retail, grocery, pharmacy, petrol pumps, salons, services and more.",
        source: 1,
      },
    },
    {
      feature: "Countries",
      tajirpoint: {
        mark: "yes",
        text: "Plans in USD; screens and receipts in English, Urdu and Arabic for Pakistan, the Gulf or the UK.",
        href: "/pricing",
      },
      other: {
        mark: "info",
        text: "Built for Pakistan; prices shown in rupees.",
        source: 2,
      },
    },
  ],
  sections: [
    {
      heading: "If you must send sales to FBR, SRB or PRA today",
      paragraphs: [
        "Oscar's Free POS page says every invoice is reported to FBR in real time, prints QR-coded FBR receipts and includes SRB and PRA, with no integrator fee. Its pages do not mention KPRA, so ask Oscar if you are in KP.",
        `${BRAND_NAME}'s FBR connector is coming soon and the PRA, SRB and KPRA links are not built yet. ${BRAND_NAME} already records tax on every bill and gives tax reports. If reporting to FBR or your province is a must for you today, Oscar is ahead; ask us for dates before you switch.`,
      ],
    },
    {
      heading: "How each one charges",
      paragraphs: [
        "Oscar's Free POS page offers restaurants free POS software, a free card machine, free online ordering and built-in accounting. You pay 1.2% + Rs 10 on each card payment. Its Payments page lists a different rate (2.6% + Rs 0.5 per transaction), so ask Oscar which one applies to you. Its website does not publish a price list for other plans or businesses.",
        `${BRAND_NAME}'s Light plan is free for 3 months with no card. After that, Shop is $29 a month and Business is $79 a month, and ${BRAND_NAME} takes no fee on your card payments. If most of your customers pay cash, a card-fee model may cost you very little; if most pay by card, compare the monthly plan with what the card fees would add up to.`,
      ],
    },
    {
      heading: "Credit customers, riders and language",
      paragraphs: [
        `Oscar lists customer balances and credit sales. ${BRAND_NAME} goes further for shops that live on udhaar: a credit limit per customer, a 30/60/90-day list of who is late paying, reminders and PDF statements to send on chat.`,
        `If you deliver with your own riders, ${BRAND_NAME} has a rider app with jobs, navigation, proof of delivery and rider cash per shift. Oscar's site does not publish a rider app; it focuses on syncing Foodpanda and other delivery-app orders. ${BRAND_NAME}'s screens and receipts also come in Urdu and Arabic, which Oscar does not publish.`,
      ],
    },
    {
      heading: "Offline in a restaurant",
      paragraphs: [
        `Oscar says its POS keeps taking orders, sending KOTs and billing when the internet drops, then syncs. ${BRAND_NAME}'s counter keeps selling offline today, but offline mode for restaurant tables and the kitchen screen is not released yet. If your connection is unreliable during service, that matters.`,
      ],
    },
  ],
  faqs: [
    {
      question: "Is Oscar POS free?",
      answer:
        "Oscar's Free POS page offers restaurants free POS software, a free card machine, free online ordering and built-in accounting, with a fee of 1.2% + Rs 10 on each card payment. Its App Store listing says billing, inventory and reports are free to start (checked 5 Nov 2026).",
    },
    {
      question: "How much does Oscar charge per card payment?",
      answer:
        "Its Free POS page lists 1.2% + Rs 10 per card payment. Its Payments page lists 2.6% + Rs 0.5 per transaction with no monthly cost (checked 5 Nov 2026). Ask Oscar which rate applies to your business.",
    },
    {
      question: `Is ${BRAND_NAME} FBR integrated?`,
      answer: `Not yet. The FBR connector is coming soon. ${BRAND_NAME} already records tax on every bill and gives tax reports. PRA, SRB and KPRA links are not built yet.`,
    },
    {
      question: `Is ${BRAND_NAME} free?`,
      answer: `The Light plan is free for 3 months with no card. After that you choose Shop ($29 a month) or Business ($79 a month). ${BRAND_NAME} takes no fee on your card payments.`,
    },
    {
      question: `Can I move from Oscar POS to ${BRAND_NAME}?`,
      answer:
        "Yes. Send us an Excel or CSV export of your products and customers. Our team loads your products, customers, credit balances and opening stock for free.",
    },
  ],
  sources: [
    { label: "Oscar POS home page", url: "https://oscar.pk/" },
    { label: "Oscar POS: Free POS with card machine", url: "https://oscar.pk/solutions/free-pos" },
    {
      label: "Oscar POS: restaurant solution",
      url: "https://oscar.pk/solutions/restaurant-solutions",
    },
    { label: "Oscar POS: accounting", url: "https://oscar.pk/features/accounting-solution" },
    { label: "Oscar Payments", url: "https://oscar.pk/payments" },
    {
      label: "Oscar POS on the App Store",
      url: "https://apps.apple.com/au/app/oscar-pos-system-for-business/id6789567116",
    },
    { label: "Oscar POS: pharmacy", url: "https://oscar.pk/solutions/pharmacy" },
    { label: "Oscar POS: petrol pumps", url: "https://oscar.pk/solutions/petrol-pumps" },
  ],
  related: ["tajirpoint-vs-corn-pos", "tajirpoint-vs-loyverse", "tajirpoint-vs-paper-khata"],
};
