import type { Guide } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Facts below come ONLY from the official documents in `sources`, read on
// 20 Nov 2026:
// - PRA: Punjab Sales Tax on Services Act 2012, 17th edition 2026-27 (PRA's own
//   compilation): s. 2(41A) standard rate 16%, Second Schedule Part III S. No. 4
//   (restaurants 8% card/wallet/QR since the Punjab Finance Act 2026, was 5%),
//   s. 48 penalty table S. Nos. 15, 16, 17, s. 59A sealing, s. 59B; Specific
//   Provisions Rules ch. XIII (rules 65-71); e-IMS Rules 2019 (rule 3 threshold
//   Rs 6m for restaurants since notification of 9 July 2024, rules 4, 5, 6, 8, 9);
//   restaurant exemption notification of 22 May 2013; collecting-agent
//   notification of 2 July 2026; PRA Circular 1 of 2026 (Raast QR).
//   PRA fiscal device spec 1.2 for the steps, the QR link and verification.
// - SRB: Online Integration of Business Rules 2022 (original notification of
//   21 Feb 2022, and SRB's copy updated to 1 July 2024: Schedule S. Nos. 1-6);
//   Sindh Sales Tax on Services Act 2011 as compiled by SRB (s. 8 standard 15%,
//   Second Schedule S. No. 4 restaurants 8% card/wallet/QR, First Schedule
//   S. No. 4 small-restaurant exemption, s. 43 penalty S. Nos. 2A, 2AA, 2B, 2C,
//   s. 54A); Sindh Finance Act 2026 (2AA); SRB POS page and POS FAQ.
// - KPRA: KP Sales Tax on Services Act 2022 updated to the KP Finance Act 2026
//   (Second Schedule Part II S. No. 2, s. 34A, s. 53 penalty S. Nos. 5-8); KPRA
//   RIMS technical guide.
// - ICT: FBR's ICT (Tax on Services) Ordinance 2001, amended up to 30 June 2025.
// News (labelled as news): Profit on FBR's draft SRO 288(I)/2026; ARY News on
// PRA's November 2026 drive.
// TajirPoint side: no PRA/SRB/KPRA link exists (same as PRA_ROW/SRB_ROW/KPRA_ROW
// in src/content/locations/pk-common.ts); the FBR add-on is Coming soon.
const guide: Guide = {
  slug: "pra-srb-pos-integration",
  category: "Tax & compliance",
  title: "PRA and SRB POS integration: a plain guide for restaurants",
  seoTitle: "PRA & SRB POS Integration for Restaurants",
  seoDescription:
    "PRA and SRB e-invoicing for restaurants in Punjab and Sindh: who must integrate, the steps, cash and card tax rates, penalties, and how it differs from FBR.",
  keywords: [
    "PRA POS integration",
    "SRB POS integration",
    "PRA e-invoicing restaurants",
    "PRA e-IMS",
    "SRB restaurant tax",
    "SRB POS invoice verification",
    "sales tax on services Punjab",
    "sales tax on services Sindh",
    "KPRA RIMS",
    "restaurant sales tax card payment Pakistan",
  ],
  summary:
    "What the Punjab Revenue Authority and the Sindh Revenue Board ask of restaurants, cafés and similar food businesses: who must send every bill to them in real time, the steps, the tax rates for cash and card, and the penalties, with links to their own documents.",
  shortAnswer:
    "In Punjab and Sindh, restaurant bills are taxed by the province, not by FBR. PRA's e-IMS and SRB's POS system both link your till to the authority: each bill is sent as it is made, and the receipt prints the authority's invoice number and a QR code customers can check. Which restaurants must do it, the rates and the penalties differ by province.",
  keyPoints: [
    "Why restaurant bills go to PRA or SRB, and what FBR still covers",
    "Which restaurants must integrate in Punjab and in Sindh, in the authorities' own words",
    "The steps, from registration to the first receipt with a QR code",
    "Tax rates for cash and card payments, and the penalties, with the law cited",
    `Where ${BRAND_NAME} stands: we do not send invoices to PRA, SRB or KPRA`,
  ],
  sections: [
    {
      id: "what-is-it",
      heading: "What are PRA and SRB POS integration?",
      blocks: [
        {
          type: "p",
          text: "Since the 18th Amendment, sales tax on **services** is collected by the provinces. Restaurant service is a service. So a restaurant in Punjab charges **Punjab sales tax on services** and deals with the **Punjab Revenue Authority (PRA)**. A restaurant in Sindh charges **Sindh sales tax on services** and deals with the **Sindh Revenue Board (SRB)**.",
        },
        {
          type: "p",
          text: "Both authorities run a system that links your till to theirs. PRA calls it the **Electronic Invoice Monitoring System (e-IMS)**. SRB calls it the **SRB Point of Sale system (SRB-POS)**. They work the same way in plain terms:",
        },
        {
          type: "list",
          items: [
            "your POS sends each bill to the authority the moment it is made",
            "the authority sends back its **own invoice number**",
            "the receipt prints that number with a **QR code**",
            "the customer scans the QR code to check the bill reached the authority",
          ],
        },
        {
          type: "h3",
          text: "Cafés, bakeries and sweet shops",
        },
        {
          type: "p",
          text: "PRA's restaurant rules (rule 66) cover the sale of all kinds of food and drink by a business whether it is called a restaurant, café, coffee house, food parlour or ice-cream parlour, including takeaway to walk-in customers. Punjab's rate schedule also names coffee shops, food huts, eateries and other ready-to-eat food outlets. A bakery or sweet shop that mainly sells packed goods over the counter may be selling **goods**, which FBR taxes instead. Where the line falls depends on how you trade, so ask your tax adviser.",
        },
        {
          type: "p",
          text: "This is separate from [FBR POS integration](/guides/fbr-pos-integration). FBR collects federal sales tax on **goods**. PRA and SRB collect provincial tax on **services**. A business that sells both may deal with both.",
        },
      ],
    },
    {
      id: "punjab-pra",
      heading: "Punjab: who must use PRA's e-IMS?",
      blocks: [
        {
          type: "p",
          text: "PRA's power comes from section 59B of the Punjab Sales Tax on Services Act, 2012. The detail is in the **Punjab Electronic Invoice Monitoring System Rules 2019**.",
        },
        {
          type: "list",
          items: [
            "**Who:** rule 3 says a registered person with turnover of **Rs 6 million or more** in a financial year, for restaurant services, is monitored through e-IMS. For all other services the line is Rs 10 million. The Rs 6 million figure for restaurants came in by PRA notification dated 9 July 2024; before that it was Rs 10 million for everyone.",
            "**By when:** rule 4 gives **three months** from the close of the financial year in which you become liable if you already bill on a computer, or **six months** if you do not. A PRA officer then visits to check your system. If it fails, you get one extension of up to **15 days**.",
            "**What the bill must show:** rule 6 says you may issue no invoice except one made through e-IMS. It must show the service, quantity and unit price where relevant, the amount before tax, the tax and the total. If the bill before tax is over **Rs 50,000**, it must also show the customer's name and CNIC, or the NTN for a company.",
            "**Checks:** PRA can make surprise checks and an annual inspection, rated 1 to 5. A rating below 3 at a surprise check brings a warning; below 3 at the annual inspection, PRA can make you install video monitoring (rule 5).",
          ],
        },
        {
          type: "h3",
          text: "Registering a restaurant with PRA",
        },
        {
          type: "p",
          text: 'Every restaurant in Punjab must register with PRA, whether it has one outlet or many (rule 65 of the Specific Provisions Rules). If you are already registered with FBR, you e-enrol with PRA instead, and your FBR number is used with a capital "P" in front. You must also send PRA a signed copy of your menu card with prices within one month, and send any change within 15 days (rule 68). Returns are monthly, with the tax, by the 15th of the next month (rule 71).',
        },
        {
          type: "note",
          tone: "info",
          title: "Small restaurants",
          text: "A PRA notification of 22 May 2013 exempts a restaurant that meets **all four** of these: it is not part of a chain, it is not in or linked to a taxable hotel, it has no air-conditioning, and its annual turnover is not more than Rs 6 million. Miss any one and the exemption does not apply.",
        },
      ],
    },
    {
      id: "sindh-srb",
      heading: "Sindh: who must integrate with SRB?",
      blocks: [
        {
          type: "p",
          text: "SRB's power comes from section 54A of the Sindh Sales Tax on Services Act, 2011. The detail is in the **Sindh Sales Tax Special Procedure (Online Integration of Business) Rules, 2022**, notified on 21 February 2022. In SRB's copy updated to 1 July 2024, the schedule lists these restaurants:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "restaurants located in hotels",
            "restaurants that are franchisers or franchisees",
            "restaurants with more than one branch in Sindh",
            "restaurant outlets in air-conditioned shopping malls",
            "restaurants selling through an online marketplace",
            "restaurants whose turnover in the previous 12 tax periods was more than **Rs 5 million**",
          ],
        },
        {
          type: "p",
          text: "Rule 3 makes them integrate **all** their points of sale, including online ones. The rules gave 45 days from 21 February 2022. They do not set a separate period for a restaurant that joins the list later, so ask SRB if that is you.",
        },
        {
          type: "list",
          items: [
            "**One invoice only:** rule 6 says an integrated restaurant must issue only the SRB-format invoice, and **no katcha or provisional bill**. SRB's FAQs add that pre-payment bills are not allowed.",
            "**What the bill must show:** business name, branch address, SRB registration number (SNTN), the POS ID, a sequential invoice number, date and time, the value, tax rate, tax, any discount, the POS service fee and the total, plus the **SRB invoice number**, the SRB-POS logo, a QR code and a line telling customers how to verify it.",
            "**A Rs 1 fee per invoice:** rule 5 adds a service fee of one rupee on every invoice from an integrated POS. You deposit it and show it in your return.",
            "**A notice at the door:** rule 7 says you must display at each branch that it is integrated with SRB.",
            "**Returns and exchanges:** handled with a credit note or supplementary invoice that refers to the original.",
          ],
        },
        {
          type: "note",
          tone: "info",
          title: "Small restaurants",
          text: "The Act's First Schedule exempts restaurants and caterers with annual turnover up to Rs 5 million, but not if they are air-conditioned on any day of the year, are in an air-conditioned mall or plaza, are in a taxable hotel, hall or club, are franchisers or franchisees, have more than one branch or outlet in Sindh, or have gas, electricity and phone bills above Rs 40,000 in any month.",
        },
      ],
    },
    {
      id: "how-it-works",
      heading: "How integration works, step by step",
      blocks: [
        {
          type: "p",
          text: "The two systems are close. These steps come from PRA's fiscal device guide and SRB's integration guides.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Register for tax.** Punjab: register or e-enrol with PRA. Sindh: register with SRB on its [e-portal](https://e.srb.gos.pk).",
            "**Register each till.** Punjab: on PRA's portal, under POS Client Registration, for each branch. PRA gives a POS registration number. Sindh: on the [SRB POS registration portal](https://pos.srb.gos.pk/PoSRegistration/), where you add each branch and get a POS ID.",
            '**Connect your POS software.** PRA gives a small "software fiscal device" that runs on the till\'s computer; your POS sends each bill to it and it forwards the data to PRA. SRB offers a local connector or a cloud connection. Either way, your POS vendor does this part.',
            "**Test first.** Both systems have a test mode (PRA calls it Sandbox). Test bills with the right tax rates before you switch to live.",
            "**Go live.** Each bill goes to the authority and its invoice number comes back. Your receipt prints the number and the QR code.",
            "**Customers check the bill.** Punjab: PRA's [invoice search page](https://reg.pra.punjab.gov.pk/IMSFiscalReport/SearchPOSInvoice_Report.aspx). Sindh: the [SRB invoice check](https://pos.srb.gos.pk/InvoiceVerification/), the eSRB app or an SMS to 9697. Both authorities' rules include a prize scheme for customers who verify bills.",
            "**File your return.** In Sindh, SRB's system fills Annexure-C of your return from the bills it received (rule 14). You can add missing sales but cannot delete entries.",
          ],
        },
        {
          type: "h3",
          text: "When the internet or the link fails",
        },
        {
          type: "p",
          text: "PRA's rule 8 says you must report a fault through e-IMS's error-reporting module straight away. Bills made outside e-IMS while it was down must be entered and sent to PRA **within one week** of the fault being fixed. Any repair cost is yours.",
        },
        {
          type: "p",
          text: "SRB's rules say the device must keep a backup and logs, but we did not find an SRB rule that sets a time limit for bills made during an outage. Ask SRB or your POS vendor how your set-up handles it.",
        },
      ],
    },
    {
      id: "tax-rates",
      heading: "What tax rate does a restaurant charge?",
      blocks: [
        {
          type: "p",
          text: "Each province sets a lower rate when the customer pays by card, mobile wallet or QR code, and a higher one for cash. These are the figures in the authorities' own compilations of the law.",
        },
        {
          type: "table",
          caption: "Sales tax on restaurant services, as published by each authority",
          head: ["Where", "Paid by card, wallet or QR", "Paid in cash", "Law"],
          rows: [
            [
              "Punjab (PRA)",
              "8%, with no input tax adjustment (5% until 30 June 2026)",
              "16% (the standard rate)",
              "Punjab Sales Tax on Services Act, 2012: Second Schedule, Part III, S. No. 4, as changed by the Punjab Finance Act, 2026",
            ],
            [
              "Sindh (SRB)",
              "8%",
              "15% (the standard rate)",
              "Sindh Sales Tax on Services Act, 2011: section 8 and Second Schedule, S. No. 4",
            ],
            [
              "Khyber Pakhtunkhwa (KPRA)",
              "6%, with no input tax adjustment or refund (local stand-alone and corporate restaurants)",
              "10% for local non-corporate stand-alone restaurants; 15% (standard) for corporate ones. Traditional dhabas: 2% however the bill is paid",
              "KP Sales Tax on Services Act, 2022: Second Schedule, Part II, S. No. 2, as changed on 13 May 2026",
            ],
            [
              "Islamabad (FBR)",
              "5%, with no input tax adjustment or refund",
              "15%",
              "Islamabad Capital Territory (Tax on Services) Ordinance, 2001: Table-1, S. No. 1(ii), as amended up to 30 June 2025",
            ],
          ],
        },
        {
          type: "note",
          tone: "warn",
          title: "Sources disagree in places",
          text: "**Punjab:** the card rate rose from 5% to 8% on 1 July 2026, but an older \"Updated Second Schedule\" file still on PRA's site shows 5%. **Sindh:** SRB's POS FAQ page says integrated restaurants charge 15%, while the Act's schedule lists 8% for card, wallet and QR payments; the same FAQ page also quotes penalty figures that the Act has since raised, so it looks out of date. **Islamabad:** FBR's latest compiled copy we found runs only to 30 June 2025. Confirm the rate with the authority or your tax adviser before you set up your till.",
        },
        {
          type: "h3",
          text: "Two newer Punjab rules about card and QR payments",
        },
        {
          type: "list",
          items: [
            "**Raast QR at the counter:** PRA Circular No. 1 of 2026 (23 January 2026) directs restaurants, hotels and beauty parlours to get a QR-enabled bank account within 14 days, keep QR payment working, and display the QR code where customers can see it.",
            "**Banks collect the tax:** a PRA notification of 2 July 2026 makes banks, acquirers, payment operators and others that settle card, QR, wallet and online payments **collecting agents**. For restaurant services they deduct tax at **8%** of the gross card or digital payment, keep it out of your merchant account, and deposit it. They must give you a monthly certificate of what they collected. Ask your adviser how this interacts with your own return.",
          ],
        },
      ],
    },
    {
      id: "penalties",
      heading: "What are the penalties?",
      blocks: [
        {
          type: "h3",
          text: "Punjab (section 48 of the Punjab Act)",
        },
        {
          type: "table",
          caption: "PRA penalties linked to e-IMS and invoices",
          head: ["Default", "Penalty"],
          rows: [
            [
              "Avoiding or blocking the installation of e-IMS, not complying with it, or issuing bills that bypass it (S. No. 15)",
              "Up to Rs 1,000,000, and not less than Rs 400,000. After three such acts, the premises can be sealed for up to one month.",
            ],
            [
              "Damaging e-IMS on purpose, or blocking bill data from reaching PRA (S. No. 16)",
              "Rs 500,000 for each act. After three acts, sealing for up to one month. On conviction by a Special Judge, up to one year in prison, or a fine up to the tax for that period, or both.",
            ],
            [
              "Failing or refusing to issue a tax invoice (S. No. 17)",
              "Rs 500,000 for the first default and Rs 1,000,000 for each later one. After three, sealing for up to one month.",
            ],
          ],
        },
        {
          type: "p",
          text: "Section 59A also lets a PRA Commissioner seal premises for up to one month when the law is not being followed. The Rs 500,000 figures were raised by the Punjab Finance Act, 2026.",
        },
        {
          type: "p",
          text: "In the news: ARY News reported on 11 November 2026 that PRA is enforcing electronic receipts through e-IMS at hotels, restaurants, coffee shops and marriage halls, with fines of Rs 400,000 to Rs 1 million, which matches the Act.",
        },
        {
          type: "h3",
          text: "Sindh (section 43 of the Sindh Act)",
        },
        {
          type: "table",
          caption: "SRB penalties linked to POS integration and invoices",
          head: ["Default", "Penalty"],
          rows: [
            [
              "Avoiding or not complying with the e-invoicing system, issuing bills outside it, or obstructing it (S. No. 2B)",
              "Up to Rs 1,000,000, and not less than Rs 100,000. If repeated, the premises can be sealed. On conviction by a Special Judge, up to one year in prison, a fine up to Rs 100,000, or both.",
            ],
            [
              "Not issuing a tax invoice as the rules require (S. No. 2A)",
              "Rs 20,000 for the first default and Rs 50,000 for each later one. After three, the premises can be sealed.",
            ],
            [
              "Not depositing or not reporting the Rs 1 POS service fee (S. No. 2C)",
              "Rs 100,000 or twice the fee involved, whichever is higher, and possible prosecution.",
            ],
            [
              "Making or supplying billing software whose invoices do not meet SRB's rules (S. No. 2AA, added by the Sindh Finance Act, 2026)",
              "Up to Rs 1,000,000, and not less than Rs 100,000. This one applies to the software maker or supplier.",
            ],
          ],
        },
      ],
    },
    {
      id: "comparison",
      heading: "FBR, PRA, SRB and KPRA side by side",
      blocks: [
        {
          type: "table",
          caption: "FBR compared with the provincial authorities, for restaurants",
          head: ["", "FBR", "PRA (Punjab)", "SRB (Sindh)", "KPRA (KP)"],
          rows: [
            [
              "Tax",
              "Federal sales tax on goods; also services in Islamabad",
              "Punjab sales tax on services",
              "Sindh sales tax on services",
              "KP sales tax on services",
            ],
            [
              "System",
              "FBR POS integration",
              "e-IMS",
              "SRB-POS",
              "RIMS (Restaurant Invoice Management System)",
            ],
            [
              "Restaurants that must integrate",
              "FBR's POS FAQs say all restaurants, snack bars and cafes",
              "Turnover of Rs 6 million or more in a year",
              "The six groups in the rules' schedule, including turnover over Rs 5 million",
              "Every restaurant, hotel and similar food business",
            ],
            ["Restaurant rate, card or QR", "Islamabad: 5%", "8%", "8%", "6%"],
            ["Restaurant rate, cash", "Islamabad: 15%", "16%", "15%", "10%, 15% or 2% by type"],
            [
              "Customer checks with",
              "FBR's Tax Asaan app",
              "PRA's invoice search page",
              "eSRB app, SMS 9697 or SRB's website",
              "The QR link to kpra.gov.pk",
            ],
            [
              "Main penalty for not integrating",
              "Rs 500,000 first default, rising to Rs 3,000,000",
              "Rs 400,000 to Rs 1,000,000; sealing after three acts",
              "Rs 100,000 to Rs 1,000,000; sealing if repeated",
              "Rs 500,000 or 5% of the tax involved, whichever is higher, each time",
            ],
          ],
        },
        {
          type: "p",
          text: "FBR figures are explained, with sources, in our [FBR POS integration guide](/guides/fbr-pos-integration).",
        },
        {
          type: "h3",
          text: "Khyber Pakhtunkhwa (KPRA)",
        },
        {
          type: "p",
          text: "KP's Second Schedule says every business providing restaurant, hotel or similar food services must integrate or install KPRA's **Restaurant Invoice Management System (RIMS)** or another e-invoicing system KPRA prescribes. KPRA's technical guide says you register on its POS portal, get a POS ID and key, and print a QR code on each bill that links to KPRA's verification page. With KPRA's Windows utility, bills queue when the internet is down and sync when it returns.",
        },
        {
          type: "p",
          text: "Under section 53 of the KP Act, as changed by the KP Finance Act, 2026: not integrating costs **Rs 500,000 or 5% of the tax involved**, whichever is higher, for each instance. Issuing bills outside RIMS, or not uploading them in real time, costs Rs 200,000 or 5%. A vendor who fails to keep the data flowing, or helps suppress sales, faces Rs 500,000 or 5% of the sales suppressed.",
        },
        {
          type: "h3",
          text: "Islamabad (ICT)",
        },
        {
          type: "p",
          text: "In Islamabad Capital Territory there is no provincial authority, so FBR taxes services under the ICT (Tax on Services) Ordinance, 2001. Section 3 lets FBR require service providers to integrate for real-time reporting from a date it sets by general order. For the FBR side, see our [FBR guide](/guides/fbr-pos-integration). Rawalpindi is in Punjab, so restaurants there deal with PRA.",
        },
        {
          type: "note",
          tone: "info",
          title: "In the news: an FBR proposal for service providers",
          text: "Profit (Pakistan Today) reported on 11 March 2026 that FBR had issued a **draft** notification, SRO 288(I)/2026, to bring service providers into its own POS and e-invoicing system, and that provincial authorities including SRB objected because many of those services already report to them. The report describes it only as a draft. Check its status with your tax adviser.",
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
            "Confirm with your tax adviser which authority taxes each outlet: PRA, SRB, KPRA or FBR in Islamabad. A chain across provinces may deal with several.",
            "Check whether your turnover, location or format puts you on the list. Do not assume a small-restaurant exemption applies until you have checked every condition.",
            "Register or e-enrol with the authority, and register **every** till, including online ordering.",
            "Ask your POS vendor to show the authority's invoice number and QR code on a **live receipt** from a real customer, not a demo slide.",
            "Set the right rate for cash and for card, wallet and QR payments. In Punjab, Sindh and KP these differ.",
            "In Punjab, put up your Raast QR code at the counter.",
            "Agree with your vendor what happens when the internet drops, and who reports the fault.",
            "Train staff never to hand-write a bill or give a katcha bill.",
          ],
        },
        {
          type: "note",
          tone: "info",
          text: "This guide is general information, not tax advice. Rates, lists and penalties change with every Finance Act and notification. Confirm what applies to you with PRA, SRB, KPRA, FBR or your tax adviser.",
        },
      ],
    },
    {
      id: "tajirpoint",
      heading: `Where ${BRAND_NAME} stands`,
      blocks: [
        {
          type: "note",
          tone: "warn",
          title: "Not connected to PRA, SRB or KPRA",
          text: `${BRAND_NAME} does **not** send invoices to PRA, SRB or KPRA today. We have not built that link. Our FBR integration is **coming soon** and is not live yet either.`,
        },
        {
          type: "p",
          text: "If your restaurant must integrate now, use a system that already does it. Before you buy, ask the vendor to print a live receipt that shows the authority's invoice number and QR code, and scan the code yourself.",
        },
        {
          type: "p",
          text: `What ${BRAND_NAME} does today: it records the tax on every bill, prints itemised receipts, keeps your sales history and tax reports, and keeps billing when the internet drops. See [${BRAND_NAME} for restaurants](/business/restaurants), or [book a demo](/book-demo) and tell us which authority you report to. We will tell you honestly whether we fit.`,
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Is PRA or SRB integration the same as FBR POS integration?",
      a: "No. FBR collects federal sales tax, mainly on goods. PRA and SRB collect provincial sales tax on services, which includes restaurants in Punjab and Sindh. Each has its own system, its own invoice number and its own QR code.",
    },
    {
      q: "Which restaurants in Punjab must use PRA's e-IMS?",
      a: "Under rule 3 of the Punjab Electronic Invoice Monitoring System Rules 2019, a restaurant with turnover of Rs 6 million or more in a financial year. It then has three months after that year ends to connect if it already bills on a computer, or six months if not.",
    },
    {
      q: "Which restaurants in Sindh must integrate with SRB?",
      a: "Those in the schedule of the Online Integration of Business Rules, 2022: restaurants in hotels, franchise restaurants, those with more than one branch in Sindh, those in air-conditioned malls, those selling through online marketplaces, and those with turnover over Rs 5 million in the previous 12 tax periods.",
    },
    {
      q: "What is the sales tax on a restaurant bill paid by card?",
      a: "In the authorities' own compilations checked on 20 November 2026: 8% in Punjab, 8% in Sindh, 6% in Khyber Pakhtunkhwa and 5% in Islamabad. Cash bills are 16% in Punjab and 15% in Sindh and Islamabad. Some official pages disagree, so confirm with the authority.",
    },
    {
      q: "How does a customer check a PRA or SRB receipt?",
      a: "By scanning the QR code on the receipt. For PRA you can also enter the invoice number on PRA's invoice search page. For SRB you can use the eSRB app, SRB's website or an SMS to 9697. Both authorities' rules include a prize scheme for customers who verify bills.",
    },
    {
      q: "What is the penalty for not integrating?",
      a: "In Punjab, Rs 400,000 to Rs 1,000,000, with sealing for up to a month after three acts. In Sindh, Rs 100,000 to Rs 1,000,000, with sealing if repeated. In KP, Rs 500,000 or 5% of the tax involved, whichever is higher, each time.",
    },
    {
      q: `Does ${BRAND_NAME} connect to PRA or SRB?`,
      a: `No. ${BRAND_NAME} does not send invoices to PRA, SRB or KPRA, and our FBR integration is coming soon, not live. If you must integrate now, choose a system that already does, and see a live receipt with the authority's QR code before you buy.`,
    },
  ],
  sources: [
    {
      label:
        "The Punjab Sales Tax on Services Act, 2012, 17th edition 2026-27 (with rules, the e-IMS Rules 2019, notifications and circulars)",
      url: "https://pra.punjab.gov.pk/Downloads/THE-PUNJAB-SALES-TAX-ON-SERVICES-ACT-2012-17th-Edition-2026-2027.pdf",
      publisher: "Punjab Revenue Authority",
    },
    {
      label:
        "Updated Second Schedule of the PSTS Act 2012 (2021-22 compilation; older, still shows the 5% card rate)",
      url: "https://pra.punjab.gov.pk/Downloads/Updated-2nd-Schedule-of-PSTS-Act-2012.pdf",
      publisher: "Punjab Revenue Authority",
    },
    {
      label: "e-IMS guide: Technical Specification, Software Fiscal Device 1.2",
      url: "https://reg.pra.punjab.gov.pk//NewsDirectory/UserGuide/Technical%20Specification%20Software%20Fiscal%20Device%201.2-PRA.pdf",
      publisher: "Punjab Revenue Authority",
    },
    {
      label:
        "Sindh Sales Tax Special Procedure (Online Integration of Business) Rules, 2022: notification of 21 February 2022",
      url: "https://www.srb.gos.pk/srb/wp-content/uploads/2020/07/POS-Notification.pdf",
      publisher: "Sindh Revenue Board",
    },
    {
      label:
        "Sindh Sales Tax Special Procedure (Online Integration of Business) Rules, 2022, updated up to 1 July 2024",
      url: "https://www.srb.gos.pk/srb/wp-content/uploads/2024/09/Sindh-Sales-Tax-Special-Procedure-Online-Integration-of-Business-Rules-2022-updated-upto-1st-July-2024-EOE.pdf",
      publisher: "Sindh Revenue Board",
    },
    {
      label: "The Sindh Sales Tax on Services Act, 2011 (compiled, with schedules)",
      url: "https://www.srb.gos.pk/srb/wp-content/uploads/2026/08/SSTOS_Act2011.pdf",
      publisher: "Sindh Revenue Board",
    },
    {
      label: "The Sindh Finance Act, 2026 (Sindh Government Gazette, 1 July 2026)",
      url: "https://www.srb.gos.pk/srb/wp-content/uploads/2026/07/The-Sindh-Finance-Act-2026-1.pdf",
      publisher: "Sindh Revenue Board",
    },
    {
      label: "Point of Sale (PoS): registration, guides and invoice verification",
      url: "https://www.srb.gos.pk/srb/point-of-sale-pos/",
      publisher: "Sindh Revenue Board",
    },
    {
      label: "SRB-POS integration FAQs",
      url: "https://www.srb.gos.pk/srb/faq/",
      publisher: "Sindh Revenue Board",
    },
    {
      label: "SRB POS API: Cloud Based Integration Guide (2026)",
      url: "https://www.srb.gos.pk/srb/wp-content/uploads/2026/07/SRB-POS-API-Cloud-Based-Integration-Guide.pdf",
      publisher: "Sindh Revenue Board",
    },
    {
      label:
        "Khyber Pakhtunkhwa Sales Tax on Services Act, 2022, updated with the Khyber Pakhtunkhwa Finance Act, 2026",
      url: "https://kpra.gov.pk/wp-content/uploads/2026/09/KPSTSA-2022-Updated-Finance-act-2026.pdf",
      publisher: "Khyber Pakhtunkhwa Revenue Authority",
    },
    {
      label: "RIMS API technical implementation guide for restaurants",
      url: "https://posregistration.kpra.gov.pk/docs",
      publisher: "Khyber Pakhtunkhwa Revenue Authority",
    },
    {
      label:
        "The Islamabad Capital Territory (Tax on Services) Ordinance, 2001, as amended up to 30 June 2025",
      url: "https://download1.fbr.gov.pk/Docs/2025711172945966ICTOUpdatedupto30.06.2025.pdf",
      publisher: "FBR",
    },
    {
      label:
        "News: Provincial tax authorities oppose FBR's move to link service providers to federal POS e-invoicing system (11 March 2026)",
      url: "https://profit.pakistantoday.com.pk/2026/03/11/provincial-tax-authorities-oppose-fbrs-move-to-link-service-providers-to-federal-pos-e-invoicing-system",
      publisher: "Profit by Pakistan Today (news)",
    },
    {
      label: "News: Punjab introduces new law for eateries and wedding halls (11 November 2026)",
      url: "https://arynews.tv/punjab-introduces-new-law-for-eateries-and-wedding-halls",
      publisher: "ARY News (news)",
    },
  ],
  checked: "20 November 2026",
  links: [
    {
      label: "FBR POS integration guide",
      href: "/guides/fbr-pos-integration",
      note: "The federal side: Tier-1 retailers, restaurants and FBR's penalties",
    },
    {
      label: `${BRAND_NAME} in Punjab`,
      href: "/pos/punjab",
      note: "FBR and PRA explained for Punjab businesses",
    },
    {
      label: `${BRAND_NAME} in Sindh`,
      href: "/pos/sindh",
      note: "FBR and SRB explained for Sindh businesses",
    },
    {
      label: `${BRAND_NAME} in Lahore`,
      href: "/pos/lahore",
      note: "Restaurants, cafés and shops in Lahore",
    },
    {
      label: `${BRAND_NAME} in Karachi`,
      href: "/pos/karachi",
      note: "Restaurants, delivery kitchens and wholesalers in Karachi",
    },
    {
      label: `${BRAND_NAME} for restaurants`,
      href: "/business/restaurants",
      note: "Tables, kitchen tickets, delivery and offline billing",
    },
    {
      label: "Book a demo",
      href: "/book-demo",
      note: "Tell us which authority you report to and we will be honest about the fit",
    },
  ],
  related: [
    "fbr-pos-integration",
    "choose-restaurant-pos",
    "best-pos-software-pakistan",
    "restaurant-opening-checklist",
    "restaurant-food-cost",
  ],
  datePublished: "2026-11-20",
  dateModified: "2026-11-20",
  og: {
    eyebrow: "Guide · PRA and SRB POS integration",
    title: "PRA and SRB e-invoicing for restaurants, explained.",
    sub: "Who must integrate, how it works, cash and card rates and penalties, from the authorities' own documents.",
    pills: ["Punjab e-IMS", "Sindh SRB-POS", "Card vs cash rates", "Penalties"],
  },
};

export default guide;
