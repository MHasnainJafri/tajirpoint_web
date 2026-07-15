import Link from "next/link";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-bg)]">
      <div
        className="pointer-events-none absolute left-1/2 top-[-280px] h-[620px] w-[1000px] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center,rgba(0,210,122,.15),transparent 60%)",
        }}
      />
      <Container size="tight">
        <div className="relative text-center">
          <p className="font-mono text-[12px] tracking-[2.5px] text-[var(--color-mint-2)]">404</p>
          <h1 className="mt-5 text-[clamp(36px,5.4vw,64px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
            Page not found
          </h1>
          <p className="mx-auto mt-5 max-w-[440px] text-[17px] leading-[1.6] text-[var(--color-muted)]">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <Link
            href="/"
            className="mt-9 inline-flex items-center gap-[10px] rounded-full bg-[var(--color-mint)] px-8 py-[15px] text-[16px] font-bold text-[var(--color-mint-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,210,122,.45)]"
          >
            Back to home <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </main>
  );
}
