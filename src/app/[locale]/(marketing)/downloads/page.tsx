import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/design/Icon";
import { CtaPanel, PillBadge } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { Tick } from "@/components/marketing/landing/Stroke";
import {
  AppleMark,
  DesktopDownloads,
  WindowsMark,
} from "@/components/marketing/downloads/DesktopDownloads";
import {
  DESKTOP,
  DESKTOP_POINTS,
  DOWNLOADS_PATH,
  MOBILE_APPS,
  SETUPS,
  type MobileApp,
} from "@/lib/marketing/downloads";
import { BRAND_APP_HOST, BRAND_NAME, brand } from "@/lib/config/brand";
import { assertPageShown } from "@/lib/config/pages";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata, canonicalUrl } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schemas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: `Download ${BRAND_NAME} POS for Windows, Mac and Android`,
    description: `Download the ${BRAND_NAME} POS desktop app for Windows and Mac, and see every phone and tablet app: Order Desk, Kitchen, Waiter, Packer, Order Board, Rider and the owner's Business app.`,
    path: DOWNLOADS_PATH,
    locale,
  });
}

const FAQS = [
  {
    q: "Is the download free?",
    a: `Yes. The apps are free to download and install. You sign in with your ${BRAND_NAME} account, and what you can use follows your plan.`,
  },
  {
    q: "Do I need a separate login for each app?",
    a: "No. Every app uses the same staff logins. Give each person their own login and a role, and each app shows them only their own work.",
  },
  {
    q: "Which computer do I need for the desktop app?",
    a: "Any Windows 10 or 11 PC (64-bit) or any Mac on macOS 11 or later, Apple Silicon or Intel. A normal laptop or a till PC is enough.",
  },
  {
    q: "Windows or macOS warns me before opening the app. Is it safe?",
    a: "Yes. The warning appears because the app is new to your computer. On Windows click More info, then Run anyway. On a Mac right-click the app, choose Open, or click Open Anyway in System Settings → Privacy & Security.",
  },
  {
    q: "How do I update the desktop app?",
    a: "Download the newest version from this page and install it over the old one. Your login and settings stay.",
  },
  {
    q: "When will the Android apps be on Google Play?",
    a: "They are being published now. Until then, message us on WhatsApp and we will send you the app for your phone or tablet.",
  },
  {
    q: "Is there an iPhone or iPad app?",
    a: `Not yet. On an iPhone or iPad, open ${BRAND_APP_HOST} in Safari: the POS and back office work in the browser.`,
  },
];

const AUDIENCE_LABEL: Record<MobileApp["audience"], string> = {
  all: "All businesses",
  restaurants: "Restaurants",
};

export default async function DownloadsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  assertPageShown(DOWNLOADS_PATH);

  const released = new Date(`${DESKTOP.released}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const everyone = MOBILE_APPS.filter((a) => a.audience === "all");
  const restaurants = MOBILE_APPS.filter((a) => a.audience === "restaurants");
  const whatsapp = brand.whatsappUrl;

  return (
    <div>
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: DESKTOP.name,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Windows 10, Windows 11, macOS 11+",
            softwareVersion: DESKTOP.version,
            datePublished: DESKTOP.released,
            downloadUrl: DESKTOP.files.map((f) => f.href),
            url: canonicalUrl(DOWNLOADS_PATH, locale),
            publisher: { "@type": "Organization", name: brand.legalName, url: siteConfig.url },
          },
          faqSchema(FAQS.map((f) => ({ question: f.q, answer: f.a }))),
          breadcrumbSchema([
            { name: "Home", url: canonicalUrl("/", locale) },
            { name: "Download", url: canonicalUrl(DOWNLOADS_PATH, locale) },
          ]),
        ]}
      />

      <div className="mx-auto max-w-[1120px] px-[clamp(16px,3vw,24px)]">
        {/* ── Hero + desktop downloads ─────────────────────────────── */}
        <section className="pb-[clamp(40px,6vw,72px)] pt-[clamp(32px,5vw,64px)] text-center">
          <PillBadge>
            Version {DESKTOP.version} · {released}
          </PillBadge>
          <h1 className="mx-auto mt-5 max-w-[18ch] text-[clamp(34px,5vw,60px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-balance">
            Download {BRAND_NAME}
          </h1>
          <p className="mx-auto mt-5 max-w-[60ch] text-[17px] leading-[1.65] text-[var(--color-body)]">
            Install the POS on your counter computer — Windows or Mac — and put the right app on
            every phone and tablet in your shop. One account and one set of logins for all of them.
          </p>

          <div className="mx-auto mt-9 max-w-[860px] text-start">
            <DesktopDownloads files={DESKTOP.files} version={DESKTOP.version} />
          </div>

          <p className="mt-6 text-[14px] text-[var(--color-muted)]">
            On a phone or tablet?{" "}
            <a
              href="#android"
              className="font-semibold text-[var(--color-ink)] underline underline-offset-4"
            >
              See the Android apps
            </a>
            . No install at all?{" "}
            <a
              href={siteConfig.dashboardUrl}
              className="font-semibold text-[var(--color-ink)] underline underline-offset-4"
            >
              Open {BRAND_APP_HOST}
            </a>{" "}
            in any browser.
          </p>
        </section>

        {/* ── What the desktop app does + install steps ────────────── */}
        <section
          aria-labelledby="desktop-title"
          className="grid gap-[clamp(20px,4vw,48px)] rounded-[28px] border border-[var(--color-line-2)] bg-[var(--color-surface)] p-[clamp(20px,4vw,48px)] lg:grid-cols-[1.05fr_1fr]"
        >
          <div>
            <div className="eyebrow">Desktop app</div>
            <h2
              id="desktop-title"
              className="mt-3 text-[clamp(26px,3.2vw,38px)] font-bold leading-[1.12] tracking-[-0.03em] text-balance"
            >
              {DESKTOP.name} for Windows and Mac
            </h2>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.65] text-[var(--color-body)]">
              The full point of sale in its own window, for the counter PC, a laptop or a till with
              a cash drawer. Shops and restaurants use the same app: it opens the screens your
              business type and your role need.
            </p>
            <ul className="mt-6 space-y-3">
              {DESKTOP_POINTS.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 text-[14.5px] leading-[1.6] text-[var(--color-ink-3)]"
                >
                  <span className="mt-[2px] flex-none text-[var(--color-mint-2)]">
                    <Tick />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[16px] font-bold tracking-[-0.01em]">How to install</h3>
            {DESKTOP.files.map((f, i) => (
              <details
                key={f.os}
                open={i === 0}
                className="group rounded-[18px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5 shadow-[var(--shadow-card)]"
              >
                <summary className="flex min-h-[32px] cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-bold [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    {f.os === "windows" ? <WindowsMark size={18} /> : <AppleMark size={18} />}
                    {f.os === "windows" ? "On Windows" : "On a Mac"}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[var(--color-muted)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <ol className="mt-4 list-decimal space-y-2 ps-5 text-[14px] leading-[1.6] text-[var(--color-body)] marker:font-semibold marker:text-[var(--color-ink)]">
                  {f.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <a
                  href={f.href}
                  download
                  className="mt-4 inline-flex min-h-[44px] items-center text-[14px] font-semibold text-[var(--color-mint-2)] underline underline-offset-4"
                >
                  {f.label} ({f.size})
                </a>
              </details>
            ))}
            <p className="px-1 pt-1 text-[13px] leading-[1.6] text-[var(--color-muted)]">
              Already installed? Download the newest version and install it over the old one — your
              login and settings stay.
            </p>
          </div>
        </section>

        {/* ── Android apps ─────────────────────────────────────────── */}
        <section
          id="android"
          aria-labelledby="android-title"
          className="mt-[clamp(56px,8vw,104px)] scroll-mt-[86px]"
        >
          <div className="max-w-[60ch]">
            <div className="eyebrow">Phones and tablets</div>
            <h2
              id="android-title"
              className="mt-3 text-[clamp(26px,3.2vw,38px)] font-bold leading-[1.12] tracking-[-0.03em] text-balance"
            >
              One app for every job in the shop
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-body)]">
              Each Android app does one job, so staff only see their own work. They run on phones,
              tablets and Android POS terminals with a built-in printer, and are coming to Google
              Play.
              {whatsapp && (
                <>
                  {" "}
                  Need one today?{" "}
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--color-ink)] underline underline-offset-4"
                  >
                    Message us on WhatsApp
                  </a>{" "}
                  and we will send it to you.
                </>
              )}
            </p>
          </div>

          <AppGroup title="For every business" apps={everyone} />
          <AppGroup
            title="For restaurants, cafés and cloud kitchens"
            sub="Restaurants get separate apps for the front desk, the kitchen, the waiters, packing and the screen customers watch — all fed by the same orders."
            apps={restaurants}
          />
        </section>

        {/* ── Which apps do I need? ────────────────────────────────── */}
        <section aria-labelledby="setups-title" className="mt-[clamp(56px,8vw,104px)]">
          <div className="eyebrow">Which apps do I need?</div>
          <h2
            id="setups-title"
            className="mt-3 max-w-[22ch] text-[clamp(26px,3.2vw,38px)] font-bold leading-[1.12] tracking-[-0.03em] text-balance"
          >
            Pick your setup
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {SETUPS.map((s) => (
              <div
                key={s.id}
                className="flex flex-col rounded-[24px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-[clamp(20px,3vw,32px)] shadow-[var(--shadow-card)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-[var(--color-mint-soft)]">
                  <Icon name={s.id === "restaurant" ? "restaurant" : "store"} size={22} />
                </span>
                <h3 className="mt-4 text-[20px] font-bold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-body)]">
                  {s.body}
                </p>
                <ul className="mt-5 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
                  {s.items.map((it) => (
                    <li
                      key={it.app}
                      className="flex flex-col gap-[2px] py-3 sm:flex-row sm:items-baseline sm:gap-4"
                    >
                      <span className="text-[14px] font-bold text-[var(--color-ink)] sm:w-[44%] sm:flex-none">
                        {it.app}
                      </span>
                      <span className="text-[13.5px] leading-[1.5] text-[var(--color-muted)]">
                        {it.where}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={s.href}
                  className="mt-5 inline-flex min-h-[44px] items-center gap-2 self-start text-[14.5px] font-semibold text-[var(--color-mint-2)]"
                >
                  {s.cta}{" "}
                  <span aria-hidden="true" className="rtl:-scale-x-100">
                    →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Browser + iPhone note ────────────────────────────────── */}
        <section className="mt-[clamp(40px,6vw,64px)] grid gap-4 md:grid-cols-2">
          <div className="rounded-[20px] border border-[var(--color-line-2)] p-6">
            <Icon name="globe" size={22} />
            <h3 className="mt-3 text-[16px] font-bold">In the browser, nothing to install</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-body)]">
              The back office — stock, purchases, staff, settings and reports — and the POS itself
              work in Chrome, Edge or Safari at{" "}
              <a
                href={siteConfig.dashboardUrl}
                className="font-semibold text-[var(--color-ink)] underline underline-offset-4"
              >
                {BRAND_APP_HOST}
              </a>
              .
            </p>
          </div>
          <div className="rounded-[20px] border border-dashed border-[var(--color-line-3)] p-6">
            <span className="text-[var(--color-muted)]">
              <AppleMark size={22} />
            </span>
            <h3 className="mt-3 text-[16px] font-bold">iPhone and iPad</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-body)]">
              Native iPhone and iPad apps are coming soon. Until then, open {BRAND_APP_HOST} in
              Safari and add it to your home screen.
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-title" className="mt-[clamp(56px,8vw,104px)]">
          <h2 id="faq-title" className="text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.03em]">
            Questions about installing
          </h2>
          <div className="mt-6 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex min-h-[36px] cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="flex-none text-[var(--color-muted)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-2 max-w-[70ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>

      {/* ── Close ──────────────────────────────────────────────────── */}
      <div className="mt-[clamp(56px,8vw,104px)] px-[clamp(16px,3vw,24px)]">
        <CtaPanel>
          <h2 className="relative text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-white">
            New to {BRAND_NAME}?
          </h2>
          <p className="relative mx-auto mt-3 max-w-[48ch] text-[16px] leading-[1.6] text-white/75">
            Create your account first, then sign in on any of the apps.
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={siteConfig.signupUrl}
              className="inline-flex min-h-[48px] items-center rounded-full bg-[var(--color-mint)] px-6 py-[13px] text-[15px] font-bold text-[#0A0A0A]"
            >
              Get started
            </a>
            <Link
              href="/book-demo"
              className="inline-flex min-h-[48px] items-center rounded-full border border-white/25 px-6 py-[13px] text-[15px] font-bold text-white"
            >
              Book a free demo
            </Link>
          </div>
        </CtaPanel>
      </div>
    </div>
  );
}

function AppGroup({ title, sub, apps }: { title: string; sub?: string; apps: MobileApp[] }) {
  return (
    <div className="mt-10">
      <h3 className="text-[18px] font-bold tracking-[-0.02em]">{title}</h3>
      {sub && (
        <p className="mt-1 max-w-[70ch] text-[14px] leading-[1.6] text-[var(--color-muted)]">
          {sub}
        </p>
      )}
      <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3">
        {apps.map((a) => (
          <li
            key={a.id}
            className="flex flex-col rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-[12px] bg-[var(--color-mint-soft)]">
                <Icon name={a.icon} size={22} />
              </span>
              <span className="min-w-0">
                <span className="block text-[15.5px] font-bold text-[var(--color-ink)]">
                  {a.name}
                </span>
                <span className="block text-[12.5px] font-semibold text-[var(--color-muted)]">
                  {a.who} · {AUDIENCE_LABEL[a.audience]}
                </span>
              </span>
            </div>
            <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-[var(--color-body)]">
              {a.line}
            </p>
            <div className="mt-4">
              {a.play ? (
                <a
                  href={a.play}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-[12px] bg-[#0A0A0A] px-4 py-2 text-[13.5px] font-bold text-white"
                >
                  <PlayMark /> Get it on Google Play
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-3 py-[6px] text-[12.5px] font-semibold text-[var(--color-ink-3)]">
                  <PlayMark /> Coming to Google Play
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} aria-hidden="true" fill="currentColor">
      <path d="M4.2 2.3a1 1 0 0 0-.5.9v17.6a1 1 0 0 0 .5.9l9.4-9.7-9.4-9.7zm10.7 8.4 2.9-3-9.1-5.2 6.2 8.2zm0 2.6-6.2 8.2 9.1-5.2-2.9-3zm1.3-1.3 3.3-1.9c.7-.4.7-1.4 0-1.8l-3.3-1.9-2 2.8 2 2.8z" />
    </svg>
  );
}
