import { Info, TriangleAlert } from "lucide-react";
import { Tick } from "@/components/marketing/landing/Stroke";
import type { GuideBlock } from "@/content/guides/types";
import { GuideText } from "./GuideText";

/** One guide section's body: paragraphs, lists, tables and notes. */
export function GuideBlocks({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="mt-5 flex flex-col gap-5 text-[16.5px] leading-[1.75] text-[var(--color-body)]">
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}

function Block({ block: b }: { block: GuideBlock }) {
  switch (b.type) {
    case "p":
      return (
        <p>
          <GuideText text={b.text} />
        </p>
      );
    case "h3":
      return (
        <h3 className="mt-2 text-[19px] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--color-ink)]">
          {b.text}
        </h3>
      );
    case "list":
      return b.ordered ? (
        <ol className="flex flex-col gap-3">
          {b.items.map((item, i) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-[2px] flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-[var(--color-mint-soft)] text-[13px] font-bold text-[var(--color-mint-2)]"
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <GuideText text={item} />
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="flex flex-col gap-[10px]">
          {b.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-[5px] flex-none text-[var(--color-mint-2)]">
                <Tick size={16} />
              </span>
              <span className="min-w-0">
                <GuideText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        // The table scrolls inside its own box on a narrow phone; the page never does.
        <div
          className="max-w-full overflow-x-auto rounded-[16px] border border-[var(--color-line-2)]"
          tabIndex={0}
          role="region"
          aria-label={b.caption}
        >
          <table className="w-full min-w-[300px] border-collapse text-left text-[14.5px] leading-[1.5]">
            <caption className="sr-only">{b.caption}</caption>
            <thead className="bg-[var(--color-bg-2)]">
              <tr>
                {b.head.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="border-b border-[var(--color-line-2)] px-4 py-3 text-start text-[13px] font-semibold text-[var(--color-ink)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row) => (
                <tr
                  key={row.join("|")}
                  className="border-b border-[var(--color-line-2)] last:border-b-0"
                >
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th
                        key={j}
                        scope="row"
                        className="px-4 py-3 align-top font-semibold text-[var(--color-ink)]"
                      >
                        <GuideText text={cell} />
                      </th>
                    ) : (
                      <td key={j} className="px-4 py-3 align-top">
                        <GuideText text={cell} />
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note": {
      const warn = b.tone === "warn";
      const NoteIcon = warn ? TriangleAlert : Info;
      return (
        <aside
          className={`flex items-start gap-3 rounded-[16px] border px-4 py-4 text-[15px] leading-[1.6] ${
            warn
              ? "border-[#F3D9A6] bg-[#FFF8EC] text-[#6B4700]"
              : "border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] text-[var(--color-ink)]"
          }`}
        >
          <NoteIcon
            className="mt-[3px] h-[18px] w-[18px] flex-none"
            strokeWidth={1.9}
            aria-hidden="true"
          />
          <div className="min-w-0">
            {b.title && <p className="font-bold">{b.title}</p>}
            <p className={b.title ? "mt-1" : undefined}>
              <GuideText text={b.text} />
            </p>
          </div>
        </aside>
      );
    }
  }
}
