"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Stroke, Tick } from "./Stroke";
import { trackPlanSelected } from "@/lib/analytics/events";
import {
  annualAmount,
  annualMonthsSaved,
  formatMoney,
  isContactSalesPlan,
  isFreePlan,
  planPriceLabel,
  type MarketingPlan,
} from "@/lib/api/plans";

export interface PlanCardLabels {
  perMonth: string;
  perYear: string;
  monthly: string;
  annual: string;
  /** Contains `{n}`. */
  save: string;
  recommended: string;
  notIncluded: string;
  billingLabel: string;
  /** Shown after "Free" when the API sends no `price_display` (older backend). */
  freePeriod: string;
}

/**
 * The plan cards, straight from the plans API. Client-side only for the
 * monthly/annual switch, which appears only when some plan is sold yearly.
 */
export function PlanCards({
  plans,
  labels,
  signupUrl,
  compact = false,
}: {
  plans: MarketingPlan[];
  labels: PlanCardLabels;
  signupUrl: string;
  /** Business pages show a shorter teaser: three bullets, no "not included". */
  compact?: boolean;
}) {
  const showToggle = !compact && plans.some((p) => annualAmount(p) !== null);
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      {showToggle && (
        <div className="mt-6 flex justify-center">
          <div
            role="radiogroup"
            aria-label={labels.billingLabel}
            className="inline-flex rounded-full border border-[var(--color-line-2)] bg-[var(--color-surface)] p-1"
          >
            {[
              { on: !yearly, label: labels.monthly, value: false },
              { on: yearly, label: labels.annual, value: true },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                role="radio"
                aria-checked={opt.on}
                onClick={() => setYearly(opt.value)}
                className={`cursor-pointer rounded-full px-5 py-2 text-[13.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)] ${
                  opt.on ? "bg-[#0A0A0A] text-white" : "text-[var(--color-ink-3)] hover:text-[var(--color-ink)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        className={`mt-[28px] grid items-stretch gap-[14px] ${
          compact
            ? "grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
            : "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
        }`}
      >
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            yearly={yearly}
            labels={labels}
            signupUrl={signupUrl}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  yearly,
  labels,
  signupUrl,
  compact,
}: {
  plan: MarketingPlan;
  yearly: boolean;
  labels: PlanCardLabels;
  signupUrl: string;
  compact: boolean;
}) {
  const dark = plan.highlighted;
  const free = isFreePlan(plan);
  const contactSales = isContactSalesPlan(plan);
  const yearlyAmount = annualAmount(plan);
  const showYearly = yearly && yearlyAmount !== null;
  const saved = showYearly ? annualMonthsSaved(plan) : 0;

  const price = showYearly ? formatMoney(yearlyAmount, plan.currency_code) : planPriceLabel(plan);
  // Older backends send "Free" with no period; Light is free for 3 months, so
  // say so rather than imply it never ends.
  const period = plan.is_priced
    ? showYearly
      ? labels.perYear
      : labels.perMonth
    : free && !plan.price_display
      ? labels.freePeriod
      : null;
  const bullets = compact ? plan.bullets.slice(0, 3) : plan.bullets;
  // Admin-edited names may not be Latin; the tier is the stable fallback.
  const planSlug =
    plan.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || plan.tier;
  const onSelect = () =>
    trackPlanSelected({
      plan: planSlug,
      billing: showYearly ? "annual" : "monthly",
      location: compact ? "plan_teaser" : "pricing",
      contactSales,
    });

  return (
    <div
      className={
        dark
          ? "on-dark relative flex flex-col gap-[16px] overflow-hidden rounded-[24px] bg-[#0A0A0A] p-[clamp(20px,2.4vw,30px)] text-white"
          : "relative flex flex-col gap-[16px] rounded-[24px] border border-[var(--color-line-2)] bg-white p-[clamp(20px,2.4vw,30px)]"
      }
    >
      {dark && (
        <div className="pointer-events-none absolute -right-[90px] -top-[90px] h-[300px] w-[300px] rounded-full border border-[rgba(0,210,122,.2)]" />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[16px] font-bold tracking-[-0.01em]">{plan.name}</h3>
          <p className="mt-[3px] text-[12.5px] leading-[1.5] text-[var(--color-muted)]">{plan.tagline}</p>
        </div>
        {dark && (
          <span className="whitespace-nowrap rounded-full bg-[var(--color-mint)] px-[10px] py-[4px] text-[11px] font-bold text-[#0A0A0A]">
            {labels.recommended}
          </span>
        )}
      </div>

      <div className="relative flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span
          className={`font-extrabold leading-none tracking-[-0.04em] ${
            free && !plan.is_priced && price.length > 8
              ? "text-[clamp(24px,2.6vw,30px)]"
              : "text-[clamp(30px,3.4vw,42px)]"
          }`}
        >
          {price}
        </span>
        {period && (
          <span className={`text-[14px] font-semibold ${dark ? "text-[var(--color-mint)]" : "text-[var(--color-muted)]"}`}>
            {period}
          </span>
        )}
        {saved > 0 && (
          <span className="rounded-full bg-[var(--color-mint-soft)] px-2 py-[3px] text-[11px] font-bold text-[var(--color-mint-2)]">
            {labels.save.replace("{n}", String(saved))}
          </span>
        )}
      </div>

      {!contactSales ? (
        <a
          href={signupUrl}
          data-track={`plan_${planSlug}`}
          onClick={onSelect}
          className={
            dark
              ? "relative inline-flex items-center justify-center gap-[10px] self-start rounded-full bg-[var(--color-mint)] py-3 pl-6 pr-3 text-[14px] font-bold text-[#0A0A0A] transition-transform duration-200 hover:-translate-y-[2px]"
              : "relative inline-flex items-center justify-center gap-[10px] self-start rounded-full bg-[#0A0A0A] py-3 pl-6 pr-3 text-[14px] font-bold text-white transition-transform duration-200 hover:-translate-y-[2px]"
          }
        >
          {plan.cta}
          <span
            className={`grid h-[26px] w-[26px] place-items-center rounded-full ${
              dark ? "bg-[#0A0A0A] text-[var(--color-mint)]" : "bg-white text-[#0A0A0A]"
            }`}
          >
            <Stroke name="arrowRight" size={14} width={2.2} />
          </span>
        </a>
      ) : (
        <Link
          href="/book-demo"
          data-track={`plan_${planSlug}`}
          onClick={onSelect}
          className="relative inline-flex items-center justify-center gap-2 self-start rounded-full border border-[var(--color-line-3)] px-5 py-3 text-[13.5px] font-semibold transition-colors duration-200 hover:bg-[var(--color-surface)]"
        >
          <Stroke name="calendar" size={16} />
          {plan.cta}
        </Link>
      )}

      <ul className="relative mt-auto flex flex-col gap-[9px] pt-1 text-[13.5px]">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-[9px]">
            <span className={dark ? "text-[var(--color-mint)]" : "text-[var(--color-mint-2)]"}>
              <Tick size={17} />
            </span>
            {bullet}
          </li>
        ))}
      </ul>

      {!compact && free && plan.not_included && plan.not_included.length > 0 && (
        <div className="relative border-t border-[var(--color-line)] pt-3">
          <div className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted-2)]">
            {labels.notIncluded}
          </div>
          <ul className="mt-2 flex flex-col gap-[6px] text-[12.5px] text-[var(--color-muted)]">
            {plan.not_included.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden="true">–</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
