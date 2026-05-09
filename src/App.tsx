import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminLayout from './components/layout/AdminLayout';
import StorefrontLayout from './components/layout/StorefrontLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Accounting from './pages/Accounting';
import Billing from './pages/Billing';

function AdminProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

function StorefrontProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <StorefrontLayout>
      <Outlet />
    </StorefrontLayout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<AdminProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route element={<StorefrontProtectedRoute />}>
        <Route path="/cart" element={<Checkout />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
