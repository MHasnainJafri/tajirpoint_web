"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { setConsent } from "@/lib/analytics/consent";
import { useConsentPromptOpen, useConsentState } from "./useConsent";

/**
 * The cookie choice. Shown only when a tracking tag is configured and the
 * visitor has not chosen yet (or re-opened it from the cookie policy page).
 * A non-blocking strip at the bottom — the page stays usable — with Accept
 * and Reject given equal weight, as consent rules expect.
 */
export function ConsentBanner() {
  const t = useTranslations("consent");
  const state = useConsentState();
  const reopened = useConsentPromptOpen();

  if (state === "unknown" || (state !== "unset" && !reopened)) return null;

  const button =
    "inline-flex min-h-[40px] cursor-pointer items-center justify-center rounded-full px-5 text-[13.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)]";

  return (
    <section
      role="region"
      aria-label={t("label")}
      data-testid="consent-banner"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-[880px] flex-col gap-4 rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-panel)] p-5 text-[var(--color-ink)] shadow-[0_12px_40px_rgba(10,10,10,.14)] sm:flex-row sm:items-center sm:gap-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] font-bold">{t("title")}</h2>
          <p className="mt-1 text-[13.5px] leading-[1.55] text-[var(--color-body)]">
            {t("body")}{" "}
            <Link
              href="/cookies"
              className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
            >
              {t("policy")}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setConsent("denied")}
            className={`${button} border border-[var(--color-line-3)] bg-[var(--color-panel)] hover:bg-[var(--color-surface)]`}
          >
            {t("reject")}
          </button>
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className={`${button} bg-[#0A0A0A] text-white hover:bg-[#222]`}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </section>
  );
}
