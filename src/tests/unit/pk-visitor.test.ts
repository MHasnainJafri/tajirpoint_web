import { describe, expect, it } from "vitest";
import { isPakistanVisitor } from "@/lib/marketing/pk-visitor";

describe("isPakistanVisitor (TP-491)", () => {
  it("is true for the Karachi time zone", () => {
    expect(isPakistanVisitor({ timeZone: "Asia/Karachi", languages: ["en-US"] })).toBe(true);
  });

  it("is true for an Urdu or en-PK browser language", () => {
    expect(isPakistanVisitor({ timeZone: "Europe/London", languages: ["ur"] })).toBe(true);
    expect(isPakistanVisitor({ timeZone: "Asia/Dubai", languages: ["en-US", "ur-PK"] })).toBe(true);
    expect(isPakistanVisitor({ timeZone: "Europe/London", languages: ["en-PK"] })).toBe(true);
    expect(isPakistanVisitor({ languages: ["en_pk"] })).toBe(true);
  });

  it("is false everywhere else", () => {
    expect(isPakistanVisitor({ timeZone: "Europe/London", languages: ["en-GB"] })).toBe(false);
    expect(isPakistanVisitor({ timeZone: "Asia/Dubai", languages: ["ar-AE", "en"] })).toBe(false);
    expect(isPakistanVisitor({})).toBe(false);
  });
});
