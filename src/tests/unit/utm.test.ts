import { describe, expect, it } from "vitest";
import {
  STORAGE_KEY,
  captureFirstTouch,
  emptyAttribution,
  hasCampaign,
  parseAttribution,
  readAttribution,
} from "@/lib/marketing/utm";

const ORIGIN = "https://tajirpoint.com";

function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    getItem: (k) => data.get(k) ?? null,
    key: (i) => Array.from(data.keys())[i] ?? null,
    removeItem: (k) => void data.delete(k),
    setItem: (k, v) => void data.set(k, String(v)),
  };
}

function blockedStorage(): Storage {
  const fail = () => {
    throw new Error("SecurityError");
  };
  return {
    length: 0,
    clear: fail,
    getItem: fail,
    key: fail,
    removeItem: fail,
    setItem: fail,
  } as unknown as Storage;
}

describe("parseAttribution", () => {
  it("reads utm tags and fbclid, keeping only campaign params on the landing page", () => {
    const a = parseAttribution(
      "?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_pharmacy&fbclid=abc123&type=pharmacy&email=x@y.z",
      "/book-demo",
      "",
      ORIGIN
    );
    expect(a.utm_source).toBe("facebook");
    expect(a.utm_medium).toBe("paid_social");
    expect(a.utm_campaign).toBe("demo_pharmacy");
    expect(a.fbclid).toBe("abc123");
    expect(a.landing_page).toBe(
      "/book-demo?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_pharmacy"
    );
    expect(a.landing_page).not.toContain("email");
    expect(hasCampaign(a)).toBe(true);
  });

  it("drops our own referrer and strips query strings from other referrers", () => {
    expect(parseAttribution("", "/", `${ORIGIN}/pricing`, ORIGIN).referrer).toBe("");
    expect(
      parseAttribution("", "/", "https://l.facebook.com/l.php?u=secret&h=1", ORIGIN).referrer
    ).toBe("https://l.facebook.com/l.php");
    expect(parseAttribution("", "/", "not a url", ORIGIN).referrer).toBe("");
  });

  it("strips control characters and caps length", () => {
    const long = "x".repeat(500);
    const a = parseAttribution(`?utm_source=a%00b&utm_campaign=${long}`, "/", "", ORIGIN);
    expect(a.utm_source).toBe("ab");
    expect(a.utm_campaign.length).toBe(200);
  });

  it("is empty without campaign params", () => {
    const a = parseAttribution("", "/pricing", "", ORIGIN);
    expect(hasCampaign(a)).toBe(false);
    expect(a.landing_page).toBe("/pricing");
  });
});

describe("first touch", () => {
  it("keeps the first campaign visit across later pages", () => {
    const store = memoryStorage();
    const ad = parseAttribution("?utm_source=facebook&utm_campaign=demo_restaurants", "/business/restaurants", "", ORIGIN);
    captureFirstTouch(store, ad);
    const later = parseAttribution("", "/book-demo", `${ORIGIN}/business/restaurants`, ORIGIN);
    expect(captureFirstTouch(store, later)).toEqual(ad);
    expect(readAttribution(store, later)).toEqual(ad);
  });

  it("replaces an organic first visit with a later campaign visit", () => {
    const store = memoryStorage();
    captureFirstTouch(store, parseAttribution("", "/", "", ORIGIN));
    const ad = parseAttribution("?utm_source=facebook", "/pricing", "", ORIGIN);
    expect(captureFirstTouch(store, ad)).toEqual(ad);
    expect(JSON.parse(store.getItem(STORAGE_KEY) ?? "{}").utm_source).toBe("facebook");
  });

  it("does not let a later campaign overwrite the first campaign", () => {
    const store = memoryStorage();
    const first = parseAttribution("?utm_source=facebook", "/", "", ORIGIN);
    captureFirstTouch(store, first);
    const second = parseAttribution("?utm_source=google", "/", "", ORIGIN);
    expect(captureFirstTouch(store, second).utm_source).toBe("facebook");
  });

  it("works when storage is blocked or missing", () => {
    const current = parseAttribution("?utm_source=facebook", "/", "", ORIGIN);
    expect(captureFirstTouch(blockedStorage(), current)).toEqual(current);
    expect(readAttribution(blockedStorage(), current)).toEqual(current);
    expect(readAttribution(undefined, current)).toEqual(current);
  });

  it("ignores corrupt stored values", () => {
    const store = memoryStorage();
    store.setItem(STORAGE_KEY, "{not json");
    const current = emptyAttribution();
    expect(readAttribution(store, current)).toEqual(current);
    store.setItem(STORAGE_KEY, JSON.stringify({ utm_source: 42, fbclid: "ok" }));
    expect(readAttribution(store, current).utm_source).toBe("");
    expect(readAttribution(store, current).fbclid).toBe("ok");
  });
});
