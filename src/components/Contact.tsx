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
            <p className="text-[11px] uppercase tracking-[0.32em] text-brand-yellow">Find us</p>
            <h2 className="mt-3 font-display text-5xl font-medium">Achimota, until eleven.</h2>
            <p className="mt-3 max-w-md font-light text-brand-dark/70">A note on WhatsApp is the fastest way to the grill.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
            <Info label="Location" value="Achimota, Accra, Ghana" />
            <Info label="Phone" value="053 785 8896" href="tel:0537858896" />
            <Info label="Hours" value="10am – 11pm" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="grid bg-brand-dark text-white md:grid-cols-2">
        <div className="flex flex-col justify-end px-6 py-16 sm:px-10 lg:px-16">
          <p className="text-[11px] uppercase tracking-[0.32em] text-brand-yellow">Contact</p>
          <h1 className="mt-4 font-display text-6xl font-medium md:text-7xl">Write to the grill.</h1>
          <p className="mt-4 max-w-md font-light text-white/70">Orders, questions, and a plate held for later. WhatsApp answers first.</p>
        </div>
        <div className="relative min-h-[280px]">
          <img src={friesImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <Info label="Location" value="Achimota, Accra, Ghana" />
        <Info label="Phone" value="053 785 8896" href="tel:0537858896" />
        <Info label="Hours" value="Daily, 10am – 11pm" />
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="border border-brand-dark/10 bg-brand-white p-8">
          <h2 className="font-display text-4xl font-medium">A short note</h2>
          <p className="mt-2 text-sm font-light text-brand-dark/60">It opens WhatsApp with your message already written.</p>
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
            <button type="submit" className="inline-flex h-12 items-center justify-center border border-brand-dark bg-brand-dark px-6 text-[11px] uppercase tracking-[0.28em] text-brand-cream">
              Send on WhatsApp
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-4">
          <a href="https://wa.me/233537858896" target="_blank" rel="noreferrer" className="inline-flex h-14 items-center justify-center border border-brand-dark bg-brand-dark text-[11px] uppercase tracking-[0.28em] text-brand-cream">
            Order on WhatsApp
          </a>
          <a href="tel:0537858896" className="inline-flex h-14 items-center justify-center border border-brand-dark/20 text-[11px] uppercase tracking-[0.28em]">
            Call the house
          </a>
          <iframe
            title="Achimota, Accra Map"
            src="https://www.google.com/maps?q=Achimota,Accra,Ghana&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-[280px] flex-1 w-full border border-brand-dark/10"
          />
        </div>
      </section>

      <section className="border-t border-black/5 bg-brand-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl font-medium">Quick answers</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Faq q="Do you deliver?" a="Yes, across central Accra. WhatsApp is the fastest way to place it." />
            <Faq q="How long does it take?" a="Usually 5–10 minutes." />
            <Faq q="Which areas?" a="Achimota first, then the neighborhoods around it. Message us if you’re unsure." />
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

function Info({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 block h-px w-8 bg-brand-yellow" />
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
