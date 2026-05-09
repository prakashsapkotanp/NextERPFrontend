import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Receipt,
  BarChart3,
  Archive
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui-base';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Inventory', path: '/inventory', icon: Archive },
  { name: 'Orders', path: '/orders', icon: ShoppingCart },
  { name: 'Accounting', path: '/accounting', icon: BarChart3 },
  { name: 'Billing', path: '/billing', icon: Receipt },
  { name: 'Settings & Org', path: '/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 240 : 80 }}
        className={cn(
          "fixed inset-y-0 left-0 bg-bg-base border-r border-border-base z-50 transform lg:relative transition-all duration-300 ease-in-out font-sans",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full py-6">
          <div className="px-6 mb-8 flex items-center justify-between">
            <Link to="/" className="flex flex-col overflow-hidden">
              <h1 className="text-primary font-bold text-2xl tracking-tight">NextERP</h1>
              {isSidebarOpen && (
                <p className="text-[10px] text-text-muted mt-1 uppercase tracking-widest font-bold">Admin Suite</p>
              )}
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex p-1 hover:bg-gray-200 rounded text-text-muted"
            >
              {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          <nav className="flex-grow space-y-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 text-[0.9375rem] font-medium transition-all group border-l-4 border-transparent",
                    isActive 
                      ? "bg-primary text-white border-primary" 
                      : "text-text-muted hover:bg-gray-200 hover:text-primary"
                  )}
                >
                  <item.icon size={18} className={cn(isActive ? "text-white" : "text-text-muted group-hover:text-primary")} />
                  {isSidebarOpen && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}

            <div className="px-6 pt-4 mt-4 border-t border-border-base">
              <Link
                to="/cart"
                className="flex items-center gap-3 py-2 text-sm text-orange-600 hover:text-orange-700 transition-all font-bold"
              >
                <ExternalLink size={18} />
                {isSidebarOpen && <span className="truncate uppercase tracking-wider">Storefront</span>}
              </Link>
            </div>
          </nav>

          <div className="px-6 mt-auto space-y-4">
            {isSidebarOpen && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">Premium Plan</p>
                <p className="text-[10px] text-blue-400 font-medium">Renews in 12 days</p>
              </div>
            )}
            <Button 
              variant="ghost" 
              className={cn("w-full justify-start gap-3 text-text-muted hover:bg-gray-200", !isSidebarOpen && "px-2 justify-center")}
              onClick={handleLogout}
            >
              <LogOut size={18} />
              {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-wider">Logout</span>}
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-border-base flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded text-text-muted"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-text-muted">Home</span>
              <span className="text-gray-300">/</span>
              <span className="text-text-base">
                {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              {user?.fullName?.charAt(0)}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
