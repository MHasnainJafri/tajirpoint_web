import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/config/site";

export function FinalCta() {
  const t = useTranslations("landing.cta");

  return (
    <section id="cta" className="px-5 pb-[120px] pt-[60px] md:px-10">
      <div
        data-reveal
        className="on-dark relative mx-auto max-w-[1120px] overflow-hidden rounded-[26px] border border-[var(--color-mint-line)] px-6 py-[90px] text-center md:px-10"
        style={{ background: "linear-gradient(150deg,#0B2419,#071510 60%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% -10%,rgba(0,210,122,.22),transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 70% 90% at 50% 0%,black,transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 90% at 50% 0%,black,transparent)",
          }}
        />

        <Image
          src="/brand/mark/mark-on-dark.svg"
          alt=""
          aria-hidden="true"
          width={64}
          height={64}
          className="relative mx-auto mb-[26px] h-16 w-auto"
        />

        <h2 className="relative text-[clamp(30px,4.4vw,58px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
          {t("headlineA")}
          <br />
          {t("headlineB")}
        </h2>

        <p className="relative mx-auto mt-5 max-w-[480px] text-[17px] leading-[1.6] text-[rgba(242,247,244,.65)]">
          {t("body")}
        </p>

        <div className="relative mt-9 flex flex-wrap justify-center gap-[14px]">
          <a
            href={siteConfig.signupUrl}
            className="inline-flex items-center gap-[10px] whitespace-nowrap rounded-full bg-[var(--color-mint)] px-8 py-[15px] text-[16px] font-bold text-[var(--color-mint-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,210,122,.45)]"
          >
            {t("primary")} <span>→</span>
          </a>
          <a
            href={siteConfig.calendlyUrl}
            className="inline-flex items-center whitespace-nowrap rounded-full border border-[var(--color-line-2)] bg-white/[0.07] px-7 py-[15px] text-[16px] font-semibold text-[var(--color-ink)] transition-colors duration-200 hover:bg-white/[0.12] hover:text-white"
          >
            {t("secondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
