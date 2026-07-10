import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import friesImg from "../../images/friesss.jpg";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]); 
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would route to a search results page or filter the menu
    console.log("Searching for:", searchQuery);
  };

  return (
    <section ref={ref} id="home" className="relative pt-28 pb-16 md:pt-40 md:pb-24 flex items-center min-h-[90vh] bg-brand-dark overflow-hidden w-screen left-1/2 -translate-x-1/2">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={friesImg} 
          alt="Delicious food" 
          className="w-full h-full object-cover" 
          style={{ y, scale }}
        />
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        
        {/* Top Label */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block border border-brand-yellow text-brand-yellow text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8"
        >
          Sip & Bite · Accra · Fresh at Events
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 max-w-4xl tracking-tighter uppercase"
        >
          The boldest taste. For the <span className="text-brand-yellow">right moment.</span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed font-medium"
        >
          Sip & Bite brings the boldest chicken, kebabs & more directly to your favorite events and pop-ups in Accra.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-12"
        >
          <Button 
            className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellow/90 text-brand-dark px-8 py-6 rounded-md font-bold text-lg transition-colors uppercase" 
            render={<a href="#menu" onClick={(e) => { e.preventDefault(); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }) }}>Order Now</a>} 
          />
          <Button 
            variant="outline" 
            className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-dark px-8 py-6 rounded-md font-bold text-lg transition-colors uppercase" 
            render={<a href="#menu" onClick={(e) => { e.preventDefault(); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }) }}>View Menu</a>} 
          />
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-2xl bg-white rounded-lg p-2 shadow-2xl mb-16"
        >
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="pl-4 text-brand-dark">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search for dishes by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow py-3 px-2 sm:px-4 outline-none text-brand-dark bg-transparent text-base min-w-0 w-full font-medium"
            />
            <button 
              type="submit"
              className="bg-brand-dark hover:bg-black text-white px-4 sm:px-6 py-3 rounded-md font-bold whitespace-nowrap transition-colors text-sm sm:text-base flex-shrink-0 uppercase"
            >
              Search <span className="hidden sm:inline">Menu</span> &rarr;
            </button>
          </form>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-4xl border-t border-white/20 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/20"
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black text-white mb-2">50+</span>
            <span className="text-white/70 text-sm font-bold uppercase tracking-wider">Dishes Available</span>
          </div>
          <div className="flex flex-col items-center pt-6 md:pt-0">
            <span className="text-4xl font-black text-white mb-2">30m</span>
            <span className="text-white/70 text-sm font-bold uppercase tracking-wider">Upcoming Pop-ups</span>
          </div>
          <div className="flex flex-col items-center pt-6 md:pt-0">
            <span className="text-4xl font-black text-white mb-2">3</span>
            <span className="text-white/70 text-sm font-bold uppercase tracking-wider">Locations in Accra</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
