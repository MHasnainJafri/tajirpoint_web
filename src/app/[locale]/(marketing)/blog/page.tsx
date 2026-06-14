import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Insights for Modern Merchants",
  description: "Product updates, merchant stories, and retail insights from the Tajir Point team. For shop owners in Pakistan, UAE, and Saudi Arabia.",
  path: "/blog",
});

const POSTS = [
  {
    slug: "#",
    tag: "Product",
    date: "10 Apr 2025",
    title: "How Tajir Point handles ZATCA Phase 2 e-invoicing end-to-end",
    excerpt: "A deep dive into how we integrated Saudi Arabia's ZATCA clearance API, generated CSIDs, and kept everything working offline.",
    readTime: "7 min read",
  },
  {
    slug: "#",
    tag: "Merchant story",
    date: "22 Mar 2025",
    title: "From paper khata to digital ledger: how a Karachi kiryana scaled to 3 branches",
    excerpt: "Salman's grocery shop used to run on a paper notebook. Now it syncs across three branches in real time. Here's the story.",
    readTime: "5 min read",
  },
  {
    slug: "#",
    tag: "Engineering",
    date: "5 Mar 2025",
    title: "Building offline-first POS with CRDTs — what we learned after 2 years",
    excerpt: "Conflict-free replicated data types sound academic. Running them on 40,000 Android devices in Pakistan taught us what the papers don't mention.",
    readTime: "12 min read",
  },
  {
    slug: "#",
    tag: "Product",
    date: "14 Feb 2025",
    title: "Storefront 2.0: how we rebuilt our e-commerce layer from the ground up",
    excerpt: "Custom domains, real-time inventory sync, Arabic RTL product pages, and JazzCash checkout — all in one release.",
    readTime: "6 min read",
  },
  {
    slug: "#",
    tag: "Industry",
    date: "28 Jan 2025",
    title: "The state of retail tech in South Asia: 2025 merchant survey",
    excerpt: "We surveyed 1,200 merchants across PK, UAE, and KSA on software adoption, payment methods, and the biggest pain points. Here are the findings.",
    readTime: "10 min read",
  },
  {
    slug: "#",
    tag: "Engineering",
    date: "9 Jan 2025",
    title: "Urdu in a POS system: the typography, input, and printing challenges we solved",
    excerpt: "Nastaleeq rendering on thermal paper is harder than it sounds. This is how we tackled RTL text, Bluetooth printer encoding, and Urdu keyboard input.",
    readTime: "9 min read",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Product":        "bg-[var(--color-mint)]/15 text-[#009955]",
  "Engineering":    "bg-blue-50 text-blue-700",
  "Merchant story": "bg-orange-50 text-orange-700",
  "Industry":       "bg-purple-50 text-purple-700",
};

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="pt-20 pb-14 lg:pt-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
            <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
            Blog
          </span>
          <h1 className="text-[44px] lg:text-[64px] font-extrabold tracking-[-0.04em] leading-[1.05] text-[var(--color-ink)]">
            Insights & stories
          </h1>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[480px]">
            Product updates, engineering deep dives, merchant stories, and industry research from the Tajir Point team.
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          {/* Featured post */}
          {featured && (
            <Link
              href={featured.slug}
              className="group block mb-10 rounded-[24px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-8 lg:p-10 hover:border-[var(--color-mint)] hover:shadow-[0_8px_40px_rgba(0,210,122,0.08)] transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="max-w-[640px]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${TAG_COLORS[featured.tag] ?? "bg-gray-100 text-gray-600"}`}>
                      {featured.tag}
                    </span>
                    <span className="text-[13px] text-[var(--color-muted)]">{featured.date}</span>
                  </div>
                  <h2 className="text-[24px] lg:text-[30px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)] leading-[1.25] group-hover:text-[var(--color-mint)] transition-colors mb-3">
                    {featured.title}
                  </h2>
                  <p className="text-[15.5px] text-[var(--color-muted)] leading-[1.65]">{featured.excerpt}</p>
                </div>
                <div className="shrink-0 flex items-center gap-2 text-[13.5px] font-semibold text-[var(--color-mint)] group-hover:gap-3 transition-all">
                  Read article <span>→</span>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-[var(--color-line)] text-[12.5px] text-[var(--color-muted)]">
                {featured.readTime}
              </div>
            </Link>
          )}

          {/* Post grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => (
              <Link
                key={post.title}
                href={post.slug}
                className="group flex flex-col rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-6 hover:border-[var(--color-mint)] hover:shadow-[0_4px_24px_rgba(0,210,122,0.08)] transition-all duration-200"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${TAG_COLORS[post.tag] ?? "bg-gray-100 text-gray-600"}`}>
                    {post.tag}
                  </span>
                  <span className="text-[12px] text-[var(--color-muted)]">{post.date}</span>
                </div>
                <h3 className="text-[16px] font-bold text-[var(--color-ink)] leading-[1.35] mb-3 group-hover:text-[var(--color-mint)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.6] flex-1">{post.excerpt}</p>
                <div className="mt-5 pt-4 border-t border-[var(--color-line)] text-[12px] text-[var(--color-muted)]">
                  {post.readTime}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
