import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Shell } from "@/components/Shell";
import { useCart } from "@/lib/cart-store";
import { formatKsh, isValidKenyaPhone, sanitizePhone } from "@/lib/brand";
import { listDeliveryZones } from "@/lib/catalog.functions";
import { createOrder } from "@/lib/orders.functions";
import { mpesaStkPush, mpesaStatus } from "@/lib/mpesa.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/checkout")({ component: Checkout });

const deliverySchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().refine((v) => isValidKenyaPhone(v), "Enter a valid Kenyan phone (07XX or +2547XX)"),
  isPickup: z.boolean(),
  branch: z.enum(["nairobi", "makueni"]),
  street: z.string().optional(),
  zoneId: z.string().optional(),
  instructions: z.string().optional(),
}).superRefine((d, ctx) => {
  if (!d.isPickup) {
    if (!d.street || d.street.length < 3) ctx.addIssue({ code: "custom", path: ["street"], message: "Street address required" });
    if (!d.zoneId) ctx.addIssue({ code: "custom", path: ["zoneId"], message: "Select a delivery area" });
  }
});

type DeliveryForm = z.infer<typeof deliverySchema>;

function Checkout() {
  const nav = useNavigate();
  const { items, subtotal, clear } = useCart();
  const sub = subtotal();
  const { data: zones } = useQuery({ queryKey: ["zones"], queryFn: () => listDeliveryZones() });

  const [step, setStep] = useState(1);
  const [deliveryData, setDeliveryData] = useState<DeliveryForm | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [serverTotal, setServerTotal] = useState<number | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DeliveryForm>({
    resolver: zodResolver(deliverySchema),
    defaultValues: { isPickup: false, branch: "nairobi", fullName: "", email: "", phone: "", street: "", zoneId: "", instructions: "" },
  });

  const isPickup = watch("isPickup");
  const zoneId = watch("zoneId");
  const zone = zones?.find((z: any) => z.id === zoneId);
  const deliveryFee = isPickup ? 0 : Number(zone?.fee ?? 0);
  const total = sub + deliveryFee;

  if (items.length === 0 && !orderId) {
    return (
      <Shell>
        <div className="max-w-3xl mx-auto px-5 py-24 text-center">
          <h1 className="font-display text-3xl">Your bag is empty</h1>
          <a href="/shop" className="btn-rose mt-6 inline-flex">Continue shopping</a>
        </div>
      </Shell>
    );
  }

  const onDeliverySubmit = (data: DeliveryForm) => {
    setDeliveryData(data);
    setStep(2);
  };

  const placeOrder = async () => {
    if (!deliveryData) return;
    const { data: sess } = await supabase.auth.getSession();
    const userId = sess?.session?.user?.id ?? null;
    try {
      const res = await createOrder({
        data: {
          // Only IDs + quantities sent — prices resolved server-side from DB
          items: items.map((i) => ({ productId: i.productId, size: i.size, color: i.color, quantity: i.quantity })),
          contact: { fullName: deliveryData.fullName, email: deliveryData.email, phone: sanitizePhone(deliveryData.phone) },
          isPickup: deliveryData.isPickup,
          pickupBranch: deliveryData.isPickup ? deliveryData.branch : null,
          delivery: deliveryData.isPickup ? undefined : { street: deliveryData.street, area: zone?.name, instructions: deliveryData.instructions },
          zoneId: deliveryData.isPickup ? null : (deliveryData.zoneId ?? null),
          userId,
        },
      });
      setOrderId(res.id);
      setServerTotal(res.total);
      setStep(3);
      toast.success(`Order ${res.order_number} created`);
    } catch (e: any) { toast.error(e.message ?? "Could not place order"); }
  };

  const payMpesa = async () => {
    if (!orderId) return;
    setPaying(true);
    try {
      const res = await mpesaStkPush({ data: { orderId, phone: sanitizePhone(deliveryData!.phone), amount: Math.round(serverTotal ?? 0) } });
      if (!res.ok) {
        if ("disabled" in res && res.disabled) {
          toast.warning("M-Pesa is not configured yet. Order saved as pending — staff will contact you.");
          clear();
          setTimeout(() => nav({ to: "/order-confirmation/$id", params: { id: orderId! } }), 1200);
          return;
        }
        toast.error(res.message ?? "STK push failed"); setPaying(false); return;
      }
      setCheckoutId(res.checkoutRequestId);
      const start = Date.now();
      const iv = setInterval(async () => {
        const s = await mpesaStatus({ data: { checkoutId: res.checkoutRequestId } });
        if (s.paymentStatus === "paid") {
          clearInterval(iv); clear(); toast.success("Payment confirmed!");
          nav({ to: "/order-confirmation/$id", params: { id: orderId! } });
        } else if (s.paymentStatus === "failed" || Date.now() - start > 90_000) {
          clearInterval(iv); setPaying(false); toast.error("Payment timed out. Try again.");
        }
      }, 5000);
    } catch (e: any) { toast.error(e.message); setPaying(false); }
  };

  return (
    <Shell>
      <div className="max-w-3xl mx-auto px-5 py-12">
        <p className="eyebrow mb-2">Checkout · Step {step} of 3</p>
        <h1 className="font-display text-4xl mb-8">{step === 1 ? "Delivery" : step === 2 ? "Review" : "Payment"}</h1>

        {/* Step 1 */}
        {step === 1 && (
          <form onSubmit={handleSubmit(onDeliverySubmit)} className="card-luxe p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <input className="input-luxe" placeholder="Full name" {...register("fullName")} />
                {errors.fullName && <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <input className="input-luxe" placeholder="Email" type="email" {...register("email")} />
                {errors.email && <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <input className="input-luxe" placeholder="Phone (07XX or +2547XX)" {...register("phone")} />
              {errors.phone && <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.phone.message}</p>}
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={() => setValue("isPickup", false)} className={`flex-1 py-3 rounded-md border transition ${!isPickup ? "border-[color:var(--rose)] text-[color:var(--rose)]" : "border-[color:var(--border)]"}`}>Delivery</button>
              <button type="button" onClick={() => setValue("isPickup", true)} className={`flex-1 py-3 rounded-md border transition ${isPickup ? "border-[color:var(--rose)] text-[color:var(--rose)]" : "border-[color:var(--border)]"}`}>Branch Pickup</button>
            </div>

            {isPickup ? (
              <select className="input-luxe" {...register("branch")}>
                <option value="nairobi">Nairobi Boutique</option>
                <option value="makueni">Makueni Boutique</option>
              </select>
            ) : (
              <>
                <div>
                  <input className="input-luxe" placeholder="Street address" {...register("street")} />
                  {errors.street && <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.street.message}</p>}
                </div>
                <div>
                  <select className="input-luxe" {...register("zoneId")}>
                    <option value="">Select area</option>
                    {zones?.map((z: any) => (
                      <option key={z.id} value={z.id}>{z.name} {z.is_free ? "· FREE" : `· ${formatKsh(z.fee)}`}</option>
                    ))}
                  </select>
                  {errors.zoneId && <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.zoneId.message}</p>}
                </div>
                <textarea className="input-luxe" placeholder="Delivery instructions (optional)" {...register("instructions")} />
              </>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-[color:var(--border)]">
              <span className="text-sm">
                Delivery fee:{" "}
                <span className="price text-[color:var(--rose)]">
                  {isPickup || (zone?.is_free) ? <span className="text-[color:var(--success)] font-semibold">FREE</span> : formatKsh(deliveryFee)}
                </span>
              </span>
              <button type="submit" className="btn-rose">Continue</button>
            </div>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && deliveryData && (
          <div className="card-luxe p-6 space-y-4">
            <div>
              <h3 className="font-display text-xl mb-3">Items</h3>
              {items.map((i) => (
                <div key={i.productId + i.size + i.color} className="flex justify-between text-sm py-1">
                  <span>{i.name} × {i.quantity} <span className="text-[color:var(--muted-foreground)]">({[i.size, i.color].filter(Boolean).join(" · ")})</span></span>
                  <span className="price">{formatKsh(i.unitPrice * i.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[color:var(--border)] pt-3 text-sm space-y-1">
              <div className="flex justify-between"><span>Subtotal</span><span className="price">{formatKsh(sub)}</span></div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="price">{deliveryFee === 0 ? <span className="text-[color:var(--success)]">FREE</span> : formatKsh(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-lg pt-2">
                <span className="font-display">Total</span>
                <span className="price text-[color:var(--rose)] font-semibold">{formatKsh(total)}</span>
              </div>
            </div>
            <div className="text-xs text-[color:var(--muted-foreground)] space-y-0.5 border-t border-[color:var(--border)] pt-3">
              <p>{deliveryData.fullName} · {deliveryData.email} · {deliveryData.phone}</p>
              {deliveryData.isPickup
                ? <p>Pickup: {deliveryData.branch.charAt(0).toUpperCase() + deliveryData.branch.slice(1)} branch</p>
                : <p>Delivery to: {deliveryData.street}, {zone?.name}</p>}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="btn-ghost">Back</button>
              <button onClick={placeOrder} className="btn-rose">Continue to Payment</button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="card-luxe p-6 space-y-4">
            <div className="text-center py-4">
              <p className="eyebrow mb-2">Pay with</p>
              <p className="font-display text-3xl text-[color:var(--mpesa)]">M-PESA</p>
            </div>
            <input className="input-luxe" value={deliveryData?.phone ?? ""} readOnly placeholder="M-Pesa phone number" />
            <button onClick={payMpesa} disabled={paying} className="btn-mpesa">
              {paying ? "Check your phone for the STK prompt…" : `Pay ${formatKsh(serverTotal ?? 0)} via M-Pesa`}
            </button>
            {checkoutId && <p className="text-xs text-center text-[color:var(--muted-foreground)] animate-pulse">Awaiting confirmation from Safaricom…</p>}
          </div>
        )}
      </div>
    </Shell>
  );
}
