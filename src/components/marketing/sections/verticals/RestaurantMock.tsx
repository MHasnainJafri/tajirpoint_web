export function RestaurantMock() {
  const tickets = [
    { id: "T-04", time: "12:42", items: ["2× Beef Burger", "1× Zinger Wrap", "no onion"], color: "#3a1a1a", border: "#c64545", time_color: "#ffb6b6" },
    { id: "T-09", time: "12:48", items: ["1× Chicken Karahi", "2× Naan", "1× Lassi"], color: "rgba(245,158,11,0.18)", border: "#f59e0b", time_color: "#ffd778" },
    { id: "T-12", time: "12:51", items: ["3× Chai", "1× Samosa"], color: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)", time_color: "rgba(255,255,255,0.55)" },
  ];
  return (
    <>
      <div className="flex justify-between items-center pb-4 border-b border-white/[0.07] mb-4">
        <div className="text-[12px] text-white/50 tracking-[0.12em] uppercase font-semibold">KDS · Hot line</div>
        <div className="font-mono text-[12px] text-[#ffd778]">8 active · 2 late</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {tickets.map((t, i) => (
          <div
            key={i}
            className="rounded-[10px] p-3.5"
            style={{
              background: t.color,
              boxShadow: `inset 0 0 0 ${i === 0 ? "2px" : "1px"} ${t.border}`,
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-white font-bold text-[13px]">{t.id}</div>
              <div className="font-mono text-[11px]" style={{ color: t.time_color }}>
                {t.time}
              </div>
            </div>
            <div className="text-[11.5px] text-white/85 leading-[1.5]">
              {t.items.map((item, j) =>
                item.startsWith("no") ? (
                  <div key={j} className="text-white/50 italic">
                    {item}
                  </div>
                ) : (
                  <div key={j}>{item}</div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
