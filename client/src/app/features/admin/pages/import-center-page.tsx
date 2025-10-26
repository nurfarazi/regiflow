import { useState } from 'react';
import { useImportPreview } from '@/app/features/admin/hooks/use-admin-records';

export const ImportCenterPage = () => {
  const importPreview = useImportPreview();
  const [fileName, setFileName] = useState('');

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    await importPreview.mutateAsync(file);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft-card">
        <h3 className="text-xl font-semibold text-slate-900">Import Excel</h3>
        <p className="text-sm text-slate-500">Dry-run validation before statuses change.</p>
        <input type="file" accept=".xlsx,.xls" onChange={handleUpload} className="mt-4 text-sm" />
        {fileName ? <p className="mt-2 text-xs text-slate-500">Selected: {fileName}</p> : null}
      </div>
      {importPreview.data ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft-card">
          <h4 className="text-base font-semibold text-slate-900">Validation summary</h4>
          <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <Summary label="Rows" value={importPreview.data.rowsProcessed} />
            <Summary label="Accepted" value={importPreview.data.accepted} />
            <Summary label="Rejected" value={importPreview.data.rejected} />
          </dl>
          <ul className="mt-4 space-y-2 text-sm text-danger">
            {importPreview.data.errors.map((error) => (
              <li key={error.row}>
                Row {error.row}: {error.message}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

const Summary = ({ label, value }: { label: string; value: number }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
    <p className="text-lg font-semibold text-slate-900">{value}</p>
  </div>
);
