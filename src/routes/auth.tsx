import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/Shell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({ component: Auth });

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "This field is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

// Simple in-memory rate limiter
const attempts = { count: 0, lockedUntil: 0 };

function Auth() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [lockSecs, setLockSecs] = useState(0);

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const startLockCountdown = (secs: number) => {
    setLockSecs(secs);
    const iv = setInterval(() => {
      setLockSecs((s) => {
        if (s <= 1) { clearInterval(iv); return 0; }
        return s - 1;
      });
    }, 1000);
  };

  const onLogin = async (data: LoginForm) => {
    if (Date.now() < attempts.lockedUntil) return;
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password });
      if (error) {
        attempts.count++;
        if (attempts.count >= 5) {
          attempts.lockedUntil = Date.now() + 30_000;
          attempts.count = 0;
          startLockCountdown(30);
          toast.error("Too many failed attempts. Try again in 30 seconds.");
        } else {
          toast.error(error.message);
        }
        return;
      }
      attempts.count = 0;
      toast.success("Welcome back");
      nav({ to: "/dashboard" });
    } finally { setBusy(false); }
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
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  const isLocked = lockSecs > 0;

  return (
    <Shell>
      <div className="max-w-md mx-auto px-5 py-16">
        <p className="eyebrow mb-2">{mode === "login" ? "Welcome back" : "Join us"}</p>
        <h1 className="font-display text-4xl mb-8">{mode === "login" ? "Sign In" : "Create Account"}</h1>

        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.form key="login" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              onSubmit={loginForm.handleSubmit(onLogin)} className="card-luxe p-6 space-y-4">
              <div>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                  <input className="input-luxe pl-9" placeholder="Email" type="email" autoComplete="email" {...loginForm.register("email")} />
                </div>
                {loginForm.formState.errors.email && <p className="text-xs italic text-red-400 mt-1">{loginForm.formState.errors.email.message}</p>}
              </div>
              <div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                  <input className="input-luxe pl-9 pr-10" placeholder="Password" type={showPw ? "text" : "password"} autoComplete="current-password" {...loginForm.register("password")} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)]">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {loginForm.formState.errors.password && <p className="text-xs italic text-red-400 mt-1">{loginForm.formState.errors.password.message}</p>}
              </div>
              <button className="btn-rose w-full justify-center" disabled={busy || isLocked}>
                {isLocked ? `Try again in ${lockSecs}s` : busy ? "Signing in…" : "Sign In"}
              </button>
              <button type="button" onClick={() => setMode("register")} className="block mx-auto text-xs text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)]">
                No account? Register
              </button>
            </motion.form>
          ) : (
            <motion.form key="register" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              onSubmit={registerForm.handleSubmit(onRegister)} className="card-luxe p-6 space-y-4">
              <div>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                  <input className="input-luxe pl-9" placeholder="Full name" autoComplete="name" {...registerForm.register("name")} />
                </div>
                {registerForm.formState.errors.name && <p className="text-xs italic text-red-400 mt-1">{registerForm.formState.errors.name.message}</p>}
              </div>
              <div>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                  <input className="input-luxe pl-9" placeholder="Email" type="email" autoComplete="email" {...registerForm.register("email")} />
                </div>
                {registerForm.formState.errors.email && <p className="text-xs italic text-red-400 mt-1">{registerForm.formState.errors.email.message}</p>}
              </div>
              <div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                  <input className="input-luxe pl-9 pr-10" placeholder="Password (min 8 chars)" type={showPw ? "text" : "password"} autoComplete="new-password" {...registerForm.register("password")} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)]">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {registerForm.formState.errors.password && <p className="text-xs italic text-red-400 mt-1">{registerForm.formState.errors.password.message}</p>}
              </div>
              <div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                  <input className="input-luxe pl-9 pr-10" placeholder="Confirm password" type={showConfirmPw ? "text" : "password"} autoComplete="new-password" {...registerForm.register("confirmPassword")} />
                  <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)]">
                    {showConfirmPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {registerForm.formState.errors.confirmPassword && <p className="text-xs italic text-red-400 mt-1">{registerForm.formState.errors.confirmPassword.message}</p>}
              </div>
              <button className="btn-rose w-full justify-center" disabled={busy}>
                {busy ? "Creating account…" : "Create Account"}
              </button>
              <button type="button" onClick={() => setMode("login")} className="block mx-auto text-xs text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)]">
                Already a member? Sign in
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  );
}
