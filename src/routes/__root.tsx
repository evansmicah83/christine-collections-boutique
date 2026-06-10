import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-[color:var(--rose)]">404</h1>
        <p className="mt-4 text-[color:var(--muted-foreground)]">This page wandered off the runway.</p>
        <a href="/" className="btn-rose mt-6 inline-flex">Back home</a>
      </div>
    </div>
  );
}
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "root" }); }, [error]);
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
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/81c740d3-1f28-4716-8044-3b8094338917/id-preview-882e4e82--f6e4399d-620d-4afd-a49e-be957dec7ddd.lovable.app-1780938530997.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/81c740d3-1f28-4716-8044-3b8094338917/id-preview-882e4e82--f6e4399d-620d-4afd-a49e-be957dec7ddd.lovable.app-1780938530997.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
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
