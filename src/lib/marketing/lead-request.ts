import { headers } from "next/headers";

/**
 * Shared plumbing for the lead forms' server actions (book a demo, call me
 * back): the backend base URL, the visitor's headers to pass through, and the
 * backend's 400 answer read back into field errors.
 *
 * Server-side so there is no CORS and the backend URL stays out of the bundle.
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.tajirpoint.com";

export async function forwardHeaders(): Promise<Record<string, string>> {
  const h = await headers();
  const out: Record<string, string> = { "Content-Type": "application/json" };
  // The backend throttles per IP; pass the visitor's through, not ours.
  const ip = h.get("x-forwarded-for") ?? h.get("x-real-ip");
  if (ip) out["X-Forwarded-For"] = ip;
  const ua = h.get("user-agent");
  if (ua) out["User-Agent"] = ua.slice(0, 300);
  return out;
}

/**
 * The backend's `{field: [message]}` body as `{field: message}`, keeping only
 * the fields the form shows (`known`) so a stray key never reaches the page.
 */
export async function fieldErrorsFromResponse<K extends string>(
  res: Response,
  known: readonly K[] | Record<K, unknown>
): Promise<Partial<Record<K, string>>> {
  const keys = new Set<string>(Array.isArray(known) ? known : Object.keys(known));
  const body = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  const fields: Partial<Record<K, string>> = {};
  if (body && typeof body === "object") {
    for (const [k, v] of Object.entries(body)) {
      const msg = Array.isArray(v) ? String(v[0]) : typeof v === "string" ? v : "";
      if (msg && keys.has(k)) fields[k as K] = msg;
    }
  }
  return fields;
}

/** The message shown when the lead could not be stored. */
export const LEAD_FAILED =
  "We could not save your request just now. Please message us on WhatsApp at +92 344 6800893 or email hello@tajirpoint.com.";
