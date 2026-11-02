import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PillBadge } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreakEvenCalculator } from "@/components/tools/BreakEvenCalculator";
import { FoodCostCalculator } from "@/components/tools/FoodCostCalculator";
import { InvoiceGenerator } from "@/components/tools/InvoiceGenerator";
import { MarginCalculator } from "@/components/tools/MarginCalculator";
import { VatCalculator } from "@/components/tools/VatCalculator";
import { ToolBreadcrumbs, ToolCta, ToolFaqs, ToolGrid } from "@/components/tools/ToolSections";
import { TOOL_SLUGS, getTool, type ToolSlug } from "@/content/tools/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema, pageBreadcrumbs } from "@/lib/seo/schemas";
import { toolSchema } from "@/lib/seo/tool-schemas";

/** Only the listed tools exist; anything else is a 404, not a render. */
export const dynamicParams = false;

export function generateStaticParams() {
  return TOOL_SLUGS.map((slug) => ({ slug }));
}

const WIDGETS: Record<ToolSlug, ComponentType> = {
  "profit-margin-calculator": MarginCalculator,
  "vat-calculator": VatCalculator,
  "invoice-generator": InvoiceGenerator,
  "break-even-calculator": BreakEvenCalculator,
  "food-cost-calculator": FoodCostCalculator,
};

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return buildMetadata({
    title: tool.seo.title,
    description: tool.seo.description,
    path: `/tools/${tool.slug}`,
    locale,
    keywords: tool.seo.keywords,
  });
}

export default async function ToolPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tool = getTool(slug);
  if (!tool) notFound();

  const Widget = WIDGETS[tool.slug];
  const trail = [
    ["Free tools", "/tools"],
    [tool.name, `/tools/${tool.slug}`],
  ] as const;

  return (
    <div lang="en" dir="ltr">
      <JsonLd
        schema={[toolSchema(tool, locale), faqSchema(tool.faqs), pageBreadcrumbs(locale, trail)]}
      />

      <section className="px-[clamp(16px,4vw,40px)] pb-[clamp(24px,4vw,40px)] pt-[clamp(28px,6vw,64px)]">
        <div className="mx-auto max-w-[1140px]">
          <ToolBreadcrumbs trail={trail} />
          <PillBadge>Free tool</PillBadge>
          <h1 className="mt-5 text-[clamp(30px,4.4vw,50px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-balance">
            {tool.heading}
          </h1>
          <p className="mt-4 max-w-[62ch] text-[16.5px] leading-[1.65] text-[var(--color-body)]">
            {tool.intro}
          </p>
          <p className="mt-3 inline-flex items-start gap-2 text-[13.5px] leading-[1.55] text-[var(--color-ink-3)]">
            <ShieldCheck
              aria-hidden="true"
              className="mt-[1px] h-[17px] w-[17px] shrink-0 text-[var(--color-mint-2)]"
            />
            Runs in your browser. Nothing you type is sent or saved.
          </p>
        </div>
      </section>

      <section
        aria-label={tool.name}
        className="px-[clamp(16px,4vw,40px)] pb-[clamp(40px,6vw,64px)]"
      >
        <div className="mx-auto max-w-[1140px]">
          <Widget />
        </div>
      </section>

      <section className="border-t border-[var(--color-line-soft)] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,64px)]">
        <div className="mx-auto grid max-w-[1140px] min-w-0 gap-8 md:grid-cols-2 md:gap-12">
          <div className="min-w-0">
            <h2 className="text-[clamp(20px,2.4vw,26px)] font-extrabold tracking-[-0.02em]">
              How to use it
            </h2>
            <ol className="mt-4 flex list-decimal flex-col gap-3 ps-5 text-[15px] leading-[1.6] text-[var(--color-body)] marker:font-bold marker:text-[var(--color-mint-2)]">
              {tool.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
          <div className="min-w-0">
            <h2 className="text-[clamp(20px,2.4vw,26px)] font-extrabold tracking-[-0.02em]">
              The formula
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {tool.formula.map((f) => (
                <li
                  key={f}
                  className="break-words rounded-[12px] border border-[var(--color-line-2)] bg-[var(--surface-2)] px-4 py-3 font-[family-name:var(--font-mono)] text-[13.5px] leading-[1.55] text-[var(--color-ink-3)]"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-line-soft)] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,64px)]">
        <ToolFaqs faqs={tool.faqs} />
      </section>

      <section className="border-t border-[var(--color-line-soft)] bg-[var(--color-bg-3)] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,64px)]">
        <div className="mx-auto max-w-[1140px]">
          <h2 className="text-[clamp(20px,2.4vw,26px)] font-extrabold tracking-[-0.02em]">
            More free tools
          </h2>
          <div className="mt-5">
            <ToolGrid exclude={tool.slug} headingLevel="h3" />
          </div>
          <p className="mt-6 text-[14px] leading-[1.6] text-[var(--color-body)]">
            Most useful for:{" "}
            {tool.forBusinesses.map((b, i) => (
              <span key={b.href}>
                {i > 0 && ", "}
                <Link
                  href={b.href}
                  className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
                >
                  {b.label}
                </Link>
              </span>
            ))}
            .
          </p>
        </div>
      </section>

      <section
        id="tool-cta"
        className="px-[clamp(16px,4vw,40px)] pb-[clamp(64px,9vw,110px)] pt-[clamp(40px,6vw,64px)]"
      >
        <ToolCta tool={tool} />
      </section>
    </div>
  );
}
