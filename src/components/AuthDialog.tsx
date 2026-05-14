import { useState, type FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthDialogButton() {
  const { user, login, register, logout, loginWithProvider, resetPassword } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

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

  const handleOAuth = async (provider: "google" | "github") => {
    try {
      setLoading(true);
      setError("");
      setMessage("");
      await loginWithProvider(provider);
      // Supabase will redirect; dialog can remain closed/open depending on redirect
    } catch (err: any) {
      setError(err?.message || "Failed to authenticate.");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="relative" onMouseLeave={() => setMenuOpen(false)}>
          <button
            type="button"
            className="inline-flex items-center gap-2 text-white hover:text-brand-yellow font-bold"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span>Hi, {user.name.split(" ")[0]}</span>
            <svg className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.957a.75.75 0 111.08 1.04l-4.25 4.53a.75.75 0 01-1.08 0l-4.25-4.53a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
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
            <Button variant="ghost" size="icon" className="text-white hover:text-brand-yellow">
              <User className="w-5 h-5" />
              <span className="sr-only">Sign in</span>
            </Button>
          }
        />
      )}
      <DialogContent className="p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-black uppercase tracking-tighter">
            {user ? "Your Account" : mode === "login" ? "Sign In" : "Create Account"}
          </DialogTitle>
          <DialogDescription>
            {user
              ? "Manage your account or sign out."
              : mode === "login"
              ? "Welcome back! Sign in to continue."
              : "Create an account to save your details and speed up checkout."}
          </DialogDescription>
        </DialogHeader>

        {!user && (
          <div className="space-y-2 mb-4">
            <Button disabled={loading} onClick={() => handleOAuth("google")} className="w-full justify-center bg-slate-900 text-white hover:bg-slate-800">
              Continue with Google
            </Button>
            <Button disabled={loading} onClick={() => handleOAuth("github")} variant="outline" className="w-full justify-center">
              Continue with GitHub
            </Button>
            <div className="flex items-center gap-2 py-1">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-[10px] uppercase tracking-widest text-slate-400">or</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
          </div>
        )}

        {user ? (
          <div className="space-y-4">
            <div className="rounded-xl border p-4 bg-slate-50">
              <p className="text-sm font-bold text-brand-dark">Signed in as</p>
              <p className="text-slate-600 text-sm">{user.name} ({user.email})</p>
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
