import { z } from "zod";
import { TRIAL_DAYS } from "@/lib/design/landing";

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
  /** basic | silver | gold | custom. Distinguishes the trial from contact-sales. */
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
  /** False for contact-sales plans — the "/ month" suffix is hidden. */
  is_priced: z.boolean(),
  bullets: z.array(z.string()),
  cta: z.string(),
  highlighted: z.boolean(),
});

const ResponseSchema = z.object({
  plans: z.array(PlanSchema),
  /** Trial length in days, from the backend setting that actually grants it.
   *  Optional so an older backend still parses; the caller falls back to the
   *  TRIAL_DAYS constant then. */
  trial_days: z.number().int().positive().optional(),
});

export type MarketingPlan = z.infer<typeof PlanSchema>;

export interface MarketingPricing {
  plans: MarketingPlan[];
  /** Null when the backend did not say — use the local constant. */
  trialDays: number | null;
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

    return {
      plans: parsed.data.plans,
      trialDays: parsed.data.trial_days ?? null,
    };
  } catch {
    return null;
  }
}

/** Plans only, for callers that do not render the trial claim. */
export async function getPlans(): Promise<MarketingPlan[] | null> {
  return (await getPricing())?.plans ?? null;
}

/**
 * The trial length to print in copy. The backend grants the trial, so the
 * backend says how long it is (`TRIAL_PERIOD_DAYS`, 90 days in production when
 * this was written); `TRIAL_DAYS` is only the fallback for when the API is
 * unreachable. Rides the same cached `getPricing()` fetch, so calling it from
 * several places on one page costs one request.
 */
export async function getTrialDays(): Promise<number> {
  return (await getPricing())?.trialDays ?? TRIAL_DAYS;
}
