import React, { useState } from 'react';
import { Search, Filter, Eye, Truck, CheckCircle, Clock } from 'lucide-react';
import { Card, Button, Input, Badge, Modal } from '../components/ui-base';

const ordersData = [
  { id: '#ORD-7721', customer: 'John Cooper', date: '2024-05-10', total: '$124.50', status: 'Pending', items: 3 },
  { id: '#ORD-7722', customer: 'Alice Freeman', date: '2024-05-10', total: '$89.00', status: 'Paid', items: 1 },
  { id: '#ORD-7723', customer: 'Mark Spencer', date: '2024-05-09', total: '$210.30', status: 'Shipped', items: 5 },
  { id: '#ORD-7724', customer: 'Sarah Connor', date: '2024-05-09', total: '$45.00', status: 'Completed', items: 2 },
  { id: '#ORD-7725', customer: 'James Bond', date: '2024-05-08', total: '$1,200.00', status: 'Pending', items: 1 },
];

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const viewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return <Badge variant="success">Completed</Badge>;
      case 'Shipped': return <Badge variant="info">Shipped</Badge>;
      case 'Paid': return <Badge variant="success">Paid</Badge>;
      case 'Pending': return <Badge variant="warning">Pending</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-text-base tracking-tighter uppercase">Transactions</h2>
          <p className="text-text-muted text-sm font-medium">Track and manage all customer purchases.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 h-11 px-6 text-[10px] uppercase tracking-widest font-black">
            <Filter size={14} />
            Filter
          </Button>
          <Button className="gap-2 h-11 px-6 text-[10px] uppercase tracking-widest font-black">Export CSV</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-border-base bg-white">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3 top-3 text-text-muted" />
            <Input placeholder="Search by ID, customer or status..." className="pl-10 h-11 bg-bg-base border-transparent focus:bg-white focus:border-primary transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Transaction</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Customer</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Date</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Units</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Amount</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Status</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {ordersData.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors border-b border-border-base last:border-0 text-text-base">
                  <td className="px-6 py-4 font-mono text-[11px] font-bold text-primary cursor-pointer hover:underline" onClick={() => viewOrder(order)}>
                    {order.id}
                  </td>
                  <td className="px-6 py-4 font-bold">{order.customer}</td>
                  <td className="px-6 py-4 text-text-muted text-xs">{order.date}</td>
                  <td className="px-6 py-4 text-text-muted text-xs font-bold uppercase">{order.items} items</td>
                  <td className="px-6 py-4 font-black">${parseFloat(order.total.replace('$', '').replace(',', '')).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => viewOrder(order)} className="hover:text-primary">
                      <Eye size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`DETAILS // ${selectedOrder?.id}`}
      >
        {selectedOrder && (
          <div className="space-y-8 font-sans">
            <div className="flex items-center justify-between p-6 bg-primary/5 rounded-xl border border-primary/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Clock size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">Status</p>
                  <p className="text-sm font-black text-text-base leading-none">Last sync: 2:30 PM</p>
                </div>
              </div>
              <select className="bg-white border border-border-base rounded-lg px-4 py-2 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer">
                <option selected={selectedOrder.status === 'Pending'}>Pending</option>
                <option selected={selectedOrder.status === 'Paid'}>Paid</option>
                <option selected={selectedOrder.status === 'Shipped'}>Shipped</option>
                <option selected={selectedOrder.status === 'Completed'}>Completed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-border-base pb-2">Client Identity</h4>
                <div className="space-y-1">
                  <p className="font-black text-text-base text-lg tracking-tight">{selectedOrder.customer}</p>
                  <p className="text-sm text-text-muted font-medium">john.cooper@example.com</p>
                  <p className="text-sm text-text-muted font-medium">+1 555-0987</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-border-base pb-2">Dispatch Address</h4>
                <div className="space-y-1">
                  <p className="text-sm text-text-base font-bold">123 Maple Avenue</p>
                  <p className="text-sm text-text-muted">Los Angeles, CA 90001</p>
                  <p className="text-sm text-text-muted uppercase tracking-widest font-medium">United States</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-border-base pb-2">Order Manifest</h4>
              <div className="space-y-2">
                {[...Array(selectedOrder.items)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border-base last:border-0">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-bg-base border border-border-base rounded-lg shadow-sm flex-shrink-0"></div>
                      <div>
                        <p className="font-black text-text-base tracking-tight leading-tight mb-1">Product SKU-00{i + 1}</p>
                        <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest leading-none">REF-{1000 + i}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <p className="text-sm font-black text-text-base leading-none mb-1">$45.00</p>
                      <Badge variant="default" className="text-[9px]">x1 Unit</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-border-base space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-text-muted">
                <span>Subtotal</span>
                <span className="text-text-base">{selectedOrder.total}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-text-muted">
                <span>Freight</span>
                <span className="text-text-base">Free</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-border-base mt-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Final Total</span>
                <span className="text-3xl font-light text-primary leading-none tracking-tighter">{selectedOrder.total}</span>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button variant="outline" className="flex-1 h-12 uppercase tracking-widest font-black text-xs gap-3">
                <Truck size={16} />
                Tracking
              </Button>
              <Button className="flex-1 h-12 uppercase tracking-widest font-black text-xs gap-3 shadow-lg">
                <CheckCircle size={16} />
                Verify Order
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
