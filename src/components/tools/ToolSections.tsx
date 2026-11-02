import { ChefHat, ChevronDown, FileText, Percent, Receipt, Scale } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CtaPanel, GhostButton, MintButton } from "@/components/design/primitives";
import { siteConfig } from "@/lib/config/site";
import { TOOLS, type ToolFaq, type ToolInfo } from "@/content/tools/tools";

/** Server-rendered pieces shared by /tools and every /tools/<slug> page. */

export const TOOL_ICONS = {
  percent: Percent,
  receipt: Receipt,
  "file-text": FileText,
  scale: Scale,
  "chef-hat": ChefHat,
} as const;

/** Visible breadcrumb trail (the BreadcrumbList markup is emitted by the page). */
export function ToolBreadcrumbs({ trail }: { trail: ReadonlyArray<readonly [string, string]> }) {
  const items: Array<readonly [string, string]> = [["Home", "/"], ...trail];
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-[var(--color-muted)]">
        {items.map(([name, href], i) => (
          <li key={href} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-[var(--color-line-3)]">
                /
              </span>
            )}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-[var(--color-ink-3)]">
                {name}
              </span>
            ) : (
              <Link href={href} className="max-md:inline-flex max-md:min-h-[44px] max-md:items-center hover:text-[var(--color-ink)]">
                {name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ToolFaqs({ faqs }: { faqs: readonly ToolFaq[] }) {
  return (
    <section aria-labelledby="tool-faq" className="mx-auto max-w-[820px]">
      <h2
        id="tool-faq"
        className="text-center text-[clamp(22px,2.6vw,28px)] font-extrabold tracking-[-0.025em]"
      >
        Questions
      </h2>
      <div className="mt-[22px]">
        {faqs.map((faq, i) => (
          <details
            key={faq.question}
            open={i === 0}
            className="group border-b border-[var(--color-line-soft)]"
          >
            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16.5px] font-bold [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-[var(--color-muted-3)] transition-transform duration-200 group-open:rotate-180"
                strokeWidth={1.8}
              />
            </summary>
            <p className="mb-5 text-[15px] leading-[1.65] text-[var(--color-body)]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Cards linking to the other tools. */
export function ToolGrid({
  exclude,
  headingLevel = "h2",
}: {
  exclude?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <ul className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TOOLS.filter((t) => t.slug !== exclude).map((t) => {
        const ToolIcon = TOOL_ICONS[t.icon];
        return (
          <li key={t.slug} className="min-w-0">
            <Link
              href={`/tools/${t.slug}`}
              className="flex h-full min-w-0 flex-col gap-3 rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[2px] hover:border-[var(--color-mint-line)] hover:shadow-[var(--shadow-lift)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,210,122,.45)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[var(--color-mint-soft)]">
                <ToolIcon
                  aria-hidden="true"
                  className="h-[22px] w-[22px] text-[var(--color-mint-2)]"
                  strokeWidth={1.8}
                />
              </span>
              <Heading className="text-[17px] font-bold tracking-[-0.01em]">{t.heading}</Heading>
              <p className="text-[14px] leading-[1.6] text-[var(--color-body)]">{t.summary}</p>
              <span className="mt-auto text-[14px] font-semibold text-[var(--color-mint-2)]">
                Open the tool <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** The soft close-out: try TajirPoint, no pressure. */
export function ToolCta({ tool }: { tool?: ToolInfo }) {
  return (
    <CtaPanel>
      <h2 className="relative text-[clamp(24px,3.4vw,40px)] font-extrabold tracking-[-0.03em]">
        Let your POS do these sums for you
      </h2>
      <p className="relative mx-auto mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-[var(--color-muted)]">
        {tool?.inProduct ??
          "TajirPoint keeps your sales, stock, costs and tax in one place, so the numbers are always ready."}{" "}
        Free for 3 months, no card needed.
      </p>
      <div className="relative mt-8 flex flex-wrap justify-center gap-[14px]">
        <MintButton href={siteConfig.signupUrl} external>
          Try TajirPoint free <span aria-hidden="true">→</span>
        </MintButton>
        <GhostButton href="/pricing">See pricing</GhostButton>
      </div>
    </CtaPanel>
  );
}
