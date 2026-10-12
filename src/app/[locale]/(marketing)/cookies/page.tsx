import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LegalPage, LegalSection, MailLink, defineSections } from "@/components/legal/LegalPage";
import { legal } from "@/lib/config/site";
import { CookieChoicesButton } from "@/components/analytics/CookieChoicesButton";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Cookie Policy",
    description:
      "Which cookies and similar storage TajirPoint uses on its website, web app and order pages, what they do, and how to control them.",
    path: "/cookies",
    locale,
  });
}

const S = defineSections({
  what: "What cookies and similar storage are",
  website: "Our website (tajirpoint.com)",
  app: "The TajirPoint web app",
  "order-pages": "Order pages and shop websites",
  consent: "Consent",
  control: "How to control cookies",
  changes: "Changes to this policy",
});

type CookieRow = { name: string; purpose: string; kind: string };

const NECESSARY: CookieRow[] = [
  {
    name: "NEXT_LOCALE",
    purpose: "May be used to remember the language you chose (English, Urdu or Arabic).",
    kind: "Cookie · strictly necessary",
  },
  {
    name: "Security cookies",
    purpose: "Set by our hosting and security providers to protect the site from abuse.",
    kind: "Cookie · strictly necessary",
  },
  {
    name: "Campaign parameters (utm_*)",
    purpose:
      "Remembers the utm_source, utm_medium, utm_campaign and utm_content you arrived with during your visit, so a demo request can be linked to the ad or link that brought you.",
    kind: "Session storage · cleared when you close the tab",
  },
];

const ANALYTICS: CookieRow[] = [
  {
    name: "_ga, _ga_*",
    purpose: "Google Analytics — distinguishes visitors and sessions to measure site usage.",
    kind: "Cookie · analytics",
  },
  {
    name: "_gid",
    purpose: "Google Analytics — distinguishes visitors over a short period.",
    kind: "Cookie · analytics",
  },
  {
    name: "_fbp, _fbc",
    purpose:
      "Meta Pixel — measures visits and demo requests from our Facebook and Instagram ads (_fbc stores the ad click ID).",
    kind: "Cookie · advertising",
  },
];

function CookieList({ rows }: { rows: CookieRow[] }) {
  return (
    <ul className="!ps-0">
      {rows.map((r) => (
        <li key={r.name} className="!ps-0 [list-style:none]">
          <code>{r.name}</code> — {r.purpose}{" "}
          <span className="text-[var(--color-muted)]">({r.kind})</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalPage
      title="Cookie Policy"
      toc={Object.values(S)}
      intro={
        <p>
          This policy explains the cookies and similar technologies {legal.product} uses, why, and
          how you can control them. It should be read with our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      }
    >
      <LegalSection {...S.what}>
        <p>
          Cookies are small text files a website stores in your browser. Similar technologies —
          local storage, session storage and IndexedDB — let a site or app keep data on your device.
          “Strictly necessary” ones are needed for the site or app to work; others, such as
          analytics and advertising cookies, are optional.
        </p>
      </LegalSection>

      <LegalSection {...S.website}>
        <h3>Strictly necessary</h3>
        <CookieList rows={NECESSARY} />
        <h3>Analytics and advertising (when enabled)</h3>
        <p>
          When analytics and advertising tags are switched on for our website, Google Analytics
          (loaded directly or through Google Tag Manager) and the Meta Pixel may set:
        </p>
        <CookieList rows={ANALYTICS} />
        <p>
          These providers process the data under their own privacy policies. We use the results to
          understand which pages and campaigns work.
        </p>
      </LegalSection>

      <LegalSection {...S.app}>
        <p>
          The web app at app.tajirpoint.com uses strictly necessary storage only: a sign-in session
          so you stay logged in, and local storage and IndexedDB on your device so the point of sale
          can keep working offline and sync later. Clearing this storage signs you out and may
          remove offline sales that have not synced yet — sync before clearing.
        </p>
      </LegalSection>

      <LegalSection {...S["order-pages"]}>
        <p>
          Order pages and shop websites we host for merchants use a strictly necessary session
          cookie to keep track of your basket and order.
        </p>
      </LegalSection>

      <LegalSection {...S.consent}>
        <p>
          Strictly necessary cookies and storage do not need consent. Analytics and advertising
          cookies are optional: wherever you visit from, our website asks first, and neither Google
          Analytics nor the Meta Pixel is loaded until you press Accept. If you press Reject
          non-essential, or your browser sends a Do Not Track or Global Privacy Control signal and
          you have not accepted, they are never loaded. Your choice is kept in your browser&apos;s
          local storage, and you can change your mind at any time.
        </p>
        <CookieChoicesButton />
      </LegalSection>

      <LegalSection {...S.control}>
        <ul>
          <li>
            <strong>Browser settings</strong> — most browsers let you see, block and delete cookies
            and site data. Blocking strictly necessary cookies may stop parts of the site or app
            from working.
          </li>
          <li>
            <strong>Google Analytics</strong> — you can install the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics opt-out browser add-on
            </a>
            .
          </li>
          <li>
            <strong>Meta (Facebook and Instagram)</strong> — manage how ads are shown to you in your{" "}
            <a
              href="https://www.facebook.com/adpreferences"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meta ad preferences
            </a>
            .
          </li>
        </ul>
      </LegalSection>

      <LegalSection {...S.changes}>
        <p>
          We will update this policy when the cookies we use change. The date at the top shows when
          it last changed. Questions: <MailLink />.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
