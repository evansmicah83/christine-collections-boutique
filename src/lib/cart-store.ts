import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string | null;
  unitPrice: number;
  size: string | null;
  color: string | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  lastAdded: number | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (item: CartItem) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
};

export const keyOf = (i: Pick<CartItem, "productId" | "size" | "color">) =>
  `${i.productId}|${i.size ?? ""}|${i.color ?? ""}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAdded: null,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      add: (item) =>
        set((s) => {
          const k = keyOf(item);
          const existing = s.items.find((i) => keyOf(i) === k);
          if (existing) {
            return { items: s.items.map((i) => (keyOf(i) === k ? { ...i, quantity: i.quantity + item.quantity } : i)), lastAdded: Date.now() };
          }
          return { items: [...s.items, item], lastAdded: Date.now() };
        }),
      remove: (k) => set((s) => ({ items: s.items.filter((i) => keyOf(i) !== k) })),
      setQty: (k, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (keyOf(i) === k ? { ...i, quantity: Math.max(1, qty) } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((a, i) => a + i.unitPrice * i.quantity, 0),
      count: () => get().items.reduce((a, i) => a + i.quantity, 0),
    }),
    { name: "cc-cart", partialize: (s) => ({ items: s.items }) }
  )
);
