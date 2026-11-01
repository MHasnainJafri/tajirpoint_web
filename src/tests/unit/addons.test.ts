import { describe, expect, it } from "vitest";
import { ADDON_CONTENT } from "@/content/addons";
import { ADDON_SNAPSHOT } from "@/content/addons/snapshot";
import {
  LIGHT_PLAN_ADDONS,
  applyMarketing,
  buildCatalogue,
  deriveStatus,
  groupFor,
  planLine,
  priceLabel,
  relatedAddons,
} from "@/lib/marketing/addons";
import { ADDON_NAMES, addonInterestMessage, addonNameFromSlug } from "@/lib/marketing/addon-names";
import { extensionHref } from "@/lib/design/catalog";

const JARGON = /\b(webhook|hmac|oauth|jwt|idempoten|celery|etag|polling)\b/i;
const MONEY = /[$£€]\s?\d|\bRs\.?\s?\d|\bPKR\s?\d|\bUSD\s?\d/;

describe("deriveStatus", () => {
  it("prefers the server's status", () => {
    expect(deriveStatus({ status: "contact_us", availability: "available" })).toBe("contact_us");
    expect(deriveStatus({ status: "active", availability: "coming_soon" })).toBe("active");
  });
  it("falls back in the backend's order", () => {
    expect(deriveStatus({ availability: "coming_soon", is_suspended: true })).toBe("coming_soon");
    expect(deriveStatus({ availability: "available", is_suspended: true })).toBe("unavailable");
    expect(deriveStatus({ availability: "available", is_suspended: false })).toBe("active");
  });
  it("ignores an unknown status value", () => {
    expect(deriveStatus({ status: "bogus", availability: "available" })).toBe("active");
  });
});

describe("priceLabel", () => {
  it("never prints a bare number", () => {
    expect(
      priceLabel({
        is_free: false,
        billing_type: "recurring",
        price: "12.0000",
        currency_code: "USD",
      })
    ).toBe("$12/month");
    expect(
      priceLabel({ is_free: false, billing_type: "one_time", price: "40", currency_code: "USD" })
    ).toBe("$40 one-time");
    expect(
      priceLabel({ is_free: false, billing_type: "recurring", price: "12", currency_code: null })
    ).toBe("Ask us");
  });
  it("says Free, or Ask us for an unpriced Contact us add-on", () => {
    expect(
      priceLabel({ is_free: true, billing_type: "free", price: "0.0000", currency_code: "USD" })
    ).toBe("Free");
    expect(
      priceLabel({
        is_free: true,
        billing_type: "free",
        price: "0",
        currency_code: "USD",
        status: "contact_us",
      })
    ).toBe("Ask us");
  });
});

describe("groupFor", () => {
  it("splits the API's integration category", () => {
    expect(groupFor({ slug: "stripe-payments", category: "integration" }).id).toBe("payments");
    expect(groupFor({ slug: "shopify-sync", category: "integration" }).id).toBe("online-stores");
    expect(groupFor({ slug: "hubrise", category: "integration" }).id).toBe("delivery");
    expect(groupFor({ slug: "fbr-integration", category: "tax-compliance" }).id).toBe("compliance");
    expect(groupFor({ slug: "age-verification", category: "tax_compliance" }).id).toBe(
      "compliance"
    );
  });
  it("keeps an unknown category as its own chip", () => {
    expect(groupFor({ slug: "x", category: "loyalty", category_label: "Loyalty" })).toEqual({
      id: "loyalty",
      label: "Loyalty",
    });
  });
});

describe("buildCatalogue", () => {
  it("builds every snapshot row", () => {
    const all = buildCatalogue({ results: ADDON_SNAPSHOT });
    expect(all).toHaveLength(ADDON_SNAPSHOT.length);
    for (const a of all) {
      expect(a.hasWriteUp).toBe(true);
      expect(a.price).not.toMatch(/^\d/);
    }
  });
  it("hides when_installed rows and skips malformed ones", () => {
    const rows = [
      { ...ADDON_SNAPSHOT[0]!, listing: "when_installed" },
      { ...ADDON_SNAPSHOT[1]!, status: "contact_us", listing: "request" },
      { slug: "Bad Slug!", name: "x" },
      { name: "no slug" },
    ];
    const out = buildCatalogue({ results: rows });
    expect(out.map((a) => a.slug)).toEqual([ADDON_SNAPSHOT[1]!.slug]);
    expect(out[0]!.status).toBe("contact_us");
  });
  it("builds a page for an add-on the site has no write-up for", () => {
    const a = buildCatalogue({
      results: [
        { slug: "new-thing", name: "New Thing", tagline: "Does a thing", features: ["One", "Two"] },
      ],
    })[0]!;
    expect(a.hasWriteUp).toBe(false);
    expect(a.content.headline).toBe("Does a thing");
    expect(a.apiFeatures).toEqual(["One", "Two"]);
    expect(a.content.howItWorks.length).toBeGreaterThan(0);
  });
  it("only accepts icons from the media host", () => {
    const icons = buildCatalogue({
      results: [
        { slug: "a", name: "A", icon_url: "https://media.tajirpoint.com/extension-icons/a.png" },
        { slug: "b", name: "B", icon_url: "http://evil.example/b.png" },
      ],
    });
    expect(icons.map((x) => x.iconUrl).sort()).toEqual(
      [null, "https://media.tajirpoint.com/extension-icons/a.png"].sort()
    );
  });
});

describe("applyMarketing", () => {
  const base = ADDON_CONTENT["cash-management"]!;
  it("overrides filled fields only", () => {
    const out = applyMarketing(base, {
      headline: "New headline",
      faqs: [{ question: "Q?", answer: "A." }, { q: "No answer" }],
      overview: "",
      features: "not a list",
    });
    expect(out.headline).toBe("New headline");
    expect(out.faqs).toEqual([{ q: "Q?", a: "A." }]);
    expect(out.overview).toEqual(base.overview);
    expect(out.features).toEqual(base.features);
  });
  it("returns the base for an empty object", () => {
    expect(applyMarketing(base, {})).toEqual(base);
  });
});

describe("relatedAddons", () => {
  it("never includes the add-on itself", () => {
    const all = buildCatalogue({ results: ADDON_SNAPSHOT });
    for (const a of all) {
      const rel = relatedAddons(a, all, 3);
      expect(rel.length).toBeLessThanOrEqual(3);
      expect(rel.map((r) => r.slug)).not.toContain(a.slug);
    }
  });
});

describe("write-ups", () => {
  it("cover every add-on in the snapshot, keyed by their own slug", () => {
    for (const row of ADDON_SNAPSHOT) expect(ADDON_CONTENT[row.slug]?.slug).toBe(row.slug);
  });

  it.each(Object.values(ADDON_CONTENT).map((c) => [c.slug, c] as const))(
    "%s is complete and plain",
    (_slug, c) => {
      expect(c.seoTitle.length).toBeGreaterThan(10);
      expect(c.seoTitle.length).toBeLessThanOrEqual(62);
      expect(c.seoTitle).not.toMatch(/tajir ?point/i);
      expect(c.seoDescription.length).toBeGreaterThanOrEqual(100);
      expect(c.seoDescription.length).toBeLessThanOrEqual(165);
      expect(c.overview.length).toBeGreaterThanOrEqual(1);
      expect(c.whoFor.length).toBeGreaterThanOrEqual(2);
      expect(c.problems.length).toBeGreaterThanOrEqual(2);
      expect(c.features.length).toBeGreaterThanOrEqual(3);
      expect(c.howItWorks.length).toBeGreaterThanOrEqual(3);
      expect(c.faqs.length).toBeGreaterThanOrEqual(5);
      expect(c.faqs.length).toBeLessThanOrEqual(8);
      const text = JSON.stringify(c);
      expect(text).not.toMatch(JARGON);
      // Prices come from the API, never from the copy.
      expect(text).not.toMatch(MONEY);
    }
  );

  it("gives every coming-soon add-on an honest note", () => {
    for (const row of ADDON_SNAPSHOT.filter((r) => r.availability === "coming_soon")) {
      expect(ADDON_CONTENT[row.slug]?.comingSoonNote?.trim()).toBeTruthy();
    }
  });
});

describe("plan line", () => {
  it("matches the Light plan's list", () => {
    expect(planLine("restaurant")).toMatch(/Light/);
    expect(planLine("accounting-gl")).toMatch(/Shop plan/);
    expect(LIGHT_PLAN_ADDONS).toContain("cash-management");
  });
});

describe("call-back pre-fill", () => {
  it("names known and new add-ons, rejects junk", () => {
    expect(addonNameFromSlug("stripe-payments")).toBe(ADDON_NAMES["stripe-payments"]);
    expect(addonNameFromSlug("new-thing")).toBe("New Thing");
    expect(addonNameFromSlug("<script>")).toBeNull();
    expect(addonNameFromSlug("")).toBeNull();
    expect(addonNameFromSlug(null)).toBeNull();
    expect(addonInterestMessage("HubRise")).toBe("I'm interested in the HubRise add-on.");
  });
});

describe("nav links", () => {
  it("points marketplace ids at their detail pages", () => {
    expect(extensionHref("stripe")).toBe("/extensions/stripe-payments");
    expect(extensionHref("restaurant")).toBe("/extensions/restaurant");
  });
});
