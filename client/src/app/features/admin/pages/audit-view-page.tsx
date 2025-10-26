import { useAuditLogs } from '@/app/features/admin/hooks/use-admin-records';
import { StatusChip } from '@/app/components/ui/status-chip';

export const AuditViewPage = () => {
  const { data, isLoading } = useAuditLogs();

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading audit trail...</p>;
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft-card">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">Timestamp</th>
              <th className="px-3 py-2">Actor</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((entry) => (
              <tr key={entry.id} className="border-t border-slate-100">
                <td className="px-3 py-3 text-slate-500">{new Date(entry.timestamp).toLocaleString()}</td>
                <td className="px-3 py-3">
                  <p className="font-semibold text-slate-900">{entry.actor}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{entry.role}</p>
                </td>
                <td className="px-3 py-3 text-slate-600">{entry.action}</td>
                <td className="px-3 py-3">
                  {entry.status ? <StatusChip status={entry.status} /> : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
