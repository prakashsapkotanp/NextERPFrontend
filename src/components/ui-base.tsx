import * as React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:opacity-90 shadow-sm',
      secondary: 'bg-gray-200 text-text-base hover:bg-gray-300',
      danger: 'bg-danger text-white hover:opacity-90 shadow-sm',
      success: 'bg-success text-white hover:opacity-90 shadow-sm',
      ghost: 'hover:bg-gray-100 text-text-muted transition-colors',
      outline: 'border border-border-base bg-white hover:bg-gray-50 text-text-base shadow-sm',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs font-semibold uppercase tracking-wider',
      md: 'px-4 py-2 text-sm font-semibold',
      lg: 'px-6 py-3 text-base font-semibold',
      icon: 'p-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-[0.375rem] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-[0.375rem] border border-border-base bg-white px-3 py-2 text-sm placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn('bg-white rounded-[0.375rem] border border-border-base shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.075)] hover:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] transition-shadow duration-300 overflow-hidden', className)}
    {...props}
  >
    {children}
  </div>
);

export const Badge = ({ className, variant = 'default', children, ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' }) => {
  const variants = {
    default: 'bg-gray-100 text-text-muted border border-border-base',
    success: 'bg-success text-white',
    warning: 'bg-warning text-black',
    danger: 'bg-danger text-white',
    info: 'bg-primary text-white',
  };
  return (
    <span 
      className={cn('px-2 py-1 rounded text-[10px] uppercase font-bold whitespace-nowrap tracking-wide leading-none', variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
