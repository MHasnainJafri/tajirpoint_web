import { describe, expect, it } from "vitest";
import { pickCopy, forwardArrow, backArrow } from "@/content/i18n/page-copy";
import {
  SHARED_FORM_COPY,
  businessTypeOptions,
  branchOptions,
  localizeError,
  localizeErrors,
  timeOptions,
} from "@/content/i18n/lead-pages/forms";
import { KHATA_COPY } from "@/content/i18n/features/khata";
import { ACCOUNTING_COPY } from "@/content/i18n/features/accounting";
import { E_INVOICING_COPY } from "@/content/i18n/features/e-invoicing";
import { OFFLINE_COPY } from "@/content/i18n/features/offline";
import { VAN_SALES_COPY } from "@/content/i18n/features/van-sales";
import {
  ABOUT_COPY,
  BOOK_DEMO_COPY,
  CONTACT_COPY,
  GET_A_CALL_COPY,
} from "@/content/i18n/lead-pages/pages";
import {
  BUSINESS_TYPE_OPTIONS,
  BRANCH_OPTIONS,
  PHONE_ERROR,
  TIME_OPTIONS,
} from "@/lib/marketing/demo";
import { LEAD_FAILED } from "@/lib/marketing/lead-request";
import { fullTitle, isTranslated, DESCRIPTION_MAX, TITLE_MAX } from "@/lib/seo/metadata";

const FEATURES = {
  "/features/khata": KHATA_COPY,
  "/features/accounting": ACCOUNTING_COPY,
  "/features/e-invoicing": E_INVOICING_COPY,
  "/features/offline": OFFLINE_COPY,
  "/features/van-sales": VAN_SALES_COPY,
};
const LEAD_PAGES = {
  "/book-demo": BOOK_DEMO_COPY,
  "/get-a-call": GET_A_CALL_COPY,
  "/contact": CONTACT_COPY,
  "/about": ABOUT_COPY,
};

describe("pickCopy", () => {
  it("returns the locale's copy with its direction", () => {
    expect(pickCopy(KHATA_COPY, "ur")).toMatchObject({ lang: "ur", dir: "rtl", rtl: true });
    expect(pickCopy(KHATA_COPY, "ar").t.badge).toBe(KHATA_COPY.ar?.badge);
  });

  it("falls back to English (and LTR) for an unknown locale or missing copy", () => {
    expect(pickCopy(KHATA_COPY, "fr")).toMatchObject({ lang: "en", dir: "ltr" });
    expect(pickCopy({ en: { a: 1 } }, "ur")).toEqual({
      t: { a: 1 },
      lang: "en",
      dir: "ltr",
      rtl: false,
    });
  });

  it("points arrows the reading direction", () => {
    expect(forwardArrow(false)).toBe("→");
    expect(forwardArrow(true)).toBe("←");
    expect(backArrow(true)).toBe("→");
  });
});

describe("translated feature and lead pages", () => {
  const all = { ...FEATURES, ...LEAD_PAGES };

  it("are all in TRANSLATED_PATHS", () => {
    for (const path of Object.keys(all)) expect(isTranslated(path), path).toBe(true);
  });

  it("have Urdu and Arabic meta that fits Google's limits", () => {
    for (const [path, copy] of Object.entries(all)) {
      for (const l of ["en", "ur", "ar"] as const) {
        const meta = copy[l]?.meta;
        expect(meta, `${path} ${l}`).toBeDefined();
        expect(fullTitle(meta!.title).length, `${path} ${l} title`).toBeLessThanOrEqual(TITLE_MAX);
        expect(meta!.description.length, `${path} ${l} description`).toBeLessThanOrEqual(
          DESCRIPTION_MAX + 4 // a few invisible direction marks around phone numbers
        );
      }
    }
  });

  it("keep feature arrays the same length in every language (they line up with icons)", () => {
    for (const [path, copy] of Object.entries(FEATURES)) {
      for (const l of ["ur", "ar"] as const) {
        const t = copy[l]!;
        expect(t.audiences.length, path).toBe(copy.en.audiences.length);
        expect(t.panel.items.length, path).toBe(copy.en.panel.items.length);
        expect(t.mock.rows.length, path).toBe(copy.en.mock.rows.length);
        expect(t.faqs.length, path).toBe(copy.en.faqs.length);
        expect(t.solution.points.length, path).toBe(copy.en.solution.points.length);
        expect(Boolean(t.solution.note), path).toBe(Boolean(copy.en.solution.note));
      }
    }
    for (const l of ["ur", "ar"] as const) expect(ABOUT_COPY[l]!.facts).toHaveLength(5);
  });
});

describe("lead form words", () => {
  it("translates the server actions' English messages", () => {
    for (const msg of [
      "Please check the highlighted fields.",
      LEAD_FAILED,
      PHONE_ERROR,
      "Please enter your name.",
      "Please enter your business name.",
      "Please check your email address.",
    ]) {
      expect(localizeError(msg, "ur"), msg).not.toBe(msg);
      expect(localizeError(msg, "ar"), msg).not.toBe(msg);
      expect(localizeError(msg, "en")).toBe(msg);
    }
  });

  it("leaves unknown messages in English and never blanks a field", () => {
    expect(localizeError("Some backend message.", "ur")).toBe("Some backend message.");
    expect(localizeError(undefined, "ar")).toBeUndefined();
    expect(localizeErrors({ name: "Please enter your name.", city: "x" }, "ur")).toEqual({
      name: "براہِ کرم اپنا نام لکھیں۔",
      city: "x",
    });
  });

  it("keeps option values and only changes labels", () => {
    expect(businessTypeOptions("ur").map((o) => o.value)).toEqual(
      BUSINESS_TYPE_OPTIONS.map((o) => o.value)
    );
    expect(businessTypeOptions("en")).toEqual(BUSINESS_TYPE_OPTIONS);
    expect(branchOptions("ar").map((o) => o.value)).toEqual(BRANCH_OPTIONS.map((o) => o.value));
    expect(timeOptions("ur").map((o) => o.value)).toEqual(TIME_OPTIONS.map((o) => o.value));
    expect(timeOptions("ur")[0]!.label).not.toBe(TIME_OPTIONS[0].label);
  });

  it("has an optional mark in every language", () => {
    expect(pickCopy(SHARED_FORM_COPY, "en").t.optional).toBe("(optional)");
    expect(pickCopy(SHARED_FORM_COPY, "ur").t.optional).toBe("(اختیاری)");
    expect(pickCopy(SHARED_FORM_COPY, "ar").t.optional).toBe("(اختياري)");
  });
});
