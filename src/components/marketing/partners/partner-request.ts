/**
 * The partner enquiry (/partners): which kinds of partner we ask about, and
 * how the extra answers travel. Pure, so the server action and a unit test
 * can share it.
 *
 * There is no partner endpoint on the backend: the enquiry goes through the
 * call-back request (`POST /api/v1/public/callback-request/`), the same as
 * "We'll call you", with the message starting "PARTNER:" so the sales team
 * can see at a glance in the console Leads screen that it is a partner, not a
 * shop.
 */

export const PARTNER_TYPES = [
  { value: "reseller", label: "Reseller — I sell software or hardware to shops" },
  { value: "implementation", label: "Setup partner — I set up and train shops" },
  { value: "hardware", label: "POS hardware seller" },
  { value: "accountant", label: "Accountant or bookkeeper" },
  { value: "other", label: "Something else" },
] as const;

export type PartnerType = (typeof PARTNER_TYPES)[number]["value"];

export const PARTNER_PREFIX = "PARTNER:";

/** The label for a partner type, or "" for an unknown value. */
export function partnerTypeLabel(value: string): string {
  return PARTNER_TYPES.find((t) => t.value === value)?.label ?? "";
}

/**
 * The message stored with the lead: the PARTNER: line first (type and area),
 * then whatever the person wrote. Capped well under the 3000-character limit
 * of the call-back message.
 */
export function partnerMessage(input: { type: string; area: string; message: string }): string {
  const type = partnerTypeLabel(input.type) || "Not said";
  const area = input.area.trim().slice(0, 120) || "Not said";
  const head = `${PARTNER_PREFIX} ${type} | Area: ${area}`;
  const body = input.message.trim().slice(0, 2500);
  return body ? `${head}\n\n${body}` : head;
}
