import { Phone, MapPin, Clock, MessageCircle, Truck, Leaf, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ReactNode, FormEvent } from "react";
import { useState } from "react";
import friesImg from "../../images/friesss.jpg";

export default function Contact({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Hello Sip & Bite!\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    const url = `https://wa.me/233537858896?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-6">
      {!compact && (
        <section className="relative overflow-hidden bg-brand-dark text-white p-12 rounded-[24px] min-h-[300px] flex flex-col justify-center">
          <img src={friesImg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative z-20 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">CONTACT <span className="text-brand-yellow">US</span></h2>
            <p className="text-white/90 font-medium">We’re here to take your order and answer your questions.</p>
          </div>
        </section>
      )}

      <section id="contact" className="p-8 bg-white rounded-[24px] shadow-sm border border-slate-100">
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-6 inline-block bg-brand-red/10 text-brand-red">
              Contact Information
            </span>
            <h2 className="text-3xl font-black text-brand-dark mb-4 uppercase leading-none">Reach <span className="text-brand-red">Us</span></h2>
            <p className="text-slate-500 text-sm font-medium mb-8">We’d love to hear from you.</p>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center mb-3 border border-slate-100"><MapPin className="w-5 h-5 text-brand-red" /></div>
              <h4 className="font-black uppercase tracking-tight text-brand-dark mb-1 text-sm">Location</h4>
              <p className="text-slate-600 font-medium">Osu, Accra, Ghana</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center mb-3 border border-slate-100"><Phone className="w-5 h-5 text-brand-red" /></div>
              <h4 className="font-black uppercase tracking-tight text-brand-dark mb-1 text-sm">Phone</h4>
              <a href="tel:0537858896" className="text-brand-red font-bold hover:underline">0537858896</a>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center mb-3 border border-slate-100"><Clock className="w-5 h-5 text-brand-red" /></div>
              <h4 className="font-black uppercase tracking-tight text-brand-dark mb-1 text-sm">Hours</h4>
              <p className="text-slate-600 font-medium">10AM – 11PM</p>
            </div>
          </div>

          {/* Quick contact buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black text-lg py-6 rounded-xl shadow-lg shadow-green-500/20 uppercase" render={<a href="https://wa.me/233537858896" target="_blank" rel="noreferrer" /> }>
              <MessageCircle className="mr-2 w-6 h-6" /> Order on WhatsApp
            </Button>
            <Button variant="outline" className="bg-white text-brand-dark hover:bg-slate-50 border-2 font-black text-lg py-6 rounded-xl uppercase" render={<a href="tel:0537858896" /> }>
              <Phone className="mr-2 w-6 h-6" /> Call Now
            </Button>
          </div>
        </div>
      </section>

      {!compact && (
      <section className="p-8 bg-white rounded-[24px] shadow-sm border border-slate-100">
        <div className="mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4 inline-block bg-brand-red/10 text-brand-red">Contact Form</span>
          <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">Send a Message</h3>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Phone Number</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What would you like to order or ask?" required className="h-28 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white font-black rounded-xl px-8 py-6 uppercase">Send Message</Button>
          </div>
        </form>
      </section>
      )}

      {!compact && (
      <section className="p-8 bg-white rounded-[24px] shadow-sm border border-slate-100">
        <div className="mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4 inline-block bg-brand-red/10 text-brand-red">Find Us</span>
          <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">Osu, Accra</h3>
        </div>
        <iframe
          title="Osu, Accra Map"
          src="https://www.google.com/maps?q=Osu,Accra,Ghana&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[320px] rounded-2xl border border-slate-200"
        />
      </section>
      )}

      {!compact && (
      <section className="p-8 bg-white rounded-[24px] shadow-sm border border-slate-100">
        <div className="mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4 inline-block bg-brand-red/10 text-brand-red">FAQ</span>
          <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">Quick Answers</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-black text-brand-dark mb-2 uppercase text-sm">Do you offer delivery?</h4>
            <p className="text-slate-600 text-sm">Yes, we deliver across central Accra. Order via WhatsApp for the fastest response.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-black text-brand-dark mb-2 uppercase text-sm">How long does delivery take?</h4>
            <p className="text-slate-600 text-sm">Typically 20–45 minutes depending on your location and time of day.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-black text-brand-dark mb-2 uppercase text-sm">What areas do you cover?</h4>
            <p className="text-slate-600 text-sm">We prioritize Osu and nearby neighborhoods. Chat us for specifics.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-black text-brand-dark mb-2 uppercase text-sm">Can I order in advance?</h4>
            <p className="text-slate-600 text-sm">Absolutely. Send us your preferred time via WhatsApp and we’ll schedule it.</p>
          </div>
        </div>
      </section>
      )}

      {!compact && (
      <section className="p-8 bg-white rounded-[24px] shadow-sm border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <Truck className="w-8 h-8 text-brand-red mx-auto mb-2" />
            <h4 className="font-black text-brand-dark">Fast Delivery</h4>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <Leaf className="w-8 h-8 text-brand-red mx-auto mb-2" />
            <h4 className="font-black text-brand-dark">Fresh Meals Daily</h4>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <Star className="w-8 h-8 text-brand-red mx-auto mb-2" />
            <h4 className="font-black text-brand-dark">Customer Satisfaction</h4>
          </div>
        </div>
      </section>
      )}

      {!compact && (
      <section className="p-8 bg-brand-red rounded-[24px] text-white text-center">
        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">Hungry? Let’s fix that.</h3>
        <Button className="bg-white text-brand-red hover:bg-white/90 font-black rounded-full px-8 py-6 uppercase" render={<a href="/menu#promotions" /> }>Order Now</Button>
      </section>
      )}
    </div>
  );
}

function ContactItem({ icon, title, content, isLink = false, href }: { icon: ReactNode, title: string, content: string, isLink?: boolean, href?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</h4>
        {isLink && href ? (
          <a href={href} target="_blank" rel="noreferrer" className="text-brand-red font-bold text-sm hover:underline">{content}</a>
        ) : (
          <p className="text-brand-dark font-bold text-sm">{content}</p>
        )}
      </div>
    </div>
  );
}
