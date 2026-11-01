import type { AddonContent } from "./types";

// Source: domains/cash_management (CashAccount kinds drawer/safe/petty/other,
// CashTransaction categories, CashTransfer, CashCount with expected/variance,
// register-session float + handover, GL posting only when accounting-gl is on).
const content: AddonContent = {
  slug: "cash-management",
  seoTitle: "Cash Management Add-on: Drawers, Petty Cash & Counts",
  seoDescription:
    "Track every rupee or pound in your cash drawers, safe and petty cash. Count cash by notes and coins, see the difference straight away, and move cash between drawers.",
  keywords: [
    "cash drawer management",
    "petty cash software",
    "cash count variance",
    "POS cash reconciliation",
    "cash management for shops",
  ],
  schemaSubCategory: "Cash management add-on for POS",
  headline: "Know where every note is: drawers, safe and petty cash in one place.",
  overview: [
    "Cash Management gives each pile of cash in your business its own account: the till drawer, the safe, petty cash, or anything else you keep money in. Every movement in or out is written down with who did it and why.",
    "When you count a drawer, you enter how many of each note and coin you have. TajirPoint works out the total, compares it with what should be there, and shows the difference straight away, so short or extra cash is spotted the same day, not at month end.",
    "It works with your register shifts: the opening float and the closing handover are recorded against the drawer. If you also use the Accounting add-on, cash movements are posted to your books for you.",
  ],
  whoFor: [
    "Shops and restaurants that handle a lot of cash",
    "Owners who are not at the counter every day",
    "Businesses with more than one till, or a safe in the back",
    "Anyone who pays small expenses out of petty cash",
  ],
  problems: [
    {
      problem: "The drawer is short at closing and nobody knows why.",
      fix: "Every cash in and out is logged with a reason and a name, and each count shows the exact difference against what should be there.",
    },
    {
      problem: "Petty cash disappears on small expenses with no record.",
      fix: "Petty cash is its own account. Top it up from the drawer or safe, and every payment out of it is recorded.",
    },
    {
      problem: "Cash moves between the till and the safe on scraps of paper.",
      fix: "Record a transfer from one account to another in a few taps. Both balances update together.",
    },
    {
      problem: "Counting cash takes ages and the totals never match.",
      fix: "Enter the number of each note and coin. The total and the difference are worked out for you.",
    },
  ],
  features: [
    {
      title: "One account per drawer, safe or petty cash box",
      body: "A main drawer and a petty cash account are created when you switch the add-on on. Add as many more as you need.",
    },
    {
      title: "Every cash movement recorded",
      body: "Sale takings, expense payments, petty cash top-ups, bank deposits and withdrawals, opening floats, closing handovers and adjustments, each with a note.",
    },
    {
      title: "Transfers between accounts",
      body: "Move cash from the till to the safe, or from the safe to petty cash, and both balances stay right.",
    },
    {
      title: "Counts by notes and coins",
      body: "Count a drawer by denomination. The expected total, the counted total and the difference are saved with the name of the person who counted.",
    },
    {
      title: "Linked to register shifts",
      body: "The opening float and closing handover of each register shift are recorded against the drawer, so the shift report and the cash book agree.",
    },
    {
      title: "Posts to your books when Accounting is on",
      body: "Install the Accounting & General Ledger add-on as well and cash movements create journal entries automatically. Without it, Cash Management works on its own.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install Cash Management from the Add-ons page in the back office. A main drawer and a petty cash account are set up for you.",
    },
    {
      title: "Add your other cash accounts",
      body: "Add a safe, a second till, or any other place you keep cash, with an opening balance.",
    },
    {
      title: "Record cash as it moves",
      body: "Sales and register shifts update the drawer. Record expenses, top-ups, transfers and bank deposits as they happen.",
    },
    {
      title: "Count and compare",
      body: "At closing, count the drawer by notes and coins. TajirPoint shows the difference and keeps the count on record.",
    },
  ],
  needs: [
    "A TajirPoint account (any plan, including Light)",
    "Nothing else: no extra hardware or outside account",
  ],
  setup: [
    "You switch it on yourself from the Add-ons page; it takes a minute.",
    "Your existing sales are not changed. Uninstalling keeps your cash records.",
  ],
  faqs: [
    {
      q: "Do I need the Accounting add-on to use this?",
      a: "No. Cash Management works on its own. If you also install Accounting & General Ledger, cash movements are posted to your books automatically.",
    },
    {
      q: "Can I have more than one drawer?",
      a: "Yes. Add as many cash accounts as you like: drawers, a safe, petty cash or anything else.",
    },
    {
      q: "What happens when a count does not match?",
      a: "The count is saved with the expected amount, the counted amount and the difference, plus a reason if you give one, so you can follow it up.",
    },
    {
      q: "Does it work with register shifts?",
      a: "Yes. The opening float and the closing handover of each shift are recorded against the drawer.",
    },
    {
      q: "Is it included in the free Light plan?",
      a: "Yes. Cash Management is one of the add-ons included with Light.",
    },
    {
      q: "What happens to my records if I uninstall it?",
      a: "They are kept. Uninstalling only hides the screens; your cash history stays in your account.",
    },
  ],
};

export default content;
