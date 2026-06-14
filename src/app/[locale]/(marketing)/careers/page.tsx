import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Careers — Join Tajir Point",
  description: "Join the team building the operating system for merchants across Pakistan, UAE, and Saudi Arabia. Open roles in engineering, product, and growth.",
  path: "/careers",
});

interface Job {
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  remote: boolean;
}

const OPEN_ROLES: Job[] = [
  { title: "Senior Android Engineer", team: "Engineering", location: "Karachi / Remote", type: "Full-time", remote: true },
  { title: "Backend Engineer (Go)", team: "Engineering", location: "Karachi / Remote", type: "Full-time", remote: true },
  { title: "Product Designer (Mobile)", team: "Design", location: "Karachi", type: "Full-time", remote: false },
  { title: "Compliance Engineer — ZATCA", team: "Engineering", location: "Dubai / Remote", type: "Full-time", remote: true },
  { title: "Customer Success Manager — UAE", team: "Customer Success", location: "Dubai", type: "Full-time", remote: false },
  { title: "Growth Marketing Manager", team: "Marketing", location: "Karachi / Remote", type: "Full-time", remote: true },
];

const VALUES = [
  {
    icon: "⚡",
    title: "Ship it",
    body: "We move fast and deploy to production dozens of times a week. Waiting is a bug.",
  },
  {
    icon: "🌍",
    title: "Context matters",
    body: "We build for merchants whose reality is 2G networks, shared Android phones, and Urdu receipts. We live that context.",
  },
  {
    icon: "🔍",
    title: "Depth over breadth",
    body: "We'd rather be the best POS in South Asia than a mediocre everything-app. We go deep.",
  },
  {
    icon: "🤝",
    title: "Ownership",
    body: "Everyone owns outcomes, not tasks. If you see a problem, fix it — or tell someone who can.",
  },
];

const BENEFITS = [
  "Competitive salary in local currency + equity",
  "Flexible working hours",
  "Remote-friendly (role dependent)",
  "Health insurance (PK & UAE)",
  "Annual learning & development budget",
  "Latest hardware of your choice",
  "Paid time off — 24 days per year",
  "Team retreats across PK, UAE, and SA",
];

export default function CareersPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20 bg-[var(--color-ink)] text-white">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
            <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
            We're hiring
          </span>
          <h1 className="text-[44px] lg:text-[72px] font-extrabold tracking-[-0.04em] leading-[1.04] max-w-[800px]">
            Build the tools
            <br />
            millions depend on.
          </h1>
          <p className="mt-6 text-[18px] text-white/65 leading-[1.65] max-w-[540px]">
            Tajir Point is growing fast across Pakistan, UAE, and Saudi Arabia. We're looking for people who want to build software that directly improves the lives of merchants and their families.
          </p>
          <div className="mt-10 flex flex-wrap gap-6 text-[15px] text-white/60">
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[var(--color-mint)] rounded-full" />Karachi · Dubai · Remote</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[var(--color-mint)] rounded-full" />{OPEN_ROLES.length} open roles</span>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <h2 className="text-[28px] lg:text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] mb-10">
            How we work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-6"
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="text-[15px] font-bold text-[var(--color-ink)] mb-2">{v.title}</h3>
                <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.6]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-20 lg:py-24 bg-[var(--color-bg-2)] border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <h2 className="text-[28px] lg:text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)]">
                Open roles
              </h2>
              <p className="mt-2 text-[15px] text-[var(--color-muted)]">
                {OPEN_ROLES.length} positions across {[...new Set(OPEN_ROLES.map((r) => r.team))].length} teams
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {OPEN_ROLES.map((role) => (
              <Link
                key={role.title}
                href="/contact"
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[16px] border border-[var(--color-line)] bg-white p-5 lg:p-6 hover:border-[var(--color-mint)] hover:shadow-[0_4px_20px_rgba(0,210,122,0.1)] transition-all duration-200"
              >
                <div className="flex flex-col gap-1">
                  <div className="text-[16px] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-mint)] transition-colors">
                    {role.title}
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[13px] text-[var(--color-muted)]">{role.team}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-muted-2)]" />
                    <span className="text-[13px] text-[var(--color-muted)]">{role.location}</span>
                    {role.remote && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-[var(--color-muted-2)]" />
                        <span className="text-[12px] font-medium text-[var(--color-mint)] bg-[var(--color-mint)]/10 px-2.5 py-0.5 rounded-full">
                          Remote OK
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[12px] font-medium text-[var(--color-muted)] border border-[var(--color-line)] rounded-full px-3 py-1">
                    {role.type}
                  </span>
                  <span className="text-[var(--color-muted)] group-hover:text-[var(--color-mint)] transition-colors">→</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-[14px] text-[var(--color-muted)]">
              Don't see your role?{" "}
              <Link href="/contact" className="text-[var(--color-ink)] font-semibold hover:text-[var(--color-mint)] transition-colors">
                Send us a speculative application →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-[11px] font-bold tracking-[0.08em] text-[var(--color-mint)] uppercase block mb-4">Perks & benefits</span>
              <h2 className="text-[32px] lg:text-[44px] font-extrabold tracking-[-0.035em] leading-[1.1] text-[var(--color-ink)]">
                We take care
                <br />
                of our team.
              </h2>
              <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65]">
                Great work deserves great compensation. Here&apos;s what you get when you join Tajir Point.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[var(--color-mint)]/15 flex items-center justify-center text-[var(--color-mint)] text-[10px] font-bold">
                    ✓
                  </span>
                  <span className="text-[14.5px] text-[var(--color-ink)] leading-[1.5]">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-bg-2)] border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10 text-center">
          <h2 className="text-[28px] lg:text-[40px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)]">
            Ready to apply?
          </h2>
          <p className="mt-4 text-[16px] text-[var(--color-muted)] max-w-[400px] mx-auto">
            Send your CV and a short note to our team — tell us what you'd build first.
          </p>
          <div className="mt-7">
            <a
              href="mailto:careers@tajirpoint.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-ink)] text-white text-[15px] font-semibold hover:opacity-90 transition-opacity"
            >
              careers@tajirpoint.com →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
