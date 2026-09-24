import { Link } from "react-router-dom";
import { Leaf, Flame, Truck, ArrowRight } from "lucide-react";
import friesImg from "../../images/friesss.jpg";
import chickenImg from "../../images/chicken.jpg";
import sweetChicksImg from "../../images/sweet chickss.jpg";
import kebabImg from "../../images/kebahh.webp";
import Testimonials from "./Testimonials";
import Contact from "./Contact";

const differences = [
  { icon: Leaf, title: "Fresh ingredients", text: "We buy from local Ghanaian markets, then cook the same day." },
  { icon: Flame, title: "Authentic spice", text: "Blends built from street-grill recipes, not a bottled shortcut." },
  { icon: Truck, title: "On time", text: "Hot food, packed to travel, across central Accra." },
];

export default function About() {
  return (
    <div>
      <section className="grid bg-brand-dark text-white md:grid-cols-2">
        <div className="flex flex-col justify-end px-6 py-16 sm:px-10 lg:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-yellow">About</p>
          <h1 className="mt-4 max-w-xl font-display text-5xl font-medium leading-tight md:text-6xl">
            Sip & Bite, from an Osu grill.
          </h1>
          <p className="mt-4 max-w-md text-lg text-white/75">Bold plates for late nights, quick lunches, and everyone in between.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/menu#promotions" className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white">
              Order now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/menu" className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white">
              View menu
            </Link>
          </div>
        </div>
        <div className="relative min-h-[320px]">
          <img src={sweetChicksImg} alt="Sweet chicks combo" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <h2 className="font-display text-4xl font-medium leading-tight md:text-5xl">
          We started with one goal: street food that still tastes like the street.
        </h2>
        <p className="text-base leading-relaxed text-brand-dark/70">
          Sip & Bite brings the heat of Accra’s night stalls to a counter you can actually order from. Late cravings, office lunches, and everything in between — fast, fresh, and seasoned properly.
        </p>
      </section>

      <section className="bg-brand-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl font-medium">What we won’t compromise.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {differences.map((item) => (
              <div key={item.title}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-dark/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">How we cook</p>
            <h2 className="mt-3 font-display text-4xl font-medium">Affordable, filling, and full of character.</h2>
            <p className="mt-4 max-w-md leading-relaxed text-brand-dark/70">
              Every plate is seasoned in-house and cooked to order. No heat lamps, no mystery sauce — just the grill, the spice, and a box that still smells like smoke when it arrives.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[friesImg, chickenImg, kebabImg, sweetChicksImg].map((img) => (
              <img key={img} src={img} alt="" className="aspect-[4/3] w-full rounded-3xl object-cover" />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <div className="pt-16">
        <Contact compact />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-[32px] bg-brand-dark px-8 py-14 text-white md:px-14">
          <h2 className="max-w-xl font-display text-4xl font-medium md:text-5xl">Ready to taste the difference?</h2>
          <Link to="/menu#promotions" className="mt-8 inline-flex rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white">
            Order now
          </Link>
        </div>
      </section>
    </div>
  );
}
