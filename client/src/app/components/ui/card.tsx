import type { PropsWithChildren, ReactNode } from 'react';
import { clsx } from 'clsx';

type CardProps = PropsWithChildren<{
  className?: string;
  title?: string;
  action?: ReactNode;
  description?: string;
}>;

export const Card = ({ className, children, title, action, description }: CardProps) => (
  <div className={clsx('rounded-2xl border border-slate-100 bg-white p-6 shadow-soft-card', className)}>
    {(title || action) && (
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          {title ? <h3 className="text-base font-semibold text-slate-900">{title}</h3> : null}
          {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
        </div>
        {action}
      </div>
    )}
    {children}
  </div>
);
