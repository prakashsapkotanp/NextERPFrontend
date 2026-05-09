import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Download, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, Button, Badge } from '../components/ui-base';
import { motion } from 'motion/react';

const ledgerData = [
  { id: 'TX-1001', date: '2024-05-10', desc: 'SaaS Subscription Payout', cat: 'Software', amount: '-$240.00', type: 'expense' },
  { id: 'TX-1002', date: '2024-05-09', desc: 'Customer Payment #ORD-7723', cat: 'Sales', amount: '+$210.30', type: 'income' },
  { id: 'TX-1003', date: '2024-05-09', desc: 'Office Rental - May', cat: 'Rent', amount: '-$1,200.00', type: 'expense' },
  { id: 'TX-1004', date: '2024-05-08', desc: 'Inventory Restock', cat: 'Inventory', amount: '-$550.00', type: 'expense' },
  { id: 'TX-1005', date: '2024-05-08', desc: 'Customer Payment #ORD-7724', cat: 'Sales', amount: '+$45.00', type: 'income' },
];

export default function Accounting() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-text-base tracking-tighter uppercase">Accounting</h2>
          <p className="text-text-muted text-sm font-medium">Financial ledger and cash flow management.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 h-11 px-6 text-[10px] uppercase tracking-widest font-black">
            <Filter size={14} />
            Period
          </Button>
          <Button className="gap-2 h-11 px-6 text-[10px] uppercase tracking-widest font-black">
            <Download size={14} />
            Export Statement
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 border-l-4 border-l-primary">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Total Balance</p>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-light text-text-base">$42,910</span>
            <Badge variant="success">+8.2%</Badge>
          </div>
        </Card>
        <Card className="p-8 border-l-4 border-l-success">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Monthly Income</p>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-light text-text-base">$12,405</span>
            <div className="text-success flex items-center gap-1 font-bold text-xs">
              <TrendingUp size={14} /> 12%
            </div>
          </div>
        </Card>
        <Card className="p-8 border-l-4 border-l-danger">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Monthly Expenses</p>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-light text-text-base">$3,120</span>
            <div className="text-danger flex items-center gap-1 font-bold text-xs">
              <TrendingDown size={14} /> 4%
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-border-base bg-white flex justify-between items-center">
            <h3 className="font-black text-text-base uppercase tracking-widest text-xs">Transaction Ledger</h3>
            <span className="text-xs font-bold text-text-muted">Showing 5 of 124 entries</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Date</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Description</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Category</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {ledgerData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors border-b border-border-base last:border-0">
                  <td className="px-6 py-4 font-mono text-[11px] text-text-muted whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-text-base">{item.desc}</p>
                    <p className="text-[10px] text-text-muted font-mono uppercase tracking-tighter">{item.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-[4px] bg-gray-100 text-[10px] font-black text-text-muted uppercase tracking-widest border border-border-base">
                      {item.cat}
                    </span>
                  </td>
                  <td className={cn(
                    "px-6 py-4 text-right font-black text-base",
                    item.type === 'income' ? 'text-success' : 'text-danger'
                  )}>
                    <div className="flex items-center justify-end gap-1">
                        {item.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {item.amount}
                    </div>
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
