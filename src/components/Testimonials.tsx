import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Kwame Mensah",
    role: "Food blogger",
    content: "The best goat kebab I've had in Accra. The spice is right and the meat stays tender.",
    rating: 5,
  },
  {
    name: "Ama Serwaa",
    role: "Regular",
    content: "Sweet Chicks is my weekday lunch. It shows up fast, and the fries are still crisp.",
    rating: 5,
  },
  {
    name: "Kofi Boateng",
    role: "Osu",
    content: "WhatsApp ordering is the easy part. The Mega Crunch Duo actually feeds two.",
    rating: 4,
  },
  {
    name: "Esi Appiah",
    role: "Student",
    content: "Honest portions, fair prices. The samosas are the one I tell people about.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-brand-dark py-20 text-brand-cream">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-yellow">From the table</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-white md:text-5xl">What people order again.</h2>
          </div>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {testimonials.map((t) => (
              <CarouselItem key={t.name} className="pl-4 md:basis-1/2">
                <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-8">
                  <div className="mb-5 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < t.rating ? "fill-brand-yellow text-brand-yellow" : "text-white/20"}`}
                      />
                    ))}
                  </div>
                  <blockquote className="flex-grow font-display text-2xl font-medium leading-snug text-white">
                    “{t.content}”
                  </blockquote>
                  <figcaption className="mt-8">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/45">{t.role}</p>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-end gap-2">
            <CarouselPrevious className="static h-10 w-10 translate-y-0 border-white/15 bg-transparent text-white hover:bg-white hover:text-brand-dark" />
            <CarouselNext className="static h-10 w-10 translate-y-0 border-white/15 bg-transparent text-white hover:bg-white hover:text-brand-dark" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
