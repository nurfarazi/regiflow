import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { recordsApi } from '@/lib/api/records';

const keys = {
  stats: ['admin', 'stats'] as const,
  queue: ['admin', 'queue'] as const,
  audit: ['admin', 'audit'] as const,
};

export const useAdminStats = () => useQuery({ queryKey: keys.stats, queryFn: () => recordsApi.adminStats() });

export const useVerificationQueue = () => useQuery({ queryKey: keys.queue, queryFn: () => recordsApi.adminQueue() });

export const useAuditLogs = () => useQuery({ queryKey: keys.audit, queryFn: () => recordsApi.auditLogs() });

export const useVerifyRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => recordsApi.verifyRecord(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.queue });
      queryClient.invalidateQueries({ queryKey: keys.stats });
    },
  });
};

export const useRejectRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => recordsApi.rejectRecord(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.queue });
      queryClient.invalidateQueries({ queryKey: keys.stats });
    },
  });
};

export const useImportPreview = () => useMutation({ mutationFn: (file: File) => recordsApi.importPreview(file) });

export const useExportVerified = () => useMutation({ mutationFn: () => recordsApi.exportVerified() });
