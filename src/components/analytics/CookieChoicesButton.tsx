"use client";

import { useTranslations } from "next-intl";
import { deniedBySignal, openConsentPrompt } from "@/lib/analytics/consent";
import { analyticsIdsFromEnv, hasAnyTag } from "@/lib/analytics/config";
import { useConsentState } from "./useConsent";

/**
 * "Change cookie choices" for the cookie policy page: says what applies to
 * this visitor (their own choice, or their browser's Do Not Track signal) and
 * re-opens the banner. Renders nothing when no tag is configured — there is
 * then no optional cookie to choose about.
 */
export function CookieChoicesButton() {
  const t = useTranslations("consent");
  const state = useConsentState();
  if (state === "unknown" || !hasAnyTag(analyticsIdsFromEnv())) return null;

  const current = state === "denied" && deniedBySignal() ? "signal" : state;

  return (
    <p data-testid="cookie-choices">
      {t(`current.${current}`)}{" "}
      <button
        type="button"
        onClick={openConsentPrompt}
        className="cursor-pointer font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
      >
        {t("change")}
      </button>
    </p>
  );
}
