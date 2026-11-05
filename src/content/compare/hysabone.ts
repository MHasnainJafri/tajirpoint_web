import type { Comparison } from "./types";
import { TP } from "./tajirpoint";
import { BRAND_NAME } from "@/lib/config/brand";

/**
 * Tajir Point vs HysabOne (hysabone.com), Pakistani cloud accounting and
 * inventory software with a POS plan, also sold in the UAE and Saudi Arabia.
 *
 * Every fact about HysabOne has a `source` (1-based index into `sources`) and
 * was read on 5 Nov 2026 (NOT the shared CHECKED date of 1 Nov 2026) from
 * hysabone.com. Prices are quoted in HysabOne's own currencies (PKR, AED,
 * SAR), exactly as published. Its pages disagree on offline use (the POS page
 * says it keeps billing offline; the home page FAQ says it needs internet), so
 * both are quoted. Where HysabOne does not publish something, the cell says
 * "not published"; we never write "No" for a competitor.
 */

export const hysabone: Comparison = {
  slug: "tajirpoint-vs-hysabone",
  checked: { label: "5 Nov 2026", iso: "2026-11-05" },
  kind: "competitor",
  otherName: "HysabOne",
  label: `${BRAND_NAME} vs HysabOne`,
  blurb:
    "Accounting-first software with stock and a POS plan, or a POS with restaurant tools, riders and khata built for the counter.",
  audience: "Traders, shops and restaurants in Pakistan",
  seo: {
    title: `${BRAND_NAME} vs HysabOne: POS, Accounts & Price`,
    description: `HysabOne or ${BRAND_NAME}? A fair look at accounting, POS, FBR, offline billing, restaurant tools, khata, Urdu and Gulf VAT, with sources and dates.`,
    keywords: [
      "HysabOne alternative",
      "HysabOne vs",
      "HysabOne price",
      "HysabOne POS",
      "accounting software with POS Pakistan",
      "POS with khata",
    ],
  },
  og: {
    eyebrow: "Compare",
    title: `${BRAND_NAME} vs HysabOne.`,
    sub: "Accounting, POS, FBR, restaurants and khata, compared fairly with sources.",
    pills: ["Restaurants", "Riders", "Khata", "Urdu"],
  },
  hero: {
    eyebrow: `${BRAND_NAME} vs HysabOne`,
    h1: `${BRAND_NAME} vs HysabOne: which one fits your business?`,
    sub: `HysabOne is accounting and inventory software first, with a POS plan, an Urdu interface and FBR IRIS posting. ${BRAND_NAME} is a POS first, with restaurant tools, your own riders and a full khata. Here is where each one is stronger.`,
  },
  verdict: {
    tajirpoint: `Choose ${BRAND_NAME} if you run a restaurant, café or cloud kitchen, deliver with your own riders, sell at a busy counter on Android phones or a Windows PC, or want a khata with credit limits and statements built into the till.`,
    other:
      "Choose HysabOne if your main need is the books: double-entry accounting with stock, unlimited users and branches, FBR IRIS posting from inside the books, payroll and attendance, or a business in the UAE or Saudi Arabia that needs VAT or ZATCA invoices.",
  },
  tajirpointStrengths: [
    "Restaurant tools: tables, a waiter app, a kitchen display per station and recipes that deduct ingredients as you sell.",
    "A rider app for your own riders, with jobs, navigation, proof of delivery and rider cash per shift.",
    "Your own online order page for delivery, pickup and dine-in, with no commission to an app (Shop plan and above).",
    "Khata built into the till: credit limits, 30/60/90-day aging, reminders and PDF statements.",
    "The counter keeps selling offline on the web, Windows and Android, and syncs on its own.",
    "App and receipts in Urdu and Arabic, with right-to-left screens, plus a Windows desktop app.",
  ],
  otherStrengths: [
    `Accounting first: double-entry ledgers, trial balance, bank reconciliation, P&L and balance sheet are in every plan. ${BRAND_NAME}'s accounting is an add-on.`,
    "Unlimited users and branches on its plans, with multi-store stock transfers.",
    `FBR posting today: an FBR Posting screen sends invoices to FBR IRIS from inside the books. ${BRAND_NAME}'s FBR connector is coming soon.`,
    `The Gulf: UAE pages offer VAT invoices and FTA-ready VAT reports from AED 150 a month, and Saudi pages say it is ready for ZATCA FATOORA Phase 2 e-invoices from SAR 200 a month. ${BRAND_NAME} has not built UAE e-invoicing or ZATCA e-invoices.`,
    `An iPhone app as well as Android for the dashboard and reports. ${BRAND_NAME}'s iOS app is coming soon.`,
    "Payroll and attendance, fixed assets and WhatsApp invoices and ledgers.",
  ],
  rows: [
    {
      feature: "Price to start",
      tajirpoint: TP.freeStart,
      other: {
        mark: "info",
        text: "14-day free trial, no card. Accounts from PKR 3,499 a month; Standard from PKR 7,000 a month.",
        source: 2,
      },
    },
    {
      feature: "POS plan",
      tajirpoint: {
        mark: "info",
        text: "Shop $29 a month or Business $79 a month after the free 3 months.",
        href: "/pricing",
      },
      other: {
        mark: "info",
        text: "HysabOne POS from PKR 6,563 a month billed yearly, no setup fee, unlimited users.",
        source: 3,
      },
    },
    {
      feature: "Accounting",
      tajirpoint: TP.accounting,
      other: {
        mark: "yes",
        text: "Built in: chart of accounts, ledgers, journals, trial balance, bank reconciliation, P&L, balance sheet.",
        source: 4,
      },
    },
    {
      feature: "Stock",
      tajirpoint: TP.stock,
      other: {
        mark: "yes",
        text: "Several warehouses, batch and serial tracking, transfers and low-stock alerts.",
        source: 4,
      },
    },
    {
      feature: "FBR (federal sales tax)",
      tajirpoint: TP.fbr,
      other: {
        mark: "yes",
        text: "An FBR Posting screen posts invoices to FBR IRIS from inside the books.",
        source: 1,
      },
    },
    {
      feature: "PRA, SRB, KPRA (provincial)",
      tajirpoint: TP.provincialTax,
      other: {
        mark: "info",
        text: "PRA, SRB and KPRA links are not published.",
        source: 1,
      },
    },
    {
      feature: "Works offline",
      tajirpoint: TP.offlineShop,
      other: {
        mark: "partial",
        text: "Its POS page says billing keeps going in an outage and syncs later. Its home page FAQ says it needs internet.",
        source: 3,
      },
    },
    {
      feature: "Restaurant service",
      tajirpoint: {
        mark: "yes",
        text: "Tables, waiter app, kitchen display and recipes that deduct ingredients as you sell.",
        href: "/business/restaurants",
      },
      other: {
        mark: "info",
        text: "Its catering page covers event orders, menu costing and ingredient stock. Tables and a kitchen display are not published.",
        source: 5,
      },
    },
    {
      feature: "Own riders",
      tajirpoint: TP.riders,
      other: {
        mark: "info",
        text: "A rider or delivery app is not published.",
        source: 1,
      },
    },
    {
      feature: "Customer credit (khata)",
      tajirpoint: TP.khata,
      other: {
        mark: "yes",
        text: "Customer udhaar, payments and balances, with WhatsApp reminders.",
        source: 3,
      },
    },
    {
      feature: "More than one branch",
      tajirpoint: TP.multiBranch,
      other: {
        mark: "yes",
        text: "Unlimited users and branches; multi-store stock transfers on Standard and POS.",
        source: 2,
      },
    },
    {
      feature: "Devices",
      tajirpoint: TP.devices,
      other: {
        mark: "info",
        text: "Web browser, plus iPhone and Android apps for the dashboard, daily activity and reports.",
        source: 1,
      },
    },
    {
      feature: "Languages",
      tajirpoint: TP.languages,
      other: {
        mark: "yes",
        text: "Urdu or English interface; tutorial videos in Urdu/Hindi.",
        source: 1,
      },
    },
    {
      feature: "Moving your data",
      tajirpoint: TP.migration,
      other: {
        mark: "yes",
        text: "Excel import, and free help moving from other software.",
        source: 1,
      },
    },
    {
      feature: "UAE VAT",
      tajirpoint: {
        mark: "partial",
        text: "Works in dirhams with your own VAT rate and tax on every bill. UAE e-invoicing is not built.",
        href: "/pos",
      },
      other: {
        mark: "yes",
        text: "VAT invoices and VAT return reports for the FTA, from AED 150 a month.",
        source: 6,
      },
    },
    {
      feature: "Saudi Arabia (ZATCA)",
      tajirpoint: TP.zatca,
      other: {
        mark: "yes",
        text: "Says it is ready for ZATCA FATOORA Phase 2 e-invoices with QR codes, from SAR 200 a month.",
        source: 7,
      },
    },
  ],
  sections: [
    {
      heading: "Books first, or the counter first",
      paragraphs: [
        "HysabOne calls itself accounting software for traders, retailers and wholesalers. Every plan has double-entry books, and its Standard plan adds inventory, quotations, sales orders and multi-store transfers. The POS plan adds barcode billing, cashier management, loyalty and offline mode on top.",
        `${BRAND_NAME} starts at the counter: fast billing, stock, khata, and for restaurants the tables, kitchen and riders. Double-entry books are an add-on that posts from every sale and purchase. If your accountant lives in the ledgers, HysabOne may suit you better; if your day is spent at the till or on the restaurant floor, ${BRAND_NAME} is built for that.`,
      ],
    },
    {
      heading: "FBR and provincial tax",
      paragraphs: [
        "HysabOne's home page shows an FBR Posting screen that posts invoices to FBR IRIS from inside the books, and its POS page says sales-tax records are FBR-ready. Its pages do not mention PRA, SRB or KPRA, so ask HysabOne if you run a restaurant or another service business.",
        `${BRAND_NAME}'s FBR connector is coming soon and the PRA, SRB and KPRA links are not built yet. ${BRAND_NAME} already records tax on every bill and gives tax reports. Ask any vendor, us included, to show a live receipt with the FBR invoice number and QR code.`,
      ],
    },
    {
      heading: "Restaurants",
      paragraphs: [
        `HysabOne's catering page is written for wedding caterers, event managers and party organisers: event orders, menu costing, ingredient stock and vendor payments. Its pages do not describe table service, a kitchen display or a rider app. ${BRAND_NAME} has all three, plus recipes that deduct ingredients as you sell and your own online order page.`,
      ],
    },
    {
      heading: "Offline and internet",
      paragraphs: [
        `HysabOne's POS page says the counter keeps billing during an internet outage and syncs later, and its pricing page lists offline mode in the POS plan. Its home page FAQ says HysabOne requires an internet connection. Ask them which applies to your setup, and test it in a demo by switching the Wi-Fi off. ${BRAND_NAME}'s counter keeps selling offline on the web, Windows and Android.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How much does HysabOne cost?",
      answer:
        "On its pricing page (checked 5 Nov 2026), HysabOne Accounts starts from PKR 3,499 a month and Standard from PKR 7,000 a month. Its POS page says HysabOne POS starts from PKR 6,563 a month billed yearly. There is a 14-day free trial with no card, and no setup fee.",
    },
    {
      question: "Does HysabOne work offline?",
      answer:
        "Its POS page says billing keeps going during an internet outage and syncs later, but its home page FAQ says HysabOne requires an internet connection (checked 5 Nov 2026). Ask HysabOne which applies to you.",
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
      question: `Can I move from HysabOne to ${BRAND_NAME}?`,
      answer:
        "Yes. Send us an Excel or CSV export of your products and customers. Our team loads your products, customers, credit balances and opening stock for free.",
    },
  ],
  sources: [
    { label: "HysabOne home page", url: "https://hysabone.com/" },
    { label: "HysabOne pricing", url: "https://hysabone.com/pricing/" },
    {
      label: "HysabOne: POS and retail billing software",
      url: "https://hysabone.com/pos-software-pakistan/",
    },
    { label: "HysabOne features", url: "https://hysabone.com/features/" },
    { label: "HysabOne: catering", url: "https://hysabone.com/industries/catering/" },
    { label: "HysabOne UAE", url: "https://hysabone.com/ae/" },
    { label: "HysabOne Saudi Arabia", url: "https://hysabone.com/sa/" },
  ],
  related: ["tajirpoint-vs-moneypex", "tajirpoint-vs-oscar", "tajirpoint-vs-paper-khata"],
};
