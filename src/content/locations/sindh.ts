import type { LocationPage } from "./types";
import {
  FBR_ROW,
  PK_DELIVERY,
  PK_FACT_CURRENCY,
  PK_FACT_LANGUAGE,
  PK_FACT_POWER,
  PK_FAQ_FBR,
  PK_FAQ_WALLETS,
  PK_PAYMENTS,
  PK_TAX_NOTE,
  PROVINCE_CHECKED,
  PROVINCE_UPDATED,
  SRB_ROW,
  SRC_SRB_HOME,
} from "./pk-common";
import { BRAND_NAME } from "@/lib/config/brand";

/**
 * Sindh province page: SRB, and the Sindh cities that have no page of their
 * own (Hyderabad, Sukkur). SRB facts are from SRB's own home page, read
 * 5 Nov 2026. Its Point of Sale page could not be read (certificate error on
 * the site), so nothing from it is stated here.
 */
const page: LocationPage = {
  slug: "sindh",
  kind: "province",
  countryCode: "PK",
  parent: "pakistan",
  name: "Sindh",
  label: { en: "Sindh", ur: "سندھ", ar: "السند" },
  summary: `Sindh's tax on services (SRB), its Point of Sale programme and QR-coded invoices, our honest status, and what ${BRAND_NAME} does for shops in Karachi, Hyderabad and Sukkur.`,
  seo: {
    title: "POS System in Sindh: SRB, FBR and Your Shop",
    description: `POS for Sindh shops and restaurants: SRB's Point of Sale programme and QR-coded invoices, where ${BRAND_NAME} stands (not connected yet), and Hyderabad notes.`,
    keywords: [
      "pos system sindh",
      "srb pos integration",
      "srb restaurant pos",
      "sindh sales tax on services",
      "pos software hyderabad",
    ],
  },
  og: {
    eyebrow: "POS in Sindh",
    title: "POS in Sindh: SRB, FBR and your shop.",
    sub: `SRB's Point of Sale programme, and where ${BRAND_NAME} stands, honestly.`,
    pills: ["SRB", "QR invoices", "Khata", "Offline"],
  },
  hero: {
    eyebrow: "POS system in Sindh",
    headline: "A POS for Sindh, with SRB explained plainly.",
    sub: `Restaurants and other service businesses in Sindh answer to the Sindh Revenue Board as well as FBR. Here is what SRB's Point of Sale programme looks like from the outside, what ${BRAND_NAME} does today (it is not connected to SRB yet), and how it fits shops across the province.`,
  },
  facts: [
    PK_FACT_CURRENCY,
    PK_FACT_LANGUAGE,
    {
      label: "Tax in Sindh",
      value: `Goods: FBR. Services, including restaurants: Sindh Revenue Board (SRB). ${BRAND_NAME} is not connected to SRB.`,
    },
    PK_FACT_POWER,
  ],
  tax: {
    heading: "SRB and FBR: who taxes what in Sindh",
    intro:
      "Sales tax on goods is federal and goes to FBR. Sales tax on services goes to the Sindh Revenue Board (SRB). SRB's own list of taxable services includes services provided by restaurants, by caterers and by marriage halls and lawns.",
    rows: [FBR_ROW, SRB_ROW],
    note: `${BRAND_NAME} records the tax on every bill and gives you tax reports, but it cannot send invoices to SRB or print an SRB QR code today. If SRB has asked your business to link its POS, tell us before you switch. ${PK_TAX_NOTE}`,
  },
  blocks: [PK_PAYMENTS, PK_DELIVERY],
  businesses: {
    heading: `Sindh businesses ${BRAND_NAME} is set up for`,
    items: [
      {
        slug: "restaurants",
        why: "Restaurants and BBQ places: tables, the kitchen screen, a waiter app and split bills.",
      },
      {
        slug: "cloud-kitchens",
        why: "Delivery kitchens: several brands on one order board, a packer screen and the rider app.",
      },
      {
        slug: "distributors-wholesale",
        why: "Wholesalers and distributors: price lists per customer group, van routes and credit limits.",
      },
      {
        slug: "grocery-kiryana",
        why: "Kiryana and general stores: barcode billing, cartons to pieces, and khata for regulars.",
      },
      {
        slug: "pharmacy",
        why: "Medical stores: batches and expiry, first-expiry-first-out, prescription log.",
      },
      {
        slug: "factories-mills",
        why: "Mills and factories: raw material stock, batches and sales to dealers on credit.",
      },
    ],
  },
  sections: [
    {
      id: "srb-pos",
      heading: "SRB's Point of Sale programme",
      paragraphs: [
        "SRB's home page has a Point of Sale (PoS) section with a lucky draw and a restaurant list, an invoice verification link and a PoS support line. It also reports prize draws for customers who verified Sindh Sales Tax invoices by their SRB QR code. In other words, SRB wants customers in Sindh to look for a QR code on their bill, and it rewards them for checking it.",
        `${BRAND_NAME} does not print an SRB QR code or send invoices to SRB. It records the tax on every bill and gives you tax reports, so your adviser has the numbers. Which businesses SRB asks to link their POS, and how, is for SRB or your tax adviser to confirm.`,
      ],
    },
    {
      id: "hyderabad",
      heading: "Hyderabad, Sukkur and the rest of Sindh",
      paragraphs: [
        "Outside Karachi, many businesses are family-run and sell on credit: wholesale and grocery in the old bazaars, sweets and bakery shops, medical stores, and restaurants on the highway and in town. The same SRB and FBR rules apply as in Karachi.",
        "Khata does most of the work here: a credit limit per customer, a list of who has owed you the longest, and statements to send on WhatsApp. Billing carries on through load-shedding and syncs when the line is back.",
      ],
      bullets: [
        "Customer and supplier khata",
        "Credit limits and 30/60/90-day aging",
        "Urdu receipts by default",
        "Offline billing on web, Windows and Android",
      ],
    },
  ],
  cities: {
    heading: "Sindh cities with their own page",
    items: [
      {
        slug: "karachi",
        why: "Wholesalers and distributors, restaurants and delivery kitchens, mobile markets.",
      },
    ],
  },
  faqs: [
    {
      q: `Is ${BRAND_NAME} integrated with SRB?`,
      a: `No, not yet. ${BRAND_NAME} records the tax on every bill and gives you tax reports, but it does not send invoices to the Sindh Revenue Board or print an SRB QR code. If SRB has asked your restaurant to link its POS, talk to us before you switch.`,
    },
    {
      q: "Why do customers in Sindh ask for a QR code on the bill?",
      a: "SRB runs prize draws for customers who verify Sindh Sales Tax invoices by their SRB QR code, and links an invoice verification page from its home page (checked 5 Nov 2026). A bill from a POS that is not linked to SRB will not have that code.",
    },
    {
      q: "Does SRB apply to my shop or only to restaurants?",
      a: "SRB collects sales tax on services in Sindh, and its list of taxable services includes restaurants, caterers and marriage halls. Shops that sell goods deal with FBR for sales tax. Ask SRB or your tax adviser which rules apply to you.",
    },
    PK_FAQ_FBR,
    PK_FAQ_WALLETS,
  ],
  sources: [SRC_SRB_HOME],
  checked: PROVINCE_CHECKED,
  cta: {
    headline: `Run your Sindh shop or restaurant on ${BRAND_NAME}.`,
    sub: "Book a free demo, or start free for 3 months. No card needed, and we move your data for free.",
  },
  related: ["pakistan", "karachi", "punjab", "khyber-pakhtunkhwa"],
  updated: PROVINCE_UPDATED,
};

export default page;
