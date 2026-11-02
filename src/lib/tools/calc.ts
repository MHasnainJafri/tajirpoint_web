/**
 * The maths behind the free tools at /tools. Pure functions, no I/O — every
 * tool runs in the visitor's browser and nothing they type is sent anywhere.
 *
 * Every function returns `null` for a result that has no meaning (a margin on
 * a zero price, break-even when each sale loses money) instead of NaN or
 * Infinity, so the UI can say "not possible" rather than print a broken number.
 */

/** Parses what a person typed: "1,250.50", " 18 ", "١٢" (Arabic-Indic digits) → number. */
export function parseAmount(raw: string): number | null {
  if (typeof raw !== "string") return null;
  const normalised = raw
    .trim()
    // Arabic-Indic (٠-٩) and Extended Arabic-Indic / Urdu (۰-۹) digits.
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    // Arabic decimal separator and thousands separators.
    .replace(/٫/g, ".")
    .replace(/[,٬\s]/g, "");
  if (normalised === "" || !/^-?\d*\.?\d+$|^-?\d+\.$/.test(normalised)) return null;
  const n = Number(normalised);
  return Number.isFinite(n) ? n : null;
}

/** Rounds to `dp` decimal places without the 1.005 → 1.00 float trap. */
export function round(value: number, dp = 2): number {
  const f = 10 ** dp;
  return Math.round((value + Number.EPSILON) * f) / f;
}

/* ── Profit margin & markup ─────────────────────────────────────────── */

export interface MarginResult {
  cost: number;
  price: number;
  profit: number;
  /** Profit as % of the selling price. null when price is 0. */
  marginPct: number | null;
  /** Profit as % of the cost. null when cost is 0. */
  markupPct: number | null;
}

/** From cost and selling price. */
export function marginFromCostPrice(cost: number, price: number): MarginResult {
  const profit = price - cost;
  return {
    cost,
    price,
    profit,
    marginPct: price !== 0 ? (profit / price) * 100 : null,
    markupPct: cost !== 0 ? (profit / cost) * 100 : null,
  };
}

/** Selling price for a wanted margin (% of price). null at 100% or more. */
export function priceForMargin(cost: number, marginPct: number): number | null {
  if (marginPct >= 100) return null;
  return cost / (1 - marginPct / 100);
}

/** Selling price for a wanted markup (% of cost). */
export function priceForMarkup(cost: number, markupPct: number): number {
  return cost * (1 + markupPct / 100);
}

/* ── Sales tax / VAT ────────────────────────────────────────────────── */

export interface TaxResult {
  /** Amount before tax. */
  net: number;
  tax: number;
  /** Amount with tax. */
  gross: number;
}

/** Add tax to a price that does not include it. */
export function addTax(net: number, ratePct: number): TaxResult {
  const tax = net * (ratePct / 100);
  return { net, tax, gross: net + tax };
}

/**
 * Take tax out of a price that already includes it (the "tax fraction"):
 * tax = gross × rate / (100 + rate). null when the rate is -100% or less.
 */
export function removeTax(gross: number, ratePct: number): TaxResult | null {
  if (ratePct <= -100) return null;
  const net = gross / (1 + ratePct / 100);
  return { net, tax: gross - net, gross };
}

/* ── Break-even ─────────────────────────────────────────────────────── */

export interface BreakEvenResult {
  /** What each sale leaves after its own variable cost. */
  contributionPerUnit: number;
  /** Contribution as % of the selling price. */
  contributionMarginPct: number;
  /** Units to sell to cover fixed costs (rounded up — half a sale is not a sale). */
  units: number;
  /** Sales value at the break-even point. */
  revenue: number;
  /** Units per day when `days` is given. */
  unitsPerDay: number | null;
}

/**
 * Break-even for one period (usually a month). null when each sale does not
 * cover its own cost, or when the price is not positive — no number of sales
 * breaks even then.
 */
export function breakEven(
  fixedCosts: number,
  pricePerUnit: number,
  variableCostPerUnit: number,
  days?: number | null
): BreakEvenResult | null {
  const contribution = pricePerUnit - variableCostPerUnit;
  if (pricePerUnit <= 0 || contribution <= 0 || fixedCosts < 0) return null;
  // Round the quotient first so 1000 / 0.1 = 9999.999… does not become 10001.
  const units = Math.ceil(round(fixedCosts / contribution, 6));
  return {
    contributionPerUnit: contribution,
    contributionMarginPct: (contribution / pricePerUnit) * 100,
    units,
    revenue: units * pricePerUnit,
    unitsPerDay: days && days > 0 ? units / days : null,
  };
}

/* ── Restaurant food cost ───────────────────────────────────────────── */

export interface FoodCostResult {
  /** Plate (recipe) cost ÷ menu price excluding tax, as %. */
  foodCostPct: number;
  /** Menu price minus plate cost. */
  grossProfit: number;
  /** Menu price (before tax) that hits the target %, when a target is given. */
  priceForTarget: number | null;
}

/**
 * Food cost % for one dish. `menuPrice` must be the price BEFORE sales tax.
 * null when the price is not positive.
 */
export function foodCost(
  plateCost: number,
  menuPrice: number,
  targetPct?: number | null
): FoodCostResult | null {
  if (menuPrice <= 0) return null;
  return {
    foodCostPct: (plateCost / menuPrice) * 100,
    grossProfit: menuPrice - plateCost,
    priceForTarget:
      targetPct && targetPct > 0 && targetPct < 100 ? plateCost / (targetPct / 100) : null,
  };
}

/** Food cost % for a period: (opening stock + purchases − closing stock) ÷ food sales. */
export function periodFoodCost(
  openingStock: number,
  purchases: number,
  closingStock: number,
  foodSales: number
): { used: number; foodCostPct: number } | null {
  if (foodSales <= 0) return null;
  const used = openingStock + purchases - closingStock;
  return { used, foodCostPct: (used / foodSales) * 100 };
}

/* ── Invoice ────────────────────────────────────────────────────────── */

export interface InvoiceLineInput {
  quantity: number;
  unitPrice: number;
}

export interface InvoiceTotals {
  subtotal: number;
  discount: number;
  taxable: number;
  tax: number;
  total: number;
}

/**
 * Invoice totals. Line amounts are rounded to 2 dp before adding, the way a
 * printed invoice shows them, so the rows always add up to the subtotal.
 * The discount is a flat amount taken off before tax and never goes below 0.
 */
export function invoiceTotals(
  lines: InvoiceLineInput[],
  taxRatePct: number,
  discount = 0
): InvoiceTotals {
  const subtotal = round(lines.reduce((sum, l) => sum + round(l.quantity * l.unitPrice), 0));
  const d = Math.min(Math.max(discount, 0), subtotal);
  const taxable = round(subtotal - d);
  const tax = round(taxable * (Math.max(taxRatePct, 0) / 100));
  return { subtotal, discount: d, taxable, tax, total: round(taxable + tax) };
}
