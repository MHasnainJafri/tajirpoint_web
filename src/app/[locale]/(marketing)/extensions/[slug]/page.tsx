import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CtaPanel } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { Tick } from "@/components/marketing/landing/Stroke";
import { AddonIcon } from "@/components/marketing/addons/AddonIcon";
import { StatusBadge } from "@/components/marketing/addons/StatusBadge";
import { ADDON_CONTENT } from "@/content/addons";
import { addonChrome, type AddonChrome } from "@/content/addons/i18n";
import { legal, siteConfig, whatsappLink } from "@/lib/config/site";
import { addonSchema } from "@/lib/marketing/addon-schema";
import { localizeAddon, planLineFor } from "@/lib/marketing/addon-i18n";
import { getAddon, getAddonCatalogue, relatedAddons, type Addon } from "@/lib/marketing/addons";
import { buildMetadata, localeUrl } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schemas";

// Literal for Next's static analysis; keep equal to ADDON_REVALIDATE.
export const revalidate = 600;

/** An add-on the backend lists after the build gets its page on first visit. */
export const dynamicParams = true;

/**
 * Every add-on in the catalogue, plus every write-up the site has, so a page
 * is prebuilt even when the API was down at build time (the snapshot covers
 * it). An unknown slug renders a 404 (`getAddon` → notFound).
 */
export async function generateStaticParams() {
  const { addons } = await getAddonCatalogue();
  const slugs = new Set([...addons.map((a) => a.slug), ...Object.keys(ADDON_CONTENT)]);
  return [...slugs].map((slug) => ({ slug }));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const found = await getAddon(slug);
  if (!found) return {};
  const addon = localizeAddon(found, locale);
  return buildMetadata({
    title: addon.content.seoTitle,
    description: addon.content.seoDescription,
    path: `/extensions/${addon.slug}`,
    locale,
    keywords: addon.content.keywords,
  });
}

/* ── Calls to action, by status ───────────────────────────────────── */

const primaryBtn =
  "inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-[var(--color-mint)] px-6 py-[13px] text-center text-[15px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(0,210,122,.35)]";
const secondaryBtn =
  "inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[var(--color-line-2)] bg-[var(--color-bg-2)] px-6 py-[13px] text-center text-[15px] font-semibold text-[var(--color-ink)] transition-transform duration-200 hover:-translate-y-[2px]";

function callHref(addon: Addon) {
  return `/get-a-call?addon=${encodeURIComponent(addon.slug)}`;
}

function whatsappHref(addon: Addon, ch: AddonChrome) {
  return whatsappLink(ch.whatsappMessage(legal.product, addon.name));
}

function Ctas({
  addon,
  ch,
  place,
  onDark = false,
}: {
  addon: Addon;
  ch: AddonChrome;
  place: string;
  onDark?: boolean;
}) {
  const secondary = onDark
    ? "inline-flex max-w-full items-center justify-center rounded-full border border-white/30 px-6 py-[13px] text-center text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
    : secondaryBtn;
  const wa = (
    <a
      href={whatsappHref(addon, ch)}
      target="_blank"
      rel="noopener noreferrer"
      className={secondary}
    >
      {ch.cta.whatsappUs}
    </a>
  );

  return (
    <div
      className={`flex flex-wrap gap-[10px] ${onDark ? "justify-center" : ""}`}
      data-track={`addon_${addon.slug}_${place}`}
    >
      {addon.status === "active" && (
        <>
          <a href={siteConfig.signupUrl} className={primaryBtn}>
            {ch.cta.startTrial} <span aria-hidden="true">{ch.arrow}</span>
          </a>
          <Link href={callHref(addon)} className={secondary}>
            {ch.cta.askQuestion}
          </Link>
        </>
      )}
      {addon.status === "contact_us" && (
        <>
          <Link href={callHref(addon)} className={primaryBtn}>
            {ch.cta.askSetup} <span aria-hidden="true">{ch.arrow}</span>
          </Link>
          {wa}
        </>
      )}
      {addon.status === "coming_soon" && (
        <>
          <Link href={callHref(addon)} className={primaryBtn}>
            {ch.cta.tellMeWhenReady} <span aria-hidden="true">{ch.arrow}</span>
          </Link>
          {wa}
        </>
      )}
      {addon.status === "unavailable" && (
        <>
          <Link href={callHref(addon)} className={primaryBtn}>
            {ch.cta.askAboutIt} <span aria-hidden="true">{ch.arrow}</span>
          </Link>
          {wa}
        </>
      )}
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */

const h2 = "text-[clamp(24px,3.2vw,36px)] font-bold leading-[1.15] tracking-[-0.03em] text-balance";
const card = "rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)]";

export default async function AddonPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const found = await getAddon(slug);
  if (!found) notFound();

  const ch = addonChrome(locale);
  const addon = localizeAddon(found, locale);
  const { addons } = await getAddonCatalogue();
  const related = relatedAddons(found, addons, 3).map((r) => localizeAddon(r, locale));
  const statusHint = ch.statusHint[addon.status];
  const planLine = planLineFor(addon.slug, locale);
  const c = addon.content;
  // Our write-up wins; the API's raw feature list is shown only for an add-on
  // the site has not written up yet (some API lists name things not built).
  const features =
    c.features.length > 0 ? c.features : addon.apiFeatures.map((f) => ({ title: f, body: "" }));

  const sections = [
    { id: "what-it-is", label: ch.sections.whatItIs, show: c.overview.length > 0 },
    { id: "problems", label: ch.sections.problems, show: c.problems.length > 0 },
    { id: "features", label: ch.sections.features, show: features.length > 0 },
    { id: "how-it-works", label: ch.sections.howItWorks, show: c.howItWorks.length > 0 },
    { id: "pricing", label: ch.sections.pricing, show: true },
    { id: "faq", label: ch.sections.faq, show: c.faqs.length > 0 },
  ].filter((s) => s.show);

  return (
    // Translated on /ur and /ar (src/content/addons/i18n); the page takes
    // its language and direction from <html>. Add-on names stay in Latin
    // letters and read correctly inside right-to-left text.
    <div>
      <JsonLd
        schema={[
          addonSchema(addon, locale),
          ...(c.faqs.length
            ? [faqSchema(c.faqs.map((f) => ({ question: f.q, answer: f.a })))]
            : []),
          breadcrumbSchema([
            { name: ch.home, url: localeUrl("/", locale) },
            { name: ch.addons, url: localeUrl("/extensions", locale) },
            { name: addon.name, url: localeUrl(`/extensions/${addon.slug}`, locale) },
          ]),
        ]}
      />

      <div className="mx-auto max-w-[1180px] px-4 md:px-6" style={{ overflowX: "clip" }}>
        {/* ── Breadcrumb ─────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="pt-5 text-[12.5px] text-[var(--color-muted)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[var(--color-ink)]">
                {ch.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/extensions" className="hover:text-[var(--color-ink)]">
                {ch.addons}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="min-w-0 font-semibold text-[var(--color-ink)]">
              {addon.name}
            </li>
          </ol>
        </nav>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="grid items-start gap-8 pb-[clamp(36px,6vw,64px)] pt-[clamp(24px,4vw,48px)] lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <AddonIcon slug={addon.slug} iconUrl={addon.iconUrl} size={72} priority />
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={addon.status} label={ch.statusLabel[addon.status]} />
                <span className="rounded-full border border-[var(--color-line-2)] px-[10px] py-[3px] text-[12px] font-semibold text-[var(--color-ink-3)]">
                  {addon.group.label}
                </span>
              </div>
            </div>
            <h1 className="mt-5 text-[clamp(32px,4.8vw,56px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-balance">
              {addon.name}
            </h1>
            <p className="mt-4 max-w-[58ch] text-[17px] leading-[1.6] text-[var(--color-body)]">
              {c.headline}
            </p>
            {c.comingSoonNote && addon.status === "coming_soon" && (
              <p className="mt-4 max-w-[58ch] rounded-[14px] border border-[#F3D9A6] bg-[#FFF8EC] px-4 py-3 text-[14px] leading-[1.55] text-[#6B4700]">
                {c.comingSoonNote}
              </p>
            )}
            <div className="mt-7">
              <Ctas addon={addon} ch={ch} place="hero" />
            </div>
          </div>

          <aside aria-label={ch.atAGlance} className={`${card} p-5 md:p-6`}>
            <dl className="grid gap-4 text-[14px]">
              <div>
                <dt className="text-[12.5px] font-semibold text-[var(--color-muted)]">
                  {ch.price}
                </dt>
                <dd className="mt-1 text-[24px] font-extrabold tracking-[-0.02em] text-[var(--color-ink)]">
                  {addon.price}
                </dd>
                <dd className="mt-1 text-[13px] text-[var(--color-muted)]">{planLine}</dd>
              </div>
              <div>
                <dt className="text-[12.5px] font-semibold text-[var(--color-muted)]">
                  {ch.status}
                </dt>
                <dd className="mt-1 leading-[1.55] text-[var(--color-body)]">{statusHint}</dd>
              </div>
              <div>
                <dt className="text-[12.5px] font-semibold text-[var(--color-muted)]">{ch.type}</dt>
                <dd className="mt-1 leading-[1.55] text-[var(--color-body)]">
                  {addon.group.label}
                </dd>
              </div>
            </dl>
          </aside>
        </section>

        {/* ── On this page ───────────────────────────────────────── */}
        {sections.length > 2 && (
          <nav
            aria-label={ch.onThisPage}
            className="flex flex-wrap gap-2 border-y border-[var(--color-line-2)] py-4"
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-[var(--color-line-2)] bg-[var(--color-bg-2)] px-[13px] py-[6px] text-[13px] font-semibold text-[var(--color-ink-3)] transition-colors hover:border-[var(--color-mint-line)] hover:text-[var(--color-ink)]"
              >
                {s.label}
              </a>
            ))}
          </nav>
        )}

        {/* ── What it is + who it's for ──────────────────────────── */}
        {c.overview.length > 0 && (
          <section
            id="what-it-is"
            aria-labelledby="what-it-is-title"
            className="mt-[clamp(48px,7vw,88px)] grid scroll-mt-[90px] gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14"
          >
            <div className="min-w-0">
              <h2 id="what-it-is-title" className={h2}>
                {ch.sections.whatItIs}
              </h2>
              <div className="mt-5 flex flex-col gap-4 text-[16px] leading-[1.7] text-[var(--color-body)]">
                {c.overview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            {c.whoFor.length > 0 && (
              <div className={`${card} h-fit p-5 md:p-6`}>
                <h3 className="text-[17px] font-bold tracking-[-0.01em]">{ch.whoFor}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {c.whoFor.map((w) => (
                    <li
                      key={w}
                      className="flex items-start gap-[10px] text-[14.5px] leading-[1.5] text-[var(--color-ink)]"
                    >
                      <span className="mt-[1px] flex-none text-[var(--color-mint-2)]">
                        <Tick size={17} />
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* ── Problems it solves ─────────────────────────────────── */}
        {c.problems.length > 0 && (
          <section
            id="problems"
            aria-labelledby="problems-title"
            className="mt-[clamp(48px,7vw,88px)] scroll-mt-[90px]"
          >
            <h2 id="problems-title" className={h2}>
              {ch.sections.problems}
            </h2>
            <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3">
              {c.problems.map((p) => (
                <li key={p.problem} className={`${card} p-5`}>
                  <p className="text-[15px] font-semibold leading-[1.45] text-[var(--color-ink)]">
                    &ldquo;{p.problem}&rdquo;
                  </p>
                  <p className="mt-3 flex items-start gap-[10px] text-[14.5px] leading-[1.6] text-[var(--color-body)]">
                    <span className="mt-[2px] flex-none text-[var(--color-mint-2)]">
                      <Tick size={16} />
                    </span>
                    <span>{p.fix}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Features ───────────────────────────────────────────── */}
        {features.length > 0 && (
          <section
            id="features"
            aria-labelledby="features-title"
            className="mt-[clamp(48px,7vw,88px)] scroll-mt-[90px]"
          >
            <h2 id="features-title" className={h2}>
              {ch.keyFeatures}
            </h2>
            <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3">
              {features.map((f) => (
                <li key={f.title} className="rounded-[20px] bg-[var(--color-surface)] p-5">
                  <h3 className="flex items-start gap-[10px] text-[15.5px] font-bold leading-[1.35] text-[var(--color-ink)]">
                    <span className="mt-[1px] flex-none text-[var(--color-mint-2)]">
                      <Tick size={17} />
                    </span>
                    {f.title}
                  </h3>
                  {f.body && (
                    <p className="mt-2 pl-[27px] text-[14px] leading-[1.6] text-[var(--color-body)]">
                      {f.body}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── How it works ───────────────────────────────────────── */}
        {c.howItWorks.length > 0 && (
          <section
            id="how-it-works"
            aria-labelledby="how-title"
            className="mt-[clamp(48px,7vw,88px)] scroll-mt-[90px]"
          >
            <h2 id="how-title" className={h2}>
              {ch.sections.howItWorks}
            </h2>
            <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
              {c.howItWorks.map((s, i) => (
                <li key={s.title} className={`${card} p-5`}>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-mint-soft)] font-mono text-[14px] font-bold text-[var(--color-mint-2)]">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-[15.5px] font-bold text-[var(--color-ink)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-body)]">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* ── What you need + pricing & setup ────────────────────── */}
        <section
          id="pricing"
          aria-labelledby="pricing-title"
          className="mt-[clamp(48px,7vw,88px)] grid scroll-mt-[90px] gap-3 lg:grid-cols-2"
        >
          {c.needs.length > 0 && (
            <div className={`${card} p-5 md:p-7`}>
              <h2 className="text-[clamp(20px,2.4vw,26px)] font-bold tracking-[-0.02em]">
                {ch.whatYouNeed}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {c.needs.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-[10px] text-[14.5px] leading-[1.55] text-[var(--color-ink)]"
                  >
                    <span className="mt-[1px] flex-none text-[var(--color-mint-2)]">
                      <Tick size={17} />
                    </span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={`${card} p-5 md:p-7 ${c.needs.length ? "" : "lg:col-span-2"}`}>
            <h2
              id="pricing-title"
              className="text-[clamp(20px,2.4vw,26px)] font-bold tracking-[-0.02em]"
            >
              {ch.sections.pricing}
            </h2>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[28px] font-extrabold tracking-[-0.02em] text-[var(--color-ink)]">
                {addon.price}
              </span>
              <span className="text-[13.5px] text-[var(--color-muted)]">{planLine}</span>
            </p>
            <div className="mt-4 flex flex-col gap-3 text-[14.5px] leading-[1.6] text-[var(--color-body)]">
              {(c.setup.length ? c.setup : [statusHint]).map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
            <p className="mt-4 text-[13px] text-[var(--color-muted)]">
              {ch.seePlans[0]}
              <Link
                href="/pricing"
                className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
              >
                {ch.seePlans[1]}
              </Link>
              {ch.seePlans[2]}
            </p>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        {c.faqs.length > 0 && (
          <section
            id="faq"
            aria-labelledby="faq-title"
            className="mx-auto mt-[clamp(48px,7vw,88px)] max-w-[860px] scroll-mt-[90px]"
          >
            <h2 id="faq-title" className={`${h2} text-center`}>
              {ch.faqTitle(addon.name)}
            </h2>
            <div className="mt-7 flex flex-col gap-3">
              {c.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-[16px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] px-5 py-4 open:shadow-[var(--shadow-card)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-semibold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span
                      aria-hidden="true"
                      className="text-[20px] leading-none text-[var(--color-muted)] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--color-body)]">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── Related ────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section aria-labelledby="related-title" className="mt-[clamp(48px,7vw,88px)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="related-title" className={h2}>
                {ch.relatedAddons}
              </h2>
              <Link
                href="/extensions"
                className="text-[14px] font-semibold text-[var(--color-mint-2)]"
              >
                {ch.allAddons} <span aria-hidden="true">{ch.arrow}</span>
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-3">
              {related.map((r) => (
                <li key={r.slug} className="min-w-0">
                  <Link
                    href={`/extensions/${r.slug}`}
                    className={`${card} flex h-full items-start gap-4 p-5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[2px] hover:border-[var(--color-mint-line)] hover:shadow-[var(--shadow-lift)]`}
                  >
                    <AddonIcon slug={r.slug} iconUrl={r.iconUrl} size={44} />
                    <span className="min-w-0">
                      <span className="block text-[15px] font-bold text-[var(--color-ink)]">
                        {r.name}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-[13px] leading-[1.5] text-[var(--color-muted)]">
                        {r.summary}
                      </span>
                      <span className="mt-2 flex flex-wrap items-center gap-2">
                        <StatusBadge status={r.status} label={ch.statusLabel[r.status]} />
                        <span className="text-[12.5px] font-semibold text-[var(--color-ink)]">
                          {r.price}
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="px-3 pb-[clamp(56px,8vw,96px)] pt-[clamp(56px,8vw,104px)] md:px-6">
        <CtaPanel>
          <h2 className="relative mx-auto max-w-[22ch] text-[clamp(26px,3.6vw,42px)] font-extrabold tracking-[-0.03em] text-balance">
            {addon.status === "active"
              ? ch.finalTitle.active(addon.name)
              : addon.status === "coming_soon"
                ? ch.finalTitle.coming_soon(addon.name)
                : ch.finalTitle.other(addon.name)}
          </h2>
          <p className="relative mx-auto mt-4 max-w-[48ch] text-[16px] leading-[1.6] text-[var(--color-on-dark-2)]">
            {statusHint}
          </p>
          <div className="relative mt-8">
            <Ctas addon={addon} ch={ch} place="final" onDark />
          </div>
        </CtaPanel>
      </section>
    </div>
  );
}
