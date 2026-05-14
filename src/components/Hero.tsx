import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import friesImg from "../../images/friesss.jpg";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]); 
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  return (
    <section ref={ref} id="home" className="relative overflow-hidden bg-brand-dark text-white p-12 rounded-[24px] min-h-[500px] flex flex-col justify-center">
      {/* Background image and overlay */}
      <motion.img
        src={friesImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ y, scale }}
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Decorative background elements */}
      <div className="absolute bottom-[-20px] right-[-20px] w-48 h-48 bg-brand-red opacity-30 rounded-full z-20" />
      <div className="absolute top-8 right-8 text-7xl opacity-20 select-none z-20">🍗</div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-30"
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6 uppercase tracking-tighter">
          CHICKEN,<br />
          <span className="text-brand-yellow">KEBABS</span><br />
          & MORE.
        </h1>
        <p className="text-lg md:text-xl opacity-90 font-medium mb-10 max-w-md">
          The boldest taste in Accra. Hot, spicy, and delivered fresh to your doorstep.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-brand-red hover:bg-brand-red/90 text-white font-black rounded-full px-6 uppercase" render={<Link to="/menu#promotions">Order Now</Link>} />
          <Button variant="outline" className="bg-white/90 text-brand-dark hover:bg-white rounded-full px-6 font-black uppercase" render={<Link to="/menu">View Menu</Link>} />
        </div>
        <div className="mt-auto pt-8">
          <p className="text-[10px] uppercase tracking-[4px] opacity-60 font-black">Daily Specials Available</p>
        </div>
      </motion.div>
    </section>
  );
}
