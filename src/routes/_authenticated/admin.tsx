import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import {
  Plus, Pencil, Trash2, X, ChevronDown, ChevronUp, Upload,
  Image as ImageIcon, Search, LayoutDashboard, ShoppingBag,
  Package, Tag, Truck, Menu, LogOut, ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { confirm } from "@/components/ConfirmModal";
import { ConfirmModalProvider } from "@/components/ConfirmModal";
import { Logo } from "@/components/Logo";
import {
  adminStats, adminListOrders, adminUpdateOrderStatus,
  adminUpsertProduct, adminDeleteProduct,
  adminUpsertZone, adminDeleteZone,
  adminUpsertCategory, adminDeleteCategory,
} from "@/lib/admin.functions";
import { listCategories, listDeliveryZones, listProducts } from "@/lib/catalog.functions";
import { formatKsh } from "@/lib/brand";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: ({ context }) => {
    if (!context.isAdmin) throw redirect({ to: "/admin-login" });
  },
  component: Admin,
});

type Tab = "stats" | "orders" | "products" | "categories" | "zones";

const NAV = [
  { key: "stats", label: "Overview", icon: LayoutDashboard },
  { key: "orders", label: "Orders", icon: ShoppingBag },
  { key: "products", label: "Products", icon: Package },
  { key: "categories", label: "Categories", icon: Tag },
  { key: "zones", label: "Delivery Zones", icon: Truck },
] as const;

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  processing: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  shipped: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  delivered: "bg-green-500/20 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30",
};

function Admin() {
  const [tab, setTab] = useState<Tab>("stats");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nav = useNavigate();

  const handleTab = (t: Tab) => { setTab(t); setSidebarOpen(false); };

  const signOut = async () => {
    const ok = await confirm({
      title: "Signing out?",
      body: "You'll be signed out of the admin panel.",
      confirmLabel: "Sign Out",
      confirmClass: "text-sm py-2 px-5 rounded-full font-semibold btn-rose",
    });
    if (!ok) return;
    await supabase.auth.signOut();
    nav({ to: "/admin-login" });
  };

  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] flex flex-col">
      <div className="flex flex-1 overflow-hidden h-screen">
        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 h-full w-64 z-50 bg-[color:var(--plum-deep)] border-r border-[color:var(--border)] flex flex-col transition-transform duration-300 md:static md:translate-x-0 md:shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}>
          <div className="p-5 border-b border-[color:var(--border)] shrink-0">
            <Logo />
            <p className="eyebrow mt-3 text-[10px]">Admin Panel</p>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {NAV.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => handleTab(key as Tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition text-left ${
                  tab === key
                    ? "bg-[color:var(--rose)]/15 text-[color:var(--rose)] border border-[color:var(--rose)]/30"
                    : "hover:bg-[color:var(--muted)] text-[color:var(--muted-foreground)] hover:text-[color:var(--cream)]"
                }`}>
                <Icon size={17} />{label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-[color:var(--border)] shrink-0 space-y-1">
            <a href="/" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)] hover:text-[color:var(--cream)] transition">
              ← Back to storefront
            </a>
            <button onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[color:var(--muted-foreground)] hover:bg-red-500/10 hover:text-red-400 transition">
              <LogOut size={17} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {/* Top bar */}
          <div className="shrink-0 bg-[color:var(--background)]/90 backdrop-blur-md border-b border-[color:var(--border)] px-4 py-3 flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-[color:var(--muted)] transition">
              <Menu size={20} />
            </button>
            <div className="flex-1">
              <p className="eyebrow text-[10px]">Christine Collections</p>
              <p className="font-display text-lg leading-none">{NAV.find(n => n.key === tab)?.label}</p>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-[color:var(--rose)] border border-[color:var(--rose)]/30 bg-[color:var(--rose)]/10 px-2.5 py-1 rounded-full">
              <ShieldAlert size={11} /> Admin
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {tab === "stats" && <Stats />}
            {tab === "orders" && <Orders />}
            {tab === "products" && <Products />}
            {tab === "categories" && <Categories />}
            {tab === "zones" && <Zones />}
          </div>
        </div>
      </div>
      <ConfirmModalProvider />
      <Toaster theme="dark" position="top-right" toastOptions={{ style: { background: "var(--card)", color: "var(--cream)", border: "1px solid var(--border)" } }} />
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const { data, isLoading } = useQuery({ queryKey: ["admin-stats"], queryFn: () => adminStats() });
  if (isLoading) return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{[1,2,3].map(i => <div key={i} className="shimmer h-28 rounded-2xl" />)}</div>
      <div className="shimmer h-64 rounded-2xl" />
    </div>
  );
  if (!data) return null;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: "Total Orders", value: data.totalOrders, format: false },
          { label: "Revenue Today", value: data.revenueToday, format: true },
          { label: "Revenue This Month", value: data.revenueMonth, format: true },
        ].map(({ label, value, format }) => (
          <div key={label} className="card-luxe p-4 md:p-6">
            <p className="eyebrow text-[10px] md:text-xs">{label}</p>
            <p className="font-display text-2xl md:text-4xl mt-2 text-[color:var(--rose)]">
              {format ? formatKsh(value as number) : value}
            </p>
          </div>
        ))}
      </div>

      <div className="card-luxe p-4 md:p-6">
        <p className="eyebrow mb-4">Revenue · last 14 days</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data.days}>
            <XAxis dataKey="day" stroke="#888" fontSize={10} />
            <YAxis stroke="#888" fontSize={10} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: "#1A0F1B", border: "1px solid #444", borderRadius: 8, fontSize: 12 }} formatter={(v: any) => [formatKsh(v), "Revenue"]} />
            <Line type="monotone" dataKey="revenue" stroke="#C0866A" strokeWidth={2.5} dot={{ fill: "#C0866A", r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card-luxe p-4 md:p-6">
        <p className="eyebrow mb-3">Orders by Status</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {Object.entries(data.byStatus).map(([k, v]) => (
            <div key={k} className={`px-3 py-2.5 rounded-xl border text-center ${statusColor[k] ?? "bg-[color:var(--secondary)] border-transparent"}`}>
              <p className="text-[10px] capitalize mb-0.5">{k}</p>
              <p className="font-display text-xl">{v as number}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Orders ───────────────────────────────────────────────────────────────────
function Orders() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-orders", statusFilter], queryFn: () => adminListOrders({ data: { status: statusFilter } }) });

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = search.toLowerCase();
    if (!q) return data as any[];
    return (data as any[]).filter((o: any) =>
      o.order_number?.toLowerCase().includes(q) ||
      o.delivery_address?.fullName?.toLowerCase().includes(q) ||
      o.guest_email?.toLowerCase().includes(q) ||
      o.mpesa_phone?.includes(q) ||
      o.delivery_address?.phone?.includes(q)
    );
  }, [data, search]);

  const update = async (id: string, s: string) => {
    try { await adminUpdateOrderStatus({ data: { id, status: s } }); toast.success("Status updated"); qc.invalidateQueries({ queryKey: ["admin-orders"] }); }
    catch (e: any) { toast.error(e.message); }
  };

  const customerName = (o: any) => o.delivery_address?.fullName || o.guest_email || o.mpesa_phone || "Customer";
  const customerPhone = (o: any) => o.delivery_address?.phone || o.guest_phone || o.mpesa_phone || null;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
          <input className="input-luxe pl-9 text-sm" placeholder="Search by order #, name, phone…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-luxe text-sm sm:w-44">
          <option value="all">All statuses</option>
          {["pending","confirmed","processing","shipped","delivered","cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="text-xs text-[color:var(--muted-foreground)] self-center whitespace-nowrap">{filtered.length} orders</span>
      </div>

      {isLoading && <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="shimmer h-20 rounded-xl" />)}</div>}

      {!isLoading && filtered.length === 0 && (
        <div className="card-luxe p-12 text-center">
          <ShoppingBag size={36} className="mx-auto mb-3 text-[color:var(--muted-foreground)] opacity-40" />
          <p className="font-display text-xl">No orders found</p>
          <p className="text-sm text-[color:var(--muted-foreground)] mt-1">Try adjusting your search or filter.</p>
        </div>
      )}

      <div className="space-y-2">
        {filtered.map((o: any) => (
          <div key={o.id} className="card-luxe overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between gap-3 text-left" onClick={() => setExpanded(expanded === o.id ? null : o.id)}>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="order-number text-[color:var(--rose)] text-sm">{o.order_number}</p>
                  <span className={`chip text-[10px] border ${statusColor[o.status] ?? ""}`}>{o.status}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-xs font-medium text-[color:var(--cream)] truncate">{customerName(o)}</span>
                  {customerPhone(o) && <span className="text-xs text-[color:var(--muted-foreground)]">{customerPhone(o)}</span>}
                  <span className="text-xs text-[color:var(--muted-foreground)] hidden sm:block">{new Date(o.created_at).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="price text-[color:var(--rose)] text-sm font-semibold">{formatKsh(o.total)}</span>
                <select value={o.status} onClick={(e) => e.stopPropagation()} onChange={(e) => update(o.id, e.target.value)} className="input-luxe text-xs py-1.5 w-32 hidden sm:block">
                  {["pending","confirmed","processing","shipped","delivered","cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {expanded === o.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </div>
            </button>
            <AnimatePresence>
              {expanded === o.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-4 pb-4 border-t border-[color:var(--border)] pt-4 space-y-3">
                    {/* Mobile status update */}
                    <div className="sm:hidden">
                      <label className="eyebrow mb-1 block">Update Status</label>
                      <select value={o.status} onChange={(e) => update(o.id, e.target.value)} className="input-luxe text-sm w-full">
                        {["pending","confirmed","processing","shipped","delivered","cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    {/* Customer info */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="bg-[color:var(--muted)]/40 rounded-xl p-3 space-y-1.5 text-xs">
                        <p className="eyebrow mb-1">Customer</p>
                        {o.delivery_address?.fullName && <p><span className="text-[color:var(--muted-foreground)]">Name: </span>{o.delivery_address.fullName}</p>}
                        {(o.guest_email || o.delivery_address?.email) && <p><span className="text-[color:var(--muted-foreground)]">Email: </span>{o.guest_email || o.delivery_address?.email}</p>}
                        {customerPhone(o) && <p><span className="text-[color:var(--muted-foreground)]">Phone: </span>{customerPhone(o)}</p>}
                        <p><span className="text-[color:var(--muted-foreground)]">Payment: </span>
                          <span className={o.payment_status === "paid" ? "text-[color:var(--success)]" : o.payment_status === "failed" ? "text-red-400" : "text-yellow-400"}>{o.payment_status}</span>
                        </p>
                        {o.mpesa_receipt_number && <p><span className="text-[color:var(--muted-foreground)]">M-Pesa: </span><span className="text-[color:var(--success)]">{o.mpesa_receipt_number}</span></p>}
                      </div>
                      <div className="bg-[color:var(--muted)]/40 rounded-xl p-3 space-y-1.5 text-xs">
                        <p className="eyebrow mb-1">Delivery</p>
                        {o.is_pickup
                          ? <p><span className="text-[color:var(--muted-foreground)]">Pickup: </span>{o.pickup_branch} branch</p>
                          : o.delivery_address ? (
                            <>
                              {o.delivery_address.street && <p><span className="text-[color:var(--muted-foreground)]">Street: </span>{o.delivery_address.street}</p>}
                              {o.delivery_address.area && <p><span className="text-[color:var(--muted-foreground)]">Area: </span>{o.delivery_address.area}</p>}
                              {o.delivery_address.instructions && <p><span className="text-[color:var(--muted-foreground)]">Note: </span>{o.delivery_address.instructions}</p>}
                              <p><span className="text-[color:var(--muted-foreground)]">Fee: </span>{Number(o.delivery_fee) === 0 ? <span className="text-[color:var(--success)]">FREE</span> : formatKsh(o.delivery_fee)}</p>
                            </>
                          ) : <p className="text-[color:var(--muted-foreground)]">No delivery info</p>}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {o.order_items?.map((it: any) => (
                        <div key={it.id} className="flex items-center gap-3 text-sm">
                          {it.product_image && <img src={it.product_image} alt="" className="w-10 h-12 object-cover rounded-md shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <p className="truncate">{it.product_name} × {it.quantity}</p>
                            <p className="text-xs text-[color:var(--muted-foreground)]">{[it.size, it.color].filter(Boolean).join(" · ")}</p>
                          </div>
                          <span className="price shrink-0">{formatKsh(Number(it.unit_price) * it.quantity)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between pt-2 border-t border-[color:var(--border)] text-sm font-semibold">
                        <span>Total</span><span className="price text-[color:var(--rose)]">{formatKsh(o.total)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Image uploader ───────────────────────────────────────────────────────────
function ImageUploader({ onUploaded }: { onUploaded: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: false });
    if (error) { toast.error("Upload failed: " + error.message); setUploading(false); return; }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    onUploaded(data.publicUrl);
    toast.success("Image uploaded");
    setUploading(false);
  };

  return (
    <button type="button" onClick={() => ref.current?.click()}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-[color:var(--rose)]/50 text-xs text-[color:var(--rose)] hover:border-[color:var(--rose)] transition ${uploading ? "opacity-60 cursor-wait" : ""}`}>
      <Upload size={13} />{uploading ? "Uploading…" : "Upload image"}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
    </button>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────
const emptyProduct = { name: "", slug: "", description: "", price: 0, compare_price: null as number | null, category_id: null as string | null, sizes: [] as string[], colors: [] as string[], images: [] as string[], stock_quantity: 0, is_featured: false, branch: "both" as "nairobi" | "makueni" | "both" };

function Products() {
  const qc = useQueryClient();
  const [modal, setModal] = useState<null | (typeof emptyProduct & { id?: string })>(null);
  const [sizesInput, setSizesInput] = useState("");
  const [colorsInput, setColorsInput] = useState("");
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");

  const { data: products, isLoading } = useQuery({ queryKey: ["admin-products"], queryFn: () => listProducts({ data: {} }) });
  const { data: cats } = useQuery({ queryKey: ["cats"], queryFn: () => listCategories() });

  const filtered = useMemo(() => {
    let r = (products as any[] | undefined) ?? [];
    const q = search.toLowerCase();
    if (q) r = r.filter((p: any) => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q));
    if (branchFilter !== "all") r = r.filter((p: any) => p.branch === branchFilter || p.branch === "both");
    if (featuredFilter === "featured") r = r.filter((p: any) => p.is_featured);
    if (featuredFilter === "regular") r = r.filter((p: any) => !p.is_featured);
    return r;
  }, [products, search, branchFilter, featuredFilter]);

  const upsert = useMutation({
    mutationFn: (d: any) => adminUpsertProduct({ data: d }),
    onSuccess: () => { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["admin-products"] }); qc.invalidateQueries({ queryKey: ["products-all"] }); setModal(null); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => adminDeleteProduct({ data: { id } }),
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["admin-products"] }); qc.invalidateQueries({ queryKey: ["products-all"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const openNew = () => { setModal({ ...emptyProduct }); setSizesInput(""); setColorsInput(""); };
  const openEdit = (p: any) => { setModal({ ...p, compare_price: p.compare_price ?? null }); setSizesInput((p.sizes ?? []).join(", ")); setColorsInput((p.colors ?? []).join(", ")); };
  const addImage = (url: string) => { if (!modal) return; setModal({ ...modal, images: [...modal.images, url] }); };
  const removeImage = (i: number) => { if (!modal) return; setModal({ ...modal, images: modal.images.filter((_, idx) => idx !== i) }); };
  const save = () => {
    if (!modal) return;
    upsert.mutate({ ...modal, sizes: sizesInput.split(",").map(s => s.trim()).filter(Boolean), colors: colorsInput.split(",").map(s => s.trim()).filter(Boolean) });
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
          <input className="input-luxe pl-9 text-sm" placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} className="input-luxe text-sm sm:w-36">
          <option value="all">All branches</option>
          <option value="nairobi">Nairobi</option>
          <option value="makueni">Makueni</option>
        </select>
        <select value={featuredFilter} onChange={(e) => setFeaturedFilter(e.target.value)} className="input-luxe text-sm sm:w-36">
          <option value="all">All products</option>
          <option value="featured">Featured</option>
          <option value="regular">Regular</option>
        </select>
        <button onClick={openNew} className="btn-rose text-xs whitespace-nowrap"><Plus size={14} /> Add Product</button>
      </div>
      <p className="text-xs text-[color:var(--muted-foreground)]">{filtered.length} products</p>

      {isLoading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{[1,2,3,4].map(i => <div key={i} className="shimmer h-24 rounded-xl" />)}</div>}

      {!isLoading && filtered.length === 0 && (
        <div className="card-luxe p-12 text-center">
          <Package size={36} className="mx-auto mb-3 text-[color:var(--muted-foreground)] opacity-40" />
          <p className="font-display text-xl">No products found</p>
          <p className="text-sm text-[color:var(--muted-foreground)] mt-1">Try a different search or filter.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((p: any) => (
          <div key={p.id} className="card-luxe p-3 flex gap-3 items-start">
            <div className="w-14 h-18 rounded-lg overflow-hidden bg-[color:var(--muted)] shrink-0 aspect-[3/4] w-14">
              {p.images?.[0] ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={16} className="text-[color:var(--muted-foreground)]" /></div>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm leading-tight line-clamp-2">{p.name}</p>
              <p className="price text-xs text-[color:var(--rose)] mt-0.5">{formatKsh(p.price)}</p>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="text-[10px] text-[color:var(--muted-foreground)]">Stock: {p.stock_quantity}</span>
                {p.stock_quantity === 0 && <span className="chip text-[9px] bg-red-500/15 border-red-500/30 text-red-400">Out</span>}
                {p.is_featured && <span className="chip text-[9px]">Featured</span>}
                {p.branch !== "both" && <span className="chip text-[9px]">{p.branch}</span>}
              </div>
            </div>
            <div className="flex flex-col gap-1.5 shrink-0">
              <button onClick={() => openEdit(p)} className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-[color:var(--border)] hover:border-[color:var(--rose)] hover:text-[color:var(--rose)] transition">
                <Pencil size={11} /> Edit
              </button>
              <button onClick={async () => { const ok = await confirm({ title: "Delete this product?", body: "This action cannot be undone.", confirmLabel: "Yes, Delete" }); if (ok) del.mutate(p.id); }}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-[color:var(--border)] hover:border-red-500 hover:text-red-400 transition">
                <Trash2 size={11} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product modal */}
      <AnimatePresence>
        {modal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              className="fixed inset-3 md:inset-8 z-50 bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl overflow-y-auto p-5 md:p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-display text-2xl">{modal.id ? "Edit" : "New"} Product</h2>
                <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-[color:var(--muted)]"><X size={18} /></button>
              </div>
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
                <div><label className="eyebrow mb-1 block">Name</label><input className="input-luxe" value={modal.name} onChange={(e) => setModal({ ...modal, name: e.target.value })} /></div>
                <div><label className="eyebrow mb-1 block">Slug</label><input className="input-luxe" value={modal.slug} onChange={(e) => setModal({ ...modal, slug: e.target.value })} /></div>
                <div className="md:col-span-2"><label className="eyebrow mb-1 block">Description</label><textarea className="input-luxe h-20" value={modal.description ?? ""} onChange={(e) => setModal({ ...modal, description: e.target.value })} /></div>
                <div><label className="eyebrow mb-1 block">Price (KSh)</label><input type="number" className="input-luxe" value={modal.price} onChange={(e) => setModal({ ...modal, price: Number(e.target.value) })} /></div>
                <div><label className="eyebrow mb-1 block">Compare Price</label><input type="number" className="input-luxe" value={modal.compare_price ?? ""} onChange={(e) => setModal({ ...modal, compare_price: e.target.value ? Number(e.target.value) : null })} /></div>
                <div><label className="eyebrow mb-1 block">Stock Qty</label><input type="number" className="input-luxe" value={modal.stock_quantity} onChange={(e) => setModal({ ...modal, stock_quantity: Number(e.target.value) })} /></div>
                <div><label className="eyebrow mb-1 block">Category</label>
                  <select className="input-luxe" value={modal.category_id ?? ""} onChange={(e) => setModal({ ...modal, category_id: e.target.value || null })}>
                    <option value="">None</option>
                    {(cats as any[] | undefined)?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div><label className="eyebrow mb-1 block">Branch</label>
                  <select className="input-luxe" value={modal.branch} onChange={(e) => setModal({ ...modal, branch: e.target.value as any })}>
                    <option value="both">Both</option><option value="nairobi">Nairobi</option><option value="makueni">Makueni</option>
                  </select>
                </div>
                <div><label className="eyebrow mb-1 block">Sizes (comma-separated)</label><input className="input-luxe" value={sizesInput} onChange={(e) => setSizesInput(e.target.value)} placeholder="XS, S, M, L, XL" /></div>
                <div><label className="eyebrow mb-1 block">Colors (comma-separated)</label><input className="input-luxe" value={colorsInput} onChange={(e) => setColorsInput(e.target.value)} placeholder="Plum, Blush, Black" /></div>
                <div className="md:col-span-2">
                  <label className="eyebrow mb-2 block">Images</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {modal.images.map((url, i) => (
                      <div key={i} className="relative w-16 h-20 rounded-lg overflow-hidden border border-[color:var(--border)] group">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => removeImage(i)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition"><X size={14} className="text-white" /></button>
                      </div>
                    ))}
                    {modal.images.length === 0 && <div className="w-16 h-20 rounded-lg border border-dashed border-[color:var(--border)] flex items-center justify-center"><ImageIcon size={18} className="text-[color:var(--muted-foreground)]" /></div>}
                  </div>
                  <ImageUploader onUploaded={addImage} />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="featured" checked={modal.is_featured} onChange={(e) => setModal({ ...modal, is_featured: e.target.checked })} className="accent-[#C0866A] w-4 h-4" />
                  <label htmlFor="featured" className="text-sm">Featured product</label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={save} disabled={upsert.isPending} className="btn-rose">{upsert.isPending ? "Saving…" : "Save Product"}</button>
                <button onClick={() => setModal(null)} className="btn-ghost">Cancel</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────
const emptyCategory = { name: "", slug: "", description: "", image_url: null as string | null };

function Categories() {
  const qc = useQueryClient();
  const [modal, setModal] = useState<null | (typeof emptyCategory & { id?: string })>(null);
  const [search, setSearch] = useState("");

  const { data: cats, isLoading } = useQuery({ queryKey: ["cats"], queryFn: () => listCategories() });

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q ? (cats as any[] ?? []).filter((c: any) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)) : (cats as any[] ?? []);
  }, [cats, search]);

  const upsert = useMutation({
    mutationFn: (d: any) => adminUpsertCategory({ data: d }),
    onSuccess: () => { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["cats"] }); setModal(null); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => adminDeleteCategory({ data: { id } }),
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["cats"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const autoSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
          <input className="input-luxe pl-9 text-sm" placeholder="Search categories…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button onClick={() => setModal({ ...emptyCategory })} className="btn-rose text-xs whitespace-nowrap"><Plus size={14} /> Add Category</button>
      </div>
      <p className="text-xs text-[color:var(--muted-foreground)]">{filtered.length} categories</p>

      {isLoading && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{[1,2,3].map(i => <div key={i} className="shimmer h-20 rounded-xl" />)}</div>}

      {!isLoading && filtered.length === 0 && (
        <div className="card-luxe p-12 text-center">
          <Tag size={36} className="mx-auto mb-3 text-[color:var(--muted-foreground)] opacity-40" />
          <p className="font-display text-xl">No categories found</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((c: any) => (
          <div key={c.id} className="card-luxe p-4 flex items-start gap-3">
            {c.image_url
              ? <img src={c.image_url} alt={c.name} className="w-12 h-12 object-cover rounded-lg shrink-0" />
              : <div className="w-12 h-12 rounded-lg bg-[color:var(--muted)] flex items-center justify-center shrink-0"><ImageIcon size={18} className="text-[color:var(--muted-foreground)]" /></div>}
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm truncate">{c.name}</p>
              <p className="text-xs text-[color:var(--muted-foreground)] truncate">{c.slug}</p>
              {c.description && <p className="text-xs text-[color:var(--muted-foreground)] mt-1 line-clamp-1">{c.description}</p>}
            </div>
            <div className="flex flex-col gap-1.5 shrink-0">
              <button onClick={() => setModal({ id: c.id, name: c.name, slug: c.slug, description: c.description ?? "", image_url: c.image_url })}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-[color:var(--border)] hover:border-[color:var(--rose)] hover:text-[color:var(--rose)] transition">
                <Pencil size={11} /> Edit
              </button>
              <button onClick={async () => { const ok = await confirm({ title: "Delete this category?", body: "All products will become uncategorised.", confirmLabel: "Yes, Delete" }); if (ok) del.mutate(c.id); }}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-[color:var(--border)] hover:border-red-500 hover:text-red-400 transition">
                <Trash2 size={11} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-lg bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-display text-xl">{modal.id ? "Edit" : "New"} Category</h2>
                <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-[color:var(--muted)]"><X size={16} /></button>
              </div>
              <div className="space-y-3">
                <div><label className="eyebrow mb-1 block">Name</label><input className="input-luxe" value={modal.name} onChange={(e) => setModal({ ...modal, name: e.target.value, slug: modal.id ? modal.slug : autoSlug(e.target.value) })} /></div>
                <div><label className="eyebrow mb-1 block">Slug</label><input className="input-luxe" value={modal.slug} onChange={(e) => setModal({ ...modal, slug: e.target.value })} /></div>
                <div><label className="eyebrow mb-1 block">Description</label><textarea className="input-luxe h-16" value={modal.description ?? ""} onChange={(e) => setModal({ ...modal, description: e.target.value })} /></div>
                <div>
                  <label className="eyebrow mb-2 block">Image</label>
                  {modal.image_url && (
                    <div className="relative w-20 h-20 mb-2 rounded-lg overflow-hidden border border-[color:var(--border)] group">
                      <img src={modal.image_url} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => setModal({ ...modal, image_url: null })} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center"><X size={14} className="text-white" /></button>
                    </div>
                  )}
                  <ImageUploader onUploaded={(url) => setModal({ ...modal, image_url: url })} />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => upsert.mutate(modal)} disabled={upsert.isPending || !modal.name || !modal.slug} className="btn-rose">{upsert.isPending ? "Saving…" : "Save"}</button>
                <button onClick={() => setModal(null)} className="btn-ghost">Cancel</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Zones ────────────────────────────────────────────────────────────────────
function Zones() {
  const qc = useQueryClient();
  const [modal, setModal] = useState<null | { id?: string; name: string; fee: number; is_free: boolean }>(null);
  const [search, setSearch] = useState("");
  const [freeFilter, setFreeFilter] = useState("all");

  const { data: zones, isLoading } = useQuery({ queryKey: ["zones"], queryFn: () => listDeliveryZones() });

  const filtered = useMemo(() => {
    let r = (zones as any[] ?? []);
    const q = search.toLowerCase();
    if (q) r = r.filter((z: any) => z.name.toLowerCase().includes(q));
    if (freeFilter === "free") r = r.filter((z: any) => z.is_free);
    if (freeFilter === "paid") r = r.filter((z: any) => !z.is_free);
    return r;
  }, [zones, search, freeFilter]);

  const upsert = useMutation({
    mutationFn: (d: any) => adminUpsertZone({ data: d }),
    onSuccess: () => { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["zones"] }); setModal(null); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => adminDeleteZone({ data: { id } }),
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["zones"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
          <input className="input-luxe pl-9 text-sm" placeholder="Search zones…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={freeFilter} onChange={(e) => setFreeFilter(e.target.value)} className="input-luxe text-sm sm:w-36">
          <option value="all">All zones</option>
          <option value="free">Free delivery</option>
          <option value="paid">Paid delivery</option>
        </select>
        <button onClick={() => setModal({ name: "", fee: 0, is_free: false })} className="btn-rose text-xs whitespace-nowrap"><Plus size={14} /> Add Zone</button>
      </div>
      <p className="text-xs text-[color:var(--muted-foreground)]">{filtered.length} zones</p>

      {isLoading && <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="shimmer h-14 rounded-xl" />)}</div>}

      {!isLoading && filtered.length === 0 && (
        <div className="card-luxe p-12 text-center">
          <Truck size={36} className="mx-auto mb-3 text-[color:var(--muted-foreground)] opacity-40" />
          <p className="font-display text-xl">No zones found</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-2">
        {filtered.map((z: any) => (
          <div key={z.id} className="card-luxe p-4 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{z.name}</p>
              <p className="text-xs mt-0.5">{z.is_free ? <span className="text-[color:var(--success)]">FREE delivery</span> : <span className="text-[color:var(--muted-foreground)]">{formatKsh(z.fee)}</span>}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setModal({ id: z.id, name: z.name, fee: z.fee, is_free: z.is_free })}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-[color:var(--border)] hover:border-[color:var(--rose)] hover:text-[color:var(--rose)] transition">
                <Pencil size={11} /> Edit
              </button>
              <button onClick={async () => { const ok = await confirm({ title: "Delete this zone?", body: "Existing orders are not affected.", confirmLabel: "Yes, Delete" }); if (ok) del.mutate(z.id); }}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-[color:var(--border)] hover:border-red-500 hover:text-red-400 transition">
                <Trash2 size={11} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-md bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-display text-xl">{modal.id ? "Edit" : "New"} Zone</h2>
                <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-[color:var(--muted)]"><X size={16} /></button>
              </div>
              <div className="space-y-3">
                <div><label className="eyebrow mb-1 block">Zone Name</label><input className="input-luxe" value={modal.name} onChange={(e) => setModal({ ...modal, name: e.target.value })} placeholder="e.g. Nairobi CBD" /></div>
                <div><label className="eyebrow mb-1 block">Delivery Fee (KSh)</label><input type="number" className="input-luxe" value={modal.fee} onChange={(e) => setModal({ ...modal, fee: Number(e.target.value) })} disabled={modal.is_free} /></div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="is_free" checked={modal.is_free} onChange={(e) => setModal({ ...modal, is_free: e.target.checked, fee: e.target.checked ? 0 : modal.fee })} className="accent-[#C0866A] w-4 h-4" />
                  <label htmlFor="is_free" className="text-sm">Free delivery zone</label>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => upsert.mutate(modal)} disabled={upsert.isPending || !modal.name} className="btn-rose">{upsert.isPending ? "Saving…" : "Save"}</button>
                <button onClick={() => setModal(null)} className="btn-ghost">Cancel</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
