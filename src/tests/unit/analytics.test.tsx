import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import en from "../../../messages/en.json";
import ur from "../../../messages/ur.json";
import ar from "../../../messages/ar.json";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { CookieChoicesButton } from "@/components/analytics/CookieChoicesButton";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  analyticsAllowed,
  currentConsent,
  resetConsentForTests,
  setConsent,
} from "@/lib/analytics/consent";
import { analyticsIdsFromEnv, cleanIds } from "@/lib/analytics/config";
import { SCRIPT_IDS, resetLoaderForTests } from "@/lib/analytics/loader";
import {
  trackBusinessView,
  trackContactSubmit,
  trackDemoRequest,
  trackPlanSelected,
  trackSignupClick,
} from "@/lib/analytics/events";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const GA = "G-TEST12345";
const PIXEL = "123456789012345";
const ENV_NAMES = [
  "NEXT_PUBLIC_GA_MEASUREMENT_ID",
  "NEXT_PUBLIC_GA_ID",
  "NEXT_PUBLIC_META_PIXEL_ID",
  "NEXT_PUBLIC_GTM_ID",
] as const;

/** Set the site's tracking IDs the way the hosting environment does. */
function configure(ids: { ga?: string; pixel?: string; gtm?: string } = { ga: GA, pixel: PIXEL }) {
  vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", ids.ga ?? "");
  vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", ids.pixel ?? "");
  vi.stubEnv("NEXT_PUBLIC_GTM_ID", ids.gtm ?? "");
}

function renderSite() {
  return render(
    <NextIntlClientProvider locale="en" messages={{ consent: en.consent }}>
      <CookieChoicesButton />
      <AnalyticsProvider />
    </NextIntlClientProvider>
  );
}

const trackingScripts = () =>
  Array.from(document.querySelectorAll("script")).filter((s) =>
    /googletagmanager|google-analytics|facebook/.test(s.src)
  );

/** Every gtag() command queued, in order (gtag pushes Arguments objects). */
function gtagCalls(): unknown[][] {
  return (window.dataLayer ?? [])
    .map((entry) => Array.from(entry as unknown as ArrayLike<unknown>))
    .filter((args) => args.length > 0);
}

/** Every event name gtag received. */
const gtagEvents = () =>
  gtagCalls()
    .filter((args) => args[0] === "event")
    .map((args) => String(args[1]));

/** Every "command:argument" the Meta Pixel queued. */
function pixelCalls(): string[] {
  const fbq = window.fbq as unknown as { queue?: unknown[][] } | undefined;
  return (fbq?.queue ?? []).map((args) => `${String(args[0])}:${String(args[1])}`);
}

function setNavigator(name: "doNotTrack" | "globalPrivacyControl", value: unknown) {
  Object.defineProperty(window.navigator, name, { value, configurable: true });
}

function clearCookies() {
  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0]?.trim();
    if (name) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

const cookieNames = () =>
  document.cookie
    .split(";")
    .map((pair) => pair.split("=")[0]?.trim())
    .filter(Boolean);

const reload = vi.fn();
const ALL = (state: "granted" | "denied") => ({
  ad_storage: state,
  ad_user_data: state,
  ad_personalization: state,
  analytics_storage: state,
});

beforeEach(() => {
  // Start every test with no ID, whatever the machine's own environment has.
  for (const name of ENV_NAMES) vi.stubEnv(name, "");
  window.localStorage.clear();
  clearCookies();
  reload.mockClear();
  resetLoaderForTests();
  resetConsentForTests(reload);
  delete window.dataLayer;
  delete window.gtag;
  delete window.fbq;
  delete (window as { _fbq?: unknown })._fbq;
  document.head.querySelectorAll("script").forEach((s) => s.remove());
  setNavigator("doNotTrack", null);
  setNavigator("globalPrivacyControl", undefined);
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

describe("analytics IDs", () => {
  it("drops unset and malformed IDs", () => {
    expect(cleanIds({})).toEqual({ gaId: undefined, metaPixelId: undefined, gtmId: undefined });
    expect(cleanIds({ gaId: "G-ABC123'></script>", metaPixelId: "12ab", gtmId: "x" })).toEqual({
      gaId: undefined,
      metaPixelId: undefined,
      gtmId: undefined,
    });
    expect(
      cleanIds({ gaId: " G-ABC1234 ", metaPixelId: "1234567890", gtmId: "GTM-AB12CD" })
    ).toEqual({
      gaId: "G-ABC1234",
      metaPixelId: "1234567890",
      gtmId: "GTM-AB12CD",
    });
  });

  it("come only from the environment", () => {
    expect(analyticsIdsFromEnv()).toEqual({
      gaId: undefined,
      metaPixelId: undefined,
      gtmId: undefined,
    });
    configure();
    expect(analyticsIdsFromEnv()).toEqual({ gaId: GA, metaPixelId: PIXEL, gtmId: undefined });
  });

  it("still reads the older NEXT_PUBLIC_GA_ID name", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-OLDNAME123");
    expect(analyticsIdsFromEnv().gaId).toBe("G-OLDNAME123");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", GA);
    expect(analyticsIdsFromEnv().gaId).toBe(GA);
  });
});

describe("without an ID", () => {
  it("loads no script and shows no banner, even after consent", () => {
    setConsent("granted");
    renderSite();
    trackSignupClick("hero");
    trackDemoRequest({ businessType: "restaurant", wantsMigration: false, branches: "1" });

    expect(screen.queryByTestId("consent-banner")).toBeNull();
    expect(screen.queryByTestId("cookie-choices")).toBeNull();
    expect(trackingScripts()).toHaveLength(0);
    expect(window.gtag).toBeUndefined();
    expect(window.fbq).toBeUndefined();
    expect(window.dataLayer).toBeUndefined();
  });

  it("a malformed ID is treated as no ID", () => {
    configure({ ga: "G-X'><script>alert(1)</script>", pixel: "not-a-number" });
    setConsent("granted");
    renderSite();
    expect(screen.queryByTestId("consent-banner")).toBeNull();
    expect(trackingScripts()).toHaveLength(0);
    expect(window.gtag).toBeUndefined();
    expect(window.fbq).toBeUndefined();
  });

  it("only the configured tag loads", () => {
    configure({ pixel: PIXEL });
    setConsent("granted");
    renderSite();
    trackSignupClick("hero");

    expect(trackingScripts().map((s) => s.id)).toEqual([SCRIPT_IDS.pixel]);
    expect(window.gtag).toBeUndefined();
    expect(pixelCalls()).toContain("trackCustom:StartFreeClick");
  });
});

describe("before consent", () => {
  beforeEach(() => configure());

  it("shows the banner and loads nothing", () => {
    renderSite();
    expect(screen.getByTestId("consent-banner")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accept" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reject non-essential" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cookie policy" })).toHaveAttribute("href", "/cookies");
    expect(trackingScripts()).toHaveLength(0);
    expect(window.dataLayer).toBeUndefined();
    expect(window.gtag).toBeUndefined();
    expect(window.fbq).toBeUndefined();
    expect(document.cookie).toBe("");
  });

  it("sends no event and starts no tag", () => {
    renderSite();
    trackSignupClick("hero");
    trackDemoRequest({ businessType: "restaurant", wantsMigration: false, branches: "1" });
    trackPlanSelected({ plan: "shop", billing: "monthly", location: "pricing" });
    trackContactSubmit({ businessType: "retail" });
    trackBusinessView("restaurant");

    expect(analyticsAllowed()).toBe(false);
    expect(trackingScripts()).toHaveLength(0);
    expect(window.dataLayer).toBeUndefined();
    expect(window.gtag).toBeUndefined();
    expect(window.fbq).toBeUndefined();
  });

  it("Reject keeps everything off and hides the banner", () => {
    renderSite();
    fireEvent.click(screen.getByRole("button", { name: "Reject non-essential" }));
    trackSignupClick("hero");

    expect(screen.queryByTestId("consent-banner")).toBeNull();
    expect(trackingScripts()).toHaveLength(0);
    expect(window.gtag).toBeUndefined();
    expect(window.fbq).toBeUndefined();
    const stored = JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY)!);
    expect(stored).toMatchObject({ v: CONSENT_VERSION, choice: "denied" });
    expect(reload).not.toHaveBeenCalled();
    expect(screen.getByTestId("cookie-choices")).toHaveTextContent(
      "You rejected optional cookies."
    );
  });

  it("Do Not Track counts as Reject: no banner, no script, no event", () => {
    setNavigator("doNotTrack", "1");
    renderSite();
    trackSignupClick("hero");

    expect(currentConsent()).toBe("denied");
    expect(screen.queryByTestId("consent-banner")).toBeNull();
    expect(trackingScripts()).toHaveLength(0);
    expect(window.gtag).toBeUndefined();
    expect(screen.getByTestId("cookie-choices")).toHaveTextContent(
      "Your browser asks websites not to track you"
    );
  });

  it("Global Privacy Control counts as Reject too", () => {
    setNavigator("globalPrivacyControl", true);
    renderSite();
    expect(currentConsent()).toBe("denied");
    expect(screen.queryByTestId("consent-banner")).toBeNull();
    expect(trackingScripts()).toHaveLength(0);
  });

  it("a Do Not Track visitor can still opt in from the cookie page", () => {
    setNavigator("doNotTrack", "1");
    renderSite();
    fireEvent.click(screen.getByRole("button", { name: "Change cookie choices" }));
    expect(screen.getByTestId("consent-banner")).toBeInTheDocument();
    expect(trackingScripts()).toHaveLength(0);

    fireEvent.click(screen.getByRole("button", { name: "Accept" }));
    expect(currentConsent()).toBe("granted");
    expect(trackingScripts()).toHaveLength(2);
    expect(screen.getByTestId("cookie-choices")).toHaveTextContent(
      "You accepted optional cookies."
    );
  });

  it("a choice stored by an older banner version is asked again", () => {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ v: CONSENT_VERSION - 1, choice: "granted", at: "2026-01-01T00:00:00.000Z" })
    );
    renderSite();
    expect(screen.getByTestId("consent-banner")).toBeInTheDocument();
    expect(trackingScripts()).toHaveLength(0);
  });
});

describe("after consent", () => {
  beforeEach(() => configure());

  it("Accept loads GA4 and the Pixel, each with its first page view", () => {
    renderSite();
    fireEvent.click(screen.getByRole("button", { name: "Accept" }));

    expect(screen.queryByTestId("consent-banner")).toBeNull();
    expect(document.getElementById(SCRIPT_IDS.ga)?.getAttribute("src")).toBe(
      `https://www.googletagmanager.com/gtag/js?id=${GA}`
    );
    expect(document.getElementById(SCRIPT_IDS.pixel)?.getAttribute("src")).toBe(
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    // Google: the consent signals first, then the stock config — which is what
    // sends the page view. `send_page_view: false` here would lose it.
    const calls = gtagCalls();
    expect(calls[0]).toEqual(["consent", "default", ALL("denied")]);
    expect(calls[1]).toEqual(["consent", "update", ALL("granted")]);
    expect(calls[2]?.[0]).toBe("js");
    expect(calls[3]).toEqual(["config", GA]);
    expect(calls).toHaveLength(4);
    // No page_view of our own on top: GA and the Pixel count route changes
    // themselves, and a second one would double every page.
    expect(gtagEvents()).toEqual([]);
    expect(pixelCalls()).toEqual(["consent:grant", `init:${PIXEL}`, "track:PageView"]);
  });

  it("a returning visitor who accepted gets the tags without a banner", () => {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ v: CONSENT_VERSION, choice: "granted", at: "2026-10-01T00:00:00.000Z" })
    );
    renderSite();
    expect(screen.queryByTestId("consent-banner")).toBeNull();
    expect(trackingScripts()).toHaveLength(2);
    expect(pixelCalls()).toEqual(["consent:grant", `init:${PIXEL}`, "track:PageView"]);
  });

  it("an explicit Accept outranks Do Not Track", () => {
    setNavigator("doNotTrack", "1");
    setConsent("granted");
    renderSite();
    expect(trackingScripts()).toHaveLength(2);
  });

  it("starts each tag once, however often the page re-renders", () => {
    setConsent("granted");
    const view = renderSite();
    view.rerender(
      <NextIntlClientProvider locale="en" messages={{ consent: en.consent }}>
        <AnalyticsProvider />
      </NextIntlClientProvider>
    );
    trackSignupClick("hero");
    trackSignupClick("footer");

    expect(trackingScripts()).toHaveLength(2);
    expect(gtagCalls().filter((c) => c[0] === "config")).toHaveLength(1);
    expect(pixelCalls().filter((c) => c === "track:PageView")).toHaveLength(1);
    expect(pixelCalls().filter((c) => c.startsWith("init:"))).toHaveLength(1);
  });

  it("fires the key events to GA4 and the Pixel", () => {
    setConsent("granted");
    renderSite();

    trackDemoRequest({ businessType: "restaurant", wantsMigration: true, branches: "2-5" });
    trackSignupClick("hero");
    trackPlanSelected({ plan: "shop", billing: "annual", location: "pricing" });
    trackContactSubmit({ businessType: "retail" });

    expect(gtagEvents()).toEqual([
      "generate_lead",
      "demo_request_submitted",
      "sign_up_click",
      "select_plan",
      "generate_lead",
    ]);
    expect(gtagCalls().find((c) => c[1] === "select_plan")?.[2]).toEqual({
      plan: "shop",
      billing: "annual",
      location: "pricing",
      contact_sales: false,
    });
    expect(gtagCalls().find((c) => c[1] === "generate_lead")?.[2]).toEqual({
      form: "demo_request",
      business_type: "restaurant",
      wants_migration: true,
      branches: "2-5",
    });
    expect(pixelCalls()).toEqual([
      "consent:grant",
      `init:${PIXEL}`,
      "track:PageView",
      "track:Lead",
      "track:Schedule",
      "trackCustom:StartFreeClick",
      "trackCustom:PlanSelected",
      "track:Contact",
    ]);
  });

  it("an event fired before the page finished starting the tags is queued, not lost", () => {
    // A landing page's own effect runs before the provider's: nothing is
    // rendered yet, the visitor accepted on an earlier visit.
    setConsent("granted");
    trackBusinessView("restaurant");

    expect(trackingScripts()).toHaveLength(2);
    const calls = gtagCalls().map((c) => `${String(c[0])}:${String(c[1])}`);
    expect(calls.slice(-2)).toEqual([`config:${GA}`, "event:view_business_page"]);
    expect(pixelCalls()).toEqual([
      "consent:grant",
      `init:${PIXEL}`,
      "track:PageView",
      "track:ViewContent",
    ]);
  });

  it("with Google Tag Manager, starts the container and pushes events to the dataLayer", () => {
    configure({ gtm: "GTM-AB12CD" });
    setConsent("granted");
    renderSite();
    trackSignupClick("hero");

    expect(document.getElementById(SCRIPT_IDS.gtm)?.getAttribute("src")).toBe(
      "https://www.googletagmanager.com/gtm.js?id=GTM-AB12CD"
    );
    expect(gtagCalls()[1]).toEqual(["consent", "update", ALL("granted")]);
    expect(window.dataLayer).toContainEqual(expect.objectContaining({ event: "gtm.js" }));
    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ event: "sign_up_click", location: "hero" })
    );
  });

  it("remembers the choice across a reload", () => {
    setConsent("granted");
    resetConsentForTests(reload);
    expect(currentConsent()).toBe("granted");
  });
});

describe("withdrawing consent", () => {
  beforeEach(() => configure());

  it("Reject after Accept deletes the tags' cookies, reloads and stops events", () => {
    renderSite();
    fireEvent.click(screen.getByRole("button", { name: "Accept" }));
    for (const name of ["_ga", "_ga_TEST12345", "_gid", "_gcl_au", "_fbp", "_fbc", "NEXT_LOCALE"]) {
      document.cookie = `${name}=x; path=/`;
    }
    const before = gtagCalls().length;

    fireEvent.click(screen.getByRole("button", { name: "Change cookie choices" }));
    fireEvent.click(screen.getByRole("button", { name: "Reject non-essential" }));
    trackSignupClick("hero");

    expect(currentConsent()).toBe("denied");
    expect(cookieNames()).toEqual(["NEXT_LOCALE"]);
    expect(reload).toHaveBeenCalledTimes(1);
    expect(gtagEvents()).toEqual([]);
    // Only the consent update was added — no event.
    expect(gtagCalls().slice(before)).toEqual([["consent", "update", ALL("denied")]]);
    expect(pixelCalls()).not.toContain("trackCustom:StartFreeClick");
  });

  it("Reject in another tab switches the running tags off here", () => {
    setConsent("granted");
    renderSite();
    const flag = () => (window as unknown as Record<string, unknown>)[`ga-disable-${GA}`];
    expect(flag()).toBe(false);

    act(() => {
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ v: CONSENT_VERSION, choice: "denied", at: new Date().toISOString() })
      );
      window.dispatchEvent(new StorageEvent("storage", { key: CONSENT_STORAGE_KEY }));
    });
    trackSignupClick("hero");

    expect(flag()).toBe(true);
    expect(gtagCalls().at(-1)).toEqual(["consent", "update", ALL("denied")]);
    expect(pixelCalls().at(-1)).toBe("consent:revoke");
    expect(gtagEvents()).toEqual([]);
    expect(reload).not.toHaveBeenCalled(); // never reload a tab the visitor is not looking at

    // …and Accept again there switches them back on, without loading twice.
    act(() => {
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ v: CONSENT_VERSION, choice: "granted", at: new Date().toISOString() })
      );
      window.dispatchEvent(new StorageEvent("storage", { key: CONSENT_STORAGE_KEY }));
    });
    expect(flag()).toBe(false);
    expect(gtagCalls().at(-1)).toEqual(["consent", "update", ALL("granted")]);
    expect(pixelCalls().at(-1)).toBe("consent:grant");
    expect(trackingScripts()).toHaveLength(2);
    expect(gtagCalls().filter((c) => c[0] === "config")).toHaveLength(1);
  });
});

describe("storage blocked", () => {
  it("treats the visitor as not chosen and still honours a click for this page", () => {
    const spy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    const setSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    try {
      expect(currentConsent()).toBe("unset");
      act(() => setConsent("granted"));
      expect(currentConsent()).toBe("granted");
    } finally {
      spy.mockRestore();
      setSpy.mockRestore();
    }
  });
});

describe("banner text", () => {
  it("exists in every language the site ships", () => {
    const keys = (o: object): string[] =>
      Object.entries(o).flatMap(([k, v]) =>
        typeof v === "object" && v !== null ? keys(v).map((s) => `${k}.${s}`) : [k]
      );
    expect(keys(ur.consent)).toEqual(keys(en.consent));
    expect(keys(ar.consent)).toEqual(keys(en.consent));
    for (const messages of [en, ur, ar]) {
      for (const value of Object.values({ ...messages.consent, ...messages.consent.current })) {
        if (typeof value === "string") expect(value.trim()).not.toBe("");
      }
    }
  });
});
