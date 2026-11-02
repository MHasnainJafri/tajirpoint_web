"use client";

import { useState } from "react";
import { foodCost, parseAmount, periodFoodCost } from "@/lib/tools/calc";
import {
  NumberField,
  ResetButton,
  ResultRow,
  Results,
  Switch,
  ToolCard,
  fmt,
  fmtPct,
  useTrackFirstResult,
} from "./ToolKit";

type Mode = "dish" | "period";

export function FoodCostCalculator() {
  const [mode, setMode] = useState<Mode>("dish");
  // One dish
  const [plate, setPlate] = useState("");
  const [menu, setMenu] = useState("");
  const [target, setTarget] = useState("");
  // Whole kitchen
  const [opening, setOpening] = useState("");
  const [purchases, setPurchases] = useState("");
  const [closing, setClosing] = useState("");
  const [sales, setSales] = useState("");

  const pc = parseAmount(plate);
  const mp = parseAmount(menu);
  const tg = parseAmount(target);
  const dish = mode === "dish" && pc !== null && mp !== null ? foodCost(pc, mp, tg) : null;

  const o = parseAmount(opening) ?? 0;
  const pu = parseAmount(purchases);
  const cl = parseAmount(closing) ?? 0;
  const sa = parseAmount(sales);
  const period =
    mode === "period" && pu !== null && sa !== null ? periodFoodCost(o, pu, cl, sa) : null;

  let empty: string | null = null;
  if (mode === "dish") {
    if (pc === null || mp === null) empty = "Enter the plate cost and the menu price.";
    else if (!dish) empty = "The menu price must be more than 0.";
  } else if (pu === null || sa === null) {
    empty = "Enter at least your food purchases and food sales for the period.";
  } else if (!period) empty = "Food sales must be more than 0.";

  useTrackFirstResult("food-cost-calculator", dish !== null || period !== null);

  const reset = () => {
    for (const set of [
      setPlate,
      setMenu,
      setTarget,
      setOpening,
      setPurchases,
      setClosing,
      setSales,
    ])
      set("");
  };

  return (
    <ToolCard>
      <div className="grid min-w-0 gap-6 md:grid-cols-[1.1fr_1fr] md:gap-8">
        <form className="flex min-w-0 flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <Switch<Mode>
            name="fc-mode"
            legend="Work out food cost for…"
            value={mode}
            onChange={setMode}
            options={[
              { value: "dish", label: "One dish" },
              { value: "period", label: "Whole kitchen (a month)" },
            ]}
          />
          {mode === "dish" ? (
            <>
              <NumberField
                id="fc-plate"
                label="Plate cost"
                value={plate}
                onChange={setPlate}
                hint="What the ingredients for one portion cost you."
              />
              <NumberField
                id="fc-menu"
                label="Menu price"
                value={menu}
                onChange={setMenu}
                hint="Before sales tax or VAT."
              />
              <NumberField
                id="fc-target"
                label="Target food cost (optional)"
                value={target}
                onChange={setTarget}
                suffix="%"
              />
            </>
          ) : (
            <>
              <NumberField
                id="fc-opening"
                label="Opening stock value"
                value={opening}
                onChange={setOpening}
                hint="Food and drink stock at the start of the period."
              />
              <NumberField
                id="fc-purchases"
                label="Food purchases"
                value={purchases}
                onChange={setPurchases}
                hint="Everything you bought for the kitchen in the period."
              />
              <NumberField
                id="fc-closing"
                label="Closing stock value"
                value={closing}
                onChange={setClosing}
                hint="Stock left at the end of the period, from a stock count."
              />
              <NumberField
                id="fc-sales"
                label="Food sales"
                value={sales}
                onChange={setSales}
                hint="Sales for the same period, before tax."
              />
            </>
          )}
          <div>
            <ResetButton onClick={reset} />
          </div>
        </form>

        <Results empty={empty}>
          {dish && (
            <>
              <ResultRow label="Food cost" value={fmtPct(dish.foodCostPct)} big />
              <ResultRow label="Gross profit per plate" value={fmt(dish.grossProfit)} />
              {dish.priceForTarget !== null && tg !== null && (
                <ResultRow
                  label={`Menu price for ${fmtPct(tg)} food cost`}
                  value={fmt(dish.priceForTarget)}
                  note="before tax"
                />
              )}
            </>
          )}
          {period && (
            <>
              <ResultRow label="Food cost" value={fmtPct(period.foodCostPct)} big />
              <ResultRow
                label="Food used"
                value={fmt(period.used)}
                note="opening + purchases − closing"
              />
            </>
          )}
        </Results>
      </div>
    </ToolCard>
  );
}
