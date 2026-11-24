import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { placeOrder } from "@/lib/orders";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Bike, Store, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

function todayInputValue() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function ordinal(day: number) {
  const mod = day % 100;
  if (mod >= 11 && mod <= 13) return `${day}th`;
  if (day % 10 === 1) return `${day}st`;
  if (day % 10 === 2) return `${day}nd`;
  if (day % 10 === 3) return `${day}rd`;
  return `${day}th`;
}

function formatOrderDate(isoDate: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return isoDate;
  const monthName = date.toLocaleString("en-GB", { month: "long" });
  return `${ordinal(day)} ${monthName} ${year}`;
}

const SHOP_LOCATION = "Achimota, Accra, Ghana";
const SHOP_PHONE = "053 785 8896";
const SHOP_PHONE_TEL = "0537858896";
const RIDER_DETAILS = `Sip & Bite\nCollect from ${SHOP_LOCATION}\nCall ${SHOP_PHONE}\nhttps://maps.google.com/?q=Achimota,Accra,Ghana`;

function ShopDetails({ forRider }: { forRider: boolean }) {
  const shareHref = `https://wa.me/?text=${encodeURIComponent(RIDER_DETAILS)}`;
  return (
    <div className="mt-4 rounded-2xl bg-slate-50 p-6 text-left">
      <p className="font-bold text-brand-dark">{forRider ? "Give this to your rider" : "Collect it here"}</p>
      <p className="mt-1 text-sm text-slate-500">
        {forRider
          ? "Send our number and location so the rider can find the order."
          : "This is our number and location. Send them to anyone who is collecting the order."}
      </p>
      <p className="mt-4 text-sm font-bold text-brand-dark">{SHOP_LOCATION}</p>
      <a href={`tel:${SHOP_PHONE_TEL}`} className="mt-1 block text-sm font-bold text-brand-red">{SHOP_PHONE}</a>
      <a
        href={shareHref}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-brand-dark px-4 text-[11px] font-black uppercase tracking-[0.18em] text-white"
      >
        Send these details
      </a>
    </div>
  );
}

function formatOrderTime(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return value;
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return value;
  const suffix = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  if (minute === 0) return `${hour}${suffix}`;
  return `${hour}:${String(minute).padStart(2, "0")}${suffix}`;
}

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [collection, setCollection] = useState<"rider" | "own">("rider");
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [orderDate, setOrderDate] = useState(todayInputValue);
  const [place, setPlace] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [orderError, setOrderError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [receipt, setReceipt] = useState("");

  useEffect(() => {
    if (user?.name) setName((current) => current || user.name);
    if (user?.email) setEmail((current) => current || user.email);
  }, [user]);

  const total = totalPrice;
  const collectionLabel = collection === "rider" ? "A rider collects it" : "You collect it";
  const dateLabel = formatOrderDate(orderDate);
  const timeLabel = orderTime ? formatOrderTime(orderTime) : "";
  const placeLabel = place.trim();
  const receiptLine = placeLabel && timeLabel
    ? `You will receive it on ${dateLabel} at ${placeLabel} at ${timeLabel}.`
    : "";

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError("");
    if (!receiptLine) {
      setOrderError("Add the day, the place, and the time.");
      return;
    }
    setIsProcessing(true);
    const placedMessage = `Your order has been successfully placed. ${receiptLine}`;
    try {
      const id = await placeOrder({
        customer_name: name.trim(),
        phone: phone.trim(),
        order_type: "pickup",
        address: `${collectionLabel}. ${dateLabel} at ${placeLabel} at ${timeLabel}`,
        items: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          customization: item.customization || null,
        })),
        subtotal: totalPrice,
        delivery_fee: 0,
        total,
      });
      setOrderId(id.slice(0, 8).toUpperCase());
      setReceipt(placedMessage);
      setStep(3);
      clearCart();
      const recipient = email.trim();
      if (recipient) {
        try {
          await fetch("/api/send-order-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to: recipient, name: name.trim(), message: receiptLine }),
          });
        } catch {}
      }
    } catch (err: any) {
      setOrderError(err?.message || "The order could not be saved.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[32px] shadow-xl border border-slate-100 text-center max-w-md w-full"
        >
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-500 w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tighter mb-4">Order placed</h2>
          <p className="text-slate-500 font-medium mb-2">{receipt}</p>
          {orderId && <p className="mb-8 text-sm font-black tracking-[0.2em] text-brand-dark">ORDER {orderId}</p>}
          <ShopDetails forRider={collection === "rider"} />
          <Button className="mt-8 w-full bg-brand-red hover:bg-brand-red/90 text-white font-black py-6 rounded-xl uppercase" render={<Link to="/">Back to Home</Link>} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" className="rounded-full h-12 w-12 p-0" render={<Link to="/"><ArrowLeft className="w-6 h-6" /></Link>} />
        <h1 className="text-4xl font-black text-brand-dark uppercase tracking-tighter">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        {/* Form */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-brand-dark uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Collection
            </h2>
            <RadioGroup value={collection} onValueChange={(value) => setCollection(value as "rider" | "own")} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-2 bg-slate-50 p-6 rounded-2xl border-2 border-transparent has-[:checked]:border-brand-red transition-all cursor-pointer">
                <RadioGroupItem value="rider" id="rider" className="text-brand-red" />
                <Label htmlFor="rider" className="font-bold cursor-pointer flex items-center gap-2">
                  <Bike className="w-4 h-4" /> Send a rider
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 p-6 rounded-2xl border-2 border-transparent has-[:checked]:border-brand-red transition-all cursor-pointer">
                <RadioGroupItem value="own" id="own" className="text-brand-red" />
                <Label htmlFor="own" className="font-bold cursor-pointer flex items-center gap-2">
                  <Store className="w-4 h-4" /> I'll pick it up
                </Label>
              </div>
            </RadioGroup>
            <ShopDetails forRider={collection === "rider"} />
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="order-date" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date</Label>
                <Input id="order-date" type="date" required className="rounded-xl border-slate-200 h-12" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-time" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time</Label>
                <Input id="order-time" type="time" required className="rounded-xl border-slate-200 h-12" value={orderTime} onChange={(e) => setOrderTime(e.target.value)} />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="place" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Place</Label>
              <Input id="place" required className="rounded-xl border-slate-200 h-12" placeholder="Ghud Park" value={place} onChange={(e) => setPlace(e.target.value)} />
            </div>
            <p className="mt-4 text-sm text-slate-500">
              {receiptLine || "Orders are collected from Achimota. There is no delivery charge."}
            </p>
          </section>

          <section className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-brand-dark uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Details
            </h2>
            <form onSubmit={handleOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</Label>
                  <Input id="name" required className="rounded-xl border-slate-200 h-12" placeholder="Ama Mensah" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</Label>
                  <Input id="phone" required className="rounded-xl border-slate-200 h-12" placeholder="053..." value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</Label>
                <Input id="email" type="email" className="rounded-xl border-slate-200 h-12" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="pt-6">
                <h2 className="text-xl font-black text-brand-dark uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                  Payment
                </h2>
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-brand-red mb-6">
                  <p className="font-bold text-brand-dark">Pay when the order is collected</p>
                  <p className="mt-1 text-sm text-slate-500">Placing the order sends it to the kitchen. No card is charged on this page.</p>
                </div>
                {orderError && <p className="mb-4 text-sm font-bold text-red-600">{orderError}</p>}
                <Button 
                  type="submit" 
                  disabled={isProcessing || cart.length === 0}
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-black py-8 rounded-2xl text-xl uppercase shadow-xl shadow-brand-red/20"
                >
                  {isProcessing ? "Sending..." : `Place order · GH₵ ${total}`}
                </Button>
              </div>
            </form>
          </section>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100 sticky top-24">
            <h2 className="text-xl font-black text-brand-dark uppercase tracking-widest mb-6">Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.customization}`} className="flex justify-between text-sm">
                  <div className="flex-grow">
                    <span className="font-bold text-brand-dark">{item.quantity}x {item.name}</span>
                    {item.customization && <p className="text-[10px] text-slate-400 uppercase">{item.customization}</p>}
                  </div>
                  <span className="font-black text-brand-red">GH₵ {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>GH₵ {totalPrice}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Collection</span>
                <span className="normal-case tracking-normal">{collectionLabel}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-brand-dark uppercase tracking-tighter pt-2">
                <span>Total</span>
                <span className="text-brand-red">GH₵ {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
