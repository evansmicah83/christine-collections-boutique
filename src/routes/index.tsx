import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, MapPin, ArrowRight, ShieldCheck, RefreshCw, Headphones, Star, X, Quote } from "lucide-react";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { ProductCard } from "@/components/ProductCard";
import { listProducts, listCategories } from "@/lib/catalog.functions";
import { BRAND } from "@/lib/brand";

const HERO_IMAGE = "https://images.pexels.com/photos/16850176/pexels-photo-16850176.jpeg?auto=compress&cs=tinysrgb&w=1800";

const AVATARS = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=80&h=80&fit=crop&crop=face",
];

const TESTIMONIALS = [
  {
    name: "Wanjiru Kamau",
    location: "Nairobi, Westlands",
    avatar: AVATARS[0],
    rating: 5,
    text: "Christine Collections is my go-to boutique! The quality is exceptional and the styles are so unique. I wore one of their dresses to my daughter's graduation and received so many compliments. Free delivery to Westlands made it even better!",
    product: "Ankara Wrap Dress",
  },
  {
    name: "Amina Hassan",
    location: "Nairobi, Kilimani",
    avatar: AVATARS[1],
    rating: 5,
    text: "As a mother of three, I need clothes that are both stylish and practical. Christine Collections understands the Kenyan woman. The fabrics are breathable, the cuts are flattering, and the prices are reasonable. Highly recommended!",
    product: "Linen Midi Dress",
  },
  {
    name: "Njeri Mwangi",
    location: "Makueni Town",
    avatar: AVATARS[2],
    rating: 5,
    text: "I was hesitant to order from Makueni but the team handled everything perfectly. My order arrived within 3 days and the packaging was beautiful. The dress fits like it was made for me. Will definitely order again!",
    product: "Kitenge Evening Gown",
  },
  {
    name: "Fatuma Odhiambo",
    location: "Nairobi, South B",
    avatar: AVATARS[3],
    rating: 5,
    text: "I bought a gift for my sister from Christine Collections and she absolutely loved it! The WhatsApp support team was so helpful in choosing the right size. This boutique truly understands Kenyan women's fashion needs.",
    product: "Rose Gold Blouse",
  },
  {
    name: "Grace Achieng",
    location: "Nairobi, Roysambu",
    avatar: AVATARS[0],
    rating: 5,
    text: "The free delivery across Nairobi is a game changer! I've ordered three times now and each piece has been gorgeous. The Playfair design and quality stitching is unmatched. Christine Collections is truly premium.",
    product: "Blush Tulle Skirt",
  },
  {
    name: "Mercy Wambua",
    location: "Makueni, Wote",
    avatar: AVATARS[1],
    rating: 5,
    text: "Walking into the Makueni boutique felt like stepping into a high-end Nairobi store. The staff were so warm and helped me find the perfect outfit for my church event. I felt like a queen!",
    product: "Floral Maxi Dress",
  },
];

const featuredOpts = queryOptions({ queryKey: ["featured"], queryFn: () => listProducts({ data: { featured: true } }) });
const catsOpts = queryOptions({ queryKey: ["cats"], queryFn: () => listCategories() });

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await Promise.all([context.queryClient.ensureQueryData(featuredOpts), context.queryClient.ensureQueryData(catsOpts)]);
  },
  component: Home,
});

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => <Star key={i} size={13} fill="currentColor" className="text-[color:var(--rose)]" />)}
    </div>
  );
}

function TestimonialsModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-4 md:inset-10 z-[101] bg-[#1A0F1B] border-t-2 border-[color:var(--rose)] rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-[color:var(--border)] shrink-0">
          <div>
            <p className="eyebrow mb-0.5">What our customers say</p>
            <h2 className="font-display text-2xl md:text-3xl">Customer Reviews</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <StarRow count={5} />
              <span className="text-sm font-semibold">4.9</span>
              <span className="text-xs text-[color:var(--muted-foreground)]">· 500+ reviews</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-[color:var(--muted)] transition">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="card-luxe p-5 flex flex-col gap-3">
                <Quote size={20} className="text-[color:var(--rose)]/40" />
                <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed flex-1">"{t.text}"</p>
                <div>
                  <StarRow count={t.rating} />
                  <p className="text-xs text-[color:var(--rose)]/70 mt-1">Purchased: {t.product}</p>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-[color:var(--border)]">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-[color:var(--rose)]/30" />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-[color:var(--muted-foreground)]">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

function Home() {
  const { data: featured } = useSuspenseQuery(featuredOpts);
  const { data: cats } = useSuspenseQuery(catsOpts);
  const [showTestimonials, setShowTestimonials] = useState(false);

  return (
    <Shell>
      <AnimatePresence>
        {showTestimonials && <TestimonialsModal onClose={() => setShowTestimonials(false)} />}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="relative h-[92vh] min-h-[600px] overflow-hidden">
        <img src={HERO_IMAGE} alt="Christine Collections" className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 41%" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--plum-deep)]/85 via-[color:var(--plum-deep)]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--plum-deep)]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(192,134,106,0.08) 0 1px,transparent 1px 6px),repeating-linear-gradient(-45deg,rgba(192,134,106,0.06) 0 1px,transparent 1px 6px)" }} />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-5 w-full">
            <div className="max-w-xl">
              <motion.p className="eyebrow mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                Premium Kenyan Boutique · Nairobi & Makueni
              </motion.p>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] mb-6 text-[color:var(--cream)]">
                {BRAND.tagline.split(" ").map((word, i) => (
                  <motion.span key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: "easeOut" }}
                    className="inline-block mr-[0.2em] whitespace-nowrap">
                    {word}
                  </motion.span>
                ))}
              </h1>
              <motion.p className="text-[color:var(--muted-foreground)] text-base md:text-lg mb-8 max-w-md leading-relaxed"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                Discover handcrafted fashion that celebrates your identity. Free delivery across Nairobi.
              </motion.p>
              <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
                <Link to="/shop" className="btn-rose">Shop Now <ArrowRight size={16} /></Link>
                <Link to="/shop" search={{ sort: "new" } as any} className="btn-ghost">New Arrivals</Link>
              </motion.div>

              {/* Social proof pill — clickable */}
              <motion.button onClick={() => setShowTestimonials(true)}
                className="mt-8 inline-flex items-center gap-3 bg-[color:var(--card)]/60 backdrop-blur-sm border border-[color:var(--border)] rounded-full px-4 py-2.5 hover:border-[color:var(--rose)]/50 hover:bg-[color:var(--card)]/80 transition group"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
                <div className="flex -space-x-2">
                  {AVATARS.map((src, i) => (
                    <img key={i} src={src} alt="customer"
                      className="w-8 h-8 rounded-full border-2 border-[color:var(--card)] object-cover" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <StarRow count={5} />
                  <span className="text-xs text-[color:var(--muted-foreground)] group-hover:text-[color:var(--rose)] transition">
                    500+ happy customers
                  </span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          <span className="text-xs text-[color:var(--muted-foreground)] tracking-widest uppercase">Scroll</span>
          <motion.div className="w-px h-8 bg-[color:var(--rose)]/50" animate={{ scaleY: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
        </motion.div>
      </section>

      {/* ── Trust strip ── */}
      <section className="border-y border-[color:var(--border)] bg-[color:var(--card)]/50">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[color:var(--border)]">
            {[
              { icon: Truck, title: "Free Delivery", sub: "Across Nairobi" },
              { icon: ShieldCheck, title: "Genuine Products", sub: "Handcrafted in Kenya" },
              { icon: RefreshCw, title: "Easy Returns", sub: "Within 7 days" },
              { icon: Headphones, title: "WhatsApp Support", sub: "Mon–Sat 9am–7pm" },
            ].map(({ icon: Icon, title, sub }, i) => (
              <div key={i} className="flex items-center gap-3 py-3 md:px-6">
                <div className="w-9 h-9 rounded-xl bg-[color:var(--rose)]/10 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[color:var(--rose)]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[color:var(--cream)]">{title}</p>
                  <p className="text-[11px] text-[color:var(--muted-foreground)]">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      {cats.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 pt-16 pb-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow mb-2">Browse</p>
              <h2 className="font-display text-3xl md:text-4xl">Shop by Category</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {cats.map((c: any, i: number) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Link to="/shop" search={{ category: c.slug } as any}
                  className="group card-luxe p-4 text-center block h-full hover:border-[color:var(--rose)]/60 transition-all duration-300">
                  {c.image_url
                    ? <img src={c.image_url} alt={c.name} className="w-12 h-12 object-cover rounded-xl mx-auto mb-3 group-hover:scale-105 transition duration-300" />
                    : <div className="w-12 h-12 rounded-xl bg-[color:var(--rose)]/10 mx-auto mb-3 flex items-center justify-center">
                        <span className="font-display text-lg text-[color:var(--rose)]">{c.name[0]}</span>
                      </div>
                  }
                  <p className="font-display text-sm leading-tight">{c.name}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── New Arrivals ── */}
      <section className="max-w-7xl mx-auto px-5 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-2">Just In</p>
            <h2 className="font-display text-3xl md:text-4xl">New Arrivals</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm text-[color:var(--rose)] hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {(featured as any[]).length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="shimmer aspect-[3/4] rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(featured as any[]).slice(0, 8).map((p: any, i: number) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
        )}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop" className="btn-ghost text-sm">View all products <ArrowRight size={14} /></Link>
        </div>
      </section>

      {/* ── Testimonials section ── */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-2">Reviews</p>
            <h2 className="font-display text-3xl md:text-4xl">What Kenyan Women Say</h2>
          </div>
          <button onClick={() => setShowTestimonials(true)} className="hidden sm:flex items-center gap-1 text-sm text-[color:var(--rose)] hover:underline">
            See all reviews <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card-luxe p-6 flex flex-col gap-4">
              <Quote size={22} className="text-[color:var(--rose)]/40" />
              <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed flex-1">"{t.text}"</p>
              <div>
                <StarRow count={t.rating} />
                <p className="text-xs text-[color:var(--rose)]/60 mt-1">Purchased: {t.product}</p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[color:var(--border)]">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-[color:var(--rose)]/30 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-[color:var(--muted-foreground)]">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => setShowTestimonials(true)} className="btn-ghost">
            Read all 500+ reviews <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ── Free delivery banner ── */}
      <section className="relative my-4 overflow-hidden">
        <div className="bg-[color:var(--card)] border-y border-[color:var(--border)] py-10 px-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[color:var(--rose)]/15 border border-[color:var(--rose)]/30 flex items-center justify-center shrink-0">
                <Truck size={26} className="text-[color:var(--rose)]" />
              </div>
              <div>
                <p className="font-display text-xl md:text-2xl">
                  <span className="text-[color:var(--rose)]">FREE DELIVERY</span> across Nairobi
                </p>
                <p className="text-xs text-[color:var(--muted-foreground)] mt-1">Branch pickup always free · Makueni orders from KSh 300</p>
              </div>
            </div>
            <Link to="/shop" className="btn-rose shrink-0 w-full sm:w-auto justify-center">
              Shop Now <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Branches ── */}
      <section id="branches" className="max-w-7xl mx-auto px-5 py-16">
        <div className="text-center mb-10">
          <p className="eyebrow mb-2">Visit Us</p>
          <h2 className="font-display text-3xl md:text-4xl">Our Boutiques</h2>
          <p className="text-[color:var(--muted-foreground)] text-sm mt-3 max-w-md mx-auto">Walk in, try on, and take home. Free pickup at both locations.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {BRAND.branches.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
              <div className="card-luxe p-6 md:p-8 flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[color:var(--rose)]/15 border border-[color:var(--rose)]/30 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-[color:var(--rose)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl md:text-2xl">{b.name}</h3>
                  <p className="text-[color:var(--muted-foreground)] text-sm mt-1">{b.address}</p>
                  <p className="text-xs text-[color:var(--muted-foreground)] mt-1.5">{b.hours}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="chip">Free pickup</span>
                    <span className="chip">No delivery charge</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-7xl mx-auto px-5 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[color:var(--plum)] to-[color:var(--card)] border border-[color:var(--border)] p-10 md:p-16 text-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(192,134,106,0.2) 0 1px,transparent 1px 8px)" }} />
          <p className="eyebrow mb-3">Ready to look amazing?</p>
          <h2 className="font-display text-3xl md:text-5xl mb-4">Your Story Starts Here</h2>
          <p className="text-[color:var(--muted-foreground)] text-sm md:text-base mb-8 max-w-md mx-auto">
            Explore hundreds of premium pieces curated for the modern Kenyan woman.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/shop" className="btn-rose px-10">Explore the Collection <ArrowRight size={15} /></Link>
            <a href="#branches" className="btn-ghost px-8">Find a Store</a>
          </div>
        </motion.div>
      </section>

    </Shell>
  );
}
