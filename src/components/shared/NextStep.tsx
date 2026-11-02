import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/config/site";
import { uxCopy } from "@/content/ux/copy";

/**
 * The page's next step as a row of buttons: Start free (the app's sign-up)
 * plus "Book a demo" and/or "Get a call". Used in page headers that had no
 * button above the fold. Clicks are counted by SiteTracking under `location`.
 *
 * Every button is at least 44px tall and the row wraps, so it fits a 360px
 * phone in any language.
 */
export function NextStep({
  locale,
  location,
  secondary = ["call"],
  align = "center",
  className = "",
}: {
  locale: string;
  /** Analytics label, e.g. "extensions_header". */
  location: string;
  /** Which of the two softer actions to show after Start free. */
  secondary?: Array<"demo" | "call">;
  align?: "center" | "start";
  className?: string;
}) {
  const c = uxCopy(locale);
  const ghost =
    "inline-flex min-h-[44px] max-w-full items-center justify-center rounded-full border border-[var(--color-line-3)] bg-[var(--color-bg-2)] px-6 py-3 text-center text-[15px] font-semibold text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--color-surface)]";
  return (
    <div
      data-track={location}
      className={`relative flex flex-wrap gap-[10px] ${align === "center" ? "justify-center" : ""} ${className}`}
    >
      <a
        href={siteConfig.signupUrl}
        className="inline-flex min-h-[44px] max-w-full items-center justify-center rounded-full bg-[var(--color-mint)] px-6 py-3 text-center text-[15px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(0,210,122,.35)]"
      >
        {c.startFree}
      </a>
      {secondary.includes("demo") && (
        <Link href={siteConfig.demoPath} className={ghost}>
          {c.bookDemo}
        </Link>
      )}
      {secondary.includes("call") && (
        <Link href="/get-a-call" className={ghost}>
          {c.getACall}
        </Link>
      )}
    </div>
  );
}
