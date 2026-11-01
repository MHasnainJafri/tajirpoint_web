import { Tick } from "@/components/marketing/landing/Stroke";
import { legal, whatsappLink } from "@/lib/config/site";
import { CallbackForm } from "./CallbackForm";

const POINTS = [
  "A real person from our team calls you — no bots, no sales script.",
  "We answer your questions and show what fits your kind of business.",
  "Free help moving your products and customers from your old system.",
];

/**
 * "Interested? We'll call you" band for the bottom of the home and pricing
 * pages. English like the demo page (`lang="en"`), so it reads correctly
 * inside the Urdu and Arabic pages too.
 */
export function CallbackSection({ id = "call-back", location }: { id?: string; location: string }) {
  return (
    <section
      id={id}
      lang="en"
      dir="ltr"
      aria-labelledby={`${id}-title`}
      className="mt-[clamp(64px,9vw,110px)] scroll-mt-[86px] rounded-[26px] border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] p-[clamp(16px,4vw,52px)]"
    >
      <div className="grid items-start gap-[clamp(24px,4vw,56px)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="min-w-0 px-1 pt-1 sm:px-0">
          <div className="eyebrow">Talk to us</div>
          <h2
            id={`${id}-title`}
            className="mt-3 max-w-[18ch] text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-balance text-[var(--color-ink)]"
          >
            Interested? We&apos;ll call you.
          </h2>
          <p className="mt-3 max-w-[46ch] text-[15.5px] leading-[1.65] text-[var(--color-body)]">
            Leave your business name and number. Our team calls you within one working day to answer
            your questions and get you set up.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {POINTS.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-[14.5px] leading-[1.55] text-[var(--color-ink)]"
              >
                <span className="mt-[1px] flex-none text-[var(--color-mint-2)]">
                  <Tick size={18} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] text-[var(--color-body)]">
            Prefer to message?{" "}
            <a
              href={whatsappLink("Hi TajirPoint, I'm interested in your POS.")}
              target="_blank"
              rel="noopener noreferrer"
              data-track={`${location}_callback_aside`}
              className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
            >
              WhatsApp <span dir="ltr">{legal.whatsappDisplay}</span>
            </a>
          </p>
        </div>

        <div className="min-w-0 rounded-[22px] border border-[var(--color-line-2)] bg-white p-[clamp(16px,3.4vw,32px)] shadow-[var(--shadow-card)]">
          <CallbackForm idPrefix={id} location={location} />
        </div>
      </div>
    </section>
  );
}
