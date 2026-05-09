import React from 'react';
import { Receipt, CreditCard, Clock, CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Card, Button, Badge } from '../components/ui-base';
import { motion } from 'motion/react';

const invoices = [
  { id: 'INV-440', date: 'May 01, 2024', status: 'Paid', amount: '$499.00', plan: 'Enterprise Monthly' },
  { id: 'INV-439', date: 'Apr 01, 2024', status: 'Paid', amount: '$499.00', plan: 'Enterprise Monthly' },
  { id: 'INV-438', date: 'Mar 01, 2024', status: 'Refunded', amount: '$499.00', plan: 'Enterprise Monthly' },
];

export default function Billing() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-text-base tracking-tighter uppercase">Billing</h2>
        <p className="text-text-muted text-sm font-medium">Manage your subscription, invoices, and payment methods.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-10 border-l-4 border-l-primary bg-white shadow-xl">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border-base">
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Current Plan</p>
              <h3 className="text-3xl font-black text-text-base tracking-tighter">Enterprise Suite</h3>
            </div>
            <Badge variant="info" className="px-4 py-2">Active</Badge>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm mb-10">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Next Payout</p>
              <p className="text-xl font-black text-text-base italic">June 01, 2024</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Annual Cost</p>
              <p className="text-xl font-black text-text-base italic">$5,988.00</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1 h-12 uppercase tracking-widest font-black text-xs">Upgrade Plan</Button>
            <Button variant="outline" className="flex-1 h-12 uppercase tracking-widest font-black text-xs">Cancel Subscription</Button>
          </div>
        </Card>

        <Card className="p-8 bg-bg-base border-dashed border-2">
          <h4 className="font-black text-text-base uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
            <CreditCard size={16} className="text-primary" />
            Payment Token
          </h4>
          <div className="bg-white p-6 rounded-xl border border-border-base shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-4">Visa Corporate</p>
            <p className="text-lg font-bold text-text-base tracking-widest mb-6">•••• •••• •••• 4492</p>
            <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-text-muted uppercase">Exp: 09/27</span>
                <Button variant="ghost" size="sm" className="text-primary text-[10px] font-black uppercase p-0">Update</Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden shadow-xl">
        <div className="px-8 py-6 border-b border-border-base bg-white flex justify-between items-center font-sans">
            <div className="flex items-center gap-3">
                <Receipt className="text-primary" size={20} />
                <h3 className="font-black text-text-base uppercase tracking-widest text-xs">Invoice Archives</h3>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-8 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Reference</th>
                <th className="px-8 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Billing Cycle</th>
                <th className="px-8 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Package</th>
                <th className="px-8 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Amount</th>
                <th className="px-8 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Result</th>
                <th className="px-8 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 border-b border-border-base last:border-0 font-sans">
                  <td className="px-8 py-5 font-mono text-xs font-bold text-primary">{inv.id}</td>
                  <td className="px-8 py-5 text-text-base font-bold">{inv.date}</td>
                  <td className="px-8 py-5 text-text-muted font-medium">{inv.plan}</td>
                  <td className="px-8 py-5 font-black text-text-base">{inv.amount}</td>
                  <td className="px-8 py-5">
                    <Badge variant={inv.status === 'Paid' ? 'success' : 'danger'}>
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-primary hover:underline text-xs font-black uppercase tracking-widest">Download PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
