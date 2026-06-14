import type { Metadata } from "next";
import { DashboardShell } from "@/components/app/DashboardShell";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <DashboardShell
      heading="Overview"
      subheading="Welcome back. Here's what's happening with your business today."
    >
      {/* Metric cards placeholder */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {["Total Revenue", "Orders", "Customers", "Products"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6"
          >
            <p className="text-sm font-medium text-[var(--color-fg-muted)]">{label}</p>
            <p className="mt-2 text-3xl font-bold">—</p>
          </div>
        ))}
      </div>

      {/* Recent orders placeholder */}
      <div className="rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="mb-4 font-semibold">Recent Orders</h2>
        <p className="text-sm text-[var(--color-fg-muted)]">
          No orders yet. Orders will appear here once your store is live.
        </p>
      </div>
    </DashboardShell>
  );
}
