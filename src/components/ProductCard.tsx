import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingBag, Zap } from "lucide-react";
import { toast } from "sonner";
import { formatKsh } from "@/lib/brand";
import { useCart } from "@/lib/cart-store";

type P = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compare_price: number | null;
  images: string[];
  branch: string;
  stock_quantity?: number;
  sizes?: string[];
  colors?: string[];
};

export function ProductCard({ p, index = 0 }: { p: P; index?: number }) {
  const img = p.images?.[0] ?? "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800";
  const onSale = p.compare_price && Number(p.compare_price) > Number(p.price);
  const outOfStock = p.stock_quantity === 0;
  const add = useCart((s) => s.add);
  const nav = useNavigate();

  const handleAdd = (e: React.MouseEvent, buyNow = false) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    add({
      productId: p.id,
      slug: p.slug,
      name: p.name,
      image: img,
      unitPrice: Number(p.price),
      size: p.sizes?.[0] ?? null,
      color: p.colors?.[0] ?? null,
      quantity: 1,
    });
    toast.success("Added to bag");
    if (buyNow) nav({ to: "/checkout" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.06 }}
    >
      <div className="card-luxe overflow-hidden flex flex-col cursor-pointer h-full">
        {/* Image */}
        <Link to="/shop/$slug" params={{ slug: p.slug }} className="block relative overflow-hidden shrink-0">
          <div className="aspect-[3/4] bg-[color:var(--muted)] overflow-hidden">
            <img
              src={img}
              alt={p.name}
              loading="lazy"
              className="w-full h-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
          {onSale && <span className="absolute top-2 left-2 chip text-[10px] px-2 py-0.5">Sale</span>}
          {outOfStock && (
            <span className="absolute top-2 right-2 chip text-[10px] px-2 py-0.5 bg-[color:var(--muted)] border-[color:var(--border)] text-[color:var(--muted-foreground)]">
              Sold out
            </span>
          )}
        </Link>

        {/* Info */}
        <div className="p-2.5 md:p-4 flex flex-col gap-1 flex-1">
          {p.branch !== "both" && (
            <span className="chip self-start text-[10px] px-2 py-0.5">{p.branch}</span>
          )}
          <Link to="/shop/$slug" params={{ slug: p.slug }}>
            <h3 className="font-display text-sm md:text-base leading-snug hover:text-[color:var(--rose)] transition line-clamp-2">
              {p.name}
            </h3>
          </Link>
          <div className="flex flex-wrap items-baseline gap-1 mb-2">
            <span className="price text-sm md:text-base text-[color:var(--rose)] font-semibold whitespace-nowrap">
              {formatKsh(p.price)}
            </span>
            {onSale && (
              <span className="price text-[11px] line-through text-[color:var(--muted-foreground)] whitespace-nowrap">
                {formatKsh(p.compare_price!)}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-1.5 mt-auto">
            <button
              onClick={(e) => handleAdd(e, false)}
              disabled={outOfStock}
              className="flex-1 flex items-center justify-center gap-1 bg-[color:var(--rose)] text-[color:var(--plum-deep)] font-semibold text-[11px] md:text-xs tracking-wide uppercase rounded-full py-2 px-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition"
            >
              <ShoppingBag size={11} strokeWidth={2.5} />
              <span>{outOfStock ? "Sold out" : "Add to Bag"}</span>
            </button>
            <button
              onClick={(e) => handleAdd(e, true)}
              disabled={outOfStock}
              title="Buy Now"
              className="flex items-center justify-center gap-1 border border-[color:var(--rose)]/50 text-[color:var(--cream)] text-[11px] md:text-xs tracking-wide uppercase rounded-full py-2 px-2.5 md:px-4 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed hover:border-[color:var(--rose)] hover:bg-[color:var(--rose)]/10 transition"
            >
              <Zap size={11} strokeWidth={2.5} className="md:hidden" />
              <span className="hidden md:inline">Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
