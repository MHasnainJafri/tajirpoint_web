"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/design/Icon";
import { EXTENSIONS, EXTENSION_CATEGORIES, type ExtensionCategory } from "@/lib/design/catalog";

type Filter = ExtensionCategory | "all";

export function ExtensionGrid() {
  const t = useTranslations("extensions");
  const tItems = useTranslations("extensions.items");
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? EXTENSIONS : EXTENSIONS.filter((e) => e.cat === filter)),
    [filter]
  );

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["all", EXTENSIONS.length]]);
    for (const cat of EXTENSION_CATEGORIES) {
      map.set(cat, EXTENSIONS.filter((e) => e.cat === cat).length);
    }
    return map;
  }, []);

  const filters: Filter[] = ["all", ...EXTENSION_CATEGORIES];

  return (
    <>
      {/* ── Sticky filter rail ──────────────────────────────────────── */}
      <div className="sticky top-[66px] z-[80] flex flex-wrap justify-center gap-2 border-b border-[var(--color-line-soft)] bg-[var(--glass-filter)] px-5 py-[14px] backdrop-blur-lg md:px-10">
        {filters.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className="cursor-pointer rounded-full border px-[18px] py-[9px] text-[13.5px] font-semibold transition-[background,color,border-color] duration-[250ms]"
              style={{
                background: active ? "var(--color-mint)" : "var(--surface-2)",
                color: active ? "var(--color-mint-ink)" : "var(--color-muted)",
                borderColor: active ? "var(--color-mint)" : "var(--color-line-2)",
              }}
            >
              {f === "all" ? t("filterAll") : t(`filters.${f}`)}{" "}
              <span className="font-mono text-[11px] opacity-65">{counts.get(f)}</span>
            </button>
          );
        })}
      </div>

      {/* ── Grid ────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1220px] px-5 pb-[90px] pt-[50px] md:px-10">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-[14px]">
          {visible.map((ext) => (
            <div
              key={ext.id}
              className="relative animate-[tpFadeUp_.5s_both] rounded-2xl border border-[var(--color-line)] bg-[var(--surface-1)] p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgba(0,210,122,.55)] hover:shadow-[0_18px_50px_rgba(0,0,0,.4)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-[rgba(0,210,122,.22)] bg-[rgba(0,210,122,.12)] text-[var(--color-mint-2)]">
                  <Icon name={ext.icon} size={19} />
                </span>
                <span className="rounded-full border border-[var(--color-mint-line)] px-[10px] py-1 font-mono text-[9.5px] uppercase tracking-[1.5px] text-[var(--color-mint-2)]">
                  {t(`filters.${ext.cat}`)}
                </span>
              </div>

              <h3 className="mt-4 text-[17px] font-bold tracking-[-0.01em]">
                {tItems(`${ext.id}.name`)}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.5] text-[var(--color-muted-2)]">
                {tItems(`${ext.id}.desc`)}
              </p>

              {"note" in ext && ext.note && (
                <div className="mt-3 inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[1px] text-[var(--color-muted-3)]">
                  <span className="h-[5px] w-[5px] rounded-full bg-[rgba(245,165,36,.8)]" />
                  {t(`notes.${ext.note}`)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
