import Link from "next/link";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Container size="tight">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            404
          </p>
          <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
          <p className="mt-4 text-[var(--color-fg-muted)]">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-[var(--color-accent)] px-6 font-medium text-[var(--color-accent-fg)] transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            Back to home
          </Link>
        </div>
      </Container>
    </main>
  );
}
