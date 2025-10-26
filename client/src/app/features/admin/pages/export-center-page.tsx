import { useRef, useState } from 'react';
import { useExportVerified } from '@/app/features/admin/hooks/use-admin-records';
import { toast } from '@/app/utils/toast-emitter';

export const ExportCenterPage = () => {
  const exportMutation = useExportVerified();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const exportData = async () => {
    const blob = await exportMutation.mutateAsync();
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    toast({ title: 'Export ready', description: 'Download verified records', variant: 'success' });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft-card">
        <h3 className="text-xl font-semibold text-slate-900">Export verified records</h3>
        <p className="mt-1 text-sm text-slate-500">Generates an Excel file with all records in status 02 (Verified).</p>
        <button
          type="button"
          onClick={exportData}
          className="mt-4 rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white"
        >
          {exportMutation.isPending ? 'Preparing...' : 'Generate export'}
        </button>
        {downloadUrl ? (
          <a
            href={downloadUrl}
            download="regiflow-verified.xlsx"
            className="mt-4 inline-block text-sm font-semibold text-primary-600"
          >
            Download file
          </a>
        ) : null}
      </div>
    </div>
  );
};
