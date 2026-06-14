import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Security — How We Protect Your Business Data",
  description: "Tajir Point's security overview — AES-256 encryption, zero-trust access, 99.9% uptime SLA, and responsible disclosure. Enterprise-grade protection for every merchant.",
  path: "/security",
});

const MEASURES = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Encryption at rest",
    body: "All stored data — transaction records, customer data, inventory — is encrypted with AES-256. Encryption keys rotate every 90 days.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "TLS 1.3 in transit",
    body: "All data moving between your device and our servers is encrypted with TLS 1.3. Older protocol versions are disabled.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "SOC 2 & ISO 27001",
    body: "Our cloud infrastructure runs on AWS data centres certified to SOC 2 Type II and ISO 27001. Annual third-party audits.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Role-based access control",
    body: "Granular permissions per user and branch. Cashiers see only the register. Managers see their branch. Owners see everything.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    title: "Vulnerability disclosure",
    body: "We run a responsible disclosure programme. Security researchers can report vulnerabilities to security@tajirpoint.com.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: "Daily backups",
    body: "Your data is backed up daily to geographically separate AWS regions. Backups are retained for 30 days and can be restored on request.",
  },
];

export default function SecurityPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
            <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
            Security
          </span>
          <h1 className="text-[44px] lg:text-[64px] font-extrabold tracking-[-0.04em] leading-[1.05] text-[var(--color-ink)] max-w-[700px]">
            Your data is safe
            <br />
            with us.
          </h1>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[520px]">
            Security isn't a feature — it's foundational. Here's how we protect your business data, your customers, and your transactions.
          </p>
        </div>
      </section>

      {/* Measures */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MEASURES.map((m) => (
              <div
                key={m.title}
                className="rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-7"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[var(--color-mint)]/10 flex items-center justify-center text-[var(--color-mint)] mb-4">
                  {m.icon}
                </div>
                <h3 className="text-[15px] font-bold text-[var(--color-ink)] mb-2">{m.title}</h3>
                <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.6]">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report vulnerability */}
      <section className="py-16 bg-[var(--color-bg-2)] border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="max-w-[640px]">
            <h2 className="text-[24px] font-extrabold tracking-[-0.025em] text-[var(--color-ink)] mb-4">
              Found a vulnerability?
            </h2>
            <p className="text-[15.5px] text-[var(--color-muted)] leading-[1.65] mb-6">
              We take security reports seriously. If you've found a potential vulnerability, please disclose it responsibly — email us at{" "}
              <a href="mailto:security@tajirpoint.com" className="text-[var(--color-mint)] hover:underline font-semibold">
                security@tajirpoint.com
              </a>. We'll acknowledge within 24 hours and keep you informed throughout the resolution process.
            </p>
            <p className="text-[13.5px] text-[var(--color-muted)]">
              Please do not disclose vulnerabilities publicly until we've had a reasonable opportunity to address them. We do not pursue legal action against good-faith security researchers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
