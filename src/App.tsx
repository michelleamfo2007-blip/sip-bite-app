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
import Flyer from "./components/Flyer";
import Banner from "./components/Banner";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import friesImg from "../images/menu/fries.jpg";
import chickenImg from "../images/menu/chicken-3.jpg";
import sausageImg from "../images/menu/sausage-kebab.jpg";
import fries2ChickenImg from "../images/menu/fries-2-chicken.jpg";
import fries3ChickenDrinkImg from "../images/menu/fries-3-chicken-drink.jpg";
import samosaChickenDrinkImg from "../images/menu/samosa-chicken-drink.jpg";
import springrollChickenDrinkImg from "../images/menu/springroll-chicken-drink.jpg";
import samosa3ChickenDrinkImg from "../images/menu/samosa-3-chicken-drink.jpg";
import springroll3ChickenDrinkImg from "../images/menu/springroll-3-chicken-drink.jpg";
import samosaImg from "../images/menu/samosa-3.jpg";

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
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/flyer" element={<Flyer />} />
          <Route path="/banner" element={<Banner />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const specials = [
  { name: "Fries + 2 chicken pieces", price: "GH₵50", image: fries2ChickenImg, note: "Combo" },
  { name: "Fries, 3 chicken & drink", price: "GH₵80", image: fries3ChickenDrinkImg, note: "Combo" },
  { name: "Samosas, 2 chicken & drink", price: "GH₵50", image: samosaChickenDrinkImg, note: "Combo" },
  { name: "Spring rolls, 2 chicken & drink", price: "GH₵50", image: springrollChickenDrinkImg, note: "Combo" },
  { name: "Fries, samosas, 3 chicken & drink", price: "GH₵100", image: samosa3ChickenDrinkImg, note: "Combo" },
  { name: "Fries, spring rolls, 3 chicken & drink", price: "GH₵100", image: springroll3ChickenDrinkImg, note: "Combo" },
];

const reasons = [
  { title: "Market fresh", text: "Produce picked up from Accra markets the same day it hits the grill." },
  { title: "House spice", text: "The heat of a night stall, plated with a little more care." },
  { title: "Sent hot", text: "Packed to travel and handed across central Accra." },
];

function HomePage() {
  return (
    <div>
      <Hero />

      <section className="border-b border-black/5">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
          {reasons.map((item) => (
            <div key={item.title} className="border-t border-brand-dark/10 pt-6">
              <p className="text-[11px] uppercase tracking-[0.28em] text-brand-yellow">0{reasons.indexOf(item) + 1}</p>
              <h2 className="mt-3 font-display text-3xl font-medium text-brand-dark">{item.title}</h2>
              <p className="mt-3 text-sm font-light leading-relaxed text-brand-dark/65">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-yellow">The house plates</p>
            <h2 className="mt-3 font-display text-5xl font-medium text-brand-dark md:text-6xl">The combos, plated together.</h2>
          </div>
          <Link to="/menu#promotions" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark">
            Full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {specials.map((item) => (
            <Link
              key={item.name}
              to="/menu#promotions"
              className="group flex h-full flex-col overflow-hidden border border-brand-dark/10 bg-brand-white"
            >
              <div className="h-64 overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col px-5 py-5">
                <p className="text-xs uppercase tracking-[0.16em] text-brand-dark/45">{item.note}</p>
                <h3 className="mt-1 font-display text-2xl font-medium leading-tight">{item.name}</h3>
                <p className="mt-auto pt-4 text-sm font-semibold text-brand-red">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-brand-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            <img src={chickenImg} alt="Crispy chicken" className="h-56 w-full border border-brand-yellow/40 object-cover" />
            <img src={fries2ChickenImg} alt="Fries and chicken" className="mt-8 h-56 w-full border border-brand-yellow/40 object-cover" />
            <img src={sausageImg} alt="Sausage" className="-mt-6 h-40 w-full border border-brand-yellow/40 object-cover" />
            <img src={friesImg} alt="Fries" className="h-40 w-full border border-brand-yellow/40 object-cover" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-brand-yellow">The kitchen</p>
            <h2 className="mt-4 font-display text-5xl font-medium leading-tight text-brand-dark">
              Street food, plated without the rush.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-brand-dark/70">
              Smoky chicken, juicy kebabs, and fries that stay golden. We cook in small batches so the food that leaves Achimota tastes like it just came off the grill.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-red">
              Our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-4xl font-medium">A look at the counter.</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {[friesImg, chickenImg, sausageImg, fries2ChickenImg, samosaImg, fries3ChickenDrinkImg, samosaChickenDrinkImg, springrollChickenDrinkImg].map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden border border-brand-dark/10">
              <img src={img} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <Testimonials />

      <Contact compact />
    </div>
  );
}

function Frame() {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const bare = pathname === "/flyer" || pathname === "/banner";

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-dark selection:bg-brand-yellow selection:text-brand-dark">
      {!bare && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-px bg-brand-yellow z-[60] origin-left"
          style={{ scaleX }}
        />
      )}
      {!bare && <Navbar />}
      <main className="flex-grow">
        <AnimatedRoutes />
      </main>
      {!bare && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Frame />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}
