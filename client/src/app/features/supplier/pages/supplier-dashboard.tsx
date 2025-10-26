import { Link } from 'react-router-dom';
import { PageHeader } from '@/app/components/shared/page-header';
import { StatusChip } from '@/app/components/ui/status-chip';
import { StatCard } from '@/app/components/ui/stat-card';
import { useSupplierDashboard } from '@/app/features/supplier/hooks/use-supplier-records';
import { EmptyState } from '@/app/components/shared/empty-state';

export const SupplierDashboardPage = () => {
  const { data, isLoading } = useSupplierDashboard();

  if (isLoading || !data) {
    return <div className="text-sm text-slate-500">Loading dashboard...</div>;
  }

  const { stats, records } = data;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Supplier dashboard"
        description="Track the status of every staff record shared with REG."
        actions={
          <Link
            to="/supplier/records/new"
            className="inline-flex items-center rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-soft-card transition hover:bg-primary-700"
          >
            Add new record
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statKeys.map((key) => (
          <StatCard key={key} label={statusLabels[key]} value={stats[key] ?? 0} />
        ))}
      </div>
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft-card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">Active records</h3>
          <p className="text-xs text-slate-500">Status updates refresh every 10 minutes</p>
        </div>
        {records.length === 0 ? (
          <EmptyState
            title="No records yet"
            description="Start by adding your first staff record to sync with REG reviewers."
            action={
              <Link
                to="/supplier/records/new"
                className="inline-flex items-center rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-soft-card transition hover:bg-primary-700"
              >
                Add record
              </Link>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-2">Staff</th>
                  <th className="px-3 py-2">Facility</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Updated</th>
                  <th className="px-3 py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-t border-slate-100">
                    <td className="px-3 py-3">
                      <p className="font-semibold text-slate-900">{record.staffName}</p>
                      <p className="text-xs text-slate-500">{record.employeeId}</p>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{record.facility}</td>
                    <td className="px-3 py-3">
                      <StatusChip status={record.status} />
                    </td>
                    <td className="px-3 py-3 text-sm text-slate-500">
                      {new Date(record.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <Link className="text-sm font-semibold text-primary-600" to={`/supplier/records/${record.id}`}>
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

const statKeys = ['draft', 'submitted', 'verified', 'rejected'] as const;

const statusLabels: Record<(typeof statKeys)[number], string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  verified: 'Verified',
  rejected: 'Rejected',
};
