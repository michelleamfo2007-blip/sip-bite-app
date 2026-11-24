import { Link } from "react-router-dom";
import logo from "../../images/logo.jpg";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <img src={logo} alt="" className="h-16 w-16 rounded-full object-cover" />
            <p className="font-display text-4xl font-medium">Sip & Bite</p>
          </div>
          <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-white/60">
            A grill house in Achimota. Chicken, sausage kebabs, and fries, cooked to order.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow">Visit</p>
          <p className="mt-3 text-sm text-white/75">Achimota, Accra, Ghana</p>
          <a href="tel:0537858896" className="mt-1 block text-sm text-white/75 hover:text-white">
            053 785 8896
          </a>
          <p className="mt-1 text-sm text-white/75">Daily, 10am – 11pm</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/75">
            <Link to="/menu" className="hover:text-white">Menu</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <a href="https://wa.me/233537858896" target="_blank" rel="noreferrer" className="hover:text-white">
              WhatsApp order
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Sip & Bite</span>
          <span>Accra, Ghana</span>
        </div>
      </div>
    </footer>
  );
}
