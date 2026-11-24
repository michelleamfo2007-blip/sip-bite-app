-- Run this once in the Supabase SQL editor.
-- After you sign up on the site, make that account the kitchen admin:
--   update public.profiles set role = 'admin' where email = 'you@example.com';

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  role text not null default 'customer',
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists role text default 'customer';

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;

grant select, insert, update on public.profiles to authenticated;

drop policy if exists "read own or admin profiles" on public.profiles;
create policy "read own or admin profiles"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "insert own profile" on public.profiles;
create policy "insert own profile"
on public.profiles for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile"
on public.profiles for update
to authenticated
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

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
using (public.is_admin());

drop policy if exists "admins can update orders" on public.orders;
create policy "admins can update orders"
on public.orders for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Customers can read an order when its saved email matches the account they signed in with.
create or replace function public.customer_can_read_order(order_address text)
returns boolean
language plpgsql
stable
as $$
declare
  extra text;
  note jsonb;
begin
  extra := split_part(coalesce(order_address, ''), E'\n---\n', 2);
  if extra is null or btrim(extra) = '' or left(btrim(extra), 1) <> '{' then
    return false;
  end if;
  note := extra::jsonb;
  return lower(coalesce(note ->> 'email', '')) = lower(coalesce(auth.jwt() ->> 'email', ''));
exception when others then
  return false;
end;
$$;

grant execute on function public.customer_can_read_order(text) to authenticated;

drop policy if exists "customers can read their own orders" on public.orders;
create policy "customers can read their own orders"
on public.orders for select
to authenticated
using (public.customer_can_read_order(address));
