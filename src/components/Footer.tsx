import { BRAND } from "@/lib/brand";
export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] mt-24 py-12 px-5 text-sm">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl mb-2">{BRAND.name}</h3>
          <p className="text-[color:var(--muted-foreground)]">{BRAND.tagline}.</p>
        </div>
        <div>
          <p className="eyebrow mb-3">Branches</p>
          {BRAND.branches.map((b) => (
            <div key={b.id} className="mb-2">
              <p className="font-medium">{b.name}</p>
              <p className="text-[color:var(--muted-foreground)] text-xs">{b.address} · {b.hours}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="eyebrow mb-3">Stay in touch</p>
          <p className="text-[color:var(--muted-foreground)]">WhatsApp: {BRAND.whatsapp}</p>
        </div>
      </div>
      <p className="text-center text-xs text-[color:var(--muted-foreground)] mt-8">© {new Date().getFullYear()} {BRAND.name}. Handmade in Kenya.</p>
    </footer>
  );
}
