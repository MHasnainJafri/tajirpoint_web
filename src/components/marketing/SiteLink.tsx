import type { ComponentProps } from "react";
import NextLink from "next/link";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { linkLocale } from "@/lib/seo/translated-paths";

/**
 * `Link` for the header and footer: on an Urdu or Arabic page it keeps the
 * page's language only for translated targets and sends everything else to
 * the English URL (the canonical one), marked hrefLang="en".
 *
 * The English link is a plain `next/link` to the bare path: next-intl's `Link`
 * with `locale="en"` writes `/en/…`, which the middleware then redirects to
 * the bare path (English needs no prefix, and language detection is off).
 */
export function SiteLink({ href, locale, ...rest }: ComponentProps<typeof Link>) {
  const current = useLocale();
  if (locale !== undefined || typeof href !== "string") {
    return <Link href={href} locale={locale} {...rest} />;
  }
  if (linkLocale(href, current) === current) return <Link href={href} {...rest} />;
  return <NextLink href={href} hrefLang="en" {...rest} />;
}
