import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * M-Pesa Daraja STK Push — scaffolded.
 *
 * To activate, add these secrets in Lovable Cloud:
 *   MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE,
 *   MPESA_PASSKEY, MPESA_CALLBACK_URL, MPESA_ENV (sandbox|production)
 *
 * The callback URL handler lives at /api/public/mpesa-callback.
 */

const PushInput = z.object({
  orderId: z.string().uuid(),
  phone: z.string().min(9).max(20),
  amount: z.number().int().min(1).max(150_000),
});

function sanitize(phone: string) {
  const d = phone.replace(/\D/g, "");
  if (d.startsWith("254")) return d;
  if (d.startsWith("0")) return "254" + d.slice(1);
  if (d.startsWith("7") || d.startsWith("1")) return "254" + d;
  return d;
}

export const mpesaStkPush = createServerFn({ method: "POST" })
  .validator(PushInput)
  .handler(async ({ data }) => {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;
    const env = process.env.MPESA_ENV ?? "sandbox";

    if (!consumerKey || !consumerSecret || !shortcode || !passkey || !callbackUrl) {
      return {
        ok: false as const,
        disabled: true,
        message:
          "M-Pesa is not configured yet. Add MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE, MPESA_PASSKEY and MPESA_CALLBACK_URL secrets to enable real payments.",
      };
    }

    const base = env === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke";
    const tokenRes = await fetch(`${base}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: { Authorization: "Basic " + btoa(`${consumerKey}:${consumerSecret}`) },
    });
    if (!tokenRes.ok) throw new Error("M-Pesa auth failed");
    const { access_token } = (await tokenRes.json()) as { access_token: string };

    const ts = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14);
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
      TransactionDesc: "Christine Collections order",
    };

    const stkRes = await fetch(`${base}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await stkRes.json();
    if (!stkRes.ok || json.ResponseCode !== "0") {
      return { ok: false as const, message: json.errorMessage ?? "STK push failed" };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("orders")
      .update({ mpesa_checkout_request_id: json.CheckoutRequestID, mpesa_phone: phone })
      .eq("id", data.orderId);

    return { ok: true as const, checkoutRequestId: json.CheckoutRequestID };
  });

export const mpesaStatus = createServerFn({ method: "GET" })
  .validator(z.object({ checkoutId: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("orders")
      .select("payment_status, mpesa_receipt_number, id")
      .eq("mpesa_checkout_request_id", data.checkoutId)
      .maybeSingle();
    return { paymentStatus: row?.payment_status ?? "pending", receipt: row?.mpesa_receipt_number ?? null, orderId: row?.id ?? null };
  });
