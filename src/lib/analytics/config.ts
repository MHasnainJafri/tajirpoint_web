/**
 * Which tracking tags are switched on, read only from the environment.
 *
 * Every ID is optional — with none set, no tag script, no consent banner and
 * no optional cookie ever reaches the visitor. The owner adds the real IDs in
 * the hosting environment; nothing is hard-coded here.
 *
 * Each ID is checked against its vendor's format before use. They end up in
 * script URLs, so a malformed value (a typo, or something worse) is dropped
 * rather than injected into the page.
 *
 * `process.env.NEXT_PUBLIC_*` must be written out literally for Next to
 * inline it into the browser bundle — do not loop over the names.
 */

export interface AnalyticsIds {
  /** Google Analytics 4 measurement ID, e.g. G-ABC123XYZ. */
  gaId?: string;
  /** Meta (Facebook / Instagram) Pixel ID, digits only. */
  metaPixelId?: string;
  /** Google Tag Manager container, e.g. GTM-ABC1234. */
  gtmId?: string;
}

const GA_ID = /^G-[A-Z0-9]{4,20}$/;
const PIXEL_ID = /^\d{5,20}$/;
const GTM_ID = /^GTM-[A-Z0-9]{4,12}$/;

function valid(value: string | undefined, pattern: RegExp): string | undefined {
  const v = value?.trim();
  return v && pattern.test(v) ? v : undefined;
}

/** Validate a set of raw IDs; anything unset or malformed becomes undefined. */
export function cleanIds(raw: AnalyticsIds): AnalyticsIds {
  return {
    gaId: valid(raw.gaId, GA_ID),
    metaPixelId: valid(raw.metaPixelId, PIXEL_ID),
    gtmId: valid(raw.gtmId, GTM_ID),
  };
}

/** The IDs configured for this build. */
export function analyticsIdsFromEnv(): AnalyticsIds {
  return cleanIds({
    // NEXT_PUBLIC_GA_ID is the older name, still read so an existing
    // deployment keeps working after the rename.
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  });
}

/** True when at least one tag is configured — only then is consent asked. */
export function hasAnyTag(ids: AnalyticsIds): boolean {
  return Boolean(ids.gaId || ids.metaPixelId || ids.gtmId);
}
