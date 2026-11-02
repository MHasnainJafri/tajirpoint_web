/**
 * Footer labels for the pages added on 2 Nov 2026 (/changelog, /partners).
 * Kept here instead of messages/*.json so parallel work on the message files
 * does not conflict; move them into `footer.links` when convenient.
 *
 * Note: there is deliberately NO status page link — TajirPoint has no public
 * status page yet. Do not add /status until one exists.
 */
export const EXTRA_FOOTER_LINKS: ReadonlyArray<{
  href: string;
  label: Record<string, string>;
}> = [
  {
    href: "/changelog",
    label: { en: "What's new", ur: "نیا کیا ہے", ar: "ما الجديد" },
  },
  {
    href: "/partners",
    label: { en: "Partners", ur: "پارٹنرز", ar: "الشركاء" },
  },
];

export function footerLabel(label: Record<string, string>, locale: string): string {
  return label[locale] ?? label.en ?? "";
}
