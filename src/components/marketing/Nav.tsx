"use client";

import { useState, useEffect, useCallback, useRef, useId } from "react";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Icon } from "@/components/design/Icon";
import { Wordmark } from "@/components/brand/Wordmark";
import { LocaleMenu } from "@/components/marketing/LocaleMenu";
import {
  FEATURES,
  MEGA_EXT_VERTICALS,
  MEGA_EXT_PAYMENTS,
  MEGA_EXT_INTEGRATIONS,
  EXTENSIONS,
} from "@/lib/design/catalog";
import { BUSINESSES, businessLabel } from "@/lib/marketing/businesses";
import { siteConfig } from "@/lib/config/site";

type MegaKey = "product" | "businesses" | "extensions" | "resources";

/** Pages that exist — nothing in the menu may 404. */
const RESOURCES = [
  { id: "demo", href: "/book-demo" },
  { id: "contact", href: "/contact" },
  { id: "security", href: "/security" },
  { id: "about", href: "/about" },
  { id: "docs", href: "/docs" },
] as const;

const linkBase =
  "inline-flex items-center gap-[5px] whitespace-nowrap rounded-full px-[14px] py-[9px] text-[13.5px] font-semibold text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--color-surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)]";

const startFreeCls =
  "whitespace-nowrap rounded-full bg-[var(--color-mint)] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-px hover:shadow-[0_10px_22px_rgba(0,210,122,.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint-2)]";

/**
 * The header is `sticky`, not `fixed` — it occupies layout space, so pages
 * start directly underneath it.
 *
 * Desktop menus open on hover and on click/Enter/Space; Escape closes the
 * open one and returns focus to its trigger; focus leaving the header closes
 * it. The mobile drawer carries the same links as accordions, plus Book a
 * demo and Start free.
 */
export function Nav() {
  const t = useTranslations("nav");
  const tExt = useTranslations("extensions.items");
  const tFeat = useTranslations("nav.megaFeatures.items");
  const tRes = useTranslations("nav.megaResources.items");
  const locale = useLocale();
  const pathname = usePathname();
  const baseId = useId();

  const [mega, setMega] = useState<MegaKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MegaKey | null>("businesses");
  const triggers = useRef<Partial<Record<MegaKey, HTMLButtonElement | null>>>({});
  const headerRef = useRef<HTMLElement>(null);

  const closeAll = useCallback(() => {
    setMega(null);
    setMobileOpen(false);
  }, []);

  // A route change closes every menu.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with the router, not a render loop
    closeAll();
  }, [pathname, closeAll]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mega) triggers.current[mega]?.focus();
      closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll, mega]);

  const panelId = (key: MegaKey) => `${baseId}-${key}`;
  const trigger = (key: MegaKey, label: string) => (
    <MegaTrigger
      label={label}
      open={mega === key}
      controls={panelId(key)}
      buttonRef={(el) => {
        triggers.current[key] = el;
      }}
      onHover={() => setMega(key)}
      onToggle={() => setMega((m) => (m === key ? null : key))}
    />
  );

  const productPanel = (
    <MegaPanel id={panelId("product")} open={mega === "product"} onNavigate={closeAll}>
      <div className="grid grid-cols-[repeat(2,minmax(0,1fr))_250px] gap-7">
        <MegaColumn heading={t("megaFeatures.groupMoney")}>
          {FEATURES.filter((f) => f.group === "money").map((f) => (
            <MegaLink
              key={f.id}
              href={f.href}
              title={tFeat(`${f.id}.name`)}
              sub={tFeat(`${f.id}.desc`)}
            />
          ))}
        </MegaColumn>
        <MegaColumn heading={t("megaFeatures.groupOps")}>
          {FEATURES.filter((f) => f.group === "ops").map((f) => (
            <MegaLink
              key={f.id}
              href={f.href}
              title={tFeat(`${f.id}.name`)}
              sub={tFeat(`${f.id}.desc`)}
            />
          ))}
        </MegaColumn>
        <Link
          href="/features/khata"
          className="flex min-h-[220px] flex-col justify-between gap-5 rounded-[16px] bg-[#0A0A0A] p-5 text-white transition-transform duration-[250ms] hover:-translate-y-[3px]"
        >
          <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-mint)]">
            {t("megaFeatures.badge")}
          </span>
          <span>
            <span className="block text-[21px] font-bold leading-[1.15] tracking-[-0.03em]">
              {t("megaFeatures.title")}
            </span>
            <span className="mt-2 block text-[12.5px] leading-[1.55] text-[#B5B9C2]">
              {t("megaFeatures.desc")}
            </span>
          </span>
          <span className="text-[12.5px] font-semibold text-[var(--color-mint)]">
            {t("megaFeatures.cta")} →
          </span>
        </Link>
      </div>
    </MegaPanel>
  );

  const businessesPanel = (
    <MegaPanel id={panelId("businesses")} open={mega === "businesses"} onNavigate={closeAll}>
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-7">
        <div>
          <MegaHeading>{t("megaBusinesses.heading")}</MegaHeading>
          <ul className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-x-4 gap-y-[2px]">
            {BUSINESSES.map((b) => {
              const label = businessLabel(b, locale);
              return (
                <li key={b.slug}>
                  <Link
                    href={`/business/${b.slug}`}
                    className="-mx-[10px] flex gap-3 rounded-[12px] px-[10px] py-[9px] transition-colors duration-200 hover:bg-[var(--color-surface)] focus-visible:bg-[var(--color-surface)] focus-visible:outline-2 focus-visible:outline-[var(--color-mint-2)]"
                  >
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-[10px] bg-[var(--color-mint-soft)]">
                      <Icon name={b.icon} size={19} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13.5px] font-bold text-[var(--color-ink)]">
                        {label.name}
                      </span>
                      <span className="mt-px block text-[12px] leading-[1.45] text-[var(--color-muted)]">
                        {label.navLine}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/business"
            className="mt-3 inline-block text-[12.5px] font-semibold text-[var(--color-ink)] hover:underline"
          >
            {t("megaBusinesses.viewAll")} →
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/book-demo"
            className="flex flex-1 flex-col justify-between gap-4 rounded-[16px] bg-[#0A0A0A] p-5 transition-transform duration-[250ms] hover:-translate-y-[3px]"
          >
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-mint)]">
              {t("megaBusinesses.demoBadge")}
            </span>
            <span>
              <span className="block text-[19px] font-bold leading-[1.2] tracking-[-0.02em] text-white">
                {t("megaBusinesses.demoTitle")}
              </span>
              <span className="mt-2 block text-[12.5px] leading-[1.55] text-[#B5B9C2]">
                {t("megaBusinesses.demoSub")}
              </span>
            </span>
            <span className="text-[12.5px] font-semibold text-[var(--color-mint)]">
              {t("megaBusinesses.demoCta")} →
            </span>
          </Link>
          <Link
            href="/book-demo?migrate=1"
            className="rounded-[16px] border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] p-4 transition-colors hover:bg-[#d6f6e6]"
          >
            <span className="block text-[13.5px] font-bold text-[var(--color-ink)]">
              {t("megaBusinesses.migrateTitle")}
            </span>
            <span className="mt-1 block text-[12px] leading-[1.5] text-[var(--color-body)]">
              {t("megaBusinesses.migrateSub")}
            </span>
          </Link>
        </div>
      </div>
    </MegaPanel>
  );

  const extensionsPanel = (
    <MegaPanel id={panelId("extensions")} open={mega === "extensions"} onNavigate={closeAll}>
      <div className="grid grid-cols-[1.2fr_1fr] gap-8">
        <div>
          <MegaHeading>{t("megaExtensions.groupPacks")}</MegaHeading>
          <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-x-5 gap-y-[2px]">
            {[...MEGA_EXT_VERTICALS, ...MEGA_EXT_PAYMENTS.map((p) => p.id)].map((id) => {
              const ext = EXTENSIONS.find((e) => e.id === id);
              if (!ext) return null;
              const soon = "note" in ext && ext.note === "soon";
              return (
                <Link
                  key={id}
                  href="/extensions"
                  className="-mx-[10px] flex items-center gap-[10px] rounded-[10px] px-[10px] py-[9px] text-[13.5px] font-semibold transition-colors duration-200 hover:bg-[var(--color-surface)]"
                >
                  <span className="inline-flex text-[var(--color-mint-2)]">
                    <Icon name={ext.icon} size={16} />
                  </span>
                  {tExt(`${id}.name`)}
                  {soon && (
                    <span className="rounded-full bg-[var(--color-surface)] px-[6px] py-[1px] text-[10px] font-bold text-[var(--color-muted)]">
                      {t("megaExtensions.soon")}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-[16px] bg-[var(--color-surface)] p-5">
          <div>
            <div className="text-[16px] font-bold tracking-[-0.02em]">
              {t("megaExtensions.title")}
            </div>
            <p className="mt-[6px] text-[12.5px] leading-[1.55] text-[var(--color-muted)]">
              {t("megaExtensions.desc")}
            </p>
          </div>
          <div className="flex flex-wrap gap-[6px]">
            {MEGA_EXT_INTEGRATIONS.map((m) => (
              <span
                key={m.id}
                className="rounded-full bg-white px-[11px] py-[6px] text-[12px] font-semibold"
              >
                {t(`megaExtensions.integrations.${m.id}`)}
              </span>
            ))}
          </div>
          <Link href="/extensions" className="text-[12.5px] font-semibold">
            {t("megaExtensions.cta")} →
          </Link>
        </div>
      </div>
    </MegaPanel>
  );

  const resourcesPanel = (
    <MegaPanel id={panelId("resources")} open={mega === "resources"} onNavigate={closeAll}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[10px]">
        {RESOURCES.map((r) => (
          <Link
            key={r.id}
            href={r.href}
            className="rounded-[14px] border border-[var(--color-line)] p-[14px] transition-colors duration-200 hover:bg-[var(--color-surface)]"
          >
            <span className="block text-[14px] font-bold">{tRes(`${r.id}.title`)}</span>
            <span className="mt-[3px] block text-[12px] leading-[1.5] text-[var(--color-muted)]">
              {tRes(`${r.id}.sub`)}
            </span>
          </Link>
        ))}
      </div>
    </MegaPanel>
  );

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => setMega(null)}
      onBlur={(e) => {
        if (!headerRef.current?.contains(e.relatedTarget as Node | null)) setMega(null);
      }}
      className="sticky top-0 z-[60] border-b border-[var(--color-line)] bg-[var(--glass-nav)] backdrop-blur-[16px]"
    >
      <div className="mx-auto flex h-[66px] max-w-[1240px] items-center justify-between gap-3 px-[clamp(14px,3vw,24px)]">
        <Link
          href="/"
          aria-label="TajirPoint home"
          className="flex min-w-0 items-center gap-2 text-[var(--color-ink)]"
          onMouseEnter={() => setMega(null)}
        >
          <Wordmark />
          <span className="hidden whitespace-nowrap rounded-[6px] bg-[var(--color-surface)] px-[9px] py-1 font-[family-name:var(--font-mono)] text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)] tabs:inline">
            {t("chip")}
          </span>
        </Link>

        {/* ── Desktop links ─────────────────────────────────────────── */}
        <nav aria-label={t("mainLabel")} className="hidden items-center gap-[2px] nav:flex">
          {/* Each panel follows its trigger in the DOM, so Tab moves from
              an open trigger straight into its links. */}
          {trigger("product", t("product"))}
          {productPanel}
          {trigger("businesses", t("businesses"))}
          {businessesPanel}
          {trigger("extensions", t("extensions"))}
          {extensionsPanel}
          <Link href="/pricing" className={linkBase} onMouseEnter={() => setMega(null)}>
            {t("pricing")}
          </Link>
          {trigger("resources", t("resources"))}
          {resourcesPanel}
        </nav>

        {/* ── Right rail ────────────────────────────────────────────── */}
        <div className="flex flex-none items-center gap-2">
          <div className="hidden md:block">
            <LocaleMenu />
          </div>

          <a
            href={siteConfig.dashboardUrl}
            className="hidden whitespace-nowrap rounded-full px-4 py-[9px] text-[13.5px] font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)] nav:inline-flex"
          >
            {t("signIn")}
          </a>

          <Link
            href="/book-demo"
            className="hidden whitespace-nowrap rounded-full border border-[var(--color-line-3)] px-4 py-[9px] text-[13.5px] font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)] xl:inline-flex"
          >
            {t("bookDemo")}
          </Link>

          {/* Compact label below the desktop breakpoint: at 320px the full
              label pushes the burger past the right edge. */}
          <a
            href={siteConfig.signupUrl}
            className={`${startFreeCls} px-[14px] py-[9px] text-[13px] nav:hidden`}
          >
            {t("startFreeShort")}
          </a>
          <a
            href={siteConfig.signupUrl}
            className={`${startFreeCls} hidden px-[18px] py-[10px] text-[13.5px] nav:inline-flex`}
          >
            {t("startFree")}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            aria-controls={`${baseId}-drawer`}
            className="inline-flex h-[42px] w-[42px] flex-none cursor-pointer items-center justify-center rounded-[12px] border border-[var(--color-line-2)] bg-white text-[var(--color-ink)] nav:hidden"
          >
            {mobileOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────── */}
      <div
        id={`${baseId}-drawer`}
        hidden={!mobileOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-66px)] animate-[tpMenuIn_.22s_ease_both] overflow-y-auto overscroll-contain border-b border-[var(--color-line)] bg-white px-[clamp(14px,3vw,24px)] pb-6 pt-2 shadow-[0_30px_60px_rgba(10,10,10,.14)] nav:hidden"
      >
        <nav aria-label={t("mainLabel")} className="flex flex-col">
          <MobileSection
            label={t("businesses")}
            open={mobileSection === "businesses"}
            onToggle={() => setMobileSection((s) => (s === "businesses" ? null : "businesses"))}
            id={`${baseId}-m-businesses`}
          >
            {BUSINESSES.map((b) => (
              <MobileSubLink key={b.slug} href={`/business/${b.slug}`} onNavigate={closeAll}>
                <span className="grid h-8 w-8 flex-none place-items-center rounded-[9px] bg-[var(--color-mint-soft)]">
                  <Icon name={b.icon} size={17} />
                </span>
                {businessLabel(b, locale).name}
              </MobileSubLink>
            ))}
            <MobileSubLink href="/book-demo?migrate=1" onNavigate={closeAll}>
              <span className="font-semibold text-[var(--color-mint-2)]">
                {t("megaBusinesses.migrateTitle")}
              </span>
            </MobileSubLink>
          </MobileSection>

          <MobileSection
            label={t("product")}
            open={mobileSection === "product"}
            onToggle={() => setMobileSection((s) => (s === "product" ? null : "product"))}
            id={`${baseId}-m-product`}
          >
            {FEATURES.map((f) => (
              <MobileSubLink key={f.id} href={f.href} onNavigate={closeAll}>
                {tFeat(`${f.id}.name`)}
              </MobileSubLink>
            ))}
          </MobileSection>

          <MobileLink href="/extensions" onNavigate={closeAll}>
            {t("extensions")}
          </MobileLink>
          <MobileLink href="/pricing" onNavigate={closeAll}>
            {t("pricing")}
          </MobileLink>

          <MobileSection
            label={t("resources")}
            open={mobileSection === "resources"}
            onToggle={() => setMobileSection((s) => (s === "resources" ? null : "resources"))}
            id={`${baseId}-m-resources`}
          >
            {RESOURCES.map((r) => (
              <MobileSubLink key={r.id} href={r.href} onNavigate={closeAll}>
                {tRes(`${r.id}.title`)}
              </MobileSubLink>
            ))}
          </MobileSection>
        </nav>

        <div className="mt-5 flex flex-col gap-[10px]">
          <Link
            href="/book-demo"
            onClick={closeAll}
            className="rounded-full bg-[#0A0A0A] px-[18px] py-3 text-center text-[15px] font-bold text-white"
          >
            {t("bookDemo")}
          </Link>
          <a
            href={siteConfig.signupUrl}
            className={`${startFreeCls} px-[18px] py-3 text-center text-[15px]`}
          >
            {t("startFree")}
          </a>
          <p className="text-center text-[12.5px] text-[var(--color-muted)]">
            {t("megaBusinesses.startFreeNote")}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-[10px] border-t border-[var(--color-line)] pt-4">
          <LocaleMenu compact />
          <a
            href={siteConfig.dashboardUrl}
            className="shrink grow basis-[140px] rounded-full border border-[var(--color-line-2)] px-[18px] py-3 text-center text-[14px] font-semibold"
          >
            {t("signIn")}
          </a>
        </div>
      </div>
    </header>
  );
}

/* ── Pieces ──────────────────────────────────────────────────────── */

function MegaTrigger({
  label,
  open,
  controls,
  buttonRef,
  onHover,
  onToggle,
}: {
  label: string;
  open: boolean;
  controls: string;
  buttonRef: (el: HTMLButtonElement | null) => void;
  onHover: () => void;
  onToggle: () => void;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onMouseEnter={onHover}
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      className={`${linkBase} cursor-pointer ${open ? "bg-[var(--color-surface)]" : ""}`}
    >
      {label}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[14px] w-[14px] transition-transform duration-[250ms]"
        style={{ transform: open ? "rotate(180deg)" : undefined }}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}

/**
 * Always rendered (with `hidden` when closed) so `aria-controls` points at a
 * real element and the links are in the HTML for crawlers.
 */
function MegaPanel({
  id,
  open,
  children,
  onNavigate,
}: {
  id: string;
  open: boolean;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    // Clicks on links bubble here to close the panel; keyboard users follow
    // the links themselves, so there is no key handler to add.
    <div
      id={id}
      hidden={!open}
      onClick={(e) => {
        if ((e.target as Element).closest("a")) onNavigate();
      }}
      className="absolute inset-x-0 top-full hidden animate-[tpMenuIn_.22s_ease_both] border-b border-[var(--color-line)] bg-white shadow-[0_30px_60px_rgba(10,10,10,.12)] nav:block"
    >
      <div className="mx-auto max-w-[1240px] px-[clamp(14px,3vw,24px)] pb-[30px] pt-[26px]">
        {children}
      </div>
    </div>
  );
}

function MegaHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[10px] font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-2)]">
      {children}
    </div>
  );
}

function MegaColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <MegaHeading>{heading}</MegaHeading>
      <div className="flex flex-col gap-[2px]">{children}</div>
    </div>
  );
}

function MegaLink({ href, title, sub }: { href: string; title: string; sub: string }) {
  return (
    <Link
      href={href}
      className="-mx-[10px] block rounded-[10px] px-[10px] py-2 transition-colors duration-200 hover:bg-[var(--color-surface)]"
    >
      <span className="block text-[13.5px] font-semibold">{title}</span>
      <span className="mt-px block text-[12px] text-[var(--color-muted)]">{sub}</span>
    </Link>
  );
}

function MobileSection({
  label,
  open,
  onToggle,
  id,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[var(--color-line)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full cursor-pointer items-center justify-between py-[14px] text-start text-[15px] font-semibold text-[var(--color-ink)]"
      >
        {label}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-4 w-4 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div id={id} hidden={!open} className="pb-3">
        {children}
      </div>
    </div>
  );
}

function MobileSubLink({
  href,
  onNavigate,
  children,
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-center gap-3 rounded-[10px] px-2 py-[9px] text-[14.5px] font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  onNavigate,
  children,
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="border-b border-[var(--color-line)] py-[14px] text-[15px] font-semibold text-[var(--color-ink)]"
    >
      {children}
    </Link>
  );
}
