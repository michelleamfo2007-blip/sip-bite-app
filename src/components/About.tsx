import { Link } from "react-router-dom";
import friesImg from "../../images/menu/fries.jpg";
import chickenImg from "../../images/menu/chicken-5.jpg";
import sweetChicksImg from "../../images/menu/fries-2-chicken.jpg";
import sausageImg from "../../images/menu/sausage-kebab.jpg";
import Testimonials from "./Testimonials";
import Contact from "./Contact";

const differences = [
  { title: "The market", text: "We buy from Accra markets and cook the same day." },
  { title: "The spice", text: "House blends, built from the grill, not a bottled shortcut." },
  { title: "The hour", text: "Plates leave hot, and they arrive that way." },
];

export default function About() {
  return (
    <div>
      <section className="bg-brand-cream">
        <div className="mx-auto grid max-w-6xl items-end gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-brand-yellow">The house</p>
            <h1 className="mt-4 font-display text-6xl font-medium leading-[0.95] md:text-7xl">
              A small grill, <span className="italic text-brand-red">kept with care.</span>
            </h1>
          </div>
          <p className="max-w-md pb-2 text-base font-light leading-relaxed text-brand-dark/70">
            Sip & Bite started so Accra street food could be ordered without losing the smoke. Late plates, quiet lunches, the same seasoning.
          </p>
        </div>
        <img src={sweetChicksImg} alt="Fries with two pieces of chicken" className="h-[420px] w-full object-cover" />
      </section>

      <section className="bg-brand-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-3">
          {differences.map((item, index) => (
            <div key={item.title} className="border-t border-brand-dark/10 pt-6">
              <p className="text-[11px] uppercase tracking-[0.28em] text-brand-yellow">0{index + 1}</p>
              <h2 className="mt-3 font-display text-4xl font-medium">{item.title}</h2>
              <p className="mt-3 text-sm font-light leading-relaxed text-brand-dark/65">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          {[friesImg, chickenImg, sausageImg, sweetChicksImg].map((img) => (
            <img key={img} src={img} alt="" className="aspect-[4/3] w-full border border-brand-yellow/40 object-cover" />
          ))}
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-brand-yellow">How we cook</p>
          <h2 className="mt-4 font-display text-5xl font-medium leading-tight">Seasoned in the house. Finished on the grill.</h2>
          <p className="mt-5 max-w-md font-light leading-relaxed text-brand-dark/70">
            No heat lamps and no mystery sauce. A plate leaves when it is ready, and it still smells like smoke when it arrives.
          </p>
          <Link to="/menu" className="mt-8 inline-flex border border-brand-dark px-6 py-3 text-[11px] uppercase tracking-[0.28em]">
            View the menu
          </Link>
        </div>
      </section>

      <Testimonials />
      <Contact compact />
    </div>
  );
}
