import { Button } from "@/components/ui/button";
import { ShoppingCart, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { menuData } from "@/data/menu";
import chickenImg from "../../images/chicken.jpg";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import MenuDetail from "./MenuDetail";
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
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

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
    <section id="menu" className="w-full space-y-6">
      <div className="relative overflow-hidden bg-brand-dark text-white p-8 md:p-12 rounded-[24px] min-h-[280px] flex flex-col justify-center">
        <img src={chickenImg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">How would you like to order today?</h1>
          <p className="text-white/90 font-medium mb-6">Browse categories below and add your favorites to the cart.</p>
          <Button className="bg-brand-red hover:bg-brand-red/90 text-white font-black rounded-full px-8 uppercase" render={<a href="#promotions">Order Now</a>} />
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-3 sticky top-24 z-40">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => handleNavClick(c.key)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider transition-colors ${
                active === c.key ? 'bg-brand-red text-white' : 'bg-slate-100 text-brand-dark hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {categories.map((c) => (
        <MenuCategory
          key={c.key}
          id={c.key}
          title={c.label}
          items={sections[c.key]}
          isPackage={c.key === 'promotions'}
          onSelect={setSelectedItemId}
        />
      ))}

      <Dialog open={!!selectedItemId} onOpenChange={(open) => !open && setSelectedItemId(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none">
          <DialogTitle className="sr-only">Menu Item Details</DialogTitle>
          {selectedItemId && <MenuDetail id={selectedItemId} onClose={() => setSelectedItemId(null)} />}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function MenuCategory({ id, title, items, isPackage = false, onSelect }: { id: string, title: string, items: any[], isPackage?: boolean, key?: string, onSelect: (id: string) => void }) {
  const isDrinks = title.toLowerCase() === 'drinks';
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`p-8 rounded-[24px] shadow-sm border border-slate-100 bg-white scroll-mt-28 ${isPackage ? 'md:col-span-2' : ''}`}
    >
      {isDrinks ? (
        <h2 className="text-2xl md:text-3xl font-black text-brand-dark uppercase tracking-tighter mb-6">{title}</h2>
      ) : (
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-6 inline-block bg-brand-red/10 text-brand-red`}>
          {title}
        </span>
      )}
      
      <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`}>
        {items.map((item) => (
          <MenuItem key={item.id} item={item} isPackage={isPackage} isDrinks={isDrinks} onSelect={() => onSelect(item.id)} />
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
  onSelect: () => void;
}

function MenuItem({ item, isPackage, isDrinks, onSelect }: MenuItemProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
      className="group relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all cursor-pointer"
      onClick={onSelect}
    >
      <div className="block w-full h-40 sm:h-44 bg-white">
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full transform-gpu transition-transform duration-300 object-cover group-hover:scale-105`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image';
          }}
        />
      </div>
      <div className="block p-4 pb-16">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-black uppercase tracking-tight text-brand-dark text-sm sm:text-base">{item.name}</h4>
          {item.popular && <Flame className="w-4 h-4 text-brand-yellow fill-brand-yellow" />}
        </div>
        <div className="text-sm font-bold text-slate-500">GH₵{item.price.toFixed(2)}</div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4">
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button size="icon" className="rounded-full size-12 bg-brand-red text-white shadow-lg" onClick={(e) => { e.stopPropagation(); onSelect(); }}>
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
