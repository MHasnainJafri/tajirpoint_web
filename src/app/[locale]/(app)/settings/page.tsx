import type { Metadata } from "next";
import { DashboardShell } from "@/components/app/DashboardShell";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return (
    <DashboardShell heading="Settings" subheading="Manage your account and preferences.">
      <div className="rounded-xl border border-[var(--color-border)] p-6">
        <p className="text-sm text-[var(--color-fg-muted)]">Settings panels coming soon.</p>
      </div>
    </DashboardShell>
  );
}
