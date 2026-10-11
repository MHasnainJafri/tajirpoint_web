"use client";

import { useEffect } from "react";
import { trackBusinessView } from "@/lib/analytics/events";

/** Fires the business-page view event once (ad audiences per business type). */
export function BusinessView({ slug }: { slug: string }) {
  useEffect(() => {
    trackBusinessView(slug);
  }, [slug]);
  return null;
}
