import type { Metadata } from "next";
import Link from "next/link";
import { Database, Globe, Lock, ShieldCheck, TriangleAlert, Users } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Security — How We Protect Your Business Data",
  description:
    "Tajir Point's security overview — AES-256 encryption, zero-trust access, 99.9% uptime SLA, and responsible disclosure. Enterprise-grade protection for every merchant.",
  path: "/security",
});

const MEASURES = [
  {
    icon: <Lock size={22} strokeWidth={1.8} />,
    title: "Encryption at rest",
    body: "All stored data — transaction records, customer data, inventory — is encrypted with AES-256. Encryption keys rotate every 90 days.",
  },
  {
    icon: <Globe size={22} strokeWidth={1.8} />,
    title: "TLS 1.3 in transit",
    body: "All data moving between your device and our servers is encrypted with TLS 1.3. Older protocol versions are disabled.",
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={1.8} />,
    title: "Trusted cloud infrastructure",
    body: "We host on AWS data centres and build our security practices to align with industry standards such as SOC 2 and ISO 27001.",
  },
  {
    icon: <Users size={22} strokeWidth={1.8} />,
    title: "Role-based access control",
    body: "Granular permissions per user and branch. Cashiers see only the register. Managers see their branch. Owners see everything.",
  },
  {
    icon: <TriangleAlert size={22} strokeWidth={1.8} />,
    title: "Vulnerability disclosure",
    body: "We run a responsible disclosure programme. Security researchers can report vulnerabilities to security@tajirpoint.com.",
  },
  {
    icon: <Database size={22} strokeWidth={1.8} />,
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
            Security isn't a feature — it's foundational. Here's how we protect your business data,
            your customers, and your transactions.
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
              We take security reports seriously. If you've found a potential vulnerability, please
              disclose it responsibly — email us at{" "}
              <a
                href="mailto:security@tajirpoint.com"
                className="text-[var(--color-mint)] hover:underline font-semibold"
              >
                security@tajirpoint.com
              </a>
              . We'll acknowledge within 24 hours and keep you informed throughout the resolution
              process.
            </p>
            <p className="text-[13.5px] text-[var(--color-muted)]">
              Please do not disclose vulnerabilities publicly until we've had a reasonable
              opportunity to address them. We do not pursue legal action against good-faith security
              researchers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
