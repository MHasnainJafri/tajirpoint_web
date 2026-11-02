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
  PK_UPDATED,
  SRB_ROW,
} from "./pk-common";
import { BRAND_NAME } from "@/lib/config/brand";

const page: LocationPage = {
  slug: "karachi",
  kind: "city",
  countryCode: "PK",
  parent: "pakistan",
  name: "Karachi",
  label: { en: "Karachi", ur: "کراچی", ar: "كراتشي" },
  summary:
    "Wholesalers and distributors, restaurants and delivery kitchens, mobile shops and kiryana stores in Karachi; FBR for goods and SRB for services.",
  seo: {
    title: "POS System in Karachi for Shops and Restaurants",
    description: `${BRAND_NAME} POS for Karachi wholesalers, distributors, restaurants and delivery kitchens: price lists, khata, riders, offline billing, an honest SRB note.`,
    keywords: [
      "pos system karachi",
      "pos software karachi",
      "wholesale billing software karachi",
      "restaurant pos karachi",
      "srb restaurant pos",
    ],
  },
  og: {
    eyebrow: "POS system in Karachi",
    title: "A POS for Karachi's wholesalers, kitchens and shops.",
    sub: "Price lists, khata, riders and offline billing, in Urdu or English.",
    pills: ["Wholesale", "Restaurants", "Delivery", "Khata"],
  },
  hero: {
    eyebrow: "POS system in Karachi",
    headline: "A POS for Karachi's wholesalers, kitchens and shops.",
    sub: "Wholesale counters selling by the carton, delivery kitchens running several brands, mobile markets and neighbourhood kiryana stores: billing, stock, khata and delivery in one system that keeps working when the power goes.",
  },
  facts: [
    PK_FACT_CURRENCY,
    PK_FACT_LANGUAGE,
    {
      label: "Tax in Karachi",
      value: `Goods: FBR. Services, including restaurants: Sindh Revenue Board (SRB). ${BRAND_NAME} is not connected to SRB.`,
    },
    PK_FACT_POWER,
  ],
  tax: {
    heading: "FBR and SRB: who taxes what in Karachi",
    intro:
      "Karachi is in Sindh. Sales tax on goods is federal and goes to FBR. Sales tax on services, which includes restaurants, goes to the Sindh Revenue Board.",
    rows: [FBR_ROW, SRB_ROW],
    note: `If you run a restaurant in Karachi, ask SRB or your tax adviser whether you must report each invoice to SRB's system. ${BRAND_NAME} cannot do that today. ${PK_TAX_NOTE}`,
  },
  blocks: [PK_PAYMENTS, PK_DELIVERY],
  businesses: {
    heading: `Karachi businesses ${BRAND_NAME} is set up for`,
    items: [
      {
        slug: "distributors-wholesale",
        why: "Wholesale and distribution from the city's big markets: price lists per customer group, cartons and pieces, van routes, credit limits.",
      },
      {
        slug: "cloud-kitchens",
        why: "Delivery-only kitchens: several brands on one order board, a packer screen and the rider app.",
      },
      {
        slug: "restaurants",
        why: "Restaurants with dine-in, takeaway and delivery from one Order Desk.",
      },
      {
        slug: "electronics-mobile",
        why: "Mobile and electronics shops: IMEI and serial numbers, quotations and credit.",
      },
      {
        slug: "grocery-kiryana",
        why: "Kiryana stores and marts: barcode billing and khata for the neighbourhood.",
      },
      {
        slug: "pharmacy",
        why: "Medical stores: batches and expiry, first-expiry-first-out, prescription log.",
      },
    ],
  },
  sections: [
    {
      id: "wholesale",
      heading: "Wholesale the way it is done here",
      paragraphs: [
        "Buy by the carton and sell by the carton, dozen or piece. Give each customer group its own price list, so a retailer and a walk-in customer never get the same rate by mistake.",
        "Every dealer has a khata with a credit limit, and you can see who has owed you the longest before you hand over more stock.",
      ],
      bullets: [
        "Units of measure with conversions",
        "Price lists for retail and wholesale customers",
        "Quotations",
        "Van sales and day-end route reconciliation",
      ],
    },
    {
      id: "delivery-city",
      heading: "Delivery across a big city",
      paragraphs: [
        "Orders from your website or order page land on the Order Desk. Assign them to your own riders, who see the job, the address and the cash to collect in the rider app, and confirm the drop.",
      ],
    },
  ],
  faqs: [
    {
      q: `Does ${BRAND_NAME} connect to SRB for my Karachi restaurant?`,
      a: `Not yet. ${BRAND_NAME} records the tax on every bill and gives you tax reports, but it does not send invoices to the Sindh Revenue Board. If SRB requires your restaurant to report invoices to its system, talk to us before you switch.`,
    },
    PK_FAQ_FBR,
    {
      q: "Can I keep different prices for wholesale and retail customers?",
      a: "Yes. Make a price list for each customer group, and sell by carton, dozen or piece with the right price for each unit.",
    },
    {
      q: "Can I book TCS, Leopards or PostEx from the POS?",
      a: (status) =>
        `Not yet from inside ${BRAND_NAME}: TCS is ${status("courier-tcs")}, Leopards is ${status("courier-leopards")} and PostEx is ${status("courier-postex")}. Your own riders work today with the rider app.`,
    },
    PK_FAQ_WALLETS,
  ],
  cta: {
    headline: `Run your Karachi business on ${BRAND_NAME}.`,
    sub: "Book a free demo, or start free for 3 months. No card needed, and we move your data for free.",
  },
  related: ["pakistan", "lahore", "islamabad-rawalpindi", "faisalabad"],
  updated: PK_UPDATED,
};

export default page;
