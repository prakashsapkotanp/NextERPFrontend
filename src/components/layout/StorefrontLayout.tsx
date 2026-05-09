import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Package, Search, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui-base';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="font-bold text-xl tracking-tighter text-blue-900">NextStore</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600">Home</Link>
              <Link to="/products" className="text-sm font-medium text-gray-600 hover:text-blue-600">Shop</Link>
              <Link to="/categories" className="text-sm font-medium text-gray-600 hover:text-blue-600">Categories</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1.5 gap-2 border border-transparent focus-within:border-blue-200 transition-colors">
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-transparent border-none text-sm outline-none w-40"
              />
            </div>
            
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingCart size={22} />
              <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </Link>

            <div className="h-6 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/" className="text-sm font-semibold text-gray-700 hover:text-blue-600 hidden sm:block">
                  Admin
                </Link>
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                  {user.fullName.charAt(0)}
                </div>
              </div>
            ) : (
              <Button size="sm" onClick={() => navigate('/login')}>Sign In</Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
              <span className="font-bold text-lg text-blue-900">NextERP</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              The ultimate ERP and e-commerce solution for modern businesses. 
              Manage everything from one single place.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/help" className="hover:text-blue-600">Help Center</Link></li>
              <li><Link to="/shipping" className="hover:text-blue-600">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-blue-600">Returns</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-50 text-center text-xs text-gray-400">
          &copy; 2024 NextERP Solutions Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
