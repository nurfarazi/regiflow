import { useNavigate } from 'react-router-dom';
import { SupplierRecordForm } from '@/app/features/supplier/components/supplier-record-form';
import { useSaveDraft, useSubmitRecord } from '@/app/features/supplier/hooks/use-supplier-records';
import type { SupplierRecordFormValues } from '@/app/features/supplier/components/supplier-record-form';
import { toast } from '@/app/utils/toast-emitter';

export const SupplierRecordFormPage = () => {
  const navigate = useNavigate();
  const saveDraft = useSaveDraft();
  const submitRecord = useSubmitRecord();

  const buildPayload = (values: SupplierRecordFormValues) => ({
    staffName: values.staffName,
    employeeId: values.employeeId,
    facility: values.facility,
    department: values.department,
    phone: values.phone,
    email: values.email,
    photoUrl: typeof values.photo === 'string' ? values.photo : undefined,
    status: 'draft' as const,
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    history: [],
  });

  const handleSaveDraft = async (values: SupplierRecordFormValues) => {
    const payload = buildPayload(values);
    const record = await saveDraft.mutateAsync(payload);
    toast({ title: 'Draft saved', description: `${record.staffName} is stored as draft`, variant: 'success' });
    navigate(`/supplier/records/${record.id}`);
  };

  const handleSubmit = async (values: SupplierRecordFormValues) => {
    const payload = buildPayload(values);
    const record = await saveDraft.mutateAsync(payload);
    const submitted = await submitRecord.mutateAsync(record.id);
    toast({ title: 'Record submitted', description: `${submitted.staffName} is now pending REG`, variant: 'success' });
    navigate(`/supplier/records/${submitted.id}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Add staff record</h2>
      <SupplierRecordForm
        onSaveDraft={handleSaveDraft}
        onSubmitRecord={handleSubmit}
        isSaving={saveDraft.isPending}
        isSubmitting={submitRecord.isPending}
      />
    </div>
  );
};
