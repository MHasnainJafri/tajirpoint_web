"use client";

import { useEffect } from "react";
import { analyticsIdsFromEnv, hasAnyTag } from "@/lib/analytics/config";
import { pauseAnalytics, startAnalytics } from "@/lib/analytics/loader";
import { ConsentBanner } from "./ConsentBanner";
import { useConsentState } from "./useConsent";

/**
 * Google Analytics 4, the Meta Pixel and (optionally) Google Tag Manager,
 * configured only by environment variables (see config.ts):
 *
 * - No ID set → renders nothing at all: no banner, no script.
 * - ID set → shows the cookie banner; no script and no event until the
 *   visitor presses Accept. A Do Not Track / Global Privacy Control signal
 *   counts as Reject.
 * - After Accept → starts the tags, which count the page view themselves,
 *   now and on every client-side route change (see loader.ts).
 */
export function AnalyticsProvider() {
  const enabled = hasAnyTag(analyticsIdsFromEnv());
  const consent = useConsentState();

  useEffect(() => {
    if (!enabled || consent === "unknown") return;
    if (consent === "granted") startAnalytics();
    // Withdrawn in another tab while tags run here (this tab reloads on Reject).
    else pauseAnalytics();
  }, [enabled, consent]);

  return enabled ? <ConsentBanner /> : null;
}
