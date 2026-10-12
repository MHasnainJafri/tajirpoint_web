"use server";

import { headers } from "next/headers";
import { getBusiness } from "@/lib/marketing/businesses";
import {
  DemoRequestSchema,
  attributionFromForm,
  demoInputFromForm,
  demoPayload,
  demoSummary,
  fieldErrors,
  type FieldErrors,
} from "@/lib/marketing/demo";

// Server-side so there is no CORS and the backend URL stays out of the bundle.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.tajirpoint.com";

export type DemoState = {
  ok?: boolean;
  error?: string;
  fields?: FieldErrors;
  /** Echoed back for the success screen's analytics — no personal data. */
  summary?: { businessType: string; wantsMigration: boolean; branches: string };
};

async function forwardHeaders(): Promise<Record<string, string>> {
  const h = await headers();
  const out: Record<string, string> = { "Content-Type": "application/json" };
  // The backend throttles per IP; pass the visitor's through, not ours.
  const ip = h.get("x-forwarded-for") ?? h.get("x-real-ip");
  if (ip) out["X-Forwarded-For"] = ip;
  const ua = h.get("user-agent");
  if (ua) out["User-Agent"] = ua.slice(0, 300);
  return out;
}

export async function submitDemoRequest(
  _prev: DemoState | undefined,
  formData: FormData
): Promise<DemoState> {
  const parsed = DemoRequestSchema.safeParse(demoInputFromForm(formData));
  if (!parsed.success) {
    return { error: "Please check the highlighted fields.", fields: fieldErrors(parsed.error) };
  }
  const req = parsed.data;
  const attribution = attributionFromForm(formData);
  const summary = {
    businessType: req.business_type,
    wantsMigration: req.wants_migration,
    branches: req.branches,
  };

  // Honeypot filled: look successful, send nothing.
  if (req.company) return { ok: true, summary };

  const failed: DemoState = {
    error:
      "We could not save your request just now. Please message us on WhatsApp at +92 344 6800893 or email hello@tajirpoint.com.",
  };

  try {
    const hdrs = await forwardHeaders();
    const res = await fetch(`${API_BASE}/api/v1/public/demo-request/`, {
      method: "POST",
      headers: hdrs,
      body: JSON.stringify(demoPayload(req, attribution)),
      cache: "no-store",
    });
    if (res.ok) return { ok: true, summary };

    if (res.status === 400) {
      const body = (await res.json().catch(() => null)) as Record<string, unknown> | null;
      const fields: FieldErrors = {};
      if (body && typeof body === "object") {
        for (const [k, v] of Object.entries(body)) {
          const msg = Array.isArray(v) ? String(v[0]) : typeof v === "string" ? v : "";
          if (msg && k in req) fields[k as keyof FieldErrors] = msg;
        }
      }
      return { error: "Please check the highlighted fields.", fields };
    }

    // Endpoint not deployed yet (404/405): fall back to the contact endpoint
    // so the lead still reaches hello@tajirpoint.com. That endpoint needs an
    // email address.
    if ((res.status === 404 || res.status === 405) && req.email) {
      const label = getBusiness(req.business_type)?.contactLabel ?? "Other";
      const fallback = await fetch(`${API_BASE}/api/v1/public/contact/`, {
        method: "POST",
        headers: hdrs,
        body: JSON.stringify({
          name: req.name,
          email: req.email,
          phone: req.phone,
          business: label,
          subject: `Demo request — ${req.business_name || req.name}`,
          message: demoSummary(req, attribution),
          company: "",
          ...attribution,
        }),
        cache: "no-store",
      });
      if (fallback.ok) return { ok: true, summary };
    }
    return failed;
  } catch {
    return failed;
  }
}
