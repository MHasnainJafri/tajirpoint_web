import Link from "next/link";

import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { siteConfig } from "@/lib/config/site";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    // The reference is English-first and full of code — force LTR so snippets
    // and paths never mirror under the Urdu/Arabic layout.
    <div dir="ltr" className="relative min-h-screen bg-[var(--color-bg)]">
      <div
        className="pointer-events-none absolute left-1/2 top-[-320px] h-[560px] w-[1100px] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center,rgba(0,210,122,.10),transparent 62%)",
        }}
      />

      <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-bg)]/80 backdrop-blur">
        <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[16px] font-extrabold tracking-[-0.02em] text-[var(--color-ink)]"
            >
              Tajir Point
            </Link>
            <span className="text-[var(--color-muted-3)]">/</span>
            <Link
              href="/docs"
              className="font-mono text-[13px] uppercase tracking-[1.8px] text-[var(--color-mint-2)] transition-colors hover:text-[var(--color-mint)]"
            >
              Docs
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`${siteConfig.dashboardUrl}/settings/api-keys`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--color-mint)] px-4 py-2 text-[13.5px] font-bold text-[var(--color-mint-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(0,210,122,.4)]"
            >
              Get API key
            </a>
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[236px_minmax(0,1fr)] lg:gap-12">
          <DocsSidebar />
          <main id="main-content" className="min-w-0 py-12 lg:py-14">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
