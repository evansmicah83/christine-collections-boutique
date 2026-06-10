import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type AuthState = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
};

// Module-level role cache so role check only fires once per session
const roleCache = new Map<string, boolean>();

async function checkAdmin(userId: string): Promise<boolean> {
  if (roleCache.has(userId)) return roleCache.get(userId)!;
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  const result = !!data;
  roleCache.set(userId, result);
  return result;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Initial session — use getUser() which verifies token with Supabase server
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        setUser(null);
        setIsAdmin(false);
      } else {
        setUser(data.user);
        checkAdmin(data.user.id).then(setIsAdmin);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        const u = session?.user ?? null;
        setUser(u);
        if (u) checkAdmin(u.id).then(setIsAdmin);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
        setIsAdmin(false);
        roleCache.clear();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading, isAdmin };
}
