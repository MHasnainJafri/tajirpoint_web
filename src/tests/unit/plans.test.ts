import { afterEach, describe, expect, it, vi } from "vitest";
import {
  annualAmount,
  annualMonthsSaved,
  getPricing,
  hasLimits,
  isContactSalesPlan,
  isFreePlan,
  planNames,
  planPriceLabel,
  planSummary,
  type MarketingPlan,
} from "@/lib/api/plans";

/** What production returned on 11 Oct 2026 (before the relaunch backend). */
const OLD_SHAPE = {
  trial_days: 90,
  plans: [
    { id: "1", name: "Basic", tier: "basic", tagline: "Everything you need to start selling, free", price: "Free", price_amount: "0.0000", currency_code: "USD", annual_price: "0.0000", is_priced: false, bullets: ["Full POS & receipts"], cta: "Start free", highlighted: false },
    { id: "2", name: "Pro", tier: "basic", tagline: "For a growing business", price: "$29", price_amount: "29.0000", currency_code: "USD", annual_price: "290.0000", is_priced: true, bullets: ["Everything in Basic"], cta: "Choose Pro", highlighted: false },
    { id: "3", name: "Business", tier: "silver", tagline: "For businesses with several branches", price: "$79", price_amount: "79.0000", currency_code: "USD", annual_price: "790.0000", is_priced: true, bullets: ["Everything in Pro"], cta: "Choose Business", highlighted: true },
    { id: "4", name: "Enterprise", tier: "gold", tagline: "Chains and franchises", price: "Custom", price_amount: "0.0000", currency_code: "USD", annual_price: "0.0000", is_priced: false, bullets: ["Tailored pricing"], cta: "Contact us", highlighted: false },
  ],
};

/** The relaunch shape from CONTRACT.md (only keys added). */
const NEW_SHAPE = {
  plans: [
    {
      ...OLD_SHAPE.plans[0],
      name: "Light",
      tagline: "Free for 3 months — everything to open your shop",
      free_period_days: 90,
      price_display: "Free for 3 months",
      limits: { shops: 1, users: 2, products: 30, orders_per_day: 100, warehouses: 1 },
      extensions_restricted: true,
      not_included: ["AI phone ordering", "WhatsApp ordering"],
    },
    { ...OLD_SHAPE.plans[1], name: "Shop", free_period_days: null, price_display: null, limits: { shops: 1, users: 5, products: null, orders_per_day: null, warehouses: 1 }, extensions_restricted: false, not_included: [] },
    { ...OLD_SHAPE.plans[2], free_period_days: null, limits: { shops: 5, users: 20, products: null, orders_per_day: null, warehouses: 5 }, extensions_restricted: false },
    { ...OLD_SHAPE.plans[3], limits: null },
  ],
};

function mockFetch(body: unknown, ok = true) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok,
    json: async () => body,
  } as Response);
}

afterEach(() => vi.restoreAllMocks());

describe("getPricing", () => {
  it("parses the old production shape", async () => {
    mockFetch(OLD_SHAPE);
    const pricing = await getPricing();
    expect(pricing?.plans.map((p) => p.name)).toEqual(["Basic", "Pro", "Business", "Enterprise"]);
    const [basic, pro, business, enterprise] = pricing!.plans as [MarketingPlan, MarketingPlan, MarketingPlan, MarketingPlan];
    expect(isFreePlan(basic)).toBe(true);
    expect(isFreePlan(pro)).toBe(false); // priced, even though tier is "basic"
    expect(isContactSalesPlan(enterprise)).toBe(true);
    expect(isContactSalesPlan(basic)).toBe(false);
    expect(planPriceLabel(basic)).toBe("Free");
    expect(hasLimits(pricing!.plans)).toBe(false);
    expect(annualAmount(business)).toBe(790);
    expect(annualMonthsSaved(business)).toBe(2);
    expect(annualAmount(enterprise)).toBeNull();
  });

  it("parses the relaunch shape", async () => {
    mockFetch(NEW_SHAPE);
    const pricing = await getPricing();
    const [light, shop, , enterprise] = pricing!.plans as [MarketingPlan, MarketingPlan, MarketingPlan, MarketingPlan];
    expect(isFreePlan(light)).toBe(true);
    expect(planPriceLabel(light)).toBe("Free for 3 months");
    expect(planPriceLabel(shop)).toBe("$29");
    expect(light.limits?.products).toBe(30);
    expect(shop.limits?.products).toBeNull();
    expect(light.not_included).toContain("WhatsApp ordering");
    expect(hasLimits(pricing!.plans)).toBe(true);
    expect(isContactSalesPlan(enterprise)).toBe(true);
    expect(planSummary(pricing!.plans)).toBe(
      "Light Free for 3 months, Shop $29/month, Business $79/month, Enterprise Custom"
    );
    expect(planNames(pricing!.plans)).toBe("Light, Shop, Business and Enterprise");
  });

  it("treats a free plan with free_period_days as free even if its tier changes", async () => {
    mockFetch({ plans: [{ ...NEW_SHAPE.plans[0], tier: "silver" }] });
    const pricing = await getPricing();
    expect(isFreePlan(pricing!.plans[0]!)).toBe(true);
  });

  it("returns null on errors, bad shapes and empty catalogues", async () => {
    mockFetch({}, false);
    expect(await getPricing()).toBeNull();
    vi.restoreAllMocks();
    mockFetch({ plans: [{ id: 1 }] });
    expect(await getPricing()).toBeNull();
    vi.restoreAllMocks();
    mockFetch({ plans: [] });
    expect(await getPricing()).toBeNull();
    vi.restoreAllMocks();
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    expect(await getPricing()).toBeNull();
  });

  it("summarises nothing when there are no plans", () => {
    expect(planSummary(null)).toBeNull();
    expect(planNames([])).toBeNull();
  });
});
