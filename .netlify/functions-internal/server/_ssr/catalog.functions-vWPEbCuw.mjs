import { c as createServerRpc } from "./createServerRpc-CyrbZjAh.mjs";
import { c as createServerFn } from "./server-E4TCSJHj.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, b as booleanType } from "../_libs/zod.mjs";
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
const listProducts_createServerFn_handler = createServerRpc({
  id: "ec305e715d428bd5a056174d65530dc3f73a4aae7224baa7e85f3de5db811249",
  name: "listProducts",
  filename: "src/lib/catalog.functions.ts"
}, (opts) => listProducts.__executeServer(opts));
const listProducts = createServerFn({
  method: "GET"
}).validator(objectType({
  categorySlug: stringType().optional(),
  featured: booleanType().optional(),
  branch: stringType().optional()
}).optional()).handler(listProducts_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  let q = supabaseAdmin.from("products").select("*, categories(name, slug)").order("created_at", {
    ascending: false
  });
  if (data?.featured) q = q.eq("is_featured", true);
  if (data?.branch && data.branch !== "all") q = q.in("branch", [data.branch, "both"]);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  let out = rows ?? [];
  if (data?.categorySlug) {
    out = out.filter((r) => r.categories?.slug === data.categorySlug);
  }
  return out;
});
const getProduct_createServerFn_handler = createServerRpc({
  id: "8fcb0253bf3c1c167b9da7ce06410812f0527d2f561cf0a09fe48379367bcb16",
  name: "getProduct",
  filename: "src/lib/catalog.functions.ts"
}, (opts) => getProduct.__executeServer(opts));
const getProduct = createServerFn({
  method: "GET"
}).validator(objectType({
  slug: stringType().min(1)
})).handler(getProduct_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: row,
    error
  } = await supabaseAdmin.from("products").select("*, categories(name, slug)").eq("slug", data.slug).maybeSingle();
  if (error) throw new Error(error.message);
  return row;
});
const listCategories_createServerFn_handler = createServerRpc({
  id: "9093087a4fde30e7cbeefd735d6dccc2718ef5ec811563a10f9b01884489c6f6",
  name: "listCategories",
  filename: "src/lib/catalog.functions.ts"
}, (opts) => listCategories.__executeServer(opts));
const listCategories = createServerFn({
  method: "GET"
}).handler(listCategories_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("categories").select("*").order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
});
const listDeliveryZones_createServerFn_handler = createServerRpc({
  id: "66f2c0628bd74497e0aeab4851b15256225c2ab5d34f9d0cb1ebd04510b72c32",
  name: "listDeliveryZones",
  filename: "src/lib/catalog.functions.ts"
}, (opts) => listDeliveryZones.__executeServer(opts));
const listDeliveryZones = createServerFn({
  method: "GET"
}).handler(listDeliveryZones_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("delivery_zones").select("*").order("fee");
  if (error) throw new Error(error.message);
  return data ?? [];
});
export {
  getProduct_createServerFn_handler,
  listCategories_createServerFn_handler,
  listDeliveryZones_createServerFn_handler,
  listProducts_createServerFn_handler
};
