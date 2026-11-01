import { describe, expect, it } from "vitest";
import {
  COUNTRIES,
  countryByIso,
  countryForDigits,
  countryForE164,
  flagEmoji,
  guessCountry,
  isE164,
  normalizePhone,
  parsePhoneInput,
  phoneFromForm,
  searchCountries,
  toE164,
} from "@/lib/marketing/phone";

describe("country list", () => {
  it("has unique two-letter codes and digit dial codes", () => {
    const codes = COUNTRIES.map((c) => c.iso2);
    expect(new Set(codes).size).toBe(codes.length);
    expect(COUNTRIES.length).toBeGreaterThan(220);
    for (const c of COUNTRIES) {
      expect(c.iso2).toMatch(/^[A-Z]{2}$/);
      expect(c.dial).toMatch(/^[1-9]\d{0,2}$/);
      for (const a of c.areaCodes ?? []) expect(a).toMatch(/^\d+$/);
    }
  });

  it("finds countries by ISO code in any case", () => {
    expect(countryByIso("pk")?.dial).toBe("92");
    expect(countryByIso(" AE ")?.name).toBe("United Arab Emirates");
    expect(countryByIso("ZZ")).toBeUndefined();
    expect(countryByIso("")).toBeUndefined();
  });

  it("builds flag emoji from the ISO code", () => {
    expect(flagEmoji("PK")).toBe("🇵🇰");
    expect(flagEmoji("gb")).toBe("🇬🇧");
    expect(flagEmoji("X")).toBe("");
  });
});

describe("searchCountries", () => {
  it("matches names (start first), ISO codes and dial codes", () => {
    expect(searchCountries("pak")[0]?.iso2).toBe("PK");
    expect(searchCountries("united")[0]?.iso2).toBe("AE");
    expect(searchCountries("uk").map((c) => c.iso2)).not.toContain("GB"); // "uk" is not GB's ISO code
    expect(searchCountries("gb")[0]?.iso2).toBe("GB");
    expect(searchCountries("+92")[0]?.iso2).toBe("PK");
    expect(searchCountries("971")[0]?.iso2).toBe("AE");
    expect(searchCountries("curacao")[0]?.iso2).toBe("CW");
    expect(searchCountries("")).toHaveLength(COUNTRIES.length);
    expect(searchCountries("zzzz")).toEqual([]);
  });
});

describe("countryForDigits / countryForE164", () => {
  it.each([
    ["923001234567", undefined, "PK"],
    ["971501234567", undefined, "AE"],
    ["14155550123", undefined, "US"],
    ["14165550123", "CA", "CA"], // shared +1: keep the picked country
    ["18765550123", "US", "JM"], // NANP area code wins
    ["442079460123", undefined, "GB"],
    ["441481123456", undefined, "GG"],
    ["77011234567", undefined, "KZ"],
    ["74951234567", undefined, "RU"],
    ["358181234567", undefined, "AX"],
    ["358401234567", undefined, "FI"],
    ["8801712345678", undefined, "BD"],
  ])("%s (picked %s) → %s", (digits, picked, iso) => {
    expect(countryForDigits(digits, picked)?.iso2).toBe(iso);
  });

  it("only reads numbers that start with +", () => {
    expect(countryForE164("+966501234567")?.iso2).toBe("SA");
    expect(countryForE164("966501234567")).toBeUndefined();
    expect(countryForDigits("")).toBeUndefined();
  });
});

describe("normalizePhone / isE164", () => {
  it("accepts 7–15 digits after + or 00", () => {
    expect(normalizePhone("+683 1234")).toBe("+6831234"); // 7 digits (Niue)
    expect(normalizePhone("+92 300 1234567")).toBe("+923001234567");
    expect(normalizePhone("0092 300 1234567")).toBe("+923001234567");
    expect(normalizePhone("+12345")).toBe("");
    expect(normalizePhone("+1234567890123456")).toBe("");
    expect(normalizePhone("0300 1234567")).toBe("");
    expect(isE164("+923001234567")).toBe(true);
    expect(isE164("+023001234567")).toBe(false);
    expect(isE164("923001234567")).toBe(false);
  });
});

describe("toE164", () => {
  it.each([
    ["PK", "0300 1234567", "+923001234567"],
    ["PK", "300-1234567", "+923001234567"],
    ["AE", "050 123 4567", "+971501234567"],
    ["GB", "07700 900123", "+447700900123"],
    ["US", "(415) 555-0123", "+14155550123"],
    ["IT", "06 1234 5678", "+390612345678"], // Italy keeps its 0
    ["BS", "555 0123", "+12425550123"], // 7 digits: the single area code is added
    ["PK", "123", ""],
    ["PK", "call me", ""],
    ["", "3001234567", ""],
    ["ZZ", "3001234567", ""],
    ["PK", "3001234567890123", ""],
  ])("%s %s → %s", (iso, local, out) => expect(toE164(iso, local)).toBe(out));
});

describe("parsePhoneInput", () => {
  it("reads a local number in the picked country", () => {
    expect(parsePhoneInput("0300 1234567", "PK")).toEqual({
      e164: "+923001234567",
      country: "PK",
      national: "3001234567",
    });
  });

  it("lets a typed or pasted + number pick its own country", () => {
    expect(parsePhoneInput("+44 20 7946 0123", "PK")).toEqual({
      e164: "+442079460123",
      country: "GB",
      national: "2079460123",
    });
    expect(parsePhoneInput("00971 50 123 4567", "")).toMatchObject({
      e164: "+971501234567",
      country: "AE",
    });
  });

  it("returns no number without a country or with too few digits", () => {
    expect(parsePhoneInput("3001234567", "").e164).toBe("");
    expect(parsePhoneInput("+92", "PK").e164).toBe("");
  });
});

describe("phoneFromForm", () => {
  const form = (entries: Record<string, string>) => {
    const f = new FormData();
    for (const [k, v] of Object.entries(entries)) f.set(k, v);
    return f;
  };

  it("builds E.164 from the picker fields (works without JavaScript)", () => {
    expect(phoneFromForm(form({ phone_country: "PK", phone_local: "0300 1234567" }))).toEqual({
      phone: "+923001234567",
      country: "PK",
    });
  });

  it("prefers the number's own country when it was typed with +", () => {
    expect(phoneFromForm(form({ phone_country: "PK", phone_local: "+1 415 555 0123" }))).toEqual({
      phone: "+14155550123",
      country: "US",
    });
  });

  it("reads a plain phone + country post", () => {
    expect(phoneFromForm(form({ phone: "+923001234567", country: "" }))).toEqual({
      phone: "+923001234567",
      country: "PK",
    });
  });

  it("passes unusable input through so the schema can report it", () => {
    expect(phoneFromForm(form({ phone_country: "", phone_local: "3001234567" }))).toEqual({
      phone: "3001234567",
      country: "",
    });
    expect(phoneFromForm(form({ phone_country: "PK", phone_local: "" }))).toEqual({
      phone: "",
      country: "PK",
    });
  });
});

describe("guessCountry", () => {
  it("uses a single-country time zone first, then the browser language region", () => {
    expect(guessCountry({ timeZone: "Asia/Karachi", languages: ["en-US"] })).toBe("PK");
    expect(guessCountry({ timeZone: "America/New_York", languages: ["en-US"] })).toBe("US");
    expect(guessCountry({ timeZone: "UTC", languages: ["ur", "en-GB"] })).toBe("GB");
    expect(guessCountry({ languages: ["zh-Hant-TW"] })).toBe("TW");
    expect(guessCountry({ languages: ["en"] })).toBe("");
    expect(guessCountry({})).toBe("");
  });
});
