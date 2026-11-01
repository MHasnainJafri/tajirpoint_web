import type { AddonContent } from "./types";

// Source: domains/accounting (handler.py seeds the default chart of accounts,
// account mappings and the current month's period; signals.py auto-posts sales,
// returns, purchases, payments, refunds, expenses, stock adjustments and
// payroll; services/financial_statements.py, trial_balance_service.py,
// cash_flow_service.py, depreciation_service.py, bank_reconciliation_service.py,
// owner_equity_service.py, opening_balance_service.py, health_service.py;
// api/viewsets.py period close/reopen, journal reverse, bank auto-match).
const content: AddonContent = {
  slug: "accounting-gl",
  seoTitle: "Accounting Add-on: General Ledger, P&L and Balance Sheet",
  seoDescription:
    "Proper double-entry books that fill themselves from your sales, purchases, payments and expenses. Trial balance, profit and loss, balance sheet and cash flow.",
  keywords: [
    "POS accounting software",
    "general ledger for shops",
    "double entry accounting Pakistan",
    "profit and loss report for retail",
    "balance sheet software for small business",
    "chart of accounts for shops",
  ],
  schemaSubCategory: "Accounting and general ledger add-on for POS",
  headline: "Real books that keep themselves up to date as you sell, buy and pay.",
  overview: [
    "Accounting & General Ledger turns the day-to-day work in TajirPoint into proper double-entry books. Every sale, return, purchase, payment, refund, expense and stock adjustment is posted to the right accounts for you, so your accountant gets a full ledger instead of a pile of receipts.",
    "When you switch it on, a ready-made chart of accounts is set up for a retail business, along with the links that decide which account each kind of entry goes to. You can add your own accounts and change those links at any time.",
    "From the books you get a trial balance, profit and loss, balance sheet and cash flow statement whenever you want them. Close a month when it is done so nobody can post into it by mistake, and reopen it if you need to correct something.",
  ],
  whoFor: [
    "Shops and restaurants that want proper books, not just sales reports",
    "Owners who pay an accountant to rebuild the books every year",
    "Businesses with bank accounts, suppliers on credit and customers on khata",
    "Distributors and multi-branch businesses that need one set of figures",
    "Anyone who needs a balance sheet for a bank, partner or investor",
  ],
  problems: [
    {
      problem: "Our accountant types up every sale and purchase again at year end.",
      fix: "Sales, purchases, payments, expenses and returns are posted to the books as they happen, so the ledger is already there when the accountant asks.",
    },
    {
      problem: "I know what I sold, but not whether I actually made a profit.",
      fix: "The profit and loss statement shows income, cost of goods sold and expenses for any date range, straight from the books.",
    },
    {
      problem: "Someone changed last month's figures after we had closed them.",
      fix: "Close an accounting period and nothing more can be posted into it until someone with permission reopens it.",
    },
    {
      problem: "The bank balance never matches what the system says.",
      fix: "Record your bank transactions and tick them off against payments, by hand or with automatic matching by amount and date.",
    },
  ],
  features: [
    {
      title: "Ready-made chart of accounts",
      body: "A full chart of accounts for a retail business is created on install, with cash, bank, receivables, stock, tax, payables, income and expense accounts. Add or rename accounts as you like.",
    },
    {
      title: "Books that post themselves",
      body: "Sales, sale returns, purchases, purchase returns, payments, refunds, expenses, stock adjustments and finalised payroll create journal entries automatically.",
    },
    {
      title: "Manual journals that must balance",
      body: "Post your own journal entries for anything else. Debits and credits have to match before an entry can be posted, and a posted entry is corrected by reversing it, not by editing it.",
    },
    {
      title: "Financial statements on demand",
      body: "Trial balance, profit and loss, balance sheet and cash flow statement for any period, plus a ledger for every account.",
    },
    {
      title: "Month-end close",
      body: "Open and close accounting periods. A closed month cannot be posted into, which keeps reported figures fixed.",
    },
    {
      title: "Owner money and opening balances",
      body: "Record money the owner puts in or takes out, and enter opening balances when you move your books to TajirPoint.",
    },
    {
      title: "Bank accounts and matching",
      body: "Keep each bank account in the books, record its transactions and match them to payments, by hand or automatically.",
    },
    {
      title: "Fixed assets and depreciation",
      body: "List equipment, furniture and vehicles, choose straight-line or written-down-value depreciation, and post each period's depreciation in one step.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install Accounting & General Ledger from the Add-ons page in the back office. The chart of accounts, account links and the current month are set up for you.",
    },
    {
      title: "Enter your opening balances",
      body: "Add your bank accounts and the balances you start with, so the books begin from the right place.",
    },
    {
      title: "Keep working as normal",
      body: "Sell, buy, take payments and record expenses as you already do. Each one is posted to the books in the background.",
    },
    {
      title: "Check and close each month",
      body: "Look at the trial balance and statements, add any manual journals your accountant needs, then close the month.",
    },
  ],
  needs: [
    "A TajirPoint account on the Shop plan or above",
    "Your opening balances (cash, bank, stock, what customers owe you and what you owe suppliers) if you are moving from another system",
    "Ideally, an accountant to check your setup and month-end figures",
  ],
  setup: [
    "You switch it on yourself from the Add-ons page; the starting accounts are created in a moment.",
    "Accounting & General Ledger needs the Shop plan or above.",
    "Uninstalling keeps your books. Turning it back on picks up where you left off.",
  ],
  faqs: [
    {
      q: "Do I need to know accounting to use this?",
      a: "Not for day-to-day work. Your sales, purchases, payments and expenses are posted for you. Manual journals and month-end close are there for you or your accountant when needed.",
    },
    {
      q: "What about sales I made before I switched it on?",
      a: "Earlier sales, purchases, payments and expenses can be posted into the books as well, so what customers and suppliers owe matches your khata. Ask us if you want help with this.",
    },
    {
      q: "Can I change the chart of accounts?",
      a: "Yes. The default chart is a starting point. You can add accounts, rename them, and change which account each kind of entry goes to.",
    },
    {
      q: "Does payroll go into the books?",
      a: "Yes. If you use the HR & Payroll add-on, salary costs are posted to the books when you finalise a payroll run.",
    },
    {
      q: "Can I import my bank statement?",
      a: "Not yet. Today you record bank transactions in TajirPoint and match them to payments, by hand or with automatic matching by amount and date.",
    },
    {
      q: "Does it work with Cash Management?",
      a: "Yes. If Cash Management is on, your drawers and petty cash are linked to the cash account, and cash movements are posted to the books.",
    },
    {
      q: "Is it included in the free Light plan?",
      a: "No. Accounting & General Ledger needs the Shop plan or above.",
    },
  ],
};

export default content;
