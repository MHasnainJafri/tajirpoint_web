import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/design/Icon";
import { BUSINESSES, businessLabel } from "@/lib/marketing/businesses";

/**
 * Every business in the catalog as a card linking to /business/<slug>.
 * Used by the home page ("Find your business") and the /business index.
 */
export function BusinessGrid({ locale, headingLevel = "h3" }: { locale: string; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-3">
      {BUSINESSES.map((b) => {
        const label = businessLabel(b, locale);
        return (
          <li key={b.slug}>
            <Link
              href={`/business/${b.slug}`}
              className="group flex h-full items-start gap-[14px] rounded-[18px] border border-[var(--color-line-2)] bg-white p-[18px] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[2px] hover:border-[var(--color-mint-line)] hover:shadow-[var(--shadow-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)]"
            >
              <span className="grid h-11 w-11 flex-none place-items-center rounded-[12px] bg-[var(--color-mint-soft)]">
                <Icon name={b.icon} size={22} />
              </span>
              <span className="min-w-0">
                <Heading className="text-[15.5px] font-bold tracking-[-0.01em] text-[var(--color-ink)]">
                  {label.name}
                </Heading>
                <span className="mt-1 block text-[13px] leading-[1.5] text-[var(--color-muted)]">{label.navLine}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
