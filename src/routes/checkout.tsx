import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { MapPin, Clock, ShoppingBag, ChevronRight, Check, Phone } from "lucide-react";
import { Shell } from "@/components/Shell";
import { useCart } from "@/lib/cart-store";
import { formatKsh, isValidKenyaPhone, sanitizePhone } from "@/lib/brand";
import { BRAND } from "@/lib/brand";
import { listDeliveryZones } from "@/lib/catalog.functions";
import { createOrder } from "@/lib/orders.functions";
import { mpesaStkPush, mpesaStatus } from "@/lib/mpesa.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/checkout")({ component: Checkout });

const deliverySchema = z
  .object({
    fullName: z.string().min(2, "Full name required"),
    email: z.string().email("Valid email required"),
    phone: z.string().refine(isValidKenyaPhone, "Enter a valid Kenyan phone (07XX or +2547XX)"),
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

// ── Step indicator ────────────────────────────────────────────────────────────
const STEPS = ["Delivery", "Review", "Payment"] as const;

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center mb-8">
      {STEPS.map((label, idx) => {
        const n = idx + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                done    ? "bg-[color:var(--rose)] border-[color:var(--rose)] text-[color:var(--plum-deep)]"
                : active ? "bg-transparent border-[color:var(--rose)] text-[color:var(--rose)]"
                         : "bg-transparent border-[color:var(--border)] text-[color:var(--muted-foreground)]"
              }`}>
                {done ? <Check size={14} strokeWidth={3} /> : n}
              </div>
              <span className={`text-[10px] tracking-wide uppercase font-medium hidden sm:block ${
                active ? "text-[color:var(--rose)]" : "text-[color:var(--muted-foreground)]"
              }`}>{label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 mb-5 transition-all duration-300 ${
                done ? "bg-[color:var(--rose)]" : "bg-[color:var(--border)]"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Checkout ──────────────────────────────────────────────────────────────────
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
  const [payFailed, setPayFailed] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [serverTotal, setServerTotal] = useState<number | null>(null);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<DeliveryForm>({
      resolver: zodResolver(deliverySchema),
      defaultValues: { isPickup: false, branch: "nairobi", fullName: "", email: "", phone: "", street: "", zoneId: "", instructions: "" },
    });

  const isPickup = watch("isPickup");
  const branch = watch("branch");
  const zoneId = watch("zoneId");
  const zone = zones?.find((z: any) => z.id === zoneId);
  const deliveryFee = isPickup ? 0 : zone ? Number(zone.fee) : null;

  if (items.length === 0 && !orderId) {
    return (
      <Shell>
        <div className="max-w-xl mx-auto px-5 py-24 text-center">
          <ShoppingBag size={48} className="mx-auto mb-4 text-[color:var(--muted-foreground)] opacity-30" strokeWidth={1.5} />
          <h1 className="font-display text-3xl mb-2">Your bag is empty</h1>
          <p className="text-sm text-[color:var(--muted-foreground)] mb-6">Add some pieces before checking out.</p>
          <Link to="/shop" className="btn-rose">Browse the Collection</Link>
        </div>
      </Shell>
    );
  }

  const onDeliverySubmit = (data: DeliveryForm) => {
    setDeliveryData(data);
    setMpesaPhone(data.phone);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeOrder = async () => {
    if (!deliveryData || placing) return;
    setPlacing(true);
    const { data: sess } = await supabase.auth.getSession();
    const userId = sess?.session?.user?.id ?? null;
    try {
      const res = await createOrder({
        data: {
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
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success(`Order ${res.order_number} created`);
    } catch (e: any) {
      toast.error(e.message ?? "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  const startPolling = (reqId: string) => {
    const start = Date.now();
    pollRef.current = setInterval(async () => {
      try {
        const s = await mpesaStatus({ data: { checkoutId: reqId } });
        if (s.paymentStatus === "paid") {
          clearInterval(pollRef.current!); pollRef.current = null;
          clear(); toast.success("Payment confirmed! 🎉");
          nav({ to: "/order-confirmation/$id", params: { id: orderId! } });
        } else if (s.paymentStatus === "failed" || Date.now() - start > 90_000) {
          clearInterval(pollRef.current!); pollRef.current = null;
          setPaying(false); setPayFailed(true);
          toast.error("Payment failed or timed out. Please try again.");
        }
      } catch { /* network blip — keep polling */ }
    }, 5000);
  };

  const payMpesa = async () => {
    if (!orderId || paying) return;
    setPaying(true); setPayFailed(false);
    try {
      const res = await mpesaStkPush({
        data: { orderId, phone: sanitizePhone(mpesaPhone), amount: Math.round(serverTotal ?? 0) },
      });
      if (!res.ok) {
        if ("disabled" in res && res.disabled) {
          toast.warning("M-Pesa not configured yet — order saved as pending. Our team will follow up.");
          clear();
          setTimeout(() => nav({ to: "/order-confirmation/$id", params: { id: orderId! } }), 1400);
          return;
        }
        toast.error(res.message ?? "STK push failed");
        setPaying(false); setPayFailed(true); return;
      }
      setCheckoutReqId(res.checkoutRequestId);
      startPolling(res.checkoutRequestId);
    } catch (e: any) {
      toast.error(e.message);
      setPaying(false); setPayFailed(true);
    }
  };

  const feeDisplay = () => {
    if (isPickup || zone?.is_free) return <span className="text-[color:var(--success)] font-semibold">FREE</span>;
    if (deliveryFee === null) return <span className="text-[color:var(--muted-foreground)] italic">Select area first</span>;
    return <span className="font-semibold">{formatKsh(deliveryFee)}</span>;
  };

  const reviewFee  = serverTotal != null ? (serverTotal - sub) : (deliveryFee ?? 0);
  const reviewTotal = serverTotal ?? sub + (deliveryFee ?? 0);

  const branchInfo = BRAND.branches.find((b) => b.id === branch)!;

  return (
    <Shell>
      <div className="max-w-2xl mx-auto px-5 py-10">
        <StepIndicator current={step} />

        <AnimatePresence mode="wait">

          {/* ── Step 1 ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }}>
              <form onSubmit={handleSubmit(onDeliverySubmit)} className="space-y-5">

                {/* Contact */}
                <section className="card-luxe p-5 space-y-4">
                  <p className="eyebrow">Contact details</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[color:var(--muted-foreground)] mb-1 block">Full name</label>
                      <input className="input-luxe" placeholder="Jane Wanjiru" {...register("fullName")} />
                      {errors.fullName && <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-[color:var(--muted-foreground)] mb-1 block">Email</label>
                      <input className="input-luxe" placeholder="jane@email.com" type="email" {...register("email")} />
                      {errors.email && <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[color:var(--muted-foreground)] mb-1 block">Phone number</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                      <input className="input-luxe pl-9" placeholder="0712 345 678 or +254712345678" {...register("phone")} />
                    </div>
                    {errors.phone && <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.phone.message}</p>}
                  </div>
                </section>

                {/* Delivery method toggle */}
                <section className="card-luxe p-5 space-y-4">
                  <p className="eyebrow">Delivery method</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { val: false, label: "Deliver to me", sub: "Home / office delivery" },
                      { val: true,  label: "Pick up",       sub: "Free branch pickup" },
                    ].map(({ val, label, sub: sublabel }) => (
                      <button key={String(val)} type="button"
                        onClick={() => setValue("isPickup", val)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                          isPickup === val
                            ? "border-[color:var(--rose)] bg-[color:var(--rose)]/8"
                            : "border-[color:var(--border)] hover:border-[color:var(--rose)]/40"
                        }`}>
                        <p className={`text-sm font-medium ${isPickup === val ? "text-[color:var(--rose)]" : ""}`}>{label}</p>
                        <p className="text-xs text-[color:var(--muted-foreground)] mt-0.5">{sublabel}</p>
                      </button>
                    ))}
                  </div>

                  {isPickup ? (
                    <div className="space-y-3">
                      <p className="text-xs text-[color:var(--muted-foreground)]">Select branch</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {BRAND.branches.map((b) => (
                          <button key={b.id} type="button"
                            onClick={() => setValue("branch", b.id)}
                            className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                              branch === b.id
                                ? "border-[color:var(--rose)] bg-[color:var(--rose)]/8"
                                : "border-[color:var(--border)] hover:border-[color:var(--rose)]/40"
                            }`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${branch === b.id ? "bg-[color:var(--rose)]" : "bg-[color:var(--muted-foreground)]"}`} />
                              <p className={`text-sm font-medium ${branch === b.id ? "text-[color:var(--rose)]" : ""}`}>{b.name}</p>
                            </div>
                            <p className="flex items-center gap-1 text-xs text-[color:var(--muted-foreground)]">
                              <MapPin size={11} /> {b.address}
                            </p>
                            <p className="flex items-center gap-1 text-xs text-[color:var(--muted-foreground)] mt-0.5">
                              <Clock size={11} /> {b.hours}
                            </p>
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[color:var(--success)] bg-[color:var(--success)]/10 border border-[color:var(--success)]/20 rounded-lg px-3 py-2">
                        <Check size={12} /> Pickup is always free — no delivery charge
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-[color:var(--muted-foreground)] mb-1 block">Street address</label>
                        <input className="input-luxe" placeholder="e.g. 14 Ngong Road, Apartment 3B" {...register("street")} />
                        {errors.street && <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.street.message}</p>}
                      </div>
                      <div>
                        <label className="text-xs text-[color:var(--muted-foreground)] mb-1 block">Delivery area</label>
                        <select className="input-luxe" {...register("zoneId")}>
                          <option value="">Select your area…</option>
                          {zones?.map((z: any) => (
                            <option key={z.id} value={z.id}>
                              {z.name}{z.is_free ? " — FREE" : ` — ${formatKsh(z.fee)}`}
                            </option>
                          ))}
                        </select>
                        {errors.zoneId && <p className="text-xs text-[color:var(--destructive)] mt-1">{errors.zoneId.message}</p>}
                      </div>

                      {/* Live fee preview */}
                      {zoneId && (
                        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                          className={`flex items-center gap-2 text-xs rounded-lg px-3 py-2 border ${
                            zone?.is_free
                              ? "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20"
                              : "text-[color:var(--cream)] bg-[color:var(--muted)]/40 border-[color:var(--border)]"
                          }`}>
                          <MapPin size={11} />
                          Delivery to {zone?.name}: {feeDisplay()}
                        </motion.div>
                      )}

                      <div>
                        <label className="text-xs text-[color:var(--muted-foreground)] mb-1 block">Special instructions <span className="opacity-50">(optional)</span></label>
                        <textarea className="input-luxe resize-none" rows={2}
                          placeholder="Gate code, landmark, preferred drop-off point…"
                          {...register("instructions")} />
                      </div>
                    </div>
                  )}
                </section>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-[color:var(--muted-foreground)]">
                    Delivery fee: <span className="text-[color:var(--cream)]">{feeDisplay()}</span>
                  </span>
                  <button type="submit" className="btn-rose">
                    Review Order <ChevronRight size={15} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && deliveryData && (
            <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }}>
              <div className="space-y-4">

                {/* Items */}
                <section className="card-luxe p-5">
                  <p className="eyebrow mb-4">Your items ({items.length})</p>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.productId + item.size + item.color} className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-lg overflow-hidden bg-[color:var(--muted)] shrink-0 border border-[color:var(--border)]">
                          {item.image
                            ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center"><ShoppingBag size={14} className="opacity-30" /></div>
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-[color:var(--muted-foreground)]">
                            {[item.size, item.color].filter(Boolean).join(" · ")}
                            {" · "}qty {item.quantity}
                          </p>
                        </div>
                        <span className="price text-sm text-[color:var(--rose)] shrink-0">{formatKsh(item.unitPrice * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Delivery summary */}
                <section className="card-luxe p-5">
                  <p className="eyebrow mb-3">Delivery details</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{deliveryData.fullName}</p>
                    <p className="text-[color:var(--muted-foreground)] text-xs">{deliveryData.email} · {deliveryData.phone}</p>
                    {deliveryData.isPickup ? (
                      <div className="flex items-start gap-2 mt-2 text-xs text-[color:var(--muted-foreground)]">
                        <MapPin size={12} className="mt-0.5 shrink-0 text-[color:var(--rose)]" />
                        <span>Pickup at {branchInfo?.name} · {branchInfo?.address}</span>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 mt-2 text-xs text-[color:var(--muted-foreground)]">
                        <MapPin size={12} className="mt-0.5 shrink-0 text-[color:var(--rose)]" />
                        <span>{deliveryData.street}{zone?.name ? `, ${zone.name}` : ""}</span>
                      </div>
                    )}
                  </div>
                </section>

                {/* Cost breakdown */}
                <section className="card-luxe p-5">
                  <p className="eyebrow mb-4">Cost breakdown</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[color:var(--muted-foreground)]">
                      <span>Subtotal</span><span className="price">{formatKsh(sub)}</span>
                    </div>
                    <div className="flex justify-between text-[color:var(--muted-foreground)]">
                      <span>Delivery</span>
                      <span className="price">
                        {reviewFee === 0 ? <span className="text-[color:var(--success)]">FREE</span> : formatKsh(reviewFee)}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-base pt-2 border-t border-[color:var(--border)] mt-2">
                      <span className="font-display">Total</span>
                      <span className="price text-[color:var(--rose)]">{formatKsh(reviewTotal)}</span>
                    </div>
                  </div>
                </section>

                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="btn-ghost">← Back</button>
                  <button onClick={placeOrder} disabled={placing} className="btn-rose">
                    {placing ? "Placing order…" : <>Proceed to Payment <ChevronRight size={15} /></>}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 3 ── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }}>
              <div className="card-luxe overflow-hidden">
                {/* M-Pesa branded header */}
                <div className="bg-[#4CAF50]/10 border-b border-[#4CAF50]/20 px-6 py-5 text-center">
                  <div className="flex items-center justify-center gap-3 mb-1">
                    {/* M-Pesa logo mark */}
                    <div className={`w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center shrink-0 ${paying && checkoutReqId ? "animate-pulse" : ""}`}>
                      <span className="text-white font-bold text-xs leading-none">M</span>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-[#4CAF50] text-lg leading-none tracking-wide">M-PESA</p>
                      <p className="text-xs text-[color:var(--muted-foreground)]">Safaricom · Secure payment</p>
                    </div>
                  </div>
                  <p className="font-display text-3xl text-[color:var(--cream)] mt-3">
                    {formatKsh(serverTotal ?? 0)}
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  {/* Editable M-Pesa phone */}
                  <div>
                    <label className="text-xs text-[color:var(--muted-foreground)] mb-1.5 block">
                      M-Pesa phone number
                    </label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                      <input
                        className="input-luxe pl-9"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        placeholder="0712 345 678"
                        disabled={paying}
                      />
                    </div>
                    <p className="text-xs text-[color:var(--muted-foreground)] mt-1">
                      The STK push prompt will appear on this phone
                    </p>
                  </div>

                  {/* Pay / Retry button */}
                  <button
                    onClick={payMpesa}
                    disabled={paying && !payFailed}
                    className="w-full py-4 rounded-xl font-bold text-white text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-3"
                    style={{ background: paying && checkoutReqId ? "#2e7d32" : "#4CAF50" }}
                  >
                    {paying && checkoutReqId ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        Check your Safaricom phone…
                      </>
                    ) : payFailed ? (
                      "Retry Payment"
                    ) : (
                      `Pay ${formatKsh(serverTotal ?? 0)} via M-Pesa`
                    )}
                  </button>

                  {/* Status messages */}
                  <AnimatePresence>
                    {paying && checkoutReqId && (
                      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-2 text-center">
                        <p className="text-sm text-[color:var(--muted-foreground)]">
                          Enter your <span className="text-[color:var(--cream)] font-medium">M-Pesa PIN</span> on your phone when prompted.
                        </p>
                        <p className="text-xs text-[color:var(--muted-foreground)] animate-pulse">
                          Waiting for confirmation · checking every 5s · times out after 90s
                        </p>
                      </motion.div>
                    )}
                    {payFailed && (
                      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-xs text-center text-[color:var(--destructive)] bg-[color:var(--destructive)]/10 border border-[color:var(--destructive)]/20 rounded-lg px-4 py-2">
                        Payment failed or timed out. Check your phone and tap Retry.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="text-xs text-center text-[color:var(--muted-foreground)]">
                    Do not close this page while payment is processing.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </Shell>
  );
}
