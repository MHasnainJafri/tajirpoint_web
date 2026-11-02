import type { LocationPage } from "./types";

// Facts checked 2 Nov 2026 against the backend (origin/main):
//  - UK hospitality VAT rulebook (eat-in / hot takeaway / cold takeaway /
//    always-standard): domains/fiscal/services/presets.py "uk_hospitality";
//    QR table orders count as eaten in. Applied by the shop, not automatic.
//    Web: src/features/settings/taxRules.
//  - UK 9-box VAT return figures + end-of-day Z report, for GB shops:
//    domains/reporting/services/uk_vat.py; web UkVatReturnScreen. No HMRC /
//    Making Tax Digital submission anywhere in the code.
//  - Stripe Connect supports GB: domains/payments/connect/countries.py.
//  - HubRise (Uber Eats, Deliveroo, Just Eat …) and Network drivers are
//    "Contact us" add-ons; status is read live.

const page: LocationPage = {
  slug: "uk",
  kind: "country",
  countryCode: "GB",
  name: "the UK",
  label: { en: "UK takeaways", ur: "برطانیہ (ٹیک اوے)", ar: "المملكة المتحدة (الوجبات الجاهزة)" },
  summary:
    "EPOS for UK takeaways, restaurants and cafés: eat-in and takeaway VAT rules, 9-box VAT figures, Stripe card payments and delivery-app orders.",
  seo: {
    title: "EPOS for UK Takeaways and Restaurants",
    description:
      "TajirPoint EPOS for UK takeaways and restaurants: eat-in and takeaway VAT rules, 9-box VAT figures, Stripe cards, kitchen screen and delivery-app orders.",
    keywords: [
      "takeaway epos uk",
      "restaurant epos system uk",
      "takeaway vat hot cold food",
      "epos with kitchen display uk",
      "deliveroo just eat epos integration",
    ],
  },
  og: {
    eyebrow: "EPOS for UK takeaways",
    title: "Takeaway EPOS with eat-in and takeaway VAT handled.",
    sub: "Kitchen screen, order board, Stripe card payments and delivery-app orders.",
    pills: ["Takeaway VAT", "Kitchen display", "Stripe", "HubRise"],
  },
  hero: {
    eyebrow: "EPOS for UK takeaways and restaurants",
    headline: "Takeaway and restaurant EPOS, with eat-in and takeaway VAT handled.",
    sub: "Prices in pounds, VAT rules for hot and cold takeaway, a kitchen screen and order board, your own online ordering and card payments through Stripe. Here is what works in the UK today, and what does not yet.",
  },
  facts: [
    { label: "Currency", value: "Pound sterling (£), on the till, receipts and reports." },
    {
      label: "VAT",
      value:
        "Eat-in and takeaway rules at the till, plus 9-box VAT return figures and a Z report. Filing to HMRC stays with your MTD software or accountant.",
    },
    {
      label: "Cards",
      value:
        "Card payments through Stripe, which supports UK businesses. You connect your own Stripe account.",
    },
    {
      label: "Internet drops",
      value: "The counter keeps selling offline and syncs when the connection is back. Offline for tables and the kitchen screen is not released yet.",
    },
  ],
  tax: {
    heading: "VAT and HMRC: what TajirPoint does, and what it does not",
    intro:
      "In the UK, VAT is collected by HMRC. Food VAT depends on how it leaves the shop, and VAT-registered businesses file returns through Making Tax Digital software.",
    rows: [
      {
        short: "VAT at the till",
        name: "Eat-in and takeaway rules",
        covers:
          "Eaten in: standard rate. Hot takeaway: standard rate. Cold takeaway food: usually zero rate.",
        ours: { tone: "ready", label: "Built in" },
        note: "Apply the UK hospitality tax rules and put each item in a group. The till picks the rate from the order type and whether the item is hot.",
      },
      {
        short: "VAT return",
        name: "9-box VAT return figures and Z report",
        covers: "The figures for each box of your VAT return, and an end-of-day Z report.",
        ours: { tone: "ready", label: "Built in" },
        note: "Figures come from your sales and received purchases. VAT on expenses is not included, so check box 4 with your accountant.",
      },
      {
        short: "HMRC",
        name: "Making Tax Digital filing",
        covers: "Sending the VAT return to HMRC.",
        ours: { tone: "no", label: "Not built" },
        note: "TajirPoint does not file to HMRC. Copy the figures into your MTD software, or give them to your accountant.",
      },
    ],
    note: "Rates and rules are HMRC's, and they change. Check HMRC's guidance on catering and takeaway food, or ask your accountant, before relying on any setup. You choose which group each item goes in.",
  },
  blocks: [
    {
      id: "payments",
      heading: "Taking payments",
      intro: "Cash and cards today; the add-ons below show their live status.",
      now: [
        "Cash with change, and split bills by item, seat, equal shares or amount",
        "Service charge and tips recorded on the bill",
      ],
      addons: ["stripe-payments", "paypal-payments", "square-payments"],
    },
    {
      id: "delivery",
      heading: "Delivery apps and drivers",
      intro:
        "Orders from your own website or order page land on the Order Desk today. Delivery-app orders come in through HubRise, which our team sets up with you.",
      now: [
        "Your own online order page and website",
        "Your own drivers with the rider app",
        "Order board for customers waiting at the counter",
      ],
      addons: ["hubrise", "courier-nash", "delivery-aggregator"],
    },
  ],
  businesses: {
    heading: "UK food businesses TajirPoint is set up for",
    items: [
      {
        slug: "restaurants",
        why: "Restaurants and curry houses: tables, courses to the kitchen screen, waiter app and split bills.",
      },
      {
        slug: "cloud-kitchens",
        why: "Takeaways and dark kitchens: several brands on one order board, packer screen and drivers.",
      },
      {
        slug: "cafes-bakeries",
        why: "Cafés and bakeries: a fast counter, add-ons on each item, eat-in or takeaway at the tap of a button.",
      },
    ],
  },
  sections: [
    {
      id: "vat-explained",
      heading: "Eat in or take away: the VAT question, in plain words",
      paragraphs: [
        "Food eaten on your premises is standard-rated. Hot takeaway food is standard-rated too. Most cold takeaway food, like sandwiches and salads, is zero-rated. Some items, such as alcohol, confectionery, crisps and soft drinks, are standard-rated however they leave.",
        "In TajirPoint you put each item into one of three groups once. After that, the till charges the right rate from the order type: a table order or a QR order from the table counts as eaten in, and a delivery does not.",
      ],
      bullets: [
        "Standard-rated wherever it is eaten",
        "Zero-rated when taken away cold, standard otherwise",
        "Always standard: alcohol, confectionery, crisps, soft drinks",
      ],
    },
    {
      id: "rush",
      heading: "Built for a Friday night rush",
      paragraphs: [
        "Orders go to the kitchen screen once and in the right course. Customers waiting at the counter watch their number move on the order board, and drivers take their jobs on the rider app.",
      ],
      bullets: [
        "Kitchen display and order board",
        "Table QR ordering and waiter calls",
        "The counter keeps selling if the internet drops",
      ],
    },
    {
      id: "team",
      heading: "A team that speaks more than one language",
      paragraphs: [
        "Every screen can be switched to English, Urdu or Arabic, so kitchen and counter staff can work in the language they read fastest. Receipts for UK shops print in English.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does TajirPoint handle hot and cold takeaway VAT?",
      a: "Yes. Apply the UK hospitality tax rules, put each item in a group (standard, zero-rated food, or always standard) and the till charges the right rate for eat-in, hot takeaway or cold takeaway. Check your groups with HMRC guidance or your accountant.",
    },
    {
      q: "Is TajirPoint Making Tax Digital (MTD) software?",
      a: "No. TajirPoint gives you the 9-box VAT return figures and a Z report, but does not file to HMRC. Copy the figures into your MTD software or hand them to your accountant.",
    },
    {
      q: "Can it take orders from Uber Eats, Deliveroo and Just Eat?",
      a: (status) =>
        `Yes, through HubRise, a service that links your restaurant to the delivery apps. The HubRise add-on is ${status("hubrise")}: our team connects your HubRise location and checks the first orders with you. Orders then ring on the Order Desk and go to the kitchen screen like any other order.`,
    },
    {
      q: "How do I take card payments?",
      a: (status) =>
        `With the Stripe add-on (${status("stripe-payments")}). You connect your own Stripe account from the back office, and TajirPoint lists anything Stripe still needs from you in plain words. Card payments are marked paid when Stripe confirms them.`,
    },
    {
      q: "What happens if the internet goes down mid-service?",
      a: "The till keeps taking orders and payments in cash, saves them on the device, and syncs on its own when the connection returns, with no duplicates.",
    },
  ],
  cta: {
    headline: "See TajirPoint run your takeaway.",
    sub: "Book a free demo, or start free for 3 months. No card needed, and we move your menu for free.",
  },
  related: ["pakistan"],
  updated: "2026-11-02",
};

export default page;
