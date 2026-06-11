import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { WhatsAppButton, BackToTop, FloatingCart } from "./Floaties";
import { ConfirmModalProvider } from "./ConfirmModal";
import { SessionExpiredModal } from "./SessionExpiredModal";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
      <FloatingCart />
      <BackToTop />
      <ConfirmModalProvider />
      <SessionExpiredModal />
      <Toaster theme="dark" position="top-right" toastOptions={{ style: { background: "var(--card)", color: "var(--cream)", border: "1px solid var(--border)" } }} />
    </div>
  );
}
