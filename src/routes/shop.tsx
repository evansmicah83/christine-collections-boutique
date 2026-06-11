import { createFileRoute, useNavigate, Outlet, useChildMatches } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";
import { Shell } from "@/components/Shell";
import { ProductCard } from "@/components/ProductCard";
import { listProducts, listCategories } from "@/lib/catalog.functions";
import { z } from "zod";

const searchSchema = z.object({
  category: z.string().optional(),
  sort: z.enum(["new", "low", "high"]).optional(),
}).parse;

const prodOpts = queryOptions({ queryKey: ["products-all"], queryFn: () => listProducts({ data: {} }) });
const catOpts = queryOptions({ queryKey: ["cats"], queryFn: () => listCategories() });

export const Route = createFileRoute("/shop")({
  validateSearch: (s) => searchSchema(s),
  loader: async ({ context }) => {
    await Promise.all([context.queryClient.ensureQueryData(prodOpts), context.queryClient.ensureQueryData(catOpts)]);
  },
  component: ShopRoot,
});

function ShopRoot() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return <Outlet />;
  return <Shop />;
}

const PAGE_SIZE = 12;

function Shop() {
  const sp = Route.useSearch();
  const nav = useNavigate();
  const { data: products } = useSuspenseQuery(prodOpts);
  const { data: cats } = useSuspenseQuery(catOpts);

  const [cat, setCat] = useState<string | undefined>(sp.category);
  const [branch, setBranch] = useState<string>("all");
  const [sort, setSort] = useState<string>(sp.sort ?? "new");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  // Collect all unique sizes & colors
  const allSizes = useMemo(() => [...new Set((products as any[]).flatMap((p: any) => p.sizes ?? []))], [products]);
  const allColors = useMemo(() => [...new Set((products as any[]).flatMap((p: any) => p.colors ?? []))], [products]);
  const priceMax = useMemo(() => Math.max(...(products as any[]).map((p: any) => Number(p.price)), 1000), [products]);

  const filtered = useMemo(() => {
    let r = [...(products as any[])];
    if (cat) r = r.filter((p) => p.categories?.slug === cat);
    if (branch !== "all") r = r.filter((p) => p.branch === branch || p.branch === "both");
    if (sizes.length) r = r.filter((p) => sizes.some((s) => p.sizes?.includes(s)));
    if (colors.length) r = r.filter((p) => colors.some((c) => p.colors?.includes(c)));
    r = r.filter((p) => Number(p.price) <= maxPrice);
    if (sort === "low") r.sort((a, b) => Number(a.price) - Number(b.price));
    else if (sort === "high") r.sort((a, b) => Number(b.price) - Number(a.price));
    return r;
  }, [products, cat, branch, sizes, colors, maxPrice, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSize = (s: string) => { setSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]); setPage(1); };
  const toggleColor = (c: string) => { setColors((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]); setPage(1); };

  const activeFilters = [
    cat && { label: cats.find((c: any) => c.slug === cat)?.name ?? cat, clear: () => { setCat(undefined); setPage(1); } },
    branch !== "all" && { label: branch.charAt(0).toUpperCase() + branch.slice(1), clear: () => { setBranch("all"); setPage(1); } },
    ...sizes.map((s) => ({ label: `Size: ${s}`, clear: () => toggleSize(s) })),
    ...colors.map((c) => ({ label: `Color: ${c}`, clear: () => toggleColor(c) })),
    maxPrice < priceMax && { label: `Max KSh ${maxPrice.toLocaleString()}`, clear: () => { setMaxPrice(priceMax); setPage(1); } },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  const Filters = () => (
    <div className="space-y-7">
      <div>
        <p className="eyebrow mb-3">Category</p>
        <div className="space-y-1">
          <button onClick={() => { setCat(undefined); setPage(1); }} className={`block w-full text-left text-sm py-1.5 px-2 rounded hover:bg-[color:var(--muted)] ${!cat ? "text-[color:var(--rose)]" : ""}`}>All</button>
          {cats.map((c: any) => (
            <button key={c.id} onClick={() => { setCat(c.slug); setPage(1); }} className={`block w-full text-left text-sm py-1.5 px-2 rounded hover:bg-[color:var(--muted)] ${cat === c.slug ? "text-[color:var(--rose)]" : ""}`}>{c.name}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Branch</p>
        <select value={branch} onChange={(e) => { setBranch(e.target.value); setPage(1); }} className="input-luxe text-sm">
          <option value="all">All branches</option>
          <option value="nairobi">Nairobi</option>
          <option value="makueni">Makueni</option>
        </select>
      </div>

      {allSizes.length > 0 && (
        <div>
          <p className="eyebrow mb-3">Size</p>
          <div className="flex flex-wrap gap-2">
            {allSizes.map((s: string) => (
              <button key={s} onClick={() => toggleSize(s)} className={`px-3 py-1.5 text-xs rounded-md border transition ${sizes.includes(s) ? "border-[color:var(--rose)] text-[color:var(--rose)] bg-[color:var(--rose)]/10" : "border-[color:var(--border)]"}`}>{s}</button>
            ))}
          </div>
        </div>
      )}

      {allColors.length > 0 && (
        <div>
          <p className="eyebrow mb-3">Color</p>
          <div className="flex flex-wrap gap-2">
            {allColors.map((c: string) => (
              <button key={c} onClick={() => toggleColor(c)} className={`px-3 py-1.5 text-xs rounded-full border transition ${colors.includes(c) ? "border-[color:var(--rose)] text-[color:var(--rose)] bg-[color:var(--rose)]/10" : "border-[color:var(--border)]"}`}>{c}</button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="eyebrow mb-3">Max Price</p>
        <input type="range" min={0} max={priceMax} step={500} value={maxPrice}
          onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
          className="w-full accent-[#C0866A]" />
        <p className="text-xs text-[color:var(--muted-foreground)] mt-1">Up to KSh {maxPrice.toLocaleString()}</p>
      </div>

      <div>
        <p className="eyebrow mb-3">Sort</p>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-luxe text-sm">
          <option value="new">Newest</option>
          <option value="low">Price · Low to High</option>
          <option value="high">Price · High to Low</option>
        </select>
      </div>
    </div>
  );

  return (
    <Shell>
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="eyebrow mb-2">Shop</p>
            <h1 className="font-display text-5xl">The Collection</h1>
          </div>
          <button onClick={() => setMobileFilters(true)} className="md:hidden btn-ghost flex items-center gap-2 text-xs">
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 my-5">
            {activeFilters.map((f, i) => (
              <button key={i} onClick={f.clear} className="chip flex items-center gap-1.5 hover:bg-[color:var(--rose)]/25 transition">
                {f.label} <X size={11} />
              </button>
            ))}
            <button onClick={() => { setCat(undefined); setBranch("all"); setSizes([]); setColors([]); setMaxPrice(priceMax); setPage(1); }}
              className="text-xs text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)] underline ml-1">
              Clear all
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-[240px_1fr] gap-8 mt-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block"><Filters /></aside>

          {/* Mobile filters drawer */}
          <AnimatePresence>
            {mobileFilters && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setMobileFilters(false)} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden" />
                <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 240 }}
                  className="fixed top-0 left-0 z-50 h-full w-4/5 max-w-xs bg-[color:var(--plum-deep)] border-r border-[color:var(--border)] overflow-y-auto p-6 md:hidden">
                  <div className="flex justify-between items-center mb-6">
                    <p className="font-display text-xl">Filters</p>
                    <button onClick={() => setMobileFilters(false)}><X /></button>
                  </div>
                  <Filters />
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          <div>
            <p className="text-xs text-[color:var(--muted-foreground)] mb-5">{filtered.length} piece{filtered.length !== 1 ? "s" : ""}</p>
            {paginated.length === 0 ? (
              <div className="card-luxe p-16 text-center">
                <p className="font-display text-2xl mb-2">Nothing here</p>
                <p className="text-[color:var(--muted-foreground)] text-sm">No pieces match these filters. Try clearing one.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {paginated.map((p: any, i: number) => <ProductCard key={p.id} p={p} index={i} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn-ghost px-4 py-2 disabled:opacity-40">←</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-full text-sm transition ${p === page ? "bg-[color:var(--rose)] text-[color:var(--plum-deep)] font-bold" : "border border-[color:var(--border)] hover:border-[color:var(--rose)]"}`}>{p}</button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn-ghost px-4 py-2 disabled:opacity-40">→</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}
