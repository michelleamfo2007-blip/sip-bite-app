import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
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
    <nav className="relative z-50 w-full bg-brand-red text-white shadow-lg">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" onClick={(e) => handleNavClick(e, '/#home')} className="flex items-center gap-3">
          <div className="bg-brand-yellow text-brand-red px-3 py-1 rounded-lg font-black text-xl">
            GH
          </div>
          <span className="font-display text-2xl font-black tracking-tighter uppercase">
            SIP & BITE
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-bold uppercase tracking-wider hover:text-brand-yellow transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-sm font-bold uppercase tracking-wider hover:text-brand-yellow transition-colors">
              Admin
            </Link>
          )}
          <div className="flex items-center gap-4">
            <AuthDialogButton />
            <Cart />
            <Button className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-red font-black rounded-full px-8 uppercase" render={<a href="https://wa.me/233537858896" target="_blank" rel="noreferrer">Order Now</a>} />
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-4">
          <AuthDialogButton />
          <Cart />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-white" />}>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-brand-red text-white border-none">
              <SheetHeader>
                <SheetTitle className="text-white text-2xl font-black uppercase tracking-tighter mb-8 text-left">Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-2xl font-black uppercase tracking-tighter hover:text-brand-yellow transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-black uppercase tracking-tighter hover:text-brand-yellow transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <Button className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-red font-black rounded-full py-8 text-xl uppercase mt-8" render={<a href="https://wa.me/233537858896" target="_blank" rel="noreferrer">Order via WhatsApp</a>} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
