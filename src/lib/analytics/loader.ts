import type { AnalyticsIds } from "./config";

/**
 * Starts the configured tags. Call it only after the visitor accepted
 * optional cookies — this is the single place a third-party tracking script
 * is added to the page.
 *
 * Each tag gets its command queue (gtag / fbq / dataLayer) set up first and
 * its script added async, exactly as the vendors' own snippets do, so events
 * sent before the script finishes downloading are queued, not lost.
 * Safe to call more than once: a tag already started is left alone.
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

function startGa(gaId: string) {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    // gtag.js reads the Arguments object itself — an array does not work.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
    };
    window.gtag("js", new Date());
  }
  // Page views are sent by trackPageView() on every route change instead, so
  // client-side navigation is counted and the first view is not doubled.
  window.gtag("config", gaId, { send_page_view: false });
  addScript(SCRIPT_IDS.ga, `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`);
}

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
  window.fbq!("init", pixelId);
  addScript(SCRIPT_IDS.pixel, "https://connect.facebook.net/en_US/fbevents.js");
}

function startGtm(gtmId: string) {
  window.dataLayer = window.dataLayer || [];
  if (!document.getElementById(SCRIPT_IDS.gtm)) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  }
  addScript(SCRIPT_IDS.gtm, `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
}

const started = new Set<string>();

export function loadAnalytics(ids: AnalyticsIds) {
  if (typeof window === "undefined") return;
  if (ids.gaId && !started.has(`ga:${ids.gaId}`)) {
    started.add(`ga:${ids.gaId}`);
    startGa(ids.gaId);
  }
  if (ids.metaPixelId && !started.has(`px:${ids.metaPixelId}`)) {
    started.add(`px:${ids.metaPixelId}`);
    startPixel(ids.metaPixelId);
  }
  if (ids.gtmId && !started.has(`gtm:${ids.gtmId}`)) {
    started.add(`gtm:${ids.gtmId}`);
    startGtm(ids.gtmId);
  }
}

/** For tests only. */
export function resetLoaderForTests() {
  started.clear();
}
