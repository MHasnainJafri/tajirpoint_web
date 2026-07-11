import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { CodeBlock } from "@/components/marketing/CodeBlock";
import { siteConfig } from "@/lib/config/site";
import { API_BASE } from "@/lib/docs/examples";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Get your API key — Tajir Point API",
  description:
    "Authenticate against the Tajir Point API: exchange credentials for a bearer token, send X-Shop-Id, and refresh before the 30-minute expiry.",
  path: "/docs/authentication",
});

const KEYS_URL = `${siteConfig.dashboardUrl}/settings/api-keys`;

const LOGIN = `curl -X POST ${API_BASE}/identity/login/ \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "you@yourshop.com",
    "password": "••••••••"
  }'`;

const LOGIN_RESPONSE = `{
  "user": {
    "id": 7,
    "email": "you@yourshop.com",
    "name": "Ahmed Raza"
  },
  "shops": [
    {
      "id": "8f1c2d3e-4b5a-6c7d-8e9f-0a1b2c3d4e5f",
      "name": "Gulberg General Store",
      "city": "Lahore"
    }
  ],
  "tokens": {
    "access": "eyJhbGciOiJIUzI1NiIsInR5…",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5…"
  }
}`;

const REFRESH = `curl -X POST ${API_BASE}/identity/token/refresh/ \\
  -H "Content-Type: application/json" \\
  -d '{ "refresh": "eyJhbGciOiJIUzI1NiIsInR5…" }'`;

const AUTHED = `curl ${API_BASE}/catalog/products/ \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5…" \\
  -H "X-Shop-Id: 8f1c2d3e-4b5a-6c7d-8e9f-0a1b2c3d4e5f"`;

export default function AuthenticationPage() {
  return (
    <div className="flex max-w-[860px] flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-mint)]">
          Getting started
        </span>
        <h1 className="text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)]">
          Get your API key
        </h1>
        <p className="text-[15.5px] leading-[1.7] text-[var(--color-muted)]">
          Every request carries two things: a bearer token that says who you are, and a shop id that
          says which shop you are acting on. Miss either and you get a{" "}
          <code className="doc-code">401</code> or a <code className="doc-code">403</code>.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          1. Create a key
        </h2>
        <p className="text-[15px] leading-[1.7] text-[var(--color-muted)]">
          Create and name a credential per integration in{" "}
          <a
            href={KEYS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-mint)] hover:underline"
          >
            Settings → API Keys
          </a>
          . Naming them per integration means you can revoke one without breaking the others.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          2. Exchange credentials for a token
        </h2>
        <CodeBlock label="cURL — log in" code={LOGIN} />
        <p className="text-[15px] leading-[1.7] text-[var(--color-muted)]">
          The response tells you which shops the credential can reach. Pick the one you want and use
          its <code className="doc-code">id</code> as <code className="doc-code">X-Shop-Id</code>.
        </p>
        <CodeBlock label="JSON — 200" code={LOGIN_RESPONSE} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          3. Call the API
        </h2>
        <CodeBlock label="cURL — authenticated request" code={AUTHED} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          Token lifetimes
        </h2>
        <p className="text-[15px] leading-[1.7] text-[var(--color-muted)]">
          Access tokens last{" "}
          <span className="font-semibold text-[var(--color-ink)]">30 minutes</span>; refresh tokens
          last <span className="font-semibold text-[var(--color-ink)]">7 days</span>. A{" "}
          <code className="doc-code">401</code> on a request that used to work means the access
          token expired — exchange the refresh token for a new pair and retry. Do not re-login on
          every call.
        </p>
        <CodeBlock label="cURL — refresh" code={REFRESH} />
      </section>

      <div className="flex items-start gap-3 rounded-[14px] border border-[var(--color-amber)]/30 bg-[var(--color-amber)]/[0.06] p-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[var(--color-amber)]/15 text-[var(--color-amber)]">
          <AlertTriangle size={16} aria-hidden="true" />
        </div>
        <p className="text-[13.5px] leading-[1.65] text-[var(--color-muted)]">
          <span className="font-semibold text-[var(--color-ink)]">Keys are secrets.</span> Keep them
          server-side — anything in a browser bundle or a mobile app is public. The login endpoint
          is rate-limited to 10 attempts per minute per IP, and the API to 1,000 requests per hour
          per shop.
        </p>
      </div>
    </div>
  );
}
