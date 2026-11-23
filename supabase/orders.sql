-- Run this once in the Supabase SQL editor.
-- Then make your own account an admin:
--   update public.profiles set role = 'admin' where email = 'you@example.com';

alter table public.profiles add column if not exists role text default 'customer';

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  phone text not null,
  order_type text not null check (order_type in ('delivery', 'pickup')),
  address text,
  items jsonb not null,
  subtotal integer not null,
  delivery_fee integer not null default 0,
  total integer not null,
  status text not null default 'new' check (status in ('new', 'preparing', 'ready', 'done'))
);

alter table public.orders enable row level security;

grant insert on public.orders to anon, authenticated;
grant select, update on public.orders to authenticated;

drop policy if exists "anyone can place an order" on public.orders;
create policy "anyone can place an order"
on public.orders for insert
to anon, authenticated
with check (true);

drop policy if exists "admins can read orders" on public.orders;
create policy "admins can read orders"
on public.orders for select
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
);

drop policy if exists "admins can update orders" on public.orders;
create policy "admins can update orders"
on public.orders for update
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
);
