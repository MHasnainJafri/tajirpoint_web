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
  SRC_PRA_HOME,
} from "./pk-common";
import { BRAND_NAME } from "@/lib/config/brand";

/**
 * Sialkot: a city page because its trade is different (SEO audit 4 Nov 2026,
 * content plan item 13): export makers and the workshops and suppliers around
 * them. Honest about what Tajir Point does not do for exporters (production
 * planning, export paperwork), in line with the factories page FAQ.
 */
const page: LocationPage = {
  slug: "sialkot",
  kind: "city",
  countryCode: "PK",
  parent: "punjab",
  name: "Sialkot",
  label: { en: "Sialkot", ur: "سیالکوٹ", ar: "سيالكوت" },
  summary:
    "Export makers, their workshops and raw material suppliers, and the shops of Sialkot: purchasing, stock by batch, supplier and dealer khata, books, and honest limits.",
  seo: {
    title: "POS System in Sialkot: Factories and Traders",
    description: `${BRAND_NAME} for Sialkot makers, suppliers and shops: raw material buying, stock by batch, supplier and dealer khata, books, and what we do not do for exporters.`,
    keywords: [
      "pos system sialkot",
      "billing software sialkot",
      "inventory software sialkot",
      "factory software sialkot",
      "khata software for traders",
    ],
  },
  og: {
    eyebrow: "POS system in Sialkot",
    title: "Stock, suppliers and khata for Sialkot's makers.",
    sub: "Raw material buying, batches, dealer credit and books, in Urdu or English.",
    pills: ["Factories", "Suppliers", "Khata", "Books"],
  },
  hero: {
    eyebrow: "POS system in Sialkot",
    headline: "Stock, suppliers and khata for Sialkot's makers and shops.",
    sub: "Sports goods, surgical instruments, leather and gloves: Sialkot's makers depend on a web of workshops and raw material suppliers, much of it on credit. One system keeps the buying, the stock, every supplier's and dealer's balance and the books in step, in Urdu or English.",
  },
  facts: [
    PK_FACT_CURRENCY,
    PK_FACT_LANGUAGE,
    {
      label: "Tax in Sialkot",
      value: `Goods: FBR. Services: Punjab Revenue Authority (PRA). ${BRAND_NAME} sends invoices to neither yet.`,
    },
    PK_FACT_POWER,
  ],
  tax: {
    heading: "FBR and PRA in Sialkot",
    intro:
      "Sialkot is in Punjab. Most trade here is in goods, taxed federally by FBR. Services, including restaurants, go to the Punjab Revenue Authority.",
    rows: [FBR_ROW, PRA_ROW],
    note: `Export sales and their sales-tax treatment are FBR matters with their own rules, so ask your tax adviser. If you sell to registered buyers at home, keep your NTN and STRN on the invoice: ${BRAND_NAME} prints both. ${PK_TAX_NOTE}`,
  },
  blocks: [PK_PAYMENTS, PK_DELIVERY],
  businesses: {
    heading: `Sialkot businesses ${BRAND_NAME} is set up for`,
    items: [
      {
        slug: "factories-mills",
        why: "Makers and workshops: raw material purchasing, stock by warehouse and batch, sales to dealers on credit.",
      },
      {
        slug: "distributors-wholesale",
        why: "Raw material and accessory suppliers: price lists per customer group, cartons and dozens, credit limits.",
      },
      {
        slug: "transport-delivery",
        why: "Goods transport: routes, drivers, proof of delivery and profit per trip.",
      },
      {
        slug: "retail-fashion",
        why: "Clothing and shoe shops in the bazaars: sizes and colours, barcodes, exchanges.",
      },
      {
        slug: "grocery-kiryana",
        why: "Kiryana stores: barcode billing, cartons to pieces, khata for regulars.",
      },
      {
        slug: "restaurants",
        why: "Restaurants and cafés: tables, the kitchen screen, a waiter app and split bills.",
      },
    ],
  },
  sections: [
    {
      id: "suppliers",
      heading: "Workshops, suppliers and credit",
      paragraphs: [
        `A Sialkot maker buys leather, steel, fabric and packing from many suppliers, sends work out to smaller workshops, and settles up later. ${BRAND_NAME} gives every supplier a khata that updates with each purchase, return and payment, so you always know what you owe and to whom.`,
        "The same goes the other way: dealers and buyers at home get a khata with a credit limit, a 30/60/90-day aging list and statements you can send on WhatsApp.",
      ],
      bullets: [
        "Purchase orders and goods received",
        "Supplier and dealer khata",
        "Credit limits and 30/60/90-day aging",
        "Cheques and split payments",
      ],
    },
    {
      id: "stock",
      heading: "Stock you can trust",
      paragraphs: [
        "Keep raw material and finished goods in more than one store or warehouse, move stock between them, and track batches. Buy by the carton or dozen and sell by the piece with units of measure that keep the count right. Every movement posts to the books, with a trial balance, P&L and balance sheet when you want them.",
      ],
    },
    {
      id: "limits",
      heading: `What ${BRAND_NAME} does not do for exporters`,
      paragraphs: [
        `${BRAND_NAME} does not plan production or manage bills of materials, and it does not prepare export paperwork such as shipping documents, letters of credit or customs filings. It covers the buying, stock, selling, credit and accounting around your business. If you need invoices in a foreign currency for overseas buyers, ask us on a demo call and we will tell you plainly whether it fits.`,
      ],
    },
  ],
  faqs: [
    {
      q: `Can ${BRAND_NAME} track what I owe each supplier and workshop?`,
      a: "Yes. Every supplier has a khata that updates with each purchase, return and payment, so you can see what you owe and to whom at any time.",
    },
    {
      q: "Does it plan production or handle export documents?",
      a: `No. ${BRAND_NAME} does not plan production, manage bills of materials or prepare export paperwork. It covers buying, stock, selling, credit and the books.`,
    },
    PK_FAQ_FBR,
    {
      q: `Does ${BRAND_NAME} connect to PRA?`,
      a: `No, not yet. ${BRAND_NAME} records the tax on every bill and gives you tax reports, but does not send invoices to the Punjab Revenue Authority.`,
    },
    PK_FAQ_URDU,
  ],
  sources: [SRC_PRA_HOME],
  checked: PROVINCE_CHECKED,
  cta: {
    headline: `Run your Sialkot business on ${BRAND_NAME}.`,
    sub: "Book a free demo, or start free for 3 months. No card needed, and we move your data for free.",
  },
  related: ["punjab", "faisalabad", "lahore", "pakistan"],
  updated: PROVINCE_UPDATED,
};

export default page;
