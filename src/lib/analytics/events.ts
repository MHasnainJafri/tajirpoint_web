/**
 * Conversion events for Google Tag Manager (dataLayer), Google Analytics 4
 * (gtag) and the Meta Pixel (fbq). Each sink is optional — nothing happens if
 * its ID is not configured.
 *
 * Privacy: events never carry personal data (no names, phones, emails or
 * free text). Only the page location, the business type slug and similar
 * coarse labels.
 *
 * Consent: every event is dropped unless the visitor accepted optional
 * cookies (see consent.ts). With consent, the tags are started first if they
 * are not running yet (loader.ts) — so an event fired while the page is still
 * loading, before the tags were added, is queued behind them instead of lost.
 *
 * Page views are not sent from here: Google Analytics and the Meta Pixel
 * count them themselves (see loader.ts).
 */

import { startAnalytics } from "./loader";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

type Params = Record<string, string | number | boolean | undefined>;

function compact(params: Params): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") out[k] = v;
  return out;
}

function safe(fn: () => void) {
  try {
    fn();
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.warn("[analytics]", error);
  }
}

/** GTM dataLayer + GA4. */
export function trackEvent(eventName: string, params: Params = {}) {
  if (!startAnalytics()) return;
  const data = compact(params);
  safe(() => window.dataLayer?.push({ event: eventName, ...data }));
  safe(() => {
    if (typeof window.gtag === "function") window.gtag("event", eventName, data);
  });
}

/** Meta Pixel standard event. */
function pixel(event: string, params: Params = {}) {
  if (!startAnalytics() || typeof window.fbq !== "function") return;
  const fbq = window.fbq;
  safe(() => fbq("track", event, compact(params)));
}

/** Meta Pixel custom event. */
function pixelCustom(event: string, params: Params = {}) {
  if (!startAnalytics() || typeof window.fbq !== "function") return;
  const fbq = window.fbq;
  safe(() => fbq("trackCustom", event, compact(params)));
}

/** The free-plan offer, as one label for every event that mentions it. */
export const OFFER_LABEL = "light_free_3_months";

/** Click on any "Start free" link (to the app's sign-up). */
export function trackSignupClick(location: string) {
  trackEvent("sign_up_click", { location, offer: OFFER_LABEL });
  pixelCustom("StartFreeClick", { content_name: OFFER_LABEL, content_category: location });
}

/**
 * A plan's button on a pricing card was clicked. `plan` is the plan's name as
 * a slug ("light", "shop"), `billing` the monthly/annual switch position.
 */
export function trackPlanSelected(details: {
  plan: string;
  billing: "monthly" | "annual";
  location: string;
  contactSales?: boolean;
}) {
  const plan = details.plan || "unknown";
  trackEvent("select_plan", {
    plan,
    billing: details.billing,
    location: details.location,
    contact_sales: details.contactSales ?? false,
  });
  pixelCustom("PlanSelected", { content_name: plan, content_category: details.billing });
}

/** Click on a "Book a demo" link — the visit, not the booking. */
export function trackBookDemoClick(location: string) {
  trackEvent("book_demo_click", { location });
}

/** Click on any WhatsApp link. */
export function trackWhatsAppClick(location: string) {
  trackEvent("whatsapp_click", { location });
  pixel("Contact", { content_name: "whatsapp", content_category: location });
}

/** Demo form submitted and stored — fire on success only. */
export function trackDemoRequest(details: {
  businessType: string;
  wantsMigration: boolean;
  branches: string;
}) {
  const businessType = details.businessType || "unknown";
  trackEvent("generate_lead", {
    form: "demo_request",
    business_type: businessType,
    wants_migration: details.wantsMigration,
    branches: details.branches || "unknown",
  });
  trackEvent("demo_request_submitted", { business_type: businessType });
  pixel("Lead", { content_name: "demo_request", content_category: businessType });
  pixel("Schedule", { content_name: "demo_request", content_category: businessType });
}

/** Contact form sent — fire on success only. */
export function trackContactSubmit(details: { businessType: string }) {
  const businessType = details.businessType || "unknown";
  trackEvent("generate_lead", { form: "contact", business_type: businessType });
  pixel("Contact", { content_name: "contact_form", content_category: businessType });
}

/** A business page was viewed (for ad audiences per business type). */
export function trackBusinessView(slug: string) {
  trackEvent("view_business_page", { business_type: slug });
  pixel("ViewContent", { content_name: "business_page", content_category: slug });
}
