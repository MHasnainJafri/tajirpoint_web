/**
 * The visitor's choice about optional (analytics and advertising) cookies.
 *
 * - Stored in localStorage under one key, per browser. Every read and write is
 *   guarded: in a private window or with site data blocked the choice simply
 *   is not remembered, and the visitor is treated as not having chosen.
 * - A browser privacy signal (Do Not Track or Global Privacy Control) counts
 *   as "reject" until the visitor actively accepts — the banner is not shown
 *   to them, but they can still opt in from the cookie policy page.
 * - Nothing here sets a cookie itself; the tags do, and only after "granted".
 */

export type ConsentChoice = "granted" | "denied";
/** `unset` = not chosen yet (show the banner). */
export type ConsentState = ConsentChoice | "unset";

export const CONSENT_STORAGE_KEY = "tp_cookie_consent";
/** Bump to ask everyone again (e.g. when a new kind of tag is added). */
export const CONSENT_VERSION = 1;

interface StoredConsent {
  v: number;
  choice: ConsentChoice;
  /** ISO time the choice was made — proof of consent for the visitor's records. */
  at: string;
}

function storage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** The stored choice, or null if none (or an older version) is stored. */
export function readStoredConsent(): ConsentChoice | null {
  try {
    const raw = storage()?.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed.v !== CONSENT_VERSION) return null;
    return parsed.choice === "granted" || parsed.choice === "denied" ? parsed.choice : null;
  } catch {
    return null;
  }
}

/** True when the browser says "do not track me" (DNT or GPC). */
export function hasPrivacySignal(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean; msDoNotTrack?: string };
  const win = (typeof window === "undefined" ? {} : window) as { doNotTrack?: string };
  if (nav.globalPrivacyControl === true) return true;
  return [nav.doNotTrack, nav.msDoNotTrack, win.doNotTrack].some((v) => v === "1" || v === "yes");
}

/** Fallback when storage is blocked, so the choice holds for this page at least. */
let sessionChoice: ConsentChoice | null = null;

/** What applies right now: the stored choice, else the privacy signal, else unset. */
export function currentConsent(): ConsentState {
  return readStoredConsent() ?? sessionChoice ?? (hasPrivacySignal() ? "denied" : "unset");
}

/** True only when optional tags may run. */
export function analyticsAllowed(): boolean {
  return currentConsent() === "granted";
}

// ── A tiny store so React components re-render when the choice changes ──

const listeners = new Set<() => void>();
let promptOpen = false;

function emit() {
  for (const l of listeners) l();
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** True while the visitor asked to see the choice again (cookie policy page). */
export function isConsentPromptOpen(): boolean {
  return promptOpen;
}

/** Re-open the banner so the visitor can change their mind. */
export function openConsentPrompt() {
  promptOpen = true;
  emit();
}

/**
 * Save the visitor's choice. Withdrawing consent after tags already loaded
 * reloads the page: the scripts cannot be unloaded, and a fresh page view is
 * the only way to be sure none of them keeps running.
 */
export function setConsent(choice: ConsentChoice) {
  const before = currentConsent();
  // Always kept in memory too, so the choice holds for this page even when
  // storage is blocked.
  sessionChoice = choice;
  try {
    const value: StoredConsent = { v: CONSENT_VERSION, choice, at: new Date().toISOString() };
    storage()?.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage blocked: not remembered on the next visit.
  }
  promptOpen = false;
  emit();
  if (before === "granted" && choice === "denied" && typeof window !== "undefined") {
    try {
      window.location.reload();
    } catch {
      // jsdom and some embedded views refuse reload; tags stop on next visit.
    }
  }
}

/** For tests only: forget the in-memory state. */
export function resetConsentForTests() {
  sessionChoice = null;
  promptOpen = false;
  listeners.clear();
}
