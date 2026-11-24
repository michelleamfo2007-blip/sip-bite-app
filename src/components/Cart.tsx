import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button id="cart-button" variant="outline" className="relative h-10 rounded-full border-black/10 bg-white px-4 font-medium text-brand-dark hover:bg-brand-dark hover:text-white" /> }>
        <ShoppingCart className="mr-2 h-4 w-4" />
        Cart
        {totalItems > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-cream bg-brand-red text-[10px] font-semibold text-white">
            {totalItems}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col bg-brand-cream text-brand-dark sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-4xl font-medium">Your order</SheetTitle>
        </SheetHeader>

        <div className="flex-grow space-y-4 overflow-y-auto py-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <p className="font-display text-3xl">Nothing here yet.</p>
              <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-brand-dark/60">
                Choose a plate from the menu, and it will be kept here until you are ready.
              </p>
              <Button className="mt-8 bg-brand-dark text-brand-cream" render={<Link to="/menu" />} onClick={() => setOpen(false)}>
                View the menu
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.customization}`} className="flex gap-4 border border-brand-dark/10 bg-brand-white p-3">
                <img src={item.image} alt="" className="h-20 w-20 flex-shrink-0 object-cover" />
                <div className="min-w-0 flex-grow">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-display text-xl leading-tight">{item.name}</h4>
                    <span className="text-sm font-semibold text-brand-red">GH₵ {item.price * item.quantity}</span>
                  </div>
                  {item.customization && (
                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-brand-dark/45">{item.customization}</p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border border-brand-dark/15">
                      <button type="button" className="px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button type="button" className="px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button type="button" className="text-brand-dark/40 hover:text-brand-red" onClick={() => removeFromCart(item.id)} aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="flex-col gap-4 border-t border-brand-dark/10 pt-6 sm:flex-col">
            <div className="w-full space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-dark/55">Plates</span>
                <span>GH₵ {totalPrice}</span>
              </div>
              <p className="text-xs leading-relaxed text-brand-dark/50">Delivery is GH₵10, added at checkout. Pickup has no charge.</p>
              <div className="flex justify-between border-t border-brand-dark/10 pt-3 font-display text-3xl">
                <span>Total</span>
                <span className="text-brand-red">GH₵ {totalPrice}</span>
              </div>
            </div>
            <Button className="w-full bg-brand-dark py-6 text-[11px] uppercase tracking-[0.22em] text-brand-cream" render={<Link to="/checkout" />} onClick={() => setOpen(false)}>
              Continue to checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
