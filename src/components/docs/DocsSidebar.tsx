"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { DOCS_NAV } from "@/lib/docs/nav";
import { cn } from "@/lib/utils/cn";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation">
      <div className="flex flex-col gap-7">
        {DOCS_NAV.map((group) => (
          <div key={group.title}>
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
              {group.title}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-[7px] px-2.5 py-[7px] text-[13.5px] transition-colors",
                        active
                          ? "bg-[var(--color-mint)]/10 font-semibold text-[var(--color-mint)]"
                          : "text-[var(--color-muted)] hover:bg-[var(--color-bg-3)] hover:text-[var(--color-ink)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

export function DocsSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile: the sidebar is the only way to navigate the reference, so it
          gets a real trigger rather than being hidden away. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-3 text-[14px] font-semibold text-white shadow-lg lg:hidden"
      >
        <Menu size={16} aria-hidden="true" />
        Docs menu
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            role="presentation"
          />
          <div className="absolute inset-y-0 left-0 w-[290px] overflow-y-auto bg-[var(--color-bg)] p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[14px] font-bold text-[var(--color-ink)]">Documentation</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              >
                <X size={18} />
              </button>
            </div>
            <NavList onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <aside className="hidden lg:block">
        <div className="sticky top-[92px] max-h-[calc(100vh-120px)] overflow-y-auto pb-10 pr-4">
          <NavList />
        </div>
      </aside>
    </>
  );
}
