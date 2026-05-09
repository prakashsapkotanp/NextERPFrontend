import React, { useState } from 'react';
import { ShoppingCart, ArrowRight, Trash2, CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/ui-base';
import { motion, AnimatePresence } from 'motion/react';

const initialCart = [
  { id: '1', name: 'Wireless Headphones', price: 129.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
  { id: '2', name: 'Mechanical Keyboard', price: 159.00, quantity: 1, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop' },
];

export default function Cart() {
  const [step, setStep] = useState(1); // 1: Cart, 2: Shipping, 3: Payment, 4: Success
  const [cartItems, setCartItems] = useState(initialCart);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Checkout Steps */}
      {step < 4 && (
        <div className="flex items-center justify-between mb-12 px-8">
          {[
            { n: 1, label: 'Cart' },
            { n: 2, label: 'Shipping' },
            { n: 3, label: 'Payment' }
          ].map((s) => (
            <React.Fragment key={s.n}>
              <div className="flex flex-col items-center gap-2 relative">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors",
                  step >= s.n ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-400 border-gray-200"
                )}>
                  {step > s.n ? <CheckCircle size={20} /> : s.n}
                </div>
                <span className={cn("text-xs font-bold", step >= s.n ? "text-blue-600" : "text-gray-400")}>{s.label}</span>
              </div>
              {s.n < 3 && (
                <div className={cn("h-0.5 flex-1 mx-4 transition-colors", step > s.n ? "bg-blue-600" : "bg-gray-200")} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="cart"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <Card className="lg:col-span-2">
              <div className="p-6 border-b">
                <h3 className="font-bold text-lg">Shopping Cart ({cartItems.length})</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <select className="border rounded px-2 py-1 text-sm bg-gray-50">
                        {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
                      </select>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 h-fit sticky top-6">
              <h3 className="font-bold text-lg mb-4">Summary</h3>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full gap-2 h-11" onClick={nextStep}>
                Shipping Details
                <ArrowRight size={18} />
              </Button>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="shipping"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="text-blue-600" />
                Shipping Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-semibold">Street Address</label>
                  <Input placeholder="123 Ocean Drive" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">City</label>
                  <Input placeholder="Miami" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Postal Code</label>
                  <Input placeholder="33101" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-semibold">Shipping Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="border-2 border-blue-600 p-4 rounded-lg bg-blue-50 cursor-pointer">
                      <p className="font-bold text-blue-900 text-sm">Standard</p>
                      <p className="text-xs text-blue-700">3-5 Business Days</p>
                    </label>
                    <label className="border border-gray-200 p-4 rounded-lg hover:border-blue-300 cursor-pointer">
                      <p className="font-bold text-gray-900 text-sm">Express</p>
                      <p className="text-xs text-gray-500">$15.00 • 1-2 Days</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-8 pt-6 border-t font-sans">
                <Button variant="outline" className="flex-1" onClick={prevStep}>Back to Cart</Button>
                <Button className="flex-1" onClick={nextStep}>Continue to Payment</Button>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="text-blue-600" />
                Payment Method
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-900 rounded" />
                    <div>
                      <p className="text-sm font-bold">Credit Card</p>
                      <p className="text-xs text-gray-500">Secure Stripe Payment</p>
                    </div>
                  </div>
                  <Badge variant="info">Selected</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Cardholder Name</label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Card Number</label>
                    <div className="relative">
                      <Input placeholder="0000 0000 0000 0000" className="pl-12" />
                      <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Expiry Date</label>
                      <Input placeholder="MM / YY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">CVV</label>
                      <Input placeholder="123" maxLength={3} />
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 text-lg gap-2" onClick={nextStep}>
                  Complete Payment • ${total.toFixed(2)}
                </Button>
                <p className="text-xs text-gray-400 text-center">Your payment info is encrypted and never stored on our servers.</p>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-12"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Order Confirmed!</h2>
            <p className="text-gray-500 max-w-sm mx-auto">
              Thank you for your purchase. We've sent a detailed receipt to your email address.
            </p>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm max-w-xs mx-auto text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Order Number</span>
                <span className="font-bold text-gray-900">#ORD-7726</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-bold text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-6">
              <Button variant="outline" className="px-8" onClick={() => setStep(1)}>
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
