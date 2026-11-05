import type { LocationPage } from "./types";
import {
  FBR_ROW,
  KPRA_ROW,
  PK_DELIVERY,
  PK_FACT_CURRENCY,
  PK_FACT_LANGUAGE,
  PK_FACT_POWER,
  PK_FAQ_FBR,
  PK_FAQ_URDU,
  PK_PAYMENTS,
  PK_TAX_NOTE,
  PROVINCE_CHECKED,
  PROVINCE_UPDATED,
  SRC_KPRA_RIMS,
  SRC_KPRA_RMRS,
} from "./pk-common";
import { BRAND_NAME } from "@/lib/config/brand";

/**
 * Khyber Pakhtunkhwa province page: KPRA and its restaurant invoice systems
 * (RIMS for POS software, RMRS devices), and the KP towns with no page of
 * their own. KPRA facts are from KPRA's own sites, read 5 Nov 2026.
 */
const page: LocationPage = {
  slug: "khyber-pakhtunkhwa",
  kind: "province",
  countryCode: "PK",
  parent: "pakistan",
  name: "Khyber Pakhtunkhwa",
  label: { en: "Khyber Pakhtunkhwa", ur: "خیبر پختونخوا", ar: "خيبر بختونخوا" },
  summary: `KPRA and its restaurant invoice link (RIMS) explained, our honest status, and what ${BRAND_NAME} does for shops and restaurants in Peshawar, Mardan, Abbottabad and across KP.`,
  seo: {
    title: "POS System in Khyber Pakhtunkhwa: KPRA & FBR",
    description: `POS for KP shops and restaurants: how KPRA's RIMS invoice link works, where ${BRAND_NAME} stands (not connected yet), and notes for Mardan, Abbottabad and Swat.`,
    keywords: [
      "pos system kpk",
      "kpra pos integration",
      "kpra rims",
      "restaurant pos peshawar",
      "pos software khyber pakhtunkhwa",
    ],
  },
  og: {
    eyebrow: "POS in Khyber Pakhtunkhwa",
    title: "POS in KP: KPRA, FBR and your shop.",
    sub: `How KPRA's RIMS link for restaurants works, and where ${BRAND_NAME} stands.`,
    pills: ["KPRA", "RIMS", "Khata", "Offline"],
  },
  hero: {
    eyebrow: "POS system in Khyber Pakhtunkhwa",
    headline: "A POS for Khyber Pakhtunkhwa, with KPRA explained plainly.",
    sub: `Restaurants in KP answer to the Khyber Pakhtunkhwa Revenue Authority as well as FBR. Here is how KPRA's restaurant invoice link (RIMS) works, what ${BRAND_NAME} does today (it is not connected to KPRA yet), and how it fits shops and traders across the province.`,
  },
  facts: [
    PK_FACT_CURRENCY,
    PK_FACT_LANGUAGE,
    {
      label: "Tax in KP",
      value: `Goods: FBR. Services, including restaurants: Khyber Pakhtunkhwa Revenue Authority (KPRA). ${BRAND_NAME} is not connected to KPRA.`,
    },
    PK_FACT_POWER,
  ],
  tax: {
    heading: "KPRA and FBR: who taxes what in KP",
    intro:
      "Sales tax on goods is federal and goes to FBR. Sales tax on services, which includes restaurants, goes to the Khyber Pakhtunkhwa Revenue Authority (KPRA).",
    rows: [FBR_ROW, KPRA_ROW],
    note: `${BRAND_NAME} records the tax on every bill and gives you tax reports, but it is not registered with KPRA's RIMS and cannot send invoices to KPRA today. If KPRA has asked your restaurant to link its POS, tell us before you switch. ${PK_TAX_NOTE}`,
  },
  blocks: [PK_PAYMENTS, PK_DELIVERY],
  businesses: {
    heading: `KP businesses ${BRAND_NAME} is set up for`,
    items: [
      {
        slug: "restaurants",
        why: "Restaurants and tikka and karahi houses: tables, the kitchen screen, a waiter app and split bills.",
      },
      {
        slug: "distributors-wholesale",
        why: "Wholesale traders: price lists per customer group, cartons and pieces, credit limits.",
      },
      {
        slug: "grocery-kiryana",
        why: "Kiryana and general stores: barcode billing and khata for regulars.",
      },
      {
        slug: "electronics-mobile",
        why: "Mobile and electronics shops: IMEI and serial numbers, quotations and credit.",
      },
      {
        slug: "pharmacy",
        why: "Medical stores: batches and expiry, first-expiry-first-out, prescription log.",
      },
      {
        slug: "retail-fashion",
        why: "Cloth and shoe shops: sizes and colours, barcodes and exchanges.",
      },
    ],
  },
  sections: [
    {
      id: "kpra-rims",
      heading: "How KPRA's restaurant invoice link (RIMS) works",
      paragraphs: [
        "KPRA runs the Restaurant Invoice Monitoring System (RIMS). Its documentation for POS software providers says a restaurant POS sends each invoice to KPRA, and that KPRA requires each invoice to include a QR code customers can scan to check it. The software is registered on KPRA's POS registration portal; once approved, the restaurant is added and gets a POS ID and key, and each invoice is checked against the restaurant's NTN, POS ID and key.",
        "There are two ways to connect. KPRA recommends a small Windows utility on a restaurant PC: the POS hands each invoice to it and it forwards them to KPRA, holding them in a queue while the internet is down. The other way calls KPRA's online service directly, which needs internet for every invoice. KPRA has also handed out its own free RMRS package of tablets, printers and software to restaurants (its April 2023 news names Bannu), with bills customers can check by invoice number on KPRA's website.",
        `${BRAND_NAME} is not registered with RIMS and does not send invoices to KPRA. It records the tax on every bill and gives you tax reports. Which restaurants KPRA asks to link, and from when, is for KPRA or your tax adviser to confirm.`,
      ],
      bullets: [
        "POS software registered on KPRA's portal",
        "A POS ID and key for each restaurant",
        "Each invoice sent to KPRA, with a QR code on the bill",
        "Windows utility queues invoices while offline",
      ],
    },
    {
      id: "towns",
      heading: "Mardan, Abbottabad, Swat and the rest of KP",
      paragraphs: [
        "Outside Peshawar, many shops are family businesses that sell on credit and work through power cuts. The counter keeps billing with no internet and syncs on its own when the line is back, and every customer's khata balance updates with each sale and payment.",
        "Setup and training happen over WhatsApp and video call, in Urdu or English, so it does not matter how far you are from a big city.",
      ],
    },
  ],
  cities: {
    heading: "KP cities with their own page",
    items: [
      {
        slug: "peshawar",
        why: "Restaurants and the wholesale bazaars, with KPRA's RIMS link for restaurants explained.",
      },
    ],
  },
  faqs: [
    {
      q: `Is ${BRAND_NAME} integrated with KPRA?`,
      a: `No, not yet. ${BRAND_NAME} is not registered with KPRA's RIMS and does not send invoices to KPRA. It records the tax on every bill and gives you tax reports. If KPRA has asked your restaurant to link its POS, talk to us before you switch.`,
    },
    {
      q: "What is KPRA RIMS?",
      a: "The Restaurant Invoice Monitoring System. KPRA's documentation says a restaurant's POS sends each invoice to KPRA, each invoice carries a QR code customers can scan, and each restaurant gets a POS ID and key (checked 5 Nov 2026).",
    },
    {
      q: "Does KPRA apply to my shop or only to restaurants?",
      a: "KPRA collects sales tax on services in Khyber Pakhtunkhwa, and restaurants are a service. Shops that sell goods deal with FBR for sales tax. Ask KPRA or your tax adviser which rules apply to you.",
    },
    PK_FAQ_FBR,
    PK_FAQ_URDU,
  ],
  sources: [SRC_KPRA_RIMS, SRC_KPRA_RMRS],
  checked: PROVINCE_CHECKED,
  cta: {
    headline: `Run your KP shop or restaurant on ${BRAND_NAME}.`,
    sub: "Book a free demo, or start free for 3 months. No card needed, and we move your data for free.",
  },
  related: ["pakistan", "peshawar", "punjab", "sindh"],
  updated: PROVINCE_UPDATED,
};

export default page;
