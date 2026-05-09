import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Button, Input } from '../components/ui-base';
import { useAuth } from '../context/AuthContext';
import { LogIn, Github, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(email);
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 selection:bg-blue-100 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary text-white mb-6 shadow-md">
            <span className="text-2xl font-black">N</span>
          </div>
          <h2 className="text-3xl font-black text-text-base tracking-tighter">Sign in to NextERP</h2>
          <p className="text-text-muted mt-2 text-sm font-medium">Clean, consistent, and powerful administration.</p>
        </div>

        <Card className="p-10 border border-border-base bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Email Address</label>
              <Input 
                type="email" 
                placeholder="name@company.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Password</label>
                <button type="button" className="text-xs text-primary hover:underline font-bold">Forgot password?</button>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full h-12 text-sm uppercase tracking-widest font-black" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Sign in to ERP'}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border-base"></span></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-white px-4 text-text-muted">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="gap-2 text-xs uppercase tracking-wider h-11">
              <Github size={16} />
              GitHub
            </Button>
            <Button variant="outline" className="gap-2 text-xs uppercase tracking-wider h-11">
              <Mail size={16} />
              Google
            </Button>
          </div>
        </Card>

        <p className="text-center mt-10 text-sm font-medium text-text-muted">
          New to NextERP?{' '}
          <Link to="/register" className="text-primary font-black hover:underline uppercase tracking-wide">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}
