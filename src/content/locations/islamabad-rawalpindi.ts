import type { LocationPage } from "./types";
import {
  FBR_ROW,
  PK_FACT_CURRENCY,
  PK_FACT_LANGUAGE,
  PK_FACT_POWER,
  PK_FAQ_FBR,
  PK_FAQ_URDU,
  PK_FAQ_WALLETS,
  PK_PAYMENTS,
  PK_TAX_NOTE,
  PK_UPDATED,
  PRA_ROW,
} from "./pk-common";
import { BRAND_NAME } from "@/lib/config/brand";

const page: LocationPage = {
  slug: "islamabad-rawalpindi",
  kind: "city",
  countryCode: "PK",
  parent: "pakistan",
  name: "Islamabad and Rawalpindi",
  label: {
    en: "Islamabad & Rawalpindi",
    ur: "اسلام آباد اور راولپنڈی",
    ar: "إسلام آباد وراولبندي",
  },
  summary:
    "Cafés, restaurants and shops in the twin cities, where services are taxed by FBR in Islamabad but by PRA in Rawalpindi.",
  seo: {
    title: "POS System in Islamabad and Rawalpindi",
    description: `${BRAND_NAME} POS for cafés, restaurants and shops in Islamabad and Rawalpindi: one system for both cities, Urdu screens, khata, offline billing, honest tax notes.`,
    keywords: [
      "pos system islamabad",
      "pos system rawalpindi",
      "restaurant pos islamabad",
      "cafe pos islamabad",
      "billing software rawalpindi",
    ],
  },
  og: {
    eyebrow: "POS in Islamabad & Rawalpindi",
    title: "One POS for both sides of the twin cities.",
    sub: "Cafés, restaurants and shops: billing, stock and khata, in Urdu or English.",
    pills: ["Cafés", "Restaurants", "Retail", "Branches"],
  },
  hero: {
    eyebrow: "POS system in Islamabad and Rawalpindi",
    headline: "One POS for both sides of the twin cities.",
    sub: "Cafés and restaurants in Islamabad's markets, retail and wholesale in Rawalpindi's bazaars. One system for both, with a clear answer on which tax authority applies on which side of the line.",
  },
  facts: [
    PK_FACT_CURRENCY,
    PK_FACT_LANGUAGE,
    {
      label: "Tax here",
      value: `Goods: FBR in both cities. Services: FBR in Islamabad, PRA in Rawalpindi. ${BRAND_NAME} sends invoices to neither yet.`,
    },
    PK_FACT_POWER,
  ],
  tax: {
    heading: "Two cities, two answers for services tax",
    intro:
      "Goods are taxed by FBR on both sides. Services are different: in the Islamabad Capital Territory, sales tax on services is collected by FBR, while Rawalpindi is in Punjab, so services there go to the Punjab Revenue Authority.",
    rows: [
      FBR_ROW,
      {
        short: "FBR (ICT)",
        name: "FBR, Islamabad Capital Territory services",
        covers: "Sales tax on services in Islamabad, including restaurants and cafés.",
        ours: { tone: "no", label: "Not connected" },
        note: `${BRAND_NAME} records the tax on each bill and gives you tax reports, but does not report service invoices to FBR.`,
      },
      {
        ...PRA_ROW,
        covers: "Sales tax on services in Rawalpindi (Punjab), including restaurants.",
      },
    ],
    note: `A café in F-7 and a branch in Saddar, Rawalpindi can fall under different authorities. Ask your tax adviser which applies to each branch, and tell us during setup so the right tax rates go on your menu. ${PK_TAX_NOTE}`,
  },
  blocks: [PK_PAYMENTS],
  businesses: {
    heading: `Twin-city businesses ${BRAND_NAME} is set up for`,
    items: [
      {
        slug: "cafes-bakeries",
        why: "Cafés and bakeries: a fast counter, add-ons on each item, loyalty and pre-orders.",
      },
      {
        slug: "restaurants",
        why: "Restaurants: tables, kitchen screen, waiter app, delivery with your own riders.",
      },
      {
        slug: "retail-fashion",
        why: "Clothing and shoe shops: sizes and colours, barcodes and exchanges.",
      },
      {
        slug: "grocery-kiryana",
        why: "Kiryana stores and marts in Rawalpindi's bazaars and Islamabad's sectors: barcode billing and khata.",
      },
      {
        slug: "pharmacy",
        why: "Medical stores: batches and expiry, first-expiry-first-out, prescription log.",
      },
      {
        slug: "salons-services",
        why: "Salons: services and products at one counter, client history and loyalty.",
      },
    ],
  },
  sections: [
    {
      id: "branches",
      heading: "A branch in each city",
      paragraphs: [
        `Many businesses here have a branch on each side. In ${BRAND_NAME} each branch keeps its own stock, sales and staff, and the owner sees every branch from one login. Move stock between branches when one runs short.`,
      ],
      bullets: [
        "Each branch with its own stock and till",
        "Owner dashboard across all branches",
        "Stock transfers between branches",
      ],
    },
    {
      id: "cafes",
      heading: "Cafés with a queue at the counter",
      paragraphs: [
        "A café counter has seconds per order. Items with sizes and add-ons, loyalty for regulars, and orders that go straight to the barista or kitchen screen keep the queue moving.",
      ],
    },
  ],
  faqs: [
    {
      q: "My café is in Islamabad and my second branch is in Rawalpindi. Which tax authority applies?",
      a: `Usually FBR for services in Islamabad and PRA for services in Rawalpindi, and FBR for goods in both. Confirm with your tax adviser. ${BRAND_NAME} records the tax on each bill in both branches, but does not report invoices to FBR or PRA yet.`,
    },
    PK_FAQ_FBR,
    {
      q: "Can one owner account run both branches?",
      a: "Yes. Each branch has its own stock, till and staff, and the owner sees sales and stock for every branch from one login.",
    },
    PK_FAQ_WALLETS,
    PK_FAQ_URDU,
  ],
  cta: {
    headline: `Run your twin-city business on ${BRAND_NAME}.`,
    sub: "Book a free demo, or start free for 3 months. No card needed, and we move your data for free.",
  },
  related: ["pakistan", "punjab", "lahore", "karachi", "peshawar", "faisalabad"],
  updated: PK_UPDATED,
};

export default page;
