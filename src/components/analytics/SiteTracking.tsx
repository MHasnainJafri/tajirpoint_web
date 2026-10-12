"use client";

import { useEffect } from "react";
import { trackBookDemoClick, trackSignupClick, trackWhatsAppClick } from "@/lib/analytics/events";
import { captureFirstTouch, currentAttribution, sessionStore } from "@/lib/marketing/utm";
import { siteConfig } from "@/lib/config/site";

/**
 * Two site-wide jobs, with no markup:
 *
 *  1. Remember the landing page's campaign tags (first touch) so a demo
 *     request made pages later is still attributed to the ad.
 *  2. One delegated click listener that reports "Start free", "Book a demo"
 *     and WhatsApp clicks wherever the link lives — no per-link wiring, so a
 *     new CTA is tracked the moment it ships. A link can name its location
 *     with `data-track="hero"`; otherwise the nearest section id is used.
 */
export function SiteTracking() {
  useEffect(() => {
    captureFirstTouch(sessionStore(), currentAttribution());

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const location =
        a.closest("[data-track]")?.getAttribute("data-track") ||
        a.closest("section[id]")?.id ||
        (a.closest("header") ? "nav" : a.closest("footer") ? "footer" : window.location.pathname);

      if (href.startsWith(siteConfig.signupUrl)) trackSignupClick(location);
      else if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) trackWhatsAppClick(location);
      else if (/\/(book-demo|demo)(\?|$|#)/.test(href)) trackBookDemoClick(location);
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
