import { supabase } from "@/lib/supabaseClient";

export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  customization?: string | null;
};

export type OrderStatus = "new" | "preparing" | "ready" | "done";

export type HouseOrder = {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  order_type: "delivery" | "pickup";
  address: string | null;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: OrderStatus;
};

export const orderStatuses: OrderStatus[] = ["new", "preparing", "ready", "done"];

const NOTE_SPLIT = "\n---\n";

export type OrderNote = {
  summary: string;
  email: string;
  message: string;
  paymentConfirmed: boolean;
};

export function packOrderAddress(summary: string, note: { email: string; message: string; paymentConfirmed: boolean }) {
  return `${summary}${NOTE_SPLIT}${JSON.stringify({
    email: note.email,
    message: note.message,
    paymentConfirmed: note.paymentConfirmed,
  })}`;
}

export function readOrderAddress(address: string | null): OrderNote {
  const raw = address || "";
  const splitAt = raw.indexOf(NOTE_SPLIT);
  const summary = (splitAt === -1 ? raw : raw.slice(0, splitAt)).trim();
  const extra = splitAt === -1 ? "" : raw.slice(splitAt + NOTE_SPLIT.length);
  let email = "";
  let message = "";
  let paymentConfirmed = false;
  if (extra) {
    try {
      const parsed = JSON.parse(extra) as { email?: unknown; message?: unknown; paymentConfirmed?: unknown };
      email = typeof parsed.email === "string" ? parsed.email : "";
      message = typeof parsed.message === "string" ? parsed.message : "";
      paymentConfirmed = parsed.paymentConfirmed === true;
    } catch {
      email = "";
    }
  }
  return { summary, email, message, paymentConfirmed };
}

export async function confirmOrderPayment(order: HouseOrder) {
  if (!supabase) throw new Error("The database is not connected yet.");
  const note = readOrderAddress(order.address);
  if (!note.email || !note.message) throw new Error("This order has no email for the confirmation.");
  const response = await fetch("/api/send-order-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to: note.email, name: order.customer_name, message: note.message }),
  });
  const body = await response.json().catch(() => ({} as { status?: string; message?: string }));
  if (!response.ok || body.status === "skipped" || body.status === "error") {
    throw new Error(body.message || "The confirmation could not be sent.");
  }
  const address = packOrderAddress(note.summary, { email: note.email, message: note.message, paymentConfirmed: true });
  const { error } = await supabase.from("orders").update({ address }).eq("id", order.id);
  if (error) throw error;
  return address;
}

export async function placeOrder(order: Omit<HouseOrder, "id" | "created_at" | "status">) {
  if (!supabase) throw new Error("The database is not connected yet.");
  const id = crypto.randomUUID();
  const { error } = await supabase.from("orders").insert({ ...order, id, status: "new" });
  if (error) throw error;
  return id;
}

export async function listOrders() {
  if (!supabase) throw new Error("The database is not connected yet.");
  const { data, error } = await supabase
    .from("orders")
    .select("id, created_at, customer_name, phone, order_type, address, items, subtotal, delivery_fee, total, status")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []) as HouseOrder[];
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  if (!supabase) throw new Error("The database is not connected yet.");
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw error;
}
