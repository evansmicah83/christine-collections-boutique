import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart, keyOf } from "@/lib/cart-store";
import { formatKsh } from "@/lib/brand";

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove, subtotal } = useCart();
  const sub = subtotal();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] bg-[color:var(--plum-deep)] border-l border-[color:var(--border)] flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-[color:var(--border)]">
              <h2 className="font-display text-xl">Your Bag</h2>
              <button onClick={close} aria-label="Close" className="p-1"><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 && <p className="text-[color:var(--muted-foreground)] text-center py-12">Your bag is empty.</p>}
              {items.map((i) => {
                const k = keyOf(i);
                return (
                  <div key={k} className="flex gap-3">
                    {i.image
                      ? <img src={i.image} alt={i.name} className="w-20 h-24 object-cover rounded-md shrink-0" />
                      : <div className="w-20 h-24 rounded-md bg-[color:var(--muted)] shrink-0" />
                    }
                    <div className="flex-1">
                      <p className="font-medium text-sm">{i.name}</p>
                      <p className="text-xs text-[color:var(--muted-foreground)]">{[i.size, i.color].filter(Boolean).join(" · ")}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button onClick={() => setQty(k, i.quantity - 1)} className="p-1 border border-[color:var(--border)] rounded"><Minus size={12} /></button>
                        <span className="text-sm w-6 text-center">{i.quantity}</span>
                        <button onClick={() => setQty(k, i.quantity + 1)} className="p-1 border border-[color:var(--border)] rounded"><Plus size={12} /></button>
                        <span className="price ml-auto text-[color:var(--rose)] text-sm">{formatKsh(i.unitPrice * i.quantity)}</span>
                        <button onClick={() => remove(k)} className="p-1 text-[color:var(--muted-foreground)] hover:text-[color:var(--destructive)]"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-5 border-t border-[color:var(--border)] space-y-3">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span className="price text-[color:var(--rose)] font-semibold">{formatKsh(sub)}</span></div>
              <p className="text-xs text-[color:var(--muted-foreground)]">Delivery FREE across Nairobi · calculated at checkout for other areas.</p>
              <Link to="/checkout" onClick={close} className="btn-rose w-full justify-center">Proceed to Checkout</Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
