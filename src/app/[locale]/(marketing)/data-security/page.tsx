import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Data Security — Enterprise-Grade Protection",
  description: "Tajir Point's security infrastructure — AES-256 encryption, zero-trust access controls, AWS ISO 27001, SOC 2 Type II, and a documented incident response plan.",
  path: "/data-security",
});

const CONTROLS = [
  {
    category: "Encryption",
    items: [
      { label: "Data at rest", value: "AES-256, key rotation every 90 days" },
      { label: "Data in transit", value: "TLS 1.3 (1.2 minimum, older disabled)" },
      { label: "Database backups", value: "Encrypted before leaving primary region" },
      { label: "Key management", value: "AWS KMS with hardware-backed HSM" },
    ],
  },
  {
    category: "Access control",
    items: [
      { label: "Internal access", value: "Zero-trust, MFA required for all staff" },
      { label: "Production access", value: "Break-glass with full audit log, reviewed monthly" },
      { label: "API authentication", value: "OAuth 2.0, short-lived tokens (1-hour TTL)" },
      { label: "Merchant roles", value: "Granular RBAC — cashier, manager, owner, API" },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { label: "Cloud provider", value: "AWS — ISO 27001, SOC 2 Type II, PCI DSS" },
      { label: "Uptime SLA", value: "99.9% monthly (cloud sync). POS works offline." },
      { label: "Backups", value: "Daily, geo-redundant, 30-day retention" },
      { label: "DDoS protection", value: "AWS Shield Standard + CloudFront WAF" },
    ],
  },
  {
    category: "Testing & audits",
    items: [
      { label: "Penetration testing", value: "Annual third-party pentest (last: Q1 2025)" },
      { label: "Dependency scanning", value: "Automated daily via Snyk + Dependabot" },
      { label: "SAST / DAST", value: "Integrated in CI/CD — every pull request" },
      { label: "Bug bounty", value: "Responsible disclosure via security@tajirpoint.com" },
    ],
  },
];

const CERTIFICATIONS = [
  { name: "AWS ISO 27001", desc: "Infrastructure certified" },
  { name: "AWS SOC 2 Type II", desc: "Annual third-party audit" },
  { name: "PCI DSS (AWS)", desc: "Payment card infrastructure" },
  { name: "ZATCA Compliance", desc: "Saudi e-invoicing approved" },
  { name: "FBR Integration", desc: "Pakistan POS-IRN certified" },
];

const INCIDENT_STEPS = [
  { time: "0–1 hr", action: "Detect & contain", desc: "Automated alerts triage and isolate affected systems." },
  { time: "1–4 hr", action: "Assess & notify", desc: "Severity assessed. Affected merchants notified via email and in-app." },
  { time: "4–24 hr", action: "Remediate", desc: "Root cause fixed, patch deployed, access reviewed." },
  { time: "Post-incident", action: "Report & improve", desc: "Full post-mortem published on status.tajirpoint.com." },
];

export default function DataSecurityPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20 bg-[var(--color-ink)] text-white">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
            <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
            Data Security
          </span>
          <h1 className="text-[44px] lg:text-[64px] font-extrabold tracking-[-0.04em] leading-[1.05] max-w-[760px]">
            Enterprise-grade security
            <br />
            for every merchant.
          </h1>
          <p className="mt-5 text-[17px] text-white/60 leading-[1.65] max-w-[520px]">
            From a single kiryana to a 50-branch chain — every merchant gets the same AES-256 encryption, zero-trust access controls, and 99.9% uptime SLA.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:security@tajirpoint.com"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-mint)] hover:underline underline-offset-2"
            >
              Report a vulnerability →
            </a>
            <span className="text-white/20">·</span>
            <Link href="/data-privacy" className="inline-flex items-center gap-2 text-[14px] font-semibold text-white/50 hover:text-white transition-colors">
              Data Privacy →
            </Link>
          </div>
        </div>
      </section>

      {/* Security controls */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CONTROLS.map((group) => (
              <div key={group.category} className="rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-2)] overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--color-line)] bg-white">
                  <h3 className="font-bold text-[15px] text-[var(--color-ink)]">{group.category}</h3>
                </div>
                <div className="divide-y divide-[var(--color-line)]">
                  {group.items.map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-4 px-6 py-4">
                      <span className="text-[13.5px] text-[var(--color-muted)] shrink-0">{item.label}</span>
                      <span className="text-[13.5px] font-semibold text-[var(--color-ink)] text-end">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-[var(--color-bg-2)] border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--color-ink)] mb-6">Certifications & compliance</h2>
          <div className="flex flex-wrap gap-3">
            {CERTIFICATIONS.map((c) => (
              <div key={c.name} className="flex items-center gap-3 rounded-[12px] border border-[var(--color-line)] bg-white px-4 py-3">
                <span className="w-5 h-5 rounded-full bg-[var(--color-mint)]/15 flex items-center justify-center text-[var(--color-mint)] text-[9px] font-bold shrink-0">✓</span>
                <div>
                  <div className="text-[13.5px] font-bold text-[var(--color-ink)]">{c.name}</div>
                  <div className="text-[11.5px] text-[var(--color-muted)]">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident response */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-[28px] lg:text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] mb-4">
                Incident response
              </h2>
              <p className="text-[15.5px] text-[var(--color-muted)] leading-[1.65]">
                We have a documented incident response plan. If something goes wrong, you'll know — fast. Every security incident is triaged, contained, and disclosed transparently.
              </p>
              <a
                href="https://status.tajirpoint.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-mint)] hover:underline underline-offset-2"
              >
                Live status page →
              </a>
            </div>
            <div className="flex flex-col gap-3">
              {INCIDENT_STEPS.map((step, i) => (
                <div key={step.time} className="flex items-start gap-4 rounded-[16px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-5">
                  <div className="shrink-0 flex flex-col items-center gap-1">
                    <span className="w-7 h-7 rounded-full bg-[var(--color-mint)]/15 flex items-center justify-center text-[var(--color-mint)] text-[11px] font-bold">
                      {i + 1}
                    </span>
                    {i < INCIDENT_STEPS.length - 1 && (
                      <span className="w-px h-4 bg-[var(--color-line)]" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-[14px] text-[var(--color-ink)]">{step.action}</span>
                      <span className="text-[11px] font-mono text-[var(--color-muted)] border border-[var(--color-line)] rounded-full px-2 py-0.5">{step.time}</span>
                    </div>
                    <p className="text-[13.5px] text-[var(--color-muted)]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Responsible disclosure */}
      <section className="py-14 bg-[var(--color-bg-2)] border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <div className="max-w-[600px]">
            <h2 className="text-[22px] font-extrabold tracking-[-0.025em] text-[var(--color-ink)] mb-3">
              Found a vulnerability?
            </h2>
            <p className="text-[15px] text-[var(--color-muted)] leading-[1.65] mb-5">
              We welcome responsible disclosure. Email{" "}
              <a href="mailto:security@tajirpoint.com" className="text-[var(--color-mint)] font-semibold hover:underline underline-offset-2">
                security@tajirpoint.com
              </a>{" "}
              with a description and reproduction steps. We'll acknowledge within 24 hours, keep you informed, and never pursue legal action against good-faith researchers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/security" className="text-[13.5px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors">
                Security overview →
              </Link>
              <span className="text-[var(--color-muted-2)]">·</span>
              <Link href="/data-privacy" className="text-[13.5px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors">
                Data privacy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
