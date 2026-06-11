import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, User, Home, Grid2X2, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart-store";
import { useAuth } from "@/lib/use-auth";

export function Nav() {
  const count = useCart((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const open = useCart((s) => s.open);
  const { user: isLoggedIn, isAdmin } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--plum-deep)_85%,transparent)] border-b border-[color:var(--border)]">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            <Link to="/" className="hover:text-[color:var(--rose)] transition" activeProps={{ className: "text-[color:var(--rose)]" }}>Home</Link>
            <Link to="/shop" className="hover:text-[color:var(--rose)] transition">Shop</Link>
            <a href="/#branches" className="hover:text-[color:var(--rose)] transition">Branches</a>
            {isAdmin && (
              <Link to="/admin" className="text-[color:var(--rose)] font-medium hover:underline transition">Admin</Link>
            )}
          </nav>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Link to="/dashboard" className="hidden md:inline-flex items-center gap-2 text-sm hover:text-[color:var(--rose)] transition">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            ) : (
              <Link to="/auth" className="hidden md:inline-flex items-center gap-2 text-sm hover:text-[color:var(--rose)] transition">
                <User size={18} /> Sign In
              </Link>
            )}
            <button onClick={open} className="relative p-2 hover:text-[color:var(--rose)] transition" aria-label="Open cart">
              <ShoppingBag size={22} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[color:var(--rose)] text-[color:var(--plum-deep)] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{count}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <MobileNav />
    </>
  );
}

function MobileNav() {
  const count = useCart((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const open = useCart((s) => s.open);
  const { user: isLoggedIn } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const itemCls = (active: boolean) =>
    `flex flex-col items-center gap-1 py-2 px-3 transition-colors duration-200 ${
      active ? "text-[color:var(--rose)]" : "text-[color:var(--cream)]/60"
    }`;

  const TAB_ITEMS = [
    { to: "/", label: "Home", icon: Home },
    { to: "/shop", label: "Shop", icon: Grid2X2 },
  ] as const;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[color:var(--border)] bg-[oklch(0.24_0.05_340/0.95)] backdrop-blur-md">
      <div className="grid grid-cols-4 text-[11px] font-medium tracking-wide">

        {TAB_ITEMS.map(({ to, label, icon: Icon }) => {
          const active = isActive(to);
          return (
            <Link key={to} to={to} className={itemCls(active)}>
              <div className="relative">
                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                {active && (
                  <motion.div
                    layoutId="mobile-tab-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[color:var(--rose)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
              <span>{label}</span>
            </Link>
          );
        })}

        {/* Cart tab */}
        <button onClick={open} className={itemCls(false)}>
          <div className="relative">
            <ShoppingBag size={22} strokeWidth={1.8} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-2 -right-2 min-w-[16px] h-4 px-0.5 rounded-full bg-[color:var(--rose)] text-[color:var(--plum-deep)] text-[9px] font-bold flex items-center justify-center"
              >
                {count > 99 ? "99+" : count}
              </motion.span>
            )}
          </div>
          <span>Cart</span>
        </button>

        {/* Account tab */}
        {(() => {
          const to = isLoggedIn ? "/dashboard" : "/auth";
          const label = isLoggedIn ? "Account" : "Sign In";
          const active = isActive(to);
          return (
            <Link to={to} className={itemCls(active)}>
              <div className="relative">
                <User size={22} strokeWidth={active ? 2.5 : 1.8} />
                {active && (
                  <motion.div
                    layoutId="mobile-tab-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[color:var(--rose)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
              <span>{label}</span>
            </Link>
          );
        })()}

      </div>
    </nav>
  );
}
