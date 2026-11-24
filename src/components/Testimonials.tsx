const testimonials = [
  { content: "The sausage kebab is the one I come back for. The spice is exact, and it stays juicy." },
  { content: "Fries with two pieces of chicken is the weekday plate. It arrives quickly, and the fries are still crisp." },
  { content: "Fries, three pieces of chicken, and a drink is enough for two, and ordering takes one message." },
  { content: "Honest portions. The four samosas are the plate I tell people to start with." },
];

export default function Testimonials() {
  return (
    <section className="bg-brand-dark py-24 text-brand-cream">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[11px] uppercase tracking-[0.32em] text-brand-yellow">From the table</p>
        <h2 className="mt-4 max-w-xl font-display text-5xl font-medium text-white md:text-6xl">What they order again.</h2>
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.content} className="border-t border-white/15 pt-6">
              <blockquote className="font-display text-3xl font-medium leading-snug text-white">
                “{t.content}”
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
