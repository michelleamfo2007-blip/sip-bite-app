import type { ReactNode } from "react";
import { menuData } from "@/data/menu";
import rolandQr from "../../images/momo-roland-qr.png";
import michelleQr from "../../images/momo-michelle-qr.png";
import { FoldLabel } from "./FoldLabel";

const paper = "#F3EDE4";
const ink = "#1C140F";
const orange = "#F6A31A";
const red = "#9E1B14";

function printPrice(item: { id: string; price: number }) {
  return item.id === "r3" ? 20 : item.price;
}

const combos = menuData.packages;
const plates = [...menuData.kebab, ...menuData.fries, ...menuData.chicken, ...menuData.snacks];
const drinks = menuData.drinks;

function Sheet({
  kicker,
  children,
}: {
  kicker: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto flex h-[420mm] w-[297mm] max-w-full flex-col overflow-hidden break-after-page print:max-w-none" style={{ background: paper, color: ink }}>
      <header className="px-8 py-5" style={{ background: orange, color: red }}>
        <p className="text-xs uppercase tracking-[0.32em]">Ghud Park · Accra Mall</p>
        <h1 className="mt-1 font-display text-6xl font-medium leading-none">Sip &amp; Bite</h1>
        <p className="mt-2 text-base" style={{ color: ink }}>{kicker}</p>
      </header>
      <div className="min-h-0 flex-1 px-6 py-4">{children}</div>
      <footer className="px-8 py-5" style={{ background: ink, color: paper }}>
        <p className="font-display text-4xl leading-tight">053 785 8896</p>
        <p className="font-display text-4xl leading-tight">025 633 1397</p>
        <p className="mt-2 text-sm" style={{ color: orange }}>Daily, 10am – 11pm · sipandbite.site</p>
      </footer>
    </article>
  );
}

function MomoPerson({
  name,
  number,
  qr,
}: {
  name: string;
  number: string;
  qr: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <h2 className="font-display text-5xl font-medium leading-none">{name}</h2>
      <p className="mt-3 font-display text-7xl font-medium leading-none">{number}</p>
      <img src={qr} alt={`Scan to open ${name}, ${number}`} className="mt-4 h-[62mm] w-[62mm]" />
    </div>
  );
}

function MomoSheet() {
  return (
    <article className="mx-auto flex h-[420mm] w-[297mm] max-w-full flex-col overflow-hidden print:max-w-none" style={{ background: paper, color: ink }}>
      <header className="px-8 py-6 text-center" style={{ background: orange, color: red }}>
        <p className="text-xs uppercase tracking-[0.32em]">Ghud Park · Accra Mall</p>
        <h1 className="mt-2 font-display text-7xl font-medium leading-none">Sip &amp; Bite</h1>
        <p className="mt-3 font-display text-4xl font-medium uppercase tracking-[0.08em]" style={{ color: ink }}>Mobile money numbers</p>
      </header>
      <section className="flex min-h-0 flex-1 flex-col">
        <MomoPerson name="Roland Agyemang Appiah" number="055 764 7110" qr={rolandQr} />
        <div className="mx-16 h-px" style={{ background: orange }} />
        <MomoPerson name="Michelle Amfo" number="054 978 9315" qr={michelleQr} />
      </section>
      <footer className="px-8 py-4 text-center" style={{ background: ink, color: paper }}>
        <p className="text-lg">Point your camera at either code. It opens that number. Then send the total in MoMo.</p>
        <p className="mt-1 font-display text-3xl" style={{ color: orange }}>Sip &amp; Bite</p>
      </footer>
    </article>
  );
}

function Price({ item }: { item: { id: string; price: number } }) {
  return <p className="text-lg font-bold" style={{ color: red }}>GH₵{printPrice(item)}</p>;
}

export default function Flyer() {
  const params = new URLSearchParams(window.location.search);
  const clean = params.has("image");
  const only = params.get("sheet");
  const showCombos = !only || only === "combos";
  const showSingles = !only || only === "singles";
  const showMomo = only === "momo";
  return (
    <div className={clean ? "" : "space-y-8 px-4 py-8 print:space-y-0 print:p-0"} style={{ background: clean ? paper : "#E7E1D6" }}>
      <style>{`@page { size: A3 portrait; margin: 0; }`}</style>
      {!clean && (
        <p className="mx-auto w-[297mm] max-w-full text-center text-xs print:hidden" style={{ color: ink }}>
          {showMomo ? "One A3 sheet for mobile money. Print at 100%, with no margins." : "Two A3 sheets. Combos, then the plates on their own. Print at 100%, with no margins."}
        </p>
      )}
      {showCombos && (
        <Sheet kicker="The combos. Collected at Ghud Park.">
          <p className="text-xs uppercase tracking-[0.28em]" style={{ color: red }}>Combos</p>
          <div className="mt-3 grid grid-cols-2 gap-4">
            {combos.map((item) => (
              <figure key={item.id}>
                <img src={item.image} alt={item.name} className="h-[78mm] w-full object-cover" />
                <figcaption className="px-1 pt-2">
                  <FoldLabel name={item.name} compact className="text-sm font-medium uppercase leading-tight tracking-[0.03em]" />
                  <Price item={item} />
                </figcaption>
              </figure>
            ))}
          </div>
        </Sheet>
      )}
      {showMomo && <MomoSheet />}
      {showSingles && (
        <Sheet kicker="Plates and drinks on their own. Collected at Ghud Park.">
          <p className="text-xs uppercase tracking-[0.28em]" style={{ color: red }}>On their own</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {plates.map((item) => (
              <figure key={item.id}>
                <img src={item.image} alt={item.name} className="h-[52mm] w-full object-cover" />
                <figcaption className="px-0.5 pt-2">
                  <FoldLabel name={item.name} compact className="text-xs font-medium uppercase leading-tight" />
                  <Price item={item} />
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.28em]" style={{ color: red }}>Drinks</p>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {drinks.map((item) => (
              <figure key={item.id} className="text-center">
                <img src={item.image} alt={item.name} className="mx-auto h-[42mm] w-full object-contain" />
                <FoldLabel name={item.name} compact className="text-xs font-medium uppercase leading-tight" />
                <Price item={item} />
              </figure>
            ))}
          </div>
        </Sheet>
      )}
    </div>
  );
}
