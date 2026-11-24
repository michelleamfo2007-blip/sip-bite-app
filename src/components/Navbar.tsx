import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Link, NavLink } from "react-router-dom";
import Cart from "./Cart";
import AuthDialogButton from "./AuthDialog";
import { useAuth } from "@/context/AuthContext";
import logo from "../../images/logo.jpg";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-brand-dark/10 bg-brand-cream/90 text-brand-dark backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:h-[72px] md:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2 md:gap-3">
          <img src={logo} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover md:h-12 md:w-12" />
          <span className="truncate font-display text-xl font-medium tracking-wide md:text-2xl">Sip & Bite</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                `text-[11px] font-medium uppercase tracking-[0.22em] transition-colors ${isActive ? "text-brand-red" : "text-brand-dark/55 hover:text-brand-dark"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-[11px] font-medium uppercase tracking-[0.22em] transition-colors ${isActive ? "text-brand-red" : "text-brand-dark/55 hover:text-brand-dark"}`
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
              className="inline-flex h-10 items-center border border-brand-dark px-5 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-dark transition hover:bg-brand-dark hover:text-brand-cream"
            >
              Order now
            </a>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 md:hidden">
          <AuthDialogButton compact />
          <Cart compact />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-brand-dark" />}>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="gap-0 border-none bg-brand-cream px-6 pb-8 pt-6 text-brand-dark">
              <SheetHeader className="p-0 pr-10">
                <SheetTitle className="flex items-center gap-3 text-left font-display text-2xl font-medium text-brand-dark">
                  <img src={logo} alt="" className="h-10 w-10 rounded-full object-cover" />
                  Sip & Bite
                </SheetTitle>
              </SheetHeader>
              <div className="mt-10 flex flex-col gap-5">
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
                  className="mt-6 inline-flex w-full items-center justify-center border border-brand-dark bg-brand-dark px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-cream"
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
