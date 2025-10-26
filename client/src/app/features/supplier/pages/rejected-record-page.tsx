import { useNavigate, useParams } from 'react-router-dom';
import { useRecordDetail, useSaveDraft } from '@/app/features/supplier/hooks/use-supplier-records';
import { Card } from '@/app/components/ui/card';
import { toast } from '@/app/utils/toast-emitter';

export const RejectedRecordPage = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data } = useRecordDetail(id);
  const saveDraft = useSaveDraft();

  if (!data) {
    return <div className="text-sm text-slate-500">Record not found.</div>;
  }

  const duplicateRecord = async () => {
    const { id: _id, ...rest } = data;
    const draft = await saveDraft.mutateAsync({ ...rest, status: 'draft' });
    toast({ title: 'Draft created', description: 'You can now edit and resubmit', variant: 'success' });
    navigate(`/supplier/records/${draft.id}`);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card title="Why it was rejected" description="Resolve all issues before duplicating.">
        <p className="text-sm text-danger">{data.rejectionReason ?? 'Reason unavailable'}</p>
      </Card>
      <Card title="Next steps" description="Create a fresh draft with all data pre-filled.">
        <button
          type="button"
          onClick={duplicateRecord}
          className="rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-soft-card"
        >
          Duplicate to edit
        </button>
      </Card>
    </div>
  );
};
