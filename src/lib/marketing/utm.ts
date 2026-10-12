/**
 * Campaign attribution for leads.
 *
 * The first page a visitor lands on carries the ad's UTM tags and `fbclid`,
 * but they usually submit the demo form a few pages later. So the landing
 * page's parameters are kept in sessionStorage ("first touch") and sent with
 * the form. Everything is wrapped in try/catch: storage can be blocked
 * (private mode, strict settings) and the form must still work.
 *
 * Nothing personal is stored — only the campaign tags, the landing path and
 * the referring site.
 */

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

export type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  fbclid: string;
  landing_page: string;
  referrer: string;
};

export const STORAGE_KEY = "tp_first_touch";
const MAX = 200;

export function emptyAttribution(): Attribution {
  return {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    fbclid: "",
    landing_page: "",
    referrer: "",
  };
}

function clean(value: string | null | undefined, max = MAX): string {
  return (value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, max);
}

/** True when the attribution carries any campaign signal. */
export function hasCampaign(a: Attribution): boolean {
  return Boolean(a.utm_source || a.utm_medium || a.utm_campaign || a.utm_content || a.fbclid);
}

/**
 * Attribution for one page view.
 *
 * `referrer` is dropped when it is our own site (internal navigation), and is
 * reduced to its origin + path so query strings from other sites never land in
 * our database.
 */
export function parseAttribution(
  search: string,
  pathname: string,
  referrer: string,
  ownOrigin: string
): Attribution {
  const params = new URLSearchParams(search);
  const a = emptyAttribution();
  for (const key of UTM_KEYS) a[key] = clean(params.get(key));
  a.fbclid = clean(params.get("fbclid"), 500);

  // Landing page: the path plus only the campaign parameters.
  const kept = new URLSearchParams();
  for (const key of UTM_KEYS) if (a[key]) kept.set(key, a[key]);
  const qs = kept.toString();
  a.landing_page = clean(`${pathname || "/"}${qs ? `?${qs}` : ""}`, 500);

  if (referrer) {
    try {
      const ref = new URL(referrer);
      if (ref.origin !== ownOrigin) a.referrer = clean(`${ref.origin}${ref.pathname}`, 500);
    } catch {
      /* not a URL — ignore */
    }
  }
  return a;
}

function read(storage: Storage | undefined): Attribution | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Attribution>;
    const a = emptyAttribution();
    for (const key of Object.keys(a) as (keyof Attribution)[]) {
      const v = parsed[key];
      if (typeof v === "string") a[key] = clean(v, 500);
    }
    return a;
  } catch {
    return null;
  }
}

/**
 * Records the visit as first touch, unless one is already stored.
 * A stored visit WITHOUT campaign data is replaced by a later one WITH it
 * (someone browsing organically who then clicks an ad in the same session).
 */
export function captureFirstTouch(
  storage: Storage | undefined,
  current: Attribution
): Attribution {
  const stored = read(storage);
  if (stored && (hasCampaign(stored) || !hasCampaign(current))) return stored;
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    /* storage blocked — the current page's values are still returned */
  }
  return current;
}

/** The stored first touch, falling back to the current page's values. */
export function readAttribution(storage: Storage | undefined, current: Attribution): Attribution {
  const stored = read(storage);
  if (!stored) return current;
  // Fill gaps from the current page (e.g. a direct visit to /demo?utm_...).
  if (!hasCampaign(stored) && hasCampaign(current)) return current;
  return stored;
}

/** Safe access to sessionStorage in the browser. */
export function sessionStore(): Storage | undefined {
  try {
    return typeof window === "undefined" ? undefined : window.sessionStorage;
  } catch {
    return undefined;
  }
}

/** Attribution for the page the browser is on right now. */
export function currentAttribution(): Attribution {
  if (typeof window === "undefined") return emptyAttribution();
  return parseAttribution(
    window.location.search,
    window.location.pathname,
    document.referrer,
    window.location.origin
  );
}
