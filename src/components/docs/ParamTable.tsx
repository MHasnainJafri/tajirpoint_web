import type { ApiField } from "@/lib/docs/types";

export function MethodBadge({ method }: { method: string }) {
  const tone: Record<string, string> = {
    GET: "text-[var(--color-mint)] bg-[var(--color-mint)]/10",
    POST: "text-[#8a5a00] bg-[var(--color-amber)]/20",
    PATCH: "text-[#8a5a00] bg-[var(--color-amber)]/15",
    PUT: "text-[#8a5a00] bg-[var(--color-amber)]/15",
    DELETE: "text-[#a13b3b] bg-[#a13b3b]/10",
  };
  return (
    <span
      className={`inline-flex min-w-[58px] justify-center rounded-md px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide ${
        tone[method] ?? "bg-[var(--color-bg-3)] text-[var(--color-ink)]"
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
      <div className="overflow-hidden rounded-[12px] border border-[var(--color-line)]">
        {fields.map((f, i) => (
          <div
            key={f.name}
            className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-4 ${
              i > 0 ? "border-t border-[var(--color-line)]" : ""
            }`}
          >
            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:w-[230px]">
              <code className="font-mono text-[12.5px] font-semibold text-[var(--color-ink)]">
                {f.name}
              </code>
              {showRequired && f.required && (
                <span className="rounded bg-[#a13b3b]/10 px-1.5 py-px text-[10px] font-bold uppercase tracking-wide text-[#a13b3b]">
                  Required
                </span>
              )}
              {showRequired && !f.required && (
                <span className="rounded bg-[var(--color-bg-3)] px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                  Optional
                </span>
              )}
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="font-mono text-[12px] text-[var(--color-muted)]">{f.type}</span>
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
            className="rounded-[7px] border border-[var(--color-line)] bg-[var(--color-bg-2)] px-2.5 py-1 font-mono text-[12.5px] text-[var(--color-ink)]"
          >
            {p}
          </code>
        ))}
      </div>
      <p className="text-[12.5px] text-[var(--color-muted)]">
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
      <div className="overflow-hidden rounded-[12px] border border-[var(--color-line)]">
        {errors.map((e, i) => (
          <div
            key={e.code}
            className={`flex gap-4 px-4 py-2.5 ${
              i > 0 ? "border-t border-[var(--color-line)]" : ""
            }`}
          >
            <code className="doc-code shrink-0">{e.code}</code>
            <span className="text-[13px] leading-[1.5] text-[var(--color-muted)]">{e.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
