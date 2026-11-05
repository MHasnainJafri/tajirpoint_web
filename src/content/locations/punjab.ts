import type { LocationPage } from "./types";
import {
  FBR_ROW,
  PK_DELIVERY,
  PK_FACT_CURRENCY,
  PK_FACT_LANGUAGE,
  PK_FACT_POWER,
  PK_FAQ_FBR,
  PK_FAQ_URDU,
  PK_PAYMENTS,
  PK_TAX_NOTE,
  PRA_ROW,
  PROVINCE_CHECKED,
  PROVINCE_UPDATED,
  SRC_PRA_EIMS,
  SRC_PRA_FISCAL_DEVICE,
  SRC_PRA_HOME,
} from "./pk-common";
import { BRAND_NAME } from "@/lib/config/brand";

/**
 * Punjab province page: PRA, and the Punjab cities that have no page of their
 * own (Multan, Gujranwala). PRA facts are from PRA's own site and its
 * software fiscal device specification (v1.2), read 5 Nov 2026.
 */
const page: LocationPage = {
  slug: "punjab",
  kind: "province",
  countryCode: "PK",
  parent: "pakistan",
  name: "Punjab",
  label: { en: "Punjab", ur: "پنجاب", ar: "البنجاب" },
  summary: `Punjab's tax on services (PRA) and its e-IMS invoice link explained, our honest status, and what ${BRAND_NAME} does for shops in Lahore, Faisalabad, Sialkot, Multan and Gujranwala.`,
  seo: {
    title: "POS System in Punjab: PRA, FBR and Your Shop",
    description: `POS for Punjab shops and restaurants: how PRA's e-IMS invoice link works, where ${BRAND_NAME} stands (not connected yet), and notes for Multan and Gujranwala.`,
    keywords: [
      "pos system punjab",
      "pra pos integration",
      "pra e-ims",
      "pra restaurant pos",
      "pos software multan",
      "pos software gujranwala",
    ],
  },
  og: {
    eyebrow: "POS in Punjab",
    title: "POS in Punjab: PRA, FBR and your shop.",
    sub: `How PRA's invoice link works, and where ${BRAND_NAME} stands, honestly.`,
    pills: ["PRA", "e-IMS", "Khata", "Offline"],
  },
  hero: {
    eyebrow: "POS system in Punjab",
    headline: "A POS for Punjab, with PRA explained plainly.",
    sub: `Restaurants and other service businesses in Punjab answer to the Punjab Revenue Authority as well as FBR. Here is how PRA's invoice link works, what ${BRAND_NAME} does today (it is not connected to PRA yet), and how it fits shops and traders across the province.`,
  },
  facts: [
    PK_FACT_CURRENCY,
    PK_FACT_LANGUAGE,
    {
      label: "Tax in Punjab",
      value: `Goods: FBR. Services, including restaurants: Punjab Revenue Authority (PRA). ${BRAND_NAME} is not connected to PRA.`,
    },
    PK_FACT_POWER,
  ],
  tax: {
    heading: "PRA and FBR: who taxes what in Punjab",
    intro:
      "Sales tax on goods is federal and goes to FBR. Sales tax on services, which includes restaurants, goes to the Punjab Revenue Authority (PRA). Islamabad is not part of Punjab: services there are taxed by FBR.",
    rows: [FBR_ROW, PRA_ROW],
    note: `${BRAND_NAME} records the tax on every bill and gives you tax reports, but it cannot send invoices to PRA's e-IMS today. If PRA has asked your business to link its POS, tell us before you switch. ${PK_TAX_NOTE}`,
  },
  blocks: [PK_PAYMENTS, PK_DELIVERY],
  businesses: {
    heading: `Punjab businesses ${BRAND_NAME} is set up for`,
    items: [
      {
        slug: "restaurants",
        why: "Restaurants and dhabas: tables, the kitchen screen, a waiter app and split bills.",
      },
      {
        slug: "grocery-kiryana",
        why: "Kiryana and general stores: barcode billing, cartons to pieces, and khata for regulars.",
      },
      {
        slug: "distributors-wholesale",
        why: "Wholesale markets and distributors: price lists per customer group, van routes and credit limits.",
      },
      {
        slug: "factories-mills",
        why: "Mills and workshops: raw material stock, batches and sales to dealers on credit.",
      },
      {
        slug: "electronics-mobile",
        why: "Mobile and appliance shops: IMEI and serial numbers, quotations and credit.",
      },
      {
        slug: "pharmacy",
        why: "Medical stores: batches and expiry, first-expiry-first-out, prescription log.",
      },
    ],
  },
  sections: [
    {
      id: "pra-eims",
      heading: "How PRA's invoice link (e-IMS) works",
      paragraphs: [
        "PRA's site offers e-IMS services and a technical guide for linking a POS. The guide, published by PRA's technology partner PRAL, describes a software fiscal device: a small program installed on the same computer as the POS. Each bill goes to it in real time, it returns a fiscal invoice number, and the POS prints that number with a QR code on the receipt. The fiscal device then sends the recorded invoices to PRA's online system in the background.",
        "Before that, each POS is registered on PRA's portal, branch by branch. PRA's e-IMS page also lets anyone look up an invoice by its number.",
        `${BRAND_NAME} does not do any of this yet. It records the tax on every bill and gives you tax reports, so your adviser has the numbers, but it does not print a PRA fiscal invoice number or send invoices to PRA. Which businesses PRA asks to link, and from when, is for PRA or your tax adviser to confirm.`,
      ],
      bullets: [
        "Register each POS, per branch, on PRA's portal",
        "Fiscal device on the POS computer returns a fiscal invoice number",
        "Fiscal invoice number and QR code printed on the receipt",
        "Invoices sent on to PRA's online system",
      ],
    },
    {
      id: "multan",
      heading: "Multan and south Punjab",
      paragraphs: [
        "Multan's trade leans towards agricultural inputs and wholesale: seed, fertiliser and spray dealers, grain and cloth traders, and the shops that serve them. Much of it is sold on credit. A khata per farmer or dealer with a credit limit and 30/60/90-day aging shows who has owed you the longest, and statements on WhatsApp save the walk to collect.",
        "Units of measure let you buy by the bag or carton and sell by the kilo or piece without breaking the stock count.",
      ],
    },
    {
      id: "gujranwala",
      heading: "Gujranwala and the GT Road towns",
      paragraphs: [
        "Gujranwala mixes small manufacturers and dealers with a busy food trade. Workshops that sell to dealers need price lists, batches and credit limits; restaurants need the order to reach the kitchen once and the bill to split cleanly. Both run on the same system, in Urdu or English.",
      ],
    },
  ],
  cities: {
    heading: "Punjab cities with their own page",
    intro:
      "These cities have a page of their own because their trade is different. Rawalpindi is covered with Islamabad, since the twin cities answer to different tax authorities for services.",
    items: [
      {
        slug: "lahore",
        why: "Restaurants and cafés, clothing markets and electronics dealers.",
      },
      {
        slug: "faisalabad",
        why: "Cloth and yarn traders, mills and distributors, all on dealer credit.",
      },
      {
        slug: "sialkot",
        why: "Export makers, their workshops and suppliers, and the city's shops.",
      },
      {
        slug: "islamabad-rawalpindi",
        why: "Two cities, two services-tax answers: FBR in Islamabad, PRA in Rawalpindi.",
      },
    ],
  },
  faqs: [
    {
      q: `Is ${BRAND_NAME} integrated with PRA?`,
      a: `No, not yet. ${BRAND_NAME} records the tax on every bill and gives you tax reports, but it does not connect to PRA's e-IMS, print a PRA fiscal invoice number or send invoices to PRA. If PRA has asked your business to link its POS, talk to us before you switch.`,
    },
    {
      q: "What does a PRA-linked POS print on the receipt?",
      a: "PRA's technical guide says the fiscal device returns a fiscal invoice number for each bill, and the POS prints that number with a QR code on the receipt. PRA's e-IMS page lets anyone look up an invoice by number (checked 5 Nov 2026).",
    },
    {
      q: "Does PRA apply to my shop or only to restaurants?",
      a: "PRA collects sales tax on services in Punjab, and restaurants are a service. Shops that sell goods deal with FBR for sales tax. Many businesses do both, so ask PRA or your tax adviser which rules apply to you.",
    },
    PK_FAQ_FBR,
    PK_FAQ_URDU,
  ],
  sources: [SRC_PRA_HOME, SRC_PRA_FISCAL_DEVICE, SRC_PRA_EIMS],
  checked: PROVINCE_CHECKED,
  cta: {
    headline: `Run your Punjab shop or restaurant on ${BRAND_NAME}.`,
    sub: "Book a free demo, or start free for 3 months. No card needed, and we move your data for free.",
  },
  related: ["pakistan", "lahore", "faisalabad", "sialkot", "islamabad-rawalpindi", "sindh"],
  updated: PROVINCE_UPDATED,
};

export default page;
