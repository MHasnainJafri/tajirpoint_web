import type { Guide } from "./types";

// TajirPoint claims here are the ones already on /features/khata (live):
// live ledger from every sale and payment, append-only history, credit limits
// with alerts, 30/60/90+ aging, PDF statements shared over chat, scheduled
// reminders, Customer Portal add-on for online payment. Opening balances on
// import: domains/data_exchange/services/importers/parties.py ("opening"
// ledger entry, applied once). Supplier side: parties importer covers
// suppliers with payable balances.
const guide: Guide = {
  slug: "digital-khata",
  category: "Credit & cash",
  title: "Digital khata: a practical guide to udhaar for shops",
  seoTitle: "Digital Khata (Udhaar) Guide for Shops",
  seoDescription:
    "How to give udhaar (customer credit) without losing money: credit limits, clear entries, reminders and statements, and how a khata app keeps it all straight.",
  keywords: [
    "digital khata",
    "khata app",
    "udhaar app",
    "udhaar book",
    "customer credit ledger",
    "khata book for shop",
    "credit limit for customers",
  ],
  summary:
    "Udhaar keeps regular customers coming back, but it is also where most small shops quietly lose money. Here is how to give credit with rules, and how a digital khata helps.",
  shortAnswer:
    "A digital khata is an app that replaces the paper udhaar register. Every credit sale and payment is added to the customer's account with the date and amount, so the balance is always correct. A good one also sets credit limits, shows who has owed money the longest, and sends statements and payment reminders over WhatsApp.",
  keyPoints: [
    "Why paper khata leaks money, and where",
    "Seven rules for giving udhaar safely",
    "What to look for in a khata app",
    "How to move your old register into an app without losing a rupee",
  ],
  sections: [
    {
      id: "what-is-digital-khata",
      heading: "What is a digital khata?",
      blocks: [
        {
          type: "p",
          text: "In Pakistan and across South Asia, the **khata** is the book where a shop writes down **udhaar**: goods given now, paid for later. Many shops also keep a second khata for suppliers, for stock taken on credit.",
        },
        {
          type: "p",
          text: "A **digital khata** does the same job in an app. Each customer has an account. Every credit sale adds to the balance, every payment takes away from it, and the running balance is always worked out for you. Nobody has to add up pages at night.",
        },
        {
          type: "p",
          text: 'The difference matters most on bad days: when the book is lost, when a page is torn, when a customer says "I already paid", or when a staff member forgets to write an entry during a rush.',
        },
      ],
    },
    {
      id: "where-paper-leaks",
      heading: "Where a paper khata loses money",
      blocks: [
        {
          type: "table",
          caption: "Common khata problems and what causes them",
          head: ["Problem", "What usually causes it"],
          rows: [
            [
              "Entries missing",
              "Busy counter, staff forget to write, or write it later from memory",
            ],
            ["Wrong totals", "Adding up by hand across many pages"],
            ['"I already paid" disputes', "Payments not written down, or written without a date"],
            ["Old balances never collected", "Nobody sees who has owed money for 90 days or more"],
            ["Credit keeps growing", "No limit per customer, so a few people owe a lot"],
            ["Book lost or damaged", "One copy, kept under the counter"],
          ],
        },
        {
          type: "p",
          text: "None of these are about bad customers. They are about missing information. The fix is to record everything at the moment it happens, and to see the whole picture without adding it up by hand.",
        },
      ],
    },
    {
      id: "rules-for-udhaar",
      heading: "Seven rules for giving udhaar safely",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**Write it at the counter, not later.** An entry made at the moment of sale is the one nobody argues about. If your khata is part of your POS, the credit sale and the khata entry are the same step.",
            '**Set a limit for every customer.** Start small for new customers and raise it as they pay on time. A limit turns "can I take a bit more?" into a clear yes or no.',
            "**Agree a payment day.** Weekly, after salary day, or at month end. Write it down when you open the account.",
            "**Never change an old entry.** If something was wrong, add a correction as a new entry. That way the history stays honest, for you and for the customer.",
            "**Send a statement every month.** A short list of what was bought and paid, with the balance, stops most arguments before they start.",
            "**Watch the oldest balances, not just the biggest.** Money owed for 90 days or more is the money most likely never to come back.",
            "**Keep suppliers separate.** What you owe suppliers is a different account from what customers owe you. Mixing them hides your real cash position.",
          ],
        },
      ],
    },
    {
      id: "aging",
      heading: "Aging: the one report every khata needs",
      blocks: [
        {
          type: "p",
          text: "An **aging report** sorts what customers owe by how old it is. A typical layout uses four columns: current, 30 days, 60 days and 90 days or more.",
        },
        {
          type: "p",
          text: "Read it from the right. Customers in the 90+ column need a phone call this week. Customers in the 60-day column need a reminder. If a lot of money is moving to the right every month, your credit rules are too loose, even if total sales look good.",
        },
        {
          type: "note",
          tone: "info",
          title: "A simple monthly habit",
          text: "On the first of each month, look at the aging report, call the top five 90+ customers, and pause credit for anyone over their limit until they pay something.",
        },
      ],
    },
    {
      id: "reminders",
      heading: "Reminders that get paid without losing the customer",
      blocks: [
        {
          type: "p",
          text: "Most people who owe a shop are not trying to cheat. They forget, or they lose track of how much it is. A polite, clear reminder with the exact balance works far better than a tense conversation at the counter.",
        },
        {
          type: "list",
          items: [
            "Send the reminder on the agreed payment day, not randomly.",
            "Include the balance and a statement, so the customer can check it.",
            'Keep the tone friendly: "Your balance with us is Rs 4,250. Thank you!"',
            "WhatsApp works better than SMS for most shops, because customers can see the PDF statement.",
            "Stop reminders once the account is settled, so customers do not feel chased.",
          ],
        },
      ],
    },
    {
      id: "what-to-look-for",
      heading: "What to look for in a khata app",
      blocks: [
        {
          type: "p",
          text: "Many free khata apps only record entries. If you run a real shop, look for these as well:",
        },
        {
          type: "list",
          items: [
            "**Connected to your sales.** A credit sale at the till should post to the khata on its own, with the items, so you never type it twice.",
            "**Credit limits with a warning** before the customer goes over.",
            "**Aging** (30, 60, 90+ days) without adding anything up.",
            "**Statements and reminders** you can send over WhatsApp.",
            "**History that cannot be quietly edited.** Corrections should be new entries.",
            "**Staff roles,** so a cashier can give credit up to a limit but cannot delete entries.",
            "**Supplier khata** in the same place, so you see what you owe as well as what you are owed.",
            "**Works offline,** because credit sales do not stop when the internet does.",
            "**Backups in the cloud,** so a lost phone is not a lost khata.",
          ],
        },
      ],
    },
    {
      id: "moving-from-paper",
      heading: "Moving your paper khata into an app",
      blocks: [
        {
          type: "p",
          text: "You do not need to copy years of pages. You only need **today's balance** for each customer and supplier.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Pick a quiet day and a cut-off time.",
            "Add up each customer's balance in the paper book and check the big ones with the customer.",
            "Make a list: name, phone number, balance. Do the same for suppliers.",
            "Enter each balance as an **opening balance**, not as a sale. That way your sales reports stay correct.",
            "From the cut-off time, write nothing new in the paper book. Keep it safely as a record.",
          ],
        },
        {
          type: "p",
          text: "With TajirPoint you can send us that list in Excel or CSV and we load it for you, free. Opening balances are added once, so loading the same file twice never doubles a balance. See our guide to [moving from Excel or paper to a POS](/guides/excel-to-pos).",
        },
      ],
    },
    {
      id: "tajirpoint-khata",
      heading: "How the TajirPoint khata works",
      blocks: [
        {
          type: "p",
          text: "In TajirPoint the khata is part of the POS, not a separate app. Every credit sale, payment and adjustment posts to the customer's ledger with a running balance. History is append-only: corrections are new entries, never silent changes.",
        },
        {
          type: "list",
          items: [
            "Credit limits with alerts before a customer goes over",
            "Aging buckets (30, 60, 90+ days) at a glance",
            "PDF statements you can share over chat in a tap",
            "Scheduled payment reminders",
            "Supplier balances in the same system",
            "With the [Customer Portal add-on](/extensions/customer-portal), credit customers can log in, see their balance and pay online",
          ],
        },
        {
          type: "p",
          text: "Read more on the [khata feature page](/features/khata), or see [pricing](/pricing): the Light plan is free for 3 months with no card.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is the difference between khata and udhaar?",
      a: "Udhaar is the credit itself: goods given now and paid for later. The khata is the book or app where that credit is recorded for each customer.",
    },
    {
      q: "How much credit should I give a new customer?",
      a: "Start with a small limit you can afford to lose, agree a payment day, and raise the limit only after they have paid on time a few times.",
    },
    {
      q: "Is a digital khata safer than a paper register?",
      a: "Usually yes. A cloud-backed khata cannot be lost with a book, totals are worked out for you, and an append-only history shows every entry and correction with its date.",
    },
    {
      q: "Can I keep a supplier khata in the same app?",
      a: "In TajirPoint, yes. Customers and suppliers each have their own balances, and you can import both with their opening balances.",
    },
    {
      q: "Do I lose my old balances when I switch?",
      a: "No. You enter each customer's current balance as an opening balance. TajirPoint's team can load them from your Excel or CSV list for free.",
    },
    {
      q: "Can customers pay their khata online?",
      a: "With TajirPoint's Customer Portal add-on, credit customers can log in, see their balance and pay online.",
    },
  ],
  links: [
    {
      label: "Khata app",
      href: "/features/khata",
      note: "Live customer ledger, limits, aging and reminders",
    },
    {
      label: "Customer Portal add-on",
      href: "/extensions/customer-portal",
      note: "Let credit customers see and pay their balance",
    },
    {
      label: "Grocery & kiryana POS",
      href: "/business/grocery-kiryana",
      note: "Barcode, khata and kg/carton selling",
    },
    { label: "Pricing", href: "/pricing", note: "Light is free for 3 months, no card" },
    { label: "Get a call back", href: "/get-a-call", note: "Ask us how to move your khata over" },
  ],
  related: ["excel-to-pos", "stock-counting", "fbr-pos-integration"],
  datePublished: "2026-11-02",
  dateModified: "2026-11-02",
  og: {
    eyebrow: "Guide · Digital khata",
    title: "Udhaar without the losses: a khata guide for shops.",
    sub: "Credit limits, aging, statements and reminders, and how to move your paper khata into an app.",
    pills: ["Udhaar", "Credit limits", "Aging", "WhatsApp reminders"],
  },
};

export default guide;
