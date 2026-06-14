import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";

const LANGUAGES = [
  {
    code: "EN",
    label: "English",
    dir: "ltr" as const,
    tag: "English · LTR",
    shopName: "Hassan General Store",
    date: "10 May 2025 · 14:32",
    items: [
      { name: "Pepsi 1.5L", qty: "1×", price: "Rs 220" },
      { name: "Lays Salt", qty: "2×", price: "Rs 120" },
      { name: "Bread Loaf", qty: "1×", price: "Rs 85" },
    ],
    total: "Rs 425",
    totalLabel: "TOTAL",
    thankYou: "Thank you for shopping with us",
    fontClass: "font-mono",
  },
  {
    code: "UR",
    label: "اردو",
    dir: "rtl" as const,
    tag: "اردو · RTL",
    shopName: "حسن جنرل اسٹور",
    date: "۱۰ مئی ۲۰۲۵ · ۱۴:۳۲",
    items: [
      { name: "پیپسی ۱.۵ لیٹر", qty: "×۱", price: "۲۲۰ ₨" },
      { name: "لیز نمکین", qty: "×۲", price: "۱۲۰ ₨" },
      { name: "ڈبل روٹی", qty: "×۱", price: "۸۵ ₨" },
    ],
    total: "۴۲۵ ₨",
    totalLabel: "کل",
    thankYou: "خریداری کا شکریہ",
    fontClass: "font-arabic",
  },
  {
    code: "AR",
    label: "العربية",
    dir: "rtl" as const,
    tag: "العربية · RTL",
    shopName: "متجر حسن العام",
    date: "١٠ مايو ٢٠٢٥ · ١٤:٣٢",
    items: [
      { name: "بيبسي ١.٥ لتر", qty: "×١", price: "٢٢٠ ر.س" },
      { name: "ليز ملح", qty: "×٢", price: "١٢٠ ر.س" },
      { name: "رغيف خبز", qty: "×١", price: "٨٥ ر.س" },
    ],
    total: "٤٢٥ ر.س",
    totalLabel: "المجموع",
    thankYou: "شكراً لتسوقكم معنا",
    fontClass: "font-arabic",
  },
];

const FEATURES = [
  { icon: "🖥️", label: "POS interface" },
  { icon: "🧾", label: "Receipts & invoices" },
  { icon: "📊", label: "Reports & exports" },
  { icon: "🛒", label: "Storefront" },
  { icon: "📱", label: "Customer-facing screens" },
  { icon: "↔️", label: "RTL layout auto-flip" },
];

export function TriLingual() {
  return (
    <Section tone="dark">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <Eyebrow variant="on-dark">Three languages, zero setup</Eyebrow>
            <h2 className="display-2 text-white mt-4">
              Switch language.
              <br />
              Everything follows.
            </h2>
          </div>
          <p className="text-[17px] leading-[1.6] text-white/55 max-w-[400px]">
            English, اردو, and العربية are built into every screen, receipt, and report. Pick your language once — the whole app switches, including RTL layout.
          </p>
        </div>

        {/* "Same sale · Three languages" receipt comparison */}
        <div className="relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <span className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.1] text-white/60 text-[11.5px] font-semibold px-4 py-1.5 rounded-full tracking-wide">
              Same sale · Three languages
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-6">
            {LANGUAGES.map((lang) => (
              <div
                key={lang.code}
                className="rounded-[20px] bg-white/[0.04] border border-white/[0.07] overflow-hidden hover:bg-white/[0.07] transition-colors duration-200"
              >
                {/* Language tag */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.07]">
                  <span className="text-[11px] tracking-[0.12em] uppercase font-bold text-[var(--color-mint)]">
                    {lang.tag}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[var(--color-mint)]/15 flex items-center justify-center text-[10px] font-extrabold text-[var(--color-mint)]">
                    {lang.code}
                  </span>
                </div>

                {/* Receipt mockup */}
                <div className="p-5">
                  <div
                    className={`bg-white rounded-[14px] p-4 text-[var(--color-ink)] ${lang.fontClass}`}
                    style={lang.dir === "rtl" ? { fontFamily: "var(--font-arabic)", direction: "rtl" } : undefined}
                  >
                    {/* Shop header */}
                    <div className="text-center mb-3 pb-3 border-b border-dashed border-gray-200">
                      <div className="text-[12px] font-bold">{lang.shopName}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{lang.date}</div>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col gap-1.5 mb-3">
                      {lang.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-baseline text-[11px]">
                          <span className="text-gray-700">{item.qty} {item.name}</span>
                          <span className="font-semibold">{item.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-gray-200 text-[12px] font-extrabold">
                      <span>{lang.totalLabel}</span>
                      <span>{lang.total}</span>
                    </div>

                    {/* Thank you */}
                    <div className="mt-3 pt-2.5 border-t border-dashed border-gray-200 text-center text-[10px] text-gray-400">
                      {lang.thankYou}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What switches */}
        <div className="mt-12 pt-10 border-t border-white/[0.07]">
          <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-white/35 mb-5">
            What switches when you change language
          </p>
          <div className="flex flex-wrap gap-2.5">
            {FEATURES.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-[13px] text-white/70 font-medium"
              >
                <span>{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
