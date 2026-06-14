import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Orders", href: "/dashboard/orders" },
  { label: "Products", href: "/dashboard/products" },
  { label: "Customers", href: "/dashboard/customers" },
  { label: "Analytics", href: "/dashboard/analytics" },
  { label: "Settings", href: "/settings" },
];

export function Sidebar() {
  return (
    <aside
      className="flex w-64 flex-col border-r border-[var(--color-border)] bg-[var(--color-bg-subtle)]"
      aria-label="Dashboard navigation"
    >
      <div className="flex h-16 items-center border-b border-[var(--color-border)] px-6">
        <Link href="/" className="text-lg font-bold">
          {siteConfig.name}
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1" role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex h-9 items-center rounded-lg px-3 text-sm font-medium text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-fg)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
