import { errorCls, hintCls, labelCls } from "./styles";

/**
 * Label + control + hint/error, as used by the lead forms. The control itself
 * is passed as children and should carry `id`, and `aria-describedby` pointing
 * at `${id}-hint` / `${id}-error` when it wants them read out.
 */
export function Field({
  id,
  label,
  required,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <RequiredMark />}
        {optional && <OptionalMark />}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className={hintCls}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={errorCls}>
          {error}
        </p>
      )}
    </div>
  );
}

export function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-[#B42318]">
      {" "}
      *
    </span>
  );
}

export function OptionalMark() {
  return <span className="font-normal text-[var(--color-muted)]"> (optional)</span>;
}
