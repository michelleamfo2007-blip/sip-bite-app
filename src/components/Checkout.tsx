import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, CreditCard, MapPin, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep(3);
    clearCart();
  };

  if (step === 3) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[32px] shadow-xl border border-slate-100 text-center max-w-md w-full"
        >
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-500 w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tighter mb-4">Order Confirmed!</h2>
          <p className="text-slate-500 font-medium mb-8">
            Thank you for your order. We've received it and our chefs are already firing up the grill!
          </p>
          <Button className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-black py-6 rounded-xl uppercase" render={<Link to="/">Back to Home</Link>} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" className="rounded-full h-12 w-12 p-0" render={<Link to="/"><ArrowLeft className="w-6 h-6" /></Link>} />
        <h1 className="text-4xl font-black text-brand-dark uppercase tracking-tighter">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        {/* Form */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-brand-dark uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Event Details
            </h2>
            <div className="flex items-start space-x-3 bg-brand-red/5 p-6 rounded-2xl border-2 border-brand-red/20">
              <MapPin className="text-brand-red w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-black text-brand-dark uppercase text-lg">DETTY SLAM</h3>
                <p className="text-sm font-medium text-slate-600 mt-1">Ghud Park, around Accra Mall</p>
                <p className="text-xs font-bold text-brand-red mt-2 uppercase tracking-widest">Pre-order for pickup at event</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-brand-dark uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Details
            </h2>
            <form onSubmit={handleOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</Label>
                  <Input id="name" required className="rounded-xl border-slate-200 h-12" placeholder="John Doe" defaultValue={user?.name || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</Label>
                  <Input id="phone" required className="rounded-xl border-slate-200 h-12" placeholder="+233..." />
                </div>
              </div>
              <div className="pt-6">
                <h2 className="text-xl font-black text-brand-dark uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                  Payment
                </h2>
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-brand-red flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-brand-red w-6 h-6" />
                    <span className="font-bold">Pay with Card / Mobile Money</span>
                  </div>
                  <span className="text-[10px] font-black bg-brand-red text-white px-2 py-1 rounded">SECURE</span>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isProcessing || cart.length === 0}
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-black py-8 rounded-2xl text-xl uppercase shadow-xl shadow-brand-red/20"
                >
                  {isProcessing ? "Processing..." : `Pay GH₵ ${totalPrice}`}
                </Button>
              </div>
            </form>
          </section>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100 sticky top-24">
            <h2 className="text-xl font-black text-brand-dark uppercase tracking-widest mb-6">Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.customization}`} className="flex justify-between text-sm">
                  <div className="flex-grow">
                    <span className="font-bold text-brand-dark">{item.quantity}x {item.name}</span>
                    {item.customization && <p className="text-[10px] text-slate-400 uppercase">{item.customization}</p>}
                  </div>
                  <span className="font-black text-brand-red">GH₵ {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>GH₵ {totalPrice}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Event Pickup</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-xl font-black text-brand-dark uppercase tracking-tighter pt-2">
                <span>Total</span>
                <span className="text-brand-red">GH₵ {totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
