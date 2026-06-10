# Christine Collections

Premium Kenyan boutique e-commerce — Nairobi & Makueni. Built on TanStack Start (React 19 + Vite) with Lovable Cloud (Supabase) for database, auth, and storage.

## Stack
- TanStack Start (file-based routing, server functions, SSR)
- Lovable Cloud (Supabase: PostgreSQL + Auth + Storage, RLS enforced)
- Tailwind v4, Framer Motion, Zustand, React Hook Form + Zod, Sonner, Recharts, Lucide
- M-Pesa Daraja STK Push (scaffolded — see below to enable)

## Routes
- `/` — Home (hero, categories, new arrivals, free-delivery banner, branches)
- `/shop` — Catalog with filters (category, branch, sort)
- `/shop/:slug` — Product detail (size, color, quantity, add/buy)
- `/checkout` — 3-step (delivery → review → M-Pesa)
- `/order-confirmation/:id` — Confetti + summary + WhatsApp share
- `/auth` — Sign in / register (toggle)
- `/dashboard` — Customer orders (auth required)
- `/admin` — Stats + orders management (admin role required)

## Becoming an admin
Roles live in `user_roles` (separate from `profiles`, checked via the security-definer `has_role()` function). After signing up:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('<your-auth-user-id>', 'admin');
```

Run that from the Lovable Cloud SQL editor.

## Enabling M-Pesa
M-Pesa is scaffolded but disabled. To turn it on, add these secrets in Lovable Cloud → Secrets:

- `MPESA_CONSUMER_KEY`
- `MPESA_CONSUMER_SECRET`
- `MPESA_SHORTCODE`
- `MPESA_PASSKEY`
- `MPESA_CALLBACK_URL` → set to `https://<your-app-url>/api/public/mpesa-callback`
- `MPESA_ENV` → `sandbox` or `production`

Until configured, the checkout shows a friendly notice and still creates a pending order so the team can follow up manually.

## Server architecture
- App-internal RPCs use `createServerFn` (`src/lib/*.functions.ts`)
- The single public HTTP endpoint is the M-Pesa callback at `src/routes/api/public/mpesa-callback.ts`
- Public catalog reads use `supabaseAdmin` inside server-fn handlers (lazy import) so route loaders work during SSR
- Authenticated reads (`getMyOrders`, all admin fns) use `requireSupabaseAuth` middleware
- Admin endpoints re-check role via `user_roles` server-side

## Brand
- Plum `#2D1B2E` / Rose Gold `#C0866A` / Blush `#F2D4C8` / Cream `#F5EEE8`
- Playfair Display headings · DM Sans body · Courier Prime for prices and order numbers
- All tokens in `src/styles.css`; never hardcode colors in components
