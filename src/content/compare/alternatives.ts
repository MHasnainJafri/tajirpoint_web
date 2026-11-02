import type { Comparison } from "./types";
import { TP } from "./tajirpoint";
import { BRAND_NAME } from "@/lib/config/brand";

/**
 * "TajirPoint vs the way you do it now": the paper khata, Excel and a basic
 * cash register. No other company is named here, so these pages carry no
 * competitor sources — only plain facts about paper, spreadsheets and tills.
 */

export const paperKhata: Comparison = {
  slug: "tajirpoint-vs-paper-khata",
  kind: "alternative",
  otherName: "Paper khata",
  label: `${BRAND_NAME} vs paper khata`,
  blurb: "Your credit register, without lost pages, sums by hand or arguments over who owes what.",
  audience: "Shops that sell on credit",
  seo: {
    title: `${BRAND_NAME} vs Paper Khata: Digital Credit Book`,
    description:
      "Paper khata or a digital credit book? See what changes when every sale and payment posts to a live ledger with limits, reminders and statements. Honest guide.",
    keywords: [
      "digital khata",
      "khata app",
      "paper khata vs app",
      "udhaar register",
      "credit book app for shops",
      "khata book Pakistan",
    ],
  },
  og: {
    eyebrow: "Compare",
    title: "Paper khata vs a digital credit book.",
    sub: "What you keep, what you stop losing, and when paper is still fine.",
    pills: ["Running balance", "Credit limits", "Reminders", "Statements"],
  },
  hero: {
    eyebrow: `${BRAND_NAME} vs paper khata`,
    h1: `Paper khata or ${BRAND_NAME}: which is right for your shop?`,
    sub: "Every shop that sells on credit keeps a register. Here is an honest look at what a digital khata changes, and when a notebook is still enough.",
  },
  verdict: {
    tajirpoint: `Choose ${BRAND_NAME} if many customers buy on credit, more than one person writes in the register, or you lose track of who owes what.`,
    other:
      "Keep the paper khata if only a few trusted customers buy on credit and you alone write every entry. It costs almost nothing and needs no phone.",
  },
  tajirpointStrengths: [
    "The balance is worked out for you after every sale and payment, so there are no adding mistakes.",
    "A credit limit warns you before a customer goes over.",
    "See who has owed money for 30, 60 or 90+ days at a glance.",
    "Send a customer a PDF statement on chat in a tap, so there is less arguing.",
    "Corrections are added as new entries, never rubbed out, so the history stays honest.",
    "If the phone or PC breaks, your records are still safe online.",
  ],
  otherStrengths: [
    "A notebook costs a few rupees and never needs charging, internet or updates.",
    "Anyone can write in it with no training.",
    "Some older customers trust a signature in the register more than a screen.",
    "For a handful of credit customers, paper can be all you need.",
  ],
  rows: [
    {
      feature: "Running balance per customer",
      tajirpoint: TP.khata,
      other: { mark: "no", text: "Added up by hand, page by page." },
    },
    {
      feature: "Credit limit warning",
      tajirpoint: { mark: "yes", text: "Alerts before a customer goes over their limit." },
      other: { mark: "no", text: "Only if you remember." },
    },
    {
      feature: "Who is late paying",
      tajirpoint: { mark: "yes", text: "30 / 60 / 90+ day aging list." },
      other: { mark: "no", text: "Flip back through old pages." },
    },
    {
      feature: "Payment reminders",
      tajirpoint: { mark: "yes", text: "Scheduled reminders and PDF statements to share on chat." },
      other: { mark: "no", text: "A phone call or a visit." },
    },
    {
      feature: "Sale and credit in one step",
      tajirpoint: {
        mark: "yes",
        text: "A credit sale at the counter posts to the khata at the same time.",
      },
      other: { mark: "no", text: "Write the bill, then write the khata again." },
    },
    {
      feature: "If the book is lost or damaged",
      tajirpoint: { mark: "yes", text: "Records are kept online and on the device." },
      other: { mark: "no", text: "The money owed on those pages is hard to prove." },
    },
    {
      feature: "Several staff writing entries",
      tajirpoint: TP.staff,
      other: { mark: "partial", text: "Possible, but hard to know who wrote what." },
    },
    {
      feature: "Cost",
      tajirpoint: TP.freeStart,
      other: { mark: "info", text: "The price of a notebook." },
    },
    {
      feature: "Needs a phone or computer",
      tajirpoint: {
        mark: "info",
        text: "Yes: a PC, laptop or Android phone. Keeps working offline.",
      },
      other: { mark: "info", text: "No." },
    },
    {
      feature: "Language",
      tajirpoint: TP.languages,
      other: { mark: "info", text: "Whatever you write in." },
    },
  ],
  sections: [
    {
      heading: "Why a paper khata goes wrong",
      paragraphs: [
        "The register itself is a good idea. Problems start when it gets busy: two people write at the same time, a page gets wet, a total is carried forward wrongly, or a customer says they paid last week and nobody wrote it down.",
        "None of this means anyone is dishonest. A notebook simply has no way to add up for you, warn you, or show both sides the same record.",
      ],
    },
    {
      heading: `What changes with ${BRAND_NAME}`,
      paragraphs: [
        "When you sell on credit at the counter, the sale goes straight into that customer's ledger. When they pay, the payment goes in too, and the balance updates on its own.",
        "You can set a credit limit for each customer and see who has owed money the longest. When it is time to ask for payment, you send them a statement instead of reading out old pages.",
        `${BRAND_NAME} is also a full POS: the same app does your bills, stock and purchases, so the khata is not a separate job.`,
      ],
    },
    {
      heading: "Moving your khata across",
      paragraphs: [
        "You don't need to type in years of pages. Start with each customer's current balance as an opening balance. If you already have a list in Excel, send it to us and our team loads it for free.",
      ],
    },
  ],
  faqs: [
    {
      question: `Can I keep my paper khata and use ${BRAND_NAME} as well?`,
      answer: `Yes. Many shops start by entering each customer's current balance as an opening balance, then record new credit sales and payments in ${BRAND_NAME}. You can keep the old book for history.`,
    },
    {
      question: "Is my customers' credit data safe?",
      answer:
        "Each staff member signs in with their own login, entries are never silently changed, and the records are kept online, so a broken phone does not lose them.",
    },
    {
      question: "Does it work without internet?",
      answer:
        "Yes. The shop counter keeps selling offline, including credit sales for customers already on the till up to their credit limit, and everything syncs when the connection returns.",
    },
    {
      question: "How much does it cost?",
      answer:
        "The Light plan is free for 3 months with no card. After that you choose a paid plan. See the pricing page for current prices.",
    },
  ],
  sources: [],
  related: ["tajirpoint-vs-excel", "tajirpoint-vs-cash-register"],
};

export const excel: Comparison = {
  slug: "tajirpoint-vs-excel",
  kind: "alternative",
  otherName: "Excel / spreadsheets",
  label: `${BRAND_NAME} vs Excel`,
  blurb: "Stop copying sales into a sheet at night. Keep the exports for your accountant.",
  audience: "Shops and distributors running on spreadsheets",
  seo: {
    title: `${BRAND_NAME} vs Excel for Shop Stock and Sales`,
    description:
      "Running your shop on Excel or Google Sheets? An honest look at what a POS does better, where a spreadsheet is still fine, and how to move your sheets for free.",
    keywords: [
      "excel vs POS",
      "inventory in excel vs software",
      "spreadsheet for shop sales",
      "replace excel stock sheet",
      "POS software instead of excel",
    ],
  },
  og: {
    eyebrow: "Compare",
    title: "Excel vs a POS for your shop.",
    sub: "Where a spreadsheet works, where it breaks, and how to move your sheets for free.",
    pills: ["Live stock", "Khata", "Reports", "Free data move"],
  },
  hero: {
    eyebrow: `${BRAND_NAME} vs Excel`,
    h1: `Excel or ${BRAND_NAME} for your sales, stock and credit?`,
    sub: "Excel is a brilliant tool and many shops start with it. This page is about the day it starts to cost you time, and what a POS does instead.",
  },
  verdict: {
    tajirpoint: `Choose ${BRAND_NAME} if you type sales into a sheet after the shop closes, your stock numbers never match the shelf, or more than one person edits the file.`,
    other:
      "Stay with Excel if you have very few sales a day, one person does all the entries, and you mainly need a list or a budget.",
  },
  tajirpointStrengths: [
    "A sale at the counter updates stock, the customer's khata and your reports at once. Nothing to copy later.",
    "No broken formulas, no wrong row pasted over the right one.",
    "Each staff member has their own login and only sees what their role allows.",
    "Prints receipts and works with barcode scanners and receipt printers.",
    "Keeps selling offline and syncs later.",
    "Send us your sheets and we load them for free.",
  ],
  otherStrengths: [
    "You may already have it, and you can shape a sheet any way you like.",
    "Great for one-off sums, budgets and planning.",
    `Your accountant probably works in it. You can still export from ${BRAND_NAME} for them.`,
    "No new system to learn.",
  ],
  rows: [
    {
      feature: "Recording a sale",
      tajirpoint: {
        mark: "yes",
        text: "At the counter, with a printed receipt. Stock goes down by itself.",
      },
      other: { mark: "partial", text: "Typed into a row, often at the end of the day." },
    },
    {
      feature: "Stock levels",
      tajirpoint: TP.stock,
      other: { mark: "partial", text: "Correct only if every sale and purchase was typed in." },
    },
    {
      feature: "Customer credit (khata)",
      tajirpoint: TP.khata,
      other: { mark: "partial", text: "A separate sheet you keep in step by hand." },
    },
    {
      feature: "Accounts (P&L, balance sheet)",
      tajirpoint: TP.accounting,
      other: { mark: "partial", text: "Possible with careful formulas and a lot of time." },
    },
    {
      feature: "Several people at once",
      tajirpoint: TP.staff,
      other: {
        mark: "partial",
        text: "Shared files can clash; anyone with the file can change any cell.",
      },
    },
    {
      feature: "Barcode scanner and receipt printer",
      tajirpoint: {
        mark: "yes",
        text: "Works with USB, Bluetooth and network printers and scanners.",
      },
      other: { mark: "no", text: "Not built for a counter." },
    },
    {
      feature: "Works offline",
      tajirpoint: TP.offlineShop,
      other: { mark: "yes", text: "A desktop file works offline; sharing needs internet." },
    },
    {
      feature: "Cost",
      tajirpoint: TP.freeStart,
      other: { mark: "info", text: "Often already on your computer." },
    },
    {
      feature: "Moving your data",
      tajirpoint: TP.migration,
      other: { mark: "info", text: "—" },
    },
  ],
  sections: [
    {
      heading: "Where spreadsheets start to hurt",
      paragraphs: [
        "A sheet only knows what someone typed into it. On a busy day, sales get typed late or not at all, stock numbers drift away from the shelf, and the khata sheet stops matching the sales sheet.",
        "When two people work on the file, one can save over the other's changes. A single wrong formula can change every total below it without anyone noticing.",
      ],
    },
    {
      heading: `What ${BRAND_NAME} does instead`,
      paragraphs: [
        `The sale is recorded once, at the counter. From that one entry ${BRAND_NAME} updates stock, the customer's credit balance and your daily reports, and with the Accounting add-on it posts to your books too.`,
        "Purchases from suppliers add stock the same way. You see what sold, what is running low and who owes you, without building any formulas.",
      ],
    },
    {
      heading: "Keep Excel for what it is good at",
      paragraphs: [
        `You don't have to give up spreadsheets. Use them for planning and for your accountant, and let ${BRAND_NAME} handle the day-to-day counter, stock and credit.`,
        "To switch, send us your product list, customer list and credit balances as Excel or CSV. Our team loads them for free before you go live.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I import my Excel product list?",
      answer:
        "Yes. Send us your sheets (Excel or CSV) and our team loads products, prices, barcodes, customers, suppliers, credit balances and opening stock for free.",
    },
    {
      question: "Can I still get my data out into Excel?",
      answer:
        "Yes. Your data stays yours: you can sign in, view and export it, even after the free Light period ends.",
    },
    {
      question: "Do I need to be good with computers?",
      answer:
        "No. The counter screen is made for shop staff, and you can book a free demo where we set it up with you in English or Urdu.",
    },
  ],
  sources: [],
  related: ["tajirpoint-vs-paper-khata", "tajirpoint-vs-cash-register"],
};

export const cashRegister: Comparison = {
  slug: "tajirpoint-vs-cash-register",
  kind: "alternative",
  otherName: "Basic cash register",
  label: `${BRAND_NAME} vs a cash register`,
  blurb:
    "A till rings up sales. A POS also knows your stock, your credit customers and your profit.",
  audience: "Shops and cafés with a simple till",
  seo: {
    title: `${BRAND_NAME} vs a Cash Register: Is a POS Worth It?`,
    description:
      "A basic cash register or a POS system? An honest comparison of cost, stock, customer credit, reports and staff control, and when a simple till is still enough.",
    keywords: [
      "cash register vs POS",
      "POS vs cash register",
      "electronic cash register",
      "do I need a POS system",
      "till vs POS",
    ],
  },
  og: {
    eyebrow: "Compare",
    title: "Cash register vs a POS system.",
    sub: "Cost, stock, credit customers and reports, compared honestly.",
    pills: ["Stock", "Khata", "Reports", "Staff logins"],
  },
  hero: {
    eyebrow: `${BRAND_NAME} vs a cash register`,
    h1: `A basic cash register or ${BRAND_NAME}: what do you need?`,
    sub: "A simple till takes money and prints a slip. A POS does that and also tracks stock, credit and profit. Here is when each one makes sense.",
  },
  verdict: {
    tajirpoint: `Choose ${BRAND_NAME} if you want to know your stock, sell on credit, see profit by item, or check the shop from your phone when you are away.`,
    other:
      "Keep a basic till if you sell a few items, never sell on credit, and only need the day's cash total.",
  },
  tajirpointStrengths: [
    "Every sale lowers stock, so you see what to reorder.",
    "Credit sales go into each customer's khata.",
    "Reports by item, by staff member and by day, not just a cash total.",
    "Each cashier has their own login, and voids and discounts are recorded.",
    "Runs on a PC, laptop or Android device you may already have.",
    "Works offline and syncs later.",
  ],
  otherStrengths: [
    "A till is a one-off purchase with no monthly fee.",
    "Very simple: almost no training.",
    "Needs no internet and no updates.",
    "Built to survive a busy counter for years.",
  ],
  rows: [
    {
      feature: "Take payment and print a receipt",
      tajirpoint: {
        mark: "yes",
        text: "Cash, card (from your bank terminal) or both, with a printed receipt.",
      },
      other: { mark: "yes", text: "Yes." },
    },
    {
      feature: "Stock tracking",
      tajirpoint: TP.stock,
      other: { mark: "no", text: "Most basic tills don't track stock." },
    },
    {
      feature: "Customer credit (khata)",
      tajirpoint: TP.khata,
      other: { mark: "no", text: "Kept separately on paper." },
    },
    {
      feature: "Reports",
      tajirpoint: {
        mark: "yes",
        text: "Day-end report, sales by item and staff, tax by rate; profit and loss with the Accounting add-on.",
      },
      other: { mark: "partial", text: "Usually a daily total printout." },
    },
    {
      feature: "Staff control",
      tajirpoint: {
        mark: "yes",
        text: "Own login per cashier; voids and discounts are recorded with who did them.",
      },
      other: { mark: "partial", text: "Depends on the model." },
    },
    {
      feature: "Check the shop from your phone",
      tajirpoint: { mark: "yes", text: "Sign in from anywhere to see today's sales." },
      other: { mark: "no", text: "You need to be at the till." },
    },
    {
      feature: "Works without internet",
      tajirpoint: TP.offlineRetail,
      other: { mark: "yes", text: "Yes." },
    },
    {
      feature: "Hardware",
      tajirpoint: TP.hardware,
      other: { mark: "info", text: "The till itself." },
    },
    {
      feature: "Sending sales to FBR (Pakistan)",
      tajirpoint: TP.fbr,
      other: { mark: "info", text: "Depends on the model and supplier." },
    },
    {
      feature: "Cost",
      tajirpoint: TP.freeStart,
      other: { mark: "info", text: "One-off purchase." },
    },
  ],
  sections: [
    {
      heading: "What a cash register is good at",
      paragraphs: [
        "A basic till is quick, sturdy and simple. If you sell a small range of items for cash and only need to count the drawer at night, it does the job.",
      ],
    },
    {
      heading: "What it can't tell you",
      paragraphs: [
        "A till doesn't know which items are running out, which customers owe you money, or which products make you the most profit. It also can't show you today's sales when you are not in the shop.",
        `${BRAND_NAME} records the same sale, but also lowers stock, updates the customer's khata if they bought on credit, and adds it to reports you can open on your phone.`,
      ],
    },
    {
      heading: "If you need FBR today",
      paragraphs: [
        `Some businesses in Pakistan must send each sale to FBR. ${BRAND_NAME}'s FBR connector is coming soon and is not live yet. If you need it today, ask us for the expected date before you switch.`,
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need to buy new hardware?",
      answer: `Usually not. ${BRAND_NAME} runs in a browser, as a Windows desktop app and on Android, including Android POS terminals with a built-in printer. Receipt printers connect over USB, Bluetooth or the network.`,
    },
    {
      question: "Is a POS hard to learn?",
      answer:
        "The counter screen is made for shop staff. Book a free demo and we set it up with you using your own products.",
    },
    {
      question: "What happens if the internet goes down?",
      answer:
        "The shop counter keeps selling offline and syncs when the connection returns. Offline mode for restaurant tables and the kitchen screen is not released yet.",
    },
  ],
  sources: [],
  related: ["tajirpoint-vs-paper-khata", "tajirpoint-vs-excel", "tajirpoint-vs-loyverse"],
};
