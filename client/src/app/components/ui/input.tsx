import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
      {label}
      <input
        ref={ref}
        className={clsx(
          'rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100',
          error && 'border-danger focus:border-danger',
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs font-normal text-danger">{error}</span> : null}
    </label>
  ),
);

Input.displayName = 'Input';
