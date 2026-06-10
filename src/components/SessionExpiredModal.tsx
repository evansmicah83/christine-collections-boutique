import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function SessionExpiredModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "TOKEN_REFRESHED") setShow(false);
      // SIGNED_OUT fired after a failed refresh = true expiry
      if (event === "SIGNED_OUT") {
        // Only show modal if we previously had a session (not a deliberate logout)
        supabase.auth.getSession().then(({ data }) => {
          if (!data.session) setShow(true);
        });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    setShow(false);
    window.location.href = "/auth";
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-sm bg-[#1A0F1B] border-t-2 border-[color:var(--rose)] rounded-2xl p-8 shadow-2xl text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[color:var(--rose)]/15 flex items-center justify-center mx-auto mb-5">
              <ShieldAlert size={26} className="text-[color:var(--rose)]" />
            </div>
            <h2 className="font-display text-2xl mb-2">Session expired</h2>
            <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed mb-6">
              Your session has timed out for security. Please log in again to continue — your cart is saved.
            </p>
            <button onClick={handleLogin} className="btn-rose w-full justify-center">
              Log In Again
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
