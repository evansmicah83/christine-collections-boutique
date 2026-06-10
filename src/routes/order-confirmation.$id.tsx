import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";
import { Shell } from "@/components/Shell";
import { getOrderById } from "@/lib/orders.functions";
import { formatKsh, whatsappLink } from "@/lib/brand";

export const Route = createFileRoute("/order-confirmation/$id")({ component: Confirm });

function Confirm() {
  const { id } = Route.useParams();
  const { data: order } = useQuery({ queryKey: ["order", id], queryFn: () => getOrderById({ data: { id } }) });
  useEffect(() => { confetti({ particleCount: 120, spread: 80, origin: { y: 0.4 }, colors: ["#C0866A", "#F2D4C8", "#4CAF7D"] }); }, []);
  return (
    <Shell>
      <div className="max-w-2xl mx-auto px-5 py-16 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-[color:var(--success)]/20 flex items-center justify-center mb-6">
          <Check className="text-[color:var(--success)]" size={40} />
        </div>
        <p className="eyebrow mb-2">Thank you</p>
        <h1 className="font-display text-4xl mb-3">Order Confirmed</h1>
        {order && (
          <>
            <p className="order-number text-[color:var(--rose)] text-lg mb-8">{order.order_number}</p>
            <div className="card-luxe p-6 text-left space-y-2 text-sm">
              {order.order_items?.map((it: any) => (
                <div key={it.id} className="flex justify-between"><span>{it.product_name} × {it.quantity}</span><span className="price">{formatKsh(Number(it.unit_price) * it.quantity)}</span></div>
              ))}
              <div className="border-t border-[color:var(--border)] pt-2 mt-2 flex justify-between text-lg">
                <span className="font-display">Total</span>
                <span className="price text-[color:var(--rose)]">{formatKsh(order.total)}</span>
              </div>
            </div>
            <p className="text-sm text-[color:var(--muted-foreground)] mt-4">Estimated delivery: 2–4 business days. We'll WhatsApp you when it ships.</p>
          </>
        )}
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <a href={whatsappLink("I just shopped at Christine Collections 🛍️")} target="_blank" rel="noreferrer" className="btn-ghost">Share on WhatsApp</a>
          <Link to="/shop" className="btn-rose">Continue Shopping</Link>
        </div>
      </div>
    </Shell>
  );
}
