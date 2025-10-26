import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  ({ children, className, variant = 'primary', isLoading, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        buttonVariants[variant],
        (disabled || isLoading) && 'cursor-not-allowed opacity-60',
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  ),
);

Button.displayName = 'Button';

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-600 text-white shadow-soft-card hover:bg-primary-700 focus-visible:outline-primary-600',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:outline-slate-400',
  ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 focus-visible:outline-primary-200',
  danger: 'bg-danger text-white hover:bg-red-700 focus-visible:outline-danger',
};
