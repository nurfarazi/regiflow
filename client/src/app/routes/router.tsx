import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '@/app/routes/landing-page';
import { LoginPage } from '@/app/features/auth/pages/login-page';
import { ProtectedRoute } from '@/app/routes/protected-route';
import { AppShell } from '@/app/components/layout/app-shell';
import { SupplierDashboardPage } from '@/app/features/supplier/pages/supplier-dashboard';
import { SupplierRecordFormPage } from '@/app/features/supplier/pages/supplier-record-form-page';
import { SupplierRecordDetailPage } from '@/app/features/supplier/pages/supplier-record-detail-page';
import { RejectedRecordPage } from '@/app/features/supplier/pages/rejected-record-page';
import { AdminDashboardPage } from '@/app/features/admin/pages/admin-dashboard';
import { VerificationQueuePage } from '@/app/features/admin/pages/verification-queue-page';
import { ExportCenterPage } from '@/app/features/admin/pages/export-center-page';
import { ImportCenterPage } from '@/app/features/admin/pages/import-center-page';
import { AuditViewPage } from '@/app/features/admin/pages/audit-view-page';

const supplierNav = [
  { label: 'Dashboard', to: '/supplier/dashboard' },
  { label: 'New record', to: '/supplier/records/new' },
];

const adminNav = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Verification queue', to: '/admin/verification' },
  { label: 'Export center', to: '/admin/export' },
  { label: 'Import center', to: '/admin/import' },
  { label: 'Audit log', to: '/admin/audit' },
];

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/supplier/login', element: <LoginPage role="supplier" /> },
  { path: '/admin/login', element: <LoginPage role="admin" /> },
  {
    path: '/supplier',
    element: (
      <ProtectedRoute role="supplier">
        <AppShell navItems={supplierNav} />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <SupplierDashboardPage /> },
      { path: 'dashboard', element: <SupplierDashboardPage /> },
      { path: 'records/new', element: <SupplierRecordFormPage /> },
      { path: 'records/:id', element: <SupplierRecordDetailPage /> },
      { path: 'records/:id/rejected', element: <RejectedRecordPage /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="admin">
        <AppShell navItems={adminNav} />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'dashboard', element: <AdminDashboardPage /> },
      { path: 'verification', element: <VerificationQueuePage /> },
      { path: 'export', element: <ExportCenterPage /> },
      { path: 'import', element: <ImportCenterPage /> },
      { path: 'audit', element: <AuditViewPage /> },
    ],
  },
]);
