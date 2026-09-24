import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Profile {
  id: string;
  name: string | null;
  email: string;
  role?: string | null;
  created_at?: string | null;
}

export default function Admin() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!supabase) return;
    if (!user || user.role !== "admin") return;
    const run = async () => {
      try {
        setLoading(true);
        setError("");
        const { data, error } = await supabase
          .from("profiles")
          .select("id, name, email, role, created_at")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setProfiles(data || []);
      } catch (err: any) {
        setError(err?.message || "Failed to load profiles");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [user]);

  if (!supabase) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="bg-white p-10 rounded-[24px] shadow-sm border border-slate-100 text-center">
          <h1 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-2">Admin</h1>
          <p className="text-slate-600">Backend not configured. Add Supabase keys to .env.local to use the admin panel.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="bg-white p-10 rounded-[24px] shadow-sm border border-slate-100 text-center">
          <h1 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-4">Please Sign In</h1>
          <Button className="bg-brand-red text-white" render={<Link to="/">Go Home</Link>} />
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="bg-white p-10 rounded-[24px] shadow-sm border border-slate-100 text-center">
          <h1 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-2">403</h1>
          <p className="text-slate-600">You don’t have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-black text-brand-dark uppercase tracking-tighter">Admin Dashboard</h1>
        <Button variant="outline" render={<Link to="/">Back</Link>} />
      </div>

      <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
        <h2 className="text-xl font-black uppercase tracking-widest mb-4">Customers</h2>
        {error && <p className="text-red-600 text-sm font-bold mb-4">{error}</p>}
        {loading ? (
          <p className="text-slate-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 uppercase text-[10px] tracking-widest">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Role</th>
                  <th className="py-2 pr-4">Joined</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="py-3 pr-4 font-bold text-brand-dark">{p.name || "—"}</td>
                    <td className="py-3 pr-4">{p.email}</td>
                    <td className="py-3 pr-4">{p.role || "customer"}</td>
                    <td className="py-3 pr-4">{p.created_at ? new Date(p.created_at).toLocaleString() : "—"}</td>
                  </tr>
                ))}
                {profiles.length === 0 && (
                  <tr>
                    <td className="py-6 text-slate-600" colSpan={4}>No customers yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
