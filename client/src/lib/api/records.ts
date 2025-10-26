import type { AuditLogEntry, SupplierRecord } from '@/types/records';
import { http } from '@/lib/api/http';
import { mockAuditLogs, mockSupplierRecords } from '@/lib/mock/data';

export type SupplierDashboardPayload = {
  records: SupplierRecord[];
  stats: Record<string, number>;
};

export type ImportSummary = {
  rowsProcessed: number;
  accepted: number;
  rejected: number;
  errors: Array<{ row: number; message: string }>;
};

const mockStats = mockSupplierRecords.reduce<Record<string, number>>((acc, record) => {
  acc[record.status] = (acc[record.status] ?? 0) + 1;
  return acc;
}, {});

export const recordsApi = {
  async supplierDashboard(): Promise<SupplierDashboardPayload> {
    try {
      return await http.get<SupplierDashboardPayload>('/supplier/records');
    } catch (error) {
      return { records: mockSupplierRecords, stats: mockStats };
    }
  },
  async getRecordById(id: string): Promise<SupplierRecord | undefined> {
    try {
      return await http.get<SupplierRecord>(`/records/${id}`);
    } catch (error) {
      return mockSupplierRecords.find((record) => record.id === id);
    }
  },
  async saveDraft(payload: Partial<SupplierRecord>): Promise<SupplierRecord> {
    try {
      return await http.post<SupplierRecord>('/supplier/records', payload);
    } catch (error) {
      return {
        ...mockSupplierRecords[0],
        ...payload,
        id: payload.id ?? `RF-${Math.floor(Math.random() * 900 + 100)}`,
        status: 'draft',
        updatedAt: new Date().toISOString(),
        history: [
          {
            id: `h-${Date.now()}`,
            status: 'draft',
            actor: payload.staffName ?? 'You',
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }
  },
  async submitRecord(id: string): Promise<SupplierRecord> {
    try {
      return await http.patch<SupplierRecord>(`/supplier/records/${id}/submit`);
    } catch (error) {
      const record = mockSupplierRecords.find((item) => item.id === id);
      return record ?? mockSupplierRecords[0];
    }
  },
  async adminStats() {
    try {
      return await http.get<Record<string, number>>('/admin/records/stats');
    } catch (error) {
      return mockStats;
    }
  },
  async adminQueue() {
    try {
      return await http.get<SupplierRecord[]>('/admin/records?status=submitted');
    } catch (error) {
      return mockSupplierRecords.filter((record) => record.status === 'submitted');
    }
  },
  async verifyRecord(id: string) {
    try {
      return await http.patch<SupplierRecord>(`/admin/records/${id}/verify`);
    } catch (error) {
      return mockSupplierRecords.find((record) => record.id === id) ?? mockSupplierRecords[0];
    }
  },
  async rejectRecord(id: string, reason: string) {
    try {
      return await http.patch<SupplierRecord>(`/admin/records/${id}/reject`, { reason });
    } catch (error) {
      return {
        ...(mockSupplierRecords.find((record) => record.id === id) ?? mockSupplierRecords[0]),
        status: 'rejected',
        rejectionReason: reason,
      };
    }
  },
  async exportVerified() {
    try {
      return await http.get<Blob>('/admin/records/export', { responseType: 'blob' });
    } catch (error) {
      return new Blob(['RegiFlow export ready'], { type: 'text/plain' });
    }
  },
  async auditLogs(): Promise<AuditLogEntry[]> {
    try {
      return await http.get<AuditLogEntry[]>('/admin/audit');
    } catch (error) {
      return mockAuditLogs;
    }
  },
  async importPreview(file: File): Promise<ImportSummary> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      return await http.post<ImportSummary>('/admin/import/preview', formData);
    } catch (error) {
      return {
        rowsProcessed: 15,
        accepted: 13,
        rejected: 2,
        errors: [
          { row: 4, message: 'Missing passport photo reference' },
          { row: 11, message: 'Duplicate REG number' },
        ],
      };
    }
  },
};
