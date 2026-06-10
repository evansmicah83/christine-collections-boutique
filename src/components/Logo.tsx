export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`inline-flex items-center gap-3 ${className}`} aria-label="Christine Collections">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D9A688" />
            <stop offset="100%" stopColor="#A66B50" />
          </linearGradient>
        </defs>
        <path d="M20 6 L24 12 L20 14 L16 12 Z" fill="url(#rg)" />
        <path d="M20 14 V18" stroke="url(#rg)" strokeWidth="1.5" />
        <path d="M30 30 C30 21 25 17 20 17 C15 17 10 21 10 30" stroke="url(#rg)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-xl tracking-wide">Christine</span>
        <span className="block text-[0.6rem] tracking-[0.32em] uppercase text-[color:var(--rose-soft)] font-light">Collections</span>
      </span>
    </a>
  );
}
