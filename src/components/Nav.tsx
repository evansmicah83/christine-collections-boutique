import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag, User, Home, Store, LayoutDashboard } from "lucide-react";
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
            {!isLoggedIn && (
              <a href="/admin-login" className="text-xs text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)] transition">Staff login</a>
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[color:var(--plum-deep)] border-t border-[color:var(--border)]">
        <div className="grid grid-cols-4 text-xs">
          <Link to="/" className="flex flex-col items-center py-3 gap-1"><Home size={20} /> Home</Link>
          <Link to="/shop" className="flex flex-col items-center py-3 gap-1"><Store size={20} /> Shop</Link>
          <button onClick={open} className="flex flex-col items-center py-3 gap-1 relative">
            <ShoppingBag size={20} /> Cart
            {count > 0 && <span className="absolute top-1 right-6 bg-[color:var(--rose)] text-[color:var(--plum-deep)] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{count}</span>}
          </button>
          {isAdmin
            ? <Link to="/admin" className="flex flex-col items-center py-3 gap-1 text-[color:var(--rose)]"><LayoutDashboard size={20} /> Admin</Link>
            : <Link to={isLoggedIn ? "/dashboard" : "/auth"} className="flex flex-col items-center py-3 gap-1"><User size={20} /> {isLoggedIn ? "Account" : "Sign In"}</Link>
          }
        </div>
      </nav>
    </>
  );
}
