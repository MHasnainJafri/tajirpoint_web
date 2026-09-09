import { ICON, type IconName } from "@/lib/design/landing";

/**
 * The design draws every icon as one 24×24 stroked path inheriting
 * `currentColor`. Rendering them from `ICON` keeps the artwork identical to
 * the source instead of substituting a lookalike from an icon set.
 */
export function Stroke({
  name,
  size = 18,
  width = 1.8,
  className = "",
}: {
  name: IconName;
  size?: number;
  width?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size }}
      className={className}
    >
      <path d={ICON[name]} />
    </svg>
  );
}

/** The ticked bullet used by every feature list in the design. */
export function Tick({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size, flex: "none" }}
    >
      <path d={ICON.check} />
    </svg>
  );
}
