import { useParams, Link } from 'react-router-dom';
import { StatusChip } from '@/app/components/ui/status-chip';
import { useRecordDetail } from '@/app/features/supplier/hooks/use-supplier-records';
import { Card } from '@/app/components/ui/card';

export const SupplierRecordDetailPage = () => {
  const { id = '' } = useParams();
  const { data, isLoading } = useRecordDetail(id);

  if (isLoading) {
    return <div className="text-sm text-slate-500">Loading record...</div>;
  }

  if (!data) {
    return (
      <Card title="Record not found" description="This record may have been removed or never existed.">
        <Link
          to="/supplier/dashboard"
          className="inline-flex rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-soft-card"
        >
          Back to dashboard
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Record ID {data.id}</p>
          <h2 className="text-2xl font-bold text-slate-900">{data.staffName}</h2>
        </div>
        <StatusChip status={data.status} />
      </div>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card title="Profile" description="Submitted details">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <DetailItem label="Employee ID" value={data.employeeId} />
            <DetailItem label="Facility" value={data.facility} />
            <DetailItem label="Department" value={data.department} />
            <DetailItem label="Phone" value={data.phone} />
            <DetailItem label="Email" value={data.email} />
          </dl>
        </Card>
        <Card title="Timeline" description="Status history">
          <ol className="space-y-4 text-sm">
            {data.history.map((entry) => (
              <li key={entry.id} className="border-l-2 border-primary-100 pl-3">
                <p className="font-semibold text-slate-900">{entry.status}</p>
                <p className="text-xs text-slate-500">
                  {entry.actor} · {new Date(entry.timestamp).toLocaleString()}
                </p>
                {entry.notes ? <p className="text-xs text-slate-500">{entry.notes}</p> : null}
              </li>
            ))}
          </ol>
        </Card>
      </div>
      {data.status === 'rejected' ? (
        <Card title="Rejection details" description="Resolve the issues and re-submit">
          <p className="text-sm text-danger">{data.rejectionReason}</p>
          <Link
            to={`/supplier/records/${data.id}/rejected`}
            className="mt-4 inline-flex rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-soft-card"
          >
            Duplicate to edit
          </Link>
        </Card>
      ) : null}
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
    <p className="text-sm font-medium text-slate-900">{value ?? '—'}</p>
  </div>
);
