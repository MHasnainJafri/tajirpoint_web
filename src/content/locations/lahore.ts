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
  slug: "lahore",
  kind: "city",
  countryCode: "PK",
  parent: "pakistan",
  name: "Lahore",
  label: { en: "Lahore", ur: "لاہور", ar: "لاهور" },
  summary:
    "Restaurants and cafés, clothing shops and electronics dealers in Lahore; FBR for goods and PRA for services, with our honest status for each.",
  seo: {
    title: "POS System in Lahore for Shops and Restaurants",
    description: `${BRAND_NAME} POS for Lahore restaurants, cafés, clothing shops and electronics dealers: Urdu screens, khata, offline billing and an honest note on PRA.`,
    keywords: [
      "pos system lahore",
      "restaurant pos lahore",
      "pos software lahore",
      "billing software lahore",
      "pra restaurant pos",
    ],
  },
  og: {
    eyebrow: "POS system in Lahore",
    title: "A POS for Lahore's restaurants, cafés and markets.",
    sub: "Billing, stock and khata in Urdu or English, through load-shedding.",
    pills: ["Restaurants", "Fashion", "Electronics", "Offline"],
  },
  hero: {
    eyebrow: "POS system in Lahore",
    headline: "A POS for Lahore's restaurants, cafés and busy markets.",
    sub: "From dine-in halls and food-street kitchens to clothing shops and electronics dealers: one system for billing, stock and khata, in Urdu or English, that keeps billing when the power or the internet goes.",
  },
  facts: [
    PK_FACT_CURRENCY,
    PK_FACT_LANGUAGE,
    {
      label: "Tax in Lahore",
      value: `Goods: FBR. Services, including restaurants: Punjab Revenue Authority (PRA). ${BRAND_NAME} is not connected to PRA.`,
    },
    PK_FACT_POWER,
  ],
  tax: {
    heading: "FBR and PRA: who taxes what in Lahore",
    intro:
      "Lahore is in Punjab. Sales tax on goods is federal and goes to FBR. Sales tax on services, which includes restaurants and cafés, goes to the Punjab Revenue Authority.",
    rows: [FBR_ROW, PRA_ROW],
    note: `If you run a restaurant or café in Lahore, ask PRA or your tax adviser whether you must report each invoice to PRA's system. ${BRAND_NAME} cannot do that today, and we would rather you know now than after you switch. ${PK_TAX_NOTE}`,
  },
  blocks: [PK_PAYMENTS],
  businesses: {
    heading: `Lahore businesses ${BRAND_NAME} is set up for`,
    items: [
      {
        slug: "restaurants",
        why: "Dine-in halls and family restaurants: floor plan and tables, courses to the kitchen screen, waiter app, split bills.",
      },
      {
        slug: "cafes-bakeries",
        why: "Cafés and bakeries: a fast counter, add-ons on each item, loyalty and pre-orders for cakes.",
      },
      {
        slug: "retail-fashion",
        why: "Clothing, lawn and shoe shops in markets like Liberty and Anarkali: sizes and colours, barcodes, exchanges.",
      },
      {
        slug: "electronics-mobile",
        why: "Mobile and laptop dealers of the Hall Road kind: IMEI and serial numbers, quotations and credit.",
      },
      {
        slug: "pharmacy",
        why: "Medical stores: batches and expiry, first-expiry-first-out, prescription log.",
      },
      {
        slug: "grocery-kiryana",
        why: "Kiryana stores: barcode billing, cartons to pieces, and khata for regulars.",
      },
    ],
  },
  sections: [
    {
      id: "restaurants",
      heading: "For Lahore's food trade",
      paragraphs: [
        "A busy dinner service needs the order to reach the kitchen once, correctly. Waiters take orders on their phone at the table, the kitchen sees them on a screen in the right course, and the counter splits the bill however the table wants.",
        "Delivery orders from your own website or order page land on the Order Desk next to dine-in, and your own riders take them with the rider app.",
      ],
      bullets: [
        "Kitchen display and order board",
        "Table QR ordering and waiter calls",
        "Split by item, by seat, equally or by amount",
      ],
    },
    {
      id: "branches",
      heading: "More than one branch",
      paragraphs: [
        "Each branch keeps its own stock and sales, and the owner sees all of them in one place, from the phone. Move stock between branches instead of buying twice.",
      ],
    },
  ],
  faqs: [
    {
      q: `Does ${BRAND_NAME} connect to PRA for my Lahore restaurant?`,
      a: `Not yet. ${BRAND_NAME} records the tax on every bill and gives you tax reports, but it does not send invoices to the Punjab Revenue Authority. If PRA requires your restaurant to report invoices to its system, talk to us before you switch.`,
    },
    PK_FAQ_FBR,
    PK_FAQ_WALLETS,
    {
      q: "Can you set it up for my shop in Lahore?",
      a: "Yes. Setup and training are done over WhatsApp and video call, in Urdu or English, and our team loads your products, customers and khata balances for free.",
    },
    PK_FAQ_URDU,
  ],
  cta: {
    headline: `Run your Lahore shop or restaurant on ${BRAND_NAME}.`,
    sub: "Book a free demo, or start free for 3 months. No card needed, and we move your data for free.",
  },
  related: ["pakistan", "islamabad-rawalpindi", "faisalabad", "karachi"],
  updated: PK_UPDATED,
};

export default page;
