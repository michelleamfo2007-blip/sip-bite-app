import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Link, NavLink } from "react-router-dom";
import Cart from "./Cart";
import AuthDialogButton from "./AuthDialog";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "Menu", href: "/#menu" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = href.substring(2);
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-brand-cream/85 text-brand-dark backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-xs font-semibold tracking-wide text-white">
            S&B
          </span>
          <span className="font-display text-xl font-medium tracking-tight">
            Sip & Bite
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? "text-brand-red" : "text-brand-dark/70 hover:text-brand-dark"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? "text-brand-red" : "text-brand-dark/70 hover:text-brand-dark"}`
              }
            >
              Admin
            </NavLink>
          )}
          <div className="flex items-center gap-2">
            <AuthDialogButton />
            <Cart />
            <a
              href="https://wa.me/233537858896"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-full bg-brand-red px-5 text-sm font-semibold text-white transition hover:bg-brand-red/90"
            >
              Order now
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <AuthDialogButton />
          <Cart />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-brand-dark" />}>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="border-none bg-brand-cream text-brand-dark">
              <SheetHeader>
                <SheetTitle className="mb-8 text-left font-display text-3xl font-medium text-brand-dark">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-3xl font-medium tracking-tight"
                  >
                    {link.name}
                  </Link>
                ))}
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="font-display text-3xl font-medium tracking-tight"
                  >
                    Admin
                  </Link>
                )}
                <a
                  href="https://wa.me/233537858896"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-red py-4 text-base font-semibold text-white"
                >
                  Order on WhatsApp
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
