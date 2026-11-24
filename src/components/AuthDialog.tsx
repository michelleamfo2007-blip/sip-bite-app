import { useEffect, useRef, useState, type FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { listOrders, readOrderAddress, type HouseOrder, type OrderStatus } from "@/lib/orders";

const orderStatusLabel: Record<OrderStatus, string> = {
  new: "Received",
  preparing: "In the kitchen",
  ready: "Ready",
  done: "Collected",
};

export default function AuthDialogButton({ compact = false }: { compact?: boolean }) {
  const { user, login, register, logout, resetPassword } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [orders, setOrders] = useState<HouseOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setMessage("");
      if (mode === "login") {
        await login(email, password);
        setOpen(false);
      } else {
        await register(name, email, password);
        setMessage("If required, please check your email to verify your account.");
      }
    } catch (err: any) {
      setError(err?.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open || !user) return;
    let cancelled = false;
    setOrdersLoading(true);
    setOrdersError("");
    listOrders()
      .then((rows) => {
        if (cancelled) return;
        const accountEmail = user.email.toLowerCase();
        setOrders(rows.filter((order) => readOrderAddress(order.address).email.toLowerCase() === accountEmail));
      })
      .catch((err: { message?: string }) => {
        if (!cancelled) setOrdersError(err?.message || "Could not load your orders.");
      })
      .finally(() => {
        if (!cancelled) setOrdersLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, user]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const handleReset = async () => {
    try {
      if (!email) {
        setError("Enter your email first");
        return;
      }
      setLoading(true);
      setError("");
      await resetPassword(email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (err: any) {
      setError(err?.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {user ? (
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            className={compact ? "inline-flex h-10 w-10 items-center justify-center text-brand-dark hover:text-brand-red" : "inline-flex items-center gap-2 text-brand-dark hover:text-brand-red font-medium"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {compact ? <User className="h-5 w-5" /> : <span>Hi, {user.name.split(" ")[0]}</span>}
            {compact ? <span className="sr-only">Hi, {user.name.split(" ")[0]}</span> : (
              <svg className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.957a.75.75 0 111.08 1.04l-4.25 4.53a.75.75 0 01-1.08 0l-4.25-4.53a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
            )}
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-slate-700 rounded-xl shadow-lg border border-slate-100 py-2 z-50">
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 font-bold"
                onClick={() => { setOpen(true); setMenuOpen(false); }}
              >
                Account
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 font-bold text-brand-red"
                onClick={() => { logout(); setMenuOpen(false); }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      ) : (
        <DialogTrigger
          render={
            <Button variant="ghost" size="icon" className="text-brand-dark hover:text-brand-red">
              <User className="w-5 h-5" />
              <span className="sr-only">Sign in</span>
            </Button>
          }
        />
      )}
      <DialogContent className={user ? "max-h-[85vh] overflow-y-auto p-6 sm:max-w-lg" : "p-6 sm:max-w-md"}>
        <DialogHeader>
          <DialogTitle className="font-black uppercase tracking-tighter">
            {user ? "Your Account" : mode === "login" ? "Sign In" : "Create Account"}
          </DialogTitle>
          <DialogDescription>
            {user
              ? "Your orders, and the payment on each one."
              : mode === "login"
              ? "Sign in with your email and password."
              : "Create your account with your name, email, and a password."}
          </DialogDescription>
        </DialogHeader>

        {user ? (
          <div className="space-y-4">
            <div className="rounded-xl border p-4 bg-slate-50">
              <p className="text-sm font-bold text-brand-dark">Signed in as</p>
              <p className="text-slate-600 text-sm">{user.name} ({user.email})</p>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Your orders</p>
              {ordersLoading && <p className="text-sm text-slate-500">Loading your orders...</p>}
              {ordersError && <p className="text-sm font-bold text-red-600">{ordersError}</p>}
              {!ordersLoading && !ordersError && orders.length === 0 && (
                <p className="text-sm text-slate-500">No orders with this email yet. An order shows here when checkout uses {user.email}.</p>
              )}
              {orders.map((order) => {
                const note = readOrderAddress(order.address);
                return (
                  <div key={order.id} className="rounded-xl border border-slate-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[11px] font-black tracking-[0.16em] text-brand-dark">{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-sm font-bold text-brand-red">GH₵ {order.total}</p>
                    </div>
                    <p className="mt-2 text-sm text-brand-dark">
                      {order.items.map((item) => `${item.quantity}× ${item.name}`).join(", ")}
                    </p>
                    {note.summary && <p className="mt-1 text-xs leading-relaxed text-slate-500">{note.summary}</p>}
                    <p className="mt-2 text-xs font-bold text-brand-dark">
                      {note.paymentConfirmed ? "Payment confirmed" : "Payment pending"}
                      {" · "}
                      {orderStatusLabel[order.status]}
                    </p>
                  </div>
                );
              })}
            </div>
            <DialogFooter className="justify-between">
              <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
              <Button className="bg-brand-red text-white" onClick={() => { logout(); setOpen(false); }}>Sign out</Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="space-y-2">
                <Label className="uppercase text-[10px] tracking-widest text-slate-500">Name</Label>
                <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
            )}
            <div className="space-y-2">
              <Label className="uppercase text-[10px] tracking-widest text-slate-500">Email</Label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label className="uppercase text-[10px] tracking-widest text-slate-500">Password</Label>
              <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              <div className="flex justify-end">
                <button type="button" onClick={handleReset} className="text-[10px] font-black uppercase tracking-widest text-brand-red hover:underline">
                  Forgot password?
                </button>
              </div>
            </div>
            {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
            {message && <p className="text-xs text-green-600 font-bold">{message}</p>}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                className="text-xs font-black uppercase tracking-widest text-brand-red hover:underline"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
              >
                {mode === "login" ? "Create an account" : "I already have an account"}
              </button>
              <Button type="submit" disabled={loading} className="bg-brand-red text-white">
                {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
