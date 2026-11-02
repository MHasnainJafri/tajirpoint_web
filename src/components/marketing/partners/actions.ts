"use server";

import { submitCallbackRequest, type CallbackState } from "@/components/marketing/callback/actions";
import { partnerMessage } from "./partner-request";

/**
 * Partner enquiry: the call-back request with the message prefixed
 * "PARTNER:" (see partner-request.ts). Reuses the call-back action whole —
 * same validation, anti-spam honeypot, backend endpoint and fallback — so a
 * partner lead lands in the console Leads screen like every other lead.
 */
export async function submitPartnerRequest(
  prev: CallbackState | undefined,
  formData: FormData
): Promise<CallbackState> {
  const s = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v : "";
  };
  const data = new FormData();
  for (const [k, v] of formData.entries()) data.append(k, v);
  data.set(
    "message",
    partnerMessage({ type: s("partner_type"), area: s("area"), message: s("message") })
  );
  // A partner is not a shop: no business type.
  data.set("business_type", "");
  return submitCallbackRequest(prev, data);
}
