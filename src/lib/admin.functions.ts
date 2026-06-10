import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!data) throw new Error("Forbidden: admin only");
}

export const adminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const { data: all } = await supabaseAdmin.from("orders").select("status, total, created_at, payment_status");
    const orders = all ?? [];
    const paid = orders.filter((o: any) => o.payment_status === "paid");
    const revenueToday = paid.filter((o: any) => new Date(o.created_at) >= today).reduce((a: number, o: any) => a + Number(o.total), 0);
    const revenueMonth = paid.filter((o: any) => new Date(o.created_at) >= monthStart).reduce((a: number, o: any) => a + Number(o.total), 0);
    const byStatus: Record<string, number> = {};
    orders.forEach((o: any) => { byStatus[o.status] = (byStatus[o.status] ?? 0) + 1; });
    // daily revenue last 14 days
    const days: { day: string; revenue: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
      const next = new Date(d); next.setDate(d.getDate() + 1);
      const r = paid.filter((o: any) => { const t = new Date(o.created_at); return t >= d && t < next; })
        .reduce((a: number, o: any) => a + Number(o.total), 0);
      days.push({ day: d.toLocaleDateString("en-KE", { month: "short", day: "numeric" }), revenue: r });
    }
    return { totalOrders: orders.length, revenueToday, revenueMonth, byStatus, days };
  });

export const adminListOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator(z.object({ status: z.string().optional() }).optional())
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
    if (data?.status && data.status !== "all") q = q.eq("status", data.status as any);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const adminUpdateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    z.object({
      id: z.string().uuid(),
      status: z.enum(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]),
    })
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("orders").update({ status: data.status as any }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const ProductInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(160),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/),
  description: z.string().max(2000).optional(),
  price: z.number().min(0).max(10_000_000),
  compare_price: z.number().min(0).max(10_000_000).nullable().optional(),
  category_id: z.string().uuid().nullable().optional(),
  sizes: z.array(z.string().max(20)).max(20),
  colors: z.array(z.string().max(40)).max(20),
  images: z.array(z.string().url()).max(10),
  stock_quantity: z.number().int().min(0).max(100000),
  is_featured: z.boolean(),
  branch: z.enum(["nairobi", "makueni", "both"]),
});

export const adminUpsertProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(ProductInput)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.id) {
      const { id, ...rest } = data;
      const { error } = await supabaseAdmin.from("products").update(rest).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("products").insert(data);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const CategoryInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(80),
  slug: z.string().min(1).max(80).regex(/^[a-z0-9-]+$/),
  description: z.string().max(500).optional(),
  image_url: z.string().url().nullable().optional(),
});

export const adminUpsertCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(CategoryInput)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.id) {
      const { id, ...rest } = data;
      const { error } = await supabaseAdmin.from("categories").update(rest).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("categories").insert(data);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const adminDeleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("categories").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const ZoneInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(80),
  fee: z.number().min(0).max(10000),
  is_free: z.boolean(),
});

export const adminUpsertZone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(ZoneInput)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.id) {
      const { id, ...rest } = data;
      const { error } = await supabaseAdmin.from("delivery_zones").update(rest).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("delivery_zones").insert(data);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const adminDeleteZone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("delivery_zones").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
