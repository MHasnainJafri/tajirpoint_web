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
 *   Withdrawing consent removes the cookies the tags had set.
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

/** The visitor's own choice (stored or made on this page), or null if none. */
function ownChoice(): ConsentChoice | null {
  return readStoredConsent() ?? sessionChoice;
}

/** What applies right now: the visitor's choice, else the privacy signal, else unset. */
export function currentConsent(): ConsentState {
  return ownChoice() ?? (hasPrivacySignal() ? "denied" : "unset");
}

/** True only when optional tags may run. */
export function analyticsAllowed(): boolean {
  return currentConsent() === "granted";
}

/**
 * True when optional cookies are off because of the browser's signal, not
 * because the visitor pressed Reject — so the cookie page can say which.
 */
export function deniedBySignal(): boolean {
  return ownChoice() === null && hasPrivacySignal();
}

// ── The cookies the tags set, removed when consent is withdrawn ──────────

/** Google Analytics / Google Ads (_ga, _ga_*, _gid, _gat*, _gac_*, _gcl_*) and Meta (_fbp, _fbc). */
const TRACKING_COOKIE = /^(_ga|_ga_.+|_gid|_gat.*|_gac_.+|_gcl_.+|_fbp|_fbc)$/;

/**
 * Delete the analytics and advertising cookies from this browser. The tags
 * set them on the widest domain they can (".example.com" from
 * "www.example.com"), so each one is expired on the host and on every parent
 * domain; the browser ignores the ones that do not apply.
 */
export function clearTrackingCookies() {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  try {
    const names = document.cookie
      .split(";")
      .map((pair) => pair.split("=")[0]?.trim() ?? "")
      .filter((name) => TRACKING_COOKIE.test(name));
    if (names.length === 0) return;
    const labels = window.location.hostname.split(".");
    const domains = [""]; // host-only cookie
    for (let i = 0; i < labels.length - 1; i++) {
      const domain = labels.slice(i).join(".");
      domains.push(domain, `.${domain}`);
    }
    for (const name of names) {
      for (const domain of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
      }
    }
  } catch {
    // Cookies blocked: there is nothing to remove.
  }
}

// ── A tiny store so React components re-render when the choice changes ──

const listeners = new Set<() => void>();
let promptOpen = false;

function emit() {
  for (const l of listeners) l();
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  // A choice made in another tab of the same browser applies here too.
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === CONSENT_STORAGE_KEY) listener();
  };
  if (typeof window !== "undefined") window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
  };
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

const defaultReload = () => window.location.reload();
let reloadPage = defaultReload;

/** Run first when consent is withdrawn on this page; loader.ts stops the running tags here. */
const withdrawHandlers = new Set<() => void>();

export function onConsentWithdrawn(handler: () => void) {
  withdrawHandlers.add(handler);
}

/**
 * Save the visitor's choice. Withdrawing consent after tags already loaded
 * stops them, deletes their cookies and reloads the page — in that order, so
 * a tag cannot write its cookie back. The scripts cannot be unloaded, and a
 * fresh page is the only way to be sure none of them keeps running.
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
    for (const stop of withdrawHandlers) {
      try {
        stop();
      } catch {
        // A tag that will not stop is still cut off by the reload below.
      }
    }
    clearTrackingCookies();
    try {
      reloadPage();
    } catch {
      // Some embedded views refuse a reload; the tags stop on the next visit.
    }
  }
}

/** For tests only: forget the in-memory state. `reload` replaces the page reload (jsdom cannot navigate). */
export function resetConsentForTests(reload: () => void = defaultReload) {
  sessionChoice = null;
  promptOpen = false;
  listeners.clear();
  reloadPage = reload;
}
