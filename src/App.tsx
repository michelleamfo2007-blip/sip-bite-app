import { useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Checkout from "./components/Checkout";
import MenuDetail from "./components/MenuDetail";
import ResetPassword from "./components/ResetPassword";
import Admin from "./components/Admin";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Leaf, Flame, Truck } from "lucide-react";
import friesImg from "../images/friesss.jpg";
import chickenImg from "../images/chicken.jpg";
import kebabImg from "../images/kebahh.webp";
import sausageImg from "../images/sasuage.webp";
import sweetChicksImg from "../images/sweet chickss.jpg";
import megaCrunchDuoImg from "../images/Mega Crunch Duo.jpg";
import cokeImg from "../images/coke.jpeg";
import fantaImg from "../images/fanta.jpeg";
import spriteImg from "../images/sprite.jpeg";
import waterImg from "../images/water.jpeg";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function FeatureCard({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative p-8 rounded-[24px] bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all"
    >
      <span className="text-4xl font-black text-brand-red/10 absolute top-4 right-6 select-none">{number}</span>
      <h4 className="text-xl font-black mb-2 uppercase tracking-tight text-brand-dark">{title}</h4>
      <p className="text-slate-500 font-medium leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
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
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
    <div className="flex flex-col gap-12">
      {/* 1. HERO */}
      <Hero />

      {/* 2. FEATURES */}
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
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center mb-3"><Truck className="text-brand-red w-5 h-5" /></div>
            <h4 className="font-black uppercase tracking-tight text-brand-dark mb-1">Fast Delivery</h4>
            <p className="text-sm text-slate-600 font-medium">Hot and crispy to your door in minutes.</p>
          </div>
        </div>
      </section>

      {/* 3. DAILY SPECIALS */}
      <section className="p-10 rounded-[24px] bg-white shadow-sm border border-slate-100">
        <div className="mb-8">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4 inline-block bg-brand-red/10 text-brand-red">Daily Specials</span>
          <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">Don’t Miss Today’s Deals</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <img src={sweetChicksImg} alt="Sweet Chicks Combo" className="w-full h-44 object-cover" />
            <div className="p-4">
              <h4 className="font-black uppercase tracking-tight text-brand-dark">Sweet Chicks Combo</h4>
              <p className="text-sm font-bold text-slate-500">GH₵50.00</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <img src={megaCrunchDuoImg} alt="Mega Crunch Duo" className="w-full h-44 object-cover" />
            <div className="p-4">
              <h4 className="font-black uppercase tracking-tight text-brand-dark">Mega Crunch Duo</h4>
              <p className="text-sm font-bold text-slate-500">GH₵75.00</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <img src={kebabImg} alt="Kebab + Fries Deal" className="w-full h-44 object-cover" />
            <div className="p-4">
              <h4 className="font-black uppercase tracking-tight text-brand-dark">Kebab + Fries Deal</h4>
              <p className="text-sm font-bold text-slate-500">GH₵55.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOD GALLERY */}
      <section className="p-10 rounded-[24px] bg-white shadow-sm border border-slate-100">
        <div className="mb-8">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4 inline-block bg-brand-red/10 text-brand-red">Food Gallery</span>
          <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">Feast Your Eyes</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[friesImg, chickenImg, kebabImg, sausageImg, sweetChicksImg, megaCrunchDuoImg, cokeImg, fantaImg, spriteImg, waterImg].map((img, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <img src={img} alt="Food" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* 5. ABOUT / OUR STORY (quick) */}
      <section className="p-10 rounded-[24px] bg-white shadow-sm border border-slate-100">
        <div className="mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4 inline-block bg-brand-red/10 text-brand-red">Our Story</span>
        </div>
        <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-3">Authentic Street Food • Modern Vibes</h3>
        <p className="text-slate-600 font-medium max-w-3xl">
          We bring the bold, smoky flavors of Ghanaian street food to Accra with clean, modern service. From crispy chicken to juicy kebabs and golden fries, everything is made fresh and served fast.
        </p>
      </section>

      {/* 6. TESTIMONIALS */}
      <Testimonials />

      {/* 7. PROMO SECTION (bold banner) */}
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
          <a href="/menu#promotions" className="inline-flex items-center justify-center bg-white text-brand-red font-black rounded-full px-6 py-3 uppercase">Order Now</a>
        </div>
      </section>

      {/* 8. CONTACT / LOCATION (final) */}
      <Contact compact />
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-white selection:bg-brand-yellow selection:text-slate-900">
            <motion.div
              className="fixed top-0 left-0 right-0 h-1.5 bg-brand-red z-[60] origin-left"
              style={{ scaleX }}
            />
            
            <Navbar />
            
            <main className="flex-grow container mx-auto px-4 py-6">
              <AnimatedRoutes />
            </main>
            
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}
