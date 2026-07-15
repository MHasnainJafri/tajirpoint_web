"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Icon } from "@/components/design/Icon";
import { ThemeToggle } from "@/components/design/ThemeToggle";
import {
  VERTICALS,
  MEGA_EXT_VERTICALS,
  MEGA_EXT_PAYMENTS,
  MEGA_EXT_INTEGRATIONS,
  EXTENSIONS,
} from "@/lib/design/catalog";
import { siteConfig } from "@/lib/config/site";
import type { Locale } from "@/i18n/routing";

type MegaKey = "solutions" | "extensions";

type LocaleEntry = { code: Locale; label: string; dot: string };

const DEFAULT_LOCALE: LocaleEntry = { code: "en", label: "EN", dot: "E" };

const LOCALE_CYCLE: LocaleEntry[] = [
  DEFAULT_LOCALE,
  { code: "ur", label: "اردو", dot: "ا" },
  { code: "ar", label: "العربية", dot: "ع" },
];

const linkBase =
  "rounded-full px-[14px] py-[9px] text-[14.5px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink-2)]";

export function Nav() {
  const t = useTranslations("nav");
  const tExt = useTranslations("extensions.items");
  const tSol = useTranslations("solutions.industries");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const [mega, setMega] = useState<MegaKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigating away must never leave a mega menu or the drawer hanging open.
  // Handled on click (the panels below delegate to this) rather than in an
  // effect on `pathname`, which would cascade an extra render on every route.
  const closeAll = useCallback(() => {
    setMega(null);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const cycleLocale = useCallback(() => {
    const i = LOCALE_CYCLE.findIndex((l) => l.code === locale);
    const next = LOCALE_CYCLE[(i + 1) % LOCALE_CYCLE.length] ?? DEFAULT_LOCALE;
    router.replace(pathname, { locale: next.code });
  }, [locale, pathname, router]);

  const current = LOCALE_CYCLE.find((l) => l.code === locale) ?? DEFAULT_LOCALE;
  const solid = scrolled || mega !== null;

  return (
    <div onMouseLeave={() => setMega(null)} className="fixed inset-x-0 top-0 z-[90]">
      <div
        className="flex items-center justify-between px-5 py-3 transition-[background-color,border-color,backdrop-filter] duration-[400ms] md:px-10"
        style={{
          background: solid ? "var(--glass-nav)" : "transparent",
          backdropFilter: solid ? "blur(16px)" : "blur(0px)",
          borderBottom: `1px solid ${solid ? "var(--color-line)" : "transparent"}`,
        }}
      >
        <Link href="/" className="flex items-center" onMouseEnter={() => setMega(null)}>
          {/* Logo swaps with the theme; both ship so there is no toggle flash. */}
          <Image
            src="/brand/lockup/lockup-on-white.svg"
            alt="TajirPoint"
            width={151}
            height={42}
            priority
            className="h-[42px] w-auto dark:hidden"
          />
          <Image
            src="/brand/lockup/lockup-on-dark.svg"
            alt="TajirPoint"
            width={151}
            height={42}
            priority
            className="hidden h-[42px] w-auto dark:block"
          />
        </Link>

        {/* ── Desktop links ─────────────────────────────────────────── */}
        <div className="hidden items-center gap-[6px] lg:flex">
          <Link href="/#platform" className={linkBase} onMouseEnter={() => setMega(null)}>
            {t("platform")}
          </Link>

          <MegaTrigger
            label={t("solutions")}
            open={mega === "solutions"}
            onOpen={() => setMega("solutions")}
          />
          <MegaTrigger
            label={t("extensions")}
            open={mega === "extensions"}
            onOpen={() => setMega("extensions")}
          />

          <Link href="/#pricing" className={linkBase} onMouseEnter={() => setMega(null)}>
            {t("pricing")}
          </Link>
          <Link href="/#faq" className={linkBase} onMouseEnter={() => setMega(null)}>
            {t("faq")}
          </Link>
        </div>

        {/* ── Right rail ────────────────────────────────────────────── */}
        <div className="flex items-center gap-[10px]">
          <ThemeToggle className="hidden md:inline-flex" />

          <button
            type="button"
            onClick={cycleLocale}
            aria-label={`Language: ${current.label}`}
            className="hidden cursor-pointer items-center gap-[7px] rounded-full border border-[var(--color-line-2)] bg-[var(--surface-2)] px-[14px] py-2 text-[13px] font-semibold text-[var(--color-ink-3)] transition-colors hover:border-[var(--color-line-2)] md:inline-flex"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[rgba(0,210,122,.2)] text-[9px] font-bold text-[var(--color-mint-2)]">
              {current.dot}
            </span>
            {current.label}
            <span className="text-[8px] opacity-60">▼</span>
          </button>

          <a
            href={siteConfig.dashboardUrl}
            className="hidden whitespace-nowrap rounded-full border border-[var(--color-line-2)] bg-[var(--surface-2)] px-4 py-[9px] text-[14px] font-semibold text-[var(--color-ink-3)] transition-colors hover:border-[var(--color-line-2)] hover:text-[var(--color-ink-2)] sm:inline-flex"
          >
            {t("signIn")}
          </a>

          <a
            href={siteConfig.calendlyUrl}
            className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-full bg-[var(--color-mint)] px-5 py-[10px] text-[14px] font-bold text-[var(--color-mint-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(0,210,122,.35)]"
          >
            {t("bookDemo")} <span className="text-[15px]">→</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--color-line-2)] bg-[var(--surface-2)] text-[var(--color-ink)] lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Solutions mega ──────────────────────────────────────────── */}
      {mega === "solutions" && (
        <MegaPanel onNavigate={closeAll}>
          <div className="grid grid-cols-[300px_1fr_1fr] gap-9">
            <MegaFeature
              href="/solutions"
              badge={t("megaSolutions.badge")}
              title={t("megaSolutions.title")}
              desc={t("megaSolutions.desc")}
              cta={t("megaSolutions.cta")}
            />
            <MegaColumn heading={t("megaSolutions.groupA")}>
              {VERTICALS.slice(0, 3).map((v) => (
                <MegaVertical
                  key={v.id}
                  id={v.id}
                  icon={v.icon}
                  name={tSol(`${v.id}.name`)}
                  desc={tSol(`${v.id}.tag`)}
                />
              ))}
            </MegaColumn>
            <MegaColumn heading={t("megaSolutions.groupB")}>
              {VERTICALS.slice(3).map((v) => (
                <MegaVertical
                  key={v.id}
                  id={v.id}
                  icon={v.icon}
                  name={tSol(`${v.id}.name`)}
                  desc={tSol(`${v.id}.tag`)}
                />
              ))}
            </MegaColumn>
          </div>
        </MegaPanel>
      )}

      {/* ── Extensions mega ─────────────────────────────────────────── */}
      {mega === "extensions" && (
        <MegaPanel onNavigate={closeAll}>
          <div className="grid grid-cols-[300px_1fr_1fr_1fr] gap-9">
            <MegaFeature
              href="/extensions"
              badge={t("megaExtensions.badge")}
              badgeDot
              title={t("megaExtensions.title")}
              desc={t("megaExtensions.desc")}
              cta={t("megaExtensions.cta")}
            />

            <MegaColumn heading={t("megaExtensions.groupPacks")} tight>
              {MEGA_EXT_VERTICALS.map((id) => {
                const ext = EXTENSIONS.find((e) => e.id === id)!;
                return (
                  <MegaRow key={id} icon={ext.icon}>
                    {tExt(`${id}.name`)}
                  </MegaRow>
                );
              })}
            </MegaColumn>

            <MegaColumn heading={t("megaExtensions.groupPayments")} tight>
              {MEGA_EXT_PAYMENTS.map((p) => (
                <MegaRow
                  key={p.id}
                  icon={p.icon}
                  tag={p.live ? t("megaExtensions.live") : t("megaExtensions.soon")}
                  tagColor={p.live ? "var(--color-mint-2)" : "rgba(245,165,36,.9)"}
                >
                  {tExt(`${p.id}.name`)}
                </MegaRow>
              ))}
            </MegaColumn>

            <MegaColumn heading={t("megaExtensions.groupIntegrations")} tight>
              {MEGA_EXT_INTEGRATIONS.map((m) => (
                <MegaRow key={m.id} icon={m.icon}>
                  {t(`megaExtensions.integrations.${m.id}`)}
                </MegaRow>
              ))}
            </MegaColumn>
          </div>
        </MegaPanel>
      )}

      {/* ── Mobile drawer (not in the desktop design — same language) ─ */}
      {mobileOpen && (
        <div
          onClick={closeAll}
          className="max-h-[calc(100dvh-66px)] overflow-y-auto border-b border-[var(--color-line)] bg-[var(--glass-panel)] px-5 py-6 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col gap-1">
            <MobileLink href="/#platform">{t("platform")}</MobileLink>
            <MobileLink href="/solutions">{t("solutions")}</MobileLink>
            <MobileLink href="/extensions">{t("extensions")}</MobileLink>
            <MobileLink href="/#pricing">{t("pricing")}</MobileLink>
            <MobileLink href="/#faq">{t("faq")}</MobileLink>
          </nav>
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-line)] pt-5">
            <ThemeToggle />
            <button
              type="button"
              onClick={cycleLocale}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-line-2)] bg-[var(--surface-2)] px-4 py-2 text-[13px] font-semibold"
            >
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[rgba(0,210,122,.2)] text-[9px] font-bold text-[var(--color-mint-2)]">
                {current.dot}
              </span>
              {current.label}
            </button>
            <a
              href={siteConfig.dashboardUrl}
              className="rounded-full border border-[var(--color-line-2)] bg-[var(--surface-2)] px-4 py-2 text-[14px] font-semibold"
            >
              {t("signIn")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Pieces ──────────────────────────────────────────────────────── */

function MegaTrigger({
  label,
  open,
  onOpen,
}: {
  label: string;
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onOpen}
      onClick={onOpen}
      aria-expanded={open}
      className="inline-flex cursor-pointer items-center gap-[6px] whitespace-nowrap rounded-full px-[14px] py-[9px] text-[14.5px] font-medium transition-colors"
      style={{
        background: open ? "var(--surface-strong)" : "transparent",
        color: open ? "var(--color-ink-2)" : "var(--color-muted)",
      }}
    >
      {label}
      <span
        className="text-[9px] opacity-70 transition-transform duration-[250ms]"
        style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        ▼
      </span>
    </button>
  );
}

function MegaPanel({
  children,
  onNavigate,
}: {
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <div
      onClick={onNavigate}
      className="hidden animate-[tpMenuIn_.25s_cubic-bezier(.22,1,.36,1)_both] border-b border-[var(--color-line)] bg-[var(--glass-panel)] shadow-[0_40px_90px_rgba(0,0,0,.35)] backdrop-blur-xl lg:block"
    >
      <div className="mx-auto max-w-[1200px] px-10 py-[34px]">{children}</div>
    </div>
  );
}

function MegaFeature({
  href,
  badge,
  badgeDot,
  title,
  desc,
  cta,
}: {
  href: string;
  badge: string;
  badgeDot?: boolean;
  title: string;
  desc: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col justify-between rounded-2xl border border-[var(--color-mint-line)] p-6 transition-colors hover:border-[rgba(0,210,122,.6)]"
      style={{
        background: "linear-gradient(160deg,rgba(0,210,122,.14),rgba(0,210,122,.03) 65%)",
      }}
    >
      <div>
        <span className="inline-flex items-center gap-[7px] rounded-full bg-[var(--color-mint)] px-3 py-[5px] font-mono text-[10px] font-semibold tracking-[1.5px] text-[var(--color-mint-ink)]">
          {badgeDot && <span className="h-[6px] w-[6px] rounded-full bg-[var(--color-mint-ink)]" />}
          {badge}
        </span>
        <div className="mt-4 text-[21px] font-extrabold leading-[1.15] tracking-[-0.02em]">
          {title}
        </div>
        <div className="mt-[10px] text-[13.5px] leading-[1.55] text-[var(--color-muted)]">
          {desc}
        </div>
      </div>
      <div className="mt-[22px] text-[14px] font-bold text-[var(--color-mint-2)]">{cta} →</div>
    </Link>
  );
}

function MegaColumn({
  heading,
  tight,
  children,
}: {
  heading: string;
  tight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="px-3 pb-[10px] font-mono text-[10.5px] tracking-[2px] text-[var(--color-muted-3)]">
        {heading}
      </div>
      <div className={`flex flex-col ${tight ? "gap-[2px]" : "gap-1"}`}>{children}</div>
    </div>
  );
}

function MegaVertical({
  id,
  icon,
  name,
  desc,
}: {
  id: string;
  icon: string;
  name: string;
  desc: string;
}) {
  return (
    <Link
      href={`/solutions#${id}`}
      className="flex items-start gap-[14px] rounded-xl p-3 transition-colors hover:bg-[var(--surface-2)]"
    >
      <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[10px] border border-[rgba(0,210,122,.22)] bg-[rgba(0,210,122,.1)] text-[var(--color-mint-2)]">
        <Icon name={icon} size={18} />
      </span>
      <span>
        <span className="block text-[14.5px] font-bold">{name}</span>
        <span className="mt-[3px] block text-[12.5px] leading-[1.4] text-[var(--color-muted-2)]">
          {desc}
        </span>
      </span>
    </Link>
  );
}

function MegaRow({
  icon,
  tag,
  tagColor,
  children,
}: {
  icon: string;
  tag?: string;
  tagColor?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href="/extensions"
      className="flex items-center justify-between gap-[11px] rounded-[10px] px-3 py-[9px] text-[14px] font-semibold text-[var(--color-ink-3)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--color-ink-2)]"
    >
      <span className="flex items-center gap-[11px]">
        <span className="inline-flex text-[var(--color-mint-2)] opacity-85">
          <Icon name={icon} size={16} />
        </span>
        {children}
      </span>
      {tag && (
        <span className="font-mono text-[9px] tracking-[1px]" style={{ color: tagColor }}>
          {tag}
        </span>
      )}
    </Link>
  );
}

function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-xl px-3 py-3 text-[16px] font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--surface-2)]"
    >
      {children}
    </Link>
  );
}
