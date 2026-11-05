import type { AddonBlock, LocationFact, LocationFaq, LocationSource, TaxRow } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Facts shared by every Pakistani page, checked 2 Nov 2026 against the backend:
//  - currency PKR, whole-rupee cash rounding by default:
//    domains/tenancy/services/pos_settings.py (WHOLE_UNIT_CASH_CURRENCIES)
//  - Urdu receipts by default for Pakistan: tenancy Shop.receipt_language
//  - NTN + STRN on invoices: Shop.ntn_number / strn_number, sales/services/invoice_context.py
//  - tax authorities on the shop: Shop.TaxAuthority (FBR, PRA, SRB, KPRA, BRA) — a label
//    only; there is no PRA/SRB/KPRA/BRA connection in the code
//  - FBR link: domains/fbr exists but the add-on is "coming soon" in the public catalogue
//  - tenders at the till: Tajir-Point-Web ChargeSheet (cash, card/bank/wallet with a
//    reference, khata credit, cheque, split)
//  - JazzCash / Easypaisa / HBLPay / couriers: status read live from
//    /api/v1/public/extensions/ (coming soon on 2 Nov 2026)

export const PK_UPDATED = "2026-11-02";

export const PK_FACT_CURRENCY: LocationFact = {
  label: "Currency",
  value:
    "Pakistani rupee (Rs). Cash bills round to whole rupees, so nobody hunts for paisa. You can turn that off.",
};

export const PK_FACT_LANGUAGE: LocationFact = {
  label: "Language",
  value:
    "Every screen in Urdu or English (Arabic too). Receipts print in Urdu by default for Pakistani shops.",
};

export const PK_FACT_TAX: LocationFact = {
  label: "Tax",
  value:
    "Your NTN and STRN print on invoices. The FBR link is not live yet; provincial authorities are not connected.",
};

export const PK_FACT_POWER: LocationFact = {
  label: "Power cuts",
  value:
    "Keeps billing with no internet on web, Windows and Android, and syncs on its own when the line is back.",
};

export const PK_FACTS: LocationFact[] = [
  PK_FACT_CURRENCY,
  PK_FACT_LANGUAGE,
  PK_FACT_TAX,
  PK_FACT_POWER,
];

/** FBR row: our status is the live status of the FBR add-on. */
export const FBR_ROW: TaxRow = {
  short: "FBR",
  name: "Federal Board of Revenue",
  covers: "Federal sales tax on goods, and the POS link FBR asks Tier-1 retailers to use.",
  addon: "fbr-integration",
  note: `When the FBR add-on is live, each sale goes to FBR and the receipt prints the FBR invoice number and QR code. Until then ${BRAND_NAME} records the tax on every bill and gives you tax reports, but does not send invoices to FBR.`,
};

export const PRA_ROW: TaxRow = {
  short: "PRA",
  name: "Punjab Revenue Authority",
  covers: "Sales tax on services in Punjab, which includes restaurants.",
  ours: { tone: "no", label: "Not connected" },
  note: `${BRAND_NAME} cannot send invoices to PRA. If PRA asks your business to report invoices to its system, tell us before you switch.`,
};

export const SRB_ROW: TaxRow = {
  short: "SRB",
  name: "Sindh Revenue Board",
  covers: "Sales tax on services in Sindh, which includes restaurants.",
  ours: { tone: "no", label: "Not connected" },
  note: `${BRAND_NAME} cannot send invoices to SRB. If SRB asks your business to report invoices to its system, tell us before you switch.`,
};

export const KPRA_ROW: TaxRow = {
  short: "KPRA",
  name: "Khyber Pakhtunkhwa Revenue Authority",
  covers: "Sales tax on services in Khyber Pakhtunkhwa.",
  ours: { tone: "no", label: "Not connected" },
  note: `No KPRA link. ${BRAND_NAME} records the tax on each bill; reporting to KPRA stays with you or your adviser.`,
};

export const BRA_ROW: TaxRow = {
  short: "BRA",
  name: "Balochistan Revenue Authority",
  covers: "Sales tax on services in Balochistan.",
  ours: { tone: "no", label: "Not connected" },
  note: `No BRA link. ${BRAND_NAME} records the tax on each bill; reporting to BRA stays with you or your adviser.`,
};

export const PK_TAX_NOTE = `Tax rules change, and which ones apply depends on your business. Check with the authority or your tax adviser. We will tell you honestly what ${BRAND_NAME} can and cannot do for your case.`;

/** Payments for any Pakistani page. */
export const PK_PAYMENTS: AddonBlock = {
  id: "payments",
  heading: "Getting paid in Pakistan",
  intro:
    "Most of this works today without any add-on. The add-ons below let customers pay online and mark the bill paid by themselves; their status comes straight from our system.",
  now: [
    "Cash, with whole-rupee change",
    "Card machine, bank transfer, Raast or wallet transfer: type the reference on the bill",
    "Khata: put the bill on the customer's account and collect later",
    "Cheques, and one bill split across several payment methods",
  ],
  addons: ["jazzcash-payments", "easypaisa-payments", "hbl-payments"],
};

/** Couriers and delivery for Pakistani pages that sell or deliver beyond the counter. */
export const PK_DELIVERY: AddonBlock = {
  id: "delivery",
  heading: "Delivery and couriers",
  intro: `Your own riders work today with the ${BRAND_NAME} rider app. Booking parcels with courier companies from the POS is on the way; the status below is live.`,
  now: [
    "Rider app on Android: jobs, directions, cash collected, delivery confirmed",
    "Your own online order page and website for customers to order from",
  ],
  addons: ["courier-tcs", "courier-leopards", "courier-postex"],
};

/** Questions every Pakistani page answers the same way. */
export const PK_FAQ_FBR: LocationFaq = {
  q: "Is the FBR integration ready?",
  a: (status) =>
    `The FBR add-on is ${status("fbr-integration")}. Until it is live, ${BRAND_NAME} records the tax on every bill, prints your NTN and STRN on invoices and gives you tax reports, but it does not send invoices to FBR. If you are a Tier-1 retailer who must be connected to FBR today, talk to us before you switch.`,
};

export const PK_FAQ_WALLETS: LocationFaq = {
  q: "Can I take JazzCash or Easypaisa payments?",
  a: (status) =>
    `Yes, as a payment you record: the customer sends the money and the cashier types the transaction reference on the bill. The JazzCash add-on (${status("jazzcash-payments")}) and the Easypaisa add-on (${status("easypaisa-payments")}) will let customers pay from their wallet and mark the bill paid automatically.`,
};

export const PK_FAQ_URDU: LocationFaq = {
  q: "Can my staff use it in Urdu?",
  a: "Yes. Every screen can be switched to Urdu or English, and receipts print in Urdu by default for Pakistani shops. Arabic is there too.",
};

export const PK_COMMON_FAQS: LocationFaq[] = [PK_FAQ_FBR, PK_FAQ_WALLETS, PK_FAQ_URDU];

// ── Province pages (5 Nov 2026) ─────────────────────────────────────────────
// Tax facts on the province and new city pages come only from the authority's
// own site, read on 5 Nov 2026, and are listed in each page's `sources`.

export const PROVINCE_UPDATED = "2026-11-05";
export const PROVINCE_CHECKED = { label: "5 Nov 2026", iso: "2026-11-05" } as const;

export const SRC_PRA_HOME: LocationSource = {
  label: "Punjab Revenue Authority: home page (e-IMS services and guide)",
  url: "https://pra.punjab.gov.pk/",
  publisher: "PRA",
};

export const SRC_PRA_FISCAL_DEVICE: LocationSource = {
  label: "PRA: Technical Specification for Data Sharing through Software Fiscal Device, v1.2",
  url: "https://e.pra.punjab.gov.pk/templates/Technical_Specification_Software_Fiscal_Device_1.2_PRA.pdf",
  publisher: "PRA / PRAL",
};

export const SRC_PRA_EIMS: LocationSource = {
  label: "PRA e-IMS: invoice search",
  url: "https://e.pra.punjab.gov.pk/public/eims.xhtml",
  publisher: "PRA",
};

export const SRC_SRB_HOME: LocationSource = {
  label: "Sindh Revenue Board: home page (Point of Sale, lucky draw, taxable services)",
  url: "https://www.srb.gos.pk/srb/",
  publisher: "SRB",
};

export const SRC_KPRA_RIMS: LocationSource = {
  label: "KPRA: Restaurant APIs (RIMS) docs for POS software providers",
  url: "https://posregistration.kpra.gov.pk/docs",
  publisher: "KPRA",
};

export const SRC_KPRA_PESHAWAR: LocationSource = {
  label: "KPRA news, 4 Jan 2023: KPRA visits Peshawar restaurants to integrate their POS with RIMS",
  url: "https://kpra.gov.pk/?p=11454",
  publisher: "KPRA",
};

export const SRC_KPRA_RMRS: LocationSource = {
  label: "KPRA news, 14 Apr 2023: RMRS devices handed to restaurants in Bannu",
  url: "https://kpra.gov.pk/?p=11628",
  publisher: "KPRA",
};
