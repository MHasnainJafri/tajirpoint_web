import type { Comparison } from "./types";
import { TP } from "./tajirpoint";
import { BRAND_NAME } from "@/lib/config/brand";

/**
 * Tajir Point vs Moneypex (moneypex.com/pk), a Pakistani business software
 * company with separate POS products for retail, restaurants, pharmacies and
 * mobile shops, plus accounting, manufacturing and distribution.
 *
 * Every fact about Moneypex has a `source` (1-based index into `sources`) and
 * was read on 5 Nov 2026 (NOT the shared CHECKED date of 1 Nov 2026) from
 * Moneypex's own Pakistan pages. Prices are quoted in Moneypex's own currency
 * (PKR), exactly as published. The customer stories on its pages are not
 * repeated here. Where Moneypex does not publish something, the cell says
 * "not published"; we never write "No" for a competitor.
 */

export const moneypex: Comparison = {
  slug: "tajirpoint-vs-moneypex",
  checked: { label: "5 Nov 2026", iso: "2026-11-05" },
  kind: "competitor",
  otherName: "Moneypex",
  label: `${BRAND_NAME} vs Moneypex`,
  blurb:
    "Low rupee prices with FBR and PRA as add-ons, or a POS with khata, riders, Urdu screens and Android apps.",
  audience: "Shops, restaurants and pharmacies in Pakistan",
  seo: {
    title: `${BRAND_NAME} vs Moneypex: FBR, Price & Features`,
    description: `Moneypex or ${BRAND_NAME}? A fair look at price in rupees, FBR and PRA, offline billing, khata, riders, pharmacy tools and Urdu, with dated sources.`,
    keywords: [
      "Moneypex alternative",
      "Moneypex vs",
      "Moneypex POS price",
      "Moneypex restaurant POS",
      "FBR integrated POS",
      "POS with khata",
    ],
  },
  og: {
    eyebrow: "Compare",
    title: `${BRAND_NAME} vs Moneypex.`,
    sub: "Price, FBR, offline, khata and riders, compared fairly with sources.",
    pills: ["Khata", "Riders", "Urdu", "Android apps"],
  },
  hero: {
    eyebrow: `${BRAND_NAME} vs Moneypex`,
    h1: `${BRAND_NAME} vs Moneypex: which POS fits your business?`,
    sub: `Moneypex sells low-priced POS plans in rupees, with FBR and PRA links, offline billing and ready-made pharmacy and mobile shop setups. ${BRAND_NAME} adds a full khata, your own riders, Urdu screens and Android apps. Here is where each one is stronger.`,
  },
  verdict: {
    tajirpoint: `Choose ${BRAND_NAME} if many customers buy on credit, you deliver with your own riders, your staff want Urdu or Arabic screens, you want waiter, rider and POS apps on Android phones, or you trade outside Pakistan too.`,
    other:
      "Choose Moneypex if you must report sales to FBR or PRA today, want a low published price in rupees and pay only for the add-ons you use, need offline billing at restaurant tables, or run a pharmacy or mobile shop and want its ready-made tools.",
  },
  tajirpointStrengths: [
    "Khata built in: credit limits, 30/60/90-day aging, reminders and PDF statements for customers who buy on credit.",
    "A rider app for your own riders, with jobs, navigation, proof of delivery and rider cash per shift.",
    "App and receipts in Urdu and Arabic, with right-to-left screens.",
    "Android apps for the counter, waiters and riders, plus a Windows desktop app and the browser.",
    "Plans in USD and screens in English, Urdu and Arabic, so one system works in Pakistan, the Gulf or the UK.",
    "Our team moves your products, customers, credit balances and stock for free.",
  ],
  otherStrengths: [
    `Tax links today: its FBR page says each invoice goes to FBR in real time with a QR code customers can check in the Tax Asaan app, and its retail and restaurant pages list PRA integration. FBR is a paid add-on. ${BRAND_NAME}'s FBR connector is coming soon and provincial links are not built.`,
    "Low published prices in rupees: retail POS from PKR 1,500 a month and restaurant POS at PKR 32,400 a year, with a 7-day free trial. You add only the add-ons you need.",
    `Offline billing for restaurants: it says sales and printed bills keep going when the internet is down, then sync. ${BRAND_NAME}'s offline mode for tables and the kitchen screen is not released yet.`,
    "A pharmacy setup with 25,000+ medicines registered in Pakistan already loaded, generic-formula search, sale by tablet, strip or box, and expiry alerts 30, 60 and 90 days ahead.",
    "A mobile shop setup with IMEI tracking, repair tickets and installment plans.",
    `A wider product range: manufacturing with bills of materials and work orders, HR and payroll, rental management and accounting. ${BRAND_NAME} does not plan production or manage bills of materials today.`,
  ],
  rows: [
    {
      feature: "Price to start",
      tajirpoint: TP.freeStart,
      other: {
        mark: "info",
        text: "7-day free trial. Retail POS from PKR 1,500 a month, or 10% less paid yearly.",
        source: 3,
      },
    },
    {
      feature: "Restaurant plan",
      tajirpoint: {
        mark: "info",
        text: "Shop $29 a month or Business $79 a month after the free 3 months.",
        href: "/pricing",
      },
      other: {
        mark: "info",
        text: "Restaurant POS at PKR 32,400 a year, with recipes, waiters app and tables, delivery and more than one branch.",
        source: 2,
      },
    },
    {
      feature: "Paid add-ons",
      tajirpoint: {
        mark: "info",
        text: "Some add-ons are paid (for example Accounting). Each add-on page shows its price.",
        href: "/extensions",
      },
      other: {
        mark: "info",
        text: "Restaurant add-ons per month: KDS PKR 700, waiter PKR 500, extra shop PKR 1,500, extra terminal PKR 10,000, FBR PKR 1,000, web ordering PKR 1,000.",
        source: 2,
      },
    },
    {
      feature: "FBR (federal sales tax)",
      tajirpoint: TP.fbr,
      other: {
        mark: "yes",
        text: "Says each invoice goes to FBR in real time, with a QR code customers can check in the Tax Asaan app.",
        source: 4,
      },
    },
    {
      feature: "PRA, SRB, KPRA (provincial)",
      tajirpoint: TP.provincialTax,
      other: {
        mark: "yes",
        text: "Lists PRA integration. SRB and KPRA are not published.",
        source: 2,
      },
    },
    {
      feature: "Works offline",
      tajirpoint: TP.offlineRetail,
      other: {
        mark: "yes",
        text: "Offline POS mode: keeps selling and printing bills without internet, then syncs.",
        source: 2,
      },
    },
    {
      feature: "Kitchen display",
      tajirpoint: TP.kds,
      other: {
        mark: "partial",
        text: "Kitchen order tickets (KOT); a KDS is a monthly add-on.",
        source: 2,
      },
    },
    {
      feature: "Table-side ordering",
      tajirpoint: TP.waiter,
      other: {
        mark: "yes",
        text: "Waiters app and table management in its restaurant plan.",
        source: 2,
      },
    },
    {
      feature: "Online ordering",
      tajirpoint: TP.orderPage,
      other: {
        mark: "partial",
        text: "QR menu and web ordering as monthly add-ons.",
        source: 2,
      },
    },
    {
      feature: "Own riders",
      tajirpoint: TP.riders,
      other: {
        mark: "info",
        text: "Delivery management is in its restaurant plan. A rider app is not published.",
        source: 2,
      },
    },
    {
      feature: "Customer credit (khata)",
      tajirpoint: TP.khata,
      other: {
        mark: "info",
        text: "Installments and credit are listed for mobile shops. Credit limits, aging and reminders are not published for its POS.",
        source: 6,
      },
    },
    {
      feature: "Accounting",
      tajirpoint: TP.accounting,
      other: {
        mark: "yes",
        text: "A separate Moneypex Accounting product from PKR 21,600 a year: ledgers, journals, bank reconciliation, reports.",
        source: 7,
      },
    },
    {
      feature: "More than one branch",
      tajirpoint: TP.multiBranch,
      other: {
        mark: "yes",
        text: "Many locations from one dashboard; each extra shop is a monthly add-on.",
        source: 3,
      },
    },
    {
      feature: "Pharmacy",
      tajirpoint: {
        mark: "yes",
        text: "Batches and expiry, first-expiry-first-out and a prescription log.",
        href: "/business/pharmacy",
      },
      other: {
        mark: "yes",
        text: "25,000+ medicines preloaded, generic search, tablet/strip/box, expiry alerts. From PKR 2,500 a month.",
        source: 5,
      },
    },
    {
      feature: "Devices",
      tajirpoint: TP.devices,
      other: {
        mark: "info",
        text: "Desktop and web access, and a stock tracking app add-on. Android or iPhone POS apps are not published.",
        source: 3,
      },
    },
    {
      feature: "Languages",
      tajirpoint: TP.languages,
      other: {
        mark: "info",
        text: "Urdu screens are not published. Its pages are in English.",
        source: 1,
      },
    },
    {
      feature: "Moving your data",
      tajirpoint: TP.migration,
      other: {
        mark: "yes",
        text: "Its pharmacy page says it can move existing data in 95% of cases, with free training.",
        source: 5,
      },
    },
    {
      feature: "Kinds of business",
      tajirpoint: TP.industries,
      other: {
        mark: "yes",
        text: "Retail, restaurant, pharmacy and mobile shop POS, plus accounting, manufacturing, distribution and rentals.",
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
        source: 1,
      },
    },
  ],
  sections: [
    {
      heading: "If you must send sales to FBR or PRA today",
      paragraphs: [
        "Moneypex's FBR page says every invoice is sent to FBR's system in real time and the receipt carries a QR code that customers can check in the Tax Asaan app. Its retail and restaurant pages also list PRA integration. FBR integration is sold as an add-on: PKR 1,000 a month on its retail and restaurant plans and PKR 2,000 a month on its pharmacy plan. Its pages do not mention SRB or KPRA, so ask Moneypex if you are in Sindh or KP.",
        `${BRAND_NAME}'s FBR connector is coming soon and the PRA, SRB and KPRA links are not built yet. ${BRAND_NAME} already records tax on every bill and gives tax reports. If reporting to FBR or PRA is a must for you today, Moneypex is ahead; ask us for dates before you switch.`,
      ],
    },
    {
      heading: "How each one charges",
      paragraphs: [
        "Moneypex publishes its prices in rupees. Retail POS starts at PKR 1,500 a month (10% less paid yearly) and its restaurant POS is PKR 32,400 a year. Many things are monthly add-ons: on the restaurant plan, a kitchen display is PKR 700, each extra waiter PKR 500, each extra shop PKR 1,500, each extra terminal PKR 10,000 and web ordering PKR 1,000. Each POS plan has a 7-day free trial.",
        `${BRAND_NAME}'s Light plan is free for 3 months with no card. After that, Shop is $29 a month and Business is $79 a month. Some ${BRAND_NAME} add-ons are paid too, and each add-on page shows its price. For a fair comparison, add up the plan and every add-on you would actually use for a full year on both sides.`,
      ],
    },
    {
      heading: "Credit customers, riders and language",
      paragraphs: [
        `Moneypex's mobile shop page lists installments and credit, but its POS pages do not describe credit limits, aging or reminders. ${BRAND_NAME} is built for shops that live on udhaar: a credit limit per customer, a 30/60/90-day list of who is late paying, reminders and PDF statements to send on chat.`,
        `Moneypex's restaurant plan includes delivery management; a rider app is not published. ${BRAND_NAME} has a rider app for your own riders, with jobs, navigation, proof of delivery and rider cash per shift. ${BRAND_NAME}'s screens and receipts also come in Urdu and Arabic, which Moneypex does not publish.`,
      ],
    },
    {
      heading: "Pharmacies and mobile shops",
      paragraphs: [
        `Moneypex has ready-made setups for both. Its pharmacy POS comes with 25,000+ medicines registered in Pakistan already loaded, generic-formula search, sale by tablet, strip or box, and expiry alerts. Its mobile shop POS tracks every handset by IMEI and handles repair tickets and installments. ${BRAND_NAME} also covers batches, expiry and a prescription log for pharmacies, and IMEI and serial numbers for mobile shops, but it does not come with a preloaded medicine list.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How much does Moneypex cost?",
      answer:
        "On its own pages (checked 5 Nov 2026), Moneypex retail POS starts at PKR 1,500 a month, restaurant POS is PKR 32,400 a year, mobile shop POS is PKR 2,500 a month and pharmacy POS is PKR 2,500 a month. Add-ons such as FBR integration, extra shops and a kitchen display cost extra each month. Each POS plan has a 7-day free trial.",
    },
    {
      question: "Is Moneypex FBR integrated?",
      answer:
        "Its FBR page says each invoice is sent to FBR in real time with a QR code customers can check in the Tax Asaan app. FBR integration is a monthly add-on on its POS plans. Its restaurant and retail pages also list PRA integration (checked 5 Nov 2026).",
    },
    {
      question: `Is ${BRAND_NAME} FBR integrated?`,
      answer: `Not yet. The FBR connector is coming soon. ${BRAND_NAME} already records tax on every bill and gives tax reports. PRA, SRB and KPRA links are not built yet.`,
    },
    {
      question: `Is ${BRAND_NAME} free?`,
      answer: `The Light plan is free for 3 months with no card. After that you choose Shop ($29 a month) or Business ($79 a month).`,
    },
    {
      question: `Can I move from Moneypex to ${BRAND_NAME}?`,
      answer:
        "Yes. Send us an Excel or CSV export of your products and customers. Our team loads your products, customers, credit balances and opening stock for free.",
    },
  ],
  sources: [
    { label: "Moneypex Pakistan home page", url: "https://moneypex.com/pk" },
    { label: "Moneypex: restaurant POS", url: "https://moneypex.com/pk/restaurant-pos" },
    { label: "Moneypex: retail POS", url: "https://moneypex.com/pk/retail-pos" },
    { label: "Moneypex: FBR integration", url: "https://moneypex.com/pk/fbr" },
    {
      label: "Moneypex: pharmacy POS",
      url: "https://moneypex.com/pk/pharmacy-management-pos-software",
    },
    {
      label: "Moneypex: mobile shop POS",
      url: "https://moneypex.com/pk/mobile-shop-pos-software",
    },
    { label: "Moneypex: accounting", url: "https://moneypex.com/pk/accounting" },
  ],
  related: ["tajirpoint-vs-oscar", "tajirpoint-vs-hysabone", "tajirpoint-vs-corn-pos"],
};
