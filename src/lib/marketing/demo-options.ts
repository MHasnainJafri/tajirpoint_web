/**
 * Demo / call-back form options with no imports, so browser code (the shared
 * form copy in src/content/i18n/lead-pages/forms.ts, used by Field and
 * PhoneField on every page) can read them without pulling zod and the
 * business catalogue in through demo.ts. demo.ts re-exports these.
 */
export const BRANCH_OPTIONS = [
  { value: "1", label: "1 shop", count: 1 },
  { value: "2-5", label: "2–5 shops", count: 2 },
  { value: "6+", label: "6 or more", count: 6 },
] as const;

export const TIME_OPTIONS = [
  { value: "morning", label: "Morning (10 am – 1 pm)" },
  { value: "afternoon", label: "Afternoon (1 pm – 5 pm)" },
  { value: "evening", label: "Evening (5 pm – 8 pm)" },
] as const;

export type BranchOption = (typeof BRANCH_OPTIONS)[number]["value"];
export type TimeOption = (typeof TIME_OPTIONS)[number]["value"];

export const PHONE_ERROR = "Choose your country code and enter your number (7–15 digits).";
