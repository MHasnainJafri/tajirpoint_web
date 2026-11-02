import type { LocationPage } from "./types";
import {
  BRA_ROW,
  FBR_ROW,
  KPRA_ROW,
  PK_COMMON_FAQS,
  PK_DELIVERY,
  PK_FACTS,
  PK_PAYMENTS,
  PK_TAX_NOTE,
  PK_UPDATED,
  PRA_ROW,
  SRB_ROW,
} from "./pk-common";

const page: LocationPage = {
  slug: "pakistan",
  kind: "country",
  countryCode: "PK",
  name: "Pakistan",
  label: { en: "Pakistan", ur: "پاکستان", ar: "باكستان" },
  summary:
    "Rupees, Urdu screens and receipts, khata, offline billing through power cuts, and an honest view of FBR and provincial tax.",
  seo: {
    title: "POS System in Pakistan: Urdu, Khata and Offline",
    description:
      "TajirPoint POS for Pakistani shops and restaurants: rupees, Urdu screens and receipts, khata, and billing through power cuts. FBR link coming soon.",
    keywords: [
      "pos system pakistan",
      "pos software in pakistan",
      "urdu pos software",
      "khata app for shops",
      "offline pos pakistan",
      "restaurant pos pakistan",
    ],
  },
  og: {
    eyebrow: "POS system in Pakistan",
    title: "Built for how Pakistani shops really sell.",
    sub: "Rupees, Urdu receipts, khata and offline billing through load-shedding.",
    pills: ["Urdu", "Khata", "Offline", "Rs"],
  },
  hero: {
    eyebrow: "POS system in Pakistan",
    headline: "Built for how Pakistani shops really sell.",
    sub: "Rupees with whole-rupee change, Urdu on screen and on the receipt, khata for customers who pay later, and billing that keeps going when the power or the internet goes. Here is what works today, and what is still coming.",
  },
  facts: PK_FACTS,
  tax: {
    heading: "Tax in Pakistan, and where TajirPoint stands",
    intro:
      "Goods are taxed federally by FBR. Services, including restaurants, are taxed by the province, and in Islamabad by FBR. Here is each authority and what TajirPoint does with it today.",
    rows: [FBR_ROW, PRA_ROW, SRB_ROW, KPRA_ROW, BRA_ROW],
    note: PK_TAX_NOTE,
  },
  blocks: [PK_PAYMENTS, PK_DELIVERY],
  businesses: {
    heading: "Businesses that use a POS like this in Pakistan",
    items: [
      {
        slug: "grocery-kiryana",
        why: "Kiryana stores and supermarkets: barcode billing, cartons to pieces, and khata for regular customers.",
      },
      {
        slug: "restaurants",
        why: "Dine-in, takeaway and delivery: tables, kitchen screen, waiter app and your own riders.",
      },
      {
        slug: "pharmacy",
        why: "Medical stores: batches and expiry dates, first-expiry-first-out, and search by generic name.",
      },
      {
        slug: "electronics-mobile",
        why: "Mobile and laptop dealers: IMEI and serial numbers, quotations and credit.",
      },
      {
        slug: "distributors-wholesale",
        why: "Distributors: van sales, routes, dealer price lists and credit control.",
      },
      {
        slug: "retail-fashion",
        why: "Clothing and shoe shops: sizes and colours, barcodes and exchanges.",
      },
    ],
  },
  sections: [
    {
      id: "power",
      heading: "Load-shedding and weak internet",
      paragraphs: [
        "Every sale is saved on the device first. When the internet drops, the counter keeps billing and printing; when the connection comes back, the sales sync on their own, with no duplicates.",
        "The device itself still needs power. A laptop, an Android phone or tablet, or a PC on a UPS keeps the counter going through a power cut.",
      ],
      bullets: [
        "Works in the browser, as a Windows desktop app and on Android",
        "No time limit offline",
        "Staff see clearly when they are offline and when sales have synced",
      ],
    },
    {
      id: "khata",
      heading: "Khata, without the register",
      paragraphs: [
        "Put a bill on a customer's khata at the counter, take part payments later, and see who owes what and for how long. Suppliers get their own khata too.",
      ],
      bullets: [
        "Credit limits per customer",
        "Aging: who has owed you the longest",
        "Reminders and statements to send to customers",
      ],
    },
    {
      id: "switching",
      heading: "Moving from paper or another POS",
      paragraphs: [
        "Our team loads your products, customers, suppliers and khata balances for you, free. Setup and training happen over WhatsApp and video call, in Urdu or English.",
      ],
    },
  ],
  faqs: [
    ...PK_COMMON_FAQS,
    {
      q: "Does TajirPoint connect to PRA, SRB, KPRA or BRA?",
      a: "No, not yet. TajirPoint records the tax on every bill and gives you tax reports, but it does not send invoices to any provincial revenue authority. If your province requires your restaurant or service business to report invoices to its system, tell us before you switch.",
    },
    {
      q: "Does it work during load-shedding?",
      a: "Yes, as long as the device has power. Sales are saved on the device first and sync when the internet returns. A laptop, an Android device or a PC on a UPS keeps the counter running.",
    },
    {
      q: "Which devices do I need?",
      a: "Any computer with a browser, the Windows desktop app, or an Android phone or tablet. You can start on the device you already have.",
    },
  ],
  cta: {
    headline: "See TajirPoint on your own shop.",
    sub: "Book a free demo in Urdu or English, or start free for 3 months. We move your data for free.",
  },
  related: ["lahore", "karachi", "islamabad-rawalpindi", "faisalabad"],
  updated: PK_UPDATED,
};

export default page;
