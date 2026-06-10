import { ArrowUp, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/brand";
import { useCart } from "@/lib/cart-store";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hi Christine Collections, I'd like to ask about ")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 md:bottom-6 right-5 z-30 w-14 h-14 rounded-full shadow-lg hover:scale-110 transition animate-float flex items-center justify-center"
    >
      <svg viewBox="0 0 48 48" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#25D366" />
        <path
          fill="white"
          d="M24 10.5C16.544 10.5 10.5 16.544 10.5 24c0 2.385.638 4.735 1.85 6.8L10.5 37.5l6.9-1.814A13.44 13.44 0 0 0 24 37.5c7.456 0 13.5-6.044 13.5-13.5S31.456 10.5 24 10.5zm6.54 18.418c-.276.776-1.607 1.482-2.196 1.537-.561.052-1.09.264-3.666-.763-3.097-1.232-5.07-4.394-5.224-4.6-.152-.204-1.24-1.65-1.24-3.148 0-1.498.784-2.234 1.063-2.538a1.12 1.12 0 0 1 .812-.38c.203 0 .405.004.582.012.187.009.437-.071.683.521.256.614.87 2.112.945 2.267.076.155.127.337.025.541-.1.203-.15.33-.298.508-.15.178-.314.398-.448.534-.149.149-.304.31-.13.608.172.298.766 1.263 1.644 2.046 1.129 1.007 2.08 1.318 2.378 1.467.298.149.472.124.647-.075.176-.198.748-.874.948-1.173.198-.298.397-.248.669-.149.273.1 1.732.817 2.03.966.298.149.497.223.571.347.075.124.075.714-.2 1.49z"
        />
      </svg>
    </a>
  );
}

export function FloatingCart() {
  const { items, open, lastAdded } = useCart();
  const count = items.reduce((a, i) => a + i.quantity, 0);
  const [visible, setVisible] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (!lastAdded) return;
    setVisible(true);
    setBump(true);
    const bumpTimer = setTimeout(() => setBump(false), 400);
    const hideTimer = setTimeout(() => setVisible(false), 6000);
    return () => { clearTimeout(bumpTimer); clearTimeout(hideTimer); };
  }, [lastAdded]);

  if (!visible || count === 0) return null;

  return (
    <button
      onClick={open}
      aria-label="Open cart"
      className={`fixed bottom-40 md:bottom-24 right-4 z-30 flex items-center gap-2 pl-3 pr-2.5 h-10 rounded-full bg-[color:var(--rose)] text-[color:var(--plum-deep)] shadow-lg transition-all duration-300 ${bump ? "scale-110" : "scale-100"}`}
    >
      <ShoppingBag size={14} strokeWidth={2.5} />
      <span className="text-[11px] font-bold tracking-wide">{count} {count === 1 ? "item" : "items"}</span>
      <span className="w-5 h-5 rounded-full bg-[color:var(--plum-deep)] text-[color:var(--rose)] text-[10px] font-bold flex items-center justify-center">
        {count}
      </span>
    </button>
  );
}

export function BackToTop() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const f = () => setV(window.scrollY > 600);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  if (!v) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-40 md:bottom-40 left-4 md:left-auto md:right-5 z-30 w-9 h-9 rounded-full bg-[color:var(--card)] border border-[color:var(--border)] flex items-center justify-center hover:border-[color:var(--rose)] transition"
      aria-label="Back to top"
    >
      <ArrowUp size={14} />
    </button>
  );
}
