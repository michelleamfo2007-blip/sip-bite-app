import { UtensilsCrossed, Instagram, Facebook, Twitter } from "lucide-react";
import type { ReactNode } from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-sm font-bold text-slate-500 uppercase tracking-wider">
          <span>📍 Osu, Accra, Ghana</span>
          <span>📞 0537858896</span>
          <span>🕒 10AM - 11PM</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-brand-red text-brand-yellow px-2 py-0.5 rounded font-black text-xs">
            GH
          </div>
          <span className="font-display text-sm font-black tracking-tighter uppercase text-brand-dark">
            SIP & BITE
          </span>
        </div>

        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          © 2024 Sip & Bite
        </p>
      </div>
    </footer>
  );
}
