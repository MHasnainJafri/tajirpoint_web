import { describe, expect, it } from "vitest";
import {
  CallbackRequestSchema,
  callbackAsDemoPayload,
  callbackInputFromForm,
  callbackPayload,
} from "@/lib/marketing/callback";
import { PHONE_ERROR } from "@/lib/marketing/demo";
import { emptyAttribution } from "@/lib/marketing/utm";

describe("CallbackRequestSchema", () => {
  it("needs a business name, a name and a phone", () => {
    const r = CallbackRequestSchema.safeParse({ business_name: "", name: "", phone: "300" });
    expect(r.success).toBe(false);
    const issues = r.success ? [] : r.error.issues;
    expect(issues.map((i) => i.path[0])).toEqual(
      expect.arrayContaining(["business_name", "name", "phone"])
    );
    expect(issues.find((i) => i.path[0] === "phone")?.message).toBe(PHONE_ERROR);
  });

  it("drops an unknown country or business type instead of failing", () => {
    const r = CallbackRequestSchema.parse({
      business_name: "Bismillah Store",
      name: "Ali",
      phone: "+923001234567",
      country: "ZZ",
      business_type: "casino",
    });
    expect(r.country).toBe("");
    expect(r.business_type).toBe("");
    expect(r.email).toBe("");
  });
});

describe("callback payload", () => {
  it("reads the picker fields, sends E.164 + ISO country and attribution", () => {
    const form = new FormData();
    form.set("business_name", "Bismillah Store");
    form.set("name", "Ali");
    form.set("phone_country", "AE");
    form.set("phone_local", "050 123 4567");
    form.set("email", "ali@example.com");
    form.set("business_type", "restaurants");
    form.set("message", "Price for two branches?");
    form.set("company", "");
    const req = CallbackRequestSchema.parse(callbackInputFromForm(form));
    const a = { ...emptyAttribution(), utm_source: "google" };
    expect(callbackPayload(req, a)).toMatchObject({
      name: "Ali",
      business_name: "Bismillah Store",
      phone: "+971501234567",
      country: "AE",
      email: "ali@example.com",
      business_type: "restaurants",
      message: "Price for two branches?",
      company: "",
      utm_source: "google",
    });
  });

  it("marks the demo-endpoint fallback as a call-back request", () => {
    const req = CallbackRequestSchema.parse({
      business_name: "Bismillah Store",
      name: "Ali",
      phone: "+923001234567",
      message: "Call after 5",
    });
    const body = callbackAsDemoPayload(req, emptyAttribution());
    expect(body.country).toBe("PK");
    expect(body.message).toContain("CALL-BACK REQUEST");
    expect(body.message).toContain("Call after 5");
  });
});
