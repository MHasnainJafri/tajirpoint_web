import type { AddonContent } from "./types";

// Source: domains/quickbooks (QBOSyncService.run: customers, completed sales
// as invoices with every line on one fallback item, completed payments,
// expenses as cash purchases on fixed default accounts; incremental on
// last_sync_at, so the first run sends everything; QBOMapping has tax/account
// types but the sync never reads them; tasks.sync_qbo_all_shops on beat at
// :15 hourly; QuickBooksSyncView "Sync now" for owner/manager/accountant;
// QuickBooksStatusView last run counts + error count).
const content: AddonContent = {
  slug: "quickbooks-accounting",
  seoTitle: "QuickBooks Online Sync for Your POS",
  seoDescription:
    "Send your shop's sales, payments, expenses and customers to QuickBooks Online every hour, so your accountant stops re-typing them. One way, into QuickBooks.",
  keywords: [
    "QuickBooks Online POS integration",
    "sync POS sales to QuickBooks",
    "QuickBooks retail sync",
    "QuickBooks for shops",
    "POS to QuickBooks UK",
  ],
  schemaSubCategory: "QuickBooks Online accounting add-on for POS",
  headline: "Your shop's sales and expenses in QuickBooks, without the re-typing.",
  overview: [
    "QuickBooks Online is the accounting software used by many small businesses and their accountants, including in the UK. If your accountant works in QuickBooks, someone today is copying your shop's sales into it by hand. This add-on will do that copying for you.",
    "Once connected, TajirPoint will send your customers, completed sales (as invoices), completed payments and expenses to QuickBooks Online. It runs every hour on its own, and you can press Sync now whenever you want it straight away.",
    "It works one way: from TajirPoint to QuickBooks. Changes made in QuickBooks do not come back into TajirPoint. The first version keeps the mapping simple, so your accountant may want to tidy accounts and tax in QuickBooks; details are in the questions below.",
  ],
  whoFor: [
    "Shops whose accountant or bookkeeper works in QuickBooks Online",
    "Businesses in the UK and Gulf already running their books in QuickBooks",
    "Owners who want sales and expenses in their books every day, not at month end",
    "Shops with one person spending hours copying figures across",
  ],
  problems: [
    {
      problem: "The accountant re-types every sale from the till reports.",
      fix: "Completed sales will go to QuickBooks as invoices automatically, every hour.",
    },
    {
      problem: "Shop expenses never make it into the books.",
      fix: "Expenses recorded in TajirPoint are sent to QuickBooks as cash purchases.",
    },
    {
      problem: "Customer lists are different in the shop and in the books.",
      fix: "Your TajirPoint customers are created in QuickBooks, and updated when they change.",
    },
    {
      problem: "Nobody knows if the books are up to date.",
      fix: "The connector screen shows when the last sync ran, how many records went across, and how many had problems.",
    },
  ],
  features: [
    {
      title: "Sales sent as invoices",
      body: "Each completed sale goes to QuickBooks as an invoice with its lines, quantities, prices and invoice number.",
    },
    {
      title: "Payments and expenses too",
      body: "Completed payments and your recorded expenses are sent across, so money in and money out both reach the books.",
    },
    {
      title: "Customers kept in step",
      body: "Customers are created in QuickBooks with their name, email and phone, and updated when you change them in TajirPoint.",
    },
    {
      title: "Hourly, plus Sync now",
      body: "A sync runs every hour and only sends what changed since the last one. Owners, managers and accountants can also press Sync now.",
    },
    {
      title: "No duplicates",
      body: "TajirPoint remembers what it already sent, so a record sent again updates the same entry in QuickBooks instead of making a copy.",
    },
    {
      title: "Problems shown, not hidden",
      body: "If one record fails, the rest still go across. Each run is logged with its counts and errors.",
    },
  ],
  howItWorks: [
    {
      title: "Ask us from the Add-ons page",
      body: "Tell us which QuickBooks Online company you use and roughly when you want to start.",
    },
    {
      title: "Sign in to QuickBooks",
      body: "With our help you sign in to QuickBooks Online from TajirPoint and approve the connection to your company.",
    },
    {
      title: "Check the first sync with your accountant",
      body: "The first sync sends what is already in TajirPoint. Look it over in QuickBooks with your accountant.",
    },
    {
      title: "Let it run",
      body: "From then on, new and changed records go across every hour. Press Sync now any time.",
    },
  ],
  needs: [
    "A QuickBooks Online subscription (QuickBooks Desktop is not supported)",
    "Permission to connect apps to your QuickBooks company",
    "A TajirPoint account on the Shop plan or above",
    "Ideally your accountant on hand for the first sync",
  ],
  setup: [
    "Once it is live, our team sets it up with you and, if you like, your accountant.",
    "Your QuickBooks subscription is paid to Intuit, not to us.",
    "Your sales in TajirPoint are not changed; data only goes out to QuickBooks.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built but still being tested with real QuickBooks companies, so we have no date yet. Ask us and we will tell you as soon as it opens.",
    },
    {
      q: "Does it work both ways?",
      a: "No. It sends from TajirPoint to QuickBooks only. Edits made in QuickBooks do not come back.",
    },
    {
      q: "Will my products appear in QuickBooks?",
      a: "Not as separate products in the first version. Each invoice line carries the product name, quantity and price, but all lines sit under one general item in QuickBooks.",
    },
    {
      q: "Does it map my tax codes and accounts?",
      a: "Not yet. Tax codes and chart of accounts matching are not in the first version, and expenses go to default accounts. Your accountant may need to adjust them in QuickBooks.",
    },
    {
      q: "Will my old sales be sent?",
      a: "Yes. The first sync sends the completed sales, payments, expenses and customers already in TajirPoint, then only what changes after that. Plan it with your accountant.",
    },
    {
      q: "Do I need the Accounting add-on as well?",
      a: "No. QuickBooks Online sync works on its own.",
    },
    {
      q: "Which plan do I need?",
      a: "It needs the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote:
    "Built as a first version and being tested; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
