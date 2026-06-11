import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
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

const deliverySchema = z
  .object({
    fullName: z.string().min(2, "Full name required"),
    email: z.string().email("Valid email required"),
    phone: z
      .string()
      .refine((v) => isValidKenyaPhone(v), "Enter a valid Kenyan phone (07XX or +2547XX)"),
    isPickup: z.boolean(),
    branch: z.enum(["nairobi", "makueni"]),
    street: z.string().optional(),
    zoneId: z.string().optional(),
    instructions: z.string().optional(),
  })
  .superRefine((d, ctx) => {
    if (!d.isPickup) {
      if (!d.street || d.street.length < 3)
        ctx.addIssue({ code: "custom", path: ["street"], message: "Street address required" });
      if (!d.zoneId)
        ctx.addIssue({ code: "custom", path: ["zoneId"], message: "Select a delivery area" });
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
  const [checkoutReqId, setCheckoutReqId] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);
  const [paying, setPaying] = useState(false);
  const [serverTotal, setServerTotal] = useState<number | null>(null);

  // Keep interval ref so we can clear it on unmount
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<DeliveryForm>({
      resolver: zodResolver(deliverySchema),
      defaultValues: {
        isPickup: false,
        branch: "nairobi",
        fullName: "",
        email: "",
        phone: "",
        street: "",
        zoneId: "",
        instructions: "",
      },
    });

  const isPickup = watch("isPickup");
  const zoneId = watch("zoneId");
  const zone = zones?.find((z: any) => z.id === zoneId);
  const deliveryFee = isPickup ? 0 : zone ? Number(zone.fee) : null; // null = not yet selected

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
    if (!deliveryData || placing) return;
    setPlacing(true);
    const { data: sess } = await supabase.auth.getSession();
    const userId = sess?.session?.user?.id ?? null;
    try {
      const res = await createOrder({
        data: {
          items: items.map((i) => ({
            productId: i.productId,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
          })),
          contact: {
            fullName: deliveryData.fullName,
            email: deliveryData.email,
            phone: sanitizePhone(deliveryData.phone),
          },
          isPickup: deliveryData.isPickup,
          pickupBranch: deliveryData.isPickup ? deliveryData.branch : null,
          delivery: deliveryData.isPickup
            ? undefined
            : {
                street: deliveryData.street,
                area: zone?.name,
                instructions: deliveryData.instructions,
              },
          zoneId: deliveryData.isPickup ? null : (deliveryData.zoneId ?? null),
          userId,
        },
      });
      // Atomic — set all three together before advancing step
      setOrderId(res.id);
      setServerTotal(res.total);
      setStep(3);
      toast.success(`Order ${res.order_number} created`);
    } catch (e: any) {
      toast.error(e.message ?? "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  const payMpesa = async () => {
    if (!orderId || paying) return;
    setPaying(true);
    try {
      const res = await mpesaStkPush({
        data: {
          orderId,
          phone: sanitizePhone(deliveryData!.phone),
          amount: Math.round(serverTotal ?? 0),
        },
      });

      if (!res.ok) {
        if ("disabled" in res && res.disabled) {
          toast.warning(
            "M-Pesa is not configured yet. Order saved as pending — our team will contact you shortly."
          );
          clear();
          setTimeout(() => nav({ to: "/order-confirmation/$id", params: { id: orderId! } }), 1200);
          return; // paying stays true — we're navigating away anyway
        }
        toast.error(res.message ?? "STK push failed");
        setPaying(false);
        return;
      }

      setCheckoutReqId(res.checkoutRequestId);
      const start = Date.now();

      pollRef.current = setInterval(async () => {
        try {
          const s = await mpesaStatus({ data: { checkoutId: res.checkoutRequestId } });
          if (s.paymentStatus === "paid") {
            clearInterval(pollRef.current!);
            pollRef.current = null;
            clear();
            toast.success("Payment confirmed!");
            nav({ to: "/order-confirmation/$id", params: { id: orderId! } });
          } else if (s.paymentStatus === "failed" || Date.now() - start > 90_000) {
            clearInterval(pollRef.current!);
            pollRef.current = null;
            setPaying(false);
            toast.error("Payment timed out or failed. Please try again.");
          }
        } catch {
          // network blip — keep polling
        }
      }, 5000);
    } catch (e: any) {
      toast.error(e.message);
      setPaying(false);
    }
  };

  // Derived: what to show for delivery fee line
  const feeDisplay = () => {
    if (isPickup) return <span className="text-[color:var(--success)] font-semibold">FREE</span>;
    if (deliveryFee === null) return <span className="text-[color:var(--muted-foreground)]">Select area above</span>;
    if (zone?.is_free) return <span className="text-[color:var(--success)] font-semibold">FREE</span>;
    return <span>{formatKsh(deliveryFee)}</span>;
  };

  // For step 2 review — use serverTotal if available (post-order) else client estimate
  const reviewTotal = serverTotal ?? sub + (deliveryFee ?? 0);
  const reviewFee = serverTotal != null ? reviewTotal - sub : deliveryFee ?? 0;

  return (
    <Shell>
      <div className="max-w-3xl mx-auto px-5 py-12">
        {/* Step indicator */}
        <p className="eyebrow mb-2">Checkout · Step {step} of 3</p>
        <h1 className="font-display text-4xl mb-2">
          {step === 1 ? "Delivery" : step === 2 ? "Review Order" : "Payment"}
        </h1>

        {/* Progress bar */}
        <div className="flex gap-1 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? "bg-[color:var(--rose)]" : "bg-[color:var(--border)]"
              }`}
            />
          ))}
        </div>

        {/* ── Step 1: Contact & Delivery ── */}
        {step === 1 && (
          <form onSubmit={handleSubmit(onDeliverySubmit)} className="card-luxe p-6 space-y-4">
            <p className="eyebrow mb-1">Contact details</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <input className="input-luxe" placeholder="Full name" {...register("fullName")} />
                {errors.fullName && (
                  <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.fullName.message}</p>
                )}
              </div>
              <div>
                <input className="input-luxe" placeholder="Email" type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div>
              <input className="input-luxe" placeholder="Phone (07XX or +2547XX)" {...register("phone")} />
              {errors.phone && (
                <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.phone.message}</p>
              )}
            </div>

            <p className="eyebrow mb-1 pt-2">Delivery method</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setValue("isPickup", false)}
                className={`flex-1 py-3 rounded-md border text-sm transition ${
                  !isPickup
                    ? "border-[color:var(--rose)] text-[color:var(--rose)] bg-[color:var(--rose)]/5"
                    : "border-[color:var(--border)] text-[color:var(--muted-foreground)]"
                }`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setValue("isPickup", true)}
                className={`flex-1 py-3 rounded-md border text-sm transition ${
                  isPickup
                    ? "border-[color:var(--rose)] text-[color:var(--rose)] bg-[color:var(--rose)]/5"
                    : "border-[color:var(--border)] text-[color:var(--muted-foreground)]"
                }`}
              >
                Branch Pickup
              </button>
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
                  {errors.street && (
                    <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.street.message}</p>
                  )}
                </div>
                <div>
                  <select className="input-luxe" {...register("zoneId")}>
                    <option value="">Select delivery area…</option>
                    {zones?.map((z: any) => (
                      <option key={z.id} value={z.id}>
                        {z.name} {z.is_free ? "· FREE" : `· ${formatKsh(z.fee)}`}
                      </option>
                    ))}
                  </select>
                  {errors.zoneId && (
                    <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.zoneId.message}</p>
                  )}
                </div>
                <textarea
                  className="input-luxe resize-none"
                  rows={2}
                  placeholder="Delivery instructions (optional)"
                  {...register("instructions")}
                />
              </>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-[color:var(--border)]">
              <span className="text-sm text-[color:var(--muted-foreground)]">
                Delivery fee: <span className="text-[color:var(--cream)] ml-1">{feeDisplay()}</span>
              </span>
              <button type="submit" className="btn-rose">
                Continue →
              </button>
            </div>
          </form>
        )}

        {/* ── Step 2: Review ── */}
        {step === 2 && deliveryData && (
          <div className="card-luxe p-6 space-y-5">
            {/* Items */}
            <div>
              <p className="eyebrow mb-3">Your items</p>
              <div className="space-y-2">
                {items.map((i) => (
                  <div
                    key={i.productId + i.size + i.color}
                    className="flex items-center gap-3 text-sm"
                  >
                    {i.image && (
                      <img src={i.image} alt={i.name} className="w-10 h-12 object-cover rounded-md shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{i.name}</p>
                      <p className="text-xs text-[color:var(--muted-foreground)]">
                        {[i.size, i.color].filter(Boolean).join(" · ")} · qty {i.quantity}
                      </p>
                    </div>
                    <span className="price shrink-0">{formatKsh(i.unitPrice * i.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost breakdown */}
            <div className="border-t border-[color:var(--border)] pt-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-[color:var(--muted-foreground)]">
                <span>Subtotal</span>
                <span className="price">{formatKsh(sub)}</span>
              </div>
              <div className="flex justify-between text-[color:var(--muted-foreground)]">
                <span>Delivery</span>
                <span className="price">
                  {reviewFee === 0 ? (
                    <span className="text-[color:var(--success)]">FREE</span>
                  ) : (
                    formatKsh(reviewFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-[color:var(--border)]">
                <span className="font-display">Total</span>
                <span className="price text-[color:var(--rose)]">{formatKsh(reviewTotal)}</span>
              </div>
            </div>

            {/* Delivery details */}
            <div className="border-t border-[color:var(--border)] pt-4 text-xs text-[color:var(--muted-foreground)] space-y-1">
              <p className="eyebrow mb-2">Delivery details</p>
              <p>{deliveryData.fullName} · {deliveryData.email} · {deliveryData.phone}</p>
              {deliveryData.isPickup ? (
                <p>Pickup: {deliveryData.branch.charAt(0).toUpperCase() + deliveryData.branch.slice(1)} branch</p>
              ) : (
                <p>Deliver to: {deliveryData.street}{zone?.name ? `, ${zone.name}` : ""}</p>
              )}
            </div>

            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(1)} className="btn-ghost">← Back</button>
              <button onClick={placeOrder} disabled={placing} className="btn-rose">
                {placing ? "Placing order…" : "Continue to Payment →"}
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: M-Pesa ── */}
        {step === 3 && (
          <div className="card-luxe p-6 space-y-5">
            <div className="text-center py-2">
              <p className="eyebrow mb-2">Pay with</p>
              <p className="font-display text-4xl text-[color:var(--mpesa)]">M-PESA</p>
              <p className="text-sm text-[color:var(--muted-foreground)] mt-1">
                Amount: <span className="price text-[color:var(--rose)] font-semibold">{formatKsh(serverTotal ?? 0)}</span>
              </p>
            </div>

            <div>
              <p className="text-xs text-[color:var(--muted-foreground)] mb-1.5">M-Pesa phone number</p>
              <input
                className="input-luxe"
                value={deliveryData?.phone ?? ""}
                readOnly
              />
              <p className="text-xs text-[color:var(--muted-foreground)] mt-1">
                STK push will be sent to this number
              </p>
            </div>

            <button onClick={payMpesa} disabled={paying} className="btn-mpesa">
              {paying
                ? checkoutReqId
                  ? "Awaiting confirmation… check your phone"
                  : "Initiating payment…"
                : `Pay ${formatKsh(serverTotal ?? 0)} via M-Pesa`}
            </button>

            {checkoutReqId && (
              <div className="flex items-center justify-center gap-2 text-xs text-[color:var(--muted-foreground)]">
                <span className="w-2 h-2 rounded-full bg-[color:var(--mpesa)] animate-pulse" />
                Polling for Safaricom confirmation every 5s…
              </div>
            )}

            <p className="text-xs text-center text-[color:var(--muted-foreground)]">
              Enter your M-Pesa PIN on your phone when prompted. Do not close this page.
            </p>
          </div>
        )}
      </div>
    </Shell>
  );
}
