import { describe, expect, it } from "vitest";
import {
  addTax,
  breakEven,
  foodCost,
  invoiceTotals,
  marginFromCostPrice,
  parseAmount,
  periodFoodCost,
  priceForMargin,
  priceForMarkup,
  removeTax,
  round,
} from "@/lib/tools/calc";
import { TOOLS, TOOLS_HUB } from "@/content/tools/tools";
import { TAX_PRESETS } from "@/content/tools/tax-rates";
import { fullTitle } from "@/lib/seo/metadata";

describe("parseAmount", () => {
  it("reads plain, comma-grouped and Arabic-Indic numbers", () => {
    expect(parseAmount("1,250.50")).toBe(1250.5);
    expect(parseAmount(" 18 ")).toBe(18);
    expect(parseAmount("١٢٣")).toBe(123);
    expect(parseAmount("۱۸")).toBe(18);
    expect(parseAmount("5.")).toBe(5);
    expect(parseAmount(".5")).toBe(0.5);
  });
  it("rejects empty and junk", () => {
    expect(parseAmount("")).toBeNull();
    expect(parseAmount("abc")).toBeNull();
    expect(parseAmount("1.2.3")).toBeNull();
  });
});

describe("margin and markup", () => {
  it("100 cost, 150 price = 33.3% margin, 50% markup", () => {
    const r = marginFromCostPrice(100, 150);
    expect(r.profit).toBe(50);
    expect(round(r.marginPct!, 1)).toBe(33.3);
    expect(r.markupPct).toBe(50);
  });
  it("no margin on a zero price, no markup on a zero cost", () => {
    expect(marginFromCostPrice(0, 0).marginPct).toBeNull();
    expect(marginFromCostPrice(0, 10).markupPct).toBeNull();
  });
  it("prices for targets", () => {
    expect(priceForMargin(60, 40)).toBe(100);
    expect(priceForMargin(60, 100)).toBeNull();
    expect(priceForMarkup(80, 25)).toBe(100);
  });
});

describe("tax", () => {
  it("adds and removes tax", () => {
    expect(addTax(100, 20)).toEqual({ net: 100, tax: 20, gross: 120 });
    const r = removeTax(120, 20)!;
    expect(round(r.net)).toBe(100);
    expect(round(r.tax)).toBe(20);
  });
  it("every preset has a source and a check date", () => {
    for (const p of TAX_PRESETS) {
      expect(p.sourceUrl).toMatch(/^https:\/\//);
      expect(p.checked).toBeTruthy();
      expect(p.ratePct).toBeGreaterThan(0);
    }
  });
});

describe("break-even", () => {
  it("rounds units up", () => {
    const r = breakEven(1000, 30, 10, 25)!;
    expect(r.units).toBe(50);
    expect(r.revenue).toBe(1500);
    expect(r.unitsPerDay).toBe(2);
    expect(breakEven(1001, 30, 10)!.units).toBe(51);
    expect(breakEven(1000, 0.3, 0.2)!.units).toBe(10000);
  });
  it("is impossible when each sale loses money", () => {
    expect(breakEven(1000, 10, 10)).toBeNull();
    expect(breakEven(1000, 10, 12)).toBeNull();
  });
});

describe("food cost", () => {
  it("per dish and target price", () => {
    const r = foodCost(300, 1000, 25)!;
    expect(r.foodCostPct).toBe(30);
    expect(r.grossProfit).toBe(700);
    expect(r.priceForTarget).toBe(1200);
    expect(foodCost(300, 0)).toBeNull();
  });
  it("per period", () => {
    expect(periodFoodCost(1000, 5000, 1500, 15000)).toEqual({ used: 4500, foodCostPct: 30 });
  });
});

describe("invoice totals", () => {
  it("discount before tax, rounded lines", () => {
    const t = invoiceTotals(
      [
        { quantity: 3, unitPrice: 33.333 },
        { quantity: 1, unitPrice: 50 },
      ],
      10,
      10
    );
    expect(t.subtotal).toBe(150);
    expect(t.taxable).toBe(140);
    expect(t.tax).toBe(14);
    expect(t.total).toBe(154);
  });
  it("discount never exceeds the subtotal", () => {
    expect(invoiceTotals([{ quantity: 1, unitPrice: 20 }], 0, 50).total).toBe(0);
  });
});

describe("tool page SEO copy", () => {
  it("titles fit in 60 characters and descriptions are 140-160", () => {
    for (const s of [...TOOLS.map((t) => t.seo), TOOLS_HUB.seo]) {
      expect(fullTitle(s.title).length).toBeLessThanOrEqual(60);
      expect(s.description.length).toBeGreaterThanOrEqual(140);
      expect(s.description.length).toBeLessThanOrEqual(160);
    }
  });
});
