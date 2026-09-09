"use client";

interface VerticalScreenMockProps {
  id: string;
  screenTitle: string;
  rows: ReadonlyArray<{ a: string; b: string; c: string }>;
}

export function VerticalScreenMock({ id, screenTitle, rows }: VerticalScreenMockProps) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[var(--color-line-2)] bg-white shadow-[0_20px_50px_rgba(10,10,10,.08)]">
      {/* ── Terminal Window Top Bar ───────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#EEF0F3] bg-[#F9FAFB] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-[#E0E2E6]" />
            <span className="h-2 w-2 rounded-full bg-[#E0E2E6]" />
            <span className="h-2 w-2 rounded-full bg-[#E0E2E6]" />
          </span>
          <span className="font-mono text-[11px] font-bold text-[#0A0A0A]">{screenTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E4FAEF] px-2 py-0.5 text-[9px] font-bold text-[#00A862]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00D27A]" />
            ACTIVE TERMINAL
          </span>
        </div>
      </div>

      {/* ── Trade-Specific Screen Body ────────────────────────────── */}
      <div className="p-4">
        {id === "restaurants" && (
          <div className="mb-3 space-y-3">
            {/* Visual Table Floor Plan */}
            <div className="flex items-center justify-between text-[11px] font-bold text-[#4B5058]">
              <span>Floor Plan · Main Dining Room</span>
              <span className="text-[10px] text-[#8A8F98]">Kitchen Station 2 Active</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="rounded-xl border border-[#00D27A] bg-[#E4FAEF] p-2 text-center">
                <div className="text-[10px] font-extrabold text-[#00A862]">T-07 · 6p</div>
                <div className="mt-0.5 text-[9px] font-semibold text-[#0A0A0A]">$24.00</div>
                <span className="mt-1 inline-block rounded-full bg-[#00D27A] px-1.5 py-0.2 text-[7.5px] font-bold text-white">
                  12m KDS
                </span>
              </div>
              <div className="rounded-xl border border-[#E3E5EA] bg-[#F7F8FA] p-2 text-center">
                <div className="text-[10px] font-bold text-[#6B7079]">T-01 · 2p</div>
                <div className="mt-0.5 text-[9px] font-medium text-[#8A8F98]">Free</div>
                <span className="mt-1 inline-block rounded-full bg-[#E3E5EA] px-1.5 py-0.2 text-[7.5px] font-semibold text-[#6B7079]">
                  Available
                </span>
              </div>
              <div className="rounded-xl border border-[#F5A524] bg-[#FFF8EE] p-2 text-center">
                <div className="text-[10px] font-extrabold text-[#D97706]">T-03 · 4p</div>
                <div className="mt-0.5 text-[9px] font-semibold text-[#0A0A0A]">$68.50</div>
                <span className="mt-1 inline-block rounded-full bg-[#F5A524] px-1.5 py-0.2 text-[7.5px] font-bold text-white">
                  Billing
                </span>
              </div>
              <div className="rounded-xl border border-[#E3E5EA] bg-[#F7F8FA] p-2 text-center">
                <div className="text-[10px] font-bold text-[#6B7079]">T-05 · 4p</div>
                <div className="mt-0.5 text-[9px] font-medium text-[#8A8F98]">Free</div>
                <span className="mt-1 inline-block rounded-full bg-[#E3E5EA] px-1.5 py-0.2 text-[7.5px] font-semibold text-[#6B7079]">
                  Reserved
                </span>
              </div>
            </div>
          </div>
        )}

        {id === "electronics" && (
          <div className="mb-3 rounded-xl border border-[#E3E5EA] bg-[#F7F8FA] p-2.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-[#0A0A0A]">IMEI / Serial Lookup Scanner</span>
              <span className="font-mono text-[#00A862] font-semibold">● Barcode Ready</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between rounded-lg bg-white px-2.5 py-1.5 text-[10.5px] border border-[#ECEEF2]">
              <span className="font-mono font-bold text-[#0A0A0A]">IMEI 35-882109-8472-4</span>
              <span className="rounded-full bg-[#E4FAEF] px-2 py-0.5 text-[9px] font-extrabold text-[#00A862]">
                WARRANTY ACTIVE
              </span>
            </div>
          </div>
        )}

        {id === "pharmacies" && (
          <div className="mb-3 rounded-xl border border-[#E3E5EA] bg-[#F7F8FA] p-2.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-[#0A0A0A]">FEFO Batch Picking Engine</span>
              <span className="rounded-full bg-[#FFF0E6] px-2 py-0.5 text-[9px] font-bold text-[#E65100]">
                EXPIRY CONTROL ACTIVE
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between rounded-lg bg-white px-2.5 py-1.5 text-[10.5px] border border-[#ECEEF2]">
              <div>
                <div className="font-bold text-[#0A0A0A]">Paracetamol 500mg (Batch B2291)</div>
                <div className="text-[9px] text-[#6B7079]">
                  Exp 03/2027 · First Expiry First Out
                </div>
              </div>
              <span className="font-mono text-[10px] font-extrabold text-[#00A862]">
                1,240 tabs
              </span>
            </div>
          </div>
        )}

        {id === "distribution" && (
          <div className="mb-3 rounded-xl border border-[#E3E5EA] bg-[#F7F8FA] p-2.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-[#0A0A0A]">Route Progress · 14 / 18 Stops (78%)</span>
              <span className="font-mono font-bold text-[#00A862]">$842.00 Cash</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#E3E5EA]">
              <div className="h-full rounded-full bg-[#00D27A]" style={{ width: "78%" }} />
            </div>
          </div>
        )}

        {id === "services" && (
          <div className="mb-3 rounded-xl border border-[#E3E5EA] bg-[#F7F8FA] p-2.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-[#0A0A0A]">Daily Appointments & Commission</span>
              <span className="font-semibold text-[#00A862]">Stylist: Alex (20%)</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between rounded-lg bg-white px-2.5 py-1.5 text-[10.5px] border border-[#ECEEF2]">
              <span className="font-bold text-[#0A0A0A]">4:30 pm · Hair & Beard (J. Rivera)</span>
              <span className="font-mono font-bold text-[#00A862]">$15.00</span>
            </div>
          </div>
        )}

        {/* Rows table */}
        <div className="space-y-1">
          {rows.map((r, i) => (
            <div
              key={r.a + i}
              className="flex items-center justify-between gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-[#EEF0F3] hover:bg-[#F9FAFB]"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12.5px] font-bold text-[#0A0A0A]">{r.a}</div>
                <div className="mt-0.5 truncate text-[11px] text-[#6B7079]">{r.b}</div>
              </div>
              <span className="flex-none whitespace-nowrap rounded-full bg-[#F0F2F5] px-2.5 py-1 text-[11px] font-extrabold text-[#0A0A0A]">
                {r.c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
