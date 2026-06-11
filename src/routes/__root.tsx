import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-[#1A0F1B] flex flex-col" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Minimal nav */}
      <header className="border-b border-[rgba(192,134,106,0.2)] px-5 py-4">
        <a href="/" className="inline-flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#C0866A] flex items-center justify-center">
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-[#1A0F1B] font-bold text-sm">C</span>
          </div>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-[#F5EEE8] font-medium tracking-wide text-sm group-hover:text-[#C0866A] transition">Christine Collections</span>
        </a>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-5 py-16">
        <div className="text-center max-w-lg">

          {/* Animated hanger SVG */}
          <div className="flex justify-center mb-8">
            <HangerIllustration />
          </div>

          {/* 404 */}
          <p
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#C0866A", fontSize: "clamp(5rem, 20vw, 8rem)", lineHeight: 1, letterSpacing: "-0.02em" }}
            className="font-bold mb-4"
          >
            404
          </p>

          <h1
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5EEE8" }}
            className="text-2xl md:text-3xl font-semibold mb-3"
          >
            This page got lost in the wardrobe
          </h1>

          <p className="text-sm md:text-base mb-8" style={{ color: "rgba(245,238,232,0.55)" }}>
            The page you're looking for doesn't exist or has moved.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/"
              style={{
                background: "linear-gradient(135deg, #C0866A, #d4a08a)",
                color: "#1A0F1B",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontSize: "0.72rem",
                padding: "0.75rem 1.6rem",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                textDecoration: "none",
              }}
            >
              Go Home
            </a>
            <a
              href="/shop"
              style={{
                border: "1px solid rgba(192,134,106,0.5)",
                color: "#F5EEE8",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontSize: "0.72rem",
                padding: "0.75rem 1.6rem",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                textDecoration: "none",
              }}
            >
              Browse the Shop
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function HangerIllustration() {
  return (
    <svg
      width="120" height="100" viewBox="0 0 120 100"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: "hangerSway 3s ease-in-out infinite" }}
    >
      <style>{`
        @keyframes hangerSway {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
      `}</style>
      {/* Hook */}
      <path d="M60 8 C60 8 60 2 66 2 C72 2 72 8 66 12" stroke="#C0866A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Neck drop */}
      <line x1="60" y1="8" x2="60" y2="32" stroke="#C0866A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left shoulder */}
      <path d="M60 32 C50 32 18 50 10 58" stroke="#C0866A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Right shoulder */}
      <path d="M60 32 C70 32 102 50 110 58" stroke="#C0866A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Bar */}
      <line x1="10" y1="58" x2="110" y2="58" stroke="#C0866A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Decorative dots — blush accents */}
      <circle cx="10" cy="58" r="3" fill="#F2D4C8" opacity="0.7" />
      <circle cx="110" cy="58" r="3" fill="#F2D4C8" opacity="0.7" />
      <circle cx="60" cy="32" r="2.5" fill="#C0866A" opacity="0.5" />
      {/* Subtle garment hint — a wavy line below the bar */}
      <path d="M30 68 Q45 76 60 68 Q75 60 90 68" stroke="rgba(192,134,106,0.3)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M30 76 Q45 84 60 76 Q75 68 90 76" stroke="rgba(192,134,106,0.2)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportError(error, { boundary: "root" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="font-display text-2xl">Something went wrong</h1>
        <p className="mt-2 text-[color:var(--muted-foreground)] text-sm">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="btn-rose mt-6">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
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
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:image", content: "/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&family=Courier+Prime:wght@400;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
