import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/config/site";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: "Home", href: "/" }, ...items];
  const schemaItems = allItems.map((item) => ({
    name: item.label,
    url: `${siteConfig.url}${item.href}`,
  }));

  return (
    <>
      <JsonLd schema={breadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1320px] px-7 lg:px-10 pt-5">
        <ol className="flex items-center gap-2 text-[12px] text-[var(--color-muted-2)]">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="text-[var(--color-line-2)]">/</span>}
              {index === allItems.length - 1 ? (
                <span aria-current="page" className="text-[var(--color-muted)]">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[var(--color-ink)] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
