import { analyticsIdsFromEnv, type AnalyticsIds } from "./config";
import { analyticsAllowed } from "./consent";

/**
 * Starts the configured tags. This is the single place a third-party tracking
 * script is added to the page, and `startAnalytics()` — the only way in from
 * the rest of the site — refuses unless the visitor accepted optional cookies.
 *
 * Each tag gets its command queue (gtag / fbq / dataLayer) set up first and
 * its script added async, exactly as the vendors' own snippets do, so events
 * sent before the script finishes downloading are queued, not lost.
 * Safe to call more than once: a tag already started is left alone.
 *
 * Page views are the vendors' own, not ours: Google Analytics sends one when
 * it is configured and one on every browser-history change (its "Enhanced
 * measurement", on by default), and the Meta Pixel does the same. Sending
 * our own on each route change as well would count every page twice.
 */

declare global {
  interface Window {
    _fbq?: unknown;
  }
}

export const SCRIPT_IDS = {
  ga: "tp-ga4",
  pixel: "tp-meta-pixel",
  gtm: "tp-gtm",
} as const;

function addScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const el = document.createElement("script");
  el.id = id;
  el.async = true;
  el.src = src;
  document.head.appendChild(el);
}

// ── Google (Analytics 4 and Tag Manager share one command queue) ─────────

type GoogleConsent = Record<
  "ad_storage" | "ad_user_data" | "ad_personalization" | "analytics_storage",
  "granted" | "denied"
>;

function googleConsent(state: "granted" | "denied"): GoogleConsent {
  return {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  };
}

/** GA's documented per-property off switch: `window["ga-disable-G-…"] = true`. */
function setGaDisabled(gaId: string, disabled: boolean) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = disabled;
}

let googleConsentSent = false;

/**
 * The gtag() queue plus Google's consent signals (Consent Mode v2). Google
 * asks for the visitor's choice to be passed along with the data: "denied"
 * as the default, then the update to "granted" — which is always the case
 * here, because nothing below runs before Accept.
 */
function startGoogleQueue() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    // gtag.js reads the Arguments object itself — an array does not work.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
    };
  }
  if (googleConsentSent) return;
  googleConsentSent = true;
  window.gtag("consent", "default", googleConsent("denied"));
  window.gtag("consent", "update", googleConsent("granted"));
}

function startGa(gaId: string) {
  startGoogleQueue();
  setGaDisabled(gaId, false);
  window.gtag!("js", new Date());
  // Sends the first page view; later ones come from GA's history tracking.
  window.gtag!("config", gaId);
  addScript(
    SCRIPT_IDS.ga,
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
  );
}

function startGtm(gtmId: string) {
  startGoogleQueue();
  window.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
  addScript(
    SCRIPT_IDS.gtm,
    `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`
  );
}

// ── Meta Pixel ───────────────────────────────────────────────────────────

type FbqStub = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: unknown;
  loaded: boolean;
  version: string;
};

function startPixel(pixelId: string) {
  if (typeof window.fbq !== "function") {
    const stub = function (...args: unknown[]) {
      if (stub.callMethod) stub.callMethod(...args);
      else stub.queue.push(args);
    } as FbqStub;
    stub.push = stub;
    stub.loaded = true;
    stub.version = "2.0";
    stub.queue = [];
    window.fbq = stub;
    if (!window._fbq) window._fbq = stub;
  }
  window.fbq!("consent", "grant");
  window.fbq!("init", pixelId);
  // The first page view; the Pixel sends later ones itself on history changes.
  window.fbq!("track", "PageView");
  addScript(SCRIPT_IDS.pixel, "https://connect.facebook.net/en_US/fbevents.js");
}

// ── Start / pause ────────────────────────────────────────────────────────

const started: AnalyticsIds = {};
let paused = false;

function anyStarted(): boolean {
  return Boolean(started.gaId || started.metaPixelId || started.gtmId);
}

/** Start the given tags. Only `startAnalytics()` and tests should call this. */
export function loadAnalytics(ids: AnalyticsIds) {
  if (typeof window === "undefined") return;
  if (paused) {
    // Consent came back (accepted again in another tab): switch back on.
    paused = false;
    if (started.gaId) setGaDisabled(started.gaId, false);
    if (started.gaId || started.gtmId) window.gtag?.("consent", "update", googleConsent("granted"));
    if (started.metaPixelId) window.fbq?.("consent", "grant");
  }
  if (ids.gaId && !started.gaId) {
    started.gaId = ids.gaId;
    startGa(ids.gaId);
  }
  if (ids.metaPixelId && !started.metaPixelId) {
    started.metaPixelId = ids.metaPixelId;
    startPixel(ids.metaPixelId);
  }
  if (ids.gtmId && !started.gtmId) {
    started.gtmId = ids.gtmId;
    startGtm(ids.gtmId);
  }
}

/**
 * Start the tags configured in the environment — if, and only if, the
 * visitor accepted optional cookies. Returns whether tracking may run.
 * Cheap to call before every event: a tag already started is left alone.
 */
export function startAnalytics(): boolean {
  if (typeof window === "undefined" || !analyticsAllowed()) return false;
  loadAnalytics(analyticsIdsFromEnv());
  return true;
}

/**
 * Consent was withdrawn while tags are running on this page — in practice in
 * another tab, because the tab where Reject is pressed reloads. The scripts
 * cannot be unloaded, so each is told to stop: GA's off switch, Google's
 * consent update and the Pixel's revoke. Does nothing if no tag was started.
 */
export function pauseAnalytics() {
  if (typeof window === "undefined" || paused || !anyStarted()) return;
  paused = true;
  if (started.gaId) setGaDisabled(started.gaId, true);
  if (started.gaId || started.gtmId) window.gtag?.("consent", "update", googleConsent("denied"));
  if (started.metaPixelId) window.fbq?.("consent", "revoke");
}

/** For tests only. */
export function resetLoaderForTests() {
  if (typeof window !== "undefined" && started.gaId) {
    delete (window as unknown as Record<string, unknown>)[`ga-disable-${started.gaId}`];
  }
  delete started.gaId;
  delete started.metaPixelId;
  delete started.gtmId;
  paused = false;
  googleConsentSent = false;
}
