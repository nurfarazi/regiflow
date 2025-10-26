import { clsx } from 'clsx';
import type { RecordStatus } from '@/types/records';

const statusCopy: Record<RecordStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  verified: 'Verified',
  exported: 'Exported',
  approved: 'Approved',
  rejected: 'Rejected',
};

const statusClassMap: Record<RecordStatus, string> = {
  draft: 'bg-slate-100 text-slate-700',
  submitted: 'bg-blue-100 text-blue-700',
  verified: 'bg-emerald-100 text-emerald-700',
  exported: 'bg-slate-900 text-white',
  approved: 'bg-primary-600 text-white',
  rejected: 'bg-rose-100 text-rose-700',
};

export const StatusChip = ({ status }: { status: RecordStatus }) => (
  <span className={clsx('inline-flex rounded-full px-3 py-1 text-xs font-semibold', statusClassMap[status])}>
    {statusCopy[status]}
  </span>
);
