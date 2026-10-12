"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { analyticsIdsFromEnv, cleanIds, hasAnyTag, type AnalyticsIds } from "@/lib/analytics/config";
import { loadAnalytics } from "@/lib/analytics/loader";
import { trackPageView } from "@/lib/analytics/events";
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
 * - After Accept → starts the tags and sends a page view now and on every
 *   client-side route change.
 *
 * `ids` is for tests; the site reads the environment.
 */
export function AnalyticsProvider({ ids: idsProp }: { ids?: AnalyticsIds }) {
  const ids = idsProp ? cleanIds(idsProp) : analyticsIdsFromEnv();
  const { gaId, metaPixelId, gtmId } = ids;
  const enabled = hasAnyTag(ids);
  const consent = useConsentState();
  const pathname = usePathname();
  const lastView = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || consent !== "granted") return;
    loadAnalytics({ gaId, metaPixelId, gtmId });
    // One view per URL: guards React's double effect in development and a
    // re-render that did not change the page.
    const key = `${window.location.pathname}${window.location.search}`;
    if (lastView.current === key) return;
    lastView.current = key;
    trackPageView(window.location.href);
  }, [enabled, consent, pathname, gaId, metaPixelId, gtmId]);

  return enabled ? <ConsentBanner /> : null;
}
