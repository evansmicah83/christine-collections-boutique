import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart, keyOf } from "@/lib/cart-store";
import { formatKsh } from "@/lib/brand";

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove, subtotal } = useCart();
  const sub = subtotal();
  const totalItems = items.reduce((a, i) => a + i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-[color:var(--plum-deep)] border-l border-[color:var(--border)] flex flex-col"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[color:var(--border)] shrink-0">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} className="text-[color:var(--rose)]" />
                <h2 className="font-display text-xl">Your Bag</h2>
                {totalItems > 0 && (
                  <span className="bg-[color:var(--rose)] text-[color:var(--plum-deep)] text-[10px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={close}
                aria-label="Close cart"
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[color:var(--muted)] transition text-[color:var(--muted-foreground)] hover:text-[color:var(--cream)]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items / Empty state */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <EmptyState />
              ) : (
                <ul className="p-5 space-y-4">
                  {items.map((item) => {
                    const k = keyOf(item);
                    return (
                      <motion.li
                        key={k}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-3"
                      >
                        {/* Thumbnail */}
                        <div className="w-[72px] h-[88px] rounded-lg overflow-hidden bg-[color:var(--muted)] shrink-0 border border-[color:var(--border)]">
                          {item.image
                            ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center">
                                <ShoppingBag size={20} className="text-[color:var(--muted-foreground)] opacity-40" />
                              </div>
                          }
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium leading-snug line-clamp-2 pr-1">{item.name}</p>
                            <button
                              onClick={() => remove(k)}
                              aria-label={`Remove ${item.name}`}
                              className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-[color:var(--muted-foreground)] hover:text-[color:var(--destructive)] hover:bg-[color:var(--muted)] transition mt-0.5"
                            >
                              <X size={13} />
                            </button>
                          </div>

                          {/* Size / color */}
                          {(item.size || item.color) && (
                            <p className="text-xs text-[color:var(--muted-foreground)] mt-0.5">
                              {[item.size, item.color].filter(Boolean).join(" · ")}
                            </p>
                          )}

                          {/* Qty + price row */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="inline-flex items-center border border-[color:var(--border)] rounded-lg overflow-hidden">
                              <button
                                onClick={() => item.quantity === 1 ? remove(k) : setQty(k, item.quantity - 1)}
                                aria-label="Decrease quantity"
                                className="w-7 h-7 flex items-center justify-center hover:bg-[color:var(--muted)] transition text-[color:var(--muted-foreground)]"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                              <button
                                onClick={() => setQty(k, item.quantity + 1)}
                                aria-label="Increase quantity"
                                className="w-7 h-7 flex items-center justify-center hover:bg-[color:var(--muted)] transition text-[color:var(--muted-foreground)]"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                            <span className="price text-sm text-[color:var(--rose)] font-semibold ml-auto">
                              {formatKsh(item.unitPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer — only when cart has items */}
            {items.length > 0 && (
              <div className="shrink-0 border-t border-[color:var(--border)] p-5 space-y-3">
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-[color:var(--muted-foreground)]">Subtotal</span>
                  <span className="price text-[color:var(--rose)] font-semibold text-base">{formatKsh(sub)}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-[color:var(--muted-foreground)]">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={close}
                  className="btn-rose w-full justify-center mt-1"
                >
                  Proceed to Checkout <ArrowRight size={15} />
                </Link>
                <button
                  onClick={close}
                  className="w-full text-center text-xs text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)] transition py-1"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[360px] px-8 text-center gap-5">
      {/* Illustrated bag */}
      <div className="relative">
        <div className="w-24 h-24 rounded-2xl bg-[color:var(--rose)]/10 border border-[color:var(--rose)]/20 flex items-center justify-center">
          <ShoppingBag size={40} className="text-[color:var(--rose)]/40" strokeWidth={1.5} />
        </div>
        {/* Decorative dots */}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[color:var(--rose)]/30" />
        <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[color:var(--blush)]/40" />
      </div>

      <div>
        <p className="font-display text-xl mb-1">Your bag is empty</p>
        <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed max-w-[220px] mx-auto">
          Discover something beautiful for your wardrobe.
        </p>
      </div>

      <Link
        to="/shop"
        className="btn-rose px-8"
      >
        Shop the Collection <ArrowRight size={14} />
      </Link>
    </div>
  );
}
