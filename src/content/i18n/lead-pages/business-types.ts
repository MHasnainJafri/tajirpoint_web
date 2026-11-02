import { BUSINESSES, businessLabel } from "@/lib/marketing/businesses";
import { pickCopy } from "../page-copy";
import { SHARED_FORM_COPY } from "./forms";

/**
 * Business-type options in the visitor's language (values unchanged).
 *
 * Kept out of forms.ts on purpose: it needs the whole business catalogue, and
 * forms.ts is loaded in the browser by Field and PhoneField on every page.
 * Server files call this and pass the list down (CallbackForm `typeOptions`).
 */
export function businessTypeOptions(locale: string): Array<{ value: string; label: string }> {
  const shared = pickCopy(SHARED_FORM_COPY, locale).t;
  return [
    ...BUSINESSES.map((b) => ({ value: b.slug as string, label: businessLabel(b, locale).name })),
    { value: "other", label: shared.somethingElse },
  ];
}
