"use client";

import Link from "next/link";
import { Container } from "@/components/shared/Container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Container size="tight">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-destructive)]">
            Error
          </p>
          <h1 className="mt-4 text-4xl font-bold">Something went wrong</h1>
          <p className="mt-4 text-[var(--color-fg-muted)]">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[var(--color-accent)] px-6 font-medium text-[var(--color-accent-fg)] transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[var(--color-border-strong)] px-6 font-medium transition-colors hover:bg-[var(--color-bg-subtle)]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
