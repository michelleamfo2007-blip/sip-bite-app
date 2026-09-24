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
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import { Leaf, Flame, Truck, ArrowRight } from "lucide-react";
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

const specials = [
  { name: "Sweet Chicks Combo", price: "GH₵50", image: sweetChicksImg, note: "Lunch plate" },
  { name: "Mega Crunch Duo", price: "GH₵75", image: megaCrunchDuoImg, note: "Feeds two" },
  { name: "Kebab + Fries", price: "GH₵55", image: kebabImg, note: "Grill special" },
];

const reasons = [
  { icon: Leaf, title: "Market fresh", text: "Produce picked up from Accra markets the same day it hits the grill." },
  { icon: Flame, title: "Street spice", text: "The same heat you’d get from a night stall, portioned for the table." },
  { icon: Truck, title: "Still hot", text: "Packed to travel and handed off across central Accra." },
];

function HomePage() {
  return (
    <div>
      <Hero />

      <section className="border-b border-black/5">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
          {reasons.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-medium text-brand-dark">{item.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-brand-dark/65">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Today’s grill</p>
            <h2 className="mt-2 font-display text-4xl font-medium text-brand-dark md:text-5xl">Three plates worth opening the menu for.</h2>
          </div>
          <Link to="/menu#promotions" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark">
            Full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {specials.map((item, index) => (
            <Link
              key={item.name}
              to="/menu#promotions"
              className={`group overflow-hidden rounded-[28px] bg-brand-white ${index === 0 ? "md:col-span-2" : ""}`}
            >
              <div className={`overflow-hidden ${index === 0 ? "h-80" : "h-56"}`}>
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex items-end justify-between gap-4 px-5 py-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-dark/45">{item.note}</p>
                  <h3 className="mt-1 font-display text-2xl font-medium">{item.name}</h3>
                </div>
                <p className="text-sm font-semibold text-brand-red">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-brand-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            <img src={chickenImg} alt="Crispy chicken" className="h-56 w-full rounded-3xl object-cover" />
            <img src={kebabImg} alt="Kebabs" className="mt-8 h-56 w-full rounded-3xl object-cover" />
            <img src={sausageImg} alt="Sausage" className="-mt-6 h-40 w-full rounded-3xl object-cover" />
            <img src={friesImg} alt="Fries" className="h-40 w-full rounded-3xl object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">The kitchen</p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-tight text-brand-dark md:text-5xl">
              Accra street food, plated without the wait.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-brand-dark/70">
              Smoky chicken, juicy kebabs, and fries that stay golden. We cook in small batches so the food that leaves Osu tastes like it just came off the grill.
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
          {[friesImg, chickenImg, kebabImg, sausageImg, sweetChicksImg, megaCrunchDuoImg, cokeImg, fantaImg, spriteImg, waterImg].map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-2xl">
              <img src={img} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="overflow-hidden rounded-[32px] bg-brand-red px-8 py-14 text-white md:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-yellow">This week</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-medium md:text-6xl">Ten percent off your first order.</h2>
          <p className="mt-4 text-white/85">
            Mention <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand-red">SIPBITE10</span> when you order.
          </p>
          <Link to="/menu#promotions" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-red">
            Order now
          </Link>
        </div>
      </section>

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
          <div className="min-h-screen flex flex-col bg-brand-cream text-brand-dark selection:bg-brand-yellow selection:text-brand-dark">
            <motion.div
              className="fixed top-0 left-0 right-0 h-1.5 bg-brand-red z-[60] origin-left"
              style={{ scaleX }}
            />
            
            <Navbar />
            
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}
