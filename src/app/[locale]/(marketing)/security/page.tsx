import type { Metadata } from "next";
import { Database, Globe, Lock, ShieldCheck, TriangleAlert, Users } from "lucide-react";
import { PillBadge } from "@/components/design/primitives";
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
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-[150px] lg:pb-20">
        <div
          className="pointer-events-none absolute left-1/2 top-[-320px] h-[640px] w-[1100px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.15),transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[1320px] px-7 lg:px-10">
          <PillBadge>Security</PillBadge>
          <h1 className="mt-6 max-w-[700px] text-[clamp(40px,5.4vw,64px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
            Your data is safe
            <br />
            with us.
          </h1>
          <p className="mt-5 max-w-[520px] text-[17.5px] leading-[1.65] text-[var(--color-muted)]">
            Security isn't a feature — it's foundational. Here's how we protect your business data,
            your customers, and your transactions.
          </p>
        </div>
      </section>

      {/* Measures */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MEASURES.map((m) => (
              <div
                key={m.title}
                className="rounded-[20px] border border-[var(--color-line)] bg-white/[0.025] p-7 transition-colors hover:border-[var(--color-line-2)] hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--color-mint-soft)] text-[var(--color-mint)] ring-1 ring-[var(--color-mint-line)]">
                  {m.icon}
                </div>
                <h3 className="mb-2 text-[15px] font-bold text-[var(--color-ink)]">{m.title}</h3>
                <p className="text-[13.5px] leading-[1.6] text-[var(--color-muted)]">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report vulnerability */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-bg-2)] py-16">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="max-w-[640px]">
            <h2 className="mb-4 text-[24px] font-extrabold tracking-[-0.025em] text-[var(--color-ink)]">
              Found a vulnerability?
            </h2>
            <p className="mb-6 text-[15.5px] leading-[1.65] text-[var(--color-muted)]">
              We take security reports seriously. If you've found a potential vulnerability, please
              disclose it responsibly — email us at{" "}
              <a
                href="mailto:security@tajirpoint.com"
                className="font-semibold text-[var(--color-mint-2)] underline-offset-4 hover:underline"
              >
                security@tajirpoint.com
              </a>
              . We'll acknowledge within 24 hours and keep you informed throughout the resolution
              process.
            </p>
            <p className="text-[13.5px] leading-[1.6] text-[var(--color-muted-2)]">
              Please do not disclose vulnerabilities publicly until we've had a reasonable
              opportunity to address them. We do not pursue legal action against good-faith security
              researchers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
