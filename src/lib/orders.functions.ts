import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ItemSchema = z.object({
  productId: z.string().uuid(),
  name: z.string(),
  image: z.string().optional().nullable(),
  size: z.string().nullable(),
  color: z.string().nullable(),
  quantity: z.number().int().min(1).max(50),
  unitPrice: z.number().min(0),
});

const CreateOrderSchema = z.object({
  items: z.array(ItemSchema).min(1).max(50),
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
  deliveryFee: z.number().min(0).max(5000),
  userId: z.string().uuid().nullable().optional(),
});

export const createOrder = createServerFn({ method: "POST" })
  .validator(CreateOrderSchema)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const subtotal = data.items.reduce((a, i) => a + i.unitPrice * i.quantity, 0);
    const total = subtotal + data.deliveryFee;

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: data.userId ?? null,
        guest_email: data.userId ? null : data.contact.email,
        guest_phone: data.userId ? null : data.contact.phone,
        subtotal,
        delivery_fee: data.deliveryFee,
        total,
        is_pickup: data.isPickup,
        pickup_branch: data.isPickup ? data.pickupBranch : null,
        delivery_address: data.isPickup ? null : { ...data.delivery, fullName: data.contact.fullName, phone: data.contact.phone },
        mpesa_phone: data.contact.phone,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    const items = data.items.map((i) => ({
      order_id: order.id,
      product_id: i.productId,
      product_name: i.name,
      product_image: i.image ?? null,
      quantity: i.quantity,
      size: i.size,
      color: i.color,
      unit_price: i.unitPrice,
    }));
    const { error: e2 } = await supabaseAdmin.from("order_items").insert(items);
    if (e2) throw new Error(e2.message);
    return { id: order.id, orderNumber: order.order_number, total };
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
