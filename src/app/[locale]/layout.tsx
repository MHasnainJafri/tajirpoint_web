import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Guards the `[locale]` segment.
 *
 * With `localePrefix: "never"` the proxy rewrites `/about` to `/en/about`, so
 * in normal traffic this param is always a real locale. But the proxy matcher
 * skips any path containing a dot (`.*\\..*`), and those requests fall straight
 * through to this dynamic segment — `/llms.txt` matched `[locale]` with
 * locale="llms.txt" and rendered the homepage with a **200**. That is an
 * unbounded soft-404 surface (every `/anything.txt` was a crawlable duplicate
 * of the homepage) and it is why the llms.txt validator reported "missing H1,
 * no links": it was parsing our homepage HTML as Markdown.
 *
 * i18n/request.ts silently falls back to the default locale for unknown values,
 * so the bad param can never surface as an error on its own — the 404 has to be
 * raised here.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  return <>{children}</>;
}
