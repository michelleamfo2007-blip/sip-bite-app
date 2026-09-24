import { Button } from "@/components/ui/button";
import { ShoppingCart, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { menuData } from "@/data/menu";
import chickenImg from "../../images/chicken.jpg";
import { motion } from "motion/react";

export default function Menu() {
  const categories = [
    { label: 'Promotions', key: 'promotions' },
    { label: 'Fries', key: 'fries' },
    { label: 'Kebabs', key: 'kebabs' },
    { label: 'Chicken', key: 'chicken' },
    { label: 'Snacks', key: 'snacks' },
    { label: 'Drinks', key: 'drinks' },
  ];

  const [active, setActive] = useState<string>('promotions');

  const allItems = [
    ...menuData.drinks,
    ...menuData.regular,
    ...menuData.snacks,
    ...menuData.packages,
  ];

  const sections: Record<string, any[]> = {
    promotions: menuData.packages,
    drinks: menuData.drinks,
    snacks: menuData.snacks,
    fries: allItems.filter((i) => /fries/i.test(i.name)),
    kebabs: allItems.filter((i) => /kebab/i.test(i.name)),
    chicken: allItems.filter((i) => /chicken|wings/i.test(i.name)),
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-yellow">The menu</p>
            <h1 className="mt-3 font-display text-5xl font-medium leading-tight md:text-6xl">Order the way you actually eat.</h1>
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
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === c.key ? 'bg-brand-dark text-white' : 'bg-white text-brand-dark/70 hover:text-brand-dark'
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
    popular?: boolean;
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
      className="group overflow-hidden rounded-[24px] bg-brand-white"
    >
      <Link to={`/menu/${item.id}`} className={`block w-full overflow-hidden ${isDrinks ? 'h-44 bg-white' : 'h-48'}`}>
        <img
          src={item.image}
          alt={item.name}
          className={`h-full w-full transform-gpu transition-transform duration-500 group-hover:scale-105 ${isDrinks ? 'object-contain p-6' : 'object-cover'}`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image';
          }}
        />
      </Link>
      <div className="flex items-start justify-between gap-3 px-4 py-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-xl font-medium leading-tight text-brand-dark">{item.name}</h3>
            {item.popular && <Flame className="h-4 w-4 fill-brand-yellow text-brand-yellow" />}
          </div>
          <p className="mt-1 text-sm font-semibold text-brand-red">GH₵{item.price.toFixed(2)}</p>
        </div>
        <Link to={`/menu/${item.id}`} aria-label={`Order ${item.name}`}>
          <Button size="icon" className="size-10 rounded-full bg-brand-dark text-white hover:bg-brand-red">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
