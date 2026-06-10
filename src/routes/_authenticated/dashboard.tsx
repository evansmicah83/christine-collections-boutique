import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ChevronUp, User, ShoppingBag, LogOut,
  Lock, Phone, MapPin, Mail, Eye, EyeOff, Package, Menu,
} from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/Shell";
import { confirm } from "@/components/ConfirmModal";
import { getMyOrders } from "@/lib/orders.functions";
import { formatKsh } from "@/lib/brand";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({ component: Dashboard });

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  processing: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  shipped: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  delivered: "bg-green-500/20 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30",
};

const NAV = [
  { key: "orders", label: "My Orders", icon: ShoppingBag },
  { key: "profile", label: "Profile & Settings", icon: User },
] as const;

type Tab = "orders" | "profile";

function Dashboard() {
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState({ full_name: "", phone: "", city: "" });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });
  const [pwBusy, setPwBusy] = useState(false);

  const { data: orders, isLoading } = useQuery({ queryKey: ["my-orders"], queryFn: () => getMyOrders() });

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setUserEmail(data.user.email ?? "");
      const { data: p } = await supabase.from("profiles").select("full_name,phone,city").eq("id", data.user.id).single();
      if (p) setProfile({ full_name: p.full_name ?? "", phone: p.phone ?? "", city: p.city ?? "" });
    });
  }, []);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const { data: sess } = await supabase.auth.getUser();
      if (!sess.user) throw new Error("Not logged in");
      const { error } = await supabase.from("profiles").update(profile).eq("id", sess.user.id);
      if (error) throw error;
    },
    onSuccess: () => toast.success("Profile updated"),
    onError: (e: any) => toast.error(e.message),
  });

  const changePassword = async () => {
    if (passwords.next.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    if (passwords.next !== passwords.confirm) { toast.error("Passwords do not match"); return; }
    setPwBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: passwords.next });
      if (error) throw error;
      toast.success("Password updated");
      setPasswords({ current: "", next: "", confirm: "" });
    } catch (e: any) { toast.error(e.message); }
    finally { setPwBusy(false); }
  };

  const signOut = async () => {
    const ok = await confirm({
      title: "Signing out?",
      body: "You'll need to log back in to track orders or checkout faster.",
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
        <aside className={`fixed top-0 left-0 h-full w-64 z-50 bg-[color:var(--plum-deep)] border-r border-[color:var(--border)] flex flex-col transition-transform duration-300 md:static md:translate-x-0 md:h-full md:shrink-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

          {/* User card */}
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

          {/* Sign out */}
          <div className="p-3 border-t border-[color:var(--border)] shrink-0">
            <button onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[color:var(--muted-foreground)] hover:bg-red-500/10 hover:text-red-400 transition">
              <LogOut size={17} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {/* Top bar */}
          <div className="shrink-0 bg-[color:var(--background)]/90 backdrop-blur-md border-b border-[color:var(--border)] px-4 py-3 flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-[color:var(--muted)] transition">
              <Menu size={20} />
            </button>
            <div>
              <p className="eyebrow text-[10px]">Account</p>
              <p className="font-display text-lg leading-none">{NAV.find(n => n.key === tab)?.label}</p>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">

            {/* ── Orders tab ── */}
            {tab === "orders" && (
              <div className="max-w-3xl space-y-3">
                {isLoading && <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="shimmer h-20 rounded-xl" />)}</div>}

                {!isLoading && orders?.length === 0 && (
                  <div className="card-luxe p-12 text-center">
                    <ShoppingBag size={44} className="mx-auto text-[color:var(--muted-foreground)] mb-4 opacity-30" />
                    <p className="font-display text-2xl mb-2">No orders yet</p>
                    <p className="text-[color:var(--muted-foreground)] text-sm mb-6">Your wardrobe journey starts here.</p>
                    <Link to="/shop" className="btn-rose inline-flex">Start shopping →</Link>
                  </div>
                )}

                {orders?.map((o: any) => (
                  <div key={o.id} className="card-luxe overflow-hidden">
                    <button className="w-full p-4 flex items-center justify-between gap-3 text-left" onClick={() => setExpanded(expanded === o.id ? null : o.id)}>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="order-number text-[color:var(--rose)] text-sm">{o.order_number}</p>
                          <span className={`chip text-[10px] border ${statusColor[o.status] ?? ""}`}>{o.status}</span>
                        </div>
                        <p className="text-xs text-[color:var(--muted-foreground)] mt-0.5">
                          {new Date(o.created_at).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                          {o.is_pickup ? " · Pickup" : o.delivery_address?.area ? ` · ${o.delivery_address.area}` : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="price text-[color:var(--rose)] text-sm font-semibold">{formatKsh(o.total)}</span>
                        {expanded === o.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {expanded === o.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <div className="px-4 pb-4 border-t border-[color:var(--border)] pt-4 space-y-3">
                            {o.order_items?.map((it: any) => (
                              <div key={it.id} className="flex items-center gap-3">
                                {it.product_image && <img src={it.product_image} alt={it.product_name} className="w-12 h-14 object-cover rounded-lg shrink-0" />}
                                <div className="flex-1 min-w-0 text-sm">
                                  <p className="font-medium truncate">{it.product_name}</p>
                                  <p className="text-xs text-[color:var(--muted-foreground)]">{[it.size, it.color].filter(Boolean).join(" · ")} · qty {it.quantity}</p>
                                </div>
                                <span className="price text-sm shrink-0">{formatKsh(Number(it.unit_price) * it.quantity)}</span>
                              </div>
                            ))}
                            <div className="border-t border-[color:var(--border)] pt-3 text-sm space-y-1">
                              <div className="flex justify-between text-[color:var(--muted-foreground)]">
                                <span>Delivery</span>
                                <span className="price">{Number(o.delivery_fee) === 0 ? <span className="text-[color:var(--success)]">FREE</span> : formatKsh(o.delivery_fee)}</span>
                              </div>
                              <div className="flex justify-between font-semibold text-base">
                                <span>Total</span>
                                <span className="price text-[color:var(--rose)]">{formatKsh(o.total)}</span>
                              </div>
                              {o.is_pickup
                                ? <p className="text-xs text-[color:var(--muted-foreground)]">Pickup: {o.pickup_branch} branch</p>
                                : o.delivery_address?.area && <p className="text-xs text-[color:var(--muted-foreground)]">Delivery to: {o.delivery_address.area}</p>}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {/* ── Profile tab ── */}
            {tab === "profile" && (
              <div className="max-w-lg space-y-5">

                {/* Personal info */}
                <div className="card-luxe p-5 space-y-4">
                  <h2 className="font-display text-xl flex items-center gap-2">
                    <User size={18} className="text-[color:var(--rose)]" /> Personal Info
                  </h2>
                  <div>
                    <label className="eyebrow mb-1.5 block">Full Name</label>
                    <input className="input-luxe" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} placeholder="Your full name" />
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
                      <input className="input-luxe pl-9" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="+254 7XX XXX XXX" />
                    </div>
                  </div>
                  <div>
                    <label className="eyebrow mb-1.5 block">City</label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                      <input className="input-luxe pl-9" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} placeholder="Nairobi, Makueni…" />
                    </div>
                  </div>
                  <button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="btn-rose">
                    {saveMutation.isPending ? "Saving…" : "Save Changes"}
                  </button>
                </div>

                {/* Change password */}
                <div className="card-luxe p-5 space-y-4">
                  <h2 className="font-display text-xl flex items-center gap-2">
                    <Lock size={18} className="text-[color:var(--rose)]" /> Change Password
                  </h2>
                  {(["current", "next", "confirm"] as const).map((field) => (
                    <div key={field}>
                      <label className="eyebrow mb-1.5 block">
                        {field === "current" ? "Current Password" : field === "next" ? "New Password" : "Confirm New Password"}
                      </label>
                      <div className="relative">
                        <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                        <input className="input-luxe pl-9 pr-10" type={showPw[field] ? "text" : "password"} placeholder="••••••••"
                          value={passwords[field]} onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })} />
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
                </div>

                {/* Sign out */}
                <div className="card-luxe p-5">
                  <h2 className="font-display text-xl flex items-center gap-2 mb-2">
                    <LogOut size={18} className="text-[color:var(--rose)]" /> Sign Out
                  </h2>
                  <p className="text-sm text-[color:var(--muted-foreground)] mb-4">You'll be signed out of your account on this device.</p>
                  <button onClick={signOut} className="btn-ghost flex items-center gap-2 text-sm">
                    <LogOut size={15} /> Sign out of account
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </Shell>
  );
}
