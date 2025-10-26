import type { ReactNode } from 'react';

export type StatCardProps = {
  label: string;
  value: string | number;
  delta?: string;
  icon?: ReactNode;
};

export const StatCard = ({ label, value, delta, icon }: StatCardProps) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-soft-card">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      {icon}
    </div>
    <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
    {delta ? <p className="text-xs text-emerald-600">{delta}</p> : null}
  </div>
);
