import { motion } from "motion/react";
import { Leaf, Flame, Truck } from "lucide-react";
import friesImg from "../../images/friesss.jpg";
import chickenImg from "../../images/chicken.jpg";
import sweetChicksImg from "../../images/sweet chickss.jpg";
import kebabImg from "../../images/kebahh.webp";
import { Button } from "@/components/ui/button";
import Testimonials from "./Testimonials";
import Contact from "./Contact";

export default function About() {
  return (
    <div className="flex flex-col gap-12 py-12">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-brand-dark text-white p-12 rounded-[24px] min-h-[380px] flex flex-col justify-center">
        <img
          src={sweetChicksImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute bottom-[-20px] left-[-20px] w-48 h-48 bg-brand-yellow opacity-20 rounded-full z-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-30 max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-4 uppercase tracking-tighter">About <span className="text-brand-yellow">Sip & Bite</span></h1>
          <p className="text-lg md:text-xl opacity-90 font-medium mb-6">Serving bold, authentic flavors across Accra.</p>
          <div className="flex gap-3">
            <Button className="bg-brand-red hover:bg-brand-red/90 text-white font-black rounded-full px-6 uppercase" render={<a href="/menu#promotions">Order Now</a>} />
            <Button variant="outline" className="bg-white/90 text-brand-dark hover:bg-white rounded-full px-6 font-black uppercase" render={<a href="/menu">View Menu</a>} />
          </div>
        </motion.div>
      </section>

      {/* 2. OUR STORY */}
      <section className="p-10 rounded-[24px] bg-white shadow-sm border border-slate-100">
        <h2 className="text-3xl font-black text-brand-dark mb-4 uppercase tracking-tighter">Our Story</h2>
        <p className="text-slate-600 leading-relaxed font-medium max-w-3xl">
          Sip & Bite started with a simple goal — to bring the rich, spicy taste of street food to everyone in Accra. From late-night cravings to quick lunches, we’ve created meals that are fast, fresh, and full of flavor.
        </p>
      </section>

      {/* 3. WHAT MAKES US DIFFERENT */}
      <section className="p-10 rounded-[24px] bg-brand-yellow shadow-sm border border-brand-yellow/20">
        <h2 className="text-3xl font-black mb-6 text-brand-dark uppercase tracking-tighter">What Makes Us Different</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/90 border border-white">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center mb-3"><Leaf className="text-brand-red w-5 h-5" /></div>
            <h4 className="font-black uppercase tracking-tight text-brand-dark mb-1">Fresh Ingredients</h4>
            <p className="text-sm text-slate-600 font-medium">We source daily from local Ghanaian markets.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/90 border border-white">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center mb-3"><Flame className="text-brand-red w-5 h-5" /></div>
            <h4 className="font-black uppercase tracking-tight text-brand-dark mb-1">Authentic Spices</h4>
            <p className="text-sm text-slate-600 font-medium">Inspired by traditional recipes.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/90 border border-white">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center mb-3"><Truck className="text-brand-red w-5 h-5" /></div>
            <h4 className="font-black uppercase tracking-tight text-brand-dark mb-1">Fast & Reliable Delivery</h4>
            <p className="text-sm text-slate-600 font-medium">Hot food, right on time.</p>
          </div>
        </div>
      </section>

      {/* 4. OUR FOOD PHILOSOPHY */}
      <section className="p-10 rounded-[24px] bg-white shadow-sm border border-slate-100">
        <h2 className="text-3xl font-black text-brand-dark mb-4 uppercase tracking-tighter">Our Food Philosophy</h2>
        <p className="text-slate-600 leading-relaxed font-medium max-w-3xl">
          We believe great food should be affordable, satisfying, and full of character. Every meal we prepare is made with care, bold seasoning, and attention to quality.
        </p>
      </section>

      {/* 5. BEHIND THE SCENES */}
      <section className="p-10 rounded-[24px] bg-white shadow-sm border border-slate-100">
        <div className="mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4 inline-block bg-brand-red/10 text-brand-red">Behind the Scenes</span>
          <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">In the Kitchen</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[friesImg, chickenImg, kebabImg, sweetChicksImg, friesImg, chickenImg].map((img, i) => (
            <div key={i} className="aspect-video rounded-3xl overflow-hidden shadow-xl">
              <img src={img} alt="Behind the scenes" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* 6. MEET THE TEAM */}
      <section className="p-10 rounded-[24px] bg-white shadow-sm border border-slate-100">
        <div className="mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4 inline-block bg-brand-red/10 text-brand-red">Team</span>
          <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[{name:'Head Chef',u:'chef1'},{name:'Sous Chef',u:'chef2'},{name:'Delivery Lead',u:'rider1'}].map((p,i)=> (
            <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md mx-auto mb-3">
                <img src={`https://i.pravatar.cc/150?u=${p.u}`} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-black uppercase tracking-tight text-brand-dark text-sm">{p.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER LOVE */}
      <section className="space-y-6">
        <div className="px-2">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4 inline-block bg-brand-red/10 text-brand-red">Customer Love</span>
          <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">What People Say</h2>
        </div>
        <Testimonials />
      </section>

      {/* 8. VISIT / CONTACT */}
      <Contact compact />

      {/* 9. CTA */}
      <section className="p-10 rounded-[24px] bg-brand-red text-white text-center shadow-sm border border-brand-red/30">
        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3">Ready to taste the difference?</h3>
        <Button className="bg-white text-brand-red hover:bg-white/90 font-black rounded-full px-8 uppercase" render={<a href="/menu#promotions">Order Now</a>} />
      </section>
    </div>
  );
}
