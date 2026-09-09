"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/design/Icon";
import { Wordmark } from "@/components/brand/Wordmark";
import { LocaleMenu } from "@/components/marketing/LocaleMenu";
import {
  VERTICALS,
  FEATURES,
  MEGA_EXT_VERTICALS,
  MEGA_EXT_PAYMENTS,
  MEGA_EXT_INTEGRATIONS,
  EXTENSIONS,
} from "@/lib/design/catalog";
import { siteConfig } from "@/lib/config/site";

type MegaKey = "solutions" | "extensions" | "product" | "resources";

/** Pages that actually exist — the design's Resources panel, minus the ones we
 *  haven't built (help centre, migration guide, blog) so nothing 404s. */
const RESOURCES = [
  { id: "docs", href: "/docs" },
  { id: "demo", href: "/book-demo" },
  { id: "security", href: "/security" },
  { id: "about", href: "/about" },
  { id: "contact", href: "/contact" },
] as const;

const linkBase =
  "inline-flex items-center gap-[5px] whitespace-nowrap rounded-full px-[14px] py-[9px] text-[13.5px] font-semibold text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--color-surface)]";

/**
 * The header is `sticky`, not `fixed` — it occupies layout space, which is what
 * the design assumes and what lets the page start directly underneath it
 * without every page having to reserve a gap.
 */
export function Nav() {
  const t = useTranslations("nav");
  const tExt = useTranslations("extensions.items");
  const tSol = useTranslations("solutions.industries");
  const tFeat = useTranslations("nav.megaFeatures.items");
  const tRes = useTranslations("nav.megaResources.items");

  const [mega, setMega] = useState<MegaKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = useCallback(() => {
    setMega(null);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll]);

  return (
    <header
      onMouseLeave={() => setMega(null)}
      className="sticky top-0 z-[60] border-b border-[var(--color-line)] bg-[var(--glass-nav)] backdrop-blur-[16px]"
    >
      <div className="mx-auto flex h-[66px] max-w-[1240px] items-center justify-between gap-4 px-[clamp(14px,3vw,24px)]">
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--color-ink)]"
          onMouseEnter={() => setMega(null)}
        >
          <Wordmark />
          <span className="hidden whitespace-nowrap rounded-[6px] bg-[var(--color-surface)] px-[9px] py-1 font-[family-name:var(--font-mono)] text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)] tabs:inline">
            {t("chip")}
          </span>
        </Link>

        {/* ── Desktop links ─────────────────────────────────────────── */}
        <nav className="hidden items-center gap-[2px] nav:flex">
          <MegaTrigger
            label={t("product")}
            open={mega === "product"}
            onOpen={() => setMega("product")}
          />
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
          <Link href="/pricing" className={linkBase} onMouseEnter={() => setMega(null)}>
            {t("pricing")}
          </Link>
          <MegaTrigger
            label={t("resources")}
            open={mega === "resources"}
            onOpen={() => setMega("resources")}
          />
        </nav>

        {/* ── Right rail ────────────────────────────────────────────── */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LocaleMenu />
          </div>

          <a
            href={siteConfig.dashboardUrl}
            className="hidden whitespace-nowrap rounded-full px-4 py-[9px] text-[13.5px] font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)] nav:inline-flex"
          >
            {t("signIn")}
          </a>

          {/* The design shortens this to "Free trial" in compact mode. It has to:
              at 320px the full label pushes the burger past the right edge. */}
          <Link
            href="/pricing"
            className="whitespace-nowrap rounded-full bg-[var(--color-mint)] px-[14px] py-[9px] text-[13px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-px hover:shadow-[0_10px_22px_rgba(0,210,122,.35)] nav:hidden"
          >
            {t("freeTrial")}
          </Link>
          <Link
            href="/pricing"
            className="hidden whitespace-nowrap rounded-full bg-[var(--color-mint)] px-[18px] py-[10px] text-[13.5px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-px hover:shadow-[0_10px_22px_rgba(0,210,122,.35)] nav:inline-flex"
          >
            {t("startTrial")}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            className="inline-flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-[12px] border border-[var(--color-line-2)] bg-white text-[var(--color-ink)] nav:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Product mega ────────────────────────────────────────────── */}
      {mega === "product" && (
        <MegaPanel onNavigate={closeAll}>
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

            {/* The signature feature gets a card of its own, as in the design. */}
            <Link
              href="/features/khata"
              className="flex min-h-[220px] flex-col justify-between gap-5 rounded-[16px] bg-[#0A0A0A] p-5 text-white transition-transform duration-[250ms] hover:-translate-y-[3px]"
            >
              <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-mint)]">
                {t("megaFeatures.badge")}
              </span>
              <div>
                <div className="text-[21px] font-bold leading-[1.15] tracking-[-0.03em]">
                  {t("megaFeatures.title")}
                </div>
                <p className="mt-2 text-[12.5px] leading-[1.55] text-[#B5B9C2]">
                  {t("megaFeatures.desc")}
                </p>
              </div>
              <span className="text-[12.5px] font-semibold text-[var(--color-mint)]">
                {t("megaFeatures.cta")} →
              </span>
            </Link>
          </div>
        </MegaPanel>
      )}

      {/* ── Solutions mega ──────────────────────────────────────────── */}
      {mega === "solutions" && (
        <MegaPanel onNavigate={closeAll}>
          <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[10px]">
            {VERTICALS.map((v) => (
              <Link
                key={v.id}
                href={`/solutions#${v.id}`}
                className="flex gap-3 rounded-[14px] border border-[var(--color-line)] p-[14px] transition-colors duration-200 hover:bg-[var(--color-surface)]"
              >
                <span className="grid h-9 w-9 flex-none place-items-center rounded-[10px] bg-[var(--color-mint-soft)] text-[var(--color-ink)]">
                  <Icon name={v.icon} size={19} />
                </span>
                <span>
                  <span className="block text-[14px] font-bold">{tSol(`${v.id}.name`)}</span>
                  <span className="mt-[2px] block text-[12px] text-[var(--color-muted)]">
                    {tSol(`${v.id}.tag`)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-[14px] flex flex-wrap justify-between gap-3 text-[12.5px] text-[var(--color-muted)]">
            <span>{t("megaSolutions.desc")}</span>
            <Link href="/contact" className="font-semibold text-[var(--color-ink)]">
              {t("megaSolutions.cta")} →
            </Link>
          </div>
        </MegaPanel>
      )}

      {/* ── Extensions mega ─────────────────────────────────────────── */}
      {mega === "extensions" && (
        <MegaPanel onNavigate={closeAll}>
          <div className="grid grid-cols-[1.2fr_1fr] gap-8">
            <div>
              <div className="mb-[10px] font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-2)]">
                {t("megaExtensions.groupPacks")}
              </div>
              <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-x-5 gap-y-[2px]">
                {[...MEGA_EXT_VERTICALS, ...MEGA_EXT_PAYMENTS.map((p) => p.id)].map((id) => {
                  const ext = EXTENSIONS.find((e) => e.id === id);
                  if (!ext) return null;
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
      )}

      {/* ── Resources mega ──────────────────────────────────────────── */}
      {mega === "resources" && (
        <MegaPanel onNavigate={closeAll}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[10px]">
            {RESOURCES.map((r) => (
              <Link
                key={r.id}
                href={r.href}
                className="rounded-[14px] border border-[var(--color-line)] p-[14px] transition-colors duration-200 hover:bg-[var(--color-surface)]"
              >
                <div className="text-[14px] font-bold">{tRes(`${r.id}.title`)}</div>
                <div className="mt-[3px] text-[12px] leading-[1.5] text-[var(--color-muted)]">
                  {tRes(`${r.id}.sub`)}
                </div>
              </Link>
            ))}
          </div>
        </MegaPanel>
      )}

      {/* ── Mobile drawer ───────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          onClick={closeAll}
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-66px)] animate-[tpMenuIn_.22s_ease_both] overflow-y-auto border-b border-[var(--color-line)] bg-white px-[clamp(14px,3vw,24px)] py-4 shadow-[0_30px_60px_rgba(10,10,10,.14)] nav:hidden"
        >
          <nav className="flex flex-col">
            {FEATURES.map((f) => (
              <MobileLink key={f.id} href={f.href}>
                {tFeat(`${f.id}.name`)}
              </MobileLink>
            ))}
            <MobileLink href="/solutions">{t("solutions")}</MobileLink>
            <MobileLink href="/extensions">{t("extensions")}</MobileLink>
            <MobileLink href="/pricing">{t("pricing")}</MobileLink>
            <MobileLink href="/docs">{tRes("docs.title")}</MobileLink>
            <MobileLink href="/contact">{tRes("contact.title")}</MobileLink>
          </nav>
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-4 flex flex-wrap items-center gap-[10px] border-t border-[var(--color-line)] pt-4"
          >
            <LocaleMenu compact />
            <a
              href={siteConfig.dashboardUrl}
              className="shrink grow basis-[140px] rounded-full border border-[var(--color-line-2)] px-[18px] py-3 text-center text-[14px] font-semibold"
            >
              {t("signIn")}
            </a>
          </div>
        </div>
      )}
    </header>
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
      className={`inline-flex cursor-pointer items-center gap-[5px] whitespace-nowrap rounded-full px-[14px] py-[9px] text-[13.5px] font-semibold text-[var(--color-ink)] transition-colors duration-200 ${
        open ? "bg-[var(--color-surface)]" : "hover:bg-[var(--color-surface)]"
      }`}
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
      className="absolute inset-x-0 top-full hidden animate-[tpMenuIn_.22s_ease_both] border-b border-[var(--color-line)] bg-white shadow-[0_30px_60px_rgba(10,10,10,.12)] nav:block"
    >
      <div className="mx-auto max-w-[1240px] px-[clamp(14px,3vw,24px)] pb-[30px] pt-[26px]">
        {children}
      </div>
    </div>
  );
}

function MegaColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-[10px] font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-2)]">
        {heading}
      </div>
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
      <div className="text-[13.5px] font-semibold">{title}</div>
      <div className="mt-px text-[12px] text-[var(--color-muted)]">{sub}</div>
    </Link>
  );
}

function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="border-b border-[var(--color-line)] py-[14px] text-[15px] font-semibold text-[var(--color-ink)]"
    >
      {children}
    </Link>
  );
}
