"use client";

import { useEffect, useState } from "react";
import { formatPkr, pkrAmount, type MarketingPlan } from "@/lib/api/plans";
import { isPakistanVisitor, readVisitorHints } from "@/lib/marketing/pk-visitor";

/**
 * True once hydrated in a browser that looks like Pakistan. Always false on
 * the server and on the first client render, so the static HTML and the
 * hydration pass match; the PKR line appears right after.
 */
export function usePakistanVisitor(): boolean {
  const [pk, setPk] = useState(false);
  useEffect(() => {
    // Reading the browser has to wait for hydration (static HTML is the same
    // for every visitor), so this one-time set in an effect is intended.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPk(isPakistanVisitor(readVisitorHints()));
  }, []);
  return pk;
}

/**
 * "Rs 4,500 / month" under the USD price, for visitors in Pakistan only, and
 * only when the plan has a PKR price for this cadence. Renders nothing
 * otherwise, so a USD-only catalogue looks exactly as before.
 */
export function PkrPrice({
  plan,
  cadence,
  period,
  className = "",
}: {
  plan: MarketingPlan;
  cadence: "monthly" | "annual";
  /** "/ month" or "/ year", already translated. */
  period?: string;
  className?: string;
}) {
  const pk = usePakistanVisitor();
  const amount = pk ? pkrAmount(plan, cadence) : null;
  if (amount === null) return null;
  return (
    <span className={className}>
      {/* The amount stays left-to-right inside Urdu/Arabic text. */}
      <bdi dir="ltr" className="whitespace-nowrap">
        {formatPkr(amount)}
      </bdi>
      {period ? <> {period}</> : null}
    </span>
  );
}
