import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  CreditCard,
  DatabaseBackup,
  History,
  KeyRound,
  Lock,
  ServerCog,
  UserCog,
  WifiOff,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  LegalPage,
  LegalSection,
  MailLink,
  WhatsAppLink,
  defineSections,
} from "@/components/legal/LegalPage";
import { legal } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Security",
    description:
      "How TajirPoint protects your business data: encrypted connections, hashed passwords, per-user logins and roles, activity logs, backups, offline selling and responsible disclosure.",
    path: "/security",
    locale,
  });
}

const MEASURES = [
  {
    icon: Lock,
    title: "Encrypted connections",
    body: "Traffic between your devices, our apps and our servers travels over HTTPS/TLS.",
  },
  {
    icon: KeyRound,
    title: "Hashed passwords",
    body: "Passwords are stored as one-way hashes, never in plain text.",
  },
  {
    icon: UserCog,
    title: "Per-user logins and roles",
    body: "Every staff member gets their own login. Role-based permissions decide what each person can see and do.",
  },
  {
    icon: History,
    title: "Activity logs",
    body: "Key business actions are recorded in activity and audit logs, so you can see who did what.",
  },
  {
    icon: DatabaseBackup,
    title: "Regular backups",
    body: "We back up data regularly so it can be recovered if something goes wrong.",
  },
  {
    icon: ServerCog,
    title: "Limited production access",
    body: "Access to production systems is limited to authorised personnel who need it.",
  },
  {
    icon: WifiOff,
    title: "Keeps selling offline",
    body: "The point of sale can keep recording sales during an internet outage and syncs them when the connection returns.",
  },
  {
    icon: CreditCard,
    title: "We don't store card numbers",
    body: "Card payments are handled by Lemon Squeezy for subscriptions, or by the payment gateway a merchant connects.",
  },
];

const S = defineSections({
  payments: "How payments are handled",
  "your-data": "Your data: export and deletion",
  "your-part": "What you can do",
  disclosure: "Reporting a vulnerability",
  incidents: "If something goes wrong",
});

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalPage
      title="Security at TajirPoint"
      intro={
        <p>
          Your sales, stock and customer records are the heart of your business. This page explains,
          plainly, what we do to protect them — and what we don’t claim. We take reasonable
          technical and organisational measures, but no system is 100% secure.
        </p>
      }
    >
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {MEASURES.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-bg-2)] p-5 sm:p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--color-mint-soft)] text-[var(--color-mint-2)]">
              <Icon size={20} strokeWidth={1.8} aria-hidden />
            </span>
            <h2 className="mt-4 text-[16px] font-bold tracking-[-0.01em] text-[var(--color-ink)]">
              {title}
            </h2>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-body)]">{body}</p>
          </li>
        ))}
      </ul>

      <LegalSection {...S.payments}>
        <p>
          {legal.product} does not store full card numbers. Online card payments for {legal.product}{" "}
          subscriptions are processed by Lemon Squeezy, which acts as the merchant of record. When a
          merchant connects a payment gateway (for example Stripe or PayPal) to take payments from
          its own customers, the card details are handled by that gateway.
        </p>
      </LegalSection>

      <LegalSection {...S["your-data"]}>
        <ul>
          <li>
            You can export your data at any time from the export tools in the app — including when
            your account is read-only — or ask us at <MailLink />.
          </li>
          <li>
            To close your account and have your data deleted, see{" "}
            <Link href="/delete-account">how to delete your account</Link>.
          </li>
          <li>
            How we collect, use and share personal data is explained in our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </li>
        </ul>
      </LegalSection>

      <LegalSection {...S["your-part"]}>
        <ul>
          <li>Give each staff member their own login — never share passwords.</li>
          <li>Give people only the role and permissions they need, and remove leavers promptly.</li>
          <li>Use a strong, unique password for your owner account.</li>
          <li>Let offline sales sync before clearing browser data or resetting a device.</li>
          <li>
            Tell us straight away at <MailLink subject="Security" /> if you think someone has
            accessed your account.
          </li>
        </ul>
      </LegalSection>

      <LegalSection {...S.disclosure}>
        <p>
          If you find a security vulnerability in {legal.product}, please email{" "}
          <MailLink subject="Security" /> with the subject “Security” and enough detail for us to
          reproduce it. We will acknowledge your report and work with you to fix it.
        </p>
        <p>
          Please act in good faith: do not access, change or delete other people’s data, do not
          disrupt the service, and give us a reasonable chance to fix the issue before sharing it
          publicly. We do not currently run a paid bug bounty.
        </p>
      </LegalSection>

      <LegalSection {...S.incidents}>
        <p>
          If a security incident affects merchants’ personal data, we will investigate, take steps
          to contain it, and notify affected merchants without undue delay where the law requires.
          You can reach us any time at <MailLink /> or on WhatsApp at <WhatsAppLink />.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
