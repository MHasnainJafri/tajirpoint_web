import type { Guide } from "./types";

// Facts below come ONLY from FBR's own documents (see `sources`), read on
// 2 Nov 2026: the POS booklet (2025) for the current Sales Tax Act text
// (s. 2(43A), 3(9A), 8B(6), 14AB, 33 serials 24 and 25A, Income Tax
// Ordinance s. 21(r) and 64D) and Sales Tax Rules 150R, 150V, 150XB, 150XC,
// 150XF, 150ZEL; the POS FAQs (2020) for restaurants and bakeries; STGO 01 of
// 2024 for the 236H threshold and the 31 May 2024 list.
// TajirPoint side: domains/fbr in the backend (queue + retries + submissions
// screen + FBR number and QR on the receipt); the add-on is Coming soon, so the
// copy says so (same wording as src/content/addons/fbr-integration.ts).
const guide: Guide = {
  slug: "fbr-pos-integration",
  category: "Tax & compliance",
  title: "FBR POS integration in Pakistan: what it is, who needs it and how it works",
  seoTitle: "FBR POS Integration in Pakistan: A Plain Guide",
  seoDescription:
    "What FBR POS integration is, which Tier-1 retailers and restaurants must do it, how it works step by step, and the penalties, with links to FBR's own documents.",
  keywords: [
    "FBR POS integration",
    "FBR integrated POS",
    "Tier-1 retailer FBR",
    "FBR POS penalty",
    "FBR invoice QR code",
    "POS integration Pakistan",
    "FBR POS ID IRIS",
  ],
  summary:
    "A plain-English guide to connecting your till to FBR: who has to do it, the steps, what happens when the internet drops, and the penalties, with FBR's own documents linked.",
  shortAnswer:
    "FBR POS integration means connecting your shop's till to the Federal Board of Revenue's system so every sale is reported as it happens. FBR sends back its own invoice number, and the receipt prints that number with a QR code customers can check. Tier-1 retailers must integrate under the Sales Tax Act, 1990, and FBR's FAQs say restaurants must too.",
  keyPoints: [
    "Who counts as a Tier-1 retailer, in FBR's own words",
    "The steps from sales tax registration to the first FBR invoice",
    "What to do when the internet or power goes off",
    "The penalties for not integrating, with the sections of the law",
    "Where TajirPoint stands: our FBR integration is coming soon",
  ],
  sections: [
    {
      id: "what-is-it",
      heading: "What is FBR POS integration?",
      blocks: [
        {
          type: "p",
          text: "A POS (point of sale) is the till or software you use to ring up sales. **FBR POS integration** links that till to FBR's computer system, so each sale is sent to FBR the moment it is made. It is also called real-time sales reporting.",
        },
        {
          type: "p",
          text: "The Sales Tax Rules, 2006 (rule 150R) list what an integrated till must do. In plain words, it must:",
        },
        {
          type: "list",
          items: [
            "create, record and safely store the data of every invoice",
            "send each invoice to FBR and receive a **unique FBR invoice number** back",
            "print a **QR code** made from that FBR number on the receipt",
            "close the day, the week and the month",
            "keep a log of every change, cancellation and adjustment",
          ],
        },
        {
          type: "p",
          text: "Rule 150R also says an integrated business must not make a sale except through its integrated outlets and tills. So it is not enough to connect one counter; every till that sells has to be connected.",
        },
        {
          type: "p",
          text: "Customers can check that a receipt really reached FBR. FBR's rules (150XB) require a verification facility, and FBR's prize scheme (rule 150ZEL) lets customers verify invoices from integrated Tier-1 retailers through FBR's **Tax Asaan** app and report ones that do not check out.",
        },
      ],
    },
    {
      id: "who-must-integrate",
      heading: "Who has to integrate with FBR?",
      blocks: [
        {
          type: "p",
          text: "The law says **Tier-1 retailers** must integrate (Sales Tax Act, 1990, section 3(9A)). Section 2(43A) defines a Tier-1 retailer. FBR's 2025 POS booklet gives the current list. You are a Tier-1 retailer if **any one** of these is true:",
        },
        {
          type: "list",
          items: [
            "You operate as a unit of a national or international chain of stores.",
            "You operate in an air-conditioned shopping mall, plaza or centre (kiosks are excluded).",
            "Your electricity bills over the last 12 months add up to more than Rs 1,200,000.",
            "You are a wholesaler-cum-retailer: you import and supply consumer goods in bulk to retailers and also sell to the public.",
            "You have taken a card or digital payment machine from a bank or a payment provider authorised by the State Bank of Pakistan.",
            "Your withholding tax under section 236G or 236H of the Income Tax Ordinance over the last 12 months is above the limit FBR sets. FBR set the 236H limit at Rs 100,000 (S.R.O. 1842(I)/2023, explained in Sales Tax General Order 01 of 2024).",
            "You belong to any other group FBR names.",
          ],
        },
        {
          type: "note",
          tone: "info",
          title: "Older documents differ",
          text: "FBR's 2020 FAQs also list shops of 1,000 square feet or more. In the 2025 booklet that clause is shown as removed. Laws change with every Finance Act, so check the current text on fbr.gov.pk or with your tax adviser before you decide you are not covered.",
        },
        {
          type: "h3",
          text: "Restaurants, cafes, bakeries and sweet shops",
        },
        {
          type: "p",
          text: "FBR's POS FAQs answer this directly. **Restaurants, snack bars and cafes:** the FAQs say it is mandatory for all restaurants to integrate their POS under Chapter XIV-A of the Sales Tax Rules, 2006, whether or not they are Tier-1. **Bakeries and sweet shops** that sell to the public are retailers, so they must integrate if they meet the Tier-1 definition.",
        },
        {
          type: "p",
          text: "Restaurants and other services in the provinces also deal with their **provincial revenue authority** for sales tax on services: PRA in Punjab, SRB in Sindh, KPRA in Khyber Pakhtunkhwa and BRA in Balochistan. Each has its own rules and systems. Ask your tax adviser which authorities your outlets must report to.",
        },
      ],
    },
    {
      id: "how-it-works",
      heading: "How FBR POS integration works, step by step",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**Register for sales tax.** You need an NTN and sales tax registration (STRN) on FBR's [IRIS portal](https://iris.fbr.gov.pk).",
            "**Tell FBR about your outlets and tills.** Rule 150R(2) asks you to give FBR, through its online system, the details of your outlets and points of sale.",
            "**Get your POS ID and access details.** FBR issues these for each till. Your POS software uses them to talk to FBR.",
            "**Use POS software that can integrate.** The software must do everything rule 150R lists. FBR's rules make PRAL (FBR's IT company) a licensed integrator (rule 150XF), and other integrators can be licensed too.",
            "**Test first.** A good set-up sends test invoices to FBR's test system before going live, so tax codes and receipts are right on day one.",
            "**Go live and sell as normal.** Each sale goes to FBR, the FBR number comes back, and the receipt prints it with the QR code.",
            "**File your returns.** FBR's FAQs say returns and exchanges should be handled in the software, with corrections through debit and credit notes. Online sales must be reported too.",
          ],
        },
      ],
    },
    {
      id: "internet-down",
      heading: "What if the internet or power goes off?",
      blocks: [
        {
          type: "p",
          text: "This happens in every Pakistani shop, and the rules allow for it. Rule 150XC says invoices made while the software, the internet or the power has failed must be **clearly marked as issued offline** and **uploaded within 24 hours** of the service coming back.",
        },
        {
          type: "p",
          text: "So your till must be able to keep selling offline, mark those sales, and send them on its own once the line is back. Ask any POS vendor to show you this before you buy.",
        },
      ],
    },
    {
      id: "deadlines",
      heading: "Is there a deadline?",
      blocks: [
        {
          type: "p",
          text: "There is no single date for the whole country. The duty starts when your business falls under the Tier-1 definition (or the restaurant rules). FBR then enforces it through orders and notices:",
        },
        {
          type: "list",
          items: [
            "**Extensions:** your Commissioner Inland Revenue may give extra time of up to **60 days in total**, in steps of 15 days. During that time you keep issuing paper invoices (rule 150V).",
            "**Named lists:** FBR publishes lists of retailers who must integrate. For example, Sales Tax General Order 01 of 2024 (23 April 2024) listed 1,680 Tier-1 retailers and gave them until **31 May 2024**. For those who had not integrated, input tax was to be disallowed from the June 2024 return without further notice.",
            "**Not on the list?** A retailer who believes it is not Tier-1 can apply to its Commissioner for exclusion (FBR names Sales Tax General Order 17 of 2022 for the procedure).",
          ],
        },
        {
          type: "note",
          tone: "warn",
          text: "Dates change. Look for new Sales Tax General Orders and S.R.O.s on fbr.gov.pk, or ask your tax adviser, before you plan around any date on this page.",
        },
      ],
    },
    {
      id: "penalties",
      heading: "What are the penalties for not integrating?",
      blocks: [
        {
          type: "p",
          text: "These are taken from the Sales Tax Act text in FBR's 2025 POS booklet. They apply to a person who must integrate but does not register, or registers but does not integrate (section 33, serial 25A).",
        },
        {
          type: "table",
          caption: "Penalties for failing to integrate (Sales Tax Act, 1990, section 33)",
          head: ["Default", "Penalty"],
          rows: [
            ["First default", "Rs 500,000"],
            ["Second default, 15 days after the first order", "Rs 1,000,000"],
            ["Third default, 15 days after the second order", "Rs 2,000,000"],
            ["Fourth default, 15 days after the third order", "Rs 3,000,000"],
            ["Any time", "Business premises can be sealed by an Inland Revenue officer"],
          ],
        },
        {
          type: "p",
          text: "The same section says the first-default penalty is **waived** by the Commissioner if you integrate before the penalty for the second default is imposed.",
        },
        {
          type: "h3",
          text: "Other consequences",
        },
        {
          type: "list",
          items: [
            "**Less input tax:** if a Tier-1 retailer does not integrate during a tax period, its adjustable input tax for that whole period is cut by **60%** (section 8B(6); it was 15% before the Finance Act, 2021).",
            "**Gas and electricity:** FBR can direct the gas and electricity companies to disconnect a person who fails to register or integrate (section 14AB).",
            "**Income tax:** spending linked to sales can be partly disallowed, up to 8% of the allowable deduction, for a business that must integrate but does not (Income Tax Ordinance, section 21(r)).",
          ],
        },
        {
          type: "h3",
          text: "Bypassing the system is a bigger offence",
        },
        {
          type: "p",
          text: "An integrated business that hides sales from FBR, or issues invoices without a proper FBR number or QR code, faces a penalty of **Rs 500,000 or 200% of the tax involved, whichever is higher** (section 33, serial 24). On conviction there can also be up to two years in prison or a further fine of up to Rs 2,000,000. Anyone who helps, including a software vendor who builds sales-hiding into a till, can face up to one year in prison or a fine of up to Rs 200,000.",
        },
        {
          type: "note",
          tone: "info",
          title: "There is a tax credit too",
          text: "The Income Tax Ordinance (section 64D) gives integrated businesses a tax credit for the money spent on a point of sale machine: the amount invested, or Rs 150,000 per machine, whichever is less.",
        },
      ],
    },
    {
      id: "checklist",
      heading: "A checklist before you integrate",
      blocks: [
        {
          type: "list",
          items: [
            "Confirm with your tax adviser whether you are Tier-1, and which provincial authority (if any) also applies.",
            "Have your NTN, STRN and IRIS login ready.",
            "List every outlet and every till that sells, including online.",
            "Give every product the right tax rate. Exempt, reduced-rate and standard-rate items need different codes.",
            "Make sure your receipt printer can print a clear QR code.",
            "Check that your POS keeps selling offline and uploads offline invoices once the line is back.",
            "Train staff to never sell outside the integrated till, even when it is busy.",
            "Keep your day, week and month closings, and keep returns inside the system.",
          ],
        },
      ],
    },
    {
      id: "tajirpoint",
      heading: "Where TajirPoint stands",
      blocks: [
        {
          type: "note",
          tone: "warn",
          title: "Coming soon",
          text: "TajirPoint's FBR integration is built and in final testing. It is **not open to shops yet**, and we have no fixed date. If you must be integrated today, do not wait for us.",
        },
        {
          type: "p",
          text: "When it opens, the [FBR Integration add-on](/extensions/fbr-integration) will send each completed sale to FBR, print the FBR invoice number and QR code on the receipt, queue and retry sales when FBR's system is slow or down, and show every sale's status (pending, sent or failed) on a submissions screen. Each tax rate can carry its FBR code. Our team will set it up and test it with you before it goes live.",
        },
        {
          type: "p",
          text: "Today, TajirPoint already records tax on every sale, prints itemised receipts and keeps your sales history and tax reports. See [tax handling](/features/e-invoicing), and the [offline POS](/features/offline) that keeps selling when the internet drops.",
        },
        {
          type: "p",
          text: "[Ask for a call back](/get-a-call?addon=fbr-integration) and we will tell you when it is ready.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is a Tier-1 retailer?",
      a: "A retailer that falls in any group listed in section 2(43A) of the Sales Tax Act, 1990: for example a chain store, a shop in an air-conditioned mall, a shop whose electricity bills over 12 months exceed Rs 1,200,000, a wholesaler-cum-retailer, or a shop with a bank card machine. Check FBR's current list.",
    },
    {
      q: "Do restaurants have to integrate with FBR?",
      a: "FBR's POS FAQs say it is mandatory for all restaurants, snack bars and cafes to integrate their POS under Chapter XIV-A of the Sales Tax Rules, 2006. Restaurants in the provinces also deal with their provincial revenue authority, so ask your tax adviser.",
    },
    {
      q: "How much is the penalty for not integrating?",
      a: "Under section 33 of the Sales Tax Act, Rs 500,000 for the first default, then Rs 1 million, Rs 2 million and Rs 3 million for later defaults 15 days apart, and the premises can be sealed. Input tax is also cut by 60% for each period you are not integrated.",
    },
    {
      q: "Can I keep selling when the internet is down?",
      a: "Yes. FBR's rule 150XC says invoices made during an internet, power or software failure must be marked as offline and uploaded within 24 hours of the service coming back.",
    },
    {
      q: "How do customers check an FBR receipt?",
      a: "By scanning the QR code or checking the FBR invoice number with FBR's Tax Asaan app. FBR's prize scheme rewards customers who report receipts that do not verify.",
    },
    {
      q: "Is TajirPoint FBR integrated?",
      a: "Not yet. Our FBR integration is built and in final testing, but it is not open to shops yet and has no fixed date. Ask us for a call back and we will tell you when it is ready.",
    },
  ],
  sources: [
    {
      label:
        "POS Booklet (Sales Tax Act, Sales Tax Rules and Income Tax Ordinance provisions on POS integration), 2025",
      url: "https://download1.fbr.gov.pk/Docs/202551615541769POSBooklet.pdf",
      publisher: "FBR",
    },
    {
      label: "POS Integration: Frequently Asked Questions",
      url: "https://download1.fbr.gov.pk/Docs/20201201313212651FAQs-POSIntegration.pdf",
      publisher: "FBR",
    },
    {
      label: "Sales Tax General Order No. 01 of 2024: Tier-1 Retailers (23 April 2024)",
      url: "https://download1.fbr.gov.pk/Docs/20244231541226508STGOfor236H02.04.2024.pdf",
      publisher: "FBR",
    },
    {
      label: "IRIS: FBR's online registration and returns portal",
      url: "https://iris.fbr.gov.pk",
      publisher: "FBR",
    },
    {
      label: "Federal Board of Revenue: news, S.R.O.s and general orders",
      url: "https://www.fbr.gov.pk",
      publisher: "FBR",
    },
  ],
  checked: "2 November 2026",
  links: [
    {
      label: "FBR Integration add-on",
      href: "/extensions/fbr-integration",
      note: "What it will do, and how to be told when it is ready",
    },
    {
      label: "Tax handling at checkout",
      href: "/features/e-invoicing",
      note: "Tax-inclusive prices, VAT/GST and audit-ready records today",
    },
    {
      label: "Offline POS",
      href: "/features/offline",
      note: "Keep selling when the internet drops",
    },
    {
      label: "Get a call back",
      href: "/get-a-call?addon=fbr-integration",
      note: "A person from our team calls you within one working day",
    },
  ],
  related: ["choose-restaurant-pos", "restaurant-opening-checklist", "excel-to-pos"],
  datePublished: "2026-11-02",
  dateModified: "2026-11-02",
  og: {
    eyebrow: "Guide · FBR POS integration",
    title: "FBR POS integration in Pakistan, explained.",
    sub: "Who must integrate, how it works, offline rules and penalties, from FBR's own documents.",
    pills: ["Tier-1 retailers", "Restaurants", "QR receipts", "Penalties"],
  },
};

export default guide;
