import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  LegalNote,
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
    title: "Refund & Cancellation Policy",
    description:
      "How to cancel a TajirPoint subscription, the 15-day refund window for subscription payments, annual plans, extensions and how refunds are paid.",
    path: "/refund-policy",
    locale,
  });
}

const S = defineSections({
  light: "The free Light plan",
  cancel: "Cancelling a paid plan",
  window: "15-day refund window",
  "not-refundable": "What is not refundable",
  extensions: "Extensions (add-ons)",
  request: "How to request a refund",
  paid: "How refunds are paid",
  failed: "Failed payments",
  rights: "Your legal rights",
});

export default async function RefundPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      toc={Object.values(S)}
      intro={
        <p>
          This policy explains how to cancel a {legal.product} subscription and when you can get
          your money back. It forms part of our <Link href="/terms">Terms of Service</Link>.
        </p>
      }
    >
      <LegalNote title="The short version">
        <ul>
          <li>
            Cancel any time — your plan stays active until the end of the period you paid for.
          </li>
          <li>Ask for a refund within 15 days of a subscription payment, monthly or annual.</li>
          <li>After 15 days, payments are non-refundable unless the law says otherwise.</li>
        </ul>
      </LegalNote>

      <LegalSection {...S.light}>
        <p>
          The Light plan is free for 90 days from the date your account is created, so there is
          nothing to pay or refund. If you do not choose a paid plan by the end of the 90 days, your
          account becomes read-only — you can still sign in, view and export your data, and upgrade
          at any time.
        </p>
      </LegalSection>

      <LegalSection {...S.cancel}>
        <p>
          You can cancel a paid plan at any time from the billing screen in the app, or by
          contacting us at <MailLink subject="Cancel my plan" /> or on WhatsApp at <WhatsAppLink />.
          Your plan stays active until the end of the period you have already paid for and does not
          renew after that.
        </p>
        <p>
          When the paid period ends, the account returns to Light. Because Light is free only for
          the first 90 days after sign-up, the account will normally become read-only. Your data is
          not deleted by cancelling — you can still export it, or ask us to{" "}
          <Link href="/delete-account">delete your account</Link>.
        </p>
      </LegalSection>

      <LegalSection {...S.window}>
        <p>
          You may request a refund of a subscription payment within <strong>15 days</strong> of that
          payment. This applies to monthly and annual plans alike: for an annual plan, the 15 days
          run from the date of the annual payment (or its renewal).
        </p>
      </LegalSection>

      <LegalSection {...S["not-refundable"]}>
        <ul>
          <li>Payments more than 15 days old, except where the law requires a refund.</li>
          <li>
            Partial months — if you cancel part-way through a period, we do not refund the unused
            part; your plan simply runs to the end of the period.
          </li>
        </ul>
      </LegalSection>

      <LegalSection {...S.extensions}>
        <p>
          Paid extensions follow the same rule as subscriptions: you can request a refund within 15
          days of the payment.
        </p>
      </LegalSection>

      <LegalSection {...S.request}>
        <p>
          Email <MailLink subject="Refund request" /> from the email address on your account, or
          message us on WhatsApp at <WhatsAppLink />. Please include your business name, the date
          and amount of the payment, and the reason for the request if you are happy to share it.
        </p>
      </LegalSection>

      <LegalSection {...S.paid}>
        <ul>
          <li>
            <strong>Card payments</strong> are refunded to the original card through Lemon Squeezy,
            which processes our subscription payments.
          </li>
          <li>
            <strong>PKR invoices</strong> (bank transfer, JazzCash or Easypaisa) are refunded by
            bank transfer.
          </li>
        </ul>
        <p>How long the money takes to reach you depends on your bank or card provider.</p>
      </LegalSection>

      <LegalSection {...S.failed}>
        <p>
          If a renewal payment fails, you have a 14-day grace period to update your payment details
          or pay. After that, the account is restricted until the payment is made.
        </p>
      </LegalSection>

      <LegalSection {...S.rights}>
        <p>
          This policy does not affect any rights you have under the consumer-protection law of your
          country. Payments made by card are also subject to Lemon Squeezy’s terms as the merchant
          of record.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
