import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Checkout from "./components/Checkout";
import ResetPassword from "./components/ResetPassword";
import Admin from "./components/Admin";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Leaf, Flame, Tent } from "lucide-react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* 1. HERO */}
      <Hero />

      {/* 2. MENU */}
      <div id="menu">
        <Menu />
      </div>

      {/* 3. FEATURES */}
      <section className="p-10 rounded-[24px] bg-white shadow-sm border border-slate-100">
        <div className="mb-8">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4 inline-block bg-brand-red/10 text-brand-red">Why Choose Us</span>
          <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">Quality • Speed • Flavor</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center mb-3"><Leaf className="text-brand-red w-5 h-5" /></div>
            <h4 className="font-black uppercase tracking-tight text-brand-dark mb-1">Fresh Ingredients</h4>
            <p className="text-sm text-slate-600 font-medium">Sourced daily from local Ghanaian markets.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center mb-3"><Flame className="text-brand-red w-5 h-5" /></div>
            <h4 className="font-black uppercase tracking-tight text-brand-dark mb-1">Authentic Spices</h4>
            <p className="text-sm text-slate-600 font-medium">Signature blends inspired by street grills.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center mb-3"><Tent className="text-brand-red w-5 h-5" /></div>
            <h4 className="font-black uppercase tracking-tight text-brand-dark mb-1">Live Events</h4>
            <p className="text-sm text-slate-600 font-medium">Catch us grilling live at festivals and pop-ups.</p>
          </div>
        </div>
      </section>

      {/* 4. ABOUT / OUR STORY (quick) */}
      <section id="about" className="p-10 rounded-[24px] bg-white shadow-sm border border-slate-100 scroll-mt-24">
        <div className="mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4 inline-block bg-brand-red/10 text-brand-red">Our Story</span>
        </div>
        <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-3">Authentic Street Food • Modern Vibes</h3>
        <p className="text-slate-600 font-medium max-w-3xl">
          We bring the bold, smoky flavors of Ghanaian street food to Accra with clean, modern service. From crispy chicken to juicy kebabs and golden fries, everything is made fresh and served fast.
        </p>
      </section>

      {/* 5. TESTIMONIALS */}
      <Testimonials />

      {/* 6. PROMO SECTION (bold banner) */}
      <section className="p-8 bg-brand-red rounded-[24px] overflow-hidden relative min-h-[220px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <div className="text-[10vw] font-black text-white whitespace-nowrap animate-pulse">
            SIP & BITE • SIP & BITE
          </div>
        </div>
        <div className="relative z-10 text-center">
          <h3 className="text-2xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">
            Hungry for more? Get <span className="text-brand-yellow">10% OFF</span>!
          </h3>
          <p className="text-white/90 font-bold max-w-xl mx-auto mb-4">
            Use code <span className="bg-white text-brand-red px-3 py-1 rounded-lg">SIPBITE10</span>
          </p>
          <a href="#menu" onClick={(e) => { e.preventDefault(); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }) }} className="inline-flex items-center justify-center bg-white text-brand-red font-black rounded-full px-6 py-3 uppercase cursor-pointer">Order Now</a>
        </div>
      </section>

      {/* 7. CONTACT / LOCATION (final) */}
      <div id="contact" className="scroll-mt-24">
        <Contact compact />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-white selection:bg-brand-yellow selection:text-slate-900 overflow-x-hidden">
            <Navbar />
            
            <main className="flex-grow container mx-auto px-4 w-full">
              <AnimatedRoutes />
            </main>
            
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}
