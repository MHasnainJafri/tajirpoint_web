"use client";

import { useSyncExternalStore } from "react";
import {
  currentConsent,
  isConsentPromptOpen,
  subscribeConsent,
  type ConsentState,
} from "@/lib/analytics/consent";

/**
 * The visitor's consent choice. On the server (and in the first client
 * render, for a matching hydration) it is "unknown": nothing optional runs
 * and no banner is drawn until the browser has been asked.
 */
export function useConsentState(): ConsentState | "unknown" {
  return useSyncExternalStore(subscribeConsent, currentConsent, () => "unknown" as const);
}

/** True while the visitor re-opened the choice from the cookie policy page. */
export function useConsentPromptOpen(): boolean {
  return useSyncExternalStore(subscribeConsent, isConsentPromptOpen, () => false);
}
