import { c as createServerRpc } from "./createServerRpc-CyrbZjAh.mjs";
import { c as createServerFn } from "./server-E4TCSJHj.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CmpvfGuK.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, e as enumType, b as booleanType, n as numberType, c as arrayType } from "../_libs/zod.mjs";
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
async function assertAdmin(userId) {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (!data) throw new Error("Forbidden: admin only");
}
const adminStats_createServerFn_handler = createServerRpc({
  id: "fc54988025651b0d207f9ef4346d9f0fe848ff17785294a4a080cffaee281f4f",
  name: "adminStats",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminStats.__executeServer(opts));
const adminStats = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminStats_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const {
    data: all
  } = await supabaseAdmin.from("orders").select("status, total, created_at, payment_status");
  const orders = all ?? [];
  const paid = orders.filter((o) => o.payment_status === "paid");
  const revenueToday = paid.filter((o) => new Date(o.created_at) >= today).reduce((a, o) => a + Number(o.total), 0);
  const revenueMonth = paid.filter((o) => new Date(o.created_at) >= monthStart).reduce((a, o) => a + Number(o.total), 0);
  const byStatus = {};
  orders.forEach((o) => {
    byStatus[o.status] = (byStatus[o.status] ?? 0) + 1;
  });
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const next = new Date(d);
    next.setDate(d.getDate() + 1);
    const r = paid.filter((o) => {
      const t = new Date(o.created_at);
      return t >= d && t < next;
    }).reduce((a, o) => a + Number(o.total), 0);
    days.push({
      day: d.toLocaleDateString("en-KE", {
        month: "short",
        day: "numeric"
      }),
      revenue: r
    });
  }
  return {
    totalOrders: orders.length,
    revenueToday,
    revenueMonth,
    byStatus,
    days
  };
});
const adminListOrders_createServerFn_handler = createServerRpc({
  id: "573be2cdf3c95bfa88f6bb3d2080ff0b0c620db545ac53f2f5a039a50348d737",
  name: "adminListOrders",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminListOrders.__executeServer(opts));
const adminListOrders = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator(objectType({
  status: stringType().optional()
}).optional()).handler(adminListOrders_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  let q = supabaseAdmin.from("orders").select("*, order_items(*)").order("created_at", {
    ascending: false
  });
  if (data?.status && data.status !== "all") q = q.eq("status", data.status);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  return rows ?? [];
});
const adminUpdateOrderStatus_createServerFn_handler = createServerRpc({
  id: "9505b54584006d8459dff4f0d9b2b1ccc184fc05200648ce850e9f9f7ee3f723",
  name: "adminUpdateOrderStatus",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpdateOrderStatus.__executeServer(opts));
const adminUpdateOrderStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(objectType({
  id: stringType().uuid(),
  status: enumType(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"])
})).handler(adminUpdateOrderStatus_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    error
  } = await supabaseAdmin.from("orders").update({
    status: data.status
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const ProductInput = objectType({
  id: stringType().uuid().optional(),
  name: stringType().min(1).max(160),
  slug: stringType().min(1).max(160).regex(/^[a-z0-9-]+$/),
  description: stringType().max(2e3).optional(),
  price: numberType().min(0).max(1e7),
  compare_price: numberType().min(0).max(1e7).nullable().optional(),
  category_id: stringType().uuid().nullable().optional(),
  sizes: arrayType(stringType().max(20)).max(20),
  colors: arrayType(stringType().max(40)).max(20),
  images: arrayType(stringType().url()).max(10),
  stock_quantity: numberType().int().min(0).max(1e5),
  is_featured: booleanType(),
  branch: enumType(["nairobi", "makueni", "both"])
});
const adminUpsertProduct_createServerFn_handler = createServerRpc({
  id: "8552c7bea139694beea39d17e69f323a972d63fd26947a65dd6b49554eb191c8",
  name: "adminUpsertProduct",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpsertProduct.__executeServer(opts));
const adminUpsertProduct = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(ProductInput).handler(adminUpsertProduct_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  if (data.id) {
    const {
      id,
      ...rest
    } = data;
    const {
      error
    } = await supabaseAdmin.from("products").update(rest).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const {
      error
    } = await supabaseAdmin.from("products").insert(data);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
const adminDeleteProduct_createServerFn_handler = createServerRpc({
  id: "0ddf57ac23192120a1e98e48f57343c6fe83e8a1ddcf5df54be83354a1f768ad",
  name: "adminDeleteProduct",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteProduct.__executeServer(opts));
const adminDeleteProduct = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(objectType({
  id: stringType().uuid()
})).handler(adminDeleteProduct_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    error
  } = await supabaseAdmin.from("products").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const CategoryInput = objectType({
  id: stringType().uuid().optional(),
  name: stringType().min(1).max(80),
  slug: stringType().min(1).max(80).regex(/^[a-z0-9-]+$/),
  description: stringType().max(500).optional(),
  image_url: stringType().url().nullable().optional()
});
const adminUpsertCategory_createServerFn_handler = createServerRpc({
  id: "6bada778c941c28d8f4bb5693567682fcc0a8cc5f8e134db94c3d77ba2454fce",
  name: "adminUpsertCategory",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpsertCategory.__executeServer(opts));
const adminUpsertCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(CategoryInput).handler(adminUpsertCategory_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  if (data.id) {
    const {
      id,
      ...rest
    } = data;
    const {
      error
    } = await supabaseAdmin.from("categories").update(rest).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const {
      error
    } = await supabaseAdmin.from("categories").insert(data);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
const adminDeleteCategory_createServerFn_handler = createServerRpc({
  id: "950328abc056627e7020b8ee4af15de2c8185c6b4f0fa341cec497db75a14951",
  name: "adminDeleteCategory",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteCategory.__executeServer(opts));
const adminDeleteCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(objectType({
  id: stringType().uuid()
})).handler(adminDeleteCategory_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    error
  } = await supabaseAdmin.from("categories").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const ZoneInput = objectType({
  id: stringType().uuid().optional(),
  name: stringType().min(1).max(80),
  fee: numberType().min(0).max(1e4),
  is_free: booleanType()
});
const adminUpsertZone_createServerFn_handler = createServerRpc({
  id: "5a0b01e9603580153d4466db27d3fdfb1126d0b21c0d8a3719cbed076c2eb50a",
  name: "adminUpsertZone",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpsertZone.__executeServer(opts));
const adminUpsertZone = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(ZoneInput).handler(adminUpsertZone_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  if (data.id) {
    const {
      id,
      ...rest
    } = data;
    const {
      error
    } = await supabaseAdmin.from("delivery_zones").update(rest).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const {
      error
    } = await supabaseAdmin.from("delivery_zones").insert(data);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
const adminDeleteZone_createServerFn_handler = createServerRpc({
  id: "5d4e304b03fe5094aebf06651582ae3142336a7785c9d8d42a6820db561ed7e2",
  name: "adminDeleteZone",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteZone.__executeServer(opts));
const adminDeleteZone = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(objectType({
  id: stringType().uuid()
})).handler(adminDeleteZone_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    error
  } = await supabaseAdmin.from("delivery_zones").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  adminDeleteCategory_createServerFn_handler,
  adminDeleteProduct_createServerFn_handler,
  adminDeleteZone_createServerFn_handler,
  adminListOrders_createServerFn_handler,
  adminStats_createServerFn_handler,
  adminUpdateOrderStatus_createServerFn_handler,
  adminUpsertCategory_createServerFn_handler,
  adminUpsertProduct_createServerFn_handler,
  adminUpsertZone_createServerFn_handler
};
