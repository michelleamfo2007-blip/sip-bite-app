import { useCart } from "@/context/CartContext";
import { motion } from "motion/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <Sheet>
      <SheetTrigger render={<Button id="cart-button" variant="outline" className="relative h-10 rounded-full border-black/10 bg-white px-4 font-medium text-brand-dark hover:bg-brand-dark hover:text-white" /> }>
        <ShoppingCart className="w-4 h-4 mr-2" />
        Cart
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-cream bg-brand-red text-[10px] font-semibold text-white">
            {totalItems}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-black uppercase tracking-tighter">Your Order</SheetTitle>
        </SheetHeader>
        
        <div className="flex-grow overflow-y-auto py-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <ShoppingCart className="w-12 h-12 text-slate-200" />
              </div>
              <h3 className="font-black text-xl text-slate-400 uppercase">Cart is Empty</h3>
              <p className="text-slate-400 text-sm font-medium">Add some delicious treats to get started!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.customization}`} className="flex gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-black text-brand-dark uppercase text-sm">{item.name}</h4>
                    <span className="font-black text-brand-red text-sm">GH₵ {item.price * item.quantity}</span>
                  </div>
                  {item.customization && (
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">{item.customization}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <motion.span 
                        key={item.quantity}
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="text-xs font-black w-4 text-center"
                      >
                        {item.quantity}
                      </motion.span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-300 hover:text-brand-red"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="flex-col sm:flex-col gap-4 pt-6 border-t">
            <div className="space-y-2 w-full">
              <div className="flex justify-between text-sm font-bold text-slate-400 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>GH₵ {totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-400 uppercase tracking-widest">
                <span>Event Pickup</span>
                <span>FREE</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-xl font-black text-brand-dark uppercase tracking-tighter">
                <span>Total</span>
                <span className="text-brand-red">GH₵ {totalPrice}</span>
              </div>
            </div>
            <Button className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-black py-7 rounded-2xl text-lg uppercase shadow-xl shadow-brand-red/20" render={<Link to="/checkout" /> }>
              <CreditCard className="w-5 h-5 mr-2" />
              Proceed to Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
