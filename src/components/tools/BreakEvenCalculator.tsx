"use client";

import { useState } from "react";
import { breakEven, parseAmount } from "@/lib/tools/calc";
import {
  NumberField,
  ResetButton,
  ResultRow,
  Results,
  ToolCard,
  fmt,
  fmtPct,
  useTrackFirstResult,
} from "./ToolKit";

export function BreakEvenCalculator() {
  const [fixed, setFixed] = useState("");
  const [price, setPrice] = useState("");
  const [variable, setVariable] = useState("");
  const [days, setDays] = useState("26");

  const f = parseAmount(fixed);
  const p = parseAmount(price);
  const v = parseAmount(variable);
  const d = parseAmount(days);

  let empty: string | null = null;
  const result = f !== null && p !== null && v !== null ? breakEven(f, p, v, d) : null;
  if (f === null || p === null || v === null)
    empty = "Enter your monthly fixed costs, your average sale and the cost of each sale.";
  else if (f < 0) empty = "Fixed costs can't be negative.";
  else if (!result)
    empty =
      "Not possible: each sale costs you as much as you charge, or more. Raise the price or lower the cost per sale.";
  useTrackFirstResult("break-even-calculator", result !== null);

  const reset = () => {
    setFixed("");
    setPrice("");
    setVariable("");
    setDays("26");
  };

  return (
    <ToolCard>
      <div className="grid min-w-0 gap-6 md:grid-cols-[1.1fr_1fr] md:gap-8">
        <form className="flex min-w-0 flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <NumberField
            id="be-fixed"
            label="Fixed costs per month"
            value={fixed}
            onChange={setFixed}
            hint="Rent, salaries, bills, loan payments — what you pay even with no sales."
          />
          <NumberField
            id="be-price"
            label="Average sale (or price of one item)"
            value={price}
            onChange={setPrice}
            hint="Before sales tax or VAT."
          />
          <NumberField
            id="be-variable"
            label="Cost of each sale"
            value={variable}
            onChange={setVariable}
            hint="Stock or ingredients, packaging, delivery, card fees for that one sale."
          />
          <NumberField
            id="be-days"
            label="Days open per month (optional)"
            value={days}
            onChange={setDays}
            placeholder="26"
          />
          <div>
            <ResetButton onClick={reset} />
          </div>
        </form>

        <Results empty={empty}>
          {result && (
            <>
              <ResultRow label="Sales needed per month" value={fmt(result.units, 0)} big />
              {result.unitsPerDay !== null && (
                <ResultRow
                  label="Sales needed per day"
                  value={fmt(Math.ceil(result.unitsPerDay), 0)}
                  note={`${fmt(result.unitsPerDay, 1)} on average, rounded up`}
                />
              )}
              <ResultRow label="Break-even sales value" value={fmt(result.revenue)} />
              <ResultRow
                label="Each sale leaves"
                value={fmt(result.contributionPerUnit)}
                note={`${fmtPct(result.contributionMarginPct)} of the price, towards fixed costs`}
              />
            </>
          )}
        </Results>
      </div>
    </ToolCard>
  );
}
