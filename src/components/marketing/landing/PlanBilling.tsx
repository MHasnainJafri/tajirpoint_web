"use client";

import { useState } from "react";
import { trackPlanSelected } from "@/lib/analytics/events";

/**
 * The only client part of the plan cards: the monthly/yearly switch and the
 * plan-click event.
 *
 * The cards themselves are server HTML (see PlanCards). Each card carries both
 * prices; this island only flips `data-billing` on the wrapper and CSS
 * (`group-data-[billing=annual]/billing:`) shows the matching one. So the page
 * hydrates two buttons instead of every card, and ships no plan parsing (zod)
 * to the browser.
 */
export function PlanBilling({
  showToggle,
  billingLabel,
  monthlyLabel,
  annualLabel,
  location,
  children,
}: {
  showToggle: boolean;
  billingLabel: string;
  monthlyLabel: string;
  annualLabel: string;
  location: string;
  children: React.ReactNode;
}) {
  const [yearly, setYearly] = useState(false);

  // One delegated listener for every plan button. Each button says which plan
  // it is (`data-plan`), whether it goes to sales, and whether that plan is
  // sold yearly — a plan without a yearly price is always tracked as monthly.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>("[data-plan]");
    if (!el) return;
    trackPlanSelected({
      plan: el.dataset.plan ?? "",
      billing: yearly && el.dataset.annual === "1" ? "annual" : "monthly",
      location,
      contactSales: el.dataset.contactSales === "1",
    });
  };

  return (
    <div>
      {showToggle && (
        <div className="mt-6 flex justify-center">
          <div
            role="radiogroup"
            aria-label={billingLabel}
            className="inline-flex rounded-full border border-[var(--color-line-2)] bg-[var(--color-surface)] p-1"
          >
            {[
              { on: !yearly, label: monthlyLabel, value: false },
              { on: yearly, label: annualLabel, value: true },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                role="radio"
                aria-checked={opt.on}
                onClick={() => setYearly(opt.value)}
                className={`inline-flex min-h-[44px] cursor-pointer items-center rounded-full px-5 py-2 text-[13.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)] ${
                  opt.on
                    ? "bg-[#0A0A0A] text-white"
                    : "text-[var(--color-ink-3)] hover:text-[var(--color-ink)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        className="group/billing"
        data-billing={yearly ? "annual" : "monthly"}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>
    </div>
  );
}
