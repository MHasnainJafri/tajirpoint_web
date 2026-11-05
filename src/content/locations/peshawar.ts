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
  PK_FAQ_WALLETS,
  PK_PAYMENTS,
  PK_TAX_NOTE,
  PROVINCE_CHECKED,
  PROVINCE_UPDATED,
  SRC_KPRA_PESHAWAR,
  SRC_KPRA_RIMS,
} from "./pk-common";
import { BRAND_NAME } from "@/lib/config/brand";

/**
 * Peshawar: a city page because it is the one big city under KPRA (SEO audit
 * 4 Nov 2026, content plan item 13). KPRA facts from KPRA's own sites, read
 * 5 Nov 2026.
 */
const page: LocationPage = {
  slug: "peshawar",
  kind: "city",
  countryCode: "PK",
  parent: "khyber-pakhtunkhwa",
  name: "Peshawar",
  label: { en: "Peshawar", ur: "پشاور", ar: "بيشاور" },
  summary:
    "Restaurants and karahi houses, wholesale bazaars, cloth and mobile shops in Peshawar; FBR for goods and KPRA (with its RIMS link for restaurants) for services.",
  seo: {
    title: "POS System in Peshawar for Shops & Restaurants",
    description: `${BRAND_NAME} POS for Peshawar restaurants, wholesale traders and shops: Urdu screens, khata, offline billing and a plain note on KPRA's RIMS for restaurants.`,
    keywords: [
      "pos system peshawar",
      "restaurant pos peshawar",
      "billing software peshawar",
      "kpra rims restaurant",
      "pos software kpk",
    ],
  },
  og: {
    eyebrow: "POS system in Peshawar",
    title: "A POS for Peshawar's restaurants and bazaars.",
    sub: "Billing, stock and khata in Urdu or English, with KPRA explained plainly.",
    pills: ["Restaurants", "Wholesale", "Khata", "Offline"],
  },
  hero: {
    eyebrow: "POS system in Peshawar",
    headline: "A POS for Peshawar's restaurants and bazaars.",
    sub: "From karahi and tikka houses to wholesale counters, cloth shops and mobile markets: one system for billing, stock and khata, in Urdu or English, that keeps billing when the power goes.",
  },
  facts: [
    PK_FACT_CURRENCY,
    PK_FACT_LANGUAGE,
    {
      label: "Tax in Peshawar",
      value: `Goods: FBR. Services, including restaurants: Khyber Pakhtunkhwa Revenue Authority (KPRA). ${BRAND_NAME} is not connected to KPRA.`,
    },
    PK_FACT_POWER,
  ],
  tax: {
    heading: "FBR and KPRA: who taxes what in Peshawar",
    intro:
      "Peshawar is in Khyber Pakhtunkhwa. Sales tax on goods is federal and goes to FBR. Sales tax on services, which includes restaurants, goes to KPRA, which has its own invoice link for restaurant POS systems called RIMS.",
    rows: [FBR_ROW, KPRA_ROW],
    note: `KPRA has visited Peshawar restaurants to link their POS to RIMS (its news of 4 Jan 2023). If you run a restaurant in Peshawar, ask KPRA or your tax adviser whether you must link yours. ${BRAND_NAME} cannot do that today, and we would rather you know now than after you switch. ${PK_TAX_NOTE}`,
  },
  blocks: [PK_PAYMENTS, PK_DELIVERY],
  businesses: {
    heading: `Peshawar businesses ${BRAND_NAME} is set up for`,
    items: [
      {
        slug: "restaurants",
        why: "Karahi, tikka and family restaurants: tables, courses to the kitchen screen, a waiter app and split bills.",
      },
      {
        slug: "distributors-wholesale",
        why: "Wholesale counters in the bazaars: price lists per customer group, cartons and pieces, credit limits.",
      },
      {
        slug: "retail-fashion",
        why: "Cloth, shawl and shoe shops: sizes and colours, barcodes and exchanges.",
      },
      {
        slug: "electronics-mobile",
        why: "Mobile and electronics dealers: IMEI and serial numbers, quotations and credit.",
      },
      {
        slug: "grocery-kiryana",
        why: "Kiryana and dry fruit shops: barcode billing, cartons to pieces, and khata for regulars.",
      },
      {
        slug: "pharmacy",
        why: "Medical stores: batches and expiry, first-expiry-first-out, prescription log.",
      },
    ],
  },
  sections: [
    {
      id: "restaurants",
      heading: "For Peshawar's restaurants",
      paragraphs: [
        "A karahi house at dinner time is loud and fast. Waiters take the order on their phone at the table, the kitchen sees it on a screen, and the counter splits the bill however the table wants. Parcels and delivery orders from your own order page land on the same board, and your own riders take them with the rider app.",
        `On tax, KPRA's RIMS asks for each restaurant invoice to be sent to KPRA with a QR code on the bill. ${BRAND_NAME} is not registered with RIMS. It records the tax on every bill and gives you tax reports, but if KPRA has told your restaurant to link its POS, ${BRAND_NAME} is not the right choice today.`,
      ],
      bullets: [
        "Kitchen display and order board",
        "Waiter app on Android phones",
        "Split by item, by seat, equally or by amount",
        "Your own riders with the rider app",
      ],
    },
    {
      id: "bazaars",
      heading: "Wholesale and the bazaars",
      paragraphs: [
        "A lot of trade in Peshawar's bazaars is between traders, on credit, in cartons and dozens. Price lists let a wholesale buyer and a walk-in customer see different rates for the same item, units of measure keep stock right whether you buy by the carton or sell by the piece, and every trader you deal with has a khata that updates with each sale and payment.",
        "Set a credit limit per customer, see who has owed you the longest, and send statements on WhatsApp instead of chasing in person.",
      ],
    },
  ],
  faqs: [
    {
      q: `Does ${BRAND_NAME} connect to KPRA RIMS for my Peshawar restaurant?`,
      a: `Not yet. ${BRAND_NAME} records the tax on every bill and gives you tax reports, but it is not registered with KPRA's Restaurant Invoice Monitoring System and does not print a KPRA QR code. If KPRA requires your restaurant to link its POS, talk to us before you switch.`,
    },
    PK_FAQ_FBR,
    PK_FAQ_WALLETS,
    {
      q: "Can you set it up for my business in Peshawar?",
      a: "Yes. Setup and training are done over WhatsApp and video call, in Urdu or English, and our team loads your products, customers and khata balances for free.",
    },
    PK_FAQ_URDU,
  ],
  sources: [SRC_KPRA_RIMS, SRC_KPRA_PESHAWAR],
  checked: PROVINCE_CHECKED,
  cta: {
    headline: `Run your Peshawar shop or restaurant on ${BRAND_NAME}.`,
    sub: "Book a free demo, or start free for 3 months. No card needed, and we move your data for free.",
  },
  related: ["khyber-pakhtunkhwa", "pakistan", "islamabad-rawalpindi", "lahore"],
  updated: PROVINCE_UPDATED,
};

export default page;
