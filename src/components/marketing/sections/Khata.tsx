import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { cn } from "@/lib/utils/cn";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M2 21a10 10 0 0120 0"/></svg>
    ),
    title: "Customer ledgers",
    body: "Every customer's running balance updates instantly. Always exact, always live, never out of sync.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
    ),
    title: "Credit limits",
    body: "Warn or block at sale time. Advances allocate cleanly against open invoices.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M7 14l3-3 4 4 5-7"/></svg>
    ),
    title: "Aging reports",
    body: "0–30 / 31–60 / 61–90 / 90+ buckets. Statements printable in three languages.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="17" r="3"/><circle cx="17" cy="17" r="3"/><path d="M2 5h11l3 12M14 8h6l1 5"/></svg>
    ),
    title: "Supplier ledger",
    body: "PO → GRN → invoice → payment. Returns, advances, allocations — one trail.",
  },
];

const ledgerRows = [
  { date: "2026-05-08", desc: "Invoice INV-4421", ref: "Sale · 14 SKUs · GST", debit: "28,400.00", credit: "" },
  { date: "2026-05-04", desc: "Payment received", ref: "Cash · alloc INV-4380", debit: "", credit: "15,000.00" },
  { date: "2026-04-29", desc: "Sale return SR-118", ref: "Credit note issued", debit: "", credit: "2,200.00" },
  { date: "2026-04-22", desc: "Invoice INV-4380", ref: "Sale · 21 SKUs · GST", debit: "42,600.00", credit: "" },
];

export function Khata() {
  return (
    <Section id="khata">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-24 items-start">
          <div>
            <Eyebrow>Differentiator · 02 · The heart of the platform</Eyebrow>
            <h2 className="display-2">
              Khata, but a real
              <br />
              ledger underneath.
            </h2>
            <p className="lead mt-8">
              Most merchants in Pakistan and the Gulf still run their books on a paper khata. Tajir
              replaces it with a true double-entry ledger that <em>still feels like a khata</em> —
              running balances, credit limits, statements, aging.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-12">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-[18px] transition-[background,transform] duration-200 hover:bg-[var(--color-bg-2)] hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 bg-[var(--color-mint-soft)] text-[#0d6b3d]">
                    {f.icon}
                  </div>
                  <h5 className="text-[16px] font-semibold mb-1.5 tracking-[-0.01em]">{f.title}</h5>
                  <p className="text-[14px] text-[var(--color-muted)] leading-[1.5]">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-white rounded-[32px] overflow-hidden"
            style={{
              boxShadow: "0 50px 100px -40px rgba(10,42,32,0.30), 0 0 0 1px var(--color-line)",
            }}
          >
            <div className="px-7 py-6 border-b border-[var(--color-line)] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-[42px] h-[42px] rounded-xl text-white font-bold text-[16px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--color-mint), var(--color-forest))" }}>
                  HT
                </div>
                <div>
                  <h5 className="text-[15.5px] font-semibold">Hassan Traders</h5>
                  <small className="text-[12.5px] text-[var(--color-muted-2)] block mt-0.5">
                    Customer · Liaquat Road · since Mar 2024
                  </small>
                </div>
              </div>
              <div className="text-[11.5px] text-[var(--color-muted-2)] font-semibold tracking-[0.08em]">
                CR-LIMIT Rs 200,000
              </div>
            </div>
            <div className="px-7 pb-5">
              <div className="text-[11.5px] tracking-[0.12em] uppercase text-[var(--color-muted-2)] font-semibold pt-5">
                Outstanding balance
              </div>
              <div className="text-[46px] font-extrabold tracking-[-0.035em] mt-2 flex items-baseline gap-2">
                Rs 142,800.00
                <small className="text-[14px] text-[var(--color-muted-2)] font-medium font-mono">· PKR</small>
              </div>
              <div className="inline-flex gap-1.5 px-2.5 py-1 rounded-full bg-[#fee2e2] text-[#b91c1c] text-[12px] font-semibold mt-2.5">
                ▾ 31–60 days · 7 invoices open
              </div>
            </div>
            <table className="w-full border-collapse text-[13.5px]">
              <thead>
                <tr>
                  {["Date", "Description", "Debit", "Credit"].map((h, i) => (
                    <th
                      key={h}
                      className={cn(
                        "bg-[var(--color-bg-2)] py-2.5 px-7 font-semibold text-[var(--color-muted-2)] text-[11px] tracking-[0.1em] uppercase",
                        i >= 2 ? "text-right" : "text-left"
                      )}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ledgerRows.map((r, i) => (
                  <tr key={i}>
                    <td className="py-3.5 px-7 border-b border-[var(--color-line)] align-top">
                      <div className="font-mono text-[12px]">{r.date}</div>
                    </td>
                    <td className="py-3.5 px-7 border-b border-[var(--color-line)] align-top">
                      <div className="font-semibold text-[13.5px]">{r.desc}</div>
                      <div className="font-mono text-[11.5px] text-[var(--color-muted-2)] mt-0.5">{r.ref}</div>
                    </td>
                    <td className="py-3.5 px-7 border-b border-[var(--color-line)] align-top text-right font-mono font-semibold text-[#b91c1c]">
                      {r.debit}
                    </td>
                    <td className="py-3.5 px-7 border-b border-[var(--color-line)] align-top text-right font-mono font-semibold text-[#0d6b3d]">
                      {r.credit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex px-7 py-3.5 gap-5 bg-[var(--color-bg-2)] text-[11px] text-[var(--color-muted-2)] font-semibold tracking-[0.06em]">
              {["DOUBLE-ENTRY", "AUDIT TRAIL", "SOFT-DELETE", "SAFT EXPORT"].map((tag) => (
                <span key={tag} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-mint)]" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

