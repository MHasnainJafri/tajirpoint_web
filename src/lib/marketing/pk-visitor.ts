/**
 * Is this visitor probably in Pakistan? (TP-491)
 *
 * Decided in the browser only, from the time zone and the browser language,
 * because the pricing pages are static / ISR: the server HTML must be the
 * same for everyone, so nothing here may run during render on the server.
 *
 * Pakistan when the time zone is Asia/Karachi, or a browser language is Urdu
 * (any "ur" tag) or English (Pakistan) "en-PK". A guess, used only to add the
 * PKR price next to USD — never to hide anything.
 */

export interface VisitorHints {
  timeZone?: string;
  languages?: readonly string[];
}

export function isPakistanVisitor(hints: VisitorHints): boolean {
  if (hints.timeZone === "Asia/Karachi") return true;
  return (hints.languages ?? []).some((tag) => {
    const lower = tag.toLowerCase().replace("_", "-");
    return lower === "ur" || lower.startsWith("ur-") || lower === "en-pk" || lower.startsWith("en-pk-");
  });
}

/** The current browser's hints. Call only on the client (inside an effect). */
export function readVisitorHints(): VisitorHints {
  let timeZone = "";
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    /* very old browsers */
  }
  const languages =
    typeof navigator === "undefined"
      ? []
      : navigator.languages?.length
        ? navigator.languages
        : [navigator.language].filter(Boolean);
  return { timeZone, languages };
}
