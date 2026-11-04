import type { Comparison } from "./types";
import { TP } from "./tajirpoint";
import { BRAND_NAME } from "@/lib/config/brand";

/**
 * TajirPoint vs another company's product.
 *
 * Every fact about the other product has a `source` (1-based index into
 * `sources`) and was read on CHECKED (1 Nov 2026) from that company's own
 * public page. Where we could not read something, the row is left out — we
 * never write "No" for a competitor. Picked from the competitor research
 * (Desktop, "TajirPoint Competitor Research 2026-11-01"): the names that
 * matter most for our buyers — free POS in emerging markets (Loyverse), the
 * UK (Square), Gulf restaurants (Foodics) and Pakistani restaurants (CORN POS).
 *
 * OWNER TO-DO before release: legal / fairness review of this file.
 */

export const loyverse: Comparison = {
  slug: "tajirpoint-vs-loyverse",
  kind: "competitor",
  otherName: "Loyverse",
  label: `${BRAND_NAME} vs Loyverse`,
  blurb:
    "A free POS for phones and tablets, or a POS with khata, accounting and delivery built in.",
  audience: "Small shops and cafés",
  seo: {
    title: `${BRAND_NAME} vs Loyverse: Free POS Compared`,
    description: `Loyverse or ${BRAND_NAME}? A fair look at price, offline selling, khata, accounting, delivery and devices, with sources. See where each one is the better choice.`,
    keywords: [
      "Loyverse alternative",
      "Loyverse vs",
      "free POS Pakistan",
      "Loyverse Pakistan",
      "POS with khata",
      "Loyverse alternatives",
    ],
  },
  og: {
    eyebrow: "Compare",
    title: `${BRAND_NAME} vs Loyverse.`,
    sub: "Price, offline, khata, accounting and delivery, compared fairly with sources.",
    pills: ["Free start", "Khata", "Accounting", "Windows app"],
  },
  hero: {
    eyebrow: `${BRAND_NAME} vs Loyverse`,
    h1: `${BRAND_NAME} vs Loyverse: which POS fits your shop?`,
    sub: `Loyverse is a popular free POS for phones and tablets. ${BRAND_NAME} adds customer credit, accounting and delivery to the POS. Here is a fair side-by-side.`,
  },
  verdict: {
    tajirpoint: `Choose ${BRAND_NAME} if you sell on credit (khata), want your accounts and stock in the same system, run deliveries with your own riders, or want a Windows desktop app and Urdu or Arabic screens.`,
    other: `Choose Loyverse if you want a POS whose core is free with no time limit, you work on iPhone or iPad, or you need a language ${BRAND_NAME} does not offer yet.`,
  },
  tajirpointStrengths: [
    "Khata built in: running balances, credit limits, aging and reminders for customers who buy on credit.",
    "Double-entry accounting posted from your sales and purchases (Accounting add-on).",
    "Delivery with your own riders and a rider app, plus your own online order page (Shop plan and above).",
    "Windows desktop app as well as the browser and Android.",
    "App and receipts in Urdu and Arabic, with right-to-left screens.",
    "Our team moves your data from Excel or another POS for free.",
  ],
  otherStrengths: [
    `The core POS is free with no time limit; ${BRAND_NAME}'s free Light plan lasts 3 months.`,
    `Works on iOS and Android; ${BRAND_NAME}'s iOS app is still coming soon.`,
    "Kitchen display, customer display, loyalty and multi-store are in the free core.",
    "Offered in 30+ languages, with help tutorials in 17.",
    "A large user base: it says 350,000+ active merchants in 170+ countries.",
  ],
  rows: [
    {
      feature: "Price to start",
      tajirpoint: TP.freeStart,
      other: { mark: "yes", text: "Core POS is free. Paid add-ons are optional.", source: 1 },
    },
    {
      feature: "Paid extras",
      tajirpoint: {
        mark: "info",
        text: "Monthly plans, plus optional add-ons per shop.",
        href: "/pricing",
      },
      other: {
        mark: "info",
        text: "Unlimited sales history $5 per store a month; employee management $5 per employee a month; advanced inventory $25 per store a month.",
        source: 1,
      },
    },
    {
      feature: "Works offline",
      tajirpoint: TP.offlineRetail,
      other: { mark: "yes", text: "Keeps recording sales offline and syncs later.", source: 2 },
    },
    {
      feature: "Devices",
      tajirpoint: TP.devices,
      other: {
        mark: "info",
        text: "iOS and Android phones and tablets, supported Android POS devices; back office in a browser.",
        source: 2,
      },
    },
    {
      feature: "Kitchen display",
      tajirpoint: TP.kds,
      other: { mark: "yes", text: "Included free.", source: 1 },
    },
    {
      feature: "Loyalty",
      tajirpoint: TP.loyalty,
      other: { mark: "yes", text: "Loyalty program included free.", source: 1 },
    },
    {
      feature: "More than one shop",
      tajirpoint: TP.multiBranch,
      other: { mark: "yes", text: "Multi-store management included free.", source: 1 },
    },
    {
      feature: "Stock",
      tajirpoint: TP.stock,
      other: {
        mark: "partial",
        text: "Essential stock tracking free; advanced inventory is a paid add-on.",
        source: 1,
      },
    },
    {
      feature: "Accounting",
      tajirpoint: TP.accounting,
      other: {
        mark: "partial",
        text: "Connects to accounting tools through integrations.",
        source: 1,
      },
    },
    {
      feature: "Customer credit (khata)",
      tajirpoint: TP.khata,
      other: { mark: "info", text: "Not listed on its pricing page.", source: 1 },
    },
    {
      feature: "Own riders and online order page",
      tajirpoint: TP.riders,
      other: {
        mark: "info",
        text: "Not listed on its pricing page; integrations for e-commerce.",
        source: 1,
      },
    },
    {
      feature: "Languages",
      tajirpoint: TP.languages,
      other: { mark: "yes", text: "30+ languages.", source: 2 },
    },
  ],
  sections: [
    {
      heading: "Price: free core vs a free start",
      paragraphs: [
        "Loyverse's core POS is free, and you pay only for the add-ons you choose. That is a real advantage for a very small shop.",
        `${BRAND_NAME}'s Light plan is free for 3 months with no card, then you move to a paid plan. In return, the paid plans include things a small shop in Pakistan or the Gulf often needs: khata, purchasing and reports, with accounting and delivery available on top.`,
      ],
    },
    {
      heading: "Credit customers and accounts",
      paragraphs: [
        `If customers buy on credit, ${BRAND_NAME} keeps each one's balance, warns you at their limit and shows who is late paying. With the Accounting add-on, sales and purchases post to proper double-entry books.`,
        "Loyverse lists accounting through integrations with other tools. If you don't sell on credit and an outside accounting app suits you, that may be all you need.",
      ],
    },
    {
      heading: "Devices",
      paragraphs: [
        `Loyverse runs on iOS and Android. ${BRAND_NAME} runs in any browser, as a Windows desktop app and on Android; the iOS app is coming soon. If your counter is an iPad, Loyverse fits today.`,
      ],
    },
  ],
  faqs: [
    {
      question: "Is Loyverse free?",
      answer:
        "Loyverse's pricing page lists its core POS as free, with paid add-ons such as unlimited sales history, employee management and advanced inventory (checked 1 Nov 2026).",
    },
    {
      question: `Is ${BRAND_NAME} free?`,
      answer:
        "The Light plan is free for 3 months with no card. It covers one shop, two staff logins, 30 products and 100 orders a day. After that you choose a paid plan.",
    },
    {
      question: `Can I move from Loyverse to ${BRAND_NAME}?`,
      answer:
        "Yes. Export your items and customers to a CSV file and send it to us. Our team loads your products, customers and opening stock for free.",
    },
    {
      question: "Which one works offline?",
      answer: `Both keep selling at the counter offline and sync later. ${BRAND_NAME}'s offline mode for restaurant tables and the kitchen screen is not released yet.`,
    },
  ],
  sources: [
    { label: "Loyverse pricing", url: "https://loyverse.com/pricing" },
    { label: "Loyverse home page", url: "https://loyverse.com/" },
  ],
  related: ["tajirpoint-vs-square", "tajirpoint-vs-cash-register", "tajirpoint-vs-paper-khata"],
};

export const square: Comparison = {
  slug: "tajirpoint-vs-square",
  kind: "competitor",
  otherName: "Square",
  label: `${BRAND_NAME} vs Square`,
  blurb:
    "Card payments and hardware from one company, or a POS with khata and accounting that works with your own bank.",
  audience: "UK shops, cafés and restaurants",
  seo: {
    title: `${BRAND_NAME} vs Square POS for UK Shops`,
    description: `Square or ${BRAND_NAME} for your UK shop or restaurant? A fair comparison of plans, card fees, hardware, kitchen display, credit and accounting, with sources.`,
    keywords: [
      "Square alternative UK",
      "Square POS alternative",
      "Square vs",
      "EPOS UK",
      "POS without card fees",
      "Square alternatives",
    ],
  },
  og: {
    eyebrow: "Compare",
    title: `${BRAND_NAME} vs Square.`,
    sub: "Plans, card fees, hardware and back office, compared fairly with sources.",
    pills: ["No card fees", "Khata", "Accounting", "Windows app"],
  },
  hero: {
    eyebrow: `${BRAND_NAME} vs Square`,
    h1: `${BRAND_NAME} vs Square: which POS suits your business?`,
    sub: `Square bundles card payments, hardware and a POS. ${BRAND_NAME} is a POS and back office that works with the bank or card terminal you already use. Here is a fair side-by-side for UK owners.`,
  },
  verdict: {
    tajirpoint: `Choose ${BRAND_NAME} if you want to keep your own bank's card terminal, sell on account to regular customers, keep double-entry books in the same system, or run on a Windows PC.`,
    other:
      "Choose Square if you want card payments, card readers and the POS from one company, a free plan with no time limit, or an AI assistant for your sales data today.",
  },
  tajirpointStrengths: [
    `We don't process your cards, so ${BRAND_NAME} takes no transaction fee. Keep the bank terminal and rates you have.`,
    "Customer credit (khata) with limits, aging and statements for customers who pay later.",
    "Double-entry accounting posted from sales and purchases (Accounting add-on).",
    "Kitchen display included with the restaurant tools, on any tablet or PC.",
    "Windows desktop app, and the counter keeps selling offline.",
    "Free data move from Excel or your old POS.",
  ],
  otherStrengths: [
    "Card payments are built in, so you don't need a separate terminal or bank deal.",
    "A Free plan at £0 a month with no time limit (you pay card fees).",
    "Its own hardware, from a £19 reader to a £699 register (plus VAT).",
    "A free AI assistant for UK sellers since February 2026.",
    "A Premium plan with custom pricing for businesses taking over £200k a year.",
  ],
  rows: [
    {
      feature: "Monthly plans",
      tajirpoint: TP.freeStart,
      other: {
        mark: "info",
        text: "Free £0; Plus from £29; Premium custom (all plus card fees).",
        source: 1,
      },
    },
    {
      feature: "Card payment fees",
      tajirpoint: TP.cardProcessing,
      other: { mark: "info", text: "UK cards: 1.75% in person; 1.4% + 25p online.", source: 1 },
    },
    {
      feature: "Hardware",
      tajirpoint: TP.hardware,
      other: {
        mark: "info",
        text: "Sells its own: £19 reader up to £699 register, plus VAT.",
        source: 1,
      },
    },
    {
      feature: "Kitchen display",
      tajirpoint: TP.kds,
      other: {
        mark: "partial",
        text: "From £15 per device a month; included on its restaurants plan.",
        source: 1,
      },
    },
    {
      feature: "AI assistant",
      tajirpoint: TP.ai,
      other: { mark: "yes", text: "Square AI for UK sellers, launched February 2026.", source: 2 },
    },
    {
      feature: "Customer credit (khata / on account)",
      tajirpoint: TP.khata,
      other: { mark: "info", text: "We could not confirm this for UK accounts.", source: 3 },
    },
    {
      feature: "Devices",
      tajirpoint: TP.devices,
      other: {
        mark: "info",
        text: "Its own Reader, Terminal, Stand, Kiosk, Handheld and Register.",
        source: 1,
      },
    },
  ],
  sections: [
    {
      heading: "Card payments: built in, or your own bank",
      paragraphs: [
        "Square's model is simple: you use its card readers and pay a fee on each card payment. For many small UK businesses, that is the easiest way to start.",
        `${BRAND_NAME} does not process cards. You record card sales from whichever terminal you already have, and online payments go through the Stripe add-on. ${BRAND_NAME} itself charges no transaction fee. If you already have a good rate with your bank, this keeps it.`,
      ],
    },
    {
      heading: "Back office",
      paragraphs: [
        `${BRAND_NAME} was built for shops that sell on credit and want their books in the same place as their till: customer balances, credit limits, purchases from suppliers and double-entry accounting.`,
        "Square offers a wide range of tools and add-ons of its own. Check its site for the exact features on the plan you are considering.",
      ],
    },
    {
      heading: "Making Tax Digital",
      paragraphs: [
        `${BRAND_NAME} keeps tax on every bill and gives you tax reports. It does not submit VAT returns to HMRC for you, so you or your accountant still file them.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How much are Square's card fees in the UK?",
      answer:
        "Square's UK pricing page lists 1.75% for in-person UK card payments and 1.4% + 25p online (checked 1 Nov 2026). Check its site for the current rates.",
    },
    {
      question: `Does ${BRAND_NAME} charge card fees?`,
      answer: `No. ${BRAND_NAME} doesn't process cards and charges no transaction fee. Your card terminal provider or online gateway sets its own processing fees.`,
    },
    {
      question: `Can I use my existing card terminal with ${BRAND_NAME}?`,
      answer: `Yes. Take the payment on your terminal as you do now and record it as a card sale in ${BRAND_NAME}, so it lands in your reports.`,
    },
    {
      question: `Does ${BRAND_NAME} file my VAT return?`,
      answer:
        "No. It records VAT on every bill and gives you tax reports, but it does not submit returns to HMRC.",
    },
  ],
  sources: [
    { label: "Square UK pricing", url: "https://squareup.com/gb/en/pricing" },
    {
      label: "Business Wire: Square AI for UK sellers (Feb 2026)",
      url: "https://www.businesswire.com/news/home/20260210922162/en/Introducing-Square-AI-Helping-UK-Small-Businesses-Turn-Instinct-Into-Confident-Decisions",
    },
    {
      label: "Square Seller Community: house accounts in the UK",
      url: "https://sellercommunity.com/t5/Feature-Requests-Point-of-Sale/Are-House-Accounts-available-in-the-UK/m-p/746173",
    },
  ],
  related: ["tajirpoint-vs-loyverse", "tajirpoint-vs-cash-register", "tajirpoint-vs-foodics"],
};

export const foodics: Comparison = {
  slug: "tajirpoint-vs-foodics",
  kind: "competitor",
  otherName: "Foodics",
  label: `${BRAND_NAME} vs Foodics`,
  blurb:
    "A Gulf restaurant platform with hardware and payments, or one system for restaurants and shops.",
  audience: "Restaurants in the Gulf",
  seo: {
    title: `${BRAND_NAME} vs Foodics for Restaurants`,
    description: `Foodics or ${BRAND_NAME} for your restaurant? A fair comparison of pricing, hardware, kitchen display, delivery, e-invoicing and Arabic support, with sources.`,
    keywords: [
      "Foodics alternative",
      "Foodics vs",
      "restaurant POS UAE",
      "restaurant POS Saudi Arabia",
      "Arabic restaurant POS",
      "Foodics alternatives",
    ],
  },
  og: {
    eyebrow: "Compare",
    title: `${BRAND_NAME} vs Foodics.`,
    sub: "Pricing, hardware, kitchen, delivery and e-invoicing, compared fairly with sources.",
    pills: ["Restaurants", "Kitchen display", "Riders", "Arabic"],
  },
  hero: {
    eyebrow: `${BRAND_NAME} vs Foodics`,
    h1: `${BRAND_NAME} vs Foodics: which restaurant POS fits you?`,
    sub: `Foodics is a leading restaurant platform in the Gulf. ${BRAND_NAME} runs restaurants and shops in one system. Here is an honest side-by-side, including where Foodics is ahead.`,
  },
  verdict: {
    tajirpoint: `Choose ${BRAND_NAME} if you run a restaurant and a shop (or several kinds of business), deliver with your own riders, sell on credit to regular customers, or want to start free and bring your own devices.`,
    other:
      "Choose Foodics if you are in Saudi Arabia and need its e-invoicing (e-Fatoora) set-up today, want hardware included in a per-branch price, or want its own payments service.",
  },
  tajirpointStrengths: [
    "One system for restaurants, cafés, cloud kitchens and shops, groceries or pharmacies.",
    "Own riders with a rider app, plus your own online order page with no commission to an app (Shop plan and above).",
    "Customer credit (khata) and double-entry accounting in the same system.",
    "Light plan free for 3 months, no card. Bring your own PC, tablet or Android device.",
    "App and receipts in Arabic, Urdu and English.",
  ],
  otherStrengths: [
    `Saudi e-invoicing: it publishes a guide to turning on e-Fatoora in the Foodics POS. ${BRAND_NAME} does not support Saudi e-invoicing yet.`,
    "Hardware included in the per-branch price, with no upfront payment (Saudi price list).",
    "Its own payments service, Foodics Pay, licensed by the Saudi Central Bank (SAMA).",
    "Self ordering, pay at table and AI & BI analytics on its plans.",
    "A large restaurant base: it says 40,000+ restaurants.",
  ],
  rows: [
    {
      feature: "Price",
      tajirpoint: TP.freeStart,
      other: {
        mark: "info",
        text: "Saudi price list in riyals: Starter SAR 248, Basic SAR 450, Advanced SAR 765 a month per branch, as shown on its KSA page.",
        source: 1,
      },
    },
    {
      feature: "Hardware",
      tajirpoint: TP.hardware,
      other: { mark: "yes", text: "Hardware included; no upfront payment (KSA page).", source: 1 },
    },
    {
      feature: "Saudi e-invoicing (ZATCA / e-Fatoora)",
      tajirpoint: TP.zatca,
      other: {
        mark: "yes",
        text: "Publishes a guide to activating e-Fatoora in its POS.",
        source: 3,
      },
    },
    {
      feature: "Kitchen display",
      tajirpoint: TP.kds,
      other: { mark: "yes", text: "Kitchen Display Screen.", source: 2 },
    },
    {
      feature: "Waiter app",
      tajirpoint: TP.waiter,
      other: { mark: "yes", text: "Waiter App.", source: 2 },
    },
    {
      feature: "Online ordering",
      tajirpoint: TP.orderPage,
      other: { mark: "yes", text: "Online ordering.", source: 2 },
    },
    {
      feature: "Own riders",
      tajirpoint: TP.riders,
      other: { mark: "info", text: "Not listed on its home or KSA pricing page.", source: 2 },
    },
    {
      feature: "Card payments",
      tajirpoint: TP.cardProcessing,
      other: {
        mark: "yes",
        text: "Foodics Pay, licensed by the Saudi Central Bank (SAMA).",
        source: 2,
      },
    },
    {
      feature: "Inventory and recipes",
      tajirpoint: TP.recipes,
      other: {
        mark: "partial",
        text: "Inventory with costing and purchasing from the Basic plan.",
        source: 1,
      },
    },
    {
      feature: "Accounting",
      tajirpoint: TP.accounting,
      other: { mark: "yes", text: "Foodics Accounting.", source: 2 },
    },
    {
      feature: "AI and analytics",
      tajirpoint: TP.ai,
      other: {
        mark: "partial",
        text: "Foodics AI & BI Analytics on the Advanced plan.",
        source: 1,
      },
    },
    {
      feature: "Shops as well as restaurants",
      tajirpoint: TP.industries,
      other: { mark: "info", text: "Built for food and beverage businesses.", source: 2 },
    },
  ],
  sections: [
    {
      heading: "If you are in Saudi Arabia",
      paragraphs: [
        `Saudi businesses must issue e-invoices under ZATCA rules. Foodics publishes a guide to turning on e-Fatoora in its POS. ${BRAND_NAME} does not support Saudi e-invoicing yet, so if you need it today, Foodics or another ZATCA-ready system is the safer choice.`,
      ],
    },
    {
      heading: "One system for more than one kind of business",
      paragraphs: [
        `Foodics is built for food and beverage. ${BRAND_NAME} runs restaurants and also shops, groceries, pharmacies and distributors, so a group with a restaurant and a store can use one login, one set of reports and one khata.`,
      ],
    },
    {
      heading: "Delivery with your own riders",
      paragraphs: [
        `${BRAND_NAME} has an order board that rings for new online orders, a packer screen and a rider app with live location and rider cash per shift. Your own order page takes delivery, pickup and dine-in orders with no commission to an app.`,
      ],
    },
  ],
  faqs: [
    {
      question: `Does ${BRAND_NAME} support ZATCA e-invoicing?`,
      answer: `Not yet. ${BRAND_NAME} records tax on every bill and gives you tax reports, but it does not send e-invoices to ZATCA. If you need that today, choose a ZATCA-ready system.`,
    },
    {
      question: `Is ${BRAND_NAME} available in Arabic?`,
      answer:
        "Yes. The app works in Arabic with right-to-left screens, and receipts can be printed in Arabic.",
    },
    {
      question: `Do I need to buy hardware from ${BRAND_NAME}?`,
      answer: `No. ${BRAND_NAME} runs on a PC, laptop, Android phone or tablet, or an Android POS with a built-in printer. Any tablet, TV box or PC with a browser can be a kitchen screen.`,
    },
  ],
  sources: [
    { label: "Foodics pricing, Saudi Arabia", url: "https://www.foodics.com/foodics-pricing-ksa/" },
    { label: "Foodics home page", url: "https://www.foodics.com/" },
    {
      label: "Foodics: activating e-Fatoora (ZATCA)",
      url: "https://www.foodics.com/zatca-phase-2/",
    },
  ],
  related: ["tajirpoint-vs-corn-pos", "tajirpoint-vs-square", "tajirpoint-vs-loyverse"],
};

export const cornPos: Comparison = {
  slug: "tajirpoint-vs-corn-pos",
  kind: "competitor",
  otherName: "CORN POS",
  label: `${BRAND_NAME} vs CORN POS`,
  blurb:
    "A Pakistani restaurant POS with FBR and provincial tax links, or one system for restaurants and shops.",
  audience: "Restaurants in Pakistan",
  seo: {
    title: `${BRAND_NAME} vs CORN POS for Restaurants in Pakistan`,
    description: `CORN POS or ${BRAND_NAME} for your restaurant in Pakistan? A fair look at FBR and provincial tax, offline mode, kitchen display, riders and pricing, with sources.`,
    keywords: [
      "CORN POS alternative",
      "CORN POS vs",
      "restaurant POS Pakistan",
      "FBR integrated POS",
      "restaurant software Lahore",
      "POS Pakistan",
    ],
  },
  og: {
    eyebrow: "Compare",
    title: `${BRAND_NAME} vs CORN POS.`,
    sub: "Tax, offline, kitchen, riders and pricing for Pakistani restaurants, with sources.",
    pills: ["Restaurants", "Kitchen display", "Riders", "Khata"],
  },
  hero: {
    eyebrow: `${BRAND_NAME} vs CORN POS`,
    h1: `${BRAND_NAME} vs CORN POS: a fair look for Pakistani restaurants`,
    sub: `CORN POS is a Lahore-based restaurant POS with FBR and provincial tax links. ${BRAND_NAME} runs restaurants and shops in one system. Here is where each one is stronger.`,
  },
  verdict: {
    tajirpoint: `Choose ${BRAND_NAME} if you also run a shop, bakery counter or distribution business, want khata and double-entry accounting in the same system, or want to start free for 3 months on your own devices.`,
    other:
      "Choose CORN POS if you must send sales to FBR, PRA, SRB or KPRA today, need full offline mode at the tables, or want an iPad-based setup.",
  },
  tajirpointStrengths: [
    "One system for restaurants and for shops, groceries, pharmacies and distributors.",
    "Khata (customer credit) with limits, aging and reminders, plus double-entry accounting.",
    "Windows desktop app, browser and Android; app and receipts in Urdu.",
    "Light plan free for 3 months with no card; free data move from your old system.",
    "Your own online order page with no commission to an app (Shop plan and above).",
  ],
  otherStrengths: [
    `Tax links today: its site lists FBR, SRB, PRA and KPRA integration. ${BRAND_NAME}'s FBR connector is coming soon and provincial links are not built.`,
    `Full offline mode, with data on a local server and its live server. ${BRAND_NAME}'s offline mode for restaurant tables and the kitchen screen is not released yet.`,
    `Apps for iPad and iOS as well as Android. ${BRAND_NAME}'s iOS app is coming soon.`,
    `A branded customer ordering app for iOS and Android. ${BRAND_NAME}'s branded customer app is coming soon.`,
    "Built for restaurants, with plans from new restaurants up to multi-location chains and franchises.",
  ],
  rows: [
    {
      feature: "Price",
      tajirpoint: TP.freeStart,
      other: {
        mark: "info",
        text: "Starter $50 and Pro $130 per branch a month; Elite by quote.",
        source: 2,
      },
    },
    {
      feature: "FBR (federal sales tax)",
      tajirpoint: TP.fbr,
      other: { mark: "yes", text: "Lists FBR integration.", source: 1 },
    },
    {
      feature: "PRA, SRB, KPRA (provincial)",
      tajirpoint: TP.provincialTax,
      other: { mark: "yes", text: "Lists PRA, SRB and KPRA integration.", source: 1 },
    },
    {
      feature: "Works offline",
      tajirpoint: TP.offlineRetail,
      other: {
        mark: "yes",
        text: "Advanced offline mode; data on a local server and its live server.",
        source: 1,
      },
    },
    {
      feature: "Kitchen display",
      tajirpoint: TP.kds,
      other: { mark: "yes", text: "Kitchen display with order routing.", source: 2 },
    },
    {
      feature: "Rider app",
      tajirpoint: TP.riders,
      other: { mark: "yes", text: "CORN Rider App with real-time rider tracking.", source: 1 },
    },
    {
      feature: "Online ordering",
      tajirpoint: TP.orderPage,
      other: {
        mark: "yes",
        text: "Branded website with live menu sync and an iOS / Android ordering app.",
        source: 2,
      },
    },
    {
      feature: "Devices",
      tajirpoint: TP.devices,
      other: { mark: "info", text: "Web browser, Android tablet, iPad and desktop.", source: 1 },
    },
    {
      feature: "Customer credit (khata)",
      tajirpoint: TP.khata,
      other: { mark: "info", text: "Not listed on its home or pricing page.", source: 2 },
    },
    {
      feature: "Shops as well as restaurants",
      tajirpoint: TP.industries,
      other: { mark: "info", text: "Plans are built for restaurants.", source: 2 },
    },
    {
      feature: "Accounting",
      tajirpoint: TP.accounting,
      other: { mark: "partial", text: "P&L, cash flow and expense insights.", source: 2 },
    },
  ],
  sections: [
    {
      heading: "If you must send sales to FBR or your province today",
      paragraphs: [
        `Many restaurants in Pakistan must report sales to FBR or to a provincial authority (PRA in Punjab, SRB in Sindh, KPRA in KP). CORN POS lists all four. ${BRAND_NAME}'s FBR connector is coming soon and the provincial links are not built yet. If this is a must for you today, ask us for dates before you switch.`,
      ],
    },
    {
      heading: "Restaurants plus other businesses",
      paragraphs: [
        `CORN POS is built for restaurants. ${BRAND_NAME} runs a restaurant and also a shop, bakery counter, pharmacy or distribution business in the same system, with one set of reports, one khata and double-entry accounting.`,
      ],
    },
    {
      heading: "Price",
      paragraphs: [
        `CORN POS lists Starter and Pro prices per branch per month on its pricing page. ${BRAND_NAME} starts free for 3 months with no card, then moves to a monthly plan; the Business plan covers more than one shop. See both pricing pages for current numbers.`,
      ],
    },
  ],
  faqs: [
    {
      question: `Is ${BRAND_NAME} FBR integrated?`,
      answer: `Not yet. The FBR connector is coming soon. ${BRAND_NAME} already records tax on every bill and gives tax reports. PRA, SRB and KPRA links are not built yet.`,
    },
    {
      question: `Does ${BRAND_NAME} work offline in a restaurant?`,
      answer:
        "The counter keeps selling offline today. Full offline mode for restaurant tables and the kitchen display is being finished and is not released yet, so plan on a stable connection for table service for now.",
    },
    {
      question: `Can I try ${BRAND_NAME} before paying?`,
      answer:
        "Yes. The Light plan is free for 3 months with no card. You can also book a free demo with your own menu.",
    },
  ],
  sources: [
    { label: "CORN POS home page", url: "https://www.cornpos.com/" },
    { label: "CORN POS pricing", url: "https://www.cornpos.com/pricing" },
  ],
  related: ["tajirpoint-vs-oscar", "tajirpoint-vs-foodics", "tajirpoint-vs-loyverse"],
};
