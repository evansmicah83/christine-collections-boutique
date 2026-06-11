import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SecureItemSchema = z.object({
  productId: z.string().uuid(),
  size: z.string().nullable(),
  color: z.string().nullable(),
  quantity: z.number().int().min(1).max(50),
});

const CreateOrderSchema = z.object({
  items: z.array(SecureItemSchema).min(1).max(50),
  contact: z.object({
    fullName: z.string().min(1).max(120),
    email: z.string().email().max(160),
    phone: z.string().min(9).max(20),
  }),
  isPickup: z.boolean(),
  pickupBranch: z.enum(["nairobi", "makueni"]).nullable().optional(),
  delivery: z
    .object({
      street: z.string().max(200).optional(),
      area: z.string().max(120).optional(),
      instructions: z.string().max(500).optional(),
    })
    .optional(),
  zoneId: z.string().uuid().nullable().optional(), // resolved to fee server-side
  userId: z.string().uuid().nullable().optional(),
});

export const createOrder = createServerFn({ method: "POST" })
  .validator(CreateOrderSchema)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // All price resolution, stock checks, and total calculation happen inside
    // the Postgres function — nothing is trusted from the client.
    const { data: result, error } = await supabaseAdmin.rpc("place_order_secure", {
      p_items: data.items.map((i) => ({
        product_id: i.productId,
        quantity: i.quantity,
        size: i.size,
        color: i.color,
      })),
      p_contact: {
        fullName: data.contact.fullName,
        email: data.contact.email,
        phone: data.contact.phone,
      },
      p_is_pickup: data.isPickup,
      p_pickup_branch: data.isPickup ? (data.pickupBranch ?? null) : null,
      p_delivery: data.isPickup ? null : (data.delivery ?? null),
      p_zone_id: data.isPickup ? null : (data.zoneId ?? null),
      p_user_id: data.userId ?? null,
    });

    if (error) throw new Error(error.message);
    return result as { id: string; order_number: string; subtotal: number; delivery_fee: number; total: number };
  });

export const getOrderById = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return order;
  });

export const getMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });
