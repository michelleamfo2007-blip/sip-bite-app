import { useState, useMemo, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { menuData } from "@/data/menu";

export default function MenuDetail({ id, onClose }: { id: string; onClose?: () => void }) {
  const { addToCart } = useCart();
  const imgRef = useRef<HTMLImageElement | null>(null);

  const item = useMemo(() => {
    const all = [...menuData.drinks, ...menuData.regular, ...menuData.snacks, ...menuData.packages];
    return all.find((i) => i.id === id);
  }, [id]);

  const [qty, setQty] = useState(1);
  const [selectedOption, setSelectedOption] = useState(
    item?.options ? item.options[0] : ""
  );

  if (!item) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg font-bold">Item not found.</p>
      </div>
    );
  }

  const flyToCart = () => {
    const img = imgRef.current;
    const cartBtn = document.getElementById('cart-button');
    if (!img || !cartBtn) return;
    const imgRect = img.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();
    const clone = img.cloneNode(true) as HTMLImageElement;
    clone.style.position = 'fixed';
    clone.style.top = `${imgRect.top}px`;
    clone.style.left = `${imgRect.left}px`;
    clone.style.width = `${imgRect.width}px`;
    clone.style.height = `${imgRect.height}px`;
    clone.style.objectFit = 'cover';
    clone.style.borderRadius = '16px';
    clone.style.zIndex = '9999';
    clone.style.pointerEvents = 'none';
    document.body.appendChild(clone);
    const dx = cartRect.left + cartRect.width / 2 - (imgRect.left + imgRect.width / 2);
    const dy = cartRect.top + cartRect.height / 2 - (imgRect.top + imgRect.height / 2);
    const anim = clone.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1, borderRadius: '16px' },
      { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0.3, borderRadius: '999px' }
    ], { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
    anim.onfinish = () => clone.remove();
  };

  const handleAdd = () => {
    flyToCart();
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: qty,
      image: item.image,
      customization: selectedOption,
    });
    if (onClose) setTimeout(onClose, 300);
  };

  return (
    <div className="bg-white rounded-[24px] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
        <div className="bg-white overflow-hidden relative">
          <img ref={imgRef} src={item.image} alt={item.name} className="w-full h-full object-cover min-h-[300px]" />
        </div>

        <div className="p-8 flex flex-col justify-center space-y-6 bg-white">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-brand-dark mb-2">
              {item.name}
            </h1>
            {item.description && (
              <p className="text-slate-500 font-medium text-sm">{item.description}</p>
            )}
          </div>
          <div className="h-px bg-slate-200" />
          <div className="text-2xl font-black text-brand-dark">GH₵{item.price.toFixed(2)}</div>

          {item.options && (
            <div className="space-y-3">
              <Label className="text-sm font-black uppercase tracking-widest text-slate-400">Choose an option</Label>
              <RadioGroup
                defaultValue={selectedOption}
                onValueChange={setSelectedOption}
                className="grid grid-cols-2 gap-3"
              >
                {item.options.map((opt: string) => (
                  <div
                    key={opt}
                    className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border-2 border-transparent has-[:checked]:border-brand-red transition-all"
                  >
                    <RadioGroupItem value={opt} id={opt} className="text-brand-red" />
                    <Label htmlFor={opt} className="font-bold cursor-pointer flex-grow text-sm">
                      {opt}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Quantity</span>
            <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-base font-black w-8 text-center">{qty}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQty(qty + 1)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-black py-6 rounded-full uppercase mt-4"
            onClick={handleAdd}
          >
            Customise and order
          </Button>
        </div>
      </div>
    </div>
  );
}
