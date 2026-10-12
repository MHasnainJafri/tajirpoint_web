import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import en from "../../../messages/en.json";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import {
  CONSENT_STORAGE_KEY,
  analyticsAllowed,
  currentConsent,
  resetConsentForTests,
  setConsent,
} from "@/lib/analytics/consent";
import { cleanIds } from "@/lib/analytics/config";
import { SCRIPT_IDS, resetLoaderForTests } from "@/lib/analytics/loader";
import {
  trackContactSubmit,
  trackDemoRequest,
  trackPlanSelected,
  trackSignupClick,
} from "@/lib/analytics/events";

let pathname = "/";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));
vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const IDS = { gaId: "G-TEST12345", metaPixelId: "123456789012345" };

function renderProvider(ids = IDS) {
  return render(
    <NextIntlClientProvider locale="en" messages={{ consent: en.consent }}>
      <AnalyticsProvider ids={ids} />
    </NextIntlClientProvider>
  );
}

const trackingScripts = () =>
  Array.from(document.querySelectorAll("script")).filter((s) =>
    /googletagmanager|facebook\.net/.test(s.src)
  );

/** Every event name gtag received (gtag pushes Arguments objects). */
function gtagEvents(): string[] {
  return (window.dataLayer ?? [])
    .map((entry) => Array.from(entry as unknown as ArrayLike<unknown>))
    .filter((args) => args[0] === "event")
    .map((args) => String(args[1]));
}

/** Every [command, event] the Meta Pixel queued. */
function pixelCalls(): string[] {
  const fbq = window.fbq as unknown as { queue?: unknown[][] } | undefined;
  return (fbq?.queue ?? []).map((args) => `${args[0]}:${String(args[1])}`);
}

function setDnt(value: string | null) {
  Object.defineProperty(window.navigator, "doNotTrack", { value, configurable: true });
}

beforeEach(() => {
  pathname = "/";
  window.localStorage.clear();
  resetConsentForTests();
  resetLoaderForTests();
  delete window.dataLayer;
  delete window.gtag;
  delete window.fbq;
  delete (window as { _fbq?: unknown })._fbq;
  document.head.querySelectorAll("script").forEach((s) => s.remove());
  setDnt(null);
});

afterEach(() => cleanup());

describe("analytics IDs", () => {
  it("drops unset and malformed IDs", () => {
    expect(cleanIds({})).toEqual({ gaId: undefined, metaPixelId: undefined, gtmId: undefined });
    expect(cleanIds({ gaId: "G-ABC123'></script>", metaPixelId: "12ab", gtmId: "x" })).toEqual({
      gaId: undefined,
      metaPixelId: undefined,
      gtmId: undefined,
    });
    expect(cleanIds({ gaId: " G-ABC1234 ", metaPixelId: "1234567890", gtmId: "GTM-AB12CD" })).toEqual({
      gaId: "G-ABC1234",
      metaPixelId: "1234567890",
      gtmId: "GTM-AB12CD",
    });
  });
});

describe("without an ID", () => {
  it("loads no script and shows no banner, even after consent", () => {
    setConsent("granted");
    renderProvider({});
    expect(screen.queryByTestId("consent-banner")).toBeNull();
    expect(trackingScripts()).toHaveLength(0);
    expect(window.gtag).toBeUndefined();
    expect(window.fbq).toBeUndefined();
  });
});

describe("before consent", () => {
  it("shows the banner and loads nothing", () => {
    renderProvider();
    expect(screen.getByTestId("consent-banner")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accept" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reject non-essential" })).toBeInTheDocument();
    expect(trackingScripts()).toHaveLength(0);
    expect(window.dataLayer).toBeUndefined();
  });

  it("sends no event", () => {
    window.dataLayer = [];
    trackSignupClick("hero");
    trackDemoRequest({ businessType: "restaurant", wantsMigration: false, branches: "1" });
    expect(window.dataLayer).toEqual([]);
    expect(analyticsAllowed()).toBe(false);
  });

  it("Reject keeps everything off and hides the banner", () => {
    renderProvider();
    fireEvent.click(screen.getByRole("button", { name: "Reject non-essential" }));
    expect(screen.queryByTestId("consent-banner")).toBeNull();
    expect(trackingScripts()).toHaveLength(0);
    expect(JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY)!).choice).toBe("denied");
  });

  it("Do Not Track counts as Reject: no banner, no script", () => {
    setDnt("1");
    renderProvider();
    expect(currentConsent()).toBe("denied");
    expect(screen.queryByTestId("consent-banner")).toBeNull();
    expect(trackingScripts()).toHaveLength(0);
  });
});

describe("after consent", () => {
  it("Accept loads GA4 and the Pixel and sends a page view", () => {
    renderProvider();
    fireEvent.click(screen.getByRole("button", { name: "Accept" }));

    expect(screen.queryByTestId("consent-banner")).toBeNull();
    expect(document.getElementById(SCRIPT_IDS.ga)?.getAttribute("src")).toBe(
      "https://www.googletagmanager.com/gtag/js?id=G-TEST12345"
    );
    expect(document.getElementById(SCRIPT_IDS.pixel)?.getAttribute("src")).toBe(
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    expect(gtagEvents()).toEqual(["page_view"]);
    expect(pixelCalls()).toEqual(["init:123456789012345", "track:PageView"]);
  });

  it("sends a page view on each route change, once per page", () => {
    setConsent("granted");
    const view = renderProvider();
    expect(gtagEvents()).toEqual(["page_view"]);

    window.history.pushState({}, "", "/pricing");
    pathname = "/pricing";
    view.rerender(
      <NextIntlClientProvider locale="en" messages={{ consent: en.consent }}>
        <AnalyticsProvider ids={IDS} />
      </NextIntlClientProvider>
    );
    expect(gtagEvents()).toEqual(["page_view", "page_view"]);
    expect(trackingScripts()).toHaveLength(2); // not added twice
    window.history.pushState({}, "", "/");
  });

  it("fires the key events to GA4 and the Pixel", () => {
    setConsent("granted");
    renderProvider();

    trackDemoRequest({ businessType: "restaurant", wantsMigration: true, branches: "2-5" });
    trackSignupClick("hero");
    trackPlanSelected({ plan: "shop", billing: "annual", location: "pricing" });
    trackContactSubmit({ businessType: "retail" });

    expect(gtagEvents()).toEqual([
      "page_view",
      "generate_lead",
      "demo_request_submitted",
      "sign_up_click",
      "select_plan",
      "generate_lead",
    ]);
    expect(pixelCalls()).toEqual([
      "init:123456789012345",
      "track:PageView",
      "track:Lead",
      "track:Schedule",
      "trackCustom:StartFreeClick",
      "trackCustom:PlanSelected",
      "track:Contact",
    ]);
  });

  it("page views keep campaign tags but drop other query values", () => {
    setConsent("granted");
    window.history.pushState({}, "", "/book-demo?utm_source=fb&email=a%40b.c");
    renderProvider();
    const pv = (window.dataLayer ?? [])
      .map((e) => Array.from(e as unknown as ArrayLike<unknown>))
      .find((a) => a[1] === "page_view")![2] as { page_location: string };
    expect(pv.page_location).toBe(`${window.location.origin}/book-demo?utm_source=fb`);
    window.history.pushState({}, "", "/");
  });

  it("remembers the choice across a reload", () => {
    setConsent("granted");
    resetConsentForTests();
    expect(currentConsent()).toBe("granted");
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
    expect(currentConsent()).toBe("unset");
    act(() => setConsent("granted"));
    expect(currentConsent()).toBe("granted");
    spy.mockRestore();
    setSpy.mockRestore();
  });
});
