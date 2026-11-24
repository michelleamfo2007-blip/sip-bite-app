import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HouseOrder, OrderStatus, confirmOrderPayment, listOrders, orderStatuses, readOrderAddress, sendPreparingNotice, sendReadyNotice, updateOrderStatus } from "@/lib/orders";

interface Profile {
  id: string;
  name: string | null;
  email: string;
  role?: string | null;
  created_at?: string | null;
}

const statusLabel: Record<OrderStatus, string> = {
  new: "New",
  preparing: "Preparing",
  ready: "Ready",
  done: "Done",
};

export default function Admin() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<HouseOrder[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmingId, setConfirmingId] = useState("");

  const load = async () => {
    if (!supabase || !user || user.role !== "admin") return;
    try {
      setLoading(true);
      setError("");
      const [orderRows, profileResult] = await Promise.all([
        listOrders(),
        supabase.from("profiles").select("id, name, email, role, created_at").order("created_at", { ascending: false }),
      ]);
      setOrders(orderRows);
      if (profileResult.error) throw profileResult.error;
      setProfiles(profileResult.data || []);
    } catch (err: any) {
      setError(err?.message || "Could not load the dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [user]);

  const confirmPayment = async (order: HouseOrder) => {
    setConfirmingId(order.id);
    setError("");
    try {
      const address = await confirmOrderPayment(order);
      setOrders((current) => current.map((row) => (row.id === order.id ? { ...row, address } : row)));
    } catch (err: any) {
      setError(err?.message || "The confirmation could not be sent.");
    } finally {
      setConfirmingId("");
    }
  };

  const setStatus = async (id: string, status: OrderStatus) => {
    const order = orders.find((row) => row.id === id);
    if (!order || order.status === status) return;
    const previous = orders;
    setError("");
    setOrders((current) => current.map((row) => (row.id === id ? { ...row, status } : row)));
    try {
      if (status === "preparing") await sendPreparingNotice(order);
      if (status === "ready") await sendReadyNotice(order);
      await updateOrderStatus(id, status);
    } catch (err: any) {
      setOrders(previous);
      setError(err?.message || "Could not update that order.");
    }
  };

  if (!supabase) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.32em] text-brand-yellow">Kitchen</p>
        <h1 className="mt-3 font-display text-5xl font-medium">Orders</h1>
        <p className="mt-4 max-w-lg text-brand-dark/70">
          The dashboard needs the Supabase database connected. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then run supabase/orders.sql.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.32em] text-brand-yellow">Kitchen</p>
        <h1 className="mt-3 font-display text-5xl font-medium">Sign in to see orders</h1>
        <p className="mt-4 text-brand-dark/70">Use the account whose profile role is admin.</p>
        <Button className="mt-8 bg-brand-dark text-brand-cream" render={<Link to="/">Back home</Link>} />
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.32em] text-brand-yellow">Kitchen</p>
        <h1 className="mt-3 font-display text-5xl font-medium">This account cannot open the kitchen.</h1>
        <p className="mt-4 max-w-lg text-brand-dark/70">
          In Supabase, set this account’s role to admin: update profiles set role = 'admin' where email = '{user.email}'.
        </p>
      </div>
    );
  }

  const visible = filter === "all" ? orders : orders.filter((order) => order.status === filter);
  const newCount = orders.filter((order) => order.status === "new").length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-brand-yellow">Kitchen</p>
          <h1 className="mt-3 font-display text-6xl font-medium">Orders</h1>
          <p className="mt-3 text-sm text-brand-dark/60">
            {newCount === 0 ? "No new plates waiting." : `${newCount} new ${newCount === 1 ? "order" : "orders"}.`}
          </p>
        </div>
        <Button variant="outline" render={<Link to="/">Back</Link>} />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {(["all", ...orderStatuses] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`border px-4 py-2 text-[11px] uppercase tracking-[0.18em] ${
              filter === key ? "border-brand-dark bg-brand-dark text-brand-cream" : "border-brand-dark/15 text-brand-dark/60"
            }`}
          >
            {key === "all" ? "All" : statusLabel[key]}
          </button>
        ))}
      </div>

      {error && <p className="mt-6 text-sm font-semibold text-brand-red">{error}</p>}

      <div className="mt-8 space-y-4">
        {loading && <p className="text-brand-dark/60">Loading orders...</p>}
        {!loading && visible.length === 0 && (
          <div className="border border-brand-dark/10 bg-brand-white px-6 py-10">
            <p className="font-display text-3xl">Nothing in this list.</p>
            <p className="mt-2 text-sm text-brand-dark/60">A checkout will appear here as soon as it is placed.</p>
          </div>
        )}
        {visible.map((order) => {
          const note = readOrderAddress(order.address);
          return (
          <article key={order.id} className="border border-brand-dark/10 bg-brand-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-yellow">
                  {order.id.slice(0, 8).toUpperCase()} · {new Date(order.created_at).toLocaleString()}
                </p>
                <h2 className="mt-2 font-display text-3xl font-medium">{order.customer_name}</h2>
                <p className="mt-1 text-sm text-brand-dark/70">
                  <a href={`tel:${order.phone}`} className="underline decoration-brand-yellow underline-offset-4">{order.phone}</a>
                  {note.email ? ` · ${note.email}` : ""}
                  {" · "}
                  {note.summary || (order.order_type === "delivery" ? "Delivery" : "Pickup")}
                </p>
              </div>
              <p className="font-display text-3xl text-brand-red">GH₵ {order.total}</p>
            </div>
            <ul className="mt-5 space-y-1 text-sm">
              {order.items.map((item, index) => (
                <li key={`${item.name}-${index}`} className="flex justify-between gap-4">
                  <span>
                    {item.quantity}× {item.name}
                    {item.customization ? <span className="text-brand-dark/45"> · {item.customization}</span> : null}
                  </span>
                  <span>GH₵ {item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {note.paymentConfirmed ? (
                <p className="text-sm text-brand-dark/70">Payment confirmed. The order message was sent.</p>
              ) : note.email && note.message ? (
                <button
                  type="button"
                  disabled={confirmingId === order.id}
                  onClick={() => confirmPayment(order)}
                  className="border border-brand-red bg-brand-red px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white disabled:opacity-60"
                >
                  {confirmingId === order.id ? "Sending..." : "Confirm payment"}
                </button>
              ) : (
                <p className="text-sm text-brand-dark/50">No confirmation email on this order.</p>
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {orderStatuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatus(order.id, status)}
                  className={`border px-3 py-2 text-[11px] uppercase tracking-[0.16em] ${
                    order.status === status
                      ? "border-brand-dark bg-brand-dark text-brand-cream"
                      : "border-brand-dark/15 text-brand-dark/55"
                  }`}
                >
                  {statusLabel[status]}
                </button>
              ))}
            </div>
          </article>
          );
        })}
      </div>

      <section className="mt-16 border border-brand-dark/10 bg-brand-white p-6">
        <h2 className="font-display text-3xl font-medium">Accounts</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-[0.16em] text-brand-dark/45">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id} className="border-t border-brand-dark/10">
                  <td className="py-3 pr-4">{profile.name || "—"}</td>
                  <td className="py-3 pr-4">{profile.email}</td>
                  <td className="py-3 pr-4">{profile.role || "customer"}</td>
                  <td className="py-3 pr-4">{profile.created_at ? new Date(profile.created_at).toLocaleString() : "—"}</td>
                </tr>
              ))}
              {profiles.length === 0 && (
                <tr>
                  <td className="py-6 text-brand-dark/60" colSpan={4}>No accounts yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
