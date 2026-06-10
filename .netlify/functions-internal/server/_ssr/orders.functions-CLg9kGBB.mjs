import { c as createServerRpc } from "./createServerRpc-CyrbZjAh.mjs";
import { c as createServerFn } from "./server-E4TCSJHj.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CmpvfGuK.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType, e as enumType, b as booleanType, c as arrayType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const ItemSchema = objectType({
  productId: stringType().uuid(),
  name: stringType(),
  image: stringType().optional().nullable(),
  size: stringType().nullable(),
  color: stringType().nullable(),
  quantity: numberType().int().min(1).max(50),
  unitPrice: numberType().min(0)
});
const CreateOrderSchema = objectType({
  items: arrayType(ItemSchema).min(1).max(50),
  contact: objectType({
    fullName: stringType().min(1).max(120),
    email: stringType().email().max(160),
    phone: stringType().min(9).max(20)
  }),
  isPickup: booleanType(),
  pickupBranch: enumType(["nairobi", "makueni"]).nullable().optional(),
  delivery: objectType({
    street: stringType().max(200).optional(),
    area: stringType().max(120).optional(),
    instructions: stringType().max(500).optional()
  }).optional(),
  deliveryFee: numberType().min(0).max(5e3),
  userId: stringType().uuid().nullable().optional()
});
const createOrder_createServerFn_handler = createServerRpc({
  id: "7f92d135aa3763ddd5bf6d4d9f84832b6b591cbaa35dcc4048b4b1beed8e7bf3",
  name: "createOrder",
  filename: "src/lib/orders.functions.ts"
}, (opts) => createOrder.__executeServer(opts));
const createOrder = createServerFn({
  method: "POST"
}).validator(CreateOrderSchema).handler(createOrder_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const subtotal = data.items.reduce((a, i) => a + i.unitPrice * i.quantity, 0);
  const total = subtotal + data.deliveryFee;
  const {
    data: order,
    error
  } = await supabaseAdmin.from("orders").insert({
    user_id: data.userId ?? null,
    guest_email: data.userId ? null : data.contact.email,
    guest_phone: data.userId ? null : data.contact.phone,
    subtotal,
    delivery_fee: data.deliveryFee,
    total,
    is_pickup: data.isPickup,
    pickup_branch: data.isPickup ? data.pickupBranch : null,
    delivery_address: data.isPickup ? null : {
      ...data.delivery,
      fullName: data.contact.fullName,
      phone: data.contact.phone
    },
    mpesa_phone: data.contact.phone
  }).select().single();
  if (error) throw new Error(error.message);
  const items = data.items.map((i) => ({
    order_id: order.id,
    product_id: i.productId,
    product_name: i.name,
    product_image: i.image ?? null,
    quantity: i.quantity,
    size: i.size,
    color: i.color,
    unit_price: i.unitPrice
  }));
  const {
    error: e2
  } = await supabaseAdmin.from("order_items").insert(items);
  if (e2) throw new Error(e2.message);
  return {
    id: order.id,
    orderNumber: order.order_number,
    total
  };
});
const getOrderById_createServerFn_handler = createServerRpc({
  id: "a5ee9bad6d6dfcd1a5c1f0a85084988327f42fcacbc4a074a617434a490158db",
  name: "getOrderById",
  filename: "src/lib/orders.functions.ts"
}, (opts) => getOrderById.__executeServer(opts));
const getOrderById = createServerFn({
  method: "GET"
}).validator(objectType({
  id: stringType().uuid()
})).handler(getOrderById_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: order,
    error
  } = await supabaseAdmin.from("orders").select("*, order_items(*)").eq("id", data.id).maybeSingle();
  if (error) throw new Error(error.message);
  return order;
});
const getMyOrders_createServerFn_handler = createServerRpc({
  id: "6c8a93162baf5f19a0104a3fbb4ef5b118f9a0e1e73268385aa11ec42041ca24",
  name: "getMyOrders",
  filename: "src/lib/orders.functions.ts"
}, (opts) => getMyOrders.__executeServer(opts));
const getMyOrders = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getMyOrders_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("orders").select("*, order_items(*)").eq("user_id", context.userId).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
export {
  createOrder_createServerFn_handler,
  getMyOrders_createServerFn_handler,
  getOrderById_createServerFn_handler
};
