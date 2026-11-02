"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { whatsappLink } from "@/lib/config/site";
import { analyticsIdsFromEnv, hasAnyTag } from "@/lib/analytics/config";
import { useConsentPromptOpen, useConsentState } from "@/components/analytics/useConsent";
import { uxCopy } from "@/content/ux/copy";

/** Pages that are already the contact form: the button would only repeat them. */
const HIDDEN_ON = ["/get-a-call", "/book-demo"];

/**
 * Small "talk to us" buttons in the bottom corner of every marketing page:
 * WhatsApp, and "Call me back" (→ /get-a-call).
 *
 * - Bottom-right, bottom-left in RTL (`inset-inline-end`), clear of the iPhone
 *   home bar and notch (safe-area insets, see `.floating-contact` in
 *   globals.css).
 * - Never on top of something the visitor must press: it steps aside while the
 *   cookie banner is up and while any form on the page is on screen, so it can
 *   never hide a submit button.
 * - Clicks are counted by SiteTracking's delegated listener (`whatsapp_click`,
 *   `get_a_call_click`, location "floating_contact"); nothing is wired here.
 * - Plain links, so Tab reaches them and Enter opens them. On phones the
 *   call-back label is visually hidden but stays the accessible name.
 */
export function FloatingContact() {
  const locale = useLocale();
  const pathname = usePathname();
  const copy = uxCopy(locale);

  const consent = useConsentState();
  const promptReopened = useConsentPromptOpen();
  const tagsOn = hasAnyTag(analyticsIdsFromEnv());
  // Same rule ConsentBanner uses to show itself ("unknown" = not read yet).
  const bannerUp = tagsOn && (consent === "unknown" || consent === "unset" || promptReopened);

  const [formOnScreen, setFormOnScreen] = useState(false);

  useEffect(() => {
    const forms = Array.from(document.querySelectorAll("main form"));
    if (forms.length === 0 || typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset when the new page has no form
      setFormOnScreen(false);
      return;
    }
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      setFormOnScreen(seen.size > 0);
    });
    forms.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, [pathname]);

  if (HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  const away = bannerUp || formOnScreen;

  return (
    <div
      role="group"
      aria-label={copy.contactGroup}
      data-track="floating_contact"
      aria-hidden={away || undefined}
      inert={away}
      className={`floating-contact fixed z-50 flex flex-col items-end gap-2 transition-[opacity,transform] duration-200 print:hidden ${
        away ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100"
      }`}
    >
      <Link
        href="/get-a-call"
        className="inline-flex h-12 min-w-12 items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-3 text-white shadow-[0_10px_26px_rgba(10,10,10,.28)] transition-transform duration-200 hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)] sm:px-4"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5 flex-none"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="sr-only whitespace-nowrap text-[14px] font-semibold sm:not-sr-only">
          {copy.callMeBack}
        </span>
      </Link>

      <a
        href={whatsappLink(copy.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_26px_rgba(10,10,10,.22)] transition-transform duration-200 hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="sr-only">{copy.whatsapp}</span>
      </a>
    </div>
  );
}
