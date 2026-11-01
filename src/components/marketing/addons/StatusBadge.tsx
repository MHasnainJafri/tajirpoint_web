import { STATUS_LABEL, type AddonStatus } from "@/lib/marketing/addon-status";

const STYLES: Record<AddonStatus, { bg: string; fg: string; dot: string }> = {
  active: { bg: "#E4FAEF", fg: "#05603A", dot: "#00A862" },
  contact_us: { bg: "#EAF2FF", fg: "#1849A9", dot: "#2E6BE6" },
  coming_soon: { bg: "#FFF4E0", fg: "#8A5A00", dot: "#F5A524" },
  unavailable: { bg: "#F2F3F5", fg: "#4B5058", dot: "#8A8F98" },
};

/** "Available", "Contact us", "Coming soon" or "Unavailable", as the backend says. */
export function StatusBadge({
  status,
  className = "",
}: {
  status: AddonStatus;
  className?: string;
}) {
  const s = STYLES[status];
  return (
    <span
      className={`inline-flex flex-none items-center gap-[6px] whitespace-nowrap rounded-full px-[10px] py-[4px] text-[12px] font-semibold ${className}`}
      style={{ background: s.bg, color: s.fg }}
    >
      <span
        aria-hidden="true"
        className="h-[6px] w-[6px] rounded-full"
        style={{ background: s.dot }}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}
