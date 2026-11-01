"use server";

import {
  CallbackRequestSchema,
  callbackAsDemoPayload,
  callbackFieldErrors,
  callbackInputFromForm,
  callbackPayload,
  type CallbackFieldErrors,
} from "@/lib/marketing/callback";
import { attributionFromForm } from "@/lib/marketing/demo";
import {
  API_BASE,
  LEAD_FAILED,
  fieldErrorsFromResponse,
  forwardHeaders,
} from "@/lib/marketing/lead-request";

export type CallbackState = {
  ok?: boolean;
  error?: string;
  fields?: CallbackFieldErrors;
  /** Echoed back for the success screen's analytics — no personal data. */
  summary?: { businessType: string };
};

/**
 * "We'll call you" — posts to the backend's call-back endpoint, the same way
 * the demo form posts to demo-request (same anti-spam, same answers).
 */
export async function submitCallbackRequest(
  _prev: CallbackState | undefined,
  formData: FormData
): Promise<CallbackState> {
  const parsed = CallbackRequestSchema.safeParse(callbackInputFromForm(formData));
  if (!parsed.success) {
    return {
      error: "Please check the highlighted fields.",
      fields: callbackFieldErrors(parsed.error),
    };
  }
  const req = parsed.data;
  const attribution = attributionFromForm(formData);
  const summary = { businessType: req.business_type };

  // Honeypot filled: look successful, send nothing.
  if (req.company) return { ok: true, summary };

  const failed: CallbackState = { error: LEAD_FAILED };

  try {
    const hdrs = await forwardHeaders();
    const res = await fetch(`${API_BASE}/api/v1/public/callback-request/`, {
      method: "POST",
      headers: hdrs,
      body: JSON.stringify(callbackPayload(req, attribution)),
      cache: "no-store",
    });
    if (res.ok) return { ok: true, summary };

    if (res.status === 400) {
      const fields: CallbackFieldErrors = await fieldErrorsFromResponse(res, req);
      return { error: "Please check the highlighted fields.", fields };
    }

    // Endpoint not deployed yet (404/405): store it as a demo request marked
    // "call-back" so the lead still reaches the console.
    if (res.status === 404 || res.status === 405) {
      const fallback = await fetch(`${API_BASE}/api/v1/public/demo-request/`, {
        method: "POST",
        headers: hdrs,
        body: JSON.stringify(callbackAsDemoPayload(req, attribution)),
        cache: "no-store",
      });
      if (fallback.ok) return { ok: true, summary };
    }
    return failed;
  } catch {
    return failed;
  }
}
