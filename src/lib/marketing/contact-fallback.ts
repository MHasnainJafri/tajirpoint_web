import { legal } from "@/lib/config/site";

/**
 * The "write to us instead" sentences the lead forms send back when the
 * backend cannot be reached, in English (the server actions return these and
 * src/content/i18n/lead-pages/forms.ts translates them by exact match). The
 * WhatsApp half is left out for a brand without a WhatsApp line.
 */
const wa = legal.whatsappDisplay;

export const LEAD_FAILED = wa
  ? `We could not save your request just now. Please message us on WhatsApp at ${wa} or email ${legal.email}.`
  : `We could not save your request just now. Please email ${legal.email}.`;

export const SEND_FAILED = wa
  ? `Could not send your message. Please email ${legal.email} or WhatsApp ${wa}.`
  : `Could not send your message. Please email ${legal.email}.`;

export const SERVER_UNREACHABLE = wa
  ? `Could not reach the server. Please email ${legal.email} or WhatsApp ${wa}.`
  : `Could not reach the server. Please email ${legal.email}.`;

/** The end of the error pages' "please try again" sentence. */
export const ERROR_REACH = wa ? `WhatsApp us at ${wa}.` : `email us at ${legal.email}.`;
