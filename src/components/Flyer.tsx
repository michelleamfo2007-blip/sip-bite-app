import { menuData } from "@/data/menu";

const combos = menuData.packages;
const plates = [...menuData.kebab, ...menuData.fries, ...menuData.chicken, ...menuData.snacks];
const drinks = menuData.drinks;

export default function Flyer() {
  const clean = new URLSearchParams(window.location.search).has("image");
  return (
    <div className={clean ? "bg-brand-white" : "bg-brand-cream px-4 py-8 print:bg-white print:p-0"}>
      {!clean && (
        <p className="mx-auto mb-4 max-w-[720px] text-center text-xs text-brand-dark/50 print:hidden">
          Screenshot this for WhatsApp, or use your browser’s print to save a page.
        </p>
      )}
      <article className="mx-auto max-w-[720px] overflow-hidden border border-brand-dark/10 bg-brand-white shadow-sm print:max-w-none print:border-0 print:shadow-none">
        <header className="bg-brand-dark px-6 py-7 text-brand-cream">
          <p className="text-[11px] uppercase tracking-[0.32em] text-brand-yellow">Achimota · Accra</p>
          <h1 className="mt-2 font-display text-6xl font-medium leading-none">Sip &amp; Bite</h1>
          <p className="mt-3 max-w-md text-sm text-brand-cream/75">Chicken, sausage kebabs, and fries. Collected in Achimota. Send a rider, or pick it up.</p>
        </header>

        <section className="px-5 py-5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand-yellow">Combos</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {combos.map((item) => (
              <figure key={item.id} className="overflow-hidden border border-brand-dark/10">
                <img src={item.image} alt={item.name} className="h-36 w-full object-cover" />
                <figcaption className="flex items-end justify-between gap-2 px-3 py-2">
                  <span className="font-display text-lg leading-tight">{item.name}</span>
                  <span className="shrink-0 text-sm font-semibold text-brand-red">GH₵{item.price}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="border-t border-brand-dark/10 px-5 py-5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand-yellow">On their own</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {plates.map((item) => (
              <figure key={item.id} className="overflow-hidden border border-brand-dark/10">
                <img src={item.image} alt={item.name} className="h-24 w-full object-cover" />
                <figcaption className="px-2 py-2">
                  <p className="font-display text-base leading-tight">{item.name}</p>
                  <p className="text-sm font-semibold text-brand-red">GH₵{item.price}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="border-t border-brand-dark/10 px-5 py-5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand-yellow">Drinks</p>
          <p className="mt-1 text-xs text-brand-dark/50">Combo drinks: Coke, Fanta, Sprite, or juice.</p>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {drinks.map((item) => (
              <figure key={item.id} className="border border-brand-dark/10 bg-brand-cream">
                <img src={item.image} alt={item.name} className="h-28 w-full object-contain p-2" />
                <figcaption className="border-t border-brand-dark/10 bg-brand-white px-2 py-2 text-center">
                  <p className="text-sm leading-tight">{item.name}</p>
                  <p className="text-sm font-semibold text-brand-red">GH₵{item.price}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <footer className="bg-brand-dark px-6 py-5 text-brand-cream">
          <p className="font-display text-3xl leading-tight">053 785 8896</p>
          <p className="font-display text-3xl leading-tight">025 633 1397</p>
          <p className="mt-1 text-sm text-brand-cream/75">Daily, 10am – 11pm · sipandbite.site</p>
          <p className="mt-2 text-sm text-brand-cream/75">Pay cash, or mobile money to Michelle Amfo, 054 978 9315.</p>
        </footer>
      </article>
    </div>
  );
}
