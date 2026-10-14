import { PillBadge } from "@/components/design/primitives";
import { legal } from "@/lib/config/site";

/**
 * Shared layout for the legal and trust pages (Terms, Privacy, Cookies,
 * Refunds, Security). Server component, light theme, readable at 375px.
 *
 * Operator identity, contact details and the "last updated" date come from
 * `legal` in `@/lib/config/site` — never hard-code them in page copy.
 */

export type LegalTocItem = { id: string; title: string };

/**
 * Numbers a page's sections once so the table of contents and the section
 * headings can never drift apart:
 *
 *   const S = defineSections({ acceptance: "Acceptance", "acceptable-use": "Acceptable use" });
 *   <LegalPage toc={Object.values(S)}> <LegalSection {...S.acceptance}> … </LegalPage>
 */
export function defineSections<K extends string>(
  titles: Record<K, string>
): Record<K, LegalTocItem> {
  const out = {} as Record<K, LegalTocItem>;
  (Object.keys(titles) as K[]).forEach((id, i) => {
    out[id] = { id, title: `${i + 1}. ${titles[id]}` };
  });
  return out;
}

export function LegalPage({
  title,
  intro,
  badge,
  toc,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  /** Defaults to "Last updated: {legal.lastUpdated}". */
  badge?: React.ReactNode;
  toc?: LegalTocItem[];
  children: React.ReactNode;
}) {
  return (
    <div lang="en" dir="ltr" className="relative min-h-screen overflow-hidden bg-[var(--color-bg)]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-320px] h-[640px] w-[min(1100px,200vw)] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center,rgba(0,210,122,.10),transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[820px] px-4 pb-24 pt-[clamp(48px,8vw,96px)] sm:px-7 lg:px-10 lg:pb-32">
        <PillBadge>{badge ?? <>Last updated: {legal.lastUpdated}</>}</PillBadge>

        <h1 className="mt-6 break-words text-[clamp(34px,5.4vw,60px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-[var(--color-ink)]">
          {title}
        </h1>
        {intro ? (
          <div className="mt-5 max-w-[660px] space-y-3 text-[17px] leading-[1.65] text-[var(--color-body)] [overflow-wrap:anywhere] [&_a]:font-semibold [&_a]:text-[var(--color-mint-2)] [&_a:hover]:underline">
            {intro}
          </div>
        ) : null}

        {toc && toc.length > 0 ? (
          <nav
            aria-label="On this page"
            className="mt-10 rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-surface)] p-5 sm:p-7"
          >
            <h2 className="text-[13.5px] font-semibold text-[var(--color-ink-3)]">On this page</h2>
            <ol className="mt-3 grid gap-x-8 gap-y-[6px] sm:grid-cols-2">
              {toc.map((item) => (
                <li key={item.id} className="min-w-0">
                  <a
                    href={`#${item.id}`}
                    className="block py-[2px] text-[14.5px] leading-[1.45] text-[var(--color-body)] [overflow-wrap:anywhere] hover:text-[var(--color-mint-2)] hover:underline"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="mt-10 flex flex-col gap-5 sm:gap-6">{children}</div>

        <LegalContactBox />
      </div>
    </div>
  );
}

// `.prose-tajir` (unlayered CSS) sets body copy to the lighter muted grey; legal
// text reads better in the darker body colour, and an inline custom property
// is the one thing that outranks an unlayered rule.
const PROSE_BODY = { "--tw-prose-body": "var(--color-body)" } as React.CSSProperties;

/** One numbered section, rendered as a card with prose content. */
export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5 sm:p-7 lg:p-8"
    >
      <h2 className="mb-5 border-b border-[var(--color-line-2)] pb-4 text-[19px] font-bold tracking-[-0.02em] text-[var(--color-ink)] sm:text-[20px]">
        {title}
      </h2>
      <div
        style={PROSE_BODY}
        className="prose prose-tajir max-w-none [overflow-wrap:anywhere] prose-p:text-[15.5px] prose-p:leading-[1.7] prose-li:text-[15px] prose-li:leading-[1.65] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-h3:mb-2 prose-h3:mt-6 prose-h3:text-[16px] prose-h3:font-bold"
      >
        {children}
      </div>
    </section>
  );
}

/** A highlighted plain-language summary box inside a page or section. */
export function LegalNote({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[16px] border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] p-5 text-[15px] leading-[1.65] text-[var(--color-ink-3)] [overflow-wrap:anywhere] sm:p-6 [&_a]:font-semibold [&_a]:text-[var(--color-ink)] [&_a]:underline [&_li]:ms-5 [&_li]:list-disc [&_ul]:mt-2 [&_ul]:space-y-1">
      {title ? <p className="mb-2 font-bold text-[var(--color-ink)]">{title}</p> : null}
      {children}
    </div>
  );
}

/** `mailto:` link to the operator's mailbox, with an optional subject. */
export function MailLink({ subject, email = legal.email }: { subject?: string; email?: string }) {
  const href = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
  return <a href={href}>{email}</a>;
}

/** WhatsApp link showing the display number. */
export function WhatsAppLink() {
  return (
    <a href={legal.whatsappUrl} target="_blank" rel="noopener noreferrer">
      {legal.whatsappDisplay}
    </a>
  );
}

/** "Questions?" footer shown at the end of every legal page. */
export function LegalContactBox() {
  return (
    <aside className="mt-10 rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-surface)] p-5 text-[15.5px] leading-[1.7] text-[var(--color-body)] [overflow-wrap:anywhere] sm:p-7 [&_a]:font-semibold [&_a]:text-[var(--color-mint-2)] [&_a:hover]:underline">
      <p className="text-[17px] font-bold text-[var(--color-ink)]">Questions?</p>
      <p className="mt-2">
        Email <MailLink /> or WhatsApp <WhatsAppLink />.
      </p>
      <p className="mt-3 text-[14px] text-[var(--color-muted)]">
        TajirPoint is a product of{" "}
        <a href={legal.operatorUrl} target="_blank" rel="noopener noreferrer">
          {legal.operator}
        </a>
        , {legal.city}, {legal.country}.
      </p>
    </aside>
  );
}
