import { useTranslations } from "next-intl";
import { EXTENSIONS, EXTENSION_CATEGORIES, EXTENSION_COUNT } from "@/lib/design/catalog";
import { EXTENSION_STATUS } from "@/lib/design/landing";
import { ExtensionFilter, type ExtensionCard } from "./ExtensionFilter";

/**
 * The marketplace grid.
 *
 * Ids, categories and per-extension copy already live in `catalog.ts` and
 * `messages.extensions.*` — the same source the /extensions page reads — so
 * this section adds only the design's status badge rather than forking a
 * second list of 31.
 */
export function Extensions() {
  const t = useTranslations("landing.extensions");
  const tItems = useTranslations("extensions.items");

  const items: ExtensionCard[] = EXTENSIONS.map((e) => {
    const status = EXTENSION_STATUS[e.id] ?? "live";
    return {
      id: e.id,
      name: tItems(`${e.id}.name`),
      desc: tItems(`${e.id}.desc`),
      icon: e.icon,
      cat: e.cat,
      catLabel: t(`cats.${e.cat}`),
      status,
      statusLabel: t(`status.${status}`),
    };
  });

  const cats = EXTENSION_CATEGORIES.map((c) => ({ id: c, label: t(`cats.${c}`) }));

  return (
    <section id="extensions" className="mt-[clamp(64px,9vw,120px)] scroll-mt-[86px]">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="mt-3 max-w-[16ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.035em] text-balance">
            {t("headline")}
          </h2>
        </div>
        <p className="max-w-[40ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
          {t("sub", { count: EXTENSION_COUNT })}
        </p>
      </div>

      <ExtensionFilter items={items} cats={cats} allLabel={t("all", { count: EXTENSION_COUNT })} />

      <p className="mt-4 text-[12px] leading-[1.6] text-[var(--color-muted-2)]">{t("legend")}</p>
    </section>
  );
}
