export const Ticker = ({ items, className = "", testId = "status-ticker" }) => (
  <div
    data-testid={testId}
    className={`overflow-hidden border-y border-slate-800/70 bg-[#0B1222]/70 ${className}`}
  >
    <div className="animate-marquee flex w-max py-2">
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-3 whitespace-nowrap px-7 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500/80" />
          {item}
        </span>
      ))}
    </div>
  </div>
);
