import { z } from "zod";

/**
 * The published pricing table, read from the POS backend so plans can be
 * edited in Django admin instead of in this repo.
 *
 * Server-side only: no CORS, and the page stays static. `revalidate: 300`
 * means an admin edit shows up within five minutes; the `plans` tag also
 * allows an instant bust via `revalidateTag("plans")` from a route handler.
 *
 * Every failure path returns null so the caller can fall back to the copy in
 * messages/*.json — a pricing section is never allowed to render empty.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.tajirpoint.com";

const PlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  /** basic | silver | gold. Separates the free plan (unpriced, `basic`) from
   *  contact-sales (unpriced, `gold`) — see isFreePlan(). */
  tier: z.string(),
  tagline: z.string(),
  /** Already formatted for display: "$19", "€24", or "Custom". */
  price: z.string(),
  /** The bare number behind `price`, as a decimal string. Structured data
   *  needs a machine-readable amount and an ISO currency — "$19" is neither. */
  price_amount: z.string(),
  /** ISO-4217. Never the reader's currency; see planCurrency.ts. */
  currency_code: z.string(),
  /** Annual amount as a decimal string. "0" when the tier is not sold yearly. */
  annual_price: z.string(),
  /** False for the free plan and for contact-sales plans — the "/ month"
   *  suffix is hidden for both. */
  is_priced: z.boolean(),
  bullets: z.array(z.string()),
  cta: z.string(),
  highlighted: z.boolean(),

  // ── Added for the Light-plan relaunch (Oct 2026). All optional: the site
  //    must keep working against a backend that does not send them yet.
  /** 90 for Light; null for plans with no time limit. */
  free_period_days: z.number().int().nullish(),
  /** "Free for 3 months" — preferred over `price` when present. */
  price_display: z.string().nullish(),
  /** null for a key = unlimited. */
  limits: z
    .object({
      shops: z.number().nullish(),
      users: z.number().nullish(),
      products: z.number().nullish(),
      orders_per_day: z.number().nullish(),
      warehouses: z.number().nullish(),
    })
    .nullish(),
  extensions_restricted: z.boolean().nullish(),
  /** What this plan does NOT include (Light only). */
  not_included: z.array(z.string()).nullish(),
});

const ResponseSchema = z.object({
  plans: z.array(PlanSchema),
});

export type MarketingPlan = z.infer<typeof PlanSchema>;

export interface MarketingPricing {
  plans: MarketingPlan[];
}

/**
 * The free plan (Light — free for 90 days from signup). `is_priced` is false
 * for it AND for the contact-sales tier, and both carry price_amount 0, so
 * neither the flag nor the amount can separate them — `tier` does: the free
 * plan is `basic`, Enterprise is `gold`. A `free_period_days` value also marks
 * it. Never read the word "Free" out of the display string; that is copy the
 * admin can retype in any language.
 */
export function isFreePlan(plan: MarketingPlan): boolean {
  return !plan.is_priced && (plan.tier === "basic" || plan.free_period_days != null);
}

/** The headline price: `price_display` ("Free for 3 months") when sent. */
export function planPriceLabel(plan: MarketingPlan): string {
  return plan.price_display?.trim() || plan.price;
}

/** The annual amount as a number, or null when the plan is not sold yearly. */
export function annualAmount(plan: MarketingPlan): number | null {
  if (!plan.is_priced) return null;
  const n = Number(plan.annual_price);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** "$290" in the plan's own currency. */
export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

/** Months saved by paying yearly, rounded down; 0 when there is no saving. */
export function annualMonthsSaved(plan: MarketingPlan): number {
  const yearly = annualAmount(plan);
  const monthly = Number(plan.price_amount);
  if (!yearly || !Number.isFinite(monthly) || monthly <= 0) return 0;
  return Math.max(0, Math.floor((monthly * 12 - yearly) / monthly));
}

/** True when the API sends the relaunch fields (limits) for any plan. */
export function hasLimits(plans: MarketingPlan[] | null | undefined): boolean {
  return Boolean(plans?.some((p) => p.limits));
}

/**
 * Anything unpriced that is not the free plan is a conversation. That is the
 * safe direction: sending someone to checkout for a plan with no price is the
 * worse of the two mistakes.
 */
export function isContactSalesPlan(plan: MarketingPlan): boolean {
  return !plan.is_priced && !isFreePlan(plan);
}

export async function getPricing(): Promise<MarketingPricing | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/public/plans/`, {
      next: { revalidate: 300, tags: ["plans"] },
    });
    if (!res.ok) return null;

    const parsed = ResponseSchema.safeParse(await res.json());
    // An empty catalogue is a misconfiguration, not a valid pricing page.
    if (!parsed.success || parsed.data.plans.length === 0) return null;

    return { plans: parsed.data.plans };
  } catch {
    return null;
  }
}

/** Plans only. */
export async function getPlans(): Promise<MarketingPlan[] | null> {
  return (await getPricing())?.plans ?? null;
}

/**
 * The catalogue as one line of plain text, for metadata and llms.txt:
 * "Light Free for 3 months, Shop $29/month, Business $79/month, Enterprise Custom".
 * Built from the API rows so an admin edit to a name or price reaches every
 * surface that quotes it. Null when there is nothing to describe — callers
 * then fall back to wording that names no plan and quotes no price.
 */
export function planSummary(plans: MarketingPlan[] | null | undefined): string | null {
  if (!plans?.length) return null;
  return plans
    .map((p) => `${p.name} ${planPriceLabel(p)}${p.is_priced ? "/month" : ""}`)
    .join(", ");
}

/** "Light, Shop, Business and Enterprise", from the API rows. */
export function planNames(plans: MarketingPlan[] | null | undefined): string | null {
  if (!plans?.length) return null;
  const names = plans.map((p) => p.name);
  const last = names.pop();
  return names.length ? `${names.join(", ")} and ${last}` : (last ?? null);
}
