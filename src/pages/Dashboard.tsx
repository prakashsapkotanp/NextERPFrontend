import { LayoutDashboard, Users, Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, Badge, Button } from '../components/ui-base';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const stats = [
  { label: 'Total Users', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12%' },
  { label: 'Total Products', value: '452', icon: Package, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+5%' },
  { label: 'Total Orders', value: '8,420', icon: ShoppingCart, color: 'text-green-600', bg: 'bg-green-100', trend: '+18%' },
  { label: 'Revenue', value: '$124,500', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100', trend: '+24%' },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', date: '2024-05-10', total: '$120.00', status: 'Completed' },
  { id: '#ORD-002', customer: 'Jane Smith', date: '2024-05-10', total: '$85.50', status: 'Pending' },
  { id: '#ORD-003', customer: 'Robert Johnson', date: '2024-05-09', total: '$210.00', status: 'Shipped' },
  { id: '#ORD-004', customer: 'Michael Brown', date: '2024-05-09', total: '$15.00', status: 'Paid' },
  { id: '#ORD-005', customer: 'William Davis', date: '2024-05-08', total: '$45.00', status: 'Completed' },
];

const lowStockItems = [
  { name: 'Wireless Mouse', sku: 'WM-001', stock: 4 },
  { name: 'Mechanical Keyboard', sku: 'MK-042', stock: 2 },
  { name: 'USB-C Cable', sku: 'UC-109', stock: 8 },
  { name: 'Monitor Stand', sku: 'MS-555', stock: 0 },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.fullName}</h2>
        <p className="text-gray-500">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-light text-text-base">{stat.value}</span>
                <span className={cn(
                  "text-xs font-bold",
                  stat.trend.startsWith('+') ? "text-success" : "text-primary"
                )}>
                  {stat.trend} {stat.trend.startsWith('+') ? '↑' : ''}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 flex flex-col">
          <div className="px-6 py-4 border-b border-border-base flex items-center justify-between bg-white">
            <h3 className="font-bold text-text-base">Recent Orders</h3>
            <button className="text-sm text-primary font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Order ID</th>
                  <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Customer</th>
                  <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Date</th>
                  <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Total</th>
                  <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors border-b border-border-base last:border-0 text-text-base">
                    <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                    <td className="px-6 py-4 font-medium">{order.customer}</td>
                    <td className="px-6 py-4 text-text-muted">{order.date}</td>
                    <td className="px-6 py-4 font-bold">{order.total}</td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        order.status === 'Completed' ? 'success' : 
                        order.status === 'Pending' ? 'warning' :
                        order.status === 'Paid' ? 'success' : 'info'
                      }>
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-border-base flex items-center gap-2 bg-white">
            <AlertTriangle size={18} className="text-warning" />
            <h3 className="font-bold text-text-base text-sm uppercase tracking-wide">Low Stock Alerts</h3>
          </div>
          <div className="p-6 space-y-6 flex-1">
            {lowStockItems.map((item) => (
              <div key={item.sku} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-text-base text-sm leading-tight">{item.name}</p>
                  <p className={cn(
                    "text-[10px] font-bold uppercase",
                    item.stock === 0 ? "text-danger" : "text-warning"
                  )}>
                    {item.stock === 0 ? 'Out of Stock' : `Only ${item.stock} left`}
                  </p>
                </div>
                <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">
                  {item.stock === 0 ? 'Restock' : 'Reorder'}
                </button>
              </div>
            ))}

            <div className="mt-8 pt-6 border-t border-border-base">
              <div className="bg-bg-base p-4 rounded-lg border border-dashed border-border-base text-center">
                <p className="text-xs text-text-muted mb-3">Need to add more inventory?</p>
                <Button variant="outline" size="sm" className="bg-white w-full">+ Add New Product</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
