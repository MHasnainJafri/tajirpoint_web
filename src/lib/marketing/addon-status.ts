/**
 * Add-on status, kept apart from `addons.ts` so client components (the
 * catalogue browser, the badge) can read it without pulling the whole
 * write-up into the browser bundle.
 */

export const ADDON_STATUSES = ["active", "contact_us", "coming_soon", "unavailable"] as const;
export type AddonStatus = (typeof ADDON_STATUSES)[number];

export const STATUS_LABEL: Record<AddonStatus, string> = {
  active: "Available",
  contact_us: "Contact us",
  coming_soon: "Coming soon",
  unavailable: "Unavailable",
};

/**
 * The server's `status` when it sends one. Otherwise the same order the
 * backend uses (`_marketing_status`), minus the Contact us rule, which only
 * the backend knows: coming soon, then suspended, then available.
 */
export function deriveStatus(row: {
  status?: string | null;
  availability?: string | null;
  is_suspended?: boolean | null;
}): AddonStatus {
  const s = (row.status ?? "").trim();
  if ((ADDON_STATUSES as readonly string[]).includes(s)) return s as AddonStatus;
  if (row.availability === "coming_soon") return "coming_soon";
  if (row.is_suspended) return "unavailable";
  return "active";
}
