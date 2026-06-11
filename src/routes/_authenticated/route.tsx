import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    const isAdminRoute = location.pathname.startsWith("/admin");
    if (error || !data.user) {
      throw redirect({ to: isAdminRoute ? "/admin-login" : "/auth" });
    }
    // Check admin role and pass into context so child routes don't re-fetch
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();
    return { user: data.user, isAdmin: !!roleRow };
  },
  component: () => <Outlet />,
});
