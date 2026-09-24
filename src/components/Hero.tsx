import { ArrowRight } from "lucide-react";
import friesImg from "../../images/friesss.jpg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="home" className="grid min-h-[calc(100vh-72px)] bg-brand-dark text-white md:grid-cols-2">
      <div className="flex flex-col justify-end px-6 py-14 sm:px-10 lg:px-16">
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
      </div>
      <div className="relative min-h-[360px]">
        <img src={friesImg} alt="Golden fries" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </section>
  );
}
