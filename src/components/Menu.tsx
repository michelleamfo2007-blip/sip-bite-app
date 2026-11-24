import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { menuData } from "@/data/menu";
import chickenImg from "../../images/menu/fries-2-chicken.jpg";
import { motion } from "motion/react";

export default function Menu() {
  const categories = [
    { label: 'Promotions', key: 'promotions' },
    { label: 'Fries', key: 'fries' },
    { label: 'Kebabs', key: 'kebabs' },
    { label: 'Chicken', key: 'chicken' },
    { label: 'Small chops', key: 'snacks' },
    { label: 'Drinks', key: 'drinks' },
  ];

  const [active, setActive] = useState<string>('promotions');

  const sections: Record<string, any[]> = {
    promotions: menuData.packages,
    drinks: menuData.drinks,
    snacks: menuData.snacks,
    fries: menuData.fries,
    kebabs: menuData.kebab,
    chicken: menuData.chicken,
  };

  useEffect(() => {
    const ids = categories.map((c) => c.key);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { root: null, rootMargin: '-100px 0px -60% 0px', threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (key: string) => {
    setActive(key);
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="menu" className="w-full pb-20">
      <div className="bg-brand-dark text-white">
        <div className="mx-auto grid max-w-6xl items-end gap-8 px-6 py-16 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-yellow">The menu</p>
            <h1 className="mt-3 font-display text-5xl font-medium leading-tight md:text-7xl">A short list, cooked to order.</h1>
          </div>
          <p className="max-w-md pb-1 text-white/75">Combos, grill plates, snacks, and cold drinks. Pick a category, then open anything to add it.</p>
        </div>
        <div className="h-56 overflow-hidden sm:h-72">
          <img src={chickenImg} alt="" className="h-full w-full object-cover object-center" />
        </div>
      </div>

      <div className="sticky top-[72px] z-40 border-b border-black/5 bg-brand-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => handleNavClick(c.key)}
              className={`whitespace-nowrap border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                active === c.key ? 'border-brand-dark bg-brand-dark text-brand-cream' : 'border-brand-dark/15 bg-transparent text-brand-dark/60 hover:text-brand-dark'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-6 pt-12">

      {categories.map((c) => (
        <MenuCategory
          key={c.key}
          id={c.key}
          title={c.label}
          items={sections[c.key]}
          isPackage={c.key === 'promotions'}
        />
      ))}
      </div>
    </section>
  );
}

function MenuCategory({ id, title, items, isPackage = false }: { id: string, title: string, items: any[], isPackage?: boolean, key?: string }) {
  const isDrinks = title.toLowerCase() === 'drinks';
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="scroll-mt-32"
    >
      <h2 className="mb-6 font-display text-3xl font-medium text-brand-dark md:text-4xl">{title}</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} isPackage={isPackage} isDrinks={isDrinks} />
        ))}
      </div>
    </motion.section>
  );
}

interface MenuItemProps {
  key?: any;
  item: {
    id: string;
    name: string;
    price: number;
    description?: string;
    image: string;
    options?: string[];
  };
  isPackage: boolean;
  isDrinks?: boolean;
}

function MenuItem({ item, isDrinks }: MenuItemProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
      className="group overflow-hidden border border-brand-dark/10 bg-brand-white"
    >
      <Link to={`/menu/${item.id}`} className={`block w-full overflow-hidden bg-white ${isDrinks ? "h-56" : "h-48"}`}>
        <img
          src={item.image}
          alt={item.name}
          className={`h-full w-full transform-gpu transition-transform duration-500 group-hover:scale-105 ${isDrinks ? "object-contain p-4" : "object-cover"}`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image';
          }}
        />
      </Link>
      <div className="px-4 py-4">
        <h3 className="min-w-0 font-display text-xl font-medium leading-tight text-balance text-brand-dark">{item.name}</h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-brand-red">GH₵{item.price.toFixed(2)}</p>
          <Link to={`/menu/${item.id}`} className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-brand-dark/50 hover:text-brand-red">
            Order
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
