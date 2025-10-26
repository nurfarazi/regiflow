import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { TextArea } from '@/app/components/ui/textarea';
import type { SupplierRecord } from '@/types/records';

const fileSchema = typeof File === 'undefined' ? z.any() : z.instanceof(File);

const recordFormSchema = z.object({
  staffName: z.string().min(2, 'Provide the staff member name'),
  employeeId: z.string().min(2, 'Employee ID is required'),
  facility: z.string().min(2, 'Facility is required'),
  department: z.string().min(2, 'Department is required'),
  phone: z.string().min(6, 'Phone number is required'),
  email: z.string().email('Use a valid email'),
  notes: z.string().optional(),
  photo: fileSchema.optional().or(z.string().optional()),
});

export type SupplierRecordFormValues = z.infer<typeof recordFormSchema>;

type Props = {
  defaultValues?: Partial<SupplierRecord>;
  onSaveDraft: (values: SupplierRecordFormValues) => Promise<void>;
  onSubmitRecord: (values: SupplierRecordFormValues) => Promise<void>;
  isSaving?: boolean;
  isSubmitting?: boolean;
};

export const SupplierRecordForm = ({
  defaultValues,
  onSaveDraft,
  onSubmitRecord,
  isSaving,
  isSubmitting,
}: Props) => {
  const [previewUrl, setPreviewUrl] = useState(defaultValues?.photoUrl ?? '');
  const form = useForm<SupplierRecordFormValues>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: {
      staffName: defaultValues?.staffName ?? '',
      employeeId: defaultValues?.employeeId ?? '',
      facility: defaultValues?.facility ?? '',
      department: defaultValues?.department ?? '',
      phone: defaultValues?.phone ?? '',
      email: defaultValues?.email ?? '',
      notes: '',
    },
  });
  form.register('photo');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('photo', file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDraft = form.handleSubmit(async (values) => {
    await onSaveDraft(values);
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmitRecord(values);
  });

  return (
    <form className="grid gap-6 md:grid-cols-[2fr_1fr]" onSubmit={(event) => event.preventDefault()}>
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft-card">
          <h3 className="text-base font-semibold text-slate-900">Staff profile</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Input label="Full name" {...form.register('staffName')} error={form.formState.errors.staffName?.message} />
            <Input label="Employee ID" {...form.register('employeeId')} error={form.formState.errors.employeeId?.message} />
            <Input label="Facility" {...form.register('facility')} error={form.formState.errors.facility?.message} />
            <Input label="Department" {...form.register('department')} error={form.formState.errors.department?.message} />
            <Input label="Phone" {...form.register('phone')} error={form.formState.errors.phone?.message} />
            <Input label="Email" type="email" {...form.register('email')} error={form.formState.errors.email?.message} />
          </div>
        </section>
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft-card">
          <h3 className="text-base font-semibold text-slate-900">Notes</h3>
          <TextArea label="Internal notes" placeholder="Optional context shared with REG reviewers" {...form.register('notes')} />
        </section>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleDraft} isLoading={isSaving} type="button" variant="secondary">
            Save as draft
          </Button>
          <Button onClick={handleSubmit} isLoading={isSubmitting} type="button">
            Submit to REG
          </Button>
        </div>
      </div>
      <aside className="space-y-4">
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center shadow-soft-card">
          <p className="text-sm font-semibold text-slate-900">Passport photo</p>
          <p className="mt-1 text-xs text-slate-500">Plain background, max 3MB JPG/PNG</p>
          {previewUrl ? (
            <img src={previewUrl} alt="Photo preview" className="mt-4 h-48 w-full rounded-2xl object-cover" />
          ) : (
            <div className="mt-4 h-48 w-full rounded-2xl bg-slate-50" />
          )}
          <input type="file" accept="image/*" className="mt-4 text-xs" onChange={handleFileChange} />
        </div>
        <p className="text-xs text-slate-500">
          Saving as draft keeps the record editable. Submitting locks the record for REG review.
        </p>
      </aside>
    </form>
  );
};
