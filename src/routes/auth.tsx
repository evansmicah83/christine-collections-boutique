import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/Shell";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({ component: Auth });

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

// Rate limiter
const attempts = { count: 0, lockedUntil: 0 };

// ── Shared field wrapper ──────────────────────────────────────────────────────
function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[#F5EEE8]/70 tracking-wide uppercase">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ── Auth ──────────────────────────────────────────────────────────────────────
function Auth() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [lockSecs, setLockSecs] = useState(0);

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const startLock = (secs: number) => {
    setLockSecs(secs);
    const iv = setInterval(() => {
      setLockSecs((s) => { if (s <= 1) { clearInterval(iv); return 0; } return s - 1; });
    }, 1000);
  };

  const switchMode = (next: "login" | "register") => {
    setMode(next);
    setShowPw(false);
    setShowConfirm(false);
  };

  const onLogin = async (data: LoginForm) => {
    if (Date.now() < attempts.lockedUntil) return;
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        attempts.count++;
        if (attempts.count >= 5) {
          attempts.lockedUntil = Date.now() + 30_000;
          attempts.count = 0;
          startLock(30);
          toast.error("Too many attempts. Try again in 30 seconds.");
        } else {
          toast.error(error.message);
        }
        return;
      }
      attempts.count = 0;
      toast.success("Welcome back!");
      nav({ to: "/dashboard" });
    } finally {
      setBusy(false);
    }
  };

  const onRegister = async (data: RegisterForm) => {
    setBusy(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { full_name: data.name } },
      });
      if (error) throw error;
      toast.success("Account created! Welcome to Christine Collections.");
      nav({ to: "/dashboard" });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  const isLocked = lockSecs > 0;

  // Shared input style applied inline so it's immune to Tailwind purge + CSS specificity issues
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#1A0F1B",
    border: "1px solid rgba(192,134,106,0.4)",
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    color: "#F5EEE8",
    fontSize: "0.9375rem",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const iconInputStyle = { ...inputStyle, paddingLeft: "2.5rem", paddingRight: "1rem" };
  const iconInputStylePr = { ...inputStyle, paddingLeft: "2.5rem", paddingRight: "2.75rem" };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#C0866A";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(192,134,106,0.15)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(192,134,106,0.4)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <Shell>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="eyebrow mb-3">{mode === "login" ? "Welcome back" : "Join us"}</p>
            <h1 className="font-display text-4xl md:text-5xl">
              {mode === "login" ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-sm text-[color:var(--muted-foreground)] mt-2">
              {mode === "login"
                ? "Access your orders and saved addresses."
                : "Join Christine Collections for a personalised experience."}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-xl overflow-hidden border border-[rgba(192,134,106,0.25)] mb-6">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 py-2.5 text-sm font-medium transition-all duration-200 ${
                  mode === m
                    ? "bg-[color:var(--rose)] text-[color:var(--plum-deep)]"
                    : "text-[color:var(--muted-foreground)] hover:text-[color:var(--cream)]"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18 }}
                onSubmit={loginForm.handleSubmit(onLogin)}
                className="space-y-4 bg-[#1A0F1B] border border-[rgba(192,134,106,0.2)] rounded-2xl p-6"
              >
                <Field label="Email address" error={loginForm.formState.errors.email?.message}>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(245,238,232,0.4)] pointer-events-none" />
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      style={iconInputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      {...loginForm.register("email")}
                    />
                  </div>
                </Field>

                <Field label="Password" error={loginForm.formState.errors.password?.message}>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(245,238,232,0.4)] pointer-events-none" />
                    <input
                      type={showPw ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      style={iconInputStylePr}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      {...loginForm.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(245,238,232,0.4)] hover:text-[#C0866A] transition"
                    >
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </Field>

                <button
                  type="submit"
                  disabled={busy || isLocked}
                  className="btn-rose w-full justify-center mt-2"
                >
                  {isLocked ? `Try again in ${lockSecs}s` : busy ? "Signing in…" : "Sign In"}
                </button>

                <p className="text-center text-xs text-[color:var(--muted-foreground)]">
                  Don't have an account?{" "}
                  <button type="button" onClick={() => switchMode("register")} className="text-[#C0866A] hover:underline">
                    Register
                  </button>
                </p>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18 }}
                onSubmit={registerForm.handleSubmit(onRegister)}
                className="space-y-4 bg-[#1A0F1B] border border-[rgba(192,134,106,0.2)] rounded-2xl p-6"
              >
                <Field label="Full name" error={registerForm.formState.errors.name?.message}>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(245,238,232,0.4)] pointer-events-none" />
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Wanjiru"
                      style={iconInputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      {...registerForm.register("name")}
                    />
                  </div>
                </Field>

                <Field label="Email address" error={registerForm.formState.errors.email?.message}>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(245,238,232,0.4)] pointer-events-none" />
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      style={iconInputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      {...registerForm.register("email")}
                    />
                  </div>
                </Field>

                <Field label="Password" error={registerForm.formState.errors.password?.message}>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(245,238,232,0.4)] pointer-events-none" />
                    <input
                      type={showPw ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Min. 8 characters"
                      style={iconInputStylePr}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      {...registerForm.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(245,238,232,0.4)] hover:text-[#C0866A] transition"
                    >
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </Field>

                <Field label="Confirm password" error={registerForm.formState.errors.confirmPassword?.message}>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(245,238,232,0.4)] pointer-events-none" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      style={iconInputStylePr}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      {...registerForm.register("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(245,238,232,0.4)] hover:text-[#C0866A] transition"
                    >
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </Field>

                <button
                  type="submit"
                  disabled={busy}
                  className="btn-rose w-full justify-center mt-2"
                >
                  {busy ? "Creating account…" : "Create Account"}
                </button>

                <p className="text-center text-xs text-[color:var(--muted-foreground)]">
                  Already a member?{" "}
                  <button type="button" onClick={() => switchMode("login")} className="text-[#C0866A] hover:underline">
                    Sign in
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Back to shop */}
          <p className="text-center text-xs text-[color:var(--muted-foreground)] mt-6">
            <Link to="/shop" className="hover:text-[#C0866A] transition">← Back to shop</Link>
          </p>
        </div>
      </div>
    </Shell>
  );
}
