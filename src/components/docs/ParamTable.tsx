import type { ApiField } from "@/lib/docs/types";

const METHOD_TONE: Record<string, string> = {
  GET: "border-[var(--color-mint-line)] bg-[var(--color-mint)]/12 text-[var(--color-mint-2)]",
  POST: "border-[rgba(96,190,255,.32)] bg-[rgba(96,190,255,.12)] text-[#7CC8FF]",
  PATCH: "border-[rgba(245,165,36,.32)] bg-[var(--color-amber)]/12 text-[var(--color-amber)]",
  PUT: "border-[rgba(245,165,36,.32)] bg-[var(--color-amber)]/12 text-[var(--color-amber)]",
  DELETE: "border-[rgba(255,122,107,.32)] bg-[var(--color-berry)]/12 text-[var(--color-berry)]",
};

const HEAD_CELL = "font-mono text-[10px] uppercase tracking-[1.6px] text-[var(--color-muted-3)]";

export function MethodBadge({ method }: { method: string }) {
  return (
    <span
      className={`inline-flex min-w-[58px] justify-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide ${
        METHOD_TONE[method] ?? "border-[var(--color-line)] bg-white/[0.06] text-[var(--color-ink)]"
      }`}
    >
      {method}
    </span>
  );
}

/**
 * A field list — request body or response body.
 *
 * `showRequired` is only set for request bodies. "Required" on a field you
 * *receive* means nothing to a reader, and next to "Read-only" it reads as a
 * contradiction.
 */
export function FieldTable({
  fields,
  title,
  showRequired = false,
}: {
  fields: ApiField[];
  title: string;
  showRequired?: boolean;
}) {
  if (fields.length === 0) return null;

  return (
    <div className="flex flex-col gap-2.5">
      <h4 className="text-[13px] font-bold text-[var(--color-ink)]">{title}</h4>
      <div className="overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-white/[0.015]">
        <div className="hidden gap-4 border-b border-[var(--color-line)] bg-white/[0.04] px-4 py-2 sm:flex">
          <span className={`w-[230px] shrink-0 ${HEAD_CELL}`}>Field</span>
          <span className={HEAD_CELL}>Type &amp; description</span>
        </div>
        {fields.map((f, i) => (
          <div
            key={f.name}
            className={`flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-white/[0.02] sm:flex-row sm:gap-4 ${
              i > 0 ? "border-t border-[var(--color-line)]" : ""
            }`}
          >
            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:w-[230px]">
              <code className="font-mono text-[12.5px] font-semibold text-[var(--color-ink)]">
                {f.name}
              </code>
              {showRequired && f.required && (
                <span className="rounded border border-[rgba(255,122,107,.32)] bg-[var(--color-berry)]/12 px-1.5 py-px font-mono text-[10px] font-bold uppercase tracking-wide text-[var(--color-berry)]">
                  Required
                </span>
              )}
              {showRequired && !f.required && (
                <span className="rounded border border-[var(--color-line)] bg-white/[0.05] px-1.5 py-px font-mono text-[10px] font-semibold uppercase tracking-wide text-[var(--color-muted-3)]">
                  Optional
                </span>
              )}
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="font-mono text-[12px] text-[var(--color-mint-2)]">{f.type}</span>
              {f.description && (
                <span className="text-[13px] leading-[1.5] text-[var(--color-muted)]">
                  {f.description}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Query filters an endpoint honours. Names come from the server's filter class. */
export function QueryTable({ params }: { params: string[] }) {
  if (params.length === 0) return null;

  return (
    <div className="flex flex-col gap-2.5">
      <h4 className="text-[13px] font-bold text-[var(--color-ink)]">Filters</h4>
      <div className="flex flex-wrap gap-1.5">
        {params.map((p) => (
          <code
            key={p}
            className="rounded-[7px] border border-[var(--color-line)] bg-white/[0.04] px-2.5 py-1 font-mono text-[12.5px] text-[var(--color-ink-3)] transition-colors hover:border-[var(--color-line-2)]"
          >
            {p}
          </code>
        ))}
      </div>
      <p className="text-[12.5px] text-[var(--color-muted-2)]">
        Combine any of these as query parameters. Also accepts{" "}
        <code className="doc-code">cursor</code> and <code className="doc-code">page_size</code>.
      </p>
    </div>
  );
}

export function ErrorTable({ errors }: { errors: Array<{ code: string; when: string }> }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h4 className="text-[13px] font-bold text-[var(--color-ink)]">Errors</h4>
      <div className="overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-white/[0.015]">
        <div className="hidden gap-4 border-b border-[var(--color-line)] bg-white/[0.04] px-4 py-2 sm:flex">
          <span className={`w-[64px] shrink-0 ${HEAD_CELL}`}>Code</span>
          <span className={HEAD_CELL}>When it happens</span>
        </div>
        {errors.map((e, i) => (
          <div
            key={e.code}
            className={`flex gap-4 px-4 py-2.5 ${i > 0 ? "border-t border-[var(--color-line)]" : ""}`}
          >
            <code
              className={`w-[64px] shrink-0 font-mono text-[12.5px] font-semibold ${
                e.code.startsWith("5") ? "text-[var(--color-berry)]" : "text-[var(--color-amber)]"
              }`}
            >
              {e.code}
            </code>
            <span className="text-[13px] leading-[1.5] text-[var(--color-muted)]">{e.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
