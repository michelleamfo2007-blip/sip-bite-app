import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      if (!supabase) throw new Error("Supabase not configured");
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage("Password updated! You can close this tab and sign in.");
    } catch (err: any) {
      setError(err?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[600px] items-center justify-center px-6 py-12">
      <div className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100 w-full max-w-md">
        <h1 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-2">Reset Password</h1>
        <p className="text-slate-600 text-sm mb-6">Enter a new password for your account.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="uppercase text-[10px] tracking-widest text-slate-500">New Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <div className="space-y-2">
            <Label className="uppercase text-[10px] tracking-widest text-slate-500">Confirm Password</Label>
            <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" required />
          </div>
          {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
          {message && <p className="text-xs text-green-600 font-bold">{message}</p>}
          <Button disabled={loading} type="submit" className="w-full bg-brand-red text-white">
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
        <div className="text-center mt-6">
          <Link to="/" className="text-xs font-black uppercase tracking-widest text-brand-red hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
