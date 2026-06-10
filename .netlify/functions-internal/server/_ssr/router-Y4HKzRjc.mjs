import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQuery, a as useSuspenseQuery, q as queryOptions, b as useMutation, c as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, L as Link, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound, S as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { c as create, p as persist } from "../_libs/zustand.mjs";
import { s as supabase } from "./client-D754LGD5.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-E4TCSJHj.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CmpvfGuK.mjs";
import { c as confetti } from "../_libs/canvas-confetti.mjs";
import "../_libs/seroval.mjs";
import { C as Check, M as Mail, L as Lock, E as EyeOff, a as Eye, U as User, A as ArrowRight, T as Truck, S as ShieldCheck, R as RefreshCw, H as Headphones, Q as Quote, b as MapPin, c as SlidersHorizontal, X, Z as ZoomIn, d as Minus, P as Plus, e as ShoppingBag, f as Package, g as LogOut, h as Menu, i as ChevronUp, j as ChevronDown, k as Phone, l as LayoutDashboard, m as Tag, n as Star, o as Zap, p as House, q as Store, r as Trash2, s as ArrowUp, t as TriangleAlert, u as ShieldAlert, v as Search, I as Image, w as Pencil, x as Upload } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { R as ResponsiveContainer, L as LineChart, X as XAxis, Y as YAxis, T as Tooltip, a as Line } from "../_libs/recharts.mjs";
import { o as objectType, e as enumType, s as stringType, b as booleanType, n as numberType, c as arrayType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const appCss = "/assets/styles-pSfFTsRP.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl text-[color:var(--rose)]", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[color:var(--muted-foreground)]", children: "This page wandered off the runway." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "btn-rose mt-6 inline-flex", children: "Back home" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "root" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[color:var(--muted-foreground)] text-sm", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
      router.invalidate();
      reset();
    }, className: "btn-rose mt-6", children: "Try again" })
  ] }) });
}
const Route$b = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Christine Collections — Dress Your Story" },
      { name: "description", content: "Premium Kenyan boutique. Free delivery across Nairobi. Branches in Nairobi & Makueni." },
      { property: "og:title", content: "Christine Collections — Dress Your Story" },
      { property: "og:description", content: "Premium Kenyan boutique. Free delivery across Nairobi. Branches in Nairobi & Makueni." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Christine Collections — Dress Your Story" },
      { name: "twitter:description", content: "Premium Kenyan boutique. Free delivery across Nairobi. Branches in Nairobi & Makueni." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/81c740d3-1f28-4716-8044-3b8094338917/id-preview-882e4e82--f6e4399d-620d-4afd-a49e-be957dec7ddd.lovable.app-1780938530997.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/81c740d3-1f28-4716-8044-3b8094338917/id-preview-882e4e82--f6e4399d-620d-4afd-a49e-be957dec7ddd.lovable.app-1780938530997.png" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&family=Courier+Prime:wght@400;700&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
function Logo({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: `inline-flex items-center gap-3 ${className}`, "aria-label": "Christine Collections", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", fill: "none", "aria-hidden": true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "rg", x1: "0", y1: "0", x2: "1", y2: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#D9A688" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#A66B50" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 6 L24 12 L20 14 L16 12 Z", fill: "url(#rg)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 14 V18", stroke: "url(#rg)", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M30 30 C30 21 25 17 20 17 C15 17 10 21 10 30", stroke: "url(#rg)", strokeWidth: "2.5", fill: "none", strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "leading-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-display text-xl tracking-wide", children: "Christine" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[0.6rem] tracking-[0.32em] uppercase text-[color:var(--rose-soft)] font-light", children: "Collections" })
    ] })
  ] });
}
const keyOf = (i) => `${i.productId}|${i.size ?? ""}|${i.color ?? ""}`;
const useCart = create()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAdded: null,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      add: (item) => set((s) => {
        const k = keyOf(item);
        const existing = s.items.find((i) => keyOf(i) === k);
        if (existing) {
          return { items: s.items.map((i) => keyOf(i) === k ? { ...i, quantity: i.quantity + item.quantity } : i), lastAdded: Date.now() };
        }
        return { items: [...s.items, item], lastAdded: Date.now() };
      }),
      remove: (k) => set((s) => ({ items: s.items.filter((i) => keyOf(i) !== k) })),
      setQty: (k, qty) => set((s) => ({
        items: s.items.map((i) => keyOf(i) === k ? { ...i, quantity: Math.max(1, qty) } : i).filter((i) => i.quantity > 0)
      })),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((a, i) => a + i.unitPrice * i.quantity, 0),
      count: () => get().items.reduce((a, i) => a + i.quantity, 0)
    }),
    { name: "cc-cart" }
  )
);
const roleCache = /* @__PURE__ */ new Map();
async function checkAdmin(userId) {
  if (roleCache.has(userId)) return roleCache.get(userId);
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  const result = !!data;
  roleCache.set(userId, result);
  return result;
}
function useAuth() {
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        setUser(null);
        setIsAdmin(false);
      } else {
        setUser(data.user);
        checkAdmin(data.user.id).then(setIsAdmin);
      }
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        const u2 = session?.user ?? null;
        setUser(u2);
        if (u2) checkAdmin(u2.id).then(setIsAdmin);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
        setIsAdmin(false);
        roleCache.clear();
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  return { user, loading, isAdmin };
}
function Nav() {
  const count = useCart((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const open = useCart((s) => s.open);
  const { user: isLoggedIn, isAdmin } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--plum-deep)_85%,transparent)] border-b border-[color:var(--border)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-5 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-8 text-sm tracking-wide", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-[color:var(--rose)] transition", activeProps: { className: "text-[color:var(--rose)]" }, children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-[color:var(--rose)] transition", children: "Shop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#branches", className: "hover:text-[color:var(--rose)] transition", children: "Branches" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "text-[color:var(--rose)] font-medium hover:underline transition", children: "Admin" }),
        !isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin-login", className: "text-xs text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)] transition", children: "Staff login" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "hidden md:inline-flex items-center gap-2 text-sm hover:text-[color:var(--rose)] transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 18 }),
          " Dashboard"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth", className: "hidden md:inline-flex items-center gap-2 text-sm hover:text-[color:var(--rose)] transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18 }),
          " Sign In"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: open, className: "relative p-2 hover:text-[color:var(--rose)] transition", "aria-label": "Open cart", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 22 }),
          count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 bg-[color:var(--rose)] text-[color:var(--plum-deep)] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center", children: count })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[color:var(--plum-deep)] border-t border-[color:var(--border)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex flex-col items-center py-3 gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 20 }),
        " Home"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "flex flex-col items-center py-3 gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 20 }),
        " Shop"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: open, className: "flex flex-col items-center py-3 gap-1 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 20 }),
        " Cart",
        count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1 right-6 bg-[color:var(--rose)] text-[color:var(--plum-deep)] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center", children: count })
      ] }),
      isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "flex flex-col items-center py-3 gap-1 text-[color:var(--rose)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 20 }),
        " Admin"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: isLoggedIn ? "/dashboard" : "/auth", className: "flex flex-col items-center py-3 gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 20 }),
        " ",
        isLoggedIn ? "Account" : "Sign In"
      ] })
    ] }) })
  ] });
}
const BRAND = {
  name: "Christine Collections",
  tagline: "Dress Your Story",
  whatsapp: "+254700000000",
  branches: [
    { id: "nairobi", name: "Nairobi Boutique", address: "Westlands, Nairobi", hours: "Mon–Sat • 10am–7pm" },
    { id: "makueni", name: "Makueni Boutique", address: "Wote Town, Makueni", hours: "Mon–Sat • 9am–6pm" }
  ]
};
const formatKsh = (n) => {
  const v = typeof n === "string" ? parseFloat(n) : n ?? 0;
  return "KSh " + (v || 0).toLocaleString("en-KE", { maximumFractionDigits: 0 });
};
const sanitizePhone = (raw) => {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return "254" + digits.slice(1);
  if (digits.startsWith("7") || digits.startsWith("1")) return "254" + digits;
  return digits;
};
const isValidKenyaPhone = (raw) => {
  const s = sanitizePhone(raw);
  return /^254[71]\d{8}$/.test(s);
};
const whatsappLink = (text = "") => `https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-[color:var(--border)] mt-24 py-12 px-5 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl mb-2", children: BRAND.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[color:var(--muted-foreground)]", children: [
          BRAND.tagline,
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Branches" }),
        BRAND.branches.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: b.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[color:var(--muted-foreground)] text-xs", children: [
            b.address,
            " · ",
            b.hours
          ] })
        ] }, b.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Stay in touch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[color:var(--muted-foreground)]", children: [
          "WhatsApp: ",
          BRAND.whatsapp
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-[color:var(--muted-foreground)] mt-8", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      BRAND.name,
      ". Handmade in Kenya."
    ] })
  ] });
}
function CartDrawer() {
  const { isOpen, close, items, setQty, remove, subtotal } = useCart();
  const sub = subtotal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: close,
        className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.aside,
      {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { type: "spring", damping: 28, stiffness: 240 },
        className: "fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] bg-[color:var(--plum-deep)] border-l border-[color:var(--border)] flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 border-b border-[color:var(--border)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Your Bag" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: close, "aria-label": "Close", className: "p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-5 space-y-4", children: [
            items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[color:var(--muted-foreground)] text-center py-12", children: "Your bag is empty." }),
            items.map((i) => {
              const k = keyOf(i);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                i.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: i.image, alt: i.name, className: "w-20 h-24 object-cover rounded-md shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-24 rounded-md bg-[color:var(--muted)] shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: i.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--muted-foreground)]", children: [i.size, i.color].filter(Boolean).join(" · ") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(k, i.quantity - 1), className: "p-1 border border-[color:var(--border)] rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm w-6 text-center", children: i.quantity }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(k, i.quantity + 1), className: "p-1 border border-[color:var(--border)] rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price ml-auto text-[color:var(--rose)] text-sm", children: formatKsh(i.unitPrice * i.quantity) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(k), className: "p-1 text-[color:var(--muted-foreground)] hover:text-[color:var(--destructive)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }) })
                  ] })
                ] })
              ] }, k);
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-t border-[color:var(--border)] space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price text-[color:var(--rose)] font-semibold", children: formatKsh(sub) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--muted-foreground)]", children: "Delivery FREE across Nairobi · calculated at checkout for other areas." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", onClick: close, className: "btn-rose w-full justify-center", children: "Proceed to Checkout" })
          ] })
        ]
      }
    )
  ] }) });
}
function WhatsAppButton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href: whatsappLink("Hi Christine Collections, I'd like to ask about "),
      target: "_blank",
      rel: "noreferrer",
      "aria-label": "Chat on WhatsApp",
      className: "fixed bottom-24 md:bottom-6 right-5 z-30 w-14 h-14 rounded-full shadow-lg hover:scale-110 transition animate-float flex items-center justify-center",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 48 48", width: "56", height: "56", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "24", cy: "24", r: "24", fill: "#25D366" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            fill: "white",
            d: "M24 10.5C16.544 10.5 10.5 16.544 10.5 24c0 2.385.638 4.735 1.85 6.8L10.5 37.5l6.9-1.814A13.44 13.44 0 0 0 24 37.5c7.456 0 13.5-6.044 13.5-13.5S31.456 10.5 24 10.5zm6.54 18.418c-.276.776-1.607 1.482-2.196 1.537-.561.052-1.09.264-3.666-.763-3.097-1.232-5.07-4.394-5.224-4.6-.152-.204-1.24-1.65-1.24-3.148 0-1.498.784-2.234 1.063-2.538a1.12 1.12 0 0 1 .812-.38c.203 0 .405.004.582.012.187.009.437-.071.683.521.256.614.87 2.112.945 2.267.076.155.127.337.025.541-.1.203-.15.33-.298.508-.15.178-.314.398-.448.534-.149.149-.304.31-.13.608.172.298.766 1.263 1.644 2.046 1.129 1.007 2.08 1.318 2.378 1.467.298.149.472.124.647-.075.176-.198.748-.874.948-1.173.198-.298.397-.248.669-.149.273.1 1.732.817 2.03.966.298.149.497.223.571.347.075.124.075.714-.2 1.49z"
          }
        )
      ] })
    }
  );
}
function FloatingCart() {
  const { items, open, lastAdded } = useCart();
  const count = items.reduce((a, i) => a + i.quantity, 0);
  const [visible, setVisible] = reactExports.useState(false);
  const [bump, setBump] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!lastAdded) return;
    setVisible(true);
    setBump(true);
    const bumpTimer = setTimeout(() => setBump(false), 400);
    const hideTimer = setTimeout(() => setVisible(false), 6e3);
    return () => {
      clearTimeout(bumpTimer);
      clearTimeout(hideTimer);
    };
  }, [lastAdded]);
  if (!visible || count === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: open,
      "aria-label": "Open cart",
      className: `fixed bottom-40 md:bottom-24 right-4 z-30 flex items-center gap-2 pl-3 pr-2.5 h-10 rounded-full bg-[color:var(--rose)] text-[color:var(--plum-deep)] shadow-lg transition-all duration-300 ${bump ? "scale-110" : "scale-100"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14, strokeWidth: 2.5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold tracking-wide", children: [
          count,
          " ",
          count === 1 ? "item" : "items"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-[color:var(--plum-deep)] text-[color:var(--rose)] text-[10px] font-bold flex items-center justify-center", children: count })
      ]
    }
  );
}
function BackToTop() {
  const [v, setV] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const f = () => setV(window.scrollY > 600);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  if (!v) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      className: "fixed bottom-40 md:bottom-40 left-4 md:left-auto md:right-5 z-30 w-9 h-9 rounded-full bg-[color:var(--card)] border border-[color:var(--border)] flex items-center justify-center hover:border-[color:var(--rose)] transition",
      "aria-label": "Back to top",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { size: 14 })
    }
  );
}
let _openConfirm = null;
function confirm(opts2) {
  if (!_openConfirm) return Promise.resolve(false);
  return _openConfirm(opts2);
}
function ConfirmModalProvider() {
  const [state, setState] = reactExports.useState(null);
  const [shake, setShake] = reactExports.useState(false);
  _openConfirm = reactExports.useCallback(
    (opts2) => new Promise((resolve) => {
      setState({ ...opts2, resolve });
    }),
    []
  );
  const close = (value) => {
    state?.resolve(value);
    setState(null);
  };
  const onBackdrop = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: state && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onBackdrop,
        className: "fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1, x: shake ? [0, -8, 8, -6, 6, 0] : 0 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.2 },
        className: "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md bg-[#1A0F1B] border-t-2 border-[color:var(--rose)] rounded-2xl p-6 shadow-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 18, className: "text-red-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl mb-1", children: state.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[color:var(--muted-foreground)] leading-relaxed", children: state.body })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => close(false), className: "btn-ghost text-sm py-2 px-5", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => close(true),
                className: state.confirmClass ?? "text-sm py-2 px-5 rounded-full font-semibold bg-red-500 hover:bg-red-600 text-white transition",
                children: state.confirmLabel ?? "Confirm"
              }
            )
          ] })
        ]
      }
    )
  ] }) });
}
function SessionExpiredModal() {
  const [show, setShow] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "TOKEN_REFRESHED") setShow(false);
      if (event === "SIGNED_OUT") {
        supabase.auth.getSession().then(({ data }) => {
          if (!data.session) setShow(true);
        });
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  const handleLogin = () => {
    setShow(false);
    window.location.href = "/auth";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: show && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "fixed inset-0 z-[200] bg-black/80 backdrop-blur-md"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-sm bg-[#1A0F1B] border-t-2 border-[color:var(--rose)] rounded-2xl p-8 shadow-2xl text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-[color:var(--rose)]/15 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 26, className: "text-[color:var(--rose)]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl mb-2", children: "Session expired" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[color:var(--muted-foreground)] leading-relaxed mb-6", children: "Your session has timed out for security. Please log in again to continue — your cart is saved." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogin, className: "btn-rose w-full justify-center", children: "Log In Again" })
        ]
      }
    )
  ] }) });
}
function Shell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 pb-16 md:pb-0", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartDrawer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppButton, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingCart, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackToTop, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmModalProvider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SessionExpiredModal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { theme: "dark", position: "top-right", toastOptions: { style: { background: "var(--card)", color: "var(--cream)", border: "1px solid var(--border)" } } })
  ] });
}
function ProductCard({ p, index = 0 }) {
  const img = p.images?.[0] ?? "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800";
  const onSale = p.compare_price && Number(p.compare_price) > Number(p.price);
  const outOfStock = p.stock_quantity === 0;
  const add = useCart((s) => s.add);
  const nav = useNavigate();
  const handleAdd = (e, buyNow = false) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    add({
      productId: p.id,
      slug: p.slug,
      name: p.name,
      image: img,
      unitPrice: Number(p.price),
      size: p.sizes?.[0] ?? null,
      color: p.colors?.[0] ?? null,
      quantity: 1
    });
    toast.success("Added to bag");
    if (buyNow) nav({ to: "/checkout" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.5, delay: index % 8 * 0.06 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe overflow-hidden flex flex-col cursor-pointer h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop/$slug", params: { slug: p.slug }, className: "block relative overflow-hidden shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] bg-[color:var(--muted)] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: img,
              alt: p.name,
              loading: "lazy",
              className: "w-full h-full object-cover transition duration-700 hover:scale-105"
            }
          ) }),
          onSale && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 left-2 chip text-[10px] px-2 py-0.5", children: "Sale" }),
          outOfStock && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 chip text-[10px] px-2 py-0.5 bg-[color:var(--muted)] border-[color:var(--border)] text-[color:var(--muted-foreground)]", children: "Sold out" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 md:p-4 flex flex-col gap-1 flex-1", children: [
          p.branch !== "both" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip self-start text-[10px] px-2 py-0.5", children: p.branch }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$slug", params: { slug: p.slug }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm md:text-base leading-snug hover:text-[color:var(--rose)] transition line-clamp-2", children: p.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-1 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price text-sm md:text-base text-[color:var(--rose)] font-semibold whitespace-nowrap", children: formatKsh(p.price) }),
            onSale && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price text-[11px] line-through text-[color:var(--muted-foreground)] whitespace-nowrap", children: formatKsh(p.compare_price) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: (e) => handleAdd(e, false),
                disabled: outOfStock,
                className: "flex-1 flex items-center justify-center gap-1 bg-[color:var(--rose)] text-[color:var(--plum-deep)] font-semibold text-[11px] md:text-xs tracking-wide uppercase rounded-full py-2 px-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 11, strokeWidth: 2.5 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: outOfStock ? "Sold out" : "Add to Bag" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: (e) => handleAdd(e, true),
                disabled: outOfStock,
                title: "Buy Now",
                className: "flex items-center justify-center gap-1 border border-[color:var(--rose)]/50 text-[color:var(--cream)] text-[11px] md:text-xs tracking-wide uppercase rounded-full py-2 px-2.5 md:px-4 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed hover:border-[color:var(--rose)] hover:bg-[color:var(--rose)]/10 transition",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 11, strokeWidth: 2.5, className: "md:hidden" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:inline", children: "Buy Now" })
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const listProducts = createServerFn({
  method: "GET"
}).validator(objectType({
  categorySlug: stringType().optional(),
  featured: booleanType().optional(),
  branch: stringType().optional()
}).optional()).handler(createSsrRpc("ec305e715d428bd5a056174d65530dc3f73a4aae7224baa7e85f3de5db811249"));
const getProduct = createServerFn({
  method: "GET"
}).validator(objectType({
  slug: stringType().min(1)
})).handler(createSsrRpc("8fcb0253bf3c1c167b9da7ce06410812f0527d2f561cf0a09fe48379367bcb16"));
const listCategories = createServerFn({
  method: "GET"
}).handler(createSsrRpc("9093087a4fde30e7cbeefd735d6dccc2718ef5ec811563a10f9b01884489c6f6"));
const listDeliveryZones = createServerFn({
  method: "GET"
}).handler(createSsrRpc("66f2c0628bd74497e0aeab4851b15256225c2ab5d34f9d0cb1ebd04510b72c32"));
const searchSchema = objectType({
  category: stringType().optional(),
  sort: enumType(["new", "low", "high"]).optional()
}).parse;
const prodOpts = queryOptions({ queryKey: ["products-all"], queryFn: () => listProducts({ data: {} }) });
const catOpts = queryOptions({ queryKey: ["cats"], queryFn: () => listCategories() });
const Route$a = createFileRoute("/shop")({
  validateSearch: (s) => searchSchema(s),
  loader: async ({ context }) => {
    await Promise.all([context.queryClient.ensureQueryData(prodOpts), context.queryClient.ensureQueryData(catOpts)]);
  },
  component: Shop
});
const PAGE_SIZE = 12;
function Shop() {
  const sp = Route$a.useSearch();
  useNavigate();
  const { data: products } = useSuspenseQuery(prodOpts);
  const { data: cats } = useSuspenseQuery(catOpts);
  const [cat, setCat] = reactExports.useState(sp.category);
  const [branch, setBranch] = reactExports.useState("all");
  const [sort, setSort] = reactExports.useState(sp.sort ?? "new");
  const [sizes, setSizes] = reactExports.useState([]);
  const [colors, setColors] = reactExports.useState([]);
  const [maxPrice, setMaxPrice] = reactExports.useState(2e4);
  const [page, setPage] = reactExports.useState(1);
  const [mobileFilters, setMobileFilters] = reactExports.useState(false);
  const allSizes = reactExports.useMemo(() => [...new Set(products.flatMap((p) => p.sizes ?? []))], [products]);
  const allColors = reactExports.useMemo(() => [...new Set(products.flatMap((p) => p.colors ?? []))], [products]);
  const priceMax = reactExports.useMemo(() => Math.max(...products.map((p) => Number(p.price)), 1e3), [products]);
  const filtered = reactExports.useMemo(() => {
    let r = [...products];
    if (cat) r = r.filter((p) => p.categories?.slug === cat);
    if (branch !== "all") r = r.filter((p) => p.branch === branch || p.branch === "both");
    if (sizes.length) r = r.filter((p) => sizes.some((s) => p.sizes?.includes(s)));
    if (colors.length) r = r.filter((p) => colors.some((c) => p.colors?.includes(c)));
    r = r.filter((p) => Number(p.price) <= maxPrice);
    if (sort === "low") r.sort((a, b) => Number(a.price) - Number(b.price));
    else if (sort === "high") r.sort((a, b) => Number(b.price) - Number(a.price));
    return r;
  }, [products, cat, branch, sizes, colors, maxPrice, sort]);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const toggleSize = (s) => {
    setSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
    setPage(1);
  };
  const toggleColor = (c) => {
    setColors((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
    setPage(1);
  };
  const activeFilters = [
    cat && { label: cats.find((c) => c.slug === cat)?.name ?? cat, clear: () => {
      setCat(void 0);
      setPage(1);
    } },
    branch !== "all" && { label: branch.charAt(0).toUpperCase() + branch.slice(1), clear: () => {
      setBranch("all");
      setPage(1);
    } },
    ...sizes.map((s) => ({ label: `Size: ${s}`, clear: () => toggleSize(s) })),
    ...colors.map((c) => ({ label: `Color: ${c}`, clear: () => toggleColor(c) })),
    maxPrice < priceMax && { label: `Max KSh ${maxPrice.toLocaleString()}`, clear: () => {
      setMaxPrice(priceMax);
      setPage(1);
    } }
  ].filter(Boolean);
  const Filters = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setCat(void 0);
          setPage(1);
        }, className: `block w-full text-left text-sm py-1.5 px-2 rounded hover:bg-[color:var(--muted)] ${!cat ? "text-[color:var(--rose)]" : ""}`, children: "All" }),
        cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setCat(c.slug);
          setPage(1);
        }, className: `block w-full text-left text-sm py-1.5 px-2 rounded hover:bg-[color:var(--muted)] ${cat === c.slug ? "text-[color:var(--rose)]" : ""}`, children: c.name }, c.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Branch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: branch, onChange: (e) => {
        setBranch(e.target.value);
        setPage(1);
      }, className: "input-luxe text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All branches" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "nairobi", children: "Nairobi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "makueni", children: "Makueni" })
      ] })
    ] }),
    allSizes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Size" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: allSizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleSize(s), className: `px-3 py-1.5 text-xs rounded-md border transition ${sizes.includes(s) ? "border-[color:var(--rose)] text-[color:var(--rose)] bg-[color:var(--rose)]/10" : "border-[color:var(--border)]"}`, children: s }, s)) })
    ] }),
    allColors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Color" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: allColors.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleColor(c), className: `px-3 py-1.5 text-xs rounded-full border transition ${colors.includes(c) ? "border-[color:var(--rose)] text-[color:var(--rose)] bg-[color:var(--rose)]/10" : "border-[color:var(--border)]"}`, children: c }, c)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Max Price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: priceMax,
          step: 500,
          value: maxPrice,
          onChange: (e) => {
            setMaxPrice(Number(e.target.value));
            setPage(1);
          },
          className: "w-full accent-[#C0866A]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted-foreground)] mt-1", children: [
        "Up to KSh ",
        maxPrice.toLocaleString()
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Sort" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "input-luxe text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "Newest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Price · Low to High" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "Price · High to Low" })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Shop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl", children: "The Collection" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMobileFilters(true), className: "md:hidden btn-ghost flex items-center gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 15 }),
        " Filters"
      ] })
    ] }),
    activeFilters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 my-5", children: [
      activeFilters.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: f.clear, className: "chip flex items-center gap-1.5 hover:bg-[color:var(--rose)]/25 transition", children: [
        f.label,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 11 })
      ] }, i)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            setCat(void 0);
            setBranch("all");
            setSizes([]);
            setColors([]);
            setMaxPrice(priceMax);
            setPage(1);
          },
          className: "text-xs text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)] underline ml-1",
          children: "Clear all"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[240px_1fr] gap-8 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Filters, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mobileFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            onClick: () => setMobileFilters(false),
            className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.aside,
          {
            initial: { x: "-100%" },
            animate: { x: 0 },
            exit: { x: "-100%" },
            transition: { type: "spring", damping: 28, stiffness: 240 },
            className: "fixed top-0 left-0 z-50 h-full w-4/5 max-w-xs bg-[color:var(--plum-deep)] border-r border-[color:var(--border)] overflow-y-auto p-6 md:hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl", children: "Filters" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMobileFilters(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Filters, {})
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted-foreground)] mb-5", children: [
          filtered.length,
          " piece",
          filtered.length !== 1 ? "s" : ""
        ] }),
        paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-16 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl mb-2", children: "Nothing here" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[color:var(--muted-foreground)] text-sm", children: "No pieces match these filters. Try clearing one." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-5", children: paginated.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { p, index: i }, p.id)) }),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: page === 1, onClick: () => setPage((p) => p - 1), className: "btn-ghost px-4 py-2 disabled:opacity-40", children: "←" }),
          Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPage(p), className: `w-10 h-10 rounded-full text-sm transition ${p === page ? "bg-[color:var(--rose)] text-[color:var(--plum-deep)] font-bold" : "border border-[color:var(--border)] hover:border-[color:var(--rose)]"}`, children: p }, p)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: page === totalPages, onClick: () => setPage((p) => p + 1), className: "btn-ghost px-4 py-2 disabled:opacity-40", children: "→" })
        ] })
      ] })
    ] })
  ] }) });
}
const ItemSchema = objectType({
  productId: stringType().uuid(),
  name: stringType(),
  image: stringType().optional().nullable(),
  size: stringType().nullable(),
  color: stringType().nullable(),
  quantity: numberType().int().min(1).max(50),
  unitPrice: numberType().min(0)
});
const CreateOrderSchema = objectType({
  items: arrayType(ItemSchema).min(1).max(50),
  contact: objectType({
    fullName: stringType().min(1).max(120),
    email: stringType().email().max(160),
    phone: stringType().min(9).max(20)
  }),
  isPickup: booleanType(),
  pickupBranch: enumType(["nairobi", "makueni"]).nullable().optional(),
  delivery: objectType({
    street: stringType().max(200).optional(),
    area: stringType().max(120).optional(),
    instructions: stringType().max(500).optional()
  }).optional(),
  deliveryFee: numberType().min(0).max(5e3),
  userId: stringType().uuid().nullable().optional()
});
const createOrder = createServerFn({
  method: "POST"
}).validator(CreateOrderSchema).handler(createSsrRpc("7f92d135aa3763ddd5bf6d4d9f84832b6b591cbaa35dcc4048b4b1beed8e7bf3"));
const getOrderById = createServerFn({
  method: "GET"
}).validator(objectType({
  id: stringType().uuid()
})).handler(createSsrRpc("a5ee9bad6d6dfcd1a5c1f0a85084988327f42fcacbc4a074a617434a490158db"));
const getMyOrders = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("6c8a93162baf5f19a0104a3fbb4ef5b118f9a0e1e73268385aa11ec42041ca24"));
const PushInput = objectType({
  orderId: stringType().uuid(),
  phone: stringType().min(9).max(20),
  amount: numberType().int().min(1).max(15e4)
});
const mpesaStkPush = createServerFn({
  method: "POST"
}).validator(PushInput).handler(createSsrRpc("7e72b79098fc3326e7f71b7e23123c5185651ff03658c9596abb0867fd56e7d2"));
const mpesaStatus = createServerFn({
  method: "GET"
}).validator(objectType({
  checkoutId: stringType().min(1)
})).handler(createSsrRpc("9362363b29a3bc3bc513493348dba611bc6f746446ffba70e7db843b6f60ccdb"));
const Route$9 = createFileRoute("/checkout")({ component: Checkout });
const deliverySchema = objectType({
  fullName: stringType().min(2, "Full name required"),
  email: stringType().email("Valid email required"),
  phone: stringType().refine((v) => isValidKenyaPhone(v), "Enter a valid Kenyan phone (07XX or +2547XX)"),
  isPickup: booleanType(),
  branch: enumType(["nairobi", "makueni"]),
  street: stringType().optional(),
  zoneId: stringType().optional(),
  instructions: stringType().optional()
}).superRefine((d, ctx) => {
  if (!d.isPickup) {
    if (!d.street || d.street.length < 3) ctx.addIssue({ code: "custom", path: ["street"], message: "Street address required" });
    if (!d.zoneId) ctx.addIssue({ code: "custom", path: ["zoneId"], message: "Select a delivery area" });
  }
});
function Checkout() {
  const nav = useNavigate();
  const { items, subtotal, clear } = useCart();
  const sub = subtotal();
  const { data: zones } = useQuery({ queryKey: ["zones"], queryFn: () => listDeliveryZones() });
  const [step, setStep] = reactExports.useState(1);
  const [deliveryData, setDeliveryData] = reactExports.useState(null);
  const [orderId, setOrderId] = reactExports.useState(null);
  const [checkoutId, setCheckoutId] = reactExports.useState(null);
  const [paying, setPaying] = reactExports.useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: u(deliverySchema),
    defaultValues: { isPickup: false, branch: "nairobi", fullName: "", email: "", phone: "", street: "", zoneId: "", instructions: "" }
  });
  const isPickup = watch("isPickup");
  const zoneId = watch("zoneId");
  const zone = zones?.find((z2) => z2.id === zoneId);
  const deliveryFee = isPickup ? 0 : Number(zone?.fee ?? 0);
  const total = sub + deliveryFee;
  watch("phone");
  if (items.length === 0 && !orderId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-5 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Your bag is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/shop", className: "btn-rose mt-6 inline-flex", children: "Continue shopping" })
    ] }) });
  }
  const onDeliverySubmit = (data) => {
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
          items: items.map((i) => ({ productId: i.productId, name: i.name, image: i.image, size: i.size, color: i.color, quantity: i.quantity, unitPrice: i.unitPrice })),
          contact: { fullName: deliveryData.fullName, email: deliveryData.email, phone: sanitizePhone(deliveryData.phone) },
          isPickup: deliveryData.isPickup,
          pickupBranch: deliveryData.isPickup ? deliveryData.branch : null,
          delivery: deliveryData.isPickup ? void 0 : { street: deliveryData.street, area: zone?.name, instructions: deliveryData.instructions },
          deliveryFee,
          userId
        }
      });
      setOrderId(res.id);
      setStep(3);
      toast.success(`Order ${res.orderNumber} created`);
    } catch (e) {
      toast.error(e.message ?? "Could not place order");
    }
  };
  const payMpesa = async () => {
    if (!orderId) return;
    setPaying(true);
    try {
      const res = await mpesaStkPush({ data: { orderId, phone: sanitizePhone(deliveryData.phone), amount: Math.round(total) } });
      if (!res.ok) {
        if ("disabled" in res && res.disabled) {
          toast.warning("M-Pesa is not configured yet. Order saved as pending — staff will contact you.");
          clear();
          setTimeout(() => nav({ to: "/order-confirmation/$id", params: { id: orderId } }), 1200);
          return;
        }
        toast.error(res.message ?? "STK push failed");
        setPaying(false);
        return;
      }
      setCheckoutId(res.checkoutRequestId);
      const start = Date.now();
      const iv = setInterval(async () => {
        const s = await mpesaStatus({ data: { checkoutId: res.checkoutRequestId } });
        if (s.paymentStatus === "paid") {
          clearInterval(iv);
          clear();
          toast.success("Payment confirmed!");
          nav({ to: "/order-confirmation/$id", params: { id: orderId } });
        } else if (s.paymentStatus === "failed" || Date.now() - start > 9e4) {
          clearInterval(iv);
          setPaying(false);
          toast.error("Payment timed out. Try again.");
        }
      }, 5e3);
    } catch (e) {
      toast.error(e.message);
      setPaying(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow mb-2", children: [
      "Checkout · Step ",
      step,
      " of 3"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl mb-8", children: step === 1 ? "Delivery" : step === 2 ? "Review" : "Payment" }),
    step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onDeliverySubmit), className: "card-luxe p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", placeholder: "Full name", ...register("fullName") }),
          errors.fullName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--destructive)] mt-1", children: errors.fullName.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", placeholder: "Email", type: "email", ...register("email") }),
          errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--destructive)] mt-1", children: errors.email.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", placeholder: "Phone (07XX or +2547XX)", ...register("phone") }),
        errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--destructive)] mt-1", children: errors.phone.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setValue("isPickup", false), className: `flex-1 py-3 rounded-md border transition ${!isPickup ? "border-[color:var(--rose)] text-[color:var(--rose)]" : "border-[color:var(--border)]"}`, children: "Delivery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setValue("isPickup", true), className: `flex-1 py-3 rounded-md border transition ${isPickup ? "border-[color:var(--rose)] text-[color:var(--rose)]" : "border-[color:var(--border)]"}`, children: "Branch Pickup" })
      ] }),
      isPickup ? /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "input-luxe", ...register("branch"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "nairobi", children: "Nairobi Boutique" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "makueni", children: "Makueni Boutique" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", placeholder: "Street address", ...register("street") }),
          errors.street && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--destructive)] mt-1", children: errors.street.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "input-luxe", ...register("zoneId"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select area" }),
            zones?.map((z2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: z2.id, children: [
              z2.name,
              " ",
              z2.is_free ? "· FREE" : `· ${formatKsh(z2.fee)}`
            ] }, z2.id))
          ] }),
          errors.zoneId && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--destructive)] mt-1", children: errors.zoneId.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "input-luxe", placeholder: "Delivery instructions (optional)", ...register("instructions") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-4 border-t border-[color:var(--border)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
          "Delivery fee:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price text-[color:var(--rose)]", children: isPickup || zone?.is_free ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--success)] font-semibold", children: "FREE" }) : formatKsh(deliveryFee) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn-rose", children: "Continue" })
      ] })
    ] }),
    step === 2 && deliveryData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl mb-3", children: "Items" }),
        items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            i.name,
            " × ",
            i.quantity,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[color:var(--muted-foreground)]", children: [
              "(",
              [i.size, i.color].filter(Boolean).join(" · "),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price", children: formatKsh(i.unitPrice * i.quantity) })
        ] }, i.productId + i.size + i.color))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-[color:var(--border)] pt-3 text-sm space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price", children: formatKsh(sub) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price", children: deliveryFee === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--success)]", children: "FREE" }) : formatKsh(deliveryFee) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-lg pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price text-[color:var(--rose)] font-semibold", children: formatKsh(total) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[color:var(--muted-foreground)] space-y-0.5 border-t border-[color:var(--border)] pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          deliveryData.fullName,
          " · ",
          deliveryData.email,
          " · ",
          deliveryData.phone
        ] }),
        deliveryData.isPickup ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Pickup: ",
          deliveryData.branch.charAt(0).toUpperCase() + deliveryData.branch.slice(1),
          " branch"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Delivery to: ",
          deliveryData.street,
          ", ",
          zone?.name
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep(1), className: "btn-ghost", children: "Back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: placeOrder, className: "btn-rose", children: "Continue to Payment" })
      ] })
    ] }),
    step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Pay with" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl text-[color:var(--mpesa)]", children: "M-PESA" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", value: deliveryData?.phone ?? "", readOnly: true, placeholder: "M-Pesa phone number" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: payMpesa, disabled: paying, className: "btn-mpesa", children: paying ? "Check your phone for the STK prompt…" : `Pay ${formatKsh(total)} via M-Pesa` }),
      checkoutId && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-[color:var(--muted-foreground)] animate-pulse", children: "Awaiting confirmation from Safaricom…" })
    ] })
  ] }) });
}
const Route$8 = createFileRoute("/auth")({ component: Auth });
const loginSchema = objectType({
  email: stringType().email("Please enter a valid email address"),
  password: stringType().min(8, "Password must be at least 8 characters")
});
const registerSchema = objectType({
  name: stringType().min(2, "This field is required"),
  email: stringType().email("Please enter a valid email address"),
  password: stringType().min(8, "Password must be at least 8 characters"),
  confirmPassword: stringType()
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
const attempts = { count: 0, lockedUntil: 0 };
function Auth() {
  const nav = useNavigate();
  const [mode, setMode] = reactExports.useState("login");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [showConfirmPw, setShowConfirmPw] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  const [lockSecs, setLockSecs] = reactExports.useState(0);
  const loginForm = useForm({ resolver: u(loginSchema) });
  const registerForm = useForm({ resolver: u(registerSchema) });
  const startLockCountdown = (secs) => {
    setLockSecs(secs);
    const iv = setInterval(() => {
      setLockSecs((s) => {
        if (s <= 1) {
          clearInterval(iv);
          return 0;
        }
        return s - 1;
      });
    }, 1e3);
  };
  const onLogin = async (data) => {
    if (Date.now() < attempts.lockedUntil) return;
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password });
      if (error) {
        attempts.count++;
        if (attempts.count >= 5) {
          attempts.lockedUntil = Date.now() + 3e4;
          attempts.count = 0;
          startLockCountdown(30);
          toast.error("Too many failed attempts. Try again in 30 seconds.");
        } else {
          toast.error(error.message);
        }
        return;
      }
      attempts.count = 0;
      toast.success("Welcome back");
      nav({ to: "/dashboard" });
    } finally {
      setBusy(false);
    }
  };
  const onRegister = async (data) => {
    setBusy(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { full_name: data.name } }
      });
      if (error) throw error;
      toast.success("Account created! Welcome to Christine Collections.");
      nav({ to: "/dashboard" });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  const isLocked = lockSecs > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto px-5 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: mode === "login" ? "Welcome back" : "Join us" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl mb-8", children: mode === "login" ? "Sign In" : "Create Account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: mode === "login" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.form,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        onSubmit: loginForm.handleSubmit(onLogin),
        className: "card-luxe p-6 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9", placeholder: "Email", type: "email", autoComplete: "email", ...loginForm.register("email") })
            ] }),
            loginForm.formState.errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic text-red-400 mt-1", children: loginForm.formState.errors.email.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9 pr-10", placeholder: "Password", type: showPw ? "text" : "password", autoComplete: "current-password", ...loginForm.register("password") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPw(!showPw), className: "absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)]", children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 }) })
            ] }),
            loginForm.formState.errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic text-red-400 mt-1", children: loginForm.formState.errors.password.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-rose w-full justify-center", disabled: busy || isLocked, children: isLocked ? `Try again in ${lockSecs}s` : busy ? "Signing in…" : "Sign In" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode("register"), className: "block mx-auto text-xs text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)]", children: "No account? Register" })
        ]
      },
      "login"
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.form,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        onSubmit: registerForm.handleSubmit(onRegister),
        className: "card-luxe p-6 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9", placeholder: "Full name", autoComplete: "name", ...registerForm.register("name") })
            ] }),
            registerForm.formState.errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic text-red-400 mt-1", children: registerForm.formState.errors.name.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9", placeholder: "Email", type: "email", autoComplete: "email", ...registerForm.register("email") })
            ] }),
            registerForm.formState.errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic text-red-400 mt-1", children: registerForm.formState.errors.email.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9 pr-10", placeholder: "Password (min 8 chars)", type: showPw ? "text" : "password", autoComplete: "new-password", ...registerForm.register("password") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPw(!showPw), className: "absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)]", children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 }) })
            ] }),
            registerForm.formState.errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic text-red-400 mt-1", children: registerForm.formState.errors.password.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9 pr-10", placeholder: "Confirm password", type: showConfirmPw ? "text" : "password", autoComplete: "new-password", ...registerForm.register("confirmPassword") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowConfirmPw(!showConfirmPw), className: "absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)]", children: showConfirmPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 }) })
            ] }),
            registerForm.formState.errors.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic text-red-400 mt-1", children: registerForm.formState.errors.confirmPassword.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-rose w-full justify-center", disabled: busy, children: busy ? "Creating account…" : "Create Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode("login"), className: "block mx-auto text-xs text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)]", children: "Already a member? Sign in" })
        ]
      },
      "register"
    ) })
  ] }) });
}
const Route$7 = createFileRoute("/admin-login")({ component: AdminLogin });
function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
      if (!role) {
        await supabase.auth.signOut();
        toast.error("Access denied. This portal is for admins only.");
        setBusy(false);
        return;
      }
      toast.success("Welcome back, Admin");
      nav({ to: "/admin" });
    } catch (e2) {
      toast.error(e2.message);
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6 },
        className: "hidden lg:flex flex-col justify-between w-[45%] bg-[color:var(--plum)] border-r border-[color:var(--border)] p-12 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-20",
              style: {
                backgroundImage: "repeating-linear-gradient(45deg,rgba(192,134,106,0.15) 0 1px,transparent 1px 6px),repeating-linear-gradient(-45deg,rgba(192,134,106,0.1) 0 1px,transparent 1px 6px)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Admin Portal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl leading-tight mb-4", children: [
              "Manage your",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--rose)]", children: "boutique" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[color:var(--muted-foreground)] text-sm leading-relaxed max-w-xs", children: "Full access to orders, products, inventory, delivery zones and revenue analytics." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 space-y-3", children: ["Orders management", "Product catalogue CRUD", "Revenue analytics", "Delivery zones"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-[color:var(--muted-foreground)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-[color:var(--rose)]" }),
            f
          ] }, f)) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[color:var(--background)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.15 },
        className: "w-full max-w-md",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-[color:var(--rose)]/15 border border-[color:var(--rose)]/30 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 20, className: "text-[color:var(--rose)]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Restricted access" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl", children: "Admin Sign In" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[color:var(--muted-foreground)] text-sm mt-2", children: "Only authorised staff may access this portal." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1.5 block", children: "Email address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  className: "input-luxe",
                  placeholder: "admin@christinecollections.co.ke",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  required: true,
                  autoComplete: "email"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1.5 block", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: showPw ? "text" : "password",
                    className: "input-luxe pr-12",
                    placeholder: "••••••••",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    required: true,
                    autoComplete: "current-password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPw(!showPw),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)] transition",
                    children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, className: "btn-rose w-full justify-center mt-2", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "animate-spin h-4 w-4", viewBox: "0 0 24 24", fill: "none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v8z" })
              ] }),
              "Verifying…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 15 }),
              " Access Admin Panel"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 pt-6 border-t border-[color:var(--border)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted-foreground)] text-center", children: [
            "Not an admin?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/auth", className: "text-[color:var(--rose)] hover:underline", children: "Customer login →" })
          ] }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { theme: "dark", position: "top-right", toastOptions: { style: { background: "var(--card)", color: "var(--cream)", border: "1px solid var(--border)" } } })
  ] });
}
const Route$6 = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    const isAdminRoute = location.pathname.startsWith("/admin");
    if (error || !data.user) {
      throw redirect({ to: isAdminRoute ? "/admin-login" : "/auth" });
    }
    return { user: data.user };
  },
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
});
const HERO_IMAGE = "https://images.pexels.com/photos/16850176/pexels-photo-16850176.jpeg?auto=compress&cs=tinysrgb&w=1800";
const AVATARS = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=80&h=80&fit=crop&crop=face"
];
const TESTIMONIALS = [
  {
    name: "Wanjiru Kamau",
    location: "Nairobi, Westlands",
    avatar: AVATARS[0],
    rating: 5,
    text: "Christine Collections is my go-to boutique! The quality is exceptional and the styles are so unique. I wore one of their dresses to my daughter's graduation and received so many compliments. Free delivery to Westlands made it even better!",
    product: "Ankara Wrap Dress"
  },
  {
    name: "Amina Hassan",
    location: "Nairobi, Kilimani",
    avatar: AVATARS[1],
    rating: 5,
    text: "As a mother of three, I need clothes that are both stylish and practical. Christine Collections understands the Kenyan woman. The fabrics are breathable, the cuts are flattering, and the prices are reasonable. Highly recommended!",
    product: "Linen Midi Dress"
  },
  {
    name: "Njeri Mwangi",
    location: "Makueni Town",
    avatar: AVATARS[2],
    rating: 5,
    text: "I was hesitant to order from Makueni but the team handled everything perfectly. My order arrived within 3 days and the packaging was beautiful. The dress fits like it was made for me. Will definitely order again!",
    product: "Kitenge Evening Gown"
  },
  {
    name: "Fatuma Odhiambo",
    location: "Nairobi, South B",
    avatar: AVATARS[3],
    rating: 5,
    text: "I bought a gift for my sister from Christine Collections and she absolutely loved it! The WhatsApp support team was so helpful in choosing the right size. This boutique truly understands Kenyan women's fashion needs.",
    product: "Rose Gold Blouse"
  },
  {
    name: "Grace Achieng",
    location: "Nairobi, Roysambu",
    avatar: AVATARS[0],
    rating: 5,
    text: "The free delivery across Nairobi is a game changer! I've ordered three times now and each piece has been gorgeous. The Playfair design and quality stitching is unmatched. Christine Collections is truly premium.",
    product: "Blush Tulle Skirt"
  },
  {
    name: "Mercy Wambua",
    location: "Makueni, Wote",
    avatar: AVATARS[1],
    rating: 5,
    text: "Walking into the Makueni boutique felt like stepping into a high-end Nairobi store. The staff were so warm and helped me find the perfect outfit for my church event. I felt like a queen!",
    product: "Floral Maxi Dress"
  }
];
const featuredOpts = queryOptions({ queryKey: ["featured"], queryFn: () => listProducts({ data: { featured: true } }) });
const catsOpts = queryOptions({ queryKey: ["cats"], queryFn: () => listCategories() });
const Route$5 = createFileRoute("/")({
  loader: async ({ context }) => {
    await Promise.all([context.queryClient.ensureQueryData(featuredOpts), context.queryClient.ensureQueryData(catsOpts)]);
  },
  component: Home
});
function StarRow({ count }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [...Array(count)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 13, fill: "currentColor", className: "text-[color:var(--rose)]" }, i)) });
}
function TestimonialsModal({ onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose,
        className: "fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 20 },
        className: "fixed inset-4 md:inset-10 z-[101] bg-[#1A0F1B] border-t-2 border-[color:var(--rose)] rounded-2xl overflow-hidden flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 md:p-6 border-b border-[color:var(--border)] shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-0.5", children: "What our customers say" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl", children: "Customer Reviews" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { count: 5 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "4.9" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[color:var(--muted-foreground)]", children: "· 500+ reviews" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 rounded-xl hover:bg-[color:var(--muted)] transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4 md:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.07 },
              className: "card-luxe p-5 flex flex-col gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { size: 20, className: "text-[color:var(--rose)]/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[color:var(--muted-foreground)] leading-relaxed flex-1", children: [
                  '"',
                  t.text,
                  '"'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { count: t.rating }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--rose)]/70 mt-1", children: [
                    "Purchased: ",
                    t.product
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2 border-t border-[color:var(--border)]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: t.avatar, alt: t.name, className: "w-10 h-10 rounded-full object-cover border-2 border-[color:var(--rose)]/30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: t.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--muted-foreground)]", children: t.location })
                  ] })
                ] })
              ]
            },
            i
          )) }) })
        ]
      }
    )
  ] });
}
function Home() {
  const { data: featured } = useSuspenseQuery(featuredOpts);
  const { data: cats } = useSuspenseQuery(catsOpts);
  const [showTestimonials, setShowTestimonials] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Shell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showTestimonials && /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsModal, { onClose: () => setShowTestimonials(false) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[92vh] min-h-[600px] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: HERO_IMAGE,
          alt: "Christine Collections",
          className: "absolute inset-0 w-full h-full object-cover",
          style: { objectPosition: "center 41%" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[color:var(--plum-deep)]/85 via-[color:var(--plum-deep)]/50 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[color:var(--plum-deep)]/60 via-transparent to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 opacity-15 pointer-events-none",
          style: { backgroundImage: "repeating-linear-gradient(45deg,rgba(192,134,106,0.08) 0 1px,transparent 1px 6px),repeating-linear-gradient(-45deg,rgba(192,134,106,0.06) 0 1px,transparent 1px 6px)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 h-full flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-5 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { className: "eyebrow mb-5", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, children: "Premium Kenyan Boutique · Nairobi & Makueni" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] mb-6 text-[color:var(--cream)]", children: BRAND.tagline.split(" ").map((word, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 + i * 0.15, duration: 0.5, ease: "easeOut" },
            className: "inline-block mr-[0.2em] whitespace-nowrap",
            children: word
          },
          i
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            className: "text-[color:var(--muted-foreground)] text-base md:text-lg mb-8 max-w-md leading-relaxed",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.1 },
            children: "Discover handcrafted fashion that celebrates your identity. Free delivery across Nairobi."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "flex flex-wrap gap-3", initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.2 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "btn-rose", children: [
            "Shop Now ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", search: { sort: "new" }, className: "btn-ghost", children: "New Arrivals" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            onClick: () => setShowTestimonials(true),
            className: "mt-8 inline-flex items-center gap-3 bg-[color:var(--card)]/60 backdrop-blur-sm border border-[color:var(--border)] rounded-full px-4 py-2.5 hover:border-[color:var(--rose)]/50 hover:bg-[color:var(--card)]/80 transition group",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2", children: AVATARS.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src,
                  alt: "customer",
                  className: "w-8 h-8 rounded-full border-2 border-[color:var(--card)] object-cover"
                },
                i
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { count: 5 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[color:var(--muted-foreground)] group-hover:text-[color:var(--rose)] transition", children: "500+ happy customers" })
              ] })
            ]
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[color:var(--muted-foreground)] tracking-widest uppercase", children: "Scroll" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "w-px h-8 bg-[color:var(--rose)]/50", animate: { scaleY: [1, 0.3, 1] }, transition: { repeat: Infinity, duration: 1.5 } })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-[color:var(--border)] bg-[color:var(--card)]/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[color:var(--border)]", children: [
      { icon: Truck, title: "Free Delivery", sub: "Across Nairobi" },
      { icon: ShieldCheck, title: "Genuine Products", sub: "Handcrafted in Kenya" },
      { icon: RefreshCw, title: "Easy Returns", sub: "Within 7 days" },
      { icon: Headphones, title: "WhatsApp Support", sub: "Mon–Sat 9am–7pm" }
    ].map(({ icon: Icon, title, sub }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-[color:var(--rose)]/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: "text-[color:var(--rose)]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-[color:var(--cream)]", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-[color:var(--muted-foreground)]", children: sub })
      ] })
    ] }, i)) }) }) }),
    cats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-7xl mx-auto px-5 pt-16 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Browse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl", children: "Shop by Category" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3", children: cats.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.06 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/shop",
          search: { category: c.slug },
          className: "group card-luxe p-4 text-center block h-full hover:border-[color:var(--rose)]/60 transition-all duration-300",
          children: [
            c.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image_url, alt: c.name, className: "w-12 h-12 object-cover rounded-xl mx-auto mb-3 group-hover:scale-105 transition duration-300" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-[color:var(--rose)]/10 mx-auto mb-3 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg text-[color:var(--rose)]", children: c.name[0] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm leading-tight", children: c.name })
          ]
        }
      ) }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-7xl mx-auto px-5 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Just In" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl", children: "New Arrivals" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "hidden sm:flex items-center gap-1 text-sm text-[color:var(--rose)] hover:underline", children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
        ] })
      ] }),
      featured.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer aspect-[3/4] rounded-2xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: featured.slice(0, 8).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { p, index: i }, p.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "btn-ghost text-sm", children: [
        "View all products ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-7xl mx-auto px-5 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Reviews" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl", children: "What Kenyan Women Say" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowTestimonials(true), className: "hidden sm:flex items-center gap-1 text-sm text-[color:var(--rose)] hover:underline", children: [
          "See all reviews ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: TESTIMONIALS.slice(0, 3).map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "card-luxe p-6 flex flex-col gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { size: 22, className: "text-[color:var(--rose)]/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[color:var(--muted-foreground)] leading-relaxed flex-1", children: [
              '"',
              t.text,
              '"'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { count: t.rating }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--rose)]/60 mt-1", children: [
                "Purchased: ",
                t.product
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-3 border-t border-[color:var(--border)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: t.avatar, alt: t.name, className: "w-11 h-11 rounded-full object-cover border-2 border-[color:var(--rose)]/30 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: t.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--muted-foreground)]", children: t.location })
              ] })
            ] })
          ]
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowTestimonials(true), className: "btn-ghost", children: [
        "Read all 500+ reviews ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative my-4 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[color:var(--card)] border-y border-[color:var(--border)] py-10 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-[color:var(--rose)]/15 border border-[color:var(--rose)]/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 26, className: "text-[color:var(--rose)]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-xl md:text-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--rose)]", children: "FREE DELIVERY" }),
            " across Nairobi"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--muted-foreground)] mt-1", children: "Branch pickup always free · Makueni orders from KSh 300" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "btn-rose shrink-0 w-full sm:w-auto justify-center", children: [
        "Shop Now ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 15 })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "branches", className: "max-w-7xl mx-auto px-5 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Visit Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl", children: "Our Boutiques" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[color:var(--muted-foreground)] text-sm mt-3 max-w-md mx-auto", children: "Walk in, try on, and take home. Free pickup at both locations." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-5", children: BRAND.branches.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.1, duration: 0.5 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-6 md:p-8 flex gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-[color:var(--rose)]/15 border border-[color:var(--rose)]/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 20, className: "text-[color:var(--rose)]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl md:text-2xl", children: b.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[color:var(--muted-foreground)] text-sm mt-1", children: b.address }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--muted-foreground)] mt-1.5", children: b.hours }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", children: "Free pickup" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", children: "No delivery charge" })
          ] })
        ] })
      ] }) }, b.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-7xl mx-auto px-5 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "relative overflow-hidden rounded-3xl bg-gradient-to-br from-[color:var(--plum)] to-[color:var(--card)] border border-[color:var(--border)] p-10 md:p-16 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-10 pointer-events-none",
              style: { backgroundImage: "repeating-linear-gradient(45deg,rgba(192,134,106,0.2) 0 1px,transparent 1px 8px)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Ready to look amazing?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-5xl mb-4", children: "Your Story Starts Here" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[color:var(--muted-foreground)] text-sm md:text-base mb-8 max-w-md mx-auto", children: "Explore hundreds of premium pieces curated for the modern Kenyan woman." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "btn-rose px-10", children: [
              "Explore the Collection ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 15 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#branches", className: "btn-ghost px-8", children: "Find a Store" })
          ] })
        ]
      }
    ) })
  ] });
}
const opts = (slug) => queryOptions({ queryKey: ["product", slug], queryFn: () => getProduct({ data: { slug } }) });
const Route$4 = createFileRoute("/shop/$slug")({
  loader: async ({ params, context }) => {
    const p = await context.queryClient.ensureQueryData(opts(params.slug));
    if (!p) throw notFound();
  },
  component: Detail,
  notFoundComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-5 py-24 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Product not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "btn-rose mt-6 inline-flex", children: "Back to Shop" })
  ] }) })
});
const TABS = ["Description", "Size Guide", "Care"];
const COLOR_MAP = {
  black: "#1a1a1a",
  white: "#f5f5f5",
  red: "#e53e3e",
  blue: "#3182ce",
  navy: "#1a365d",
  green: "#38a169",
  pink: "#ed64a6",
  purple: "#805ad5",
  yellow: "#ecc94b",
  orange: "#ed8936",
  brown: "#92400e",
  grey: "#718096",
  gray: "#718096",
  cream: "#F5EEE8",
  beige: "#f5f0e8",
  plum: "#2D1B2E",
  blush: "#F2D4C8",
  "rose gold": "#C0866A",
  gold: "#d4af37",
  silver: "#c0c0c0",
  maroon: "#800000",
  teal: "#319795",
  coral: "#fc8181",
  lavender: "#9f7aea",
  olive: "#6b7a0a",
  mustard: "#d4a017",
  camel: "#c19a6b",
  khaki: "#c3b091"
};
function Detail() {
  const { slug } = Route$4.useParams();
  const { data: p } = useSuspenseQuery(opts(slug));
  const { data: allProducts } = useQuery({ queryKey: ["products-all"], queryFn: () => listProducts({ data: {} }) });
  const nav = useNavigate();
  const add = useCart((s) => s.add);
  const [activeImg, setActiveImg] = reactExports.useState(0);
  const [zoomed, setZoomed] = reactExports.useState(false);
  const [size, setSize] = reactExports.useState(p?.sizes?.[0] ?? null);
  const [color, setColor] = reactExports.useState(p?.colors?.[0] ?? null);
  const [qty, setQty] = reactExports.useState(1);
  const [tab, setTab] = reactExports.useState("Description");
  if (!p) return null;
  const images = p.images?.length ? p.images : ["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200"];
  const related = allProducts?.filter((x) => x.id !== p.id && x.category_id === p.category_id).slice(0, 4) ?? [];
  const onAdd = (buyNow = false) => {
    if (p.stock_quantity === 0) return;
    add({
      productId: p.id,
      slug: p.slug,
      name: p.name,
      image: images[0] ?? "",
      unitPrice: Number(p.price),
      size: size ?? null,
      color: color ?? null,
      quantity: qty
    });
    toast.success("Added to bag");
    if (buyNow) nav({ to: "/checkout" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Shell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-5 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-xs text-[color:var(--muted-foreground)] mb-8 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-[color:var(--rose)]", children: "Home" }),
        " /",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-[color:var(--rose)]", children: "Shop" }),
        " /",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--cream)]", children: p.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[3/4] bg-[color:var(--card)] rounded-xl overflow-hidden relative group cursor-zoom-in", onClick: () => setZoomed(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.img,
              {
                src: images[activeImg],
                alt: p.name,
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.3 },
                className: "w-full h-full object-cover group-hover:scale-105 transition duration-700"
              },
              activeImg
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-black/40 rounded-full p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "text-white", size: 22 }) }) }),
            p.compare_price && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 chip", children: "Sale" })
          ] }),
          images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setActiveImg(i),
              className: `shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition ${i === activeImg ? "border-[color:var(--rose)]" : "border-transparent"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: "", className: "w-full h-full object-cover" })
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: p.categories?.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl mb-3", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price text-2xl text-[color:var(--rose)] font-semibold", children: formatKsh(p.price) }),
            p.compare_price && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price line-through text-[color:var(--muted-foreground)]", children: formatKsh(p.compare_price) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13, className: "text-[color:var(--rose)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[color:var(--muted-foreground)]", children: p.branch === "both" ? "Available at Nairobi & Makueni" : `Available at ${p.branch.charAt(0).toUpperCase() + p.branch.slice(1)}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `ml-2 text-xs px-2 py-0.5 rounded-full ${p.stock_quantity > 5 ? "bg-green-500/20 text-green-400" : p.stock_quantity > 0 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`, children: p.stock_quantity > 5 ? "In Stock" : p.stock_quantity > 0 ? `Only ${p.stock_quantity} left` : "Out of Stock" })
          ] }),
          p.sizes?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: p.sizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setSize(s),
                className: `px-4 py-2 rounded-md border text-sm transition ${size === s ? "border-[color:var(--rose)] text-[color:var(--rose)] bg-[color:var(--rose)]/10" : "border-[color:var(--border)] hover:border-[color:var(--rose)]/50"}`,
                children: s
              },
              s
            )) })
          ] }),
          p.colors?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow mb-2", children: [
              "Color",
              color && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "normal-case tracking-normal font-normal text-[color:var(--muted-foreground)] ml-2", children: [
                "— ",
                color
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: p.colors.map((c) => {
              const swatch = COLOR_MAP[c.toLowerCase()] ?? null;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setColor(c),
                  title: c,
                  className: `w-8 h-8 rounded-full border-2 transition ${color === c ? "border-[color:var(--rose)] scale-110 shadow-[0_0_0_2px_var(--rose)]" : "border-transparent hover:border-[color:var(--rose)]/50"}`,
                  style: swatch ? { backgroundColor: swatch } : void 0,
                  children: !swatch && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] leading-none p-0.5 block truncate", children: c.slice(0, 3) })
                },
                c
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Quantity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-0 border border-[color:var(--border)] rounded-lg overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(Math.max(1, qty - 1)), className: "p-3 hover:bg-[color:var(--muted)] transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-center text-sm", children: qty }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(qty + 1), className: "p-3 hover:bg-[color:var(--muted)] transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex flex-wrap gap-3 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onAdd(false), disabled: p.stock_quantity === 0, className: "btn-rose", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 16 }),
              " Add to Bag"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onAdd(true), disabled: p.stock_quantity === 0, className: "btn-ghost", children: "Buy Now" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-[color:var(--border)] pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0 border-b border-[color:var(--border)] mb-5", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t), className: `px-4 py-2 text-sm transition border-b-2 -mb-px ${tab === t ? "border-[color:var(--rose)] text-[color:var(--rose)]" : "border-transparent text-[color:var(--muted-foreground)]"}`, children: t }, t)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, children: [
              tab === "Description" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[color:var(--muted-foreground)] text-sm leading-relaxed", children: p.description ?? "Premium quality, ethically crafted in Kenya." }),
              tab === "Size Guide" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-[color:var(--muted-foreground)] space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-[color:var(--cream)] mb-2", children: "Standard Kenyan sizing" }),
                [["XS", "32-34"], ["S", "34-36"], ["M", "38-40"], ["L", "42-44"], ["XL", "46-48"]].map(([sz, cm]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-[color:var(--border)] py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sz }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    cm,
                    " cm chest"
                  ] })
                ] }, sz)),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs", children: "All pieces are hand-finished — slight variation is part of the craft." })
              ] }),
              tab === "Care" && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-sm text-[color:var(--muted-foreground)] space-y-2", children: ["Hand wash in cold water", "Do not tumble dry", "Iron on low heat", "Dry clean recommended for silk", "Store in a cool, dry place"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--rose)]", children: "·" }),
                c
              ] }, c)) })
            ] }, tab) })
          ] })
        ] })
      ] }),
      related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "You may also like" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mb-7", children: "Related Pieces" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-5", children: related.map((rp, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { p: rp, index: i }, rp.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden fixed bottom-16 left-0 right-0 z-40 bg-[color:var(--plum-deep)]/95 backdrop-blur-md border-t border-[color:var(--border)] p-3 flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onAdd(false), disabled: p.stock_quantity === 0, className: "btn-rose flex-1 justify-center text-sm py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 15 }),
        " Add to Bag · ",
        formatKsh(p.price)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onAdd(true), disabled: p.stock_quantity === 0, className: "btn-ghost px-4 text-sm py-3", children: "Buy" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: zoomed && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: () => setZoomed(false),
        className: "fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: images[activeImg], alt: p.name, className: "max-h-[90vh] max-w-full object-contain rounded-lg" })
      }
    ) })
  ] });
}
const Route$3 = createFileRoute("/order-confirmation/$id")({ component: Confirm });
function Confirm() {
  const { id } = Route$3.useParams();
  const { data: order } = useQuery({ queryKey: ["order", id], queryFn: () => getOrderById({ data: { id } }) });
  reactExports.useEffect(() => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.4 }, colors: ["#C0866A", "#F2D4C8", "#4CAF7D"] });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-5 py-16 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 mx-auto rounded-full bg-[color:var(--success)]/20 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "text-[color:var(--success)]", size: 40 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Thank you" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl mb-3", children: "Order Confirmed" }),
    order && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "order-number text-[color:var(--rose)] text-lg mb-8", children: order.order_number }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-6 text-left space-y-2 text-sm", children: [
        order.order_items?.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            it.product_name,
            " × ",
            it.quantity
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price", children: formatKsh(Number(it.unit_price) * it.quantity) })
        ] }, it.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-[color:var(--border)] pt-2 mt-2 flex justify-between text-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price text-[color:var(--rose)]", children: formatKsh(order.total) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[color:var(--muted-foreground)] mt-4", children: "Estimated delivery: 2–4 business days. We'll WhatsApp you when it ships." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: whatsappLink("I just shopped at Christine Collections 🛍️"), target: "_blank", rel: "noreferrer", className: "btn-ghost", children: "Share on WhatsApp" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "btn-rose", children: "Continue Shopping" })
    ] })
  ] }) });
}
const Route$2 = createFileRoute("/_authenticated/dashboard")({ component: Dashboard });
const statusColor$1 = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  processing: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  shipped: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  delivered: "bg-green-500/20 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30"
};
const NAV$1 = [
  { key: "orders", label: "My Orders", icon: ShoppingBag },
  { key: "profile", label: "Profile & Settings", icon: User }
];
function Dashboard() {
  const nav = useNavigate();
  const [tab, setTab] = reactExports.useState("orders");
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const [expanded, setExpanded] = reactExports.useState(null);
  const [userEmail, setUserEmail] = reactExports.useState("");
  const [profile, setProfile] = reactExports.useState({ full_name: "", phone: "", city: "" });
  const [passwords, setPasswords] = reactExports.useState({ current: "", next: "", confirm: "" });
  const [showPw, setShowPw] = reactExports.useState({ current: false, next: false, confirm: false });
  const [pwBusy, setPwBusy] = reactExports.useState(false);
  const { data: orders, isLoading } = useQuery({ queryKey: ["my-orders"], queryFn: () => getMyOrders() });
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setUserEmail(data.user.email ?? "");
      const { data: p } = await supabase.from("profiles").select("full_name,phone,city").eq("id", data.user.id).single();
      if (p) setProfile({ full_name: p.full_name ?? "", phone: p.phone ?? "", city: p.city ?? "" });
    });
  }, []);
  const saveMutation = useMutation({
    mutationFn: async () => {
      const { data: sess } = await supabase.auth.getUser();
      if (!sess.user) throw new Error("Not logged in");
      const { error } = await supabase.from("profiles").update(profile).eq("id", sess.user.id);
      if (error) throw error;
    },
    onSuccess: () => toast.success("Profile updated"),
    onError: (e) => toast.error(e.message)
  });
  const changePassword = async () => {
    if (passwords.next.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setPwBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: passwords.next });
      if (error) throw error;
      toast.success("Password updated");
      setPasswords({ current: "", next: "", confirm: "" });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setPwBusy(false);
    }
  };
  const signOut = async () => {
    const ok = await confirm({
      title: "Signing out?",
      body: "You'll need to log back in to track orders or checkout faster.",
      confirmLabel: "Sign Out",
      confirmClass: "text-sm py-2 px-5 rounded-full font-semibold btn-rose"
    });
    if (!ok) return;
    await supabase.auth.signOut();
    nav({ to: "/" });
  };
  const initials = profile.full_name ? profile.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() : userEmail?.[0]?.toUpperCase() ?? "?";
  const handleTab = (t) => {
    setTab(t);
    setSidebarOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[calc(100vh-4rem)] overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: () => setSidebarOpen(false),
        className: "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `fixed top-0 left-0 h-full w-64 z-50 bg-[color:var(--plum-deep)] border-r border-[color:var(--border)] flex flex-col transition-transform duration-300 md:static md:translate-x-0 md:h-full md:shrink-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 border-b border-[color:var(--border)] shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-[color:var(--rose)]/20 border-2 border-[color:var(--rose)]/40 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base text-[color:var(--rose)]", children: initials }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: profile.full_name || "My Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-[color:var(--muted-foreground)] truncate", children: userEmail })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 p-3 space-y-1", children: [
        NAV$1.map(({ key, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => handleTab(key),
            className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition text-left ${tab === key ? "bg-[color:var(--rose)]/15 text-[color:var(--rose)] border border-[color:var(--rose)]/30" : "hover:bg-[color:var(--muted)] text-[color:var(--muted-foreground)] hover:text-[color:var(--cream)]"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 17 }),
              label
            ]
          },
          key
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-[color:var(--muted)] text-[color:var(--muted-foreground)] hover:text-[color:var(--cream)] transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 17 }),
          " Continue Shopping"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-[color:var(--border)] shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: signOut,
          className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[color:var(--muted-foreground)] hover:bg-red-500/10 hover:text-red-400 transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 17 }),
            " Sign Out"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 bg-[color:var(--background)]/90 backdrop-blur-md border-b border-[color:var(--border)] px-4 py-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSidebarOpen(true), className: "md:hidden p-2 rounded-lg hover:bg-[color:var(--muted)] transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-[10px]", children: "Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg leading-none", children: NAV$1.find((n) => n.key === tab)?.label })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 md:p-6", children: [
        tab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl space-y-3", children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-20 rounded-xl" }, i)) }),
          !isLoading && orders?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-12 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 44, className: "mx-auto text-[color:var(--muted-foreground)] mb-4 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl mb-2", children: "No orders yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[color:var(--muted-foreground)] text-sm mb-6", children: "Your wardrobe journey starts here." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "btn-rose inline-flex", children: "Start shopping →" })
          ] }),
          orders?.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full p-4 flex items-center justify-between gap-3 text-left", onClick: () => setExpanded(expanded === o.id ? null : o.id), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "order-number text-[color:var(--rose)] text-sm", children: o.order_number }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `chip text-[10px] border ${statusColor$1[o.status] ?? ""}`, children: o.status })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted-foreground)] mt-0.5", children: [
                  new Date(o.created_at).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" }),
                  o.is_pickup ? " · Pickup" : o.delivery_address?.area ? ` · ${o.delivery_address.area}` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price text-[color:var(--rose)] text-sm font-semibold", children: formatKsh(o.total) }),
                expanded === o.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 15 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded === o.id && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.25 }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 border-t border-[color:var(--border)] pt-4 space-y-3", children: [
              o.order_items?.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                it.product_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.product_image, alt: it.product_name, className: "w-12 h-14 object-cover rounded-lg shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: it.product_name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted-foreground)]", children: [
                    [it.size, it.color].filter(Boolean).join(" · "),
                    " · qty ",
                    it.quantity
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price text-sm shrink-0", children: formatKsh(Number(it.unit_price) * it.quantity) })
              ] }, it.id)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-[color:var(--border)] pt-3 text-sm space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[color:var(--muted-foreground)]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price", children: Number(o.delivery_fee) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--success)]", children: "FREE" }) : formatKsh(o.delivery_fee) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-base", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price text-[color:var(--rose)]", children: formatKsh(o.total) })
                ] }),
                o.is_pickup ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted-foreground)]", children: [
                  "Pickup: ",
                  o.pickup_branch,
                  " branch"
                ] }) : o.delivery_address?.area && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted-foreground)]", children: [
                  "Delivery to: ",
                  o.delivery_address.area
                ] })
              ] })
            ] }) }) })
          ] }, o.id))
        ] }),
        tab === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, className: "text-[color:var(--rose)]" }),
              " Personal Info"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1.5 block", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", value: profile.full_name, onChange: (e) => setProfile({ ...profile, full_name: e.target.value }), placeholder: "Your full name" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1.5 block", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9 opacity-60", value: userEmail, readOnly: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--muted-foreground)] mt-1", children: "Email cannot be changed here." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1.5 block", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9", value: profile.phone, onChange: (e) => setProfile({ ...profile, phone: e.target.value }), placeholder: "+254 7XX XXX XXX" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1.5 block", children: "City" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9", value: profile.city, onChange: (e) => setProfile({ ...profile, city: e.target.value }), placeholder: "Nairobi, Makueni…" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => saveMutation.mutate(), disabled: saveMutation.isPending, className: "btn-rose", children: saveMutation.isPending ? "Saving…" : "Save Changes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 18, className: "text-[color:var(--rose)]" }),
              " Change Password"
            ] }),
            ["current", "next", "confirm"].map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1.5 block", children: field === "current" ? "Current Password" : field === "next" ? "New Password" : "Confirm New Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    className: "input-luxe pl-9 pr-10",
                    type: showPw[field] ? "text" : "password",
                    placeholder: "••••••••",
                    value: passwords[field],
                    onChange: (e) => setPasswords({ ...passwords, [field]: e.target.value })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPw({ ...showPw, [field]: !showPw[field] }),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)] hover:text-[color:var(--rose)]",
                    children: showPw[field] ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
                  }
                )
              ] })
            ] }, field)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: changePassword, disabled: pwBusy || !passwords.next || !passwords.confirm, className: "btn-rose", children: pwBusy ? "Updating…" : "Update Password" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 18, className: "text-[color:var(--rose)]" }),
              " Sign Out"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[color:var(--muted-foreground)] mb-4", children: "You'll be signed out of your account on this device." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: signOut, className: "btn-ghost flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 15 }),
              " Sign out of account"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
const adminStats = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("fc54988025651b0d207f9ef4346d9f0fe848ff17785294a4a080cffaee281f4f"));
const adminListOrders = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator(objectType({
  status: stringType().optional()
}).optional()).handler(createSsrRpc("573be2cdf3c95bfa88f6bb3d2080ff0b0c620db545ac53f2f5a039a50348d737"));
const adminUpdateOrderStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(objectType({
  id: stringType().uuid(),
  status: enumType(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"])
})).handler(createSsrRpc("9505b54584006d8459dff4f0d9b2b1ccc184fc05200648ce850e9f9f7ee3f723"));
const ProductInput = objectType({
  id: stringType().uuid().optional(),
  name: stringType().min(1).max(160),
  slug: stringType().min(1).max(160).regex(/^[a-z0-9-]+$/),
  description: stringType().max(2e3).optional(),
  price: numberType().min(0).max(1e7),
  compare_price: numberType().min(0).max(1e7).nullable().optional(),
  category_id: stringType().uuid().nullable().optional(),
  sizes: arrayType(stringType().max(20)).max(20),
  colors: arrayType(stringType().max(40)).max(20),
  images: arrayType(stringType().url()).max(10),
  stock_quantity: numberType().int().min(0).max(1e5),
  is_featured: booleanType(),
  branch: enumType(["nairobi", "makueni", "both"])
});
const adminUpsertProduct = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(ProductInput).handler(createSsrRpc("8552c7bea139694beea39d17e69f323a972d63fd26947a65dd6b49554eb191c8"));
const adminDeleteProduct = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(objectType({
  id: stringType().uuid()
})).handler(createSsrRpc("0ddf57ac23192120a1e98e48f57343c6fe83e8a1ddcf5df54be83354a1f768ad"));
const CategoryInput = objectType({
  id: stringType().uuid().optional(),
  name: stringType().min(1).max(80),
  slug: stringType().min(1).max(80).regex(/^[a-z0-9-]+$/),
  description: stringType().max(500).optional(),
  image_url: stringType().url().nullable().optional()
});
const adminUpsertCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(CategoryInput).handler(createSsrRpc("6bada778c941c28d8f4bb5693567682fcc0a8cc5f8e134db94c3d77ba2454fce"));
const adminDeleteCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(objectType({
  id: stringType().uuid()
})).handler(createSsrRpc("950328abc056627e7020b8ee4af15de2c8185c6b4f0fa341cec497db75a14951"));
const ZoneInput = objectType({
  id: stringType().uuid().optional(),
  name: stringType().min(1).max(80),
  fee: numberType().min(0).max(1e4),
  is_free: booleanType()
});
const adminUpsertZone = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(ZoneInput).handler(createSsrRpc("5a0b01e9603580153d4466db27d3fdfb1126d0b21c0d8a3719cbed076c2eb50a"));
const adminDeleteZone = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator(objectType({
  id: stringType().uuid()
})).handler(createSsrRpc("5d4e304b03fe5094aebf06651582ae3142336a7785c9d8d42a6820db561ed7e2"));
const Route$1 = createFileRoute("/_authenticated/admin")({ component: Admin });
const NAV = [
  { key: "stats", label: "Overview", icon: LayoutDashboard },
  { key: "orders", label: "Orders", icon: ShoppingBag },
  { key: "products", label: "Products", icon: Package },
  { key: "categories", label: "Categories", icon: Tag },
  { key: "zones", label: "Delivery Zones", icon: Truck }
];
const statusColor = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  processing: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  shipped: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  delivered: "bg-green-500/20 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30"
};
function Admin() {
  const [tab, setTab] = reactExports.useState("stats");
  const [allowed, setAllowed] = reactExports.useState(null);
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        setAllowed(false);
        return;
      }
      const { data: r } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
      setAllowed(!!r);
    });
  }, []);
  if (allowed === null) return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-screen m-4 rounded-2xl" }) });
  if (!allowed) return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 text-center max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl mb-3", children: "Admin only" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[color:var(--muted-foreground)]", children: "Your account doesn't have admin access." })
  ] }) });
  const handleTab = (t) => {
    setTab(t);
    setSidebarOpen(false);
  };
  const signOut = async () => {
    const ok = await confirm({
      title: "Signing out?",
      body: "You'll be signed out of the admin panel.",
      confirmLabel: "Sign Out",
      confirmClass: "text-sm py-2 px-5 rounded-full font-semibold btn-rose"
    });
    if (!ok) return;
    await supabase.auth.signOut();
    window.location.href = "/";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[calc(100vh-4rem)] overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: () => setSidebarOpen(false),
        className: "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `fixed top-0 left-0 h-full w-64 z-50 bg-[color:var(--plum-deep)] border-r border-[color:var(--border)] flex flex-col transition-transform duration-300 md:static md:translate-x-0 md:h-full md:shrink-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-[color:var(--border)] shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg mt-0.5", children: "Christine Collections" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 p-3 space-y-1", children: NAV.map(({ key, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleTab(key),
          className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition text-left ${tab === key ? "bg-[color:var(--rose)]/15 text-[color:var(--rose)] border border-[color:var(--rose)]/30" : "hover:bg-[color:var(--muted)] text-[color:var(--muted-foreground)] hover:text-[color:var(--cream)]"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 17 }),
            label
          ]
        },
        key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-[color:var(--border)] shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: signOut,
          className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[color:var(--muted-foreground)] hover:bg-red-500/10 hover:text-red-400 transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 17 }),
            " Sign Out"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 bg-[color:var(--background)]/90 backdrop-blur-md border-b border-[color:var(--border)] px-4 py-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSidebarOpen(true), className: "md:hidden p-2 rounded-lg hover:bg-[color:var(--muted)] transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-[10px]", children: "Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg leading-none", children: NAV.find((n) => n.key === tab)?.label })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 md:p-6", children: [
        tab === "stats" && /* @__PURE__ */ jsxRuntimeExports.jsx(Stats, {}),
        tab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsx(Orders, {}),
        tab === "products" && /* @__PURE__ */ jsxRuntimeExports.jsx(Products, {}),
        tab === "categories" && /* @__PURE__ */ jsxRuntimeExports.jsx(Categories, {}),
        tab === "zones" && /* @__PURE__ */ jsxRuntimeExports.jsx(Zones, {})
      ] })
    ] })
  ] }) });
}
function Stats() {
  const { data, isLoading } = useQuery({ queryKey: ["admin-stats"], queryFn: () => adminStats() });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-28 rounded-2xl" }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-64 rounded-2xl" })
  ] });
  if (!data) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: [
      { label: "Total Orders", value: data.totalOrders, format: false },
      { label: "Revenue Today", value: data.revenueToday, format: true },
      { label: "Revenue This Month", value: data.revenueMonth, format: true }
    ].map(({ label, value, format }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-4 md:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-[10px] md:text-xs", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl md:text-4xl mt-2 text-[color:var(--rose)]", children: format ? formatKsh(value) : value })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-4 md:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-4", children: "Revenue · last 14 days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: data.days, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", stroke: "#888", fontSize: 10 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#888", fontSize: 10, tickFormatter: (v) => `${(v / 1e3).toFixed(0)}k` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: { background: "#1A0F1B", border: "1px solid #444", borderRadius: 8, fontSize: 12 }, formatter: (v) => [formatKsh(v), "Revenue"] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "revenue", stroke: "#C0866A", strokeWidth: 2.5, dot: { fill: "#C0866A", r: 3 }, activeDot: { r: 5 } })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-4 md:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Orders by Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 md:grid-cols-6 gap-2", children: Object.entries(data.byStatus).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-3 py-2.5 rounded-xl border text-center ${statusColor[k] ?? "bg-[color:var(--secondary)] border-transparent"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] capitalize mb-0.5", children: k }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl", children: v })
      ] }, k)) })
    ] })
  ] });
}
function Orders() {
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [expanded, setExpanded] = reactExports.useState(null);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-orders", statusFilter], queryFn: () => adminListOrders({ data: { status: statusFilter } }) });
  const filtered = reactExports.useMemo(() => {
    if (!data) return [];
    const q = search.toLowerCase();
    if (!q) return data;
    return data.filter(
      (o) => o.order_number?.toLowerCase().includes(q) || o.delivery_address?.fullName?.toLowerCase().includes(q) || o.guest_email?.toLowerCase().includes(q) || o.mpesa_phone?.includes(q) || o.delivery_address?.phone?.includes(q)
    );
  }, [data, search]);
  const update = async (id, s) => {
    try {
      await adminUpdateOrderStatus({ data: { id, status: s } });
      toast.success("Status updated");
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
    } catch (e) {
      toast.error(e.message);
    }
  };
  const customerName = (o) => o.delivery_address?.fullName || o.guest_email || o.mpesa_phone || "Customer";
  const customerPhone = (o) => o.delivery_address?.phone || o.guest_phone || o.mpesa_phone || null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9 text-sm", placeholder: "Search by order #, name, phone…", value: search, onChange: (e) => setSearch(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "input-luxe text-sm sm:w-44", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All statuses" }),
        ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[color:var(--muted-foreground)] self-center whitespace-nowrap", children: [
        filtered.length,
        " orders"
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-20 rounded-xl" }, i)) }),
    !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 36, className: "mx-auto mb-3 text-[color:var(--muted-foreground)] opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl", children: "No orders found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[color:var(--muted-foreground)] mt-1", children: "Try adjusting your search or filter." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full p-4 flex items-center justify-between gap-3 text-left", onClick: () => setExpanded(expanded === o.id ? null : o.id), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "order-number text-[color:var(--rose)] text-sm", children: o.order_number }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `chip text-[10px] border ${statusColor[o.status] ?? ""}`, children: o.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-[color:var(--cream)] truncate", children: customerName(o) }),
            customerPhone(o) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[color:var(--muted-foreground)]", children: customerPhone(o) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[color:var(--muted-foreground)] hidden sm:block", children: new Date(o.created_at).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price text-[color:var(--rose)] text-sm font-semibold", children: formatKsh(o.total) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: o.status, onClick: (e) => e.stopPropagation(), onChange: (e) => update(o.id, e.target.value), className: "input-luxe text-xs py-1.5 w-32 hidden sm:block", children: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) }),
          expanded === o.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 15 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded === o.id && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 border-t border-[color:var(--border)] pt-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Update Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: o.status, onChange: (e) => update(o.id, e.target.value), className: "input-luxe text-sm w-full", children: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[color:var(--muted)]/40 rounded-xl p-3 space-y-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-1", children: "Customer" }),
            o.delivery_address?.fullName && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted-foreground)]", children: "Name: " }),
              o.delivery_address.fullName
            ] }),
            (o.guest_email || o.delivery_address?.email) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted-foreground)]", children: "Email: " }),
              o.guest_email || o.delivery_address?.email
            ] }),
            customerPhone(o) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted-foreground)]", children: "Phone: " }),
              customerPhone(o)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted-foreground)]", children: "Payment: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: o.payment_status === "paid" ? "text-[color:var(--success)]" : o.payment_status === "failed" ? "text-red-400" : "text-yellow-400", children: o.payment_status })
            ] }),
            o.mpesa_receipt_number && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted-foreground)]", children: "M-Pesa: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--success)]", children: o.mpesa_receipt_number })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[color:var(--muted)]/40 rounded-xl p-3 space-y-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-1", children: "Delivery" }),
            o.is_pickup ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted-foreground)]", children: "Pickup: " }),
              o.pickup_branch,
              " branch"
            ] }) : o.delivery_address ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              o.delivery_address.street && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted-foreground)]", children: "Street: " }),
                o.delivery_address.street
              ] }),
              o.delivery_address.area && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted-foreground)]", children: "Area: " }),
                o.delivery_address.area
              ] }),
              o.delivery_address.instructions && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted-foreground)]", children: "Note: " }),
                o.delivery_address.instructions
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted-foreground)]", children: "Fee: " }),
                Number(o.delivery_fee) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--success)]", children: "FREE" }) : formatKsh(o.delivery_fee)
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[color:var(--muted-foreground)]", children: "No delivery info" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          o.order_items?.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
            it.product_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.product_image, alt: "", className: "w-10 h-12 object-cover rounded-md shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate", children: [
                it.product_name,
                " × ",
                it.quantity
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--muted-foreground)]", children: [it.size, it.color].filter(Boolean).join(" · ") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price shrink-0", children: formatKsh(Number(it.unit_price) * it.quantity) })
          ] }, it.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2 border-t border-[color:var(--border)] text-sm font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price text-[color:var(--rose)]", children: formatKsh(o.total) })
          ] })
        ] })
      ] }) }) })
    ] }, o.id)) })
  ] });
}
function ImageUploader({ onUploaded }) {
  const ref = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const upload = async (file) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: false });
    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    onUploaded(data.publicUrl);
    toast.success("Image uploaded");
    setUploading(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => ref.current?.click(),
      className: `flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-[color:var(--rose)]/50 text-xs text-[color:var(--rose)] hover:border-[color:var(--rose)] transition ${uploading ? "opacity-60 cursor-wait" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 13 }),
        uploading ? "Uploading…" : "Upload image",
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref, type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
        } })
      ]
    }
  );
}
const emptyProduct = { name: "", slug: "", description: "", price: 0, compare_price: null, category_id: null, sizes: [], colors: [], images: [], stock_quantity: 0, is_featured: false, branch: "both" };
function Products() {
  const qc = useQueryClient();
  const [modal, setModal] = reactExports.useState(null);
  const [sizesInput, setSizesInput] = reactExports.useState("");
  const [colorsInput, setColorsInput] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const [branchFilter, setBranchFilter] = reactExports.useState("all");
  const [featuredFilter, setFeaturedFilter] = reactExports.useState("all");
  const { data: products, isLoading } = useQuery({ queryKey: ["admin-products"], queryFn: () => listProducts({ data: {} }) });
  const { data: cats } = useQuery({ queryKey: ["cats"], queryFn: () => listCategories() });
  const filtered = reactExports.useMemo(() => {
    let r = products ?? [];
    const q = search.toLowerCase();
    if (q) r = r.filter((p) => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q));
    if (branchFilter !== "all") r = r.filter((p) => p.branch === branchFilter || p.branch === "both");
    if (featuredFilter === "featured") r = r.filter((p) => p.is_featured);
    if (featuredFilter === "regular") r = r.filter((p) => !p.is_featured);
    return r;
  }, [products, search, branchFilter, featuredFilter]);
  const upsert = useMutation({
    mutationFn: (d) => adminUpsertProduct({ data: d }),
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["products-all"] });
      setModal(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const del = useMutation({
    mutationFn: (id) => adminDeleteProduct({ data: { id } }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["products-all"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const openNew = () => {
    setModal({ ...emptyProduct });
    setSizesInput("");
    setColorsInput("");
  };
  const openEdit = (p) => {
    setModal({ ...p, compare_price: p.compare_price ?? null });
    setSizesInput((p.sizes ?? []).join(", "));
    setColorsInput((p.colors ?? []).join(", "));
  };
  const addImage = (url) => {
    if (!modal) return;
    setModal({ ...modal, images: [...modal.images, url] });
  };
  const removeImage = (i) => {
    if (!modal) return;
    setModal({ ...modal, images: modal.images.filter((_, idx) => idx !== i) });
  };
  const save = () => {
    if (!modal) return;
    upsert.mutate({ ...modal, sizes: sizesInput.split(",").map((s) => s.trim()).filter(Boolean), colors: colorsInput.split(",").map((s) => s.trim()).filter(Boolean) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9 text-sm", placeholder: "Search products…", value: search, onChange: (e) => setSearch(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: branchFilter, onChange: (e) => setBranchFilter(e.target.value), className: "input-luxe text-sm sm:w-36", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All branches" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "nairobi", children: "Nairobi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "makueni", children: "Makueni" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: featuredFilter, onChange: (e) => setFeaturedFilter(e.target.value), className: "input-luxe text-sm sm:w-36", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "featured", children: "Featured" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "regular", children: "Regular" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openNew, className: "btn-rose text-xs whitespace-nowrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
        " Add Product"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted-foreground)]", children: [
      filtered.length,
      " products"
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-24 rounded-xl" }, i)) }),
    !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 36, className: "mx-auto mb-3 text-[color:var(--muted-foreground)] opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl", children: "No products found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[color:var(--muted-foreground)] mt-1", children: "Try a different search or filter." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-3 flex gap-3 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-18 rounded-lg overflow-hidden bg-[color:var(--muted)] shrink-0 aspect-[3/4] w-14", children: p.images?.[0] ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.images[0], alt: p.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 16, className: "text-[color:var(--muted-foreground)]" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm leading-tight line-clamp-2", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "price text-xs text-[color:var(--rose)] mt-0.5", children: formatKsh(p.price) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-[color:var(--muted-foreground)]", children: [
            "Stock: ",
            p.stock_quantity
          ] }),
          p.stock_quantity === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip text-[9px] bg-red-500/15 border-red-500/30 text-red-400", children: "Out" }),
          p.is_featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip text-[9px]", children: "Featured" }),
          p.branch !== "both" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip text-[9px]", children: p.branch })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => openEdit(p), className: "flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-[color:var(--border)] hover:border-[color:var(--rose)] hover:text-[color:var(--rose)] transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 11 }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: async () => {
              const ok = await confirm({ title: "Delete this product?", body: "This action cannot be undone.", confirmLabel: "Yes, Delete" });
              if (ok) del.mutate(p.id);
            },
            className: "flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-[color:var(--border)] hover:border-red-500 hover:text-red-400 transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11 }),
              " Delete"
            ]
          }
        )
      ] })
    ] }, p.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: modal && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setModal(null), className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.96 },
          className: "fixed inset-3 md:inset-8 z-50 bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl overflow-y-auto p-5 md:p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl", children: [
                modal.id ? "Edit" : "New",
                " Product"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(null), className: "p-1.5 rounded-lg hover:bg-[color:var(--muted)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4 max-w-3xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", value: modal.name, onChange: (e) => setModal({ ...modal, name: e.target.value }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Slug" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", value: modal.slug, onChange: (e) => setModal({ ...modal, slug: e.target.value }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "input-luxe h-20", value: modal.description ?? "", onChange: (e) => setModal({ ...modal, description: e.target.value }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Price (KSh)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: "input-luxe", value: modal.price, onChange: (e) => setModal({ ...modal, price: Number(e.target.value) }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Compare Price" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: "input-luxe", value: modal.compare_price ?? "", onChange: (e) => setModal({ ...modal, compare_price: e.target.value ? Number(e.target.value) : null }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Stock Qty" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: "input-luxe", value: modal.stock_quantity, onChange: (e) => setModal({ ...modal, stock_quantity: Number(e.target.value) }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "input-luxe", value: modal.category_id ?? "", onChange: (e) => setModal({ ...modal, category_id: e.target.value || null }), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "None" }),
                  cats?.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.name }, c.id))
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Branch" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "input-luxe", value: modal.branch, onChange: (e) => setModal({ ...modal, branch: e.target.value }), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "both", children: "Both" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "nairobi", children: "Nairobi" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "makueni", children: "Makueni" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Sizes (comma-separated)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", value: sizesInput, onChange: (e) => setSizesInput(e.target.value), placeholder: "XS, S, M, L, XL" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Colors (comma-separated)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", value: colorsInput, onChange: (e) => setColorsInput(e.target.value), placeholder: "Plum, Blush, Black" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-2 block", children: "Images" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-3", children: [
                  modal.images.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-20 rounded-lg overflow-hidden border border-[color:var(--border)] group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", className: "w-full h-full object-cover" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeImage(i), className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "text-white" }) })
                  ] }, i)),
                  modal.images.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-20 rounded-lg border border-dashed border-[color:var(--border)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 18, className: "text-[color:var(--muted-foreground)]" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUploader, { onUploaded: addImage })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "featured", checked: modal.is_featured, onChange: (e) => setModal({ ...modal, is_featured: e.target.checked }), className: "accent-[#C0866A] w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "featured", className: "text-sm", children: "Featured product" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, disabled: upsert.isPending, className: "btn-rose", children: upsert.isPending ? "Saving…" : "Save Product" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(null), className: "btn-ghost", children: "Cancel" })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
const emptyCategory = { name: "", slug: "", description: "", image_url: null };
function Categories() {
  const qc = useQueryClient();
  const [modal, setModal] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const { data: cats, isLoading } = useQuery({ queryKey: ["cats"], queryFn: () => listCategories() });
  const filtered = reactExports.useMemo(() => {
    const q = search.toLowerCase();
    return q ? (cats ?? []).filter((c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)) : cats ?? [];
  }, [cats, search]);
  const upsert = useMutation({
    mutationFn: (d) => adminUpsertCategory({ data: d }),
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["cats"] });
      setModal(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const del = useMutation({
    mutationFn: (id) => adminDeleteCategory({ data: { id } }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["cats"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const autoSlug = (name) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9 text-sm", placeholder: "Search categories…", value: search, onChange: (e) => setSearch(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setModal({ ...emptyCategory }), className: "btn-rose text-xs whitespace-nowrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
        " Add Category"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted-foreground)]", children: [
      filtered.length,
      " categories"
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-20 rounded-xl" }, i)) }),
    !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 36, className: "mx-auto mb-3 text-[color:var(--muted-foreground)] opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl", children: "No categories found" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3", children: filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-4 flex items-start gap-3", children: [
      c.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image_url, alt: c.name, className: "w-12 h-12 object-cover rounded-lg shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-[color:var(--muted)] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 18, className: "text-[color:var(--muted-foreground)]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm truncate", children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--muted-foreground)] truncate", children: c.slug }),
        c.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--muted-foreground)] mt-1 line-clamp-1", children: c.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setModal({ id: c.id, name: c.name, slug: c.slug, description: c.description ?? "", image_url: c.image_url }),
            className: "flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-[color:var(--border)] hover:border-[color:var(--rose)] hover:text-[color:var(--rose)] transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 11 }),
              " Edit"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: async () => {
              const ok = await confirm({ title: "Delete this category?", body: "All products will become uncategorised.", confirmLabel: "Yes, Delete" });
              if (ok) del.mutate(c.id);
            },
            className: "flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-[color:var(--border)] hover:border-red-500 hover:text-red-400 transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11 }),
              " Delete"
            ]
          }
        )
      ] })
    ] }, c.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: modal && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setModal(null), className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 20 },
          className: "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-lg bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl", children: [
                modal.id ? "Edit" : "New",
                " Category"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(null), className: "p-1.5 rounded-lg hover:bg-[color:var(--muted)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", value: modal.name, onChange: (e) => setModal({ ...modal, name: e.target.value, slug: modal.id ? modal.slug : autoSlug(e.target.value) }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Slug" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", value: modal.slug, onChange: (e) => setModal({ ...modal, slug: e.target.value }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "input-luxe h-16", value: modal.description ?? "", onChange: (e) => setModal({ ...modal, description: e.target.value }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-2 block", children: "Image" }),
                modal.image_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-20 h-20 mb-2 rounded-lg overflow-hidden border border-[color:var(--border)] group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: modal.image_url, alt: "", className: "w-full h-full object-cover" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal({ ...modal, image_url: null }), className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "text-white" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUploader, { onUploaded: (url) => setModal({ ...modal, image_url: url }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => upsert.mutate(modal), disabled: upsert.isPending || !modal.name || !modal.slug, className: "btn-rose", children: upsert.isPending ? "Saving…" : "Save" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(null), className: "btn-ghost", children: "Cancel" })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
function Zones() {
  const qc = useQueryClient();
  const [modal, setModal] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [freeFilter, setFreeFilter] = reactExports.useState("all");
  const { data: zones, isLoading } = useQuery({ queryKey: ["zones"], queryFn: () => listDeliveryZones() });
  const filtered = reactExports.useMemo(() => {
    let r = zones ?? [];
    const q = search.toLowerCase();
    if (q) r = r.filter((z2) => z2.name.toLowerCase().includes(q));
    if (freeFilter === "free") r = r.filter((z2) => z2.is_free);
    if (freeFilter === "paid") r = r.filter((z2) => !z2.is_free);
    return r;
  }, [zones, search, freeFilter]);
  const upsert = useMutation({
    mutationFn: (d) => adminUpsertZone({ data: d }),
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["zones"] });
      setModal(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const del = useMutation({
    mutationFn: (id) => adminDeleteZone({ data: { id } }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["zones"] });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe pl-9 text-sm", placeholder: "Search zones…", value: search, onChange: (e) => setSearch(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: freeFilter, onChange: (e) => setFreeFilter(e.target.value), className: "input-luxe text-sm sm:w-36", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All zones" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "free", children: "Free delivery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "paid", children: "Paid delivery" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setModal({ name: "", fee: 0, is_free: false }), className: "btn-rose text-xs whitespace-nowrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
        " Add Zone"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted-foreground)]", children: [
      filtered.length,
      " zones"
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-14 rounded-xl" }, i)) }),
    !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 36, className: "mx-auto mb-3 text-[color:var(--muted-foreground)] opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl", children: "No zones found" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-2", children: filtered.map((z2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-luxe p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: z2.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-0.5", children: z2.is_free ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--success)]", children: "FREE delivery" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted-foreground)]", children: formatKsh(z2.fee) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setModal({ id: z2.id, name: z2.name, fee: z2.fee, is_free: z2.is_free }),
            className: "flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-[color:var(--border)] hover:border-[color:var(--rose)] hover:text-[color:var(--rose)] transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 11 }),
              " Edit"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: async () => {
              const ok = await confirm({ title: "Delete this zone?", body: "Existing orders are not affected.", confirmLabel: "Yes, Delete" });
              if (ok) del.mutate(z2.id);
            },
            className: "flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-[color:var(--border)] hover:border-red-500 hover:text-red-400 transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11 }),
              " Delete"
            ]
          }
        )
      ] })
    ] }, z2.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: modal && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setModal(null), className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 20 },
          className: "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-md bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl", children: [
                modal.id ? "Edit" : "New",
                " Zone"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(null), className: "p-1.5 rounded-lg hover:bg-[color:var(--muted)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Zone Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input-luxe", value: modal.name, onChange: (e) => setModal({ ...modal, name: e.target.value }), placeholder: "e.g. Nairobi CBD" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow mb-1 block", children: "Delivery Fee (KSh)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: "input-luxe", value: modal.fee, onChange: (e) => setModal({ ...modal, fee: Number(e.target.value) }), disabled: modal.is_free })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "is_free", checked: modal.is_free, onChange: (e) => setModal({ ...modal, is_free: e.target.checked, fee: e.target.checked ? 0 : modal.fee }), className: "accent-[#C0866A] w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "is_free", className: "text-sm", children: "Free delivery zone" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => upsert.mutate(modal), disabled: upsert.isPending || !modal.name, className: "btn-rose", children: upsert.isPending ? "Saving…" : "Save" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(null), className: "btn-ghost", children: "Cancel" })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
const Route = createFileRoute("/api/public/mpesa-callback")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const cb = body?.Body?.stkCallback;
          if (!cb) return new Response("ok");
          const checkoutId = cb.CheckoutRequestID;
          const resultCode = cb.ResultCode;
          if (!checkoutId) return new Response("ok");
          const { supabaseAdmin } = await import("./client.server-D5ro3rAQ.mjs");
          if (resultCode === 0) {
            const items = cb.CallbackMetadata?.Item ?? [];
            const receipt = items.find((i) => i.Name === "MpesaReceiptNumber")?.Value;
            await supabaseAdmin.from("orders").update({ payment_status: "paid", status: "confirmed", mpesa_receipt_number: receipt ?? null }).eq("mpesa_checkout_request_id", checkoutId);
          } else {
            await supabaseAdmin.from("orders").update({ payment_status: "failed" }).eq("mpesa_checkout_request_id", checkoutId);
          }
          return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }), {
            headers: { "Content-Type": "application/json" }
          });
        } catch (e) {
          console.error("mpesa callback error", e);
          return new Response("error", { status: 500 });
        }
      }
    }
  }
});
const ShopRoute = Route$a.update({
  id: "/shop",
  path: "/shop",
  getParentRoute: () => Route$b
});
const CheckoutRoute = Route$9.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$b
});
const AuthRoute = Route$8.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$b
});
const AdminLoginRoute = Route$7.update({
  id: "/admin-login",
  path: "/admin-login",
  getParentRoute: () => Route$b
});
const AuthenticatedRouteRoute = Route$6.update({
  id: "/_authenticated",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const ShopSlugRoute = Route$4.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => ShopRoute
});
const OrderConfirmationIdRoute = Route$3.update({
  id: "/order-confirmation/$id",
  path: "/order-confirmation/$id",
  getParentRoute: () => Route$b
});
const AuthenticatedDashboardRoute = Route$2.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const ApiPublicMpesaCallbackRoute = Route.update({
  id: "/api/public/mpesa-callback",
  path: "/api/public/mpesa-callback",
  getParentRoute: () => Route$b
});
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAdminRoute,
  AuthenticatedDashboardRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const ShopRouteChildren = {
  ShopSlugRoute
};
const ShopRouteWithChildren = ShopRoute._addFileChildren(ShopRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AdminLoginRoute,
  AuthRoute,
  CheckoutRoute,
  ShopRoute: ShopRouteWithChildren,
  OrderConfirmationIdRoute,
  ApiPublicMpesaCallbackRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
