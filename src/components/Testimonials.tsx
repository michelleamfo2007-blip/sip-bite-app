import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Kwame Mensah",
    role: "Food Blogger",
    content: "The best goat kebab I've had in Accra! The spice level is perfect and the meat is always tender.",
    image: "https://i.pravatar.cc/150?u=kwame",
    rating: 5
  },
  {
    name: "Ama Serwaa",
    role: "Regular Customer",
    content: "Their 'Sweet Chicks' package is my go-to lunch. Picked it up at the Detty Slam event and the fries were perfectly crispy.",
    image: "https://i.pravatar.cc/150?u=ama",
    rating: 5
  },
  {
    name: "Kofi Boateng",
    role: "Tech Professional",
    content: "Ordering via WhatsApp is so convenient. The Mega Crunch Duo is enough to feed two people!",
    image: "https://i.pravatar.cc/150?u=kofi",
    rating: 4
  },
  {
    name: "Esi Appiah",
    role: "Student",
    content: "Affordable and delicious. The samosas are a must-try. Best student-friendly spot in Osu.",
    image: "https://i.pravatar.cc/150?u=esi",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="p-10 rounded-[24px] bg-white shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4 inline-block bg-brand-red/10 text-brand-red">
              Testimonials
            </span>
            <h2 className="text-3xl font-black text-brand-dark uppercase leading-none">
              WHAT OUR <span className="text-brand-red">FANS</span> SAY
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            {/* Carousel controls will be handled by the component */}
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/2">
                <Card className="border-none shadow-none bg-slate-50 rounded-3xl h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < t.rating ? 'text-brand-yellow fill-brand-yellow' : 'text-slate-200'}`} 
                        />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-brand-red/20 mb-4" />
                    <p className="text-slate-600 font-medium italic mb-8 flex-grow">
                      "{t.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-black text-brand-dark text-sm uppercase">{t.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-6">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 border-2 border-slate-100 hover:bg-brand-red hover:text-white transition-all" />
            <CarouselNext className="static translate-y-0 h-10 w-10 border-2 border-slate-100 hover:bg-brand-red hover:text-white transition-all" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
