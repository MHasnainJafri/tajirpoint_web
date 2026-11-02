"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { addTax, parseAmount, removeTax } from "@/lib/tools/calc";
import { TAX_PRESETS } from "@/content/tools/tax-rates";
import {
  NumberField,
  ResetButton,
  ResultRow,
  Results,
  Switch,
  ToolCard,
  fmt,
  useToolUse,
  useTrackFirstResult,
} from "./ToolKit";

type Direction = "add" | "remove";

export function VatCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [direction, setDirection] = useState<Direction>("add");
  const [presetId, setPresetId] = useState<string | null>(null);
  const track = useToolUse("vat-calculator");

  const a = parseAmount(amount);
  const r = parseAmount(rate);
  const result =
    a === null || r === null || r < 0 ? null : direction === "add" ? addTax(a, r) : removeTax(a, r);
  useTrackFirstResult("vat-calculator", result !== null);

  const preset = TAX_PRESETS.find((p) => p.id === presetId) ?? null;

  const pickPreset = (id: string, ratePct: number) => {
    setPresetId(id);
    setRate(String(ratePct));
    track("preset", id);
  };

  const reset = () => {
    setAmount("");
    setRate("");
    setPresetId(null);
  };

  let empty: string | null = null;
  if (a === null || r === null) empty = "Enter an amount and a tax rate.";
  else if (r < 0) empty = "The tax rate can't be negative.";

  return (
    <ToolCard>
      <div className="grid min-w-0 gap-6 md:grid-cols-[1.1fr_1fr] md:gap-8">
        <form className="flex min-w-0 flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <NumberField id="vat-amount" label="Amount" value={amount} onChange={setAmount} />

          <div className="flex min-w-0 flex-col gap-3">
            <NumberField
              id="vat-rate"
              label="Tax rate"
              value={rate}
              onChange={(v) => {
                setRate(v);
                setPresetId(null);
              }}
              suffix="%"
              hint="Type your rate, or pick a standard rate below."
            />
            <div role="group" aria-label="Standard rates" className="flex flex-wrap gap-2">
              {TAX_PRESETS.map((p) => {
                const on = p.id === presetId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => pickPreset(p.id, p.ratePct)}
                    className={`inline-flex min-h-[40px] items-center rounded-full border px-3.5 text-[13.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,210,122,.45)] ${
                      on
                        ? "border-[var(--color-mint-2)] bg-[var(--color-mint-soft)] text-[var(--color-ink)]"
                        : "border-[var(--color-line-3)] text-[var(--color-ink-3)] hover:border-[var(--color-muted-2)]"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
            {preset && (
              <p className="text-[12.5px] leading-[1.55] text-[var(--color-muted)]">
                <span className="font-semibold text-[var(--color-ink)]">{preset.country}: </span>
                {preset.note} Source:{" "}
                <a
                  href={preset.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
                >
                  {preset.sourceName}
                  <ExternalLink aria-hidden="true" className="h-3 w-3" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                , checked {preset.checked}.
              </p>
            )}
          </div>

          <Switch<Direction>
            name="vat-direction"
            legend="The amount is…"
            value={direction}
            onChange={setDirection}
            options={[
              { value: "add", label: "Before tax — add tax" },
              { value: "remove", label: "With tax — remove tax" },
            ]}
          />
          <div>
            <ResetButton onClick={reset} />
          </div>
        </form>

        <Results empty={empty}>
          {result && (
            <>
              <ResultRow label="Before tax" value={fmt(result.net)} big={direction === "remove"} />
              <ResultRow label={`Tax (${r}%)`} value={fmt(result.tax)} />
              <ResultRow label="With tax" value={fmt(result.gross)} big={direction === "add"} />
            </>
          )}
        </Results>
      </div>
    </ToolCard>
  );
}
