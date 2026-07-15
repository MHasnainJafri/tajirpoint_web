import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EndpointBlock } from "@/components/docs/EndpointBlock";
import { MethodBadge } from "@/components/docs/ParamTable";
import { getResource } from "@/lib/docs/nav";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ resource: string }>;
}): Promise<Metadata> {
  const { resource } = await params;
  const r = getResource(resource);
  if (!r) return buildMetadata({ title: "Not found", path: "/docs" });

  return buildMetadata({
    title: `${r.title} — Tajir Point API`,
    description: r.intro,
    path: `/docs/${r.slug}`,
  });
}

function anchorFor(method: string, path: string) {
  return `${method}-${path}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function ResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const r = getResource(resource);
  if (!r) notFound();

  return (
    <div className="flex max-w-[1080px] flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="font-mono text-[12px] uppercase tracking-[2.5px] text-[var(--color-mint-2)]">
          {r.group}
        </span>
        <h1 className="text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)]">
          {r.title}
        </h1>
        <p className="max-w-[640px] text-[15.5px] leading-[1.7] text-[var(--color-muted)]">
          {r.intro}
        </p>
      </header>

      {/* Endpoint index — so you can see the whole surface at a glance. */}
      <div className="overflow-hidden rounded-[18px] border border-[var(--color-line)] bg-white/[0.025]">
        {r.operations.map((op, i) => (
          <a
            key={`${op.method}${op.path}`}
            href={`#${anchorFor(op.method, op.path)}`}
            className={`group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/[0.04] ${
              i > 0 ? "border-t border-[var(--color-line)]" : ""
            }`}
          >
            <MethodBadge method={op.method} />
            <code className="font-mono text-[12.5px] text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-ink)]">
              {op.path}
            </code>
          </a>
        ))}
      </div>

      {r.operations.map((op) => (
        <EndpointBlock key={`${op.method}${op.path}`} op={op} />
      ))}
    </div>
  );
}
