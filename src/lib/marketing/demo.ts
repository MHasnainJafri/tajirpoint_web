import { z } from "zod";
import { BUSINESSES, isBusinessSlug } from "./businesses";
import { emptyAttribution, type Attribution } from "./utm";

/**
 * The "Book a demo" form: options, validation and the payload sent to
 * `POST /api/v1/public/demo-request/` (see CONTRACT.md, "Leads").
 *
 * Pure — no React, no server-only imports — so the server action, the client
 * form and the unit tests all share one definition.
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

/** Business types for the select: the catalog plus "Other". */
export const BUSINESS_TYPE_OPTIONS = [
  ...BUSINESSES.map((b) => ({ value: b.slug as string, label: b.name })),
  { value: "other", label: "Something else" },
];

/** The `?type=` value if it names a catalog business, else "". */
export function preselectType(value: string | null | undefined): string {
  const v = (value ?? "").trim().toLowerCase();
  return isBusinessSlug(v) || v === "other" ? v : "";
}

/**
 * Turns what people type into something WhatsApp can dial.
 * "0344 6800893" → "+923446800893"; "92 344..." → "+92344..."; "+971 50..." kept.
 * Returns "" when it cannot be a phone number.
 */
export function normalizePhone(input: string): string {
  const raw = input.trim();
  if (!raw) return "";
  const plus = raw.startsWith("+") || raw.startsWith("00");
  let digits = raw.replace(/\D/g, "");
  if (raw.startsWith("00")) digits = digits.slice(2);
  if (!plus) {
    if (digits.startsWith("0") && digits.length === 11) digits = `92${digits.slice(1)}`;
    else if (digits.startsWith("3") && digits.length === 10) digits = `92${digits}`;
  }
  if (digits.length < 9 || digits.length > 15) return "";
  return `+${digits}`;
}

/** YYYY-MM-DD in the browser's local time zone. */
export function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * The next `days` days starting tomorrow, Sundays skipped (the team does not
 * run demos on Sunday). Computed in the browser — the page is static, so a
 * list built at build time would go stale.
 */
export function upcomingDays(from: Date, days = 14): Array<{ value: string; label: string }> {
  const out: Array<{ value: string; label: string }> = [];
  const fmt = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" });
  for (let i = 1; i <= days; i += 1) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    if (d.getDay() === 0) continue;
    out.push({ value: isoDate(d), label: fmt.format(d) });
  }
  return out;
}

const text = (max: number) => z.string().trim().max(max).default("");

export const DemoRequestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  phone: z
    .string()
    .trim()
    .transform((v) => normalizePhone(v))
    .refine((v) => v.length > 0, "Please enter a WhatsApp or phone number we can reach."),
  email: z
    .string()
    .trim()
    .max(200)
    .default("")
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Please check your email address."),
  business_name: text(160),
  business_type: z
    .string()
    .trim()
    .default("")
    .transform((v) => preselectType(v)),
  city: text(80),
  branches: z
    .string()
    .trim()
    .default("")
    .refine((v) => v === "" || BRANCH_OPTIONS.some((o) => o.value === v), "Pick how many shops you run."),
  current_pos: text(120),
  wants_migration: z.boolean().default(false),
  preferred_date: z
    .string()
    .trim()
    .default("")
    .refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Pick a day from the list."),
  preferred_time: z
    .string()
    .trim()
    .default("")
    .refine((v) => v === "" || TIME_OPTIONS.some((o) => o.value === v), "Pick a time of day."),
  message: text(3000),
  /** Honeypot: humans never see it. */
  company: text(200),
});

export type DemoRequestInput = z.input<typeof DemoRequestSchema>;
export type DemoRequest = z.output<typeof DemoRequestSchema>;

/** Field errors keyed by field name, first message only. */
export type FieldErrors = Partial<Record<keyof DemoRequest, string>>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof DemoRequest | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

/** Reads the form's FormData into the schema's input shape. */
export function demoInputFromForm(form: FormData): DemoRequestInput {
  const s = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v : "";
  };
  return {
    name: s("name"),
    phone: s("phone"),
    email: s("email"),
    business_name: s("business_name"),
    business_type: s("business_type"),
    city: s("city"),
    branches: s("branches"),
    current_pos: s("current_pos"),
    wants_migration: form.get("wants_migration") === "on" || form.get("wants_migration") === "true",
    preferred_date: s("preferred_date"),
    preferred_time: s("preferred_time"),
    message: s("message"),
    company: s("company"),
  };
}

/** Attribution fields posted alongside the form (hidden inputs). */
export function attributionFromForm(form: FormData): Attribution {
  const a = emptyAttribution();
  for (const key of Object.keys(a) as (keyof Attribution)[]) {
    const v = form.get(key);
    if (typeof v === "string") a[key] = v.trim().slice(0, 500);
  }
  return a;
}

/**
 * The body for POST /api/v1/public/demo-request/. `branches` goes as the
 * smallest count in the chosen band (the backend stores an integer); the band
 * itself is repeated in the message so nothing is lost.
 */
export function demoPayload(req: DemoRequest, attribution: Attribution) {
  const band = BRANCH_OPTIONS.find((o) => o.value === req.branches);
  return {
    name: req.name,
    phone: req.phone,
    email: req.email,
    business_name: req.business_name,
    business_type: req.business_type,
    city: req.city,
    country: req.phone.startsWith("+92") ? "PK" : "",
    branches: band ? band.count : null,
    current_pos: req.current_pos,
    wants_migration: req.wants_migration,
    preferred_date: req.preferred_date || null,
    preferred_time: req.preferred_time,
    message: [band && band.value !== "1" ? `Branches: ${band.label}` : "", req.message]
      .filter(Boolean)
      .join("\n\n"),
    company: req.company,
    ...attribution,
  };
}

/**
 * Plain-text summary used when the demo endpoint is not deployed yet and the
 * request falls back to the contact form endpoint (which only takes a message).
 */
export function demoSummary(req: DemoRequest, attribution: Attribution): string {
  const business = BUSINESS_TYPE_OPTIONS.find((o) => o.value === req.business_type)?.label ?? "";
  const time = TIME_OPTIONS.find((o) => o.value === req.preferred_time)?.label ?? "";
  const band = BRANCH_OPTIONS.find((o) => o.value === req.branches)?.label ?? "";
  const lines: Array<[string, string]> = [
    ["WhatsApp / phone", req.phone],
    ["Business", req.business_name],
    ["Business type", business],
    ["City", req.city],
    ["Shops", band],
    ["Current POS", req.current_pos],
    ["Move my data", req.wants_migration ? "Yes" : "No"],
    ["Preferred day", req.preferred_date],
    ["Preferred time", time],
    ["Campaign", [attribution.utm_source, attribution.utm_medium, attribution.utm_campaign].filter(Boolean).join(" / ")],
    ["Landing page", attribution.landing_page],
  ];
  const head = lines
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `Demo request\n\n${head}${req.message ? `\n\n${req.message}` : ""}`;
}
