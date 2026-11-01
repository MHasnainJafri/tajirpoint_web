import { z } from "zod";
import {
  BUSINESS_TYPE_OPTIONS,
  businessTypeSchema,
  countrySchema,
  emailSchema,
  nameSchema,
  phoneSchema,
  text,
} from "./demo";
import { countryForE164, phoneFromForm } from "./phone";
import type { Attribution } from "./utm";

/**
 * The short "Interested? We'll call you" form: validation and the payload for
 * `POST /api/v1/public/callback-request/` (same body and answers as the demo
 * request; stored as a "Call me back" lead for the sales team).
 *
 * Pure — shared by the server action, the client form and the unit tests.
 */

export const CallbackRequestSchema = z.object({
  business_name: z.string().trim().min(2, "Please enter your business name.").max(160),
  name: nameSchema,
  phone: phoneSchema,
  country: countrySchema,
  email: emailSchema,
  business_type: businessTypeSchema,
  message: text(3000),
  /** Honeypot: humans never see it. */
  company: text(200),
});

export type CallbackRequestInput = z.input<typeof CallbackRequestSchema>;
export type CallbackRequest = z.output<typeof CallbackRequestSchema>;
export type CallbackFieldErrors = Partial<Record<keyof CallbackRequest, string>>;

export function callbackFieldErrors(error: z.ZodError): CallbackFieldErrors {
  const out: CallbackFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof CallbackRequest | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

/** Reads the form's FormData into the schema's input shape. */
export function callbackInputFromForm(form: FormData): CallbackRequestInput {
  const s = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v : "";
  };
  const { phone, country } = phoneFromForm(form);
  return {
    business_name: s("business_name"),
    name: s("name"),
    phone,
    country,
    email: s("email"),
    business_type: s("business_type"),
    message: s("message"),
    company: s("company"),
  };
}

/** The body for POST /api/v1/public/callback-request/. */
export function callbackPayload(req: CallbackRequest, attribution: Attribution) {
  return {
    name: req.name,
    phone: req.phone,
    email: req.email,
    business_name: req.business_name,
    business_type: req.business_type,
    country: req.country || countryForE164(req.phone)?.iso2 || "",
    message: req.message,
    company: req.company,
    ...attribution,
  };
}

/**
 * The same lead for the demo-request endpoint, used only while the
 * call-back endpoint is not deployed yet (404/405), so no lead is lost.
 */
export function callbackAsDemoPayload(req: CallbackRequest, attribution: Attribution) {
  const business = BUSINESS_TYPE_OPTIONS.find((o) => o.value === req.business_type)?.label;
  return {
    ...callbackPayload(req, attribution),
    message: [
      "CALL-BACK REQUEST (sent from the 'We'll call you' form) — please phone them.",
      business ? `Business type: ${business}` : "",
      req.message,
    ]
      .filter(Boolean)
      .join("\n\n"),
  };
}
