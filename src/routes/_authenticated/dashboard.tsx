import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ChevronUp, User, ShoppingBag, LogOut,
  Lock, Phone, MapPin, Mail, Eye, EyeOff, Package,
  Menu, X, Plus, Check, Receipt, Truck, Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/Shell";
import { confirm } from "@/components/ConfirmModal";
import { getMyOrders, cancelMyOrder } from "@/lib/orders.functions";
import { formatKsh } from "@/lib/brand";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({ component: Dashboard });

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS: Record<string, { cls: string; label: string }> = {
  pending:    { cls: "bg-amber-500/20 text-amber-300 border-amber-500/30",     label: "Pending" },
  confirmed:  { cls: "bg-blue-500/20 text-blue-300 border-blue-500/30",        label: "Confirmed" },
  processing: { cls: "bg-purple-500/20 text-purple-300 border-purple-500/30",  label: "Processing" },
  shipped:    { cls: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",  label: "Shipped" },
  delivered:  { cls: "bg-green-500/20 text-green-300 border-green-500/30",     label: "Delivered" },
  cancelled:  { cls: "bg-red-500/20 text-red-300 border-red-500/30",           label: "Cancelled" },
};

const NAV = [
  { key: "orders",  label: "My Orders",  icon: ShoppingBag },
  { key: "profile", label: "Profile",    icon: User },
] as const;
type Tab = "orders" | "profile";

// ── Saved address type ────────────────────────────────────────────────────────
type SavedAddress = { label: string; street: string; area: string };

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState({ full_name: "", phone: "" });
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [newAddr, setNewAddr] = useState<SavedAddress | null>(null);
  const [passwords, setPasswords] = useState({ next: "", confirm: "" });
  const [showPw, setShowPw] = useState({ next: false, confirm: false });
  const [pwBusy, setPwBusy] = useState(false);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => getMyOrders(),
  });

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setUserId(data.user.id);
      setUserEmail(data.user.email ?? "");
      const { data: p } = await supabase
        .from("profiles")
        .select("full_name, phone, saved_addresses")
        .eq("id", data.user.id)
        .single();
      if (p) {
        setProfile({ full_name: p.full_name ?? "", phone: p.phone ?? "" });
        setAddresses((p.saved_addresses as SavedAddress[] | null) ?? []);
      }
    });
  }, []);

  // ── Profile save ─────────────────────────────────────────────────────────
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("Not logged in");
      const { error } = await supabase
        .from("profiles")
        .update({ ...profile, saved_addresses: addresses })
        .eq("id", userId);
      if (error) throw error;
    },
    onSuccess: () => toast.success("Profile saved"),
    onError: (e: any) => toast.error(e.message),
  });

  // ── Password change ───────────────────────────────────────────────────────
  const changePassword = async () => {
    if (passwords.next.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    if (passwords.next !== passwords.confirm) { toast.error("Passwords do not match"); return; }
    setPwBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: passwords.next });
      if (error) throw error;
      toast.success("Password updated");
      setPasswords({ next: "", confirm: "" });
    } catch (e: any) { toast.error(e.message); }
    finally { setPwBusy(false); }
  };

  // ── Cancel order ─────────────────────────────────────────────────────────
  const cancelMutation = useMutation({
    mutationFn: (id: string) => cancelMyOrder({ data: { id } }),
    onSuccess: () => {
      toast.success("Order cancelled");
      qc.invalidateQueries({ queryKey: ["my-orders"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleCancel = async (id: string, orderNum: string) => {
    const ok = await confirm({
      title: "Cancel this order?",
      body: `Order ${orderNum} will be cancelled. This cannot be undone.`,
      confirmLabel: "Yes, cancel it",
    });
    if (ok) cancelMutation.mutate(id);
  };

  // ── Sign out ──────────────────────────────────────────────────────────────
  const signOut = async () => {
    const ok = await confirm({
      title: "Sign out?",
      body: "You'll need to sign back in to view orders or check out faster.",
      confirmLabel: "Sign Out",
      confirmClass: "text-sm py-2 px-5 rounded-full font-semibold btn-rose",
    });
    if (!ok) return;
    await supabase.auth.signOut();
    nav({ to: "/" });
  };

  const initials = profile.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : userEmail?.[0]?.toUpperCase() ?? "?";

  const handleTab = (t: Tab) => { setTab(t); setSidebarOpen(false); };

  return (
    <Shell>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">

        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 h-full w-64 z-50 bg-[color:var(--plum-deep)] border-r border-[color:var(--border)] flex flex-col transition-transform duration-300 md:static md:translate-x-0 md:shrink-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          {/* Avatar */}
          <div className="p-5 border-b border-[color:var(--border)] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[color:var(--rose)]/20 border-2 border-[color:var(--rose)]/40 flex items-center justify-center shrink-0">
                <span className="font-display text-base text-[color:var(--rose)]">{initials}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{profile.full_name || "My Account"}</p>
                <p className="text-[11px] text-[color:var(--muted-foreground)] truncate">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-1">
            {NAV.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => handleTab(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition text-left ${tab === key ? "bg-[color:var(--rose)]/15 text-[color:var(--rose)] border border-[color:var(--rose)]/30" : "hover:bg-[color:var(--muted)] text-[color:var(--muted-foreground)] hover:text-[color:var(--cream)]"}`}>
                <Icon size={17} />{label}
              </button>
            ))}
            <Link to="/shop" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-[color:var(--muted)] text-[color:var(--muted-foreground)] hover:text-[color:var(--cream)] transition">
              <Package size={17} /> Continue Shopping
            </Link>
          </nav>

          <div className="p-3 border-t border-[color:var(--border)] shrink-0">
            <button onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[color:var(--muted-foreground)] hover:bg-red-500/10 hover:text-red-400 transition">
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
            <div>
              {profile.full_name && (
                <p className="text-xs text-[color:var(--muted-foreground)]">
                  Welcome back, <span className="text-[color:var(--cream)] font-medium">{profile.full_name.split(" ")[0]}</span>
                </p>
              )}
              <p className="font-display text-lg leading-none">{NAV.find((n) => n.key === tab)?.label}</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">

            {/* ── Orders ── */}
            {tab === "orders" && (
              <div className="max-w-3xl space-y-3">
                {isLoading && (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => <div key={i} className="shimmer h-20 rounded-xl" />)}
                  </div>
                )}

                {!isLoading && (orders as any[])?.length === 0 && (
                  <div className="card-luxe p-12 text-center">
                    <ShoppingBag size={44} className="mx-auto text-[color:var(--muted-foreground)] mb-4 opacity-30" strokeWidth={1.5} />
                    <p className="font-display text-2xl mb-2">No orders yet</p>
                    <p className="text-[color:var(--muted-foreground)] text-sm mb-6">Your wardrobe journey starts here.</p>
                    <Link to="/shop" className="btn-rose inline-flex">Start shopping →</Link>
                  </div>
                )}

                {(orders as any[])?.map((o: any) => {
                  const st = STATUS[o.status] ?? STATUS.pending;
                  const itemCount = (o.order_items ?? []).reduce((a: number, i: any) => a + i.quantity, 0);
                  const isExpanded = expanded === o.id;

                  return (
                    <div key={o.id} className="card-luxe overflow-hidden">
                      {/* Row */}
                      <button
                        className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-[color:var(--muted)]/20 transition"
                        onClick={() => setExpanded(isExpanded ? null : o.id)}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <p className="order-number text-[color:var(--rose)] text-sm">{o.order_number}</p>
                            <span className={`chip text-[10px] border ${st.cls}`}>{st.label}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-[color:var(--muted-foreground)]">
                            <span className="flex items-center gap-1">
                              <Calendar size={11} />
                              {new Date(o.created_at).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Package size={11} /> {itemCount} item{itemCount !== 1 ? "s" : ""}
                            </span>
                            {o.is_pickup
                              ? <span className="flex items-center gap-1"><MapPin size={11} /> Pickup</span>
                              : o.delivery_address?.area && <span className="flex items-center gap-1"><Truck size={11} /> {o.delivery_address.area}</span>
                            }
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="price text-[color:var(--rose)] text-sm font-semibold">{formatKsh(o.total)}</span>
                          {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </div>
                      </button>

                      {/* Expanded */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 border-t border-[color:var(--border)] pt-4 space-y-4">
                              {/* Items */}
                              <div className="space-y-2">
                                {o.order_items?.map((it: any) => (
                                  <div key={it.id} className="flex items-center gap-3">
                                    <div className="w-12 h-14 rounded-lg overflow-hidden bg-[color:var(--muted)] border border-[color:var(--border)] shrink-0">
                                      {it.product_image
                                        ? <img src={it.product_image} alt={it.product_name} className="w-full h-full object-cover" />
                                        : <div className="w-full h-full flex items-center justify-center"><ShoppingBag size={14} className="opacity-30" /></div>
                                      }
                                    </div>
                                    <div className="flex-1 min-w-0 text-sm">
                                      <p className="font-medium truncate">{it.product_name}</p>
                                      <p className="text-xs text-[color:var(--muted-foreground)]">
                                        {[it.size, it.color].filter(Boolean).join(" · ")} · qty {it.quantity}
                                      </p>
                                    </div>
                                    <span className="price text-sm shrink-0">{formatKsh(Number(it.unit_price) * it.quantity)}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Cost + delivery + receipt */}
                              <div className="bg-[color:var(--muted)]/30 rounded-xl p-3 space-y-1.5 text-xs">
                                <div className="flex justify-between text-[color:var(--muted-foreground)]">
                                  <span>Delivery fee</span>
                                  <span className="price">
                                    {Number(o.delivery_fee) === 0
                                      ? <span className="text-[color:var(--success)]">FREE</span>
                                      : formatKsh(o.delivery_fee)}
                                  </span>
                                </div>
                                <div className="flex justify-between font-semibold text-sm">
                                  <span className="font-display">Total</span>
                                  <span className="price text-[color:var(--rose)]">{formatKsh(o.total)}</span>
                                </div>

                                {/* Delivery address */}
                                {o.is_pickup ? (
                                  <p className="text-[color:var(--muted-foreground)] flex items-center gap-1 pt-1 border-t border-[color:var(--border)]">
                                    <MapPin size={11} className="shrink-0" />
                                    Pickup · {o.pickup_branch ? o.pickup_branch.charAt(0).toUpperCase() + o.pickup_branch.slice(1) : ""} branch
                                  </p>
                                ) : o.delivery_address && (
                                  <p className="text-[color:var(--muted-foreground)] flex items-start gap-1 pt-1 border-t border-[color:var(--border)]">
                                    <MapPin size={11} className="shrink-0 mt-0.5" />
                                    {[o.delivery_address.street, o.delivery_address.area].filter(Boolean).join(", ")}
                                  </p>
                                )}

                                {/* M-Pesa receipt */}
                                {o.mpesa_receipt_number && (
                                  <p className="text-[color:var(--success)] flex items-center gap-1 pt-1 border-t border-[color:var(--border)]">
                                    <Receipt size={11} className="shrink-0" />
                                    M-Pesa receipt: <span className="font-mono font-semibold ml-1">{o.mpesa_receipt_number}</span>
                                  </p>
                                )}
                              </div>

                              {/* Cancel button — pending only */}
                              {o.status === "pending" && (
                                <button
                                  onClick={() => handleCancel(o.id, o.order_number)}
                                  disabled={cancelMutation.isPending}
                                  className="text-xs text-red-400 border border-red-500/30 hover:bg-red-500/10 rounded-lg px-3 py-1.5 transition"
                                >
                                  {cancelMutation.isPending ? "Cancelling…" : "Cancel Order"}
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── Profile ── */}
            {tab === "profile" && (
              <div className="max-w-lg space-y-5">

                {/* Personal info */}
                <section className="card-luxe p-5 space-y-4">
                  <h2 className="font-display text-xl flex items-center gap-2">
                    <User size={18} className="text-[color:var(--rose)]" /> Personal Info
                  </h2>
                  <div>
                    <label className="eyebrow mb-1.5 block">Full Name</label>
                    <input className="input-luxe" value={profile.full_name}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="eyebrow mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                      <input className="input-luxe pl-9 opacity-60" value={userEmail} readOnly />
                    </div>
                    <p className="text-xs text-[color:var(--muted-foreground)] mt-1">Email cannot be changed here.</p>
                  </div>
                  <div>
                    <label className="eyebrow mb-1.5 block">Phone</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                      <input className="input-luxe pl-9" value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        placeholder="+254 7XX XXX XXX" />
                    </div>
                  </div>
                </section>

                {/* Saved addresses */}
                <section className="card-luxe p-5 space-y-4">
                  <h2 className="font-display text-xl flex items-center gap-2">
                    <MapPin size={18} className="text-[color:var(--rose)]" /> Saved Addresses
                  </h2>

                  {addresses.length === 0 && (
                    <p className="text-sm text-[color:var(--muted-foreground)] italic">No saved addresses yet.</p>
                  )}

                  <div className="space-y-2">
                    {addresses.map((addr, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-[color:var(--muted)]/30 rounded-xl px-3 py-2.5 border border-[color:var(--border)]">
                        <MapPin size={14} className="text-[color:var(--rose)] mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0 text-sm">
                          <p className="font-medium">{addr.label}</p>
                          <p className="text-xs text-[color:var(--muted-foreground)]">{addr.street}{addr.area ? `, ${addr.area}` : ""}</p>
                        </div>
                        <button
                          onClick={() => setAddresses(addresses.filter((_, i) => i !== idx))}
                          className="p-1 text-[color:var(--muted-foreground)] hover:text-red-400 transition"
                          aria-label="Remove address"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add address form */}
                  {newAddr ? (
                    <div className="space-y-2 border border-[color:var(--rose)]/30 rounded-xl p-3">
                      <input className="input-luxe text-sm" placeholder='Label (e.g. "Home", "Office")'
                        value={newAddr.label} onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })} />
                      <input className="input-luxe text-sm" placeholder="Street address"
                        value={newAddr.street} onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })} />
                      <input className="input-luxe text-sm" placeholder="Area / city"
                        value={newAddr.area} onChange={(e) => setNewAddr({ ...newAddr, area: e.target.value })} />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (!newAddr.label || !newAddr.street) { toast.error("Label and street are required"); return; }
                            setAddresses([...addresses, newAddr]);
                            setNewAddr(null);
                          }}
                          className="btn-rose text-xs py-1.5 px-4"
                        >
                          <Check size={13} /> Save address
                        </button>
                        <button onClick={() => setNewAddr(null)} className="btn-ghost text-xs py-1.5 px-4">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setNewAddr({ label: "", street: "", area: "" })}
                      className="flex items-center gap-2 text-sm text-[color:var(--rose)] hover:underline">
                      <Plus size={15} /> Add new address
                    </button>
                  )}
                </section>

                {/* Save profile button */}
                <button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="btn-rose w-full justify-center">
                  {saveMutation.isPending ? "Saving…" : "Save Profile"}
                </button>

                {/* Change password */}
                <section className="card-luxe p-5 space-y-4">
                  <h2 className="font-display text-xl flex items-center gap-2">
                    <Lock size={18} className="text-[color:var(--rose)]" /> Change Password
                  </h2>
                  {(["next", "confirm"] as const).map((field) => (
                    <div key={field}>
                      <label className="eyebrow mb-1.5 block">
                        {field === "next" ? "New Password" : "Confirm New Password"}
                      </label>
                      <div className="relative">
                        <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                        <input className="input-luxe pl-9 pr-10" type={showPw[field] ? "text" : "password"}
                          placeholder="••••••••" value={passwords[field]}
                          onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })} />
                        <button type="button" onClick={() => setShowPw({ ...showPw, [field]: !showPw[field] })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)]">
                          {showPw[field] ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={changePassword} disabled={pwBusy || !passwords.next || !passwords.confirm} className="btn-rose">
                    {pwBusy ? "Updating…" : "Update Password"}
                  </button>
                </section>

                {/* Sign out */}
                <section className="card-luxe p-5">
                  <h2 className="font-display text-xl flex items-center gap-2 mb-2">
                    <LogOut size={18} className="text-[color:var(--rose)]" /> Sign Out
                  </h2>
                  <p className="text-sm text-[color:var(--muted-foreground)] mb-4">
                    You'll be signed out of your account on this device.
                  </p>
                  <button onClick={signOut} className="btn-ghost flex items-center gap-2 text-sm">
                    <LogOut size={15} /> Sign out of account
                  </button>
                </section>

              </div>
            )}

          </div>
        </div>
      </div>
    </Shell>
  );
}
