// Tiny on purpose: the nav is a client component, so it imports this file
// and never the guides themselves (which would ship every guide to the browser).

/**
 * "Guides" for the nav and footer, per locale. Kept here (not in
 * messages/*.json) so this lane does not touch the shared message files.
 */
type NavLabel = { title: string; sub: string };

const EN: NavLabel = { title: "Guides", sub: "FBR, khata, stock and restaurant how-tos." };

const NAV_LABELS: Record<string, NavLabel> = {
  en: EN,
  ur: { title: "گائیڈز", sub: "ایف بی آر، کھاتہ، اسٹاک اور ریسٹورنٹ کی رہنمائی۔" },
  ar: { title: "الأدلة", sub: "أدلة عملية للمتاجر والمطاعم." },
};

export function guidesNavLabel(locale: string): NavLabel {
  return NAV_LABELS[locale] ?? EN;
}
