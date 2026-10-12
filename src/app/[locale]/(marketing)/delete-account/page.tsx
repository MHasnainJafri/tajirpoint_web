import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { MintButton, PillBadge } from "@/components/design/primitives";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Delete Your Account",
    description:
      "How to delete your Tajir Point account and data from the TajirPoint POS, Business, Order Desk, Rider and Store apps: steps, what is deleted, what is kept, and timelines.",
    path: "/delete-account",
    locale,
  });
}

const DELETION_EMAIL = "hello@tajirpoint.com";
const DELETION_SUBJECT = "Delete my account";
const MAILTO = `mailto:${DELETION_EMAIL}?subject=${encodeURIComponent(DELETION_SUBJECT)}`;

/** Names as they appear on the Google Play listings. */
const APPS = [
  { name: "TajirPoint POS", who: "Shop owners and staff" },
  { name: "TajirPoint Business", who: "Shop owners and managers" },
  { name: "TajirPoint Order Desk", who: "Shop staff taking orders (“Order Desk”)" },
  { name: "TajirPoint Rider", who: "Delivery riders" },
  { name: "TajirPoint Store", who: "Customers ordering from a shop" },
];

export default async function DeleteAccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg)]">
      <div
        className="pointer-events-none absolute left-1/2 top-[-320px] h-[640px] w-[1100px] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center,rgba(0,210,122,.13),transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[800px] px-7 pb-24 pt-[150px] lg:px-10 lg:pb-32">
        <PillBadge>Account deletion</PillBadge>

        <h1 className="mt-6 text-[clamp(36px,5.4vw,64px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
          Delete your Tajir Point account
        </h1>
        <p className="mt-5 max-w-[620px] text-[17.5px] leading-[1.65] text-[var(--color-muted)]">
          You can ask Tajir Point to delete your account and the personal data linked to it at any
          time. This page explains how to request it, what we delete, what we must keep by law, and
          how long it takes.
        </p>
        <div className="mt-8">
          <MintButton href={MAILTO} external>
            Email a deletion request
          </MintButton>
        </div>

        <div className="mt-14 flex flex-col gap-6">
          <LegalSection title="Which apps this covers">
            <p>
              One Tajir Point account is used across all of our Android apps. Deleting it removes
              your access to every one of them:
            </p>
            <ul>
              {APPS.map((app) => (
                <li key={app.name}>
                  <strong>{app.name}</strong> — {app.who}
                </li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title="How to request deletion">
            <ol>
              <li>
                Email <a href={MAILTO}>{DELETION_EMAIL}</a> from the email address registered on
                your account, or mention the phone number registered on it.
              </li>
              <li>
                Use the subject <strong>&ldquo;{DELETION_SUBJECT}&rdquo;</strong>.
              </li>
              <li>
                In the message, give the account&rsquo;s email address or phone number. If it is a
                business account, also give the business (shop) name.
              </li>
              <li>
                We may reply to confirm the request really comes from the account holder before we
                delete anything.
              </li>
            </ol>
            <p>
              <strong>Staff and rider accounts</strong> can also ask their shop owner to remove
              them. The owner can do this in the TajirPoint POS app under{" "}
              <strong>Settings → Users</strong>. To delete your personal data as well, email us as
              described above.
            </p>
            <p>
              <strong>Customers of a shop</strong> (TajirPoint Store app) should email us with the
              phone number they ordered with.
            </p>
          </LegalSection>

          <LegalSection title="What we delete">
            <ul>
              <li>Your account profile — name, email address, phone number, and password.</li>
              <li>Devices and sessions you are signed in on.</li>
              <li>Push notification tokens.</li>
              <li>
                <strong>Riders:</strong> location history and uploaded documents.
              </li>
              <li>
                <strong>Customers:</strong> saved delivery addresses.
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="What we keep, and for how long">
            <ul>
              <li>
                <strong>Transaction, sales, and invoice records</strong> and{" "}
                <strong>tax records</strong> that a business is legally required to keep (for
                example by FBR or ZATCA) are kept for up to 7 years. Where the law allows, we
                anonymise them so they no longer identify you.
              </li>
              <li>
                <strong>Payment and billing records</strong> for your subscription are kept for as
                long as the law requires.
              </li>
            </ul>
            <p>
              Once the legal retention period ends, these records are deleted too. See the full
              retention table on our <Link href="/data-privacy">Data Privacy</Link> page.
            </p>
          </LegalSection>

          <LegalSection title="How long it takes">
            <ul>
              <li>We confirm that we have received your request within 7 days.</li>
              <li>We complete verified deletion within 30 days of confirming it.</li>
            </ul>
          </LegalSection>

          <LegalSection title="More information">
            <p>
              Read our <Link href="/privacy">Privacy Policy</Link> and{" "}
              <Link href="/data-privacy">Data Privacy</Link> page for full detail on how we handle
              your data. Questions about deletion can go to <a href={MAILTO}>{DELETION_EMAIL}</a>.
            </p>
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
