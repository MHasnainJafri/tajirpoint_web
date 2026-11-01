"use client";

import { useEffect } from "react";
import { trackPricingView } from "@/lib/analytics/events";

const VIEWS = {
  pricing: trackPricingView,
} as const;

/**
 * Sends one "this page was viewed" conversion event when the page mounts —
 * the page view itself is counted by GA4 and the Pixel; this marks the views
 * that matter for ads (e.g. pricing = high intent). No markup. Like every
 * event it is dropped until the visitor accepts optional cookies.
 */
export function TrackView({ event }: { event: keyof typeof VIEWS }) {
  useEffect(() => {
    VIEWS[event]();
  }, [event]);
  return null;
}
