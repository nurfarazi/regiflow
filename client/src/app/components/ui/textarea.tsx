import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
      {label}
      <textarea
        ref={ref}
        className={clsx(
          'min-h-[120px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100',
          error && 'border-danger focus:border-danger',
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs font-normal text-danger">{error}</span> : null}
    </label>
  ),
);

TextArea.displayName = 'TextArea';
