import type { Metadata } from "next";
import { PillBadge } from "@/components/design/primitives";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Tajir Point collects, uses, and protects your personal and business data. Covers data residency, retention periods, and your rights.",
  path: "/privacy",
  noIndex: false,
});

const LAST_UPDATED = "1 May 2025";

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg)]">
      <div
        className="pointer-events-none absolute left-1/2 top-[-320px] h-[640px] w-[1100px] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center,rgba(0,210,122,.13),transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[800px] px-7 pb-24 pt-[150px] lg:px-10 lg:pb-32">
        <PillBadge>Last updated: {LAST_UPDATED}</PillBadge>

        <h1 className="mt-6 text-[clamp(36px,5.4vw,64px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
          Privacy Policy
        </h1>
        <p className="mt-5 max-w-[620px] text-[17.5px] leading-[1.65] text-[var(--color-muted)]">
          Tajir Point (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to
          protecting the privacy of our merchants and their customers. This policy explains what
          data we collect, why we collect it, and how we use it.
        </p>

        <div className="mt-14 flex flex-col gap-6">
          <LegalSection title="1. Information we collect">
            <p>We collect information you provide directly when you:</p>
            <ul>
              <li>
                <strong>Register an account</strong> — name, email address, phone number, business
                name, country.
              </li>
              <li>
                <strong>Use the POS or ledger</strong> — transaction records, inventory data,
                customer names, and payment amounts.
              </li>
              <li>
                <strong>Contact support</strong> — messages, attachments, and correspondence.
              </li>
              <li>
                <strong>Book a demo</strong> — name, email, and scheduling preferences.
              </li>
            </ul>
            <p>We also collect data automatically:</p>
            <ul>
              <li>Device identifiers, operating system version, and app version.</li>
              <li>IP addresses and coarse location (country/city) for security and compliance.</li>
              <li>Usage telemetry (screen views, feature interactions) to improve the product.</li>
            </ul>
          </LegalSection>

          <LegalSection title="2. How we use your data">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve Tajir Point services.</li>
              <li>Process transactions and sync data across devices.</li>
              <li>Send transactional emails (receipts, alerts, account notices).</li>
              <li>Comply with FBR, ZATCA, and other applicable legal obligations.</li>
              <li>Detect fraud and protect the security of our platform.</li>
              <li>
                Send product updates and marketing communications (you can opt out at any time).
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="3. Data sharing and disclosure">
            <p>We do not sell your personal data. We share data only:</p>
            <ul>
              <li>
                <strong>With service providers</strong> — cloud hosting (AWS), payment processors
                (JazzCash, 1Link), analytics tools — who are contractually bound to protect it.
              </li>
              <li>
                <strong>With regulators</strong> — FBR, ZATCA, or other government authorities when
                required by law.
              </li>
              <li>
                <strong>In a business transfer</strong> — if we merge or are acquired, data may be
                transferred as a business asset (you will be notified).
              </li>
              <li>
                <strong>With your explicit consent</strong> — for any other purpose not described
                here.
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Data retention">
            <p>
              We retain your account data for as long as your account is active or as needed to
              provide services. Transaction and tax records are retained for 7 years to comply with
              FBR and ZATCA requirements. You may request deletion of your account and personal data
              at any time (subject to legal retention obligations).
            </p>
          </LegalSection>

          <LegalSection title="5. Security">
            <p>
              We use industry-standard safeguards: TLS encryption in transit, AES-256 encryption at
              rest, role-based access control, and regular internal security reviews. Our
              infrastructure is hosted on AWS, and we build our security practices to align with
              standards such as ISO 27001 and SOC 2.
            </p>
            <p>
              No method of transmission over the internet is 100% secure. We encourage you to use a
              strong password and enable two-factor authentication.
            </p>
          </LegalSection>

          <LegalSection title="6. Your rights">
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul>
              <li>Access a copy of the personal data we hold about you.</li>
              <li>Correct inaccurate or incomplete data.</li>
              <li>Request deletion of your data (right to be forgotten).</li>
              <li>Object to or restrict certain processing.</li>
              <li>
                Data portability — receive your data in a structured, machine-readable format.
              </li>
            </ul>
            <p>
              To exercise any of these rights, email{" "}
              <a href="mailto:privacy@tajirpoint.com">privacy@tajirpoint.com</a>. We will respond
              within 30 days.
            </p>
          </LegalSection>

          <LegalSection title="7. Cookies">
            <p>
              We use cookies and similar technologies to keep you logged in, remember your
              preferences, and understand how you use Tajir Point. You can control cookies through
              your browser settings. Disabling cookies may affect certain functionality.
            </p>
          </LegalSection>

          <LegalSection title="8. Children's privacy">
            <p>
              Tajir Point is designed for businesses and is not directed at children under 16. We do
              not knowingly collect personal data from children. If you believe a child has provided
              us with personal data, please contact us and we will delete it.
            </p>
          </LegalSection>

          <LegalSection title="9. Changes to this policy">
            <p>
              We may update this policy periodically. We will notify you of material changes via
              email or an in-app banner at least 14 days before they take effect. Continued use of
              Tajir Point after the effective date constitutes acceptance of the revised policy.
            </p>
          </LegalSection>

          <LegalSection title="10. Contact us">
            <p>For privacy-related questions or requests, contact our Privacy Team:</p>
            <ul>
              <li>
                Email: <a href="mailto:privacy@tajirpoint.com">privacy@tajirpoint.com</a>
              </li>
              <li>Address: Shaheed-e-Millat Road, PECHS, Karachi 75400, Pakistan</li>
            </ul>
          </LegalSection>
        </div>
      </div>
    </div>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[20px] border border-[var(--color-line)] bg-white/[0.025] p-7 lg:p-8">
      <h2 className="mb-5 border-b border-[var(--color-line)] pb-4 text-[20px] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
        {title}
      </h2>
      <div className="prose prose-tajir max-w-none prose-p:text-[15.5px] prose-p:leading-[1.7] prose-li:text-[15px] prose-li:leading-[1.65] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline">
        {children}
      </div>
    </section>
  );
}
