-- Orders / download history: one row per product a user has claimed or
-- purchased (mkrHub included, at $0). This is what powers "my downloads"
-- on the account page and, later, per-tool purchase history.
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_slug text not null,
  amount_cents integer not null default 0,
  currency text not null default 'usd',
  status text not null default 'completed'
    check (status in ('pending', 'completed', 'refunded')),
  created_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);

alter table public.orders enable row level security;

-- Users can see their own order/download history.
create policy "orders_select_own"
  on public.orders for select
  using (auth.uid() = user_id);

-- Users can claim a product (needed for the $0 mkrHub flow until a
-- Stripe webhook takes over inserts for paid products).
create policy "orders_insert_own"
  on public.orders for insert
  with check (auth.uid() = user_id);
