import { Search, ShieldCheck, ShoppingBag } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { cn } from "@/lib/utils/cn";

export function ThreeSurfaces() {
  return (
    <Section id="platform">
      <Container>
        <SectionHeader right="Tajir isn't three tools wired together. It's one system with three faces — POS, ERP, and a public storefront — sharing one inventory, one ledger, one customer record.">
          <Eyebrow>One platform · three surfaces</Eyebrow>
          <h2 className="display-2">
            Counter, kitchen,
            <br />
            customer&apos;s phone.
          </h2>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <SurfCard
            badge="Tajir Point"
            title="Point-of-Sale & back office"
            body="Sell at the counter, manage inventory, run shifts, print receipts, reconcile cash. Desktop, web, mobile."
            pills={["iPad", "Android", "Windows", "Mac"]}
            visual={
              <div className="flex items-end gap-1.5 h-full">
                {[32, 62, 48, 78, 55, 90, 66].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded"
                    style={{
                      height: `${h}%`,
                      background: i === 3 || i === 5 ? "var(--color-ink)" : "var(--color-mint)",
                      opacity: i === 1 ? 0.7 : i === 2 ? 0.85 : i === 4 ? 0.6 : 1,
                    }}
                  />
                ))}
              </div>
            }
          />

          <SurfCard
            featured
            badge="Tajir Cloud"
            title="Bank-grade data, all yours."
            body="Your business data is private, encrypted, and isolated — even across multiple stores or branches. We carry the security so you carry the receipts."
            pills={["Encrypted", "Daily backups", "99.9% uptime"]}
            visual={
              <div className="flex flex-col items-center justify-center gap-3.5 h-full">
                <div
                  className="w-16 h-16 rounded-[18px] flex items-center justify-center"
                  style={{ background: "rgba(0,210,122,0.14)" }}
                >
                  <ShieldCheck size={30} color="#00d27a" />
                </div>
                <div className="flex gap-6 text-[11.5px] text-white/70 font-medium">
                  <span>· Private per shop</span>
                  <span>· Always backed up</span>
                </div>
              </div>
            }
          />

          <SurfCard
            badge="Tajir Storefront"
            title="Customer-facing website"
            body="Your own domain, your brand. A fully hosted storefront — block-built, theme-driven, and connected to your live inventory."
            pills={["Block builder", "Themes"]}
            visual={
              <div className="h-full flex flex-col gap-0 -mx-[18px] -mt-[18px]">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 h-5 shrink-0 px-2.5 bg-[var(--color-bg-2)] border-b border-[var(--color-line)]">
                  <i className="w-1.5 h-1.5 rounded-full bg-[#fc5c57] block" />
                  <i className="w-1.5 h-1.5 rounded-full bg-[#febc2e] block" />
                  <i className="w-1.5 h-1.5 rounded-full bg-[#29c840] block" />
                  <div className="mx-auto w-2/5 h-2.5 rounded-full bg-[var(--color-bg-3)]" />
                </div>
                {/* Store page */}
                <div className="flex-1 bg-white flex flex-col overflow-hidden">
                  {/* Store nav */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--color-line)]">
                    <span className="font-bold text-[12px] tracking-tight text-[var(--color-ink)]">
                      Al‑Madina Store
                    </span>
                    <div className="flex gap-2 text-[var(--color-muted-2)]">
                      <Search size={13} strokeWidth={2.2} />
                      <ShoppingBag size={13} strokeWidth={2.2} />
                    </div>
                  </div>
                  {/* Hero banner */}
                  <div
                    className="mx-2.5 mt-2 rounded-[8px] px-3 py-2.5 flex items-center justify-between"
                    style={{ background: "rgba(0,210,122,0.10)" }}
                  >
                    <div>
                      <div className="text-[10.5px] font-bold text-[var(--color-ink)] leading-none">
                        Eid Sale — 20% off
                      </div>
                      <div className="text-[9px] text-[var(--color-muted)] mt-0.5">
                        All beverages & snacks
                      </div>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-[var(--color-ink)] text-white text-[8px] font-bold">
                      Shop now
                    </div>
                  </div>
                  {/* Product grid */}
                  <div className="grid grid-cols-3 gap-1.5 px-2.5 mt-2 flex-1">
                    {[
                      { name: "Pepsi 1.5L", price: "Rs 100", bg: "#f0f9ff" },
                      {
                        name: "Lays BBQ",
                        price: "Rs 40",
                        bg: "var(--color-mint-soft)",
                        accent: true,
                      },
                      { name: "Tropicana", price: "Rs 150", bg: "#fef9ee" },
                    ].map((prod) => (
                      <div
                        key={prod.name}
                        className="rounded-[8px] overflow-hidden"
                        style={{ background: prod.bg }}
                      >
                        <div
                          className="aspect-square w-full"
                          style={{
                            background: prod.accent ? "rgba(0,210,122,0.18)" : "rgba(0,0,0,0.04)",
                          }}
                        />
                        <div className="px-1.5 py-1">
                          <div className="text-[8.5px] font-semibold text-[var(--color-ink)] truncate leading-tight">
                            {prod.name}
                          </div>
                          <div
                            className="text-[8px] font-bold mt-px"
                            style={{ color: "var(--color-mint)" }}
                          >
                            {prod.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </Container>
    </Section>
  );
}

interface SurfCardProps {
  badge: string;
  title: string;
  body: React.ReactNode;
  pills: string[];
  visual: React.ReactNode;
  featured?: boolean;
}

function SurfCard({ badge, title, body, pills, visual, featured }: SurfCardProps) {
  return (
    <article
      className={cn(
        "rounded-[32px] pt-9 px-9 flex flex-col min-h-[520px] overflow-hidden transition-transform duration-200 hover:-translate-y-1",
        featured ? "bg-[var(--color-ink)] text-white/[0.78]" : "bg-[var(--color-bg-2)]"
      )}
    >
      <div
        className={cn(
          "text-[12px] font-semibold tracking-[0.04em] mb-[18px]",
          featured ? "text-[var(--color-mint)]" : "text-[var(--color-muted)]"
        )}
      >
        {badge}
      </div>
      <h3
        className={cn(
          "text-[30px] tracking-[-0.03em] mb-3 leading-[1.05]",
          featured && "text-white"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-[15.5px] leading-[1.55] max-w-[300px]",
          featured ? "text-white/65" : "text-[var(--color-muted)]"
        )}
      >
        {body}
      </p>
      <div className="mt-auto pt-9">
        <div className="flex flex-wrap gap-1.5">
          {pills.map((p) => (
            <span
              key={p}
              className={cn(
                "inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold",
                featured
                  ? "bg-white/[0.08] text-white"
                  : "bg-[var(--color-bg-3)] text-[var(--color-ink)]"
              )}
            >
              {p}
            </span>
          ))}
        </div>
        <div
          className={cn(
            "h-[200px] rounded-t-[18px] mt-6 p-[18px] flex flex-col gap-2.5 overflow-hidden -mx-4 -mb-px",
            featured
              ? "bg-[#0f0f0f] shadow-[0_-10px_30px_-12px_rgba(0,0,0,0.5)]"
              : "bg-white shadow-[0_-10px_30px_-12px_rgba(0,0,0,0.08)]"
          )}
        >
          {visual}
        </div>
      </div>
    </article>
  );
}
