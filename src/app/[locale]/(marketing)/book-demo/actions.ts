"use server";

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
import {
  API_BASE,
  LEAD_FAILED,
  fieldErrorsFromResponse,
  forwardHeaders,
} from "@/lib/marketing/lead-request";

export type DemoState = {
  ok?: boolean;
  error?: string;
  fields?: FieldErrors;
  /** Echoed back for the success screen's analytics — no personal data. */
  summary?: { businessType: string; wantsMigration: boolean; branches: string };
};

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

  const failed: DemoState = { error: LEAD_FAILED };

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
      const fields: FieldErrors = await fieldErrorsFromResponse(res, req);
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
