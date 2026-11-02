import type { Guide } from "./types";

// Free data migration: the demo form ("Move my data for me ... free") and
// MIGRATION in lib/marketing/businesses.ts (live site).
// Self-serve import: backend domains/data_exchange (importers products /
// parties / sales_history; tabular.py reads CSV and XLSX, refuses old .xls,
// matches headers loosely, reports row numbers; products importer also reads
// Shopify, WooCommerce, Loyverse, Square, Lightspeed and Odoo exports;
// parties posts the opening khata balance once; sales history is an archive
// with no stock or khata effect). Web: Settings > Import / export
// (ImportExportScreen.tsx, on main).
const guide: Guide = {
  slug: "excel-to-pos",
  category: "Getting started",
  title: "Moving from Excel or paper to a POS: a step-by-step guide",
  seoTitle: "Moving from Excel or Paper to a POS",
  seoDescription:
    "How to move your shop from Excel sheets or a paper register to a POS: what to prepare, cleaning your lists, opening stock and khata, go-live day and free help.",
  keywords: [
    "Excel to POS",
    "move from Excel to POS",
    "import products into POS",
    "switch from paper to POS",
    "POS data migration",
    "inventory spreadsheet to POS",
    "how to start using a POS",
  ],
  summary:
    "Excel and paper get you started, but they cannot keep up with a growing shop. Here is how to move to a POS without losing data or closing for a day.",
  shortAnswer:
    "To move from Excel or paper to a POS, make three clean lists: products (name, price, barcode, stock), customers and suppliers (name, phone, balance owed). Import them, check a few items, count your opening stock, and go live on a quiet day. With TajirPoint, our team loads your lists for you, free.",
  keyPoints: [
    "Signs it is time to leave Excel or paper",
    "The three lists you need, with the columns",
    "How to clean your data in an hour, not a week",
    "Go-live day, step by step",
  ],
  sections: [
    {
      id: "signs",
      heading: "Signs it is time to move",
      blocks: [
        {
          type: "list",
          items: [
            "You do not know your real stock until you count it.",
            "Two people edited the sheet and now nobody trusts the numbers.",
            "Adding up the day's sales takes longer than an hour.",
            "Customers argue about their khata balance.",
            "You opened a second branch, or want to sell online.",
            "Prices changed and the shelf, the sheet and the till all show different numbers.",
          ],
        },
        {
          type: "p",
          text: "A POS fixes these because every sale updates stock, khata and reports at the same moment. Nobody has to copy numbers from one place to another.",
        },
      ],
    },
    {
      id: "three-lists",
      heading: "The three lists you need",
      blocks: [
        {
          type: "p",
          text: "You do not need years of history. You need three lists that are right **today**. Excel, Google Sheets or a CSV file all work.",
        },
        {
          type: "h3",
          text: "1. Products",
        },
        {
          type: "table",
          caption: "Product list columns",
          head: ["Column", "Example", "Needed?"],
          rows: [
            ["Product name", "Basmati Rice 5 kg", "Yes"],
            ["Selling price", "2,450", "Yes"],
            ["Cost price", "2,180", "Recommended"],
            ["Barcode or SKU", "8961234500017", "If you scan"],
            ["Category", "Rice & flour", "Recommended"],
            ["Size / colour / variant", "5 kg", "If you have variants"],
            ["Tax rate", "0% / 18%", "If items differ"],
            ["Opening stock", "24", "If you track stock"],
          ],
        },
        {
          type: "h3",
          text: "2. Customers (your khata)",
        },
        {
          type: "p",
          text: "Name, phone number, and **the balance they owe you today**. Add an email or address only if you have it.",
        },
        {
          type: "h3",
          text: "3. Suppliers",
        },
        {
          type: "p",
          text: "Name, phone number, and **the balance you owe them today**.",
        },
      ],
    },
    {
      id: "clean-data",
      heading: "Clean your data in an hour",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            '**Remove duplicates.** Sort by name and look for the same item twice ("Coke 1.5L" and "Coca Cola 1.5 ltr").',
            "**One product per row.** If an item comes in sizes or colours, either give each its own row or use a variant column.",
            '**Numbers as numbers.** No "Rs" or commas inside price cells. In Excel, keep barcodes as text so a long barcode does not turn into 8.96E+12.',
            "**Phone numbers in one format,** for example 03001234567 or +923001234567.",
            "**Delete dead items** you have not sold in a year. You can add them back later.",
            "**Check the big balances** with the customer before you load them.",
          ],
        },
        {
          type: "note",
          tone: "info",
          title: "Coming from paper?",
          text: "Start with your best-selling 100 to 200 products and every customer with a balance. You can add slow sellers as they come to the counter.",
        },
      ],
    },
    {
      id: "opening-stock",
      heading: "Opening stock and opening balances",
      blocks: [
        {
          type: "p",
          text: "Two numbers set your starting point. Get them right and everything after is accurate.",
        },
        {
          type: "list",
          items: [
            "**Opening stock:** count what is on the shelf on go-live day, or the night before. Do not trust the old sheet for this. Our [stock counting guide](/guides/stock-counting) shows how.",
            "**Opening balances:** each customer's and supplier's balance on go-live day, entered as an opening balance, not as a sale or purchase. That keeps your sales reports correct.",
          ],
        },
      ],
    },
    {
      id: "go-live",
      heading: "Go-live day, step by step",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Pick a quiet day (not Friday, Eid week or the 1st of the month).",
            "Import your lists and check ten random products: name, price, barcode, stock.",
            "Print a test receipt and set your shop name, address and tax details on it.",
            "Give each staff member their own login and role.",
            "Do a few practice sales together: cash, card, credit (khata), a return.",
            "Count opening stock and update it.",
            "Open the register and start selling. Keep the old book or sheet for reference only; write nothing new in it.",
            "At day end, run the Z-report and compare the cash in the drawer.",
          ],
        },
        {
          type: "p",
          text: "Expect the first week to feel slower. By week two most staff are faster on the POS than they ever were on paper.",
        },
      ],
    },
    {
      id: "timeline",
      heading: "What a typical switch looks like",
      blocks: [
        {
          type: "table",
          caption: "A simple one-week plan",
          head: ["When", "What happens"],
          rows: [
            [
              "A week before",
              "Make the three lists. Decide your go-live day. Check your printer and devices.",
            ],
            [
              "Three days before",
              "Lists cleaned and imported (by you, or by our team for free). Spot-check prices and barcodes.",
            ],
            ["Two days before", "Staff logins and roles set up. A few practice sales together."],
            ["The night before", "Count opening stock. Confirm big khata balances."],
            ["Go-live day", "Sell on the POS only. Run the Z-report at closing."],
            [
              "One week after",
              "Look at the first week's sales and stock reports and fix any wrong prices or units.",
            ],
          ],
        },
        {
          type: "p",
          text: "Small shops with a few hundred products often finish faster. Larger shops with several branches should go live one branch at a time, so the team learns on the first one.",
        },
      ],
    },
    {
      id: "mistakes",
      heading: "Common mistakes to avoid",
      blocks: [
        {
          type: "list",
          items: [
            "Running Excel and the POS side by side for weeks. Pick a day and switch.",
            "Loading old khata balances as sales, which inflates your sales reports.",
            "Skipping the opening stock count and trusting the old sheet.",
            "Sharing one login for the whole shop, so nobody knows who did what.",
            "Importing thousands of dead products you never sell.",
          ],
        },
      ],
    },
    {
      id: "tajirpoint",
      heading: "Moving to TajirPoint: free data migration",
      blocks: [
        {
          type: "p",
          text: "Send us your lists, or an export from your old POS, in Excel or CSV. **Our team loads them into TajirPoint for you, free**, before you go live:",
        },
        {
          type: "list",
          items: [
            "Products, prices, barcodes and categories",
            "Customers and suppliers, with their opening credit balances",
            "Opening stock for each branch or warehouse",
            "Staff logins and roles, set up with you on a call",
          ],
        },
        {
          type: "p",
          text: 'Prefer to do it yourself? The back office has an **Import / export** page. It reads Excel (.xlsx) and CSV files, matches column names like "Product Name" or "product_name" for you, and tells you the row number of anything it cannot read. It also reads product exports from Shopify, WooCommerce, Loyverse, Square, Lightspeed and Odoo. Opening balances are added only once, so loading the same file twice never doubles a balance. Old sales history can be loaded as an archive for reference, without touching your stock or khata.',
        },
        {
          type: "p",
          text: 'Ask for it when you [book a free demo](/book-demo?migrate=1) (tick "Move my data for me"), or [ask for a call back](/get-a-call). The Light plan is free for 3 months with no card; see [pricing](/pricing).',
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Can I import my products from Excel?",
      a: "Yes. TajirPoint reads Excel (.xlsx) and CSV files. Old .xls files need saving as .xlsx or CSV first. Or send the file to our team and we load it for you, free.",
    },
    {
      q: "What if I only have a paper register?",
      a: "Make a simple list of your best-selling products with prices, and every customer and supplier with a balance. You can type it in Excel or send clear photos to our team and ask how we can help.",
    },
    {
      q: "Will I lose my customers' khata balances?",
      a: "No. Each customer's current balance is loaded as an opening balance, so their khata continues from where it was.",
    },
    {
      q: "Do I need to close the shop to switch?",
      a: "No. Load your lists beforehand, count opening stock after closing or before opening, and start selling on the POS the next morning.",
    },
    {
      q: "Is data migration really free with TajirPoint?",
      a: "Yes. Our team loads your products, customers, suppliers, credit balances and opening stock from your Excel or CSV files at no charge.",
    },
    {
      q: "Can I bring my data from another POS?",
      a: "Yes. Export products, customers and suppliers from the old system as Excel or CSV. TajirPoint also reads product exports from Shopify, WooCommerce, Loyverse, Square, Lightspeed and Odoo.",
    },
  ],
  links: [
    {
      label: "Book a demo with free migration",
      href: "/book-demo?migrate=1",
      note: 'Tick "Move my data for me"',
    },
    {
      label: "Khata app",
      href: "/features/khata",
      note: "Your credit book, with opening balances",
    },
    {
      label: "Offline POS",
      href: "/features/offline",
      note: "Keeps selling when the internet drops",
    },
    {
      label: "All businesses",
      href: "/business",
      note: "Set-ups for shops, restaurants and distributors",
    },
    { label: "Pricing", href: "/pricing", note: "Light is free for 3 months, no card" },
  ],
  related: ["digital-khata", "stock-counting", "choose-restaurant-pos"],
  datePublished: "2026-11-02",
  dateModified: "2026-11-02",
  og: {
    eyebrow: "Guide · Excel to POS",
    title: "Moving from Excel or paper to a POS.",
    sub: "The three lists you need, how to clean them, go-live day, and free data migration.",
    pills: ["Excel", "Paper", "Opening stock", "Free migration"],
  },
};

export default guide;
