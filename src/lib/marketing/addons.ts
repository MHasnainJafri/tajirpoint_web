import { cache } from "react";
import { z } from "zod";
import { ADDON_CONTENT, type AddonContent } from "@/content/addons";
import { ADDON_SNAPSHOT } from "@/content/addons/snapshot";
import type { AddonFaq, AddonFeatureCopy, AddonProblem, AddonStep } from "@/content/addons/types";
import { formatMoney } from "@/lib/api/plans";
import { deriveStatus, type AddonStatus } from "./addon-status";

/**
 * The add-on catalogue for the marketing site (owner, 1 Nov 2026: "the
 * extensions should come from the backend, with their icons and their status:
 * Contact us, Coming soon, or Active").
 *
 * The backend decides every fact that changes: which add-ons exist, their
 * names, icons, status, price and features (`GET /api/v1/public/extensions/`,
 * public, cached 5 min there). The site adds the long write-up per add-on
 * (`src/content/addons/*`), which the admin can override field by field with
 * the API's `marketing` object.
 *
 * Fail-soft everywhere: if the API cannot be reached, the pages use the
 * snapshot taken on 1 Nov 2026, so the build never fails on a network error
 * and a page is never empty.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.tajirpoint.com";

/** Seconds between background refreshes of the catalogue (ISR). */
export const ADDON_REVALIDATE = 600;

/* ── API row ──────────────────────────────────────────────────────── */

const ApiRowSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  category: z.string().default(""),
  category_label: z.string().default(""),
  tagline: z.string().default(""),
  description: z.string().default(""),
  icon_url: z.string().nullish(),
  is_free: z.boolean().default(true),
  billing_type: z.string().default("free"),
  price: z.union([z.string(), z.number()]).nullish(),
  currency_code: z.string().nullish(),
  availability: z.string().default("available"),
  is_installable: z.boolean().default(true),
  is_suspended: z.boolean().default(false),
  screenshots: z.array(z.unknown()).nullish(),
  features: z.array(z.string()).nullish(),
  // Added by backend feat/public-addon-status-2026-11-01. Optional: the site
  // keeps working against a backend that does not send them yet.
  status: z.string().nullish(),
  listing: z.string().nullish(),
  marketing: z.record(z.string(), z.unknown()).nullish(),
});

export type ApiAddonRow = z.input<typeof ApiRowSchema>;
type ParsedRow = z.output<typeof ApiRowSchema>;

/* ── Status ───────────────────────────────────────────────────────── */

export { ADDON_STATUSES, STATUS_LABEL, deriveStatus, type AddonStatus } from "./addon-status";

/* ── Groups (filter chips) ────────────────────────────────────────── */

/**
 * The API's categories are coarse ("integration" holds payments, online
 * store syncs and delivery apps alike), so the chips split them by what a
 * shop owner is looking for. An unknown category becomes its own chip with
 * the API's label, so a new backend category still shows.
 */
export interface AddonGroup {
  id: string;
  label: string;
}

const GROUP_LABELS: Record<string, string> = {
  business: "Business packs",
  payments: "Payments",
  "online-stores": "Online stores",
  delivery: "Delivery & couriers",
  accounting: "Accounting",
  customers: "Customers & offers",
  messaging: "Chat & calls",
  compliance: "Tax & compliance",
  reports: "Reports",
  integrations: "Integrations",
};

/** Chip order. Groups not listed here follow, in the order they appear. */
const GROUP_ORDER = Object.keys(GROUP_LABELS);

const CATEGORY_GROUP: Record<string, string> = {
  business_vertical: "business",
  accounting: "accounting",
  shipping: "delivery",
  communication: "messaging",
  marketing: "customers",
  tax_compliance: "compliance",
  "tax-compliance": "compliance",
  reporting: "reports",
  analytics: "reports",
};

/** Integration-category add-ons that belong with another group. */
const SLUG_GROUP: Record<string, string> = {
  hubrise: "delivery",
  "delivery-aggregator": "delivery",
  "time-promotions": "customers",
  "customer-portal": "customers",
  coupons: "customers",
};

function titleCase(s: string): string {
  return s
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function groupFor(row: {
  slug: string;
  category?: string;
  category_label?: string;
}): AddonGroup {
  const cat = (row.category ?? "").trim();
  let id = SLUG_GROUP[row.slug];
  if (!id && row.slug.endsWith("-payments")) id = "payments";
  if (!id && row.slug.endsWith("-sync")) id = "online-stores";
  if (!id) id = CATEGORY_GROUP[cat] ?? (cat === "integration" || !cat ? "integrations" : cat);
  const label = GROUP_LABELS[id] ?? (row.category_label?.trim() || titleCase(id));
  return { id, label };
}

/* ── Price ────────────────────────────────────────────────────────── */

/**
 * "Free", "$12/month", "$40 one-time". Never a bare number: the currency
 * travels with the price. A Contact us add-on with no listed price says
 * "Ask us" (setup may carry outside fees); an unreadable price says "Ask us".
 */
export function priceLabel(row: {
  is_free?: boolean;
  billing_type?: string;
  price?: string | number | null;
  currency_code?: string | null;
  status?: AddonStatus;
}): string {
  const amount = Number(row.price ?? 0);
  const free = row.billing_type === "free" || row.is_free === true || amount === 0;
  if (free) return row.status === "contact_us" ? "Ask us" : "Free";
  if (!Number.isFinite(amount) || amount < 0 || !row.currency_code) return "Ask us";
  const money = formatMoney(amount, row.currency_code);
  if (row.billing_type === "one_time") return `${money} one-time`;
  return `${money}/month`;
}

/**
 * Add-ons included in the free Light plan. Mirrors `LIGHT_EXTENSIONS` in the
 * backend's `domains/tenancy/management/commands/configure_plans.py`; every
 * other add-on needs the Shop plan or above.
 */
export const LIGHT_PLAN_ADDONS: readonly string[] = [
  "restaurant",
  "restaurant-toolbox",
  "pharmacy-pack",
  "route-dispatch",
  "cash-management",
  "coupons",
  "time-promotions",
];

export function planLine(slug: string): string {
  return LIGHT_PLAN_ADDONS.includes(slug)
    ? "Included with the free Light plan"
    : "Needs the Shop plan or above";
}

/* ── Catalogue item ───────────────────────────────────────────────── */

export interface Addon {
  slug: string;
  name: string;
  group: AddonGroup;
  /** One line for cards: admin override, then the site's headline, then the API tagline. */
  summary: string;
  description: string;
  iconUrl: string | null;
  status: AddonStatus;
  listing: string | null;
  price: string;
  /** Machine-readable price for structured data; null when there is none. */
  offer: { amount: string; currency: string; monthly: boolean } | null;
  apiFeatures: string[];
  /** The full write-up, with the admin's `marketing` overrides applied. */
  content: AddonContent;
  /** True when the page copy is the site's own write-up, false when built from the API row. */
  hasWriteUp: boolean;
}

const ALLOWED_ICON_HOSTS = new Set(["media.tajirpoint.com"]);

/** Only https icons from our media host: next/image refuses any other host. */
function safeIcon(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.protocol === "https:" && ALLOWED_ICON_HOSTS.has(u.hostname) ? u.toString() : null;
  } catch {
    return null;
  }
}

function toAddon(row: ParsedRow): Addon {
  const status = deriveStatus(row);
  const base = ADDON_CONTENT[row.slug];
  const content = applyMarketing(base ?? contentFromRow(row, status), row.marketing ?? {});
  const amount = Number(row.price ?? 0);
  const free = row.billing_type === "free" || row.is_free || amount === 0;
  const marketingTagline = str((row.marketing ?? {}).tagline);
  return {
    slug: row.slug,
    name: row.name.trim(),
    group: groupFor(row),
    summary: marketingTagline || base?.headline || row.tagline || row.description,
    description: row.description,
    iconUrl: safeIcon(row.icon_url),
    status,
    listing: row.listing ?? null,
    price: priceLabel({ ...row, status }),
    offer:
      status === "contact_us" && free
        ? null
        : free
          ? { amount: "0", currency: row.currency_code || "USD", monthly: false }
          : Number.isFinite(amount) && row.currency_code
            ? {
                amount: String(amount),
                currency: row.currency_code,
                monthly: row.billing_type !== "one_time",
              }
            : null,
    apiFeatures: (row.features ?? []).filter((f) => f.trim()),
    content,
    hasWriteUp: Boolean(base),
  };
}

function parseRows(raw: unknown): ParsedRow[] {
  const list =
    raw && typeof raw === "object" && Array.isArray((raw as { results?: unknown }).results)
      ? ((raw as { results: unknown[] }).results ?? [])
      : Array.isArray(raw)
        ? raw
        : [];
  const rows: ParsedRow[] = [];
  const seen = new Set<string>();
  for (const item of list) {
    const parsed = ApiRowSchema.safeParse(item);
    if (!parsed.success || seen.has(parsed.data.slug)) continue;
    seen.add(parsed.data.slug);
    rows.push(parsed.data);
  }
  return rows;
}

/**
 * Builds the catalogue from raw API JSON (or the snapshot). Rows listed
 * `when_installed` are left out: the backend keeps them only for shops that
 * already have them. Pure, for the unit tests.
 */
export function buildCatalogue(raw: unknown): Addon[] {
  return parseRows(raw)
    .filter((r) => r.listing !== "when_installed")
    .map(toAddon)
    .sort(compareAddons);
}

const STATUS_ORDER: Record<AddonStatus, number> = {
  active: 0,
  contact_us: 1,
  coming_soon: 2,
  unavailable: 3,
};

function groupRank(id: string): number {
  const i = GROUP_ORDER.indexOf(id);
  return i === -1 ? GROUP_ORDER.length : i;
}

function compareAddons(a: Addon, b: Addon): number {
  return (
    groupRank(a.group.id) - groupRank(b.group.id) ||
    a.group.id.localeCompare(b.group.id) ||
    STATUS_ORDER[a.status] - STATUS_ORDER[b.status] ||
    a.name.localeCompare(b.name)
  );
}

export interface AddonCatalogue {
  addons: Addon[];
  /** "api" when read live, "snapshot" when the API could not be read. */
  source: "api" | "snapshot";
}

/**
 * The catalogue, server-side with ISR. Every failure (network, timeout,
 * non-200, bad JSON, empty list) falls back to the snapshot.
 */
export const getAddonCatalogue = cache(async (): Promise<AddonCatalogue> => {
  try {
    const res = await fetch(`${API_BASE}/api/v1/public/extensions/`, {
      next: { revalidate: ADDON_REVALIDATE, tags: ["addons"] },
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const addons = buildCatalogue(await res.json());
      if (addons.length > 0) return { addons, source: "api" };
    }
  } catch {
    // Fall through to the snapshot.
  }
  return { addons: buildCatalogue({ results: ADDON_SNAPSHOT }), source: "snapshot" };
});

export async function getAddon(slug: string): Promise<Addon | undefined> {
  const { addons } = await getAddonCatalogue();
  return addons.find((a) => a.slug === slug);
}

/** Up to `limit` other add-ons, same group first, then available ones. */
export function relatedAddons(addon: Addon, all: Addon[], limit = 3): Addon[] {
  const others = all.filter((a) => a.slug !== addon.slug);
  const same = others.filter((a) => a.group.id === addon.group.id);
  const rest = others
    .filter((a) => a.group.id !== addon.group.id && a.status === "active")
    .slice(0, limit);
  return [...same, ...rest].slice(0, limit);
}

/* ── Copy for an add-on the site has no write-up for ─────────────── */

function contentFromRow(row: ParsedRow, status: AddonStatus): AddonContent {
  const name = row.name.trim();
  const features = (row.features ?? []).filter((f) => f.trim());
  const soon = status === "coming_soon";
  const team = status === "contact_us";
  return {
    slug: row.slug,
    seoTitle: `${name} Add-on`,
    seoDescription: (row.tagline || row.description || `${name} add-on for your POS.`).slice(
      0,
      160
    ),
    keywords: [name, `${name} add-on`, `${name} POS`],
    schemaSubCategory: `${row.category_label || "Business"} add-on for POS`,
    headline: row.tagline || name,
    overview: [row.description || row.tagline].filter(Boolean),
    whoFor: [],
    problems: [],
    features: features.map((f) => ({ title: f, body: "" })),
    howItWorks: soon
      ? [
          {
            title: "Tell us you want it",
            body: "Ask for a call back and we will let you know as soon as it is ready.",
          },
          {
            title: "We set it up with you",
            body: "Once it is live, our team helps you switch it on for your shop.",
          },
        ]
      : team
        ? [
            { title: "Ask us", body: "Leave your number and our team calls you back." },
            {
              title: "We set it up with you",
              body: "We connect the add-on to your shop and check it works.",
            },
            { title: "Start using it", body: "Your team uses it from the usual screens." },
          ]
        : [
            { title: "Sign up", body: "Create your account and set up your shop." },
            {
              title: "Switch it on",
              body: `Open the Add-ons page in the back office and install ${name}.`,
            },
            {
              title: "Start using it",
              body: "The new screens appear for your team straight away.",
            },
          ],
    needs: [],
    setup: [],
    faqs: [],
    ...(soon
      ? {
          comingSoonNote: "Not open to shops yet. Ask us and we will tell you when it is ready.",
        }
      : {}),
  };
}

/* ── The admin's `marketing` overrides ────────────────────────────── */

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function strList(v: unknown): string[] | null {
  if (typeof v === "string" && v.trim()) return [v.trim()];
  if (!Array.isArray(v)) return null;
  const out = v.map(str).filter(Boolean);
  return out.length ? out : null;
}

function pairList<T>(
  v: unknown,
  keys: [string[], string[]],
  make: (a: string, b: string) => T
): T[] | null {
  if (!Array.isArray(v)) return null;
  const out: T[] = [];
  for (const item of v) {
    if (typeof item === "string" && item.trim()) {
      out.push(make(item.trim(), ""));
      continue;
    }
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const a = keys[0].map((k) => str(rec[k])).find(Boolean) ?? "";
    const b = keys[1].map((k) => str(rec[k])).find(Boolean) ?? "";
    if (a) out.push(make(a, b));
  }
  return out.length ? out : null;
}

const pick = (m: Record<string, unknown>, ...keys: string[]) =>
  keys.map((k) => m[k]).find((v) => v !== undefined && v !== null);

/**
 * Applies the API's `marketing` object over the site's copy. Each field the
 * admin fills in replaces the site's; anything empty or malformed is ignored.
 * Accepts snake_case and camelCase keys, and `{q, a}` or `{question, answer}`
 * FAQs. Pure, for the unit tests.
 */
export function applyMarketing(
  base: AddonContent,
  marketing: Record<string, unknown>
): AddonContent {
  if (!marketing || typeof marketing !== "object") return base;
  const m = marketing;
  const out: AddonContent = { ...base };

  const headline = str(pick(m, "headline", "tagline"));
  if (headline) out.headline = headline;
  const seoTitle = str(pick(m, "seo_title", "seoTitle"));
  if (seoTitle) out.seoTitle = seoTitle;
  const seoDescription = str(pick(m, "seo_description", "seoDescription"));
  if (seoDescription) out.seoDescription = seoDescription;
  const note = str(pick(m, "coming_soon_note", "comingSoonNote"));
  if (note) out.comingSoonNote = note;

  out.overview = strList(pick(m, "overview", "what_it_is", "whatItIs")) ?? out.overview;
  out.whoFor = strList(pick(m, "who_for", "whoFor", "audience")) ?? out.whoFor;
  out.needs = strList(pick(m, "needs", "requirements", "what_you_need")) ?? out.needs;
  out.setup = strList(pick(m, "setup", "pricing", "pricing_setup")) ?? out.setup;
  out.keywords = strList(pick(m, "keywords")) ?? out.keywords;

  out.problems =
    pairList<AddonProblem>(
      pick(m, "problems"),
      [
        ["problem", "title"],
        ["fix", "solution", "body"],
      ],
      (problem, fix) => ({ problem, fix })
    ) ?? out.problems;
  out.features =
    pairList<AddonFeatureCopy>(
      pick(m, "features", "highlights"),
      [
        ["title", "name"],
        ["body", "description", "text"],
      ],
      (title, body) => ({ title, body })
    ) ?? out.features;
  out.howItWorks =
    pairList<AddonStep>(
      pick(m, "how_it_works", "howItWorks", "steps"),
      [
        ["title", "step"],
        ["body", "description", "text"],
      ],
      (title, body) => ({ title, body })
    ) ?? out.howItWorks;
  const faqs = pairList<AddonFaq>(
    pick(m, "faqs", "faq"),
    [
      ["q", "question"],
      ["a", "answer"],
    ],
    (q, a) => ({ q, a })
  )?.filter((f) => f.a);
  if (faqs?.length) out.faqs = faqs;

  return out;
}
