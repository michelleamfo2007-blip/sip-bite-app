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

export async function placeOrder(order: Omit<HouseOrder, "id" | "created_at" | "status">) {
  if (!supabase) throw new Error("The database is not connected yet.");
  const { data, error } = await supabase
    .from("orders")
    .insert({ ...order, status: "new" })
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
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
