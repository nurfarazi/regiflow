export type RecordStatus =
  | 'draft'
  | 'submitted'
  | 'verified'
  | 'exported'
  | 'approved'
  | 'rejected';

export type StatusHistoryEntry = {
  id: string;
  status: RecordStatus;
  actor: string;
  timestamp: string;
  notes?: string;
};

export type SupplierRecord = {
  id: string;
  staffName: string;
  employeeId: string;
  facility: string;
  department: string;
  phone: string;
  email: string;
  submittedAt: string;
  updatedAt: string;
  status: RecordStatus;
  rejectionReason?: string;
  photoUrl?: string;
  history: StatusHistoryEntry[];
};

export type DashboardStat = {
  label: string;
  value: number;
  delta?: number;
};

export type AuditLogEntry = {
  id: string;
  actor: string;
  role: 'supplier' | 'admin';
  action: string;
  status?: RecordStatus;
  timestamp: string;
  meta?: Record<string, string | number>;
};
