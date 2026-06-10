import { createFileRoute, Outlet, redirect, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    const isAdminRoute = location.pathname.startsWith("/admin");
    if (error || !data.user) {
      throw redirect({ to: isAdminRoute ? "/admin-login" : "/auth" });
    }
    return { user: data.user };
  },
  component: () => <Outlet />,
});
