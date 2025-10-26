import { Link } from 'react-router-dom';
import { PageHeader } from '@/app/components/shared/page-header';
import { StatCard } from '@/app/components/ui/stat-card';
import { useAdminStats, useVerificationQueue } from '@/app/features/admin/hooks/use-admin-records';
import { StatusChip } from '@/app/components/ui/status-chip';

export const AdminDashboardPage = () => {
  const { data: stats } = useAdminStats();
  const { data: queue } = useVerificationQueue();

  return (
    <div className="space-y-8">
      <PageHeader
        title="REG command center"
        description="Monitor supplier throughput and action items."
        actions={
          <Link
            to="/admin/verification"
            className="inline-flex items-center rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-soft-card"
          >
            Go to verification
          </Link>
        }
      />
      <div className="grid gap-4 md:grid-cols-4">
        {Object.entries(stats ?? {}).map(([status, value]) => (
          <StatCard key={status} label={statusLabels[status as keyof typeof statusLabels] ?? status} value={value} />
        ))}
      </div>
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Verification queue</h3>
            <p className="text-sm text-slate-500">Records awaiting QA</p>
          </div>
          <Link to="/admin/verification" className="text-sm font-semibold text-primary-600">
            View all
          </Link>
        </div>
        <div className="space-y-4">
          {queue?.map((record) => (
            <div key={record.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
              <div>
                <p className="font-semibold text-slate-900">{record.staffName}</p>
                <p className="text-xs text-slate-500">{record.facility}</p>
              </div>
              <StatusChip status={record.status} />
            </div>
          ))}
          {!queue?.length ? <p className="text-sm text-slate-500">No pending submissions 🎉</p> : null}
        </div>
      </section>
    </div>
  );
};

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  verified: 'Verified',
  exported: 'Exported',
  approved: 'Approved',
  rejected: 'Rejected',
};
