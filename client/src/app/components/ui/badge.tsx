import type { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

type BadgeProps = PropsWithChildren<{
  variant?: BadgeVariant;
  className?: string;
}>;

export const Badge = ({ variant = 'default', className, children }: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize',
      badgeVariantStyles[variant],
      className,
    )}
  >
    {children}
  </span>
);

const badgeVariantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-rose-100 text-rose-700',
  info: 'bg-primary-100 text-primary-700',
};
