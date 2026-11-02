"use client";

import { useState } from "react";
import { marginFromCostPrice, parseAmount, priceForMargin, priceForMarkup } from "@/lib/tools/calc";
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

type Mode = "check" | "price";
type Target = "margin" | "markup";

export function MarginCalculator() {
  const [mode, setMode] = useState<Mode>("check");
  const [target, setTarget] = useState<Target>("margin");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [pct, setPct] = useState("");

  const c = parseAmount(cost);
  const p = parseAmount(price);
  const t = parseAmount(pct);

  // In "find my price" mode the price comes from the target %.
  let sellPrice: number | null = null;
  let empty: string | null = null;
  if (mode === "check") {
    sellPrice = p;
    if (c === null || p === null) empty = "Enter a cost and a selling price.";
  } else {
    if (c === null || t === null) empty = `Enter a cost and the ${target} you want.`;
    else if (target === "margin") {
      sellPrice = priceForMargin(c, t);
      if (sellPrice === null)
        empty = "A margin must be under 100% — at 100% the item would cost nothing.";
    } else sellPrice = priceForMarkup(c, t);
  }
  const result =
    !empty && c !== null && sellPrice !== null ? marginFromCostPrice(c, sellPrice) : null;
  useTrackFirstResult("profit-margin-calculator", result !== null);

  const reset = () => {
    setCost("");
    setPrice("");
    setPct("");
  };

  return (
    <ToolCard>
      <div className="grid min-w-0 gap-6 md:grid-cols-[1.1fr_1fr] md:gap-8">
        <form className="flex min-w-0 flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <Switch<Mode>
            name="margin-mode"
            legend="What do you want to do?"
            value={mode}
            onChange={setMode}
            options={[
              { value: "check", label: "Check my margin" },
              { value: "price", label: "Find my price" },
            ]}
          />
          <NumberField
            id="mc-cost"
            label="Cost of one item"
            value={cost}
            onChange={setCost}
            hint="What you paid for it, before tax."
          />
          {mode === "check" ? (
            <NumberField
              id="mc-price"
              label="Selling price"
              value={price}
              onChange={setPrice}
              hint="What the customer pays, before sales tax or VAT."
            />
          ) : (
            <>
              <Switch<Target>
                name="margin-target"
                legend="I want a target…"
                value={target}
                onChange={setTarget}
                options={[
                  { value: "margin", label: "Margin %" },
                  { value: "markup", label: "Markup %" },
                ]}
              />
              <NumberField
                id="mc-pct"
                label={target === "margin" ? "Margin you want" : "Markup you want"}
                value={pct}
                onChange={setPct}
                suffix="%"
              />
            </>
          )}
          <div>
            <ResetButton onClick={reset} />
          </div>
        </form>

        <Results
          empty={empty}
          after={
            result && result.profit < 0 ? (
              <p className="mt-3 text-[14px] font-semibold text-[#B42318]">
                You lose money on each sale at this price.
              </p>
            ) : null
          }
        >
          {result && (
            <>
              {mode === "price" && <ResultRow label="Sell it for" value={fmt(result.price)} big />}
              <ResultRow
                label="Profit per item"
                value={fmt(result.profit)}
                big={mode === "check"}
              />
              <ResultRow
                label="Margin"
                note="profit ÷ selling price"
                value={result.marginPct === null ? "—" : fmtPct(result.marginPct)}
              />
              <ResultRow
                label="Markup"
                note="profit ÷ cost"
                value={result.markupPct === null ? "—" : fmtPct(result.markupPct)}
              />
            </>
          )}
        </Results>
      </div>
    </ToolCard>
  );
}
