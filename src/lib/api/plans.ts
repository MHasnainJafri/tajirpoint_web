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
  tagline: z.string(),
  /** Already formatted for display: "$19", "Rs 4,500", or "Custom". */
  price: z.string(),
  /** False for contact-sales plans — the "/ month" suffix is hidden. */
  is_priced: z.boolean(),
  bullets: z.array(z.string()),
  cta: z.string(),
  highlighted: z.boolean(),
});

const ResponseSchema = z.object({ plans: z.array(PlanSchema) });

export type MarketingPlan = z.infer<typeof PlanSchema>;

export async function getPlans(): Promise<MarketingPlan[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/public/plans/`, {
      next: { revalidate: 300, tags: ["plans"] },
    });
    if (!res.ok) return null;

    const parsed = ResponseSchema.safeParse(await res.json());
    // An empty catalogue is a misconfiguration, not a valid pricing page.
    if (!parsed.success || parsed.data.plans.length === 0) return null;

    return parsed.data.plans;
  } catch {
    return null;
  }
}
