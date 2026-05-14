import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

export type User = {
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void> | void;
  register: (name: string, email: string, password: string) => Promise<void> | void;
  loginWithProvider: (provider: "google" | "github") => Promise<void> | void;
  resetPassword: (email: string) => Promise<void> | void;
  sendWelcomeEmail: (name: string, email: string) => Promise<void> | void;
  logout: () => Promise<void> | void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "auth:user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // If Supabase is configured, hydrate from its session and subscribe to auth changes
    if (supabase) {
      const upsertProfile = async (uid: string, name: string, email: string) => {
        try {
          await supabase.from("profiles").upsert({ id: uid, name, email }, { onConflict: "id" });
        } catch {}
      };
      const fetchRole = async (uid: string): Promise<string | undefined> => {
        try {
          const { data } = await supabase.from("profiles").select("role").eq("id", uid).single();
          return data?.role as string | undefined;
        } catch {
          return undefined;
        }
      };

      (async () => {
        const { data } = await supabase.auth.getUser();
        const sUser = data.user;
        if (sUser?.email) {
          const name =
            (sUser.user_metadata?.name as string | undefined) ||
            (sUser.user_metadata?.full_name as string | undefined) ||
            sUser.email.split("@")[0];
          const role = await fetchRole(sUser.id);
          setUser({ name, email: sUser.email, role });
          await upsertProfile(sUser.id, name, sUser.email);
        }
      })();

      const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
        const sUser = session?.user;
        if (sUser?.email) {
          const name =
            (sUser.user_metadata?.name as string | undefined) ||
            (sUser.user_metadata?.full_name as string | undefined) ||
            sUser.email.split("@")[0];
          const role = await fetchRole(sUser.id);
          setUser({ name, email: sUser.email, role });
          await upsertProfile(sUser.id, name, sUser.email);
        } else {
          setUser(null);
        }
      });

      return () => {
        sub.subscription.unsubscribe();
      };
    }

    // Fallback: hydrate from localStorage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    // Only persist locally when Supabase is not managing session
    if (!supabase) {
      try {
        if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        else localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const { data } = await supabase.auth.getUser();
      const sUser = data.user;
      if (sUser?.email) {
        const name =
          (sUser.user_metadata?.name as string | undefined) ||
          (sUser.user_metadata?.full_name as string | undefined) ||
          sUser.email.split("@")[0];
        const role = await (async () => {
          try {
            const { data } = await supabase.from("profiles").select("role").eq("id", sUser.id).single();
            return data?.role as string | undefined;
          } catch {
            return undefined;
          }
        })();
        setUser({ name, email: sUser.email, role });
        try { await supabase.from("profiles").upsert({ id: sUser.id, name, email: sUser.email }, { onConflict: "id" }); } catch {}
      }
      return;
    }
    // Fallback demo
    const nameFromEmail = email.split("@")[0];
    setUser({ name: nameFromEmail, email, role: "customer" });
  };

  const register = async (name: string, email: string, password: string) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      // Many Supabase setups require email verification before session is active
      // Do not set user here unless a session exists
      if (data.user?.email && data.session) {
        setUser({ name, email: data.user.email });
      }
      try { await supabase.functions.invoke("send-welcome-email", { body: { name, to: email } }); } catch {}
      return;
    }
    // Fallback demo
    setUser({ name, email, role: "customer" });
  };

  const loginWithProvider = async (provider: "google" | "github") => {
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    if (!supabase) return;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    if (error) throw error;
  };

  const sendWelcomeEmail = async (name: string, email: string) => {
    if (!supabase) return;
    try {
      await supabase.functions.invoke("send-welcome-email", {
        body: { name, to: email },
      });
    } catch {}
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithProvider, resetPassword, sendWelcomeEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
