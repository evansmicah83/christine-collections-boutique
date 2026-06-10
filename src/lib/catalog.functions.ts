import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/** Public catalog queries. Use admin client server-side (lazy import) — RLS already allows public SELECT. */

export const listProducts = createServerFn({ method: "GET" })
  .validator(
    z.object({
      categorySlug: z.string().optional(),
      featured: z.boolean().optional(),
      branch: z.string().optional(),
    }).optional()
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin
      .from("products")
      .select("*, categories(name, slug)")
      .order("created_at", { ascending: false });
    if (data?.featured) q = q.eq("is_featured", true);
    if (data?.branch && data.branch !== "all") q = q.in("branch", [data.branch, "both"] as any);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    let out = rows ?? [];
    if (data?.categorySlug) {
      out = out.filter((r: any) => r.categories?.slug === data.categorySlug);
    }
    return out;
  });

export const getProduct = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("products")
      .select("*, categories(name, slug)")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("categories").select("*").order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listDeliveryZones = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("delivery_zones").select("*").order("fee");
  if (error) throw new Error(error.message);
  return data ?? [];
});
