import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { FormEvent, ReactNode } from "react";
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

  if (compact) {
    return (
      <section id="contact" className="border-t border-black/5 bg-brand-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Find us</p>
            <h2 className="mt-3 font-display text-4xl font-medium">Osu, Accra. Open until 11.</h2>
            <p className="mt-3 max-w-md text-brand-dark/70">Call, or send the order on WhatsApp — that’s the fastest way to the grill.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
            <Info icon={<MapPin className="h-4 w-4" />} label="Location" value="Osu, Accra, Ghana" />
            <Info icon={<Phone className="h-4 w-4" />} label="Phone" value="053 785 8896" href="tel:0537858896" />
            <Info icon={<Clock className="h-4 w-4" />} label="Hours" value="10am – 11pm" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="grid bg-brand-dark text-white md:grid-cols-2">
        <div className="flex flex-col justify-end px-6 py-16 sm:px-10 lg:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-yellow">Contact</p>
          <h1 className="mt-3 font-display text-5xl font-medium md:text-6xl">We’re at the grill.</h1>
          <p className="mt-4 max-w-md text-white/75">Orders, questions, and advance bookings — WhatsApp is the quickest reply.</p>
        </div>
        <div className="relative min-h-[280px]">
          <img src={friesImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <Info icon={<MapPin className="h-4 w-4" />} label="Location" value="Osu, Accra, Ghana" />
        <Info icon={<Phone className="h-4 w-4" />} label="Phone" value="053 785 8896" href="tel:0537858896" />
        <Info icon={<Clock className="h-4 w-4" />} label="Hours" value="Daily, 10am – 11pm" />
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-[28px] bg-brand-white p-8">
          <h2 className="font-display text-3xl font-medium">Send a message</h2>
          <p className="mt-2 text-sm text-brand-dark/60">It opens WhatsApp with your note already written.</p>
          <div className="mt-6 grid gap-4">
            <Field label="Name">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required className="h-12 rounded-xl bg-white" />
            </Field>
            <Field label="Phone">
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone" required className="h-12 rounded-xl bg-white" />
            </Field>
            <Field label="Message">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to order or ask?"
                required
                className="h-32 w-full rounded-xl border border-input bg-white px-3 py-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </Field>
            <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red text-sm font-semibold text-white">
              <MessageCircle className="h-4 w-4" /> Send on WhatsApp
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-4">
          <a href="https://wa.me/233537858896" target="_blank" rel="noreferrer" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white">
            <MessageCircle className="h-5 w-5" /> Order on WhatsApp
          </a>
          <a href="tel:0537858896" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-black/10 bg-white text-sm font-semibold">
            <Phone className="h-5 w-5" /> Call now
          </a>
          <iframe
            title="Osu, Accra Map"
            src="https://www.google.com/maps?q=Osu,Accra,Ghana&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-[280px] flex-1 w-full rounded-[28px] border-0"
          />
        </div>
      </section>

      <section className="border-t border-black/5 bg-brand-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl font-medium">Quick answers</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Faq q="Do you deliver?" a="Yes, across central Accra. WhatsApp is the fastest way to place it." />
            <Faq q="How long does it take?" a="Usually 20–45 minutes, depending on where you are and how busy the grill is." />
            <Faq q="Which areas?" a="Osu first, then the neighborhoods around it. Message us if you’re unsure." />
            <Faq q="Can I order ahead?" a="Yes. Send the time you want it and we’ll hold the plate." />
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark/45">{label}</span>
      {children}
    </label>
  );
}

function Info({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">{icon}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark/45">{label}</p>
        {href ? (
          <a href={href} className="mt-1 block text-base font-medium hover:text-brand-red">{value}</a>
        ) : (
          <p className="mt-1 text-base font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="font-display text-2xl font-medium">{q}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-dark/65">{a}</p>
    </div>
  );
}
