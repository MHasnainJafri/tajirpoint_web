import { describe, expect, it } from "vitest";
import {
  DemoRequestSchema,
  demoInputFromForm,
  demoPayload,
  demoSummary,
  normalizePhone,
  preselectType,
  upcomingDays,
} from "@/lib/marketing/demo";
import { emptyAttribution } from "@/lib/marketing/utm";

describe("normalizePhone", () => {
  it.each([
    ["0344 6800893", ""],
    ["0344-680-0893", ""],
    ["3446800893", ""],
    ["+92 344 6800893", "+923446800893"],
    ["0092 344 6800893", "+923446800893"],
    ["+971 50 123 4567", "+971501234567"],
    ["+1 (415) 555-0123", "+14155550123"],
    ["0044 20 7946 0123", "+442079460123"],
    ["+61 2 5550 1234", "+61255501234"],
    ["+01 234567890", ""],
    ["+44 call 123456789", ""],
    ["+1234567890123456", ""],
    ["", ""],
    ["12345", ""],
    ["call me", ""],
  ])("%s → %s", (input, out) => expect(normalizePhone(input)).toBe(out));
});

describe("preselectType", () => {
  it("accepts catalog slugs and other, rejects the rest", () => {
    expect(preselectType("pharmacy")).toBe("pharmacy");
    expect(preselectType("PHARMACY ")).toBe("pharmacy");
    expect(preselectType("other")).toBe("other");
    expect(preselectType("<script>")).toBe("");
    expect(preselectType(null)).toBe("");
  });
});

describe("upcomingDays", () => {
  it("lists the next 14 days without Sundays, starting tomorrow", () => {
    const from = new Date(2026, 9, 11); // Sun 11 Oct 2026
    const days = upcomingDays(from);
    expect(days[0]!.value).toBe("2026-10-12");
    expect(days).toHaveLength(12); // 14 days minus two Sundays
    for (const d of days) expect(new Date(`${d.value}T12:00:00`).getDay()).not.toBe(0);
  });
});

describe("DemoRequestSchema", () => {
  const base = { name: "Ayesha Khan", phone: "+92 300 1234567" };

  it("needs a name and a reachable phone", () => {
    const r = DemoRequestSchema.safeParse({ name: "", phone: "abc" });
    expect(r.success).toBe(false);
    const paths = r.success ? [] : r.error.issues.map((i) => i.path[0]);
    expect(paths).toEqual(expect.arrayContaining(["name", "phone"]));
  });

  it("normalises and defaults the optional fields", () => {
    const r = DemoRequestSchema.parse(base);
    expect(r.phone).toBe("+923001234567");
    expect(r.email).toBe("");
    expect(r.wants_migration).toBe(false);
    expect(r.business_type).toBe("");
  });

  it("rejects bad email, branches, date and time values", () => {
    const r = DemoRequestSchema.safeParse({
      ...base,
      email: "nope",
      branches: "99",
      preferred_date: "tomorrow",
      preferred_time: "midnight",
    });
    expect(r.success).toBe(false);
    const paths = r.success ? [] : r.error.issues.map((i) => i.path[0]);
    expect(paths).toEqual(
      expect.arrayContaining(["email", "branches", "preferred_date", "preferred_time"])
    );
  });

  it("drops an unknown business type instead of failing", () => {
    expect(DemoRequestSchema.parse({ ...base, business_type: "casino" }).business_type).toBe("");
  });
});

describe("demo payload", () => {
  it("reads the form, maps branches to a number and carries attribution", () => {
    const form = new FormData();
    form.set("name", "Ali");
    form.set("phone", "+923001234567");
    form.set("business_type", "restaurants");
    form.set("branches", "2-5");
    form.set("wants_migration", "on");
    form.set("preferred_time", "evening");
    form.set("time_zone", "America/Los_Angeles");
    form.set("message", "Two branches in Lahore");
    const req = DemoRequestSchema.parse(demoInputFromForm(form));
    const a = { ...emptyAttribution(), utm_source: "facebook", utm_campaign: "demo_restaurants" };
    const body = demoPayload(req, a);
    expect(body).toMatchObject({
      name: "Ali",
      phone: "+923001234567",
      business_type: "restaurants",
      branches: 2,
      wants_migration: true,
      preferred_date: null,
      preferred_time: "evening",
      country: "PK",
      utm_source: "facebook",
      utm_campaign: "demo_restaurants",
      company: "",
    });
    expect(body.message).toContain("2–5 shops");
    expect(body.message).toContain("Two branches in Lahore");
    expect(body.message).toContain("America/Los_Angeles");
    expect(demoSummary(req, a)).toContain("Time zone: America/Los_Angeles");
    expect(demoSummary(req, a)).toContain("Move my data: Yes");
  });
});
