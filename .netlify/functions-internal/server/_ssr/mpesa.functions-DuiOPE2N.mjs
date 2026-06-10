import { c as createServerRpc } from "./createServerRpc-CyrbZjAh.mjs";
import { c as createServerFn } from "./server-E4TCSJHj.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType } from "../_libs/zod.mjs";
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
const PushInput = objectType({
  orderId: stringType().uuid(),
  phone: stringType().min(9).max(20),
  amount: numberType().int().min(1).max(15e4)
});
function sanitize(phone) {
  const d = phone.replace(/\D/g, "");
  if (d.startsWith("254")) return d;
  if (d.startsWith("0")) return "254" + d.slice(1);
  if (d.startsWith("7") || d.startsWith("1")) return "254" + d;
  return d;
}
const mpesaStkPush_createServerFn_handler = createServerRpc({
  id: "7e72b79098fc3326e7f71b7e23123c5185651ff03658c9596abb0867fd56e7d2",
  name: "mpesaStkPush",
  filename: "src/lib/mpesa.functions.ts"
}, (opts) => mpesaStkPush.__executeServer(opts));
const mpesaStkPush = createServerFn({
  method: "POST"
}).validator(PushInput).handler(mpesaStkPush_createServerFn_handler, async ({
  data
}) => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;
  const env = process.env.MPESA_ENV ?? "sandbox";
  if (!consumerKey || !consumerSecret || !shortcode || !passkey || !callbackUrl) {
    return {
      ok: false,
      disabled: true,
      message: "M-Pesa is not configured yet. Add MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE, MPESA_PASSKEY and MPESA_CALLBACK_URL secrets to enable real payments."
    };
  }
  const base = env === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke";
  const tokenRes = await fetch(`${base}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: {
      Authorization: "Basic " + btoa(`${consumerKey}:${consumerSecret}`)
    }
  });
  if (!tokenRes.ok) throw new Error("M-Pesa auth failed");
  const {
    access_token
  } = await tokenRes.json();
  const ts = (/* @__PURE__ */ new Date()).toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
  const password = btoa(`${shortcode}${passkey}${ts}`);
  const phone = sanitize(data.phone);
  const body = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: ts,
    TransactionType: "CustomerPayBillOnline",
    Amount: data.amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: callbackUrl,
    AccountReference: data.orderId.slice(0, 12),
    TransactionDesc: "Christine Collections order"
  };
  const stkRes = await fetch(`${base}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const json = await stkRes.json();
  if (!stkRes.ok || json.ResponseCode !== "0") {
    return {
      ok: false,
      message: json.errorMessage ?? "STK push failed"
    };
  }
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  await supabaseAdmin.from("orders").update({
    mpesa_checkout_request_id: json.CheckoutRequestID,
    mpesa_phone: phone
  }).eq("id", data.orderId);
  return {
    ok: true,
    checkoutRequestId: json.CheckoutRequestID
  };
});
const mpesaStatus_createServerFn_handler = createServerRpc({
  id: "9362363b29a3bc3bc513493348dba611bc6f746446ffba70e7db843b6f60ccdb",
  name: "mpesaStatus",
  filename: "src/lib/mpesa.functions.ts"
}, (opts) => mpesaStatus.__executeServer(opts));
const mpesaStatus = createServerFn({
  method: "GET"
}).validator(objectType({
  checkoutId: stringType().min(1)
})).handler(mpesaStatus_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: row
  } = await supabaseAdmin.from("orders").select("payment_status, mpesa_receipt_number, id").eq("mpesa_checkout_request_id", data.checkoutId).maybeSingle();
  return {
    paymentStatus: row?.payment_status ?? "pending",
    receipt: row?.mpesa_receipt_number ?? null,
    orderId: row?.id ?? null
  };
});
export {
  mpesaStatus_createServerFn_handler,
  mpesaStkPush_createServerFn_handler
};
