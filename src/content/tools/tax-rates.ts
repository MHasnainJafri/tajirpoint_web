/**
 * Tax-rate presets for the sales tax / VAT calculator.
 *
 * Every preset was read from the tax authority's own site or the law it
 * publishes, on the date in `checked`. A rate that could not be confirmed
 * from an official source is left out on purpose — the visitor can always
 * type any rate. Re-check each source when a budget / finance act changes a
 * rate, and update `checked` in the same commit.
 *
 * Only standard rates: reduced, zero and exempt rates depend on the item, and
 * a preset that looks like it applies to everything would mislead.
 */
export interface TaxPreset {
  id: string;
  /** Short button text. */
  label: string;
  country: string;
  ratePct: number;
  /** What the rate covers, in plain words. */
  note: string;
  sourceName: string;
  sourceUrl: string;
  /** When we read the source, e.g. "2 Nov 2026". */
  checked: string;
}

export const TAX_PRESETS: TaxPreset[] = [
  {
    id: "pk-sales-tax-standard",
    label: "Pakistan 18%",
    country: "Pakistan",
    ratePct: 18,
    note: "Federal sales tax on goods (Sales Tax Act 1990, section 3). Provincial sales tax on services (PRA, SRB, KPRA, BRA) has its own rates.",
    sourceName: "FBR — Sales Tax Act 1990, updated to 2025-26",
    sourceUrl: "https://download1.fbr.gov.pk/Docs/202586148252375SalesTaxActupdatedupto2025-26.pdf",
    checked: "2 Nov 2026",
  },
  {
    id: "uk-vat-standard",
    label: "UK VAT 20%",
    country: "United Kingdom",
    ratePct: 20,
    note: "Standard rate for most goods and services. Some items are 5% or 0%.",
    sourceName: "GOV.UK — VAT rates",
    sourceUrl: "https://www.gov.uk/vat-rates",
    checked: "2 Nov 2026",
  },
  {
    id: "ae-vat-standard",
    label: "UAE VAT 5%",
    country: "United Arab Emirates",
    ratePct: 5,
    note: "Standard VAT rate since 1 January 2018.",
    sourceName: "UAE Ministry of Finance — VAT",
    sourceUrl: "https://mof.gov.ae/en/public-finance/tax/vat/",
    checked: "2 Nov 2026",
  },
  {
    id: "sa-vat-standard",
    label: "Saudi VAT 15%",
    country: "Saudi Arabia",
    ratePct: 15,
    note: "Standard VAT rate. Some supplies are zero-rated or exempt.",
    sourceName: "ZATCA — Guideline for tax invoicing and records under VAT",
    sourceUrl:
      "https://zatca.gov.sa/en/HelpCenter/guidelines/Documents/Guideline-for-Tax-Invoicing-and-Records-under-VAT-Provisions.pdf",
    checked: "2 Nov 2026",
  },
];
