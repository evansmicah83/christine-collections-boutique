import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/admin-login")({ component: AdminLogin });

function AdminLogin() {
  const nav = useNavigate();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Check admin role
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!role) {
        await supabase.auth.signOut();
        toast.error("Access denied. This portal is for admins only.");
        setBusy(false);
        return;
      }

      toast.success("Welcome back, Admin");
      await router.invalidate();
      nav({ to: "/admin" });
    } catch (e: any) {
      toast.error(e.message);
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-col justify-between w-[45%] bg-[color:var(--plum)] border-r border-[color:var(--border)] p-12 relative overflow-hidden"
      >
        {/* Linen texture */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg,rgba(192,134,106,0.15) 0 1px,transparent 1px 6px),repeating-linear-gradient(-45deg,rgba(192,134,106,0.1) 0 1px,transparent 1px 6px)",
          }}
        />
        <Logo />
        <div className="relative z-10">
          <p className="eyebrow mb-3">Admin Portal</p>
          <h1 className="font-display text-5xl leading-tight mb-4">
            Manage your<br />
            <span className="text-[color:var(--rose)]">boutique</span>
          </h1>
          <p className="text-[color:var(--muted-foreground)] text-sm leading-relaxed max-w-xs">
            Full access to orders, products, inventory, delivery zones and revenue analytics.
          </p>
        </div>
        <div className="relative z-10 space-y-3">
          {["Orders management", "Product catalogue CRUD", "Revenue analytics", "Delivery zones"].map((f) => (
            <div key={f} className="flex items-center gap-3 text-sm text-[color:var(--muted-foreground)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--rose)]" />
              {f}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[color:var(--background)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-8"><Logo /></div>

          <div className="mb-8">
            <div className="w-12 h-12 rounded-xl bg-[color:var(--rose)]/15 border border-[color:var(--rose)]/30 flex items-center justify-center mb-5">
              <Lock size={20} className="text-[color:var(--rose)]" />
            </div>
            <p className="eyebrow mb-2">Restricted access</p>
            <h2 className="font-display text-4xl">Admin Sign In</h2>
            <p className="text-[color:var(--muted-foreground)] text-sm mt-2">
              Only authorised staff may access this portal.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="eyebrow mb-1.5 block">Email address</label>
              <input
                type="email"
                className="input-luxe"
                placeholder="admin@christinecollections.co.ke"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="eyebrow mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  className="input-luxe pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)] transition">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={busy} className="btn-rose w-full justify-center mt-2">
              {busy ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Verifying…
                </span>
              ) : (
                <>
                  <Lock size={15} /> Access Admin Panel
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[color:var(--border)]">
            <p className="text-xs text-[color:var(--muted-foreground)] text-center">
              Not an admin?{" "}
              <a href="/auth" className="text-[color:var(--rose)] hover:underline">Customer login →</a>
            </p>
          </div>
        </motion.div>
      </div>

      <Toaster theme="dark" position="top-right" toastOptions={{ style: { background: "var(--card)", color: "var(--cream)", border: "1px solid var(--border)" } }} />
    </div>
  );
}
