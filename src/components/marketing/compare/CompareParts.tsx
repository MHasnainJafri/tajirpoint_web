import { Check, ChevronDown, Clock, Minus, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Cell, Comparison, Faq, Mark, Source } from "@/content/compare";
import { CHECKED, CHECKED_ISO, getComparison } from "@/content/compare";

/**
 * Building blocks of the /compare pages. Server components only: no client JS.
 *
 * The feature table is a real <table> from md up and a stack of cards below
 * it, so nothing ever scrolls sideways at 360 px.
 */

const MARK_LABEL: Record<Mark, string> = {
  yes: "Yes",
  partial: "Partly",
  soon: "Coming soon",
  no: "No",
  info: "",
};

const MARK_STYLE: Record<Mark, string> = {
  yes: "bg-[var(--color-mint-soft)] text-[var(--color-mint-2)]",
  partial: "bg-[rgba(245,166,35,.14)] text-[var(--color-ink-2)]",
  soon: "bg-[var(--surface-2,rgba(0,0,0,.05))] text-[var(--color-ink-3)]",
  no: "bg-[var(--surface-2,rgba(0,0,0,.05))] text-[var(--color-muted)]",
  info: "",
};

function MarkIcon({ mark }: { mark: Mark }) {
  const cls = "h-[13px] w-[13px] shrink-0";
  if (mark === "yes") return <Check className={cls} strokeWidth={2.6} aria-hidden="true" />;
  if (mark === "partial") return <Minus className={cls} strokeWidth={2.6} aria-hidden="true" />;
  if (mark === "soon") return <Clock className={cls} strokeWidth={2.2} aria-hidden="true" />;
  if (mark === "no") return <X className={cls} strokeWidth={2.6} aria-hidden="true" />;
  return null;
}

export function MarkChip({ mark }: { mark: Mark }) {
  if (mark === "info") return null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-[2px] text-[11.5px] font-bold ${MARK_STYLE[mark]}`}
    >
      <MarkIcon mark={mark} />
      {MARK_LABEL[mark]}
    </span>
  );
}

function CellBody({ cell }: { cell: Cell }) {
  return (
    <div className="flex min-w-0 flex-col items-start gap-[6px]">
      <MarkChip mark={cell.mark} />
      <span className="break-words text-[14px] leading-[1.55] text-[var(--color-body)]">
        {cell.text}
        {cell.source ? (
          <>
            {" "}
            <a
              href={`#source-${cell.source}`}
              className="whitespace-nowrap align-super text-[11px] font-semibold text-[var(--color-mint-2)] underline-offset-2 hover:underline"
              aria-label={`Source ${cell.source}`}
            >
              [{cell.source}]
            </a>
          </>
        ) : null}
        {cell.href ? (
          <>
            {" "}
            <Link
              href={cell.href}
              className="whitespace-nowrap text-[12.5px] font-semibold text-[var(--color-mint-2)] underline-offset-2 hover:underline"
            >
              More →
            </Link>
          </>
        ) : null}
      </span>
    </div>
  );
}

export function CompareTable({ c }: { c: Comparison }) {
  return (
    <>
      {/* Phones: one card per feature. */}
      <ul className="flex flex-col gap-3 md:hidden">
        {c.rows.map((row) => (
          <li
            key={row.feature}
            className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-4"
          >
            <div className="text-[15px] font-bold text-[var(--color-ink)]">{row.feature}</div>
            <div className="mt-3 grid gap-3">
              <div>
                <div className="mb-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-mint-2)]">
                  TajirPoint
                </div>
                <CellBody cell={row.tajirpoint} />
              </div>
              <div className="border-t border-[var(--color-line-soft)] pt-3">
                <div className="mb-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                  {c.otherName}
                </div>
                <CellBody cell={row.other} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Tablets and up: a real table. */}
      <div className="hidden overflow-hidden rounded-[18px] border border-[var(--color-line)] md:block">
        <table className="w-full table-fixed border-collapse text-start">
          <caption className="sr-only">
            {`TajirPoint compared with ${c.otherName}, feature by feature`}
          </caption>
          <colgroup>
            <col className="w-[26%]" />
            <col className="w-[37%]" />
            <col className="w-[37%]" />
          </colgroup>
          <thead>
            <tr className="bg-[var(--color-bg-2)]">
              <th
                scope="col"
                className="p-4 text-start text-[13px] font-semibold text-[var(--color-muted)]"
              >
                Feature
              </th>
              <th
                scope="col"
                className="p-4 text-start text-[14px] font-bold text-[var(--color-mint-2)]"
              >
                TajirPoint
              </th>
              <th
                scope="col"
                className="p-4 text-start text-[14px] font-bold text-[var(--color-ink)]"
              >
                {c.otherName}
              </th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map((row) => (
              <tr key={row.feature} className="border-t border-[var(--color-line-soft)] align-top">
                <th
                  scope="row"
                  className="p-4 text-start text-[14.5px] font-bold text-[var(--color-ink)]"
                >
                  {row.feature}
                </th>
                <td className="p-4">
                  <CellBody cell={row.tajirpoint} />
                </td>
                <td className="p-4">
                  <CellBody cell={row.other} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/** Numbered list of the public pages behind every competitor fact. */
export function SourcesList({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <section aria-labelledby="sources-title" className="mt-[clamp(40px,6vw,64px)]">
      <h2
        id="sources-title"
        className="text-[clamp(20px,2.4vw,24px)] font-extrabold tracking-[-0.02em]"
      >
        Sources
      </h2>
      <p className="mt-2 text-[14px] text-[var(--color-muted)]">
        Every fact about another company comes from its own public page, read on{" "}
        <time dateTime={CHECKED_ISO}>{CHECKED}</time>. Prices and features change, so check their
        site before you decide.
      </p>
      <ol className="mt-4 flex flex-col gap-2 text-[14px]">
        {sources.map((s, i) => (
          <li key={s.url} id={`source-${i + 1}`} className="flex min-w-0 gap-2 scroll-mt-[96px]">
            <span className="shrink-0 font-semibold text-[var(--color-muted)]">[{i + 1}]</span>
            <span className="min-w-0">
              <a
                href={s.url}
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="font-semibold text-[var(--color-mint-2)] underline-offset-2 hover:underline"
              >
                {s.label}
              </a>{" "}
              <span className="break-all text-[12.5px] text-[var(--color-muted)]">({s.url})</span>{" "}
              <span className="text-[12.5px] text-[var(--color-muted)]">checked {CHECKED}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function FaqList({ faqs, title = "Questions" }: { faqs: readonly Faq[]; title?: string }) {
  return (
    <section
      aria-labelledby="faq-title"
      className="mx-auto mt-[clamp(48px,7vw,88px)] max-w-[820px]"
    >
      <h2
        id="faq-title"
        className="text-center text-[clamp(22px,2.6vw,28px)] font-extrabold tracking-[-0.025em]"
      >
        {title}
      </h2>
      <div className="mt-6">
        {faqs.map((faq, i) => (
          <details
            key={faq.question}
            open={i === 0}
            className="group border-b border-[var(--color-line-soft)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[16.5px] font-bold [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown
                className="h-5 w-5 shrink-0 text-[var(--color-muted-3)] transition-transform duration-200 group-open:rotate-180"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </summary>
            <p className="mb-5 text-[15px] leading-[1.65] text-[var(--color-body)]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** A card linking to one comparison — the hub grid and "related" lists. */
export function CompareCard({ c }: { c: Comparison }) {
  return (
    <Link
      href={`/compare/${c.slug}`}
      className="group flex h-full flex-col rounded-[18px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[2px] hover:border-[var(--color-mint-line)] hover:shadow-[var(--shadow-lift)]"
    >
      <span className="text-[12px] font-semibold text-[var(--color-muted)]">{c.audience}</span>
      <span className="mt-1 text-[17px] font-extrabold tracking-[-0.01em] text-[var(--color-ink)]">
        {c.label}
      </span>
      <span className="mt-2 text-[14px] leading-[1.55] text-[var(--color-body)]">{c.blurb}</span>
      <span className="mt-auto pt-4 text-[13.5px] font-bold text-[var(--color-mint-2)]">
        Read the comparison <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export function RelatedComparisons({ slugs }: { slugs: string[] }) {
  const items = slugs.map(getComparison).filter((c): c is Comparison => Boolean(c));
  if (!items.length) return null;
  return (
    <section aria-labelledby="related-title" className="mt-[clamp(48px,7vw,88px)]">
      <h2
        id="related-title"
        className="text-[clamp(20px,2.4vw,26px)] font-extrabold tracking-[-0.02em]"
      >
        More comparisons
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <CompareCard key={c.slug} c={c} />
        ))}
      </div>
      <p className="mt-5 text-[14px]">
        <Link href="/compare" className="font-semibold text-[var(--color-mint-2)] hover:underline">
          See all comparisons →
        </Link>
      </p>
    </section>
  );
}
