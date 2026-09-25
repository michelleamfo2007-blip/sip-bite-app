import { ArrowRight, Clock, Star, Truck } from "lucide-react";
import friesImg from "../../images/friesss.jpg";
import chickenImg from "../../images/chicken.jpg";
import kebabImg from "../../images/kebahh.webp";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="home" className="bg-brand-dark text-white">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-12 px-6 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-yellow">
            Osu, Accra · Open 10am–11pm
          </p>
          <h1 className="mt-5 max-w-xl font-display text-5xl font-medium leading-[0.95] sm:text-6xl lg:text-7xl">
            Chicken, kebabs, and the fries you came for.
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/75">
            Street-grill flavor, cooked fresh and sent hot across Accra.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/menu#promotions"
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-red/90"
            >
              Order now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See the menu
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                ))}
              </span>
              Loved by regulars
            </span>
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-brand-yellow" /> Delivery in 20–45 min
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-yellow" /> Open until 11pm
            </span>
          </div>
        </div>

        <div className="grid h-[420px] grid-cols-2 grid-rows-2 gap-3 md:h-[560px]">
          <div className="row-span-2 overflow-hidden rounded-[28px] bg-white">
            <img src={chickenImg} alt="Crispy fried chicken" className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden rounded-[28px] bg-white">
            <img src={kebabImg} alt="Grilled kebabs" className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden rounded-[28px] bg-white">
            <img src={friesImg} alt="Golden fries" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
