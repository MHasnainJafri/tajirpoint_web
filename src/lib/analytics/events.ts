/**
 * Analytics and conversion event telemetry for TajirPoint.
 * Dispatches events safely across Google Analytics (gtag), GTM (dataLayer),
 * and Meta Pixel (fbq) if configured.
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  try {
    // 1. Google Tag Manager dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...params,
      });
    }

    // 2. Google Analytics 4 (gtag)
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }

    // 3. Meta (Facebook/Instagram) Pixel
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, params);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Analytics] Failed to track event: ${eventName}`, error);
    }
  }
}

/** Track user converting on primary trial sign-up CTA */
export function trackTrialSignupClick(location: string) {
  trackEvent("lead_trial_signup", {
    event_category: "Conversion",
    event_label: location,
  });

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: "14_day_trial", content_category: location });
  }
}

/** Track merchant booking a product walkthrough demo */
export function trackBookDemoClick(location: string) {
  trackEvent("book_demo_click", {
    event_category: "Conversion",
    event_label: location,
  });

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Schedule", { content_name: "book_demo", content_category: location });
  }
}

/** Track merchant initiating conversation via WhatsApp */
export function trackWhatsAppInquiry(location: string) {
  trackEvent("whatsapp_inquiry_click", {
    event_category: "Lead",
    event_label: location,
  });

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Contact", { content_name: "whatsapp", content_category: location });
  }
}

/** Track interest in specific industry vertical */
export function trackVerticalInterest(
  vertical: "restaurants" | "retail" | "distributors" | "pharmacies" | "electronics" | "services"
) {
  trackEvent("view_vertical_solution", {
    event_category: "Engagement",
    vertical,
  });
}
