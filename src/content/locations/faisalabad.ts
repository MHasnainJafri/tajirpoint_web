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
  PK_UPDATED,
  PRA_ROW,
} from "./pk-common";
import { BRAND_NAME } from "@/lib/config/brand";

const page: LocationPage = {
  slug: "faisalabad",
  kind: "city",
  countryCode: "PK",
  parent: "pakistan",
  name: "Faisalabad",
  label: { en: "Faisalabad", ur: "فیصل آباد", ar: "فيصل آباد" },
  summary:
    "Cloth traders, mills, distributors and shops in Faisalabad: dealer khata, price lists, units of measure, and FBR and PRA explained.",
  seo: {
    title: "POS System in Faisalabad for Shops and Traders",
    description: `${BRAND_NAME} POS for Faisalabad cloth traders, mills, distributors and shops: dealer khata with credit limits, price lists, offline billing, honest FBR notes.`,
    keywords: [
      "pos system faisalabad",
      "billing software faisalabad",
      "cloth shop software faisalabad",
      "wholesale software faisalabad",
      "khata software for traders",
    ],
  },
  og: {
    eyebrow: "POS system in Faisalabad",
    title: "A POS for Faisalabad's traders, mills and markets.",
    sub: "Dealer khata, price lists and stock, in Urdu or English, through load-shedding.",
    pills: ["Traders", "Mills", "Khata", "Offline"],
  },
  hero: {
    eyebrow: "POS system in Faisalabad",
    headline: "A POS for Faisalabad's traders, mills and markets.",
    sub: "Cloth and yarn traders, mills that sell to dealers, distributors and the shops that serve the city: stock in your own units, a khata for every dealer, and billing that carries on through load-shedding.",
  },
  facts: [
    PK_FACT_CURRENCY,
    PK_FACT_LANGUAGE,
    {
      label: "Tax in Faisalabad",
      value: `Goods: FBR. Services: Punjab Revenue Authority (PRA). ${BRAND_NAME} sends invoices to neither yet.`,
    },
    PK_FACT_POWER,
  ],
  tax: {
    heading: "FBR and PRA in Faisalabad",
    intro:
      "Faisalabad is in Punjab. Most trade here is in goods, taxed federally by FBR. Services, including restaurants, go to the Punjab Revenue Authority.",
    rows: [FBR_ROW, PRA_ROW],
    note: `Traders and mills usually care most about FBR. If you sell to registered buyers, keep your NTN and STRN on the invoice: ${BRAND_NAME} prints both. ${PK_TAX_NOTE}`,
  },
  blocks: [PK_PAYMENTS, PK_DELIVERY],
  businesses: {
    heading: `Faisalabad businesses ${BRAND_NAME} is set up for`,
    items: [
      {
        slug: "factories-mills",
        why: "Mills and small factories: raw material stock, batches, and sales to dealers on credit.",
      },
      {
        slug: "distributors-wholesale",
        why: "Wholesalers and distributors: price lists per customer group, van routes and credit control.",
      },
      {
        slug: "retail-fashion",
        why: "Cloth and clothing shops around the bazaars: variants, barcodes and exchanges.",
      },
      {
        slug: "grocery-kiryana",
        why: "Kiryana stores: barcode billing, cartons to pieces, khata for regulars.",
      },
      {
        slug: "transport-delivery",
        why: "Goods transport: routes, drivers, proof of delivery and profit per trip.",
      },
      {
        slug: "furniture-home",
        why: "Furniture and home shops: quotations, variants, credit and delivery.",
      },
    ],
  },
  sections: [
    {
      id: "credit",
      heading: "Credit is how trade works here",
      paragraphs: [
        `Most business between traders, mills and dealers is on credit. ${BRAND_NAME} gives every dealer and supplier a khata that updates with each sale, purchase and payment, so the balance is never a guess.`,
        "Set a credit limit per dealer, see who has owed you the longest, and send statements and reminders. Record cheques as they come in.",
      ],
      bullets: [
        "Customer and supplier khata",
        "Credit limits and aging",
        "Statements and reminders",
        "Cheques and split payments",
      ],
    },
    {
      id: "units",
      heading: "Your units, your prices",
      paragraphs: [
        "Buy in one unit and sell in another. Units of measure with conversions keep stock right, and each unit can carry its own price. Price lists let a dealer and a walk-in customer see different rates for the same item.",
      ],
    },
  ],
  faqs: [
    PK_FAQ_FBR,
    {
      q: "Can I track what each dealer owes me?",
      a: "Yes. Every dealer has a khata that updates with each sale and payment. You can set a credit limit, see who has owed you the longest, and send statements.",
    },
    {
      q: "Can I sell in different units, like cartons and pieces?",
      a: "Yes. Set up units of measure with conversions, give each unit its own price, and stock stays correct whichever unit you buy or sell in.",
    },
    {
      q: `Does ${BRAND_NAME} connect to PRA?`,
      a: `No, not yet. ${BRAND_NAME} records the tax on every bill and gives you tax reports, but does not send invoices to the Punjab Revenue Authority.`,
    },
    PK_FAQ_URDU,
  ],
  cta: {
    headline: `Run your Faisalabad business on ${BRAND_NAME}.`,
    sub: "Book a free demo, or start free for 3 months. No card needed, and we move your data for free.",
  },
  related: ["pakistan", "lahore", "karachi", "islamabad-rawalpindi"],
  updated: PK_UPDATED,
};

export default page;
