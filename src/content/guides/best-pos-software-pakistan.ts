import type { Guide } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Competitor facts come ONLY from each vendor's own public pages (see
// `sources`), read on 5 Nov 2026. Where a vendor's pages did not say
// something, the cell says "Not published" — we never write "No" for a
// competitor. Prices are in the currency each vendor publishes. No ratings.
// Notes from the check:
// - HysabOne: pricing page lists "Offline mode" in the POS plan, but its home
//   page FAQ says it "requires an internet connection". Both are reported.
// - HysabOne's FBR feature posts invoices to IRIS from the books (digital
//   invoicing); real-time POS integration is not stated.
// - Odoo prices were shown to us in US$ (per user a month); the page may show
//   another currency to visitors in Pakistan.
// - Foodics: its site lists KSA, UAE, Egypt, Kuwait, Jordan, Oman, Qatar; no
//   Pakistan. So it is a note, not a row.
// TajirPoint side: plans API (api.tajirpoint.com/api/v1/public/plans/, USD,
// 5 Nov 2026), src/content/compare/tajirpoint.ts (offline for tables and the
// kitchen screen not released; FBR coming soon; PRA/SRB/KPRA not built; iOS
// coming soon) and src/lib/marketing/businesses.ts (pharmacy batches/FEFO,
// clothing variants, grocery carton/kg/piece, van sales).
const guide: Guide = {
  slug: "best-pos-software-pakistan",
  category: "Choosing a POS",
  title: "Best POS software in Pakistan (2026): an honest comparison",
  seoTitle: "Best POS Software in Pakistan (2026), Compared",
  seoDescription: `An honest 2026 look at POS software in Pakistan: Oscar, CORN POS, HysabOne, Moneypex, Loyverse, Odoo and ${BRAND_NAME} on FBR, offline, Urdu, khata and price.`,
  keywords: [
    "best POS software in Pakistan",
    "POS software Pakistan",
    "restaurant POS Pakistan",
    "POS system Pakistan",
    "FBR integrated POS software",
    "POS software price in Pakistan",
    "retail POS Pakistan",
    "POS software for kiryana store",
  ],
  summary:
    "Seven POS systems sold to Pakistani businesses, compared on what owners ask about most: FBR, offline selling, Urdu, khata and the published price. Every fact comes from the vendor's own site.",
  shortAnswer:
    "There is no single best POS software in Pakistan; the right one depends on your business. For restaurants that must report to FBR or a provincial authority today, CORN POS, Oscar and Moneypex list those links. For accounting-led traders, HysabOne. For a free start, Loyverse. Compare offline selling, Urdu, khata and the full yearly cost before you sign.",
  keyPoints: [
    "Seven systems side by side, from the vendors' own pages (checked 5 Nov 2026)",
    "Which ones list FBR, PRA, SRB or KPRA links today",
    "What to look for as a restaurant, kiryana, pharmacy, distributor or clothing shop",
    "A criteria table to score each system yourself, with no made-up ratings",
    `Where ${BRAND_NAME} fits, including what it does not do yet`,
  ],
  sections: [
    {
      id: "about-this-guide",
      heading: "Who wrote this, and how we compared",
      blocks: [
        {
          type: "note",
          tone: "info",
          title: "This is our own guide",
          text: `${BRAND_NAME} makes POS software, so we are one of the systems in this comparison. We have tried to be fair: we say where others are ahead of us, and we list the gaps in our own product.`,
        },
        {
          type: "p",
          text: 'Most "best POS in Pakistan" lists are written by one vendor and rank that vendor first, with star ratings nobody can check. We did it differently:',
        },
        {
          type: "list",
          items: [
            "Every fact about another product comes from **that company's own website**. The pages are listed under Sources.",
            "We checked every page on **5 November 2026**. Prices and features change, so check again before you buy.",
            'Where a vendor\'s pages did not say something, we wrote **"Not published"**. That does not mean the feature is missing. Ask them.',
            "Prices are shown in the currency each vendor publishes (PKR or US$). We did not convert them.",
            "No stars and no scores. You will find a criteria table further down to score systems yourself.",
          ],
        },
      ],
    },
    {
      id: "comparison",
      heading: "The best POS software in Pakistan, side by side",
      blocks: [
        {
          type: "p",
          text: "First, what each system is and what it costs, as published on its own site.",
        },
        {
          type: "table",
          caption:
            "Seven POS systems sold in Pakistan: who they suit and the published price (checked 5 Nov 2026)",
          head: ["System", "What it is", "Who it suits", "Published price"],
          rows: [
            [
              "Oscar POS",
              "POS, inventory and payments in one system",
              "Restaurants, cafes and retail; also lists grocery, pharmacy and clothing",
              "Price on request (offers a free start and a demo)",
            ],
            [
              "CORN POS",
              "Restaurant POS from Lahore",
              "Restaurants, cafes and franchises",
              "Starter $50 and Pro $130 per branch a month; Elite on request",
            ],
            [
              "HysabOne",
              "Cloud accounting with inventory, POS and ERP",
              "Traders, retailers and wholesalers",
              "POS plan from PKR 6,563 a month; 14-day free trial",
            ],
            [
              "Moneypex",
              "Cloud business software with separate POS products",
              "Retail, restaurants, pharmacies, mobile shops and distributors",
              "Retail POS PKR 1,500 a month; Restaurant POS PKR 32,400 a year; paid add-ons",
            ],
            [
              "Loyverse",
              "Free POS app for phones and tablets",
              "Small shops and cafes that want a free start",
              "Core POS free; add-ons from US$5 a month",
            ],
            [
              "Odoo POS",
              "POS inside a full business software suite",
              "Businesses that want POS, stock and accounts in one large system",
              "One app free; Standard US$11.20 per user a month (first-year discount shown)",
            ],
            [
              BRAND_NAME,
              "POS with khata, stock, accounting and delivery (our own product)",
              "Restaurants first; also shops, grocery, pharmacy and distributors",
              "Light free for 3 months; Shop $29 a month; Business $79 a month (USD)",
            ],
          ],
        },
        {
          type: "p",
          text: "Next, the features Pakistani owners ask about most.",
        },
        {
          type: "table",
          caption:
            "Offline selling, Urdu, FBR, khata and restaurant tools, from each vendor's own pages",
          head: [
            "System",
            "Works offline",
            "Urdu",
            "FBR and provincial tax",
            "Khata / credit",
            "Restaurant tools",
          ],
          rows: [
            [
              "Oscar POS",
              "Yes, syncs offline orders later",
              "Not published",
              '"FBR, SRB, PRA ready"',
              "Accounts receivable and unpaid-bill reminders; khata not named",
              "Kitchen display, KOT routing, table ordering, delivery-app orders",
            ],
            [
              "CORN POS",
              "Yes, data on a local server and its live server",
              "Not published",
              "Lists FBR, PRA, SRB and KPRA",
              "Not published",
              "Kitchen display, waiter and owner apps, rider app, customer app",
            ],
            [
              "HysabOne",
              "Unclear: POS plan lists offline mode, but its FAQ says it needs internet",
              "Yes, Urdu interface",
              "Posts invoices to FBR IRIS from the books; real-time POS link not stated",
              "Customer and supplier ledgers, receivables aging",
              "Not published beyond recipe costing",
            ],
            [
              "Moneypex",
              "Yes",
              "Not published",
              "FBR add-on (PKR 1,000 a month), real-time to IRIS; PRA",
              "Not published",
              "Tables, waiter app, KOT, delivery; kitchen display add-on",
            ],
            [
              "Loyverse",
              "Yes, syncs when back online",
              "Yes, in the POS app",
              "Not published",
              "Not published (loyalty points only)",
              "Kitchen display free",
            ],
            [
              "Odoo POS",
              "Yes, syncs when reconnected",
              "Not published",
              "Not published on Odoo's own pages",
              "Customer credit limits with warnings",
              "Floor plans, preparation display, kitchen printers, split bills, self-ordering",
            ],
            [
              BRAND_NAME,
              "Shop counter yes; tables and kitchen screen offline not released yet",
              "Yes, app and receipts",
              "FBR coming soon; PRA, SRB and KPRA not built",
              "Yes: running balances, limits, aging, reminders",
              "Tables, kitchen display, waiter app, own order page, rider app",
            ],
          ],
        },
        {
          type: "note",
          tone: "info",
          title: "What about Foodics?",
          text: "Foodics is a well-known restaurant POS in the Gulf. Its website lists Saudi Arabia, the UAE, Egypt, Kuwait, Jordan, Oman and Qatar, and does not mention Pakistan (checked 5 Nov 2026). So we have left it out of the tables. If you have a branch in the Gulf, see our [comparison with Foodics](/compare/tajirpoint-vs-foodics).",
        },
      ],
    },
    {
      id: "each-system",
      heading: "Each system in short",
      blocks: [
        { type: "h3", text: "Oscar POS" },
        {
          type: "p",
          text: 'Oscar sells POS, inventory and payments together and covers both restaurants and shops. Its restaurant page lists a kitchen display, KOT routing, table ordering, delivery-app orders in one list, offline selling, and "FBR, SRB, PRA ready". It does not publish prices, and its pages we read do not mention Urdu. **Good for:** restaurants and retailers who want one Pakistani vendor and are happy to get a quote.',
        },
        { type: "h3", text: "CORN POS" },
        {
          type: "p",
          text: "CORN POS is a Lahore-based restaurant POS. It lists FBR, PRA, SRB and KPRA links, offline mode with a local server, a kitchen display, waiter and owner apps, a rider app and a customer ordering app. It runs on browsers, Android tablets, iPads and desktops. Prices are published in $ per branch a month. **Good for:** restaurants and chains that must send sales to FBR and their province today.",
        },
        { type: "h3", text: "HysabOne" },
        {
          type: "p",
          text: "HysabOne is accounting software first, with inventory and POS on top. It has an Urdu interface, customer and supplier ledgers with receivables aging, and posts invoices to FBR IRIS from inside the books. Its pages do not describe restaurant tools such as tables or a kitchen display. Its POS plan lists offline mode, but its FAQ says it needs internet, so ask them. **Good for:** traders and wholesalers whose main need is the books.",
        },
        { type: "h3", text: "Moneypex" },
        {
          type: "p",
          text: "Moneypex sells separate products for retail, restaurants, pharmacies, mobile shops and distribution. Its POS pages list offline billing, FBR integration as a paid add-on and a PRA link. The restaurant plan includes tables, a waiter app and delivery; the kitchen display, extra users and extra terminals are paid add-ons. **Good for:** owners who want a low published starting price and will pay only for the add-ons they use.",
        },
        { type: "h3", text: "Loyverse" },
        {
          type: "p",
          text: "Loyverse is a free POS app for iPhone, iPad and Android, used in 170+ countries by its own count. The core POS, kitchen display, loyalty and multi-store are free; sales history, staff management and advanced stock are paid add-ons in US$. Urdu is one of the app's languages. Its pages do not list FBR integration or a customer credit ledger. **Good for:** a small shop or cafe that wants to start free and does not need FBR or khata.",
        },
        { type: "h3", text: "Odoo POS" },
        {
          type: "p",
          text: "Odoo's POS is part of a large business suite with stock, accounting and much more. It lists offline selling, floor plans, a preparation display, kitchen printers, split bills, self-ordering and customer credit limits. Pricing is per user. Odoo's own pages do not list FBR integration. **Good for:** larger businesses with an IT person or partner to set it up.",
        },
        { type: "h3", text: BRAND_NAME },
        {
          type: "p",
          text: `${BRAND_NAME} is our own product, built for restaurants first and also used by shops, grocery stores, pharmacies and distributors. It has khata, stock, accounting and delivery in one system, with Urdu screens and receipts. FBR integration is **coming soon**, not live. The full picture, gaps included, is in the last section below.`,
        },
      ],
    },
    {
      id: "fbr",
      heading: "FBR integration: what to ask before you buy",
      blocks: [
        {
          type: "p",
          text: "If you are a Tier-1 retailer, or a restaurant, cafe or snack bar, FBR expects your till to report each sale as it happens. Read our [FBR POS integration guide](/guides/fbr-pos-integration) for who must integrate and the penalties.",
        },
        {
          type: "p",
          text: '"FBR integration" can mean different things on a vendor\'s website. Ask each vendor:',
        },
        {
          type: "list",
          items: [
            "Does every sale go to FBR in real time and print the **FBR invoice number and QR code** on the receipt? Ask to see one live.",
            "Or does it only post invoices to IRIS for **digital invoicing**? That is a different duty from POS integration.",
            "Do you also connect to my province: **PRA** (Punjab), **SRB** (Sindh) or **KPRA** (Khyber Pakhtunkhwa)?",
            "What happens to sales made while the internet is down? FBR's rules say offline invoices must be uploaded within 24 hours.",
            "Is FBR included in the price, or a paid add-on?",
          ],
        },
      ],
    },
    {
      id: "how-to-choose",
      heading: "How to choose a POS for your type of business",
      blocks: [
        {
          type: "p",
          text: "The best POS for a biryani house is not the best one for a medical store. Start from what your business does every day.",
        },
        { type: "h3", text: "Restaurants, cafes and takeaways" },
        {
          type: "list",
          items: [
            "Fast order entry with your modifiers and deals, a kitchen display or kitchen printer, tables if you seat guests",
            "Delivery: your own order page and rider app, and a way to bring app orders into the same kitchen",
            "FBR and, in most provinces, PRA, SRB or KPRA reporting",
            "Offline selling that covers tables and the kitchen, not just the counter",
          ],
        },
        {
          type: "p",
          text: "For the full checklist, read [how to choose a restaurant POS](/guides/choose-restaurant-pos).",
        },
        { type: "h3", text: "Kiryana and grocery stores" },
        {
          type: "list",
          items: [
            "Fast barcode checkout, and selling by carton, kg or piece",
            "A digital khata for customers who buy on credit, with limits and reminders",
            "Offline selling, because load-shedding and dropped internet are daily events",
            "Low-stock alerts and simple stock counts",
          ],
        },
        {
          type: "p",
          text: "See [digital khata](/guides/digital-khata) and [stock counting](/guides/stock-counting).",
        },
        { type: "h3", text: "Pharmacies and medical stores" },
        {
          type: "list",
          items: [
            "Batch and expiry on every strip, with the oldest stock sold first",
            "A near-expiry list so you can return or clear stock in time",
            "Search by generic name when a brand is out of stock",
            "Purchases and what you owe each distributor",
          ],
        },
        { type: "h3", text: "Distributors and wholesalers" },
        {
          type: "list",
          items: [
            "Route and van sales, with cash and stock matched at day end",
            "Dealer price lists and customer credit limits",
            "Stock in more than one warehouse",
            "Proper accounts, because credit and supplier balances are the business",
          ],
        },
        { type: "h3", text: "Clothing and shoe shops" },
        {
          type: "list",
          items: [
            "Sizes and colours as variants, each with its own barcode and stock",
            "Barcode label printing",
            "Exchanges and returns without arguments at the counter",
            "Stock across branches, and loyalty for repeat customers",
          ],
        },
        {
          type: "note",
          tone: "info",
          title: "Ask for a demo on your own data",
          text: "Whatever your business, ask each vendor to run a demo with your own products or menu, and to switch the Wi-Fi off halfway. You will learn more in ten minutes than from any list, including this one.",
        },
      ],
    },
    {
      id: "criteria",
      heading: "A criteria table to score each system yourself",
      blocks: [
        {
          type: "p",
          text: "We do not give star ratings, because what matters to a pharmacy in Multan is not what matters to a cafe in Karachi. Use this table instead.",
        },
        {
          type: "table",
          caption: "What to check, why, and how to test it in a demo",
          head: ["What to check", "Why it matters", "How to test it"],
          rows: [
            [
              "FBR and provincial tax",
              "Penalties and sealing for those who must integrate",
              "Make a sale and see the FBR invoice number and QR code on the receipt",
            ],
            [
              "Offline selling",
              "The internet and power will drop on a busy day",
              "Switch the Wi-Fi off, make three sales, switch it on, check the report",
            ],
            [
              "Urdu",
              "Staff learn faster; customers can read receipts",
              "Ask to see the screens and a printed receipt in Urdu",
            ],
            [
              "Khata / credit",
              "Most Pakistani shops sell on credit",
              "Sell on credit, take part payment, print the customer's statement",
            ],
            [
              "Speed at the counter",
              "Queues cost sales",
              "Ring up your five most common sales and count the taps",
            ],
            [
              "Your business type",
              "Pharmacy, clothing and restaurants need very different screens",
              "Ask for the feature list of your business type, not the general one",
            ],
            [
              "Devices",
              "Buying new hardware can double the start-up cost",
              "Ask if it runs on your PC, Android phone or tablet, and your printer",
            ],
            [
              "Full yearly cost",
              "Add-ons, extra users and terminals add up",
              "Ask for a written yearly price for your branches, users and add-ons",
            ],
            [
              "Data export and support",
              "You may want to leave one day",
              "Ask how to export everything, and how to reach support on a Saturday night",
            ],
          ],
        },
        {
          type: "p",
          text: "Score each system 0 (missing), 1 (works but awkward) or 2 (works well for us) on each row. Double the rows that matter most to your business. The highest total at a yearly cost you can carry is usually the right choice.",
        },
      ],
    },
    {
      id: "cost",
      heading: "What does POS software cost in Pakistan?",
      blocks: [
        {
          type: "p",
          text: "Published prices on the vendors' own pages (checked 5 Nov 2026) range from a free core app to $130 per branch a month, and some vendors give prices only on request. The headline price is rarely the whole bill.",
        },
        {
          type: "list",
          items: [
            "**Per branch, per user or per terminal.** CORN POS prices per branch, Odoo per user, and Moneypex charges for extra users, shops and terminals.",
            "**Add-ons.** Moneypex lists FBR integration, a kitchen display and web ordering as monthly add-ons. Loyverse charges for sales history beyond 31 days, staff management and advanced stock.",
            "**Currency.** Some vendors publish in PKR and some in US$. A US$ price moves with the exchange rate.",
            "**Free periods.** Check what you pay when a trial or free period ends, and whether your data stays safe if you do not pay.",
            "**Set-up, training and data migration.** Ask if these are free.",
          ],
        },
      ],
    },
    {
      id: "tajir-point",
      heading: `Where ${BRAND_NAME} fits, honestly`,
      blocks: [
        {
          type: "p",
          text: `${BRAND_NAME} is built for restaurants first, and the same system runs shops, grocery stores, pharmacies and distributors. Here is what it does today:`,
        },
        {
          type: "list",
          items: [
            "Restaurant tools: tables and floor plan, kitchen display per station or printed tickets, waiter app for Android, your own online order page, rider app",
            "Khata with running balances, credit limits, 30/60/90-day aging, reminders and PDF statements",
            "Stock per shop or warehouse, purchases from suppliers, low-stock alerts and barcodes",
            "Pharmacy batches and expiry with oldest-first selling; clothing sizes and colours as variants; grocery by carton, kg or piece; van sales for distributors",
            "Double-entry accounting posted from sales and purchases (Accounting add-on)",
            "App and receipts in English, Urdu and Arabic",
            "Runs in any browser, as a Windows desktop app and on Android",
            "Free data move: send us your Excel or old POS export and we load it",
          ],
        },
        {
          type: "h3",
          text: "What it does not do yet",
        },
        {
          type: "list",
          items: [
            "**FBR integration is coming soon.** It is not open to shops yet. If you must be integrated today, choose a system that already is.",
            "PRA, SRB and KPRA links are not built.",
            "The shop counter keeps selling offline, but offline mode for restaurant tables and the kitchen screen is not released yet.",
            "The iOS app is coming soon. Android, Windows and the browser work today.",
          ],
        },
        {
          type: "h3",
          text: "Price",
        },
        {
          type: "p",
          text: "Prices are in US dollars (checked 5 Nov 2026). The Light plan is free for 3 months with no card: one shop, two staff logins, 30 products and 100 orders a day. After that, Shop is $29 a month and Business is $79 a month; the restaurant suite and kitchen display are in Business. See [pricing](/pricing) for the current plans.",
        },
        {
          type: "p",
          text: "Compare us directly with [Oscar POS](/compare/tajirpoint-vs-oscar), [CORN POS](/compare/tajirpoint-vs-corn-pos), [Moneypex](/compare/tajirpoint-vs-moneypex), [HysabOne](/compare/tajirpoint-vs-hysabone) or [Loyverse](/compare/tajirpoint-vs-loyverse), or [book a demo](/book-demo) on your own products or menu.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is the best POS software in Pakistan?",
      a: "There is no single best one. Restaurants that must report to FBR and their province today should look at systems that list those links, such as CORN POS, Oscar and Moneypex. Accounting-led traders may prefer HysabOne. A small shop that wants to start free can try Loyverse. Score each one on your own needs.",
    },
    {
      q: "Which POS software in Pakistan is FBR integrated?",
      a: `On their own sites (checked 5 Nov 2026), CORN POS lists FBR, PRA, SRB and KPRA; Oscar says "FBR, SRB, PRA ready"; Moneypex sells FBR integration as an add-on and lists PRA; HysabOne posts invoices to FBR IRIS. ${BRAND_NAME}'s FBR integration is coming soon. Always ask to see an FBR invoice number and QR code on a live receipt.`,
    },
    {
      q: "Is there a free POS software in Pakistan?",
      a: `Loyverse lists its core POS as free, with paid add-ons. Odoo lists a free plan for one app. ${BRAND_NAME}'s Light plan is free for 3 months with no card, then you choose a paid plan. Check the limits of any free option before you rely on it.`,
    },
    {
      q: "How much does POS software cost in Pakistan?",
      a: "Published prices we found range from a free core app to $130 per branch a month, and some vendors give prices only on request. Add-ons, extra users, extra terminals and FBR integration can add to the bill, so ask for a written yearly price.",
    },
    {
      q: "Which POS works without internet?",
      a: "Oscar, CORN POS, Moneypex, Loyverse and Odoo all say on their sites that they keep selling offline. HysabOne's pages say both. Test it yourself: switch the Wi-Fi off during the demo, make a few sales, then check they sync.",
    },
    {
      q: "Is there POS software in Urdu?",
      a: `Yes. HysabOne has an Urdu interface, Urdu is one of the Loyverse app's languages, and ${BRAND_NAME} has Urdu screens and Urdu receipts. Ask any vendor to show you a printed receipt in Urdu.`,
    },
    {
      q: `Is ${BRAND_NAME} FBR integrated?`,
      a: "Not yet. Our FBR integration is coming soon and has no fixed date, and PRA, SRB and KPRA links are not built. Tax on every bill and tax reports work today.",
    },
  ],
  sources: [
    { label: "Oscar POS home page", url: "https://www.oscar.pk/", publisher: "Oscar" },
    {
      label: "Oscar restaurant solutions",
      url: "https://www.oscar.pk/solutions/restaurant-solutions",
      publisher: "Oscar",
    },
    {
      label: "Oscar accounting features",
      url: "https://www.oscar.pk/features/accounting-solution",
      publisher: "Oscar",
    },
    { label: "CORN POS home page", url: "https://www.cornpos.com/", publisher: "CORN POS" },
    { label: "CORN POS pricing", url: "https://www.cornpos.com/pricing", publisher: "CORN POS" },
    { label: "HysabOne home page", url: "https://hysabone.com/", publisher: "HysabOne" },
    { label: "HysabOne pricing", url: "https://hysabone.com/pricing/", publisher: "HysabOne" },
    {
      label: "HysabOne industries",
      url: "https://hysabone.com/industries/",
      publisher: "HysabOne",
    },
    {
      label: "Moneypex restaurant POS (Pakistan)",
      url: "https://moneypex.com/pk/restaurant-pos",
      publisher: "Moneypex",
    },
    {
      label: "Moneypex retail POS (Pakistan)",
      url: "https://moneypex.com/pk/retail-pos",
      publisher: "Moneypex",
    },
    {
      label: "Moneypex FBR integration",
      url: "https://moneypex.com/pk/fbr",
      publisher: "Moneypex",
    },
    { label: "Moneypex home page", url: "https://moneypex.com/", publisher: "Moneypex" },
    { label: "Loyverse pricing", url: "https://loyverse.com/pricing", publisher: "Loyverse" },
    { label: "Loyverse home page", url: "https://loyverse.com/", publisher: "Loyverse" },
    {
      label: "Loyverse help: how to change language",
      url: "https://help.loyverse.com/help/how-change-language",
      publisher: "Loyverse",
    },
    { label: "Odoo pricing", url: "https://www.odoo.com/pricing", publisher: "Odoo" },
    {
      label: "Odoo Point of Sale features",
      url: "https://www.odoo.com/app/point-of-sale-features",
      publisher: "Odoo",
    },
    {
      label: "Odoo POS for restaurants",
      url: "https://www.odoo.com/app/point-of-sale-restaurant",
      publisher: "Odoo",
    },
    { label: "Foodics home page", url: "https://www.foodics.com/", publisher: "Foodics" },
    {
      label: "POS Integration: Frequently Asked Questions",
      url: "https://download1.fbr.gov.pk/Docs/20201201313212651FAQs-POSIntegration.pdf",
      publisher: "FBR",
    },
    {
      label: "POS Booklet (Sales Tax Act and Rules provisions on POS integration), 2025",
      url: "https://download1.fbr.gov.pk/Docs/202551615541769POSBooklet.pdf",
      publisher: "FBR",
    },
  ],
  checked: "5 November 2026",
  links: [
    { label: "Pricing", href: "/pricing", note: "Light free for 3 months, then Shop or Business" },
    {
      label: "Restaurant POS",
      href: "/business/restaurants",
      note: "Tables, kitchen display, waiter app, online orders and riders",
    },
    {
      label: "Grocery & kiryana POS",
      href: "/business/grocery-kiryana",
      note: "Barcode checkout, khata, carton to piece",
    },
    {
      label: "Pharmacy POS",
      href: "/business/pharmacy",
      note: "Batches, expiry and oldest-first selling",
    },
    {
      label: "Distributors & wholesale",
      href: "/business/distributors-wholesale",
      note: "Van sales, routes and credit control",
    },
    {
      label: "FBR Integration add-on",
      href: "/extensions/fbr-integration",
      note: "Coming soon: what it will do",
    },
    { label: "Book a demo", href: "/book-demo", note: "See it run on your own products or menu" },
  ],
  related: ["fbr-pos-integration", "choose-restaurant-pos", "digital-khata"],
  datePublished: "2026-11-05",
  dateModified: "2026-11-05",
  og: {
    eyebrow: "Guide · POS software Pakistan",
    title: "Best POS software in Pakistan, compared honestly.",
    sub: "Seven systems on FBR, offline, Urdu, khata and price, from the vendors' own pages.",
    pills: ["FBR", "Offline", "Urdu", "Khata"],
  },
};

export default guide;
