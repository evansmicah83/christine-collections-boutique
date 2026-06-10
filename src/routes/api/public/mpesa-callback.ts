import { createFileRoute } from "@tanstack/react-router";

/**
 * M-Pesa Daraja callback endpoint.
 * Public — Safaricom calls this from their network. Configure the public URL
 * of this route as MPESA_CALLBACK_URL secret.
 */
export const Route = createFileRoute("/api/public/mpesa-callback")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as any;
          const cb = body?.Body?.stkCallback;
          if (!cb) return new Response("ok");
          const checkoutId: string | undefined = cb.CheckoutRequestID;
          const resultCode: number = cb.ResultCode;
          if (!checkoutId) return new Response("ok");

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          if (resultCode === 0) {
            const items: { Name: string; Value: any }[] = cb.CallbackMetadata?.Item ?? [];
            const receipt = items.find((i) => i.Name === "MpesaReceiptNumber")?.Value as string | undefined;
            await supabaseAdmin
              .from("orders")
              .update({ payment_status: "paid", status: "confirmed", mpesa_receipt_number: receipt ?? null })
              .eq("mpesa_checkout_request_id", checkoutId);
          } else {
            await supabaseAdmin
              .from("orders")
              .update({ payment_status: "failed" })
              .eq("mpesa_checkout_request_id", checkoutId);
          }
          return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          console.error("mpesa callback error", e);
          return new Response("error", { status: 500 });
        }
      },
    },
  },
});
