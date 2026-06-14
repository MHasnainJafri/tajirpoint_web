import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <div
      className="relative bg-[var(--color-ink)] rounded-[40px] py-20 lg:py-24 px-7 lg:px-20 mx-5 sm:mx-10 max-w-[calc(1320px-80px)] mb-20 overflow-hidden"
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <span
        className="absolute -left-[100px] -top-[100px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,210,122,0.18) 0%, rgba(0,210,122,0) 70%)",
        }}
        aria-hidden="true"
      />
      <span
        className="absolute -right-[60px] -bottom-[180px] leading-none pointer-events-none font-arabic"
        style={{
          fontFamily: "var(--font-arabic)",
          fontWeight: 700,
          fontSize: "480px",
          color: "rgba(0,210,122,0.06)",
        }}
        aria-hidden="true"
      >
        تاجر
      </span>

      <h2
        className="text-white relative z-[2] font-extrabold leading-none tracking-[-0.04em] max-w-[780px]"
        style={{ fontSize: "clamp(48px, 6vw, 88px)" }}
      >
        Ready to run your shop, everywhere?
      </h2>
      <p className="text-white/70 text-[20px] mt-5 max-w-[560px] relative z-[2]">
        Start free in 90 seconds. No card. No-obligation walkthrough with a real merchant team.
      </p>
      <div className="flex gap-3 mt-10 flex-wrap relative z-[2]">
        <Button asChild variant="mint">
          <a href="https://dashboard.tajirpoint.com/signup" target="_blank" rel="noopener noreferrer">
            Start free <span className="arrow">→</span>
          </a>
        </Button>
        <Button asChild variant="dark-ghost">
          <Link href="/book-demo">Book a demo</Link>
        </Button>
      </div>
    </div>
  );
}
