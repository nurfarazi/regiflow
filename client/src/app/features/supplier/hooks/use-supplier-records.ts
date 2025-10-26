import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { recordsApi } from '@/lib/api/records';
import type { SupplierRecord } from '@/types/records';

const keys = {
  dashboard: ['supplier', 'records'] as const,
  detail: (id: string) => ['supplier', 'record', id] as const,
};

export const useSupplierDashboard = () =>
  useQuery({
    queryKey: keys.dashboard,
    queryFn: () => recordsApi.supplierDashboard(),
  });

export const useRecordDetail = (id: string) =>
  useQuery({
    queryKey: keys.detail(id),
    queryFn: () => recordsApi.getRecordById(id),
    enabled: Boolean(id),
  });

export const useSaveDraft = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<SupplierRecord>) => recordsApi.saveDraft(payload),
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: keys.dashboard });
      queryClient.setQueryData(keys.detail(record.id), record);
    },
  });
};

export const useSubmitRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => recordsApi.submitRecord(id),
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: keys.dashboard });
      queryClient.setQueryData(keys.detail(record.id), record);
    },
  });
};
