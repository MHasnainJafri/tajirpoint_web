import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";

export function Storefront() {
  return (
    <Section id="storefront">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-center">
          <div>
            <Eyebrow>Differentiator · 03</Eyebrow>
            <h2 className="display-2">
              Your customers
              <br />
              get a website too.
            </h2>
            <p className="lead mt-8">
              Every shop on Tajir gets a branded site at <b className="text-[var(--color-ink)] font-semibold">{"{shop}.tajirpoint.com"}</b> or your own domain. Block-built pages, themes, currency switcher, and a checkout that posts straight to your POS.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                { name: "Editorial", c: "#0a0a0a" },
                { name: "Boutique", c: "#c44569" },
                { name: "Kiryana", c: "#16a34a" },
                { name: "Café", c: "#a86b00" },
              ].map((t) => (
                <span
                  key={t.name}
                  className="px-3.5 py-2 rounded-full text-[13px] font-medium text-[var(--color-ink-3)] inline-flex items-center gap-2"
                  style={{ boxShadow: "inset 0 0 0 1px var(--color-line-2)" }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.c }} />
                  {t.name}
                </span>
              ))}
            </div>
          </div>

          <div
            className="rounded-[24px] overflow-hidden bg-white"
            style={{
              boxShadow: "0 60px 120px -40px rgba(10,42,32,0.40), 0 0 0 1px var(--color-line)",
            }}
          >
            <div className="h-[42px] bg-[var(--color-bg-2)] flex items-center gap-3 px-4 border-b border-[var(--color-line)]">
              <div className="flex gap-1.5">
                <i className="w-2.5 h-2.5 rounded-full bg-[var(--color-line-2)] block" />
                <i className="w-2.5 h-2.5 rounded-full bg-[var(--color-line-2)] block" />
                <i className="w-2.5 h-2.5 rounded-full bg-[var(--color-line-2)] block" />
              </div>
              <div
                className="flex-1 h-6 bg-white rounded-full flex items-center px-3.5 text-[11.5px] text-[var(--color-muted-2)] font-mono"
                style={{ boxShadow: "inset 0 0 0 1px var(--color-line)" }}
              >
                aslamandsons.tajirpoint.com
              </div>
            </div>
            <div className="px-7 py-5 flex items-center gap-5 border-b border-[var(--color-line)]">
              <span className="text-[15px] font-bold tracking-[-0.02em]">Aslam &amp; Sons</span>
              <div className="flex gap-5 ms-auto text-[13px] text-[var(--color-ink-3)] font-medium">
                <span>Shop</span>
                <span>About</span>
                <span>Contact</span>
              </div>
              <div className="px-3.5 py-2 rounded-full bg-[var(--color-ink)] text-white text-[12px] font-semibold inline-flex items-center gap-1.5">
                Cart · 0
              </div>
            </div>
            <div className="px-7 py-9 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-7 items-center min-h-[320px]">
              <div>
                <div className="text-[11px] tracking-[0.16em] uppercase text-[var(--color-muted)] font-semibold mb-3.5">
                  Lawn collection 2026
                </div>
                <h3 className="text-[28px] md:text-[34px] tracking-[-0.035em] leading-[1.04]">
                  Made in Karachi.
                  <br />
                  Stitched to last.
                </h3>
                <p className="text-[13.5px] text-[var(--color-muted)] mt-3 max-w-[300px]">
                  Hand-finished cotton lawn suits. Free delivery in Pakistan, ships worldwide.
                </p>
                <div className="mt-5 inline-flex px-5 py-3 bg-[var(--color-ink)] text-white rounded-full text-[13px] font-semibold">
                  Shop the collection
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="aspect-square bg-[var(--color-bg-2)] rounded-[14px] p-2.5 flex flex-col justify-end relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-70"
                      style={{
                        background:
                          "repeating-linear-gradient(45deg, var(--color-bg-3) 0 6px, var(--color-bg-2) 6px 12px)",
                      }}
                    />
                    <div className="relative text-[12px] font-semibold">3-PC Suit</div>
                    <div className="relative font-mono text-[11px] text-[var(--color-muted)]">Rs 6,890</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
