import { createFileRoute, notFound, useNavigate, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useQuery, queryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingBag, ZoomIn, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/Shell";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, listProducts } from "@/lib/catalog.functions";
import { formatKsh } from "@/lib/brand";
import { useCart } from "@/lib/cart-store";

const opts = (slug: string) => queryOptions({ queryKey: ["product", slug], queryFn: () => getProduct({ data: { slug } }) });

export const Route = createFileRoute("/shop/$slug")({
  loader: async ({ params, context }) => {
    const p = await context.queryClient.ensureQueryData(opts(params.slug));
    if (!p) throw notFound();
  },
  component: Detail,
  notFoundComponent: () => (
    <Shell>
      <div className="max-w-3xl mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link to="/shop" className="btn-rose mt-6 inline-flex">Back to Shop</Link>
      </div>
    </Shell>
  ),
});

const TABS = ["Description", "Size Guide", "Care"] as const;

const COLOR_MAP: Record<string, string> = {
  black: "#1a1a1a", white: "#f5f5f5", red: "#e53e3e", blue: "#3182ce",
  navy: "#1a365d", green: "#38a169", pink: "#ed64a6", purple: "#805ad5",
  yellow: "#ecc94b", orange: "#ed8936", brown: "#92400e", grey: "#718096",
  gray: "#718096", cream: "#F5EEE8", beige: "#f5f0e8", plum: "#2D1B2E",
  blush: "#F2D4C8", "rose gold": "#C0866A", gold: "#d4af37", silver: "#c0c0c0",
  maroon: "#800000", teal: "#319795", coral: "#fc8181", lavender: "#9f7aea",
  olive: "#6b7a0a", mustard: "#d4a017", camel: "#c19a6b", khaki: "#c3b091",
};

function Detail() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(opts(slug));
  const { data: allProducts } = useQuery({ queryKey: ["products-all"], queryFn: () => listProducts({ data: {} }) });
  const nav = useNavigate();
  const add = useCart((s) => s.add);

  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [size, setSize] = useState<string | null>(p?.sizes?.[0] ?? null);
  const [color, setColor] = useState<string | null>(p?.colors?.[0] ?? null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<typeof TABS[number]>("Description");

  if (!p) return null;

  const images: string[] = p.images?.length ? p.images : ["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200"];
  const related = (allProducts as any[] | undefined)?.filter((x: any) => x.id !== p.id && x.category_id === p.category_id).slice(0, 4) ?? [];

  const onAdd = (buyNow = false) => {
    if (p.stock_quantity === 0) return;
    add({
      productId: p.id,
      slug: p.slug,
      name: p.name,
      image: images[0] ?? "",
      unitPrice: Number(p.price),
      size: size ?? null,
      color: color ?? null,
      quantity: qty,
    });
    toast.success("Added to bag");
    if (buyNow) nav({ to: "/checkout" });
  };

  return (
    <Shell>
      <div className="max-w-6xl mx-auto px-5 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-[color:var(--muted-foreground)] mb-8 flex gap-2">
          <Link to="/" className="hover:text-[color:var(--rose)]">Home</Link> /
          <Link to="/shop" className="hover:text-[color:var(--rose)]">Shop</Link> /
          <span className="text-[color:var(--cream)]">{p.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-[3/4] bg-[color:var(--card)] rounded-xl overflow-hidden relative group cursor-zoom-in" onClick={() => setZoomed(true)}>
              <motion.img key={activeImg} src={images[activeImg]} alt={p.name}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="bg-black/40 rounded-full p-3"><ZoomIn className="text-white" size={22} /></div>
              </div>
              {p.compare_price && <span className="absolute top-3 left-3 chip">Sale</span>}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition ${i === activeImg ? "border-[color:var(--rose)]" : "border-transparent"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="eyebrow mb-2">{(p as any).categories?.name}</p>
            <h1 className="font-display text-4xl mb-3">{p.name}</h1>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="price text-2xl text-[color:var(--rose)] font-semibold">{formatKsh(p.price)}</span>
              {p.compare_price && <span className="price line-through text-[color:var(--muted-foreground)]">{formatKsh(p.compare_price)}</span>}
            </div>

            <div className="flex items-center gap-2 mb-6">
              <MapPin size={13} className="text-[color:var(--rose)]" />
              <span className="text-xs text-[color:var(--muted-foreground)]">
                {p.branch === "both" ? "Available at Nairobi & Makueni" : `Available at ${p.branch.charAt(0).toUpperCase() + p.branch.slice(1)}`}
              </span>
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${p.stock_quantity > 5 ? "bg-green-500/20 text-green-400" : p.stock_quantity > 0 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
                {p.stock_quantity > 5 ? "In Stock" : p.stock_quantity > 0 ? `Only ${p.stock_quantity} left` : "Out of Stock"}
              </span>
            </div>

            {p.sizes?.length > 0 && (
              <div className="mb-5">
                <p className="eyebrow mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {p.sizes.map((s: string) => (
                    <button key={s} onClick={() => setSize(s)}
                      className={`px-4 py-2 rounded-md border text-sm transition ${size === s ? "border-[color:var(--rose)] text-[color:var(--rose)] bg-[color:var(--rose)]/10" : "border-[color:var(--border)] hover:border-[color:var(--rose)]/50"}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {p.colors?.length > 0 && (
              <div className="mb-5">
                <p className="eyebrow mb-2">Color{color && <span className="normal-case tracking-normal font-normal text-[color:var(--muted-foreground)] ml-2">— {color}</span>}</p>
                <div className="flex flex-wrap gap-3">
                  {p.colors.map((c: string) => {
                    const swatch = COLOR_MAP[c.toLowerCase()] ?? null;
                    return (
                      <button key={c} onClick={() => setColor(c)} title={c}
                        className={`w-8 h-8 rounded-full border-2 transition ${color === c ? "border-[color:var(--rose)] scale-110 shadow-[0_0_0_2px_var(--rose)]" : "border-transparent hover:border-[color:var(--rose)]/50"}`}
                        style={swatch ? { backgroundColor: swatch } : undefined}>
                        {!swatch && <span className="text-[9px] leading-none p-0.5 block truncate">{c.slice(0, 3)}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-6">
              <p className="eyebrow mb-2">Quantity</p>
              <div className="inline-flex items-center gap-0 border border-[color:var(--border)] rounded-lg overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-[color:var(--muted)] transition"><Minus size={14} /></button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-[color:var(--muted)] transition"><Plus size={14} /></button>
              </div>
            </div>

            <div className="hidden md:flex flex-wrap gap-3 mb-8">
              <button onClick={() => onAdd(false)} disabled={p.stock_quantity === 0} className="btn-rose"><ShoppingBag size={16} /> Add to Bag</button>
              <button onClick={() => onAdd(true)} disabled={p.stock_quantity === 0} className="btn-ghost">Buy Now</button>
            </div>

            {/* Tabs */}
            <div className="border-t border-[color:var(--border)] pt-6">
              <div className="flex gap-0 border-b border-[color:var(--border)] mb-5">
                {TABS.map((t) => (
                  <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm transition border-b-2 -mb-px ${tab === t ? "border-[color:var(--rose)] text-[color:var(--rose)]" : "border-transparent text-[color:var(--muted-foreground)]"}`}>{t}</button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {tab === "Description" && (
                    p.description?.trim()
                      ? <div className="text-[color:var(--muted-foreground)] text-sm leading-relaxed space-y-3">
                          {p.description.trim().split(/\n+/).map((para: string, i: number) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                      : <p className="text-[color:var(--muted-foreground)] text-sm leading-relaxed italic">Premium quality, ethically crafted in Kenya.</p>
                  )}
                  {tab === "Size Guide" && (
                    <div className="text-sm text-[color:var(--muted-foreground)] space-y-1">
                      <p className="font-medium text-[color:var(--cream)] mb-2">Standard Kenyan sizing</p>
                      {[["XS", "32-34"], ["S", "34-36"], ["M", "38-40"], ["L", "42-44"], ["XL", "46-48"]].map(([sz, cm]) => (
                        <div key={sz} className="flex justify-between border-b border-[color:var(--border)] py-1"><span>{sz}</span><span>{cm} cm chest</span></div>
                      ))}
                      <p className="mt-3 text-xs">All pieces are hand-finished — slight variation is part of the craft.</p>
                    </div>
                  )}
                  {tab === "Care" && (
                    <ul className="text-sm text-[color:var(--muted-foreground)] space-y-2">
                      {["Hand wash in cold water", "Do not tumble dry", "Iron on low heat", "Dry clean recommended for silk", "Store in a cool, dry place"].map((c) => (
                        <li key={c} className="flex gap-2"><span className="text-[color:var(--rose)]">·</span>{c}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20">
            <p className="eyebrow mb-2">You may also like</p>
            <h2 className="font-display text-3xl mb-7">Related Pieces</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((rp: any, i: number) => <ProductCard key={rp.id} p={rp} index={i} />)}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky add-to-cart */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-[color:var(--plum-deep)]/95 backdrop-blur-md border-t border-[color:var(--border)] p-3 flex gap-3">
        <button onClick={() => onAdd(false)} disabled={p.stock_quantity === 0} className="btn-rose flex-1 justify-center text-sm py-3">
          <ShoppingBag size={15} /> Add to Bag · {formatKsh(p.price)}
        </button>
        <button onClick={() => onAdd(true)} disabled={p.stock_quantity === 0} className="btn-ghost px-4 text-sm py-3">Buy</button>
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)} className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out">
            <img src={images[activeImg]} alt={p.name} className="max-h-[90vh] max-w-full object-contain rounded-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}
