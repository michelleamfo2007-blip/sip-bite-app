import logo from "../../images/logo.jpg";
import sausageImg from "../../images/menu/sausage-kebab.jpg";
import chicken3Img from "../../images/menu/chicken-3.jpg";
import friesImg from "../../images/menu/fries.jpg";
import samosaImg from "../../images/menu/samosa-3.jpg";
import springRollImg from "../../images/menu/springroll-3.jpg";
import fries3ChickenDrinkImg from "../../images/menu/fries-3-chicken-drink.jpg";
import { FoldLabel } from "./FoldLabel";

const paper = "#F3EDE4";
const ink = "#1C140F";

const plates = [
  { name: "Sausage kebab", src: sausageImg, back: "#E08A12", photo: "58% 42% 48% 52% / 46% 58% 42% 54%" },
  { name: "Chicken", src: chicken3Img, back: "#F6A31A", photo: "46% 54% 62% 38% / 58% 40% 52% 48%" },
  { name: "Fries", src: friesImg, back: "#C45A4A", photo: "62% 38% 44% 56% / 40% 60% 48% 52%" },
  { name: "Samosas", src: samosaImg, back: "#9E1B14", photo: "40% 60% 52% 48% / 62% 38% 56% 44%" },
  { name: "Spring rolls", src: springRollImg, back: "#F4D36A", photo: "54% 46% 38% 62% / 44% 56% 60% 40%" },
  { name: "Fries, chicken & drink", src: fries3ChickenDrinkImg, back: "#9E1B14", photo: "48% 52% 60% 40% / 56% 44% 38% 62%" },
];

export default function Banner() {
  const clean = new URLSearchParams(window.location.search).has("image");
  return (
    <div className={clean ? "" : "bg-neutral-200 px-4 py-8"} style={clean ? { background: paper } : undefined}>
      {!clean && (
        <p className="mx-auto mb-4 w-[800px] max-w-full text-center text-xs text-neutral-500">
          A standing roll-up. Tall, read from a few steps away.
        </p>
      )}
      <article className="mx-auto flex h-[2000px] w-[800px] max-w-full flex-col overflow-hidden" style={{ background: paper, color: ink }}>
        <header className="flex flex-col items-center px-16 pb-4 pt-16">
          <img src={logo} alt="Sip & Bite" className="h-96 w-96 rounded-full object-cover" />
          <p className="mt-8 text-center font-display text-6xl italic leading-none">Hot off the grill</p>
          <p className="mt-5 text-xs uppercase tracking-[0.32em]">Ghud Park · Accra Mall</p>
        </header>

        <div className="mt-36 grid grid-cols-3 gap-x-2 gap-y-6 px-3">
          {plates.map((plate) => (
            <figure key={plate.name} className="relative">
              <div className="relative mx-auto h-56 w-full">
                <span
                  className="absolute inset-x-1 bottom-0 top-3"
                  style={{ background: plate.back, borderRadius: plate.photo, transform: "rotate(8deg)" }}
                />
                <img
                  src={plate.src}
                  alt=""
                  className="absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)] object-cover object-center"
                  style={{ borderRadius: plate.photo }}
                />
              </div>
              <FoldLabel name={plate.name} />
            </figure>
          ))}
        </div>

        <section className="flex flex-1 flex-col items-center justify-center px-16 text-center">
          <p className="font-display text-6xl leading-none">053 785 8896</p>
          <p className="mt-4 font-display text-6xl leading-none">025 633 1397</p>
          <p className="mt-6 text-xs uppercase tracking-[0.36em]">Send a rider, or pick it up</p>
        </section>
      </article>
    </div>
  );
}
