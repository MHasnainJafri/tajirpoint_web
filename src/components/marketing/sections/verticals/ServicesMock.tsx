export function ServicesMock() {
  const slots = [
    { time: "10:00", staff: "Bilal", service: "Haircut", duration: 2 },
    { time: "10:30", staff: "Amina", service: "Color", duration: 4 },
    { time: "11:00", staff: "Bilal", service: "Beard", duration: 1 },
    { time: "12:00", staff: "Sara", service: "Massage 60min", duration: 4 },
    { time: "14:00", staff: "Amina", service: "Manicure", duration: 2 },
  ];
  return (
    <>
      <div className="flex justify-between items-center pb-4 border-b border-white/[0.07] mb-4">
        <div className="text-[12px] text-white/50 tracking-[0.12em] uppercase font-semibold">
          Tuesday · Liaquat Branch
        </div>
        <div className="font-mono text-[12px] text-[var(--color-mint)]">5 booked · 3 walk-in</div>
      </div>
      <div className="grid grid-cols-[60px_1fr_1fr_1fr] gap-1 text-[11px]">
        <div></div>
        {["Bilal", "Amina", "Sara"].map((s) => (
          <div key={s} className="text-white/55 font-semibold text-center pb-2">
            {s}
          </div>
        ))}
        {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"].map((time) => (
          <div key={time} className="contents">
            <div className="text-white/40 font-mono py-2 text-[10px]">{time}</div>
            {["Bilal", "Amina", "Sara"].map((staff) => {
              const slot = slots.find((s) => s.staff === staff && s.time === time);
              return (
                <div
                  key={`${time}-${staff}`}
                  className="rounded p-1.5 min-h-[34px] text-[10.5px]"
                  style={{
                    background: slot ? "var(--color-mint)" : "rgba(255,255,255,0.04)",
                    color: slot ? "var(--color-ink)" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {slot ? <strong className="font-semibold">{slot.service}</strong> : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-white/[0.04] rounded-xl text-[12px] text-white/70 flex justify-between">
        <span>Sent · 3 reminders today</span>
        <span className="font-mono text-[var(--color-mint)]">WhatsApp ✓</span>
      </div>
    </>
  );
}
