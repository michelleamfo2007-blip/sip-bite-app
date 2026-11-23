import { Link } from "react-router-dom";
import friesImg from "../../images/friesss.jpg";
import chickenImg from "../../images/chicken.jpg";
import kebabImg from "../../images/kebahh.webp";

export default function Hero() {
  return (
    <section id="home" className="bg-brand-cream text-brand-dark">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-14 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-brand-yellow">
            Osu · Accra
          </p>
          <h1 className="mt-6 max-w-xl font-display text-6xl font-medium leading-[0.92] sm:text-7xl lg:text-8xl">
            Chicken, kebabs, and <span className="italic text-brand-red">the quiet luxury</span> of a hot plate.
          </h1>
          <p className="mt-8 max-w-md text-base font-light leading-relaxed text-brand-dark/70">
            Grilled to order in Osu. Served from ten until eleven, and sent across Accra while it is still hot.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/menu#promotions"
              className="inline-flex items-center border border-brand-dark bg-brand-dark px-7 py-3 text-[11px] font-medium uppercase tracking-[0.28em] text-brand-cream transition hover:bg-brand-red"
            >
              Reserve a plate
            </Link>
            <Link
              to="/menu"
              className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand-dark/70 underline decoration-brand-yellow decoration-1 underline-offset-8 hover:text-brand-dark"
            >
              View the menu
            </Link>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-brand-dark/10 pt-6 text-[11px] uppercase tracking-[0.18em] text-brand-dark/55">
            <div>
              <dt className="text-brand-yellow">Service</dt>
              <dd className="mt-2 text-brand-dark">20–45 min</dd>
            </div>
            <div>
              <dt className="text-brand-yellow">Hours</dt>
              <dd className="mt-2 text-brand-dark">10–11</dd>
            </div>
            <div>
              <dt className="text-brand-yellow">House</dt>
              <dd className="mt-2 text-brand-dark">Osu</dd>
            </div>
          </dl>
        </div>

        <div className="grid h-[460px] grid-cols-2 grid-rows-2 gap-4 md:h-[620px]">
          <figure className="row-span-2 overflow-hidden border border-brand-yellow/50">
            <img src={chickenImg} alt="Crispy fried chicken" className="h-full w-full object-cover" />
          </figure>
          <figure className="overflow-hidden border border-brand-yellow/50">
            <img src={kebabImg} alt="Grilled kebabs" className="h-full w-full object-cover" />
          </figure>
          <figure className="overflow-hidden border border-brand-yellow/50">
            <img src={friesImg} alt="Golden fries" className="h-full w-full object-cover" />
          </figure>
        </div>
      </div>
    </section>
  );
}
