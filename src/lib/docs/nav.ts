import apiData from "./api-data.json";
import type { ApiResource } from "./types";

export const RESOURCES = apiData as ApiResource[];

export function getResource(slug: string): ApiResource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

/** Guides first, then the reference — grouped the way the API is grouped. */
export const DOCS_NAV: NavGroup[] = [
  {
    title: "Getting started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Get your API key", href: "/docs/authentication" },
      { label: "Pagination", href: "/docs/pagination" },
      { label: "Errors", href: "/docs/errors" },
      { label: "Idempotency", href: "/docs/idempotency" },
      { label: "Webhooks", href: "/docs/webhooks" },
    ],
  },
  ...groupResources(),
];

function groupResources(): NavGroup[] {
  const byGroup = new Map<string, NavItem[]>();
  for (const r of RESOURCES) {
    const items = byGroup.get(r.group) ?? [];
    items.push({ label: r.title, href: `/docs/${r.slug}` });
    byGroup.set(r.group, items);
  }
  return [...byGroup.entries()].map(([title, items]) => ({ title, items }));
}
