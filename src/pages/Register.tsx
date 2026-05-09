import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Button, Input } from '../components/ui-base';
import { motion } from 'motion/react';
import { Building2, User, Mail, Lock, Phone, MapPin } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
    else navigate('/login');
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-text-base tracking-tighter">Scale your business</h2>
          <p className="text-text-muted mt-2 text-sm font-medium uppercase tracking-widest">Company Registration</p>
        </div>

        <Card className="overflow-hidden border border-border-base bg-white shadow-xl">
          <div className="flex bg-gray-100 h-1.5">
            <div className={cn("bg-primary transition-all duration-700 ease-out", step === 1 ? "w-1/2" : "w-full")}></div>
          </div>
          
          <div className="p-10">
            <form onSubmit={handleNext} className="space-y-8">
              {step === 1 ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest border-b border-border-base pb-4 mb-8">
                    <Building2 size={16} />
                    <span>Step 1: Company Profile</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Company Name</label>
                      <Input placeholder="Acme Inc." required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Subdomain</label>
                      <div className="relative">
                        <Input placeholder="acme" className="pr-20" required />
                        <span className="absolute right-3 top-2.5 text-text-muted text-[10px] font-bold uppercase tracking-wider">.erp.com</span>
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Tax ID / Business Number</label>
                      <Input placeholder="Optional" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest border-b border-border-base pb-4 mb-8">
                    <User size={16} />
                    <span>Step 2: Admin Access</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Full Name</label>
                      <Input placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Email Address</label>
                      <Input type="email" placeholder="john@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Password</label>
                      <Input type="password" placeholder="••••••••" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Phone Number</label>
                      <Input type="tel" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Office Address</label>
                      <Input placeholder="123 Business Way, Suite 100" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                {step === 2 && (
                  <Button variant="outline" className="flex-1 h-12 uppercase tracking-widest font-black" onClick={() => setStep(1)}>
                    Back
                  </Button>
                )}
                <Button type="submit" className="flex-1 h-12 text-sm uppercase tracking-widest font-black">
                  {step === 1 ? 'Next: Admin Setup' : 'Complete Setup'}
                </Button>
              </div>
            </form>
          </div>
        </Card>

        <p className="text-center mt-10 text-sm font-medium text-text-muted">
          Existing organization?{' '}
          <Link to="/login" className="text-primary font-black hover:underline uppercase tracking-wide">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
