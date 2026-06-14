"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Lockup } from "@/components/brand/Lockup";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { MegaSolutions } from "./mega/MegaSolutions";
import { MegaExtensions } from "./mega/MegaExtensions";
import type { Locale } from "@/i18n/routing";

type MegaKey = "business" | "extensions";

const LOCALES: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "EN", native: "English" },
  { code: "ur", label: "UR", native: "اردو" },
  { code: "ar", label: "AR", native: "العربية" },
];

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [openMega, setOpenMega] = useState<MegaKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Desktop nav items — mega items also have href for click navigation
  const navItems: Array<{ label: string; mega?: MegaKey; href: string }> = [
    { label: t("solutions"), mega: "business", href: "/solutions" },
    { label: t("extensions"), mega: "extensions", href: "/extensions" },
    { label: t("pricing"), href: "/pricing" },
  ];

  const open = (id: MegaKey) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setOpenMega(id);
  };
  const close = () => {
    hideTimer.current = setTimeout(() => setOpenMega(null), 150);
  };
  const cancelClose = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const switchLocale = (next: Locale) => {
    setLangOpen(false);
    // next-intl handles the cookie + navigation — no full reload needed
    router.replace(pathname, { locale: next });
  };

  // Close lang dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const currentLang = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]!;

  return (
    <nav
      id="nav"
      className="sticky top-0 z-50 bg-white/[0.85] backdrop-blur-xl border-b border-[var(--color-line)]"
      aria-label="Main"
    >
      {/* Page scrim */}
      <div
        className={cn(
          "fixed inset-0 top-[74px] bg-black/30 z-[45] transition-opacity duration-200",
          openMega ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
        onClick={() => setOpenMega(null)}
      />

      <div className="mx-auto max-w-[1320px] px-7 lg:px-10 flex items-center gap-9 h-[74px]">
        <Link href="/" aria-label="Tajir Point home">
          <Lockup />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex gap-[2px] text-[14.5px] font-medium text-[var(--color-ink-2)] ms-[18px]">
          {navItems.map((item) =>
            item.mega ? (
              // Mega items: hover shows panel, click navigates to page
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-[14px] py-[10px] rounded-[10px] cursor-pointer flex items-center gap-1.5 transition-colors",
                  openMega === item.mega ? "bg-[var(--color-bg-3)]" : "hover:bg-[var(--color-bg-3)]"
                )}
                onMouseEnter={() => open(item.mega!)}
                onMouseLeave={close}
                onFocus={() => open(item.mega!)}
                aria-expanded={openMega === item.mega}
                aria-haspopup="true"
              >
                {item.label}
                <span
                  className={cn(
                    "text-[9px] opacity-45 transition-transform",
                    openMega === item.mega && "rotate-180"
                  )}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </Link>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="px-[14px] py-[10px] rounded-[10px] hover:bg-[var(--color-bg-3)] transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="ms-auto flex items-center gap-[10px]">
          {/* Language switcher */}
          <div ref={langRef} className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-muted)] px-3 py-2 rounded-full hover:bg-[var(--color-bg-3)] transition-colors cursor-pointer"
              aria-label="Switch language"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <span className="w-4 h-4 rounded-full bg-[var(--color-bg-3)] flex items-center justify-center text-[10px] font-bold">
                {currentLang.label[0]}
              </span>
              {currentLang.label}
              <span
                className={cn(
                  "text-[9px] opacity-45 transition-transform",
                  langOpen && "rotate-180"
                )}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>

            {langOpen && (
              <ul
                role="listbox"
                aria-label="Select language"
                className="absolute end-0 mt-1.5 w-[160px] bg-white border border-[var(--color-line)] rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-1.5 z-[60]"
              >
                {LOCALES.map((l) => (
                  <li key={l.code} role="option" aria-selected={l.code === locale}>
                    <button
                      type="button"
                      onClick={() => switchLocale(l.code)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13.5px] transition-colors text-start",
                        l.code === locale
                          ? "font-semibold text-[var(--color-ink)]"
                          : "text-[var(--color-muted)] hover:bg-[var(--color-bg-3)] hover:text-[var(--color-ink)]"
                      )}
                    >
                      <span className="w-5 text-center font-mono text-[11px] opacity-60">
                        {l.label}
                      </span>
                      <span>{l.native}</span>
                      {l.code === locale && (
                        <span
                          className="ms-auto w-1.5 h-1.5 rounded-full bg-[var(--color-mint)]"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Button asChild variant="soft" size="sm" className="hidden sm:inline-flex">
            <a href="https://app.tajirpoint.com" target="_blank" rel="noopener noreferrer">
              {t("signIn")}
            </a>
          </Button>
          <Button asChild variant="primary" size="sm">
            <Link href="/book-demo">
              {t("bookDemo")} <span className="inline-block rtl:rotate-180">→</span>
            </Link>
          </Button>
          <button
            type="button"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-[var(--color-bg-3)]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mega panels — desktop only */}
      <div className="hidden lg:block">
        <MegaPanel
          id="business"
          open={openMega === "business"}
          onEnter={cancelClose}
          onLeave={close}
        >
          <MegaSolutions />
        </MegaPanel>
        <MegaPanel
          id="extensions"
          open={openMega === "extensions"}
          onEnter={cancelClose}
          onLeave={close}
        >
          <MegaExtensions />
        </MegaPanel>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--color-line)] bg-white px-7 py-6">
          <ul className="flex flex-col gap-1 text-[15px] font-medium" role="list">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-[var(--color-bg-3)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{item.label}</span>
                  {item.mega && <span className="text-[13px] text-[var(--color-muted)]">→</span>}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile language switcher */}
          <div className="mt-6 flex gap-2 flex-wrap">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  switchLocale(l.code);
                  setMobileOpen(false);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors",
                  l.code === locale
                    ? "bg-[var(--color-ink)] text-white"
                    : "bg-[var(--color-bg-3)] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                )}
              >
                {l.label} · {l.native}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Button asChild variant="soft" size="sm">
              <a href="https://app.tajirpoint.com" target="_blank" rel="noopener noreferrer">
                {t("signIn")}
              </a>
            </Button>
            <Button asChild variant="primary" size="sm">
              <Link href="/book-demo" onClick={() => setMobileOpen(false)}>
                {t("bookDemo")} →
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function MegaPanel({
  id,
  open,
  onEnter,
  onLeave,
  children,
}: {
  id: MegaKey;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      id={`mega-${id}`}
      role="region"
      aria-label={`${id} menu`}
      className={cn(
        "absolute left-0 right-0 top-[74px] bg-white border-b border-[var(--color-line)] z-[46]",
        "shadow-[0_16px_48px_rgba(0,0,0,0.14)]",
        "transition-[opacity,transform] duration-150 ease-out",
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-1.5 pointer-events-none"
      )}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
