import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";

export function AppDownload() {
  return (
    <Section tone="light-2">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Eyebrow>Apps · iOS · Android · Desktop</Eyebrow>
            <h2 className="display-2">
              Counter, pocket,
              <br />
              or anywhere.
            </h2>
            <p className="lead mt-8">
              One product, every device. Web browser, native iPad, native Android tablet, Mac and
              Windows desktop — all the same Tajir, all sharing one inventory and one ledger. Native
              printing, native scanners, native bluetooth.
            </p>
            <div className="flex gap-3 mt-9 flex-wrap">
              <a
                href="https://app.tajirpoint.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3.5 px-5 py-3.5 bg-[var(--color-ink)] text-white rounded-[18px] hover:bg-black transition-[transform,background] hover:-translate-y-0.5 min-h-[60px]"
                aria-label="Download on the App Store"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span>
                  <span className="block text-[11px] opacity-70 font-medium">Download on the</span>
                  <span className="block text-[18px] font-bold tracking-[-0.02em] mt-0.5">
                    App Store
                  </span>
                </span>
              </a>
              <a
                href="https://app.tajirpoint.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3.5 px-5 py-3.5 bg-[var(--color-ink)] text-white rounded-[18px] hover:bg-black transition-[transform,background] hover:-translate-y-0.5 min-h-[60px]"
                aria-label="Get it on Google Play"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3 20.5V3.5c0-.59.34-1.11.84-1.35l13.69 9.85L3.84 21.85c-.5-.25-.84-.76-.84-1.35zm14.81-8.13l-3.55-2.55-2.78 2.78 2.78 2.78 3.55-2.55c.5-.36.5-1.1 0-1.46zM5.97 1.97L17.46 11l-2.51 2.51-9.97-9.97c.32-.16.7-.27 1.09-.27.34 0 .67.08.97.21l-1.07.49z" />
                </svg>
                <span>
                  <span className="block text-[11px] opacity-70 font-medium">Get it on</span>
                  <span className="block text-[18px] font-bold tracking-[-0.02em] mt-0.5">
                    Google Play
                  </span>
                </span>
              </a>
            </div>
            <div className="flex flex-wrap gap-8 mt-8 text-[13.5px] text-[var(--color-muted)]">
              <div>
                <b className="text-[var(--color-ink)] font-bold">Desktop</b> · macOS · Windows ·
                Linux
              </div>
              <div>
                <b className="text-[var(--color-ink)] font-bold">Web</b> · any browser
              </div>
            </div>
          </div>

          <PhoneStack />
        </div>
      </Container>
    </Section>
  );
}

function PhoneStack() {
  return (
    <div
      className="relative h-[480px] lg:h-[560px] flex items-center justify-center"
      aria-hidden="true"
    >
      <Phone
        rotate="-6deg"
        translate="translate(-110px, -10px)"
        zIndex={1}
        screenBg="linear-gradient(180deg, var(--color-mint-soft) 0%, #fff 100%)"
        screenContent={
          <div className="px-4 py-7 text-[var(--color-ink)]">
            <div className="text-[11px] tracking-[0.12em] uppercase text-[#0d6b3d] font-semibold mb-3.5">
              Today
            </div>
            <div className="text-[36px] font-extrabold tracking-[-0.03em] leading-none">
              Rs 142,800
            </div>
            <div className="text-[12px] text-[var(--color-muted-2)] mt-1">+18% vs yesterday</div>
            <div className="mt-6 flex flex-col gap-2">
              {[
                { t: "Sale #A-2486", s: "12:42 · Liaquat", v: "2,059" },
                { t: "Stock low · 14", s: "Reorder pending", v: "!", danger: true },
                { t: "Khata · Hassan T.", s: "Rs 142,800 due", v: "" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-white rounded-[14px] flex justify-between items-center"
                  style={{ boxShadow: "0 0 0 1px var(--color-line)" }}
                >
                  <div>
                    <div className="text-[13px] font-semibold">{row.t}</div>
                    <div
                      className="text-[11px] font-mono"
                      style={{ color: row.danger ? "#dc2626" : "var(--color-muted-2)" }}
                    >
                      {row.s}
                    </div>
                  </div>
                  <div
                    className="font-mono font-bold text-[13px]"
                    style={{ color: row.danger ? "#dc2626" : "var(--color-ink)" }}
                  >
                    {row.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />
      <Phone
        rotate="4deg"
        translate="translate(80px, 20px)"
        zIndex={2}
        screenBg="var(--color-ink)"
        screenContent={
          <div className="px-4 py-7 text-white">
            <div className="text-[11px] tracking-[0.12em] uppercase text-[var(--color-mint)] font-semibold mb-3.5">
              Driver · Trip 042
            </div>
            <div className="text-[30px] font-extrabold tracking-[-0.03em] leading-none">
              8 stops left
            </div>
            <div className="text-[12px] text-white/55 mt-1">Karachi · Saddar route</div>
            <div className="mt-5 flex flex-col gap-2">
              {[
                { name: "Aslam & Sons", st: "Delivered · 11:14", icon: "✓", done: true },
                { name: "Hassan Traders", st: "In progress", icon: "↑", active: true },
                { name: "Karachi Sweets", st: "", icon: "3", muted: true },
              ].map((row, i) => (
                <div
                  key={i}
                  className="p-3 bg-white/[0.05] rounded-[14px] flex gap-2.5 items-center"
                  style={{ opacity: row.muted ? 0.6 : 1 }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{
                      background: row.muted ? "rgba(255,255,255,0.1)" : "var(--color-mint)",
                      color: row.muted ? "white" : "var(--color-ink)",
                    }}
                  >
                    {row.icon}
                  </div>
                  <div className="flex-1 text-[12.5px]">
                    {row.name}
                    {row.st && (
                      <div
                        className="text-[11px]"
                        style={{
                          color: row.done
                            ? "rgba(255,255,255,0.4)"
                            : row.active
                              ? "var(--color-mint)"
                              : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {row.st}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
}

function Phone({
  rotate,
  translate,
  zIndex,
  screenBg,
  screenContent,
}: {
  rotate: string;
  translate: string;
  zIndex: number;
  screenBg: string;
  screenContent: React.ReactNode;
}) {
  return (
    <div
      className="absolute w-[240px] h-[480px] rounded-[42px] p-[7px] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1c1c1e 0%, #2a2a2d 100%)",
        boxShadow:
          "0 60px 120px -40px rgba(10,42,32,0.40), inset 0 0 0 1.5px rgba(255,255,255,0.06)",
        transform: `${translate} rotate(${rotate})`,
        zIndex,
      }}
    >
      <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[90px] h-5 bg-black rounded-2xl z-[2]" />
      <div
        className="w-full h-full rounded-[35px] overflow-hidden relative"
        style={{ background: screenBg }}
      >
        {screenContent}
      </div>
    </div>
  );
}
