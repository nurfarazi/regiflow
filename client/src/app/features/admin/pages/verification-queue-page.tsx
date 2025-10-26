import { useState } from 'react';
import { useVerificationQueue, useVerifyRecord, useRejectRecord } from '@/app/features/admin/hooks/use-admin-records';
import { StatusChip } from '@/app/components/ui/status-chip';
import { toast } from '@/app/utils/toast-emitter';

export const VerificationQueuePage = () => {
  const { data, isLoading } = useVerificationQueue();
  const verify = useVerifyRecord();
  const reject = useRejectRecord();
  const [reasons, setReasons] = useState<Record<string, string>>({});

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading queue...</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-sm text-slate-500">No records waiting for verification.</p>;
  }

  const handleVerify = async (id: string) => {
    await verify.mutateAsync(id);
    toast({ title: 'Record verified', description: `${id} moved to Verified`, variant: 'success' });
  };

  const handleReject = async (id: string) => {
    const reason = reasons[id];
    if (!reason) {
      toast({ title: 'Reason required', description: 'Add rejection reason first', variant: 'warning' });
      return;
    }
    await reject.mutateAsync({ id, reason });
    toast({ title: 'Record rejected', description: `${id} sent back with notes`, variant: 'warning' });
    setReasons((prev) => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="space-y-6">
      {data.map((record) => (
        <div key={record.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">{record.id}</p>
              <h3 className="text-xl font-bold text-slate-900">{record.staffName}</h3>
              <p className="text-sm text-slate-500">{record.facility}</p>
            </div>
            <StatusChip status={record.status} />
          </div>
          <div className="mt-4 flex flex-col gap-3 md:flex-row">
            <textarea
              value={reasons[record.id] ?? ''}
              onChange={(event) => setReasons((prev) => ({ ...prev, [record.id]: event.target.value }))}
              placeholder="Optional rejection notes"
              className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleVerify(record.id)}
                className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Verify
              </button>
              <button
                type="button"
                onClick={() => handleReject(record.id)}
                className="rounded-2xl bg-danger px-4 py-2 text-sm font-semibold text-white"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
