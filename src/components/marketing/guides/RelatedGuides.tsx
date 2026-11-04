import { Link } from "@/i18n/navigation";
import { getGuide, readMinutes, type Guide } from "@/content/guides";
import { GUIDE_PLACEMENT } from "@/content/guides/placement";

/**
 * "Related guides": up to three guide cards for the page at `path`, from
 * GUIDE_PLACEMENT. English pages only — the guides are written in English,
 * and an English block on an Urdu or Arabic page would read as a mistake.
 * Renders nothing for a page with no placement.
 */
export function RelatedGuides({ path, locale }: { path: string; locale: string }) {
  if (locale !== "en") return null;
  const guides = (GUIDE_PLACEMENT[path] ?? [])
    .map(getGuide)
    .filter((g): g is Guide => Boolean(g))
    .slice(0, 3);
  if (!guides.length) return null;

  return (
    <section
      aria-labelledby="related-guides-title"
      className="mx-auto max-w-[1240px] px-[clamp(14px,3vw,24px)] pt-[clamp(56px,8vw,96px)]"
    >
      <h2
        id="related-guides-title"
        className="text-[clamp(22px,2.8vw,32px)] font-bold tracking-[-0.03em] text-[var(--color-ink)]"
      >
        Related guides
      </h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="flex h-full flex-col rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5 transition-[border-color,transform] duration-200 hover:-translate-y-[2px] hover:border-[var(--color-mint-line)]"
            >
              <span className="text-[12.5px] font-semibold text-[var(--color-mint-2)]">
                {g.category}
              </span>
              <h3 className="mt-2 text-[17px] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--color-ink)]">
                {g.title}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-[var(--color-body)]">
                {g.summary}
              </p>
              <span className="mt-4 text-[13px] font-semibold text-[var(--color-ink-3)]">
                {readMinutes(g)} min read · Read the guide <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
