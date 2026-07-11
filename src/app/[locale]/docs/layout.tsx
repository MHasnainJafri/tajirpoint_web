import Link from "next/link";

import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { siteConfig } from "@/lib/config/site";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    // The reference is English-first and full of code — force LTR so snippets
    // and paths never mirror under the Urdu/Arabic layout.
    <div dir="ltr" className="min-h-screen bg-[var(--color-bg)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-bg)]/85 backdrop-blur">
        <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[16px] font-extrabold tracking-[-0.02em] text-[var(--color-ink)]"
            >
              Tajir Point
            </Link>
            <span className="text-[var(--color-line)]">/</span>
            <Link
              href="/docs"
              className="text-[15px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              Docs
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`${siteConfig.dashboardUrl}/settings/api-keys`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:bg-black"
            >
              Get API key
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
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
