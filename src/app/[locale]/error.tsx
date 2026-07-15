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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-bg)]">
      <div
        className="pointer-events-none absolute left-1/2 top-[-280px] h-[620px] w-[1000px] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center,rgba(0,210,122,.13),transparent 60%)",
        }}
      />
      <Container size="tight">
        <div className="relative text-center">
          <p className="font-mono text-[12px] tracking-[2.5px] text-[var(--color-berry)]">ERROR</p>
          <h1 className="mt-5 text-[clamp(34px,5vw,58px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[var(--color-ink)]">
            Something went wrong
          </h1>
          <p className="mx-auto mt-5 max-w-[480px] text-[17px] leading-[1.6] text-[var(--color-muted)]">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center gap-[10px] rounded-full bg-[var(--color-mint)] px-8 py-[15px] text-[16px] font-bold text-[var(--color-mint-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,210,122,.45)]"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-[10px] rounded-full border border-[var(--color-line-2)] bg-white/[0.07] px-7 py-[15px] text-[16px] font-semibold text-[var(--color-ink)] transition-colors duration-200 hover:bg-white/[0.12] hover:text-white"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
